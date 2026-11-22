import math
from typing import List, Dict, Any

# ---------------------------
# Flatten TOC
# --------------------------

def flatten_toc(data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Flatten TOC into list of subtopics with page ranges."""
    if not data or not isinstance(data, dict):
        return []

    for key in ("table_of_contents", "tableOfContents", "toc"):
        if key in data and isinstance(data[key], list):
            flat_topics = []

            for unit in data[key]:
                chapter_title = (unit.get("title") or "Unit").strip()
                sections = unit.get("sections", [])

                # If the unit has no sections, treat the unit itself as a section
                if not sections:
                    sections = [{"title": chapter_title, "page": unit.get("unit") or 1}]

                for idx, sec in enumerate(sections):
                    sec_title = (sec.get("title") or chapter_title).strip()
                    start_page = sec.get("page", 1) or 1

                    # determine end_page from next section
                    if idx + 1 < len(sections):
                        next_page = sections[idx + 1].get("page", start_page)
                        end_page = max(start_page, next_page - 1) if next_page > start_page else start_page
                    else:
                        end_page = start_page

                    flat_topics.append(
                        {
                            "chapter": chapter_title,
                            "title": sec_title,
                            "start_page": start_page,
                            "end_page": end_page,
                            "content": ""
                        }
                    )

            return flat_topics

    return []


# ---------------------------
# Group subtopics by chapter
# ---------------------------
def group_by_chapter(flat_topics: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    grouped: Dict[str, List[Dict[str, Any]]] = {}

    for item in flat_topics:
        grouped.setdefault(item["chapter"], []).append(
            {
                "title": item["title"],
                "start_page": item["start_page"],
                "end_page": item["end_page"],
                "content": item["content"],
            }
        )

    return [
        {"topic": chapter, "subtopics": subtopics}
        for chapter, subtopics in grouped.items()
    ]


# ---------------------------
# Generate study schedule
# ---------------------------
def generate_study_schedule_from_toc(toc_data: Dict[str, Any], total_days: int) -> List[Dict[str, Any]]:
    """
    Distribute topics evenly across total_days.
    INVARIANT: Generates EXACTLY total_days days, numbered consecutively: 1, 2, ..., total_days.
    Never produces gaps or skipped days (e.g., prevents jumping from Day 5 to Day 10).
    """
    if not toc_data or total_days <= 0:
        return []

    flat_topics = flatten_toc(toc_data)
    total_topics = len(flat_topics)
    if total_topics == 0:
        return []

    schedule = []

    # CASE 1: total_topics >= total_days
    # Distribute topics across all days without any empty days
    if total_topics >= total_days:
        k, m = divmod(total_topics, total_days)
        start_idx = 0
        for day in range(1, total_days + 1):
            count = k + (1 if day <= m else 0)
            day_slice = flat_topics[start_idx : start_idx + count]
            start_idx += count
            schedule.append({
                "day": day,
                "topics": group_by_chapter(day_slice)
            })
        return schedule

    # CASE 2: total_topics < total_days (e.g. 2 topics for 10 days, or 4 topics for 10 days)
    # Every day from 1 to total_days MUST be present and consecutive!
    phase_labels = [
        "Core Concepts & Overview",
        "Deep Dive & Theoretical Analysis",
        "Formulas, Equations & Architecture",
        "Applications, Case Studies & Implementation",
        "Critical Analysis & Comparative Discussion",
        "Practice Drills & Problem Solving",
        "Knowledge Check & Self-Evaluation",
        "Advanced Insights & Key Takeaways",
        "Comprehensive Review & Summary",
    ]

    for day in range(1, total_days + 1):
        topic_idx = min((day - 1) * total_topics // total_days, total_topics - 1)
        base_topic = flat_topics[topic_idx]

        # Count how many days this topic spans and which sub-day we are on
        days_for_this_topic = sum(
            1 for d in range(1, total_days + 1)
            if min((d - 1) * total_topics // total_days, total_topics - 1) == topic_idx
        )
        sub_day_index = sum(
            1 for d in range(1, day + 1)
            if min((d - 1) * total_topics // total_days, total_topics - 1) == topic_idx
        ) - 1

        if days_for_this_topic > 1:
            if sub_day_index == days_for_this_topic - 1 and day == total_days:
                suffix = "Final Review & Course Assessment"
            elif sub_day_index < len(phase_labels):
                suffix = phase_labels[sub_day_index]
            else:
                suffix = f"Part {sub_day_index + 1}"
            subtopic_title = f"{base_topic['title']} — {suffix}"
        else:
            subtopic_title = base_topic['title']

        day_item = {
            "title": subtopic_title,
            "start_page": base_topic["start_page"],
            "end_page": base_topic["end_page"],
            "content": "",
        }

        schedule.append({
            "day": day,
            "topics": [
                {
                    "topic": base_topic["chapter"],
                    "subtopics": [day_item]
                }
            ]
        })

    return schedule
