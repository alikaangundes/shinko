"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b-4 border-[#ef783e]/80 bg-white/96 shadow-[0_2px_18px_rgba(239,120,62,0.12)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[86px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6">
        <Link
          href="/"
          className="relative block h-14 w-[178px] shrink-0"
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

        <details className="group lg:hidden">
          <summary
            className="list-none border border-slate-200 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.06)] marker:content-none [&::-webkit-details-marker]:hidden"
            aria-controls="mobile-menu"
          >
            <span className="group-open:hidden">{content.mobileMenuOpenLabel}</span>
            <span className="hidden group-open:inline">{content.mobileMenuCloseLabel}</span>
          </summary>

          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full flex flex-col border-t border-[#ef783e]/35 bg-white/98 px-5 py-6 shadow-[0_16px_34px_rgba(15,23,42,0.12)] sm:px-6"
          >
            {desktopNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-slate-200 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-800"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={`mailto:${content.email}?subject=${quoteSubject}`}
              className="mt-6 inline-flex justify-center bg-[#ef783e] px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white"
            >
              {content.quoteButtonLabel}
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
