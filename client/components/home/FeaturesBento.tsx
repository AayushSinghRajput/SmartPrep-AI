"use client";

import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCheckSquare,
  FiBookOpen,
  FiMessageCircle,
  FiBarChart2,
  FiTarget,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import { homepageContent } from "@/content/homepage.content";

export default function FeaturesBento() {
  const { features } = homepageContent;
  const items = features.items || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When on mobile, each slide moves 1 card (total max is items.length - 1)
  // When on desktop/tablet, 2 cards are shown at a time (total max is items.length - 2)
  const maxIndex = isMobile ? items.length - 1 : items.length - 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
        return <FiCalendar className="w-5 h-5 text-indigo-600" />;
      case "check-square":
        return <FiCheckSquare className="w-5 h-5 text-emerald-600" />;
      case "book-open":
        return <FiBookOpen className="w-5 h-5 text-indigo-600" />;
      case "message-circle":
        return <FiMessageCircle className="w-5 h-5 text-amber-600" />;
      case "bar-chart-2":
        return <FiBarChart2 className="w-5 h-5 text-indigo-600" />;
      case "target":
        return <FiTarget className="w-5 h-5 text-emerald-600" />;
      default:
        return <FiCalendar className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getBadgeStyle = (tag: string) => {
    if (tag.includes("IOE") || tag.includes("Format")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (tag.includes("Zero") || tag.includes("Discipline")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-indigo-50 text-indigo-700 border-indigo-200";
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Platform Ambient Radial Diffuser */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[760px] h-[450px] bg-gradient-to-b from-indigo-100/30 via-slate-100/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Engineered for Focus, Speed &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 font-editorial italic font-normal">
              Exam Retention
            </span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-base mt-3.5 leading-relaxed max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </div>

        {/* 2-Card Slider Container with Navigation Arrows */}
        <div className="relative max-w-6xl mx-auto px-2 sm:px-12">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-lg hover:border-indigo-300 hover:text-indigo-600 text-slate-700 flex items-center justify-center transition-all cursor-pointer group active:scale-95"
            aria-label="Previous feature"
          >
            <FiChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Carousel Viewport (Shows 2 Cards at a time on md+, 1 on mobile) */}
          <div className="overflow-hidden py-3">
            <motion.div
              className="flex"
              animate={{
                x: isMobile ? `-${currentIndex * 100}%` : `-${currentIndex * 50}%`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-full md:w-1/2 shrink-0 p-3 sm:p-3.5"
                >
                  <div className="bg-[#f8fafc] rounded-[32px] border border-slate-200/90 p-7 sm:p-9 flex flex-col justify-between hover:bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-950/5 transition-all duration-300 h-full group">
                    <div>
                      {/* Top Header: Icon & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                          {getFeatureIcon(item.icon)}
                        </div>
                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full border shadow-2xs ${getBadgeStyle(
                            item.tag || ""
                          )}`}
                        >
                          {item.tag || "Core Feature"}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Benefit Bullet Points */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-2.5 pt-4 border-t border-slate-200/70 mb-6">
                          {item.highlights.map((hl: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                                <FiCheck className="w-3 h-3" />
                              </div>
                              <span className="leading-snug font-medium">{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Micro-Token */}
                    <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <span>Aligned with NEB +2 Science</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200/90 shadow-md hover:shadow-lg hover:border-indigo-300 hover:text-indigo-600 text-slate-700 flex items-center justify-center transition-all cursor-pointer group active:scale-95"
            aria-label="Next feature"
          >
            <FiChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-indigo-600 shadow-xs"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
