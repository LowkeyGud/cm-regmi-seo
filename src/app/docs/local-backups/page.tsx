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
  title: "Local Backup Strategies and Verification | CM Regmi Docs",
  description:
    "Local backup targets, scheduled rsync and restic jobs, integrity verification, offsite copies, and recovery testing for personal and small-fleet data protection.",
  alternates: { canonical: `${SITE_URL}/docs/local-backups` },
  openGraph: {
    title: "Local Backup Strategies and Verification | CM Regmi Docs",
    description:
      "Local backup targets, scheduled rsync and restic jobs, integrity verification, offsite copies, and recovery testing for personal and small-fleet data protection.",
    url: `${SITE_URL}/docs/local-backups`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Backup Strategies and Verification | CM Regmi Docs",
    description:
      "Local backup targets, scheduled rsync and restic jobs, integrity verification, offsite copies, and recovery testing for personal and small-fleet data protection.",
  },
  robots: { index: true, follow: true },
};

export default function LocalBackupsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/local-backups#article`,
    headline: "Local Backup Strategies and Verification",
    description:
      "Local backup targets, scheduled rsync and restic jobs, integrity verification, offsite copies, and recovery testing for personal and small-fleet data protection.",
    url: `${SITE_URL}/docs/local-backups`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="local-backups-schema"
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
                <BreadcrumbPage>Local Backups</BreadcrumbPage>
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
              Local Backup Strategies &amp; Verification
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A backup that has never been restored is only a theory. This guide walks through
              choosing local backup targets, scheduling rsync and restic jobs, verifying integrity,
              keeping an offsite copy, and proving recovery works before you need it.
            </p>
          </header>

          <TableOfContents />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. The Backup Triangle and Local Targets
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every real backup strategy balances three constraints: how quickly you can restore,
              how much data you can lose in the worst case, and how much it costs to store and
              manage copies. Local backups shine on the first two. An external drive or a NAS on
              your own network restores at local speed with no bandwidth ceiling, and snapshots
              taken minutes apart can shrink the recovery point to nearly zero. The tradeoff is that
              local copies live in the same building as the originals, so fire, theft, or a disk
              failure in the same room takes both down at once.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That is why the widely repeated rule exists: a backup is only a real backup if at
              least one copy is offsite and at least one copy is offline or immutable. Local targets
              give you the fast, convenient copies; the offsite copy, discussed in a later section,
              gives you survival. Choose your local targets for speed and automation, then add the
              offsite layer for disaster resistance rather than treating either as optional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For local storage you have two dominant options. An external drive connected by USB is
              cheap, portable, and dead simple, but it is a single point of failure unless you
              rotate several drives. A NAS is more expensive but supports RAID, snapshots, scheduled
              jobs, and multiple clients, which makes it the natural hub for a home lab or small
              fleet. Whichever you pick, format it with a filesystem that supports the checksums and
              snapshots your tooling needs, and keep it powered and mounted in a predictable way so
              automation does not fail silently.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Scheduling with rsync and Hard Links
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              rsync is the workhorse of file-level local backups. It transfers only the changed
              blocks, preserves permissions and timestamps, and can run over SSH for remote hosts.
              For a small home-lab directory set it is hard to beat. The classic pattern is an
              incremental snapshot scheme that uses hard links, so each backup is a full-looking
              directory tree while only changed files consume new disk space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A typical daily job that mirrors a source tree to a timestamped snapshot and
              hard-links unchanged files against the previous snapshot looks like the command below.
              The important flags are the archive behaviour, the option to delete files removed from
              the source, and the link-dest reference to the previous snapshot.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/bin/sh
BACKUP_DIR=/mnt/nas/snapshots
SOURCE=/home/user/data
STAMP=\$(date +%Y%m%d-%H%M%S)
LATEST=\$(ls -1t \$BACKUP_DIR | head -n1)

rsync -a --delete \\
  --link-dest="\$BACKUP_DIR/\$LATEST" \\
  "\$SOURCE/" "\$BACKUP_DIR/\$STAMP/"

