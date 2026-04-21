import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | A.G. Williams",
  description:
    "Reach the Pelham office, use the internal quote route, or review the current launch placeholder for AGW contact details.",
  alternates: {
    canonical: "/contact",
  },
};

const highlights = [
  "Pelham office routing",
  "Residential and commercial intake",
  "Quote route available on-site",
] as const;

const cards = [
  {
    eyebrow: "Main office",
    title: "Call the office first if the project needs context before booking.",
    body:
      "That keeps homeowners, commercial buyers, and specialty scopes from starting in the wrong lane before AGW has the basic job details.",
  },
  {
    eyebrow: "Launch cutover",
    title: "This route is intentionally simple while the final contact stack is still being finalized.",
    body:
      "Hours, department copy, and any future web form language should be updated once AGW approves the final operating details for launch.",
  },
] as const;

const sections = [
  {
    title: "Current contact paths",
    body:
      "These are the contact options that can safely ship now without changing the current operational handoff.",
    items: [
      `Main office: ${CONTACT.mainPhoneLabel}`,
      `Pelham office: ${CONTACT.localPhoneLabel}`,
      `Office address: ${CONTACT.officeAddress}`,
      "Use the internal quote route for estimate intake that needs to stay inside the site first.",
    ],
  },
  {
    title: "What to expect",
    body:
      "A.G. Williams uses the office to sort residential walkthroughs, commercial consultations, and specialty scopes before the estimate process starts moving.",
    items: [
      "Residential requests should lead toward the walkthrough lane.",
      "Commercial scopes should be clarified early if access, coatings, or documentation are involved.",
      "Live chat remains a fallback path when a visitor needs help before booking.",
    ],
  },
  {
    title: "Copy still pending",
    body:
      "This placeholder should be replaced once final business-hour language, any department-level routing, and the approved launch contact copy are available.",
    items: [
      "Office hours and response-time commitments",
      "Any dedicated email addresses intended for launch",
      "Final wording for quote-routing and support expectations",
    ],
  },
] as const;

export default function ContactPage() {
  return (
    <UtilityPageShell
      currentPath="/contact"
      eyebrow="Pelham office"
      title="Start with the office, and the project gets routed correctly."
      intro="This launch-ready contact page gives visitors a credible path into A.G. Williams now without overbuilding the final contact architecture. The office remains the safest first stop when the property, schedule, or scope still needs context."
      highlights={highlights}
      primaryCta={{ label: "Start a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Pelham Office", href: CONTACT.localPhoneHref }}
      cards={cards}
      sections={sections}
      placeholderNote="Launch placeholder only. Final contact form behavior, office hours, and any departmental routing copy are still pending approval."
    />
  );
}
