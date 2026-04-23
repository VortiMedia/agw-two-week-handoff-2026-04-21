import type { ReactNode } from "react";

export type FooterLink = {
  label: ReactNode;
  href: string;
  external?: boolean;
};

export type FooterLinkItem = FooterLink | { label: ReactNode; href?: undefined };

export type FooterColumn = {
  heading: ReactNode;
  items: FooterLinkItem[];
};

export type FooterBrand = {
  /** Logo image URL (white variant suitable for dark background). */
  logoSrc: string;
  logoAlt?: string;
  /** Short italic tagline below the logo. */
  tagline: ReactNode;
  /** Small line above the cert chips (e.g. "Established 1906 · Family owned"). */
  established?: ReactNode;
  /** Short cert chips (e.g. "EPA Lead-Safe", "BBB A+"). */
  certs?: ReactNode[];
};

export type FooterBottom = {
  /** Left-hand copyright / legal line. */
  copyright: ReactNode;
  /** Small legal links rendered to the right of the copyright. */
  legalLinks?: FooterLink[];
  /** Optional trailing text (license numbers, GL, etc.). */
  licenseLine?: ReactNode;
};

export type FooterProps = {
  brand: FooterBrand;
  columns: FooterColumn[];
  bottom: FooterBottom;
  className?: string;
};

/**
 * Five-column site footer on deep brand-ink blue.
 * Column 1 is brand (logo, tagline, certs); remaining columns are link lists.
 */
export function Footer({ brand, columns, bottom, className }: FooterProps) {
  return (
    <footer
      className={[
        "relative overflow-hidden",
        "bg-agw-blue-ink text-agw-ivory",
        "px-6 pt-20 pb-8 md:px-12",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen",
          "bg-[radial-gradient(circle_at_80%_20%,rgba(108,187,232,0.35),transparent_55%)]",
        ].join(" ")}
      />

      <div
        className={[
          "relative mx-auto max-w-[1440px]",
          "grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12",
          "lg:grid-cols-[1.7fr_0.9fr_0.9fr_1.2fr]",
          "border-b border-agw-ivory/15 pb-14",
        ].join(" ")}
      >
        <div className="lg:pr-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logoSrc}
            alt={brand.logoAlt ?? "A.G. Williams Painting Company"}
            className="mb-5 h-auto w-[260px]"
          />
          <p
            className={[
              "m-0 mb-5 max-w-[34ch]",
              "font-display italic font-normal text-[17px] leading-[1.45]",
              "text-agw-ivory/85",
            ].join(" ")}
          >
            {brand.tagline}
          </p>
          {brand.established ? (
            <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-agw-celeste">
              {brand.established}
            </div>
          ) : null}
          {brand.certs && brand.certs.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {brand.certs.map((cert, i) => (
                <span
                  key={i}
                  className={[
                    "rounded-[2px] border border-agw-ivory/20",
                    "px-2.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.08em]",
                    "text-agw-ivory/80",
                  ].join(" ")}
                >
                  {cert}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {columns.map((col, i) => (
          <FooterColumnBlock key={i} column={col} />
        ))}
      </div>

      <div
        className={[
          "relative mx-auto mt-8 flex max-w-[1440px] flex-wrap justify-between gap-5",
          "font-sans text-[11px] tracking-[0.03em] text-agw-ivory/55",
        ].join(" ")}
      >
        <div>{bottom.copyright}</div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {bottom.legalLinks?.map((link, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-agw-ivory/70 transition-colors hover:text-agw-celeste"
              >
                {link.label}
              </a>
              <span aria-hidden className="text-agw-ivory/40">·</span>
            </span>
          ))}
          {bottom.licenseLine ? <span>{bottom.licenseLine}</span> : null}
        </div>
      </div>
    </footer>
  );
}

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h5
        className={[
          "m-0 mb-5 font-sans text-[12px] font-semibold uppercase",
          "tracking-[0.1em] text-agw-celeste",
        ].join(" ")}
      >
        {column.heading}
      </h5>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {column.items.map((item, i) => (
          <li
            key={i}
            className="font-sans text-[13px] text-agw-ivory/85"
          >
            {"href" in item && item.href ? (
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="transition-colors hover:text-agw-celeste"
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
