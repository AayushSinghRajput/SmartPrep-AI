import os
from groq import Groq
from core.config import settings

def get_groq_client():
    api_key = settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable is missing.")
    return Groq(api_key=api_key)

def transcribe_audio(audio_path: str) -> str:
    """
    Transcribe English speech → text using Groq Whisper
    """
    client = get_groq_client()
    with open(audio_path, "rb") as audio_file:
        result = client.audio.transcriptions.create(
            file=(os.path.basename(audio_path), audio_file.read()),
            model="whisper-large-v3",
            response_format="json"
        )

    return result.text.strip()
