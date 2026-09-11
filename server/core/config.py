from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # LLM providers
    LLM_PROVIDER: str = "gemini"
    GOOGLE_API_KEY: str | None = None
    GROQ_API_KEY: str | None = None
    AZURE_OPENAI_API_KEY: str | None = None
    AZURE_OPENAI_ENDPOINT: str | None = None
    AZURE_OPENAI_DEPLOYMENT: str | None = None
    AZURE_OPENAI_API_VERSION: str | None = None
    #Google
    GOOGLE_SEARCH_API_KEY: str | None = None
    GOOGLE_SEARCH_ENGINE_ID: str | None = None
    # Database & auth
    MONGO_LOCAL_URI: str = "mongodb://localhost:27017"
    MONGO_ATLAS_URI: str | None = None
    MONGO_URI: str | None = "mongodb://localhost:27017"
    DB_NAME: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    GOOGLE_OAUTH_CLIENT_ID: str | None = None

    #Cloudinary
    CLOUDINARY_CLOUD_NAME : str
    CLOUDINARY_API_KEY : str
    CLOUDINARY_API_SECRET : str

    # Pinecone Vector Store
    PINECONE_API_KEY: str | None = None
    PINECONE_INDEX_NAME: str = "smartprep-ai"

    # ---------------- OCR ----------------
    POPPLER_PATH: str | None = None
    TESSERACT_PATH: str | None = None


    PORT: int = 8000
    ENV: str = "development"

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


settings = Settings()