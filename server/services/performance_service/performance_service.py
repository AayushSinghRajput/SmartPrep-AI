from db.config import db
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException, status
from utils.performance_service import calculate_performance

performance_collection = db.performance


async def submit_mcq_score(user_id: str, payload):
    # Check if performance already exists for this PDF
    performance = await performance_collection.find_one({
        "user_id": user_id,
        "pdf_hash": payload.pdf_hash
    })

    # 📊 Calculate percentage & performance level
    percentage, level = calculate_performance(
        payload.score,
        payload.total_questions
    )

    # 📅 Day-wise performance object
    new_day = {
        "day": payload.day,
        "score": payload.score,
        "total_questions": payload.total_questions,
        "percentage": percentage,
        "performance_level": level,
        "submitted_at": datetime.utcnow()
    }

    # ❌ Prevent re-attempt for same day
    if performance:
        for d in performance["day_wise_scores"]:
            if d["day"] == payload.day:
                raise HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="MCQs already attempted for this day"
)

        # ➕ Update total score
        new_total = performance["total_score"] + payload.score

        # 📝 Update existing document
        await performance_collection.update_one(
            {"_id": performance["_id"]},
            {
                "$push": {"day_wise_scores": new_day},
                "$set": {"total_score": new_total}
            }
        )

        # ✅ Return everything frontend needs
        return {
            "total_score": new_total,
            "performance_level": level,
            "day": payload.day
        }

    # 🆕 First attempt for this PDF
    await performance_collection.insert_one({
        "user_id": user_id,
        "pdf_hash": payload.pdf_hash,
        "total_score": payload.score,
        "day_wise_scores": [new_day],
        "created_at": datetime.utcnow()
    })

    # ✅ Return response for frontend
    return {
        "total_score": payload.score,
        "performance_level": level,
        "day": payload.day
    }


async def get_dashboard_stats(user_id: str):
    """
    Computes dynamic user study and performance analytics:
    - Overall preparation completion percentage across active books
    - Current consecutive daily study streak
    - Overall quiz accuracy and retention status
    - Total MCQs solved and correct count
    - Next up topic/chapter from active schedule
    - Readiness index (0 - 100)
    """
    # 1. Fetch user's books & study progress
    pdfs = await db.pdfs.find({"user_id": user_id}).to_list(length=100)
    progress_docs = await db.study_progress.find({"user_id": user_id}).to_list(length=100)
    progress_map = {p["pdf_hash"]: p for p in progress_docs}

    # 2. Fetch all performance records for user
    perf_docs = await performance_collection.find({"user_id": user_id}).to_list(length=100)

    # 3. Aggregate MCQ scores
    all_scores = [d for p in perf_docs for d in p.get("day_wise_scores", [])]
    total_questions = sum(int(d.get("total_questions", 0)) for d in all_scores)
    total_correct = sum(int(d.get("score", 0)) for d in all_scores)

    quiz_accuracy = round((total_correct / total_questions) * 100) if total_questions > 0 else 0
    if total_questions == 0:
        accuracy_label = "No Quizzes Yet"
        accuracy_color = "slate"
    elif quiz_accuracy >= 80:
        accuracy_label = "High Retention"
        accuracy_color = "emerald"
    elif quiz_accuracy >= 60:
        accuracy_label = "Good Progress"
        accuracy_color = "indigo"
    else:
        accuracy_label = "Needs Revision"
        accuracy_color = "amber"

    # 4. Overall completion calculation
    total_completed_days = sum(int(p.get("completed_days", 0)) for p in progress_docs)
    total_days_all = sum(int(p.get("total_days", 0)) for p in progress_docs)
    overall_completion = round((total_completed_days / total_days_all) * 100) if total_days_all > 0 else 0

    # 5. Determine active book and "Next Up"
    active_book_info = None
    next_up_title = "Chapter 1 Review & Quiz"

    if pdfs:
        # Sort progress docs by updated_at descending
        sorted_progress = sorted(
            progress_docs,
            key=lambda x: x.get("updated_at") or datetime.min,
            reverse=True
        )

        active_hash = sorted_progress[0]["pdf_hash"] if sorted_progress else pdfs[0]["pdf_hash"]
        matched_pdf = next((b for b in pdfs if b["pdf_hash"] == active_hash), pdfs[0])
        active_progress = progress_map.get(active_hash, {})

        comp_days = int(active_progress.get("completed_days", 0))
        tot_days = int(active_progress.get("total_days", 0))
        next_day = comp_days + 1 if (tot_days == 0 or comp_days < tot_days) else comp_days

        # Try to find chapter title from schedule
        schedule_doc = await db.schedules.find_one({"pdf_hash": active_hash})
        if schedule_doc and schedule_doc.get("schedule"):
            sched_items = schedule_doc["schedule"]
            next_item = next((item for item in sched_items if item.get("day") == next_day), None)
            if next_item:
                chapter_name = next_item.get("chapter") or next_item.get("topic") or f"Chapter {next_day}"
                next_up_title = f"Day {next_day}: {chapter_name} Review & Quiz"
            else:
                next_up_title = f"Day {next_day} Review & Quiz"
        else:
            next_up_title = f"Day {next_day}: Review & Quiz"

        active_book_info = {
            "pdf_hash": active_hash,
            "name": matched_pdf.get("book_name", "Active Textbook"),
            "study_progress": int(active_progress.get("study_progress", 0)),
            "completed_days": comp_days,
            "total_days": tot_days
        }

    # 6. Consecutive Study Streak Calculation
    activity_dates = set()
    for d in all_scores:
        dt = d.get("submitted_at")
        if isinstance(dt, datetime):
            activity_dates.add(dt.date())
    for p in progress_docs:
        dt = p.get("updated_at")
        if isinstance(dt, datetime):
            activity_dates.add(dt.date())

    now_date = datetime.now(timezone.utc).date()
    yesterday = now_date - timedelta(days=1)

    streak = 0
    studied_today = now_date in activity_dates
    streak_active = studied_today or (yesterday in activity_dates)

    if streak_active:
        # Count consecutive days backwards
        check_date = now_date if studied_today else yesterday
        while check_date in activity_dates:
            streak += 1
            check_date -= timedelta(days=1)

    if streak == 0:
        streak_label = "Start Today"
        streak_sub = "Complete a study session or quiz today to start your streak!"
    elif streak == 1:
        streak_label = "On Track"
        streak_sub = "Day 1 complete! Study tomorrow to keep your momentum."
    else:
        streak_label = "On Track"
        streak_sub = f"Daily study goal achieved {streak} days in a row."

    # 7. Readiness index (0 - 100)
    if total_questions > 0:
        readiness_index = min(100, round(0.45 * overall_completion + 0.55 * quiz_accuracy))
    else:
        readiness_index = min(100, round(overall_completion * 0.75))

    return {
        "success": True,
        "overall_completion": overall_completion,
        "total_completed_days": total_completed_days,
        "total_study_days": total_days_all,
        "current_streak": streak,
        "streak_label": streak_label,
        "streak_sub": streak_sub,
        "studied_today": studied_today,
        "quiz_accuracy": quiz_accuracy,
        "accuracy_label": accuracy_label,
        "accuracy_color": accuracy_color,
        "total_questions_solved": total_questions,
        "total_correct": total_correct,
        "active_books_count": len(pdfs),
        "readiness_index": readiness_index,
        "next_up": next_up_title,
        "active_book": active_book_info
    }
