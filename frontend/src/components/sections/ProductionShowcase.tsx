"use client";

import Image from "next/image";
import { Manrope } from "next/font/google";
import { useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { defaultHomePageContent, type HomePageContent } from "@/lib/site-content";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const productionStats = [
  {
    value: 44,
    label: "Enjeksiyon Makinesi",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 37h34M11 20h26v14H11V20Z" />
        <path d="M18 20v-8h12v8M16 27h16M37 25h5M6 25h5" />
      </svg>
    ),
  },
  {
    value: 1800,
    suffix: "T",
    label: "Maksimum Tonaj",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M15 14h18l7 26H8l7-26Z" />
        <path d="M20 14a4 4 0 0 1 8 0M20 25h8M24 21v8" />
      </svg>
    ),
  },
  {
    value: 13000,
    suffix: " m²",
    label: "Üretim Alanı",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 40h34M10 40V20h11v20M21 40V10h17v30" />
        <path d="M14 25h3M14 31h3M26 16h4M26 22h4M26 28h4M26 34h4" />
      </svg>
    ),
  },
  {
    value: 180,
    suffix: "+",
    label: "Uzman Çalışan",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="18" cy="18" r="5" />
        <circle cx="32" cy="18" r="5" />
        <path d="M7 39v-7c0-5 4-9 11-9s11 4 11 9v7H7Z" />
        <path d="M29 25c2-2 5-3 8-1 3 1 5 4 5 8v7H31" />
      </svg>
    ),
  },
];

const productionFeatureFallbacks = [
  {
    title: "Modern Üretim Tesisi",
    body: "13.000 m² kapalı alan ve yüksek üretim kapasitesi.",
    image: "/shinko/home/WhatsApp%20Image%202026-06-14%20at%2019.00.43.jpeg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 27h22M7 27V13h8v14M15 27V6h11v21" />
        <path d="M10 17h2M10 21h2M19 11h3M19 16h3M19 21h3" />
      </svg>
    ),
  },
  {
    title: "Entegre Kalıphane",
    body: "Tasarım, üretim ve bakım süreçlerinde tam kontrol.",
    image: "/shinko/home/service-design.jpg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="m16 4 10 5v14l-10 5-10-5V9l10-5Z" />
        <path d="m6 9 10 5 10-5M16 14v14" />
      </svg>
    ),
  },
  {
    title: "Robot Destekli Üretim",
    body: "Otomasyon ve robotik sistemlerle yüksek verimlilik.",
    image: "/shinko/home/WhatsApp%20Image%202026-06-14%20at%2019.07.23.jpeg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 26h16M11 26v-6l5-4 3-7 5 2-3 8-5 4v3" />
        <circle cx="22" cy="9" r="3" />
        <path d="M7 8h6v6H7z" />
      </svg>
    ),
  },
  {
    title: "Kalite Güvencesi",
    body: "Sürekli kalite kontrol ve uluslararası standartlar.",
    image: "/shinko/home/highlight-cmm.jpg",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M16 4 26 8v7c0 7-4 10-10 13C10 25 6 22 6 15V8l10-4Z" />
        <path d="m11 16 3 3 7-8" />
      </svg>
    ),
  },
];

type ProductionShowcaseProps = {
  homeContent?: HomePageContent;
};

function splitLines(value: string | null | undefined) {
  return value
    ? value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    : [];
}

