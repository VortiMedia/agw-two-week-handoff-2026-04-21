import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/agw/button";
import { SiteShell } from "@/components/agw/site-shell";
import { AGW_CURATED_PHOTOS } from "@/lib/brand-assets";
import { buildPageMetadata } from "@/lib/seo";
import { QUOTE_URL, RESIDENTIAL_SERVICES } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Residential Painting and Fine Finish Work | A.G. Williams",
  description:
    "Residential painting, fine finish work, and walkthrough-led planning for homeowners across Westchester, Fairfield, Rockland, and Putnam.",
  path: "/residential",
  keywords: [
    "residential painting contractor westchester county",
    "interior painting fairfield county",
    "exterior painting westchester county",
    "cabinet refinishing",
    "fine finish painters",
  ],
  image: {
    url: AGW_CURATED_PHOTOS.whiteKitchen,
    alt: "White kitchen cabinetry and millwork finished by A.G. Williams",
  },
});

const services = RESIDENTIAL_SERVICES.slice(0, 3);

export default function ResidentialPage() {
  return (
    <SiteShell currentPath="/residential">
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
              <span aria-hidden className="h-px w-8 bg-agw-blue" />
              Residential painting
            </span>
            <h1 className="max-w-[13ch] font-display text-[clamp(38px,4.8vw,70px)] font-bold leading-[1.12] tracking-[-0.02em] text-agw-blue-ink">
              Homes built to hold color for <em className="italic text-agw-blue">years, not seasons.</em>
            </h1>
            <p className="mt-6 max-w-[48ch] font-sans text-[18px] leading-[1.65] text-agw-ink">
              Interior, exterior, cabinetry, and finish-sensitive rooms start with a walkthrough
              so the estimate reflects the actual house.
            </p>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-md shadow-lg sm:h-[360px] lg:h-[560px]">
            <Image
              src={AGW_CURATED_PHOTOS.whiteKitchen}
              alt="White kitchen cabinetry and millwork finished by A.G. Williams"
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
                Residential work under <em className="italic text-agw-blue">one process.</em>
              </h2>
              <p className="max-w-[46ch] font-sans text-[16px] leading-7 text-agw-ink">
                The site visit clarifies rooms, surfaces, protection, access, and finish level
                before the proposal is written.
              </p>
            </div>

            <div className="divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper">
              {services.map((service) => (
                <article key={service.title} className="grid gap-4 p-6 md:grid-cols-[0.34fr_0.66fr] md:p-8">
                  <h3 className="font-display text-[25px] font-bold leading-tight text-agw-blue-ink">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[15px] leading-7 text-agw-ink-soft">
                    {service.description}
                  </p>
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
                Walkthrough proof
              </span>
              <h2 className="font-display text-[clamp(36px,3.8vw,52px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                The estimate starts in the rooms, not in a template.
              </h2>
            </div>
            <div className="divide-y divide-agw-bone rounded-md border border-agw-bone bg-agw-paper">
              {[
                "Floors, furnishings, circulation paths, and active living spaces are protected before work starts.",
                "Trim, cabinets, doors, stairwells, siding, and exterior surfaces get prep details matched to the home.",
                "The finished residential paint work carries the A.G. Williams five-year warranty.",
              ].map((item) => (
                <p key={item} className="p-6 font-sans text-[15px] leading-7 text-agw-ink">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <div className="rounded-md bg-agw-blue-ink p-8 text-agw-ivory md:p-12">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-agw-celeste">
              Residential next step
            </p>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="max-w-[16ch] font-display text-[clamp(36px,4vw,56px)] font-bold leading-[1.12] tracking-[-0.02em]">
                Start with a walkthrough.
              </h2>
              <Button href={QUOTE_URL} variant="inverse">
                Get your free estimate
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
