import { FiX, FiAward } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function ModalHeader({
  subject,
  completedCount,
  totalLessonsCount,
  progressPercent,
  onClose,
}) {
  return (
    <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex justify-between items-center shrink-0 border-b border-white/10 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center text-indigo-300 font-black shadow-inner">
          <HiSparkles className="w-5 h-5 text-indigo-300" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 id="modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-white capitalize">
              {subject} <span className="text-indigo-400">Blueprint</span>
            </h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              30 Days
            </span>
          </div>
          <p className="text-slate-400 text-xs font-medium">
            Comprehensive Structured Study Plan & Entrance Syllabus
          </p>
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-4">
        {totalLessonsCount > 0 && (
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
            <FiAward className="text-indigo-400" />
            <span>
              {completedCount}/{totalLessonsCount} Completed
            </span>
            <div className="w-14 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-semibold text-white">{progressPercent}%</span>
          </div>
        )}

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
