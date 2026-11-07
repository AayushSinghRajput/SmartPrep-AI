"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiMessageSquare,
  FiArrowRight,
  FiCheck,
  FiThumbsUp,
  FiCheckCircle,
} from "react-icons/fi";
import Button from "../ui/Button";
import { homepageContent } from "@/content/homepage.content";

export default function CommunityPreview() {
  const { communityPreview } = homepageContent;
  const threads = communityPreview.threads || [
    {
      id: "physics-1",
      subject: "Physics",
      stream: "IOE Engineering",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      author: "Aayush S.",
      college: "St. Xavier's / NEB Gr 12",
      avatarBg: "bg-indigo-600",
      timeAgo: "25 mins ago",
      question:
        "Why does the moment of inertia change with the axis of rotation even when the mass and body shape are completely identical?",
      replyCount: 4,
      likes: 38,
      topReply: {
        author: "Bikram K.",
        college: "Pulchowk Campus Aspirant",
        avatarBg: "bg-emerald-600",
        content:
          "Moment of inertia measures how mass is spatially distributed relative to that specific rotation axis (I = Σ mᵢ · rᵢ²). Shifting the axis changes the perpendicular distance rᵢ of each mass particle, altering the body's resistance to angular acceleration.",
        isVerified: true,
      },
    },
  ];

  const [activeThreadIndex, setActiveThreadIndex] = useState(0);
  const currentThread = threads[activeThreadIndex] || threads[0];

  return (
    <section className="py-20 md:py-28 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Platform Ambient Radial Diffuser */}
      <div className="absolute top-1/2 right-10 w-[550px] h-[350px] bg-gradient-to-b from-indigo-100/25 via-slate-100/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>{communityPreview.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Study together.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 font-editorial italic font-normal">
                Crack exams faster.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {communityPreview.subtitle}
            </p>

            {/* Core Value Checkpoints */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-100">
                  <FiCheck className="w-3.5 h-3.5" />
                </div>
                <span>Fast doubt resolution by peers and entrance rankers</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-100">
                  <FiCheck className="w-3.5 h-3.5" />
                </div>
                <span>Dedicated channels for IOE Engineering & CEE Medical</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-100">
                  <FiCheck className="w-3.5 h-3.5" />
                </div>
                <span>Past paper shortcuts, formula sheets & exam hall tips</span>
              </div>
            </div>

            {/* Community CTA */}
            <div className="pt-3 flex items-center justify-center lg:justify-start">
              <Link href={communityPreview.ctaHref}>
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<FiArrowRight className="w-4 h-4" />}
                >
                  {communityPreview.ctaText}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Interactive Forum Preview Window */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4">
              {/* Channel Selector Pill Tabs */}
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 gap-2 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1.5 shrink-0">
                  {threads.map((thread, idx) => {
                    const isSelected = activeThreadIndex === idx;
                    return (
                      <button
                        key={thread.id}
                        onClick={() => setActiveThreadIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white text-indigo-700 shadow-2xs border border-indigo-200"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        {thread.subject}
                      </button>
                    );
                  })}
                </div>

                <span className="text-[11px] font-semibold text-slate-400 shrink-0 hidden sm:inline">
                  Live Forum Feed
                </span>
              </div>

              {/* Active Discussion Thread Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentThread.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Original Question Post */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full ${currentThread.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          {currentThread.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{currentThread.author}</span>
                            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                              • {currentThread.college}
                            </span>
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {currentThread.timeAgo}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${currentThread.badgeColor}`}
                      >
                        {currentThread.stream}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      {currentThread.question}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-100">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold">
                          <FiMessageSquare className="w-3.5 h-3.5" />
                          <span>{currentThread.replyCount} Answers</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-slate-500">
                          <FiThumbsUp className="w-3.5 h-3.5" />
                          <span>{currentThread.likes} Upvotes</span>
                        </span>
                      </div>

                      <span className="text-[10px] text-indigo-600 font-semibold hidden sm:inline">
                        Discussion Active
                      </span>
                    </div>
                  </div>

                  {/* Indented Top Peer Solution */}
                  <div className="ml-5 sm:ml-8 pl-3.5 sm:pl-4 border-l-2 border-indigo-200">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-100/90 shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full ${currentThread.topReply.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            {currentThread.topReply.author.charAt(0)}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{currentThread.topReply.author}</span>
                              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                                • {currentThread.topReply.college}
                              </span>
                            </h5>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <FiCheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Top Solution</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                        {currentThread.topReply.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Community Helper Prompt */}
              <div className="pt-2 text-center sm:text-left flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Doubt answered in ~15 minutes</span>
                <Link
                  href={communityPreview.ctaHref}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  View 120+ active discussions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
