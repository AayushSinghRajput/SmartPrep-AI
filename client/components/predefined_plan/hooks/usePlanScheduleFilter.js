import { useMemo } from "react";

export function usePlanScheduleFilter(schedule = [], searchQuery = "") {
  // Build flattened lessons with stable unique IDs (day-topic-subtopic)
  const allLessons = useMemo(() => {
    const list = [];
    schedule.forEach((dayData) => {
      dayData.topics?.forEach((topic, tIdx) => {
        topic.subtopics?.forEach((sub, sIdx) => {
          const lessonId = `d${dayData.day}_t${tIdx}_s${sIdx}`;
          list.push({
            id: lessonId,
            day: dayData.day,
            topicTitle: topic?.title || "Topic",
            subtopic: {
              ...sub,
              id: lessonId,
              day: dayData.day,
            },
          });
        });
      });
    });
    return list;
  }, [schedule]);

  // Filter schedule by search query with guards against missing titles
  const filteredSchedule = useMemo(() => {
    if (!searchQuery.trim()) return schedule;
    const query = searchQuery.toLowerCase().trim();

    return schedule
      .map((dayData) => {
        const matchesDay = `day ${dayData.day}`.includes(query);
        const matchingTopics = (dayData.topics || [])
          .map((topic, tIdx) => {
            const topicTitle = (topic?.title || "").toLowerCase();
            const matchesTopic = topicTitle.includes(query);

            const matchingSubtopics = (topic.subtopics || [])
              .map((sub, sIdx) => ({
                ...sub,
                id: `d${dayData.day}_t${tIdx}_s${sIdx}`,
                day: dayData.day,
              }))
              .filter((sub) => {
                const subTitle = (sub?.title || "").toLowerCase();
                const subDesc = (sub?.description || "").toLowerCase();
                return matchesTopic || subTitle.includes(query) || subDesc.includes(query);
              });

            return {
              ...topic,
              subtopics: matchesTopic
                ? (topic.subtopics || []).map((sub, sIdx) => ({
                    ...sub,
                    id: `d${dayData.day}_t${tIdx}_s${sIdx}`,
                    day: dayData.day,
                  }))
                : matchingSubtopics,
            };
          })
          .filter((topic) => topic.subtopics.length > 0);

        if (matchesDay || matchingTopics.length > 0) {
          return {
            ...dayData,
            topics: matchesDay
              ? (dayData.topics || []).map((topic, tIdx) => ({
                  ...topic,
                  subtopics: (topic.subtopics || []).map((sub, sIdx) => ({
                    ...sub,
                    id: `d${dayData.day}_t${tIdx}_s${sIdx}`,
                    day: dayData.day,
                  })),
                }))
              : matchingTopics,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [schedule, searchQuery]);

  return { allLessons, filteredSchedule };
}
