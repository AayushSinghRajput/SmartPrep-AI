"use client";

import { useEffect, useState } from "react";
import StudyBookCard from "../ui/Card";
import { getUserBooks } from "../../services/pdf";
import Loader from "../ui/Loader";
import { TAB_HEADERS } from "../../lib/studygridconstants";
import { fetchPerformance, fetchDashboardStats } from "../../services/performance";
import {
  FiBookOpen,
  FiZap,
  FiTrendingUp,
  FiArrowRight,
  FiTarget,
  FiClock,
  FiCheckCircle,
  FiAward
} from "react-icons/fi";
import { EmptyState } from "../ui/EmptyState";

interface DashboardStats {
  overall_completion: number;
  total_completed_days: number;
  total_study_days: number;
  current_streak: number;
  streak_label: string;
  streak_sub: string;
  studied_today: boolean;
  quiz_accuracy: number;
  accuracy_label: string;
  accuracy_color: string;
  total_questions_solved: number;
  total_correct: number;
  active_books_count: number;
  readiness_index: number;
  next_up: string;
  active_book?: {
    pdf_hash: string;
    name: string;
    study_progress: number;
    completed_days: number;
    total_days: number;
  };
}

interface StudyBook {
  id: number;
  pdf_hash: string;
  name: string;
  image?: string;
  performance_progress?: number;
  study_progress?: number;
  pdf_url: string;
  day_wise_scores?: {
    day: number;
    score: number;
    total_questions: number;
  }[];
}

interface StudyBooksGridProps {
  activeTab?: "dashboard" | "performance" | "mcq" | "notes";
  onBookClick?: (book: StudyBook) => void;
}

