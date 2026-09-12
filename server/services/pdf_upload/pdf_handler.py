import os
import tempfile
from pymongo import ReturnDocument
from fastapi import HTTPException
from langchain_community.document_loaders import PyPDFLoader
from utils.file_hash import compute_md5
from db.config import db
from db.cloudinary import (
    upload_pdf_to_cloudinary_bytes,
    delete_file_from_cloudinary,
)
from services.pdf_upload.pdf_loader import extract_toc
from services.pdf_upload.study_scheduler import generate_study_schedule_from_toc
from services.pdf_upload.fallback_scheduler import generate_schedule_from_pages
from services.pdf_upload_ocr.ocr_service import is_scanned_pdf, make_searchable_pdf


async def process_pdf_upload(pdf_bytes: bytes, book_name: str, user_id: str):
    """
    Checks cache by MD5 hash with user scoping, reuses assets if previously processed,
    records per-user ownership in db.pdfs, and runs OCR only if needed.
    """
    original_hash = compute_md5(pdf_bytes)

    # 1. Check if this user already uploaded this file
    user_pdf = await db.pdfs.find_one({"original_hash": original_hash, "user_id": user_id})
    if user_pdf:
        return {
            "pdf_hash": user_pdf["pdf_hash"],
            "toc_data": user_pdf.get("toc"),
            "pdf_url": user_pdf.get("pdf_url"),
            "book_name": user_pdf.get("book_name", book_name),
            "image_url": user_pdf.get("image_url"),
            "pdf_cached": True,
            "pdf_bytes": pdf_bytes,
        }

    # 2. Check if another user uploaded this file — reuse OCR & Cloudinary assets
    existing_pdf = await db.pdfs.find_one({"original_hash": original_hash})
    if existing_pdf:
        pdf_hash = existing_pdf["pdf_hash"]
        toc_data = existing_pdf.get("toc")
        pdf_url = existing_pdf.get("pdf_url")
        was_scanned = existing_pdf.get("was_scanned", False)
        image_url = existing_pdf.get("image_url")

        # Record ownership for current user
        await db.pdfs.insert_one({
            "original_hash": original_hash,
            "pdf_hash": pdf_hash,
            "was_scanned": was_scanned,
            "toc": toc_data,
            "pdf_url": pdf_url,
            "book_name": book_name,
            "image_url": image_url,
            "user_id": user_id,
        })
        await db.pdf_assets.update_one(
            {"pdf_hash": pdf_hash},
            {"$addToSet": {"owners": user_id}, "$setOnInsert": {"pdf_url": pdf_url}},
            upsert=True,
        )

        return {
            "pdf_hash": pdf_hash,
            "toc_data": toc_data,
            "pdf_url": pdf_url,
            "book_name": book_name,
            "image_url": image_url,
            "pdf_cached": True,
            "pdf_bytes": pdf_bytes,
        }

    # 3. New PDF: run OCR if scanned, extract TOC, and upload to Cloudinary
    was_scanned = is_scanned_pdf(pdf_bytes)
    if was_scanned:
        print("📸 Scanned PDF detected — running OCR once")
        processed_bytes = make_searchable_pdf(pdf_bytes)
    else:
        print("📄 Text-based PDF detected")
        processed_bytes = pdf_bytes

    pdf_hash = compute_md5(processed_bytes)
    pdf_url = await upload_pdf_to_cloudinary_bytes(processed_bytes)
    toc_data = extract_toc(processed_bytes)

    await db.pdfs.insert_one({
        "original_hash": original_hash,
        "pdf_hash": pdf_hash,
        "was_scanned": was_scanned,
        "toc": toc_data,
        "pdf_url": pdf_url,
        "book_name": book_name,
        "image_url": None,
        "user_id": user_id,
    })
    await db.pdf_assets.update_one(
        {"pdf_hash": pdf_hash},
        {"$addToSet": {"owners": user_id}, "$setOnInsert": {"pdf_url": pdf_url}},
        upsert=True,
    )

    return {
        "pdf_hash": pdf_hash,
        "toc_data": toc_data,
        "pdf_url": pdf_url,
        "book_name": book_name,
        "image_url": None,
        "pdf_cached": False,
        "pdf_bytes": processed_bytes,
    }


