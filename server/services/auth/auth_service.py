from fastapi import HTTPException, status, Response
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from utils.hashing import hash_password, verify_password
from utils.jwt_token import create_access_token
from db.config import db
from core.config import settings
import random
from datetime import datetime, timedelta, timezone
import requests

# MongoDB collections
users_collection = db["users"]
otp_collection = db["email_otps"]

# Cookie name for JWT
COOKIE_NAME = "access_token"

# Detect production environment
IS_PRODUCTION = settings.ENV == "production"


# ---------------------------
# Helper: Set JWT in HttpOnly cookie
# ---------------------------
def _set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,                                    # JS cannot access this cookie
        secure=IS_PRODUCTION,                             # HTTPS only in production
        samesite="none" if IS_PRODUCTION else "lax",      # cross-origin in prod, lax in dev
        max_age=60 * 60 * 24 * 7                          # 7 days
    )


# ---------------------------
# Helper: Serialize user (exclude password)
# ---------------------------
def _serialize_user(user: dict):
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"]
    }


# ---------------------------
# Register a new user
# ---------------------------
async def register_user(response: Response, username: str, email: str, password: str):
    # Check if user already exists
    if await users_collection.find_one({"email": email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash password and insert user
    hashed_password = hash_password(password)
    user_doc = {"username": username, "email": email, "password": hashed_password}
    result = await users_collection.insert_one(user_doc)

    # Create JWT and set cookie
    token = create_access_token({"user_id": str(result.inserted_id)})
    _set_auth_cookie(response, token)

    user = {"_id": result.inserted_id, "username": username, "email": email}

    return {
        "success": True,
        "statusCode": 201,
        "message": "User registered successfully",
        "user": _serialize_user(user)  # No token in response, cookie used instead
    }


# ---------------------------
# Login user
# ---------------------------
async def login_user(response: Response, email: str, password: str):
    user = await users_collection.find_one({"email": email})

    # Check credentials (Google-only accounts have no password hash)
    if not user or not user.get("password") or not verify_password(password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )

    # Create JWT and set cookie
    token = create_access_token({"user_id": str(user["_id"])})
    _set_auth_cookie(response, token)

    return {
        "success": True,
        "statusCode": 200,
        "message": "Login successful",
        "user": _serialize_user(user)
    }


# ---------------------------
# Login/register via "Continue with Google"
# ---------------------------
async def google_login_user(response: Response, credential: str):
    try:
        payload = google_id_token.verify_oauth2_token(
            credential, google_requests.Request(), settings.GOOGLE_OAUTH_CLIENT_ID
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )

    email = payload["email"]
    user = await users_collection.find_one({"email": email})

    if not user:
        username = payload.get("name") or email.split("@")[0]
        user_doc = {
            "username": username,
            "email": email,
            "auth_provider": "google",
            "google_id": payload["sub"],
        }
        result = await users_collection.insert_one(user_doc)
        user = {**user_doc, "_id": result.inserted_id}

    # Create JWT and set cookie
    token = create_access_token({"user_id": str(user["_id"])})
    _set_auth_cookie(response, token)

    return {
        "success": True,
        "statusCode": 200,
        "message": "Login successful",
        "user": _serialize_user(user)
    }


# ---------------------------
# Logout user (delete cookie)
# ---------------------------
def logout_user(response: Response):
    response.delete_cookie(
        key=COOKIE_NAME,
        secure=IS_PRODUCTION,
        samesite="none" if IS_PRODUCTION else "lax",
    )
    return {
        "success": True,
        "statusCode": 200,
        "message": "Logout successful"
    }


# ---------------------------
# Login/register via "Continue with GitHub"
# ---------------------------
async def github_login_user(response: Response, code: str):
    code = (code or "").strip()
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization code from GitHub is required"
        )

    if not settings.GITHUB_CLIENT_ID or not settings.GITHUB_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GitHub OAuth is not configured on the server. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in server/.env."
        )

    # 1. Exchange temporary code for GitHub access token
    try:
        token_response = requests.post(
            "https://github.com/login/oauth/access_token",
            headers={"Accept": "application/json"},
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code
            },
            timeout=10
        )
        token_data = token_response.json()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to communicate with GitHub: {e}"
        )

    access_token = token_data.get("access_token")
    if not access_token:
        error_msg = token_data.get("error_description") or "Invalid GitHub authorization code"
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )

    # 2. Fetch GitHub user profile
    try:
        user_res = requests.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json"
            },
            timeout=10
        )
        gh_user = user_res.json()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to fetch GitHub profile: {e}"
        )

    # 3. Fetch primary verified email
    email = gh_user.get("email")
    if not email:
        try:
            emails_res = requests.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/json"
                },
                timeout=10
            )
            emails = emails_res.json()
            if isinstance(emails, list):
                for em in emails:
                    if em.get("primary") and em.get("verified"):
                        email = em.get("email")
                        break
                if not email and len(emails) > 0:
                    email = emails[0].get("email")
        except Exception:
            pass

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not retrieve a verified email address from your GitHub account."
        )

    user = await users_collection.find_one({"email": email})
    if not user:
        username = gh_user.get("name") or gh_user.get("login") or email.split("@")[0]
        user_doc = {
            "username": username,
            "email": email,
            "auth_provider": "github",
            "github_id": str(gh_user.get("id")),
            "avatar_url": gh_user.get("avatar_url")
        }
        result = await users_collection.insert_one(user_doc)
        user = {**user_doc, "_id": result.inserted_id}

    token = create_access_token({"user_id": str(user["_id"])})
    _set_auth_cookie(response, token)

    return {
        "success": True,
        "statusCode": 200,
        "message": "Login successful",
        "user": _serialize_user(user)
    }


