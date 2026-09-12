"use client";

import { motion } from "framer-motion";
import { colors } from "../../constants/colors";

export default function PredefinedStats({ showAll, onToggleShowAll, totalBooks }) {
  const extraCount = Math.max(0, totalBooks - 3);

  return (
    <motion.div
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onToggleShowAll}
        className="px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl active:scale-95 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        style={{
          background: showAll ? colors.neutral[100] : colors.primary[50],
          color: showAll ? colors.neutral[700] : colors.primary[700],
          border: `2px solid ${showAll ? colors.neutral[200] : colors.primary[200]}`,
        }}
      >
        {showAll ? (
          <>Show Less Plans</>
        ) : (
          <>
            View More Plans ({extraCount})
            <span
              className="ml-2 px-2 py-1 text-xs rounded-full"
              style={{
                background: colors.primary[100],
                color: colors.primary[700],
              }}
            >
              +{extraCount}
            </span>
          </>
        )}
      </button>

      {/* Metrics Banner */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color: colors.primary[700] }}
          >
            {totalBooks}+
          </div>
          <div className="text-sm" style={{ color: colors.neutral[600] }}>
            Study Plans
          </div>
        </div>
        <div
          className="w-px h-8"
          style={{ background: colors.neutral[200] }}
        />
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color: colors.primary[700] }}
          >
            4.7
          </div>
          <div className="text-sm" style={{ color: colors.neutral[600] }}>
            Avg Rating
          </div>
        </div>
        <div
          className="w-px h-8"
          style={{ background: colors.neutral[200] }}
        />
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color: colors.primary[700] }}
          >
            75%
          </div>
          <div className="text-sm" style={{ color: colors.neutral[600] }}>
            Success Rate
          </div>
        </div>
      </div>
    </motion.div>
  );
}
