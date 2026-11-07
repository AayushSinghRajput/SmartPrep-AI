"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  FiTarget,
  FiAlertCircle,
  FiBookOpen,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
  FiLayers,
  FiCpu,
  FiHeart,
  FiUsers,
} from "react-icons/fi";
import Button from "@/components/ui/Button";
import studentAnimation from "@/animations/student.json";
import { aboutContent } from "@/content/about.content";

export default function AboutPage() {
  const { hero, mission, problem, values, teamPlaceholder } = aboutContent;

  return (
    <>
      <Head>
        <title>About SmartPrep AI — Purpose & Educational Philosophy</title>
        <meta
          name="description"
          content="SmartPrep AI empowers +2 Science students across Nepal to prepare for NEB board and entrance exams through structured, textbook-grounded learning."
        />
        <link rel="canonical" href="https://smartprepai-three.vercel.app/about" />
        <meta property="og:title" content="About SmartPrep AI — Our Mission" />
        <meta
          property="og:description"
          content="Why we build structured, textbook-grounded learning schedules for science students."
        />
      </Head>

      <div className="bg-[#f8fafc] text-slate-900 min-h-screen pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {/* 1. HERO & MISSION BANNER */}
          <section className="relative">
            <div className="p-8 sm:p-12 lg:p-14 bg-white rounded-3xl border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-7 space-y-5"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {hero.badge}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {hero.heading}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {hero.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-600 font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4" /> NEB Curriculum Aligned
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4" /> Textbook Grounded
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4" /> Free to Start
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div className="w-full max-w-sm bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-inner">
                  <Lottie animationData={studentAnimation} loop={true} className="w-full h-auto" />
                </div>
              </motion.div>
            </div>
          </section>

          {/* 2. OUR MISSION */}
          <section className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              {mission.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {mission.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {mission.description}
            </p>
          </section>

          {/* 3. THE PROBLEM WE SOLVE */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700">
                <FiAlertCircle className="w-3.5 h-3.5" />
                {problem.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {problem.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {problem.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-7 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. WHAT WE BELIEVE */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
                <FiHeart className="w-3.5 h-3.5" />
                {values.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Educational Commitments
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.items.map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{val.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. EDITABLE STORY & TEAM PLACEHOLDER */}
          <section className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700">
              <FiUsers className="w-3.5 h-3.5" />
              {teamPlaceholder.badge}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              {teamPlaceholder.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              {teamPlaceholder.description}
            </p>

            <p className="text-xs text-slate-400 italic pt-2">
              {teamPlaceholder.note}
            </p>
          </section>

          {/* 6. CALL TO ACTION */}
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-center space-y-5 shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Start Your Plan with SmartPrep AI Today
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Upload your textbook or jump straight into a ready-made 30-day crash plan for NEB +2 Science.
            </p>
            <div className="pt-2">
              <Link href="/signup">
                <Button
                  variant="accent"
                  size="lg"
                  rightIcon={<FiArrowRight className="w-4 h-4" />}
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
