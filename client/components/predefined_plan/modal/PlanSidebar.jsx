import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiCheckCircle,
  FiBookOpen,
  FiSearch,
  FiX,
} from "react-icons/fi";

export default function PlanSidebar({
  searchQuery,
  setSearchQuery,
  filteredSchedule,
  expandedDay,
  handleToggleDay,
  selectedSubtopic,
  setSelectedSubtopic,
  completedSubtopics,
}) {
  return (
    <aside className="w-full md:w-80 lg:w-96 border-r border-slate-200 bg-white flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Search / Filter Input */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Filter topics or days..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Days Accordion List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
        {filteredSchedule && filteredSchedule.length > 0 ? (
          filteredSchedule.map((dayData) => {
            const isOpen = expandedDay === dayData.day;
            const totalSubs = (dayData.topics || []).reduce(
              (acc, t) => acc + (t.subtopics?.length || 0),
              0
            );

            return (
              <div
                key={dayData.day}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50/30 shadow-sm"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                }`}
              >
                {/* Day Header Button */}
                <button
                  type="button"
                  onClick={() => handleToggleDay(dayData.day, dayData)}
                  className={`w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isOpen ? "bg-indigo-600 text-white" : "text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                        isOpen
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {dayData.day < 10 ? `0${dayData.day}` : dayData.day}
                    </span>
                    <div>
                      <div className="text-sm font-bold leading-tight">
                        Day {dayData.day}
                      </div>
                      <span
                        className={`text-[11px] font-medium leading-none ${
                          isOpen ? "text-indigo-100" : "text-slate-400"
                        }`}
                      >
                        {totalSubs} {totalSubs === 1 ? "lesson" : "lessons"}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={`p-1 rounded-lg ${
                      isOpen ? "text-white/80" : "text-slate-400"
                    }`}
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Smooth Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-indigo-100/60"
                    >
                      <div className="p-2 space-y-3">
                        {dayData.topics?.map((topic, tIdx) => (
                          <div key={tIdx} className="space-y-1">
                            <div className="px-3 pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {topic?.title || "Topic"}
                            </div>
                            <div className="space-y-1">
                              {topic.subtopics?.map((sub, sIdx) => {
                                const lessonId =
                                  sub.id || `d${dayData.day}_t${tIdx}_s${sIdx}`;
                                const isSelected =
                                  selectedSubtopic?.id === lessonId ||
                                  (!selectedSubtopic?.id &&
                                    selectedSubtopic?.title === sub.title);
                                const isDone =
                                  completedSubtopics.has(lessonId) ||
                                  completedSubtopics.has(sub.title);

                                return (
                                  <button
                                    key={lessonId}
                                    type="button"
                                    onClick={() => {
                                      setSelectedSubtopic({
                                        ...sub,
                                        id: lessonId,
                                        day: dayData.day,
                                      });
                                    }}
                                    className={`w-full px-3 py-2.5 text-xs rounded-xl text-left flex items-center justify-between transition-all duration-150 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                                      isSelected
                                        ? "bg-white text-indigo-700 font-bold shadow-sm border border-indigo-200 translate-x-0.5"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80 border border-transparent"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 truncate">
                                      <span
                                        className={`w-2 h-2 rounded-full shrink-0 ${
                                          isSelected
                                            ? "bg-indigo-600 ring-2 ring-indigo-200"
                                            : isDone
                                            ? "bg-emerald-500"
                                            : "bg-slate-300"
                                        }`}
                                      />
                                      <span className="truncate">
                                        {sub?.title || "Untitled Lesson"}
                                      </span>
                                    </div>

                                    {isDone && (
                                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-400">
            <FiBookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-600 text-sm">
              No matching lessons
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try searching for another topic or keyword.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
