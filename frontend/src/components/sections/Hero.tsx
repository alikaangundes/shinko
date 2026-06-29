"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultHomePageContent } from "@/lib/site-content";

type HeroProps = {
  heroSubtitle?: string;
};

type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const sliderInterval = 6000;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M0 8h37" />
      <path d="m31 2 6 6-6 6" />
    </svg>
  );
}

export function Hero({
  heroSubtitle = defaultHomePageContent.heroSubtitle,
}: HeroProps) {
  const slides: HeroSlide[] = [
    {
      eyebrow: "Kalıp Tasarım & Plastik Enjeksiyon",
      title: "Hızlı Çözüm Kaliteli Hizmet",
      description: heroSubtitle,
      image: "/shinko/home/hero-otomotiv.jpg",
      imageAlt: "Shinko otomotiv üretim çözümleri",
      primaryHref: "/kurumsal",
      primaryLabel: "Hakkımızda",
      secondaryHref: "/uretim",
      secondaryLabel: "Üretim Altyapımız",
    },
    {
      eyebrow: "Kalıp Tasarımı",
      title: "Fikirlerinizi Üretime Hazırlıyoruz",
      description:
        "Deneyimli mühendis kadromuzla kalıp tasarımından devreye almaya kadar tüm süreci ölçülebilir ve kontrollü şekilde yönetiyoruz.",
      image: "/shinko/home/service-design.jpg",
      imageAlt: "Shinko kalıp tasarımı",
      primaryHref: "/uretim",
      primaryLabel: "Üretimi İncele",
      secondaryHref: "/kalite",
      secondaryLabel: "Kalite Süreci",
    },
    {
      eyebrow: "Kalite Güvencesi",
      title: "Kalite Bir Söz Değil Süreçtir",
      description:
        "CMM ölçüm, ERP takibi ve sürekli iyileştirme yaklaşımıyla üretimin her aşamasında güvenilir kalite standardı sağlıyoruz.",
      image: "/shinko/home/service-quality.jpg",
      imageAlt: "Shinko kalite kontrol",
      primaryHref: "/kalite",
      primaryLabel: "Kalite Politikamız",
      secondaryHref: "/iletisim",
      secondaryLabel: "İletişime Geç",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, sliderInterval);

    return () => {
      window.clearInterval(interval);
    };
  }, [slides.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#11161b] pt-[90px] text-white">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-all duration-1000 ${
              activeIndex === index
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,22,27,0.94)_0%,rgba(17,22,27,0.82)_34%,rgba(17,22,27,0.48)_62%,rgba(17,22,27,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,22,27,0.24)_0%,rgba(17,22,27,0.08)_42%,rgba(17,22,27,0.92)_100%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-6 lg:py-20">
        <div className="max-w-5xl">
          <div className="mb-8 h-px w-full max-w-[60rem] bg-white/78" />

          <div key={`copy-${activeIndex}`} className="animate-[heroCopyIn_700ms_ease_both]">
            <p className="text-2xl font-semibold text-white sm:text-4xl">
              {activeSlide.eyebrow}
            </p>

            <h1 className="mt-10 max-w-5xl text-5xl font-semibold leading-[1.04] text-white sm:text-7xl lg:text-[6.4rem]">
              {activeSlide.title}
            </h1>

            <p className="mt-8 max-w-[35rem] text-base leading-8 text-white/78 sm:text-lg">
              {activeSlide.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={activeSlide.primaryHref}
                className="shinko-cta inline-flex items-center justify-center gap-4 bg-[#ff4500] px-9 py-5 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ef783e]"
              >
                {activeSlide.primaryLabel}
                <ArrowIcon />
              </Link>
              {activeSlide.secondaryHref && activeSlide.secondaryLabel ? (
                <Link
                  href={activeSlide.secondaryHref}
                  className="inline-flex items-center justify-center gap-4 border border-white/42 bg-white/8 px-9 py-5 text-base font-semibold text-white backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#ef783e] hover:bg-[#ef783e]"
                >
                  {activeSlide.secondaryLabel}
                  <ArrowIcon />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <div className="flex items-center gap-5">
            {slides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group flex h-7 w-7 items-center justify-center"
                aria-label={`${index + 1}. slayta geç`}
                aria-pressed={activeIndex === index}
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full transition-colors ${
                    activeIndex === index ? "bg-[#ff4500]" : "bg-white"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-9 right-5 hidden items-center gap-3 sm:flex lg:right-6">
          {slides.map((slide, index) => (
            <button
              key={`line-${slide.eyebrow}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative h-px w-12 overflow-hidden bg-white/24"
              aria-label={`${index + 1}. slayta geç`}
            >
              <span
                className={`absolute inset-y-0 left-0 bg-[#ff4500] ${
                  activeIndex === index ? "animate-[heroProgress_6000ms_linear_both]" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
