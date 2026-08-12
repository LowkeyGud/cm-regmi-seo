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
    datePublished: "2025-05-24",
    dateModified: "2025-05-24",
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
          By <strong>CM Regmi</strong> • Published May 26, 2025
        </p>

        <p className="text-muted-foreground mb-4">
          Use benchmarks and profiling that match your workload. Avoid stress tests that push the
          system far beyond normal operating points unless you have a clear rollback and a safe test
          environment.
        </p>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          Performance measurement is a discipline that balances insight against risk. A poorly
          designed benchmark can destabilise production systems, corrupt data, or mask the actual
          bottleneck. Safe measurement practices ensure that the act of observing the system does
          not change its behaviour in undesirable ways. This guide focuses on production-adjacent
          methods that yield actionable data without requiring dedicated performance labs.
        </p>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          The difference between useful performance data and misleading numbers often comes down to
          methodology. A single run of any benchmark is not data. A benchmark run without
          documenting the environment is not reproducible. A benchmark that stresses the wrong
          resource leads to optimisations that do not help real workloads.
        </p>

        <h2 className="text-xl font-semibold mt-6">Safe testing rules</h2>
        <p className="text-muted-foreground mb-3 leading-relaxed">
          These rules protect your systems and your data while still getting the measurements you
          need. They apply whether you are testing CPU, disk, network, or application latency.
        </p>
        <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
          <li>
            <strong>Use realistic workloads whenever possible.</strong>
            <p className="text-sm mt-1">
              Synthetic benchmarks often stress peak capacity but rarely match actual request
              patterns. Use replay logs, production traffic shadows, or workload models derived from
              real data. A benchmark that matches the 95th percentile request mix tells you more
              than a synthetic peak stress test.
            </p>
          </li>
          <li>
            <strong>Keep the test environment separate from production.</strong>
            <p className="text-sm mt-1">
              Run performance tests on isolated hardware, containers, or VMs. If production
              isolation is impossible, run during low-traffic windows with monitoring alerts tuned
              to detect test-induced load. Never run destructive tests on systems holding
              irreplaceable data.
            </p>
          </li>
          <li>
            <strong>Stop the test if heat, errors, or instability appear.</strong>
            <p className="text-sm mt-1">
              Thermal throttling, I/O errors, and kernel warnings are hard stops. Continuing a
              benchmark past these points produces invalid data and risks hardware damage. Set up
              alerting that triggers on temperature thresholds, CRC errors, and OOM events before
              starting the test.
            </p>
          </li>
          <li>
            <strong>Document the version, hardware, and configuration of every run.</strong>
            <p className="text-sm mt-1">
              Record OS version, kernel parameters, driver versions, CPU governor, mount options,
              and network MTU. Store this metadata with benchmark results. Small configuration
              differences can produce 30-50% variance in storage and network benchmarks.
            </p>
          </li>
          <li>
            <strong>Run multiple samples and report distribution.</strong>
            <p className="text-sm mt-1">
              A single benchmark run is an anecdote, not data. Run at least five iterations and
              report median, interquartile range, and outliers. System performance varies due to
              background activity, cache warmness, and thermal states. Distribution captures this
              variance honestly.
            </p>
          </li>
        </ol>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Tools and example commands</h2>
          <p className="text-muted-foreground mb-2">
            Select tools that match the resource you are measuring. Each tool below is designed to
            sample a specific subsystem with minimal overhead, making them safe for
            production-adjacent environments when used with appropriate limits.
          </p>
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
          <p className="text-muted-foreground mb-2">
            Benchmark interpretation requires context. Raw numbers are meaningless without a
            baseline, a hypothesis, and an understanding of confounding factors. The most common
            mistake is treating a single favourable result as proof that an optimisation works.
          </p>
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
          <p className="text-muted-foreground mb-2">
            Follow this checklist for every performance measurement effort. It ensures that results
            are reproducible, comparable, and actionable. Skipping any step compromises the validity
            of the entire test.
          </p>
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

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">
            4. A real-world example: a stretched home-lab disk
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A home-lab operator running a small file server noticed nightly backup jobs had slowly
            crept from forty minutes to just under three hours over several months. The instinct was
            to blame the backup software, but the operator first captured a careful baseline with
            fio using a small, realistic profile rather than a destructive full-volume test. The
            baseline showed read latency climbing sharply once the target file grew past a certain
            size, which pointed at the disk filling rather than the tooling being slow.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Because the measurement was non-destructive and small, the server stayed online
            throughout the test and no data was at risk. The operator then checked the mount options
            and free space, confirmed the filesystem was over ninety percent full, freed several
            stale snapshots, and re-ran the exact same fio profile. Median latency returned to the
            original baseline and the next backup finished in about forty-five minutes. The
            practical outcome was a server that ran hotter-free, a recovery that affected no other
            users, and a lesson that a safe, targeted measurement identified the bottleneck without
            a multi-hour synthetic stress run.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The same discipline applies on larger fleets. Keep the measurement small enough to fit
            inside a maintenance window, capture the environment metadata before you start, and
            always be ready to stop. A test that must be abandoned at the first sign of trouble is
            not a failure; it is a successful safety gate. For guidance on correlating the resulting
            numbers with the rest of your operational picture, see the{" "}
            <Link href="/docs/interpreting-system-logs" className="text-primary hover:underline">
              interpreting system logs
            </Link>{" "}
            guide, and for ongoing early warnings leverage the process covered in{" "}
            <Link href="/docs/service-monitoring" className="text-primary hover:underline">
              service monitoring
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">5. Capturing a safe baseline with minimal risk</h2>
          <p className="text-muted-foreground leading-relaxed">
            A baseline is only useful if it is reproducible and captured under controlled
            conditions. The examples below keep the test surface small and the environment intact.
            The first captures a short CPU sample; the second measures disk behaviour with bounded
            size and runtime so it terminates on its own even if you forget to stop it.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Short, self-terminating CPU sample with a clear label