export default function StudyBooksGrid({
  activeTab = "dashboard",
  onBookClick,
}: StudyBooksGridProps) {
  const [books, setBooks] = useState<StudyBook[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const [booksResponse, statsResponse] = await Promise.all([
          getUserBooks().catch(() => ({ books: [] })),
          fetchDashboardStats().catch(() => null),
        ]);

        if (statsResponse) {
          setStats(statsResponse);
        }

        const rawBooks = booksResponse?.books || [];
        const booksWithPerformance = await Promise.all(
          rawBooks.map(async (book: StudyBook) => {
            let dayWiseScores: {
              day: number;
              score: number;
              total_questions: number;
            }[] = [];

            try {
              const perf = await fetchPerformance(book.pdf_hash);
              dayWiseScores = perf?.day_wise_scores || [];
            } catch (err) {
              console.error("Performance fetch failed", err);
            }

            return {
              ...book,
              image: book.image || "/images/Company_Logo.png",
              performance_progress: book.performance_progress ?? 0,
              study_progress: book.study_progress ?? 0,
              day_wise_scores: dayWiseScores,
            };
          })
        );

        setBooks(booksWithPerformance);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleDeleteBook = (pdf_hash: string) => {
    setBooks((prev) => prev.filter((b) => b.pdf_hash !== pdf_hash));
  };

  const { heading, subheading, icon } =
    TAB_HEADERS[activeTab] || TAB_HEADERS.dashboard;

  const cardVariant = activeTab === "performance" ? "performance" : "dashboard";
  const allowImageEdit = activeTab === "dashboard";

  if (loading) return <Loader />;

  const activeBook = books.length > 0 ? books[0] : null;

  return (
    <div className="bg-slate-50 min-h-full pb-12">
      {/* Header section */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 text-xl border border-indigo-100">
            {icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {heading}
            </h1>
            {subheading && <p className="text-sm text-slate-500 mt-0.5">{subheading}</p>}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BENTO GRID ARCHITECTURE (Dashboard View) */}
      {/* ========================================================= */}
      {activeTab === "dashboard" && activeBook && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
          
          {/* HERO TILE (Span-2): Resume Immediate Action */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Study Plan
                </span>
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5" />
                  {stats?.studied_today ? "Studied Today" : "Session Pending"}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1 truncate">
                {stats?.active_book?.name || activeBook.name}
              </h2>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                Continue your scheduled daily prep, interactive notes extraction, and practice quizzes.
              </p>

              {/* Progress bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Overall Prep Completion</span>
                  <span className="text-indigo-600 font-bold">
                    {stats?.overall_completion ?? activeBook.study_progress ?? 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(stats?.overall_completion ?? activeBook.study_progress ?? 0, 0)}%` }}
                  />
                </div>
              </div>

              {/* Added Micro Statistics Chips */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 mb-4 bg-slate-50/80 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100/70 text-indigo-700 flex items-center justify-center shrink-0">
                    <FiTarget className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate">Readiness</p>
                    <p className="font-bold text-slate-800 text-xs truncate">
                      {stats?.readiness_index ?? 0}<span className="text-[10px] text-slate-400 font-normal">/100</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-x border-slate-200/60 px-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate">Questions</p>
                    <p className="font-bold text-slate-800 text-xs truncate">
                      {stats?.total_questions_solved ?? 0} <span className="text-[10px] text-slate-400 font-normal">solved</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-1">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                    <FiAward className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate">Days Done</p>
                    <p className="font-bold text-slate-800 text-xs truncate">
                      {stats?.total_completed_days ?? 0}<span className="text-[10px] text-slate-400 font-normal">/{stats?.total_study_days || 30}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 truncate">
                Next up: <strong className="text-slate-800 font-semibold">{stats?.next_up || "Day 1 Review & Quiz"}</strong>
              </span>
              <button
                onClick={() => onBookClick?.(activeBook)}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm transition-all duration-150 cursor-pointer shrink-0"
              >
                Resume Learning <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COMPANION METRIC TILES (Span-1 Stack) */}
          <div className="space-y-4 lg:space-y-6">
            
            {/* Companion Tile 1: Study Streak */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Current Streak
                  </span>
                  <span className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                    <FiTrendingUp className="w-4 h-4" />
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {stats?.current_streak ?? 0} {stats?.current_streak === 1 ? "Day" : "Days"}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      (stats?.current_streak ?? 0) > 0
                        ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                        : "text-amber-700 bg-amber-50 border-amber-200"
                    }`}
                  >
                    {(stats?.current_streak ?? 0) > 0 ? "🔥 " : "⚡ "}
                    {stats?.streak_label || ((stats?.current_streak ?? 0) > 0 ? "On Track" : "Start Today")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {stats?.streak_sub || "Complete a daily study session or quiz to build your streak."}
              </p>
            </div>

            {/* Companion Tile 2: Mastery & Accuracy Ring Metric */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Quiz Accuracy
                  </span>
                  <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
                    <FiZap className="w-4 h-4" />
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {(stats?.total_questions_solved ?? 0) > 0 ? `${stats?.quiz_accuracy ?? 0}%` : "--"}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      stats?.accuracy_color === "emerald"
                        ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                        : stats?.accuracy_color === "indigo"
                        ? "text-indigo-700 bg-indigo-50 border-indigo-200"
                        : stats?.accuracy_color === "amber"
                        ? "text-amber-700 bg-amber-50 border-amber-200"
                        : "text-slate-600 bg-slate-100 border-slate-200"
                    }`}
                  >
                    {stats?.accuracy_label || "No Quizzes Yet"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {(stats?.total_questions_solved ?? 0) > 0
                  ? `Based on ${stats?.total_questions_solved} practice questions solved.`
                  : "Solve your first practice quiz to measure retention."}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* MODULE / STUDY MATERIALS GRID */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800 tracking-tight mb-1">
          {activeTab === "dashboard" ? "Study Materials & Modules" : "Performance Analytics"}
        </h3>
        <p className="text-xs text-slate-500">
          Select a textbook or module to open interactive schedules, notes, and AI question generators.
        </p>
      </div>

      {books.length === 0 ? (
        <EmptyState
          title="No Study Books Uploaded Yet"
          description="Upload your syllabus or textbook PDF to generate structured daily schedules and instant study materials."
          icon={<FiBookOpen className="w-7 h-7 text-indigo-600" />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {books.map((book) => (
            <StudyBookCard
              key={book.id}
              book={book}
              variant={cardVariant}
              allowImageEdit={allowImageEdit}
              onDelete={handleDeleteBook}
              onClick={() => onBookClick?.(book)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
