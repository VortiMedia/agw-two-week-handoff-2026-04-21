import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Accessibility | A.G. Williams",
  description:
    "Accessibility support placeholder for the A.G. Williams website, with office contact details available while a fuller accessibility pass is still pending.",
  alternates: {
    canonical: "/accessibility",
  },
};

const highlights = [
  "Accessibility contact path available",
  "Hardening pass still pending",
  "Office fallback is live",
] as const;

const cards = [
  {
    eyebrow: "Launch intent",
    title: "This page gives visitors a direct accessibility support path during cutover.",
    body:
      "It is designed to cover the launch gap now while the fuller accessibility review and statement are still part of the hardening backlog.",
  },
  {
    eyebrow: "No overclaiming",
    title: "The current page does not claim a completed conformance audit.",
    body:
      "That language should only be added after AGW finishes the planned accessibility pass and confirms the standard it wants to publish against.",
  },
] as const;

const sections = [
  {
    title: "How to get help",
    body:
      "If a visitor has trouble using the site or needs information in another format, the office remains the immediate fallback path during launch.",
    items: [
      `Pelham office: ${CONTACT.localPhoneLabel}`,
      `Main office: ${CONTACT.mainPhoneLabel}`,
      `Mailing address: ${CONTACT.officeAddress}`,
    ],
  },
  {
    title: "Current accessibility posture",
    body:
      "The site is being built with semantic Next.js routes, responsive layouts, and readable contrast-aware styling, but the formal accessibility hardening pass referenced in the audit work has not been completed yet.",
    items: [
      "Visitors should be able to navigate to support by phone if a page or control is difficult to use.",
      "Accessibility improvements should continue alongside production QA.",
      "Any confirmed issues found after launch should be prioritized for remediation.",
    ],
  },
  {
    title: "What still needs to happen",
    body:
      "A fuller accessibility statement should replace this placeholder after testing, remediation, and approval of the public-facing standard AGW wants to cite.",
    items: [
      "Manual and automated accessibility testing",
      "Issue tracking and remediation confirmation",
      "Final public statement with approved review date language",
    ],
  },
] as const;

export default function AccessibilityPage() {
  return (
    <UtilityPageShell
      currentPath="/accessibility"
      eyebrow="Accessibility support"
      title="Accessibility support is available now, with a fuller statement to follow."
      intro="This launch placeholder provides an immediate support path for accessibility-related issues without making claims the site has not yet validated through a full audit. It keeps the route live now and leaves room for a more formal statement after hardening."
      highlights={highlights}
      primaryCta={{ label: "Start a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Pelham Office", href: CONTACT.localPhoneHref }}
      cards={cards}
      sections={sections}
      placeholderNote="Launch placeholder only. A formal accessibility statement and audit-backed conformance language still need a dedicated hardening pass."
    />
  );
}
