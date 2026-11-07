"use client";

import React from "react";
import Link from "next/link";
import { FiUsers, FiMessageSquare, FiArrowRight, FiCheck } from "react-icons/fi";
import Button from "../ui/Button";
import { homepageContent } from "@/content/homepage.content";

export default function CommunityPreview() {
  const { communityPreview } = homepageContent;

  return (
    <section className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              {communityPreview.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {communityPreview.heading}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {communityPreview.subtitle}
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>Ask tricky derivation and entrance questions</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>Get replies and concept breakdowns from fellow students</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </span>
                <span>Active discussions across Physics, Chemistry, Math & Biology</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href={communityPreview.ctaHref}>
                <Button variant="primary" size="md" rightIcon={<FiArrowRight className="w-4 h-4" />}>
                  {communityPreview.ctaText}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Example Discussion Card */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Example Watermark Badge */}
              <div className="absolute -top-3.5 right-6 z-20">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm border border-amber-400">
                  Illustrative Example
                </span>
              </div>

              {/* Main Discussion Thread Container */}
              <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200/90 shadow-md space-y-5">
                {/* Original Question Post */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        S
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{communityPreview.examplePost.author}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">{communityPreview.examplePost.timeAgo}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {communityPreview.examplePost.subjectTag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {communityPreview.examplePost.question}
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 font-semibold border-t border-slate-100">
                    <span className="flex items-center gap-1.5 text-indigo-600">
                      <FiMessageSquare className="w-3.5 h-3.5" />
                      {communityPreview.examplePost.replyCount} Replies
                    </span>
                  </div>
                </div>

                {/* Indented Helpful Reply Thread */}
                <div className="ml-6 sm:ml-8 pl-4 border-l-2 border-indigo-200">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-100 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                          P
                        </div>
                        <h5 className="text-xs font-bold text-slate-900">{communityPreview.examplePost.topReply.author}</h5>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Top Answer
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {communityPreview.examplePost.topReply.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

