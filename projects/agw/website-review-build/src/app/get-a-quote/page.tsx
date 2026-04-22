import type { Metadata } from "next";
import { QuoteIntakeFlow } from "@/components/quote-intake-flow";
import { SiteShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Get a Quote | A.G. Williams",
  description:
    "Move through a branded AGW intake with host-controlled validation, then finish inside the live booking calendar without breaking the current office workflow.",
  path: "/get-a-quote",
  keywords: [
    "painting estimate",
    "commercial painting consultation",
    "residential painting walkthrough",
  ],
});

const nextSteps = [
  {
    title: "Route the project before the calendar opens",
    body:
      "Project type, town, and contact details are validated inside the AGW site so weak or junk values do not reach the booking step.",
  },
  {
    title: "Save the intake before the handoff",
    body:
      "The site mirrors the normalized intake to Supabase for attribution, debugging, and abandonment visibility before the live calendar appears.",
  },
  {
    title: "Keep booking in the current GHL system",
    body:
      "The final step still uses the production GHL calendar backend so the office workflow and appointment automation stay intact.",
  },
] as const;

const quoteLanes = [
  "Residential walkthroughs for interiors, exteriors, cabinetry, and finish-sensitive rooms.",
  "Commercial consultations for occupied properties, coatings, fireproofing, and documentation-heavy scopes.",
  "Pelham office support when the estimator should clarify the project before a slot is booked.",
] as const;

export default function GetAQuotePage() {
  return (
    <SiteShell currentPath="/get-a-quote">
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
                  controls. Validation, attribution capture, and mirror-save logic happen here
                  first. The appointment itself is still booked in the current GHL calendar so the
                  office and downstream automation stay intact.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <TrackedLink className="button-primary" href="#quote-booking-flow">
                    Start Your Quote
                  </TrackedLink>
                  <TrackedLink
                    className="button-secondary"
                    href={CONTACT.localPhoneHref}
                    tracking={{
                      event: "quote_phone_click",
                      location: "quote_route_hero",
                      label: CONTACT.localPhoneLabel,
                      context: "agw_quote_flow_v1",
                    }}
                  >
                    Call Pelham office
                  </TrackedLink>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "Since 1906",
                    "Host-controlled validation",
                    "Live GHL calendar",
                  ].map((signal) => (
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
                Project, contact, notes, then booking.
              </h2>
              <p className="body-copy mt-3">
                The flow stays short, but each step owns a specific validation job before the live
                calendar appears.
              </p>
            </article>

            <article className="rounded-[1.45rem] border border-[var(--color-line)] bg-white p-6">
              <p className="ui-heading text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Tracking
              </p>
              <h2 className="card-title mt-4 text-[clamp(1.24rem,1.7vw,1.6rem)]">
                Intentional quote events at every real milestone.
              </h2>
              <p className="body-copy mt-3">
                GTM signals fire for step views, step completions, validation failures, intake save,
                the GHL handoff, calendar load, and phone fallback clicks.
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
                This pass improves the front-end path without replacing booking ownership or
                appointment-booked automation.
              </p>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
