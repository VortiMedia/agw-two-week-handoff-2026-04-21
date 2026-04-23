import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/agw/button";
import { SiteShell } from "@/components/agw/site-shell";
import { AGW_CURATED_PHOTOS } from "@/lib/brand-assets";
import { buildPageMetadata } from "@/lib/seo";
import {
  COMMERCIAL_EXPECTATIONS,
  COMMERCIAL_SERVICES,
  CONTACT,
  QUOTE_URL,
} from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial Painting, Fireproofing, and Floor Coatings | A.G. Williams",
  description:
    "Commercial painting, fireproofing, and floor coating work for owners, facility teams, and general contractors across Westchester, Fairfield, Rockland, and Putnam.",
  path: "/commercial",
  keywords: [
    "commercial painting contractor westchester county",
    "commercial painting contractor fairfield county",
    "fireproofing contractor",
    "commercial floor coatings",
    "occupied property painting contractor",
  ],
  image: {
    url: AGW_CURATED_PHOTOS.commercialFloor,
    alt: "Commercial floor coating project completed by A.G. Williams",
  },
});

export default function CommercialPage() {
  return (
    <SiteShell currentPath="/commercial">
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-14 md:px-12 md:py-[72px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
              <span aria-hidden className="h-px w-8 bg-agw-blue" />
              Commercial services
            </span>
            <h1 className="max-w-[14ch] font-display text-[clamp(38px,4.6vw,64px)] font-bold leading-[1.04] tracking-[-0.024em] text-agw-blue-ink">
              Painting, coatings, and fireproofing for <em className="italic text-agw-blue">active properties.</em>
            </h1>
            <p className="mt-6 max-w-[48ch] font-sans text-[18px] leading-[1.65] text-agw-ink">
              A.G. Williams works with owners, facility teams, property managers, and general
              contractors who need scope, access, and documentation handled early.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href={QUOTE_URL}
                data-cta-event="quote_cta_click"
                data-cta-location="commercial_hero"
                data-cta-label="Request a commercial consultation"
                data-cta-destination={QUOTE_URL}
              >
                Request a consultation
              </Button>
              <a
                href={CONTACT.mainPhoneHref}
                data-cta-event="phone_click"
                data-cta-location="commercial_hero"
                data-cta-label={CONTACT.mainPhoneLabel}
                className="font-sans text-[14px] font-semibold text-agw-blue transition hover:text-agw-blue-deep"
              >
                Call {CONTACT.mainPhoneLabel}
              </a>
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-md border border-agw-bone shadow-lg sm:h-[360px] lg:h-[480px]">
            <Image
              src={AGW_CURATED_PHOTOS.commercialFloor}
              alt="Commercial floor coating project completed by A.G. Williams"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="border-y border-agw-bone bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
            <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
              <h2 className="font-display text-[clamp(38px,4vw,56px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                Commercial scopes A.G. Williams handles <em className="italic text-agw-blue">regularly.</em>
              </h2>
              <p className="max-w-[46ch] font-sans text-[16px] leading-7 text-agw-ink">
                Painting, floor systems, and fireproofing are reviewed around site conditions
                before crews mobilize.
              </p>
            </div>

            <div className="divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper">
              {COMMERCIAL_SERVICES.map((service) => (
                <article key={service.id} className="grid gap-5 p-6 md:grid-cols-[0.32fr_0.68fr] md:p-8">
                  <h3 className="font-display text-[28px] font-bold leading-tight text-agw-blue-ink">
                    {service.title}
                  </h3>
                  <div>
                    <p className="font-sans text-[15px] leading-7 text-agw-ink-soft">
                      {service.description}
                    </p>
                    <ul className="mt-5 grid gap-2">
                      {service.bullets.slice(0, 3).map((bullet) => (
                        <li key={bullet} className="font-sans text-[13px] leading-6 text-agw-ink before:mr-2 before:text-agw-blue before:content-['/']">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-agw-cream-warm">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
                <span aria-hidden className="h-px w-8 bg-agw-blue" />
                On-site expectations
              </span>
              <h2 className="font-display text-[clamp(36px,3.8vw,52px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                Finish quality matters. So does how the job runs.
              </h2>
            </div>
            <div className="divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper">
              {COMMERCIAL_EXPECTATIONS.map((item) => (
                <article key={item.title} className="p-6">
                  <h3 className="font-display text-[23px] font-bold text-agw-blue-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14px] leading-7 text-agw-ink-soft">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <div className="rounded-md bg-agw-blue-ink p-8 text-agw-ivory md:p-12">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-agw-celeste">
              Commercial next step
            </p>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="max-w-[16ch] font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.12] tracking-[-0.02em]">
                Send the scope for review.
              </h2>
              <Button href={QUOTE_URL} variant="inverse">
                Request a quote
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