perf stat -e cycles,instructions,stalled-cycles-frontend \\
  -- sleep 5
echo "baseline captured $(date -Is) kernel $(uname -r)" > run.env  # document environment

# Bounded disk read test that always finishes
fio --name=baseline --rw=randread --bs=4k --size=64M \\
     --numjobs=1 --runtime=5 --time_based --group_reporting`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Note the environment line written alongside the results. Kernel version, CPU governor,
            and mount options can move storage numbers by tens of percent, and without that metadata
            the next run cannot be compared honestly. Keep each run bounded so a forgotten terminal
            cannot turn a small test into an unstoppable load, and set a hard wall-clock timeout as
            a backstop on shared systems.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Bounded network check between two hosts with a hard timeout
timeout 10 iperf3 -c server-host -t 5 -P 1 -R  # reverse-mode download test

# Guard any batch job so it cannot exceed a fixed duration
timeout 300 ./benchmark_suite.sh && echo "run completed within budget"`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            The timeout wrapper is a cheap insurance policy. On a fragile or shared system it is the
            difference between a short measurement and an accidental stress test that bleeds into
            production traffic. Reach for these same patterns when you automate benchmarking as part
            of a regression gate rather than running each measurement by hand.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">6. Troubleshooting a confusing measurement</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sometimes the numbers do not make sense: a "faster" machine measures slower, or the same
            test gives wildly different results across runs. Work through these steps in order
            rather than re-running the same test and hoping for a different answer.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Confirm nothing else is running:</strong> check top, uptime load, and running
              cron or backup jobs. A stray backup can easily explain a doubled latency result.
            </li>
            <li>
              <strong>Compare environment metadata:</strong> verify kernel version, governor, mount
              options, and network MTU match the baseline. A changed governor alone can shift
              results by a wide margin.
            </li>
            <li>
              <strong>Check thermal state:</strong> read sensors for temperature. If the machine has
              been heating up, throttling will make identical hardware look slower than the last
              run.
            </li>
            <li>
              <strong>Increase the sample count:</strong> run a few more iterations and compare
              medians. A single outlier should not trigger an "optimisation" or a rollback.
            </li>
            <li>
              <strong>Recreate the baseline:</strong> if the old baseline cannot be reproduced with
              the current environment, treat it as stale, re-capture it, and update your recorded
              metadata.
            </li>
          </ol>
          <p className="text-muted-foreground leading-relaxed">
            If a regression seems real, verify the signal on a different machine before acting.
            Reproducing the drop elsewhere confirms the change is systemic rather than a quirk of a
            single host or a single run. Only then open a change, and make sure you have a
            documented rollback before you apply it.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">7. Frequently asked questions</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Q: Is it ever safe to run a full stress test?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Yes, but only on dedicated hardware or disposable VMs where data loss is acceptable
              and thermal controls are monitored. Never run a full stress test against a system that
              holds production data or serves live traffic without a documented rollback and an
              abort plan.
            </p>
            <h3 className="text-lg font-bold">
              Q: Why does my benchmark disagree with a colleague's?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Environment differences usually explain the gap: kernel version, CPU governor, mount
              options, network MTU, and background load all shift results. Compare the recorded
              metadata of both runs before trusting any discrepancy.
            </p>
            <h3 className="text-lg font-bold">Q: How many samples are enough?</h3>
            <p className="text-muted-foreground leading-relaxed">
              There is no single magic number, but five iterations with a reported median and
              interquartile range is a reasonable starting point. Add more samples when results are
              noisy or when the change you are measuring is small relative to the variance.
            </p>
            <h3 className="text-lg font-bold">Q: Should I disable antivirus during the test?</h3>
            <p className="text-muted-foreground leading-relaxed">
              If you disable protection, do it only with approval and across a short window, then
              re-enable it immediately. The safer approach is to leave it running and record it as
              part of the environment so you can compare like for like.
            </p>
            <h3 className="text-lg font-bold">
              Q: What do I do if the system starts to error during a test?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Stop immediately, archive any logs and the timestamped run metadata, and treat the
              partial result as invalid. Continuing past thermal limits or I/O errors risks hardware
              damage and produces data you cannot trust.
            </p>
            <h3 className="text-lg font-bold">
              Q: Can I benchmark a system that is serving live traffic?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You can, but only with low-intensity sampling tools and careful limits, during a
              low-traffic window, and with alerting watching for any test-induced load. Prefer a
              separate environment whenever one is available, and treat any live test as a temporary
              exception rather than the default.
            </p>
            <h3 className="text-lg font-bold">
              Q: What is the difference between a baseline and a benchmark?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A baseline is a reference measurement taken under a known environment that you compare
              later results against. A benchmark is the individual test run itself. You keep many
              benchmarks but you need a stable baseline to interpret any of them meaningfully.
            </p>
          </div>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">9. Reviewing the process before you commit</h2>
          <p className="text-muted-foreground leading-relaxed">
            Before you treat a measurement as trustworthy enough to act on, run a final mental
            review. Confirm that the environment metadata was captured, that you ran more than one
            sample and looked at the distribution, and that you can reproduce the result on another
            machine. If any of those checks fail, the numbers are not ready to drive a decision.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Equally important is the decision that follows the measurement. A favourable benchmark
            is a reason to trial a change in a canary or staging environment, not a license to apply
            it broadly. Keep the rollback documented, keep the harness versioned, and re-measure
            after the change goes live so a regression in the real workload is caught early rather
            than discovered weeks later during an unrelated incident.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Finally, keep the whole loop lightweight. The goal is a measurement habit you can
            sustain without a dedicated lab: short, bounded runs, versioned harnesses, recorded
            metadata, and a clear stop rule. When measuring performance is boring and routine, it is
            also safe, and that is precisely the outcome this guide is meant to produce.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">8. Building a safe, repeatable harness</h2>
          <p className="text-muted-foreground leading-relaxed">
            The most reliable way to keep performance work safe is to stop assembling commands by
            hand and instead run a small, versioned harness that encodes the safety rules you would
            otherwise have to remember. A harness fixes the workload, the sample count, the metadata
            capture, and the hard time limit, so every run is comparable and no single run can turn
            into an unbounded stress test.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`#!/usr/bin/env bash
# safe-bench.sh - run one bounded CPU sample and record its environment
set -euo pipefail
WORKLOAD=$1
DURATION=$2
OUT=results/$(date -Is).txt
mkdir -p results
{
  echo "workload=$WORKLOAD duration=$DURATION"
  echo "kernel=$(uname -r) governor=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor)"
  perf stat -e cycles,instructions -a -- sleep "$DURATION"
} > "$OUT" 2>&1
tail -20 "$OUT"`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Notice that the harness writes its environment metadata to the same file as the results.
            This single detail makes later comparisons trustworthy, because you can always see
            whether two runs were measured under the same kernel and governor. It also forces the
            run to finish on its own: the sleep-based duration guarantees the sampling stops even if
            the terminal is forgotten.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Run three iterations and report a compact summary
for i in 1 2 3; do ./safe-bench.sh webserver 5; done
ls -1 results/ | tail -3   # confirm the latest captures

# Summarise median cycles across the three runs (rough sketch)
grep -h "instructions" results/*.txt | awk '{a[NR]=$NF} END{print "runs="NR}'`}</code>
          </pre>
          <p className="text-muted-foreground leading-relaxed">
            Commit the harness to version control alongside the baselines it produces. When someone
            later changes the kernel or upgrades the server, they can re-run the harness, compare
            the medians, and decide with evidence whether the change was a win or a regression. This
            turns performance measurement from a one-off investigation into a routine, low-risk
            practice that the whole team can reuse.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">
          Reproducible benchmarking and safety gates
        </h2>
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
          Safety gates: verify that any tuning change can be rolled back by an automated job and
          that application smoke tests pass after each change. Record RTO expectations for
          performance regressions and automate alerting when thresholds are exceeded in production
          canaries.
        </p>

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
