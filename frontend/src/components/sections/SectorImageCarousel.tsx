"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

type SectorImageCarouselProps = {
  images: string[];
  title: string;
  icon: ReactNode;
};

const carouselInterval = 2200;

export function SectorImageCarousel({ images, title, icon }: SectorImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, carouselInterval);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="relative z-10 h-full min-h-[360px] w-full overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`${title} görseli ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-all duration-500 ease-out ${
            activeIndex === index
              ? "translate-x-0 opacity-100"
              : index < activeIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.38)_100%)]" />
      <div className="pointer-events-none absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-black/32 text-white/80 backdrop-blur-sm">
        {icon}
      </div>

      {images.length > 1 ? (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-dot`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-8 bg-[#ff4500]" : "w-2.5 bg-white/50"
              }`}
              aria-label={`${title} ${index + 1}. görsele geç`}
              aria-pressed={activeIndex === index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
