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
  title: "Backup Strategies & Data Protection Playbook | CM Regmi Docs",
  description:
    "A structured playbook for full, incremental, and differential backups, scheduling, retention, encryption, and verification so recovery actually works.",
  alternates: { canonical: `${SITE_URL}/docs/backup-strategies` },
  openGraph: {
    title: "Backup Strategies & Data Protection Playbook | CM Regmi Docs",
    description:
      "A structured playbook for full, incremental, and differential backups, scheduling, retention, encryption, and verification so recovery actually works.",
    url: `${SITE_URL}/docs/backup-strategies`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backup Strategies & Data Protection Playbook | CM Regmi Docs",
    description:
      "A structured playbook for full, incremental, and differential backups, scheduling, retention, encryption, and verification so recovery actually works.",
  },
  robots: { index: true, follow: true },
};

export default function BackupStrategiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/backup-strategies#article`,
    headline: "Backup Strategies & Data Protection Playbook",
    description:
      "A structured playbook for full, incremental, and differential backups, scheduling, retention, encryption, and verification so recovery actually works.",
    url: `${SITE_URL}/docs/backup-strategies`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="backup-strategies-schema"
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
                <BreadcrumbPage>Backup Strategies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Data Protection
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Backup Strategies &amp; Data Protection Playbook
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A backup you have never restored is not a backup, it is a hope. This playbook walks
              through full, incremental, and differential backups, how to schedule them, how long to
              keep them, how to encrypt them, and how to verify that recovery actually works when it
              counts.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Backups Exist to Be Restored</h2>
            <p className="text-muted-foreground leading-relaxed">
              It is easy to think of a backup as the act of copying data somewhere else. In reality
              the copy only matters if a specific, time-bounded restore works. Every decision in
              this playbook — the backup type, the schedule, the retention window, the encryption,
              the tooling — exists to answer a single question: can I get a known-good dataset back
              to a known-good moment, quickly and completely?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That reframing changes priorities immediately. Storage capacity and run speed become
              secondary. Mediums are chosen for their read reliability. Schedules are chosen to
              match the maximum amount of work you can afford to lose. Retention is chosen to cover
              realistic recovery windows, not to hoard forever. The result is a smaller, faster, and
              more honest system than the &quot;copy everything every night forever&quot; approach.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The details of a recovery design — disk images, bare-metal rebuilds, off-site copies,
              and disaster pacing — are covered at length in the{" "}
              <Link href="/docs/storage-backup-dr">storage, backup, and DR page</Link>. Start there
              for the topology and return here for the day-to-day decision rules.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Full Backups: The Foundation</h2>
            <p className="text-muted-foreground leading-relaxed">
              A full backup captures an entire dataset or system in one pass. It is the simplest to
              understand and the simplest to restore — point the recovery tool at the medium and go
              — but it is also the most expensive in time and storage because every run copies
              everything, even data that has not changed since the last run.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On a small home-lab or a stand-alone workstation, weekly full backups are a sane
              default. On a large fleet they are typically taken less often, maybe weekly for
              critical systems, and supported by incremental runs in between. The full backup is the
              anchor that makes the smaller layers restore-able, so it must be scheduled, monitored,
              and verified as rigorously as anything else.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# A plain full backup of a directory with tar
