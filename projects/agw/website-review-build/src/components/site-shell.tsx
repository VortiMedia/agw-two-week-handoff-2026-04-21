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
      <div className="hidden border-b border-white/15 bg-[var(--color-primary)] text-white md:block">
        <div className="container-shell flex min-h-10 items-center justify-between gap-6 py-2 text-sm">
          <div className="flex min-w-0 items-center gap-3">
            <span className="top-strip-badge">{topStrip.eyebrow}</span>
            <p className="max-w-3xl leading-5 text-white/86">{topStrip.message}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/86">
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
        className="sticky z-40 border-b border-[var(--color-line)] bg-[rgba(249,248,242,0.96)] backdrop-blur"
        style={{ top: "env(safe-area-inset-top)" }}
      >
        <div className="container-shell py-2.5 lg:py-4">
          <div className="flex items-center justify-between gap-4">
            <AgwLogo priority={currentPath === "/"} />

            <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
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

            <div className="flex items-center gap-2 lg:hidden">
              <Link
                className="inline-flex min-h-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-3 text-[0.8rem] font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
                href={shellActions.headerSecondaryHref}
              >
                Call
              </Link>
              <details className="menu-details relative">
                <summary className="menu-summary">Menu</summary>
                <div className="menu-panel">
                  <nav aria-label="Mobile" className="grid gap-2">
                    {PRIMARY_NAV.map((item) => {
                      const isActive = item.href === currentPath;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="mobile-nav-link justify-start"
                          data-active={isActive ? "true" : undefined}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-4 grid gap-2 border-t border-[var(--color-line)] pt-4">
                    <Link className="button-primary justify-center" href={shellActions.headerPrimaryHref}>
                      {shellActions.headerPrimaryLabel}
                    </Link>
                    <Link className="button-secondary justify-center" href={CONTACT.mainPhoneHref}>
                      {CONTACT.mainPhoneLabel}
                    </Link>
                  </div>
                </div>
              </details>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <Link className="button-secondary" href={shellActions.headerSecondaryHref}>
                {shellActions.headerSecondaryLabel}
              </Link>
              <Link className="button-primary" href={shellActions.headerPrimaryHref}>
                {shellActions.headerPrimaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div>{children}</div>

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
