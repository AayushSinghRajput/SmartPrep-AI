import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  FiCheckCircle,
  FiCircle,
  FiClock,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

export default function LessonViewer({
  selectedSubtopic,
  subject,
  activeDay,
  formattedDescription,
  completedSubtopics,
  toggleComplete,
  handleCopyNotes,
  copied,
  prevLesson,
  nextLesson,
  goToLesson,
}) {
  const lessonId = selectedSubtopic?.id || selectedSubtopic?.title;
  const isCompleted =
    completedSubtopics.has(lessonId) ||
    completedSubtopics.has(selectedSubtopic?.title);
  const displayDay = selectedSubtopic?.day ?? activeDay ?? 1;

  return (
    <motion.div
      key={lessonId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex-1 flex flex-col p-6 sm:p-10 max-w-4xl mx-auto w-full"
    >
      {/* Top Bar: Breadcrumbs & Lesson Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-indigo-600 font-bold uppercase tracking-wider">
            {subject}
          </span>
          <span>/</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
            Day {displayDay}
          </span>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-[200px] sm:max-w-xs font-medium">
            {selectedSubtopic?.title || "Untitled Lesson"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mark Completed Button */}
          <button
            type="button"
            onClick={() => toggleComplete(lessonId)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200"
            }`}
          >
            {isCompleted ? (
              <>
                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Completed
              </>
            ) : (
              <>
                <FiCircle className="w-3.5 h-3.5 text-slate-400" />
                Mark Complete
              </>
            )}
          </button>

          {/* Copy Notes */}
          <button
            type="button"
            onClick={handleCopyNotes}
            title="Copy lesson notes to clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200 transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {copied ? (
              <>
                <FiCheck className="w-3.5 h-3.5 text-indigo-600" />
                Copied!
              </>
            ) : (
              <>
                <FiCopy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Title & Metadata */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
          <FiClock className="w-3.5 h-3.5" />
          High Yield Concept · Core Prep
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {selectedSubtopic?.title || "Untitled Lesson"}
        </h1>
      </div>

      {/* Markdown & Math Content */}
      <div
        className="prose prose-slate prose-base sm:prose-lg max-w-none flex-1
          prose-headings:text-slate-900 prose-headings:font-black
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-li:text-slate-600
          prose-strong:text-indigo-900 prose-strong:font-bold
          prose-code:text-indigo-600 prose-code:bg-indigo-50/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
          prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-4
          prose-hr:border-slate-200
          ai-prose"
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {formattedDescription}
        </ReactMarkdown>
      </div>

      {/* Bottom Navigation Stepper */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
        {prevLesson ? (
          <button
            type="button"
            onClick={() => goToLesson(prevLesson)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50 transition-all text-xs sm:text-sm font-bold group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <FiArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-normal">
                Previous Topic
              </div>
              <span className="truncate max-w-[140px] sm:max-w-[200px] block">
                {prevLesson?.subtopic?.title || "Previous"}
              </span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <button
            type="button"
            onClick={() => goToLesson(nextLesson)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all text-xs sm:text-sm font-bold group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <div className="text-right">
              <div className="text-[10px] text-indigo-200 font-normal">
                Next Topic
              </div>
              <span className="truncate max-w-[140px] sm:max-w-[200px] block">
                {nextLesson?.subtopic?.title || "Next"}
              </span>
            </div>
            <FiArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4" /> End of Syllabus
          </div>
        )}
      </div>
    </motion.div>
  );
}
