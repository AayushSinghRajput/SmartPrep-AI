"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCheckSquare,
  FiBookOpen,
  FiMessageCircle,
  FiBarChart2,
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function FeaturesBento() {
  const { features } = homepageContent;

  const icons = [
    <FiCalendar key="0" className="w-6 h-6 text-indigo-600" />,
    <FiCheckSquare key="1" className="w-6 h-6 text-emerald-600" />,
    <FiBookOpen key="2" className="w-6 h-6 text-indigo-600" />,
    <FiMessageCircle key="3" className="w-6 h-6 text-amber-600" />,
    <FiBarChart2 key="4" className="w-6 h-6 text-indigo-600" />,
    <FiTarget key="5" className="w-6 h-6 text-emerald-600" />,
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {features.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {features.heading}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            {features.subtitle}
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((feat, idx) => (
            <motion.div
              key={feat.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform">
                  {icons[idx]}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                <span>Learn more</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

