"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedProgressBarProps = {
  value: number;
  className?: string;
  barClassName?: string;
  duration?: number;
  delay?: number;
};

export function AnimatedProgressBar({
  value,
  className = "h-2.5 overflow-hidden rounded-full bg-white/10",
  barClassName = "h-full rounded-full bg-[linear-gradient(90deg,#ff4500,#ff8c00)]",
  duration = 1200,
  delay = 0,
}: AnimatedProgressBarProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHasMounted(true);

    const node = ref.current;

    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const safeValue = Math.max(0, Math.min(value, 100));
  const shouldShowFullValue = !hasMounted || isVisible;

  return (
    <div
      ref={ref}
      className={className}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <div
        className={barClassName}
        style={{
          width: `${safeValue}%`,
          transform: `scaleX(${shouldShowFullValue ? 1 : 0})`,
          transformOrigin: "left",
          transition: `transform ${duration}ms ${delay}ms cubic-bezier(0.34, 1.2, 0.64, 1)`,
        }}
      />
    </div>
  );
}
