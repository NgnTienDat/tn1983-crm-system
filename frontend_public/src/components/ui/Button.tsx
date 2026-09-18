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
  let baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 cursor-pointer rounded-lg ";

  if (variant === "primary") {
    baseStyles += "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-xs hover:shadow transition-shadow ";
  } else if (variant === "secondary") {
    baseStyles += "bg-white border border-brand-border hover:border-brand-primary text-brand-text-primary hover:text-brand-primary shadow-xs ";
  } else if (variant === "text") {
    baseStyles += "text-brand-primary hover:text-brand-primary-hover gap-s-4 ";
  }

  if (variant !== "text") {
    if (size === "sm") {
      baseStyles += "h-9 px-4 text-xs font-semibold ";
    } else if (size === "lg") {
      baseStyles += "h-12 px-7 text-base ";
    } else {
      baseStyles += "h-11 px-6 text-sm ";
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