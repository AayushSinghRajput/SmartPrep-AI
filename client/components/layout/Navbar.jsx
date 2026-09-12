"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiUser, FiLogOut, FiAward, FiBookOpen } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { theme } = useTheme();

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
        backdrop-blur-md bg-[var(--bg-navbar)] border-b border-[var(--border-primary)]
        transition-all duration-200 ease-in-out
        ${scrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================= DESKTOP ======================= */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center h-16 gap-6">
          
          {/* LOGO */}
          <div className="flex items-center">
            <Logo variant={theme === "dark" ? "light" : "dark"} size="md" href="/" />
          </div>

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
                        ? "text-[var(--accent-primary)] bg-[var(--accent-light)] font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-light)]"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT CLUSTER: AUTH BUTTONS */}
          <div className="flex justify-end items-center gap-3">
            {loading ? (
              <div className="flex items-center gap-2.5">
                <div className="w-20 h-9 bg-slate-200/60 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="w-28 h-9 bg-indigo-200/60 dark:bg-indigo-950 rounded-lg animate-pulse" />
              </div>
            ) : !user ? (
              <>
                <button
                  onClick={handleLoginClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs transition-all duration-150"
                >
                  <FiUser className="w-4 h-4 text-slate-400" /> Log In
                </button>

                <button
                  onClick={handleSignupClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-xs transition-all duration-150"
                >
                  <FiAward className="w-4 h-4" /> Get Started
                </button>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs transition-all duration-150"
              >
                <FiLogOut className="w-4 h-4" /> Sign Out
              </button>
            )}
          </div>
        </div>

        {/* ======================= MOBILE HEADER ======================= */}
        <div className="flex md:hidden justify-between items-center h-16">
          <Logo variant={theme === "dark" ? "light" : "dark"} size="sm" href="/" />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--accent-light)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-primary)] px-4 pt-2 pb-4 space-y-1"
          >
            {centerLinks.map((link) => (
              <Link
                key={link}
                href={link}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  pathname === link
                    ? "bg-[var(--accent-light)] text-[var(--accent-primary)] font-semibold"
                    : "text-[var(--text-primary)] hover:bg-[var(--accent-light)]"
                }`}
              >
                {link === "/" ? "Home" : link === "/dashboard" ? "Dashboard" : link === "/community" ? "Community" : link.slice(1).charAt(0).toUpperCase() + link.slice(2)}
              </Link>
            ))}

            <div className="pt-2 border-t border-[var(--border-primary)] flex flex-col gap-2">
              {loading ? (
                <div className="w-full h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ) : !user ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="w-full text-center py-2.5 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-card-muted)] rounded-lg hover:border-indigo-400"
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
                  className="w-full text-center py-2.5 text-sm font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-lg hover:bg-rose-100"
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
