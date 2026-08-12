import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TableOfContents } from "@/components/TableOfContents";
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

const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Service Monitoring &amp; Alerting Guide | CM Regmi Docs",
  description:
    "systemd status checks, health checks, uptime, alerting, Prometheus metrics, SLOs, and incident response for keeping services reliable.",
  alternates: { canonical: `${SITE_URL}/docs/service-monitoring` },
  openGraph: {
    title: "Service Monitoring &amp; Alerting Guide | CM Regmi Docs",
    description:
      "systemd status checks, health checks, uptime, alerting, Prometheus metrics, SLOs, and incident response for keeping services reliable.",
    url: `${SITE_URL}/docs/service-monitoring`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Monitoring &amp; Alerting Guide | CM Regmi Docs",
    description:
      "systemd status checks, health checks, uptime, alerting, Prometheus metrics, SLOs, and incident response for keeping services reliable.",
  },
  robots: { index: true, follow: true },
};

export default function ServiceMonitoringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/service-monitoring#article`,
    headline: "Service Monitoring &amp; Alerting Guide",
    description:
      "systemd status checks, health checks, uptime, alerting, Prometheus metrics, SLOs, and incident response for keeping services reliable.",
    url: `${SITE_URL}/docs/service-monitoring`,
    datePublished: "2026-07-20",
    dateModified: "2026-07-20",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="service-monitoring-schema"
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
                <BreadcrumbPage>Service Monitoring</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Infrastructure
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Service Monitoring &amp; Alerting Guide
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published July 20, 2026 • Updated July 20, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A service is only as reliable as your ability to notice when it is not working.
              Monitoring turns a service from a black box into a set of signals you can inspect,
              trend, and act on. This guide covers the layers that matter — systemd status and
              health checks, uptime and availability, alerting rules that do not drown you in noise,
              Prometheus metrics, and the service-level objectives that turn raw numbers into a
              meaningful promise about the experience your users get.
            </p>
          </header>

          <TableOfContents />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Why Monitoring Is Not the Same as Observability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Monitoring is the practice of watching a known set of signals and alerting when they
              leave an expected range. Observability is the broader capability to answer questions
              about a system you did not think to ask in advance. The two are complementary, but
              they require different investments, and it is easy to build monitoring without gaining
              any real observability. The core distinction matters because it shapes what you
              collect and what you can later investigate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A monitoring system typically checks whether a service is up, whether it responds
              within a timeout, and whether its key counters are moving. That is necessary but
              limited: an "up" check passes while the service is degraded and returning errors to
              users, because the process is still running. The leap to observability comes when you
              collect metrics, logs, and traces together, so that when a check fails you can trace
              the symptom back to a cause instead of restarting the service and hoping.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Start with the basics and grow deliberately. A reliable uptime check and a few health
              checks are worth more than an elaborate dashboard nobody trusts. The discipline of
              logging what actually happened during a failure is what turns monitoring data into
              durable knowledge, and the system log analysis guide covers how to extract signal from
              the noise once you are collecting it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. systemd Status and Health Checks
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              On modern Linux, systemd is the process manager that owns your services, so it is the
              natural first place to look for a health signal. The systemctl status command shows
              whether a unit is active, how long it has been running, and the most recent log lines,
              all in one view. Combined with the exit code of the unit, it tells you whether a
              service is genuinely running or merely present.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Show active state, uptime, and recent logs for a unit
systemctl status nginx

# Just the activation state (active, failed, inactive)
systemctl is-active nginx

