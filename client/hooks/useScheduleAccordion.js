import { useState } from "react";

export function useScheduleAccordion(onDayCollapse) {
  const [expandedDays, setExpandedDays] = useState(new Set());
  const [expandedTopics, setExpandedTopics] = useState(new Map());

  const isDayExpanded = (dayIndex) => expandedDays.has(dayIndex);

  const isTopicExpanded = (dayIndex, topicIndex) =>
    expandedTopics.get(dayIndex)?.has(topicIndex) || false;

  const toggleDayExpand = (dayIndex) => {
    setExpandedDays((prev) => {
      const updated = new Set(prev);

      if (updated.has(dayIndex)) {
        // Collapse day
        updated.delete(dayIndex);

        // Collapse all topics of this day
        setExpandedTopics((prevTopics) => {
          const map = new Map(prevTopics);
          map.delete(dayIndex);
          return map;
        });

        // Trigger optional callback (e.g. clear selected subtopic)
        if (onDayCollapse) {
          onDayCollapse(dayIndex);
        }
      } else {
        // Expand day
        updated.add(dayIndex);
      }

      return updated;
    });
  };

  const toggleTopicExpand = (dayIndex, topicIndex) => {
    setExpandedTopics((prev) => {
      const map = new Map(prev);
      const topicSet = map.get(dayIndex) || new Set();

      topicSet.has(topicIndex)
        ? topicSet.delete(topicIndex)
        : topicSet.add(topicIndex);

      map.set(dayIndex, topicSet);
      return map;
    });
  };

  return {
    expandedDays,
    expandedTopics,
    isDayExpanded,
    isTopicExpanded,
    toggleDayExpand,
    toggleTopicExpand,
  };
}
