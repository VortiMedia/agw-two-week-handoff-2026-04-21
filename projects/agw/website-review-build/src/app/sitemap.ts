import type { MetadataRoute } from "next";
import { LIVE_ROUTES, SITEMAP_LAST_MODIFIED, toAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return LIVE_ROUTES.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: SITEMAP_LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
