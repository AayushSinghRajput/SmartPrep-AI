"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";

export default function GitHubCallback() {
  const router = useRouter();
  const { loginWithGithub } = useAuth();

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;

    // Retrieve code or error from router query or fallback to window.location.search
    let code = router.query.code;
    let urlError = router.query.error;
    let errorDescription = router.query.error_description;

    if (typeof window !== "undefined" && (!code && !urlError)) {
      const searchParams = new URLSearchParams(window.location.search);
      code = searchParams.get("code");
      urlError = searchParams.get("error");
      errorDescription = searchParams.get("error_description");
    }

    if (urlError) {
      executedRef.current = true;
      setStatus("error");
      setErrorMessage(
        errorDescription || "GitHub authorization was cancelled or denied."
      );
      return;
    }

    if (!code) {
      // Waiting for router query parameters
      return;
    }

    executedRef.current = true;
    setStatus("loading");

    const exchangeCode = async () => {
      try {
        const result = await loginWithGithub(code);
        if (result.success) {
          setStatus("success");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1200);
        } else {
          setStatus("error");
          setErrorMessage(result.message || "Failed to authenticate with GitHub.");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage("An unexpected error occurred during GitHub verification.");
      }
    };

    exchangeCode();
  }, [router.isReady, router.query, loginWithGithub, router]);

  return (
    <>
      <Head>
        <title>Authenticating with GitHub — SmartPrep AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 p-8 text-center">
          <div className="flex justify-center mb-6">
            <Logo variant="dark" size="md" href="/" />
          </div>

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-md">
            <FaGithub className="w-8 h-8" />
          </div>

          {status === "loading" && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Authenticating with GitHub
              </h2>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                Please wait while we verify your account and set up your study workspace...
              </p>
              <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium text-xs">
                <FiLoader className="w-5 h-5 animate-spin" />
                <span>Exchanging credentials securely</span>
              </div>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Authentication Successful!
              </h2>
              <p className="text-xs text-slate-500 mt-2">
                Redirecting you to your dashboard...
              </p>
            </div>
          )}

          {status === "error" && (
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Sign-In Failed
              </h2>
              <p className="text-xs text-rose-600 font-medium mt-2 mb-6 bg-rose-50 border border-rose-200 rounded-xl p-3">
                {errorMessage}
              </p>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/"
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
