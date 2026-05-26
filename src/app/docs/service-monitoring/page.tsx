import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Service Monitoring Basics | CM Regmi Docs",
  description: "Core monitoring signals and simple alerting strategies for services.",
  alternates: { canonical: `${SITE_URL}/docs/service-monitoring` },
};

export default function ServiceMonitoring() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/service-monitoring#article`,
    headline: "Service Monitoring Basics",
    description: "Core monitoring signals and simple alerting strategies for services.",
    url: `${SITE_URL}/docs/service-monitoring`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="monitor-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Service Monitoring Basics</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Monitor service liveness, error rates, latency percentiles, and saturation metrics. Alert
          on steady-state drift rather than momentary spikes to reduce noise.
        </p>
        <p className="text-muted-foreground mb-4">
          I prefer monitoring that tells a useful story instead of just making noise, because noisy
          alerts get ignored quickly. When the signals are chosen well, on-call work feels calmer
          and the real failures stand out sooner.
        </p>

        <h2 className="text-xl font-semibold mt-6">Example alert rule</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Example (Prometheus Alertmanager)
- alert: HighErrorRate
  expr: rate(http_requests_total{job="api",status=~"5.."}[5m]) > 0.05
  for: 10m
  labels:
    severity: page
  annotations:
    summary: "High 5xx rate on API"
`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Alert quality</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Alert only when a user-visible issue is likely.</li>
          <li>Route noisy warnings to dashboards, not pages.</li>
          <li>Link every important alert to the next action.</li>
        </ul>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Alert examples and playbooks</h2>
          <p className="text-muted-foreground">
            Attach a concise playbook to each alert explaining the first three actions to take.
            Example playbook: 1) look at recent deploys, 2) confirm user impact, 3) gather logs and
            check upstream dependencies.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>
              {
                '# Prometheus example: alert when p95 latency rises above threshold\n- alert: HighP95Latency\n  expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="api"}[5m])) by (le)) > 0.8\n  for: 10m\n  labels:\n    severity: page\n  annotations:\n    summary: "High p95 latency on API"'
              }
            </code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Reducing alert noise</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Use `for` durations to avoid transient spikes triggering pages.</li>
            <li>Group related alerts and route non-actionable trends to dashboards.</li>
            <li>Add contextual links in alerts to dashboards and runbooks.</li>
          </ul>
        </section>

        <section className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold">SLOs and error budgets</h2>
          <p className="text-muted-foreground">
            Define simple Service Level Objectives (SLOs) and track an error budget. Treat the
            budget as a decision tool: if the budget is exhausted, stop risky releases and focus on
            remediation. Example SLO: 99.9% availability measured as successful requests per minute
            against business transactions.
          </p>

          <h2 className="text-xl font-semibold">Dashboards that help</h2>
          <p className="text-muted-foreground">
            Build a compact dashboard that answers: Are users getting errors? Are latencies rising?
            Is system saturation changing? Keep one-pane summaries for on-call and deeper
            drill-downs for engineers.
          </p>

          <h2 className="text-xl font-semibold">Instrumentation guidance</h2>
          <p className="text-muted-foreground">
            Prefer traces and histograms for latency analysis, and counters for traffic and error
            rates. Tag requests with stable service identifiers and include deployment metadata so
            you can correlate issues with releases.
          </p>

          <h2 className="text-xl font-semibold">Postmortems and outcomes</h2>
          <p className="text-muted-foreground">
            When incidents happen, capture a short timeline, root cause, and at least one practical
            follow-up that reduces recurrence. Link the postmortem from the alert and record the
            outcome in the runbook.
          </p>

          <h2 className="text-xl font-semibold">Monitoring runbook checklist</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Confirm the alert matches an SLO breach or user-visible issue.</li>
            <li>Identify recent deploys and roll back if needed.</li>
            <li>Collect logs and traces for the five minutes before the alert.</li>
            <li>Escalate with clear context and mitigation steps if unresolved.</li>
          </ol>

          <h2 className="text-xl font-semibold">Architecture notes</h2>
          <p className="text-muted-foreground">
            Centralize metrics ingestion and keep short retention for high-resolution data and
            longer retention for rollups. Use a metrics pipeline that can handle bursts without
            dropping critical samples.
          </p>

          <div className="mt-8">
            <p className="text-muted-foreground mb-2">
              Track your monitoring maturity over time: fewer false positives, faster restores, and
              clearer runbooks indicate progress.
            </p>
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
          <section className="mt-6">
            <h2 className="text-lg font-semibold">Next steps</h2>
            <p className="text-muted-foreground">
              Start small: pick one SLO, add a dashboard for it, and run two monthly drills. Iterate
              on alerts after each drill and reduce the noise until pages only fire for user-visible
              impact. Share results with stakeholders and schedule follow-ups. Record metrics before
              and after changes to measure improvement. Keep a lightweight changelog for monitoring
              updates so reviewers can see what changed and why.
            </p>
          </section>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="monitor-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
