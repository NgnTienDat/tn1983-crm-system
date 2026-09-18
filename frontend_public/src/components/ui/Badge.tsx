import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "subtle" | "eyebrow";
  className?: string;
}

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  if (variant === "eyebrow") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 backdrop-blur-xs mb-s-24 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-brand-primary" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">{children}</span>
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <span className={`inline-block px-3 py-1 rounded-md bg-brand-surface-elevated text-brand-text-secondary text-xs font-bold uppercase tracking-wider ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === "subtle") {
    return (
      <span className={`inline-block px-3 py-1 rounded-md bg-white border border-brand-border text-brand-text-secondary text-xs font-bold uppercase tracking-wider ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-md bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs font-bold uppercase tracking-wider ${className}`}>
      {children}
    </span>
  );
}

export default Badge;