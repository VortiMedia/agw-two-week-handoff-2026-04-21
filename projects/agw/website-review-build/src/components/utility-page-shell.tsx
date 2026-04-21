import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { TrackedLink } from "@/components/tracked-link";
import type { SitePath } from "@/lib/site-data";

type UtilityCard = {
  eyebrow: string;
  title: string;
  body: string;
};

type UtilitySection = {
  title: string;
  body: string;
  items?: readonly string[];
};

type UtilityPageShellProps = {
  currentPath: SitePath;
  eyebrow: string;
  title: string;
  intro: string;
  highlights: readonly string[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  cards: readonly UtilityCard[];
  sections: readonly UtilitySection[];
  placeholderNote: string;
};

export function UtilityPageShell({
  currentPath,
  eyebrow,
  title,
  intro,
  highlights,
  primaryCta,
  secondaryCta,
  cards,
  sections,
  placeholderNote,
}: UtilityPageShellProps) {
  const trackingContext = currentPath.slice(1) || "homepage";

  return (
    <SiteShell currentPath={currentPath}>
      <main>
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:max-w-xl">
                <span className="kicker">{eyebrow}</span>
                <h1 className="page-title mt-4 max-w-[13ch]">{title}</h1>
                <p className="lead-copy mt-5 max-w-xl">{intro}</p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <TrackedLink
                    className="button-primary"
                    href={primaryCta.href}
                    tracking={{
                      event: "quote_cta_click",
                      location: "utility_page_primary",
                      label: primaryCta.label,
                      context: trackingContext,
                    }}
                  >
                    {primaryCta.label}
                  </TrackedLink>
                  <Link className="button-secondary" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="info-pill justify-start border-[rgba(0,99,176,0.14)] bg-white/92 text-[var(--color-primary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                {cards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[1.6rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
                  >
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      {card.eyebrow}
                    </p>
                    <h2 className="card-title mt-3 text-[clamp(1.35rem,1.9vw,1.75rem)]">
                      {card.title}
                    </h2>
                    <p className="body-copy mt-3">{card.body}</p>
                  </article>
                ))}

                <article className="rounded-[1.6rem] border border-[var(--color-border)] bg-[rgba(249,248,242,0.92)] p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Placeholder status
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                    {placeholderNote}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-5 lg:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section.title}
                className="site-card rounded-[1.6rem] p-6"
              >
                <h2 className="card-title text-[clamp(1.35rem,1.9vw,1.75rem)]">
                  {section.title}
                </h2>
                <p className="body-copy mt-4">{section.body}</p>
                {section.items?.length ? (
                  <ul className="mt-5 grid gap-4">
                    {section.items.map((item) => (
                      <li key={item} className="detail-item text-[0.95rem] leading-7">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