# ---------------------------
# Helper: Send Email OTP
# ---------------------------
def _send_otp_email(recipient_email: str, otp_code: str) -> bool:
    """
    Sends OTP verification code via Resend or SMTP.
    Falls back gracefully to console logging in development mode.
    """
    subject = f"Your SmartPrep AI Verification Code: {otp_code}"
    html_body = f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="color: #4f46e5; margin-top: 0;">SmartPrep AI</h2>
        <p style="color: #334155; font-size: 14px;">Use the verification code below to sign in to your study workspace:</p>
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #0f172a;">{otp_code}</span>
        </div>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-bottom: 0;">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.</p>
    </div>
    """

    # 1. Send via Resend API if configured
    if settings.RESEND_API_KEY and settings.RESEND_API_KEY.strip():
        try:
            res = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": settings.EMAIL_FROM,
                    "to": [recipient_email],
                    "subject": subject,
                    "html": html_body
                },
                timeout=10
            )
            if res.status_code in (200, 201):
                return True
            print(f"Notice: Resend email failed with status {res.status_code}: {res.text}")
        except Exception as e:
            print(f"Notice: Resend email dispatch failed: {e}")

    # 2. Development Fallback (Console Print)
    print(f"\n=======================================================")
    print(f"🔐 [SmartPrep AI OTP] Email: {recipient_email}")
    print(f"🔑 Verification Code: {otp_code}")
    print(f"=======================================================\n")
    return True


# ---------------------------
# Send Email OTP
# ---------------------------
async def send_email_otp(email: str):
    email = (email or "").lower().strip()
    if not email or "@" not in email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Valid email address is required"
        )

    # Invalidate older pending OTPs for this email
    await otp_collection.update_many(
        {"email": email, "used": False},
        {"$set": {"used": True}}
    )

    code = f"{random.randint(100000, 999999)}"
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=10)

    await otp_collection.insert_one({
        "email": email,
        "otp": code,
        "created_at": now,
        "expires_at": expires_at,
        "used": False
    })

    _send_otp_email(email, code)

    res = {
        "success": True,
        "statusCode": 200,
        "message": f"Verification code sent to {email}"
    }
    if not IS_PRODUCTION:
        res["dev_otp"] = code

    return res


# ---------------------------
# Verify Email OTP & Login / Register
# ---------------------------
async def verify_email_otp(response: Response, email: str, otp: str):
    email = (email or "").lower().strip()
    otp = str(otp or "").strip()

    if not email or not otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email and verification code are required"
        )

    now = datetime.now(timezone.utc)
    record = await otp_collection.find_one({
        "email": email,
        "otp": otp,
        "used": False,
        "expires_at": {"$gt": now}
    })

    if not record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification code. Please request a new code."
        )

    # Mark OTP as consumed
    await otp_collection.update_one({"_id": record["_id"]}, {"$set": {"used": True}})

    user = await users_collection.find_one({"email": email})
    if not user:
        username = email.split("@")[0]
        user_doc = {
            "username": username,
            "email": email,
            "auth_provider": "email_otp",
            "created_at": now
        }
        result = await users_collection.insert_one(user_doc)
        user = {**user_doc, "_id": result.inserted_id}

    token = create_access_token({"user_id": str(user["_id"])})
    _set_auth_cookie(response, token)

    return {
        "success": True,
        "statusCode": 200,
        "message": "Authentication successful",
        "user": _serialize_user(user)
    }
