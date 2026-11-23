"use client";

import { useState, useEffect } from "react";
import { FiArrowLeft, FiMaximize2, FiMinimize2, FiBookOpen } from "react-icons/fi";
import Sidebar from "../../components/Service/Sidebar";
import SubtopicViewer from "../../components/Service/SubtopicViewer";
import WelcomeState from "../../components/Service/WelcomeState";
import { useServiceLogic } from "../../hooks/useServiceLogic";
import { getWelcomeText } from "../../constants/getWelcomeText";
import ChatWidget from "../../components/chat/ChatWidget";

export default function Service({
  planData,
  onScheduleUpdate,
  activeTab = "dashboard",
  onBack,
}) {
  const [isZenMode, setIsZenMode] = useState(false);
  const [currentMode, setCurrentMode] = useState(() => {
    if (activeTab === "mcq" || activeTab === "notes") return activeTab;
    if (activeTab === "performance") return "mcq";
    return "study";
  });

  useEffect(() => {
    if (activeTab === "mcq" || activeTab === "notes") {
      setCurrentMode(activeTab);
    } else if (activeTab === "performance") {
      setCurrentMode("mcq");
    } else {
      setCurrentMode("study");
    }
  }, [activeTab]);

  const { state, actions } = useServiceLogic(planData, currentMode);

  const { welcomeHeading, welcomeDescription } = getWelcomeText({
    mode: currentMode,
    state,
  });

  useEffect(() => {
    if (state.localSchedule && state.localSchedule.length > 0) {
      onScheduleUpdate?.(state.localSchedule);
    }
  }, [state.localSchedule, onScheduleUpdate]);

  if (!planData || !planData.schedule || planData.schedule.length === 0) {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-slate-50 items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 text-3xl">
          📚
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {currentMode === "study"
            ? "No Schedule Available"
            : `No ${currentMode.toUpperCase()} data available`}
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          Upload a textbook PDF or syllabus to generate your personalized AI study schedule.
        </p>
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        )}
      </div>
    );
  }

  const subjectName = state?.metaData?.subject || planData?.book_name || "Study Workspace";

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-[var(--bg-page)] text-[var(--text-primary)] overflow-hidden">
      {/* Top Workspace Breadcrumb & Header Bar */}
      <header className="h-12 border-b border-[var(--border-primary)] bg-[var(--bg-card)] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)] rounded-lg transition-colors"
              title="Return to Study Books"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <div className="h-4 w-px bg-[var(--border-primary)]" />

          {/* Breadcrumb trail */}
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] truncate">
            <span className="font-semibold text-[var(--text-primary)] truncate">{subjectName}</span>
            {state.selectedDay && (
              <>
                <span className="text-[var(--text-muted)] opacity-60">/</span>
                <span className="text-[var(--accent-primary)] font-medium">Day {state.selectedDay}</span>
              </>
            )}
            {state.selectedSubtopic?.title && (
              <>
                <span className="text-[var(--text-muted)] opacity-60">/</span>
                <span className="truncate max-w-[200px] text-[var(--text-secondary)]">
                  {state.selectedSubtopic.title}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right workspace quick toggles */}
        {/* Right workspace quick toggles */}
        <div className="flex items-center gap-2">
          {/* Workspace Mode Switcher */}
          <div className="flex items-center bg-[var(--bg-card-muted)] border border-[var(--border-primary)] p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => setCurrentMode("study")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                currentMode === "study"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Study Notes
            </button>
            <button
              type="button"
              onClick={() => setCurrentMode("mcq")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                currentMode === "mcq"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Daily Quiz
            </button>
            <button
              type="button"
              onClick={() => setCurrentMode("notes")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                currentMode === "notes"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Smart Notes
            </button>
          </div>

          <button
            onClick={() => setIsZenMode(!isZenMode)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
              isZenMode
                ? "bg-indigo-600 text-white border-indigo-600"
                : "text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)] border-[var(--border-primary)]"
            }`}
            title={isZenMode ? "Exit Zen Full Screen" : "Distraction-Free Zen Mode"}
          >
            {isZenMode ? (
              <>
                <FiMinimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Zen</span>
              </>
            ) : (
              <>
                <FiMaximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Zen Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Study Workspace Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Curriculum Sidebar */}
        <Sidebar
          localSchedule={state.localSchedule}
          expandedDays={state.expandedDays}
          expandedTopics={state.expandedTopics}
          isDayExpanded={state.isDayExpanded}
          isTopicExpanded={state.isTopicExpanded}
          selectedSubtopic={state.selectedSubtopic}
          loadingContent={state.loadingContent}
          metaData={state.metaData}
          actions={actions}
          mode={currentMode}
          selectedDay={state.selectedDay}
          isCollapsed={isZenMode}
          onToggleCollapse={() => setIsZenMode(!isZenMode)}
        />

        {/* Content Viewer */}
        <main className={`flex-1 h-full overflow-y-auto bg-[var(--bg-page)] text-[var(--text-primary)] relative transition-all duration-300 ${isZenMode ? "w-full" : ""}`}>
          {state.selectedSubtopic ? (
            (() => {
              const hasPreviousDay = state.selectedDay && state.selectedDay > 1;
              const hasNextDay =
                state.selectedDay &&
                state.selectedDay < state.localSchedule.length;

              return (
                <SubtopicViewer
                  subtopic={state.selectedSubtopic}
                  loadingContent={state.loadingContent}
                  hasPrevious={
                    currentMode === "notes" || currentMode === "mcq"
                      ? hasPreviousDay
                      : state.hasPrevious
                  }
                  hasNext={
                    currentMode === "notes" || currentMode === "mcq"
                      ? hasNextDay
                      : state.hasNext
                  }
                  onPrevious={
                    currentMode === "notes" || currentMode === "mcq"
                      ? actions.goToPreviousDay
                      : () => actions.goToSubtopic("previous")
                  }
                  onNext={
                    currentMode === "notes" || currentMode === "mcq"
                      ? actions.goToNextDay
                      : () => actions.goToSubtopic("next")
                  }
                  mode={currentMode}
                  pdfHash={state.metaData.fileHash}
                  day={state.selectedDay}
                  actions={actions}
                  isZenMode={isZenMode}
                  onToggleZenMode={() => setIsZenMode(!isZenMode)}
                />
              );
            })()
          ) : (
            <WelcomeState
              heading={welcomeHeading}
              description={welcomeDescription}
            />
          )}
        </main>

        {/* Floating Chat Widget */}
        {currentMode === "study" && !isZenMode && (
          <ChatWidget
            metaData={state.metaData}
            selectedSubtopic={state.selectedSubtopic}
          />
        )}
      </div>
    </div>
  );
}
