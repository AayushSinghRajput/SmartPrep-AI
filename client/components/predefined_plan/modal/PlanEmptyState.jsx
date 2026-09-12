import { motion } from "framer-motion";
import { FiCompass } from "react-icons/fi";

export default function PlanEmptyState({ schedule, subject, onStart }) {
  const hasSchedule = schedule && schedule.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-16 my-auto"
    >
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 border border-indigo-200/50 flex items-center justify-center mb-6 shadow-sm">
        <FiCompass className="w-10 h-10 text-indigo-600" />
      </div>

      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
        {hasSchedule ? "Select a Topic to Study" : "No Schedule Available"}
      </h3>

      <p className="text-slate-500 max-w-sm mt-2 text-sm leading-relaxed">
        {hasSchedule
          ? `Explore the 30-day ${subject} curriculum by selecting any day or topic from the sidebar.`
          : `Study plan content for ${subject} is currently being prepared.`}
      </p>

      {hasSchedule && onStart && (
        <button
          type="button"
          onClick={onStart}
          className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Start Day 1 Lesson
        </button>
      )}
    </motion.div>
  );
}
