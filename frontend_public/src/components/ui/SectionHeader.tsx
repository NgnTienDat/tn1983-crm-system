interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClasses = align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl";

  return (
    <div className={`${alignClasses} mb-s-64 ${className}`}>
      <span className="text-label text-brand-primary uppercase tracking-widest block mb-s-8">
        {label}
      </span>
      <h2 className="text-heading-l text-brand-text-primary mb-s-16 font-semibold">
        {heading}
      </h2>
      {description && (
        <p className="text-body-l text-brand-text-secondary font-normal">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
