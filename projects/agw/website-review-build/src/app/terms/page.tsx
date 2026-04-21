import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms | A.G. Williams",
  description:
    "Launch placeholder terms page for the A.G. Williams website while final legal review and business-specific website terms are still pending.",
  alternates: {
    canonical: "/terms",
  },
};

const highlights = [
  "Draft website terms",
  "Launch-safe placeholder",
  "Final review pending",
] as const;

const cards = [
  {
    eyebrow: "Scope",
    title: "These draft terms are limited to use of the website, not the full project contract.",
    body:
      "Estimate approvals, job scopes, and project execution should continue to be governed by AGW's actual proposals and signed agreements rather than placeholder website copy.",
  },
  {
    eyebrow: "Practical purpose",
    title: "The route exists now so launch does not leave terms coverage undefined.",
    body:
      "It sets a cautious expectation around site content, linked tools, and the non-binding nature of general website information until the final legal version is ready.",
  },
] as const;

const sections = [
  {
    title: "Use of the site",
    body:
      "Visitors may browse the site, request contact, and use the quote path for lawful business purposes. Website content is presented as general company and service information and may change as launch materials are refined.",
    items: [
      "Do not misuse forms, chat, or booking tools",
      "Do not rely on public website copy as a final project agreement",
      "Expect pages, wording, and site features to evolve as the rebuild matures",
    ],
  },
  {
    title: "Estimates and third-party tools",
    body:
      "The internal quote route and any linked booking or chat tools help start the intake process, but they do not replace a formal estimate, proposal, or signed scope of work.",
    items: [
      "Website inquiries do not guarantee scheduling or availability",
      "External tools may be subject to their own terms and privacy practices",
      "Project-specific obligations should be confirmed in direct AGW documentation",
    ],
  },
  {
    title: "What still needs legal completion",
    body:
      "The final terms page should be updated with AGW-approved legal language, limitation-of-liability wording, and any additional business rules required for production.",
    items: [
      "Final governing-law and limitation language",
      "Approved intellectual-property and content-use language",
      "A complete update-and-effective-date section",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <UtilityPageShell
      currentPath="/terms"
      eyebrow="Draft terms"
      title="Working website terms for launch, pending final legal review."
      intro="This placeholder terms page gives the launch build a credible baseline without pretending the final legal document is complete. It should be treated as temporary website-usage language only, not as a substitute for AGW's estimate, proposal, or contract documents."
      highlights={highlights}
      primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Main Office", href: CONTACT.mainPhoneHref }}
      cards={cards}
      sections={sections}
      placeholderNote="Launch placeholder only. Final website terms, limitation language, and effective-date details still require legal review."
    />
  );
}
