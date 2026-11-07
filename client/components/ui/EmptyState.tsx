import React from "react";
import { FolderOpen } from "lucide-react";
import Button from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white rounded-3xl border border-dashed border-slate-200 p-8 sm:p-12
        text-center flex flex-col items-center justify-center max-w-md mx-auto
        ${className}
      `}
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mb-4">
        {icon || <FolderOpen className="w-7 h-7" />}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