tar -cvzf /mnt/backup/full_$(date +%F).tar.gz /srv/data`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The key discipline is that a full backup on its own restores a complete state. Because
              it does not depend on a chain of prior runs, it is also the resilient option: even if
              intermediate backups are lost or corrupted, the most recent full run still brings you
              back to its point in time. For that reason many administrators keep at least one older
              full backup as a trusted fallback in addition to their latest one.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Incremental vs. Differential Backups
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To avoid copying everything nightly, administrators layer smaller backups on top of a
              full anchor. The two main options differ in how they track what changed, and that
              difference drives both storage cost and restore time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              An incremental backup copies only the data changed since the previous backup of any
              kind. That keeps each run tiny and storage efficient, but restore time grows because
              recovery must replay <em>every</em> incremental since the last full in order — if one
              is corrupted or missing, the whole chain is broken. A differential backup copies only
              data changed since the last full backup. Each run is somewhat larger than its
              incremental cousin, but restore needs only two pieces: the last full plus the latest
              differential. The trade-off is storage space now versus restore speed and reliability
              later.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A common rule of thumb: use incrementals when bandwidth and storage are tight and
              restores are infrequent, and use differentials when recovery speed and chain
              resilience matter more. Many operations run a weekly full, then daily differentials,
              and accept storage growth in exchange for a restore that touches only two mediums.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Daily incremental relative to last full (rsync --link-dest)
# hard-links unchanged files so each daily mount looks complete
rsync -a --link-dest=/backup/full_2026-05-21 /srv/data /backup/inc_$(date +%F)`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              This rsync pattern is a favorite on practical systems because every incremental
              directory looks like a full backup (unchanged files are hard-linked to the previous
              tree), which makes recovery trivially copy-and-go while still saving enormous space.
              The same mental model — one full anchor plus smaller layers — applies to almost every
              backup tool you will encounter.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Scheduling Backups That Match Risk
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The right schedule is whatever keeps your worst-case data loss inside an acceptable
              window. Define that window first as your Recovery Point Objective (RPO): the maximum
              age of data you are willing to lose. If losing an hour of work is painful, your backup
              cadence must be at least hourly. If losing a day is fine, nightly is enough.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Anchor full backups to quiet hours so they do not compete with active workloads. Layer
              incrementals or differentials in between, and spread them so the medium is not hit by
              a single enormous burst. For a typical home-lab the practical start is a weekly full
              plus daily incrementals or differentials. For anything handling financial,
              family-photo, or business data, add an hourly incremental during the workday and guard
              the whole thing with monitoring.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Scheduling is also where silent failures hide. A cron entry that never fires, or a job
              that starts and fails at the same step every night, looks healthy until you need it.
              Put every backup run behind alerting — success and failure both — so a broken schedule
              announces itself instead of accumulating quietly. If you run many services, the
              central approach on the{" "}
              <Link href="/docs/infrastructure-admin-monitoring">
                administration and monitoring page
              </Link>{" "}
              will catch a stalled job long before you depend on it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Retention: How Long to Keep Backups
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Retention answers two questions: how far back you must go to recover, and how much
              storage you are willing to allocate. Longer retention protects against late-discovered
              corruption and ransomware, but costs space and complicates the backup set. Shorter
              retention is cheaper but shrinks the window in which a problem can be noticed and
              fixed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A widely used pattern is tiered retention: keep recent backups densely — for example
              hourly incrementals for one day, daily for a week or a month, weekly for a quarter,
              and monthly for the year. This gives you fast rollback for recent mistakes while still
              allowing recovery to an older baseline if something was discovered late. The numbers
              should be chosen from your actual recovery needs, not a fixed template.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Tiered retention with logrotate daily/weekly/monthly
daily  2
weekly 8
monthly 12      # keep 2 dailies, 8 weeklies, 12 monthlies
rotate 30
create 0640 root root`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Whatever tiers you choose, automation must enforce them. Hand-deleted backups drift
              out of the window silently and defeat the entire design. Retention is a lifecycle, and
              like an expired log it should be pruned by the same scheduled discipline every other
              part of the routine follows, so the rules stay predictable and cheap to reason about.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Encrypting Backups at Rest and in Transit
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Backups are a concentrated copy of everything sensitive you have, so they deserve at
              least as much protection as the live data. Two problems appear repeatedly: the backup
              medium is left plain on a removable drive, and transfer to an off-site location runs
              over an unencrypted channel. Both are avoidable with standard tooling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Encrypt your backups before they ever leave the machine. That way a stolen drive, a
              leaked cloud bucket, or a copied file yields nothing without the key. Use a properly
              managed passphrase and keep the key separate from the backup medium — a key stored
              next to the drive it unlocks is nearly no protection at all. For transfer, wrap the
              channel itself, ideally using SSH or a public-key scheme so the credentials can be
              rotated without retyping the data.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Encrypt a backup file then push it over SSH
gpg --symmetric --cipher-algo AES256 backup.tar.gz
scp backup.tar.gz.gpg user@offsite:/backup/`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The discipline that trips most people is verification of the encrypted copy: a
              symmetrically encrypted archive that gets corrupted during transfer is not recoverable
              by leaning on the algorithm, so it must be test-decrypted as part of the verification
              pass described in the next section. Encryption and verification belong together in the
              same routine, never treated as alternative layers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Verification: The Part Everyone Skips
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most backup plans fail not because data was not copied but because nobody ever checked
              that the copy could be read back. Media goes bad, archives truncate, encryption keys
              drift, and restores interact awkwardly with the tools you expect to use. Verification
              turns &quot;files exist&quot; into &quot;these files restore correctly.&quot;
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Verification is a spectrum. The cheapest level is a checksum or built-in test mode
              that reads the archive back without extracting it. Stronger is a full extract to
              scratch space and a byte comparison against the source. The strongest is a periodic
              test restore into an isolated environment where you actually boot or mount the
              recovered data and run real workloads against it. Each level costs more; most setups
              should test-restore critical items and checksum everything.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Verify an archive actually parses before trusting it
