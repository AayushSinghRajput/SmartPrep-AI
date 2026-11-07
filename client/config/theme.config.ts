/**
 * SmartPrep AI - Central Design Tokens and Theme Configuration
 * Pure Light Design System
 */

export const themeConfig = {
  colors: {
    // Primary Indigo
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5', // Primary brand color
      700: '#4338ca', // Primary hover
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    // Warm Amber / Gold Accent
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Primary accent
      600: '#d97706', // Accent hover
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    // Neutrals (Slate)
    neutral: {
      0: '#ffffff',
      50: '#f8fafc',  // Page background
      100: '#f1f5f9', // Card muted background
      200: '#e2e8f0', // Border primary
      300: '#cbd5e1', // Border hover
      400: '#94a3b8',
      500: '#64748b', // Text muted
      600: '#475569',
      700: '#334155', // Text secondary
      800: '#1e293b',
      900: '#0f172a', // Text primary
      950: '#020617',
    },
    // Semantic States
    success: {
      light: '#ecfdf5',
      border: '#a7f3d0',
      text: '#047857',
      DEFAULT: '#10b981',
    },
    warning: {
      light: '#fffbeb',
      border: '#fde68a',
      text: '#b45309',
      DEFAULT: '#f59e0b',
    },
    error: {
      light: '#fef2f2',
      border: '#fecaca',
      text: '#b91c1c',
      DEFAULT: '#ef4444',
    },
    info: {
      light: '#eff6ff',
      border: '#bfdbfe',
      text: '#1d4ed8',
      DEFAULT: '#3b82f6',
    },
  },
  typography: {
    fontDisplay: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  borderRadius: {
    none: '0px',
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem',// 20px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    xs: '0 1px 2px 0 rgb(15 23 42 / 0.05)',
    sm: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.08)',
    md: '0 4px 6px -1px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06)',
    lg: '0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.04)',
    xl: '0 20px 25px -5px rgb(15 23 42 / 0.08), 0 8px 10px -6px rgb(15 23 42 / 0.04)',
    glow: '0 0 20px -3px rgba(79, 70, 229, 0.15)',
  },
  transitions: {
    default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    fast: 'all 0.15s ease',
  },
} as const;

export type ThemeColors = typeof themeConfig.colors;

