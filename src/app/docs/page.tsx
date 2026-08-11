import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import Image from "next/image"; // Optimization: Better LCP and performance
import Link from "next/link";
import Script from "next/script"; // For JSON-LD

export const runtime = "edge";

const SITE_URL = "https://cmregmi.com.np";
const OG_IMAGE = `${SITE_URL}/og-docs.png`;

export const metadata: Metadata = {
  title: "Technical Documentation & Architecture | CM Regmi",
  description:
    "Comprehensive guides on Android kernel optimization, Windows system hardening, and enterprise-grade architecture decision records by CM Regmi.",
  keywords:
    "Android Kernel Tuning, Windows Hardening, System Architecture, EAS Scheduling, Cybersecurity Playbooks",
  alternates: {
    canonical: `${SITE_URL}/docs`,
  },
  openGraph: {
    title: "Technical Documentation & Architecture | CM Regmi",
    description:
      "Explore in-depth playbooks for Android kernel optimization and Windows system hardening strategies.",
    url: `${SITE_URL}/docs`,
    siteName: "CM Regmi",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Technical Documentation Hub - CM Regmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Documentation & Architecture",
    description: "In-depth playbooks for systems optimization",
    images: [OG_IMAGE],
    creator: "@cmregmi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Docs() {
  // JSON-LD for Search Engine Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs#article`,
    headline: "Technical Documentation & Architecture Hub",
    description: "Expert guides on Android kernel optimization and Windows system hardening.",
    url: `${SITE_URL}/docs`,
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    datePublished: "2025-05-24",
    dateModified: new Date().toISOString(),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: { "@id": `${SITE_URL}/docs#webpage` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        {/* Semantic Breadcrumbs for SEO */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Docs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article>
          <header className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Resource Center
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Technical Documentation Hub
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>
                By <strong>CM Regmi</strong>
              </span>
              <span>•</span>
              <time dateTime="2025-05-24">Updated May 2026</time>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              In-depth technical notes, kernel optimization strategies, and system hardening
              playbooks designed for performance-driven engineers.
            </p>
          </header>

          {/* Table of Contents / Quick Links - Helps Google Ads "Navigability" score */}
          <div className="bg-muted/50 p-6 rounded-xl mb-12 border border-border">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4">In this section:</h2>
            <ul className="grid gap-2 text-primary underline underline-offset-4 font-medium">
              <li>
                <a href="#android-kernel">Android Kernel Optimization</a>
              </li>
              <li>
                <a href="#windows-hardening">Windows System Hardening</a>
              </li>
              <li>
                <a href="#library">Documentation Library</a>
              </li>
              <li>
                <a href="#resources">Additional Resources</a>
              </li>
            </ul>
          </div>

          <section id="android-kernel" className="mt-12 space-y-6 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight">Android Kernel Optimization</h2>

            {/* Optimized Image */}
            <div className="relative w-full h-64 overflow-hidden rounded-lg border border-border">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"
                alt="Macro shot of a high-performance computer CPU circuit board representing hardware-level tuning"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Optimizing Android kernels requires an in-depth understanding of the CPU frequency
              governors, task scheduling paradigms, and aggressive thermal thresholds. By modifying
              parameters within
              <strong> EAS (Energy Aware Scheduling)</strong>, developers can achieve significantly
              improved battery life without compromising peak UI responsiveness.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Advanced memory management via <strong>ZRAM tweaking</strong> and adjusting swappiness
              parameters allows resource-constrained devices to handle large context-switching
              payloads efficiently. Overclocking the GPU and undervolting the CPU requires careful
              stability testing to prevent random soft-reboots under heavy compute workloads.
            </p>
          </section>

          <section id="windows-hardening" className="mt-16 space-y-6 scroll-mt-20">
            <h2 className="text-3xl font-bold tracking-tight">Windows System Hardening</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reducing the attack surface of a Windows environment through strict{" "}
              <strong>Group Policy Objects (GPO)</strong>
              enforcement and telemetry disabling is fundamental for a secured enterprise node.
              Hardening typically begins with the principle of least privilege, stripping local
              administrator rights and restricting execution environments using{" "}
              <strong>AppLocker</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              System administrators should implement rigorous firewall rulesets, disabling SMBv1,
              and enforcing NTLM signing. The implementation of modern{" "}
              <strong>Credential Guard</strong>
              significantly reduces the effectiveness of Pass-the-Hash (PtH) attacks on the local
              SAM database.
            </p>
          </section>

          {/* Documentation Library — internal links so every article is reachable in 1–2 clicks */}
          <section id="library" className="mt-16 space-y-4 scroll-mt-20">
            <h2 className="text-2xl font-bold mb-2">Documentation Library</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every guide below is a complete, standalone article. Use the library as the index for
              the resource center.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/docs/android-hardening-optimization"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Android Hardening &amp; Optimization Guide
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Enterprise mobile security, bloatware pruning, and background tuning.
                </p>
              </Link>
              <Link
                href="/docs/battery-wear"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Battery Wear Diagnostics &amp; Management Guide
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Cycle baselines, fleet audits, and safe replacement procedures.
                </p>
              </Link>
              <Link
                href="/docs/windows-security-baseline"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Windows Security Baseline &amp; Hardening Manual
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  GPO enforcement, WDAC policies, and quarterly audit cadence.
                </p>
              </Link>
              <Link
                href="/docs/managing-app-permissions"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Managing App Permissions on Android
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Runtime permissions, special access controls, and ADB auditing.
                </p>
              </Link>
              <Link
                href="/docs/network-architecture-optimization"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Network Architecture, Optimization &amp; Troubleshooting
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Traffic shaping, routing hygiene, and connectivity diagnostics.
                </p>
              </Link>
              <Link
                href="/docs/storage-backup-dr"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Storage, Backup &amp; Disaster Recovery Playbook
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  3-2-1 strategies, Borg/Restic recipes, and restore drills.
                </p>
              </Link>
              <Link
                href="/docs/infrastructure-admin-monitoring"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Infrastructure Administration &amp; Monitoring SOP
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Service monitoring, alerting, and secure remote administration.
                </p>
              </Link>
              <Link
                href="/docs/interpreting-system-logs"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Interpreting System Logs
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Journald, event correlation, and verification checklists.
                </p>
              </Link>
              <Link
                href="/docs/measuring-performance-safely"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Measuring Performance Safely
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Benchmark methodology, measurement checklists, and safe tooling.
                </p>
              </Link>
              <Link
                href="/docs/incident-runbook"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Incident Runbook Template
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Stabilization checklist, log capture, and escalation playbook.
                </p>
              </Link>
              <Link
                href="/docs/technical-writing-workflow"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Technical Writing Workflow
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Structured authoring, QA checklists, and release hygiene.
                </p>
              </Link>
              <Link
                href="/docs/editorial-standards"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">Editorial Standards</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Tone, plain language, and review requirements for every edit.
                </p>
              </Link>
              <Link
                href="/docs/documentation-qa-framework"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Documentation &amp; QA Framework
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Content audits, runnable verification jobs, and accessibility.
                </p>
              </Link>
              <Link
                href="/docs/content-review-checklist"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold text-sm group-hover:text-primary">
                  Content Review Checklist
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  A short, repeatable checklist for accuracy and usefulness.
                </p>
              </Link>
            </div>
          </section>

          {/* Critical for Google Ads: Utility & Content Depth */}
          <section id="resources" className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Related Technical Resources</h2>
            <div className="grid gap-4">
              <Link
                href="/contact"
                className="group p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-bold group-hover:text-primary">
                  Request a Custom Hardening Script →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get specialized configurations for enterprise workstations.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
