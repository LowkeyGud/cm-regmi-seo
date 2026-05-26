import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Log Rotation and Retention | CM Regmi Docs",
  description: "Simple, safe log rotation policies and retention guidance for servers.",
  alternates: { canonical: `${SITE_URL}/docs/log-rotation` },
};

export default function LogRotation() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/log-rotation#article`,
    headline: "Log Rotation and Retention",
    description: "Simple, safe log rotation policies and retention guidance for servers.",
    url: `${SITE_URL}/docs/log-rotation`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="logrot-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Log Rotation and Retention</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Rotate logs to prevent disks filling and keep a short, tested retention policy. Include a
          simple verification step to ensure rotated archives are readable before purge.
        </p>
        <p className="text-muted-foreground mb-4">
          I have seen log disks fill up at the worst possible time, so I treat rotation as a basic
          safety task rather than optional housekeeping. A small retention policy that is actually
          enforced is usually better than a large one nobody has tested.
        </p>

        <h2 className="text-xl font-semibold mt-6">Example logrotate snippet</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    missingok
    notifempty
    create 0640 app app
}`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Rotation checklist</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>Set size or time-based rotation thresholds.</li>
          <li>Verify that old logs are moved before the filesystem fills.</li>
          <li>Alert when rotation fails or when disk usage jumps unexpectedly.</li>
          <li>Test at least one restored archive periodically.</li>
        </ol>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Systemd-journald considerations</h2>
          <p className="text-muted-foreground">
            If using `systemd-journald`, configure `SystemMaxUse` and `SystemMaxFileSize` to cap
            on-disk journal growth. Forward important entries to persistent logs or a central
            collector because journal files rotate differently than text logs.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# /etc/systemd/journald.conf
SystemMaxUse=500M
SystemMaxFileSize=50M
RuntimeMaxUse=200M`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Log shipping and centralization</h2>
          <p className="text-muted-foreground">
            Ship logs to a central collector (Fluentd, Vector, Logstash, or a hosted provider).
            Centralization reduces blast radius when a single host's disk fills and enables richer
            search and retention policies.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# rsyslog forwarding example (send to remote collector)
*.* @@logs.example.com:514`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Compression and retention tradeoffs</h2>
          <p className="text-muted-foreground">
            Compress rotated archives to save space, but keep in mind that highly-compressed
            archives increase CPU and restore time. Balance cost and recovery time against
            compliance requirements.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Testing rotation and restores</h2>
          <p className="text-muted-foreground">
            Regularly test rotation by forcing a rotation and restoring a sample archive. Automate
            this test in a staging environment and ensure alerts are triggered when rotation scripts
            fail.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="logs-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
