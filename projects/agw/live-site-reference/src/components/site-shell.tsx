import Link from "next/link";
import type { ReactNode } from "react";
import { AgwLogo } from "@/components/agw-logo";
import {
  CONTACT,
  FOOTER_LINKS,
  PRIMARY_NAV,
  SHELL_ACTIONS,
  SERVICE_AREAS,
  TOP_STRIP_CONTENT,
  type SitePath,
} from "@/lib/site-data";

export function SiteShell({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: SitePath;
}) {
  const topStrip = TOP_STRIP_CONTENT[currentPath];
  const shellActions = SHELL_ACTIONS[currentPath];

  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="border-b border-white/15 bg-[var(--color-primary)] text-white">
        <div
          className="container-shell flex min-h-9 items-center justify-between gap-3 py-1.5 text-[0.78rem] sm:text-sm"
          style={{ paddingTop: "max(0.45rem, env(safe-area-inset-top))" }}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <p className="ui-heading text-[0.66rem] uppercase tracking-[0.16em] text-white md:hidden">
              {topStrip.eyebrow}
            </p>
            <span className="top-strip-badge hidden md:inline-flex">{topStrip.eyebrow}</span>
            <p className="hidden max-w-3xl leading-5 text-white/86 md:block">{topStrip.message}</p>
          </div>

          <div className="hidden flex-wrap items-center gap-4 text-white/86 md:flex">
            <Link className="transition-colors hover:text-white" href={CONTACT.mainPhoneHref}>
              {CONTACT.mainPhoneLabel}
            </Link>
            <Link className="transition-colors hover:text-white" href={shellActions.topLinkHref}>
              {shellActions.topLinkLabel}
            </Link>
          </div>
        </div>
      </div>

      <header
        className="sticky z-20 border-b border-[var(--color-line)] bg-[rgba(249,248,242,0.94)] backdrop-blur"
        style={{ top: "env(safe-area-inset-top)" }}
      >
        <div className="container-shell py-2 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            <AgwLogo priority={currentPath === "/"} />

            <div className="hidden items-center gap-2 lg:flex">
              <Link className="button-secondary" href={shellActions.headerSecondaryHref}>
                {shellActions.headerSecondaryLabel}
              </Link>
              <Link className="button-primary" href={shellActions.headerPrimaryHref}>
                {shellActions.headerPrimaryLabel}
              </Link>
            </div>
          </div>

          <div className="mt-4 hidden items-center justify-between gap-6 lg:flex">
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
              {PRIMARY_NAV.map((item) => {
                const isActive = item.href === currentPath;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link"
                    data-active={isActive ? "true" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <div className="pb-24 lg:pb-0">{children}</div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-[rgba(249,248,242,0.96)] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="container-shell">
          <Link className="button-primary w-full justify-center" href={shellActions.headerPrimaryHref}>
            {shellActions.headerPrimaryLabel}
          </Link>
        </div>
      </div>

      <footer className="border-t border-[var(--color-line)] bg-[rgba(255,255,255,0.92)]">
        <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr_0.72fr]">
          <div>
            <AgwLogo />
            <p className="body-copy mt-5 max-w-xl">
              Commercial and residential painting company serving homes,
              buildings, and facilities across Westchester, Fairfield,
              Rockland, and Putnam.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Explore
              </h2>
              <div className="mt-4 grid gap-1">
                {FOOTER_LINKS.map((item) => (
                  <Link key={item.href} className="footer-link" href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Contact
              </h2>
              <div className="mt-4 grid gap-1 text-sm leading-7 text-[var(--color-text-soft)]">
                <Link className="footer-link" href={CONTACT.mainPhoneHref}>
                  Main office: {CONTACT.mainPhoneLabel}
                </Link>
                <Link className="footer-link" href={CONTACT.localPhoneHref}>
                  Pelham office: {CONTACT.localPhoneLabel}
                </Link>
                <p>{CONTACT.officeAddress}</p>
                <Link className="footer-link" href={shellActions.footerCtaHref}>
                  {shellActions.footerCtaLabel}
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="ui-heading text-[0.74rem] uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Service Area
            </h2>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-[var(--color-text-soft)]">
              {SERVICE_AREAS.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
