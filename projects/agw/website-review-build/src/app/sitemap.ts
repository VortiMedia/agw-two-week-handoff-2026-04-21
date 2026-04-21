import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-04-16T00:00:00.000Z";

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
  ];
}
