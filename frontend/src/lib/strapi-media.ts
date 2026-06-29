const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "http://localhost:1337";

type MediaFormat = {
  url?: string;
};

type MediaRecord = {
  url?: string;
  formats?: Record<string, MediaFormat | undefined>;
  data?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getStrapiMediaUrl(path?: string | null) {
  if (!path) {
    return "";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/uploads/")) {
    return `${STRAPI_URL}${path}`;
  }

  return path;
}

export function resolveMediaUrl(value: unknown, fallback = ""): string {
  if (typeof value === "string") {
    return getStrapiMediaUrl(value) || fallback;
  }

  if (Array.isArray(value)) {
    return resolveMediaUrl(value[0], fallback);
  }

  if (!isRecord(value)) {
    return fallback;
  }

  const media = value as MediaRecord;

  if (media.data) {
    return resolveMediaUrl(media.data, fallback);
  }

  const preferredFormat =
    media.formats?.large?.url ||
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.formats?.thumbnail?.url;

  return getStrapiMediaUrl(preferredFormat || media.url) || fallback;
}

export function resolveMediaList(value: unknown, fallback: string[] = []) {
  if (isRecord(value) && "data" in value) {
    return resolveMediaList(value.data, fallback);
  }

  if (!Array.isArray(value)) {
    return fallback;
  }

  const urls = value
    .map((item) => resolveMediaUrl(item))
    .filter((url) => url.length > 0);

  return urls.length > 0 ? urls : fallback;
}
