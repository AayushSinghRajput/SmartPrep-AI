import { useState, useEffect, useRef, useMemo } from "react";
import {
  FiVolume2,
  FiPause,
  FiClock,
  FiMaximize2,
  FiMinimize2,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
} from "react-icons/fi";
import Loader from "../ui/Loader";
import MCQViewer from "../mcq/MCQViewer";
import MarkdownContent from "./MarkdownContent";
import ImageLightbox from "./ImageLightbox";
import ThemeToggle from "../ui/ThemeToggle";
import { cleanTextForSpeech, cleanText } from "../../utils/cleanTextForSpeech";

export default function SubtopicViewer({
  loadingContent,
  subtopic,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  mode,
  pdfHash,
  day,
  actions,
  isZenMode = false,
  onToggleZenMode,
}) {
  const [validImages, setValidImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [fontSize, setFontSize] = useState("base"); // "sm" | "base" | "lg" | "xl"
  const [isMastered, setIsMastered] = useState(Boolean(subtopic?.completed));
  const utteranceRef = useRef(null);

  useEffect(() => {
    setValidImages(Array.isArray(subtopic?.images) ? subtopic.images : []);
    setActiveImageIndex(null);
    setIsMastered(Boolean(subtopic?.completed));

    // Stop speech synthesis when subtopic changes
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [subtopic]);

  // Estimated reading time in minutes
  const readingTime = useMemo(() => {
    if (typeof subtopic?.content !== "string") return null;
    const words = subtopic.content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 190));
  }, [subtopic?.content]);

  const sanitizedMCQs = Array.isArray(subtopic?.content)
    ? subtopic.content.map((mcq) => ({
        ...mcq,
        question: cleanText(mcq.question),
        options: Array.isArray(mcq.options)
          ? mcq.options.map(cleanText)
          : mcq.options,
      }))
    : [];

  const handleImageError = (index) => {
    setValidImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVoiceToggle = (rate = speechRate) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;

    if (synth.speaking && isSpeaking) {
      synth.pause();
      setIsSpeaking(false);
      return;
    }

    if (synth.paused && utteranceRef.current) {
      synth.resume();
      setIsSpeaking(true);
      return;
    }

    if (synth.paused && !utteranceRef.current) {
      synth.cancel();
    }

    if (typeof subtopic?.content === "string") {
      const text = cleanTextForSpeech(subtopic.content);
      synth.cancel();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1;

        utterance.onend = () => {
          utteranceRef.current = null;
          setIsSpeaking(false);
        };

        utterance.onerror = () => {
          utteranceRef.current = null;
          setIsSpeaking(false);
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
        setIsSpeaking(true);
      }, 0);
    }
  };

  const handleSpeechRateChange = (rate) => {
    setSpeechRate(rate);
    if (isSpeaking) {
      handleVoiceToggle(rate);
    }
  };

  const cycleFontSize = () => {
    const sequence = ["sm", "base", "lg", "xl"];
    const currentIndex = sequence.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % sequence.length;
    setFontSize(sequence[nextIndex]);
  };

  const toggleMastered = () => {
    setIsMastered(!isMastered);
  };

  return (
    <div className={`mx-auto py-8 sm:py-12 px-4 sm:px-8 transition-all duration-300 ${isZenMode ? "max-w-4xl" : "max-w-5xl"}`}>
      
      {/* Top Reading Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-[var(--bg-card)]/90 backdrop-blur-md rounded-2xl border border-[var(--border-primary)] shadow-xs">
        
        {/* Left: Metadata Pills */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--border-primary)]">
            <FiBookOpen className="w-3.5 h-3.5" />
            {mode === "mcq" ? "Daily Quiz Unit" : "Study Chapter"}
          </span>

          {readingTime && mode !== "mcq" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-card-muted)] border border-[var(--border-primary)]">
              <FiClock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              {readingTime} min read
            </span>
          )}
        </div>

        {/* Right: Reading Ergonomics Controls */}
        <div className="flex items-center gap-2">
          
          {/* Night Reader Theme Toggle (Light / Dark / Sepia) */}
          <ThemeToggle variant="compact" />

          {/* Font Scale Button */}
          {mode !== "mcq" && (
            <button
              onClick={cycleFontSize}
              className="px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] bg-[var(--bg-card-muted)] hover:bg-[var(--accent-light)] border border-[var(--border-primary)] rounded-lg transition-colors"
              title="Change reading font size"
            >
              Font: <span className="uppercase font-bold text-[var(--accent-primary)]">{fontSize}</span>
            </button>
          )}

          {/* Voice Speech Speed Options */}
          {typeof subtopic?.content === "string" && mode !== "mcq" && (
            <div className="flex items-center gap-1 bg-[var(--bg-card-muted)] border border-[var(--border-primary)] p-0.5 rounded-lg">
              {[0.8, 1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSpeechRateChange(rate)}
                  className={`px-1.5 py-0.5 text-[11px] font-semibold rounded ${
                    speechRate === rate
                      ? "bg-indigo-600 text-white"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          )}

          {/* TTS Toggle */}
          {typeof subtopic?.content === "string" && mode !== "mcq" && (
            <button
              onClick={() => handleVoiceToggle(speechRate)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all ${
                isSpeaking
                  ? "bg-indigo-600 text-white animate-pulse"
                  : "bg-[var(--accent-light)] text-[var(--accent-primary)] hover:opacity-90 border border-[var(--border-primary)]"
              }`}
              title={isSpeaking ? "Pause Audio Narration" : "Listen to Audio Narration"}
            >
              {isSpeaking ? (
                <>
                  <FiPause className="w-3.5 h-3.5" />
                  <span>Listening</span>
                </>
              ) : (
                <>
                  <FiVolume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </>
              )}
            </button>
          )}

          {/* Zen Mode Toggle */}
          {onToggleZenMode && (
            <button
              onClick={onToggleZenMode}
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isZenMode
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-light)] border-[var(--border-primary)]"
              }`}
              title={isZenMode ? "Exit Zen Mode" : "Distraction-Free Zen Mode"}
            >
              {isZenMode ? <FiMinimize2 className="w-4 h-4" /> : <FiMaximize2 className="w-4 h-4" />}
            </button>
          )}

        </div>
      </div>

      {/* Main Subtopic Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          {subtopic?.title || "Select a subtopic from curriculum"}
        </h1>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1 w-20 bg-indigo-600 rounded-full" />
          <div className="h-1 w-4 bg-indigo-300 rounded-full" />
        </div>
      </div>

      {/* Content Container Bento Card */}
      <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-primary)] shadow-xs p-6 sm:p-10 md:p-12 mb-10 transition-all">
        {loadingContent ? (
          <Loader />
        ) : mode === "mcq" ? (
          <MCQViewer
            mcqs={sanitizedMCQs}
            pdfHash={pdfHash}
            day={day}
            onPerformanceUpdate={actions.updateDayPerformance}
          />
        ) : typeof subtopic?.content === "string" ? (
          <>
            <MarkdownContent content={subtopic.content} fontSize={fontSize} />

            {/* Diagram / Image Grid */}
            {validImages.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>Scientific Figures & Diagrams</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {validImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className="cursor-pointer rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-indigo-300 transition-all group bg-slate-50"
                    >
                      <img
                        src={img.url}
                        alt={`Figure ${index + 1}`}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mastery Celebration Pill */}
            <div className="mt-10 pt-6 border-t border-[var(--border-primary)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                Marking concepts helps the AI optimize your spaced review schedule.
              </span>
              <button
                onClick={toggleMastered}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isMastered
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                    : "bg-[var(--bg-card-muted)] text-[var(--text-secondary)] hover:bg-[var(--accent-light)] border border-[var(--border-primary)]"
                }`}
              >
                <FiCheckCircle className={isMastered ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--text-muted)]"} />
                {isMastered ? "Topic Mastered" : "Mark as Mastered"}
              </button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-card-muted)] flex items-center justify-center mx-auto mb-3 text-[var(--text-muted)]">
              <FiBookOpen size={24} />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">Select a Unit or Topic</h3>
            <p className="text-xs text-[var(--text-muted)]">Choose a chapter from the curriculum sidebar to load study material.</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious || loadingContent}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold shadow-xs"
        >
          <FiChevronLeft /> Previous
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext || loadingContent}
          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold shadow-sm shadow-indigo-200"
        >
          Next <FiChevronRight />
        </button>
      </div>

      {/* Fullscreen Lightbox */}
      <ImageLightbox
        images={validImages}
        activeImageIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onPrev={() => setActiveImageIndex((i) => Math.max(0, i - 1))}
        onNext={() => setActiveImageIndex((i) => Math.min(validImages.length - 1, i + 1))}
      />
    </div>
  );
}

