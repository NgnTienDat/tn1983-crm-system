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
      <div className={`group flex flex-col justify-between bg-white rounded-lg p-6 sm:p-8 border border-brand-border hover:border-brand-primary/50 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 ${className}`}>
        {children}
      </div>
    );
  }

  if (variant === "elevated") {
    return (
      <div className={`rounded-lg bg-brand-surface-elevated p-6 sm:p-8 border border-brand-border shadow-xs ${className}`}>
        {title && <h3 className="text-xl text-brand-text-primary mb-4 font-bold">{title}</h3>}
        {children}
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-white p-6 sm:p-8 border border-brand-border shadow-xs transition-shadow ${className}`}>
      {title && <h3 className="text-xl text-brand-text-primary mb-4 font-bold">{title}</h3>}
      {children}
    </div>
  );
}

export default Card;