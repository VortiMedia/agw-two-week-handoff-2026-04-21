import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/agw/utility-page-shell";
import { CONTACT, QUOTE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | A.G. Williams",
  description:
    "Contact A.G. Williams Painting for residential walkthroughs, commercial consultations, and project questions.",
  alternates: {
    canonical: "/contact",
  },
};

const highlights = [
  "Pelham office",
  "Quote intake",
] as const;

const cards = [
  {
    eyebrow: "Main office",
    title: "Call first if the project needs context.",
    body:
      "That keeps homeowners, commercial buyers, and specialty scopes from starting in the wrong lane before AGW has the basic job details.",
  },
  {
    eyebrow: "Quote path",
    title: "Use the form when details should be saved in writing.",
    body:
      "The form collects the property, contact, timing, and scope information the office needs before follow-up.",
  },
] as const;

const sections = [
  {
    title: "Current contact paths",
    body:
      "These are the primary ways to reach the team and start the right estimate path.",
    items: [
      `Main office: ${CONTACT.mainPhoneLabel}`,
      `Pelham office: ${CONTACT.localPhoneLabel}`,
      `Office address: ${CONTACT.officeAddress}`,
      "Use the quote form for estimate intake that should be reviewed by the office.",
    ],
  },
  {
    title: "What to expect",
    body:
      "A.G. Williams uses the office to sort residential walkthroughs, commercial consultations, and specialty scopes before the estimate process starts.",
    items: [
      "Residential requests should lead toward the walkthrough lane.",
      "Commercial scopes should be clarified early if access, coatings, or documentation are involved.",
      "Live chat remains a fallback path when a visitor needs help before submitting details.",
    ],
  },
  {
    title: "What helps the office respond",
    body:
      "A short description is enough to start. The office can clarify surfaces, timing, access, and finish expectations after the request is received.",
    items: [
      "Property town and project type",
      "Residential or commercial context",
      "Timing needs and any access concerns",
    ],
  },
] as const;

export default function ContactPage() {
  return (
    <UtilityPageShell
      currentPath="/contact"
      eyebrow="Pelham office"
      title="Call the office or send the project details."
      intro="Call A.G. Williams or send the project details through the quote form. The office reviews the request and routes residential, commercial, and specialty scopes to the right next step."
      highlights={highlights}
      primaryCta={{ label: "Start a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Pelham Office", href: CONTACT.localPhoneHref }}
      cards={cards}
      sections={sections}
      supportNote="For urgent or complex work, call the office directly so access, timing, and scope can be clarified first."
    />
  );
}
