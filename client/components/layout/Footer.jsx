"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiShield, FiCheckCircle } from "react-icons/fi";
import Logo from "../ui/Logo";
import { showToast } from "../ui/Toast";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      showToast.error("Please enter a valid email address.");
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      showToast.success("Thanks for subscribing! We'll keep you updated on new study tools.");
      setEmail("");
      setIsSubscribing(false);
    }, 350);
  };

  return (
    <footer className="bg-slate-50/80 border-t border-slate-200/90 text-slate-600 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" href="/" />
            
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Nepal&apos;s personalized AI-powered study companion for NEB Grade 12 Science
              and IOE / CEE entrance examinations. Turn textbook PDFs into structured daily
              milestones and high-retention practice quizzes.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>Aligned with NEB +2 Science Curriculum</span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-all shadow-2xs"
                aria-label="Facebook"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-all shadow-2xs"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-all shadow-2xs"
                aria-label="Twitter / X"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-all shadow-2xs"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  30-Day Plans
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-indigo-600 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-indigo-600 transition-colors">
                  Student Community
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Study Suite */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Study Suite
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Custom PDF Planner
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  Physics Revision Schedule
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  Chemistry Core Plan
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  Mathematics Problem Tracker
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Entrance MCQ Drills
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Timed Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Corner: Contact & Subscribe */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Get in Touch
              </h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <FiMail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <a
                    href="mailto:soulmatelumi@gmail.com"
                    className="hover:text-indigo-600 transition-colors break-all font-medium text-slate-700 text-xs sm:text-sm"
                  >
                    soulmatelumi@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <FiPhone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <a
                    href="tel:9805981168"
                    className="hover:text-indigo-600 transition-colors font-medium text-slate-700 text-xs sm:text-sm"
                  >
                    +977 9805981168
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <FiMapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700 text-xs sm:text-sm">Kathmandu, Nepal</span>
                </li>
              </ul>
            </div>

            {/* Right Bottom Corner: Newsletter Form */}
            <div className="pt-4 border-t border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Stay Updated
              </h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Get exam tips & entrance updates.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <FiMail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all shadow-2xs"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Legal Links */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} SmartPrep AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/terms"
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