# Exit code from the last run of the unit
systemctl show nginx -p Result,ExecMainStatus`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              An active unit is not a healthy service. The process can be up while the application
              behind it refuses connections or returns errors. The standard answer is a health
              check, a request or probe the service defines that returns a pass or fail for
              readiness. For a web service this is usually an HTTP endpoint that the application
              deliberately serves only when it is truly ready to handle traffic, not a static file
              served by the web server.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Health check: expect HTTP 200 from an application endpoint
curl -fsS -o /dev/null -w "%{http_code}" \\
  http://127.0.0.1/healthz

# Fail only when the service is genuinely down, with a timeout
systemctl is-active nginx || systemctl start nginx

# Check whether a TCP port is accepting connections
ss -ltn | grep -q ":443 " && echo "LISTENING"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The most reliable health checks distinguish between liveness and readiness. A liveness
              check answers the question is the process alive, while a readiness check answers the
              deeper question is the service able to accept work right now. A database that is alive
              but mid-recovery should report not ready, and a load balancer that honors readiness
              will stop sending it traffic. Designing health endpoints around that distinction
              prevents a whole class of partial-outage incidents.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Uptime and Availability Measurement
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Uptime is the percentage of time a service was available over a defined window, and it
              is the number most people quote first. The trap is that a raw uptime percentage hides
              everything that matters. A service that is up 99.9 percent of the time can still fail
              for a full ten minutes on the day your users most depend on it, and the aggregate
              number will barely move.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The correct way to measure availability is from the perspective of the user, which
              means probing from outside, from a location that represents how users actually reach
              the service, and counting every failed or slow request as downtime. An internal check
              that the process is running measures something, but it does not measure availability
              as users experience it. The distinction explains why two monitoring stacks can report
              different uptime for the same service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Keep a history of outages with a timestamp, a duration, and a one-line cause. Over
              time that record reveals patterns — repeated failures at the same time of day, on the
              same hardware, or after the same type of change. Those patterns are the real payoff of
              uptime measurement, because a recurring cause is a fixable cause. Without the history,
              you are only counting; with it, you are diagnosing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Designing Alerting That Is Not Noise
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Alerting is where monitoring succeeds or fails in practice. The single most common
              failure is alert fatigue: too many alerts that fire for reasons that turn out not to
              matter, until nobody trusts any alert and the real one is ignored. The goal of good
              alerting is not more alerts, it is fewer, higher-value ones that each trigger a clear,
              useful response.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every alert should be a decision, not a data point. Before an alert is allowed to
              fire, someone should be able to answer: what does this condition mean, who is
              responsible, what should they do, and how do we know the incident is over? If an alert
              does not have a documented runbook, it is either a candidate for deletion or a
              candidate for a runbook, and the incident response documentation explains how to build
              the second kind.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Suppress the noise at the source. Add a small amount of smoothing so a single blip
              does not page a human, and require a condition to persist for a meaningful duration
              before it escalates. But be careful not to smooth so aggressively that real problems
              are hidden. The balance is to alert on sustained deviations and error rates rather
              than on momentary spikes, and to make the alert message contain the exact metric
              value, the time, and the host so the responder does not have to go hunting.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Prometheus Metrics and Alerting Rules
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Prometheus is the most widely adopted open-source metrics system and the de facto
              standard in the Linux ecosystem. It scrapes HTTP endpoints that expose metrics in a
              text format, stores them in a time series database, and evaluates alerting rules
              against them. The model is simple: every metric is a named time series with dimensions
              called labels, and alerts are rules that detect a condition across those series.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# A minimal Prometheus scrape config for an application and node exporter
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "app"
    static_configs:
      - targets: ["localhost:9090"]  # Prometheus itself
      - targets: ["app-server:9100"] # node_exporter on the host`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Alerting rules are written in PromQL, the query language, and configured in a separate
              rules file. A rule computes a value and, when the value meets the for clause's
              duration, fires an alert. The for clause is what prevents the single-blip noise
              described earlier: a rule that requires the error rate to be high for five minutes
              before alerting ignores transient bumps.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Alerting rule: sustained 5xx error rate on an HTTP endpoint
