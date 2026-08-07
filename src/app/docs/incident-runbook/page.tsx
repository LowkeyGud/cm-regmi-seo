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

        <p className="text-muted-foreground mb-4 leading-relaxed">
          Incident response is a disciplined process, not a creative exercise. The goal during an
          active incident is to restore service stability as quickly as possible while preserving
          enough evidence to prevent recurrence. A well-structured runbook removes decision fatigue
          by providing a clear sequence of steps that work for most common failure modes. This
          template has been refined through real-world operations across Linux services, container
          orchestration platforms, and hybrid cloud environments.
        </p>

        <h2 className="text-xl font-semibold mt-6">Immediate actions (first 5 minutes)</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          The first five minutes of an incident set the trajectory for the entire response. Rapid
          assessment and clear communication prevent scope creep and ensure the right people are
          engaged. Rush during this window often leads to wasted effort or secondary incidents.
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong>Notify on-call and set an incident channel with a clear owner.</strong>
            <p className="text-sm mt-1">
              Open a dedicated channel or bridge line immediately. Assign one person as the incident
              commander who tracks timeline, actions, and decisions. The commander does not perform
              technical work directly but coordinates the response. This separation prevents
              multitasking errors during high-pressure moments.
            </p>
          </li>
          <li>
            <strong>
              Capture live logs and a list of recent deploys (tag/commit and deploy time).
            </strong>
            <p className="text-sm mt-1">
              Before taking remediation action, preserve evidence. Run journalctl, kubectl logs, or
              cloud provider log exports to a timestamped file. Capture the last three deploys with
              exact commit hashes and timestamps. This data is essential for root cause analysis and
              may vanish if containers restart or services failover.
            </p>
          </li>
          <li>
            <strong>Run a quick health check (HTTP 200, DB connection) and record results.</strong>
            <p className="text-sm mt-1">
              Establish a baseline of what is broken. Check external-facing endpoints, database
              connectivity, cache hit rates, and background queue depth. Record the results with
              timestamps so you can compare before and after mitigation.
            </p>
          </li>
          <li>
            <strong>
              If critical, trigger a pre-tested mitigation (failover, rollback, or scale-out).
            </strong>
            <p className="text-sm mt-1">
              If the impact is customer-facing and you have a tested rollback or failover path,
              execute it now. Do not attempt untested fixes during an active incident unless all
              known mitigation options have failed. Prefer a safe rollback over a speculative patch.
            </p>
          </li>
          <li>
            <strong>
              Post a concise status update: impact, action in progress, ETA for next update.
            </strong>
            <p className="text-sm mt-1">
              Communicate to stakeholders within the first five minutes, even if all you can say is
              that the incident is acknowledged and investigation is underway. A status update
              reduces duplicate reports and keeps leadership informed without interrupting the
              technical team.
            </p>
          </li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">Minimal runbook template (copyable)</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          Copy this template into your incident tracking system at the start of each incident. Fill
          in each field as information becomes available. The structured format ensures nothing is
          missed and accelerates onboarding for responders who join mid-incident.
        </p>
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
        <p className="text-muted-foreground leading-relaxed mb-3">
          Every action should have a quick verification step. Do not assume a change worked without
          checking. A rollback that partially succeeded can leave services in an inconsistent state.
          Verification catches these partial successes before they become secondary incidents.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Every action should have a quick verification step. Examples: if you rolled back a deploy,
          confirm a known-good endpoint returns a 200 and critical background jobs are processing.
          If you restored a snapshot, confirm data consistency for a small sample.
        </p>

        <h2 className="text-xl font-semibold mt-6">After-action notes and improvements</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          The post-incident phase is where long-term reliability improves. Capture observations
          while memory is fresh and assign concrete action items with owners and deadlines. A
          postmortem document should be blameless, focused on systems and processes rather than
          individuals.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            <strong>Document root cause and the minimal reproduction steps.</strong>
            <p className="text-sm mt-1">
              Include enough detail that a responder unfamiliar with the system can understand what
              happened. Aim for one page of text, not ten. The minimal reproduction steps help
              verify fixes during the postmortem review.
            </p>
          </li>
          <li>
            <strong>
              Record signals that could have detected this earlier and add them to monitoring.
            </strong>
            <p className="text-sm mt-1">
              Identify which metrics or logs could have provided earlier warning. Add alerts for
              those signals within one week of the incident. Delays mean the same class of issue
              will recur before detection improves.
            </p>
          </li>
          <li>
            <strong>
              Add a single, concrete runbook step to prevent the same misstep (not a long essay).
            </strong>
            <p className="text-sm mt-1">
              Update the relevant runbook with one or two sentences explaining the new check or
              precaution. Large runbook updates are rarely read. Small, targeted additions survive.
            </p>
          </li>
          <li>
            <strong>Schedule a short postmortem with clear action owners and deadlines.</strong>
            <p className="text-sm mt-1">
              Limit the postmortem meeting to 30-45 minutes. Focus on action items, not
              storytelling. Assign owners and due dates for each item before ending the meeting.
              Follow up weekly until all items are resolved or explicitly deferred.
            </p>
          </li>
        </ul>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Operational verification</h2>
          <p className="text-muted-foreground">
            After each runbook action, perform short, deterministic checks to confirm progress and
            avoid regression.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Capture the recent journal entries for the affected service (last 60 minutes)
  journalctl -u myservice --since "1 hour ago" -o short-iso | tail -n 200 > /tmp/myservice.log

  # Quick health check: confirm a known-good endpoint returns 200
  curl -fsS -o /dev/null -w "%{http_code}" https://localhost/health || echo "health check failed"`}</code>
          </pre>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Confirm service process is active: <code>systemctl is-active myservice</code>.
            </li>
            <li>Verify critical endpoints return expected HTTP codes and sample responses.</li>
            <li>Archive logs with a timestamped filename and attach to the incident ticket.</li>
          </ul>
        </section>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">
          Post-incident validation and runbook drills
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          After an incident, run a short validation sequence to ensure the remediation is correct
          and to catch any regressions. Capture logs, confirm service readiness, and run smoke tests
          that exercise critical user flows.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Maintain a drill schedule: quarterly tabletop exercises and monthly automated smoke
          checks. Each drill should end with an action item list and an ownership assignment.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Collect logs and preserve them with timestamps and incident IDs.</li>
          <li>Verify that the traced remediation steps are idempotent when re-run in test mode.</li>
          <li>Confirm monitoring alert routes and escalation contacts are up to date.</li>
        </ul>

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="runbook-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
