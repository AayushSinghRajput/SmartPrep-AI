"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiCheck, FiX, FiArrowRight, FiShield, FiStar } from "react-icons/fi";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { pricingContent } from "@/content/pricing.content";
import showToast from "../ui/Toast";

export default function PricingSection() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes("@")) {
      showToast.error("Please enter a valid email address");
      return;
    }
    setWaitlistSuccess(true);
    showToast.success("You're on the Founding Member waitlist!");
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            {pricingContent.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {pricingContent.heading}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            {pricingContent.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {pricingContent.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? "bg-white border-2 border-indigo-600 shadow-xl"
                  : "bg-white border border-slate-200/90 shadow-sm"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 right-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
                      tier.isPopular
                        ? "bg-amber-500 text-slate-950 border border-amber-400"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-500 mb-6">{tier.description}</p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {tier.priceDisplay}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {tier.billingPeriod}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {feat.included ? (
                        <FiCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <FiX className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          feat.included ? "text-slate-700" : "text-slate-400"
                        }
                      >
                        {feat.text}
                        {feat.note && (
                          <span className="ml-1.5 text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                            {feat.note}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                {tier.ctaAction === "signup" ? (
                  <Link href="/signup" className="w-full block">
                    <Button variant="outline" size="md" className="w-full">
                      {tier.ctaText}
                    </Button>
                  </Link>
                ) : (
                  <div>
                    {!waitlistSuccess ? (
                      <form onSubmit={handleWaitlistSubmit} className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="student@example.com"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                            required
                            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <Button variant="primary" size="sm" type="submit">
                            Join Waitlist
                          </Button>
                        </div>
                        <p className="text-[11px] text-slate-400 text-center">
                          Locks in founding discount when Premium launches.
                        </p>
                      </form>
                    ) : (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-semibold text-emerald-800">
                        ✓ Added to Founding Member priority list!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-8 max-w-xl mx-auto italic">
          {pricingContent.disclaimer}
        </p>
      </div>
    </section>
  );
}