export function ProductionShowcase({ homeContent = defaultHomePageContent }: ProductionShowcaseProps) {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const heroVideo = homeContent.heroVideo || defaultHomePageContent.heroVideo;
  const showcaseTitleLines = splitLines(homeContent.showcaseTitle || defaultHomePageContent.showcaseTitle);
  const showcaseAccentLines = splitLines(
    homeContent.showcaseAccentTitle || defaultHomePageContent.showcaseAccentTitle,
  );
  const cmsProductionStats = homeContent.productionStats.map((stat, index) => ({
    ...stat,
    icon: productionStats[index]?.icon || productionStats[0].icon,
  }));
  const productionFeatures = homeContent.productionFeatures.map((feature, index) => ({
    ...(productionFeatureFallbacks[index] || productionFeatureFallbacks[0]),
    ...feature,
  }));
  const showcaseEyebrow =
    homeContent.showcaseEyebrow || defaultHomePageContent.showcaseEyebrow;
  const showcaseDescription =
    homeContent.showcaseDescription || defaultHomePageContent.showcaseDescription;
  const showcaseTimelineEyebrow =
    homeContent.showcaseTimelineEyebrow || defaultHomePageContent.showcaseTimelineEyebrow;
  const showcaseHeadline =
    homeContent.showcaseHeadline || defaultHomePageContent.showcaseHeadline;

  useEffect(() => {
    if (!isVideoExpanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoExpanded(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoExpanded]);

  return (
    <>
      <section className={`${manrope.className} relative overflow-hidden bg-[#080a0d] pt-[86px] text-white lg:h-[100svh] lg:pt-[90px]`}>
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="relative mx-auto grid max-w-[1600px] px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-10 lg:h-[calc(100svh-90px)] lg:grid-cols-[390px_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_220px] lg:gap-x-6 lg:gap-y-3 lg:py-4 xl:grid-cols-[440px_minmax(0,1fr)] xl:gap-x-8">
          <div className="min-w-0 text-left lg:row-span-2 lg:flex lg:h-full lg:flex-col lg:overflow-hidden lg:border-r lg:border-white/12 lg:pr-6 xl:pr-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#ff7a22] sm:text-base lg:text-sm">
              {showcaseEyebrow}
            </p>
            <h1 className="mt-4 space-y-1.5 text-[clamp(2.55rem,12vw,4rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white sm:mt-5 sm:space-y-2 lg:mt-3 lg:space-y-2.5 lg:text-[3.15rem] lg:leading-[0.88] xl:text-[3.7rem]">
              {showcaseTitleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {showcaseAccentLines.map((line) => (
                <span key={line} className="block text-[#ff6818]">
                  {line}
                </span>
              ))}
            </h1>
            <div className="mt-7 h-0.5 w-40 bg-[#ff6818] lg:mt-4" />
            <p className="mt-5 text-base font-semibold leading-7 text-white sm:mt-6 sm:text-lg sm:leading-8 lg:mt-4 lg:text-base lg:leading-7 xl:text-lg xl:leading-8">
              {showcaseDescription}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-white/14 bg-white/14 sm:mt-8 lg:mt-4 lg:min-h-0 lg:flex-1 lg:grid-cols-1 lg:grid-rows-4 lg:gap-0 lg:overflow-visible lg:border-x-0 lg:border-b-0 lg:bg-transparent">
              {cmsProductionStats.map((stat) => (
                <div
                  key={stat.label}
                  className="grid min-h-28 grid-cols-1 items-start justify-items-start gap-3 bg-[#080a0d]/95 p-4 text-left sm:grid-cols-[64px_minmax(0,1fr)] sm:items-center sm:gap-5 sm:py-5 lg:min-h-0 lg:grid-cols-[52px_minmax(0,1fr)] lg:gap-4 lg:border-b lg:border-white/14 lg:bg-transparent lg:p-0 lg:py-2"
                >
                  <div className="h-9 w-9 text-[#ff7a22] sm:h-12 sm:w-12 lg:h-10 lg:w-10">{stat.icon}</div>
                  <div className="w-full text-left">
                    <p className="text-left text-3xl font-bold leading-none tabular-nums text-white sm:text-4xl lg:text-3xl xl:text-4xl">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-left text-[0.72rem] font-bold uppercase leading-4 tracking-[0.1em] text-white sm:text-base sm:leading-6 lg:mt-1 lg:text-sm lg:leading-5 xl:text-base">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 min-h-[360px] overflow-hidden border border-white/10 sm:mt-8 sm:min-h-[500px] lg:mt-0 lg:h-full lg:min-h-0">
            <video
              src={heroVideo}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Shinko tanıtım videosu"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.92)_0%,rgba(8,10,13,0.62)_27%,rgba(8,10,13,0.12)_62%,rgba(8,10,13,0.18)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,13,0.18)_0%,rgba(8,10,13,0.04)_55%,rgba(8,10,13,0.72)_100%)]" />

            <button
              type="button"
              onClick={() => setIsVideoExpanded(true)}
              className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/65 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:border-[#ff6818] hover:bg-[#ff6818] sm:right-5 sm:top-5 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
              aria-haspopup="dialog"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
              </svg>
              Büyüt
            </button>

            <div className="relative z-10 flex min-h-[360px] max-w-2xl flex-col justify-center px-5 py-10 sm:min-h-[500px] sm:px-12 lg:ml-5 lg:h-full lg:min-h-0 lg:px-8 lg:py-6 xl:ml-8 xl:px-12">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff7a22] sm:text-sm sm:tracking-[0.3em]">
                {showcaseTimelineEyebrow}
              </p>
              <h2 className="mt-5 text-[2rem] font-bold leading-[1.08] text-white sm:mt-6 sm:text-5xl lg:mt-4 lg:text-4xl xl:text-5xl 2xl:text-6xl">
                {showcaseHeadline}
              </h2>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3 lg:mt-0 lg:h-full lg:grid-cols-4">
            {productionFeatures.map((feature) => (
              <article
                key={feature.title}
                className="group relative min-h-[245px] overflow-hidden border border-white/12 bg-[#111419] sm:min-h-[310px] lg:h-full lg:min-h-0"
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 18vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,13,0.05)_18%,rgba(8,10,13,0.95)_74%)]" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex h-[170px] flex-col p-4 sm:h-[205px] sm:p-5 lg:h-[175px] lg:p-4 xl:h-[190px] xl:p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[#ff6818] p-2 text-white sm:mb-4 sm:h-12 sm:w-12 sm:p-2.5 lg:mb-3 lg:h-10 lg:w-10 lg:p-2">
                    {feature.icon}
                  </div>
                  <h3 className="min-h-9 text-sm font-extrabold uppercase leading-5 text-white sm:min-h-12 sm:text-lg sm:leading-6 lg:min-h-11 lg:text-base lg:leading-[1.35] xl:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs font-bold leading-5 text-white sm:text-base sm:leading-7 lg:mt-1.5 lg:text-sm lg:leading-[1.55] xl:text-base">
                    {feature.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isVideoExpanded ? (
        <div
          className={`${manrope.className} fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8`}
          role="dialog"
          aria-modal="true"
          aria-label="Büyütülmüş Shinko tanıtım videosu"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsVideoExpanded(false);
            }
          }}
        >
          <div className="relative w-full max-w-7xl overflow-hidden border border-white/20 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
            <button
              type="button"
              onClick={() => setIsVideoExpanded(false)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/75 text-2xl font-bold text-white transition-colors hover:bg-[#ff6818]"
              aria-label="Büyütülmüş videoyu kapat"
            >
              ×
            </button>
            <video
              src={heroVideo}
              className="max-h-[88vh] w-full bg-black"
              autoPlay
              controls
              playsInline
              preload="auto"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
