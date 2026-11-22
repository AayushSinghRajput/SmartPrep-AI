from schemas.Pdf import TableOfContents



def build_toc_extraction_prompt(document_content: str):
    return [
        (
            "system",
            """You are an expert AI curriculum and syllabus architect.
Your goal is to extract a comprehensive, structured Table of Contents / Study Curriculum from documents (textbooks, research papers, lecture notes, guides).

CRITICAL RULES:
1. Complete Document Coverage:
   - Extract ALL major units, chapters, numbered sections, and sub-topics from the document.
   - For research papers, technical articles, and notes without a formal printed TOC:
     Extract all numbered and named sections throughout the document (e.g., Abstract, 1. Introduction, 2. Background, 3. Model Architecture, 3.1 Encoder/Decoder, 3.2 Attention, 3.3 Feed-Forward Networks, 4. Self-Attention, 5. Training, 6. Results, 7. Conclusion).
   - Do NOT stop after only 1 or 2 sections. Capture the full progression of topics from the beginning to the end of the document.

2. Structure Format:
   - "title": Clean descriptive title of the unit or chapter.
   - "unit": Integer unit number (or null for front matter / paper overview).
   - "sections": Array of sections under this unit, each having "title" and "page".
   - "page": The 1-based page number where the section starts (must be an integer >= 1).
   - If a chapter has no sub-sections, still add it as a section inside the "sections" list with its starting page.

3. Accuracy & Order:
   - Maintain the document's original logical order.
   - Ensure page numbers accurately reflect the page markers in the text.
"""
        ),
        (
            "user",
            f"""Extract the complete, structured table of contents / study curriculum from the following document content:

{document_content}
"""
        )
    ]



