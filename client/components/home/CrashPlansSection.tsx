"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiBookOpen,
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiClock,
} from "react-icons/fi";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { homepageContent } from "@/content/homepage.content";
import { crashPlansContent } from "@/content/plans.content";

export default function CrashPlansSection({
  onSelectPlan,
}: {
  onSelectPlan?: (subject: string) => void;
}) {
  const { crashPlans } = homepageContent;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <section id="crash-plans" className="py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {crashPlans.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {crashPlans.heading}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            {crashPlans.subtitle}
          </p>
        </div>

        {/* 1. MONTHLY 4-WEEK ROADMAP */}
        <div className="mb-16 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <FiCalendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              30-Day Master Milestone Roadmap
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {crashPlans.roadmapStages.map((stage, idx) => (
              <div
                key={stage.week}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-600 font-mono">
                    {stage.week}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Days {idx * 7 + 1}–{Math.min((idx + 1) * 7 + (idx === 3 ? 2 : 0), 30)}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  {stage.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. FIVE SUBJECT CARDS (3 on top, 2 on bottom) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Choose Your Subject Plan</h3>
              <p className="text-xs text-slate-500 mt-0.5">Exactly 5 pre-built plans based on the NEB +2 Science syllabus.</p>
            </div>
            <Badge variant="outline">5 Ready Plans</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crashPlansContent.map((plan, idx) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between ${
                  idx === 3 ? "lg:col-start-1" : ""
                }`}
              >
                <div>
                  {/* Subject Image Header */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={plan.image}
                      alt={plan.subject}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-slate-800 shadow-2xs">
                        {plan.curriculum}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs font-semibold text-indigo-200 block">
                        {plan.duration}
                      </span>
                      <h4 className="text-lg font-bold">{plan.subject}</h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {plan.description}
                  </p>

                  {/* Topic Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {plan.topicsHighlight.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Day 1 to 30
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => (onSelectPlan ? onSelectPlan(plan.subject) : null)}
                    rightIcon={<FiArrowRight className="w-3.5 h-3.5" />}
                  >
                    Start This Plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. EXAMPLE DAY CARD (Labeled "Example Day") */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {crashPlans.exampleDay.label}
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Day {crashPlans.exampleDay.dayNumber} of {crashPlans.exampleDay.totalDays}: {crashPlans.exampleDay.topic}
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">1/30 Progress</span>
          </div>

          {/* Day 1 Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
            <div className="bg-indigo-600 h-2 rounded-full w-[3.33%]" />
          </div>

          {/* Subtopics Checklist */}
          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Today's Key Targets:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {crashPlans.exampleDay.subtopics.map((st, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                >
                  <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Sample MCQ */}
          <div className="bg-indigo-50/40 border border-indigo-100 p-4 sm:p-5 rounded-2xl mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-700">Sample Entrance Practice Question</span>
              <span className="text-[10px] text-slate-400">IOE / CEE Format</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-3">
              {crashPlans.exampleDay.sampleQuestion}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {crashPlans.exampleDay.sampleOptions.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === crashPlans.exampleDay.correctIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`p-2.5 text-xs rounded-xl font-medium text-left border transition-all ${
                      isSelected
                        ? isCorrect
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                          : "bg-rose-50 border-rose-300 text-rose-800"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="font-mono mr-1.5">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <FiCheckCircle className="w-4 h-4" />
                <span>Correct relation: Torque is the rotational analogue of force (τ = I · α).</span>
              </div>
            )}
          </div>

          {/* Bottom Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500 border-t border-slate-100 pt-4">
            <p>Prefer to study from your own book? Create a custom plan from your PDF.</p>
            <Link href="/signup" className="font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
              Create Custom Plan <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

