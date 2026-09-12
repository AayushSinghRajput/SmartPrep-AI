from typing import Dict, Any
import tempfile
import os

from langchain_community.document_loaders import PyPDFLoader

from core.llm import get_llm
from schemas.Pdf import TableOfContents
from prompts.pdf_upload.toc import build_toc_extraction_prompt
# from prompts.pdf_upload.toc import toc_prompt

# -------------------------
# LLM setup
# -------------------------
llm = get_llm(provider='gemini',temperature=0.5)
structured_llm = llm.with_structured_output(TableOfContents)


# -------------------------
# TOC Extraction Service
# -------------------------
def extract_toc(file_bytes: bytes) -> Dict[str, Any]:
    """
    Extracts TOC from PDF and saves as JSON.
    output_path MUST be provided (hash-based).
    Returns: path to saved JSON file.
    """

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp_path = tmp.name
            tmp.write(file_bytes)

        # 1️⃣ Load PDF
        loader = PyPDFLoader(tmp_path)
        docs = loader.load()

        # 2️⃣ Take first ~8% pages for TOC signal (at least 1 page)
        toc_text = " ".join(
            doc.page_content
            for doc in docs[: max(1, len(docs) // 12)]
        )
      
        # 3️⃣ Build prompt (delegated)
        prompt = build_toc_extraction_prompt(toc_text)

        # 4️⃣ Invoke structured LLM
        toc_result: TableOfContents = structured_llm.invoke(prompt)

        return toc_result.model_dump()

    except Exception:
        # 5️⃣ Graceful fallback (important for robustness)
        return {}

    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                pass
