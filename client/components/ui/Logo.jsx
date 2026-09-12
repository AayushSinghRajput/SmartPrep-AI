"use client";

import React from "react";
import Link from "next/link";

/**
 * SmartPrep AI Brand Logo
 * High-precision vector logo with custom educational AI iconography.
 *
 * @param {Object} props
 * @param {"dark" | "light"} [props.variant="dark"] - "dark" for light backgrounds (Navbar), "light" for dark backgrounds (Footer)
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Size scale
 * @param {boolean} [props.showText=true] - Whether to show the brand text
 * @param {boolean} [props.href="/"] - Optional link destination
 * @param {string} [props.className=""] - Extra wrapper styling
 */
export default function Logo({
  variant = "dark",
  size = "md",
  showText = true,
  href = "/",
  className = "",
}) {
  const isLight = variant === "light"; // For dark backgrounds (like Footer)

  // Size configurations
  const sizeConfig = {
    sm: {
      iconSize: 28,
      textSize: "text-base",
      badgeSize: "text-[9px] px-1.5 py-0.5",
      gap: "gap-2",
    },
    md: {
      iconSize: 34,
      textSize: "text-lg",
      badgeSize: "text-[10px] px-2 py-0.5",
      gap: "gap-2.5",
    },
    lg: {
      iconSize: 42,
      textSize: "text-2xl",
      badgeSize: "text-xs px-2.5 py-0.5",
      gap: "gap-3",
    },
  }[size] || {
    iconSize: 34,
    textSize: "text-lg",
    badgeSize: "text-[10px] px-2 py-0.5",
    gap: "gap-2.5",
  };

  const LogoContent = (
    <div className={`inline-flex items-center ${sizeConfig.gap} select-none group ${className}`}>
      {/* Brand Vector Icon */}
      <div className="relative flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <svg
          width={sizeConfig.iconSize}
          height={sizeConfig.iconSize}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <defs>
            {/* Background rounded container gradient */}
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            {/* AI Sparkle gradient */}
            <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Book page gradient */}
            <linearGradient id="bookPageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Squircle Background */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="12"
            fill="url(#logoBgGrad)"
          />
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="12"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.5"
          />

          {/* Stylized Open Book Wings */}
          {/* Left Wing / Page */}
          <path
            d="M10 27.5C14 26 19 26.5 21 28.5V17C19 15 14 14.5 10 16V27.5Z"
            fill="url(#bookPageGrad)"
          />
          {/* Right Wing / Page */}
          <path
            d="M34 27.5C30 26 25 26.5 23 28.5V17C25 15 30 14.5 34 16V27.5Z"
            fill="url(#bookPageGrad)"
          />
          {/* Spine Accent */}
          <path
            d="M22 17V29"
            stroke="#4338ca"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Radiant AI 4-Point Sparkle Rising from Book */}
          <path
            d="M22 8C22.4 11.2 23.8 12.6 27 13C23.8 13.4 22.4 14.8 22 18C21.6 14.8 20.2 13.4 17 13C20.2 12.6 21.6 11.2 22 8Z"
            fill="url(#sparkleGrad)"
          />

          {/* Micro accent dot */}
          <circle cx="28" cy="9" r="1.2" fill="#38bdf8" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex items-center">
          <span
            className={`font-black tracking-tight ${sizeConfig.textSize} ${
              isLight ? "text-white" : "text-[var(--text-primary,#0f172a)]"
            }`}
          >
            Smart<span className="text-indigo-500">Prep</span>
          </span>

          {/* Modern AI Badge */}
          <span
            className={`ml-2 rounded-lg font-black uppercase tracking-wider ${sizeConfig.badgeSize} ${
              isLight
                ? "bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 text-cyan-300 border border-cyan-500/30"
                : "bg-indigo-50 text-indigo-600 border border-indigo-200"
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
      >
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
