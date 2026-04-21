import type { Metadata, MetadataRoute } from "next";
import { SITE_NAME, SITE_URL, type SitePath } from "@/lib/site-data";

type RouteImage = {
  url: string;
  alt: string;
};

type RouteMetadataInput = {
  title: string;
  description: string;
  path: SitePath;
  keywords?: string[];
  image?: RouteImage;
};

type SitemapRoute = {
  path: SitePath;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const SITEMAP_LAST_MODIFIED = "2026-04-21T00:00:00.000Z";

export const LIVE_ROUTES: SitemapRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/commercial",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/residential",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/heritage",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/get-a-quote",
    changeFrequency: "weekly",
    priority: 0.7,
  },
];

export function toAbsoluteUrl(path: SitePath) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
}: RouteMetadataInput): Metadata {
  const absoluteUrl = toAbsoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      ...(image
        ? {
            images: [
              {
                url: image.url,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
