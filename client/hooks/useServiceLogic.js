import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { generateContent } from "../services/content";
import { updateProgress } from "../services/progress";
import { fetchPerformance } from "../services/performance";
import { useScheduleAccordion } from "./useScheduleAccordion";
import {
  computeNavigation,
  calculateNextTarget,
  calculatePrevTarget,
  fetchDaySpecialContent,
} from "./useServiceNavigation";

export function useServiceLogic(planData, mode = "study") {
  const [localSchedule, setLocalSchedule] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const metaData = {
    subject: planData?.book_name || "Study Material",
    title: planData?.bookTitle || "Your PDF",
    fileHash: planData?.pdf_hash || planData?.fileHash || "default_hash",
    planId: planData?._id || planData?.id || "temp-id",
  };

  const fetchingRef = useRef({ dayNum: null, topicIdx: null, subtopicIdx: null });
  const activeRequestIdRef = useRef(0);

  const {
    expandedDays,
    expandedTopics,
    isDayExpanded,
    isTopicExpanded,
    toggleDayExpand,
    toggleTopicExpand,
  } = useScheduleAccordion((collapsedDayIndex) => {
    if (selectedSubtopic?.currentDay === collapsedDayIndex + 1) {
      setSelectedSubtopic(null);
    }
  });

  const planIdentity = planData?.pdf_hash || planData?.fileHash || planData?._id || planData?.id;
  const prevPlanIdentityRef = useRef(planIdentity);

  useEffect(() => {
    // Reset state when the plan identity changes
    if (prevPlanIdentityRef.current !== planIdentity) {
      prevPlanIdentityRef.current = planIdentity;
      activeRequestIdRef.current += 1;
      fetchingRef.current = { dayNum: null, topicIdx: null, subtopicIdx: null };
      setSelectedSubtopic(null);
      setSelectedDay(null);
    }

    if (!planData?.schedule) {
      setLocalSchedule([]);
      return;
    }
    // Keep schedule available immediately even if performance loading fails
    setLocalSchedule(planData.schedule);

    let isMounted = true;
    const loadPerformance = async () => {
      try {
        const perf = await fetchPerformance(planData.pdf_hash);
        if (!isMounted || !perf) return;
        setLocalSchedule((prev) =>
          prev.map((d) => ({
            ...d,
            performance_level:
              perf?.day_wise_scores?.find((p) => p.day === d.day)?.performance_level ?? null,
          }))
        );
      } catch (err) {
        console.error("Failed to load performance scores:", err);
      }
    };
    loadPerformance();
    return () => {
      isMounted = false;
    };
  }, [planData, planIdentity]);

  const getSubtopic = (dayNum, topicIdx, subtopicIdx) =>
    localSchedule?.[dayNum - 1]?.topics?.[topicIdx]?.subtopics?.[subtopicIdx] || null;

  const isContentEmpty = (subtopic) =>
    !subtopic?.content || (typeof subtopic.content === "string" && subtopic.content.trim() === "");

  const fetchSubtopicContent = async (dayNum, topicIdx, subtopicIdx) => {
    if (
      fetchingRef.current.dayNum === dayNum &&
      fetchingRef.current.topicIdx === topicIdx &&
      fetchingRef.current.subtopicIdx === subtopicIdx
    ) {
      return;
    }

    const subtopic = getSubtopic(dayNum, topicIdx, subtopicIdx);
    if (!subtopic) return toast.error("Subtopic not found");

    const requestId = ++activeRequestIdRef.current;
    fetchingRef.current = { dayNum, topicIdx, subtopicIdx };
    setSelectedSubtopic({ ...subtopic, content: null, images: [], currentDay: dayNum, topicIdx, subtopicIdx });
    setLoadingContent(true);

    try {
      const res = await generateContent({
        book_id: metaData.fileHash,
        day_number: dayNum,
        topic_index: topicIdx,
        subtopic_index: subtopicIdx,
      });

      if (requestId !== activeRequestIdRef.current) return;

      const updatedSubtopic = {
        ...subtopic,
        content: res?.content || "No content available.",
        images: Array.isArray(res?.images) ? res.images : [],
        currentDay: dayNum,
        topicIdx,
        subtopicIdx,
      };

      const updatedSchedule = [...localSchedule];
      if (updatedSchedule[dayNum - 1]?.topics?.[topicIdx]?.subtopics?.[subtopicIdx]) {
        updatedSchedule[dayNum - 1].topics[topicIdx].subtopics[subtopicIdx] = updatedSubtopic;
        setLocalSchedule(updatedSchedule);
      }
      setSelectedSubtopic(updatedSubtopic);
    } catch {
      if (requestId === activeRequestIdRef.current) toast.error("Failed to load content");
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setLoadingContent(false);
        fetchingRef.current = {};
      }
    }
  };

  const handleSubtopicClick = async (dayNum, topicIdx, subtopicIdx) => {
    const subtopic = getSubtopic(dayNum, topicIdx, subtopicIdx);
    if (!subtopic) return;

    if (isContentEmpty(subtopic)) {
      await fetchSubtopicContent(dayNum, topicIdx, subtopicIdx);
    } else {
      setSelectedSubtopic({ ...subtopic, currentDay: dayNum, topicIdx, subtopicIdx });
    }
  };

  const goToSubtopic = async (direction) => {
    if (!selectedSubtopic) return;
    const { currentDay, topicIdx, subtopicIdx } = selectedSubtopic;

    if (direction === "next") {
      const target = calculateNextTarget(currentDay, topicIdx, subtopicIdx, localSchedule);
      if (!target) return;

      if (target.dayCompleted) {
        try {
          await updateProgress({
            pdf_hash: metaData.fileHash,
            completed_days: currentDay,
            total_days: localSchedule.length,
          });
          toast.success(`Day ${currentDay} completed 🎉`);
        } catch (err) {
          console.error(err);
          toast.error("Failed to update progress");
        }
      }

      if (target.endOfSchedule) return;
      await handleSubtopicClick(target.dayNum, target.topicIdx, target.subtopicIdx);
    } else {
      const target = calculatePrevTarget(currentDay, topicIdx, subtopicIdx, localSchedule);
      if (!target) return;
      await handleSubtopicClick(target.dayNum, target.topicIdx, target.subtopicIdx);
    }
  };

  const { hasNext, hasPrevious } = computeNavigation(selectedSubtopic, localSchedule, mode);

  const handleDayClick = async (dayNumber) => {
    setSelectedDay(dayNumber);
    if (mode !== "mcq" && mode !== "notes") return;

    const requestId = ++activeRequestIdRef.current;
    setSelectedSubtopic({
      title: `Day ${dayNumber} ${mode === "mcq" ? "MCQs" : "Notes"}`,
      content: null,
      currentDay: dayNumber,
    });

    setLoadingContent(true);
    try {
      const result = await fetchDaySpecialContent(mode, dayNumber, metaData.fileHash);
      if (requestId === activeRequestIdRef.current && result) {
        setSelectedSubtopic(result);
      }
    } catch (error) {
      if (requestId === activeRequestIdRef.current) {
        toast.error("Complete your study plan for this day");
        console.error(error);
      }
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setLoadingContent(false);
      }
    }
  };

  const goToNextDay = async () => {
    if (!selectedDay || selectedDay + 1 > localSchedule.length) return;
    await handleDayClick(selectedDay + 1);
  };

  const goToPreviousDay = async () => {
    if (!selectedDay || selectedDay <= 1) return;
    await handleDayClick(selectedDay - 1);
  };

  const updateDayPerformance = ({ day, level }) => {
    if (level === undefined || level === null) return;
    setLocalSchedule((prev) =>
      prev.map((d) => (d.day === day ? { ...d, performance_level: level } : d))
    );
  };

  return {
    state: {
      localSchedule, expandedDays, expandedTopics, isDayExpanded, isTopicExpanded,
      selectedSubtopic, loadingContent, metaData, hasNext, hasPrevious, selectedDay,
    },
    actions: {
      toggleDayExpand, toggleTopicExpand, handleSubtopicClick, goToSubtopic,
      handleDayClick, goToNextDay, goToPreviousDay, updateDayPerformance,
    },
  };
}
