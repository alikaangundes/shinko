import Image from "next/image";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectorImageCarousel } from "@/components/sections/SectorImageCarousel";
import { ToolingImageCarousel } from "@/components/sections/ToolingImageCarousel";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { Reveal } from "@/components/ui/Reveal";
import { resolveMediaList, resolveMediaUrl } from "@/lib/strapi-media";
import { getGlobalContent, getProductionPageContent } from "@/lib/strapi";

type MachineCard = {
  name: string;
  image: string;
};

type ErpSolutionCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

type SectorCard = {
  title: string;
  id: string;
  subtitle: string;
  description: string;
  features: string[];
  images: string[];
  gradient: string;
  dot: string;
  icon: ReactNode;
};

type CmsProductionFields = {
  machineCards?: Array<{
    name?: string;
    image?: unknown;
  }>;
  toolingMachines?: Array<{
    title?: string;
  }>;
  toolingGallery?: unknown;
  erpSolutionCards?: Array<{
    title?: string;
    description?: string;
    image?: unknown;
    imageAlt?: string;
    featured?: boolean;
  }>;
  sectorCards?: Array<{
    title?: string;
    anchorId?: string;
    subtitle?: string;
    description?: string;
    features?: unknown;
    images?: unknown;
    gradient?: string;
    accentColor?: string;
  }>;
};

function isFilledArray<T>(value: T[] | undefined): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

function normalizeFeatures(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const features = value
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (item && typeof item === "object" && "text" in item && typeof item.text === "string") {
        return item.text;
      }

      return "";
    })
    .map((item) => item.trim())
    .filter(Boolean);

  return features.length > 0 ? features : fallback;
}

