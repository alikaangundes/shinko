import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { CareerApplicationForm } from "@/components/sections/CareerApplicationForm";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import {
  getGlobalContent,
  getHumanResourcesPageContent,
  getJobPostings,
} from "@/lib/strapi";
import { resolveMediaUrl } from "@/lib/strapi-media";

const fallbackOpenPositions = [
  {
    title: "Plastik Enjeksiyon Operatörü",
    department: "Üretim",
    location: "Gebze / Kocaeli",
    type: "Vardiyalı",
    description:
      "Enjeksiyon makinelerinde üretim sürecini takip edecek, kalite ve düzen disiplinine önem veren ekip arkadaşları arıyoruz.",
    requirements: [
      "Vardiyalı çalışmaya uygun",
      "Üretim tecrübesi tercih sebebi",
      "Takım çalışmasına yatkın",
    ],
  },
  {
    title: "Kalıphane Teknikeri",
    department: "Kalıphane",
    location: "Gebze / Kocaeli",
    type: "Tam zamanlı",
    description:
      "Kalıp bakım, revizyon ve iyileştirme süreçlerinde görev alacak teknik yetkinliği güçlü çalışma arkadaşı arıyoruz.",
    requirements: [
      "Teknik resim okuyabilen",
      "Kalıp bakım deneyimi olan",
      "Ölçüm ekipmanlarını kullanabilen",
    ],
  },
  {
    title: "Kalite Kontrol Personeli",
    department: "Kalite",
    location: "Gebze / Kocaeli",
    type: "Vardiyalı",
    description:
      "Üretimden çıkan parçaların görsel ve ölçüsel kontrollerini yapacak, kayıt disiplinine sahip ekip arkadaşı arıyoruz.",
    requirements: [
      "Dikkatli ve düzenli çalışan",
      "Temel ölçüm aleti bilgisi olan",
      "Raporlama yapabilen",
    ],
  },
];

export default async function InsanKaynaklariPage() {
  const [globalContent, pageContent, cmsOpenPositions] = await Promise.all([
    getGlobalContent(),
    getHumanResourcesPageContent(),
    getJobPostings(),
  ]);
  const page = pageContent.content;
  const cmsPage = pageContent as typeof pageContent & {
    formImage?: unknown;
  };
  const formImage = resolveMediaUrl(
    cmsPage.formImage,
    "/shinko/insan-kaynaklari/WhatsApp%20Image%202026-06-14%20at%2022.24.22.jpeg",
  );
  const openPositions = cmsOpenPositions.length > 0
    ? cmsOpenPositions.map((position) => ({
        title: position.title,
        department: position.department || "Genel",
        location: position.location || "Kocaeli",
        type: position.workType || position.type || "Tam zamanlı",
        description: position.description || "",
        requirements: position.requirements?.length ? position.requirements : [],
      }))
    : fallbackOpenPositions;
  const applicationPositionOptions = [
    ...openPositions.map((position) => position.title),
    "Genel Başvuru",
  ].filter((position, index, positions) => positions.indexOf(position) === index);

  return (
    <div className="min-h-screen bg-white">
      <Navbar globalContent={globalContent} />

      <main>
        <PageHero
          eyebrow={pageContent.heroEyebrow}
          title={pageContent.heroTitle}
          description={pageContent.heroDescription}
          image={pageContent.heroImage}
          imageAlt="Shinko İnsan Kaynakları"
        />

        <Reveal as="section" id="acik-pozisyonlar" className="scroll-mt-28 bg-white" delay={40}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ef783e]">
                  {page.positionsEyebrow}
                </p>
                <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                  {page.positionsTitle}
                </h2>
                <div className="mt-7 h-0.5 w-14 bg-[#ef783e]" />
                <p className="mt-7 max-w-2xl text-base leading-8 text-slate-700">
                  {page.positionsDescription}
                </p>
              </div>

              <p className="border border-[#ef783e]/25 bg-[#ef783e]/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#c94e1b]">
                {openPositions.length} {page.positionsCountSuffix}
              </p>
            </div>

            <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
              {openPositions.map((position, index) => (
                <Reveal key={position.title} className="h-full" delay={100 + index * 70}>
                  <article className="shinko-lift flex h-full min-h-[430px] flex-col overflow-hidden rounded-[24px] border border-black/[0.07] bg-[#f7f9fb] shadow-[0_8px_32px_rgba(15,21,27,0.07)]">
                    <div className="h-1.5 bg-[linear-gradient(90deg,#ef783e,#11161b)]" />
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex flex-wrap gap-2">
                        {[position.department, position.location, position.type].map((item) => (
                          <span
                            key={item}
                            className="border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <p className="mt-8 text-sm font-semibold text-[#ef783e]">
                        <AnimatedNumber value={index + 1} padStart={2} />
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold uppercase leading-tight text-slate-950">
                        {position.title}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-slate-600">
                        {position.description}
                      </p>

                      <div className="mt-6 grid gap-3">
                        {position.requirements.map((requirement) => (
                          <p key={requirement} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef783e]" />
                            {requirement}
                          </p>
                        ))}
                      </div>

                      <a
                        href="#basvuru"
                        className="mt-auto inline-flex items-center justify-between border-t border-slate-200 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 transition-colors hover:text-[#ef783e]"
                      >
                        Bu ilana başvur
                        <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M0 8h36" />
                          <path d="m30 2 6 6-6 6" />
                        </svg>
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="basvuru" className="scroll-mt-28 bg-[#11161b]" delay={60}>
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 text-white sm:px-6 sm:py-20 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <div className="border-l border-[#ef783e]/45 pl-6">
                <p className="text-xs font-semibold uppercase text-[#ef783e]">
                  {page.formEyebrow}
                </p>
                <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.95] sm:text-6xl">
                  {page.formTitle}
                </h2>
                <p className="mt-8 max-w-md text-base leading-8 text-white/68">
                  {page.formDescription}
                </p>
              </div>

              <div className="relative mt-10 min-h-[360px] overflow-hidden bg-white [clip-path:polygon(0_0,100%_0,100%_86%,86%_100%,0_100%)]">
                <Image
                  src={formImage}
                  alt="Shinko insan kaynakları başvurusu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-[#11161b]/30" />
                <div className="absolute bottom-0 right-0 h-20 w-20 bg-[#ef783e]" />
              </div>
            </div>

            <div className="border border-white/10 bg-white p-6 text-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
              <CareerApplicationForm
                positionOptions={applicationPositionOptions}
                labels={{
                  fullNamePlaceholder: page.formFullNamePlaceholder,
                  phonePlaceholder: page.formPhonePlaceholder,
                  emailPlaceholder: page.formEmailPlaceholder,
                  positionPlaceholder: page.formPositionPlaceholder,
                  cityPlaceholder: page.formCityPlaceholder,
                  shiftPlaceholder: page.formShiftPlaceholder,
                  experiencePlaceholder: page.formExperiencePlaceholder,
                  notePlaceholder: page.formNotePlaceholder,
                  cvEyebrow: page.formCvEyebrow,
                  cvDefaultLabel: page.formCvDefaultLabel,
                  cvButtonLabel: page.formCvButtonLabel,
                  cvHelpText: page.formCvHelpText,
                  kvkkText: page.formKvkkText,
                  submitLabel: page.formSubmitLabel,
                  submittingLabel: page.formSubmittingLabel,
                  successMessage: page.formSuccessMessage,
                }}
              />
            </div>
          </div>
        </Reveal>
      </main>

      <Footer globalContent={globalContent} />
    </div>
  );
}
