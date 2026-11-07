"use client";

import { useState } from "react";
import { FiLoader, FiUploadCloud, FiFileText, FiCheck, FiCalendar, FiBook } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { uploadPdfAndGenerateSchedule } from "../../services/pdf";

export default function UploadUI({ onUploadSuccess }) {
  // ────────────── State ──────────────
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [days, setDays] = useState("");
  const [bookName, setBookName] = useState("");

  // ────────────── Handlers ──────────────
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setPdfFile(file);
    setFilename(file.name);
  };

  const handleDaysChange = (e) => {
    let value = e.target.value;
    if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }
    setDays(value);
  };

  const handleLearnNow = async () => {
    if (!pdfFile || !days || !bookName.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    const numDays = Number(days);
    if (!numDays || numDays <= 0) {
      toast.error("Number of days must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const result = await uploadPdfAndGenerateSchedule(
        pdfFile,
        numDays,
        bookName.trim()
      );

      if (result.success) {
        toast.success("Study schedule generated successfully!");
        onUploadSuccess?.(result);
      } else {
        toast.error(result.message || "Upload failed.");
      }
    } catch (error) {
      toast.error("Server error during upload.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl border border-indigo-100 p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mb-3">
            <FiLoader className="w-6 h-6 animate-spin text-indigo-600" />
          </div>
          <p className="text-slate-900 font-bold text-base">
            Analyzing your syllabus PDF...
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Extracting chapters, subtopics, and structuring your day-by-day prep plan.
          </p>
        </div>
      )}

      {/* PDF Dropzone */}
      <label
        htmlFor="file-upload"
        className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 sm:p-8 w-full transition-all ${
          filename
            ? "border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/60"
            : "border-slate-300 hover:border-indigo-400 bg-white hover:bg-indigo-50/30"
        }`}
      >
        {filename ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
              <FiCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              File Ready
            </span>
            <p className="text-sm font-bold text-slate-900 truncate max-w-[280px]">
              {filename}
            </p>
            <span className="text-[11px] text-slate-500 mt-1 underline">
              Click to choose a different PDF
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-3">
              <FiUploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Upload Syllabus or Textbook PDF
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Drag & drop or browse from your device (PDF only)
            </p>
          </div>
        )}
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </label>

      {/* Input Fields */}
      <div className="mt-4 space-y-3 text-left">
        {/* Book Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <FiBook className="w-3.5 h-3.5 text-indigo-600" />
            <span>Subject or Book Name</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Physics Grade 12 or Modern Biology"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            disabled={loading}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-2xs"
          />
        </div>

        {/* Days */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Preparation Duration (Days)</span>
          </label>
          <input
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={handleDaysChange}
            disabled={loading}
            placeholder="e.g. 15, 30, 45"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-2xs"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            The AI divides the syllabus topics evenly across this exact number of days.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleLearnNow}
          disabled={loading || !pdfFile || !days || !bookName.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-sm transition-all"
        >
          <FaBookOpen className="w-3.5 h-3.5" />
          <span>Generate Day-Wise Plan</span>
        </motion.button>
      </div>
    </div>
  );
}
