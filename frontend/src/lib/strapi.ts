import {
  defaultGlobalContent,
  defaultHomePageContent,
  defaultSitePagesContent,
  type GlobalContent,
  type HomePageContent,
  type SitePageContent,
  type SitePageSlug,
} from "@/lib/site-content";
import { resolveMediaUrl } from "@/lib/strapi-media";

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";
const STRAPI_TIMEOUT_MS = 2500;
const HOME_PAGE_POPULATE_QUERY = [
  "populate[heroVideo]=true",
  "populate[productionStats]=true",
  "populate[productionFeatures][populate]=image",
  "populate[sectorSolutionCards]=true",
  "populate[highlightCards][populate]=image",
].join("&");
const SITE_PAGE_POPULATE_QUERY = [
  "populate[heroMedia]=true",
  "populate[missionImage]=true",
  "populate[visionImage]=true",
  "populate[environmentImage]=true",
  "populate[formImage]=true",
  "populate[featureVideo]=true",
  "populate[certificates][populate]=image",
  "populate[qualityDevices]=true",
  "populate[galleryImages]=true",
  "populate[machineCards][populate]=image",
  "populate[toolingMachines]=true",
  "populate[toolingGallery]=true",
  "populate[erpSolutionCards][populate]=image",
  "populate[sectorCards][populate]=images",
].join("&");
const CORPORATE_PAGE_POPULATE_QUERY = [
  "populate[hero][populate]=image",
  "populate[mission][populate][points]=true",
  "populate[mission][populate][image]=true",
  "populate[vision][populate][points]=true",
  "populate[vision][populate][image]=true",
  "populate[environmentPolicy][populate][points]=true",
  "populate[environmentPolicy][populate][image]=true",
].join("&");
const PRODUCTION_PAGE_POPULATE_QUERY = [
  "populate[hero][populate]=image",
  "populate[machineCards][populate]=image",
  "populate[machineGroups]=true",
  "populate[sectorCards][populate][features]=true",
  "populate[sectorCards][populate][images]=true",
  "populate[erpSolutionCards][populate]=image",
  "populate[erpBlocks]=true",
  "populate[toolingGallery]=true",
  "populate[toolingMachines]=true",
  "populate[factoryImages]=true",
].join("&");
const QUALITY_PAGE_POPULATE_QUERY = [
  "populate[hero][populate]=image",
  "populate[policyItems]=true",
  "populate[featureVideo]=true",
  "populate[cmmMetrics]=true",
  "populate[qualityDevices]=true",
  "populate[certificates][populate]=image",
].join("&");
const HUMAN_RESOURCES_PAGE_POPULATE_QUERY = [
  "populate[hero][populate]=image",
  "populate[introCards]=true",
  "populate[formImage]=true",
].join("&");
const CONTACT_PAGE_POPULATE_QUERY = [
  "populate[hero][populate]=image",
  "populate[contactDetails]=true",
  "populate[galleryImages]=true",
].join("&");

type SingleResponse<T> = {
  data?: T | null;
};

type CollectionResponse<T> = {
  data?: T[];
};

export type JobPosting = {
  id?: number;
  documentId?: string;
  title: string;
  department?: string;
  location?: string;
  workType?: string;
  type?: string;
  description?: string;
  requirements?: string[];
  sortOrder?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFilledArray<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

function asStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (isRecord(item) && typeof item.text === "string") {
        return item.text;
      }

      return "";
    })
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : fallback;
}

function readString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function mergePageHero<T extends SitePageSlug>(
  entry: Record<string, unknown>,
  fallback: SitePageContent<T>,
) {
  const hero = isRecord(entry.hero) ? entry.hero : {};

  return {
    heroEyebrow: readString(hero.eyebrow, fallback.heroEyebrow),
    heroTitle: readString(hero.title, fallback.heroTitle),
    heroDescription: readString(hero.description, fallback.heroDescription),
    heroImage: resolveMediaUrl(hero.image, fallback.heroImage),
  };
}

function asRecordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function mapComponentArray<T extends Record<string, unknown>>(
  value: unknown,
  fallback: T[],
  mapItem: (item: Record<string, unknown>, fallbackItem: T, index: number) => T,
) {
  const items = asRecordArray(value);

  if (items.length === 0) {
    return fallback;
  }

  return items.map((item, index) => mapItem(item, fallback[index] || fallback[0], index));
}

