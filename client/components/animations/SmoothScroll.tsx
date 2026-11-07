"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

/**
 * PublicSmoothScroll Component
 * Initializes Lenis smooth scrolling strictly on public marketing routes.
 * Automatically respects `prefers-reduced-motion` and cleans up on unmount or route change.
 */
export default function PublicSmoothScroll({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Only enable on public pages
    const publicRoutes = ["/", "/about", "/contact"];
    const isPublic = publicRoutes.includes(router.pathname);

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isPublic || prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    let rafId: number;

    // Dynamically import Lenis to keep dashboard bundle lightweight
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }).catch((err) => {
      console.warn("Lenis smooth scroll could not be initialized:", err);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [router.pathname]);

  return <>{children}</>;
}

