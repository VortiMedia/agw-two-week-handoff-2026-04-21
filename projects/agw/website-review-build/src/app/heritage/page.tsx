import type { Metadata } from "next";
import Image from "next/image";
import { ServiceCtaBand } from "@/components/service-cta-band";
import { ServicePageHero } from "@/components/service-page-hero";
import { SiteShell } from "@/components/site-shell";
import { AGW_CURATED_PHOTOS, AGW_LIVE_ASSETS } from "@/lib/brand-assets";
import {
  CONTACT,
  HERITAGE_POINTS,
  HERITAGE_THEMES,
  QUOTE_URL,
  SERVICE_AREAS,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Heritage, Craftsmanship, and Local Reputation | A.G. Williams",
  description:
    "The heritage layer behind A.G. Williams: long local roots, craftsmanship, and the standards supporting commercial and residential painting.",
  alternates: {
    canonical: "/heritage",
  },
};

export default function HeritagePage() {
  return (
    <SiteShell currentPath="/heritage">
      <main>
        <ServicePageHero
          eyebrow="Since 1906"
          title="A.G. Williams still works like a local company with a name to protect."
          description="The company has served this region since 1906, and the current operation is still visible the same way a local contractor should be: Pelham office, branded vehicles, full-time crews, and work that has to hold up close to home."
          primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
          secondaryCta={{
            label: `Call Pelham office: ${CONTACT.localPhoneLabel}`,
            href: CONTACT.localPhoneHref,
          }}
          highlights={[
            {
              label: "Pelham office",
              body: "Local office still routing residential and commercial work.",
            },
            {
              label: "Regional work",
              body: SERVICE_AREAS.join(", "),
            },
            {
              label: "Accountability",
              body: "A local name still has to hold up on the next referral.",
            },
          ]}
          media={{
            src: AGW_CURATED_PHOTOS.heritageVan,
            alt: "A.G. Williams service vehicle in the workshop with company branding",
          }}
          mediaCallout={{
            eyebrow: "Local proof",
            title: "The company name is still on the vehicles and the work is still close to home.",
            body: "The same regional reputation still matters because present-day work, vehicles, and office operations are all visible in the counties the company serves.",
          }}
          supportCallout={{
            eyebrow: "Pelham office",
            title: "The office, the vehicles, and the crews all still sit under one local name.",
            body: "That is what makes the history useful. The trust story is still backed by a real local operation instead of a borrowed heritage line.",
          }}
          proofListTitle="Why the history still matters now"
          proofList={[
            "Since 1906 is still tied to the present-day crews and office, not just archived stationery.",
            "Residential and commercial work still route through Pelham before moving into the field.",
            "The regional name still has to hold up town by town, referral by referral.",
          ]}
        />

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Who still carries the name</span>
              <h2 className="section-title mt-4">
                The crews, vehicles, and local office are still part of the present-day operation.
              </h2>
            </div>

            <article className="mt-10 overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[21/7]">
                <Image
                  src={AGW_LIVE_ASSETS.teamPhoto}
                  alt="A.G. Williams team photo with company vehicles"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="grid gap-6 border-t border-[var(--color-line)] p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
                <div>
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Present-day proof
                  </p>
                  <p className="mt-3 body-copy">
                    Heritage only matters if the current company still behaves like a local
                    contractor. That means visible crews, visible vehicles, and a real office that
                    still routes work in the same region.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {HERITAGE_POINTS.map((point) => (
                    <article
                      key={point.title}
                      className="border-l-2 border-[var(--color-primary)] bg-[rgba(249,248,242,0.82)] px-4 py-4"
                    >
                      <h2 className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        {point.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                        {point.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section-space bg-[rgba(255,255,255,0.76)]">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">What clients still expect</span>
              <h2 className="section-title mt-4">
                Long history only matters if the work still holds up.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {HERITAGE_THEMES.map((theme) => (
                <article
                  key={theme.title}
                  className="border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="card-title text-[clamp(1.4rem,1.8vw,1.75rem)]">
                    {theme.title}
                  </h3>
                  <p className="body-copy mt-4">{theme.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ServiceCtaBand
          eyebrow="Start with the office"
          title="Use the local office as the starting point for residential walkthroughs, commercial consultations, and the right next step."
          body="The value of the heritage page is not nostalgia by itself. It is the proof that the same regional operation still answers the phone, routes the work, and stands behind what gets quoted."
          primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
          secondaryCta={{
            label: `Call Pelham office: ${CONTACT.localPhoneLabel}`,
            href: CONTACT.localPhoneHref,
          }}
          detailItems={["Since 1906", "Pelham office", "Residential and commercial routing"]}
        />
      </main>
    </SiteShell>
  );
}
