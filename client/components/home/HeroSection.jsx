"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiShield, FiCheckCircle } from "react-icons/fi";
import Textbook2DFallback from "./3d/Textbook2DFallback";

// Dynamically load 3D scene without SSR
const TextbookHero3D = dynamic(() => import("./3d/TextbookHero3D"), {
  ssr: false,
  loading: () => <Textbook2DFallback />,
});

export default function HeroSection({ onGetStarted }) {
  const scrollToCrashPlans = () => {
    document.getElementById("crash-plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50">
      {/* Platform Consistent Ambient Diffused Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-indigo-100/50 via-slate-100/40 to-amber-100/25 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-8 w-[400px] h-[400px] bg-indigo-50/60 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ========================================================= */}
          {/* Left Column: Editorial Heading, Subtitle, Consistent CTAs */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Editorial Serif Display Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-slate-900 tracking-tight leading-[1.12]">
                Turn your{" "}
                <span className="font-editorial italic font-normal text-indigo-600">textbooks</span>
                <br />
                into structured
                <br />
                daily mastery
                <span className="text-indigo-600">.</span>
              </h1>
            </motion.div>

            {/* Supporting Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal"
            >
              Transform any textbook PDF into a day-by-day study schedule, instant revision notes, and adaptive entrance quizzes built for +2 Science students in Nepal.
            </motion.p>

            {/* CTA Button Row (Platform Consistent Theme) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* Primary Action Button */}
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Start Free Prep</span>
                <FiArrowUpRight className="w-4 h-4" />
              </button>

              {/* Secondary 30-Day Crash Plans Button */}
              <button
                onClick={scrollToCrashPlans}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="text-amber-500 text-base">✨</span>
                <span>30-Day Crash Plans</span>
              </button>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* Right Column: 3D Educational Knowledge Nexus */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full overflow-hidden flex items-center justify-center">
              <TextbookHero3D />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
