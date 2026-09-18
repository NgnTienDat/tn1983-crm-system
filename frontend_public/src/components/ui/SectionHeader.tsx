interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeaderProps) {
  const alignClasses = align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl";

  const labelColor = theme === "dark" ? "text-brand-primary" : "text-brand-primary";
  const headingColor = theme === "dark" ? "text-white" : "text-brand-text-primary";
  const descColor = theme === "dark" ? "text-brand-text-light-secondary" : "text-brand-text-secondary";

  return (
    <div className={`${alignClasses} mb-12 sm:mb-16 ${className}`}>
      <span className={`text-xs font-bold ${labelColor} uppercase tracking-widest block mb-3`}>
        {label}
      </span>
      <h2 className={`text-3xl sm:text-4xl lg:text-[42px] ${headingColor} font-extrabold tracking-tight leading-tight mb-4`}>
        {heading}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg ${descColor} font-normal leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
