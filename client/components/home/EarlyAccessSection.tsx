"use client";

import React from "react";
import Link from "next/link";
import { FiAward, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";
import { homepageContent } from "@/content/homepage.content";

export default function EarlyAccessSection() {
  const { earlyAccess } = homepageContent;

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/40 border border-indigo-100 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {earlyAccess.badge}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {earlyAccess.heading}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {earlyAccess.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            {earlyAccess.benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  0{i + 1}
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link href={earlyAccess.ctaHref}>
              <Button variant="primary" size="lg" rightIcon={<FiArrowRight className="w-4 h-4" />}>
                {earlyAccess.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

