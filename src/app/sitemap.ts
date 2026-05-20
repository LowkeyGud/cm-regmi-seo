import { MetadataRoute } from "next";

const SITE_URL = "https://cmregmi.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/ads-and-cookies`,
      lastModified: new Date("2026-05-10"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  return basePages;
}
