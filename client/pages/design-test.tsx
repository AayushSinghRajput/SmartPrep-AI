"use client";

import React, { useState } from "react";
import Head from "next/head";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiMail,
  FiBookOpen,
  FiArrowRight,
  FiSend,
  FiLayers,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import Modal from "@/components/ui/Modal";
import showToast from "@/components/ui/Toast";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import { themeConfig } from "@/config/theme.config";

export default function DesignTestPage() {
  const [activeTabPill, setActiveTabPill] = useState("tab-1");
  const [activeTabUnderline, setActiveTabUnderline] = useState("tab-1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("physics");

  const sampleTabs = [
    { id: "tab-1", label: "Study Schedule", icon: <FiCalendar />, badge: "30 Days" },
    { id: "tab-2", label: "Adaptive Quizzes", icon: <FiCheckCircle />, badge: 12 },
    { id: "tab-3", label: "Revision Notes", icon: <FiBookOpen /> },
    { id: "tab-4", label: "Analytics", icon: <FiLayers /> },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
      <Head>
        <title>Design System Gallery — SmartPrep AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Phase 1 Component Verification Gallery
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SmartPrep AI Unified Light Design System
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
            This temporary route demonstrates all shared UI primitives, light-theme design tokens, states, and accessibility affordances.
          </p>
        </div>

        {/* 1. COLOR TOKENS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">1. Color Tokens & Surface Swatches</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-xs">
              <span className="text-xs font-mono block opacity-80">Primary 600</span>
              <span className="text-sm font-bold">#4F46E5</span>
            </div>
            <div className="p-3 bg-indigo-700 text-white rounded-xl shadow-xs">
              <span className="text-xs font-mono block opacity-80">Primary 700</span>
              <span className="text-sm font-bold">#4338CA</span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl">
              <span className="text-xs font-mono block opacity-80">Primary 50</span>
              <span className="text-sm font-bold">#EEF2FF</span>
            </div>
            <div className="p-3 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-xs">
              <span className="text-xs font-mono block opacity-80">Accent 500</span>
              <span className="text-sm">#F59E0B</span>
            </div>
            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xs">
              <span className="text-xs font-mono block opacity-80">Neutral 900</span>
              <span className="text-sm font-bold">#0F172A</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 text-slate-800 rounded-xl shadow-xs">
              <span className="text-xs font-mono block opacity-80">Page Bg</span>
              <span className="text-sm font-bold">#F8FAFC</span>
            </div>
          </div>
        </section>

        {/* 2. BUTTONS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">2. Buttons (All Variants, Sizes & States)</h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">Variants</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="accent">Accent Amber</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">Icons & States</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button leftIcon={<FiBookOpen />}>With Left Icon</Button>
                <Button rightIcon={<FiArrowRight />}>With Right Icon</Button>
                <Button isLoading>Submitting State</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FORM INPUTS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">3. Form Primitives (Input, Textarea, Select)</h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Standard Input"
              placeholder="Enter your full name"
              helperText="Helper message explaining required format."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Input
              label="Input with Left Icon"
              placeholder="Search chapters or topics"
              leftIcon={<FiSearch className="w-4 h-4" />}
            />

            <Input
              label="Validation Error State"
              placeholder="student@example.com"
              leftIcon={<FiMail className="w-4 h-4" />}
              error="Please enter a valid email address."
              defaultValue="invalid-email@"
            />

            <Select
              label="Select Dropdown"
              options={[
                { value: "physics", label: "Physics (NEB Syllabus)" },
                { value: "chemistry", label: "Chemistry (NEB Syllabus)" },
                { value: "math", label: "Mathematics (NEB Syllabus)" },
                { value: "biology", label: "Biology (NEB Syllabus)" },
                { value: "english", label: "English (NEB Syllabus)" },
              ]}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              helperText="Choose target subject for schedule generation."
            />

            <div className="md:col-span-2">
              <Textarea
                label="Textarea with Character Counter"
                placeholder="Ask an entrance question or write revision notes..."
                maxLength={300}
                showCharCount
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                helperText="Markdown and LaTeX notation supported."
              />
            </div>
          </div>
        </section>

        {/* 4. BADGES & PILLS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">4. Badges & Status Indicators</h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap gap-3 items-center">
            <Badge variant="primary" dot>Primary Active</Badge>
            <Badge variant="secondary">Secondary Neutral</Badge>
            <Badge variant="accent">30-Day Plan</Badge>
            <Badge variant="success" dot>Completed 100%</Badge>
            <Badge variant="warning" dot>In Progress</Badge>
            <Badge variant="error" dot>Review Mistakes</Badge>
            <Badge variant="outline">NEB +2 Science</Badge>
          </div>
        </section>

        {/* 5. TABS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">5. Navigation Tabs (Pill & Underline)</h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">Pill Tabs</h3>
              <Tabs
                tabs={sampleTabs}
                activeTab={activeTabPill}
                onChange={setActiveTabPill}
                variant="pill"
              />
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">Underline Tabs</h3>
              <Tabs
                tabs={sampleTabs}
                activeTab={activeTabUnderline}
                onChange={setActiveTabUnderline}
                variant="underline"
              />
            </div>
          </div>
        </section>

        {/* 6. CARDS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">6. Card Primitives</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <Badge variant="primary">Default Card</Badge>
                <CardTitle className="mt-2">Core Foundation</CardTitle>
                <CardDescription>Clean light card with subtle border and crisp elevation.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Demonstrates consistent spacing, hierarchy, and typography across all viewports.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-slate-400">Step 1 of 4</span>
                <Button size="sm" variant="ghost">Learn More</Button>
              </CardFooter>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <Badge variant="accent">Interactive Card</Badge>
                <CardTitle className="mt-2">Hover Lift Effect</CardTitle>
                <CardDescription>Hover over this card to preview the subtle elevation transition.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Used for 30-day crash plan cards, feature bentos, and discussion threads.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                  Explore <FiArrowRight />
                </span>
              </CardFooter>
            </Card>

            <Card variant="muted">
              <CardHeader>
                <Badge variant="secondary">Muted Card</Badge>
                <CardTitle className="mt-2">Subtle Container</CardTitle>
                <CardDescription>Subtle off-white background for secondary or contextual panels.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ideal for syllabus continuation indicators and quote sidebars.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-slate-400">Read-only state</span>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 7. TOASTS & MODAL */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">7. Interactive Overlays & Feedback</h2>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap gap-4 items-center">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Accessible Modal
            </Button>
            <Button
              variant="outline"
              onClick={() => showToast.success("Study plan generated successfully!")}
            >
              Trigger Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => showToast.error("Failed to connect to study server.")}
            >
              Trigger Error Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => showToast.info("Free tier includes all 5 crash plans.")}
            >
              Trigger Info Toast
            </Button>
          </div>
        </section>

        {/* 8. LOADING, EMPTY & ERROR STATES */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">8. Feedback & State Handlers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Skeleton Loaders</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton circle className="w-10 h-10" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
              </div>
            </div>

            <EmptyState
              title="No Study Books Yet"
              description="Upload your textbook PDF to generate your first day-by-day plan."
              actionLabel="Upload PDF"
              onAction={() => showToast.info("Upload modal triggered.")}
            />

            <ErrorState
              title="Could Not Load Schedule"
              message="Network timeout while communicating with the study engine."
              onRetry={() => showToast.info("Retrying fetch...")}
            />
          </div>
        </section>

        {/* MODAL INSTANCE */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Custom Study Plan Configuration"
          description="Enter your target examination and duration to generate a personalized day-by-day roadmap."
        >
          <div className="space-y-4 pt-2">
            <Input label="Book / Subject Name" placeholder="e.g. Physics Grade 12" defaultValue="Physics" />
            <Input label="Number of Preparation Days" type="number" defaultValue="30" />
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false);
                  showToast.success("Study plan schedule created!");
                }}
              >
                Generate Plan
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

