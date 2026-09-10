"""
Keyword Extraction — powered by central LLM factory (core.llm).
Keeps the same public API:  extract_keywords(text, num_keywords) → List[str]
"""

import json
from core.llm import get_llm, extract_response_text


def extract_keywords(text: str, num_keywords: int = 5):
    """
    Extract top N keywords / keyphrases from *text* using central LLM.
    Returns a list of keyword strings.
    """
    prompt = (
        f"Extract the {num_keywords} most important keywords or keyphrases from the "
        f"following text. Return ONLY a JSON array of strings, no explanation.\n\n"
        f"Text:\n{text[:3000]}"   # truncate to stay within token limits
    )

    llm = get_llm(temperature=0.2)
    response = llm.invoke(prompt)
    raw = extract_response_text(response)

    # Parse JSON array from response
    try:
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        keywords = json.loads(raw)
        if isinstance(keywords, list):
            return [str(k).strip() for k in keywords[:num_keywords]]
    except (json.JSONDecodeError, ValueError):
        pass

    # Fallback: split on commas / newlines
    keywords = [k.strip().strip('"').strip("'") for k in raw.replace("\n", ",").split(",") if k.strip()]
    return keywords[:num_keywords]


if __name__ == "__main__":
    text = """
    Nepal is a landlocked country in South Asia.
    Nepal is home to Mount Everest and rich cultural heritage.
    """
    keywords = extract_keywords(text, num_keywords=5)
    print("Keywords:")
    for i, kw in enumerate(keywords, 1):
        print(f"{i}. {kw}")