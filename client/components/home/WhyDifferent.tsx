"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiCpu, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function WhyDifferent() {
  const { whyDifferent } = homepageContent;

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {whyDifferent.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {whyDifferent.heading}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {whyDifferent.explanation}
          </p>

          {/* Animated 3-Step Grounding Pipeline Visual */}
          <div className="pt-8">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Step 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
                    <FiFileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Your Textbook PDF</h4>
                  <p className="text-xs text-slate-500">NEB curriculum textbook or syllabus</p>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-600/20">
                    <FiCpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">SmartPrep AI Analysis</h4>
                  <p className="text-xs text-slate-500">Maps chapters, core formulas & definitions</p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 shadow-2xs">
                    <FiCheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Grounded Lessons & MCQs</h4>
                  <p className="text-xs text-slate-500">100% relevant to your upcoming examination</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700">
                <FiCheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero random web fluff. Exactly what is required for your exam.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

