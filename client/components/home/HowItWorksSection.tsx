"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUploadCloud,
  FiCalendar,
  FiList,
  FiTrendingUp,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function HowItWorksSection() {
  const { howItWorks } = homepageContent;
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Per-step theme configurations
  const stepConfigs = [
    {
      icon: <FiUploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />,
      bgIcon: "bg-indigo-50 border-indigo-100/90 text-indigo-600",
      accentBg: "from-indigo-500/10 via-indigo-50/20 to-transparent",
      accentColor: "#4f46e5",
      microToken: {
        icon: <FiFileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />,
        label: "NEB_Physics_Gr12.pdf",
        tag: "18.4 MB",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
      },
    },
    {
      icon: <FiCalendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />,
      bgIcon: "bg-amber-50 border-amber-100/90 text-amber-600",
      accentBg: "from-amber-500/10 via-amber-50/20 to-transparent",
      accentColor: "#f59e0b",
      microToken: {
        icon: <FiClock className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
        label: "30-Day Target",
        tag: "Exam Ready",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      },
    },
    {
      icon: <FiList className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />,
      bgIcon: "bg-sky-50 border-sky-100/90 text-sky-600",
      accentBg: "from-sky-500/10 via-sky-50/20 to-transparent",
      accentColor: "#0284c7",
      microToken: {
        icon: <FiCheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />,
        label: "Day 01 → Day 30",
        tag: "Syllabus Plan",
        badgeColor: "bg-sky-50 text-sky-700 border-sky-200/60",
      },
    },
    {
      icon: <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />,
      bgIcon: "bg-emerald-50 border-emerald-100/90 text-emerald-600",
      accentBg: "from-emerald-500/10 via-emerald-50/20 to-transparent",
      accentColor: "#10b981",
      microToken: {
        icon: <FiAward className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
        label: "Adaptive MCQs",
        tag: "100% Tracked",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      },
    },
  ];

  return (
    <section id="how-it-works" className="pt-20 md:pt-28 pb-10 md:pb-14 bg-slate-50 relative overflow-hidden">
      {/* Platform Ambient Radial Diffusers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-100/35 via-slate-100/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (No badge, clean typography matching user reference) */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            {howItWorks.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-slate-500 text-sm sm:text-base md:text-lg mt-3.5 leading-relaxed"
          >
            {howItWorks.subtitle}
          </motion.p>
        </div>

        {/* 4-Step Cards Layout */}
        <div className="relative">
          {/* Subtle Desktop Horizontal Connecting Rail (lg+ only) */}
          <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-indigo-200 via-amber-200 to-emerald-200 -z-0 opacity-70" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
            {howItWorks.steps.map((step, idx) => {
              const cfg = stepConfigs[idx] || stepConfigs[0];
              const isHover = activeStep === idx;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="p-1.5 rounded-[28px] bg-gradient-to-b from-slate-200/70 via-slate-200/40 to-slate-200/20 border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
                >
                  <div className="rounded-[24px] bg-white p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden">
                    {/* Corner Ambient Glow on Card Focus/Hover */}
                    <div
                      className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${cfg.accentBg} rounded-full blur-2xl pointer-events-none transition-opacity duration-300 ${
                        isHover ? "opacity-100" : "opacity-30"
                      }`}
                    />

                    <div>
                      {/* Top Row: Icon Squircle + Big Step Number */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs ${cfg.bgIcon}`}
                        >
                          {cfg.icon}
                        </div>
                        <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-200 group-hover:text-indigo-200 transition-colors">
                          {step.stepNumber}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Visual Micro-Token illustrating the step */}
                      <div className="mt-5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          {cfg.microToken.icon}
                          <span className="font-semibold text-slate-700 truncate text-[11px] sm:text-xs">
                            {cfg.microToken.label}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0 border ${cfg.microToken.badgeColor}`}
                        >
                          {cfg.microToken.tag}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Step Progress Segment Bar */}
                    <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span className="group-hover:text-slate-600 transition-colors">
                        Step {idx + 1} of 4
                      </span>

                      {/* 4-Segment Visual Progress Dots */}
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        {[0, 1, 2, 3].map((dotIdx) => (
                          <div
                            key={dotIdx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              dotIdx <= idx
                                ? "w-4 bg-indigo-600"
                                : "w-1.5 bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
