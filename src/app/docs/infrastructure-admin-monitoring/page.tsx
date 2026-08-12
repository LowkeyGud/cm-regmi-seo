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

const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Secure Infrastructure Administration & Service Monitoring SOP | CM Regmi Docs",
  description:
    "Enterprise SSH hardening, systemd journald central logging, Prometheus service alerts, and structured incident runbooks.",
  alternates: {
    canonical: `${SITE_URL}/docs/infrastructure-admin-monitoring`,
  },
};

export default function InfrastructureAdminMonitoringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/infrastructure-admin-monitoring#article`,
    headline: "Secure Infrastructure Administration & Service Monitoring SOP",
    description:
      "Deep-dive standard operating procedure for secure infrastructure administration and system monitoring.",
    url: `${SITE_URL}/docs/infrastructure-admin-monitoring`,
    datePublished: "2025-05-24",
    dateModified: "2025-05-27",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="infra-opt-schema"
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
                <BreadcrumbPage>Infrastructure & Monitoring SOP</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Systems Administration
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Secure Infrastructure Administration & Service Monitoring SOP
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 26, 2025 • Updated May 27, 2025
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Enterprise system stability depends on secure remote administration baselines,
              continuous service telemetries, and centralized logging architectures. Protecting
              remote nodes requires strict OpenSSH policies, while maintaining availability demands
              structured monitoring and clear incident runbooks.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Hardening OpenSSH for Remote Administration
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Securing the remote console is the primary priority in infrastructure administration.
              Exposed Secure Shell (SSH) daemons on the public internet are continuously probed by
              automated brute-force systems. Relying on default configurations is a high risk.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Disable legacy password-based authentication, prohibit administrative root logins over
              SSH, enforce cryptographic key-based logins, and bind SSH services only to designated
              management subnets:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Append these hardening directives to /etc/ssh/sshd_config
# Enforce cryptographic key logins, disabling passwords
PasswordAuthentication no
PubkeyAuthentication yes

# Prohibit direct administrative root logons
PermitRootLogin no

# Enforce secure modern key algorithms (disable weak legacy ciphers)
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com

# Restrict remote console access only to the administrative group
AllowGroups sysadmin`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Validate configurations before restarting the SSH service to prevent locking out
              active administrators:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`sudo sshd -t
# If zero output is returned, configuration is valid; apply immediately:
sudo systemctl restart sshd`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Centralized Logging & Log Auditing with Journald
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Diagnosing system events is impossible when logs are scattered across isolated server
              nodes. Centralizing system logs provides administrators with unified timelines to
              identify operational faults.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Use `journalctl` to search, filter, and inspect real-time system logs. Focus on
              critical errors and security events across target units:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Stream real-time logs for a specific application unit
journalctl -u nginx.service -f

# Query error logs across the entire system since the current day
journalctl -p err --since today

# Inspect failed remote authentication attempts to locate brute-force activity
journalctl _SYSTEMD_UNIT=ssh.service | grep "Failed password"`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Service Telemetry Monitoring & Prometheus Alerts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Modern telemetry systems collect metrics rather than waiting for server crashes. A
              typical monitoring infrastructure features Prometheus to collect time-series
              statistics and Alertmanager to route notifications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Administrators must monitor resource boundaries (CPU, memory, disk) and configure
              alerts. Below is a rule block defining threshold conditions:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# File: /etc/prometheus/alert.rules.yml
groups:
  - name: InfrastructureAlerts
    rules:
      - alert: HostOutOfMemory
        expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100 \u003c 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Host out of memory on {{ $labels.instance }}"
          description: "Node memory is critical (\u003c 10% available)."

      - alert: ServiceDown
        expr: up == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} is unreachable"
          description: "Service has been offline for over 2 minutes."`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Case Study: Mitigating a CPU Spike on a Web Server
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An enterprise application server triggered a high CPU utilization alarm. Alertmanager
              routed a critical alert to the engineering team indicating CPU use exceeded 95% for
              over 5 minutes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We initiated an immediate response pass, executing top-tier diagnostics to isolate the
              process:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query system metrics, sorting active processes by CPU consumption
ps -eo pid,ppid,cmd,%cpu,%mem --sort=-%cpu | head -n 5

# Output indicated:
#   PID    PPID   CMD                         %CPU  %MEM
#   2412   1      python3 /opt/sync-job.py    98.4  12.2
#   ...`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The output pinpointed an automated database synchronization job that had entered a
              tight execution loop. We ran a diagnostic trace on the process:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Trace system calls for the active CPU-bound process
