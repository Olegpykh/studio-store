'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function RevealSection({
  children,
  className = '',
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}
