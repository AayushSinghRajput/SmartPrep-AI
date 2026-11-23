from datetime import datetime
from db.config import db

study_progress = db.study_progress

async def update_user_progress(
    user_id: str,
    pdf_hash: str,
    total_days: int,
    completed_days: int = None
) -> dict:
    """
    Updates completed_days and study_progress for a user & pdf,
    stores progress in study_progress collection.
    """

    progress_doc = await db.study_progress.find_one({
        "user_id": user_id,
        "pdf_hash": pdf_hash
    })

    if completed_days is not None:
        # Explicit count of completed days from schedule state
        final_completed = max(0, min(int(completed_days), int(total_days)))
    elif progress_doc:
        final_completed = min(int(progress_doc.get("completed_days", 0)), int(total_days))
    else:
        final_completed = 1

    study_progress = round((final_completed / total_days) * 100, 2) if total_days > 0 else 0.0

    await db.study_progress.update_one(
        {
            "user_id": user_id,
            "pdf_hash": pdf_hash
        },
        {
            "$set": {
                "completed_days": final_completed,
                "total_days": total_days,
                "study_progress": study_progress,
                "updated_at": datetime.utcnow()
            }
        },
        upsert=True
    )

    return {
        "study_progress": study_progress,
        "completed_days": final_completed,
        "total_days": total_days
    }
