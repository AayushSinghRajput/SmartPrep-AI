"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaBookOpen, FaStar } from "react-icons/fa";
import { colors } from "../../constants/colors";

export default function PredefinedPlanCard({
  book,
  onViewDetails,
  isLoading,
  isAnyLoading = false,
  subjectImages,
  aiImg,
  cardVariants,
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      layout
      className="group relative"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:scale-[1.02]">
        {/* Level Badge */}
        {book.level && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: colors.accent.amber[100],
                color: colors.accent.amber[500],
              }}
            >
              {book.level}
            </span>
          </div>
        )}

        {/* Rating & Views */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-amber-500 text-2xl">
              <FaStar />
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: colors.neutral[800] }}
            >
              {book.rating || "N/A"}
            </span>
          </div>
        </div>

        {/* Book Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={subjectImages[book.subject] || aiImg}
            alt={book.subject}
            fill
            priority={book.subject === "Physics"}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

          {/* Progress Bar - if completion exists */}
          {book.completion && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="mb-1 flex justify-between">
                <span className="text-xs font-medium text-white">Progress</span>
                <span className="text-xs font-bold text-white">
                  {book.completion}%
                </span>
              </div>
              <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: colors.gradients.primary }}
                  initial={{ width: 0 }}
                  animate={{ width: `${book.completion}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-4">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: colors.neutral[900] }}
            >
              {book.subject}
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: colors.neutral[600] }}
            >
              Complete {book.duration || "30 Days"} roadmap with daily targets
            </p>
          </div>

          {/* Metadata */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <div
                    className="w-full h-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: colors.primary[100],
                      color: colors.primary[700],
                    }}
                  >
                    {book.author
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </div>
                </div>
                <div>
                  <p
                    className="text-xs"
                    style={{ color: colors.neutral[500] }}
                  >
                    Author
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.neutral[800] }}
                  >
                    {book.author || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className="text-xs"
                  style={{ color: colors.neutral[500] }}
                >
                  Duration
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: colors.primary[600] }}
                >
                  {book.duration || "30 Days"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onViewDetails(book.subject, book.id)}
              disabled={isLoading || isAnyLoading}
              className="w-full bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-[3px_3px_6.4px_1px_#9E9999] transition-shadow duration-300 hover:shadow-[5px_5px_8px_2px_rgba(139,92,246,0.75)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <span className="text-2xl text-white">
                    <FaBookOpen />
                  </span>
                  View 30-Day Plan
                  <span className="ml-auto">→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
