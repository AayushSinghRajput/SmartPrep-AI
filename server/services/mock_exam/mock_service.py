import logging
import hashlib
import json
from fastapi import HTTPException, status
from db.config import db
from schemas.Mock import Mock
from typing import List, Dict, Any, Optional
from bson import ObjectId
from datetime import datetime

logger = logging.getLogger(__name__)

mock_collection = db["mocks"]


# ---------- Helper ----------
def serialize_mock(mock: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert MongoDB document to JSON-serializable dict
    """
    mock["_id"] = str(mock["_id"])
    return mock


# ---------- Create Mock ----------
async def create_mock_test(mock_data: Mock):
    try:
        mock_dict = mock_data.dict()
        result = await mock_collection.insert_one(mock_dict)
        mock_dict["_id"] = str(result.inserted_id)

        return {
            "success": True,
            "statusCode": 201,
            "message": "Mock saved successfully",
            "data": mock_dict
        }
    except Exception as e:
        logger.error("Failed to create mock test: %s", e, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create mock test"
        )


# ---------- Get Mock by Type ----------
async def get_mock_test(mock_type: str):
    try:
        mocks = await mock_collection.find(
            {"mock_type": mock_type}
        ).to_list(length=None)

        if not mocks:
            return {
                "success": True,
                "statusCode": 200,
                "message": "No mock exams found",
                "data": []
            }

        serialized_mocks = [serialize_mock(mock) for mock in mocks]

        return {
            "success": True,
            "statusCode": 200,
            "message": "Mock Exam fetched successfully",
            "data": serialized_mocks
        }
    except Exception as e:
        logger.error("Failed to fetch mock exams for type %s: %s", mock_type, e, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch mock exams"
        )


# ---------- Evaluate and Submit Mock (Authoritative Server-Side Scoring) ----------
async def evaluate_and_submit_mock(submission_data: Any, user_id: Any = None):
    """
    Authoritative server-side grading and submission persistence.
    Applies Nepal Entrance Examination rules derived strictly from the stored mock:
    - IOE (Engineering): 10% negative penalty (-0.1 for 1-mark, -0.2 for 2-mark)
    - IOM / CEE (Medical): 0.25 marks penalty per incorrect answer
    - Percentage is strictly clamped to [0.00, 100.00]

    Ensures idempotent persistence via unique submission_id / upsert and
    safely logs database errors without leaking internal DB exception details.
    """
    mock_id = getattr(submission_data, "mock_id", None) or (submission_data.get("mock_id") if isinstance(submission_data, dict) else None)
    answers = getattr(submission_data, "answers", None) or (submission_data.get("answers", {}) if isinstance(submission_data, dict) else {})
    submission_id = getattr(submission_data, "submission_id", None) or (submission_data.get("submission_id") if isinstance(submission_data, dict) else None)

    if not mock_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mock ID is required for submission"
        )

    # Normalize user_id and establish idempotency key
    normalized_user_id = str(user_id) if user_id is not None else "anonymous"
    if not submission_id:
        content_hash = hashlib.sha256(
            f"{normalized_user_id}:{mock_id}:{json.dumps(answers, sort_keys=True)}".encode("utf-8")
        ).hexdigest()
        submission_id = f"sub_{content_hash[:16]}"
    else:
        submission_id = str(submission_id)

    filter_query = {
        "user_id": normalized_user_id,
        "mock_id": str(mock_id),
        "submission_id": submission_id
    }

    # Idempotent fast-path: check if this submission was already successfully persisted
    try:
        existing = await db["mock_submissions"].find_one(filter_query)
        if existing:
            return {
                "success": True,
                "statusCode": 200,
                "message": "Mock exam submitted and evaluated successfully",
                "data": {
                    "submission_id": submission_id,
                    "score": existing.get("net_score"),
                    "scoreDetails": {
                        "total": existing.get("net_score"),
                        "correctCount": existing.get("correct_count"),
                        "wrongCount": existing.get("wrong_count"),
                        "unattemptedCount": existing.get("unattempted_count"),
                        "earnedMarks": existing.get("earned_marks"),
                        "negativePenalty": existing.get("negative_penalty"),
                        "maxMarks": existing.get("total_marks"),
                        "percentage": existing.get("percentage")
                    }
                }
            }
    except Exception as e:
        logger.error("Error checking existing submission for %s: %s", filter_query, e, exc_info=True)

    # Fetch stored mock from database
    try:
        mock = await mock_collection.find_one({"mock_id": mock_id})
        if not mock:
            try:
                mock = await mock_collection.find_one({"_id": ObjectId(mock_id)})
            except Exception:
                mock = None
    except Exception as e:
        logger.error("Failed to query mock exam by ID %s: %s", mock_id, e, exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve mock exam from database"
        )

    # 1. Reject submissions when the mock does not exist
    if not mock:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Mock exam with ID '{mock_id}' not found"
        )

    # 2. Derive scoring rules strictly from the stored mock document
    stored_mock_type_raw = str(mock.get("mock_type", ""))
    stored_mock_type_lower = stored_mock_type_raw.lower()

    is_ioe = "eng" in stored_mock_type_lower or "ioe" in stored_mock_type_lower
    is_medical = "med" in stored_mock_type_lower or "iom" in stored_mock_type_lower or "cee" in stored_mock_type_lower

    total_marks = int(mock.get("total_marks") or (140 if is_ioe else 200))
    questions = mock.get("questions", [])

    correct_count = 0
    wrong_count = 0
    unattempted_count = 0
    earned_marks = 0.0
    negative_penalty = 0.0

    for index, q in enumerate(questions):
        q_marks = float(q.get("marks", 1))
        # Match answer either by index (str or int) or by question_id
        q_id = q.get("question_id", str(index))
        user_ans = answers.get(str(index)) or answers.get(index) or answers.get(q_id)

        if user_ans is None or user_ans == "":
            unattempted_count += 1
            continue

        if user_ans == q.get("correct_option"):
            correct_count += 1
            earned_marks += q_marks
        else:
            wrong_count += 1
            if is_ioe:
                negative_penalty += q_marks * 0.1
            elif is_medical:
                negative_penalty += 0.25

    raw_total = earned_marks - negative_penalty
    net_score = round(raw_total, 2)
    negative_penalty = round(negative_penalty, 2)
    percentage = max(0.00, round((net_score / total_marks) * 100, 2)) if total_marks > 0 else 0.00

    submission_doc = {
        "user_id": normalized_user_id,
        "mock_id": str(mock_id),
        "submission_id": submission_id,
        "mock_type": stored_mock_type_raw,
        "earned_marks": earned_marks,
        "negative_penalty": negative_penalty,
        "net_score": net_score,
        "total_marks": total_marks,
        "percentage": percentage,
        "correct_count": correct_count,
        "wrong_count": wrong_count,
        "unattempted_count": unattempted_count,
        "answers": answers,
        "submitted_at": datetime.utcnow(),
        "created_at": datetime.utcnow()
    }

    # 3. Use first-write-wins persistence for the idempotency key and do not expose database exception text
    try:
        update_result = await db["mock_submissions"].update_one(
            filter_query,
            {"$setOnInsert": submission_doc},
            upsert=True
        )
        if not update_result.acknowledged:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to persist mock exam submission"
            )

        # First-write-wins: If the document was already inserted by a prior/concurrent request,
        # return the original persisted score details instead of newly evaluated ones.
        if update_result.upserted_id is None:
            persisted = await db["mock_submissions"].find_one(filter_query)
            if persisted:
                return {
                    "success": True,
                    "statusCode": 200,
                    "message": "Mock exam submitted and evaluated successfully",
                    "data": {
                        "submission_id": submission_id,
                        "score": persisted.get("net_score"),
                        "scoreDetails": {
                            "total": persisted.get("net_score"),
                            "correctCount": persisted.get("correct_count"),
                            "wrongCount": persisted.get("wrong_count"),
                            "unattemptedCount": persisted.get("unattempted_count"),
                            "earnedMarks": persisted.get("earned_marks"),
                            "negativePenalty": persisted.get("negative_penalty"),
                            "maxMarks": persisted.get("total_marks"),
                            "percentage": persisted.get("percentage")
                        }
                    }
                }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(
            "Database error persisting mock submission for user_id=%s, mock_id=%s, submission_id=%s: %s",
            normalized_user_id, mock_id, submission_id, e, exc_info=True
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to persist mock exam submission"
        )

    return {
        "success": True,
        "statusCode": 200,
        "message": "Mock exam submitted and evaluated successfully",
        "data": {
            "submission_id": submission_id,
            "score": net_score,
            "scoreDetails": {
                "total": net_score,
                "correctCount": correct_count,
                "wrongCount": wrong_count,
                "unattemptedCount": unattempted_count,
                "earnedMarks": earned_marks,
                "negativePenalty": negative_penalty,
                "maxMarks": total_marks,
                "percentage": percentage
            }
        }
    }



