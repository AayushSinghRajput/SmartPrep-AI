import os
import pytest
from fastapi.testclient import TestClient

# Set test environment
os.environ.setdefault("ENV", "test")

from core.config import settings
from main import app

client = TestClient(app, raise_server_exceptions=False)


def test_settings_loaded():
    """Verify application settings configuration."""
    assert settings.DB_NAME is not None
    assert settings.JWT_ALGORITHM == "HS256"
    assert isinstance(settings.ALLOWED_ORIGINS, str)


def test_root_endpoint():
    """Verify backend root health ping endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["message"] == "Backend is running"


def test_health_check_endpoint():
    """Verify backend explicit /health endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data.get("status") == "healthy"
    assert data.get("service") == "SmartPrep-AI Backend"