strace -p 2412 -c

# Result showed:
#   % time     seconds  usecs/call     calls    errors syscall
#   ------ ----------- ----------- --------- --------- ---------
#   99.52     2.140292           2   1053124           read`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The trace confirmed the script was stuck reading from a missing network socket in an
              unthrottled loop. We terminated the process and updated the script to include
              exponential backoff, resolving the CPU spike:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Terminate the runaway sync script
kill -15 2412
# Result: System CPU drops immediately to 4% baseline`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Incident Runbook & Escalation SOP
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When alarms trigger, teams must follow a predictable response path to minimize chaos:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Triage & Validate:</strong> Confirm the alert is authentic and evaluate
                system impact.
              </li>
              <li>
                <strong>Isolate:</strong> Decouple corrupted nodes or reroute network traffic via
                load balancers.
              </li>
              <li>
                <strong>Mitigate:</strong> Clear caches, restart affected services, or roll back
                buggy updates.
              </li>
              <li>
                <strong>Remediation Analysis:</strong> Review system event logs, establish root
                cause, and document key fixes.
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              By following a structured incident playbook, teams can handle system challenges
              cleanly and resolve outages within SLAs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Real-World Example: Fleet-Wide SSH Hardening Rollout
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To show how these practices hold up under real pressure, consider a team that
              administers forty Ubuntu application servers in a managed colocation environment.
              Three of the older nodes still accepted password authentication, and the system
              journal for those hosts had accumulated thousands of failed login attempts during the
              previous month alone. Brute-force scanners probe public SSH ports around the clock, so
              the team decided to apply the OpenSSH hardening directives from Section 1 across the
              entire fleet without scheduling a maintenance window.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The rollout ran in staged batches of ten hosts. After every batch, the lead
              administrator confirmed that an active SSH session still worked before moving on,
              which removed the risk of locking every engineer out at once. A simple loop read the
              host list from a plain inventory file and pushed the validated configuration to each
              node:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Inventory file /etc/infra/fleet-inventory holds one host per line
