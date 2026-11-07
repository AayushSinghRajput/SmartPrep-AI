"use client";

import React from "react";
import { FiFileText, FiCheckCircle, FiClock, FiShield } from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function ProofStrip() {
  const { proofStrip } = homepageContent;

  const iconMap = {
    "file-text": <FiFileText className="w-5 h-5 text-indigo-600" />,
    "check-circle": <FiCheckCircle className="w-5 h-5 text-emerald-600" />,
    clock: <FiClock className="w-5 h-5 text-amber-600" />,
    shield: <FiShield className="w-5 h-5 text-indigo-600" />,
  };

  return (
    <section className="border-y border-slate-200/80 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofStrip.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50/80 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0 mt-0.5">
                {iconMap[item.icon as keyof typeof iconMap] || (
                  <FiCheckCircle className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