tar -tvzf /backup/inc_2026-05-24.tar.gz | head
# restore a single file into scratch space and diff it
tar -xzf /backup/inc_2026-05-24.tar.gz -C /tmp/test-restore srv/data/important.db
diff /srv/data/important.db /tmp/test-restore/srv/data/important.db`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Make verification part of the schedule, not an occasional chore. Just as the backup
              itself is automated, so should the test restore. A monthly archival restore, plus a
              checksum on every run you produce, converts your backup from a stored artifact into an
              actively audited guarantee. This is the difference between systems that fail quietly
              and systems that get restored.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Troubleshooting Backup Failures
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Backups fail in a small set of predictable ways, and each has a clear first move. If
              media fills up mid-job, free space first and size the full schedule smaller, or move
              to incrementals. If a cron backup silently never runs, check the cron daemon, the
              environment the job runs in, and the log before assuming the command itself is the
              problem.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If a restore comes back with missing or empty files, the archive likely failed earlier
              than you realized — run the verify step above on the surviving copy and look at the
              job log for an interrupted write. If an encrypted backup will not open, suspect either
              the key or the passphrase before the data; try the key on a known-good test file to
              isolate the failure. And if your chain of incrementals breaks, because one
              intermediate is missing, fall back to the last full plus whatever intact incrementals
              remain, then rebuild the chain from the next full run.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When a real incident does occur, resist the urge to improvise. Restore the most recent
              full backup, layer the intact incrementals in the correct order, and verify the result
              against known-good checksums before declaring victory. The{" "}
              <Link href="/docs/incident-runbook">incident runbook</Link> gives a disciplined
              structure for exactly this scenario so a stressed restore does not turn into a
              data-exposing panic.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. A Real-World Example: The Drive That Failed at Month Three
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A home-lab administrator kept two years of family photos, documents, and a self-hosted
              media library on a single server with a nightly full backup to a removable drive. The
              scheme looked fine: the full job completed nightly with no errors, and the drive
              recorded healthy space use. Nobody had ever tried to restore anything, because nothing
              had gone wrong.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In the third month, a firmware bug corrupted the primary disk&apos;s filesystem while
              the machine rebooted. The plan called for restoring from the backup drive, but the
              nightly archive had quietly been truncating at the same large file for weeks — the
              drive hit capacity, the job wrote a broken archive, and the copy continued to report
              success because no checksum step was configured. The first restore attempt opened an
              archive that parsed partway and then died.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The fix was not a bigger drive. It was the verification habit. The administrator
              switched to a weekly full plus daily differential, enabled a test-restore check of the
              largest file after every run, and added a monthly extract-and-diff of the newest full
              archive. On the next infrastructure change, the silent-truncation class of failure was
              caught by the checksum step within hours instead of months. The manager lost one
              weekend to the rebuild but no permanent data, and the recovery that had almost been a
              full data loss became a controlled procedure executed from the runbook.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                Is a full, not an incremental, always the best first backup?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes. Every incremental or differential depends on a full anchor. If you start any
                layer without a known-good full backup, the chain has no foundation, so always take
                and verify a full backup before building incremental layers on top.
              </p>
              <h3 className="text-lg font-bold">How big should my backup medium be?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Size it for at least one full backup plus the densest part of your retention window,
                with extra headroom. A disk that fills mid-job silently truncates archives, which is
                exactly the failure that looks fine until you try to restore.
              </p>
              <h3 className="text-lg font-bold">
                Do I need to encrypt locally if my cloud is encrypted?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, if you can manage keys safely. Encrypting before upload means you control the
                key and the provider cannot read the data. If key management is beyond your comfort,
                at least ensure encryption in transit and provider-side at rest, and keep the
                trade-off deliberate.
              </p>
              <h3 className="text-lg font-bold">How often should I actually test a restore?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A realistic minimum is monthly for critical data, with a checksum on every run and a
                full extract-and-diff at least once a quarter. The cadence is less important than
                the habit of never skipping it and never trusting a backup you have not read back.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between archival and backup retention?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Backup retention is a short, automated, rotating window for recovery. Archival is
                long-term, deliberately retained data that is rarely restored. They have different
                costs and different verification needs; do not blur them.
              </p>
              <h3 className="text-lg font-bold">Can I rely on a single off-site copy alone?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A single off-site copy beats nothing, but it is a single point of failure for its
                provider or medium. The strongest practical configuration is a local fast copy for
                daily use plus an off-site copy for disasters, each verified independently.
              </p>
              <h3 className="text-lg font-bold">
                How do I know my restore targets the right point in time?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose your Recovery Point based on what is still acceptable to lose, then label
                every backup clearly with its start time and source checksum. During restore, pick
                the newest intact layer at or before the chosen moment and verify against those
                labels.
              </p>
              <h3 className="text-lg font-bold">
                My backup log shows success but the file is empty. Why?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Classic silent failure. The job wrote zero or truncated bytes, or another process
                opened the file mid-write. This is why a checksum or test-restore step matters more
                than the log message — a success line without a verification pass proves nothing.
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