while read -r host; do
  scp -p /etc/ssh/sshd_config "sysadmin@\${host}:/tmp/sshd_config.new"
  ssh "sysadmin@\${host}" 'sudo install -m 0600 /tmp/sshd_config.new \\
    /etc/ssh/sshd_config && sudo sshd -t && sudo systemctl restart sshd'
  echo "Hardened: \${host}"
  done \u003c /etc/infra/fleet-inventory`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Each iteration copied the configuration, validated it with sshd -t, and only then
              restarted the daemon. Running the syntax check inside the same command sequence means
              a corrupt file can never be applied, because the install and the test are joined with
              the logical AND operator. If any host fails the check, the loop stops on that line and
              the administrator investigates before the batch continues.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After the final batch, the team inspected the aggregated authentication logs with
              journalctl across all three previously exposed hosts. Failed-password events stopped
              appearing that same evening, while every administrator could still reach each node
              with their private key. The exercise took about two hours end to end, and the only
              follow-up work was recording in the fleet documentation which servers had already
              received the hardened configuration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because the process lives in a script, it doubles as onboarding for new hosts: add a
              hostname to the inventory file and re-run the loop, and the new server inherits the
              same security baseline immediately. Repeating a one-off hardening exercise this way
              turns a risky change into a repeatable, verifiable step. For the foundations behind
              these directives, see the{" "}
              <Link href="/docs/secure-ssh-basics" className="text-primary hover:underline">
                secure SSH basics guide
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Disk Utilization Monitoring and Alerting
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Disk exhaustion causes some of the most frequent outages in production, and it is easy
              to miss because a volume fills gradually instead of failing all at once. Monitoring
              free space alongside CPU and memory closes that gap. The df utility gives an immediate
              snapshot across every mounted filesystem:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Human-readable utilization for all mounted filesystems
df -hT

# Example output, abbreviated for clarity
# Filesystem     Type      Size  Used Avail Use% Mounted on
# /dev/sda1      ext4      100G   62G   33G  66% /
# /dev/sdb1      ext4       50G   47G  1.1G  98% /var/lib/mysql`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The abbreviated output shows the database volume sitting at 98 percent utilization,
              which is exactly the kind of condition that should reach an operator before the next
              transaction log write fails. A full database volume is worse than a slow query; the
              database process stops writing entirely, and recovery after cleanup can take longer
              than the original outage itself.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              node_exporter publishes the same values as time series, so Prometheus can evaluate
              them continuously instead of waiting for a manual check. The rule below raises a
              warning when the root volume has less than 15 percent free for ten minutes:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# /etc/prometheus/alert.rules.yml — disk space rule
      - alert: DiskSpaceLow
        expr: (1 - node_filesystem_avail_bytes{mountpoint="/"} /
          node_filesystem_size_bytes{mountpoint="/"}) * 100 \u003c 15
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Disk space below 15% free on {{ $labels.instance }}"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Alerting alone does not reclaim space. Pair the rule with a rotation policy so logs,
              package caches, and application archives cannot fill the volume unnoticed. Journal
              rotation is covered in the FAQ below, and the guide on interpreting system logs
              explains how to read the data these tools preserve:{" "}
              <Link href="/docs/interpreting-system-logs" className="text-primary hover:underline">
                interpreting system logs
              </Link>
              .
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Treat this alert as a leading indicator. When it fires, plan the cleanup before the
              service degrades, rather than reacting after the volume reports 100 percent. A regular
              capacity review, run weekly, turns the alert into a confirmation that the review is
              still current.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Automated Health Checks with systemd Timers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Monitoring systems detect problems, but a small set of services benefits from
              automatic self-healing. A lightweight health check that restarts a failed unit and
              records the event is a practical middle ground between fully manual operation and a
              complex orchestration platform. systemd timers can run such checks with no extra
              software. The script below restarts nginx when it is not active and writes a journal
              entry about the action:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/usr/bin/env bash
# /usr/local/sbin/nginx-health.sh
if ! systemctl is-active --quiet nginx.service; then
  systemctl restart nginx.service
  logger -p daemon.err "nginx.service restarted by automated health check"
fi`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The unit that runs this script every five minutes uses a timer definition in
              /etc/systemd/system/nginx-health.timer:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`[Unit]
Description=Run the nginx health check every five minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
RandomizedDelaySec=30

[Install]
WantedBy=timers.target`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Install the script, reload the unit definitions, and enable the timer with a single
              command sequence:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`sudo install -m 0755 nginx-health.sh /usr/local/sbin/nginx-health.sh
sudo systemctl daemon-reload
sudo systemctl enable --now nginx-health.timer`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Verify the timer is actually armed, because a timer that fails to load is a silent gap
              in coverage:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`systemctl list-timers nginx-health.timer
# NEXT                         LEFT       LAST  PASSED UNIT
# Thu 2026-05-28 09:15:00 UTC  5min left  -     -     nginx-health.timer`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Each restart lands in the system journal with the daemon.err priority, leaving an
              auditable trail. Review that trail with journalctl filtering on the nginx unit to see
              whether the service has been flapping. If it has, the timer is masking an underlying
              fault and should be disabled until the root cause is found. Automated restarts are a
              bridge, not a fix: they keep a service available while a human investigates why it
              keeps failing. If the restart count climbs, raise the issue through the incident
              runbook process described in Section 5 rather than letting the loop run forever.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Troubleshooting Common Access and Monitoring Failures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Two failure modes dominate day-to-day operations: administrators losing SSH access
              after a hardening change, and monitoring targets showing as down even though the
              service responds locally. The flow below resolves the access case first.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Check the daemon state:</strong> Run systemctl status sshd and confirm a
                listening socket exists with ss -tlnp. If the daemon is not running, the connection
                never reaches it.
              </li>
              <li>
                <strong>Validate the configuration:</strong> Run sudo sshd -t. A syntax error is the
                usual reason a restart was rejected, and sshd refuses to start with a broken file.
              </li>
              <li>
                <strong>Review the firewall:</strong> Run sudo ufw status or iptables -L -n and
                confirm the management subnet source rule is present. A firewall change applied at
                the same time as the hardening edit is a common cause of sudden lockout.
              </li>
              <li>
                <strong>Inspect recent attempts:</strong> Run journalctl -u sshd -n 50 to see
                whether connections reach the daemon and why they are refused. A refused connection
                with no journal entries points at the network path rather than the daemon.
              </li>
              <li>
                <strong>Check drop-in overrides:</strong> Diff the main configuration against any
                files in /etc/ssh/sshd_config.d. A drop-in with a conflicting option silently
                overrides the main file, which makes a tested main file behave unexpectedly.
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              The monitoring side follows a similar pattern. When a target shows as down in
              Prometheus, confirm the exporter is listening on the expected port and that it returns
              metrics locally before touching the Prometheus configuration:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Confirm the exporter port is open and serving metrics locally
