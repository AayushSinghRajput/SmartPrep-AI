"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiFileText,
  FiUserCheck,
  FiDatabase,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 7, 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Overview",
      icon: <FiShield className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            Welcome to <strong>SmartPrep AI</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to safeguarding the privacy and personal data of our users—primarily students, educators, and candidates preparing for Nepal&apos;s National Examinations Board (NEB) Grade 12 Science exams and higher education engineering (IOE) and medical (CEE) entrance evaluations.
          </p>
          <p className="leading-relaxed mt-3">
            This Privacy Policy explains how we collect, process, store, and protect your information when you access our web application, upload textbook materials, and interact with our study plans, interactive quizzes, and community forums.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      icon: <FiDatabase className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            We only collect information necessary to deliver accurate study roadmaps and personalized learning tools:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Account & Profile Information:</strong> Name, email address, password hash (or Google OAuth profile identifier), and user role.
            </li>
            <li>
              <strong>Uploaded Educational Materials:</strong> Textbook PDFs, syllabus chapters, and user-provided notes uploaded into your workspace.
            </li>
            <li>
              <strong>Learning & Performance Analytics:</strong> Quiz scores, completion timestamps, active study days, flagged practice questions, and chapter mastery progression.
            </li>
            <li>
              <strong>Technical & Device Data:</strong> IP address, browser type, device category (desktop, tablet, mobile), session cookies, and interface preference settings.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Your Information",
      icon: <FiCheckCircle className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            Your information is used strictly to power educational functionality:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>To extract chapter outlines and generate structured 30-day or custom-duration study schedules.</li>
            <li>To ground AI explanations and doubt responses strictly in your curriculum textbook content.</li>
            <li>To generate adaptive multiple-choice questions (MCQs) and evaluate your exam readiness.</li>
            <li>To maintain student session security, prevent unauthorized account access, and deliver critical service updates.</li>
            <li>We <strong>never sell, lease, or monetize</strong> student personal data or uploaded textbook files to data brokers or third-party advertisers.</li>
          </ul>
        </>
      ),
    },
    {
      id: "pdf-processing",
      title: "4. Textbook PDF Processing & Workspace Privacy",
      icon: <FiFileText className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            When you upload a textbook or study syllabus in PDF format:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Workspace Isolation:</strong> Files are processed inside your authenticated, private student workspace. Other students cannot access your custom textbook library.
            </li>
            <li>
              <strong>Fair Educational Use:</strong> Uploaded materials are indexed solely to extract chapter headings, core formulas, and syllabus scopes for your personal study roadmap.
            </li>
            <li>
              <strong>No Public AI Training:</strong> Your private document text is not used to train public open-source foundation models.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "security-measures",
      title: "5. Data Storage & Security Standards",
      icon: <FiLock className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            We employ modern security safeguards to prevent unauthorized access, loss, or disclosure:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>All network communications are encrypted in transit using industry-standard TLS / HTTPS (256-bit encryption).</li>
            <li>Sensitive account passwords are encrypted using strong cryptographic one-way hashing algorithms.</li>
            <li>Server endpoints enforce strict CORS, session rate limiting, and authenticated token validation.</li>
          </ul>
        </>
      ),
    },
    {
      id: "student-rights",
      title: "6. Your Data Rights & Deletion",
      icon: <FiUserCheck className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            You maintain full ownership of your student account and uploaded content:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li><strong>Access & Review:</strong> You can view all active study plans, progress scores, and profile records inside your Dashboard.</li>
            <li><strong>File Removal:</strong> You may delete uploaded books and generated schedules at any time from your workspace.</li>
            <li><strong>Complete Account Deletion:</strong> You may request permanent deletion of your account, history, and associated records by emailing us at <a href="mailto:soulmatelumi@gmail.com" className="text-indigo-600 underline font-semibold">soulmatelumi@gmail.com</a>.</li>
          </ul>
        </>
      ),
    },
    {
      id: "contact-us",
      title: "7. Contact Information",
      icon: <FiMail className="w-5 h-5 text-indigo-600" />,
      content: (
        <>
          <p className="leading-relaxed">
            If you have questions, feedback, or privacy-related requests regarding this policy, please reach out to our team:
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
        <title>Privacy Policy — SmartPrep AI</title>
        <meta
          name="description"
          content="Learn how SmartPrep AI protects student data, textbook uploads, and learning analytics with encryption and privacy-first architecture."
        />
        <link rel="canonical" href="https://smartprepai-three.vercel.app/privacy" />
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
              <FiShield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Official Policy Document</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            
            <p className="text-sm text-slate-500 mt-2">
              Last updated: <span className="font-semibold text-slate-700">{lastUpdated}</span>
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-100">
              At SmartPrep AI, we believe educational technology should be transparent, safe, and respectful of students&apos; intellectual focus. This document outlines how your learning workspace and data are handled.
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