function mergeRepeatable<T extends Record<string, unknown>>(
  cmsItems: unknown,
  fallbackItems: T[],
  mapItem: (item: Record<string, unknown>, fallback: T, index: number) => T,
) {
  if (!isFilledArray<unknown>(cmsItems)) {
    return fallbackItems;
  }

  return fallbackItems.map((fallbackItem, index) => {
    const cmsItem = cmsItems[index];
    return mapItem(isRecord(cmsItem) ? cmsItem : {}, fallbackItem, index);
  });
}

async function fetchFromStrapi<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STRAPI_TIMEOUT_MS);

  try {
    const response = await fetch(`${STRAPI_URL}${path}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getGlobalContent(): Promise<GlobalContent> {
  const response = await fetchFromStrapi<
    SingleResponse<Partial<GlobalContent> & Record<string, unknown>>
  >(
    "/api/global?populate=*",
  );

  if (!response?.data) {
    return defaultGlobalContent;
  }

  return {
    ...defaultGlobalContent,
    ...response.data,
    logo: resolveMediaUrl(response.data.logo, defaultGlobalContent.logo),
    footerLogo: resolveMediaUrl(
      response.data.footerLogo,
      defaultGlobalContent.footerLogo,
    ),
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const response = await fetchFromStrapi<
    SingleResponse<Partial<HomePageContent> & Record<string, unknown>>
  >(
    `/api/home-page?${HOME_PAGE_POPULATE_QUERY}`,
  );

  if (!response?.data) {
    return defaultHomePageContent;
  }

  const entry = response.data;

  return {
    ...defaultHomePageContent,
    ...entry,
    heroVideo: resolveMediaUrl(entry.heroVideo, defaultHomePageContent.heroVideo),
    productionStats: mergeRepeatable(
      entry.productionStats,
      defaultHomePageContent.productionStats,
      (stat, fallbackStat) => ({
        ...fallbackStat,
        ...stat,
        value:
          typeof stat.value === "number"
            ? stat.value
            : fallbackStat.value,
        label:
          typeof stat.label === "string" && stat.label.trim()
            ? stat.label
            : fallbackStat.label,
        suffix:
          typeof stat.suffix === "string"
            ? stat.suffix
            : fallbackStat.suffix,
        iconKey:
          typeof stat.iconKey === "string" && stat.iconKey.trim()
            ? stat.iconKey
            : fallbackStat.iconKey,
      }),
    ),
    productionFeatures: mergeRepeatable(
      entry.productionFeatures,
      defaultHomePageContent.productionFeatures,
      (feature, fallbackFeature) => ({
        ...fallbackFeature,
        ...feature,
        image: resolveMediaUrl(feature.image, fallbackFeature.image),
      }),
    ),
    sectorSolutionCards: mergeRepeatable(
      entry.sectorSolutionCards,
      defaultHomePageContent.sectorSolutionCards,
      (card, fallbackCard) => ({
        ...fallbackCard,
        ...card,
        features: asStringArray(card.features, fallbackCard.features),
      }),
    ),
    highlightCards: mergeRepeatable(
      entry.highlightCards,
      defaultHomePageContent.highlightCards,
      (card, fallbackCard) => ({
        ...fallbackCard,
        ...card,
        image: resolveMediaUrl(card.image, fallbackCard.image),
      }),
    ),
  };
}

export async function getJobPostings(): Promise<JobPosting[]> {
  const response = await fetchFromStrapi<CollectionResponse<Record<string, unknown>>>(
    "/api/job-postings?filters[isActive][$eq]=true&populate[requirements]=true&sort[0]=sortOrder:asc&sort[1]=createdAt:desc",
  );

  if (!response?.data) {
    return [];
  }

  return response.data
    .filter(isRecord)
    .map((entry) => ({
      id: typeof entry.id === "number" ? entry.id : undefined,
      documentId: typeof entry.documentId === "string" ? entry.documentId : undefined,
      title: typeof entry.title === "string" ? entry.title : "",
      department: typeof entry.department === "string" ? entry.department : undefined,
      location: typeof entry.location === "string" ? entry.location : undefined,
      workType: typeof entry.workType === "string" ? entry.workType : undefined,
      type: typeof entry.workType === "string" ? entry.workType : undefined,
      description: typeof entry.description === "string" ? entry.description : undefined,
      requirements: asStringArray(entry.requirements),
      sortOrder: typeof entry.sortOrder === "number" ? entry.sortOrder : undefined,
    }))
    .filter((entry) => entry.title);
}

export async function getCorporatePageContent() {
  const fallback = defaultSitePagesContent.kurumsal;
  const response = await fetchFromStrapi<SingleResponse<Record<string, unknown>>>(
    `/api/corporate-page?${CORPORATE_PAGE_POPULATE_QUERY}`,
  );
  const entry = response?.data;

  if (!entry) {
    return fallback;
  }

  const mapFeature = (
    value: unknown,
    fallbackFeature: Record<string, unknown> & {
      eyebrow?: string;
      title?: string;
      body?: string;
      bodyTop?: string;
      bodyBottom?: string;
      points?: string[];
      image?: string;
    },
  ) => {
    const feature = isRecord(value) ? value : {};

    return {
      ...fallbackFeature,
      eyebrow: readString(feature.eyebrow, fallbackFeature.eyebrow),
      title: readString(feature.title, fallbackFeature.title),
      body: readString(feature.body, fallbackFeature.body),
      bodyTop: readString(feature.body, fallbackFeature.bodyTop),
      bodyBottom: readString(
        feature.secondaryBody,
        fallbackFeature.bodyBottom,
      ),
      points: asStringArray(feature.points, fallbackFeature.points),
      image: resolveMediaUrl(feature.image, fallbackFeature.image || ""),
    };
  };

  const mission = mapFeature(entry.mission, fallback.content.mission);
  const vision = mapFeature(entry.vision, fallback.content.vision);
  const environment = mapFeature(
    entry.environmentPolicy,
    fallback.content.environment,
  );

  return {
    ...fallback,
    ...mergePageHero(entry, fallback),
    content: {
      ...fallback.content,
      mission,
      vision,
      environment,
    },
    missionImage: mission.image,
    visionImage: vision.image,
    environmentImage: environment.image,
  };
}

export async function getProductionPageContent() {
  const fallback = defaultSitePagesContent.uretim;
  const response = await fetchFromStrapi<SingleResponse<Record<string, unknown>>>(
    `/api/production-page?${PRODUCTION_PAGE_POPULATE_QUERY}`,
  );
  const entry = response?.data;

  if (!entry) {
    return fallback;
  }

  const content = {
    ...fallback.content,
    machinesEyebrow: readString(entry.machinesEyebrow, fallback.content.machinesEyebrow),
    machinesTitle: readString(entry.machinesTitle, fallback.content.machinesTitle),
    sectorsEyebrow: readString(entry.sectorsEyebrow, fallback.content.sectorsEyebrow),
    sectorsTitle: readString(entry.sectorsTitle, ""),
    sectorsDescription: readString(entry.sectorsDescription, ""),
    erpEyebrow: readString(entry.erpEyebrow, fallback.content.erpEyebrow),
    erpTitle: readString(entry.erpTitle, fallback.content.erpTitle),
    toolingEyebrow: readString(entry.toolingEyebrow, "Entegre Kalıp Üretim Altyapısı"),
    toolingTitleLine1: readString(entry.toolingTitleLine1, "Enjeksiyon Kalıpları"),
    toolingTitleLine2: readString(entry.toolingTitleLine2, "İmalat ve Bakım"),
    toolingDescription: readString(
      entry.toolingDescription,
      "Kalıp imalatı, bakım ve revizyon operasyonları aynı üretim disiplini içinde yönetilir.",
    ),
    factoryEyebrow: readString(entry.factoryEyebrow, fallback.content.factoryEyebrow),
    factoryTitle: readString(entry.factoryTitle, fallback.content.factoryTitle),
  };

  return {
    ...fallback,
    ...mergePageHero(entry, fallback),
    content,
    machinesDescription: readString(
      entry.machinesDescription,
      "44 enjeksiyon makinesi ve 80-1.800 ton aralığındaki üretim kapasitemiz, farklı ölçeklerdeki plastik parça üretimini destekler.",
    ),
    machineCards: entry.machineCards,
    machineGroups: entry.machineGroups,
    sectorCards: entry.sectorCards,
    erpSolutionCards: entry.erpSolutionCards,
    erpBlocks: entry.erpBlocks,
    toolingGallery: entry.toolingGallery,
    toolingMachines: entry.toolingMachines,
    factoryImages: entry.factoryImages,
  };
}

export async function getQualityPageContent() {
  const fallback = defaultSitePagesContent.kalite;
  const response = await fetchFromStrapi<SingleResponse<Record<string, unknown>>>(
    `/api/quality-page?${QUALITY_PAGE_POPULATE_QUERY}`,
  );
  const entry = response?.data;

  if (!entry) {
    return fallback;
  }

  const cmm = {
    ...fallback.content.cmm,
    eyebrow: readString(entry.cmmEyebrow, fallback.content.cmm.eyebrow),
    title: readString(entry.cmmTitle, fallback.content.cmm.title),
    description: readString(entry.cmmDescription, fallback.content.cmm.description),
  };

  return {
    ...fallback,
    ...mergePageHero(entry, fallback),
    content: {
      ...fallback.content,
      policyEyebrow: readString(entry.policyEyebrow, fallback.content.policyEyebrow),
      policyTitle: readString(entry.policyTitle, fallback.content.policyTitle),
      policyLeadTitle: readString(entry.policyLeadTitle, "Kalite Güvence Yaklaşımımız"),
      policyLeadDescription: readString(
        entry.policyLeadDescription,
        "SHINKO, plastik enjeksiyon ve kalıp imalatı süreçlerinde kaliteyi planlama, üretim, ölçüm ve iyileştirme adımlarıyla bütünleşik olarak yönetir. APQP, PPAP, FMEA, SPC, MSA ve 8D uygulamaları ile ürün devreye alma, proses kontrolü, ölçüm güvenilirliği ve problem çözme süreçlerinde sürdürülebilir kalite hedeflenir.",
      ),
      policyItems: asStringArray(entry.policyItems, fallback.content.policyItems),
      cmm,
      cmmMetrics: asStringArray(entry.cmmMetrics, [
        "Hassas ölçüm",
        "Proses kontrol",
        "Sürekli takip",
      ]),
      devicesEyebrow: readString(entry.devicesEyebrow, "Kalite Cihazlarımız"),
      devicesTitle: readString(entry.devicesTitle, "Ölçülebilir kalite altyapısı"),
      devicesDescription: readString(
        entry.devicesDescription,
        "Üretim ve proses kontrolleri; ölçüm, renk, sertlik, yoğunluk ve izlenebilirlik ekipmanlarıyla desteklenir.",
      ),
      certificatesEyebrow: readString(entry.certificatesEyebrow, fallback.content.certificatesEyebrow),
      certificatesTitle: readString(entry.certificatesTitle, fallback.content.certificatesTitle),
      certificatesDescription: readString(
        entry.certificatesDescription,
        "Belgelendirme süreçlerimiz, üretim standartlarımızı görünür ve takip edilebilir hale getirir.",
      ),
    },
    featureVideo: entry.featureVideo,
    certificates: entry.certificates,
    qualityDevices: entry.qualityDevices,
  };
}

export async function getHumanResourcesPageContent() {
  const fallback = defaultSitePagesContent["insan-kaynaklari"];
  const response = await fetchFromStrapi<SingleResponse<Record<string, unknown>>>(
    `/api/human-resources-page?${HUMAN_RESOURCES_PAGE_POPULATE_QUERY}`,
  );
  const entry = response?.data;

  if (!entry) {
    return fallback;
  }

  return {
    ...fallback,
    ...mergePageHero(entry, fallback),
    content: {
      ...fallback.content,
      introEyebrow: readString(entry.introEyebrow, ""),
      introTitle: readString(entry.introTitle, ""),
      introDescription: readString(entry.introDescription, ""),
      introCards: mapComponentArray(
        entry.introCards,
        fallback.content.applicationInfoCards,
        (card, fallbackCard) => ({
          title: readString(card.title, fallbackCard.title),
          text: readString(card.description, fallbackCard.text),
        }),
      ),
      positionsEyebrow: readString(entry.positionsEyebrow, "Kariyer Fırsatları"),
      positionsTitle: readString(entry.positionsTitle, "Açık Pozisyonlar"),
      positionsDescription: readString(
        entry.positionsDescription,
        "Size uygun pozisyonu inceleyin ve başvuru formu üzerinden İnsan Kaynakları ekibimize ulaşın.",
      ),
      positionsCountSuffix: readString(entry.positionsCountSuffix, "Açık Pozisyon"),
      formEyebrow: readString(entry.formEyebrow, "Başvuru Formu"),
      formTitle: readString(entry.formTitle, "Kariyer Başvurusu"),
      formDescription: readString(
        entry.formDescription,
        "Kısa bilgilerinizi paylaşın. CV eklemek isteğe bağlıdır.",
      ),
      formFullNamePlaceholder: readString(entry.formFullNamePlaceholder, "Ad Soyad"),
      formPhonePlaceholder: readString(entry.formPhonePlaceholder, "Telefon"),
      formEmailPlaceholder: readString(entry.formEmailPlaceholder, "E-Posta"),
      formPositionPlaceholder: readString(entry.formPositionPlaceholder, "Başvurulan Pozisyon"),
      formCityPlaceholder: readString(entry.formCityPlaceholder, "İl / İlçe"),
      formShiftPlaceholder: readString(entry.formShiftPlaceholder, "Vardiya Uygunluğu"),
      formExperiencePlaceholder: readString(entry.formExperiencePlaceholder, "Deneyim"),
      formNotePlaceholder: readString(
        entry.formNotePlaceholder,
        "Kendinizden, çalışmak istediğiniz alandan veya deneyiminizden kısaca bahsedin.",
      ),
      formCvEyebrow: readString(entry.formCvEyebrow, "İsteğe Bağlı CV"),
      formCvDefaultLabel: readString(
        entry.formCvDefaultLabel,
        "CV dosyanızı isteğe bağlı yükleyin",
      ),
      formCvButtonLabel: readString(entry.formCvButtonLabel, "Dosya Seç"),
      formCvHelpText: readString(
        entry.formCvHelpText,
        "PDF, DOC veya DOCX formatında dosya ekleyebilirsiniz.",
      ),
      formKvkkText: readString(
        entry.formKvkkText,
        "Kişisel verilerimin işe alım süreci kapsamında değerlendirilmesini ve saklanmasını kabul ediyorum. *",
      ),
      formSubmitLabel: readString(entry.formSubmitLabel, "Başvuruyu Gönder"),
      formSubmittingLabel: readString(entry.formSubmittingLabel, "Gönderiliyor"),
      formSuccessMessage: readString(entry.formSuccessMessage, "Başvurunuz başarıyla alındı."),
    },
    formImage: entry.formImage,
  };
}

export async function getContactPageContent() {
  const fallback = defaultSitePagesContent.iletisim;
  const response = await fetchFromStrapi<SingleResponse<Record<string, unknown>>>(
    `/api/contact-page?${CONTACT_PAGE_POPULATE_QUERY}`,
  );
  const entry = response?.data;

  if (!entry) {
    return fallback;
  }

  return {
    ...fallback,
    ...mergePageHero(entry, fallback),
    content: {
      ...fallback.content,
      infoEyebrow: readString(entry.infoEyebrow, "İletişim Bilgileri"),
      infoTitle: readString(entry.infoTitle, "Doğru ekip, hızlı geri dönüş"),
      infoDescription: readString(
        entry.infoDescription,
        "Proje, üretim ve teklif süreçleri için bizimle doğrudan iletişime geçebilirsiniz.",
      ),
      contactDetails: mapComponentArray(
        entry.contactDetails,
        fallback.content.contactDetails,
        (item, fallbackItem) => ({
          label: readString(item.label, fallbackItem.label),
          value: readString(item.value, fallbackItem.value),
          href: readString(item.href, fallbackItem.href),
        }),
      ),
      mapUrl: readString(entry.mapEmbedUrl, fallback.content.mapUrl),
      mapEyebrow: readString(entry.mapEyebrow, "Fabrika Konumu"),
      mapTitle: readString(entry.mapTitle, "Shinko'ya ulaşım"),
      mapDescription: readString(entry.mapDescription, fallback.heroDescription),
      formEyebrow: readString(entry.formEyebrow, fallback.content.formEyebrow),
      formTitle: readString(entry.formTitle, fallback.content.formTitle),
      formDescription: readString(entry.formDescription, fallback.content.formDescription),
      formNamePlaceholder: readString(entry.formNamePlaceholder, "Adınız Soyadınız"),
      formPhonePlaceholder: readString(entry.formPhonePlaceholder, "Telefon numaranız"),
      formEmailPlaceholder: readString(entry.formEmailPlaceholder, "Mail Adresiniz"),
      formSubjectPlaceholder: readString(entry.formSubjectPlaceholder, "Şirket Adınız / Konu"),
      formMessagePlaceholder: readString(entry.formMessagePlaceholder, "Mesajınız"),
      formButtonLabel: readString(entry.formButtonLabel, "Gönder"),
      galleryImages: entry.galleryImages,
    },
  };
}

export async function getSitePageContent<T extends SitePageSlug>(
  slug: T,
): Promise<SitePageContent<T>> {
  const fallback = defaultSitePagesContent[slug];
  const response = await fetchFromStrapi<
    CollectionResponse<Partial<SitePageContent<T>> & Record<string, unknown>>
  >(
    `/api/site-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1&${SITE_PAGE_POPULATE_QUERY}`,
  );
  const entry = response?.data?.[0];

  if (!entry) {
    return fallback;
  }

  return {
    ...fallback,
    ...entry,
    heroImage: resolveMediaUrl(entry.heroMedia, fallback.heroImage),
    content: isRecord(entry.content)
      ? { ...fallback.content, ...entry.content }
      : fallback.content,
  } as SitePageContent<T>;
}

export function getStrapiUrl() {
  return STRAPI_URL;
}
