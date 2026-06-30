import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL("https://www.shinko.com.tr");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Shinko Mühendislik Kalıp Sanayi",
    template: "%s | Shinko",
  },
  description:
    "Plastik enjeksiyon, kalıp imalatı, kalıp bakım ve kalite güvence süreçlerinde endüstriyel üretim çözümleri.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Shinko",
    title: "Shinko Mühendislik Kalıp Sanayi",
    description:
      "Plastik enjeksiyon, kalıp imalatı, kalıp bakım ve kalite güvence süreçlerinde endüstriyel üretim çözümleri.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/shinko/logo-revize.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
