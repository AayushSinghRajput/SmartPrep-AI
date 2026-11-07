import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  const variantStyles = {
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-200/80",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200/80",
    accent: "bg-amber-50 text-amber-800 border border-amber-200/80",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80",
    error: "bg-rose-50 text-rose-700 border border-rose-200/80",
    outline: "bg-transparent text-slate-700 border border-slate-200",
  };

  const dotColors = {
    primary: "bg-indigo-600",
    secondary: "bg-slate-500",
    accent: "bg-amber-600",
    success: "bg-emerald-600",
    warning: "bg-amber-500",
    error: "bg-rose-500",
    outline: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;

