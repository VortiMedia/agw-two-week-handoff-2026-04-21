import { Features } from "@/components/agw/features";
import { Gallery } from "@/components/agw/gallery";
import { Hero } from "@/components/agw/hero";
import { Proofbar } from "@/components/agw/proofbar";
import { SplitCards, type SplitCardData } from "@/components/agw/split-cards";
import { Testimonial } from "@/components/agw/testimonial";
import { SiteShell } from "@/components/agw/site-shell";
import { AGW_CURATED_PHOTOS } from "@/lib/brand-assets";
import {
  HOME_REVIEWS,
  HOMEPAGE_JSON_LD,
  QUOTE_URL,
} from "@/lib/site-data";

const proofStats = [
  {
    num: (
      <>
        119<em>yr</em>
      </>
    ),
    label: "Family-owned since 1906.",
  },
  {
    num: (
      <>
        2,400<em>+</em>
      </>
    ),
    label: "Homes painted across the region.",
  },
  {
    num: (
      <>
        5<em>yr</em>
      </>
    ),
    label: "Warranty on every residential project.",
  },
  {
    num: (
      <>
        4.9<em>★</em>
      </>
    ),
    label: "Across verified reviews and referrals.",
  },
];

const galleryTiles = [
  {
    image: {
      src: AGW_CURATED_PHOTOS.homeExteriorFairfield,
      alt: "A.G. Williams exterior repaint completed in Fairfield County",
    },
    category: "Exterior repaint",
    projectName: "Fairfield County",
    description: "Full exterior · trim and body finish",
  },
  {
    image: {
      src: AGW_CURATED_PHOTOS.whiteKitchen,
      alt: "White kitchen refinished by A.G. Williams",
    },
    category: "Cabinet refinishing",
    projectName: "Westchester kitchen",
    description: "Spray finish · clean millwork lines",
  },
  {
    image: {
      src: AGW_CURATED_PHOTOS.interiorPainter,
      alt: "Interior painter from A.G. Williams cutting trim carefully",
    },
    category: "Interior",
    projectName: "Finish prep",
    description: "Protection-first sequencing",
  },
  {
    image: {
      src: AGW_CURATED_PHOTOS.commercialFloor,
      alt: "Commercial floor coating project completed by A.G. Williams",
    },
    category: "Commercial coatings",
    projectName: "Floor system",
    description: "Access, prep, and coating work",
  },
  {
    image: {
      src: AGW_CURATED_PHOTOS.heritageVan,
      alt: "A.G. Williams heritage service vehicle",
    },
    category: "Heritage",
    projectName: "Since 1906",
    description: "A local name still on the work",
  },
];

const splitCards: [SplitCardData, SplitCardData] = [
  {
    tone: "residential" as const,
    tag: "Residential",
    title: (
      <>
        Homes built to hold color for <em>years, not seasons.</em>
      </>
    ),
    description:
      "Interior, exterior, cabinetry, and historic restoration work starts with the actual rooms and surfaces. The estimate reflects the house, not a generic repaint.",
    features: [
      "Whole-house interior and exterior repainting",
      "Cabinet refinishing and finish-sensitive rooms",
      "Historic homes, trim, and detailed surface prep",
      "Walkthrough-first estimates tied to real site conditions",
    ],
    primaryCta: { label: "Residential services", href: "/residential" },
  },
  {
    tone: "commercial" as const,
    tag: "Commercial",
    title: (
      <>
        Specification-ready coatings and <em>fireproofing at scale.</em>
      </>
    ),
    description:
      "Owners, facility teams, and general contractors get a consultation path built around documentation, access, scheduling, and jobsite realities.",
    features: [
      "Commercial painting and coating scopes",
      "Intumescent fireproofing coordination",
      "Occupied-property scheduling and communication",
      "Floor systems and specialty-surface planning",
    ],
    primaryCta: { label: "Commercial services", href: "/commercial" },
  },
];

const featureCards = [
  {
    sealBig: "5 yr",
    sealSmall: "Warranty",
    title: (
      <>
        A <em>five-year</em> written warranty on residential painting.
      </>
    ),
    description:
      "If the finish fails to hold up in normal conditions, the local team comes back and makes it right.",
  },
  {
    sealBig: "0%",
    sealSmall: "Financing",
    title: (
      <>
        Finance larger residential projects at <em>0% APR</em>.
      </>
    ),
    description:
      "Keep the project on your schedule with interest-free financing options for qualifying work.",
  },
];

const featuredReview = HOME_REVIEWS[0];

