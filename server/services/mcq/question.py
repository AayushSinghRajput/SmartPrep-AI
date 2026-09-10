"""
Question Generation (Step 2) — powered by central LLM factory (core.llm).
Keeps the same public API:  generate_question(context, answer) → str
"""

from core.llm import get_llm, extract_response_text


def generate_question(
    context: str,
    answer: str,
    max_length: int = 256,      # kept for API compatibility — not used by LLM
    temperature: float = 0.5,
) -> str:
    """
    Generate a clear, natural exam-style question whose answer is *answer*,
    using the provided *context* as source material.
    """
    prompt = (
        "Generate exactly ONE clear, natural exam-style question based on the context below. "
        "The correct answer to the question must be the given answer. "
        "Return ONLY the question text, nothing else.\n\n"
        f"Context:\n{context[:2000]}\n\n"
        f"Answer: {answer}"
    )

    llm = get_llm(temperature=temperature)
    response = llm.invoke(prompt)
    return extract_response_text(response)


if __name__ == "__main__":
    context = "Ram hits Shyam."
    answer = "Ram"
    question = generate_question(context, answer)
    print("Generated Question:")
    print(question)