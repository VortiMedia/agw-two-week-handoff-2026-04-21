import type { Metadata } from "next";
import { UtilityPageShell } from "@/components/agw/utility-page-shell";
import { CONTACT, QUOTE_URL, SERVICE_AREAS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | A.G. Williams",
  description:
    "About A.G. Williams Painting, a Pelham-based residential and commercial painting company serving the region since 1906.",
  alternates: {
    canonical: "/about",
  },
};

const highlights = [
  "Since 1906",
  "Pelham office",
] as const;

const cards = [
  {
    eyebrow: "Local operation",
    title: "A regional painting company with a real office behind the work.",
    body:
      "The company routes residential, commercial, and specialty painting requests through its Pelham office, with full-time crews and a reputation built close to home.",
  },
  {
    eyebrow: "Since 1906",
    title: "The present-day work still has to hold up locally.",
    body:
      "A.G. Williams has served homes, estates, commercial properties, and facilities across the same regional footprint for generations.",
  },
] as const;

const sections = [
  {
    title: "What the company does",
    body:
      "A.G. Williams Painting serves homes, occupied buildings, and specialty coating scopes across its regional footprint. The site separates residential walkthroughs from commercial consultations so visitors start in the right process.",
    items: [
      "Residential painting, cabinetry, and detail-heavy finish work",
      "Commercial painting planned for occupied properties and active jobsites",
      "Related specialty scopes including fireproofing and floor coatings",
    ],
  },
  {
    title: "Where AGW works",
    body:
      "The service footprint is centered on local accountability from the Pelham office.",
    items: SERVICE_AREAS,
  },
  {
    title: "How the process starts",
    body:
      "Most projects begin with a short intake, then move to the right residential walkthrough, commercial consultation, or specialty review.",
    items: [
      "Residential work is reviewed around rooms, surfaces, protection, and finish expectations.",
      "Commercial work is reviewed around access, schedule, documentation, and occupied-property constraints.",
      "Cabinet and specialty work is reviewed around substrate, finish system, and project conditions.",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <UtilityPageShell
      currentPath="/about"
      eyebrow="Since 1906"
      title="A local painting company with more than a century behind the name."
      intro="A.G. Williams Painting serves homeowners, property managers, facility teams, and general contractors across Westchester, Fairfield, Rockland, and Putnam. The work starts with clear routing and stays tied to the local office responsible for the estimate."
      highlights={highlights}
      primaryCta={{ label: "Get a Quote", href: QUOTE_URL }}
      secondaryCta={{ label: "Call Pelham Office", href: CONTACT.localPhoneHref }}
      cards={cards}
      sections={sections}
      supportNote="The office can confirm service fit, project timing, and the right next step before an estimator is assigned."
    />
  );
}