sudo ss -tlnp | grep 9100
curl -s http://127.0.0.1:9100/metrics | head -n 3

# Validate the scrape configuration syntactically
promtool check config /etc/prometheus/prometheus.yml`}</code>
            </pre>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Confirm the exporter listens:</strong> If ss shows nothing on the target
                port, the exporter crashed or never started; check its unit with journalctl -u
                node_exporter -n 20.
              </li>
              <li>
                <strong>Fetch metrics locally:</strong> A working curl response proves the exporter
                itself is healthy, isolating the problem to the network or to Prometheus.
              </li>
              <li>
                <strong>Validate the scrape job:</strong> Run promtool check config and confirm the
                job name and target address match what Prometheus displays on its targets page.
              </li>
              <li>
                <strong>Check the path between hosts:</strong> Firewall rules on either side, or a
                newly applied security group, can block port 9100 while leaving the application port
                untouched.
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              Work through the two flows in order instead of restarting services blindly. Each step
              eliminates one layer of the stack, and the journal provides the evidence that points
              to the actual cause. When the cause is found, document it in the incident record so
              the next occurrence takes minutes instead of hours.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              10. Capacity Planning for the Monitoring Stack
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A monitoring stack that runs out of disk, memory, or query capacity fails silently:
              scrapes are dropped, history is truncated, and alerts stop evaluating while the
              dashboard still looks healthy. Planning capacity before the stack is under load is
              cheaper than rebuilding it during an incident. Three numbers drive most of the
              calculation: the scrape interval, the number of distinct time series, and the desired
              retention window.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Storage grows roughly with the product of those three values. For example, a fleet of
              fifty nodes scraped every thirty seconds, with each node exposing about two hundred
              metrics, produces roughly ten thousand time series. At a typical compression ratio,
              Prometheus stores on the order of one to two bytes per sample, so fifteen days of
              history for that fleet fits comfortably in a few gigabytes. Doubling the retention
              window or halving the scrape interval doubles the space and write load, which is why
              teams standardize on a documented interval instead of tuning per host.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Check how much space the local TSDB currently uses
du -sh /var/lib/prometheus

# Inspect active series and block sizes
promtool tsdb list /var/lib/prometheus`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Memory follows a different curve. Prometheus keeps recently ingested samples in memory
              before they are flushed to disk, and large queries materialize intermediate results.
              Watch the process resident set over a typical week and size the host for the observed
              peak plus headroom, rather than for the idle baseline. Alertmanager and the web
              interface add their own modest footprint, which rarely matters on modern hardware.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Set a retention policy explicitly so the daemon can reclaim space instead of failing
              when the volume fills. The flags below cap history at fifteen days and are applied at
              service start:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# /etc/default/prometheus
