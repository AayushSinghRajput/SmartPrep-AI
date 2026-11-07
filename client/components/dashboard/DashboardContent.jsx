"use client";

import { FiX, FiUploadCloud } from "react-icons/fi";
import UploadUI from "../ui/uploadui";

export default function DashboardContent({ onUploadSuccess, onClose }) {
  return (
    <div className="relative w-full py-2 sm:py-4">
      {/* Close button at top-right corner if modal mode */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>
      )}

      {/* Content area */}
      <div className="max-w-xl mx-auto space-y-6">
        {/* Welcome header */}
        <div className="text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <FiUploadCloud className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create a Custom Study Plan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Upload your syllabus or textbook PDF, set your target prep duration, and our AI will organize your day-wise schedule.
          </p>
        </div>

        {/* Upload section container */}
        <div className="bg-slate-50/70 p-4 sm:p-6 rounded-2xl border border-slate-200/60">
          <UploadUI onUploadSuccess={onUploadSuccess} />
        </div>
      </div>
    </div>
  );
}
