"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiBookOpen,
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
  FiLock,
  FiAward,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowLeft,
  FiGlobe,
} from "react-icons/fi";

export default function TermsOfServicePage() {
  const lastUpdated = "November 7, 2026";

  const sections = [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      icon: <FiCheckCircle className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            By accessing or using the <strong>SmartPrep AI</strong> platform, accessible at{" "}
            <span className="font-semibold text-slate-800">smartprepai-three.vercel.app</span>, you agree to be bound by these Terms of Service and all applicable laws and regulations in Nepal. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </>
      ),
    },
    {
      id: "description-of-service",
      title: "2. Description of Educational Service",
      icon: <FiBookOpen className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            SmartPrep AI provides personalized, AI-assisted learning preparation tools designed to help high school students (+2 Science) and university entrance candidates (IOE Engineering, CEE Medical) organize their studies:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>Automated extraction of syllabus chapters from uploaded textbook PDFs.</li>
            <li>Custom and 30-day day-by-day structured revision schedules.</li>
            <li>Textbook-grounded doubt explanations and summary notes.</li>
            <li>Adaptive multiple-choice question (MCQ) drills and timed mock tests.</li>
            <li>Peer study discussions in the student community forums.</li>
          </ul>
        </>
      ),
    },
    {
      id: "accounts",
      title: "3. User Accounts & Security",
      icon: <FiLock className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            To unlock custom syllabus generation and bookmark practice history, you must create a verified student account:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>You agree to provide accurate and complete contact information.</li>
            <li>You are responsible for safeguarding your account credentials and password.</li>
            <li>You must notify us immediately at <a href="mailto:soulmatelumi@gmail.com" className="text-indigo-600 font-semibold underline">soulmatelumi@gmail.com</a> if you suspect unauthorized access.</li>
          </ul>
        </>
      ),
    },
    {
      id: "user-content",
      title: "4. User Content & Intellectual Property",
      icon: <FiFileText className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            Respect for intellectual property and educational fair use is fundamental:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Fair Educational Use:</strong> You may upload reference textbooks or personal study notes solely for your own private study and schedule generation.
            </li>
            <li>
              <strong>Student Ownership:</strong> You retain all rights to any notes, questions, or comments you submit in our workspace and forum.
            </li>
            <li>
              <strong>Platform IP:</strong> The SmartPrep AI platform design, code, brand assets, logos, and proprietary algorithms are protected by copyright and intellectual property laws.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable Use Policy",
      icon: <FiAward className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            When interacting with the platform, community forums, and study rooms, you agree NOT to:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>Post abusive, harassing, defamatory, or unlawful content in student forums.</li>
            <li>Attempt to reverse-engineer, decompile, or scrape platform data using automated bots or scripts.</li>
            <li>Circumvent or tamper with security, rate-limiting, or authentication mechanisms.</li>
            <li>Distribute malicious software or interfere with other students&apos; access to the study suite.</li>
          </ul>
        </>
      ),
    },
    {
      id: "disclaimers",
      title: "6. Educational Disclaimers & Independent Tool Notice",
      icon: <FiAlertTriangle className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            SmartPrep AI is an independent study aid engineered to assist students in their exam revision:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Independent Platform:</strong> SmartPrep AI is not officially affiliated with, endorsed by, or sponsored by the National Examinations Board (NEB), the Institute of Engineering (IOE), or the Medical Education Commission (CEE).
            </li>
            <li>
              <strong>Supplementary Aid:</strong> AI-generated schedules and questions are provided as educational practice aids. Students must consult official syllabus guidelines and examination authorities for official curriculum announcements.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Jurisdiction",
      icon: <FiGlobe className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            These Terms of Service are governed by and construed in accordance with the laws of Nepal. Any legal disputes arising out of or related to your use of SmartPrep AI shall be subject to the exclusive jurisdiction of the competent courts of <strong>Kathmandu, Nepal</strong>.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "8. Contact & Support",
      icon: <FiMail className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            If you have any questions or require legal clarification regarding these terms, please contact us:
          </p>
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-sm">
            <div className="flex items-center gap-2.5">
              <FiMail className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Email: <a href="mailto:soulmatelumi@gmail.com" className="text-indigo-600 font-semibold hover:underline">soulmatelumi@gmail.com</a></span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiPhone className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Contact No.: <a href="tel:9805981168" className="text-indigo-600 font-semibold hover:underline">+977 9805981168</a></span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiMapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Location: <strong className="text-slate-800">Kathmandu, Nepal</strong></span>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Terms of Service — SmartPrep AI</title>
        <meta
          name="description"
          content="Review the Terms of Service for SmartPrep AI, covering student accounts, textbook uploads, fair educational use, and platform policies."
        />
        <link rel="canonical" href="https://smartprepai-three.vercel.app/terms" />
      </Head>

      <div className="min-h-screen bg-slate-50/70 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Return Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Document Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4">
              <FiFileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Legal Terms of Use</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            
            <p className="text-sm text-slate-500 mt-2">
              Last updated: <span className="font-semibold text-slate-700">{lastUpdated}</span>
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-100">
              Please review these Terms of Service carefully before utilizing SmartPrep AI. These terms protect both our learning community and your student workspace rights.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.article
                key={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="text-sm text-slate-600 pl-0 sm:pl-13">
                  {section.content}
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

