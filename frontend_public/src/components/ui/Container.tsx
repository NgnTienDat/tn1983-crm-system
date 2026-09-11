import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-container mx-auto px-s-24 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
