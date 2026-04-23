import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/agw/announcement-bar";
import { Footer } from "@/components/agw/footer";
import { Nav } from "@/components/agw/nav";
import {
  CONTACT,
  FOOTER_LINKS,
  PRIMARY_NAV,
  SHELL_ACTIONS,
  TOP_STRIP_CONTENT,
  UTILITY_LINKS,
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
  const primaryPhone =
    shellActions.headerSecondaryHref === CONTACT.mainPhoneHref
      ? {
          display: CONTACT.mainPhoneLabel,
          href: CONTACT.mainPhoneHref,
          label: "Main office",
        }
      : {
          display: CONTACT.localPhoneLabel,
          href: CONTACT.localPhoneHref,
          label: "Pelham office",
        };

  return (
    <div className="min-h-[100dvh] bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="sticky top-0 z-40 bg-agw-ivory">
        <AnnouncementBar
          items={[
            {
              lead: currentPath === "/" ? "0% financing" : topStrip.eyebrow,
              body:
                currentPath === "/"
                  ? "available on qualifying projects."
                  : "reviewed by the Pelham office.",
            },
            {
              lead: "5-year warranty",
              body: "on residential projects.",
            },
          ]}
        />

        <Nav
          links={[...PRIMARY_NAV]}
          phone={primaryPhone}
          primaryCta={{
            label: shellActions.headerPrimaryLabel,
            href: shellActions.headerPrimaryHref,
          }}
        />
      </div>

      <div>{children}</div>

      <Footer
        brand={{
          logoSrc: "/agw-logo-lockup.png",
          tagline: "A finished result you can plan around.",
          established: "Established 1906 · Pelham, New York",
          certs: ["Licensed & insured", "EPA Lead-Safe", "5-year warranty"],
        }}
        columns={[
          {
            heading: "Explore",
            items: FOOTER_LINKS.map((item) => ({
              label: item.label,
              href: item.href,
            })),
          },
          {
            heading: "Work",
            items: [
              { label: "Residential painting", href: "/residential" },
              { label: "Commercial painting", href: "/commercial" },
              { label: "Company heritage", href: "/heritage" },
            ],
          },
          {
            heading: "Contact",
            items: [
              { label: `Main office ${CONTACT.mainPhoneLabel}`, href: CONTACT.mainPhoneHref },
              { label: `Pelham ${CONTACT.localPhoneLabel}`, href: CONTACT.localPhoneHref },
              { label: CONTACT.officeAddress },
              { label: "Serving Westchester, Fairfield, Rockland, and Putnam." },
            ],
          },
        ]}
        bottom={{
          copyright: "A.G. Williams Painting Company | Pelham, New York",
          legalLinks: UTILITY_LINKS.map((item) => ({
            label: item.label,
            href: item.href,
          })),
          licenseLine: currentPath === "/accessibility" ? "Accessibility support available by phone." : undefined,
        }}
      />
    </div>
  );
}
