from typing import Dict, Any, List
import tempfile
import os
import fitz

from langchain_community.document_loaders import PyPDFLoader
from core.llm import get_llm
from schemas.Pdf import TableOfContents
from prompts.pdf_upload.toc import build_toc_extraction_prompt


def extract_native_toc(doc) -> Dict[str, Any] | None:
    """
    Extract embedded PDF bookmarks/outline if available.
    Returns TOC dict if at least 3 valid entries exist.
    """
    try:
        toc = doc.get_toc()  # [[lvl, title, page_1_based], ...]
        if not toc or len(toc) < 3:
            return None

        units: List[Dict[str, Any]] = []
        current_unit = None

        for item in toc:
            lvl, raw_title, page = item[0], str(item[1]).strip(), max(1, int(item[2]))
            if not raw_title:
                continue

            if lvl == 1 or not current_unit:
                current_unit = {
                    "unit": len(units) + 1,
                    "title": raw_title,
                    "sections": [{"title": raw_title, "page": page}],
                }
                units.append(current_unit)
            else:
                current_unit["sections"].append({"title": raw_title, "page": page})

        if units and sum(len(u["sections"]) for u in units) >= 3:
            return {"table_of_contents": units}
    except Exception as e:
        print(f"Notice: Native PDF outline extraction skipped: {e}")
    return None


def extract_toc(file_bytes: bytes) -> Dict[str, Any]:
    """
    Extracts structured TOC from PDF:
    1. First tries native PDF bookmarks (instant, 100% accurate).
    2. Otherwise uses LLM on full document text (for short papers <= 35 pages)
       or TOC/Contents pages (for long textbooks).
    """
    doc = None
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        total_pages = len(doc)
        if total_pages == 0:
            return {}

        # 1️⃣ Check native PDF bookmarks outline first
        native_toc = extract_native_toc(doc)
        if native_toc:
            print(f"✅ Native PDF bookmarks found with {len(native_toc['table_of_contents'])} units.")
            return native_toc

        # 2️⃣ Prepare text for LLM extraction
        # If <= 35 pages (research paper / notes / chapter): sample all pages!
        if total_pages <= 35:
            page_samples = []
            for p_idx in range(total_pages):
                text = doc[p_idx].get_text().strip()
                if text:
                    # Keep first ~2000 chars per page to capture headings and structure
                    page_samples.append(f"=== PAGE {p_idx + 1} ===\n{text[:2000]}")
            document_content = "\n\n".join(page_samples)
        else:
            # Long book (> 35 pages): Search for Table of Contents pages in the first 30 pages
            toc_pages = []
            for p_idx in range(min(30, total_pages)):
                text = doc[p_idx].get_text()
                lower = text.lower()
                if any(k in lower for k in ("table of contents", "contents", "table des matières", "inhaltsverzeichnis")):
                    toc_pages.append(p_idx)

            if toc_pages:
                pages_to_extract = set()
                for p in toc_pages:
                    for offset in range(-1, 5):
                        if 0 <= p + offset < total_pages:
                            pages_to_extract.add(p + offset)
                sorted_pages = sorted(list(pages_to_extract))
                document_content = "\n\n".join(
                    f"=== PAGE {p + 1} ===\n{doc[p].get_text()[:2500]}"
                    for p in sorted_pages
                )
            else:
                # Sample the first 16 pages
                document_content = "\n\n".join(
                    f"=== PAGE {p + 1} ===\n{doc[p].get_text()[:2000]}"
                    for p in range(min(16, total_pages))
                )

        # 3️⃣ Call LLM with active provider (auto-detected or configured)
        llm = get_llm(temperature=0.2)
        structured_llm = llm.with_structured_output(TableOfContents)

        prompt = build_toc_extraction_prompt(document_content)
        toc_result: TableOfContents = structured_llm.invoke(prompt)

        return toc_result.model_dump()

    except Exception as e:
        print(f"TOC extraction error: {e}")
        return {}
    finally:
        if doc is not None:
            doc.close()
