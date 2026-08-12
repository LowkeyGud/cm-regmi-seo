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
  title: "Enterprise Storage, Backup & Disaster Recovery Playbook | CM Regmi Docs",
  description:
    "Comprehensive 3-2-1 backup strategies, Borg/Restic recipes, systemd timers, automated integrity verification, log-rotation policies, and SMART disk diagnostics.",
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
    datePublished: "2025-05-24",
    dateModified: "2025-05-27",
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
              By <strong>CM Regmi</strong> • Published May 26, 2025 • Updated May 27, 2025
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Storage reliability and backup integrity are the ultimate lines of defense in system
              operations. A storage failure can happen at any time; your recovery metrics are
              determined by frequency, redundancy, and verified automation. This playbook details
              enterprise-grade backup structures, disk metrics, and disaster recovery playbooks.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Enforcing the 3-2-1 Backup Strategy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The 3-2-1 backup strategy is the foundational baseline for data protection: keep at
              least three (3) copies of your data, store them across two (2) different media types,
              and ensure at least one (1) copy is kept in an offsite, independent region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For critical enterprise database nodes, local copies enable near-instantaneous
              restores, minimizing the recovery time objective (RTO). The offsite copies provide
              protection against site disasters, theft, or catastrophic software bugs that corrupt
              all locally attached volumes.
            </p>

            <h3 className="text-lg font-bold">Safe Local & Remote Backup Recipes</h3>
            <p className="text-muted-foreground leading-relaxed">
              Using Restic, a fast, secure, open-source backup tool, administrators can implement
              encrypted, deduplicated, and incremental backup runs. Below is an authentic recipe to
              initiate an encrypted Restic repository hosted on AWS S3 or a local target:
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
              To keep storage footprints within operational bounds, define a strict retention and
              pruning policy. Pruning strips old snapshots based on defined cadences:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Keep the last 7 daily, 4 weekly, and 12 monthly snapshots, pruning the rest
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 12 --prune`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Automating Backup Timers with Systemd
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Manual backups fail when operators are occupied. Automating scripts via systemd timers
              ensures robust cron execution monitoring, detailed journaling, and instant
              notification alerts on process failures.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Create a dedicated service file paired with a calendar timer to execute daily backups
              at a scheduled time:
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
            <h2 className="text-2xl font-bold tracking-tight">
              3. Disk Health Diagnostics & SMART Monitoring
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Disaster recovery planning begins before disks fail. Modern solid-state drives (SSD)
              and hard drives (HDD) report predictive failure signals via Self-Monitoring, Analysis
              and Reporting Technology (SMART).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Administrators must monitor critical attributes regularly and act on trends rather
              than single readings. A one-off high raw value can be a transient, while a value that
              climbs over several weeks reliably predicts failure. The script below schedules
              offline self-tests and inspects reallocated sector counts:
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
            <h2 className="text-2xl font-bold tracking-tight">
              4. Log Rotation & Disk Space Optimization Policies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Uncontrolled log growth can fill the root filesystem, causing immediate system-wide
              failures. Implement robust log rotation policies to compress old logs and purge
              expired archives.
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
            <h2 className="text-2xl font-bold tracking-tight">
              5. Case Study: Rapid Disaster Recovery from Silent Data Corruption
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An enterprise file server experienced silent data corruption inside a legacy EXT4
              array. A bad RAM module flipped bits during write cycles, corrupting several project
              database backups.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because the client enforced weekly restore drills and verified backups using SHA256
              integrity checks, they quickly identified the data corruption:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Verify file integrity via SHA256 checksums
sha256sum -c backups.sha256
# Result: "backups_2024-05-20.tar.gz: FAILED"

# Run recovery in a isolated environment, restoring the last clean snapshot
restic restore b2a4c1f9 --target /mnt/recovery-volume

# Recalculate checksums to confirm integrity restoration
sha256sum -c /mnt/recovery-volume/backups.sha256
# Result: "backups_2024-05-20.tar.gz: OK"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The restore resolved the issue, and the corrupt RAM module was identified and replaced
              within three hours, safeguarding operations with zero data loss.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Verification & Restore Drill Checklist
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An unverified backup is a risk. Complete a monthly restore drill to verify your
              recovery procedures:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Step 1:</strong> Select a random file sample from your encrypted remote
                Restic backup.
              </li>
              <li>
                <strong>Step 2:</strong> Restore the files to an isolated test directory.
              </li>
              <li>
                <strong>Step 3:</strong> Compare the restored files with original files using
                cryptographic SHA256 checksums.
              </li>
              <li>
                <strong>Step 4:</strong> Record restore speed metrics to verify RTO and SLA
                parameters.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Worked example: recovering a home-lab NAS after a drive failure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A home-lab server running a family photo library and two database-backed services
              reported a failing drive. SMART diagnostics had shown a growing reallocated sector
              count for weeks, but the weekly report was skimmed rather than acted on, and the 3TB
              data drive failed during a weekend. Because the setup followed the 3-2-1 rule, three
              copies existed: the primary volume on the NAS, a second copy on an external USB disk,
              and an encrypted offsite Restic repository. The failure was disruptive but not
              catastrophic.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The recovery began by confirming the failing drive was isolated, then mounting the
              replacement volume and restoring the most recent snapshot from the offsite repository.
              Because the restore had been rehearsed during a monthly drill, the commands were
              already written down rather than reconstructed under pressure.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Confirm the failing disk is no longer in the pool
lsblk -f
# Replace the disk, then mount the new volume
sudo mkfs.ext4 /dev/sdb1
sudo mount /dev/sdb1 /mnt/photos

# Restore the latest snapshot from the offsite repository
restic -r s3:s3.amazonaws.com/home-backup/photos restore latest --target /mnt/photos`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The photo library came back within a few hours with zero file loss, and the databases
              were restored from the same snapshot set the same day. The single most valuable step
              was the rehearsed restore: the operator did not have to learn Restic syntax at the
              moment the library was offline. The follow-up was to act on the next SMART warning
              instead of noting it, and to add an alert that fires when reallocated sectors cross a
              threshold. On the heels of that recovery, reading the raw attributes confirmed the
              disk had been failing for months before the outage, so the team also scheduled a
              quarterly report that flags any drive with rising reallocated or pending sector counts
              for replacement, treating an early warning as actionable rather than informational.
              The{" "}
              <Link href="/docs/disk-health" className="text-primary hover:underline">
                disk health guide
              </Link>{" "}
              explains how to build that alert.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Offsite replication and snapshot versioning with Restic
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A local backup protects against a single disk failure, but not against theft, fire, or
              a ransomware event that encrypts every locally attached volume. Offsite replication is
              what makes the third copy in the 3-2-1 rule meaningful. Restic treats each snapshot as
              an immutable point in time, so a version can be listed, diffed, and restored
              independently of the others.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Review the snapshot list before committing to a restore target. The hostname and path
              tags make it possible to tell one backup from another at a glance, which prevents
              restoring the wrong machine's data. A simple listing command turns that review into a
              routine:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# List snapshots with host and path tags for a clear review
