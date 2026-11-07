import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "./Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We encountered an issue while loading this content. Please try again.",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white rounded-3xl border border-rose-200/80 p-8 sm:p-10
        text-center flex flex-col items-center justify-center max-w-md mx-auto
        shadow-xs ${className}
      `}
      role="alert"
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;

