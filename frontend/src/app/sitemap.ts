import type { MetadataRoute } from "next";

const siteUrl = "https://www.shinko.com.tr";

const routes = [
  { path: "", priority: 1 },
  { path: "/kurumsal", priority: 0.8 },
  { path: "/uretim", priority: 0.9 },
  { path: "/kalite", priority: 0.8 },
  { path: "/insan-kaynaklari", priority: 0.7 },
  { path: "/iletisim", priority: 0.8 },
  { path: "/ulasim", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
