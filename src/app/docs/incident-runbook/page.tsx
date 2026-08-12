import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TableOfContents } from "@/components/TableOfContents";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

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

        <TableOfContents />

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

        <h2 className="text-xl font-semibold mt-6">
          1. Worked example: recovering from a container restart loop
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          A monitoring alert fired at 03:20 because a containerized order-processing service had
          restarted nine times in twelve minutes. Each restart dropped in-flight requests, and an
          automated health check that simply restarted the container on failure was keeping a broken
          unit alive without ever fixing it. The on-call engineer opened the incident ticket,
          captured the journal before touching anything, and then inspected the restart sequence
          instead of restarting again.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The journal showed the process exiting with the identical error at almost the same second
          on every run, which pointed to a startup dependency rather than a crash under load. A
          quick reproduction in a clean directory confirmed that the service could not initialize
          without a configuration key that the latest deploy had renamed.
        </p>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Capture the restart sequence before taking any action
journalctl -u order-worker --since "-30 min" -o short-iso | grep -E "Started|fatal|Failed" | tail -n 20

# Output (abbreviated)
# mar 21 03:10:04 app-02 systemd[1]: Started order-worker.service
# mar 21 03:10:04 app-02 order-worker[2412]: fatal: config key 'queue' missing
# mar 21 03:12:11 systemd[1]: order-worker.service: Main process exited`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          Because the team had recorded a tested rollback and a known-good image tag in the runbook,
          the fix was a single tagged rollback instead of speculative debugging. The engineer rolled
          the image back to the previous tag, confirmed the worker reached a steady state, and only
          then opened an after-action note to restore the configuration key for the next release.
          Total time from alert to restored service was about forty minutes, and the restart count
          dropped to zero immediately. This is the difference a pre-recorded rollback path makes:
          the same incident without an image tag history could have consumed an entire shift. Two
          habits made this response faster than the previous incident of the same shape: the
          rollback target was verified to exist before the incident, and the journal was captured
          before any action was taken. Both belong in the immediate-actions list as default
          behaviour rather than as decisions made under pressure. For related incident structure,
          see the{" "}
          <Link
            href="/docs/infrastructure-admin-monitoring"
            className="text-primary hover:underline"
          >
            infrastructure and monitoring SOP
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6">
          2. Escalation matrix and communication templates
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          An incident commander who escalates too slowly extends the outage, while one who escalates
          too early burns senior attention. A written matrix removes the judgement call. Define tier
          one as the on-call engineer and the incident commander; tier two as the service owner and
          the database administrator; and tier three as management and external communication.
          Escalate immediately when the current tier cannot restore service within a defined window,
          when impact touches more than one service, or when a decision with financial or compliance
          consequences is required.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Keep the escalation matrix inside the runbook with names, roles, contact numbers, and the
          exact condition that triggers each tier. Test it quarterly with a tabletop exercise so
          nobody has to learn a number at 03:00. Below is a copyable template for the status posts
          that keep everyone aligned during the response:
        </p>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Paste into the incident channel and update in place
