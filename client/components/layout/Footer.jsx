"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Logo from "../ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-600 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" href="/" />
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Personalized AI-powered prep suite for NEB Grade 12 Science students.
              Transform textbook PDFs into daily structured schedules, instant revision notes,
              and adaptive entrance exam quizzes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              Aligned with NEB +2 Science Curriculum
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Twitter / X"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors shadow-2xs"
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
                <Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  30-Day Crash Plans
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-indigo-600 transition-colors">
                  Platform Features
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-indigo-600 transition-colors">
                  Student Forum
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                  Contact
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
                  Custom PDF Plan
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  Physics 30-Day
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  Chemistry 30-Day
                </Link>
              </li>
              <li>
                <Link href="/#crash-plans" className="hover:text-indigo-600 transition-colors">
                  Mathematics 30-Day
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Practice MCQs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Timed Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <a
                  href="mailto:smartprep.ai@gmail.com"
                  className="hover:text-indigo-600 transition-colors break-all"
                >
                  smartprep.ai@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FiPhone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <a href="tel:+9779860123456" className="hover:text-indigo-600 transition-colors">
                  +977 9860123456
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>Dharan, Nepal</span>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                Support Window: 24-hour typical response.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} SmartPrep AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Academic Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
