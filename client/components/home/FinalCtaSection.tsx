"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiStar, FiBookOpen } from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

interface FinalCtaProps {
  onGetStarted?: () => void;
}

export default function FinalCtaSection({ onGetStarted }: FinalCtaProps) {
  const { finalCta } = homepageContent;

  const floatingBadges = [
    { text: "NEB Grade 12", delay: 0 },
    { text: "IOE Engineering", delay: 0.2 },
    { text: "CEE Medical", delay: 0.4 },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] relative overflow-hidden">
      {/* Platform Ambient Radial Mesh Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-indigo-100/40 via-sky-100/30 to-amber-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sculpted Island Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-gradient-to-b from-white via-white to-slate-50/90 border border-slate-200/90 shadow-[0_24px_64px_-16px_rgba(79,70,229,0.08)] p-8 sm:p-14 md:p-20 text-center overflow-hidden"
        >
          {/* Subtle Background Geometric Circuit Rings */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-indigo-100/60 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full border border-amber-100/60 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-50/60 via-transparent to-amber-50/40 rounded-full blur-2xl pointer-events-none" />

          {/* Floating Academic Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 relative z-10">
            {floatingBadges.map((badge, idx) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200/80 shadow-2xs text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Display Headline with Editorial Styling */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your entrance exam is coming.
              <br className="hidden sm:inline" />{" "}
              Start your{" "}
              <span className="font-editorial italic font-normal text-indigo-600">
                mastery
              </span>{" "}
              plan today.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
              {finalCta.subtitle}
            </p>
          </div>

          {/* Dual Action CTAs */}
          <div className="relative z-10 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            {onGetStarted ? (
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <span>{finalCta.buttonText}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <FiArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ) : (
              <Link
                href={finalCta.buttonHref}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <span>{finalCta.buttonText}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <FiArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )}

            <Link
              href="/#crash-plans"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-sm sm:text-base transition-all border border-slate-200/90 shadow-2xs flex items-center justify-center gap-2"
            >
              <FiStar className="w-4 h-4 text-amber-500" />
              <span>Explore 30-Day Crash Plans</span>
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
