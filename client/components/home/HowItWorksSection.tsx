"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiCalendar, FiList, FiTrendingUp } from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function HowItWorksSection() {
  const { howItWorks } = homepageContent;

  const stepIcons = [
    <FiUploadCloud key="0" className="w-6 h-6 text-indigo-600" />,
    <FiCalendar key="1" className="w-6 h-6 text-amber-600" />,
    <FiList key="2" className="w-6 h-6 text-indigo-600" />,
    <FiTrendingUp key="3" className="w-6 h-6 text-emerald-600" />,
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {howItWorks.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {howItWorks.heading}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            {howItWorks.subtitle}
          </p>
        </div>

        {/* Desktop 4-Step Flow with SVG Connector Line */}
        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 -translate-y-8 -z-0">
            <svg className="w-full h-8 overflow-visible" fill="none">
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {howItWorks.steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {stepIcons[idx]}
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors font-mono">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Step {idx + 1} of 4</span>
                  <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">
                    Next →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