groups:
  - name: service-health
    rules:
      - alert: HighErrorRate
        expr: |
          rate(http_requests_total{status=~"5.."}[5m])
          / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: page
        annotations:
          summary: "HTTP 5xx rate high on {{ $labels.job }}"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              When an alert fires, Prometheus can send notifications through Alertmanager, which
              handles routing, grouping, and deduplication. Grouping is important: twenty instances
              failing the same rule should produce one notification with the affected hosts listed,
              not twenty notifications. The alert pipeline, from scrape to rule to notification, is
              the backbone of a modern service monitoring stack, and the broader admin and
              monitoring documentation covers how these components fit into an operational whole.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. SLOs and Turning Numbers into Promises
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A service-level objective (SLO) is a target you set for the reliability of a service,
              expressed as a measurable percentage over a window, such as 99.9 percent of requests
              succeeding in a month. The value of an SLO is not the percentage itself; it is that it
              forces a decision about what good looks like and gives you a concrete basis for
              alerting and for choosing when to ship a change.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The useful companion to an SLO is an error budget: the amount of failure you have
              agreed to tolerate before users notice. An SLO of 99.9 percent gives you about 43
              minutes of allowed downtime per month. While the error budget has remaining time,
              releases can proceed at a normal pace. Once it is depleted, the safe move is to slow
              down and stabilize. Framing reliability as a budget instead of a perfect-zero goal is
              what makes it practical, because chasing 100 percent is both impossible and wasteful.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              SLOs should be built on the metrics you already collect, like the request rate and
              error rate from the previous section. Measure the objective continuously, alert when
              you are burning budget faster than expected, and review the numbers with the team on a
              schedule. The discipline converts a vague aspiration of reliable service into a
              monitored, budgeted, and actionable number that guides real operational decisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Real-World Example: A Recurring Midnight Alert
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A small hosting provider ran a customer-facing web service behind a single server,
              with a basic uptime probe and a Prometheus node exporter. Every night near midnight
              the uptime alert fired, the on-call engineer woke up, confirmed the service was up,
              and went back to bed. The pattern repeated for two weeks until the engineer finally
              checked the raw metrics instead of just the alert.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The uptime probe was configured with a strict timeout, and the node exporter showed a
              small, sustained load spike at the same time each night. Digging into the system logs
              revealed a nightly backup job that saturated the disk with a metadata-heavy write and
              pushed request latency past the probe's timeout for a few minutes. The service never
              actually went down; it was merely slow enough to trip an overly aggressive timeout.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The fix combined several ideas from this guide. The backup was moved off-peak and
              throttled, and the uptime probe was made less brittle with a longer timeout so a brief
              latency spike no longer counted as a full outage. The alert was kept but reframed
              around sustained latency and error rate rather than a single slow request. The
              practical outcome was that the on-call phone stopped ringing at midnight, the real
              signal became clearer, and the team recovered a full night of sleep every week — a
              small example of how measuring the right thing, rather than more things, improves
              operations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">8. Troubleshooting</h2>
            <p className="text-muted-foreground leading-relaxed">
              Monitoring stacks introduce their own failure modes. When a check misbehaves or an
              alert stops firing, work through this sequence.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Confirm the collector is actually running.</strong> A silent system is often
                a broken one. Verify that the monitoring agent, exporter, or cron check is alive and
                has run recently, because many false outages are really a dead collection process.
              </li>
              <li>
                <strong>Verify the probe target, not just the tool.</strong> Confirm that the health
                check hits the right host, port, and path. Misconfigured targets are a leading cause
                of both false alerts and missed alerts.
              </li>
              <li>
                <strong>Check for timeouts and units.</strong> A check that is too aggressive on its
                timeout produces noise; a metric divided by the wrong unit produces nonsense. Look
                at the actual metric value before trusting an alert message.
              </li>
              <li>
                <strong>Look at the for clause and smoothing.</strong> If an alert fires too often,
                increase the required duration or use a rate over a longer window. If it never
                fires, check that the expression is not accidentally smoothed past the threshold.
              </li>
              <li>
                <strong>Confirm notification delivery.</strong> Verify that the alert actually
                reaches its destination. A rule that fires but is routed nowhere, or is suppressed
                by a stale group, is worse than no alert because it creates false confidence.
              </li>
              <li>
                <strong>Escalate to the logs and traces.</strong> When a check fails and the cause
                is not obvious, open the application logs and any distributed traces for the same
                time window. The answer is usually waiting in the correlation between the metric and
                the log record.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                Is systemctl is-active enough to know a service is healthy?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No. It only tells you the process is running. A service can be active while its
                application returns errors or refuses connections. Add a readiness health check that
                probes the application itself for a true health signal.
              </p>
              <h3 className="text-lg font-bold">How many alerts per day is too many?</h3>
              <p className="text-muted-foreground leading-relaxed">
                More than the team can meaningfully investigate. As a rough target, most alerts
                should be rare enough that each one is surprising. If a rule fires daily without a
                response, either the rule is too sensitive or the underlying problem is being
                ignored.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between a liveness and a readiness check?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A liveness check asks whether the process is alive, while a readiness check asks
                whether it is able to accept work right now. Readiness is the signal a load balancer
                should use to decide whether to send traffic, so that a degraded service is drained
                rather than overloaded.
              </p>
              <h3 className="text-lg font-bold">
                Why does an uptime percentage hide real problems?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Because it averages availability over a long window. A service at 99.9 percent
                uptime can still fail for ten minutes on the worst possible day. Track outages as
                events with a cause, not just as a rolling percentage.
              </p>
              <h3 className="text-lg font-bold">
                Do I need Prometheus, or is a simple cron check enough?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                For a small service, a well-built cron check with a health endpoint and alert script
                can be enough. Prometheus adds history, trend analysis, and flexible alert rules.
                Adopt it when you need to understand trends and correlations rather than just catch
                outages.
              </p>
              <h3 className="text-lg font-bold">What is a reasonable starting SLO?</h3>
              <p className="text-muted-foreground leading-relaxed">
                For an internal or non-critical service, 99 percent is a reasonable start. For a
                customer-facing service, 99.9 percent is a common target. The right value balances
                what your users expect against what it costs to deliver.
              </p>
              <h3 className="text-lg font-bold">Should I alert on every 5xx response?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Individual errors are normal. Alert on a sustained error rate, such as more than
                five percent of requests failing for five minutes. That distinguishes a real
                degradation from background noise.
              </p>
              <h3 className="text-lg font-bold">
                How do I stop alert fatigue once it has started?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Audit every alert against the question of whether it triggers a useful action.
                Delete or tune rules that only fire noise, require a sustained condition before
                paging, and write a runbook for every alert that remains. Fewer, actionable alerts
                build trust.
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
