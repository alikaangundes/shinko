"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { defaultGlobalContent, type GlobalContent } from "@/lib/site-content";

type NavbarProps = {
  globalContent?: Partial<GlobalContent>;
};

export function Navbar({ globalContent }: NavbarProps) {
  const content = {
    ...defaultGlobalContent,
    ...globalContent,
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const pathname = usePathname();
  const isMobileMenuVisible = !hasHydrated || isMenuOpen;
  const isActive = (href: string) => pathname === href;
  const navLabelByHref: Record<string, string> = {
    "/": content.navHomeLabel,
    "/kurumsal": content.navCorporateLabel,
    "/uretim": content.navProductionLabel,
    "/kalite": content.navQualityLabel,
    "/insan-kaynaklari": content.navHumanResourcesLabel,
    "/iletisim": content.navContactLabel,
  };
  const desktopNavItems = [{ label: content.navHomeLabel, href: "/" }, ...navItems].map(
    (item) => ({
      ...item,
      label: navLabelByHref[item.href] || item.label,
    }),
  );
  const quoteSubject = encodeURIComponent(content.quoteButtonSubject);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b-4 border-[#ef783e]/80 bg-white/96 shadow-[0_2px_18px_rgba(239,120,62,0.12)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[86px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6">
        <Link
          href="/"
          className="relative block h-14 w-[178px] shrink-0"
          onClick={closeMenu}
          aria-label={`${content.siteName} anasayfa`}
        >
          <Image
            src={content.logo}
            alt={`${content.siteName} ${content.tagline}`}
            fill
            priority
            sizes="178px"
            className="object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <nav className="-translate-x-8 flex items-center gap-8 xl:-translate-x-12">
            {desktopNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-5 text-xs font-semibold uppercase transition-colors ${
                  isActive(item.href) ? "text-[#ef783e]" : "text-slate-700 hover:text-slate-950"
                }`}
              >
                {item.label}
                {isActive(item.href) ? (
                  <span className="absolute inset-x-0 -bottom-4 h-0.5 bg-[#ef783e]" />
                ) : null}
              </Link>
            ))}
          </nav>

          <a
            href={`mailto:${content.email}?subject=${quoteSubject}`}
            className="inline-flex items-center justify-center rounded-full bg-[#ef783e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(239,120,62,0.28)] transition-colors hover:bg-[#11161b]"
          >
            {content.quoteButtonLabel}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center border border-slate-200 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.06)] lg:hidden"
          aria-expanded={isMobileMenuVisible}
          aria-controls="mobile-menu"
        >
          {isMobileMenuVisible ? content.mobileMenuCloseLabel : content.mobileMenuOpenLabel}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-[#ef783e]/35 bg-white/98 transition-[max-height,opacity] duration-500 lg:hidden ${
          isMobileMenuVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-5 py-6 sm:px-6">
          {desktopNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-slate-200 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-800"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={`mailto:${content.email}?subject=${quoteSubject}`}
            onClick={closeMenu}
            className="mt-6 inline-flex justify-center bg-[#ef783e] px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white"
          >
            {content.quoteButtonLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
