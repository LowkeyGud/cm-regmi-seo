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
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";

const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Windows Security Baseline | CM Regmi Docs",
  description:
    "A practical Windows security baseline covering patching, Defender, firewall, account separation, browser hardening, and backups.",
  alternates: {
    canonical: `${SITE_URL}/docs/windows-security-baseline`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Windows Security Baseline | CM Regmi Docs",
    description: "A text-first baseline for safer Windows use.",
    url: `${SITE_URL}/docs/windows-security-baseline`,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Windows Security Baseline | CM Regmi Docs",
    description: "Practical Windows hardening guidance for everyday systems.",
    creator: "@cmregmi",
  },
};

export default function WindowsSecurityBaselinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/windows-security-baseline#article`,
    headline: "Windows Security Baseline",
    description:
      "A practical Windows security baseline covering patching, Defender, firewall, account separation, browser hardening, and backups.",
    url: `${SITE_URL}/docs/windows-security-baseline`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="windows-security-baseline-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs">Docs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Windows Security Baseline</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-10">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Security Basics
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Windows Security Baseline
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              By <strong>CM Regmi</strong> • Published May 26, 2026
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              This guide is a practical baseline for a normal Windows machine. It prioritises
              safety, updates, account separation, and recovery planning over dramatic tuning.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Start with patching</h2>
            <p className="text-muted-foreground leading-relaxed">
              A secure Windows setup starts with current updates. Install operating-system updates,
              keep browser and office software current, and remove software that no longer receives
              maintenance. A machine with old software is harder to defend because known issues stay
              open longer than they should.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Separate daily use from admin use</h2>
            <p className="text-muted-foreground leading-relaxed">
              Use a standard account for daily work and reserve administrator rights for actual
              maintenance. That one habit reduces the chance that a bad download, malicious script,
              or accidental install can make system-wide changes. It is one of the simplest
              improvements a normal user can make.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Use the built-in protections</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                Keep Microsoft Defender enabled unless you have a specific managed alternative.
              </li>
              <li>Leave the firewall on for both private and public network profiles.</li>
              <li>Use browser protection features such as phishing and download warnings.</li>
              <li>Turn on device encryption where it is supported and appropriate.</li>
              <li>Keep SmartScreen-style warning features active if your edition supports them.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Control the most common risk paths
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The most common Windows problems usually arrive through downloads, browsers, shared
              files, and weak passwords. That means practical hardening is less about extreme system
              changes and more about a few disciplined behaviours: verify installers, avoid running
              untrusted archives, use strong unique passwords, and keep browser extensions to a
              minimum.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If a machine is used for work, consider full-disk encryption, regular backup jobs, and
              account separation for personal versus business data. Those controls do not make a
              machine invulnerable, but they make recovery much easier after a mistake.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Backups and recovery matter</h2>
            <p className="text-muted-foreground leading-relaxed">
              A baseline is incomplete if the recovery path is unknown. Keep at least one backup
              that is offline or otherwise not always mounted, and make sure you know how to restore
              it. That protects you from both accidental deletion and ransomware-style damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What to avoid</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>Do not disable protections just to make a download or script easier to run.</li>
              <li>Do not install driver packs or tweak tools from unverified sources.</li>
              <li>Do not run as administrator for daily browsing or document work.</li>
              <li>
                Do not treat a clean-looking desktop as a substitute for actual security controls.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">A sane maintenance rhythm</h2>
            <p className="text-muted-foreground leading-relaxed">
              Review updates weekly, check the backup is still running monthly, and revisit browser
              extensions whenever the installed list grows. If the system feels less reliable over
              time, start by checking software hygiene before changing advanced security settings.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A stable baseline should be boring to operate. If the machine stays patched, backed
              up, and used with a standard account, most day-to-day risks become easier to manage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Minimum baseline checklist</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>Install OS and browser updates promptly.</li>
              <li>
                Leave Defender and the firewall enabled unless you have a managed alternative.
              </li>
              <li>Keep daily work under a standard user account.</li>
              <li>Verify that at least one backup can be restored.</li>
              <li>Review installed extensions and uninstall anything unnecessary.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These are the controls that give the most return for the least complexity. They will
              not stop every threat, but they do make common mistakes less expensive.
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                For more process and policy detail, return to the docs hub.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                If you are building a review standard for the site, pair this baseline with the
                editorial policy and the content checklist so the writing and the operations side
                stay aligned.
              </p>
              <Link
                href="/docs"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Docs Hub
              </Link>
            </div>
          </section>
        </article>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="winsec-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
