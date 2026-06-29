import type { NextConfig } from "next";

function getRemotePatternFromUrl(url?: string) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    return {
      protocol: parsedUrl.protocol.replace(":", "") as "http" | "https",
      hostname: parsedUrl.hostname,
      pathname: "/uploads/**",
    };
  } catch {
    return null;
  }
}

const strapiRemotePattern = getRemotePatternFromUrl(
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL,
);

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "185.22.187.24",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "shinko.com.tr",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.shinko.com.tr",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.shinkotooling.com",
        pathname: "/userfiles/**",
      },
      ...(strapiRemotePattern ? [strapiRemotePattern] : []),
    ],
  },
};

export default nextConfig;
