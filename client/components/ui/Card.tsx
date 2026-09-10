"use client";

import Image from "next/image";
import { FiEdit, FiTrash2, FiBookOpen } from "react-icons/fi";
import { useState } from "react";
import { updateBookImage, deletePdfAndData } from "../../api/pdf";
import CylindricalProgress from "./CylindricalProgress";
import DayPerformaceBar from "./DayPerformanceBar";

import physicsImg from "../../assets/images/physics.jpg";
import chemistryImg from "../../assets/images/chemistry.webp";
import biologyImg from "../../assets/images/biology.jpg";
import englishImg from "../../assets/images/English.jpg";
import aiImg from "../../assets/images/ai.jpeg";

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

export default function StudyBookCard({
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
  const studyProgress = book?.study_progress ?? 0;
  const pdf_hash = book?.pdf_hash ?? "";

  const isLocalImage = currentImage.startsWith("/");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();

    const file = event.target.files?.[0];
    if (!file || !pdf_hash) return;

    try {
      setUploading(true);
      const result = await updateBookImage(pdf_hash, file);

      if (result?.image_url) {
        setCurrentImage(result.image_url);
      } else {
        alert("Failed to update image");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!pdf_hash) return;

    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      await deletePdfAndData(pdf_hash);
      onDelete?.(pdf_hash);
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    }
  };

  // ================= PERFORMANCE VARIANT =================
  if (variant === "performance") {
    const size = 120;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - performance_progress / 100);

    return (
      <div className="flex flex-col items-center gap-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all">
        <div className="relative w-[120px] h-[120px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden border border-slate-100 shadow-inner">
              <Image
                src={currentImage}
                alt={name}
                fill
                className="object-cover"
                unoptimized={isLocalImage}
              />
            </div>
          </div>

          <svg
            width={size}
            height={size}
            className="absolute top-0 left-0 -rotate-90"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#4F46E5"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
        </div>

        <div className="text-center">
          <h3 className="text-base font-bold text-slate-900 line-clamp-1">{name}</h3>
          <span className="text-xs text-indigo-600 font-semibold">{performance_progress}% Score</span>
        </div>
        <DayPerformaceBar data={book?.day_wise_scores || []} />
      </div>
    );
  }

  // ================= DASHBOARD VARIANT =================
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between cursor-pointer group relative"
    >
      <div>
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
          <Image
            src={currentImage}
            alt={name}
            fill
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
                  className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-slate-700 shadow-sm border border-slate-200/80 hover:bg-indigo-600 hover:text-white transition-all"
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
                  className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-slate-700 shadow-sm border border-slate-200/80 hover:bg-rose-600 hover:text-white transition-all"
                  onClick={handleDelete}
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="pt-3 px-1">
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
            <span className="text-indigo-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Open <FiBookOpen className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
