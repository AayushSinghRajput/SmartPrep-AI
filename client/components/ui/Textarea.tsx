import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      showCharCount = false,
      maxLength,
      value,
      className = "",
      id,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </label>
          )}

          {showCharCount && maxLength && (
            <span className="text-xs text-slate-400">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            className={`
              w-full rounded-xl text-sm transition-all duration-150 outline-none
              bg-slate-50 border text-slate-900 placeholder:text-slate-400
              focus:bg-white focus:ring-2 focus:ring-offset-0 p-3.5
              ${
                error
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/20"
              }
              ${disabled ? "opacity-60 cursor-not-allowed bg-slate-100" : ""}
              ${className}
            `}
            {...props}
          />

          {error && (
            <div className="absolute top-3.5 right-3.5 pointer-events-none text-rose-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;

