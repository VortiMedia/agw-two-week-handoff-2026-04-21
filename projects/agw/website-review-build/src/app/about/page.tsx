import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/utility-page-shell";
import { CONTACT, QUOTE_URL, SERVICE_AREAS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | A.G. Williams",
  description:
    "Launch placeholder about page for A.G. Williams Painting, covering the company basics while the fuller history page is still pending.",
  alternates: {
    canonical: "/about",
  },
};

const highlights = [
  "Since 1906",
  "Pelham office",
  "Residential and commercial work",
] as const;

const cards = [
  {
    eyebrow: "Company baseline",
    title: "A.G. Williams is still positioned as a local painting company, not a generic lead-gen brand.",
    body:
      "The launch pass keeps the core trust signals in place: longevity, a real office, full-time crews, and local routing across the same regional service footprint.",
  },
  {
    eyebrow: "Full history pending",
    title: "This is not the final heritage story or timeline page.",
    body:
      "A fuller about/history surface should replace this once approved company milestones, leadership language, and archival proof points are assembled.",
  },
] as const;

const sections = [
  {
    title: "What the company does",
    body:
      "A.G. Williams Painting serves homes, occupied buildings, and specialty coating scopes across its active regional footprint. The site currently emphasizes the split between residential walkthroughs and commercial consultations so visitors land in the right process.",
    items: [
      "Residential painting, cabinetry, and detail-heavy finish work",
      "Commercial painting planned for occupied properties and active jobsites",
      "Related specialty scopes including fireproofing and floor coatings",
    ],
  },
  {
    title: "Where AGW works",
    body:
      "The service footprint presented on the launch site stays aligned with the existing marketing pages and office-led routing model.",
    items: SERVICE_AREAS,
  },
  {
    title: "What still needs final copy",
    body:
      "The final about page should be more specific than this placeholder. It needs approved history copy, leadership framing, and any brand-safe proof that AGW wants surfaced publicly.",
    items: [
      "Approved company history and timeline details",
      "Leadership or team positioning, if intended for launch",
      "Any final awards, memberships, or credential language",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <UtilityPageShell
      currentPath="/about"
      eyebrow="Since 1906"
      title="A local painting company with more than a century behind the name."
      intro="This placeholder gives the launch site a clean about route now, without pretending the full company story is already migrated. It keeps the trust posture grounded in longevity, local accountability, and the same office-led intake model used elsewhere in the build."
      highlights={highlights}
      primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Pelham Office", href: CONTACT.localPhoneHref }}
      cards={cards}
      sections={sections}
      placeholderNote="Launch placeholder only. Final about/history copy, leadership language, and archival story elements still need business approval."
    />
  );
}
