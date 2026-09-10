"""
Distractor Generation (Step 3) — powered by central LLM factory (core.llm).
Keeps the same public API:  generate_distractors(context, question, correct_answer, ...) → List[str]
"""

import json
from core.llm import get_llm, extract_response_text


def generate_distractors(
    context: str,
    question: str,
    correct_answer: str,
    num_distractors: int = 3,
    max_attempts: int = 3,      # kept for API compatibility
    base_temperature: float = 0.7,
):
    """
    Generate *num_distractors* plausible but incorrect answer options using central LLM.
    Returns a list of distractor strings.
    """
    prompt = (
        f"Given the following question and its correct answer, generate exactly {num_distractors} "
        f"incorrect but plausible answer options (distractors). "
        f"Return ONLY a JSON array of strings, no explanation.\n\n"
        f"Context:\n{context[:1500]}\n\n"
        f"Question: {question}\n"
        f"Correct Answer: {correct_answer}"
    )

    llm = get_llm(temperature=base_temperature)
    response = llm.invoke(prompt)
    raw = extract_response_text(response)

    # Parse JSON array
    try:
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        distractors = json.loads(raw)
        if isinstance(distractors, list):
            filtered = [
                str(d).strip()
                for d in distractors
                if str(d).strip().lower() != correct_answer.lower() and len(str(d).strip()) > 1
            ]
            return filtered[:num_distractors]
    except (json.JSONDecodeError, ValueError):
        pass

    # Fallback: split on commas/newlines
    candidates = [
        c.strip().strip('"').strip("'")
        for c in raw.replace("\n", ",").split(",")
        if c.strip() and c.strip().lower() != correct_answer.lower()
    ]

    while len(candidates) < num_distractors:
        candidates.append(f"Option {len(candidates) + 1}")

    return candidates[:num_distractors]


if __name__ == "__main__":
    context = "Photosynthesis is the process by which green plants make food."
    question = "What is the process by which green plants make food?"
    answer = "Photosynthesis"

    distractors = generate_distractors(context, question, answer)
    print("Correct Answer:", answer)
    print("Distractors:")
    for i, d in enumerate(distractors, 1):
        print(f"{i}. {d}")