import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
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

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="logs-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
