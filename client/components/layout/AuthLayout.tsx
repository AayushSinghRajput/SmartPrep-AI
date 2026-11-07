"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiBookOpen,
  FiCalendar,
  FiAward,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";
import Logo from "../ui/Logo";

export interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}

export default function AuthLayout({
  children,
  heading,
  subheading,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar with Logo & Return Home */}
      <header className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo variant="dark" size="md" href="/" />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 px-3 py-1.5 rounded-xl hover:bg-white transition-all"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Decorative Column (Visible on Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 pr-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                NEB +2 Science Preparation Suite
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your daily structured path to entrance confidence.
              </h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Turn your textbook into daily milestones, review key formulas, and practice adaptive quizzes.
              </p>
            </div>

            {/* Illustrative Stacked Day Cards Motif */}
            <div className="relative p-6 bg-white rounded-3xl border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    <FiBookOpen />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Physics: Rotational Dynamics</h4>
                    <p className="text-[11px] text-slate-400">Day 1 of 30 · Daily Milestone</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Ready
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                  <span>Moment of Inertia of Rigid Bodies</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                  <span>Rotational Kinetic Energy & Torque</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                  <span>10 Topic MCQs with Instant Explanations</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  <FiShield className="text-indigo-600" /> Private student workspace
                </span>
                <span className="font-semibold text-indigo-600">Free to Start</span>
              </div>
            </div>

            {/* 3 Value Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-2xl border border-slate-200/70 text-center">
                <span className="block text-base font-bold text-slate-900">5 Plans</span>
                <span className="text-[11px] text-slate-500">Core Subjects</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/70 text-center">
                <span className="block text-base font-bold text-slate-900">NEB</span>
                <span className="text-[11px] text-slate-500">Syllabus Aligned</span>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200/70 text-center">
                <span className="block text-base font-bold text-slate-900">0 NRs</span>
                <span className="text-[11px] text-slate-500">Free to Start</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-9"
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {heading}
                </h1>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {subheading}
                </p>
              </div>

              {children}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer Microcopy */}
      <footer className="p-4 sm:p-6 text-center text-xs text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} SmartPrep AI. Based on the NEB +2 Science syllabus.
      </footer>
    </div>
  );
}

