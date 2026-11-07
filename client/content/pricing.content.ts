/**
 * SmartPrep AI - Pricing and Tier Configuration
 * Transparent pre-launch tiers with Founding Member waitlist.
 */

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  priceDisplay: string;
  billingPeriod: string;
  description: string;
  features: {
    text: string;
    included: boolean;
    note?: string;
  }[];
  ctaText: string;
  ctaAction: "signup" | "waitlist";
  isPopular?: boolean;
}

export const pricingContent: {
  heading: string;
  subtitle: string;
  tiers: PricingTier[];
} = {
  heading: "Start Free Today, Upgrade Later",
  subtitle:
    "Core study tools and all 30-day crash plans are 100% free. Join the waitlist for timed mock simulations and advanced diagnostic analytics.",
  tiers: [
    {
      id: "free",
      name: "Free Tier",
      badge: "Forever Free",
      priceDisplay: "रू 0",
      billingPeriod: "Free for all students in Nepal",
      description: "Everything you need to turn textbook PDFs into daily schedules and practice consistently.",
      features: [
        { text: "Textbook PDF study plan generation", included: true },
        { text: "Access to all 5 standard 30-day crash plans", included: true },
        { text: "Daily topic-wise MCQ practice quizzes", included: true },
        { text: "Automatic chapter notes & formula summaries", included: true },
        { text: "Community student discussions & doubt sharing", included: true },
        { text: "Daily study streaks & milestone tracking", included: true },
        { text: "Seamless access across phone, tablet and laptop", included: true },
      ],
      ctaText: "Get Started Free",
      ctaAction: "signup",
      isPopular: false,
    },
    {
      id: "premium",
      name: "Premium Prep",
      badge: "Founding Member Offer",
      priceDisplay: "Coming Soon",
      billingPeriod: "Lock in founding student discount",
      description: "Intensive exam simulations, negative marking drills, and AI diagnostics for serious entrance candidates.",
      features: [
        { text: "Full 2-hour IOE / CEE entrance mock test series", included: true, note: "Full Exam Format" },
        { text: "In-depth weak-topic diagnostic analytics", included: true, note: "AI Diagnostic" },
        { text: "Unlimited textbook PDF uploads & custom study plans", included: true },
        { text: "Priority AI doubt resolution with textbook citations", included: true },
        { text: "Negative marking simulation & rank predictor", included: true },
        { text: "Exportable revision flashcards & formula sheets", included: true },
        { text: "Founding student lifetime pricing guarantee", included: true },
      ],
      ctaText: "Join Premium Waitlist",
      ctaAction: "waitlist",
      isPopular: true,
    },
  ],
};
