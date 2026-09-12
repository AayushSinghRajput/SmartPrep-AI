import { useState, useEffect, useRef } from "react";
import { FiVolume2, FiPause } from "react-icons/fi";
import Loader from "../ui/Loader";
import MCQViewer from "../mcq/MCQViewer";
import MarkdownContent from "./MarkdownContent";
import ImageLightbox from "./ImageLightbox";
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
}) {
  const [validImages, setValidImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    setValidImages(Array.isArray(subtopic?.images) ? subtopic.images : []);
    setActiveImageIndex(null);

    // Stop speech synthesis when subtopic changes
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [subtopic]);

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

  const handleVoiceToggle = () => {
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
        utterance.rate = 1;
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

  return (
    <div className="max-w-5xl mx-auto py-16 px-8 md:px-12 min-h-[70vh]">
      {/* Title */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          {subtopic?.title || "Select a subtopic"}
        </h1>
        <div className="mt-4 h-1 w-24 bg-indigo-600 rounded-full" />
      </div>

      {/* Content Container */}
      <div className="relative bg-white rounded-2xl shadow-lg border p-10 md:p-14 mb-14">
        {/* Voice Button */}
        {typeof subtopic?.content === "string" && (
          <button
            onClick={handleVoiceToggle}
            className="absolute top-6 right-6 p-3 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
            title={isSpeaking ? "Pause reading" : "Read content"}
          >
            {isSpeaking ? (
              <FiPause className="text-indigo-700 text-xl" />
            ) : (
              <FiVolume2 className="text-indigo-700 text-xl" />
            )}
          </button>
        )}

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
            <MarkdownContent content={subtopic.content} />

            {/* Image Grid */}
            {validImages.length > 0 && (
              <div className="mt-14">
                <h2 className="text-2xl font-bold mb-6">Related Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {validImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className="cursor-pointer rounded-xl overflow-hidden shadow-md border"
                    >
                      <img
                        src={img.url}
                        alt={`Diagram ${index + 1}`}
                        className="w-full h-60 object-cover hover:scale-105 transition-transform"
                        onError={() => handleImageError(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-500">No content available.</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious || loadingContent}
          className="px-7 py-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors font-medium text-slate-700"
        >
          ← Previous
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext || loadingContent}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors font-semibold shadow-md shadow-indigo-200"
        >
          Next →
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
