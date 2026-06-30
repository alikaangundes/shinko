import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import { getContactPageContent, getGlobalContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Shinko iletişim bilgileri, fabrika konumu, telefon, e-posta ve iletişim formu.",
  alternates: {
    canonical: "/iletisim",
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M0 8h37" />
      <path d="m31 2 6 6-6 6" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 52 52" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 14h34v24H9V14Z" />
      <path d="m10 16 16 13 16-13" />
      <path d="M14 42h24" />
      <path d="M18 46h16" />
    </svg>
  );
}

export default async function IletisimPage() {
  const [globalContent, pageContent] = await Promise.all([
    getGlobalContent(),
    getContactPageContent(),
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
          imageAlt="Shinko iletişim"
        />

        <Reveal as="section" className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase text-[#ef783e]">
                  {page.infoEyebrow}
                </p>
                <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                  {page.infoTitle}
                </h2>
                <div className="mt-7 h-0.5 w-14 bg-[#ef783e]" />
                <p className="mt-7 max-w-md text-base leading-8 text-slate-700">
                  {page.infoDescription}
                </p>
              </div>

              <div className="grid overflow-hidden border border-slate-200 bg-[#f7f9fb] shadow-[0_22px_60px_rgba(15,21,27,0.06)] lg:grid-cols-3">
                {page.contactDetails.map((item, index) => (
                  <Reveal key={item.label} delay={120 + index * 70}>
                    <a
                      href={item.href}
                      target={item.label === "Web" ? "_blank" : undefined}
                      rel={item.label === "Web" ? "noreferrer" : undefined}
                      className="group flex min-h-[270px] flex-col justify-between border-b border-slate-200 bg-white p-8 transition-colors hover:bg-[#11161b] hover:text-white lg:border-b-0 lg:border-r lg:last:border-r-0"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <p className="text-4xl font-semibold text-[#ef783e]">
                          <AnimatedNumber value={index + 1} padStart={2} />
                        </p>
                        <div className="text-slate-200 transition-colors group-hover:text-[#ef783e]">
                          <ContactIcon />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-[#ef783e]">
                          {item.label}
                        </p>
                        <p className="mt-4 whitespace-nowrap text-base font-semibold leading-tight text-slate-950 transition-colors group-hover:text-white xl:text-lg">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[#11161b]" delay={80}>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 text-white sm:px-6 sm:py-20 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
            <div className="border-l border-[#ef783e]/45 pl-6">
              <p className="text-xs font-semibold uppercase text-[#ef783e]">
                {page.mapEyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.95] sm:text-6xl">
                {page.mapTitle}
              </h2>
              <p className="mt-8 max-w-md text-base leading-8 text-white/68">
                {page.mapDescription}
              </p>
            </div>

            <div className="relative min-h-[470px] overflow-hidden rounded-[24px] bg-white">
              <iframe
                title="Shinko Harita"
                src={page.mapUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-white" delay={120}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.36fr_0.64fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-[#ef783e]">
                {page.formEyebrow}
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                {page.formTitle}
              </h2>
              <div className="mt-7 h-0.5 w-14 bg-[#ef783e]" />
              {page.formDescription ? (
                <p className="mt-7 max-w-md text-base leading-8 text-slate-700">
                  {page.formDescription}
                </p>
              ) : null}
            </div>

            <form className="border border-slate-200 bg-[#f7f9fb] p-6 shadow-[0_22px_60px_rgba(15,21,27,0.06)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={page.formNamePlaceholder}
                  className="border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
                />
                <input
                  type="tel"
                  placeholder={page.formPhonePlaceholder}
                  className="border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
                />
                <input
                  type="email"
                  placeholder={page.formEmailPlaceholder}
                  className="border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
                />
                <input
                  type="text"
                  placeholder={page.formSubjectPlaceholder}
                  className="border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
                />
              </div>

              <textarea
                placeholder={page.formMessagePlaceholder}
                rows={8}
                className="mt-5 w-full border border-slate-200 bg-white px-6 py-5 text-sm font-semibold uppercase text-slate-950 outline-none placeholder:text-slate-400 focus:border-[#ef783e]"
              />

              <div className="mt-6 text-right">
                <button
                  type="button"
                  className="inline-flex items-center gap-5 bg-[#ef783e] px-9 py-5 text-xs font-semibold uppercase text-white transition-colors hover:bg-[#11161b]"
                >
                  {page.formButtonLabel}
                  <ArrowIcon />
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </main>

      <Footer globalContent={globalContent} />
    </div>
  );
}
