import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Measuring Performance Safely | CM Regmi Docs",
  description: "Principles for measuring system performance without causing instability.",
  alternates: { canonical: `${SITE_URL}/docs/measuring-performance-safely` },
};

export default function MeasuringPerformanceSafely() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/measuring-performance-safely#article`,
    headline: "Measuring Performance Safely",
    description: "Principles for measuring system performance without causing instability.",
    url: `${SITE_URL}/docs/measuring-performance-safely`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="perf-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Measuring Performance Safely</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Use benchmarks and profiling that match your workload. Avoid stress tests that push the
          system far beyond normal operating points unless you have a clear rollback and a safe test
          environment.
        </p>

        <h2 className="text-xl font-semibold mt-6">Safe testing rules</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>Use realistic workloads whenever possible.</li>
          <li>Keep the test environment separate from production.</li>
          <li>Stop the test if heat, errors, or instability appear.</li>
          <li>Document the version, hardware, and configuration of every run.</li>
        </ol>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Tools and example commands</h2>
          <p className="text-muted-foreground">
            Use focused tools that match the resource you care about. Examples below are safe when
            run in a test environment with monitoring enabled.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# CPU sampling (Linux perf) - short, non-invasive sample
sudo perf stat -e cycles,instructions,cache-references,cache-misses -a sleep 10

# Disk throughput test (fio) - small, realistic profile
fio --name=readtest --rw=read --bs=128k --size=256M --numjobs=1 --runtime=10 --time_based

# Network baseline (iperf3) - run between two hosts
iperf3 -s            # on server
iperf3 -c server -t 10 -P 2  # on client`}</code>
          </pre>

          <p className="text-muted-foreground">
            These commands are examples — reduce duration and dataset sizes when testing on shared
            or fragile systems.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">
            Interpreting results and avoiding false positives
          </h2>
          <p className="text-muted-foreground">
            Always compare against a baseline captured with the same configuration and time-of-day.
            Be careful: transient background activity (cron jobs, backups, antivirus scans) commonly
            skews short tests.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Run multiple short samples and look at median values rather than single runs.</li>
            <li>
              Record hardware and firmware versions; drivers can change behaviour dramatically.
            </li>
            <li>Use sampling profilers before heavy instrumentation to avoid perturbing timing.</li>
          </ul>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Measurement checklist</h2>
          <ol className="list-decimal pl-6 text-muted-foreground">
            <li>
              Document the goal and what success looks like (e.g. reduce median p95 latency by 20%).
            </li>
            <li>Capture a baseline with system logs and a timestamped identifier.</li>
            <li>Run focused tests that change only one variable at a time.</li>
            <li>
              Record ambient conditions (CPU frequency governor, thermal state, network link speed).
            </li>
            <li>
              Verify results by reproducing the improvement on a different machine when possible.
            </li>
          </ol>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-bold tracking-tight">Reproducible benchmarking and safety gates</h2>
          <p className="text-muted-foreground leading-relaxed">
            Define clear, repeatable test environments for performance work. Record OS, kernel,
            firmware, and tool versions. Use containerized harnesses or ephemeral VMs so results are
            not influenced by unrelated background noise.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Run multiple iterations and report median and interquartile ranges rather than single-run
            peak values. Include a short checklist for sanity: CPU affinity, isolated interrupts, and
            disabled background services for the test host.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Safety gates: verify that any tuning change can be rolled back by an automated job and that
            application smoke tests pass after each change. Record RTO expectations for performance
            regressions and automate alerting when thresholds are exceeded in production canaries.
          </p>

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="perf-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
