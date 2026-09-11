import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "subtle" | "eyebrow";
  className?: string;
}

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  if (variant === "eyebrow") {
    return (
      <div className={`inline-flex items-center gap-s-8 px-s-12 py-s-4 rounded-full bg-brand-surface border border-brand-border mb-s-24 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
        <span className="text-label text-brand-primary uppercase tracking-widest">{children}</span>
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <span className={`inline-block px-s-12 py-s-4 rounded-full bg-brand-surface-elevated text-brand-text-muted text-label uppercase ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === "subtle") {
    return (
      <span className={`inline-block px-s-12 py-s-4 rounded-full bg-brand-surface-elevated border border-brand-border text-brand-text-secondary text-label uppercase ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-block px-s-12 py-s-4 rounded-full bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-label uppercase ${className}`}>
      {children}
    </span>
  );
}

export default Badge;