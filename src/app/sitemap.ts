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

    // Docs
    {
      url: `${SITE_URL}/docs/editorial-standards`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/android-device-maintenance`,
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
    {
      url: `${SITE_URL}/docs/technical-writing-workflow`,
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
      url: `${SITE_URL}/docs/backup-strategies`,
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
      url: `${SITE_URL}/docs/browser-privacy`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/docs/configuring-automatic-updates`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/disk-health`,
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
      url: `${SITE_URL}/docs/local-backups`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/log-rotation`,
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
      url: `${SITE_URL}/docs/managing-app-permissions`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/network-optimizations`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/network-troubleshooting`,
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
      url: `${SITE_URL}/docs/service-monitoring`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/vpn-best-practices`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/rollback-os-updates`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/secure-ssh-basics`,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/safe-driver-updates`,
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
