"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Toaster } from "react-hot-toast";
import { useMockTest } from "../../hooks/useMockTest";
import { useExamTimer } from "../../hooks/useExamTimer";
import { formatTime } from "../../utils/formatTime";
import { FaBrain, FaCog, FaStethoscope } from "react-icons/fa";
import { FiClock, FiCheckCircle, FiXCircle, FiMinusCircle, FiAward, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { ENGINEERING_TEST_DURATION, MEDICAL_TEST_DURATION } from "../../lib/constants";

export default function MockTest() {
  const {
    examData,
    currentQuestion,
    answers,
    score,
    scoreDetails,
    showResult,
    isLoading,
    startTest,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
    resetMockTest,
  } = useMockTest();

  const [countdown, setCountdown] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const initialDuration = selectedExam === "Medical" ? MEDICAL_TEST_DURATION : ENGINEERING_TEST_DURATION;

  const { timeLeft, resetTimer } = useExamTimer(Boolean(examData), () => {
    submitTest();
    resetTimer();
  }, initialDuration);

  // Countdown effect
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && selectedExam) {
      startTest(selectedExam);
      setCountdown(null);
    }
  }, [countdown, selectedExam, startTest]);

  const handleExamSelect = (examType) => {
    setSelectedExam(examType);
    setCountdown(5);
  };

  const handleManualSubmit = () => {
    const confirmSubmit = window.confirm("Are you sure you want to submit the test?");
    if (confirmSubmit) {
      submitTest();
      resetTimer();
    }
  };

  const handleRetakeTest = () => {
    resetMockTest();
    setSelectedExam(null);
    setCountdown(null);
    resetTimer();
  };

  const examOptions = [
    {
      key: "Engineering",
      title: "IOE Engineering",
      subtitle: "Tribhuvan University (Pulchowk)",
      questions: 100,
      duration: 120,
      icon: FaCog,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
      description: "Physics (45), Chemistry (25), Mathematics (50), English (20) based on TU IOE pattern.",
    },
    {
      key: "Medical",
      title: "CEE Medical",
      subtitle: "Medical Education Commission (MBBS/BDS)",
      questions: 200,
      duration: 180,
      icon: FaStethoscope,
      iconColor: "text-rose-600 bg-rose-50 border-rose-100",
      description: "Zoology, Botany, Chemistry, Physics, and Mental Agility Test based on CEE pattern.",
    },
  ];

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  // ------------------------- RESULT SCREEN -------------------------
  if (showResult) {
    return (
      <div className="bg-slate-50 min-h-full py-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-center max-w-lg w-full">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
            <FiAward className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            Test Completed!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            {examData?.mock_title || `${selectedExam} Mock Examination`}
          </p>

          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 mb-6">
            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-1">
              Final Net Score
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black text-emerald-800">{score}</span>
              {scoreDetails?.maxMarks && (
                <span className="text-sm font-semibold text-emerald-600">
                  / {scoreDetails.maxMarks} marks
                </span>
              )}
            </div>
          </div>

          {scoreDetails && (
            <div className="grid grid-cols-2 gap-3 text-left mb-6 text-xs sm:text-sm">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <span className="text-[11px] text-slate-500 block mb-0.5">Correct Answers</span>
                <span className="font-bold text-emerald-600 text-base">+{scoreDetails.correctCount}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <span className="text-[11px] text-slate-500 block mb-0.5">Incorrect Answers</span>
                <span className="font-bold text-rose-600 text-base">{scoreDetails.wrongCount}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <span className="text-[11px] text-slate-500 block mb-0.5">Negative Penalty</span>
                <span className="font-bold text-rose-700 text-base">-{scoreDetails.negativePenalty}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <span className="text-[11px] text-slate-500 block mb-0.5">Unattempted</span>
                <span className="font-bold text-slate-600 text-base">{scoreDetails.unattemptedCount}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleRetakeTest}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all text-sm"
          >
            Retake Another Mock Test
          </button>
        </div>
      </div>
    );
  }

  // ------------------------- MOCK TEST UI -------------------------
  return (
    <div className="bg-slate-50 min-h-full py-8 px-4 sm:px-6">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto">
        {!examData ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
            {/* Initial Exam Selection */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <FaBrain className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Full-Length Entrance Mock Exam
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                Experience realistic timed entrance conditions with negative marking calculations and detailed analytics.
              </p>
            </div>

            {!countdown && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {examOptions.map((exam) => {
                  const Icon = exam.icon;
                  return (
                    <div
                      key={exam.key}
                      onClick={() => handleExamSelect(exam.key)}
                      className="cursor-pointer bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${exam.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h2 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {exam.title}
                        </h2>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {exam.subtitle}
                        </p>
                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                          {exam.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                        <span>{exam.questions} Questions • {exam.duration} Min</span>
                        <span className="text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Start <FiChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Countdown before starting exam */}
            {countdown !== null && countdown > 0 && (
              <div className="text-center py-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Preparing your examination paper...
                </span>
                <div className="text-7xl font-black text-indigo-600 animate-bounce">
                  {countdown}
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Stay focused and keep your workspace quiet.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            {/* Header: Question Counter & Timer */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                  Question {currentQuestion + 1} of {examData.questions.length}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Single Choice
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold text-sm shadow-2xs">
                <FiClock className="w-4 h-4 text-rose-600" />
                <span>{formatTime(timeLeft)} remaining</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / examData.questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 mb-6 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {examData.questions[currentQuestion].question_text}
              </ReactMarkdown>
            </div>

            {/* Options Grid */}
            <div className="grid gap-3 mb-8">
              {examData.questions[currentQuestion].options.map((opt, i) => {
                const isSelected = answers[currentQuestion] === opt;
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(opt)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-600"
                        : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors border ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {optionLetters[i] || i + 1}
                    </span>
                    <div className="text-sm flex-1 leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {opt}
                      </ReactMarkdown>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition"
              >
                <FiChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleManualSubmit}
                  disabled={isLoading}
                  className="px-4 py-2.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold disabled:opacity-50 transition"
                >
                  {isLoading ? "Submitting..." : "Submit Test"}
                </button>

                <button
                  onClick={currentQuestion === examData.questions.length - 1 ? submitTest : nextQuestion}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold disabled:opacity-50 transition shadow-sm"
                >
                  {currentQuestion === examData.questions.length - 1
                    ? (isLoading ? "Submitting..." : "Finish Test")
                    : <><span>Next</span> <FiChevronRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
