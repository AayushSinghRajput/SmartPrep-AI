from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import AzureChatOpenAI, ChatOpenAI

from core.config import settings


def resolve_provider(requested_provider: str | None = None) -> str:
    """
    Determines the active LLM provider.
    - If explicitly requested or configured in settings (and != 'auto'), uses that.
    - If set to 'auto', detects based on available keys: DeepSeek -> Groq -> Gemini -> Azure.
    """
    target = (requested_provider or settings.LLM_PROVIDER or "auto").strip().lower()

    if target != "auto":
        return target

    # Auto-detection priority
    if settings.DEEPSEEK_API_KEY and settings.DEEPSEEK_API_KEY.strip():
        return "deepseek"
    if settings.GROQ_API_KEY and settings.GROQ_API_KEY.strip():
        return "groq"
    if settings.GOOGLE_API_KEY and settings.GOOGLE_API_KEY.strip():
        return "gemini"
    if settings.AZURE_OPENAI_API_KEY and settings.AZURE_OPENAI_API_KEY.strip():
        return "azure"

    # Fallback to gemini if no other key is found
    return "gemini"


# 🔁 Change model/provider ONLY HERE
def get_llm(
    provider: str | None = None,   # 👈 auto | deepseek | gemini | groq | azure
    temperature: float = 0.3,
    structured: bool = False,
    output_schema=None,
):
    """
    Central LLM factory.
    Auto-detects or switches provider/model here without touching services.
    """
    selected_provider = resolve_provider(provider)

    # -------------------------------
    # DeepSeek (OpenAI-compatible)
    # -------------------------------
    if selected_provider == "deepseek":
        print("Using DeepSeek LLM")
        if not settings.DEEPSEEK_API_KEY or not settings.DEEPSEEK_API_KEY.strip():
            raise ValueError(
                "DEEPSEEK_API_KEY is not set or empty in server/.env. "
                "Please add your DeepSeek API key or set LLM_PROVIDER to another provider."
            )
        llm = ChatOpenAI(
            model=settings.DEEPSEEK_MODEL or "deepseek-chat",
            api_key=settings.DEEPSEEK_API_KEY,
            base_url=settings.DEEPSEEK_BASE_URL or "https://api.deepseek.com",
            temperature=temperature,
        )

    # -------------------------------
    # Google Gemini
    # -------------------------------
    elif selected_provider == "gemini":
        print("Using Google Gemini LLM")
        llm = ChatGoogleGenerativeAI(
            model="gemini-3.8-flash",
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=temperature,
        )

    # -------------------------------
    # Groq
    # -------------------------------
    elif selected_provider == "groq":
        print("Using Groq LLM")
        llm = ChatGroq(
            model_name=getattr(settings, "GROQ_MODEL", "qwen/qwen3.6-27b"),
            temperature=temperature,
            groq_api_key=settings.GROQ_API_KEY,
        )

    # -------------------------------
    # Azure OpenAI
    # -------------------------------
    elif selected_provider == "azure":
        print("Using Azure OpenAI LLM")
        llm = AzureChatOpenAI(
            azure_deployment=settings.AZURE_OPENAI_DEPLOYMENT,  # e.g. "gpt-5"
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            api_key=settings.AZURE_OPENAI_API_KEY,
            api_version=settings.AZURE_OPENAI_API_VERSION,
            temperature=temperature,
        )

    else:
        raise ValueError(f"Unsupported LLM provider: {selected_provider}")

    # -------------------------------
    # Structured output (if supported)
    # -------------------------------
    if structured and output_schema:
        return llm.with_structured_output(output_schema)

    return llm


def extract_response_text(response) -> str:
    """Extract plain text string safely from an LLM response object."""
    if hasattr(response, "content"):
        content = response.content
        if isinstance(content, str):
            return content.strip()
        elif isinstance(content, list):
            parts = []
            for item in content:
                if isinstance(item, str):
                    parts.append(item)
                elif isinstance(item, dict) and "text" in item:
                    parts.append(item["text"])
                else:
                    parts.append(str(item))
            return "".join(parts).strip()
    if hasattr(response, "text") and isinstance(response.text, str):
        return response.text.strip()
    return str(response).strip()

