import { generateMCQs } from "../services/mcq";
import { summarizeDayNotes } from "../services/note";

export function computeNavigation(selectedSubtopic, localSchedule, mode) {
  if (!selectedSubtopic) return { hasNext: false, hasPrevious: false };

  // In notes/MCQ mode, subtopic navigation is disabled
  if (mode === "notes" || mode === "mcq") {
    return { hasNext: false, hasPrevious: false };
  }

  const { currentDay, topicIdx, subtopicIdx } = selectedSubtopic;
  const day = localSchedule[currentDay - 1];
  const topic = day?.topics?.[topicIdx];

  if (!topic || !topic.subtopics) {
    return { hasNext: false, hasPrevious: false };
  }

  const hasNext =
    subtopicIdx + 1 < topic.subtopics.length ||
    topicIdx + 1 < day.topics.length ||
    currentDay < localSchedule.length;

  const hasPrevious = subtopicIdx > 0 || topicIdx > 0 || currentDay > 1;

  return { hasNext, hasPrevious };
}

export function calculateNextTarget(currentDay, topicIdx, subtopicIdx, localSchedule) {
  const day = localSchedule[currentDay - 1];
  if (!day) return null;

  const isLastSubtopic = subtopicIdx === day.topics[topicIdx].subtopics.length - 1;
  const isLastTopic = topicIdx === day.topics.length - 1;

  // Case 1: Next subtopic in same topic
  if (!isLastSubtopic) {
    return { dayNum: currentDay, topicIdx, subtopicIdx: subtopicIdx + 1, dayCompleted: false };
  }

  // Case 2: Move to next topic in same day
  if (!isLastTopic) {
    return { dayNum: currentDay, topicIdx: topicIdx + 1, subtopicIdx: 0, dayCompleted: false };
  }

  // Case 3: Day completed, check next day
  if (currentDay < localSchedule.length) {
    return { dayNum: currentDay + 1, topicIdx: 0, subtopicIdx: 0, dayCompleted: true };
  }

  return { dayNum: currentDay, topicIdx, subtopicIdx, dayCompleted: true, endOfSchedule: true };
}

export function calculatePrevTarget(currentDay, topicIdx, subtopicIdx, localSchedule) {
  const day = localSchedule[currentDay - 1];
  if (!day) return null;

  if (subtopicIdx > 0) {
    return { dayNum: currentDay, topicIdx, subtopicIdx: subtopicIdx - 1 };
  }

  if (topicIdx > 0) {
    const prevTopic = day.topics[topicIdx - 1];
    return {
      dayNum: currentDay,
      topicIdx: topicIdx - 1,
      subtopicIdx: prevTopic.subtopics.length - 1,
    };
  }

  if (currentDay > 1) {
    const prevDay = localSchedule[currentDay - 2];
    const lastTopicIdx = prevDay.topics.length - 1;
    const lastTopic = prevDay.topics[lastTopicIdx];
    return {
      dayNum: currentDay - 1,
      topicIdx: lastTopicIdx,
      subtopicIdx: lastTopic.subtopics.length - 1,
    };
  }

  return null;
}

export async function fetchDaySpecialContent(mode, dayNumber, fileHash) {
  if (mode === "mcq") {
    const mcqs = await generateMCQs({
      pdf_hash: fileHash,
      day_number: dayNumber,
    });
    return {
      title: `Day ${dayNumber} MCQs`,
      content: mcqs || [],
      currentDay: dayNumber,
    };
  }

  if (mode === "notes") {
    const notesContent = await summarizeDayNotes({
      book_id: fileHash,
      day_number: dayNumber,
    });
    return {
      title: `Day ${dayNumber} Notes`,
      content: notesContent?.notes || "No notes available for this day.",
      currentDay: dayNumber,
    };
  }

  return null;
}
