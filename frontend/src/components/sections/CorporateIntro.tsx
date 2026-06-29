import {
  defaultHomePageContent,
  type HomePageContent,
} from "@/lib/site-content";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";

type CorporateIntroProps = {
  showLink?: boolean;
  content?: Partial<HomePageContent["corporateIntro"]>;
  videoSrc?: string;
};

const introStats = [
  {
    value: 30,
    suffix: "+",
    label: "Yıllık Deneyim",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="18" cy="17" r="5" />
        <circle cx="31" cy="17" r="5" />
        <path d="M8 38v-8c0-5 4-9 10-9s10 4 10 9v8H8Z" />
        <path d="M27 26c2-2 5-3 8-2 4 1 6 4 6 8v6H30" />
      </svg>
    ),
  },
  {
    value: 58000,
    suffix: " m²",
    label: "Toplam Kapalı Alan",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 38h34" />
        <path d="M10 38V23l11-7 11 7v15" />
        <path d="M32 20v-7h6v25" />
        <path d="M15 38v-7h6v7M26 38v-9h6v9" />
      </svg>
    ),
  },
  {
    value: 700,
    suffix: "+",
    label: "Uzman Çalışan",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="24" cy="15" r="7" />
        <path d="M12 40v-5c0-7 5-12 12-12s12 5 12 12v5" />
      </svg>
    ),
  },
];

export function CorporateIntro({
  content,
  videoSrc = defaultHomePageContent.heroVideo,
}: CorporateIntroProps) {
  const intro = {
    ...defaultHomePageContent.corporateIntro,
    ...content,
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
      <div>
        <Reveal delay={40}>
          <p className="text-xs font-semibold uppercase text-[#ef783e]">Shinko</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-5xl">
            {intro.title}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-7 h-0.5 w-14 bg-[#ef783e]" />
        </Reveal>

        <Reveal delay={190}>
          <p className="mt-7 max-w-md text-base leading-8 text-slate-700">
            {intro.description}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 divide-x divide-slate-200">
          {introStats.map((item, index) => (
            <Reveal key={item.label} delay={250 + index * 70}>
              <div className="flex flex-col items-center px-4 text-center text-[#ef783e]">
                {item.icon}
                <p className="mt-5 text-2xl font-semibold text-slate-950">
                  <AnimatedNumber value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase leading-5 text-slate-600">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={120}>
        <div className="relative min-h-[460px] overflow-hidden border border-slate-200 bg-black">
          <video
            src={videoSrc}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Shinko tanıtım filmi"
          />
        </div>
      </Reveal>
    </div>
  );
}
