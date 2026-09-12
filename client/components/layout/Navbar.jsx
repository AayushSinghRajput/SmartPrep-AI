"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiUser, FiLogOut, FiAward, FiBookOpen } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoImg from "../../assets/images/logo.jpeg";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  /* -------------------- Detect Scroll -------------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------- Auth Handlers -------------------- */
  const handleLoginClick = () => {
    router.push("/login");
    setMenuOpen(false);
  };

  const handleSignupClick = () => {
    router.push("/signup");
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/");
    setMenuOpen(false);
  };


  /* -------------------- Nav Links -------------------- */
  const centerLinks = ["/", "/about", "/contact"];
  if (user) centerLinks.push("/community", "/dashboard");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        fixed top-0 w-full z-50
        backdrop-blur-md bg-white/80 border-b border-slate-200/60
        transition-all duration-200 ease-in-out
        ${scrolled ? "shadow-sm border-slate-200" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================= DESKTOP ======================= */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center h-16 gap-6">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
            <div className="relative h-10 w-40 group-hover:scale-105 transition-transform duration-200">
              <Image src={logoImg} alt="SmartPrep AI Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* CENTER LINKS */}
          <div className="flex justify-center gap-1.5">
            {centerLinks.map((link) => {
              const label =
                link === "/" ? "Home" :
                link === "/dashboard" ? "Dashboard" :
                link === "/community" ? "Community" :
                link.charAt(1).toUpperCase() + link.slice(2);

              const isActive = pathname === link;

              return (
                <Link
                  key={link}
                  href={link}
                  className={`
                    px-3.5 py-1.5 rounded-lg text-sm font-medium
                    transition-all duration-150 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50/80 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex justify-end items-center gap-3">
            {loading ? (
              <div className="flex items-center gap-2.5">
                <div className="w-20 h-9 bg-slate-200/60 rounded-lg animate-pulse" />
                <div className="w-28 h-9 bg-indigo-200/60 rounded-lg animate-pulse" />
              </div>
            ) : !user ? (
              <>
                <button
                  onClick={handleLoginClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-150"
                >
                  <FiUser className="w-4 h-4 text-slate-500" /> Log In
                </button>

                <button
                  onClick={handleSignupClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm transition-all duration-150"
                >
                  <FiAward className="w-4 h-4" /> Get Started
                </button>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm transition-all duration-150"
              >
                <FiLogOut className="w-4 h-4" /> Sign Out
              </button>
            )}
          </div>
        </div>

        {/* ======================= MOBILE HEADER ======================= */}
        <div className="flex md:hidden justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="relative h-9 w-36">
              <Image src={logoImg} alt="SmartPrep AI Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ======================= MOBILE MENU ======================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1"
          >
            {centerLinks.map((link) => (
              <Link
                key={link}
                href={link}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  pathname === link ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link === "/" ? "Home" : link === "/dashboard" ? "Dashboard" : link === "/community" ? "Community" : link.slice(1).charAt(0).toUpperCase() + link.slice(2)}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {loading ? (
                <div className="w-full h-10 bg-slate-100 rounded-lg animate-pulse" />
              ) : !user ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="w-full text-center py-2.5 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100"
                  >
                    Log In
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="w-full text-center py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="w-full text-center py-2.5 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
