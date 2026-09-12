from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Query,
    HTTPException,
    Depends,
    Response,
    Form,
    BackgroundTasks,
)
from db.config import db
from db.cloudinary import upload_image_to_cloudinary_bytes
from schemas.Content import UploadScheduleResponse
from middleware.auth_middleware import get_current_user
from services.rag.ingest import ingest_pdf_for_rag
from services.pdf_upload.study_scheduler import generate_study_schedule_from_toc
from services.pdf_upload.pdf_handler import (
    process_pdf_upload,
    resolve_or_create_schedule,
    delete_user_pdf_and_data,
    get_user_books_with_progress,
)

router = APIRouter(prefix="/api/study", tags=["Study Plan"])


@router.post(
    "/upload-and-schedule",
    response_model=UploadScheduleResponse,
    summary="Upload PDF and generate study schedule",
    description="Upload a PDF file and specify number of study days. Returns structured study schedule.",
)
async def upload_pdf_and_generate_schedule(
    response: Response,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to upload"),
    book_name: str = Form(..., description="Book name from frontend"),
    days: int = Query(..., gt=0, description="Number of study days"),
    current_user=Depends(get_current_user),
):
    try:
        pdf_bytes = await file.read()
        if not pdf_bytes:
            raise HTTPException(status_code=400, detail="Uploaded file is empty")

        upload_result = await process_pdf_upload(
            pdf_bytes=pdf_bytes,
            book_name=book_name,
            user_id=current_user["id"],
        )

        pdf_hash = upload_result["pdf_hash"]
        toc_data = upload_result["toc_data"]
        pdf_cached = upload_result["pdf_cached"]

        # Run RAG ingestion in background if not cached
        if not pdf_cached:
            background_tasks.add_task(
                ingest_pdf_for_rag,
                pdf_hash,
                upload_result["pdf_bytes"],
            )

        schedule_result = await resolve_or_create_schedule(
            pdf_hash=pdf_hash,
            days=days,
            toc_data=toc_data,
            pdf_bytes=upload_result["pdf_bytes"],
        )

        return UploadScheduleResponse(
            status="success",
            status_code=200,
            message="Study schedule generated successfully",
            pdf_hash=pdf_hash,
            book_name=upload_result["book_name"],
            days=days,
            schedule=schedule_result["schedule"],
            cached=pdf_cached and schedule_result["cached"],
            image_url=upload_result["image_url"],
            is_fallback=schedule_result["is_fallback"],
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete-pdf/{pdf_hash}", summary="Delete PDF and all related data")
async def delete_pdf(
    pdf_hash: str,
    current_user=Depends(get_current_user),
):
    try:
        await delete_user_pdf_and_data(pdf_hash, current_user["id"])
        return {
            "status": "success",
            "message": "PDF and all related data deleted successfully",
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/update-image", summary="Upload or update book image")
async def update_book_image(
    pdf_hash: str = Query(...),
    image: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed")

    image_bytes = await image.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty image file")

    image_url = await upload_image_to_cloudinary_bytes(image_bytes)

    result = await db.pdfs.update_one(
        {"pdf_hash": pdf_hash, "user_id": current_user["id"]},
        {"$set": {"image_url": image_url}},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="PDF not found")

    return {"status": "success", "image_url": image_url}


@router.get("/my-books", summary="Get all uploaded PDFs with progress")
async def get_user_books(current_user=Depends(get_current_user)):
    try:
        books = await get_user_books_with_progress(current_user["id"])
        return {"status": "success", "books": books}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/book-schedule/{pdf_hash}", summary="Get study schedule for a specific book")
async def get_book_schedule(
    pdf_hash: str,
    days: int = Query(None, description="Number of study days, optional"),
    current_user=Depends(get_current_user),
):
    try:
        pdf_doc = await db.pdfs.find_one({"pdf_hash": pdf_hash, "user_id": current_user["id"]})
        if not pdf_doc:
            raise HTTPException(status_code=404, detail="PDF not found")

        query = {"pdf_hash": pdf_hash}
        if days:
            query["days"] = days
        schedule_doc = await db.schedules.find_one(query)

        if not schedule_doc:
            default_days = days or 7
            toc_data = pdf_doc.get("toc")
            schedule = []
            if toc_data and isinstance(toc_data, dict) and any(k in toc_data for k in ("table_of_contents", "tableOfContents", "toc")):
                schedule = generate_study_schedule_from_toc(
                    toc_data=toc_data,
                    total_days=default_days,
                )
            if schedule:
                await db.schedules.update_one(
                    {"pdf_hash": pdf_hash, "days": default_days},
                    {"$set": {"schedule": schedule}},
                    upsert=True,
                )
        else:
            schedule = schedule_doc["schedule"]

        return {
            "status": "success",
            "pdf_hash": pdf_hash,
            "book_name": pdf_doc.get("book_name", "Untitled"),
            "days": days or len(schedule),
            "schedule": schedule,
            "image": pdf_doc.get("image_url"),
            "pdf_url": pdf_doc.get("pdf_url"),
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
