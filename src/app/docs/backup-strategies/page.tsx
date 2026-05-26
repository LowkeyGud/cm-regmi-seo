import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Backup Strategies | CM Regmi Docs",
  description: "Practical backup strategies: local, cloud, incremental, full, and verification.",
  alternates: { canonical: `${SITE_URL}/docs/backup-strategies` },
};

export default function BackupStrategies() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/backup-strategies#article`,
    headline: "Backup Strategies",
    description: "Practical backup strategies: local, cloud, incremental, full, and verification.",
    url: `${SITE_URL}/docs/backup-strategies`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="backup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Backup Strategies</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          A reliable backup strategy is defined by frequency, redundancy, and verifiability. Build a
          plan that matches how much data you can afford to lose and how quickly you need to
          recover.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Core concepts</h2>
          <p className="text-muted-foreground">
            Three practical dimensions matter: how often you capture changes (frequency), how many
            independent copies you keep (redundancy), and whether you can prove the data can be
            restored (verifiability). Together those dimensions define whether a backup is useful
            under pressure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Local + Offsite (why both matter)</h2>
          <p className="text-muted-foreground">
            Local copies give you fast restores; offsite copies protect against theft, fire, or a
            bad software update that corrupts every attached disk. A simple mix is hourly local
            snapshots plus a daily or weekly offsite sync depending on bandwidth and cost.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Incremental + Periodic full backups</h2>
          <p className="text-muted-foreground">
            Incremental backups are efficient because they store only changes. Periodic fulls keep
            the restore window practical. A common pattern: weekly full, daily incremental, hourly
            local snapshots for critical systems.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Tool examples (safe, open-source)</h2>
          <p className="text-muted-foreground">
            Two practical command-line examples you can adapt:
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Restic (simplified)
restic init --repo s3:s3.amazonaws.com/mybucket/restic
RESTIC_PASSWORD='strongpw' restic -r s3:s3.amazonaws.com/mybucket/restic backup /home/username
RESTIC_PASSWORD='strongpw' restic -r s3:s3.amazonaws.com/mybucket/restic snapshots

# Borg (local deduplicated backup)
borg init --encryption=repokey /mnt/backup/borgrepo
borg create /mnt/backup/borgrepo::home-$(date +%F) /home/username
borg prune -v --list /mnt/backup/borgrepo --keep-daily=7 --keep-weekly=4 --keep-monthly=6`}</code>
          </pre>
          <p className="text-muted-foreground">
            These snippets demonstrate initialization, a backup run, sequence listing, and pruning.
            Choose a tool that matches your trust model and operational cadence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Verification: the most neglected step</h2>
          <p className="text-muted-foreground">
            Always test restores. A verified backup is one you have restored at least once. For
            automated verification, compare checksums or keep a small daily test restore job that
            extracts and validates a known sample file.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Verify by checksum example (posix)
sha256sum important-file > important-file.sha256
# after restore
sha256sum -c important-file.sha256`}</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Retention policy: practical guidance</h2>
          <p className="text-muted-foreground">
            Set retention by risk profile: shorter for disposable VMs, longer for business data.
            Example policy: keep hourly snapshots for 48 hours, daily for 30 days, weekly for 6
            months, monthly for 2 years. Implement pruning to keep storage under control.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Common failure modes and fixes</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Backups that run but are never restored — fix by scheduling regular test restores.
            </li>
            <li>
              Single-target backups — add a second media type to avoid shared points of failure.
            </li>
            <li>Silent corruption — add integrity checksums and longer retention windows.</li>
            <li>Missing alerts — wire a simple notification when backups fail (email/Slack).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Case study: a save that cost less than replacement
          </h2>
          <p className="text-muted-foreground">
            In one incident, a developer accidentally deleted a project branch and then pushed a
            destructive cleaning job to a shared disk. Because hourly snapshots were retained for 48
            hours and the offsite daily backup was intact, we restored the repository tree within
            two hours with minimal data loss. The cost of the extra snapshot storage was far less
            than the time lost trying to reconstruct history manually.
          </p>
          <p className="text-muted-foreground">
            That outcome was only possible because verification and documented restore procedures
            were part of the plan beforehand.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Restore checklist</h2>
          <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
            <li>Pick a small, representative file or folder to restore for the test.</li>
            <li>Restore it to a clean destination and confirm the file opens correctly.</li>
            <li>Confirm hashes or timestamps match the original if available.</li>
            <li>Note time to restore and iterate on process to reduce RTO where needed.</li>
          </ol>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold">
            Cloud considerations: encryption, region, and cost
          </h2>
          <p className="text-muted-foreground">
            When using cloud storage, think about encryption at rest and in transit, the region
            where data is stored, and egress costs when restoring. Use client-side encryption (e.g.,
            restic or borg with encrypted repositories) if you do not want plaintext data on the
            provider. Also model the worst-case restore egress cost when estimating recovery
            budgets.
          </p>

          <h3 className="text-sm font-semibold">Example: restic with S3-compatible backend</h3>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# configure environment (do not commit these values)
export RESTIC_REPOSITORY=s3:s3.amazonaws.com/mybucket/restic
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export RESTIC_PASSWORD='veryStrongPassword'

