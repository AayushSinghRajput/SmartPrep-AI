"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../ui/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const isHomepage = router.pathname === "/";

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  // Streamlined 4-link desktop navigation
  const navLinks = [
    { name: "30-Day Plans", href: isHomepage ? "#crash-plans" : "/#crash-plans" },
    { name: "How It Works", href: isHomepage ? "#how-it-works" : "/#how-it-works" },
    { name: "Pricing", href: isHomepage ? "#pricing" : "/#pricing" },
    { name: "Community", href: "/community" },
  ];

  // Extended navigation for mobile slide-out drawer
  const drawerNavLinks = [
    ...navLinks,
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  const isLinkActive = (href) => {
    if (href.startsWith("/#") || href.startsWith("#")) return false;
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  return (
    <>
      {/* FLOATING CAPSULE NAVBAR (Streamlined 4-Link Architecture) */}
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <div
            className={`
              w-full rounded-full transition-all duration-300
              ${
                scrolled
                  ? "bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-900/5 py-2 px-4 sm:px-6"
                  : "bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs py-2 sm:py-2.5 px-4 sm:px-6"
              }
              flex items-center justify-between gap-3 sm:gap-4
            `}
          >
            {/* BRAND LOGO (Acts as Home Link) */}
            <div className="flex items-center flex-shrink-0">
              <Logo variant="dark" size="md" href="/" />
            </div>

            {/* DESKTOP & TABLET NAVIGATION LINKS (Fits cleanly on md+ viewports) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      relative px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors outline-none
                      ${
                        active
                          ? "text-indigo-600 font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }
                    `}
                  >
                    <span>{item.name}</span>

                    {/* Active Link Underline Indicator Bar */}
                    {active && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-indigo-600 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* DESKTOP & TABLET ACTIONS (Visible on md+) */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {user ? (
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/dashboard"
                    className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    aria-label="Sign Out"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 lg:gap-3">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30"
                  >
                    Start Free
                  </Link>
                </div>
              )}
            </div>

            {/* MOBILE ONLY CONTROLS (< md e.g. phones under 768px) */}
            <div className="flex items-center md:hidden gap-2">
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  Start Free
                </Link>
              )}

              {/* Hamburger Toggle Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (< md) */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
            />

            {/* Drawer Surface */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-white border-l border-slate-200 shadow-xl flex flex-col p-6 z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <Logo variant="dark" size="sm" href="/" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 flex-1">
                {drawerNavLinks.map((item) => {
                  const active = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`
                        px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between
                        ${
                          active
                            ? "text-indigo-600 bg-indigo-50 font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }
                      `}
                    >
                      <span>{item.name}</span>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Auth Actions in Drawer */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-2.5">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        {(user.firstName || user.username || "S").charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user.firstName || user.username || "Student"}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      Go to Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full text-center py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      Start Free Plan
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
