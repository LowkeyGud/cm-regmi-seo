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
    datePublished: "2026-05-24",
    dateModified: "2026-05-27",
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
              By <strong>CM Regmi</strong> • Published May 26, 2026 • Updated May 27, 2026
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
        expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100 < 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Host out of memory on {{ $labels.instance }}"
          description: "Node memory is critical (< 10% available)."

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

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </article>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="infra-admin-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
