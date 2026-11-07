import React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  size = "md",
  className = "",
}) => {
  const spinnerSizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center min-h-[200px] ${className}`}
      role="status"
    >
      <Loader2 className={`${spinnerSizes[size]} animate-spin text-indigo-600 mb-3`} />
      <p className="text-xs sm:text-sm font-medium text-slate-500 animate-pulse">
        {message}
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingState;

