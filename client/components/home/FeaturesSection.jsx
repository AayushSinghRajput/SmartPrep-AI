"use client";

import Image from "next/image";
import { FiBookOpen, FiZap, FiTarget } from "react-icons/fi";
import pdfImg from "../../assets/images/pdf.jpeg";
import aiImg from "../../assets/images/ai.jpeg";
import dashboardImg from "../../assets/images/dashboard.jpeg";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Engineered for Deep Focus & Retention
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Clean distraction-free workspace powered by tailored AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1: PDF Extractor */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-indigo-200 transition-all">
            <div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-200">
                <Image
                  src={pdfImg}
                  alt="PDF Extraction Engine"
                  fill
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FiBookOpen className="text-indigo-600" /> Automated Schedules
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Upload your textbook PDF and receive a structured day-by-day prep blueprint instantly.
              </p>
            </div>
          </div>

          {/* Feature 2: AI Doubt Assistant */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-indigo-200 transition-all">
            <div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-200">
                <Image
                  src={aiImg}
                  alt="AI Doubt Assistant"
                  fill
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FiZap className="text-emerald-600" /> Targeted Quizzes & Doubts
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Master concepts with AI-generated quizzes and instant 24/7 context-aware doubt resolution.
              </p>
            </div>
          </div>

          {/* Feature 3: Dashboard Analytics */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-indigo-200 transition-all">
            <div>
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-200">
                <Image
                  src={dashboardImg}
                  alt="Progress Dashboard Analytics"
                  fill
                  loading="eager"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <FiTarget className="text-amber-600" /> Performance Tracking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Monitor study streak, topic completion percentages, and day-wise exam readiness scores.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
