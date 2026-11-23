from pydantic import BaseModel
from typing import Optional

class ProgressUpdateRequest(BaseModel):
    pdf_hash: str         # Unique identifier of the PDF
    total_days: int       # Total days in the schedule
    completed_days: Optional[int] = None  # Count of completed days

class ProgressUpdateResponse(BaseModel):
    study_progress: float       # Study Progress percentage (0-100)
    completed_days: int         # Count of completed days
    total_days: int             # Total days in schedule
