"use client";

import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Loader2, AlertCircle } from "lucide-react";
import { getUserStudyPlans } from "../../lib/api";
import toast from "react-hot-toast";
import { FiBookOpen, FiCheckCircle, FiClock, FiTarget } from "react-icons/fi";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProgressCard({ course }) {
  const currentProgress = course.progress || 0;

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [currentProgress, 100 - currentProgress],
        backgroundColor: ["#4F46E5", "#F1F5F9"],
        hoverBackgroundColor: ["#4338CA", "#E2E8F0"],
        borderWidth: 0,
        cutout: "78%",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-lg font-bold">
              {course.icon || "📖"}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 line-clamp-1">{course.name}</h2>
              <p className="text-xs text-slate-500 font-medium">{course.category || "Study Plan"}</p>
            </div>
          </div>
          <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
            {course.duration}
          </span>
        </div>

        <div className="relative w-[150px] h-[150px] mx-auto flex items-center justify-center mb-6">
          <Doughnut key={course.progress} data={doughnutData} options={chartOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-900 leading-none">
              {course.progress}%
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              Completed
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-6">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 font-medium block text-[11px]">Units Progress</span>
          <span className="font-semibold text-slate-800">
            {course.lessonsCompleted} / {course.totalLessons} Units
          </span>
        </div>

        <span
          className={`font-semibold px-2.5 py-1 rounded-full text-xs border ${
            course.progress === 100
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-indigo-50 text-indigo-700 border-indigo-200"
          }`}
        >
          {course.progress === 100 ? "Completed" : "In Progress"}
        </span>
      </div>
    </div>
  );
}

export default function ProgressTracker() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const res = await getUserStudyPlans();
        if (res && res.success && res.data) {
          const mappedData = res.data.map((plan) => {
            let total = 0;
            let completed = 0;

            if (plan.schedule) {
              plan.schedule.forEach((day) => {
                day.topics.forEach((topic) => {
                  topic.subtopics.forEach((sub) => {
                    total++;
                    if (sub.completed) completed++;
                  });
                });
              });
            }

            return {
              id: plan._id,
              name: plan.subject || "Untitled Plan",
              category: plan.category || "Academic Plan",
              progress: plan.progress || 0,
              duration: `${plan.schedule?.length || 0} Days`,
              lessonsCompleted: completed,
              totalLessons: total,
              icon: "📚",
            };
          });
          setCourseData(mappedData);
        } else {
          setCourseData([]);
        }
      } catch (error) {
        toast.error("Failed to load progress metrics");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();

    window.addEventListener("focus", fetchProgress);
    return () => window.removeEventListener("focus", fetchProgress);
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 pt-20">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
        <h3 className="text-base font-semibold text-slate-800">Syncing Progress Analytics</h3>
      </div>
    );

  if (courseData.length === 0)
    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <FiBookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Learning Metrics Yet</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            Generate your first PDF study schedule from the dashboard to track your day-by-day progress here.
          </p>
        </div>
      </div>
    );

  const visibleCourses = showAll ? courseData : courseData.slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
            <FiTarget className="w-3.5 h-3.5" /> Learning Analytics
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Mastery & Progress
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time completion tracking across all active textbooks and course plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCourses.map((course) => (
            <ProgressCard key={course.id} course={course} />
          ))}
        </div>

        {courseData.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm transition-all"
            >
              {showAll ? "Show Featured" : `View All (${courseData.length})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}