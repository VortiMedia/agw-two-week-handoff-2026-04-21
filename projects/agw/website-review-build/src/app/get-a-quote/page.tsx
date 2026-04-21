import type { Metadata } from "next";
import Script from "next/script";
import { SiteShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import { CONTACT, GHL_BOOKING_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Get a Quote | A.G. Williams",
  description:
    "Start your AGW quote inside the site, then continue into the live booking flow for a residential walkthrough or commercial consultation.",
  alternates: {
    canonical: "/get-a-quote",
  },
};

const nextSteps = [
  {
    title: "Route the property correctly",
    body:
      "Residential walkthroughs, commercial consultations, and specialty coating scopes should not start from the wrong intake lane.",
  },
  {
    title: "Keep the current booking chain intact",
    body:
      "The next step still hands off to AGW's live booking flow so the current office and customer-care process stay in place.",
  },
  {
    title: "Use the office if the job needs context first",
    body:
      "If you would rather talk through the property before booking, the Pelham office and site chat remain the safe fallback.",
  },
] as const;

const quoteLanes = [
  "Residential walkthroughs for interiors, exteriors, cabinetry, and finish-heavy rooms.",
  "Commercial consultations for occupied properties, coatings, fireproofing, and documentation-heavy scopes.",
  "Local office support when the next step needs to be clarified before a booking is made.",
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
            quote_route_version: "bridge_v1",
          });
        `}
      </Script>

      <main>
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:max-w-xl">
                <span className="kicker">Internal quote route</span>
                <h1 className="page-title mt-4 max-w-[12ch]">
                  Start with A.G. Williams here, then continue into the live booking flow.
                </h1>
                <p className="lead-copy mt-5 max-w-xl">
                  This route keeps the first quote step inside the AGW site, then hands off to the
                  current booking flow for the actual residential walkthrough or commercial
                  consultation. The office, the booking backend, and the customer-care process stay
                  intact.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <TrackedLink
                    className="button-primary"
                    href={GHL_BOOKING_URL}
                    tracking={{
                      event: "quote_handoff_click",
                      location: "quote_route_primary",
                      label: "Continue to Booking",
                      context: "quote-route",
                    }}
                  >
                    Continue to Booking
                  </TrackedLink>
                  <TrackedLink
                    className="button-secondary"
                    href={CONTACT.localPhoneHref}
                    tracking={{
                      event: "quote_support_click",
                      location: "quote_route_secondary",
                      label: `Call Pelham office: ${CONTACT.localPhoneLabel}`,
                      context: "quote-route",
                    }}
                  >
                    Call Pelham office
                  </TrackedLink>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                <article className="rounded-[1.6rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    What this route protects
                  </p>
                  <div className="mt-5 grid gap-4">
                    {nextSteps.map((step) => (
                      <article
                        key={step.title}
                        className="border-t border-[var(--color-line)] pt-4 first:border-t-0 first:pt-0"
                      >
                        <h2 className="card-title text-[clamp(1.35rem,1.9vw,1.75rem)]">
                          {step.title}
                        </h2>
                        <p className="body-copy mt-3">{step.body}</p>
                      </article>
                    ))}
                  </div>
                </article>

                <article className="rounded-[1.6rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.9)] p-6 shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Best fit for this path
                  </p>
                  <ul className="mt-5 grid gap-4">
                    {quoteLanes.map((item) => (
                      <li key={item} className="detail-item text-[0.95rem] leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-7 text-[var(--color-text-soft)]">
                    Prefer live help before you book? The existing site chat remains available, and
                    the Pelham office can route the project directly.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
