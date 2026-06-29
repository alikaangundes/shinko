import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProductionShowcase } from "@/components/sections/ProductionShowcase";
import { Services } from "@/components/sections/Services";
import { getGlobalContent, getHomePageContent } from "@/lib/strapi";

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
