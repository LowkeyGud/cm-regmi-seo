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
          Logs are evidence: they show what the system did, not why it did it. Start with
          timestamps, repeated error patterns, and contextual events that precede a failure.
        </p>
        <p className="text-muted-foreground mb-4">
          I usually start with logs when the problem is still vague, because they often show the
          pattern before the cause is obvious. Staying patient and comparing time windows has
          stopped me from chasing the first dramatic-looking line too many times.
        </p>

        <h2 className="text-xl font-semibold mt-6">Quick filtering example</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
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

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="logs-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
