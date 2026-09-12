"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  FiCheckCircle,
  FiXCircle,
  FiAward,
  FiRotateCcw,
  FiFilter,
  FiCheck,
  FiX,
  FiHelpCircle,
  FiZap,
} from "react-icons/fi";
import { useMCQ } from "../../hooks/useMCQ";

export default function MCQViewer({
  mcqs = [],
  pdfHash,
  day,
  onPerformanceUpdate,
}) {
  const {
    answers,
    showScore,
    score,
    performanceLevel,
    isComplete,
    loading,
    error,
    selectOption,
    submit,
  } = useMCQ({ mcqs, pdfHash, day, onPerformanceUpdate });

  // Mode: "instant" (Practice - instant feedback) vs "exam" (Test - submit at end)
  const [isInstantMode, setIsInstantMode] = useState(false);
  // Review filter: "all" | "mistakes" | "correct"
  const [filterMode, setFilterMode] = useState("all");
  // Local retake key to force reset if user wants to retry
  const [retakeCounter, setRetakeCounter] = useState(0);
  const [localAnswers, setLocalAnswers] = useState({});

  // Choose between hook answers (for exam mode) or local answers (for retake/practice)
  const activeAnswers = retakeCounter > 0 ? localAnswers : answers;

  const handleOptionClick = (qIndex, oIndex) => {
    if (showScore && retakeCounter === 0) return; // locked after official submit
    if (retakeCounter > 0) {
      setLocalAnswers((prev) => ({ ...prev, [qIndex]: oIndex }));
    } else {
      selectOption(qIndex, oIndex);
    }
  };

  const handleRetake = () => {
    setRetakeCounter((c) => c + 1);
    setLocalAnswers({});
    setFilterMode("all");
  };

  const answeredCount = Object.keys(activeAnswers).length;
  const progressPercent = mcqs.length > 0 ? Math.round((answeredCount / mcqs.length) * 100) : 0;
  const isAllAnswered = answeredCount === mcqs.length;

  const filteredMCQs = useMemo(() => {
    return mcqs
      .map((q, idx) => ({ ...q, originalIndex: idx }))
      .filter((q) => {
        if (!showScore && !isInstantMode) return true;
        const userAnswer = activeAnswers[q.originalIndex];
        const isAnswered = userAnswer !== undefined;
        const isCorrect = isAnswered && userAnswer === q.answer_index;

        if (filterMode === "mistakes") {
          return isAnswered && !isCorrect;
        }
        if (filterMode === "correct") {
          return isAnswered && isCorrect;
        }
        return true;
      });
  }, [mcqs, activeAnswers, showScore, isInstantMode, filterMode]);

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <FiHelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-700">No practice questions available for this unit.</p>
      </div>
    );
  }

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="space-y-6">
      
      {/* Top Controls & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
        
        {/* Progress status */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>Progress: {answeredCount} of {mcqs.length} Answered</span>
            <span className="text-indigo-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mode & Action Buttons */}
        <div className="flex items-center gap-2">
          {!showScore && (
            <button
              onClick={() => setIsInstantMode(!isInstantMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isInstantMode
                  ? "bg-amber-50 text-amber-700 border-amber-300 shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border-slate-200"
              }`}
              title="Toggle Instant Feedback after clicking each answer"
            >
              <FiZap className={isInstantMode ? "text-amber-500 fill-amber-500" : "text-slate-400"} />
              <span>{isInstantMode ? "Instant Feedback: ON" : "Instant Feedback: OFF"}</span>
            </button>
          )}

          {showScore && (
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
            >
              <FiRotateCcw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          )}
        </div>
      </div>

      {/* Post-Submission Scorecard Banner */}
      {showScore && retakeCounter === 0 && (
        <div className="p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200/80 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <FiAward className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-900">Quiz Completed!</h3>
          <p className="text-sm text-emerald-700 mt-1">
            Score: <strong className="text-emerald-900 font-black text-lg">{score}</strong> / {mcqs.length}
            {" "}({Math.round((score / mcqs.length) * 100)}%)
          </p>

          {performanceLevel && (
            <span className="inline-block mt-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              Performance Level: {performanceLevel}
            </span>
          )}

          {/* Filter Bar */}
          <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-emerald-200/60">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterMode === "all" ? "bg-emerald-700 text-white" : "bg-white text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              All Questions ({mcqs.length})
            </button>
            <button
              onClick={() => setFilterMode("mistakes")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterMode === "mistakes" ? "bg-rose-600 text-white" : "bg-white text-rose-700 hover:bg-rose-50"
              }`}
            >
              Mistakes Only ({mcqs.length - score})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterMode === "correct" ? "bg-emerald-600 text-white" : "bg-white text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              Correct ({score})
            </button>
          </div>
        </div>
      )}

      {/* Render Questions List */}
      <div className="space-y-4">
        {filteredMCQs.map((q) => {
          const qIndex = q.originalIndex;
          const selectedOption = activeAnswers[qIndex];
          const isAnswered = selectedOption !== undefined;
          const showAnswerFeedback = (showScore && retakeCounter === 0) || (isInstantMode && isAnswered);

          return (
            <div
              key={qIndex}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                  Q{qIndex + 1}
                </span>
                <div className="text-base font-semibold text-slate-800 leading-relaxed pt-0.5 flex-1 prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {q.question}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, oIndex) => {
                  const isUserSelection = selectedOption === oIndex;
                  const isCorrectAnswer = q.answer_index === oIndex;

                  let cardStyle = "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
                  let badgeStyle = "bg-slate-100 text-slate-600 border-slate-200";

                  if (showAnswerFeedback) {
                    if (isCorrectAnswer) {
                      cardStyle = "bg-emerald-50/80 border-emerald-500 text-emerald-900 font-medium ring-1 ring-emerald-500";
                      badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                    } else if (isUserSelection && !isCorrectAnswer) {
                      cardStyle = "bg-rose-50/80 border-rose-400 text-rose-900 line-through opacity-80";
                      badgeStyle = "bg-rose-600 text-white border-rose-600";
                    } else {
                      cardStyle = "bg-slate-50/60 border-slate-200 text-slate-400 opacity-60";
                    }
                  } else if (isUserSelection) {
                    cardStyle = "bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold ring-1 ring-indigo-600";
                    badgeStyle = "bg-indigo-600 text-white border-indigo-600";
                  }

                  return (
                    <button
                      key={oIndex}
                      type="button"
                      onClick={() => handleOptionClick(qIndex, oIndex)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${cardStyle}`}
                    >
                      {/* Option letter badge */}
                      <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${badgeStyle}`}>
                        {optionLetters[oIndex] || oIndex + 1}
                      </span>

                      {/* Option text with Math LaTeX support */}
                      <div className="text-sm flex-1 break-words">
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {opt}
                        </ReactMarkdown>
                      </div>

                      {/* Feedback icons */}
                      {showAnswerFeedback && isCorrectAnswer && (
                        <FiCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {showAnswerFeedback && isUserSelection && !isCorrectAnswer && (
                        <FiX className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission CTA */}
      {isAllAnswered && !showScore && (
        <div className="sticky bottom-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg flex flex-wrap items-center justify-between gap-4 z-20">
          <div>
            <h4 className="text-sm font-bold text-slate-800">All questions answered!</h4>
            <p className="text-xs text-slate-500">Submit to record your progress and calculate your readiness score.</p>
          </div>
          <button
            onClick={submit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-sm transition-all"
          >
            {loading ? "Saving Score..." : "Submit & Save Score"}
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
}