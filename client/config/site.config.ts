/**
 * SmartPrep AI - Global Site Configuration
 */

export const siteConfig = {
  name: "SmartPrep AI",
  shortName: "SmartPrep",
  tagline: "High-Retention AI Learning Suite for +2 Science & Entrance Prep",
  description:
    "Transform your textbook PDF into structured day-by-day study schedules, instant revision notes, and adaptive entrance exam practice. Built for NEB +2 Science students.",
  url: "https://smartprepai-three.vercel.app",
  curriculumStandard: "NEB / +2 Science Syllabus",
  supportEmail: "smartprep.ai@gmail.com",
  supportPhone: "+977 9860123456", // placeholder verified in contact page
  location: "Dharan, Nepal",
  responseWindowPlaceholder: "Typically responds within 24 hours",
  navLinks: [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "30-Day Plans", href: "/#crash-plans" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  footerLinks: {
    navigation: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Community Forum", href: "/community" },
    ],
    studySuite: [
      { name: "Custom PDF Plan", href: "/dashboard" },
      { name: "30-Day Crash Plans", href: "/#crash-plans" },
      { name: "Practice MCQs", href: "/dashboard" },
      { name: "Full Mock Tests", href: "/dashboard" },
      { name: "AI Doubt Assistant", href: "/dashboard" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Honor Code", href: "#honor-code" },
    ],
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
} as const;

