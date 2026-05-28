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
  title: "Enterprise Storage, Backup & Disaster Recovery Playbook | CM Regmi Docs",
  description: "Comprehensive 3-2-1 backup strategies, Borg/Restic recipes, systemd timers, automated integrity verification, log-rotation policies, and SMART disk diagnostics.",
  alternates: {
    canonical: `${SITE_URL}/docs/storage-backup-dr`,
  },
};

export default function StorageBackupDRPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/storage-backup-dr#article`,
    headline: "Enterprise Storage, Backup & Disaster Recovery Playbook",
    description: "Deep-dive playbook for systems storage, backups, and disaster recovery.",
    url: `${SITE_URL}/docs/storage-backup-dr`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-27",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="storage-backup-schema"
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
                <BreadcrumbPage>Storage, Backup & DR Playbook</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Data Infrastructure
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Enterprise Storage, Backup & Disaster Recovery Playbook
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 26, 2026 • Updated May 27, 2026
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Storage reliability and backup integrity are the ultimate lines of defense in system operations. 
              A storage failure can happen at any time; your recovery metrics are determined by frequency, 
              redundancy, and verified automation. This playbook details enterprise-grade backup structures, 
              disk metrics, and disaster recovery playbooks.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Enforcing the 3-2-1 Backup Strategy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The 3-2-1 backup strategy is the foundational baseline for data protection: keep at least three (3) copies of 
              your data, store them across two (2) different media types, and ensure at least one (1) copy is kept in an offsite, 
              independent region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For critical enterprise database nodes, local copies enable near-instantaneous restores, minimizing the recovery time 
              objective (RTO). The offsite copies provide protection against site disasters, theft, or catastrophic software bugs 
              that corrupt all locally attached volumes.
            </p>

            <h3 className="text-lg font-bold">Safe Local & Remote Backup Recipes</h3>
            <p className="text-muted-foreground leading-relaxed">
              Using Restic, a fast, secure, open-source backup tool, administrators can implement encrypted, deduplicated, 
              and incremental backup runs. Below is an authentic recipe to initiate an encrypted Restic repository hosted on 
              AWS S3 or a local target:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Configure the backup destination variables
export RESTIC_REPOSITORY="s3:s3.amazonaws.com/enterprise-backup-bucket/node01"
export RESTIC_PASSWORD="veryStrongPasswordCryptKey"
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

# Initialize the secure repository (run once)
restic init

# Execute an encrypted, deduplicated backup of server data
restic backup /var/www /var/log /etc

# List existing point-in-time snapshots in the repository
restic snapshots`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              To keep storage footprints within operational bounds, define a strict retention and pruning policy. Pruning strips 
              old snapshots based on defined cadences:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Keep the last 7 daily, 4 weekly, and 12 monthly snapshots, pruning the rest
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 12 --prune`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Automating Backup Timers with Systemd</h2>
            <p className="text-muted-foreground leading-relaxed">
              Manual backups fail when operators are occupied. Automating scripts via systemd timers ensures robust cron execution 
              monitoring, detailed journaling, and instant notification alerts on process failures.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Create a dedicated service file paired with a calendar timer to execute daily backups at a scheduled time:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# File: /etc/systemd/system/restic-backup.service
[Unit]
Description=Enterprise Restic Backup Service
After=network-online.target

[Service]
Type=oneshot
EnvironmentFile=/etc/restic-credentials.env
ExecStart=/usr/bin/restic backup /var/data
ExecStartPost=/usr/bin/restic forget --keep-daily 7 --prune

# File: /etc/systemd/system/restic-backup.timer
[Unit]
Description=Daily Restic Backup Timer

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. Disk Health Diagnostics & SMART Monitoring</h2>
            <p className="text-muted-foreground leading-relaxed">
              Disaster recovery planning begins before disks fail. Modern solid-state drives (SSD) and hard drives (HDD) report 
              predictive failure signals via Self-Monitoring, Analysis and Reporting Technology (SMART).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Administrators must monitor critical attributes regularly. The script below schedules offline self-tests and inspects 
              reallocated sector counts:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query current health assessment from disk controller
smartctl -H /dev/sda

# Execute an immediate short background diagnostics test
smartctl -t short /dev/sda

# Query full attributes table, checking raw values for:
# - Reallocated_Sector_Ct (reallocating indicates physical platter wear)
# - Current_Pending_Sector (sectors waiting to be reallocated)
smartctl -A /dev/sda`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Log Rotation & Disk Space Optimization Policies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Uncontrolled log growth can fill the root filesystem, causing immediate system-wide failures. Implement robust log 
              rotation policies to compress old logs and purge expired archives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Use `logrotate` configurations to automate this behavior:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# File: /etc/logrotate.d/nginx
/var/log/nginx/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        systemctl reload nginx > /dev/null 2>&1
    endscript
}`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Case Study: Rapid Disaster Recovery from Silent Data Corruption</h2>
            <p className="text-muted-foreground leading-relaxed">
              An enterprise file server experienced silent data corruption inside a legacy EXT4 array. A bad RAM module flipped 
              bits during write cycles, corrupting several project database backups.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because the client enforced weekly restore drills and verified backups using SHA256 integrity checks, they quickly 
              identified the data corruption:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Verify file integrity via SHA256 checksums
sha256sum -c backups.sha256
# Result: "backups_2026-05-20.tar.gz: FAILED"

# Run recovery in a isolated environment, restoring the last clean snapshot
restic restore b2a4c1f9 --target /mnt/recovery-volume

# Recalculate checksums to confirm integrity restoration
sha256sum -c /mnt/recovery-volume/backups.sha256
# Result: "backups_2026-05-20.tar.gz: OK"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The restore resolved the issue, and the corrupt RAM module was identified and replaced within three hours, 
              safeguarding operations with zero data loss.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. Verification & Restore Drill Checklist</h2>
            <p className="text-muted-foreground leading-relaxed">
              An unverified backup is a risk. Complete a monthly restore drill to verify your recovery procedures:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Step 1:</strong> Select a random file sample from your encrypted remote Restic backup.
              </li>
              <li>
                <strong>Step 2:</strong> Restore the files to an isolated test directory.
              </li>
              <li>
                <strong>Step 3:</strong> Compare the restored files with original files using cryptographic SHA256 checksums.
              </li>
              <li>
                <strong>Step 4:</strong> Record restore speed metrics to verify RTO and SLA parameters.
              </li>
            </ol>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </article>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">Restore drills, automation & integrity verification</h2>
        <p className="text-muted-foreground leading-relaxed">
          Automate monthly restore drills and integrity checks. A restore drill should be fully scripted:
          select a snapshot, restore to an isolated environment, run SHA256 integrity checks, and validate
          application-level consistency. Record restore times and note any manual steps that slow recovery.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Use Restic's forget and prune features in CI to simulate long-term retention and validate prune
          operations do not remove necessary incremental data. Archive checksums of critical backups and
          verify them during restores to detect silent corruption.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A minimal restore drill checklist: pick a random snapshot, restore to test host, run application
          smoke tests, verify checksums, and log RTO metrics. Automate alerts if RTO exceeds target.
        </p>

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="storage-backup-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
