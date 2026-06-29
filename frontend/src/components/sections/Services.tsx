"use client";

import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { Reveal } from "@/components/ui/Reveal";
import {
  defaultGlobalContent,
  defaultHomePageContent,
  type GlobalContent,
  type HomePageContent,
} from "@/lib/site-content";

type ServicesProps = {
  globalContent?: Partial<GlobalContent>;
  homeContent?: HomePageContent;
};

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

function splitLines(value: string | null | undefined) {
  return value
    ? value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    : [];
}

export function Services({ globalContent, homeContent = defaultHomePageContent }: ServicesProps) {
  const contact = {
    ...defaultGlobalContent,
    ...globalContent,
  };
  const home = {
    ...defaultHomePageContent,
    ...homeContent,
  };
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  const sectorHighlights = [
    {
      title: "Otomotiv",
      href: "/uretim#otomotiv",
      subtitle: "Aydınlatma & Trim Parçaları",
      body: "Aydınlatma bileşenleri, iç-dış trim ve fonksiyonel plastik parçalar için yüksek hassasiyetli seri üretim.",
      features: ["Aydınlatma parçaları", "İç-dış trim ürünleri", "Fonksiyonel komponentler"],
      gradient: "linear-gradient(135deg,#1A0800,#2D0E00,#0A0A0A)",
      dot: "#ff4500",
      featureColor: "#c93600",
      icon: (
        <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 29h32l-4-10H12L8 29Z" />
          <path d="M13 29v5M35 29v5M15 34h2M31 34h2M15 19l4-6h10l4 6" />
          <circle cx="16" cy="29" r="3" />
          <circle cx="32" cy="29" r="3" />
        </svg>
      ),
    },
    {
      title: "Elektrik Grubu",
      href: "/uretim#elektrik-grubu",
      subtitle: "Elektronik Bileşenler",
      body: "Elektrik ve elektronik uygulamalar için güvenilir plastik çözümler; yalıtım, koruma ve dayanıklı gövde tasarımları.",
      features: ["Anahtar-priz grubu", "Koruyucu kapaklar", "Elektronik gövde parçaları"],
      gradient: "linear-gradient(135deg,#0D0A00,#1F1600,#0A0A0A)",
      dot: "#f59e0b",
      featureColor: "#a86500",
      icon: (
        <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M27 5 12 28h12l-3 15 15-24H24l3-14Z" />
        </svg>
      ),
    },
    {
      title: "Beyaz Eşya",
      href: "/uretim#beyaz-esya",
      subtitle: "Dayanıklı Plastik Komponentler",
      body: "Gövde, bağlantı, kapak, taşıyıcı ve fonksiyonel plastik parçalar için ölçeklenebilir üretim altyapısı.",
      features: ["Gövde ve kapak parçaları", "Bağlantı elemanları", "Fonksiyonel komponentler"],
      gradient: "linear-gradient(135deg,#06111F,#0B1D33,#0A0A0A)",
      dot: "#38bdf8",
      featureColor: "#036b9c",
      icon: (
        <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M10 8h28v32H10V8Z" />
          <path d="M15 14h18M15 20h18M18 32h12" />
          <circle cx="24" cy="28" r="2" />
        </svg>
      ),
    },
    {
      title: "Bahçe Ekipmanları",
      href: "/uretim#bahce-ekipmanlari",
      subtitle: "Dış Ortam & Su Yönetimi",
      body: "UV dirençli, hava koşullarına karşı güçlü dış ortam ürünleri ve su yönetim plastik parçaları.",
      features: ["Su yönetim parçaları", "Dış ortam ürünleri", "Teknik gövdeler"],
      gradient: "linear-gradient(135deg,#001A08,#00200A,#0A0A0A)",
      dot: "#22c55e",
      featureColor: "#137a35",
      icon: (
        <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M24 39V24" />
          <path d="M24 25c-9 0-14-5-14-14 9 0 14 5 14 14Z" />
          <path d="M25 27c8 0 13-5 13-13-8 0-13 5-13 13Z" />
          <path d="M14 39h20" />
        </svg>
      ),
    },
    {
      title: "Sektörel Özel Çözümler",
      href: "/uretim#sektorel-ozel-cozumler",
      subtitle: "Plastik Enjeksiyon Gereken Her Alan",
      body: "Belirli sektörlerle sınırlı kalmadan teknik plastik parça ihtiyacı olan projelere kalıp, enjeksiyon ve montaj desteği.",
      features: ["Endüstriyel ürünler", "Ambalaj sistemleri", "Montaj hizmetleri"],
      gradient: "linear-gradient(135deg,#141414,#242424,#0A0A0A)",
      dot: "#ff8c00",
      featureColor: "#c96500",
      icon: (
        <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="m24 6 15 8v20l-15 8-15-8V14l15-8Z" />
          <path d="m9 14 15 8 15-8M24 22v20" />
          <path d="m16 18 16 8M32 18 16 26" />
        </svg>
      ),
    },
  ];
  const cmsSectorHighlights = home.sectorSolutionCards.map((item, index) => {
    const fallback = sectorHighlights[index] || sectorHighlights[sectorHighlights.length - 1];

    return {
      ...fallback,
      ...item,
      body: item.description || fallback.body,
      dot: item.dotColor || fallback.dot,
      icon: fallback.icon,
    };
  });
  const [sectorHighlightCard, qualityHighlightCard] = home.highlightCards;
  const sectorSectionEyebrow =
    home.sectorSectionEyebrow || defaultHomePageContent.sectorSectionEyebrow;
  const sectorSectionTitle =
    home.sectorSectionTitle || defaultHomePageContent.sectorSectionTitle;
  const sectorSectionDescription =
    home.sectorSectionDescription || defaultHomePageContent.sectorSectionDescription;
  const sectorSectionLinkLabel =
    home.sectorSectionLinkLabel || defaultHomePageContent.sectorSectionLinkLabel;
  const sectorSectionLinkHref =
    home.sectorSectionLinkHref || defaultHomePageContent.sectorSectionLinkHref;
  const contactSummaryEyebrow =
    home.contactSummaryEyebrow || defaultHomePageContent.contactSummaryEyebrow;
  const contactSummaryTitle =
    home.contactSummaryTitle || defaultHomePageContent.contactSummaryTitle;
  const contactSummaryAccentTitle =
    home.contactSummaryAccentTitle || defaultHomePageContent.contactSummaryAccentTitle;
  const contactSummaryDescription =
    home.contactSummaryDescription || defaultHomePageContent.contactSummaryDescription;
  const contactSummaryMapLabel =
    home.contactSummaryMapLabel || defaultHomePageContent.contactSummaryMapLabel;
  const contactSummaryContactLabel =
    home.contactSummaryContactLabel || defaultHomePageContent.contactSummaryContactLabel;

  return (
    <>
      <Reveal
        as="section"
        id="sektorel-cozumler"
        className={`${manrope.className} bg-white`}
        delay={105}
      >
        <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10 sm:gap-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-[#ff4500]" />
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff4500] sm:text-base sm:tracking-[0.24em]">
                  {sectorSectionEyebrow}
                </p>
              </div>
              <h2 className="max-w-3xl text-[2.15rem] font-semibold uppercase leading-[0.98] text-slate-950 sm:text-5xl">
                {splitLines(sectorSectionTitle).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg sm:leading-9">
                {sectorSectionDescription}
              </p>
            </div>

            <Link
              href={sectorSectionLinkHref}
              className="inline-flex items-center gap-3 text-sm font-semibold text-slate-500 transition-colors hover:text-[#ff4500]"
            >
              {sectorSectionLinkLabel}
              <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M0 8h36" />
                <path d="m30 2 6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {cmsSectorHighlights.map((item, index) => (
              <Reveal key={item.title} className="h-full" delay={140 + index * 60}>
                <Link
                  href={item.href}
                  className="shinko-product-card flex h-full min-h-[430px] rounded-2xl p-4 text-left shadow-[0_8px_32px_rgba(0,0,0,0.14)] sm:min-h-[560px] sm:rounded-3xl sm:p-8"
                  style={{ background: item.gradient }}
                >
                  <div className="shinko-product-card-content flex h-full w-full flex-col">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-white sm:mb-6 sm:h-12 sm:w-12 sm:rounded-2xl">
                      {item.icon}
                    </div>
                    <span
                      className="mb-4 block h-0.5 w-7 rounded-full"
                      style={{ backgroundColor: item.dot }}
                    />
                    <h3 className="min-h-20 text-[1.05rem] font-bold uppercase leading-[1.12] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] sm:min-h-28 sm:text-[1.65rem] sm:leading-[1.08]">
                      {item.title}
                    </h3>
                    <p className="min-h-12 text-[0.78rem] font-bold leading-5 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:min-h-14 sm:text-base sm:leading-6">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-[0.8rem] font-medium leading-5 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-base sm:leading-7">
                      {item.body}
                    </p>
                    <div className="mt-auto grid gap-2 pb-10 pt-4 sm:pb-11 sm:pt-6">
                      {item.features.map((feature) => (
                        <span
                          key={feature}
                          className="flex min-h-9 items-center rounded-full border px-3 py-2 text-[0.72rem] font-extrabold leading-4 text-white shadow-[0_5px_16px_rgba(0,0,0,0.24)] [text-shadow:0_1px_5px_rgba(0,0,0,0.45)] sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-[0.95rem] sm:leading-5"
                          style={{
                            backgroundColor: item.featureColor,
                            borderColor: item.dot,
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white sm:bottom-6 sm:right-6 sm:h-9 sm:w-9">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal
        as="section"
        id="kalite"
        className={`${manrope.className} bg-[#080a0d]`}
        delay={120}
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-[#ff6818]" />
            <p className="text-base font-bold uppercase tracking-[0.24em] text-[#ff7a22]">
              Sektörler & Kalite
            </p>
          </div>

          <div className="grid items-stretch gap-4 lg:grid-cols-2">
            <Reveal className="h-full" delay={160}>
              <article className="shinko-lift relative flex min-h-[560px] h-full overflow-hidden border border-white/12 bg-[#111419]">
                <Image
                  src={sectorHighlightCard?.image || home.sectorHighlightImage}
                  alt={sectorHighlightCard?.title || "Otomotiv sektörü"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.96)_0%,rgba(8,10,13,0.84)_42%,rgba(8,10,13,0.22)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(8,10,13,0.9)_100%)]" />

                <div className="relative z-10 flex max-w-xl flex-col justify-end p-8 sm:p-10 lg:p-12">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#ff6818] text-white">
                    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 29h32l-4-10H12L8 29Z" />
                      <path d="M13 29v5M35 29v5M15 19l4-6h10l4 6" />
                      <circle cx="16" cy="29" r="3" />
                      <circle cx="32" cy="29" r="3" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff7a22]">
                    {sectorHighlightCard?.eyebrow || "Sektörler"}
                  </p>
                  <h3 className="mt-5 text-4xl font-bold uppercase leading-[0.95] text-white sm:text-5xl">
                    {splitLines(sectorHighlightCard?.title || "Global Otomotiv\nTedarikçisi").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-6 max-w-lg text-lg font-semibold leading-8 text-white">
                    {sectorHighlightCard?.description}
                  </p>
                  <Link
                    href={sectorHighlightCard?.linkHref || "/uretim"}
                    className="mt-8 inline-flex w-fit items-center gap-4 border-b-2 border-[#ff6818] pb-3 text-sm font-bold uppercase tracking-[0.2em] text-white"
                  >
                    {sectorHighlightCard?.linkLabel || "Sektörlerimiz"}
                    <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M0 8h36" />
                      <path d="m30 2 6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal className="h-full" delay={230}>
              <article className="shinko-lift relative flex min-h-[560px] h-full overflow-hidden border border-white/12 bg-[#111419]">
                <Image
                  src={qualityHighlightCard?.image || home.qualityHighlightImage}
                  alt={qualityHighlightCard?.title || "Kalite süreci"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,13,0.96)_0%,rgba(8,10,13,0.84)_42%,rgba(8,10,13,0.22)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(8,10,13,0.9)_100%)]" />

                <div className="relative z-10 flex max-w-xl flex-col justify-end p-8 sm:p-10 lg:p-12">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#ff6818] text-white">
                    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M24 7 38 12v10c0 9-6 14-14 18-8-4-14-9-14-18V12l14-5Z" />
                      <path d="m17 24 5 5 10-12" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#ff7a22]">
                    {qualityHighlightCard?.eyebrow || "Kalite"}
                  </p>
                  <h3 className="mt-5 text-4xl font-bold uppercase leading-[0.95] text-white sm:text-5xl">
                    {splitLines(qualityHighlightCard?.title || "Kalite Bir\nSöz Değil,\nSüreçtir").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-6 max-w-lg text-lg font-semibold leading-8 text-white">
                    {qualityHighlightCard?.description}
                  </p>
                  <Link
                    href={qualityHighlightCard?.linkHref || "/kalite"}
                    className="mt-8 inline-flex w-fit items-center gap-4 border-b-2 border-[#ff6818] pb-3 text-sm font-bold uppercase tracking-[0.2em] text-white"
                  >
                    {qualityHighlightCard?.linkLabel || "Kalite Politikamız"}
                    <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M0 8h36" />
                      <path d="m30 2 6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="iletisim-ozet" className="bg-[#f6f3ee]" delay={140}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
          <div className="relative overflow-hidden rounded-[30px] bg-[#11161b] p-8 text-white shadow-[0_12px_40px_rgba(0,0,0,0.16)] sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-36 -top-32 h-96 w-96 rounded-full bg-[#ff4500]/18 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#ff8c00]/10 blur-[90px]" />

            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-7 bg-[#ff4500]" />
                  <p className="text-base font-bold uppercase tracking-[0.24em] text-[#ff8c40]">
                    {contactSummaryEyebrow}
                  </p>
                </div>

                <h2 className="max-w-2xl text-4xl font-semibold uppercase leading-[0.98] text-white sm:text-5xl">
                  {contactSummaryTitle}
                  <br />
                  <span className="text-[#ff8c40]">{contactSummaryAccentTitle}</span>
                </h2>

                <p className="mt-7 max-w-xl text-base leading-8 text-white/68">
                  {contactSummaryDescription}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/8 p-6 sm:p-7">
                <div className="flex gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ff4500]/18 text-[#ff8c40]">
                    <svg viewBox="0 0 48 48" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M24 42s14-12 14-25A14 14 0 0 0 10 17c0 13 14 25 14 25Z" />
                      <circle cx="24" cy="17" r="5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/38">
                      Adres
                    </p>
                    <p className="mt-3 text-base leading-8 text-white/82">
                      {contact.address}
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 rounded-2xl bg-white/6 px-4 py-4 text-sm font-semibold text-white/76 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg viewBox="0 0 48 48" className="h-4 w-4 text-[#ff8c40]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M33 41c-8-2-14-6-18-12S8 17 7 9c0-2 1-3 3-3h6l3 9-4 3c2 5 5 8 10 10l3-4 9 3v6c0 2-1 3-4 3Z" />
                    </svg>
                    {contact.phone}
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 rounded-2xl bg-white/6 px-4 py-4 text-sm font-semibold text-white/76 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg viewBox="0 0 48 48" className="h-4 w-4 text-[#ff8c40]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 13h32v24H8V13Z" />
                      <path d="m9 15 15 13 15-13" />
                    </svg>
                    {contact.email}
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#ff4500] px-6 py-4 text-sm font-semibold uppercase text-white shadow-[0_8px_24px_rgba(255,69,0,0.24)] transition-colors hover:bg-[#ef783e]"
                >
                    {contactSummaryMapLabel}
                    <svg viewBox="0 0 40 16" className="h-4 w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M0 8h36" />
                      <path d="m30 2 6 6-6 6" />
                    </svg>
                  </a>

                  <Link
                    href="/iletisim"
                  className="inline-flex items-center gap-3 border border-white/18 bg-white/8 px-6 py-4 text-sm font-semibold uppercase text-white transition-colors hover:border-[#ff8c40] hover:bg-white/12"
                >
                    {contactSummaryContactLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

    </>
  );
}
