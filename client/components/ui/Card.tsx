"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { FiEdit, FiTrash2, FiBookOpen } from "react-icons/fi";
import { useState } from "react";
import { updateBookImage, deletePdfAndData } from "../../services/pdf";
import CylindricalProgress from "./CylindricalProgress";
import DayPerformaceBar from "./DayPerformanceBar";

import physicsImg from "../../assets/images/physics.jpg";
import chemistryImg from "../../assets/images/chemistry.webp";
import biologyImg from "../../assets/images/biology.jpg";
import englishImg from "../../assets/images/English.jpg";
import aiImg from "../../assets/images/ai.jpeg";

// ============================================================================
// Generic Design System Card Primitives
// ============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "muted" | "flat" | "elevated" | "interactive";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-white border border-slate-200/80 shadow-xs rounded-2xl",
      muted:
        "bg-slate-50 border border-slate-200/80 rounded-2xl",
      flat:
        "bg-white border border-slate-200/70 rounded-2xl",
      elevated:
        "bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 rounded-2xl",
      interactive:
        "bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 rounded-2xl cursor-pointer group",
    };

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`p-5 sm:p-6 pb-3 ${className}`} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-lg font-bold text-slate-900 tracking-tight leading-snug ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-slate-500 mt-1 leading-relaxed ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`p-5 sm:p-6 pt-0 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4 ${className}`}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// ============================================================================
// Existing StudyBookCard (Maintained for StudyBooksGrid backward-compatibility)
// ============================================================================

interface DayWiseScore {
  day: number;
  score: number;
  total_questions: number;
}

interface StudyBookCardProps {
  book?: {
    id?: number;
    pdf_hash?: string;
    name?: string;
    image?: string;
    performance_progress?: number;
    study_progress?: number;
    day_wise_scores?: DayWiseScore[];
  };
  variant?: "dashboard" | "performance";
  onClick?: () => void;
  allowImageEdit?: boolean;
  onDelete?: (pdf_hash: string) => void;
}

export function StudyBookCard({
  book,
  variant = "dashboard",
  onClick,
  allowImageEdit = true,
  onDelete,
}: StudyBookCardProps) {
  const getSmartFallbackImage = (bookName: string) => {
    const lower = (bookName || "").toLowerCase();
    if (lower.includes("physic")) return physicsImg;
    if (lower.includes("chem")) return chemistryImg;
    if (lower.includes("bio")) return biologyImg;
    if (lower.includes("eng")) return englishImg;
    return aiImg;
  };

  const name = book?.name ?? "Untitled Book";
  const defaultImage = book?.image || getSmartFallbackImage(name);

  const [currentImage, setCurrentImage] = useState<any>(defaultImage);
  const [uploading, setUploading] = useState(false);

  const performance_progress = book?.performance_progress ?? 0;
  const study_progress = book?.study_progress ?? 0;
  const pdf_hash = book?.pdf_hash ?? "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pdf_hash) return;

    const previewUrl = URL.createObjectURL(file);
    setCurrentImage(previewUrl);
    setUploading(true);

    try {
      const res = await updateBookImage(pdf_hash, file);
      if (res?.image_url) {
        setCurrentImage(res.image_url);
      }
    } catch (err) {
      console.error("Failed to update image", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!pdf_hash) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      await deletePdfAndData(pdf_hash);
      if (onDelete) onDelete(pdf_hash);
    } catch (err) {
      console.error("Failed to delete book", err);
      alert("Failed to delete book. Please try again.");
    }
  };

  const isLocalImage =
    typeof currentImage === "object" ||
    (typeof currentImage === "string" && currentImage.startsWith("/"));

  const studyProgress = Math.min(Math.max(study_progress, 0), 100);

  if (variant === "performance") {
    const scores = book?.day_wise_scores || [];
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              <Image
                src={currentImage}
                alt={name}
                fill
                className="object-cover"
                unoptimized={isLocalImage}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-slate-900 truncate">
                {name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {scores.length} Days Recorded
              </p>
            </div>
          </div>
          <DayPerformaceBar
            data={scores}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 mb-3">
          <Image
            src={currentImage}
            alt={name}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={isLocalImage}
          />

          {allowImageEdit && (
            <>
              <input
                type="file"
                id={`file-input-${pdf_hash}`}
                accept="image/*"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
                onChange={handleFileChange}
              />

              <div className="absolute top-2 right-2 flex gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  title="Change book image"
                  className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-slate-700 shadow-xs border border-slate-200/80 hover:bg-indigo-600 hover:text-white transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    document.getElementById(`file-input-${pdf_hash}`)?.click();
                  }}
                >
                  {uploading ? "..." : <FiEdit size={13} />}
                </button>

                <button
                  type="button"
                  title="Delete book"
                  className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-slate-700 shadow-xs border border-slate-200/80 hover:bg-rose-600 hover:text-white transition-all"
                  onClick={handleDelete}
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="pt-1 px-1">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </div>
      </div>

      <div className="pt-3 px-1">
        {studyProgress > 0 ? (
          <CylindricalProgress value={studyProgress} />
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Ready to start</span>
            <span className="text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
              Open <FiBookOpen className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyBookCard;
