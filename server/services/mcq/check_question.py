from core.llm import get_llm, extract_response_text
import json


def validate_and_fix_mcqs(context: str, mcqs: list[dict]) -> list[dict]:
    """
    Validate and fix MCQs using LLM.
    Returns corrected MCQs in SAME format.
    """

    llm = get_llm(temperature=0.2)

    prompt = [
        (
            "system",
            """You are an expert examiner. Your task is to validate and fix generated MCQs.

CRITICAL RULES:
1. Ensure option_a, option_b, option_c, option_d are DISTINCT and non-empty.
2. Ensure correct_option is EXACTLY one of: "option_a", "option_b", "option_c", "option_d".
3. Ensure correct_option matches the actual correct answer given the context.
4. Ensure explanation is clear and accurate based on context.
5. Return ONLY a valid JSON list matching the input structure. Do not include markdown code blocks.
"""
        ),
        (
            "user",
            f"""CONTEXT:
{context}

MCQS TO VALIDATE AND FIX:
{json.dumps(mcqs, indent=2)}
"""
        )
    ]

    response = llm.invoke(prompt)

    try:
        raw_output = extract_response_text(response)
        corrected_mcqs = json.loads(raw_output)
        return corrected_mcqs
    except Exception:
        # If LLM output fails → return original (safe fallback)
        print("LLM failed to correct MCQs, returning original.")
        return mcqs