import AdsSlot from "@/components/AdsSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TableOfContents } from "@/components/TableOfContents";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Interpreting System Logs | CM Regmi Docs",
  description:
    "How to approach system logs, what to look for, and a minimal verification workflow.",
  alternates: { canonical: `${SITE_URL}/docs/interpreting-system-logs` },
};

export default function InterpretingSystemLogs() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/interpreting-system-logs#article`,
    headline: "Interpreting System Logs",
    description:
      "How to approach system logs, what to look for, and a minimal verification workflow.",
    url: `${SITE_URL}/docs/interpreting-system-logs`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="logs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Interpreting System Logs</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          I usually start with logs when the problem is still vague, because they often show the
          pattern before the cause is obvious. Staying patient and comparing time windows has
          stopped me from chasing the first dramatic-looking line too many times.
        </p>

        <TableOfContents />

        <h2 className="text-xl font-semibold mt-6">Quick filtering example</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <h2 className="text-xl font-semibold mt-6">Step-by-step diagnostic workflow</h2>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
            <li>
              <strong>Anchor the timeframe:</strong> find when the incident began (exact minute if
              possible) and expand a conservative window (e.g., ±10 minutes) to capture related
              events.
            </li>
            <li>
              <strong>Filter to noisy sources:</strong> exclude heartbeat or debug noise and focus
              on failing units, kernel errors, and permission denials.
            </li>
            <li>
              <strong>Aggregate repeated lines:</strong> find frequency counts to prioritise the
              most likely root causes instead of chasing one-off traces.
            </li>
            <li>
              <strong>Correlate cross-systems:</strong> align timestamps from web servers,
              application logs, and database nodes to identify a causal chain.
            </li>
            <li>
              <strong>Verify and iterate:</strong> propose a targeted remediation, apply it in a
              staging environment, and rerun the same log filters to confirm the signal disappears.
            </li>
          </ol>
          <h2 className="text-xl font-semibold mt-6">Concrete filtering examples</h2>
          <p className="text-muted-foreground">
            These examples use <code>journalctl</code> for systemd-managed services.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# 1) Anchor the window and show recent errors for a unit (last 30 minutes)
  journalctl -u myservice --since "30 minutes ago" -o short-iso | grep -i "error\|fail\|exception"

  # 2) Count repeated error messages to find the most frequent faults
  journalctl -u myservice --since "30 minutes ago" | grep -i error | sort | uniq -c | sort -rn

  # 3) Show contextual lines around a suspect message (5 lines before/after)
  journalctl -u myservice --since "30 minutes ago" -o short-iso | sed -n '1,200p' | grep -n "OutOfMemory" | cut -d: -f1 | xargs -I{} sed -n "$(({}-5)),$(({}+5))p" /tmp/myservice.log`}</code>
          </pre>
          <h2 className="text-xl font-semibold mt-6">Correlation patterns and timestamps</h2>
          <p className="text-muted-foreground mb-4">
            Always align events by clock time before assuming causality. Small clock skews across
            machines can make unrelated events look related. Use ISO timestamps and convert logs to
            a common timezone when comparing multiple hosts.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Example: extract ISO timestamps and sort events from two hosts (assuming logs copied locally)
  cat host-a.log host-b.log | awk '{print $1" "$0}' | sort -u

  # Use ts (from moreutils) to normalise mixed timestamp formats when needed`}</code>
          </pre>
          <h2 className="text-xl font-semibold mt-6">A practical case study</h2>
          <p className="text-muted-foreground mb-4">
            A web service began returning 503s for a subset of requests. Initial application logs
            showed a database connection timeout, but the DB logs showed nothing. After aligning
            timestamps we observed a spike of kernel-level I/O errors on the DB host 30 seconds
            before the app errors. That pointed to an underlying storage issue rather than a
            connection pool misconfiguration.
          </p>
          <p className="text-muted-foreground mb-4">
            The fix required restoring the offline RAID parity and rerouting traffic to healthy
            replicas. After the repair, re-running the original journalctl filters showed the I/O
            errors stopped and the 503 rate returned to baseline—an explicit verification that the
            remediation worked.
          </p>
          <h2 className="text-xl font-semibold mt-6">Verification checklist</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Re-run the same filtered queries and confirm the top error counts drop to zero.</li>
            <li>Check related health endpoints for expected codes (e.g., 200 for /health).</li>
            <li>
              Capture a short, timestamped evidence bundle (logs + process list + metrics) and
              attach to the ticket.
            </li>
            <li>
              Schedule a follow-up check after 24 hours to ensure no regression appears in logs.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">Avoiding common mistakes</h2>
          <p className="text-muted-foreground mb-4">
            Don’t fix what you can’t reproduce. Avoid over-indexing on a single dramatic message
            without frequency counts, and never remove or alter logs before archiving a copy for
            forensic review.
          </p>
          <code>{`# Show repeated errors with journalctl
journalctl -u myservice --since "2026-05-24 09:00" --until "2026-05-24 10:00" | grep -i error | sort | uniq -c | sort -rn`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">A minimal workflow</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
          <li>Locate logs for the relevant service and timeframe.</li>
          <li>Filter for repeated errors and correlating timestamps.</li>
          <li>Search for process names, error codes, or thread traces that recur.</li>
          <li>Compare with normal working traces to distinguish noise from signal.</li>
        </ol>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Parsing and correlation examples</h2>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Filter errors for a service and include timestamps
journalctl -u myservice --since "2026-05-24 09:00" --until "2026-05-24 10:00" -o short-iso | grep -i error

# Show the most frequent error lines
journalctl -u myservice --since "2026-05-24" | grep -i error | sort | uniq -c | sort -rn`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">
            A second case study: a slow leak that was hard to see
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A small team ran a batch processing service that periodically began answering requests
            several seconds late, then recovered on its own. The pattern was intermittent and
            appeared roughly once a day, which made it tempting to blame the network. The responder
            anchored the exact minute from the alert, pulled the application log for that window,
            and aggregated the repeated error lines instead of reading them in order. The most
            frequent line was not a crash but a slow garbage-collection pause reported by the
            runtime.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Correlating timestamps across the web tier and the batch node showed the pauses lined up
            with a memory-usage spike that started fifteen minutes earlier on a single worker.
            Because the responder had frequency counts rather than a single trace, they could
            confirm the pattern was systemic and not a one-off. The remediation was a heap-size
            tuning change on the worker, applied in staging first, then verified by re-running the
            same aggregation. The pauses dropped to zero, the daily latency spikes stopped, and the
            team recorded the tuning change in the runbook so the fix was not lost.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The outcome worth repeating is that the evidence came from counting repeats and aligning
            timestamps, not from reading dramatic single lines. That same habit transfers to the
            monitoring side; see{" "}
            <Link
              href="/docs/measuring-performance-safely"
              className="text-primary hover:underline"
            >
              measuring performance safely
            </Link>{" "}
            for how to quantify such changes without disturbing the system, and{" "}
            <Link href="/docs/service-monitoring" className="text-primary hover:underline">
              service monitoring
            </Link>{" "}
            for early-warning patterns that surface the next occurrence before it reaches users.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Working with rotated and archived logs</h2>
          <p className="text-muted-foreground leading-relaxed">
            Logs rarely stay in one file. Production systems rotate on size or time, so the signal
            you need may span several rotated files or an archived bundle. Before you grep a single
            file, confirm which files cover your window and whether compression has been applied.
            The commands below show how to search across a directory of rotated logs and how to read
            a compressed archive without unpacking it into place.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Search across rotated files for a recurring message
zgrep -i "connection reset" /var/log/app/access.log.* 2>/dev/null | sort | uniq -c | sort -rn

# Read a gzip-compressed archive without extracting it
zcat /var/log/archive/app-2026-05-24.log.gz | grep -i "out of memory" | tail -20`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Treat the archive as read-only evidence. If you suspect a pattern repeats over weeks, a
            compressed history lets you confirm whether today is a new event or a familiar one,
            which changes how urgent the response needs to be. For the retention side of this
            practice, review{" "}
            <Link href="/docs/log-rotation" className="text-primary hover:underline">
              log rotation
            </Link>{" "}
            to make sure the window you need is actually preserved.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Working with structured and JSON logs</h2>
          <p className="text-muted-foreground leading-relaxed">
            When services emit JSON, the same filtering ideas apply but the tooling changes. Plain
            grep still works for finding a request ID, but structured tools make it easy to pivot
            from a specific value to every event that shares it. The examples below find a single
            request ID and then extract the correlation field across an interval, which is the
            practical core of trace-based debugging.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Find the request ID you care about, then follow it across services
journalctl --since "10 minutes ago" -o cat | grep "req-9f3c1" | head -5

# Pull the correlation ID for every line in a window (rough jq sketch)
cat events.ndjson | jq -r 'select(.req_id == "req-9f3c1") | [.ts, .service, .level, .msg] | @tsv'`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Structured logs reward you exactly when the signal crosses service boundaries, because
            you can join on the correlation field rather than guessing at text. When no correlation
            ID exists, fall back to a timestamp envelope: collect the events around the incident
            from each service and align them by clock, accepting that a small skew may mislead you.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Troubleshooting a dead-end investigation</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every log analyst eventually hits a wall where the evidence seems to point nowhere. Work
            through these steps in order instead of re-reading the same trace a third time.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Re-anchor the window:</strong> confirm your start and end times are correct
              and match the incident. A wrong window explains most "no errors found" results.
            </li>
            <li>
              <strong>Broaden the source:</strong> stop looking only at the app log and include
              kernel messages, the service manager, and the database logs. The cause frequently
              lives in a layer you have not opened yet.
            </li>
            <li>
              <strong>Switch from exact match to a pattern:</strong> search for a wider family of
              terms, then narrow. Missing an error because of case or punctuation is common and easy
              to fix.
            </li>
            <li>
              <strong>Check for a permissions or disk cause:</strong> a log that stops abruptly or
              never appears often reflects a full disk or a dropped permission rather than the
              absence of an error.
            </li>
            <li>
              <strong>Escalate with evidence:</strong> if you still cannot find the cause, package
              the timestamped bundle, the filters you ran, and the negative result so the next
              person does not repeat the same search.
            </li>
          </ol>
          <p className="text-muted-foreground leading-relaxed">
            A negative result is still a result. Recording that a specific window showed no matching
            errors, and which sources were searched, is the difference between a productive handoff
            and a colleague re-querying everything from scratch.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Frequently asked questions</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              Q: How far back should I look when a problem starts?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Begin at the first symptom and expand a conservative window around it, typically ten
              to fifteen minutes on each side. Look further back only if nothing appears in the
              window, because the true cause may precede the visible symptom.
            </p>
            <h3 className="text-lg font-bold">
              Q: What does a single repeated error line really tell me?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Frequency matters more than drama. A single line is an anecdote, while a message that
              repeats hundreds of times points at a systemic cause. Count repeats before you decide
              what to chase.
            </p>
            <h3 className="text-lg font-bold">Q: Should I stop the service to get cleaner logs?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Rarely. Restarting can destroy the very evidence you need, because it resets in-memory
              state and timestamps. Capture the evidence first and only restart after you have an
              archived copy and a plan.
            </p>
            <h3 className="text-lg font-bold">
              Q: Why do two servers show different errors for the same incident?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Clock skew and different log verbosity both contribute. Align by ISO timestamp in one
              timezone and compare only messages at equivalent priority levels before drawing a
              conclusion.
            </p>
            <h3 className="text-lg font-bold">
              Q: How do I avoid altering logs when investigating?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Always filter a copy or use read-only commands, and never rotate or delete logs until
              you have archived a timestamped bundle. Treat every log as potential forensic
              evidence.
            </p>
            <h3 className="text-lg font-bold">
              Q: What should a verification step prove before I close a ticket?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Re-run the same filtered query and confirm the top error counts drop, check related
              health endpoints, and schedule a follow-up check after twenty-four hours to catch any
              regression in the logs.
            </p>
          </div>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Building a reusable log playbook</h2>
          <p className="text-muted-foreground leading-relaxed">
            The fastest path to consistent log analysis is a small playbook you maintain alongside
            the services you operate. For each common failure class, record the filters that find
            it, the expected verification, and the most likely remediations. A playbook turns a
            fresh incident into a lookup rather than an open-ended investigation, which is exactly
            what you want at two in the morning.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# playbook entry: out-of-memory pattern
# FIND
journalctl -u myservice --since "30 minutes ago" | grep -iE "OutOfMemory|heap" | tail -20
# VERIFY
journalctl -u myservice --since "30 minutes ago" | grep -ic "OutOfMemory"
# REMEDIATE
# - confirm heap settings, check recent deploy, review leak report`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Keep the playbook short and specific to your fleet, and review it after each incident to
            add whatever the evidence taught you. Over time the repeated patterns dominate and the
            outliers, which deserve human attention, become easy to spot because everything else is
            a known routine. This is the durable payoff of disciplined log interpretation.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Reducing noise before you look for the signal</h2>
          <p className="text-muted-foreground leading-relaxed">
            Healthy systems are noisy. Heartbeats, status checks, and routine informational lines
            can dwarf the handful of lines that matter, and reading raw output top to bottom wastes
            time and invites misjudgement. Filtering noise first is not a shortcut; it is the step
            that makes the signal visible. Two techniques help most: excluding known-fine sources
            and aggregating by frequency so volume leads you to the cause.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Exclude known-noisy sources, then count what remains
journalctl -u myservice --since "30 minutes ago" \\
  | grep -vE "heartbeat|healthcheck|GET /status" \\
  | grep -iE "error|warn|fail" | sort | uniq -c | sort -rn | head -15

# Rank by volume within the window to find the real pattern
journalctl -u myservice --since "30 minutes ago" -o short-iso \\
  | awk '{sub(/^.* /,""); print}' | sort | uniq -c | sort -rn | head -20`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Ranking by volume is especially useful because a truly rare error buried in noise is
            rarely the cause of a widespread outage. When several message types appear at once, the
            most frequent one usually points at the shared root cause, and the others are symptoms.
            Confirm the ranking by re-running the count after you have excluded the known sources,
            so you are looking at the residual signal rather than the background chatter.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Preparing an evidence bundle for a handoff</h2>
          <p className="text-muted-foreground leading-relaxed">
            Log analysis rarely ends with the person who starts it. Whether you escalate to a
            developer, a vendor, or a later shift, a well-prepared evidence bundle saves everyone
            time and prevents the investigation from restarting. Capture the window, the filters,
            and the top findings together so the next person can verify rather than re-derive.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Build a timestamped bundle for handoff
OUT=/tmp/evidence-$(date +%Y%m%d-%H%M%S); mkdir -p "$OUT"
journalctl -u myservice --since "10 minutes ago" -o short-iso > "$OUT/app.log"
ps aux | grep -i myservice > "$OUT/processes.txt"
cat > "$OUT/filters.md" <<'EOF'
window: 10 minutes before incident
source: myservice unit
query: journalctl -u myservice --since "10 minutes ago" | grep -iE "error|fail"
finding: connection reset repeated 400+ times
EOF
ls -la "$OUT"`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Include the negative results too: noting that a search found no matching errors, and
            which sources were covered, tells the next person what has already been ruled out. A
            handoff that states the window, the filters, the top findings, and the open questions is
            far more useful than a raw log dump, and it keeps the incident moving instead of
            stalling on repeated re-querying.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Reading log severity levels correctly</h2>
          <p className="text-muted-foreground leading-relaxed">
            Log severity levels are a useful shorthand, but they are written by developers with
            different opinions, so the level alone is not a reliable signal. An ERROR line from one
            service may be routine while a WARNING from another heralds a real failure. Before you
            prioritise by level, read a handful of each type and learn what the level actually means
            for the services you operate. This calibration is often the difference between chasing a
            low-impact log and catching the real problem.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It also helps to know which level your architecture already sends to alerting. If you
            page on ERROR but the damaging event is logged as WARN, you will keep missing it until
            you align the levels to what matters. Establish a simple convention, document it next to
            the service, and revisit it after incidents so the levels stay truthful rather than
            becoming background noise people learn to ignore.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Knowing when the logs are not the answer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Logs are the right first move for many problems, but not all of them. A hard network
            failure, a full disk, an exhausted file descriptor table, or a misconfigured proxy may
            produce little or no application logging, and staring at the logs will not reveal the
            cause. If your filtered window shows nothing and the evidence bundle is clean, check the
            layers logs cannot see: resource usage, filesystem space, network state, and load
            balancer behaviour.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# When logs are empty, check the layers they cannot see
df -h /var/lib            # full disk explains abruptly-stopping logs
df -i /var/lib            # inode exhaustion on small filesystems
ss -s 2>/dev/null || cat /proc/net/sockstat   # socket exhaustion
dmesg -T | tail -20       # kernel messages outside the app log`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Recognising when to step away from the logs is a sign of maturity, not a shortcut. Pair
            log analysis with these system-level checks so your investigation stops at the layer
            where the cause actually lives, rather than concluding that "the logs are quiet" and
            calling the incident resolved when the real fault is still running.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">A final summary of the workflow</h2>
          <p className="text-muted-foreground leading-relaxed">
            Keep the whole method in one phrase: anchor the timeframe, filter the noise, count the
            repeats, correlate the timestamps, verify the fix. When you follow that sequence you
            stay calm under pressure because every step has a defined purpose and a defined
            endpoint. The logs rarely tell you the answer in a single dramatic line; they tell you
            the answer through patterns, volume, and timing, and it is your job to let those
            surface.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Save a copy of the filters and note the outcome each time. Over even a few incidents you
            build a personal reference that turns future investigations into confirmations rather
            than fresh searches, and that accumulation of small findings is precisely what separates
            a confident log analyst from someone who starts from scratch every time the pager goes
            off.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The discipline matters even when there is no incident. A few minutes of routine log
            review each week keeps you familiar with what normal looks like, so an abnormality
            stands out immediately when it appears. Combined with the runbook, the evidence bundle,
            and the safe measurement habits from the related guides, this is a small, sustainable
            practice that pays for itself the moment something genuinely goes wrong, and that quiet
            readiness is well worth the modest time it asks of you.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">Advanced correlation and tooling</h2>
        <p className="text-muted-foreground leading-relaxed">
          For complex systems, use structured logging and a correlation ID propagated across
          services. This makes it trivial to gather all events for a request and reason about
          causality. When structured logs are unavailable, create a small envelope that maps
          timestamps to request IDs so you can join logs from multiple services deterministically.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Tools like the ELK stack, Loki, or a hosted APM can index logs and provide fast
          correlation queries; however, the same principles apply: anchor the timeframe, filter
          noise, and focus on repeated, actionable signals rather than one-off traces.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Maintain a short runbook for common log patterns (OOMs, connection resets, permission
          denied) with example queries and expected verification steps so responders can act
          quickly.
        </p>

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
