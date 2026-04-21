import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { AGW_CURATED_PHOTOS, AGW_LIVE_ASSETS } from "@/lib/brand-assets";
import {
  CONTACT,
  HERITAGE_POINTS,
  HERITAGE_THEMES,
  QUOTE_URL,
  SERVICE_AREAS,
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
        <section className="hero-section border-b border-[var(--color-line)]">
          <div className="container-shell py-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div className="lg:max-w-xl">
                <span className="kicker">Since 1906</span>
                <h1 className="page-title mt-4 max-w-[12ch]">
                  A.G. Williams still works like a local company with a name to protect.
                </h1>
                <p className="lead-copy mt-5 max-w-xl">
                  The company has served this region since 1906, and the current operation is still
                  visible the same way a local contractor should be: Pelham office, branded
                  vehicles, full-time crews, and work that has to hold up close to home.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link className="button-primary" href={QUOTE_URL}>
                    Get a Quote
                  </Link>
                  <Link
                    className="text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-80"
                    href={CONTACT.localPhoneHref}
                  >
                    Call Pelham office: {CONTACT.localPhoneLabel}
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Pelham office
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      Local office still routing residential and commercial work.
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Regional work
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      {SERVICE_AREAS.join(", ")}
                    </p>
                  </div>
                  <div className="border-t border-[var(--color-line)] pt-3">
                    <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                      Accountability
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">
                      A local name still has to hold up on the next referral.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] lg:row-span-2">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={AGW_CURATED_PHOTOS.heritageVan}
                      alt="A.G. Williams service vehicle in the workshop with company branding"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="grid gap-4 border-t border-[var(--color-line)] p-5 sm:grid-cols-[1fr_1fr] sm:p-6">
                    <div>
                      <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Local proof
                      </p>
                      <p className="mt-3 display-font text-[1.45rem] leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
                        The company name is still on the vehicles and the work is still close to home.
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                      The same regional reputation still matters because present-day work, vehicles,
                      and office operations are all visible in the counties the company serves.
                    </p>
                  </div>
                </article>

                <article className="overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={AGW_CURATED_PHOTOS.exteriorProcess}
                      alt="A.G. Williams painter working on an exterior detail"
                      fill
                      sizes="(max-width: 1024px) 100vw, 24vw"
                      className="object-cover"
                    />
                  </div>
                </article>

                <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Main office
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[var(--color-text)]">
                    {CONTACT.officeAddress}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                    Pelham office: {CONTACT.localPhoneLabel}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-b border-[var(--color-line)] bg-white">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">Who still carries the name</span>
              <h2 className="section-title mt-4">
                The crews, vehicles, and local office are still part of the present-day operation.
              </h2>
            </div>

            <article className="mt-10 overflow-hidden border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[21/7]">
                <Image
                  src={AGW_LIVE_ASSETS.teamPhoto}
                  alt="A.G. Williams team photo with company vehicles"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="grid gap-6 border-t border-[var(--color-line)] p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
                <div>
                  <p className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Present-day proof
                  </p>
                  <p className="mt-3 body-copy">
                    Heritage only matters if the current company still behaves like a local
                    contractor. That means visible crews, visible vehicles, and a real office that
                    still routes work in the same region.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {HERITAGE_POINTS.map((point) => (
                    <article
                      key={point.title}
                      className="border-l-2 border-[var(--color-primary)] bg-[rgba(249,248,242,0.82)] px-4 py-4"
                    >
                      <h2 className="ui-heading text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        {point.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-[var(--color-text-soft)]">
                        {point.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section-space bg-[rgba(255,255,255,0.76)]">
          <div className="container-shell">
            <div className="max-w-3xl">
              <span className="section-label">What clients still expect</span>
              <h2 className="section-title mt-4">
                Long history only matters if the work still holds up.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {HERITAGE_THEMES.map((theme) => (
                <article
                  key={theme.title}
                  className="border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="card-title text-[clamp(1.4rem,1.8vw,1.75rem)]">
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
