"use client";

import React from "react";
import { FiSun, FiMoon, FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * ThemeToggle Component
 * Allows 1-click switching between:
 * - Light (Daytime high-contrast)
 * - Dark (Night reader OLED slate)
 * - Sepia (Warm parchment eye comfort)
 *
 * @param {Object} props
 * @param {"segmented" | "compact" | "minimal"} [props.variant="segmented"]
 * @param {string} [props.className=""]
 */
export default function ThemeToggle({ variant = "segmented", className = "" }) {
  const { theme, setTheme, cycleTheme, mounted } = useTheme();

  const options = [
    {
      id: "light",
      label: "Light",
      shortLabel: "Day",
      icon: FiSun,
      ariaLabel: "Switch to light mode",
    },
    {
      id: "dark",
      label: "Dark",
      shortLabel: "Night",
      icon: FiMoon,
      ariaLabel: "Switch to dark night reader mode",
    },
    {
      id: "sepia",
      label: "Sepia",
      shortLabel: "Sepia",
      icon: FiBookOpen,
      ariaLabel: "Switch to warm sepia eye comfort mode",
    },
  ];

  // Minimal / cycle button (useful for ultra-compact toolbars)
  if (variant === "minimal") {
    const currentOpt = options.find((o) => o.id === theme) || options[0];
    const Icon = currentOpt.icon;

    return (
      <button
        onClick={cycleTheme}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
          theme === "dark"
            ? "bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-750"
            : theme === "sepia"
            ? "bg-[#ecdcb9] text-[#4a3d31] border-[#dfceaa] hover:bg-[#e4d3ad]"
            : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80"
        } ${className}`}
        title={`Current: ${currentOpt.label}. Click to cycle.`}
        aria-label={`Current theme is ${currentOpt.label}. Click to switch.`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="capitalize">{theme}</span>
      </button>
    );
  }

  // Compact icon-only segmented pill
  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-xl border transition-colors ${
          theme === "dark"
            ? "bg-slate-900/90 border-slate-800"
            : theme === "sepia"
            ? "bg-[#ecdcb9]/80 border-[#decba4]"
            : "bg-slate-100/90 border-slate-200/80"
        } ${className}`}
        role="radiogroup"
        aria-label="Color theme selector"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = mounted && theme === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`relative p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                isActive
                  ? theme === "dark"
                    ? "text-indigo-400"
                    : theme === "sepia"
                    ? "text-[#694825]"
                    : "text-indigo-600"
                  : theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : theme === "sepia"
                  ? "text-[#8c7862] hover:text-[#4a3d31]"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title={opt.label}
              aria-label={opt.ariaLabel}
              role="radio"
              aria-checked={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="activeThemeCompactPill"
                  className={`absolute inset-0 rounded-lg shadow-xs ${
                    theme === "dark"
                      ? "bg-slate-800 border border-slate-700"
                      : theme === "sepia"
                      ? "bg-[#fffaf0] border border-[#d6c29b]"
                      : "bg-white border border-slate-200/70"
                  }`}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 block">
                <Icon className="w-3.5 h-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Full segmented 3-way toggle (default for Navbar)
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl border backdrop-blur-md transition-colors ${
        theme === "dark"
          ? "bg-slate-900/90 border-slate-800 shadow-inner"
          : theme === "sepia"
          ? "bg-[#ecdcb9]/80 border-[#d8c59f] shadow-inner"
          : "bg-slate-100/90 border-slate-200/80 shadow-xs"
      } ${className}`}
      role="radiogroup"
      aria-label="Reading theme mode"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = mounted && theme === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isActive
                ? theme === "dark"
                  ? "text-white"
                  : theme === "sepia"
                  ? "text-[#432d18]"
                  : "text-slate-900"
                : theme === "dark"
                ? "text-slate-400 hover:text-slate-200"
                : theme === "sepia"
                ? "text-[#7a6752] hover:text-[#432d18]"
                : "text-slate-500 hover:text-slate-900"
            }`}
            aria-label={opt.ariaLabel}
            role="radio"
            aria-checked={isActive}
          >
            {isActive && (
              <motion.div
                layoutId="activeThemeNavbarPill"
                className={`absolute inset-0 rounded-lg shadow-xs ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700/80"
                    : theme === "sepia"
                    ? "bg-[#fffaf0] border border-[#d6c29b]"
                    : "bg-white border border-slate-200/90"
                }`}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive
                    ? theme === "dark"
                      ? "text-amber-400"
                      : theme === "sepia"
                      ? "text-[#a25916]"
                      : "text-amber-500"
                    : "opacity-75"
                }`}
              />
              <span className="hidden sm:inline">{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
