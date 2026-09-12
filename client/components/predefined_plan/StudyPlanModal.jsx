"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import ModalHeader from "./modal/ModalHeader";
import PlanSidebar from "./modal/PlanSidebar";
import LessonViewer from "./modal/LessonViewer";
import PlanEmptyState from "./modal/PlanEmptyState";
import { useModalKeyboardFocus } from "./hooks/useModalKeyboardFocus";
import { usePlanScheduleFilter } from "./hooks/usePlanScheduleFilter";
import { toast } from "../../utils/toast";

export default function StudyPlanModal({ plan, onClose }) {
  const schedule = plan?.schedule || [];
  const modalRef = useModalKeyboardFocus(Boolean(plan), onClose);

  const [searchQuery, setSearchQuery] = useState("");
  const { allLessons, filteredSchedule } = usePlanScheduleFilter(schedule, searchQuery);

  const [expandedDay, setExpandedDay] = useState(schedule[0]?.day ?? 1);
  const [selectedSubtopic, setSelectedSubtopic] = useState(allLessons[0]?.subtopic ?? null);
  const [completedSubtopics, setCompletedSubtopics] = useState(() => new Set());
  const [copied, setCopied] = useState(false);

  const planIdentity = plan?.id || plan?._id || plan?.subject || plan?.pdf_hash;
  const prevPlanIdentityRef = useRef(planIdentity);

  // Reset plan-scoped state when the plan identity changes
  useEffect(() => {
    const isNewPlan = prevPlanIdentityRef.current !== planIdentity;
    if (isNewPlan) {
      prevPlanIdentityRef.current = planIdentity;
      setSearchQuery("");
      setCompletedSubtopics(new Set());
      setCopied(false);
    }

    if (allLessons.length > 0) {
      setSelectedSubtopic((prev) => {
        if (isNewPlan || !prev) return allLessons[0].subtopic;
        const found = allLessons.find((l) => l.id === prev.id);
        return found ? found.subtopic : allLessons[0].subtopic;
      });
      setExpandedDay((prev) => {
        if (isNewPlan || !prev) return schedule[0]?.day ?? 1;
        return schedule.some((d) => d.day === prev) ? prev : schedule[0]?.day ?? 1;
      });
    } else {
      setSelectedSubtopic(null);
      setExpandedDay(null);
    }
  }, [planIdentity, allLessons, schedule]);

  // Current index in flattened list based on unique ID
  const currentLessonIndex = useMemo(() => {
    if (!selectedSubtopic) return -1;
    return allLessons.findIndex((item) => item.id === selectedSubtopic.id);
  }, [allLessons, selectedSubtopic]);

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const formattedDescription = useMemo(() => {
    if (!selectedSubtopic?.description) return "";
    return selectedSubtopic.description.replace(/\\n/g, "\n");
  }, [selectedSubtopic]);

  const handleToggleDay = (dayNum) => {
    if (expandedDay === dayNum) {
      setExpandedDay(null);
    } else {
      setExpandedDay(dayNum);
      const dayData = filteredSchedule.find((d) => d.day === dayNum);
      const firstFilteredLesson = dayData?.topics?.[0]?.subtopics?.[0];
      if (firstFilteredLesson) {
        setSelectedSubtopic(firstFilteredLesson);
      } else {
        const fallbackLesson = allLessons.find((l) => l.day === dayNum);
        if (fallbackLesson) setSelectedSubtopic(fallbackLesson.subtopic);
      }
    }
  };

  const goToLesson = (lessonItem) => {
    if (!lessonItem) return;
    setExpandedDay(lessonItem.day);
    setSelectedSubtopic(lessonItem.subtopic);
  };

  const toggleComplete = (lessonId) => {
    setCompletedSubtopics((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
        toast.info("Marked lesson as uncompleted");
      } else {
        next.add(lessonId);
        toast.success("Lesson marked as complete! 🎉");
      }
      return next;
    });
  };

  const handleCopyNotes = () => {
    if (!selectedSubtopic?.description) return;
    navigator.clipboard.writeText(
      `# ${selectedSubtopic.title || "Study Notes"}\n\n${selectedSubtopic.description.replace(/\\n/g, "\n")}`
    );
    setCopied(true);
    toast.success("Notes copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!plan) return null;

  const totalLessonsCount = allLessons.length;
  const completedCount = completedSubtopics.size;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;
  const currentLessonDay = selectedSubtopic?.day ?? expandedDay ?? 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-6xl h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200/80 outline-none"
      >
        <ModalHeader
          subject={plan.subject}
          completedCount={completedCount}
          totalLessonsCount={totalLessonsCount}
          progressPercent={progressPercent}
          onClose={onClose}
        />

        <div className="flex flex-1 overflow-hidden bg-slate-50">
          <PlanSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredSchedule={filteredSchedule}
            expandedDay={expandedDay}
            handleToggleDay={handleToggleDay}
            selectedSubtopic={selectedSubtopic}
            setSelectedSubtopic={(sub) => {
              setExpandedDay(sub.day);
              setSelectedSubtopic(sub);
            }}
            completedSubtopics={completedSubtopics}
          />

          <main className="flex-1 bg-white overflow-y-auto flex flex-col custom-scrollbar selection:bg-indigo-100 selection:text-indigo-900">
            <AnimatePresence mode="wait">
              {selectedSubtopic ? (
                <LessonViewer
                  key={selectedSubtopic.id || selectedSubtopic.title}
                  selectedSubtopic={selectedSubtopic}
                  subject={plan.subject}
                  activeDay={currentLessonDay}
                  formattedDescription={formattedDescription}
                  completedSubtopics={completedSubtopics}
                  toggleComplete={toggleComplete}
                  handleCopyNotes={handleCopyNotes}
                  copied={copied}
                  prevLesson={prevLesson}
                  nextLesson={nextLesson}
                  goToLesson={goToLesson}
                />
              ) : (
                <PlanEmptyState
                  schedule={schedule}
                  subject={plan.subject}
                  onStart={() => {
                    if (allLessons[0]) goToLesson(allLessons[0]);
                  }}
                />
              )}
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
}