restic -r s3:s3.amazonaws.com/home-backup/photos snapshots

# Diff two snapshots to see exactly what changed between them
restic -r s3:s3.amazonaws.com/home-backup/photos diff latest-1 latest-2`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Retention is what keeps the repository from growing without bound. A schedule that
              keeps seven daily, four weekly, and twelve monthly snapshots balances recovery depth
              against storage cost and the recovery time objective for the dataset in question. Run
              the forget and prune steps automatically after every successful backup so the policy
              cannot be skipped by a tired operator. Versioned snapshots also make it safe to
              recover from mistakes made days ago, not just from a hardware failure today: an
              accidentally overwritten file can be pulled from any retained point in time. That is
              the real value of versioning over a single current copy, and it is why retention is
              planned in advance rather than left to the storage budget alone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Automated integrity verification and monitoring alerts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An unverified backup is a gamble. Corruption can creep into any repository over time,
              and it is only discovered when a restore is attempted, which is the worst possible
              moment. Regular integrity checks turn that risk into a routine. Restic provides a
              repository-wide check that verifies that snapshots are readable and internally
              consistent.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Schedule the check on a monthly basis and treat a failure as an incident rather than a
              housekeeping task. A failed integrity check usually means either a corrupted
              repository or a configuration change, and both need investigation before the next
              backup run:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Verify repository integrity (run monthly, read-only)
restic check --read-data

# Verify a single critical backup set against archived checksums
sha256sum -c /etc/backups/backups.sha256

# Raise an alarm when the last snapshot is older than 2 days
find /var/backups -name "*.snap" -mtime +2 | grep -q . && \\
  echo "ALERT: no recent snapshot found" | mail -s "Backup stale" ops`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Wire the check into the same monitoring channel used for service alerts, and page a
              person when it fails. Silent backup failures are far more common than dramatic ones,
              and an alert that sits in a log no one reads provides the same protection as no alert
              at all. Two signals are worth checking on every run: the last snapshot age and the
              exit code of the prune step. A backup that runs on schedule but never finishes is
              indistinguishable from a skipped backup until the moment a restore is actually needed,
              so a single age comparison catches both conditions at once.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              10. Troubleshooting: backup and restore failures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most backup problems fall into a small set of repeatable causes. Work through these
              checks in order so you are not restarting services or re-running backups blindly.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Confirm the repository password is correct and present.</strong>
                <p className="text-sm mt-1">
                  Restic will refuse operations when the password environment variable is missing or
                  wrong. Verify it is loaded in the shell or service environment before suspecting
                  the repository itself.
                </p>
              </li>
              <li>
                <strong>Check disk space on the repository target.</strong>
                <p className="text-sm mt-1">
                  A nearly full volume is the most common reason a backup run suddenly fails. Verify
                  free space on the remote target as well as the local source, because pruning
                  cannot run when the target cannot accept writes.
                </p>
              </li>
              <li>
                <strong>Look at the last successful run's log.</strong>
                <p className="text-sm mt-1">
                  Compare the failing run against the last one that worked. The difference, whether
                  a changed credential, a rotated key, or a new exclude rule, is usually the cause.
                </p>
              </li>
              <li>
                <strong>Verify the restore target is writable.</strong>
                <p className="text-sm mt-1">
                  A restore that fails instantly often points at a read-only mount or a permissions
                  issue on the destination, not a corrupt snapshot. Test writing a file to the
                  target first, and confirm the restored path is mounted at the exact location the
                  application expects before starting any dependent service.
                </p>
              </li>
              <li>
                <strong>Run a repository check before attempting a restore.</strong>
                <p className="text-sm mt-1">
                  If a restore fails mid-way with checksum errors, run restic check to distinguish a
                  corrupted snapshot from a transient network failure. Restoring from a verified
                  snapshot is a different task than repairing one that is corrupt.
                </p>
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              When the cause is found, record it in the backup documentation so the next occurrence
              takes minutes. Combine this with the{" "}
              <Link href="/docs/local-backups" className="text-primary hover:underline">
                local backups guide
              </Link>{" "}
              and the{" "}
              <Link href="/docs/backup-strategies" className="text-primary hover:underline">
                backup strategies overview
              </Link>{" "}
              for the full range of options.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">11. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">How often should I run a restore drill?</h3>
              <p className="text-muted-foreground leading-relaxed">
                At least monthly for critical systems. A restore drill selects a random snapshot,
                restores it to an isolated environment, verifies checksums and application-level
                consistency, and records the elapsed time against your recovery time objective. The
                drill is the only way to know the backup is actually usable.
              </p>
              <h3 className="text-lg font-bold">
                Why does my Restic backup keep growing even with pruning?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Pruning is a separate pass from backup, and many setups run forget without the prune
                flag. Add the prune flag to the same command, verify the retention policy matches
                your storage budget, and confirm the target volume has enough free space for the
                prune to complete.
              </p>
              <h3 className="text-lg font-bold">
                Should I encrypt backups before sending them offsite?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes. An unencrypted offsite copy is a data breach waiting to happen if the storage
                provider or an intermediary is compromised. Restic encrypts by default, but if you
                use a raw object store directly, encrypt the files before upload and protect the
                key.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between a backup and a replication copy?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A backup is a point-in-time snapshot you can restore, designed to survive deletion
                or corruption. A replication copy is a live or near-live copy used for failover and
                availability. They serve different purposes, and most environments need both:
                backups for recovery, replication for continuity.
              </p>
              <h3 className="text-lg font-bold">
                How do I stop logs from filling the volume before a backup runs?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Apply a rotation policy with compression and a size cap so logs cannot consume the
                entire filesystem. Review the{" "}
                <Link href="/docs/log-rotation" className="text-primary hover:underline">
                  log rotation guide
                </Link>{" "}
                for a configuration that balances retention against available space.
              </p>
              <h3 className="text-lg font-bold">
                Is a failed integrity check always a sign of corruption?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Not always. A failed check can also follow a credential rotation, a moved
                repository, or a version change in the backup tool itself. Read the exact error,
                compare it with the last successful run, and verify the repository path and password
                before assuming the data is corrupt.
              </p>
              <h3 className="text-lg font-bold">
                How do I choose between snapshots and a traditional backup?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Snapshots are fast and cheap for recovery from recent changes, but they typically
                share the same storage and fail with it. Use snapshots for speed and a real backup
                for protection against site-level loss. The{" "}
                <Link
                  href="/docs/infrastructure-admin-monitoring"
                  className="text-primary hover:underline"
                >
                  infrastructure monitoring guide
                </Link>{" "}
                pairs this with the alerting needed to catch a full volume before it happens.
              </p>
              <h3 className="text-lg font-bold">
                Can I recover a single file without restoring the whole snapshot?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes. Restic can restore a single path or apply a filter instead of pulling the
                entire snapshot, which makes recovering one accidentally deleted file fast and
                low-risk. This is also the cheapest possible drill: restoring one file weekly
                exercises the same restore path as a full recovery and keeps the credentials and
                syntax fresh between monthly full drills.
              </p>
              <h3 className="text-lg font-bold">When is a backup encrypted but still not safe?</h3>
              <p className="text-muted-foreground leading-relaxed">
                When the encryption key is stored on the same machine as the data. A compromise that
                can read the key effectively decrypts the backups. Keep the repository password in a
                separate secret store or operator vault, and rotate it on a schedule, so that a
                single machine compromise does not grant access to every offsite copy at once.
              </p>
            </div>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </article>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">
          Restore drills, automation & integrity verification
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Automate monthly restore drills and integrity checks. A restore drill should be fully
          scripted: select a snapshot, restore to an isolated environment, run SHA256 integrity
          checks, and validate application-level consistency. Record restore times and note any
          manual steps that slow recovery.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Use Restic's forget and prune features in CI to simulate long-term retention and validate
          prune operations do not remove necessary incremental data. Archive checksums of critical
          backups and verify them during restores to detect silent corruption.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A minimal restore drill checklist: pick a random snapshot, restore to test host, run
          application smoke tests, verify checksums, and log RTO metrics. Automate alerts if RTO
          exceeds target.
        </p>

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