ln -snf "\$BACKUP_DIR/\$STAMP" "\$BACKUP_DIR/current"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The script stamps a new snapshot, links unchanged files to the previous one, and
              repoints the current symlink. The result is a history you can browse and restore from
              directly with ordinary file tools. The main weakness of rsync snapshots is that they
              preserve corruption in place: if a file is quietly damaged, every later snapshot
              inherits the bad data. That is exactly the gap that checksum-based tools like restic
              fill.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For servers or any environment where the machine runs continuously, schedule the job
              with cron or a systemd timer so the backup happens without human memory. Email the
              output and fail on errors so a broken job is loud, never silent. A backup that quietly
              stops for three months is indistinguishable from no backup at all until it is far too
              late.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Content-Addressable Backups with restic
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              restic is a deduplicating, content-addressable backup tool that stores every block
              with a cryptographic hash. Because identical blocks are stored once regardless of how
              many snapshots reference them, full backups become cheap and storage grows only with
              new data. Restic also computes checksums for every stored blob, which means integrity
              can be verified independently of the original files. That property is the cornerstone
              of trustworthy local backups.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The first step is to initialize a repository on your NAS or external drive and record
              the password somewhere safe. A minimal workflow initializes the repo, performs a
              backup, and lists the resulting snapshots, as shown below.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`export RESTIC_REPOSITORY=/mnt/nas/restic-repo
export RESTIC_PASSWORD_FILE=/home/user/.restic-password

restic init
restic backup /home/user/data --verbose
restic snapshots
restic check`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The check command is the key step that rsync cannot offer. It reads every stored blob
              and verifies that all hashes match, so silent corruption in the repository is caught
              early. Run a check after every backup, or on a schedule, and treat a failed check as
              an incident rather than a curiosity. A repository you cannot trust is worthless even
              if every backup reported success.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Restic encrypts data by default, which makes an offsite or cloud copy safe, and it
              supports retention policies so old snapshots expire automatically. Pair the encrypted
              repository with the offline copy discussed later, and you have addressed both
              corruption detection and disaster survival in one tool. For a home lab or small fleet,
              restic backed by a local NAS plus a rotated offsite target is a strong, low-effort
              baseline.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Integrity Verification and Test Restores
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Verification is the difference between storing data and protecting it. At the file
              level you want to confirm the copy matches the source; at the repository level you
              want to confirm the checksums are intact; and at the highest level you want to prove
              you can actually pull a file back out and use it. All three levels matter, and they
              catch different kinds of failure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For rsync-style copies, verify with a checksum comparison or by reading back and
              comparing sizes and modification times. Rsync does not re-read the destination by
              default, so a drive that silently fails writes will still report success. A periodic
              compare with the checksum option, run at a fraction of the transfer cost because most
              blocks are unchanged, closes that gap. For restic, the built-in check command handles
              the repository-level verification and should run on a timer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Test restores are the final and most important gate. Once a month, restore a single
              critical file to a scratch directory and confirm its content opens correctly. Once a
              quarter, restore a full directory tree to a test location and run an application
              against it. The point is not merely to confirm the bytes are there; it is to practice
              the restore procedure so that under pressure you follow a rehearsed path instead of
              improvising. An untested restore path, like an unmeasured rollback, is only a theory
              until a real emergency.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Record each test restore, its elapsed time, and any friction you hit. Over a few
              cycles you will discover that a specific tool needed a flag, or that a particular file
              required elevated rights to restore. Fix those details now, while there is no urgency,
              and your recovery time in an actual incident drops dramatically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. The Offsite and Offline Copy</h2>
            <p className="text-muted-foreground leading-relaxed">
              No matter how reliable your local NAS is, a flood, fire, or theft can take out both
              the source and the local backup at once. The offsite copy exists purely to survive
              events that destroy an entire location. It can be a second drive that you keep at a
              trusted relative's house, a rotation of portable drives you swap each week, or an
              encrypted object store such as a cloud bucket. The critical property is geographic
              separation from the source.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              An offline copy is the other half of the rule. A drive that is connected whenever a
              backup runs is vulnerable to the same ransomware that is encrypting your primary data,
              because it can reach the mounted volume. An offline drive, disconnected except during
              the brief backup window, or an immutable or append-only target that cannot be modified
              after writing, defeats that attack path. Combine both ideas: take a restic repository,
              replicate it to a rotated offline drive, and keep one copy physically away from the
              machine.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because restic repositories are encrypted and content-addressed, you can copy the
              whole repository to another location and the data remains intact and safe. Use restic
              copy or simply mirror the repository directory to the offsite drive, then verify the
              remote repository with a check. The encryption means a stolen offsite drive is useless
              to an attacker, and the checksum means you can trust the replica. This turns a cheap
              second disk into a complete disaster-recovery layer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Retention, Monitoring, and Human Review
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Decide how long you keep snapshots before they pile up and eat your storage. For most
              home labs and small fleets a rolling policy of a handful of daily snapshots, a few
              weekly snapshots, and one or two monthly snapshots is plenty. Restic encodes this with
              a retention policy passed to the forget command, which removes snapshots that fall
              outside the window while always keeping at least one recent restore point. Set the
              policy explicitly; an unmanaged repository grows without limit and one day exhausts
              the disk mid-backup.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every automated job needs a monitoring heartbeat. Forward the backup log to your
              logging stack and alert if a job fails, runs longer than its usual bound, or produces
              no output at all. A backup that succeeds with a warning should still produce a visible
              signal, because warnings tend to escalate into silent failures. Centralize the logs so
              that a single dashboard shows whether every machine was backed up and verified, in
              line with the practices in the{" "}
              <Link href="/docs/interpreting-system-logs" className="text-primary hover:underline">
                interpreting system logs
              </Link>{" "}
              guide. For the wider picture of where backups fit in your data protection strategy,
              review the{" "}
              <Link href="/docs/storage-backup-dr" className="text-primary hover:underline">
                storage backup and disaster recovery
              </Link>{" "}
              documentation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Finally, keep a human in the loop. Automation fails at the edges, and the people best
              positioned to notice are the ones who rely on the data. Have a named owner review the
              backup report and the monthly test restore result, and make sure that person has the
              authority to pause a job, replace a failing drive, or call a restore when something
              looks wrong. Ownership turns a set of scripts into a discipline.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. A Home-Lab Example That Proved Itself
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Consider a home lab that kept family photos, project code, and a small collection of
              personal documents on a single desktop. The operator set up a nightly restic backup to
              a NAS, added a monthly repository check, and rotated a pair of encrypted portable
              drives for the offsite copy, swapping one to a relative's house every week.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              One Saturday the desktop disk began to fail, throwing read errors on a directory that
              held several years of photos. Because a test restore had been rehearsed the month
              before, the operator already knew the restic restore command and the location of the
              repository password. A single command pulled the entire photo collection back onto a
              replacement drive, and the checksum verification on the restored files confirmed the
              data was intact. The whole recovery took under an hour.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical outcome was that a drive failure that could have ended in permanent loss
              became a routine restore, precisely because the repository was verified monthly and
              the restore path had been practised in advance. Nothing about the incident was heroic.
              It was the unremarkable consequence of scheduling, verifying, and testing ahead of
              time, which is the entire thesis of this guide.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting</h2>
            <p className="text-muted-foreground leading-relaxed">
              If a backup job fails, start by confirming the target is mounted and writable. A NAS
              that is asleep, a drive that was disconnected, or a full disk all produce errors that
              look like tool failures. Check the exit status and the log, and make sure the job
              actually sends a signal when it fails rather than quietly skipping.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A restic check that reports errors almost always points to hardware trouble on the
              repository disk or a partially written snapshot from a job that was interrupted. Stop
              writing to the repository, diagnose the disk health, and confirm your other snapshots
              still verify before you trust the newest one. Disk health tooling is the right next
              step for identifying whether the storage itself is failing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If a restore produces files that will not open, compare a checksum of the restored
              file against the source snapshot, then verify the repository. The problem is almost
              always on the storage layer rather than in the restore command. If nothing verifies,
              recover from the second, older snapshot you keep for exactly this reason, then
              diagnose why the recent one became corrupt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">How often should I back up my home lab?</h3>
              <p className="text-muted-foreground leading-relaxed">
                At least nightly for data that changes daily. Adjust the interval to match how much
                change you can afford to lose; the recovery point you accept dictates the schedule,
                not the other way around.
              </p>
              <h3 className="text-lg font-bold">Is an external drive enough for a backup?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A single external drive is a start but it fails the three-copy rule and shares the
                building with your data. Pair it with a scheduled job and a rotated offsite copy,
                and verify it regularly, before you consider yourself protected.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between rsync and restic?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Rsync mirrors files and is simple and fast, but it cannot detect silent corruption
                in already-copied data. Restic is deduplicating, encrypted, and checksum-verified,
                so it both saves space and lets you confirm integrity independently of the source.
              </p>
              <h3 className="text-lg font-bold">How do I know my backup is not corrupt?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Verify at three levels: compare files against the source, run the repository check
                for checksum integrity, and perform an actual test restore. Only a successful
                restore proves the chain end to end.
              </p>
              <h3 className="text-lg font-bold">Can I trust a cloud copy for my offsite backup?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, especially when the data is encrypted before upload as restic does. Just
                remember that cloud storage is another remote location, not a replacement for an
                offline copy that ransomware cannot reach.
              </p>
              <h3 className="text-lg font-bold">
                Why did my backup say success but the data is missing?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The most common causes are a target that filled silently, a source path that
                changed, or a drive that accepted writes without persisting them. Monitoring exit
                status and performing periodic checks and test restores are the only ways to catch
                these.
              </p>
              <h3 className="text-lg font-bold">Should I keep more than one snapshot version?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Always. A single snapshot is one bad write or one encryption accident away from
                unusable. Keep a rolling set so you can reach back to a known-good version when the
                most recent one is damaged.
              </p>
              <h3 className="text-lg font-bold">How long does a full restore take?</h3>
              <p className="text-muted-foreground leading-relaxed">
                It depends on data size and the speed of both the source disk and the target.
                Measure it during your quarterly test restore so you have a realistic number for
                planning and for setting expectations during an actual incident.
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
