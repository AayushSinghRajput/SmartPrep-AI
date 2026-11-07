"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiCpu,
  FiCheckCircle,
  FiX,
  FiCheck,
  FiAlertTriangle,
  FiShield,
  FiLayers,
} from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function WhyDifferent() {
  const { whyDifferent } = homepageContent;
  const comparison = whyDifferent.comparison || {
    genericAi: {
      title: "Generic AI & Web Search",
      tag: "Unverified Fluff",
      points: [
        "Confusing notations from foreign boards (CBSE / Cambridge)",
        "Overwhelming essay responses with zero syllabus boundaries",
        "Risk of marks deduction on NEB board evaluations",
        "No synchronization with your examination countdown",
      ],
    },
    smartprepAi: {
      title: "SmartPrep AI Grounding",
      tag: "100% NEB Aligned",
      points: [
        "Strict adherence to official NEB +2 Science definitions",
        "Exact formula notations accepted in IOE & CEE exams",
        "Structured daily milestones matched to your exam date",
        "Verified answer citations directly from your textbook",
      ],
    },
  };

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] border-b border-slate-200/80 relative overflow-hidden">
      {/* Platform Ambient Radial Diffuser */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-indigo-100/30 via-slate-100/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-100 text-indigo-700 mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span>{whyDifferent.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Answers from your textbook,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 font-editorial italic font-normal">
              not random internet noise.
            </span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            {whyDifferent.explanation}
          </p>
        </div>

        {/* 2-Column Direct Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-14">
          {/* Card 1: Generic Search & Standard AI */}
          <div className="bg-white rounded-[28px] border border-rose-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                    The Risky Alternative
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {comparison.genericAi.title}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {comparison.genericAi.tag}
                </span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm">
                {comparison.genericAi.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                      <FiX className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-600 leading-snug font-normal">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-rose-600">
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>High risk of preparing with incorrect notations for NEB.</span>
            </div>
          </div>

          {/* Card 2: SmartPrep AI Textbook Grounding (Hero Card) */}
          <div className="bg-gradient-to-b from-white via-indigo-50/20 to-white rounded-[28px] border-2 border-indigo-600 p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-indigo-950/5 relative">
            <div>
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                    The Grounded Solution
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {comparison.smartprepAi.title}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {comparison.smartprepAi.tag}
                </span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm">
                {comparison.smartprepAi.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <FiCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-800 leading-snug font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <FiCheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Zero hallucinations. 100% accepted by exam evaluators.</span>
            </div>
          </div>
        </div>

        {/* 3-Step Grounding Pipeline Rail */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-center flex flex-col items-center">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
                <FiFileText className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                1. Your Textbook PDF
              </h4>
              <p className="text-xs text-slate-500">Official NEB +2 Science syllabus & reference book</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-100 text-center flex flex-col items-center">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-600/20">
                <FiCpu className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                2. Semantic Syllabus Parsing
              </h4>
              <p className="text-xs text-slate-500">Maps high-weightage derivations, formulas & units</p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-center flex flex-col items-center">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 shadow-2xs">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                3. Grounded Notes & Quizzes
              </h4>
              <p className="text-xs text-slate-500">Strictly focused on the exact examination format</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
