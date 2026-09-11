import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "standard" | "product" | "elevated";
  title?: string;
  className?: string;
}

export function Card({ children, variant = "standard", title, className = "" }: CardProps) {
  if (variant === "product") {
    return (
      <div className={`group flex flex-col justify-between bg-[#1F1814] rounded-2xl p-s-32 border border-[#3A2D25] hover:border-brand-primary/60 transition-all duration-300 shadow-xl shadow-black/40 hover:-translate-y-1 ${className}`}>
        {children}
      </div>
    );
  }

  if (variant === "elevated") {
    return (
      <div className={`rounded-2xl bg-brand-surface-elevated p-s-32 border border-brand-border ${className}`}>
        {title && <h3 className="text-heading-m text-brand-text-primary mb-s-16 font-semibold">{title}</h3>}
        {children}
      </div>
    );
  }

  return (
    <div className={`rounded-2xl bg-brand-surface p-s-32 border border-brand-border transition-colors ${className}`}>
      {title && <h3 className="text-heading-m text-brand-text-primary mb-s-16 font-semibold">{title}</h3>}
      {children}
    </div>
  );
}

export default Card;