function toAnchorId(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapMachineCards(
  cards: CmsProductionFields["machineCards"],
  fallback: MachineCard[],
) {
  if (!isFilledArray(cards)) {
    return fallback;
  }

  const mapped = cards
    .map((card, index) => {
      const fallbackCard = fallback[index] || fallback[0];
      const name = card.name?.trim() || fallbackCard.name;
      const image = resolveMediaUrl(card.image, fallbackCard.image);

      return { name, image };
    })
    .filter((card) => card.name && card.image);

  return mapped.length > 0 ? mapped : fallback;
}

function mapToolingMachines(
  machines: CmsProductionFields["toolingMachines"],
  fallback: string[],
) {
  if (!isFilledArray(machines)) {
    return fallback;
  }

  const mapped = machines
    .map((machine) => machine.title?.trim())
    .filter((machine): machine is string => Boolean(machine));

  return mapped.length > 0 ? mapped : fallback;
}

function mapErpSolutionCards(
  cards: CmsProductionFields["erpSolutionCards"],
  fallback: ErpSolutionCard[],
) {
  if (!isFilledArray(cards)) {
    return fallback;
  }

  const mapped = cards.map((card, index) => {
    const fallbackCard = fallback[index] || fallback[0];

    return {
      title: card.title?.trim() || fallbackCard.title,
      description: card.description?.trim() || fallbackCard.description,
      image: resolveMediaUrl(card.image, fallbackCard.image),
      imageAlt: card.imageAlt?.trim() || fallbackCard.imageAlt,
      featured: card.featured ?? fallbackCard.featured,
    };
  });

  return mapped.length > 0 ? mapped : fallback;
}

function mapSectorCards(
  cards: CmsProductionFields["sectorCards"],
  fallback: SectorCard[],
) {
  if (!isFilledArray(cards)) {
    return fallback;
  }

  const mapped = cards.map((card, index) => {
    const fallbackCard = fallback[index] || fallback[fallback.length - 1];
    const title = card.title?.trim() || fallbackCard.title;

    return {
      title,
      id: card.anchorId?.trim() || fallbackCard.id || toAnchorId(title),
      subtitle: card.subtitle?.trim() || fallbackCard.subtitle,
      description: card.description?.trim() || fallbackCard.description,
      features: normalizeFeatures(card.features, fallbackCard.features),
      images: resolveMediaList(card.images, fallbackCard.images),
      gradient: card.gradient?.trim() || fallbackCard.gradient,
      dot: card.accentColor?.trim() || fallbackCard.dot,
      icon: fallbackCard.icon,
    };
  });

  return mapped.length > 0 ? mapped : fallback;
}

export default async function UretimPage() {
  const [globalContent, pageContent] = await Promise.all([
    getGlobalContent(),
    getProductionPageContent(),
  ]);
  const page = pageContent.content;
  const cmsPage = pageContent as typeof pageContent & CmsProductionFields & {
    machinesDescription?: string;
    machineGroups?: Array<{
      minTonnage?: number;
      maxTonnage?: number;
      count?: number;
      description?: string;
      percent?: number;
    }>;
  };
  const fallbackMachineGroups = [
    { minTonnage: 80, maxTonnage: 250, count: 31, description: "Hassas ve seri plastik parça üretimi", percent: 70 },
    { minTonnage: 280, maxTonnage: 650, count: 10, description: "Orta ve yüksek hacimli üretim", percent: 23 },
    { minTonnage: 1050, maxTonnage: 1800, count: 3, description: "Büyük parça ve yüksek tonajlı üretim", percent: 7 },
  ];
  const machineGroups = isFilledArray(cmsPage.machineGroups)
    ? cmsPage.machineGroups.map((group, index) => {
        const fallbackGroup = fallbackMachineGroups[index] || fallbackMachineGroups[0];

        return {
          minTonnage: group.minTonnage ?? fallbackGroup.minTonnage,
          maxTonnage: group.maxTonnage ?? fallbackGroup.maxTonnage,
          count: group.count ?? fallbackGroup.count,
          description: group.description?.trim() || fallbackGroup.description,
          percent: group.percent ?? fallbackGroup.percent,
        };
      })
    : fallbackMachineGroups;
  const fallbackMachineCards = [
    {
      name: "WINTECH",
      image: "/shinko/uretim/ChatGPT%20Image%2014%20Haz%202026%2019_59_44.png",
    },
    {
      name: "HAITIAN",
      image: "/shinko/uretim/a_digital_photograph_features_a_large_injection_mo.png",
    },
    {
      name: "KRAUSSMAFFEI",
      image: "/shinko/uretim/a_high_resolution_digital_photograph_showcases_a_f.png",
    },
  ];
  const machineCards = mapMachineCards(cmsPage.machineCards, fallbackMachineCards);
  const fallbackToolingItems = [
    "Sodick Tel Erezyon",
    "Oscarmax S860 CNC Dalma Erezyon",
    "Ares Seiki CNC Dik İşleme",
    "AWEA Köprü İşleme Merkezi",
    "DMG Mori CMX70U",
    "Quaser CNC İşleme",
    "YCM CNC Dik İşleme",
  ];
  const toolingItems = mapToolingMachines(cmsPage.toolingMachines, fallbackToolingItems);
  const fallbackToolingImages = [
    "/shinko/uretim/Kaliphane/AA.jpeg",
    "/shinko/uretim/Kaliphane/BB.jpeg",
    "/shinko/uretim/Kaliphane/CC.jpeg",
    "/shinko/uretim/Kaliphane/DD.jpeg",
    "/shinko/uretim/Kaliphane/EE.jpeg",
    "/shinko/uretim/Kaliphane/FF.jpeg",
    "/shinko/uretim/Kaliphane/GG.jpeg",
    "/shinko/uretim/picture (22 of 38).jpg",
    "/shinko/uretim/picture (25 of 38).jpg",
    "/shinko/uretim/picture (26 of 38).jpg",
    "/shinko/uretim/picture (29 of 38).jpg",
    "/shinko/uretim/picture (31 of 38).jpg",
    "/shinko/uretim/picture (32 of 38).jpg",
    "/shinko/uretim/picture (33 of 38).jpg",
  ];
  const toolingImages = resolveMediaList(cmsPage.toolingGallery, fallbackToolingImages);
  const fallbackErpSolutionCards = [
    {
      title: "Kalıp Yönetim Sistemi",
      description:
        "ERPIS ProMOULD MMS, kalıp üretimi ve takibinde karmaşık ve zor yapıyı giderme ve izleme imkanı sunar.",
      image: "/shinko/uretim/erp/kalip-yonetim.png",
      imageAlt: "Kalıp yönetim sistemi illüstrasyonu",
    },
    {
      title: "Enjeksiyon Yönetim Sistemi",
      description:
        "ERPIS ProINJECTION IMS, plastik enjeksiyon, şişirme, ekstrüzyon, paketleme ve montaj endüstrisi için eksiksiz bir MES çözümü sunar.",
      image: "/shinko/uretim/erp/enjeksiyon-yonetim.png",
      imageAlt: "Enjeksiyon yönetim sistemi illüstrasyonu",
      featured: true,
    },
    {
      title: "Üretim Yönetim Sistemi",
      description:
        "ERPIS ProVISION MES, siparişten nihai ürüne kadar üretimin her aşamasını rahatlıkla yönetebileceğiniz bir yazılımdır.",
      image: "/shinko/uretim/erp/uretim-yonetim.png",
      imageAlt: "Üretim yönetim sistemi illüstrasyonu",
    },
  ];
  const erpSolutionCards = mapErpSolutionCards(cmsPage.erpSolutionCards, fallbackErpSolutionCards);
  const fallbackSectorCards = [
    {
      title: "Otomotiv",
      id: "otomotiv",
      subtitle: "Aydınlatma & Trim Parçaları",
      description:
        "Aydınlatma bileşenleri, iç-dış trim ve fonksiyonel plastik parçalar. Yüksek hassasiyetli seri üretim süreçleriyle otomotiv tedarik ihtiyaçlarını destekleriz.",
      features: ["Aydınlatma parçaları", "İç-dış trim ürünleri", "Fonksiyonel komponentler"],
      images: [
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_06_58 (1).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_06_58 (2).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_06_59 (3).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_06_59 (4).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_06_59 (5).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_06_59 (6).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_07_00 (7).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_07_00 (8).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_07_00 (9).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_10_52 (1).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_10_52 (2).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_10_52 (3).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_18_42 (1).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_18_42 (2).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 10_33_15.png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 14_23_09 (1).png",
        "/shinko/uretim/Otomotiv/ChatGPT Image 12 May 2026 14_23_11 (7).png",
      ],
      gradient: "linear-gradient(135deg,#1A0800,#2D0E00,#0A0A0A)",
      dot: "#ff4500",
      icon: (
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 29h32l-4-10H12L8 29Z" />
          <path d="M13 29v5M35 29v5M15 34h2M31 34h2M15 19l4-6h10l4 6" />
          <circle cx="16" cy="29" r="3" />
          <circle cx="32" cy="29" r="3" />
        </svg>
      ),
    },
    {
      title: "Elektrik Grubu",
      id: "elektrik-grubu",
      subtitle: "Elektronik Bileşenler",
      description:
        "Elektrik ve elektronik uygulamalar için güvenilir plastik çözümler. Yalıtım, koruma ve dayanıklı gövde tasarımlarını üretim disipliniyle yönetiriz.",
      features: ["Anahtar-priz grubu", "Koruyucu kapaklar", "Elektronik gövde parçaları"],
      images: [
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 14_23_10 (6).png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 14_23_11 (8).png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 14_23_12 (9).png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 14_57_37.png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 14_59_04.png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 15_11_45.png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 15_37_43.png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 15_39_51.png",
        "/shinko/uretim/Elektrik Grubu/ChatGPT Image 12 May 2026 15_43_42.png",
      ],
      gradient: "linear-gradient(135deg,#0D0A00,#1F1600,#0A0A0A)",
      dot: "#f59e0b",
      icon: (
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M27 5 12 28h12l-3 15 15-24H24l3-14Z" />
        </svg>
      ),
    },
    {
      title: "Beyaz Eşya",
      id: "beyaz-esya",
      subtitle: "Dayanıklı Plastik Komponentler",
      description:
        "Beyaz eşya sektöründe gövde, bağlantı, kapak, taşıyıcı ve fonksiyonel plastik parçalar için ölçeklenebilir üretim çözümleri sunarız.",
      features: ["Gövde ve kapak parçaları", "Bağlantı elemanları", "Fonksiyonel komponentler"],
      images: [
        "/shinko/uretim/Beyaz Eşya/Beyaz Eşya - 1.png",
        "/shinko/uretim/Beyaz Eşya/Beyaz Eşya - 2.png",
        "/shinko/uretim/Beyaz Eşya/Beyaz Eşya - 3.png",
        "/shinko/uretim/Beyaz Eşya/Beyaz Eşya - 4.png",
        "/shinko/uretim/Beyaz Eşya/Beyaz Eşya - 5.png",
      ],
      gradient: "linear-gradient(135deg,#06111F,#0B1D33,#0A0A0A)",
      dot: "#38bdf8",
      icon: (
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M10 8h28v32H10V8Z" />
          <path d="M15 14h18M15 20h18M18 32h12" />
          <circle cx="24" cy="28" r="2" />
        </svg>
      ),
    },
    {
      title: "Ev Aletleri",
      id: "ev-aletleri",
      subtitle: "Küçük Ev Aletleri & Teknik Gövdeler",
      description:
        "Küçük ev aletleri için teknik gövde, kapak, bağlantı ve fonksiyonel plastik parçaları yüksek hassasiyetli enjeksiyon süreçleriyle üretiriz.",
      features: ["Teknik gövde parçaları", "Kapak ve bağlantı elemanları", "Fonksiyonel plastik komponentler"],
      images: [
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 1.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 2.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 3.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 4.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 5.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 6.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 7.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 8.png",
        "/shinko/uretim/Ev Aletleri/Ev Aletleri - 9.png",
      ],
      gradient: "linear-gradient(135deg,#120B1F,#24113A,#0A0A0A)",
      dot: "#a78bfa",
      icon: (
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 20h26v17H12V20Z" />
          <path d="M18 20v-5h14v5" />
          <path d="M17 27h16" />
          <path d="M17 33h10" />
          <path d="M38 24h4v9h-4" />
          <path d="M20 15c0-4 8-4 8 0" />
        </svg>
      ),
    },
    {
      title: "Bahçe Ekipmanları",
      id: "bahce-ekipmanlari",
      subtitle: "Dış Ortam & Su Yönetimi",
      description:
        "UV dirençli, hava koşullarına karşı güçlü dış ortam ürünleri ve su yönetim plastik parçaları için teknik üretim altyapısı sağlarız.",
      features: ["Su yönetim parçaları", "Dış ortam ürünleri", "Teknik gövdeler"],
      images: [
        "/shinko/uretim/Bahçe Ekipmanları/ChatGPT Image 12 May 2026 14_23_09 (2).png",
        "/shinko/uretim/Bahçe Ekipmanları/ChatGPT Image 12 May 2026 14_23_10 (4).png",
      ],
      gradient: "linear-gradient(135deg,#001A08,#00200A,#0A0A0A)",
      dot: "#22c55e",
      icon: (
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M24 39V24" />
          <path d="M24 25c-9 0-14-5-14-14 9 0 14 5 14 14Z" />
          <path d="M25 27c8 0 13-5 13-13-8 0-13 5-13 13Z" />
          <path d="M14 39h20" />
        </svg>
      ),
    },
    {
      title: "Sektörel Özel Çözümler",
      id: "sektorel-ozel-cozumler",
      subtitle: "Plastik Enjeksiyon Gereken Her Alan",
      description:
        "Sektör bağımsız teknik plastik parça ihtiyacı olan projelerde kalıp, enjeksiyon ve montaj süreçlerini proje bazlı kurgularız.",
      features: ["Proje bazlı üretim", "Teknik plastik parçalar", "Kalıp + enjeksiyon + montaj"],
      images: [],
      gradient: "linear-gradient(135deg,#141414,#242424,#0A0A0A)",
      dot: "#ff8c00",
      icon: (
        <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="m24 6 15 8v20l-15 8-15-8V14l15-8Z" />
          <path d="m9 14 15 8 15-8M24 22v20" />
          <path d="m16 18 16 8M32 18 16 26" />
        </svg>
      ),
    },
  ];
  const sectorCards = mapSectorCards(cmsPage.sectorCards, fallbackSectorCards);
  const machineParkSection = (
    <Reveal as="section" id="makine-parkuru" className="relative scroll-mt-28 overflow-hidden bg-[#11161b] pt-[90px] lg:min-h-[100svh]" delay={80}>
      <div className="shinko-orb-reverse pointer-events-none absolute -right-32 top-8 z-0 h-[380px] w-[380px] rounded-full bg-[#ff4500]/18 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-16 text-white sm:px-6 sm:py-20 lg:flex lg:min-h-[calc(100svh-90px)] lg:flex-col lg:justify-center">
        <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:items-start xl:grid-cols-[0.26fr_0.74fr]">
          <div className="border-l border-[#ff4500]/45 pl-6">
            <p className="text-base font-bold uppercase tracking-[0.2em] text-[#ff8c40]">
              {page.machinesEyebrow}
            </p>
            <h2 className="mt-5 text-[clamp(3rem,13vw,4.5rem)] font-bold uppercase leading-[0.92] text-white sm:text-7xl">
              {page.machinesTitle}
            </h2>
            <p className="mt-8 max-w-md text-lg font-semibold leading-9 text-white">
              {cmsPage.machinesDescription}
            </p>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3">
            {machineCards.map((machine, index) => (
              <Reveal key={machine.name} className="relative z-0 h-full hover:z-30" delay={150 + index * 70}>
                <article className="group relative flex h-full min-h-[390px] flex-col overflow-visible border border-white/15 bg-white/[0.045] p-6 shadow-[0_10px_34px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.045] hover:border-[#ff4500] hover:shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
                  <div className="relative z-20 h-60 overflow-visible rounded-2xl bg-black/20 xl:h-64">
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 24vw"
                      className="rounded-2xl object-cover shadow-2xl shadow-black/20 transition-transform duration-700 ease-out group-hover:scale-125"
                    />
                  </div>
                  <p className="relative z-10 mt-auto pt-6 text-sm font-bold uppercase tracking-[0.16em] text-[#ff8c40]">
                    <AnimatedNumber value={index + 1} padStart={2} />
                  </p>
                  <h3 className="relative z-10 mt-3 min-h-14 break-words text-3xl font-bold uppercase leading-none text-white xl:text-4xl">
                    {machine.name}
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[28px] border border-white/10 bg-white/[0.04] p-7 sm:p-9">
          <h3 className="text-3xl font-bold uppercase text-white">
            <AnimatedNumber value={44} /> makine, <AnimatedNumber value={3} /> tonaj grubu
          </h3>
          <div className="mt-8 grid gap-7">
            {machineGroups.map((group, index) => (
              <div key={`${group.minTonnage}-${group.maxTonnage}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-bold text-white">
                    <AnimatedNumber value={group.minTonnage} />-<AnimatedNumber value={group.maxTonnage} /> T
                    <span className="ml-3 text-base font-bold text-white">
                      <AnimatedNumber value={group.count} /> Makine
                    </span>
                  </p>
                  <p className="text-base font-bold text-[#ff8c40]">
                    %<AnimatedNumber value={group.percent} />
                  </p>
                </div>
                <AnimatedProgressBar value={group.percent} delay={index * 180} className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10" />
                <p className="mt-2 text-base font-semibold text-white">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Navbar globalContent={globalContent} />

      <main>
        {machineParkSection}

        <section id="uretim-alanlari" className="relative scroll-mt-28 overflow-hidden bg-[#f6f3ee]">
          <div className="shinko-orb pointer-events-none absolute -left-44 top-12 h-[420px] w-[420px] rounded-full bg-[#ff6400]/16 blur-[110px]" />
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-[#ff4500]" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ef783e]">
                  {page.sectorsEyebrow}
                </p>
              </div>
              <h2 className="text-4xl font-semibold uppercase leading-[0.95] text-slate-950 sm:text-6xl">
                {(page.sectorsTitle || "Plastik enjeksiyon gereken\nher sektöre üretim gücü.")
                  .split("\n")
                  .map((line, index) => (
                    <span key={line} className={index === 1 ? "shinko-grad-text block" : "block"}>
                      {line}
                    </span>
                  ))}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
                {page.sectorsDescription ||
                  "Otomotiv, elektrik grubu, beyaz eşya, bahçe ekipmanları ve proje bazlı endüstriyel uygulamalar için yüksek hassasiyetli plastik enjeksiyon ürünleri üretilmektedir."}
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              {sectorCards.map((sector, index) => {
                const isReverse = index % 2 === 1;

                return (
                  <div key={sector.title}>
                    <article
                      id={sector.id}
                      className="shinko-product-card scroll-mt-28 overflow-hidden rounded-[28px] shadow-[0_8px_36px_rgba(0,0,0,0.14)]"
                      style={{ background: sector.gradient }}
                    >
                      <div className="relative z-10 grid lg:grid-cols-2">
                        <div className={`p-8 sm:p-10 lg:p-14 ${isReverse ? "lg:order-2" : ""}`}>
                          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-white">
                            {sector.icon}
                          </div>
                          <span
                            className="mb-5 block h-0.5 w-7 rounded-full"
                            style={{ backgroundColor: sector.dot }}
                          />
                          <h3 className="text-4xl font-bold uppercase leading-[1.05] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] sm:text-5xl">
                            {sector.title}
                          </h3>
                          <p className="mt-3 text-base font-bold leading-7 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:text-lg">
                            {sector.subtitle}
                          </p>
                          <p className="mt-5 max-w-lg text-lg font-medium leading-8 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                            {sector.description}
                          </p>

                          <div className="mt-8 grid gap-3">
                            {sector.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#ff8c40] bg-black/20 text-[#ff8c40]">
                                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m6 12 4 4 8-8" />
                                  </svg>
                                </span>
                                <span className="text-base font-bold leading-7 text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div
                          className={`relative flex min-h-[280px] items-center justify-center overflow-hidden bg-black/25 ${
                            isReverse ? "lg:order-1 lg:border-r lg:border-white/10" : "lg:border-l lg:border-white/10"
                          }`}
                        >
                          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
                          {sector.images.length > 0 ? (
                            <SectorImageCarousel
                              images={sector.images}
                              title={sector.title}
                              icon={sector.icon}
                            />
                          ) : (
                            <>
                              <div className="relative">
                                <div className="absolute -inset-10 rounded-full bg-[#ff4500]/18 blur-3xl" />
                                <div className="relative flex h-32 w-32 items-center justify-center rounded-[28px] bg-white/8 text-white/22">
                                  <div className="scale-[2.45]">
                                    {sector.icon}
                                  </div>
                                </div>
                              </div>
                              <p className="absolute inset-x-0 bottom-4 text-center text-xs font-semibold text-white/22">
                                Sektörel çözüm alanı
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Reveal as="section" className="overflow-hidden bg-[#f6f3ee]" delay={120}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ef783e]">
                {page.erpEyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-bold uppercase leading-[0.98] text-slate-950 sm:text-6xl">
                {page.erpTitle}
              </h2>
            </div>

            <div className="mt-14">
              <div className="grid items-center gap-8 lg:grid-cols-3 lg:gap-10">
                {erpSolutionCards.map((card, index) => (
                  <Reveal key={card.title} className="h-full" delay={160 + index * 80}>
                    <article
                      className={`shinko-lift relative flex h-full min-h-[470px] flex-col items-center rounded-[6px] bg-white px-7 pb-8 pt-8 text-center shadow-[0_18px_52px_rgba(15,21,27,0.08)] ${
                        card.featured ? "lg:-mt-12 lg:min-h-[520px] lg:pb-10 lg:pt-10" : ""
                      }`}
                    >
                      <div className="relative h-56 w-full max-w-[270px] sm:h-60">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 80vw, 250px"
                          className="object-contain"
                        />
                      </div>
                      <h3 className="mt-7 text-2xl font-bold leading-tight text-[#14145c]">
                        {card.title}
                      </h3>
                      <p className="mt-5 text-lg font-medium leading-8 text-slate-600">
                        {card.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[#ef783e]" delay={140}>
          <div className="mx-auto max-w-7xl px-5 py-16 text-white sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <p className="text-base font-bold uppercase tracking-[0.22em] text-slate-950">
                {page.toolingEyebrow}
              </p>
              <h2 className="mt-5 text-[clamp(2rem,9vw,2.6rem)] font-bold uppercase leading-[0.96] text-white sm:text-6xl lg:text-7xl">
                <span className="block sm:whitespace-nowrap">{page.toolingTitleLine1}</span>
                <span className="block">{page.toolingTitleLine2}</span>
              </h2>
              <p className="mt-7 max-w-2xl text-xl font-bold leading-9 text-slate-950">
                {page.toolingDescription}
              </p>
            </div>

            <div className="mt-10 grid gap-6 rounded-[34px] bg-[#11161b] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.26)] sm:p-7 lg:grid-cols-[0.52fr_0.48fr] lg:items-stretch">
              <div className="min-h-[420px]">
                <ToolingImageCarousel images={toolingImages} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {toolingItems.map((item) => (
                  <div key={item} className="shinko-glass-dark flex min-h-24 items-center border-white/20 bg-white/[0.06] p-6">
                    <p className="relative z-10 text-xl font-bold leading-8 text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer globalContent={globalContent} />
    </div>
  );
}
