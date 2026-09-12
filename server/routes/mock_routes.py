from fastapi import APIRouter, Depends
from services.mock_exam.mock_service import (
    create_mock_test,
    get_mock_test,
    evaluate_and_submit_mock
)
from schemas.Mock import Mock, MockSubmission
from middleware.auth_middleware import get_current_user

router = APIRouter(
    prefix="/api/exams",
    tags=["Mock Exams"]
)


@router.post("/", status_code=201)
async def create_mock(
    mock_data: Mock,
    current_user=Depends(get_current_user)
): 
    _ = current_user  # tell linters it's intentionally unused
    return await create_mock_test(mock_data)


@router.post("/submit", status_code=200)
async def submit_mock(
    submission: MockSubmission,
    current_user=Depends(get_current_user)
):
    """
    Authoritative server-side evaluation and submission of mock test.
    Requires student authentication.
    """
    user_id = current_user.get("id") if isinstance(current_user, dict) else str(current_user)
    return await evaluate_and_submit_mock(submission, user_id=user_id)



@router.get("/{mock_type}")
async def fetch_mock(
    mock_type: str,
    current_user=Depends(get_current_user)
):
    _ = current_user  
    return await get_mock_test(mock_type)