async def resolve_or_create_schedule(pdf_hash: str, days: int, toc_data: dict, pdf_bytes: bytes):
    """
    Generates or retrieves schedule from cache/TOC or page-based fallback.
    """
    schedule_doc = await db.schedules.find_one({"pdf_hash": pdf_hash, "days": days})
    if schedule_doc:
        return {
            "schedule": schedule_doc["schedule"],
            "is_fallback": schedule_doc.get("is_fallback", False),
            "cached": True,
        }

    is_fallback = False
    try:
        if toc_data and "table_of_contents" in toc_data:
            schedule = generate_study_schedule_from_toc(
                toc_data=toc_data,
                total_days=days,
            )
        else:
            raise ValueError("Empty TOC")
    except Exception:
        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                tmp_path = tmp.name
                tmp.write(pdf_bytes)

            loader = PyPDFLoader(tmp_path)
            docs = loader.load()
            total_pages = len(docs)
            schedule = generate_schedule_from_pages(
                total_pages=total_pages,
                total_days=days,
            )
            is_fallback = True
        finally:
            if tmp_path and os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except OSError:
                    pass

    await db.schedules.update_one(
        {"pdf_hash": pdf_hash, "days": days},
        {"$set": {"schedule": schedule, "is_fallback": is_fallback}},
        upsert=True,
    )

    return {
        "schedule": schedule,
        "is_fallback": is_fallback,
        "cached": False,
    }


async def delete_user_pdf_and_data(pdf_hash: str, user_id: str):
    """
    Validates ownership and deletes user-scoped PDF and progress records.
    Atomically checks final ownership to clean Cloudinary assets and shared data safely.
    """
    pdf_doc = await db.pdfs.find_one({"pdf_hash": pdf_hash, "user_id": user_id})
    if not pdf_doc:
        raise HTTPException(status_code=404, detail="PDF not found")

    pdf_url = pdf_doc.get("pdf_url")

    # Delete user's own records
    await db.pdfs.delete_one({"pdf_hash": pdf_hash, "user_id": user_id})
    await db.study_progress.delete_many({"pdf_hash": pdf_hash, "user_id": user_id})
    await db.performance.delete_many({"pdf_hash": pdf_hash, "user_id": user_id})

    # Atomically remove user from owners set and check if final owner
    asset_doc = await db.pdf_assets.find_one_and_update(
        {"pdf_hash": pdf_hash},
        {"$pull": {"owners": user_id}},
        return_document=ReturnDocument.AFTER,
    )

    is_final_owner = False
    if asset_doc:
        if len(asset_doc.get("owners", [])) == 0:
            deleted_asset = await db.pdf_assets.find_one_and_delete(
                {"pdf_hash": pdf_hash, "owners": {"$size": 0}}
            )
            is_final_owner = bool(deleted_asset)
    else:
        remaining_owners = await db.pdfs.count_documents({"pdf_hash": pdf_hash})
        is_final_owner = (remaining_owners == 0)

    if is_final_owner:
        if pdf_url:
            try:
                delete_file_from_cloudinary(pdf_url)
            except Exception as e:
                print(f"Warning: Cloudinary deletion error: {e}")

        await db.schedules.delete_many({"pdf_hash": pdf_hash})
        await db.contents.delete_many({"pdf_hash": pdf_hash})
        await db.mcqs.delete_many({"pdf_hash": pdf_hash})
        await db.day_notes.delete_many({"pdf_hash": pdf_hash})


async def get_user_books_with_progress(user_id: str):
    """
    Returns all uploaded books for user with study & performance progress.
    """
    pdfs = await db.pdfs.find({"user_id": user_id}).to_list(length=100)
    progress_docs = await db.study_progress.find({"user_id": user_id}).to_list(length=100)
    study_progress_map = {p["pdf_hash"]: p.get("study_progress", 0) for p in progress_docs}

    books = []
    for pdf_doc in pdfs:
        pdf_hash = pdf_doc["pdf_hash"]
        perf_doc = await db.performance.find_one({"user_id": user_id, "pdf_hash": pdf_hash})

        performance_progress = 0
        if perf_doc and perf_doc.get("day_wise_scores"):
            total_score = sum(int(d.get("score", 0)) for d in perf_doc["day_wise_scores"])
            total_questions = sum(int(d.get("total_questions", 0)) for d in perf_doc["day_wise_scores"])
            if total_questions > 0:
                performance_progress = int((total_score / total_questions) * 100)

        books.append({
            "id": pdf_hash,
            "pdf_hash": pdf_hash,
            "name": pdf_doc.get("book_name", "Untitled"),
            "image": pdf_doc.get("image_url") or "/images/dummy-book.png",
            "pdf_url": pdf_doc.get("pdf_url"),
            "study_progress": study_progress_map.get(pdf_hash, 0),
            "performance_progress": performance_progress,
        })

    return books
