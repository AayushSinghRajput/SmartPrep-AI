"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import SamplePlansSection from "../components/home/SamplePlansSection";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      <SamplePlansSection />
    </div>
  );
}