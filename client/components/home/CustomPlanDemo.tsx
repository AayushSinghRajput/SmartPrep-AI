"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiUploadCloud,
  FiCheckCircle,
  FiRefreshCw,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiBookOpen,
} from "react-icons/fi";
import Button from "../ui/Button";
import { homepageContent } from "@/content/homepage.content";

export default function CustomPlanDemo({ onTryWithPdf }: { onTryWithPdf?: () => void }) {
  const { customPlanDemo } = homepageContent;

  // Stages: 0: Initial, 1: File chip, 2: Upload progress, 3: Fields fill, 4: Loading schedule, 5: Table revealed
  const [step, setStep] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsReducedMotion(true);
      setStep(5);
    }
  }, []);

  // Sequence player
  useEffect(() => {
    if (isReducedMotion) return;

    const timer1 = setTimeout(() => setStep(1), 600); // File chip
    const timer2 = setTimeout(() => setStep(2), 1600); // Uploading
    const timer3 = setTimeout(() => setStep(3), 2600); // Inputs filled
    const timer4 = setTimeout(() => setStep(4), 3800); // Building plan
    const timer5 = setTimeout(() => setStep(5), 4900); // Final table

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isReducedMotion]);

  const handleReplay = () => {
    setStep(0);
    setTimeout(() => setStep(1), 300);
    setTimeout(() => setStep(2), 1300);
    setTimeout(() => setStep(3), 2300);
    setTimeout(() => setStep(4), 3400);
    setTimeout(() => setStep(5), 4500);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {customPlanDemo.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {customPlanDemo.heading}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 leading-relaxed">
            {customPlanDemo.subtitle}
          </p>
        </div>

        {/* Browser-Style Frame */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden bg-slate-50">
          {/* Browser Chrome Header */}
          <div className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                smartprep.ai/schedule-generator
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Replay sequence"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
                <span>Replay Demo</span>
              </button>
            </div>
          </div>

          {/* Browser Content Area */}
          <div className="p-5 sm:p-8 space-y-6">
            {/* Input Form Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              {/* File Upload Chip */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  1. Textbook PDF
                </span>
                <AnimatePresence mode="wait">
                  {step >= 1 ? (
                    <motion.div
                      key="file-chip"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-900"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FiFileText className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="truncate">{customPlanDemo.fileName}</span>
                      </div>
                      <span className="text-[10px] text-indigo-500 shrink-0">{customPlanDemo.fileSize}</span>
                    </motion.div>
                  ) : (
                    <div className="p-2.5 rounded-xl border border-dashed border-slate-300 text-slate-400 text-xs text-center">
                      Waiting for PDF...
                    </div>
                  )}
                </AnimatePresence>

                {/* Simulated Upload Bar */}
                {step >= 2 && step < 4 && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.0 }}
                    className="h-1 bg-indigo-600 rounded-full mt-2"
                  />
                )}
              </div>

              {/* Subject Input */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  2. Subject
                </span>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 h-10 flex items-center">
                  {step >= 3 ? (
                    <span className="text-slate-900 font-bold">{customPlanDemo.subject}</span>
                  ) : (
                    <span className="text-slate-400 font-normal">e.g. Physics</span>
                  )}
                </div>
              </div>

              {/* Number of Days */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  3. Preparation Duration
                </span>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 h-10 flex items-center justify-between">
                  {step >= 3 ? (
                    <>
                      <span className="text-slate-900 font-bold">{customPlanDemo.durationDays} Days</span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Calculated
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-400 font-normal">e.g. 10 or 30 days</span>
                  )}
                </div>
              </div>
            </div>

            {/* Loading Plan Animation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200"
              >
                <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
                <h4 className="text-sm font-bold text-slate-900">Building your 10-day syllabus schedule...</h4>
                <p className="text-xs text-slate-400 mt-1">Dividing textbook chapters into daily subtopics</p>
              </motion.div>
            )}

            {/* Generated Syllabus Table Result */}
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Generated Plan: {customPlanDemo.subject} (10 Days)
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">NEB Syllabus Aligned</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {customPlanDemo.sampleRows.map((row) => {
                    const isExpanded = expandedDay === row.day;
                    return (
                      <div key={row.day} className="transition-colors hover:bg-slate-50/50">
                        <div
                          onClick={() => setExpandedDay(isExpanded ? null : row.day)}
                          className="p-4 flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                              D{row.day}
                            </span>
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                                {row.topic}
                              </h5>
                              <p className="text-[11px] text-slate-400">
                                {row.subtopics.length} subtopics scheduled
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                row.status === "Active"
                                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {row.status}
                            </span>
                            {isExpanded ? (
                              <FiChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <FiChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Day 1 Subtopic Details */}
                        {isExpanded && row.day === 1 && (
                          <div className="px-5 pb-5 pt-1 bg-indigo-50/30 border-t border-indigo-50 space-y-3">
                            <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                              <p className="font-semibold text-slate-800">
                                {customPlanDemo.sampleDayContent.conceptSummary}
                              </p>
                              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-indigo-700">
                                Formula: {customPlanDemo.sampleDayContent.keyFormula}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs">
                              {row.subtopics.map((st, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-700 font-medium"
                                >
                                  <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5" />
                                  {st}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Faded Continuation Row */}
                  <div className="p-3.5 text-center text-xs text-slate-400 bg-slate-50/50 italic font-medium">
                    + Days 5 to 10 automatically scheduled from your uploaded textbook...
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Caption and CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-xs text-slate-500 italic max-w-md">
                {customPlanDemo.caption}
              </p>

              <Button
                variant="primary"
                size="md"
                onClick={onTryWithPdf}
                rightIcon={<FiArrowRight className="w-4 h-4" />}
              >
                {customPlanDemo.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

