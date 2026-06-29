"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ToolingImageCarouselProps = {
  images: string[];
};

const intervalMs = 2400;

export function ToolingImageCarousel({ images }: ToolingImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/25 bg-black/20 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Kalıphane görseli ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 64vw"
          className={`object-cover transition-all duration-700 ease-out ${
            activeIndex === index
              ? "translate-x-0 opacity-100"
              : index < activeIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_35%,rgba(0,0,0,0.32)_100%)]" />
    </div>
  );
}
