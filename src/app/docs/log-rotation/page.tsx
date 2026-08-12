import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Log Rotation and Retention Policies | CM Regmi Docs",
  description:
    "logrotate configurations, journald size limits, compression, retention windows, and centralized logging for keeping system logs manageable and auditable.",
  alternates: { canonical: `${SITE_URL}/docs/log-rotation` },
  openGraph: {
    title: "Log Rotation and Retention Policies | CM Regmi Docs",
    description:
      "logrotate configurations, journald size limits, compression, retention windows, and centralized logging for keeping system logs manageable and auditable.",
    url: `${SITE_URL}/docs/log-rotation`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Log Rotation and Retention Policies | CM Regmi Docs",
    description:
      "logrotate configurations, journald size limits, compression, retention windows, and centralized logging for keeping system logs manageable and auditable.",
  },
  robots: { index: true, follow: true },
};

export default function LogRotationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/log-rotation#article`,
    headline: "Log Rotation and Retention Policies",
    description:
      "logrotate configurations, journald size limits, compression, retention windows, and centralized logging for keeping system logs manageable and auditable.",
    url: `${SITE_URL}/docs/log-rotation`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="log-rotation-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs">Docs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Log Rotation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ System Operations
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Log Rotation &amp; Retention Policies
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Logs are only useful while they remain readable and accessible. This guide covers
              logrotate configuration, journald size limits, compression and retention windows, and
              how to send logs to a central store without letting local disks fill up.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Why Log Rotation Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every running service writes logs, and none of them stop on their own. Without
              rotation a chatty application can fill a disk partition in days, and when the disk
              fills, the very systems that produce the logs begin to fail: writes return errors, the
              OS refuses to start, and the database stops committing. The irony is that the outage
              is caused by the machinery meant to help you diagnose outages. Rotation exists to keep
              that machinery bounded so it never becomes the thing that brings the host down.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Rotation also serves an audit and investigation purpose. You do not usually need six
              months of every debug line, but you do need a known window of history so that when
              something goes wrong you can trace back to the moment it began. A retention policy is
              the formal answer to the question of how long that history lives. It balances forensic
              value, storage cost, and any compliance requirement that mandates keeping certain
              records for a minimum period.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical goal is simple: log files never exceed a configured size, old logs age
              out predictably, and nothing writes to a file that no longer exists. The two dominant
              mechanisms on a Linux system are the classic logrotate daemon for traditional
              file-based logging and the journal daemon of systemd, which manages binary logs by
              size and time itself. Understanding both is the foundation of every sensible policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Configuring logrotate</h2>
            <p className="text-muted-foreground leading-relaxed">
              logrotate reads a set of configuration files, typically in the /etc/logrotate.d
              directory, and rotates the named log files on a schedule run by cron or a systemd
              timer. Each configuration block specifies how often to rotate, how many rotated files
              to keep, whether to compress them, and what command to run after rotation so the
              service opens a fresh file handle.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A representative block for an application that writes a daily log with weekly
              compression and a ninety-day retention looks like this.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`/var/log/myapp/app.log {
  daily
  rotate 90
  compress
  delaycompress
  missingok
  notifempty
  copytruncate
  dateext
}`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The copytruncate directive is a pragmatic choice for applications that refuse to close
              their log file handle; it copies the contents and truncates the original in place
              rather than renaming it. The delaycompress keeps the most recent rotated file
              uncompressed so a slow reader can still process it. The dateext option appends the
              date to rotated files, which keeps file names unique and makes the retention age
              visible at a glance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Choose between rotation by time and rotation by size deliberately. Daily rotation
              gives predictable file boundaries that are easy to reason about, but a very verbose
              service can still grow a day file large. Size-based rotation, using the size
              directive, bounds each file regardless of how much it writes. Many teams combine them
              by setting both a frequency and a size, so the file rotates whichever threshold comes
              first.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After editing a configuration, validate it with the test option before relying on it,
              and review the status file so you know the last rotation happened. A logrotate
              misconfiguration tends to fail silently, which is exactly the kind of quiet failure
              that only surfaces at the worst time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. Limiting journald Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              The systemd journal stores structured, binary logs under a configured storage
              directory and manages them by itself. By default journald will use a fixed portion of
              disk space, but on systems that do not define a cap it can grow considerably, and it
              does not rotate on a clock the way logrotate does. You control it through the journal
              configuration file, most commonly by setting a size limit and a retention time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A typical journald configuration bounds the journal to half a gigabyte and keeps
              entries for at least two weeks, with fallback limits that scale with available disk
              space.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`[Journal]
Storage=auto
SystemMaxUse=500M
SystemMaxFileSize=100M
MaxRetentionSec=14day
Compress=yes
SystemKeepFree=1G`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The SystemMaxUse directive caps total journal usage, SystemMaxFileSize bounds
              individual files, and MaxRetentionSec drops entries older than fourteen days. Setting
              SystemKeepFree reserves headroom so the journal never exhausts the disk even during an
              unexpected log burst. After editing the configuration, restart the journal service and
              confirm the limits took effect rather than assuming the change applied.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              journald compresses stored entries by default, which significantly stretches the value
              of the size cap. Because the journal is binary and structured, you read it with the
              journalctl tool, filtering by time, service, or unit, and you can export its contents
              for a central log store. Compression is a recurring theme here: in both journald and
              logrotate it trades a little CPU for a large reduction in the disk that logs consume.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Compression and Retention Decisions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Compression is almost always worth the small CPU cost. Logs are highly repetitive
              text, so gzip routinely shrinks them by an order of magnitude, letting you keep far
              more history in the same space. The tradeoff is that you must decompress before
              reading, which slows forensic work. The compromise is delaycompress, which keeps the
              newest rotated file uncompressed so the day-to-day reader sees the most recent history
              instantly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Retention is a business decision expressed in configuration. A common baseline keeps
              daily logs for thirty to ninety days and a set of weekly or monthly archives for a
              year. Anything governed by a compliance or audit requirement must be retained for the
              mandated minimum regardless of convenience, and that should be documented and reviewed
              with the people who own the data. Retention that only exists in a config file and is
              never tested is fragile; verify that old files actually expire and that space is
              actually reclaimed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Decide the retention window explicitly rather than leaving it at defaults. Ask what
              the longest forensic window you realistically need is, add a safety margin, and size
              your storage to fit it. When you need more history than a machine can hold, that is
              the point where you stop trying to store everything locally and start shipping logs to
              a central store, which is the subject of the next section.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Shipping Logs to a Central Store
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Local rotation keeps each host healthy, but it does not give you a fleet-wide view.
              When several machines fail in a correlated way, you need to search across all of them
              from one place, which is what centralized logging provides. The pattern is always the
              same: a forwarder on each host reads the local log stream and forwards it to a
              collector that indexes and stores the data, often with the same rotation and retention
              logic applied at the central layer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A minimal, dependency-free forwarder can use the system journal export mode or the
              journal gateway to expose logs over HTTP for a collector to pull. A more scalable
              approach runs a dedicated agent that tails files or consumes journald and batches
              events to the central server, with buffering so that a brief network outage does not
              lose data. Choose the transport with retries and backpressure in mind; a forwarder
              that drops events when the collector is slow silently corrupts your audit trail.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Keep local retention even when you centralize. Local logs are the immediate source of
              truth when a host is unreachable, and they provide resilience if the central store is
              down. Central storage should complement local rotation, not replace it. The central
              tier gets its own retention and compression policy, typically sized by a cost and
              search speed tradeoff rather than by a single disk.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Once logs are centralized, apply the interpretation skills from the{" "}
              <Link href="/docs/interpreting-system-logs" className="text-primary hover:underline">
                interpreting system logs
              </Link>{" "}
              guide, which covers turning raw lines into diagnosis. Centralization is the plumbing;
              interpreting what the events mean, correlating them across hosts, and spotting the
              pattern that precedes an incident is where the real value is created. Related{" "}
              <Link
                href="/docs/infrastructure-admin-monitoring"
                className="text-primary hover:underline"
              >
                infrastructure admin and monitoring
              </Link>{" "}
              guidance gives the surrounding observability context that makes the stored logs
              actionable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. Monitoring the Log Pipeline</h2>
            <p className="text-muted-foreground leading-relaxed">
              The log pipeline itself needs monitoring, because its quiet failures are the most
              dangerous. Watch three things: whether rotation is actually happening, whether the
              disk is staying under its cap, and whether the central store is receiving events. A
              rotation job that stopped running lets files grow without bound, and a forwarder that
              disconnected can silently drop days of events.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Alert on disk usage for the log partitions before they fill, alert when a forwarder
              has not sent data within an expected interval, and alert when rotation has not
              produced a new rotated file on schedule. Log these pipeline-health signals into the
              same central store you are protecting, so a problem with the logging system shows up
              in the same place you look for every other problem. The related infrastructure and
              monitoring guide covers the surrounding observability practices that keep all of this
              visible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Schedule a periodic review of the retention settings against actual disk usage and
              growth rates. Log volume is not static; a new service or a verbose code path can
              multiply it without any obvious change to the host. A quarterly review that checks
              whether the configured caps still fit the current rate prevents the slow drift toward
              a full disk that catches everyone by surprise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. A Fleet Example with a Real Outcome
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Consider a small team running a handful of application servers that had always relied
              on default journald settings and an unmanaged log directory for a busy web
              application. After several months the log partition on one host reached capacity,
              writes began failing, and the application started producing intermittent errors that
              were hard to trace because the very logs that would have explained them were
              truncated.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The team responded by applying a logrotate block for the application with daily
              rotation, compression, and a ninety-day retention, capping journald at a fixed size,
              and installing a forwarder on each host to send events to a central store with its own
              retention window. They also added a disk alert so the partition could not silently
              fill again. After the change the same workload ran for months without a single
              log-related outage, and the partition never climbed above half its cap.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical outcome was that the incident investigation improved sharply. Because
              logs were now retained predictably and searchable from a central place, the next
              application anomaly was diagnosed in minutes instead of being blocked by truncated
              files. Bounded, verifiable log retention turned what had been a source of outages into
              the reliable forensic asset the team could actually depend on.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting</h2>
            <p className="text-muted-foreground leading-relaxed">
              If a log file is not rotating, check that logrotate is being invoked at all and that
              your configuration passed its test. A missing state entry, a typo in the glob, or a
              service that reopens the file only under certain signals can all keep rotation from
              happening. Run the rotation manually in debug mode to see exactly what the tool
              intends to do.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If journald ignores your size limit, confirm the configuration was written to the
              correct drop-in path and that the journal service was restarted. On some setups an
              explicit Storage directive overrides the automatic size behaviour, so verify the
              effective value with journalctl rather than trusting the file. Also confirm
              SystemKeepFree is not set so low that it fights the journal for space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If the central store is missing events, check the forwarder logs for buffering and
              retry behaviour and verify the collector can be reached from each host. A TLS or
              certificate mismatch, a firewall rule, or a full local buffer will all produce silent
              gaps. Compare event counts at the source and the destination over a window to quantify
              the loss before you debug further.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Should I rotate by time or by size?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Daily rotation gives predictable file boundaries, while size rotation bounds each
                file regardless of volume. Many teams set both a frequency and a size so the file
                rotates on whichever threshold comes first, which gives the best of both.
              </p>
              <h3 className="text-lg font-bold">How much log history should I keep?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A common baseline is thirty to ninety days of daily logs plus longer weekly or
                monthly archives. Extend the window to meet any audit or compliance minimum, and
                confirm the settings actually expire old files rather than trusting the defaults.
              </p>
              <h3 className="text-lg font-bold">Is journald better than logrotate?</h3>
              <p className="text-muted-foreground leading-relaxed">
                They serve different layers. journald manages the systemd binary journal
                automatically by size and time, while logrotate handles traditional file-based logs
                from applications. Production systems usually need both, configured to complement
                each other.
              </p>
              <h3 className="text-lg font-bold">Why is compression such a big win for logs?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Logs are highly repetitive text, so gzip routinely reduces them by an order of
                magnitude. The small CPU cost buys a much longer usable history in the same disk,
                and delaycompress keeps the most recent file instantly readable.
              </p>
              <h3 className="text-lg font-bold">Do I still need local logs if I centralize?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes. Local logs remain the immediate source of truth when a host is unreachable and
                provide resilience when the central store is down. Centralization should complement
                local rotation, not replace it.
              </p>
              <h3 className="text-lg font-bold">What happens when the log partition fills up?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Services that cannot write begin to fail, and in the worst case the OS will not
                boot. Rotation, size caps, and disk alerts exist precisely to prevent this, and a
                filled log disk should be treated as a high-priority incident.
              </p>
              <h3 className="text-lg font-bold">
                How do I stop a chatty service from filling the disk?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Bound it at every layer: cap journald size, rotate the application log by size and
                frequency, reserve free space with SystemKeepFree, and alert on disk usage well
                before the partition fills. Fixing the logging verbosity at the source is the best
                long-term answer.
              </p>
              <h3 className="text-lg font-bold">How do I know my rotation is actually working?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Validate the configuration, review the state file to confirm the last rotation, and
                alert when a new rotated file does not appear on schedule. A rotation that fails
                silently is exactly the kind of quiet failure you cannot afford.
              </p>
            </div>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
          <AdsSlot />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
