from contextlib import asynccontextmanager

from fastapi import FastAPI
from routes import auth
from routes import content
from routes import pdf
from routes import mcq
from routes import predefined
from routes import mock_routes
from routes import notes_summarizer
from fastapi.middleware.cors import CORSMiddleware
from routes import chat_api
from routes import contact
from routes import performance
from routes import progress
from routes import community
from routes import entrance_news
from routes import voice_chat
from services.scheduler_service.scheduler_service import start_scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield


app = FastAPI(
    title="AI Virtual Teacher",
    description="AI Teacher that converts textbooks into daily lessons",
    version="1.0.0",
    lifespan=lifespan,
)

from core.config import settings

# Configure dynamic CORS origins
raw_origins = settings.ALLOWED_ORIGINS
if raw_origins == "*":
    origins = ["*"]
else:
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    if "http://localhost:3000" not in origins:
        origins.append("http://localhost:3000")
    if "http://127.0.0.1:3000" not in origins:
        origins.append("http://127.0.0.1:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(pdf.router)
app.include_router(content.router)
app.include_router(mcq.router)
app.include_router(predefined.router)
app.include_router(mock_routes.router)
app.include_router(notes_summarizer.router)
app.include_router(contact.router)
app.include_router(chat_api.router)
app.include_router(performance.router)
app.include_router(progress.router)
app.include_router(community.router)
app.include_router(entrance_news.router)
app.include_router(voice_chat.router)

@app.get("/")
def root():
    return {"message": "Backend is running"}


if __name__ == "__main__":
    import os
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
