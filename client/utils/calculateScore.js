/**
 * Exam Scoring and Negative Marking Rules (Nepal Entrance Exams):
 *
 * 1. IOE Entrance Exam (Engineering):
 *    - Negative Marking Scheme: 10% penalty for every incorrect answer.
 *    - 1-mark question: 0.1 marks deducted for a wrong answer.
 *    - 2-mark question: 0.2 marks deducted for a wrong answer.
 *    - Unattempted questions carry zero marks.
 *
 * 2. IOM / Medical Common Entrance Examination (CEE):
 *    - Negative Marking Scheme: 0.25 marks deducted for every incorrect response.
 *    - Each correct answer carries 1 mark (+1.0).
 *    - Incorrect answer: -0.25 marks subtracted from total.
 *    - Unattempted questions carry zero marks.
 *
 * 3. Default / NEB Practice:
 *    - No negative marking.
 */

/**
 * Calculates detailed score breakdown for a mock exam.
 *
 * @param {Array} questions - Array of question objects ({ correct_option, marks, ... })
 * @param {Object} answers - User's selected answers { [questionIndex]: selectedOption }
 * @param {string} [examType="Engineering"] - "Engineering" | "IOE" | "Medical" | "IOM" | "CEE"
 * @returns {Object} Detailed score breakdown
 */
export const calculateDetailedScore = (questions = [], answers = {}, examType = "Engineering") => {
  if (!Array.isArray(questions) || questions.length === 0) {
    return {
      total: 0,
      correctCount: 0,
      wrongCount: 0,
      unattemptedCount: 0,
      earnedMarks: 0,
      negativePenalty: 0,
      maxMarks: 0,
    };
  }

  const normalizedType = (examType || "").toLowerCase();
  const isIOE = normalizedType.includes("eng") || normalizedType.includes("ioe");
  const isMedical = normalizedType.includes("med") || normalizedType.includes("iom") || normalizedType.includes("cee");

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let earnedMarks = 0;
  let negativePenalty = 0;
  let maxMarks = 0;

  questions.forEach((q, index) => {
    const qMarks = Number(q.marks) || 1;
    maxMarks += qMarks;

    const userAnswer = answers ? answers[index] : undefined;
    const isAnswered = userAnswer !== undefined && userAnswer !== null && userAnswer !== "";

    if (!isAnswered) {
      unattemptedCount += 1;
      return;
    }

    if (userAnswer === q.correct_option) {
      correctCount += 1;
      earnedMarks += qMarks;
    } else {
      wrongCount += 1;
      if (isIOE) {
        // IOE: 10% penalty (-0.1 for 1-mark question, -0.2 for 2-mark question)
        negativePenalty += qMarks * 0.1;
      } else if (isMedical) {
        // CEE / IOM: 0.25 marks deducted per wrong answer
        negativePenalty += 0.25;
      }
    }
  });

  const rawTotal = earnedMarks - negativePenalty;
  const total = Number(rawTotal.toFixed(2));
  const roundedPenalty = Number(negativePenalty.toFixed(2));

  return {
    total,
    correctCount,
    wrongCount,
    unattemptedCount,
    earnedMarks,
    negativePenalty: roundedPenalty,
    maxMarks,
  };
};

/**
 * Calculates total net score.
 * 
 * Preserves existing two-argument behavior:
 * - If called with 2 arguments (questions, answers), sums correct marks without negative deductions.
 * - If called with 3 arguments (questions, answers, examType), applies exam-specific negative marking rules.
 *
 * @param {Array} questions - Array of question objects
 * @param {Object} answers - User's selected answers
 * @param {string} [examType] - Optional: "Engineering" | "IOE" | "Medical" | "IOM" | "CEE"
 * @returns {number} Final calculated score
 */
export const calculateScore = (questions = [], answers = {}, examType) => {
  if (!examType) {
    let total = 0;
    questions.forEach((q, index) => {
      if (answers && answers[index] === q.correct_option) {
        total += (q && typeof q.marks === "number") ? q.marks : 1;
      }
    });
    return total;
  }

  const { total } = calculateDetailedScore(questions, answers, examType);
  return total;
};