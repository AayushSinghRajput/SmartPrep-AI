"use client";

import React, { useState } from "react";
import {
  FiType,
  FiSliders,
  FiUser,
  FiAward,
  FiBell,
  FiVolume2,
  FiCheck,
  FiCheckCircle,
  FiShield,
  FiTrash2,
  FiBookOpen,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { formatAcademicId, getCleanUsername } from "../../lib/utils";
import toast from "react-hot-toast";

// Section definitions
const SETTINGS_SECTIONS = [
  {
    id: "appearance",
    label: "Reading & Typography",
    subtitle: "Font scales, audio speeds & distraction-free Zen mode",
    icon: FiType,
  },
  {
    id: "study",
    label: "Study & Exam Goals",
    subtitle: "Target entrance streams & daily study targets",
    icon: FiAward,
  },
  {
    id: "account",
    label: "Account & Profile",
    subtitle: "Student credentials, academic ID & local cache",
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
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("appearance");

  // Reading Typography scale (persisted in localStorage)
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("smartprep_reading_font_size") || "base";
    }
    return "base";
  });

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

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    try {
      localStorage.setItem("smartprep_reading_font_size", size);
      toast.success(`Reading text size updated to ${size.toUpperCase()}`);
    } catch (e) {}
  };

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

  const fontOptions = [
    {
      id: "sm",
      name: "Small",
      sizeLabel: "15px",
      description: "Compact density for larger displays and tables.",
      sample: "Newton's second law: F = dp/dt = ma",
      sampleClass: "text-[15px]",
    },
    {
      id: "base",
      name: "Base (Default)",
      sizeLabel: "17px",
      description: "Optimal balance of legibility and paragraph flow.",
      sample: "Newton's second law: F = dp/dt = ma",
      sampleClass: "text-[17px]",
    },
    {
      id: "lg",
      name: "Large",
      sizeLabel: "19px",
      description: "Generous sizing for high-fatigue study marathons.",
      sample: "Newton's second law: F = dp/dt = ma",
      sampleClass: "text-[19px]",
    },
    {
      id: "xl",
      name: "Extra Large",
      sizeLabel: "21px",
      description: "Maximum readability and relaxed spacing.",
      sample: "Newton's second law: F = dp/dt = ma",
      sampleClass: "text-[21px]",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
          <FiSliders className="w-3.5 h-3.5" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings & Ergonomics
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Customize your study workspace, reading typography scale, and academic targets.
        </p>
      </div>

      {/* Main Settings Layout: Left Nav + Right Content Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Navigation Section Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
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
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span className="truncate">{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Section Content Container */}
        <div className="md:col-span-8 lg:col-span-9">
          <AnimatePresence mode="wait">
            {/* 1. APPEARANCE & READING ERGONOMICS SECTION */}
            {activeSection === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Reading Typography Scale Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FiType className="text-indigo-600" />
                      <span>Reading Typography Scale</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose the default font size applied when reading textbook units, notes, and scientific explanations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {fontOptions.map((opt) => {
                      const isSelected = fontSize === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleFontSizeChange(opt.id)}
                          className={`cursor-pointer rounded-2xl p-4 border-2 transition-all relative ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                              : "border-slate-200 hover:border-indigo-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                              {opt.name}
                              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                                {opt.sizeLabel}
                              </span>
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-xs">
                                <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 mb-3">{opt.description}</p>

                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 font-serif text-slate-800">
                            <p className={`${opt.sampleClass} truncate`}>{opt.sample}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reading Comfort & Focus Tools Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FiBookOpen className="text-indigo-600" />
                      <span>Reading Ergonomics & Zen Mode</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fine-tune the notes canvas behavior to eliminate study fatigue.
                    </p>
                  </div>

                  <div className="space-y-5 divide-y divide-slate-100">
                    {/* Auto-Zen Toggle */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="pr-4">
                        <h4 className="text-sm font-semibold text-slate-800">
                          Distraction-Free Zen Mode Default
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Automatically collapse all toolbars and sidebars when reading textbook chapters.
                        </p>
                      </div>
                      <button
                        onClick={handleAutoZenToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          autoZen ? "bg-indigo-600 justify-end" : "bg-slate-300 justify-start"
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
                        <h4 className="text-sm font-semibold text-slate-800">
                          Audio Narration Speed
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Default playback pace for Text-to-Speech subtopic explanations.
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 p-1 rounded-xl">
                        {["0.8", "1", "1.25", "1.5"].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handleSpeechRateChange(rate)}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                              defaultSpeechRate === rate
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
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

            {/* 2. STUDY & EXAM GOALS SECTION */}
            {activeSection === "study" && (
              <motion.div
                key="study"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FiAward className="text-indigo-600" />
                      <span>Target Entrance Stream</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Optimizes question weightage, formula sheets, and mock tests according to your syllabus.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => handleStreamChange("ioe")}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        targetStream === "ioe"
                          ? "border-indigo-600 bg-indigo-50/40"
                          : "border-slate-200 bg-white hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                          Engineering
                        </span>
                        {targetStream === "ioe" && <FiCheckCircle className="text-indigo-600" />}
                      </div>
                      <h3 className="font-bold text-base text-slate-900">IOE Pulchowk Entrance</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        140 Marks • Mathematics, Physics, Chemistry & English focus.
                      </p>
                    </div>

                    <div
                      onClick={() => handleStreamChange("iom")}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        targetStream === "iom"
                          ? "border-indigo-600 bg-indigo-50/40"
                          : "border-slate-200 bg-white hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                          Medical
                        </span>
                        {targetStream === "iom" && <FiCheckCircle className="text-rose-600" />}
                      </div>
                      <h3 className="font-bold text-base text-slate-900">MECEE / IOM Entrance</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        200 Marks • Biology (Botany/Zoology), Physics, Chemistry, Mental Agility.
                      </p>
                    </div>
                  </div>

                  {/* Daily Target Study Time */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">
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
                              : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
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

            {/* 3. ACCOUNT & PROFILE SECTION */}
            {activeSection === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FiUser className="text-indigo-600" />
                    <span>Academic Student Profile</span>
                  </h2>

                  <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-xs">
                      {getCleanUsername(user).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">
                        {getCleanUsername(user)}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {user?.email || "student@smartprep.ai"}
                      </p>
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                        {user?.publicMetadata?.role || "Verified Entrance Candidate"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                      <span className="text-slate-400 block">Academic ID</span>
                      <span className="font-mono font-semibold text-slate-800 mt-1 block">
                        {formatAcademicId(user?._id || user?.id, user?.createdAt)}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                      <span className="text-slate-400 block">Workspace Status</span>
                      <span className="font-semibold text-emerald-600 mt-1 flex items-center gap-1.5">
                        <FiShield className="w-3.5 h-3.5" /> Synchronized with Cloud
                      </span>
                    </div>
                  </div>

                  {/* Cache and reset */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">
                        Clear Workspace Cache
                      </h4>
                      <p className="text-xs text-slate-500">
                        Purge temporary local book study indices and start fresh.
                      </p>
                    </div>
                    <button
                      onClick={handleClearCache}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" /> Clear Cache
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. NOTIFICATIONS & AUDIO SECTION */}
            {activeSection === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <FiBell className="text-indigo-600" />
                    <span>Study Alerts & Audio Cues</span>
                  </h2>

                  <div className="space-y-5 divide-y divide-slate-100">
                    <div className="flex items-center justify-between pt-2">
                      <div className="pr-4">
                        <h4 className="text-sm font-semibold text-slate-800">
                          MCQ Feedback Sound Effects
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Play subtle audio chimes upon selecting correct or incorrect choices.
                        </p>
                      </div>
                      <button
                        onClick={handleSoundToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          soundEffects ? "bg-indigo-600 justify-end" : "bg-slate-300 justify-start"
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
                        <h4 className="text-sm font-semibold text-slate-800">
                          Daily Revision Reminder
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Push prompts to complete your pending unit before the day ends.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
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
