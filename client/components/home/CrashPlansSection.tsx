"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import Button from "../ui/Button";
import { homepageContent } from "@/content/homepage.content";
import { crashPlansContent } from "@/content/plans.content";

export default function CrashPlansSection({
  onSelectPlan,
}: {
  onSelectPlan?: (subject: string) => void;
}) {
  const { crashPlans } = homepageContent;
  const [selectedStream, setSelectedStream] = useState<"all" | "engineering" | "medical">("all");

  const filterOptions = [
    { id: "all", label: "All Subjects", count: 5 },
    { id: "engineering", label: "Engineering (IOE)", count: 4 },
    { id: "medical", label: "Medical (CEE)", count: 4 },
  ] as const;

  const filteredPlans = crashPlansContent.filter((plan) => {
    if (selectedStream === "all") return true;
    if (selectedStream === "engineering") {
      return (
        plan.entranceStreams.some((s) => s.includes("Engineering") || s.includes("IOE")) ||
        plan.id === "physics" ||
        plan.id === "chemistry" ||
        plan.id === "mathematics" ||
        plan.id === "english"
      );
    }
    if (selectedStream === "medical") {
      return (
        plan.entranceStreams.some((s) => s.includes("Medical") || s.includes("CEE")) ||
        plan.id === "physics" ||
        plan.id === "chemistry" ||
        plan.id === "biology" ||
        plan.id === "english"
      );
    }
    return true;
  });

  return (
    <section id="crash-plans" className="pt-8 md:pt-12 pb-20 md:pb-28 bg-[#f8fafc] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Badge Removed, Catchy Heading & Subheading) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            30 Days to Exam Day.{" "}
            <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 font-editorial italic font-normal">
              Zero Guesswork.
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            {crashPlans.subtitle}
          </p>

          {/* Interactive Exam Stream Filter Pill Tabs */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            {filterOptions.map((opt) => {
              const isActive = selectedStream === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedStream(opt.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 SUBJECT BLUEPRINT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-[28px] border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-950/5 hover:-translate-y-1.5 transition-all duration-300 relative"
              >
                <div>
                  {/* Subject Image Header with Floating Frosted Badges */}
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-5 bg-slate-100 group-hover:shadow-md transition-shadow">
                    <Image
                      src={plan.image}
                      alt={plan.subject}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    {/* Top Chips */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md bg-white/95 text-slate-800 shadow-2xs border border-white/40">
                        {plan.curriculum}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md bg-indigo-600/90 text-white shadow-2xs border border-indigo-400/30">
                        30-Day Target
                      </span>
                    </div>

                    {/* Bottom Subject Title & Entrance Stream */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-indigo-200 font-medium mb-0.5">
                        <FiClock className="w-3.5 h-3.5 text-indigo-300" />
                        <span>Day 01 → Day 30</span>
                      </div>
                      <h3 className="text-xl font-extrabold tracking-tight text-white">
                        {plan.subject}
                      </h3>
                    </div>
                  </div>

                  {/* Subject Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Core High-Weightage Chapters */}
                  <div className="space-y-1.5 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Syllabus Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.topicsHighlight.map((topic, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold text-slate-400">
                    Day 1 to Day 30
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => (onSelectPlan ? onSelectPlan(plan.subject) : null)}
                    rightIcon={<FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                  >
                    Start This Plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
