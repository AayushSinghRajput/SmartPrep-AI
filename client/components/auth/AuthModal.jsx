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
  FiKey,
  FiShield,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
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
    requestOtp,
    loginWithOtp,
  } = useAuth();

  // Authentication method: "password" or "otp"
  const [authMethod, setAuthMethod] = useState("password");

  // Form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP specific state
  const [otpStep, setOtpStep] = useState("send"); // "send" | "verify"
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignIn = authModalMode === "signin";

  // Reset form errors and sensitive fields when switching modes or closing
  useEffect(() => {
    setError("");
    setPassword("");
    setShowPassword(false);
    setOtpCode("");
    setOtpStep("send");
  }, [authModalMode, authModalOpen, authMethod]);

  // Resend countdown timer effect
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

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

  // Google OAuth handler
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

  // GitHub OAuth handler
  const handleGithubClick = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    if (!clientId) {
      toast.error(
        "GitHub OAuth is not configured. Please set NEXT_PUBLIC_GITHUB_CLIENT_ID in client/.env"
      );
      return;
    }

    const redirectUri =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/github/callback`
        : "";
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    window.location.href = githubUrl;
  };

  // OTP: Send 6-digit Code
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please provide a valid email address.");
      toast.error("Valid email address is required");
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp(trimmedEmail);
      if (!res.success) {
        setError(res.message || "Failed to send verification code.");
        toast.error(res.message || "Failed to send code");
      } else {
        toast.success(`Verification code sent to ${trimmedEmail}`);
        setOtpStep("verify");
        setResendTimer(60);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  // OTP: Verify 6-digit Code
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedOtp = otpCode.trim();
    if (!trimmedOtp || trimmedOtp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      toast.error("6-digit code required");
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithOtp(email.trim().toLowerCase(), trimmedOtp);
      if (!result.success) {
        setError(result.message || "Invalid or expired verification code.");
        toast.error(result.message || "Verification failed");
      } else {
        toast.success("Welcome! Verification successful. Redirecting...");
        closeAuthModal();
      }
    } catch (err) {
      setError("An unexpected error occurred during verification.");
      toast.error("Verification error");
    } finally {
      setLoading(false);
    }
  };

  // Password-based Form Submit
  const handlePasswordSubmit = async (e) => {
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
              {/* Mode Switcher Tabs: Sign In / Create Account */}
              <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-xl mb-4">
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
              <div className="mb-4">
                <h2
                  id="auth-modal-title"
                  className="text-xl font-extrabold text-slate-900 tracking-tight"
                >
                  {authMethod === "otp"
                    ? otpStep === "send"
                      ? "Passwordless Sign-In"
                      : "Enter Verification Code"
                    : isSignIn
                    ? "Welcome Back"
                    : "Create Free Account"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {authMethod === "otp"
                    ? otpStep === "send"
                      ? "We will email you a 6-digit code for instant password-free login."
                      : `Enter the 6-digit code sent to ${email}`
                    : isSignIn
                    ? "Sign in to access your saved study schedule & progress"
                    : "Join SmartPrep AI and master your NEB +2 Science syllabus"}
                </p>
              </div>

              {/* Method Switcher: Password vs Email OTP */}
              <div className="flex items-center gap-2 mb-4 p-1 bg-slate-50 border border-slate-200/80 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setAuthMethod("password");
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    authMethod === "password"
                      ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FiKey className="w-3.5 h-3.5" />
                  <span>Password</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setAuthMethod("otp");
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    authMethod === "otp"
                      ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FiShield className="w-3.5 h-3.5" />
                  <span>Email OTP</span>
                </button>
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

              {/* -------------------- PASSWORD FLOW -------------------- */}
              {authMethod === "password" && (
                <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
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
              )}

              {/* -------------------- EMAIL OTP FLOW -------------------- */}
              {authMethod === "otp" && (
                <div className="space-y-3.5">
                  {otpStep === "send" ? (
                    <form onSubmit={handleSendOtp} className="space-y-3.5">
                      <div>
                        <label
                          htmlFor="otp-email"
                          className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1"
                        >
                          Your Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <FiMail size={15} />
                          </div>
                          <input
                            id="otp-email"
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

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={loading}
                        className="w-full mt-2 cursor-pointer shadow-sm shadow-indigo-600/20"
                      >
                        Send 6-Digit Code
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="truncate">Sent to <strong className="text-slate-800">{email}</strong></span>
                        <button
                          type="button"
                          onClick={() => setOtpStep("send")}
                          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer shrink-0 ml-2"
                        >
                          <FiArrowLeft className="w-3 h-3" />
                          <span>Change</span>
                        </button>
                      </div>

                      {/* 6-Digit Code Input */}
                      <div>
                        <input
                          id="otp-code"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          autoComplete="one-time-code"
                          autoFocus
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          className="w-full py-3 px-4 text-center text-2xl font-mono font-bold tracking-[0.4em] bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-300 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                          placeholder="000000"
                          required
                        />
                        <p className="text-center text-xs text-slate-500 mt-2">
                          Enter the 6-digit code sent to your email inbox.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={loading}
                        disabled={otpCode.length !== 6}
                        className="w-full mt-2 cursor-pointer shadow-sm shadow-indigo-600/20"
                      >
                        Verify & Continue
                      </Button>

                      {/* Resend Code Button & Timer */}
                      <div className="flex justify-center items-center pt-1 text-xs text-slate-500">
                        {resendTimer > 0 ? (
                          <span>Resend code in <span className="font-bold text-slate-700">{resendTimer}s</span></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer disabled:opacity-50"
                          >
                            <FiRefreshCw className="w-3 h-3" />
                            <span>Resend verification code</span>
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Social Auth Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-200" />
                <span className="shrink mx-3 text-slate-400 text-[11px] font-medium uppercase tracking-wider">
                  or continue with
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {/* OAuth Providers: Google & GitHub */}
              <div className="space-y-2.5">
                {/* Google OAuth Login */}
                <div className="flex justify-center w-full">
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

                {/* GitHub OAuth Login */}
                <button
                  type="button"
                  onClick={handleGithubClick}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  <FaGithub className="w-4 h-4 text-white" />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Mode Toggle Footer */}
              <div className="text-center text-xs text-slate-500 pt-4 mt-1 border-t border-slate-100">
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
