import { useState } from "react";
import toast from "react-hot-toast";
import { getMockTest, submitMockTest } from "../services/mock";

/**
 * useMockTest Hook
 *
 * Handles fetching, navigating, answering, and scoring a mock test.
 */
export const useMockTest = () => {
  // ---------- STATE ----------
  const [examData, setExamData] = useState(null); // current mock test
  const [submissionId, setSubmissionId] = useState(null); // unique attempt ID for idempotency
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionIndex: selectedOption }
  const [score, setScore] = useState(0);
  const [scoreDetails, setScoreDetails] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ---------- START TEST ----------
  const startTest = async (mockType) => {
    if (!mockType) {
      toast.error("Please select an exam type");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getMockTest(mockType);
      if (!data?.data || data.data.length === 0) {
        toast.error("No mock test found");
        return;
      }

      // Pick a random mock from available tests
      const randomExam = data.data[Math.floor(Math.random() * data.data.length)];

      // Initialize states with a fresh unique attempt ID
      const newSubmissionId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      setSubmissionId(newSubmissionId);
      setExamData(randomExam);
      setCurrentQuestion(0);
      setAnswers({});
      setScore(0);
      setScoreDetails(null);
      setShowResult(false);

      toast.success("Mock test started");
    } catch (err) {
      console.error("[useMockTest] Failed to fetch mock test:", err);
      toast.error("Failed to load mock test");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- SELECT ANSWER ----------
  const selectAnswer = (optionIndex) => {
    if (!examData) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  // ---------- NAVIGATION ----------
  const prevQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const nextQuestion = () => {
    if (!examData) return;
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // ---------- SUBMIT TEST ----------
  const submitTest = async () => {
    if (!examData) return;

    setIsLoading(true);

    let activeSubmissionId = submissionId;
    if (!activeSubmissionId) {
      activeSubmissionId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setSubmissionId(activeSubmissionId);
    }

    const submissionPayload = {
      submission_id: activeSubmissionId,
      mock_id: examData.mock_id || String(examData._id),
      mock_type: examData.mock_type,
      answers,
    };

    try {
      // 1. Submit raw answers to authoritative backend
      const res = await submitMockTest(submissionPayload);

      if (res?.data?.scoreDetails) {
        setScore(res.data.score);
        setScoreDetails(res.data.scoreDetails);
        setShowResult(true);
        toast.success("Exam submitted and evaluated successfully!");
      } else {
        throw new Error(res?.message || "Invalid score response from server");
      }
    } catch (err) {
      console.error("[useMockTest] Authoritative submission failed:", err);
      const errorMessage =
        (typeof err === "string" ? err : err?.message) ||
        "Failed to submit exam to the server. Please check your connection and try again.";
      toast.error(errorMessage);
      // Do NOT finalize the exam with a client-only score
    } finally {
      setIsLoading(false);
    }
  };


  // ---------- RESET TEST ----------
  const resetMockTest = () => {
    setExamData(null);
    setSubmissionId(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setScoreDetails(null);
    setShowResult(false);
  };

  return {
    examData,
    currentQuestion,
    answers,
    score,
    scoreDetails,
    showResult,
    isLoading,
    startTest,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    submitTest,
    resetMockTest,
  };
};