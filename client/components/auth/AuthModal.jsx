"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiX,
} from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    closeAuthModal,
    setAuthModalMode,
    login,
    register,
    loginWithGoogle,
  } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignIn = authModalMode === "signin";

  // Reset form errors and sensitive fields when switching modes or closing
  useEffect(() => {
    setError("");
    setPassword("");
    setShowPassword(false);
  }, [authModalMode, authModalOpen]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!authModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [authModalOpen, closeAuthModal]);

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);
    if (!result.success) {
      toast.error(result.message || "Google sign-in failed");
    } else {
      toast.success(
        isSignIn
          ? "Welcome back! Redirecting to dashboard..."
          : "Account created successfully! Redirecting to dashboard..."
      );
      closeAuthModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignIn) {
      // Sign In Flow
      if (!email || !password) {
        setError("Please fill in both email and password.");
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      try {
        const result = await login({ email, password });
        if (!result.success) {
          setError(result.message || "Invalid email or password.");
          toast.error(result.message || "Login failed");
          setLoading(false);
        } else {
          toast.success("Welcome back! Redirecting to dashboard...");
          closeAuthModal();
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred");
        setLoading(false);
      }
    } else {
      // Sign Up Flow
      if (!username.trim() || !email.trim() || !password) {
        setError("Please fill in all fields.");
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      try {
        const result = await register({
          username: username.trim(),
          email: email.trim(),
          password,
        });

        if (!result.success) {
          setError(
            result.message || "Registration failed. Please try a different email."
          );
          toast.error(result.message || "Registration failed");
          setLoading(false);
        } else {
          toast.success("Account created successfully! Redirecting to dashboard...");
          closeAuthModal();
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred");
        setLoading(false);
      }
    }
  };

  const isPasswordValidLength = password.length >= 6;

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="relative w-full max-w-[440px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto z-10"
          >
            {/* Top Bar with Logo & Close Button */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <Logo variant="dark" size="sm" href={null} />
              <button
                type="button"
                onClick={closeAuthModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close authentication modal"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6 pt-2">
              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setAuthModalMode("signin");
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isSignIn
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setAuthModalMode("signup");
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    !isSignIn
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-5">
                <h2
                  id="auth-modal-title"
                  className="text-xl font-extrabold text-slate-900 tracking-tight"
                >
                  {isSignIn ? "Welcome Back" : "Create Free Account"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isSignIn
                    ? "Sign in to access your saved study schedule & progress"
                    : "Join SmartPrep AI and master your NEB +2 Science syllabus"}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div
                  role="alert"
                  className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-700 text-xs font-semibold"
                >
                  <FiAlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Pure Focused Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name for Sign Up */}
                {!isSignIn && (
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FiUser size={15} />
                      </div>
                      <input
                        id="modal-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        placeholder="e.g. Aayush Rajput"
                        required={!isSignIn}
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FiMail size={15} />
                    </div>
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      placeholder="student@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="modal-password"
                      className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FiLock size={15} />
                    </div>
                    <input
                      id="modal-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete={isSignIn ? "current-password" : "new-password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      placeholder={isSignIn ? "••••••••" : "At least 6 characters"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>

                  {!isSignIn && (
                    <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                          isPasswordValidLength
                            ? "bg-emerald-100 text-emerald-700 font-bold"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          isPasswordValidLength
                            ? "text-emerald-700 font-semibold"
                            : "text-slate-400"
                        }
                      >
                        Must be at least 6 characters
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={loading}
                  className="w-full mt-2 cursor-pointer shadow-sm shadow-indigo-600/20"
                >
                  {isSignIn ? "Sign In" : "Create Free Account"}
                </Button>
              </form>

              {/* Social Auth Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-200" />
                <span className="shrink mx-3 text-slate-400 text-[11px] font-medium uppercase tracking-wider">
                  or
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {/* Google OAuth Login */}
              <div className="flex justify-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google sign-in failed")}
                  theme="outline"
                  shape="circle"
                  text={isSignIn ? "signin_with" : "signup_with"}
                  size="medium"
                  width="100%"
                />
              </div>

              {/* Mode Toggle Footer */}
              <div className="text-center text-xs text-slate-500 pt-1">
                {isSignIn ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setAuthModalMode("signup");
                      }}
                      className="font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer focus:outline-none focus:underline"
                    >
                      Create Free Account
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setAuthModalMode("signin");
                      }}
                      className="font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer focus:outline-none focus:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
