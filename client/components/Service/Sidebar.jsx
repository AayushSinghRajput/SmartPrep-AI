import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { getTotalSubtopics } from "../../utils/getsubtopics";

export default function Sidebar({
  localSchedule = [],
  isDayExpanded = () => false,
  isTopicExpanded = () => false,
  selectedSubtopic = null,
  loadingContent = false,
  metaData = {},
  actions = {},
  mode = "study", // "study" | "mcq" | "notes"
  selectedDay = null,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const {
    toggleDayExpand,
    toggleTopicExpand,
    handleSubtopicClick,
    handleDayClick,
  } = actions;

  // 🎨 badge color based on performance level
  const getPerformanceBadge = (level) => {
    if (!level) return null;

    // Normalize level to match badge keys
    const normalizedLevel = level.toLowerCase();

    const styles = {
      bad: "bg-rose-50 text-rose-600 border border-rose-200",
      medium: "bg-amber-50 text-amber-700 border border-amber-200",
      good: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    };

    return (
      <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${styles[normalizedLevel] || styles.medium}`}
      >
        {normalizedLevel}
      </span>
    );
  };

  return (
    <aside
      className={`h-full border-r border-[var(--border-primary)] bg-[var(--bg-card)] transition-all duration-300 ease-in-out flex-shrink-0 z-20 ${
        isCollapsed
          ? "w-0 p-0 opacity-0 overflow-hidden border-r-0"
          : "w-full md:w-80 lg:w-96 p-4 overflow-y-auto opacity-100"
      }`}
    >
      {/* Header */}
      <div className="mb-5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl text-white shadow-sm border border-indigo-500/30">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200 bg-indigo-800/50 px-2 py-0.5 rounded-full">
            Course Curriculum
          </span>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="text-indigo-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              title="Collapse Curriculum"
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
          )}
        </div>
        <h2 className="text-base font-bold truncate">
          {metaData.subject || "Study Material"}
        </h2>
        <p className="text-xs text-indigo-100/80 mt-0.5">
          {localSchedule.length} Days • {getTotalSubtopics(localSchedule)} Subtopics
        </p>
      </div>

      <div className="flex items-center justify-between px-2 mb-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Study Units & Days
        </h3>
        <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
          {mode.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2">
        {localSchedule.map((dayItem, dayIndex) => {
          const dayExpanded = isDayExpanded(dayIndex);

          return (
            <div key={dayIndex} className="mb-2">
              {/* Day Button */}
              <button
                onClick={() => {
                  if (mode === "mcq" || mode === "notes") {
                    handleDayClick(dayItem.day);
                  } else {
                    toggleDayExpand(dayIndex);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  dayExpanded
                    ? "bg-[var(--accent-light)] border border-[var(--border-primary)] shadow-xs text-[var(--accent-primary)] font-semibold"
                    : "hover:bg-[var(--accent-light)] text-[var(--text-primary)]"
                }`}
                disabled={loadingContent}
              >
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      (mode === "study" && dayExpanded) ||
                      (mode !== "study" && selectedDay === dayItem.day)
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    }`}
                  />
                  <div className="text-left">
                    <span className="font-bold text-sm block">
                      DAY {dayItem.day}
                    </span>
                    {mode === "study" && (
                      <span className="text-xs text-gray-500">
                        {dayItem.topics?.length || 0} topics
                      </span>
                    )}
                  </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-2">
                  {/* ✅ Performance badge (mcq + study only) */}
                  {(mode === "mcq" || mode === "study") &&
                    getPerformanceBadge(dayItem.performance_level)}

                  {dayExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </button>

              {/* Topics & Subtopics (study only) */}
              {mode === "study" &&
                dayExpanded &&
                dayItem.topics?.map((topic, topicIndex) => {
                  const topicExpanded = isTopicExpanded(dayIndex, topicIndex);

                  return (
                    <div
                      key={topicIndex}
                      className="mt-2 ml-4 space-y-1 border-l-2 border-indigo-100 pl-2"
                    >
                      {/* Topic */}
                      <button
                        onClick={() => toggleTopicExpand(dayIndex, topicIndex)}
                        className={`w-full text-left px-3 py-2 text-sm font-semibold flex justify-between items-center ${
                          topicExpanded
                            ? "text-indigo-600"
                            : "text-gray-600 hover:text-indigo-600"
                        }`}
                        disabled={loadingContent}
                      >
                        <span className="truncate">
                          {topic.topic || topic.title}
                        </span>
                        <ChevronRight
                          size={14}
                          className={`transition-transform ${topicExpanded ? "rotate-90" : ""}`}
                        />
                      </button>

                      {/* Subtopics */}
                      {topicExpanded &&
                        topic.subtopics?.map((subtopic, subtopicIndex) => {
                          const isSelected =
                            selectedSubtopic?.title === subtopic.title &&
                            selectedSubtopic?.currentDay === dayItem.day;

                          return (
                            <button
                              key={subtopicIndex}
                              onClick={() =>
                                handleSubtopicClick(
                                  dayItem.day,
                                  topicIndex,
                                  subtopicIndex,
                                )
                              }
                              className={`w-full text-left px-3 py-2 text-xs transition-all rounded-lg flex items-center justify-between ${
                                isSelected
                                  ? "bg-indigo-600 text-white font-bold"
                                  : "text-[var(--text-secondary)] hover:bg-[var(--accent-light)]"
                              }`}
                              disabled={loadingContent}
                            >
                              <span
                                className={
                                  subtopic.completed
                                    ? "line-through opacity-50"
                                    : ""
                                }
                              >
                                {subtopic.title}
                              </span>
                              {subtopic.completed && (
                                <Check size={12} className="text-emerald-600" />
                              )}
                            </button>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
