# PRD: SmartPrep-AI (+2 Science Entrance Preparation Platform)

## Overview
SmartPrep-AI is an AI-powered entrance examination and learning platform tailored for **+2 Science students across Nepal** preparing for board exams (NEB) and competitive engineering/medical entrance tests (**IOE Entrance** and **CEE Medical Entrance**).

---

## Active Tasks & Technical Specifications

### Task 1: Schedule & Textbook Processing Pipeline (Citation Metadata Ingestion)
Verify PDF Table of Contents (TOC) extraction and day-wise study schedule generator for the +2 Science curriculum (Physics, Chemistry, Mathematics, Biology).

#### Citation Metadata Ingestion Specification:
To support end-to-end evidence citation in downstream RAG queries, the ingestion pipeline (PDF Upload -> PyPDF/OCR -> Semantic Chunking -> FAISS Indexing) **must preserve citation metadata** on every extracted chunk without loss:
- **Chunk Metadata Schema**:
  ```json
  {
    "chunk_id": "string (UUID)",
    "document_id": "string (MongoDB Document Reference)",
    "filename": "string (Original textbook filename)",
    "subject": "Physics | Chemistry | Mathematics | Biology",
    "chapter_name": "string (Extracted from TOC hierarchy)",
    "page_number": "int (1-indexed physical book page number)",
    "chunk_index": "int (Sequential chunk offset in chapter)",
    "text": "string (Chunk body content)"
  }
  ```
- **Storage Contract**:
  - The vector index (FAISS) stores embedding vectors mapped to `chunk_id`.
  - MongoDB stores the full chunk object with metadata.
  - Ingestion steps must never discard or overwrite `chapter_name` or `page_number` during text normalization or chunk splitting.

---

### Task 2: Mock Exam & MCQ Engine (Scoring Rules, Authority & Percentage Semantics)
Enhance the mock test system with strict adherence to Nepal entrance examination standards.

#### 1. IOE Entrance Exam (Engineering)
- **Exam Format & Context**: 100 multiple-choice questions carrying a total of 140 marks delivered via a Computer-Based Test (CBT) format.
  - **Duration**: 2 Hours (120 minutes)
  - **1-Mark Questions**: 60 Questions (Mathematics: 16, Physics: 20, Chemistry: 10, English: 14)
  - **2-Mark Questions**: 40 Questions (Mathematics: 22, Physics: 10, Chemistry: 4, English: 4)
- **Negative Marking Scheme**: **10% penalty for every incorrect answer**.
  - If a question carries 1 mark, **0.1 marks** are deducted for a wrong answer.
  - If a question carries 2 marks, **0.2 marks** are deducted for a wrong answer.
  - Correct answers award full marks (+1.0 or +2.0 respectively).
  - Unattempted questions carry zero marks (no deduction).

#### 2. IOM / Medical Common Entrance Examination (CEE)
- **Exam Format & Context**: The undergraduate medical entrance exam consists of 200 multiple-choice questions carrying a total of 200 marks.
  - **Duration**: 3 Hours (180 minutes)
  - **Subject Distribution**: Biology: 80 (Zoology: 40, Botany: 40), Chemistry: 50, Physics: 50, Mental Agility Test (MAT): 20
- **Negative Marking Scheme**: **0.25 marks deducted for every incorrect response**.
  - Each correct answer carries 1 mark (+1.0 mark).
  - For every incorrect answer, **0.25 marks (1/4th of a mark)** are subtracted from the total score.
  - Unattempted questions carry zero marks (no deduction).

#### 3. NEB Board / Day-Wise Practice MCQs
- **Scoring Scheme**: +1.0 mark for correct, 0.0 marks for incorrect/unattempted (no negative marking).

#### 4. Authoritative Scoring Source:
- **Single Source of Truth**: The **FastAPI backend (`server/services/mock_exam/` / `server/routes/mock_routes.py`) is the sole authoritative scoring engine**.
- **Role Separation**:
  - **Client-Side (`client/utils/calculateScore.js`)**: Serves only as an optimistic, instant UI display calculator for immediate candidate feedback.
  - **Backend Authority**: On submission, the client submits only the raw answer map: `{ [question_id]: selected_option }`. The backend re-evaluates each question against database truth, applies official negative penalty formulas, and produces the canonical result to prevent tampering.

#### 5. Percentage Semantics & Persistence Contract:
- **Mathematical Formula**:
  $$\text{Percentage} = \max\left(0.00, \text{round}\left(\frac{\text{net\_score}}{\text{total\_marks}} \times 100, 2\right)\right)$$
- **Boundary & Negative Score Semantics**:
  - Because negative marking can mathematically result in a negative raw score (e.g., candidate gets zero correct and all wrong), **persisted percentage is strictly clamped to `0.00%`** (bounded within `[0.00, 100.00]`).
  - Raw `net_score` retains its true decimal signed value for auditing (e.g., `-14.00`), but `percentage` will never persist as a negative number.
- **MongoDB Persistence Document Schema**:
  ```json
  {
    "user_id": "string",
    "mock_id": "string",
    "mock_type": "Engineering | Medical",
    "earned_marks": "float (sum of positive marks)",
    "negative_penalty": "float (total deduction from incorrect answers)",
    "net_score": "float (earned_marks - negative_penalty)",
    "total_marks": "int (140 for IOE, 200 for CEE)",
    "percentage": "float (clamped between 0.00 and 100.00, 2 decimal places)",
    "correct_count": "int",
    "wrong_count": "int",
    "unattempted_count": "int",
    "answers": { "question_id": "selected_option" },
    "submitted_at": "datetime (ISO 8601)"
  }
  ```

---

### Task 3: KaTeX Mathematical & Scientific Formula Rendering
Ensure all AI-generated content, MCQs, solutions, and chatbot responses in the Next.js client render scientific equations and chemical formulas accurately using KaTeX without markdown parsing breaks:
- Delimiters: Inline `$..$` and block `$$..$$`.
- Support chemical equations and mathematical matrices without unescaped symbol collisions.

---

### Task 4: RAG AI Study Assistant & Doubt Clarifier (No-Evidence Policy)
Optimize vector retrieval (FAISS) and LLM context window to provide syllabus-accurate doubt resolution for students.

#### 1. No-Evidence Behavior Policy:
When a student queries the AI assistant and the vector similarity score fails to satisfy the retrieval relevance threshold (e.g., cosine similarity < 0.65 or distance threshold in FAISS):
- **Zero Hallucination / No Fabrication**: The assistant **must not invent textbook citations** or fabricate imaginary page numbers/chapters.
- **Deterministic Response Protocol**:
  1. **Primary Statement**: Clearly state that the uploaded textbook material does not contain sufficient direct evidence:
     > *"I could not find direct evidence for this topic in your uploaded textbook."*
  2. **Controlled General Fallback**: The assistant may provide general conceptual guidance based on the standard Nepal +2 Science syllabus (NEB/IOE/CEE), but **must explicitly label it with a warning**:
     > *"[General Curriculum Concept — Not verified in uploaded book]"*
  3. **Empty Citation Payload**: In no-evidence responses, the `citations` list in the API payload must be strictly empty: `citations: []`.

#### 2. Citation Verification:
When evidence is present, answers must cite verified metadata preserved from Task 1:
- Format: `[Source: Chapter Name, Page X]` linked directly to the matching `chunk_id`.
