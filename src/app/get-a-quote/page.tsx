import type { Metadata } from "next";
import { QuoteIntakeFlow } from "@/components/quote-intake-flow";
import { SiteShell } from "@/components/agw/site-shell";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Get a Quote | A.G. Williams",
  description:
    "Send a painting quote request to A.G. Williams for residential, commercial, cabinet, and specialty painting work.",
  path: "/get-a-quote",
  keywords: [
    "painting estimate",
    "commercial painting consultation",
    "residential painting walkthrough",
  ],
});

const pillars = [
  {
    title: "Written, itemized estimate",
    body: "Scope and pricing tied to the rooms, surfaces, access, and finish expectations.",
  },
  {
    title: "Financing available",
    body: "0% APR options can be reviewed with qualifying residential project estimates.",
  },
  {
    title: "Office follow-up",
    body: `Prefer to talk first? Call the Pelham office at ${CONTACT.localPhoneLabel}.`,
  },
] as const;

export default function GetAQuotePage() {
  return (
    <SiteShell currentPath="/get-a-quote">
      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-16 md:px-12 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:items-start [&>*]:min-w-0">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
              <span aria-hidden className="h-px w-8 bg-agw-blue" />
              Start your project
            </span>
            <h1 className="font-display text-[clamp(36px,4.4vw,60px)] font-bold leading-[1.15] tracking-[-0.02em] text-agw-blue-ink">
              Start with a walkthrough.{" "}
              <em className="italic text-agw-blue">No pressure, no obligation.</em>
            </h1>
            <p className="mt-5 max-w-[44ch] font-sans text-[17px] leading-[1.6] text-agw-ink">
              Send the project type, town, contact details, and notes A.G. Williams should know
              before follow-up. The office reviews the request and confirms the right next step.
            </p>

            <div className="mt-9 border-t border-agw-bone pt-7">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className={[
                    "grid gap-2 py-4 sm:grid-cols-[11rem_1fr]",
                    index > 0 ? "border-t border-agw-bone" : "",
                  ].join(" ")}
                >
                  <h2 className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
                    {pillar.title}
                  </h2>
                  <p className="font-sans text-[15px] font-medium leading-7 text-agw-ink">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <QuoteIntakeFlow sourceContext="quote_page" />
        </section>
      </main>
    </SiteShell>
  );
}
