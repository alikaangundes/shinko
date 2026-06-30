import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedNumber, AnimatedNumericText } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import { getGlobalContent, getSitePageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Ulaşım",
  description:
    "Shinko fabrika konumu, ulaşım bilgileri ve lojistik bağlantı detayları.",
  alternates: {
    canonical: "/ulasim",
  },
};

export default async function UlasimPage() {
  const [globalContent, pageContent] = await Promise.all([
    getGlobalContent(),
    getSitePageContent("ulasim"),
  ]);
  const page = pageContent.content;

  return (
    <div className="min-h-screen bg-white">
      <Navbar globalContent={globalContent} />

      <main>
        <PageHero
          eyebrow={pageContent.heroEyebrow}
          title={pageContent.heroTitle}
          description={pageContent.heroDescription}
          image={pageContent.heroImage}
          imageAlt="Shinko ulaşım"
        />

        <Reveal as="section" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {page.steps.map((step, index) => (
              <article
                key={step.title}
                className="border border-slate-200 p-8 shadow-[0_18px_46px_rgba(15,21,27,0.04)] transition-colors hover:border-[#ef783e]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="relative h-16 w-16">
                    <Image src={step.icon} alt={step.title} fill sizes="64px" className="object-contain" />
                  </div>
                  {step.transferIcon ? (
                    <div className="relative h-10 w-10 opacity-60">
                      <Image
                        src={step.transferIcon}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                </div>

                <p className="mt-10 text-xs uppercase text-slate-400">
                  <AnimatedNumber value={index + 1} padStart={2} />
                </p>
                <h2 className="mt-5 text-3xl font-semibold uppercase text-slate-950">
                  {step.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[#f7f7f7]" delay={80}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <p className="text-xs font-semibold uppercase text-[#d4652f] sm:text-sm">
              {page.routesEyebrow}
            </p>
            <h2 className="mt-6 max-w-4xl text-5xl font-semibold uppercase text-slate-950 sm:text-7xl">
              {page.routesTitle}
            </h2>

            <div className="mt-12 grid gap-8">
              {page.countryRoutes.map((item) => (
                <article key={item.country} className="border border-slate-200 bg-white p-6 sm:p-8">
                  <h3 className="text-3xl font-semibold uppercase text-slate-950">
                    {item.country}
                  </h3>

                  <div className="mt-8 grid gap-4">
                    {item.rows.map((row) => (
                      <div
                        key={`${item.country}-${row.from}`}
                        className="grid gap-4 border-t border-slate-200 pt-5 text-xs font-semibold uppercase text-slate-600 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
                      >
                        <span>{row.from}</span>
                        <span className="text-[#ef783e]">
                          <AnimatedNumericText text={row.flight} />
                        </span>
                        <span>Sabiha Gökçen Havaalanı</span>
                        <span className="text-[#ef783e]">
                          <AnimatedNumericText text={row.drive} />
                        </span>
                        <span>Shinko</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </main>

      <Footer globalContent={globalContent} />
    </div>
  );
}
