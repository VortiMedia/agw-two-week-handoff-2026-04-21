import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageTemplate } from "@/components/agw/landing-page-template";
import {
  GOOGLE_ADS_LANDING_PAGES,
  getGoogleAdsLandingPage,
} from "@/lib/landing-pages";
import { buildPageMetadata } from "@/lib/seo";

type LandingPageRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return GOOGLE_ADS_LANDING_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: LandingPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGoogleAdsLandingPage(slug);

  if (!page) {
    return {};
  }

  return buildPageMetadata({
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    path: page.path,
    image: {
      url: page.heroImage.src as string,
      alt: page.heroImage.alt,
    },
  });
}

export default async function GoogleAdsLandingPage({
  params,
}: LandingPageRouteProps) {
  const { slug } = await params;
  const page = getGoogleAdsLandingPage(slug);

  if (!page) {
    notFound();
  }

  return <LandingPageTemplate page={page} />;
}
