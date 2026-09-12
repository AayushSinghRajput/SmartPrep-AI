"use client";

import PredefinedStudyPlan from "../predefined_plan/PredefinedStudyPlan";

export default function SamplePlansSection() {
  return (
    <section id="topviewbooks" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PredefinedStudyPlan />
      </div>
    </section>
  );
}
