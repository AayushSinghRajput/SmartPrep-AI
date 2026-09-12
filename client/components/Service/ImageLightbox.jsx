import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageLightbox({
  images,
  activeImageIndex,
  onClose,
  onPrev,
  onNext,
}) {
  if (activeImageIndex === null || !images[activeImageIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl p-2 hover:bg-white/10 rounded-full transition-all"
        aria-label="Close fullscreen"
      >
        <FiX />
      </button>

      {activeImageIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 text-white text-4xl p-2 hover:bg-white/10 rounded-full transition-all"
          aria-label="Previous image"
        >
          <FiChevronLeft />
        </button>
      )}

      {activeImageIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 text-white text-4xl p-2 hover:bg-white/10 rounded-full transition-all"
          aria-label="Next image"
        >
          <FiChevronRight />
        </button>
      )}

      <img
        src={images[activeImageIndex].url}
        alt="Fullscreen diagram"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] max-w-[92vw] rounded-2xl shadow-2xl object-contain"
      />
    </div>
  );
}
