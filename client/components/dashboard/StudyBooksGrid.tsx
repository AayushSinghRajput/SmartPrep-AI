"use client";

import { useEffect, useState } from "react";
import StudyBookCard from "../ui/Card";
import { getUserBooks } from "../../services/pdf";
import Loader from "../ui/Loader";
import { TAB_HEADERS } from "../../lib/studygridconstants";
import { fetchPerformance } from "../../services/performance";
import { FiBookOpen, FiZap, FiTrendingUp, FiArrowRight, FiTarget, FiClock } from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getUserBooks();

        const booksWithPerformance = await Promise.all(
          (data.books || []).map(async (book: StudyBook) => {
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
                  <FiClock className="w-3.5 h-3.5" /> Updated Recently
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1 truncate">
                {activeBook.name}
              </h2>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                Continue your scheduled daily prep, interactive notes extraction, and practice quizzes.
              </p>

              {/* Progress bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Overall Prep Completion</span>
                  <span className="text-indigo-600">{activeBook.study_progress || 45}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(activeBook.study_progress || 45, 5)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Next up: <strong className="text-slate-800">Chapter 1 Review & Quiz</strong>
              </span>
              <button
                onClick={() => onBookClick?.(activeBook)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm transition-all duration-150"
              >
                Resume Learning <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COMPANION METRIC TILES (Span-1 Stack) */}
          <div className="space-y-4 lg:space-y-6">
            
            {/* Companion Tile 1: Study Streak */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Current Streak
                </span>
                <span className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                  <FiTrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">7 Days</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  On Track
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Daily study goal achieved 5 days in a row.</p>
            </div>

            {/* Companion Tile 2: Mastery & Accuracy Ring Metric */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Quiz Accuracy
                </span>
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
                  <FiZap className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">84%</span>
                <span className="text-xs font-semibold text-indigo-600">High Retention</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Based on last 28 practice questions solved.</p>
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
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <FiBookOpen size={24} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No Study Books Uploaded Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
            Upload your syllabus or textbook PDF to generate structured daily schedules and instant study materials.
          </p>
        </div>
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