export default function Home() {
  return (
    <SiteShell currentPath="/">
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(HOMEPAGE_JSON_LD),
          }}
        />

        <Hero
          eyebrow="Westchester · Fairfield · Hudson Valley"
          title={
            <>
              A home that looks finished, <em>not just painted.</em>
            </>
          }
          subtitle="Premium interior and exterior painting from a family-owned company four generations deep. Trusted by discerning homeowners since 1906, backed by a five-year warranty, and financed at 0%."
          primaryCta={{ label: "Get your free estimate", href: QUOTE_URL }}
          secondaryCta={{ label: "See recent work", href: "#work" }}
          trustChips={[
            { headline: "5-year", label: "warranty" },
            { headline: "0% APR", label: "financing" },
            { headline: "EPA Lead-Safe", label: "certified" },
            { headline: "Licensed", label: "& insured" },
          ]}
          imageAfter={{
            src: AGW_CURATED_PHOTOS.homeExteriorFairfield,
            alt: "Completed exterior paint project by A.G. Williams",
          }}
          imageBefore={{
            src: AGW_CURATED_PHOTOS.residentialProcess,
            alt: "Residential prep and process work by A.G. Williams",
          }}
          imageAfterTag="After · Fairfield County"
          imageBeforeTag="Process"
        />

        <Proofbar stats={proofStats} />

        <div id="work" className="scroll-mt-32">
          <Gallery
            eyebrow="Selected Work"
            title={
              <>
                Before and after. <em>The result is the proof.</em>
              </>
            }
            description="We lead with finished work because the finished work is what you are buying. Interior, exterior, cabinetry, commercial, and historic scopes all come back to surface prep and finish quality."
            tiles={galleryTiles}
            totalCount={240}
            cta={null}
          />
        </div>

        <SplitCards
          eyebrow="Two lanes, one standard"
          heading={
            <>
              Residential homes. <em>Commercial properties.</em>
            </>
          }
          description="Whether you are refreshing a single room or specifying coatings for an occupied facility, the crew showing up is uniformed, the prep is documented, and the finish is built to hold."
          cards={splitCards}
        />

        <section className="border-b border-[var(--color-line)] bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
            <div className="mb-12 max-w-[56rem]">
              <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
                <span aria-hidden className="h-px w-8 bg-agw-blue" />
                Why clients move forward
              </span>
              <h2 className="font-display text-[clamp(40px,4.4vw,60px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                A finished result you can <em className="italic text-agw-blue">plan around.</em>
              </h2>
            </div>
            <Features items={featureCards} />
          </div>
        </section>

        <Testimonial
          className="scroll-mt-32"
          eyebrow="Client review"
          headline={
            <>
              The <em>local choice</em> for confident outcomes.
            </>
          }
          supporting="Read verified reviews from homeowners and property teams across the region."
          quote={featuredReview.quote}
          authorName={featuredReview.name}
          authorMeta={featuredReview.location}
        />

        <section
          id="estimate"
          className="scroll-mt-32 bg-agw-ivory"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:items-start [&>*]:min-w-0">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
                <span aria-hidden className="h-px w-8 bg-agw-blue" />
                Start your project
              </span>
              <h2 className="font-display text-[clamp(40px,4.2vw,56px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
                Start with a walkthrough.{" "}
                <em className="italic text-agw-blue">No pressure, no obligation.</em>
              </h2>
              <p className="mt-5 max-w-[44ch] font-sans text-[17px] leading-[1.6] text-agw-ink">
                A senior A.G. Williams project manager will review the property, listen to what
                you are after, and deliver a written estimate after the scope is clear.
              </p>

              <div className="mt-9 border-t border-agw-bone pt-7">
                {[
                  {
                    title: "Written, itemized estimate",
                    body: "Rooms, surfaces, access, and finish expectations are reviewed before pricing.",
                  },
                  {
                    title: "Financing available",
                    body: "0% APR options may be available for qualifying residential projects.",
                  },
                  {
                    title: "Backed by warranty",
                    body: "Residential painting carries the written five-year warranty.",
                  },
                ].map((pillar, index) => (
                  <article
                    key={pillar.title}
                    className={[
                      "grid gap-2 py-4 sm:grid-cols-[11rem_1fr]",
                      index > 0 ? "border-t border-agw-bone" : "",
                    ].join(" ")}
                  >
                    <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
                      {pillar.title}
                    </h3>
                      <p className="font-sans text-[15px] font-medium leading-7 text-agw-ink">
                        {pillar.body}
                      </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-agw-bone bg-agw-paper p-6 shadow-sm md:p-8">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-agw-blue">
                Existing AGW quote path
              </p>
              <h3 className="mt-3 font-display text-[clamp(28px,3vw,38px)] font-bold leading-tight text-agw-blue-ink">
                Use the current estimate system.
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-7 text-agw-ink">
                For Phase 0, quote requests continue through A.G. Williams’ existing
                GoHighLevel workflow. That keeps tracking, office follow-up, and operations intact
                while the site direction is reviewed.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={QUOTE_URL}
                  data-cta-event="quote_cta_click"
                  data-cta-location="homepage_estimate"
                  data-cta-label="Open quote request"
                  data-cta-destination={QUOTE_URL}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-agw-blue px-7 py-4 font-sans text-[15px] font-bold text-agw-ivory shadow-[0_10px_24px_-10px_rgba(0,99,176,0.55)] transition hover:bg-agw-blue-deep"
                >
                  Open quote request
                </a>
              </div>
            </div>
            </div>
        </section>
      </main>
    </SiteShell>
  );
}
