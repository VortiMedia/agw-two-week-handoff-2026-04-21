import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { AGW_LIVE_ASSETS, BRAND_PATTERNS } from "@/lib/brand-assets";
import {
  CONTACT,
  HERITAGE_POINTS,
  HERITAGE_THEMES,
  QUOTE_URL,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Heritage, Craftsmanship, and Local Reputation | A.G. Williams",
  description:
    "The heritage layer behind A.G. Williams: long local roots, craftsmanship, and the standards supporting commercial and residential painting.",
  alternates: {
    canonical: "/heritage",
  },
};

export default function HeritagePage() {
  return (
    <SiteShell currentPath="/heritage">
      <main>
        <section
          className="hero-section border-b border-[var(--color-line)]"
          style={{
            backgroundImage: `radial-gradient(circle at top right, rgba(108, 187, 232, 0.18), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.96)), url(${BRAND_PATTERNS.accent.src})`,
            backgroundRepeat: "repeat",
            backgroundSize: "280px auto",
          }}
        >
          <div className="container-shell grid gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-24">
            <div>
              <span className="kicker">Since 1906</span>
              <h1 className="page-title mt-6 max-w-[12ch]">
                A.G. Williams has served this region since 1906.
              </h1>
              <p className="lead-copy mt-6 max-w-2xl">
                The company still operates like a local contractor with a reputation to protect:
                careful preparation, clear communication, and work that has to hold up close to home.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button-primary" href={QUOTE_URL}>
                  Schedule a Walkthrough
                </Link>
                <Link className="button-secondary" href={CONTACT.localPhoneHref}>
                  Call {CONTACT.localPhoneLabel}
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.35rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <Image
                src={AGW_LIVE_ASSETS.teamPhoto}
                alt="A.G. Williams team in front of company vehicles"
                width={1920}
                height={301}
                className="h-48 w-full object-cover object-[52%_28%] sm:h-56"
              />
              <div className="grid gap-5 p-7 sm:p-8">
                <span className="section-label">Pelham office</span>
                <p className="display-font text-[2rem] leading-[0.98] tracking-[-0.045em] text-[var(--color-primary)]">
                  The heritage means something because the company is still local and still accountable.
                </p>
                <p className="text-[0.98rem] leading-8 text-[var(--color-text-soft)]">
                  The site should let the legacy support the present-day trust story, not hide behind branded mockups. The office, the crews, and the regional reputation are the real proof.
                </p>
                <ul className="flex flex-wrap gap-3">
                  <li className="info-pill">Family-owned legacy</li>
                  <li className="info-pill">Pelham office</li>
                  <li className="info-pill">Century-old standards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]">
              <Image
                src={AGW_LIVE_ASSETS.teamPhoto}
                alt="A.G. Williams team in front of company vehicles"
                width={1920}
                height={301}
                className="h-full min-h-[18rem] w-full object-cover object-[52%_28%]"
              />
            </div>

            <div className="grid gap-4">
              {HERITAGE_POINTS.map((point) => (
                <article key={point.title} className="site-card rounded-[1.85rem] p-6">
                  <h2 className="card-title text-[clamp(1.42rem,2vw,1.88rem)]">
                    {point.title}
                  </h2>
                  <p className="body-copy mt-4">{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-[rgba(255,255,255,0.72)]">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">What clients still expect</span>
              <h2 className="section-title mt-4">
                Long history only matters if the work still holds up.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {HERITAGE_THEMES.map((theme) => (
                <article
                  key={theme.title}
                  className="site-card rounded-[1.85rem] bg-[rgba(255,255,255,0.94)] p-6"
                >
                  <h3 className="card-title text-[clamp(1.36rem,1.8vw,1.75rem)]">
                    {theme.title}
                  </h3>
                  <p className="body-copy mt-4">{theme.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