STATUS: DEGRADED / DOWN / RESOLVED  (delete the wrong ones)
IMPACTED: order-worker, queue depth at 400
CURRENT ACTION: rolling back image tag to v2026.05.20
NEXT UPDATE: in 20 minutes
ESCALATED TO: service owner, database admin
NEEDED: none`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          The template is short on purpose. Long statuses are never read during an incident. One
          person owns the updates and writes only the fields above. If you find yourself writing
          paragraphs, stop and set a shorter update cadence instead. Pair the escalation path with
          monitoring that detects the failure earlier, as described in the{" "}
          <Link href="/docs/service-monitoring" className="text-primary hover:underline">
            service monitoring guide
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6">
          3. Troubleshooting: when the runbook steps do not resolve it
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          When an incident seems to resist every listed step, work through these checks in order
          instead of improvising a fix. Each check eliminates one layer of the stack and preserves
          evidence for the postmortem.
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong>Confirm you are looking at the right node.</strong>
            <p className="text-sm mt-1">
              A load balancer or scheduler may be routing requests to a host that is not the one on
              screen. Compare the hostname and the instance ID in the alert payload against the
              journal you are reading before treating journal output as authoritative.
            </p>
          </li>
          <li>
            <strong>Re-read the last entry in the timeline.</strong>
            <p className="text-sm mt-1">
              The most recent action often caused the current symptom. If a config change, deploy,
              or restart precedes the failure inside the incident window, suspect that change before
              the hardware underneath it.
            </p>
          </li>
          <li>
            <strong>Verify the rollback target actually exists.</strong>
            <p className="text-sm mt-1">
              Check that the image tag, package version, or snapshot you plan to restore is present
              in the registry or repository. Attempting a rollback to a missing artifact adds
              minutes at the worst moment.
            </p>
          </li>
          <li>
            <strong>Check whether a second change landed at the same time.</strong>
            <p className="text-sm mt-1">
              Compare deploy timestamps across services. A coordinated release that touched two
              services simultaneously often produces a failure that neither rollback fixes in
              isolation. In that case, roll back both to the same known-good point.
            </p>
          </li>
          <li>
            <strong>Record what you tried before escalating.</strong>
            <p className="text-sm mt-1">
              Write each attempted step, its result, and its timestamp into the ticket. The senior
              engineer who takes over must see the full picture without asking, and the postmortem
              needs the same trail.
            </p>
          </li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">4. Frequently Asked Questions</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">
            When should I escalate instead of waiting for the alert to clear?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Escalate the moment the current tier cannot restore service within the defined window,
            or as soon as the impact exceeds the tier's authority, for example when it touches
            multiple services or produces a compliance concern. Waiting only compresses the time the
            next tier has to respond. Escalate early, then down-escalate if the issue resolves
            quickly.
          </p>
          <h3 className="text-lg font-bold">
            What if the rollback path fails during the incident?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Treat the failed rollback as a new signal, not a dead end. Verify the artifact exists
            and the checksum matches, then check whether a second change landed at the same time. If
            both checks are clean, stop trying isolated rollbacks and escalate with your attempted
            steps recorded, because the fault is likely shared across services rather than in one
            build.
          </p>
          <h3 className="text-lg font-bold">
            Should automated health checks restart a failing service forever?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            No. A service that restarts repeatedly is masking a real fault, and every restart drops
            in-flight work. Add a maximum restart threshold and alert when it is crossed, then treat
            the recurring restarts as an incident. A health check is a bridge, not a permanent fix.
          </p>
          <h3 className="text-lg font-bold">
            How do I stop an incident runbook from growing until nobody reads it?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Keep the runbook to a single page per failure class and force changes through the
            postmortem process. When the document grows past one page, split it into a new page for
            that specific failure instead of appending. Small, targeted runbooks survive; long
            essays do not.
          </p>
          <h3 className="text-lg font-bold">
            How can I practice incidents without causing a real outage?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Use a staging or isolated environment that mirrors production and run the full sequence
            there, or run a tabletop drill where responders walk through steps verbally. Measure how
            long the team takes to reach each checkpoint. See the guide on{" "}
            <Link
              href="/docs/measuring-performance-safely"
              className="text-primary hover:underline"
            >
              measuring performance safely
            </Link>{" "}
            for how to test without harming live services.
          </p>
          <h3 className="text-lg font-bold">
            What is the difference between a runbook and a postmortem?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            A runbook is the action checklist followed during the incident, written in advance. A
            postmortem is the review written afterward that records what happened, why, and which
            single runbook step changes to prevent recurrence. They serve different moments, and a
            postmortem that does not add at least one concrete step to a runbook has not done its
            job.
          </p>
          <h3 className="text-lg font-bold">
            Why did my status update feel like it made things worse?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Status updates made without field discipline introduce noise that followers must
            re-parse. Stick to the template: impact, current action, next update, escalation. If
            followers ask for clarification, your update was missing one of those four fields rather
            than being too short.
          </p>
          <h3 className="text-lg font-bold">How long should the first status update wait?</h3>
          <p className="text-muted-foreground leading-relaxed">
            Post the first update within the first five minutes, even if all it says is that the
            incident is acknowledged and investigation is under way. A short, honest first post
            reduces duplicate reports, sets expectations, and lets leadership stop polling
            individual engineers. It also forces the commander to name an impact and an owner
            immediately, which structures the rest of the response.
          </p>
        </div>

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

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
