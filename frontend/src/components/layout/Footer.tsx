"use client";

import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  defaultGlobalContent,
  type GlobalContent,
} from "@/lib/site-content";

type FooterProps = {
  globalContent?: Partial<GlobalContent>;
};

export function Footer({ globalContent }: FooterProps) {
  const content = {
    ...defaultGlobalContent,
    ...globalContent,
  };

  return (
    <footer id="iletisim" className="border-t-2 border-[#ef783e] bg-[#11161b] text-white">
      <Reveal as="div" className="px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr_1.2fr]">
            <div>
              <Link
                href="/"
                className="block w-fit justify-self-start overflow-hidden bg-black"
                aria-label={`${content.siteName} anasayfa`}
              >
                <Image
                  src={content.footerLogo}
                  alt="Shinko Plastik"
                  width={686}
                  height={348}
                  className="h-auto w-64 sm:w-72"
                />
              </Link>
            </div>

            <div>
              <p className="text-base font-bold uppercase tracking-[0.26em] text-[#ef783e]">
                {content.footerQuickLinksTitle}
              </p>
              <nav className="mt-5 grid gap-3">
                <Link href="/" className="text-lg font-medium text-white/80 transition-opacity hover:text-white">
                  {content.navHomeLabel}
                </Link>
                {navItems.map((item) => {
                  const labelByHref: Record<string, string> = {
                    "/kurumsal": content.navCorporateLabel,
                    "/uretim": content.navProductionLabel,
                    "/kalite": content.navQualityLabel,
                    "/insan-kaynaklari": content.navHumanResourcesLabel,
                    "/iletisim": content.navContactLabel,
                  };

                  return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-white/80 transition-opacity hover:text-white"
                  >
                    {labelByHref[item.href] || item.label}
                  </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="text-base font-bold uppercase tracking-[0.26em] text-[#ef783e]">
                {content.footerContactTitle}
              </p>
              <div className="mt-5 space-y-4 text-lg font-medium leading-8 text-white/80">
                <p>{content.address}</p>
                <p>
                  <a
                    href={`tel:${content.phone.replace(/\s+/g, "")}`}
                    className="transition-opacity hover:opacity-80"
                  >
                    {content.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-lg font-medium text-white/80 transition-opacity hover:text-white"
                  >
                    {content.email}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/8 pt-6 text-center text-base font-medium text-white/60">
            <p>{content.footerCopyright}</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
