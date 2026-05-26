import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Incident Runbook Template | CM Regmi Docs",
  description: "A compact incident runbook template and immediate actions checklist.",
  alternates: { canonical: `${SITE_URL}/docs/incident-runbook` },
};

export default function IncidentRunbook() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/incident-runbook#article`,
    headline: "Incident Runbook Template",
    description: "A compact incident runbook template and immediate actions checklist.",
    url: `${SITE_URL}/docs/incident-runbook`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="incident-runbook-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Incident Runbook Template</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          A short checklist to stabilise services: identify impact, capture logs, collect recent
          deploy metadata, and run the minimal rollback or mitigation that restores functionality.
          This page provides a minimal, copyable template to use during an incident and the
          verification you should do after each action.
        </p>

        <h2 className="text-xl font-semibold mt-6">Immediate actions (first 5 minutes)</h2>
        <ol className="list-decimal pl-6 text-muted-foreground">
          <li>Notify on-call and set an incident channel with a clear owner.</li>
          <li>Capture live logs and a list of recent deploys (tag/commit and deploy time).</li>
          <li>Run a quick health check (HTTP 200, DB connection) and record results.</li>
          <li>
            If critical, trigger a pre-tested mitigation (e.g., failover or rollback snapshot).
          </li>
          <li>Post a concise status update: impact, action in progress, ETA for next update.</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">Minimal runbook template (copyable)</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`INCIDENT TICKET: #
SUMMARY: 
IMPACT: 
OWNER: 
TIMELINE: 
ACTIONS TAKEN:
- `}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Verification: how to know the action helped</h2>
        <p className="text-muted-foreground leading-relaxed">
          Every action should have a quick verification step. Examples: if you rolled back a deploy,
          confirm a known-good endpoint returns a 200 and critical background jobs are processing.
          If you restored a snapshot, confirm data consistency for a small sample.
        </p>

        <h2 className="text-xl font-semibold mt-6">After-action notes and improvements</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Document root cause and the minimal reproduction steps.</li>
          <li>Record signals that could have detected this earlier and add them to monitoring.</li>
          <li>
            Add a single, concrete runbook step to prevent the same misstep (not a long essay).
          </li>
          <li>Schedule a short postmortem with clear action owners and deadlines.</li>
        </ul>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Examples & commands</h2>
          <p className="text-muted-foreground">
            Practical commands and a short example help engineers reproduce and verify the behaviour
            quickly.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# capture journalctl for service xyz
journalctl -u myservice --since "2026-05-24 09:00" --until "2026-05-24 10:00" > /tmp/myservice.log`}</code>
          </pre>
          <h3 className="text-lg font-semibold">Verification & outcomes</h3>
          <p className="text-muted-foreground">
            After applying a change, measure the outcome and record whether the problem improved.
            Keep the verification script committed with the docs.
          </p>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="runbook-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
