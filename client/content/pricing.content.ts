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
  badge: string;
  heading: string;
  subtitle: string;
  disclaimer: string;
  tiers: PricingTier[];
} = {
  badge: "Simple, Honest Plans",
  heading: "Start Free Today, Upgrade Later",
  subtitle:
    "Core study tools are available for free. Premium features and intensive mock series are coming soon with special founding student rates.",
  disclaimer:
    "Feature allocations shown are current pre-launch estimates and subject to enhancement as we roll out full mock tests.",
  tiers: [
    {
      id: "free",
      name: "Free Tier",
      badge: "Free to Start",
      priceDisplay: "रू 0",
      billingPeriod: "Forever free access",
      description: "Everything a student needs to generate daily plans and study consistently.",
      features: [
        { text: "Textbook PDF study plan generation", included: true },
        { text: "Access to all 5 standard 30-day crash plans", included: true },
        { text: "Daily topic-wise MCQ practice quizzes", included: true },
        { text: "Automatic chapter notes generation", included: true },
        { text: "Community doubt discussions access", included: true },
        { text: "Basic study milestone tracking", included: true },
        { text: "Full 2-hour IOE / CEE mock test series", included: false, note: "Coming in Premium" },
        { text: "In-depth weak-topic diagnostic analytics", included: false, note: "Coming in Premium" },
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
      billingPeriod: "Waitlist now for launch discount",
      description: "Intensive exam simulations and AI performance analytics for dedicated entrance aspirants.",
      features: [
        { text: "Unlimited textbook PDF uploads & custom plans", included: true },
        { text: "Priority AI doubt resolution & voice interaction", included: true },
        { text: "Full timed entrance mock tests (IOE Engineering & CEE Medical)", included: true },
        { text: "Negative marking simulation & detailed rank predictor", included: true },
        { text: "Personalized weak-area diagnostic feedback", included: true },
        { text: "Exportable revision flashcards & formula sheets", included: true },
        { text: "Priority access to newly released subjects", included: true },
        { text: "Founding student lifetime pricing guarantee", included: true },
      ],
      ctaText: "Join Premium Waitlist",
      ctaAction: "waitlist",
      isPopular: true,
    },
  ],
};

