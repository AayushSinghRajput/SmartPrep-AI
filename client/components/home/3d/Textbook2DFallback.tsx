"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAward, FiBookOpen } from "react-icons/fi";

export default function Textbook2DFallback() {
  return (
    <div
      className="relative w-full h-[400px] sm:h-[460px] lg:h-[520px] flex items-center justify-center select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Soft Indigo & Amber Ambient Glow */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-200/50 via-slate-100/40 to-amber-100/35 blur-3xl -z-10" />

      {/* Main Smart Textbook Container */}
      <motion.div
        animate={{ y: [-7, 7, -7], rotateZ: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-64 sm:w-72 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-5"
      >
        <div className="h-44 sm:h-48 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 p-5 text-white flex flex-col justify-between shadow-inner relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
              NEB +2 Science
            </span>
            <FiBookOpen className="w-4 h-4 text-white/90" />
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold leading-tight">SmartPrep Textbook</h4>
            <p className="text-xs text-indigo-200 mt-1">Structured 30-Day Master Schedule</p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/15 text-[11px] text-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Day-by-Day Targets Ready</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Textbook Grounded AI</span>
          <span className="text-indigo-600 font-bold">Daily Milestones →</span>
        </div>
      </motion.div>

      {/* Floating Day 1 Schedule Card (Upper-Left) */}
      <motion.div
        animate={{ y: [-8, 5, -8], x: [-3, 3, -3] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-8 left-0 sm:left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-md max-w-[195px]"
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100">
            Day 01 Milestone
          </span>
          <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
        </div>
        <p className="text-xs font-bold text-slate-900 line-clamp-1">Rotational Dynamics & Torque</p>
        <p className="text-[10px] text-slate-500 mt-0.5">10 MCQs • 3 Key Formulas</p>
        <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full w-full" />
        </div>
      </motion.div>

      {/* Floating Quiz Accuracy Badge (Lower-Right) */}
      <motion.div
        animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-8 right-0 sm:right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-md max-w-[180px]"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <FiAward className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quiz Accuracy</span>
            <span className="text-xs font-extrabold text-slate-900">88% High Retention</span>
          </div>
        </div>
        <div className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block border border-emerald-200">
          On Track for IOE/CEE
        </div>
      </motion.div>
    </div>
  );
}