ARGS="--storage.tsdb.retention.time=15d --storage.tsdb.retention.size=10GB"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Document the interval, the series estimate, and the retention window in the runbook so
              a future operator can recompute the numbers when the fleet grows. Revisit the plan
              quarterly; series cardinality grows with every new label added to a job, and an
              unbounded label value such as a random identifier can multiply the series count by
              orders of magnitude overnight.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              11. Backup and Recovery of Monitoring Configuration
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The monitoring stack has two kinds of state: configuration and data. Configuration is
              small, valuable, and easy to back up; metric history is large and can usually be
              rebuilt from scratch. A backup policy should therefore treat the two differently and
              make configuration recovery a matter of minutes rather than a re-engineering project.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every file that defines behavior belongs in the backup set: prometheus.yml, the alert
              rule files, Alertmanager configuration, the systemd unit overrides that set retention,
              and any dashboard JSON exported from the UI. Store them in version control if
              possible, because version control gives you history and diffing for free. A minimal
              archive that covers the essentials can be produced with a single command:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Archive every configuration file that defines the stack
sudo tar czf /var/backups/prometheus-config-$(date +%F).tar.gz \
  /etc/prometheus /etc/alertmanager /etc/systemd/system/prometheus.service.d`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Test the restore path, not just the archive. Untar the archive on a scratch host,
              point a temporary Prometheus instance at it, and confirm promtool check config passes
              and the targets page populates. An archive that has never been restored is a guess,
              and discovering the guess is wrong during an outage doubles the downtime.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Metric data itself is lower priority: after a full loss, scrapes repopulate the time
              series within one interval and historical graphs are the only casualty. If a
              compliance requirement forces data backup, snapshot the volume with a filesystem-level
              snapshot tool or use the remote write feature to a separate storage endpoint. The
              journald timeline has the same property, so ensure the journal is persistent across
              reboots to keep the audit trail that this article relies on:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# /etc/systemd/journald.conf
[Journal]
Storage=persistent`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Schedule the backup nightly and verify the newest archive exists with a simple check
              in the same cron or timer unit that creates it. Pair this with the storage and backup
              guidance in the docs library, which covers filesystem-level strategies in more depth:{" "}
              <Link href="/docs/storage-backup-dr" className="text-primary hover:underline">
                storage, backup, and disaster recovery
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">12. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                Should password authentication be disabled on every server at once?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Roll the change out in batches and validate each batch with sudo sshd -t before
                restarting. Keep an active session open on the host while the daemon restarts so a
                configuration mistake does not strand you. If you do lose access, use the
                out-of-band console provided by your hosting provider to recover rather than
                weakening the security baseline.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between journald and traditional syslog files?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                journald stores structured metadata for every entry, including the originating unit,
                priority, process identifier, and timestamps, which makes filtering fast and
                precise. Traditional syslog is plain text that requires parsing conventions. Both
                can coexist, but the structured fields in journald are what make the journalctl
                filters used throughout this article possible.
              </p>
              <h3 className="text-lg font-bold">
                Why does an alert keep firing after the service has recovered?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Prometheus evaluates rules on a fixed interval, and the for clause in a rule
                requires the condition to hold for the full duration before it fires. If recovery
                happens between evaluations, the alert can stay pending or firing longer than
                expected. Check the rule evaluation interval in prometheus.yml and the repeat
                interval in the Alertmanager configuration, and verify that the recovered metric has
                actually returned to a healthy value on the expression browser.
              </p>
              <h3 className="text-lg font-bold">
                How do I stop the journal from consuming the entire disk?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Set a hard cap in /etc/systemd/journald.conf with the SystemMaxUse directive, for
                example 500M, then restart journald with sudo systemctl restart systemd-journald.
                journald reclaims space automatically once the cap is reached, which prevents the
                log volume from filling silently. Choose a size that gives you enough history for
                your audit requirements.
              </p>
              <h3 className="text-lg font-bold">
                Can I monitor disk space without installing node_exporter on every host?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                node_exporter is the standard approach and is lightweight, so installing it is
                normally the right call. For hosts where an agent is not possible, a scheduled job
                can push custom metrics to a textfile collector or to the pushgateway, but this adds
                moving parts. Prefer node_exporter everywhere and reserve workarounds for genuinely
                constrained environments.
              </p>
              <h3 className="text-lg font-bold">
                Is it safe to restart sshd while connected over SSH?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, with systemd. Restarting the sshd service does not terminate established
                sessions, so your current connection survives. Always run sudo sshd -t first, and do
                not test an unvalidated configuration on a host you can only reach over the network.
              </p>
              <h3 className="text-lg font-bold">
                How can I test a new alert rule without causing a real incident?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Validate the rule syntax with promtool check rules, then lower the threshold
                temporarily in a test environment to confirm the alert fires and routes correctly.
                Restore the intended threshold afterward. During planned maintenance, create a
                silence in Alertmanager so routine changes do not trigger notifications.
              </p>
              <h3 className="text-lg font-bold">
                Should automated health checks restart a service without limit?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No. A service that restarts repeatedly is masking a real fault, and every restart
                adds recovery load and can interrupt an in-progress transaction. Add a counter or a
                maximum restart threshold, and escalate through the incident runbook process in
                Section 5 once the threshold is crossed so a human investigates the underlying
                cause. See the{" "}
                <Link href="/docs/incident-runbook" className="text-primary hover:underline">
                  incident runbook template
                </Link>{" "}
                for the escalation structure.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              13. Practical example: a monitoring stack on a modest host
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Not every environment needs a large cluster. A small team operating a single-node
              warehouse and a dozen client web services ran Prometheus, Alertmanager, and Grafana on
              one refurbished server with 16GB of RAM. Scraping thirty targets every sixty seconds
              produced only a few thousand time series, which the stack handled without strain. The
              lesson from that setup was not about scale but about discipline: every alert added to
              the rules file had to have a documented owner, a tested first action, and a way to
              verify the fix, or it was rejected in review.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A single modest scrape target list covered the whole fleet, and the extra targets
              simply became one more host entry when a client added a server:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Excerpt of /etc/prometheus/prometheus.yml on the small host
