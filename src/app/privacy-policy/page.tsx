import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy | A.G. Williams",
  description:
    "Launch placeholder privacy policy for A.G. Williams while final legal language, vendor disclosures, and retention details are still being prepared.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const highlights = [
  "Draft privacy language",
  "Covers site, chat, and booking intent",
  "Final legal review pending",
] as const;

const cards = [
  {
    eyebrow: "Current purpose",
    title: "This page exists so launch does not ship without a privacy route.",
    body:
      "It is intentionally cautious placeholder copy that describes the likely categories of information involved in inquiries, bookings, and site operations without overstating finalized legal positions.",
  },
  {
    eyebrow: "Needs completion",
    title: "Vendor-specific disclosure and retention language still need to be finalized.",
    body:
      "The final production version should be reviewed against AGW's actual tooling, including booking, chat, analytics, and any CRM or notification stack used at cutover.",
  },
] as const;

const sections = [
  {
    title: "Information AGW may receive",
    body:
      "Visitors may provide basic contact and project information when using the website, the quote route, chat, phone support, or the linked booking flow.",
    items: [
      "Name, phone number, email address, and property location details",
      "Project notes, timing needs, scope descriptions, and submitted photos",
      "Basic website interaction data used for performance, analytics, or troubleshooting",
    ],
  },
  {
    title: "How that information may be used",
    body:
      "The practical intent is straightforward: respond to inquiries, route estimates correctly, support scheduling, and operate the website responsibly during launch.",
    items: [
      "Respond to estimate and contact requests",
      "Coordinate residential walkthroughs or commercial consultations",
      "Maintain site operations, analytics, and customer-support follow-up",
    ],
  },
  {
    title: "What is still missing",
    body:
      "This placeholder should be replaced by final legal copy once AGW confirms the exact vendor list, retention expectations, and any jurisdiction-specific disclosures it needs to make.",
    items: [
      "Named third-party services and processors",
      "Retention windows and deletion workflow details",
      "Final instructions for privacy-specific questions or requests",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <UtilityPageShell
      currentPath="/privacy-policy"
      eyebrow="Launch placeholder"
      title="Privacy practices placeholder for the A.G. Williams website."
      intro="This page is a temporary privacy-policy route for launch blocking coverage. It gives visitors a clear explanation of the site's current intent around inquiry, booking, and support data while the final legal copy is still being prepared."
      highlights={highlights}
      primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Main Office", href: CONTACT.mainPhoneHref }}
      cards={cards}
      sections={sections}
      placeholderNote="Launch placeholder only. This is not final legal advice or final AGW policy language, and it should be replaced after legal and vendor review."
    />
  );
}
