"use client";

import React from "react";
import Link from "next/link";

/**
 * SmartPrep AI Official Brand Logo
 * 
 * Features the official "Ascending Knowledge Nexus & AI Spark" emblem
 * rendered in pure vector SVG with sub-pixel sharpness across Retina/4K displays.
 *
 * @param {Object} props
 * @param {"dark" | "light"} [props.variant="dark"] - "dark" for light surfaces (Navbar/Header), "light" for dark surfaces (Footer)
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Size scale
 * @param {boolean} [props.showText=true] - Whether to show the brand text
 * @param {string} [props.href="/"] - Optional link destination
 * @param {string} [props.className=""] - Extra wrapper styling
 */
export default function Logo({
  variant = "dark",
  size = "md",
  showText = true,
  href = "/",
  className = "",
}) {
  const isLight = variant === "light";

  // Size configurations
  const sizeConfig = {
    sm: {
      boxSize: "w-8 h-8",
      textSize: "text-base",
      badgeSize: "text-[9px] px-1.5 py-0.5",
      gap: "gap-2",
    },
    md: {
      boxSize: "w-9 h-9 sm:w-10 sm:h-10",
      textSize: "text-lg sm:text-xl",
      badgeSize: "text-[10px] px-2 py-0.5",
      gap: "gap-2.5",
    },
    lg: {
      boxSize: "w-11 h-11 sm:w-12 sm:h-12",
      textSize: "text-2xl",
      badgeSize: "text-xs px-2.5 py-0.5",
      gap: "gap-3",
    },
  }[size] || {
    boxSize: "w-9 h-9 sm:w-10 sm:h-10",
    textSize: "text-lg sm:text-xl",
    badgeSize: "text-[10px] px-2 py-0.5",
    gap: "gap-2.5",
  };

  const LogoContent = (
    <div className={`inline-flex items-center ${sizeConfig.gap} select-none group ${className}`}>
      {/* Official Vector Brand Emblem */}
      <div className={`relative flex-shrink-0 ${sizeConfig.boxSize} transition-transform duration-200 group-hover:scale-105`}>
        <svg
          viewBox="0 0 512 512"
          className="w-full h-full drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Jewel Squircle Gradient */}
            <linearGradient id="spBrandBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="45%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>

            {/* Ambient Border Glow */}
            <linearGradient id="spBrandBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>

            {/* Left Knowledge Wing (Electric Indigo / Violet) */}
            <linearGradient id="spWingLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>

            {/* Right Ascension Wing (Electric Cyan / Sky) */}
            <linearGradient id="spWingRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Lower Base Loop */}
            <linearGradient id="spLowerLoop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="60%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>

            {/* Academic Golden Ribbon */}
            <linearGradient id="spGoldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Ambient Radial Depth */}
            <radialGradient id="spGlow" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#4338ca" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Squircle Jewel Base */}
          <rect
            x="16"
            y="16"
            width="480"
            height="480"
            rx="112"
            fill="url(#spBrandBg)"
            stroke="url(#spBrandBorder)"
            strokeWidth="5"
          />
          <rect x="20" y="20" width="472" height="472" rx="108" fill="url(#spGlow)" />

          {/* Upper Loop of S (Left Wing of Knowledge) */}
          <path
            d="M 256 128
               C 192 128 140 166 138 222
               C 136 274 186 308 244 316
               L 272 278
               C 226 270 188 250 190 220
               C 192 192 224 172 256 172
               Z"
            fill="url(#spWingLeft)"
          />

          {/* Lower Loop of S (Foundational Arch) */}
          <path
            d="M 256 384
               C 320 384 372 346 374 290
               C 376 238 326 204 268 196
               L 240 234
               C 286 242 324 262 322 292
               C 320 320 288 340 256 340
               Z"
            fill="url(#spLowerLoop)"
          />

          {/* Forward Ascension Wing (Flight Vector) */}
          <path
            d="M 256 172
               L 368 118
               C 380 112 392 122 390 136
               L 374 238
               C 372 250 360 258 348 252
               L 256 210
               Z"
            fill="url(#spWingRight)"
          />

          {/* Golden Academic Honor Crest */}
          <path
            d="M 174 294
               L 256 332
               L 338 294
               C 346 290 354 298 350 306
               L 264 394
               C 260 398 252 398 248 394
               L 162 306
               C 158 298 166 290 174 294
               Z"
            fill="url(#spGoldRibbon)"
          />

          {/* Center AI Sparkle Star */}
          <g transform="translate(256, 256)">
            <path
              d="M 0 -38
                 C 0 -11 11 0 38 0
                 C 11 0 0 11 0 38
                 C 0 11 -11 0 -38 0
                 C -11 0 0 -11 0 -38
                 Z"
              fill="#ffffff"
            />
            <circle cx="0" cy="0" r="7" fill="#67e8f9" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>

          {/* Science Orbit Accent Nodes */}
          <circle cx="388" cy="124" r="6" fill="#38bdf8" />
          <circle cx="128" cy="220" r="4.5" fill="#a5b4fc" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span
            className={`font-black tracking-tight ${sizeConfig.textSize} ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            Smart<span className="text-indigo-600">Prep</span>
          </span>

          {/* AI Jewel Badge */}
          <span
            className={`ml-1.5 rounded-md font-black uppercase tracking-wider ${sizeConfig.badgeSize} ${
              isLight
                ? "bg-white/20 text-white border border-white/30"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200/90 shadow-2xs"
            }`}
          >
            AI
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none rounded-xl inline-block"
        aria-label="SmartPrep AI Home"
      >
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
