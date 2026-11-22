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

      {/* Main Content Container: Focused Centered Form */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-md flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-9"
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
      </main>

      {/* Footer Microcopy */}
      <footer className="p-4 sm:p-6 text-center text-xs text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} SmartPrep AI. Based on the NEB +2 Science syllabus.
      </footer>
    </div>
  );
}

