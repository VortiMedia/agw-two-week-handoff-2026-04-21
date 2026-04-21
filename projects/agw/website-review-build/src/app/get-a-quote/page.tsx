import type { Metadata } from "next";
import Script from "next/script";
import { QuoteIntakeFlow } from "@/components/quote-intake-flow";
import { SiteShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Get a Quote | A.G. Williams",
  description:
    "Move through a branded AGW quote intake, then finish inside the live booking calendar without breaking the current office workflow.",
  path: "/get-a-quote",
  keywords: [
    "painting estimate",
    "commercial painting consultation",
    "residential painting walkthrough",
  ],
});

const nextSteps = [
  {
    title: "Route the scope before the calendar opens",
    body:
      "Residential walkthroughs, commercial consultations, and specialty coating scopes should not enter the same booking lane blind.",
  },
  {
    title: "Keep the live GHL booking chain intact",
    body:
      "The custom intake is the front-end layer only. The appointment is still booked inside the current GHL calendar and automation path.",
  },
  {
    title: "Keep a real office fallback in reach",
    body:
      "If the job needs clarification before a slot is booked, the Pelham office stays visible as the direct fallback.",
  },
] as const;

const quoteLanes = [
  "Residential walkthroughs for interiors, exteriors, cabinetry, and finish-sensitive rooms.",
  "Commercial consultations for occupied properties, coatings, fireproofing, and documentation-heavy scopes.",
  "Pelham office support when the estimator should clarify the project before booking.",
] as const;

export default function GetAQuotePage() {
  return (
    <SiteShell currentPath="/get-a-quote">
      <Script id="quote-route-view" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "quote_route_view",
            page_path: window.location.pathname,
            quote_route_version: "custom_quote_flow_v1",
          });
        `}
      </Script>

      <main>
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:max-w-xl lg:pt-4">
                <span className="kicker">Custom quote intake</span>
                <h1 className="page-title mt-4 max-w-[11ch]">
                  Start the quote here. Book the live appointment at the final step.
                </h1>
                <p className="lead-copy mt-5 max-w-xl">
                  This route replaces the thin bridge page with a branded intake flow the site
                  controls. Validation, pacing, and tracking happen here first. The actual
                  appointment still gets booked inside the current GHL calendar so the office and
                  customer-care handoff stay intact.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <TrackedLink
                    className="button-primary"
                    href="#quote-booking-flow"
                    tracking={{
                      event: "quote_cta_click",
                      location: "quote_route_primary",
                      label: "Start Your Quote",
                      context: "quote-flow",
                    }}
                  >
                    Start Your Quote
                  </TrackedLink>
                  <TrackedLink
                    className="button-secondary"
                    href={CONTACT.localPhoneHref}
                    tracking={{
                      event: "quote_support_click",
                      location: "quote_route_secondary",
                      label: `Call Pelham office: ${CONTACT.localPhoneLabel}`,
                      context: "quote-flow",
                    }}
                  >
                    Call Pelham office
                  </TrackedLink>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {["Since 1906", "Live GHL calendar", "Pelham office fallback"].map((signal) => (
                    <span key={signal} className="info-pill">
                      {signal}
                    </span>
                  ))}
                </div>

                <article className="mt-8 rounded-[1.6rem] border border-[var(--color-border)] bg-white/88 p-6 shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    What this rebuild changes
                  </p>
                  <div className="mt-5 grid gap-4">
                    {nextSteps.map((step) => (
                      <article
                        key={step.title}
                        className="border-t border-[var(--color-line)] pt-4 first:border-t-0 first:pt-0"
                      >
                        <h2 className="card-title text-[clamp(1.24rem,1.65vw,1.55rem)]">
                          {step.title}
                        </h2>
                        <p className="body-copy mt-3">{step.body}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </div>

              <div className="grid gap-4">
                <QuoteIntakeFlow />

                <article className="rounded-[1.6rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.9)] p-6 shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Best fit for this flow
                  </p>
                  <ul className="mt-5 grid gap-4">
                    {quoteLanes.map((item) => (
                      <li key={item} className="detail-item text-[0.95rem] leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)]">
                    Prefer live help before you book? Site chat stays live, and the Pelham office
                    can still route the project directly.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-line)] bg-[rgba(255,255,255,0.82)]">
          <div className="container-shell grid gap-4 py-8 lg:grid-cols-3">
            <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-6">
              <p className="ui-heading text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Step structure
              </p>
              <h2 className="card-title mt-4 text-[clamp(1.24rem,1.7vw,1.6rem)]">
                Contact, project, timing, then booking.
              </h2>
              <p className="body-copy mt-3">
                The flow is deliberately short, but each step owns a specific validation job before
                the live calendar appears.
              </p>
            </article>

            <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-6">
              <p className="ui-heading text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Tracking
              </p>
              <h2 className="card-title mt-4 text-[clamp(1.24rem,1.7vw,1.6rem)]">
                Meaningful host-side events at each step.
              </h2>
              <p className="body-copy mt-3">
                GTM signals fire for step views, step completions, validation failures, the GHL
                handoff, and the calendar load itself.
              </p>
            </article>

            <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-6">
              <p className="ui-heading text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Ops safety
              </p>
              <h2 className="card-title mt-4 text-[clamp(1.24rem,1.7vw,1.6rem)]">
                Booking still lands in the current GHL system of record.
              </h2>
              <p className="body-copy mt-3">
                This pass stops short of replacing booking ownership or appointment-booked
                automation, which keeps the safest operational path intact.
              </p>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
