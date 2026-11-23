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
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

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
# Helper: Send Email via SMTP (Gmail / Custom SMTP)
# ---------------------------
def _send_via_smtp(recipient_email: str, subject: str, html_body: str, otp_code: str) -> tuple[bool, str | None]:
    """
    Sends email via standard SMTP (e.g. Gmail with App Password).
    Supports TLS (port 587) and SSL (port 465).
    """
    try:
        from_email = (settings.SMTP_USER or "").strip()
        from_name = (settings.SMTP_FROM_NAME or "SmartPrep AI").strip()

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{from_name} <{from_email}>"
        msg["To"] = recipient_email

        plain_text = (
            f"Your SmartPrep AI Verification Code is: {otp_code}\n\n"
            f"This code will expire in 10 minutes.\n"
            f"If you did not request this verification code, please ignore this email."
        )
        msg.attach(MIMEText(plain_text, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        host = (settings.SMTP_HOST or "smtp.gmail.com").strip()
        port = int(settings.SMTP_PORT or 587)
        password = (settings.SMTP_PASSWORD or "").strip()

        if port == 465:
            with smtplib.SMTP_SSL(host, port, timeout=12) as server:
                server.login(from_email, password)
                server.sendmail(from_email, [recipient_email], msg.as_string())
        else:
            with smtplib.SMTP(host, port, timeout=12) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(from_email, password)
                server.sendmail(from_email, [recipient_email], msg.as_string())

        print(f"[SMTP Success] Verification email sent to {recipient_email} via {host}")
        return True, None
    except smtplib.SMTPAuthenticationError as e:
        err_msg = (
            "Gmail SMTP Authentication failed. Please check your SMTP_USER and SMTP_PASSWORD. "
            "Ensure you are using a 16-character Google App Password (not your normal Gmail password)."
        )
        print(f"[SMTP Auth Error] {e}")
        return False, err_msg
    except Exception as e:
        print(f"[SMTP Dispatch Error] {e}")
        return False, f"SMTP dispatch failed: {e}"


# ---------------------------
# Helper: Send Email OTP
# ---------------------------
def _send_otp_email(recipient_email: str, otp_code: str) -> tuple[bool, str | None]:
    """
    Sends OTP verification code via Gmail SMTP or Resend API.
    Returns (True, None) if email is successfully sent, or (False, error_message) on failure.
    """
    subject = f"Your SmartPrep AI Verification Code: {otp_code}"
    
    sender = (settings.EMAIL_FROM or "").strip()
    if not sender:
        sender = "SmartPrep AI <onboarding@resend.dev>"
    elif "<" not in sender and "@" in sender:
        sender = f"SmartPrep AI <{sender}>"

    html_body = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Verification Code</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <tr>
                <td style="background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 28px 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">SmartPrep AI</h1>
                  <p style="color: #e0e7ff; margin: 6px 0 0 0; font-size: 13px;">Your Intelligent Exam Preparation Companion</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px 28px;">
                  <h2 style="color: #0f172a; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Verification Code</h2>
                  <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                    Please use the following 6-digit one-time code to authenticate your SmartPrep AI workspace:
                  </p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                    <tr>
                      <td align="center" style="background-color: #f1f5f9; border: 1.5px dashed #6366f1; border-radius: 12px; padding: 20px;">
                        <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1e1b4b; display: inline-block;">
                          {otp_code}
                        </span>
                      </td>
                    </tr>
                  </table>
                  <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 12px 0;">
                    ⏳ This code expires in <strong>10 minutes</strong>.
                  </p>
                  <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">
                    If you did not request this verification code, please ignore this email. Your account remains secure.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 16px 28px; text-align: center;">
                  <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                    &copy; SmartPrep AI &bull; Secure Authentication Service
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """

    # 1. Prefer SMTP (Gmail SMTP) if configured
    if settings.SMTP_USER and settings.SMTP_PASSWORD and settings.SMTP_USER.strip() and settings.SMTP_PASSWORD.strip():
        return _send_via_smtp(recipient_email, subject, html_body, otp_code)

    # 2. Send via Resend API if configured
    if settings.RESEND_API_KEY and settings.RESEND_API_KEY.strip():
        try:
            res = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {settings.RESEND_API_KEY.strip()}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": sender,
                    "to": [recipient_email],
                    "subject": subject,
                    "html": html_body
                },
                timeout=10
            )
            if res.status_code in (200, 201):
                return True, None

            error_data = {}
            try:
                error_data = res.json()
            except Exception:
                pass
            
            error_msg = error_data.get("message") or f"Resend API returned status code {res.status_code}"
            print(f"[Resend Error] Status {res.status_code}: {error_msg}")
            return False, error_msg
        except Exception as e:
            print(f"[Resend Error] Dispatch exception: {e}")
            return False, str(e)

    # 3. Fallback for local development if NO SMTP or Resend credentials are configured
    if not IS_PRODUCTION:
        print(f"\n=======================================================")
        print(f"⚠️ [DEV WARNING - NO EMAIL CREDENTIALS CONFIGURED]")
        print(f"📧 Recipient: {recipient_email}")
        print(f"🔑 Verification Code: {otp_code}")
        print(f"=======================================================\n")
        return True, None

    return False, "Email service (Gmail SMTP or Resend) is not configured on the server."


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

    code = f"{random.randint(100000, 999999)}"
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=10)

    # Dispatch email via Resend
    success, error_msg = _send_otp_email(email, code)
    if not success:
        if error_msg and "testing emails" in error_msg.lower():
            detail = (
                f"{error_msg} "
                "To deliver OTPs to any email address, verify your domain at resend.com/domains and update EMAIL_FROM."
            )
        else:
            detail = error_msg or "Failed to deliver verification code to your email."
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )

    # Invalidate older pending OTPs for this email after dispatch succeeds
    await otp_collection.update_many(
        {"email": email, "used": False},
        {"$set": {"used": True}}
    )

    await otp_collection.insert_one({
        "email": email,
        "otp": code,
        "created_at": now,
        "expires_at": expires_at,
        "used": False
    })

    return {
        "success": True,
        "statusCode": 200,
        "message": f"Verification code sent to {email}"
    }


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
