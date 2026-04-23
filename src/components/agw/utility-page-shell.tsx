import { Button } from "@/components/agw/button";
import { SiteShell } from "@/components/agw/site-shell";
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
  supportNote: string;
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
  supportNote,
}: UtilityPageShellProps) {
  return (
    <SiteShell currentPath={currentPath}>
      <main>
        <section className="border-b border-agw-bone bg-agw-ivory">
          <div className="mx-auto w-full max-w-[1040px] px-6 py-16 md:px-12 md:py-24">
            <span className="mb-5 inline-flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-agw-blue">
              <span aria-hidden className="h-px w-8 bg-agw-blue" />
              {eyebrow}
            </span>
            <h1 className="max-w-[13ch] font-display text-[clamp(40px,4.6vw,64px)] font-bold leading-[1.12] tracking-[-0.02em] text-agw-blue-ink">
              {title}
            </h1>
            <p className="mt-6 max-w-[64ch] font-sans text-[17px] leading-8 text-agw-ink">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              <Button href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </Button>
            </div>
            {highlights.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-agw-bone pt-5">
                {highlights.map((item) => (
                  <span key={item} className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-agw-blue">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid w-full max-w-[1040px] gap-12 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[0.62fr_1.38fr]">
            <aside className="space-y-5">
              {cards.map((card) => (
                <article key={card.title} className="rounded-md border border-agw-bone bg-agw-ivory p-5">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-agw-blue">
                    {card.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-[22px] font-bold leading-tight text-agw-blue-ink">
                    {card.title}
                  </h2>
                  <p className="mt-3 font-sans text-[14px] leading-7 text-agw-ink-soft">
                    {card.body}
                  </p>
                </article>
              ))}
            </aside>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.title} className="border-t border-agw-bone pt-7 first:border-t-0 first:pt-0">
                  <h2 className="font-display text-[clamp(28px,3vw,38px)] font-bold leading-tight text-agw-blue-ink">
                    {section.title}
                  </h2>
                  <p className="mt-4 font-sans text-[15px] leading-8 text-agw-ink-soft">
                    {section.body}
                  </p>
                  {section.items?.length ? (
                    <ul className="mt-5 grid gap-3">
                      {section.items.map((item) => (
                        <li key={item} className="font-sans text-[14px] leading-7 text-agw-ink before:mr-3 before:text-agw-blue before:content-['/']">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <p className="rounded-md border border-agw-bone bg-agw-ivory p-5 font-sans text-[14px] leading-7 text-agw-ink-soft">
                {supportNote}
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
