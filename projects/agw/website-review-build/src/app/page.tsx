import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { SiteShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { AGW_CURATED_PHOTOS, AGW_LIVE_ASSETS } from "@/lib/brand-assets";
import {
  CONTACT,
  HOME_REVIEWS,
  HOMEPAGE_JSON_LD,
  LOCAL_FAQS,
  QUOTE_URL,
  SERVICE_AREAS,
} from "@/lib/site-data";

const proofLogos = [
  { src: AGW_LIVE_ASSETS.proofLogos.google, alt: "Google reviews" },
  { src: AGW_LIVE_ASSETS.proofLogos.yelp, alt: "Yelp reviews" },
  { src: AGW_LIVE_ASSETS.proofLogos.leadSafe, alt: "EPA lead-safe certification" },
] as const;

const heroChecks = [
  {
    title: "Century-old local authority",
    body: "A.G. Williams still routes estimates and work through the Pelham office, not a borrowed local landing page.",
  },
  {
    title: "Residential and commercial scope",
    body: "Homes, occupied properties, fireproofing, and floor coatings all get sorted into the right lane before pricing starts.",
  },
  {
    title: "Four-county reach",
    body: "Westchester, Fairfield, Rockland, and Putnam stay tied to the same regional operation.",
  },
] as const;

const credibilityPoints = [
  {
    title: "Legacy that still has to hold up",
    body:
      "Since 1906 only matters because the office, the vehicles, the crews, and the estimate process are still part of the same present-day operation.",
  },
  {
    title: "Premium results with real operational discipline",
    body:
      "The finish work, the commercial coordination, and the route-to-quote logic all reinforce the same trust story instead of pulling in different directions.",
  },
] as const;

const residentialHighlights = [
  "Interiors, exteriors, cabinetry, and finish-heavy rooms reviewed in person before pricing.",
  "Protection, prep, and finish expectations aligned before the house turns into a moving target.",
  "Residential work backed by a real 5-year warranty instead of vague reassurance.",
] as const;

const commercialHighlights = [
  "Commercial painting, fireproofing, and floor coatings routed through one office.",
  "Occupied-property coordination and documentation handled before crews mobilize.",
] as const;

const processSteps = [
  {
    title: "Start with the office",
    body:
      "The first conversation determines whether the property needs a residential walkthrough, a commercial consultation, or a specialty coating discussion.",
  },
  {
    title: "Review the actual scope",
    body:
      "A.G. Williams looks at surfaces, protection, access, timing, finish expectations, and site conditions before the proposal is finalized.",
  },
  {
    title: "Run the work cleanly",
    body:
      "Crews, communication, and scheduling stay organized so homeowners, facility teams, and buyers are not left chasing updates once work begins.",
  },
] as const;

const featuredReview = HOME_REVIEWS[0];
const floorReview = HOME_REVIEWS[2];

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

        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:pr-4">
                <span className="editorial-eyebrow">Pelham office | Since 1906</span>
                <h1 className="hero-title mt-5 max-w-[10ch]">
                  Residential and commercial painting routed through one local office.
                </h1>
                <p className="section-lead mt-6 max-w-2xl">
                  A.G. Williams handles residential walkthroughs, commercial painting,
                  fireproofing, and floor coatings across Westchester, Fairfield, Rockland, and
                  Putnam with full-time crews, warranty-backed residential work, and a regional
                  name that still has to hold up close to home.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-soft)]">
                  Start with the office, get routed to the right lane, and move into the estimate
                  path that fits the property.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <TrackedLink
                    className="button-primary"
                    href={QUOTE_URL}
                    tracking={{
                      event: "quote_cta_click",
                      location: "homepage_hero",
                      label: "Get a Quote",
                      context: "homepage",
                    }}
                  >
                    Get a Quote
                  </TrackedLink>
                  <Link className="button-secondary" href={CONTACT.localPhoneHref}>
                    Call Pelham office
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.08fr_0.72fr]">
                <article className="relative overflow-hidden rounded-[1.65rem] border border-[var(--color-border)] bg-[var(--color-ink)] shadow-[var(--shadow-ink)] lg:row-span-2">
                  <div className="relative aspect-[16/13] sm:aspect-[16/10] lg:aspect-[4/5]">
                    <Image
                      src={AGW_CURATED_PHOTOS.homeExteriorFairfield}
                      alt="Residential exterior completed by A.G. Williams"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,36,58,0.92)] via-[rgba(16,36,58,0.2)] to-transparent" />

                    <div className="absolute inset-x-5 bottom-5 max-w-[27rem]">
                      <p className="editorial-eyebrow editorial-eyebrow--light">
                        Finished results first
                      </p>
                      <h2 className="mt-4 display-font text-[clamp(1.9rem,2.7vw,2.8rem)] leading-[0.96] tracking-[-0.05em] text-white">
                        Homes, buildings, and specialty scopes handled with a quote process that
                        still feels local.
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-white/82">
                        The trust story works because the office, the crews, and the finish quality
                        all line up instead of feeling like separate promises.
                      </p>
                    </div>
                  </div>
                </article>

                <aside className="surface-lapis rounded-[1.35rem] p-5 lg:p-6">
                  <p className="editorial-eyebrow editorial-eyebrow--light">Why trusted</p>
                  <div className="home-rule-list mt-5">
                    {heroChecks.map((item) => (
                      <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                        <p className="text-[0.98rem] font-semibold tracking-[0.02em] text-white">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/78">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </aside>

                <aside className="rounded-[1.35rem] border border-[var(--color-border)] bg-[rgba(255,255,255,0.95)] p-5 shadow-[var(--shadow-soft)]">
                  <p className="editorial-eyebrow">Client perspective</p>
                  <p className="mt-4 text-[1rem] leading-8 text-[var(--color-text)]">
                    “{featuredReview.quote}”
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--color-text-soft)]">
                    {featuredReview.name} | {featuredReview.location}
                  </p>
                </aside>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-[var(--color-line)] pt-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div className="grid gap-6 sm:grid-cols-2">
                {credibilityPoints.map((item) => (
                  <article key={item.title}>
                    <p className="text-[0.96rem] font-semibold tracking-[0.02em] text-[var(--color-ink)]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 lg:justify-items-end">
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {proofLogos.map((logo) => (
                    <div
                      key={logo.alt}
                      className="flex min-h-14 min-w-32 items-center justify-center rounded-[0.9rem] border border-[var(--color-border)] bg-white px-4 shadow-[var(--shadow-soft)]"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={116}
                        height={52}
                        className="h-auto max-h-7 w-auto"
                      />
                    </div>
                  ))}
                </div>
                <p className="max-w-md text-sm leading-7 text-[var(--color-text-soft)] lg:text-right">
                  Licensed and insured commercial work, a 5-year residential warranty, and one
                  office that still answers for the estimate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[var(--color-ivory)]">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <span className="editorial-eyebrow">Why the estimate path feels different</span>
              <h2 className="section-title mt-5">
                AGW should feel premium because the work and the routing are both disciplined.
              </h2>
              <p className="section-lead mt-5 max-w-xl">
                The homepage has to reassure quickly: finished results, real standards, local
                accountability, and the right lane before the wrong estimate process starts.
              </p>
              <TrackedLink
                className="button-primary mt-7"
                href={QUOTE_URL}
                tracking={{
                  event: "quote_cta_click",
                  location: "homepage_proof_band",
                  label: "Start Your Quote",
                  context: "homepage",
                }}
              >
                Start Your Quote
              </TrackedLink>
            </div>

            <article className="overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="relative min-h-[20rem] lg:min-h-full">
                  <Image
                    src={AGW_CURATED_PHOTOS.whiteKitchen}
                    alt="White kitchen cabinetry and millwork finished by A.G. Williams"
                    fill
                    sizes="(max-width: 1024px) 100vw, 34vw"
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-0">
                  <div className="p-6 lg:p-8">
                    <p className="editorial-eyebrow">Residential proof</p>
                    <h3 className="card-title mt-4 text-[clamp(1.7rem,2.1vw,2.35rem)]">
                      Warranty-backed rooms, cabinetry, and finish work that still look calm when
                      the job is over.
                    </h3>
                    <p className="body-copy mt-4">
                      Walkthrough-led residential work is more credible because the finish level,
                      prep, and home protection are reviewed before the estimate gets written.
                    </p>
                  </div>

                  <div className="grid gap-0 border-t border-[var(--color-line)] lg:grid-cols-[0.78fr_1.22fr]">
                    <div className="surface-celeste p-6">
                      <p className="editorial-eyebrow">Residential support</p>
                      <p className="mt-4 display-font text-[1.45rem] leading-[1.04] tracking-[-0.04em] text-[var(--color-ink)]">
                        The 5-year warranty stays prominent, and qualifying residential projects
                        can also use 0% financing.
                      </p>
                    </div>

                    <div className="p-6">
                      <p className="editorial-eyebrow">What buyers see early</p>
                      <div className="home-rule-list mt-4">
                        <div className="py-4 first:pt-0">
                          <p className="text-[0.95rem] font-semibold text-[var(--color-ink)]">
                            One office routes the first call
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                            Residential walkthroughs and commercial consultations get separated
                            before the wrong process gets started.
                          </p>
                        </div>
                        <div className="py-4 last:pb-0">
                          <p className="text-[0.95rem] font-semibold text-[var(--color-ink)]">
                            Proof comes from work, not from filler copy
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                            Finished projects, review proof, warranty support, and regional
                            visibility all work together instead of reading like disconnected
                            trust badges.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-4xl">
              <span className="editorial-eyebrow">Choose the right lane</span>
              <h2 className="section-title mt-5 max-w-[14ch]">
                Homes, occupied properties, and the heritage story should not all be sold with the
                same layout.
              </h2>
              <p className="section-lead mt-5 max-w-3xl">
                The homepage should make the next click obvious: residential, commercial, or the
                trust-and-heritage layer behind both.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.14fr_0.86fr]">
              <article className="overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
                  <div className="relative min-h-[18rem]">
                    <Image
                      src={AGW_CURATED_PHOTOS.cabinetKitchen}
                      alt="Kitchen cabinet finish work completed by A.G. Williams"
                      fill
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 lg:p-8">
                    <p className="editorial-eyebrow">Residential lane</p>
                    <h3 className="card-title mt-4 text-[clamp(1.75rem,2vw,2.35rem)]">
                      Walkthrough-led interiors, exteriors, cabinetry, and finish-heavy rooms.
                    </h3>
                    <p className="body-copy mt-4">
                      Homeowners should get the house, the surfaces, and the finish expectations
                      reviewed in person before the estimate gets built.
                    </p>
                    <ul className="mt-6 grid gap-3">
                      {residentialHighlights.map((item) => (
                        <li key={item} className="detail-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link className="footer-link mt-6 text-[var(--color-primary)]" href="/residential">
                      See Residential
                    </Link>
                  </div>
                </div>
              </article>

              <div className="grid gap-5">
                <article className="surface-lapis rounded-[1.6rem] p-6 lg:p-7">
                  <p className="editorial-eyebrow editorial-eyebrow--light">Commercial lane</p>
                  <h3 className="mt-4 display-font text-[clamp(1.65rem,2vw,2.15rem)] leading-[0.98] tracking-[-0.05em] text-white">
                    Painting, fireproofing, and floor coatings for occupied properties and
                    schedule-sensitive buyers.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/80">
                    Commercial clients need scope clarity, documentation visibility, and a job that
                    gets organized before the site starts absorbing cost.
                  </p>
                  <div className="home-rule-list mt-6">
                    {commercialHighlights.map((item) => (
                      <div key={item} className="py-4 first:pt-0 last:pb-0">
                        <p className="text-sm leading-7 text-white/84">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link className="footer-link mt-6 text-white" href="/commercial">
                    See Commercial
                  </Link>
                </article>

                <article className="surface-ivory rounded-[1.35rem] border border-[var(--color-border)] p-6 shadow-[var(--shadow-soft)]">
                  <p className="editorial-eyebrow">Heritage and local proof</p>
                  <p className="mt-4 display-font text-[1.6rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                    The 1906 story matters because the office, the crews, and the referral risk are
                    still present-day facts.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                    Use the heritage page when the real question is whether the name still carries
                    accountability, not just recognition.
                  </p>
                  <Link className="footer-link mt-6 text-[var(--color-primary)]" href="/heritage">
                    See Heritage
                  </Link>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-[var(--color-ink)]">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <span className="editorial-eyebrow editorial-eyebrow--light">How work starts</span>
              <h2 className="section-title mt-5 !text-white">
                The office should make the next step obvious before the estimate is written.
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-white/78">
                Residential walkthrough, commercial consultation, or a specialty coating
                discussion, the point of the first conversation is to route the property correctly
                before the quote gets built.
              </p>

              <div className="mt-8 border-t border-white/12 pt-6">
                <p className="editorial-eyebrow editorial-eyebrow--light">Client feedback</p>
                <p className="mt-4 text-[1rem] leading-8 text-white">“{floorReview.quote}”</p>
                <p className="mt-4 text-sm leading-6 text-white/62">
                  {floorReview.name} | {floorReview.location}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/7 shadow-[var(--shadow-ink)] backdrop-blur-sm">
              <div className="divide-y divide-white/10">
                {processSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="grid gap-3 px-6 py-6 sm:grid-cols-[auto_1fr] sm:items-start"
                  >
                    <span className="step-marker bg-white/10 text-white">{index + 1}</span>
                    <div>
                      <h3 className="card-title text-[clamp(1.38rem,1.8vw,1.8rem)] !text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-[0.98rem] leading-8 text-white/76">{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="service-area"
          className="section-space scroll-mt-28 border-b border-[var(--color-line)] bg-[rgba(108,187,232,0.12)]"
        >
          <div className="container-shell grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <article className="overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[16/11] lg:aspect-[5/4]">
                <Image
                  src={AGW_LIVE_ASSETS.teamPhoto}
                  alt="A.G. Williams team photo with company vehicles"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="grid gap-0 border-t border-[var(--color-line)] lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-6 lg:p-7">
                  <p className="editorial-eyebrow">Local accountability</p>
                  <h3 className="card-title mt-4 text-[clamp(1.6rem,2vw,2.1rem)]">
                    The crews, vehicles, and office still tie back to the same regional name.
                  </h3>
                  <p className="body-copy mt-4">
                    That matters because the work still has to hold up on the next street over,
                    not disappear behind a fake-local marketing layer.
                  </p>
                </div>

                <div className="border-t border-[var(--color-line)] p-6 lg:border-l lg:border-t-0">
                  <Image
                    src={AGW_LIVE_ASSETS.countiesMap}
                    alt="Map showing A.G. Williams service counties"
                    width={1024}
                    height={967}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </article>

            <div>
              <span className="editorial-eyebrow">Service area</span>
              <h2 className="section-title mt-5">
                Work routed from Pelham across Westchester, Fairfield, Rockland, and Putnam.
              </h2>
              <p className="section-lead mt-5 max-w-xl">
                The office is local, the work is regional, and the estimate path stays tied to the
                same operation across the counties A.G. Williams serves.
              </p>

              <div className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                {SERVICE_AREAS.map((area) => (
                  <article key={area} className="py-4">
                    <p className="text-[1rem] font-semibold tracking-[0.02em] text-[var(--color-ink)]">
                      {area}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                      Estimates, walkthroughs, and consultations all route through the same Pelham
                      operation before the work moves into the field.
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <TrackedLink
                  className="button-primary"
                  href={QUOTE_URL}
                  tracking={{
                    event: "quote_cta_click",
                    location: "homepage_service_area",
                    label: "Start Your Quote",
                    context: "homepage",
                  }}
                >
                  Start Your Quote
                </TrackedLink>
                <Link
                  className="text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-80"
                  href={CONTACT.localPhoneHref}
                >
                  Call Pelham office
                </Link>
              </div>

              <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)]">
                {CONTACT.officeAddress}
              </p>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div className="surface-lapis rounded-[1.6rem] p-8 lg:p-10">
              <p className="editorial-eyebrow editorial-eyebrow--light">
                Questions and next steps
              </p>
              <h2 className="page-title mt-5 max-w-[10ch] !text-white">
                Start with the office and let AGW route the right estimate path.
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-white/82">
                Residential walkthrough, commercial consultation, or a question that needs context
                first, the next step should be clear, local, and tied to the same team that stands
                behind the work.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <TrackedLink
                  className="button-primary button-primary--light"
                  href={QUOTE_URL}
                  tracking={{
                    event: "quote_cta_click",
                    location: "homepage_faq_band",
                    label: "Request a Quote",
                    context: "homepage",
                  }}
                >
                  Request a Quote
                </TrackedLink>
                <Link className="button-secondary button-secondary--dark" href={CONTACT.mainPhoneHref}>
                  Call {CONTACT.mainPhoneLabel}
                </Link>
              </div>
            </div>

            <div>
              <span className="editorial-eyebrow">Questions clients ask first</span>
              <h2 className="section-title mt-5">
                The practical questions should be answered before the wrong estimate path starts.
              </h2>
              <div className="mt-8">
                <FaqList items={LOCAL_FAQS} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
