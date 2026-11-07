/**
 * SmartPrep AI - Shared Animation Utilities & Motion Variants
 * Built for Framer Motion v12 with reduced-motion support.
 */

import { Variants } from "framer-motion";

// Standard UI transitions with strict Framer Motion v12 easing types
export const transitions = {
  spring: { type: "spring" as const, stiffness: 350, damping: 25 },
  gentle: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  fast: { duration: 0.2, ease: "easeOut" as const },
  reveal: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

// Fade In
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.gentle,
  },
};

// Fade In Up
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

// Fade In Down
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

// Stagger Container
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Scale In for Modals / Badges
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.gentle,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.fast,
  },
};

// Interactive Card Hover
export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 3px 0 rgb(15 23 42 / 0.06)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 20px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.04)",
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};
