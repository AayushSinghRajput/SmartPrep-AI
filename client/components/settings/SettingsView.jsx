"use client";

import React, { useState } from "react";
import {
  FiSun,
  FiMoon,
  FiBookOpen,
  FiSliders,
  FiUser,
  FiAward,
  FiBell,
  FiVolume2,
  FiCheck,
  FiCheckCircle,
  FiShield,
  FiTrash2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { formatAcademicId, getCleanUsername } from "../../lib/utils";
import toast from "react-hot-toast";

// Section definitions for easy future expansion
const SETTINGS_SECTIONS = [
  {
    id: "appearance",
    label: "Appearance & Reading",
    subtitle: "Theme modes, typography scale & reading ergonomics",
    icon: FiSun,
  },
  {
    id: "study",
    label: "Study & Exam Goals",
    subtitle: "Target entrance streams & daily quiz preferences",
    icon: FiAward,
  },
  {
    id: "account",
    label: "Account & Profile",
    subtitle: "Student credentials, academic ID & data cache",
    icon: FiUser,
  },
  {
    id: "notifications",
    label: "Notifications & Audio",
    subtitle: "Study prompts, audio speeds & sound effects",
    icon: FiBell,
  },
];

export default function SettingsView() {
  const { theme, setTheme, isDark, isSepia, isLight } = useTheme();
  const { user } = useAuth();

  const [activeSection, setActiveSection] = useState("appearance");

  // Study preferences states (persisted in localStorage)
  const [targetStream, setTargetStream] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartprep_target_stream") || "ioe";
    }
    return "ioe";
  });

  const [dailyGoal, setDailyGoal] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartprep_daily_goal") || "3";
    }
    return "3";
  });

  const [defaultSpeechRate, setDefaultSpeechRate] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartprep_default_speech_rate") || "1";
    }
    return "1";
  });

  const [autoZen, setAutoZen] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartprep_auto_zen") === "true";
    }
    return false;
  });

  const [soundEffects, setSoundEffects] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartprep_sound_effects") !== "false";
    }
    return true;
  });

  const handleStreamChange = (stream) => {
    setTargetStream(stream);
    try {
      localStorage.setItem("smartprep_target_stream", stream);
      toast.success(`Target stream set to ${stream === "ioe" ? "IOE Engineering" : "IOM Medical"}`);
    } catch (e) {}
  };

  const handleGoalChange = (hours) => {
    setDailyGoal(hours);
    try {
      localStorage.setItem("smartprep_daily_goal", hours);
      toast.success(`Daily goal updated to ${hours} hours`);
    } catch (e) {}
  };

  const handleSpeechRateChange = (rate) => {
    setDefaultSpeechRate(rate);
    try {
      localStorage.setItem("smartprep_default_speech_rate", rate);
      toast.success(`Default speech rate set to ${rate}x`);
    } catch (e) {}
  };

  const handleAutoZenToggle = () => {
    const next = !autoZen;
    setAutoZen(next);
    try {
      localStorage.setItem("smartprep_auto_zen", String(next));
      toast.success(`Auto-Zen mode ${next ? "enabled" : "disabled"}`);
    } catch (e) {}
  };

  const handleSoundToggle = () => {
    const next = !soundEffects;
    setSoundEffects(next);
    try {
      localStorage.setItem("smartprep_sound_effects", String(next));
      toast.success(`Sound effects ${next ? "enabled" : "disabled"}`);
    } catch (e) {}
  };

  const handleClearCache = () => {
    try {
      localStorage.removeItem("lastBookHash");
      toast.success("Recent book and workspace cache cleared");
    } catch (e) {
      toast.error("Failed to clear cache");
    }
  };

  // Theme cards configuration with miniature layout visual previews
  const themeOptions = [
    {
      id: "light",
      name: "Light Mode",
      tagline: "High-contrast day focus",
      description: "Crisp white canvas with slate typography for optimal daytime clarity.",
      icon: FiSun,
      cardBg: "#f8fafc",
      cardBorder: "#e2e8f0",
      contentBg: "#ffffff",
      textColor: "#0f172a",
      accentColor: "#4f46e5",
    },
    {
      id: "dark",
      name: "Dark (Night Reader)",
      tagline: "OLED eye comfort",
      description: "Deep obsidian slate with soft glowing text to prevent glare in dark rooms.",
      icon: FiMoon,
      cardBg: "#090d16",
      cardBorder: "#1e293b",
      contentBg: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#6366f1",
    },
    {
      id: "sepia",
      name: "Sepia (Warm Paper)",
      tagline: "Kindle e-reader paper tone",
      description: "Warm parchment background that filters harsh blue light for long study marathons.",
      icon: FiBookOpen,
      cardBg: "#f5edd6",
      cardBorder: "#dfd2b5",
      contentBg: "#fcf6e8",
      textColor: "#2e2319",
      accentColor: "#b45309",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--border-primary)] mb-3">
          <FiSliders className="w-3.5 h-3.5" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Settings & Ergonomics
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Customize your study workspace, visual comfort modes, and academic targets.
        </p>
      </div>

      {/* Main Settings Layout: Left Nav + Right Content Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Section Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1.5 bg-[var(--bg-card)] p-3 rounded-2xl border border-[var(--border-primary)] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5 block">
            Sections
          </span>
          {SETTINGS_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-[var(--text-secondary)] hover:bg-[var(--accent-light)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-[var(--text-muted)]"}`} />
                <span className="truncate">{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Section Content Container */}
        <div className="md:col-span-8 lg:col-span-9">
          <AnimatePresence mode="wait">
            
            {/* ========================================================= */}
            {/* 1. APPEARANCE & READING ERGONOMICS SECTION */}
            {/* ========================================================= */}
            {activeSection === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Visual Theme Selector Card */}
                <div className="bento-card p-6 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <FiSun className="text-[var(--accent-primary)]" />
                      <span>Reading Theme (Night Reader)</span>
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Select your preferred contrast mode for studying and notes. Persisted automatically.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {themeOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = theme === opt.id;

                      return (
                        <div
                          key={opt.id}
                          onClick={() => setTheme(opt.id)}
                          className={`cursor-pointer rounded-2xl p-4 border-2 transition-all relative overflow-hidden group ${
                            isSelected
                              ? "border-indigo-600 shadow-sm"
                              : "border-[var(--border-primary)] hover:border-[var(--accent-primary)]/50"
                          }`}
                          style={{ backgroundColor: opt.cardBg }}
                        >
                          {/* Top active check badge */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-xs">
                              <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}

                          {/* Miniature visual UI mock inside each card */}
                          <div
                            className="rounded-xl p-3 mb-3 border shadow-xs transition-transform duration-200 group-hover:scale-[1.02]"
                            style={{
                              backgroundColor: opt.contentBg,
                              borderColor: opt.cardBorder,
                            }}
                          >
                            <div className="flex items-center gap-1.5 mb-2">
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: opt.accentColor }}
                              />
                              <div
                                className="h-1.5 w-12 rounded-full opacity-75"
                                style={{ backgroundColor: opt.textColor }}
                              />
                            </div>
                            <div
                              className="h-1.5 w-full rounded-full opacity-40 mb-1.5"
                              style={{ backgroundColor: opt.textColor }}
                            />
                            <div
                              className="h-1.5 w-3/4 rounded-full opacity-25"
                              style={{ backgroundColor: opt.textColor }}
                            />
                          </div>

                          {/* Card details */}
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4" style={{ color: opt.accentColor }} />
                            <h3 className="font-bold text-xs" style={{ color: opt.textColor }}>
                              {opt.name}
                            </h3>
                          </div>
                          <p
                            className="text-[11px] leading-relaxed opacity-80"
                            style={{ color: opt.textColor }}
                          >
                            {opt.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reading Comfort & Focus Tools Card */}
                <div className="bento-card p-6 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <FiBookOpen className="text-[var(--accent-primary)]" />
                      <span>Reading Ergonomics & Zen Mode</span>
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Fine-tune the notes canvas behavior to eliminate study fatigue.
                    </p>
                  </div>

                  <div className="space-y-5 divide-y divide-[var(--border-primary)]">
                    {/* Auto-Zen Toggle */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="pr-4">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                          Distraction-Free Zen Mode Default
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          Automatically collapse all toolbars and sidebars when reading textbook chapters.
                        </p>
                      </div>
                      <button
                        onClick={handleAutoZenToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          autoZen ? "bg-indigo-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 bg-white rounded-full shadow-xs"
                        />
                      </button>
                    </div>

                    {/* Audio Narration Speed Default */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                          Audio Narration Speed
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          Default playback pace for Text-to-Speech subtopic explanations.
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[var(--bg-card-muted)] border border-[var(--border-primary)] p-1 rounded-xl">
                        {["0.8", "1", "1.25", "1.5"].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handleSpeechRateChange(rate)}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                              defaultSpeechRate === rate
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 2. STUDY & EXAM GOALS SECTION */}
            {/* ========================================================= */}
            {activeSection === "study" && (
              <motion.div
                key="study"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="bento-card p-6 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <FiAward className="text-[var(--accent-primary)]" />
                      <span>Target Entrance Stream</span>
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Optimizes question weightage, formula sheets, and mock tests according to your syllabus.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => handleStreamChange("ioe")}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        targetStream === "ioe"
                          ? "border-indigo-600 bg-[var(--accent-light)]"
                          : "border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                          Engineering
                        </span>
                        {targetStream === "ioe" && <FiCheckCircle className="text-indigo-600" />}
                      </div>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">IOE Pulchowk Entrance</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        140 Marks • Mathematics, Physics, Chemistry & English focus.
                      </p>
                    </div>

                    <div
                      onClick={() => handleStreamChange("iom")}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        targetStream === "iom"
                          ? "border-indigo-600 bg-[var(--accent-light)]"
                          : "border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                          Medical
                        </span>
                        {targetStream === "iom" && <FiCheckCircle className="text-indigo-600" />}
                      </div>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">MECEE / IOM Entrance</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        200 Marks • Biology (Botany/Zoology), Physics, Chemistry, Mental Agility.
                      </p>
                    </div>
                  </div>

                  {/* Daily Target Study Time */}
                  <div className="mt-8 pt-6 border-t border-[var(--border-primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                      Daily Study Target
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {["2", "3", "4", "5", "6"].map((hours) => (
                        <button
                          key={hours}
                          onClick={() => handleGoalChange(hours)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            dailyGoal === hours
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                              : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-primary)] hover:border-indigo-300"
                          }`}
                        >
                          {hours} Hours / Day
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 3. ACCOUNT & PROFILE SECTION */}
            {/* ========================================================= */}
            {activeSection === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="bento-card p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <FiUser className="text-[var(--accent-primary)]" />
                    <span>Academic Student Profile</span>
                  </h2>

                  <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-[var(--bg-card-muted)] border border-[var(--border-primary)]">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-xs">
                      {getCleanUsername(user).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">
                        {getCleanUsername(user)}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {user?.email || "student@smartprep.ai"}
                      </p>
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {user?.publicMetadata?.role || "Verified Entrance Candidate"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]">
                      <span className="text-[var(--text-muted)] block">Academic ID</span>
                      <span className="font-mono font-semibold text-[var(--text-primary)] mt-1 block">
                        {formatAcademicId(user?._id || user?.id, user?.createdAt)}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)]">
                      <span className="text-[var(--text-muted)] block">Workspace Status</span>
                      <span className="font-semibold text-emerald-600 mt-1 flex items-center gap-1.5">
                        <FiShield className="w-3.5 h-3.5" /> Synchronized with Cloud
                      </span>
                    </div>
                  </div>

                  {/* Cache and reset */}
                  <div className="mt-8 pt-6 border-t border-[var(--border-primary)] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                        Clear Workspace Cache
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        Purge temporary local book study indices and start fresh.
                      </p>
                    </div>
                    <button
                      onClick={handleClearCache}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition-colors"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" /> Clear Cache
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 4. NOTIFICATIONS & AUDIO SECTION */}
            {/* ========================================================= */}
            {activeSection === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="bento-card p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                    <FiBell className="text-[var(--accent-primary)]" />
                    <span>Study Alerts & Audio Cues</span>
                  </h2>

                  <div className="space-y-5 divide-y divide-[var(--border-primary)]">
                    <div className="flex items-center justify-between pt-2">
                      <div className="pr-4">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                          MCQ Feedback Sound Effects
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          Play subtle audio chimes upon selecting correct or incorrect choices.
                        </p>
                      </div>
                      <button
                        onClick={handleSoundToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          soundEffects ? "bg-indigo-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 bg-white rounded-full shadow-xs"
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="pr-4">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                          Daily Revision Reminder
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          Push prompts to complete your pending unit before the day ends.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
