"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Button from "../ui/Button";
import { homepageContent } from "@/content/homepage.content";

export default function FinalCtaSection({ onGetStarted }: { onGetStarted?: () => void }) {
  const { finalCta } = homepageContent;

  return (
    <section className="py-20 md:py-28 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-white to-amber-50/30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {finalCta.heading}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {finalCta.subtitle}
        </p>

        <div className="pt-2">
          {onGetStarted ? (
            <Button
              variant="primary"
              size="lg"
              onClick={onGetStarted}
              rightIcon={<FiArrowRight className="w-4 h-4" />}
              className="shadow-lg shadow-indigo-600/20"
            >
              {finalCta.buttonText}
            </Button>
          ) : (
            <Link href={finalCta.buttonHref}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<FiArrowRight className="w-4 h-4" />}
                className="shadow-lg shadow-indigo-600/20"
              >
                {finalCta.buttonText}
              </Button>
            </Link>
          )}
        </div>

        <p className="text-xs text-slate-400 font-medium pt-1">
          {finalCta.microcopy}
        </p>
      </div>
    </section>
  );
}

