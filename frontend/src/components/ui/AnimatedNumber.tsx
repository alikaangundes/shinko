"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  locale?: string;
  padStart?: number;
  startOnView?: boolean;
};

type AnimatedNumericTextProps = {
  text: string;
  className?: string;
  duration?: number;
  locale?: string;
  startOnView?: boolean;
};

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
  duration = 1400,
  locale = "tr-TR",
  padStart,
  startOnView = true,
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(startOnView ? 0 : value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const frame = useRef<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const stopAnimation = () => {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };

    const finish = () => {
      stopAnimation();
      started.current = true;
      setCurrent(value);
    };

    started.current = false;
    setCurrent(startOnView ? 0 : value);

    if (!Number.isFinite(value) || value <= 0) {
      finish();
      return stopAnimation;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !startOnView) {
      finish();
      return stopAnimation;
    }

    const run = () => {
      if (started.current) {
        return;
      }

      started.current = true;
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextValue = Math.min(value, Math.round(value * eased));

        setCurrent(nextValue);

        if (progress < 1) {
          frame.current = window.requestAnimationFrame(tick);
        } else {
          setCurrent(value);
          frame.current = null;
        }
      };

      frame.current = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        run();
        observer.disconnect();
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [duration, startOnView, value]);

  const formatted =
    padStart !== undefined
      ? String(current).padStart(padStart, "0")
      : current.toLocaleString(locale);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function AnimatedNumericText({
  text,
  className,
  duration,
  locale,
  startOnView,
}: AnimatedNumericTextProps) {
  const parts: ReactNode[] = [];
  const pattern = /\d+(?:[.,]\d+)?/g;
  let cursor = 0;
  let match = pattern.exec(text);

  while (match) {
    const token = match[0];
    const matchIndex = match.index;

    if (matchIndex > cursor) {
      parts.push(text.slice(cursor, matchIndex));
    }

    const normalized = token.replace(/\./g, "").replace(",", ".");
    const value = Number(normalized);

    parts.push(
      Number.isFinite(value) ? (
        <AnimatedNumber
          key={`${token}-${matchIndex}`}
          value={value}
          duration={duration}
          locale={locale}
          padStart={token.startsWith("0") ? token.length : undefined}
          startOnView={startOnView}
        />
      ) : (
        token
      ),
    );

    cursor = matchIndex + token.length;
    match = pattern.exec(text);
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <span className={className}>{parts}</span>;
}
