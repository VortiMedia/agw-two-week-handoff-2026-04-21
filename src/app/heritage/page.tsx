import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/agw/button";
import { SiteShell } from "@/components/agw/site-shell";
import { AGW_CURATED_PHOTOS, AGW_LIVE_ASSETS } from "@/lib/brand-assets";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT, HERITAGE_POINTS, HERITAGE_THEMES, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Heritage, Craftsmanship, and Local Reputation | A.G. Williams",
  description:
    "The heritage layer behind A.G. Williams: long local roots, craftsmanship, and the standards supporting commercial and residential painting.",
  path: "/heritage",
  keywords: [
    "painting company since 1906",
    "pelham ny painting company",
    "local painting company westchester",
    "heritage painting contractor",
    "family owned painting company",
  ],
  image: {
    url: AGW_CURATED_PHOTOS.heritageVan,
    alt: "A.G. Williams service vehicle in the workshop with company branding",
  },
});

export default function HeritagePage() {
  return (
    <SiteShell currentPath="/heritage">
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-14 md:px-12 md:py-[72px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
              <span aria-hidden className="h-px w-8 bg-agw-blue" />
              Since 1906
            </span>
            <h1 className="max-w-[13ch] font-display text-[clamp(38px,4.6vw,64px)] font-bold leading-[1.04] tracking-[-0.024em] text-agw-blue-ink">
              A local company with a name to <em className="italic text-agw-blue">protect.</em>
            </h1>
            <p className="mt-6 max-w-[48ch] font-sans text-[18px] leading-[1.65] text-agw-ink">
              The history only matters because the present-day work is still visible: Pelham
              office, branded vehicles, full-time crews, and projects close to home.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href={QUOTE_URL}
                data-cta-event="quote_cta_click"
                data-cta-location="heritage_hero"
                data-cta-label="Get a quote"
                data-cta-destination={QUOTE_URL}
              >
                Get a quote
              </Button>
              <a
                href={CONTACT.localPhoneHref}
                data-cta-event="phone_click"
                data-cta-location="heritage_hero"
                data-cta-label={CONTACT.localPhoneLabel}
                className="font-sans text-[14px] font-semibold text-agw-blue transition hover:text-agw-blue-deep"
              >
                Call {CONTACT.localPhoneLabel}
              </a>
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-md border border-agw-bone shadow-lg sm:h-[360px] lg:h-[480px]">
            <Image
              src={AGW_CURATED_PHOTOS.heritageVan}
              alt="A.G. Williams service vehicle in the workshop with company branding"
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
                The current operation still carries <em className="italic text-agw-blue">the name.</em>
              </h2>
              <p className="max-w-[46ch] font-sans text-[16px] leading-7 text-agw-ink">
                Heritage is useful when it connects to what clients can see now: people, vehicles,
                office accountability, and finished work.
              </p>
            </div>

            <article className="overflow-hidden rounded-md border border-agw-bone bg-agw-paper">
              <div className="relative h-[220px] sm:h-[320px] lg:h-[420px]">
                <Image
                  src={AGW_LIVE_ASSETS.teamPhoto}
                  alt="A.G. Williams team photo with company vehicles"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="divide-y divide-agw-bone border-t border-agw-bone md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
                {HERITAGE_POINTS.map((point) => (
                  <article key={point.title} className="p-6">
                    <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
                      {point.title}
                    </h3>
                    <p className="mt-3 font-sans text-[14px] leading-7 text-agw-ink-soft">
                      {point.body}
                    </p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-agw-cream-warm">
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
                <span aria-hidden className="h-px w-8 bg-agw-blue" />
                What still matters
              </span>
              <h2 className="font-display text-[clamp(36px,3.8vw,52px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                Long history only works when the standards still hold.
              </h2>
            </div>
            <div className="divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper">
              {HERITAGE_THEMES.map((theme) => (
                <article key={theme.title} className="grid gap-4 p-6 md:grid-cols-[0.34fr_0.66fr]">
                  <h3 className="font-display text-[24px] font-bold text-agw-blue-ink">
                    {theme.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-7 text-agw-ink-soft">
                    {theme.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <div className="rounded-md bg-agw-blue-ink p-8 text-agw-ivory md:p-12">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-agw-celeste">
              Start local
            </p>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="max-w-[16ch] font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.12] tracking-[-0.02em]">
                Let the office route the project.
              </h2>
              <Button href={QUOTE_URL} variant="inverse">
                Get a quote
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
