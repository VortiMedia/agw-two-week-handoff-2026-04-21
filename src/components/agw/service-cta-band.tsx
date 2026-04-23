import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";

type ServiceCtaBandProps = {
  trackingContext: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  detailItems?: readonly string[];
};

export function ServiceCtaBand({
  trackingContext,
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  detailItems = [],
}: ServiceCtaBandProps) {
  return (
    <section className="bg-[var(--color-primary)]">
      <div className="container-shell grid gap-8 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="section-label !border-white/15 !bg-white/10 !text-white">{eyebrow}</p>
          <h2 className="page-title mt-4 max-w-3xl !text-white">{title}</h2>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-white/82">{body}</p>
        </div>

        <div className="grid gap-6 lg:justify-items-end">
          {detailItems.length ? (
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {detailItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/88"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              className="button-primary button-primary--light"
              href={primaryCta.href}
              tracking={{
                event: "quote_cta_click",
                location: "service_cta_band_primary",
                label: primaryCta.label,
                context: trackingContext,
              }}
            >
              {primaryCta.label}
            </TrackedLink>
            <Link className="button-secondary button-secondary--dark" href={secondaryCta.href}>
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
