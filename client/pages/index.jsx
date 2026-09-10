"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import PredefinedStudyPlan from "../components/predefined_plan/PredefinedStudyPlan";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";
import { FiArrowRight, FiBookOpen, FiZap, FiTarget, FiLayers } from "react-icons/fi";

import heroBannerImg from "../assets/images/hero-banner.jpeg";
import aiImg from "../assets/images/ai.jpeg";
import pdfImg from "../assets/images/pdf.jpeg";
import dashboardImg from "../assets/images/dashboard.jpeg";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text and Button */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              AI Learning Suite for +2 Science & Entrance Exams
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Study Smarter with <br className="hidden sm:inline" />
              <span className="text-indigo-600">SmartPrep AI</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              Transform textbook PDFs into daily structured study plans, instant flashcards, and adaptive exam practice. Designed specifically for high-retention prep.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm transition-all duration-150"
              >
                Start Learning Now <FiArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  document.getElementById("topviewbooks")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-150"
              >
                Explore Sample Plans
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-slate-900">Instant</div>
                <div className="text-xs text-slate-500 font-medium">PDF Extraction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">Adaptive</div>
                <div className="text-xs text-slate-500 font-medium">MCQ Quizzes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">Context</div>
                <div className="text-xs text-slate-500 font-medium">Doubt Resolution</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Banner Showcase Card */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl border border-slate-200/80 p-3 shadow-sm relative overflow-hidden group">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={heroBannerImg}
                  alt="SmartPrep AI Workspace"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-sm mb-2 inline-block">
                    Smart Prep Suite
                  </span>
                  <h3 className="text-lg font-bold">Interactive Learning Platform</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENTO FEATURE HIGHLIGHTS (Visual Image Cards) */}
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

      {/* SAMPLE STUDY PLANS SECTION */}
      <section id="topviewbooks" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PredefinedStudyPlan />
        </div>
      </section>
    </div>
  );
}