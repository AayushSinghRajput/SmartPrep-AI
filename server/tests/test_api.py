import os
import pytest

# Ensure test environment variables are set before any server module is imported
os.environ["ENV"] = "test"
os.environ["DB_NAME"] = "smartprep-ai-test"
os.environ["JWT_SECRET"] = "smartprep_jwt_secret_key_change_in_prod"
os.environ["GOOGLE_API_KEY"] = "dummy-test-key-for-ci"
os.environ["ALLOWED_ORIGINS"] = "*"

from core.config import settings
from schemas.contact import ContactCreate
from schemas.chatbot import ChatRequest


def test_settings_loaded():
    """Verify application settings configuration defaults."""
    assert settings.DB_NAME is not None
    assert settings.JWT_ALGORITHM == "HS256"
    assert isinstance(settings.ALLOWED_ORIGINS, str)


def test_contact_schema_validation():
    """Verify Contact schema validation."""
    contact = ContactCreate(name="Student", email="student@example.com", message="Need study guidance")
    assert contact.name == "Student"
    assert contact.email == "student@example.com"
    assert contact.message == "Need study guidance"


def test_chatbot_schema_validation():
    """Verify Chatbot request schema validation."""
    chat = ChatRequest(
        user_id="user_123",
        pdf_hash="hash_abc456",
        day=1,
        topic=0,
        subtopic=0,
        message="Explain Newton's third law"
    )
    assert chat.user_id == "user_123"
    assert chat.day == 1
    assert chat.message == "Explain Newton's third law"


def test_root_endpoint_direct():
    """Verify root endpoint function directly."""
    from main import root
    res = root()
    assert res == {"message": "Backend is running"}


def test_health_check_endpoint_direct():
    """Verify health check endpoint function directly."""
    from main import health_check
    res = health_check()
    assert res["status"] == "healthy"
    assert res["service"] == "SmartPrep-AI Backend"


def test_app_routes_registered():
    """Verify FastAPI application and its core router paths exist."""
    from main import app
    route_paths = [getattr(route, "path", "") for route in app.routes]
    assert "/" in route_paths
    assert "/health" in route_paths
    assert "/api/auth/github" in route_paths
    assert "/api/auth/otp/send" in route_paths
    assert "/api/auth/otp/verify" in route_paths
