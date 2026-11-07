import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  circle = false,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse bg-slate-200/80
        ${circle ? "rounded-full" : "rounded-xl"}
        ${className}
      `}
      {...props}
    />
  );
};

export default Skeleton;

