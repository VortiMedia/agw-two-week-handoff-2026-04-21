import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-04-21T00:00:00.000Z";

  return [
    {
      url: "https://agwilliamspainting.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://agwilliamspainting.com/commercial",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://agwilliamspainting.com/residential",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://agwilliamspainting.com/heritage",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://agwilliamspainting.com/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://agwilliamspainting.com/contact",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://agwilliamspainting.com/privacy-policy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://agwilliamspainting.com/terms",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://agwilliamspainting.com/accessibility",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
