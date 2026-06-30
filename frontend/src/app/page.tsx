import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductionShowcase } from "@/components/sections/ProductionShowcase";
import { Services } from "@/components/sections/Services";
import { getGlobalContent, getHomePageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Plastik Enjeksiyon ve Kalıp Üretimi",
  description:
    "Shinko; plastik enjeksiyon, entegre kalıphane, robot destekli üretim ve kalite güvence altyapısıyla endüstriyel üretim çözümleri sunar.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [globalContent, homeContent] = await Promise.all([
    getGlobalContent(),
    getHomePageContent(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar globalContent={globalContent} />
      <main>
        <ProductionShowcase homeContent={homeContent} />
        <Services globalContent={globalContent} homeContent={homeContent} />
      </main>
      <Footer globalContent={globalContent} />
    </div>
  );
}
