"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import AuthLayout from "../../components/layout/AuthLayout";
import Button from "../../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await loginWithGoogle(credentialResponse.credential);
    if (!result.success) {
      toast.error(result.message || "Google sign-in failed");
    } else {
      toast.success("Login successful! Redirecting to dashboard...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in both email and password.");
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const credentials = { email, password };
      const result = await login(credentials);

      if (!result.success) {
        setError(result.message || "Invalid email or password.");
        toast.error(result.message || "Login failed");
        setLoading(false);
      } else {
        toast.success("Login successful! Redirecting to dashboard...");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome Back"
      subheading="Sign in to your SmartPrep AI workspace"
    >
      <Head>
        <title>Sign In — SmartPrep AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-700 text-xs font-semibold"
        >
          <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FiMail size={16} />
            </div>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FiLock size={16} />
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={loading}
          className="w-full mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Social Auth Divider */}
      <div className="flex items-center my-5">
        <div className="flex-grow border-t border-slate-200" />
        <span className="flex-shrink mx-3 text-slate-400 text-xs font-medium uppercase tracking-wider">or</span>
        <div className="flex-grow border-t border-slate-200" />
      </div>

      {/* Google OAuth Login */}
      <div className="flex justify-center mb-5">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google sign-in failed")}
        />
      </div>

      {/* Registration Redirect Link */}
      <div className="text-center text-xs text-slate-500">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-indigo-600 hover:text-indigo-700 focus:outline-none focus-visible:underline"
          >
            Create Free Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
