"use client";

import React from "react";
import Link from "next/link";

/**
 * Redesigned ProofStrip Section
 * 
 * Inspired by the reference card architecture:
 * - High-radius rounded pill cards (rounded-[28px])
 * - Bold title + supporting copy
 * - Underlined action link ("Explore ...")
 * - Dedicated 3D isometric visual illustrations in bottom-right corner
 * - Light theme consistent styling (crisp white, subtle slate borders, ambient glows)
 * - Seamless continuous infinite animation moving LEFT TO RIGHT with hover pause
 */

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  badge: string;
  accentColor: string;
  renderVisual: () => React.ReactNode;
}

export default function ProofStrip() {
  const baseCards: FeatureCard[] = [
    {
      id: "textbook-sync",
      title: "Your Own Textbook PDF",
      description: "Generates daily schedules tailored directly to the syllabus in your uploaded book.",
      actionText: "Explore syllabus sync",
      actionHref: "#how-it-works",
      badge: "Syllabus Aligned",
      accentColor: "from-indigo-500/15 via-indigo-100/30 to-transparent",
      renderVisual: () => (
        <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="bookCover3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338ca" />
              <stop offset="60%" stopColor="#3730a3" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="bookSpine3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <linearGradient id="bookPages3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="goldRibbon3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="60" fill="#6366f1" opacity="0.12" filter="blur(16px)" />
          {/* 3D Isometric Textbook */}
          <g transform="translate(18, 12)">
            <polygon points="30,40 102,18 116,92 44,114" fill="#1e1b4b" opacity="0.4" />
            <polygon points="34,42 98,22 104,26 40,46" fill="url(#bookPages3D)" />
            <polygon points="40,46 104,26 112,98 48,118" fill="#f8fafc" />
            <polygon points="104,26 112,98 108,100 100,28" fill="#cbd5e1" />
            <polygon points="26,36 94,14 102,88 34,110" fill="url(#bookCover3D)" stroke="#6366f1" strokeWidth="1.5" />
            <polygon points="22,40 26,36 34,110 30,114" fill="url(#bookSpine3D)" />
            <path d="M 54 26 L 62 23 L 66 74 L 59 68 L 52 74 Z" fill="url(#goldRibbon3D)" />
            <polygon points="64,52 74,62 64,72 54,62" fill="#ffffff" opacity="0.85" />
            <circle cx="106" cy="30" r="4" fill="#38bdf8" />
            <circle cx="20" cy="88" r="3" fill="#a5b4fc" />
          </g>
        </svg>
      ),
    },
    {
      id: "grounded-answers",
      title: "Grounded AI Answers",
      description: "AI explanations and doubt solutions strictly referenced to your textbook material.",
      actionText: "Explore verified AI",
      actionHref: "#features",
      badge: "Zero Hallucination",
      accentColor: "from-emerald-500/15 via-teal-100/30 to-transparent",
      renderVisual: () => (
        <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="60" fill="#10b981" opacity="0.12" filter="blur(16px)" />
          {/* 3D Isometric AI Prism & Verification Vault */}
          <g transform="translate(20, 15)">
            <polygon points="60,18 98,38 98,82 60,102 22,82 22,38" fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="2" />
            <polygon points="60,28 88,44 60,60 32,44" fill="#6ee7b7" />
            <polygon points="60,60 88,44 88,78 60,94" fill="url(#prismGrad)" />
            <polygon points="60,60 32,44 32,78 60,94" fill="#059669" />
            <g transform="translate(60, 60)">
              <circle cx="0" cy="0" r="18" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
              <path d="M -6 -1 L -2 4 L 7 -5" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle cx="94" cy="36" r="3.5" fill="#10b981" />
            <circle cx="26" cy="80" r="3" fill="#34d399" />
          </g>
        </svg>
      ),
    },
    {
      id: "generated-minutes",
      title: "Generated in Minutes",
      description: "Skip manual revision scheduling and get straight to focused concept learning.",
      actionText: "Explore instant plans",
      actionHref: "#crash-plans",
      badge: "Instant 30-Day Plan",
      accentColor: "from-amber-500/15 via-orange-100/30 to-transparent",
      renderVisual: () => (
        <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="timerGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="timerFace3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="60" fill="#f59e0b" opacity="0.12" filter="blur(16px)" />
          {/* 3D Isometric Chronometer */}
          <g transform="translate(24, 16)">
            <ellipse cx="58" cy="66" rx="46" ry="42" fill="#78350f" opacity="0.3" />
            <ellipse cx="58" cy="62" rx="46" ry="42" fill="url(#timerGold3D)" stroke="#fde047" strokeWidth="2" />
            <polygon points="52,14 64,14 62,22 54,22" fill="#d97706" />
            <polygon points="84,26 92,34 88,40 80,32" fill="#d97706" />
            <ellipse cx="58" cy="62" rx="36" ry="32" fill="url(#timerFace3D)" />
            <path d="M 58 62 L 58 40" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
            <path d="M 58 62 L 76 54" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="58" cy="62" r="4" fill="#b45309" />
            <path d="M 28 36 L 40 44 L 34 50 L 46 58" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
          </g>
        </svg>
      ),
    },
    {
      id: "free-to-start",
      title: "Free to Start",
      description: "Begin learning immediately with access to core study plans and practice tools.",
      actionText: "Start free today",
      actionHref: "/signup",
      badge: "No Credit Card",
      accentColor: "from-sky-500/15 via-indigo-100/30 to-transparent",
      renderVisual: () => (
        <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-md" fill="none">
          <defs>
            <linearGradient id="shieldGrad3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="shieldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="60" fill="#0284c7" opacity="0.12" filter="blur(16px)" />
          {/* 3D Isometric Shield */}
          <g transform="translate(25, 15)">
            <path
              d="M 55 18 L 88 32 C 88 74 65 96 55 106 C 45 96 22 74 22 32 Z"
              fill="#0f172a"
              opacity="0.35"
              transform="translate(4, 6)"
            />
            <path
              d="M 55 18 L 88 32 C 88 74 65 96 55 106 C 45 96 22 74 22 32 Z"
              fill="url(#shieldGrad3D)"
              stroke="url(#shieldRimGrad)"
              strokeWidth="2.5"
            />
            <g transform="translate(55, 54)">
              <polygon
                points="0,-14 4,-4 14,-2 6,6 8,16 0,10 -8,16 -6,6 -14,-2 -4,-4"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="1"
              />
            </g>
            <path d="M 32 38 C 34 56 42 74 52 86" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </g>
        </svg>
      ),
    },
  ];

  // Two identical halves to guarantee an imperceptible, seamless infinite loop
  const loopCards = [...baseCards, ...baseCards, ...baseCards, ...baseCards];

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 bg-slate-50/80 border-y border-slate-200/80 select-none">
      {/* Background Soft Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 bg-indigo-100/30 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 bg-amber-100/25 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Left and Right Edge Soft Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10" />

      {/* Continuous Marquee Track Moving LEFT TO RIGHT */}
      <div className="w-full overflow-hidden flex">
        <div className="animate-marquee-ltr flex items-center gap-5 sm:gap-6 shrink-0 py-2">
          {loopCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="relative w-[340px] sm:w-[390px] h-[210px] sm:h-[225px] rounded-[28px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(99,102,241,0.14)] hover:border-indigo-300 p-6 flex flex-col justify-between shrink-0 transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle Corner Ambient Gradient Wash */}
              <div
                className={`absolute bottom-0 right-0 w-44 h-44 rounded-full bg-gradient-to-tl ${card.accentColor} blur-2xl pointer-events-none -z-0 transition-opacity group-hover:opacity-100 opacity-60`}
              />

              {/* Top Row: Category Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-100 transition-colors">
                  {card.badge}
                </span>
              </div>

              {/* Middle Row: Content & Visual */}
              <div className="relative z-10 flex items-end justify-between gap-3 mt-1">
                {/* Left Text Block */}
                <div className="max-w-[210px] sm:max-w-[240px] space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>

                {/* Right Bottom Visual (3D-Styled Element) */}
                <div className="relative -mr-3 -mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                  {card.renderVisual()}
                </div>
              </div>

              {/* Bottom Row: Underlined Explore Link (Matching Reference Architecture) */}
              <div className="relative z-10 pt-2 border-t border-slate-100/90">
                <Link
                  href={card.actionHref}
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-slate-800 hover:text-indigo-600 underline underline-offset-4 decoration-slate-300 hover:decoration-indigo-500 transition-colors"
                >
                  <span>{card.actionText}</span>
                  <span className="ml-1 text-[11px] transition-transform group-hover:translate-x-0.5">↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
