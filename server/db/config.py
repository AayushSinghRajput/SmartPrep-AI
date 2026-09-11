from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings



# Select MongoDB URI based on environment (development = local, production/other = Atlas)
if settings.ENV.lower() == "development":
    MONGO_URI = settings.MONGO_LOCAL_URI or settings.MONGO_URI or "mongodb://localhost:27017"
    print("📌 Connecting to Local MongoDB Compass (Development Mode)...")
else:
    MONGO_URI = settings.MONGO_ATLAS_URI or settings.MONGO_URI or "mongodb://localhost:27017"
    print("☁️ Connecting to MongoDB Atlas (Production Mode)...")

DB_NAME = settings.DB_NAME

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

pdf_collection = db.pdfs
schedule_collection = db.schedules
subtopic_collection = db.subtopics
contacts_collection = db.contacts
study_images_collection = db.study_images
entrance_news_collection = db.entrance_news

print(f"MongoDB connected! ({'Local Compass' if settings.ENV.lower() == 'development' else 'Atlas'})")
