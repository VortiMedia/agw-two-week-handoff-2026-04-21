import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/agw/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms | A.G. Williams",
  description:
    "Website terms for using the A.G. Williams Painting site, quote forms, and general service information.",
  alternates: {
    canonical: "/terms",
  },
};

const highlights = [
  "Website use",
  "Quote requests",
] as const;

const cards = [
  {
    eyebrow: "Scope",
    title: "These terms cover website use.",
    body:
      "Estimate approvals, job scopes, and project execution should continue to be governed by AGW's actual proposals and signed agreements rather than general website copy.",
  },
  {
    eyebrow: "Practical purpose",
    title: "The website helps visitors request follow-up.",
    body:
      "General website information is not a final estimate, proposal, warranty document, or signed scope of work.",
  },
] as const;

const sections = [
  {
    title: "Use of the site",
    body:
      "Visitors may browse the site, request contact, and use the quote path for lawful business purposes. Website content is presented as general company and service information and may change as services or operations change.",
    items: [
      "Do not misuse forms, chat, or quote tools",
      "Do not rely on public website copy as a final project agreement",
      "Expect pages, wording, and site features to change as services and operations change",
    ],
  },
  {
    title: "Estimates and support tools",
    body:
      "The quote route and any chat or support tools help start the intake process, but they do not replace a formal estimate, proposal, or signed scope of work.",
    items: [
      "Website inquiries do not guarantee scheduling or availability",
      "External tools may be subject to their own terms and privacy practices",
      "Project-specific obligations should be confirmed in direct AGW documentation",
    ],
  },
  {
    title: "Project obligations",
    body:
      "Project-specific obligations should be confirmed directly with A.G. Williams through the applicable proposal, estimate, agreement, warranty language, or written communication.",
    items: [
      "Website inquiries do not guarantee scheduling or availability",
      "Photos and descriptions may be representative rather than exhaustive",
      "Formal project documents control if website copy differs",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <UtilityPageShell
      currentPath="/terms"
      eyebrow="Website terms"
      title="Website terms for browsing, quote requests, and general service information."
      intro="This page explains how visitors may use the A.G. Williams website. Project commitments, pricing, scheduling, and warranty details require direct confirmation through AGW documents or office communication."
      highlights={highlights}
      primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Main Office", href: CONTACT.mainPhoneHref }}
      cards={cards}
      sections={sections}
      supportNote="Contact the office if a website statement needs to be reconciled with an estimate, proposal, or project document."
    />
  );
}
