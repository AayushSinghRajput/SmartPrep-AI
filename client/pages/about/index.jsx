import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import { FaCheckCircle, FaStar, FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import studentAnimation from "../../animations/student.json";

export default function About() {
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      question: "How does SmartPrep AI work?",
      answer:
        "Upload your notes or textbook in PDF format, and SmartPrep AI generates a day-by-day structured study schedule, interactive note summaries, and auto-generated multiple-choice quizzes to streamline your revision.",
    },
    {
      question: "Do I need an account to track my progress?",
      answer:
        "Yes, creating a free account saves your uploaded books, day-wise quiz scores, and personalized learning milestones.",
    },
    {
      question: "Is SmartPrep AI optimized for mobile study sessions?",
      answer:
        "SmartPrep AI is built with responsive layout grids designed for laptops, tablets, and smartphones.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-12">
          <div data-aos="fade-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
              EdTech Learning Suite
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              About <span className="text-indigo-600">SmartPrep AI</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
              SmartPrep AI is a high-retention learning platform tailored for higher education and +2 Science students.
            </p>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We eliminate study fatigue by turning dense textbooks into structured daily milestones, instant flashcards, and adaptive exam practice.
            </p>
          </div>

          <div data-aos="fade-left" className="flex justify-center">
            <div className="w-full max-w-md bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <Lottie animationData={studentAnimation} loop={true} className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* BENTO FEATURES GRID */}
        <div className="mb-12" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-6">
            <FaStar className="text-indigo-600 w-5 h-5" />
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Platform Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { title: "PDF Schedule Generator", desc: "Turns syllabus PDFs into day-by-day structured study plans automatically." },
              { title: "AI Concept Explanations", desc: "Simplifies complex academic concepts with clear markdown & math rendering." },
              { title: "Adaptive MCQ Engine", desc: "Generates topic-specific quizzes with instant explanations to test recall." },
              { title: "Progress Analytics", desc: "Tracks day-wise accuracy, performance progress, and study completion metrics." },
              { title: "Science & Entrance Focused", desc: "Designed for +2 Science board exams and competitive entrance preparation." },
              { title: "Interactive Doubt Assistant", desc: "Context-aware AI chatbot trained to answer questions on your specific course material." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                  <FaCheckCircle className="w-3.5 h-3.5" /> Included in Suite
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-6">
            <FaQuestionCircle className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-slate-200/80 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 text-sm sm:text-base hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span>{item.question}</span>
                  <FaChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      faqOpen === index ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {faqOpen === index && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}