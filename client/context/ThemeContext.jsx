"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const THEMES = ["light", "dark", "sepia"];
const STORAGE_KEY = "smartprep-theme";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  cycleTheme: () => {},
  isDark: false,
  isSepia: false,
  isLight: true,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Apply theme to HTML root element
  const applyTheme = useCallback((targetTheme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.setAttribute("data-theme", targetTheme);

    // Sync class list for Tailwind & CSS specificity
    root.classList.remove("dark", "sepia");
    if (targetTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else if (targetTheme === "sepia") {
      root.classList.add("sepia");
      root.style.colorScheme = "light";
    } else {
      root.style.colorScheme = "light";
    }
  }, []);

  // Set theme & persist to localStorage
  const setTheme = useCallback((newTheme) => {
    if (!THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      // Ignore localStorage quotas/restrictions
    }
    applyTheme(newTheme);
  }, [applyTheme]);

  // Cycle sequentially between Light -> Dark -> Sepia -> Light
  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const currentIndex = THEMES.indexOf(current);
      const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {}
      applyTheme(nextTheme);
      return nextTheme;
    });
  }, [applyTheme]);

  // Initial client hydration sync
  useEffect(() => {
    let initialTheme = "light";
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.includes(stored)) {
        initialTheme = stored;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        initialTheme = "dark";
      }
    } catch (e) {}

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    // Listen for OS system theme changes if no stored preference exists
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          const autoTheme = e.matches ? "dark" : "light";
          setThemeState(autoTheme);
          applyTheme(autoTheme);
        }
      } catch (err) {}
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme]);

  const value = {
    theme,
    setTheme,
    cycleTheme,
    isDark: theme === "dark",
    isSepia: theme === "sepia",
    isLight: theme === "light",
    mounted,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
