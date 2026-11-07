"use client";

import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import HeroSection from "../components/home/HeroSection";
import ProofStrip from "../components/home/ProofStrip";
import HowItWorksSection from "../components/home/HowItWorksSection";
import CustomPlanDemo from "../components/home/CustomPlanDemo";
import CrashPlansSection from "../components/home/CrashPlansSection";
import FeaturesBento from "../components/home/FeaturesBento";
import WhyDifferent from "../components/home/WhyDifferent";
import CommunityPreview from "../components/home/CommunityPreview";
import PricingSection from "../components/home/PricingSection";
import EarlyAccessSection from "../components/home/EarlyAccessSection";
import FaqSection from "../components/home/FaqSection";
import FinalCtaSection from "../components/home/FinalCtaSection";
import StudyPlanModal from "../components/predefined_plan/StudyPlanModal";
import { getGlobalPlan } from "../services/predefined";
import { showToast } from "../components/ui/Toast";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  // State for 30-Day Plan Modal Preview
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  const handleSelectPlan = async (subject) => {
    if (planLoading) return;

    setPlanLoading(true);
    try {
      const data = await getGlobalPlan(subject);
      if (data && data.schedule && data.schedule.length > 0) {
        setSelectedPlan(data);
        setIsPlanModalOpen(true);
      } else {
        setSelectedPlan({ subject, schedule: [] });
        setIsPlanModalOpen(true);
      }
    } catch (err) {
      console.warn("Could not fetch remote plan:", err);
      setSelectedPlan({ subject, schedule: [] });
      setIsPlanModalOpen(true);
    } finally {
      setPlanLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SmartPrep AI — Day-by-Day Study Plans for NEB +2 Science</title>
        <meta
          name="description"
          content="Transform any textbook PDF into a day-by-day study schedule, instant revision notes, and adaptive entrance quizzes for NEB Grade 12 Science students in Nepal."
        />
        <meta name="keywords" content="NEB, +2 Science, IOE Entrance, CEE Medical, Study Plan, Nepal Entrance Preparation" />
        <link rel="canonical" href="https://smartprepai-three.vercel.app/" />
        {/* Open Graph */}
        <meta property="og:title" content="SmartPrep AI — Day-by-Day Study Plans for NEB +2 Science" />
        <meta property="og:description" content="Turn any textbook PDF into a day-by-day study plan with instant notes and quizzes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartprepai-three.vercel.app/" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SmartPrep AI — High-Retention +2 Science Prep" />
        <meta name="twitter:description" content="AI-powered study schedules and entrance examination practice." />
      </Head>

      <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
        {/* 3.1 Hero Section with 3D Scene */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* 3.2 Product Proof Strip */}
        <ProofStrip />

        {/* 3.3 How It Works (4 Steps) */}
        <HowItWorksSection />

        {/* 3.4 Custom Study Plan Interactive Demo */}
        <CustomPlanDemo onTryWithPdf={handleGetStarted} />

        {/* 3.5 Thirty-Day Crash Plans & Master Roadmap */}
        <CrashPlansSection onSelectPlan={handleSelectPlan} />

        {/* 3.6 Six-Card Bento Features Grid */}
        <FeaturesBento />

        {/* 3.7 Why SmartPrep AI Is Different (Textbook Grounding) */}
        <WhyDifferent />

        {/* 3.8 Student Community Discussion Preview */}
        <CommunityPreview />

        {/* 3.9 Honest Pre-Launch Pricing */}
        <PricingSection />

        {/* 3.10 Early Access */}
        <EarlyAccessSection />

        {/* 3.11 Accessible FAQ Accordion */}
        <FaqSection />

        {/* 3.12 Final CTA Banner */}
        <FinalCtaSection onGetStarted={handleGetStarted} />

        {/* 30-Day Plan Detail Modal */}
        <StudyPlanModal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          selectedPlan={selectedPlan}
        />
      </div>
    </>
  );
}
