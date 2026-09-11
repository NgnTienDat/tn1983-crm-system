import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  icon,
  external = false,
}: ButtonProps) {
  let baseStyles = "inline-flex items-center justify-center font-medium transition-colors cursor-pointer ";

  if (variant === "primary") {
    baseStyles += "bg-brand-primary hover:bg-brand-primary-hover text-brand-bg rounded-full shadow-sm ";
  } else if (variant === "secondary") {
    baseStyles += "bg-brand-surface border border-brand-border hover:border-brand-primary text-brand-text-primary hover:text-brand-primary rounded-full ";
  } else if (variant === "text") {
    baseStyles += "text-brand-primary text-body-m hover:text-brand-text-primary gap-s-4 ";
  }

  if (variant !== "text") {
    if (size === "sm") {
      baseStyles += "h-9 px-s-16 text-body-m ";
    } else if (size === "lg") {
      baseStyles += "h-12 px-s-24 text-body-m ";
    } else {
      baseStyles += "h-10 px-s-24 text-body-m ";
    }
  }

  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${className}`}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={`${baseStyles} ${className}`}>
      {content}
    </button>
  );
}

export default Button;