# run a backup
restic -r $RESTIC_REPOSITORY backup /data`}</code>
          </pre>

          <h2 className="text-xl font-semibold">Automation and scheduling</h2>
          <p className="text-muted-foreground">
            For servers, use systemd timers or cron jobs with careful logging. For desktops, use an
            unattended client or snapshot tool. Keep logs centrally and alert when jobs fail.
          </p>

          <h3 className="text-sm font-semibold">Sample systemd service + timer (restic)</h3>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# /etc/systemd/system/restic-backup.service
[Unit]
Description=Run restic backup

[Service]
Type=oneshot
Environment=RESTIC_REPOSITORY=s3:s3.amazonaws.com/mybucket/restic
Environment=RESTIC_PASSWORD_FILE=/etc/restic-password
ExecStart=/usr/bin/restic -r $RESTIC_REPOSITORY backup /data

# /etc/systemd/system/restic-backup.timer
[Unit]
Description=Daily restic backup

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target`}</code>
          </pre>

          <h2 className="text-xl font-semibold">Monitoring and alerting</h2>
          <p className="text-muted-foreground">
            Forward backup logs to your central log system and alert on failure counts. A simple
            webhook approach can notify a Slack channel or email when a job returns a non-zero exit
            status.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# minimal webhook post example (bash)
if ! restic -r $RESTIC_REPOSITORY backup /data; then
  curl -X POST -H 'Content-type: application/json' --data '{"text":"Backup failed on host X"}' $WEBHOOK_URL
fi`}</code>
          </pre>

          <h2 className="text-xl font-semibold">Compliance and legal retention</h2>
          <p className="text-muted-foreground">
            If you operate in regulated industries, be explicit about retention and deletion.
            Document where copies are stored, who can access keys, and how long backups are
            authoritative. Automate key rotations and keep restore procedures in an incident
            runbook.
          </p>

          <h2 className="text-xl font-semibold">Final practical checklist</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Automate backups and keep human-readable logs.</li>
            <li>Verify restores regularly and record time-to-restore metrics.</li>
            <li>Keep at least one offsite encrypted copy and test access to it periodically.</li>
            <li>
              Document the exact restore steps and ensure at least two people can perform them.
            </li>
          </ul>

          <section className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold">Deep dive: implementation recipes</h2>
            <p className="text-muted-foreground">
              Below are pragmatic recipes I use when standing up backups for small teams or
              individual engineers. They are intentionally explicit: configuration, scheduling,
              verification, and a simple runbook entry that can be pasted into an incident playbook.
            </p>

            <p className="text-muted-foreground">
              Recipe 1: Single-server snapshot + offsite restic. Configure periodic LVM or ZFS
              snapshots for immediate rollbacks. Mount a temporary snapshot and stream it to restic
              for offsite retention. This gives the ability to restore a point-in-time copy quickly
              while also ensuring long-term durability in a remote bucket.
            </p>

            <p className="text-muted-foreground">
              Recipe 2: Desktop backups for non-technical users. Use a GUI client that supports
              scheduled backups to an external drive plus a cloud sync for important folders such as
              Documents and Pictures. Provide a one-click restore instruction and test it with a
              non-critical file so the user gains confidence in the process.
            </p>

            <p className="text-muted-foreground">
              Recipe 3: Database-aware backups. For transactional databases, combine logical dumps
              (mysqldump, pg_dump) with physical snapshot backups. Ensure dumps are consistent by
              using point-in-time recovery tools or by pausing writes briefly during the snapshot
              phase when required by the application.
            </p>

            <p className="text-muted-foreground">
              For all recipes, the critical final step is verification. A restore test should be
              part of the initial rollout and then scheduled. A 10-minute test restore to a
              disposable host once a month catches configuration drift earlier than users notice a
              problem.
            </p>

            <p className="text-muted-foreground">
              Security note: do not store secrets in plaintext alongside backups. Use a repository
              encryption mechanism or a separate secret manager. Rotate any encryption credentials
              on a schedule that balances operational overhead with security needs.
            </p>

            <p className="text-muted-foreground">
              Operational responsibilities: assign an owner and a secondary for the backup systems.
              Document the restore owner in the runbook and the escalation path. The restore owner
              must be able to run the documented steps within the RTO window and verify the data.
            </p>

            <p className="text-muted-foreground">
              Cost modelling: estimate peak restore egress and the storage required for your
              retention policy. Run a dry-run restore at least once and record the network and time
              cost. Those numbers help stakeholders decide between cheaper cold storage and more
              expensive hot storage for critical datasets.
            </p>

            <p className="text-muted-foreground">
              Automation hygiene: keep backup code in source control and review it as part of change
              management. Small configuration errors are common and code review reduces the chance
              of silent failures. Use CI to lint or sanity-check backup job definitions when
              possible.
            </p>

            <p className="text-muted-foreground">
              Troubleshooting quick hits: check clock skew between systems, validate credentials,
              and verify the network path to offsite storage. Most failures are environmental issues
              that manifest as transient errors; retries with exponential backoff and clear alerting
              make operations resilient.
            </p>

            <p className="text-muted-foreground">
              Documentation: a concise runbook should include the restore owner, exact commands for
              a test restore, the location of any keys, and a clear 'do not escalate' threshold.
              Keep the runbook near your monitoring so responders can act immediately when a backup
              alarm triggers.
            </p>

            <p className="text-muted-foreground">
              Implementing these recipes will raise the chance that a destructive event remains a
              recoverable incident rather than a business catastrophe. The value of backups is not
              the technology itself but the confidence they provide when a mistake inevitably
              happens.
            </p>

            <div className="mt-6">
              <Link href="/docs" className="text-primary hover:underline">
                Back to Docs Hub
              </Link>
            </div>
          </section>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="backup-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
