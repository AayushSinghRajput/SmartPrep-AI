"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiCheck, FiArrowRight, FiStar, FiMail, FiShield, FiLock } from "react-icons/fi";
import Button from "../ui/Button";
import { pricingContent } from "@/content/pricing.content";
import showToast from "../ui/Toast";

export default function PricingSection() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = waitlistEmail.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      showToast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setWaitlistSuccess(true);
      showToast.success("You're on the Founding Member priority list!");
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#f8fafc] border-b border-slate-200/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-indigo-100/30 via-slate-100/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Badge Removed) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Start Free Today,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 font-editorial italic font-normal">
              Upgrade Later.
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3.5 leading-relaxed">
            {pricingContent.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {pricingContent.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-[32px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "bg-gradient-to-b from-white via-indigo-50/20 to-white border-2 border-indigo-600 shadow-xl shadow-indigo-950/5 hover:-translate-y-1"
                  : "bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 hover:-translate-y-1"
              }`}
            >
              {/* Floating Tier Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 right-7">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs ${
                      tier.isPopular
                        ? "bg-amber-500 text-slate-950 border border-amber-400"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {tier.isPopular && <FiStar className="w-3.5 h-3.5 fill-slate-950" />}
                    <span>{tier.badge}</span>
                  </span>
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                    {tier.id === "free" ? "Essential Learning" : "Advanced Aspirants"}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {tier.priceDisplay}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium block mt-1">
                    {tier.billingPeriod}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8 text-xs sm:text-sm">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                        <FiCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-slate-700 font-medium leading-snug">
                          {feat.text}
                        </span>
                        {feat.note && (
                          <span className="ml-2 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md inline-block">
                            {feat.note}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Area (Aligned on same horizontal row) */}
              <div className="pt-4 border-t border-slate-100 flex flex-col justify-end">
                {tier.ctaAction === "signup" ? (
                  <div className="space-y-2.5">
                    {/* Balanced status slot matching the waitlist input height */}
                    <div className="h-[42px] flex items-center justify-center px-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-semibold gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Instant Free Access • No Card Needed</span>
                    </div>

                    <Link href="/signup" className="w-full block">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        rightIcon={<FiArrowRight className="w-4 h-4" />}
                      >
                        {tier.ctaText}
                      </Button>
                    </Link>

                    <p className="text-[11px] text-slate-400 text-center font-medium">
                      Free forever for +2 Science students in Nepal.
                    </p>
                  </div>
                ) : (
                  <div>
                    {!waitlistSuccess ? (
                      <form onSubmit={handleWaitlistSubmit} className="space-y-2.5">
                        <div className="relative h-[42px]">
                          <FiMail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            placeholder="Enter your email for early bird access"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                            required
                            className="w-full h-full pl-10 pr-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-slate-900 placeholder:text-slate-400 shadow-2xs"
                          />
                        </div>
                        <Button
                          variant="accent"
                          size="md"
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                          rightIcon={<FiArrowRight className="w-4 h-4" />}
                        >
                          {isSubmitting ? "Securing Spot..." : tier.ctaText}
                        </Button>
                        <p className="text-[11px] text-slate-400 text-center font-medium">
                          Locks in founding member launch discount.
                        </p>
                      </form>
                    ) : (
                      <div className="h-[105px] flex flex-col items-center justify-center p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                        <p className="text-xs font-bold text-emerald-900">
                          ✓ Added to Founding Member Priority List!
                        </p>
                        <p className="text-[11px] text-emerald-700">
                          We&apos;ll notify you first with exclusive early bird access.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
