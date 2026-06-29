import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shinko Mühendislik Kalıp Sanayi",
  description:
    "Plastik enjeksiyon kalıp tasarımı, hassas işleme ve kalite odaklı üretim çözümleri.",
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
