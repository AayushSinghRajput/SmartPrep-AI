"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  FiUser,
  FiMail,
  FiLock,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiKey,
  FiShield,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/ui/Button";

export default function Register() {
  const [authMethod, setAuthMethod] = useState("password"); // "password" | "otp"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpStep, setOtpStep] = useState("send"); // "send" | "verify"
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, loginWithGoogle, requestOtp, loginWithOtp } = useAuth();

  // Reset errors and clear OTP when switching method
  useEffect(() => {
    setError("");
    setPassword("");
    setOtpCode("");
    setOtpStep("send");
  }, [authMethod]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);
    if (!result.success) {
      toast.error(result.message || "Google sign-in failed");
    } else {
      toast.success("Account created successfully! Redirecting to dashboard...");
    }
  };

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
        toast.success("Account verified successfully! Redirecting to dashboard...");
      }
    } catch (err) {
      setError("An unexpected error occurred during verification.");
      toast.error("Verification error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      const userData = { username: username.trim(), email: email.trim(), password };
      const result = await register(userData);

      if (!result.success) {
        setError(result.message || "Registration failed. Please try a different email.");
        toast.error(result.message || "Registration failed");
        setLoading(false);
      } else {
        toast.success("Account created successfully! Redirecting to dashboard...");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  const isPasswordValidLength = password.length >= 6;

  return (
    <AuthLayout
      heading={
        authMethod === "otp"
          ? otpStep === "send"
            ? "Passwordless Sign-Up"
            : "Enter Verification Code"
          : "Create Free Account"
      }
      subheading={
        authMethod === "otp"
          ? otpStep === "send"
            ? "Sign up instantly with a one-time 6-digit email code"
            : `Enter the 6-digit code sent to ${email}`
          : "Get started with the NEB +2 Science AI prep suite"
      }
    >
      <Head>
        <title>Create Free Account — SmartPrep AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Authentication Method Selector */}
      <div className="flex items-center gap-2 mb-4 p-1 bg-slate-100/80 border border-slate-200/60 rounded-xl">
        <button
          type="button"
          onClick={() => setAuthMethod("password")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
          onClick={() => setAuthMethod("otp")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
          className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-700 text-xs font-semibold"
        >
          <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Password Flow Form */}
      {authMethod === "password" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="register-name"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Full Name or Student Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiUser size={16} />
              </div>
              <input
                id="register-name"
                type="text"
                name="name"
                autoComplete="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                placeholder="e.g. Aayush Rajput"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiMail size={16} />
              </div>
              <input
                id="register-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                placeholder="student@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:underline cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FiLock size={16} />
              </div>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                placeholder="At least 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                  isPasswordValidLength
                    ? "bg-emerald-100 text-emerald-700 font-bold"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                ✓
              </span>
              <span className={isPasswordValidLength ? "text-emerald-700 font-semibold" : "text-slate-400"}>
                Must be at least 6 characters.
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={loading}
            className="w-full mt-2 cursor-pointer"
          >
            Create Free Account
          </Button>
        </form>
      )}

      {/* Email OTP Flow */}
      {authMethod === "otp" && (
        <div className="space-y-4">
          {otpStep === "send" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="otp-email"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FiMail size={16} />
                  </div>
                  <input
                    id="otp-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
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
                className="w-full mt-2 cursor-pointer"
              >
                Send 6-Digit Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
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
                className="w-full mt-2 cursor-pointer"
              >
                Verify & Create Account
              </Button>

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
      <div className="flex items-center my-5">
        <div className="flex-grow border-t border-slate-200" />
        <span className="flex-shrink mx-3 text-slate-400 text-xs font-medium uppercase tracking-wider">
          or continue with
        </span>
        <div className="flex-grow border-t border-slate-200" />
      </div>

      {/* OAuth Providers: Google & GitHub */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google sign-in failed")}
            shape="circle"
            size="large"
            width="100%"
          />
        </div>

        <button
          type="button"
          onClick={handleGithubClick}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          <FaGithub className="w-4 h-4 text-white" />
          <span>Continue with GitHub</span>
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center text-xs text-slate-500">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
