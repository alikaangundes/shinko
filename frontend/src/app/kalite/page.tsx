import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import { getGlobalContent, getQualityPageContent } from "@/lib/strapi";
import { resolveMediaUrl } from "@/lib/strapi-media";

function CheckIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M8 24.5 19.5 36 40 13" />
      <path d="M24 4 42 11.5V23c0 10.5-7 17.5-18 21C13 40.5 6 33.5 6 23V11.5L24 4Z" />
    </svg>
  );
}

export default async function KalitePage() {
  const [globalContent, pageContent] = await Promise.all([
    getGlobalContent(),
    getQualityPageContent(),
  ]);
  const page = pageContent.content;
  const cmsPage = pageContent as typeof pageContent & {
    featureVideo?: unknown;
    certificates?: Array<{
      title?: string;
      image?: unknown;
    }>;
    qualityDevices?: Array<{
      label?: string;
      brand?: string;
    }>;
  };
  const qualityVideo = resolveMediaUrl(
    cmsPage.featureVideo,
    "/shinko/kalite/WhatsApp%20Video%202026-06-14%20at%2022.13.05.mp4",
  );
  const fallbackQualityDevices = [
    { label: "CMM Ölçüm Cihazı", brand: "HEXAGON" },
    { label: "Refleks Cihazı", brand: "DBM REFLEX" },
    { label: "Etüv Fırını", brand: "BINDER" },
    { label: "Yoğunluk Test Cihazı", brand: "BINDER" },
    { label: "Tansiyometre", brand: "AKSTEKNIK" },
    { label: "Dijital Komparatör", brand: "MITUTOYO" },
    { label: "Hassas Terazi", brand: "DENSI" },
    { label: "Dijital Mihengir", brand: "MITUTOYO" },
    { label: "Dijital Kuvvet Ölçer", brand: "LOYKA" },
    { label: "Quick Image 2D Optik Ölçüm", brand: "MITUTOYO" },
    { label: "Spektrofotometre", brand: "3NH" },
    { label: "Durometre Shore A", brand: "TRONIC" },
  ];
  const qualityDevices = Array.isArray(cmsPage.qualityDevices) && cmsPage.qualityDevices.length > 0
    ? cmsPage.qualityDevices
        .map((device, index) => {
          const fallbackDevice = fallbackQualityDevices[index] || fallbackQualityDevices[0];

          return {
            label: device.label?.trim() || fallbackDevice.label,
            brand: device.brand?.trim() || fallbackDevice.brand,
          };
        })
        .filter((device) => device.label)
    : fallbackQualityDevices;
  const certificates = Array.isArray(cmsPage.certificates) && cmsPage.certificates.length > 0
    ? cmsPage.certificates
        .map((certificate, index) => {
          const fallbackCertificate = page.certificates[index] || page.certificates[0];

          return {
            title: certificate.title?.trim() || fallbackCertificate.title,
            image: resolveMediaUrl(certificate.image, fallbackCertificate.image),
          };
        })
        .filter((certificate) => certificate.title && certificate.image)
    : page.certificates;

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Navbar globalContent={globalContent} />

      <main>
        <PageHero
          eyebrow={pageContent.heroEyebrow}
          title={pageContent.heroTitle}
          description={pageContent.heroDescription}
          image={pageContent.heroImage}
          imageAlt="Shinko kalite"
        />

        <Reveal as="section" className="relative overflow-hidden bg-[#f6f3ee]">
          <div className="shinko-orb pointer-events-none absolute -right-44 top-10 h-[420px] w-[420px] rounded-full bg-[#ff6400]/16 blur-[110px]" />
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase text-[#ef783e]">
                  {page.policyEyebrow}
                </p>
                <h2 className="mt-5 max-w-lg text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                  {page.policyTitle}
                </h2>
                <div className="mt-7 h-0.5 w-14 bg-[#ef783e]" />
                <h3 className="mt-7 text-xl font-bold text-slate-950">
                  {page.policyLeadTitle}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-8 text-slate-700">
                  {page.policyLeadDescription}
                </p>
              </div>

              <div className="grid auto-rows-fr items-stretch overflow-hidden border border-black/5 bg-white/70 shadow-[0_22px_60px_rgba(15,21,27,0.06)] sm:grid-cols-2">
                {page.policyItems.map((item, index) => (
                  <Reveal key={item} className="h-full" delay={120 + index * 55}>
                    <article className="shinko-glass shinko-lift group flex h-full min-h-[260px] flex-col justify-between border-b border-black/5 p-7 transition-colors hover:bg-white sm:border-r sm:even:border-r-0">
                      <div className="flex items-start justify-between gap-5">
                        <p className="relative z-10 text-3xl font-semibold text-[#ff4500]">
                          <AnimatedNumber value={index + 1} padStart={2} />
                        </p>
                        <div className="relative z-10 text-slate-300 transition-colors group-hover:text-[#ff4500]">
                          <CheckIcon />
                        </div>
                      </div>
                      <h3 className="relative z-10 mt-10 text-2xl font-semibold uppercase leading-tight text-slate-950 transition-colors group-hover:text-slate-950">
                        {item}
                      </h3>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="relative overflow-hidden bg-[#11161b]" delay={80}>
          <div className="shinko-orb-reverse pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#ff4500]/18 blur-[100px]" />
          <div className="mx-auto max-w-7xl px-5 py-16 text-white sm:px-6 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[0.56fr_0.44fr] lg:items-center">
              <div className="relative min-h-[430px] overflow-hidden bg-black">
                <video
                  src={qualityVideo}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Shinko kalite kontrol videosu"
                />
              </div>

              <div className="border-l border-[#ff4500]/45 pl-6">
                <p className="text-xs font-semibold uppercase text-[#ff8c40]">
                  {page.cmm.eyebrow}
                </p>
                <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.95] sm:text-6xl">
                  {page.cmm.title}
                </h2>
                <p className="mt-8 max-w-xl text-base leading-8 text-white/72">
                  {page.cmm.description}
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {page.cmmMetrics.map((metric, index) => (
                    <Reveal key={metric} delay={150 + index * 60}>
                      <div className="shinko-glass-dark p-5">
                        <p className="relative z-10 text-2xl font-semibold text-[#ff8c40]">
                          <AnimatedNumber value={index + 1} padStart={2} />
                        </p>
                        <p className="mt-3 text-xs font-semibold uppercase leading-5 text-white/82">
                          {metric}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[#f6f3ee]" delay={110}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ff4500]">
                {page.devicesEyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                {page.devicesTitle}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600">
                {page.devicesDescription}
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {qualityDevices.map((device, index) => (
                <Reveal key={`${device.label}-${device.brand}`} delay={130 + index * 35}>
                  <article className="shinko-glass shinko-lift p-5">
                    <div className="relative z-10 h-1 w-full bg-[linear-gradient(90deg,#ff4500,transparent)]" />
                    <div className="relative z-10 mt-5 flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#ff4500]/10 text-[#ff4500]">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-snug text-slate-950">
                          {device.label}
                        </h3>
                        <p className="mt-3 inline-flex bg-[#ff4500]/8 px-3 py-1 text-xs font-semibold text-[#c83200]">
                          Marka: {device.brand}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="sertifikalar" className="scroll-mt-28 bg-white" delay={120}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase text-[#ef783e]">
                  {page.certificatesEyebrow}
                </p>
                <h2 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                  {page.certificatesTitle}
                </h2>
                <div className="mt-7 h-0.5 w-14 bg-[#ef783e]" />
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-650 lg:justify-self-end">
                {page.certificatesDescription}
              </p>
            </div>

            <CertificateGallery certificates={certificates} />
          </div>
        </Reveal>
      </main>

      <Footer globalContent={globalContent} />
    </div>
  );
}
