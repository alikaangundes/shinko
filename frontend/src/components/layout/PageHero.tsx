import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageShape?: "angled" | "rect";
  imageSize?: "default" | "wide";
  prominentEyebrow?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageShape = "angled",
  imageSize = "default",
  prominentEyebrow = false,
}: PageHeroProps) {
  const isRectImage = imageShape === "rect";
  const isWideImage = imageSize === "wide";

  return (
    <section className="relative overflow-hidden bg-[#11161b] pt-[86px] text-white lg:pt-[90px]">
      <div className="absolute inset-x-0 top-0 h-1 bg-[#ef783e]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,#11161b_0%,#11161b_48%,rgba(17,22,27,0.78)_100%)]" />

      <div
        className={`relative mx-auto grid min-h-[auto] max-w-7xl items-center px-4 py-12 sm:min-h-[430px] sm:px-6 sm:py-16 lg:py-20 ${
          isWideImage
            ? "gap-5 lg:grid-cols-[0.44fr_0.64fr]"
            : "gap-10 lg:grid-cols-[0.48fr_0.52fr]"
        }`}
      >
        <div className="relative z-10 max-w-3xl">
          <Reveal delay={40}>
            <p
              className={`font-bold uppercase text-[#ef783e] ${
                prominentEyebrow
                  ? "text-sm tracking-[0.14em] sm:text-lg sm:tracking-[0.16em]"
                  : "text-xs"
              }`}
            >
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-5 text-[clamp(2.45rem,12vw,4.9rem)] font-semibold uppercase leading-[0.95] sm:mt-7 sm:text-6xl lg:text-[4.9rem]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:mt-8 sm:text-lg">
              {description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className={isWideImage ? "lg:-mr-56 xl:-mr-72" : ""}>
          <div className={`relative mt-10 min-h-[260px] sm:mt-0 sm:min-h-[300px] ${isWideImage ? "lg:min-h-[420px]" : "lg:min-h-[380px]"}`}>
            {!isRectImage ? (
              <div className="absolute left-6 top-14 z-10 hidden h-[220px] w-px rotate-[10deg] bg-[#ef783e]/85 lg:block" />
            ) : null}
            <div
              className={`absolute inset-0 overflow-hidden ${
                isRectImage
                  ? "rounded-[28px] border border-white/10 bg-black/20"
                  : "[clip-path:polygon(16%_0,100%_0,100%_88%,88%_100%,0_100%,10%_56%)]"
              }`}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover opacity-100 brightness-125 contrast-110"
              />
              <div className="absolute inset-0 bg-black/[0.02]" />
            </div>
            {!isRectImage ? (
              <div className="absolute bottom-0 right-0 h-12 w-12 bg-[#ef783e] sm:h-14 sm:w-14" />
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
