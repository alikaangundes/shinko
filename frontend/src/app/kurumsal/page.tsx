import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { getCorporatePageContent, getGlobalContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "Shinko'nun kalite anlayışı, misyonu, vizyonu ve çevre politikası hakkında kurumsal bilgiler.",
  alternates: {
    canonical: "/kurumsal",
  },
};

function CorporateFeature({
  eyebrow,
  title,
  body,
  points,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string[];
  points: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  const gradient = reverse
    ? "linear-gradient(135deg,#10151b,#1c2026,#0a0a0a)"
    : "linear-gradient(135deg,#17120f,#241713,#0a0a0a)";

  return (
    <section
      className="shinko-product-card overflow-hidden rounded-[28px] shadow-[0_8px_36px_rgba(0,0,0,0.14)]"
      style={{ background: gradient }}
    >
      <div className="relative z-10 grid lg:grid-cols-2">
        <div className={`p-8 sm:p-10 lg:p-14 ${reverse ? "lg:order-2" : ""}`}>
          <Reveal delay={40}>
            <p className="text-base font-bold uppercase tracking-[0.22em] text-[#ff8c40]">
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-5 text-5xl font-bold uppercase leading-[0.95] text-white sm:text-6xl">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-6 h-0.5 w-14 bg-[#ff4500]" />
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-7 max-w-xl space-y-5 text-lg font-semibold leading-9 text-white">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3">
            {points.map((point, index) => (
              <Reveal key={point} delay={250 + index * 55}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ff8c40] bg-black/20 text-sm font-bold text-[#ff8c40]">
                    <AnimatedNumber value={index + 1} padStart={2} />
                  </span>
                  <p className="text-base font-bold leading-8 text-white">
                    {point}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div
          className={`relative min-h-[320px] overflow-hidden bg-black/25 ${
            reverse ? "lg:order-1 lg:border-r lg:border-white/10" : "lg:border-l lg:border-white/10"
          }`}
        >
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale opacity-90"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}

export default async function KurumsalPage() {
  const [globalContent, pageContent] = await Promise.all([
    getGlobalContent(),
    getCorporatePageContent(),
  ]);
  const page = pageContent.content;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar globalContent={globalContent} />

      <main>
        <PageHero
          eyebrow={pageContent.heroEyebrow}
          title={pageContent.heroTitle}
          description={pageContent.heroDescription}
          image={pageContent.heroImage}
          imageAlt="Shinko Kurumsal"
          prominentEyebrow
        />

        <section className="overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-6 sm:py-20 lg:space-y-24">
            <CorporateFeature
              eyebrow={page.mission.eyebrow}
              title={page.mission.title}
              body={[page.mission.body]}
              points={page.mission.points}
              image={page.mission.image}
              imageAlt="Shinko misyon"
            />

            <CorporateFeature
              eyebrow={page.vision.eyebrow}
              title={page.vision.title}
              body={[page.vision.bodyTop, page.vision.bodyBottom]}
              points={page.vision.points}
              image={page.vision.image}
              imageAlt="Shinko vizyon"
              reverse
            />

            <CorporateFeature
              eyebrow={page.environment.eyebrow}
              title={page.environment.title}
              body={[page.environment.body]}
              points={page.environment.points}
              image={page.environment.image}
              imageAlt="Shinko çevre politikası"
            />
          </div>
        </section>
      </main>

      <Footer globalContent={globalContent} />
    </div>
  );
}