scrape_configs:
  - job_name: "nodes"
    static_configs:
      - targets:
          - node01:9100
          - node02:9100
          - node03:9100
    scrape_interval: 60s`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The team kept a two-page runbook of alert actions and, after the first month, measured
              that fewer than ten percent of alerts required a human to improvise a fix. The
              practical outcome was that alert fatigue fell because every page had a known first
              step, and the mean time to acknowledge an alert dropped by more than half. This is the
              payoff of pairing monitoring with the incident structure described in this article: an
              alert that arrives with an expected response is handled quickly, while an alert that
              asks the operator to invent a plan is postponed or ignored.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Before scaling the stack out, run the capacity checks from Section 10 on the modest
              host itself. A host that sustains its scrape load with headroom to spare is the
              confirmation that a bigger deployment is not yet justified, which saves money and
              complexity until the fleet genuinely outgrows it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              14. Routing alerts, reducing noise, and reviewing capacity
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Collecting alerts is only half of monitoring; routing them to the right person without
              flooding them is the other half. Alertmanager groups related notifications so that a
              single condition does not page a team dozens of times as each instance crosses a
              threshold. Group by the alert name, wait briefly to collect stragglers, and send the
              batch to the appropriate receiver:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# /etc/alertmanager/alertmanager.yml (excerpt)
route:
  group_by: ["alertname"]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: ops-channel
receivers:
  - name: ops-channel
    webhook_configs:
      - url: "http://127.0.0.1:9000/hooks/ops"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The repeat interval controls how often an unacknowledged alert re-pages, and it should
              be set to match how long you are willing to let a real problem sit unattended. A short
              repeat interval on a routine warning produces noise that trains operators to mute the
              channel, while a long interval on a critical alert can hide a problem that needs
              urgent attention. Match the interval to the severity the alert describes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Review the alert set quarterly alongside the capacity plan. Alerts that have not fired
              in six months are candidates for removal, and alerts that fire constantly are
              candidates for a higher threshold or a separate action. An alert that never requires
              action is noise, and an alert that always fires without a follow-up is either
              misconfigured or describing a problem that was never fixed. Revisit the alert rules
              with the same discipline used for the runbook so the monitoring stack stays an
              early-warning system rather than a persistent distraction. For the network layer
              behind these checks, see the{" "}
              <Link href="/docs/network-troubleshooting" className="text-primary hover:underline">
                network troubleshooting guide
              </Link>
              , and for keeping the volume from filling before the disk alert fires, review the{" "}
              <Link href="/docs/disk-health" className="text-primary hover:underline">
                disk health guide
              </Link>
              .
            </p>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </article>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
