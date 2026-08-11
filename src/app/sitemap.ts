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

    // Docs — canonical pages only (redirect stubs are excluded)
    {
      url: `${SITE_URL}/docs/android-hardening-optimization`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/battery-wear`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/content-review-checklist`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/documentation-qa-framework`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/editorial-standards`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/incident-runbook`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/infrastructure-admin-monitoring`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/interpreting-system-logs`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/managing-app-permissions`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/measuring-performance-safely`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/network-architecture-optimization`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/storage-backup-dr`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/technical-writing-workflow`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/windows-security-baseline`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },

    // Site utility pages
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
