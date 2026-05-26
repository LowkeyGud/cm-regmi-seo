import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Local Backups: Practical Guide | CM Regmi Docs",
  description: "Options for fast local backups and simple verification steps.",
  alternates: { canonical: `${SITE_URL}/docs/local-backups` },
};

export default function LocalBackups() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/local-backups#article`,
    headline: "Local Backups: Practical Guide",
    description: "Options for fast local backups and simple verification steps.",
    url: `${SITE_URL}/docs/local-backups`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="localbackup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Local Backups: Practical Guide</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Local backups are useful for fast restores. Use redundant disks or NAS for local copies
          and keep a simple verification step to ensure files are readable.
        </p>
        <p className="text-muted-foreground mb-4">
          I like local backups as the first safety net because they make recovery quick when I only
          need one file or one folder back fast. That speed only matters if the backup can be
          tested, so I always pair it with a restore check.
        </p>

        <h2 className="text-xl font-semibold mt-6">Example rsync job</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`rsync -a --delete /home/user/Documents/ /mnt/backup/docs/
# run nightly via cron or systemd timer`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Restore verification</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>Pick a small file and restore it to a temporary location.</li>
          <li>Open the file and compare checksum with the original: `sha256sum file`.</li>
          <li>Automate this check as a periodic job to detect silent corruption.</li>
        </ol>

        <section className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Backup tools: borg and restic</h2>
          <p className="text-muted-foreground">
            Both borg and restic offer deduplication, encryption, and verification. Borg is great
            for single-host backups to external disks; restic has a friendlier repository format for
            cross-platform use.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>
              {"# borg init (on backup host)\nborg init --encryption=repokey /mnt/backup/repo"}
            </code>
          </pre>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>
              {
                "# restic backup example\nRESTIC_REPOSITORY=/mnt/backup/restic RESTIC_PASSWORD_FILE=/etc/restic/pass restic backup /home/user/Documents"
              }
            </code>
          </pre>

          <h2 className="text-xl font-semibold">Scheduling: systemd timer</h2>
          <p className="text-muted-foreground">
            Use a systemd timer for reliable, journaled scheduling without cron's edge cases.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>
              {
                "# /etc/systemd/system/backup.service\n[Unit]\nDescription=Run backup\n[Service]\nType=oneshot\nExecStart=/usr/local/bin/backup-script.sh"
              }
            </code>
          </pre>

          <h2 className="text-xl font-semibold">Verification and restore drills</h2>
          <p className="text-muted-foreground">
            Automate small restore checks weekly. A simple script should pick a random file, restore
            it to /tmp and compare checksum to the source. Track results and alert on failures.
          </p>

          <h2 className="text-xl font-semibold">Retention and pruning</h2>
          <p className="text-muted-foreground">
            Keep daily snapshots for 14 days, weekly for 12 weeks, and monthly for 12 months. Both
            borg and restic provide pruning commands; run them after backups to reclaim space.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>
              {
                "# borg prune example\nborg prune -v --list --keep-daily=14 --keep-weekly=12 --keep-monthly=12 /mnt/backup/repo"
              }
            </code>
          </pre>

          <h2 className="text-xl font-semibold">Common failure modes</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Disk fills — monitor free space and alert before backups start.</li>
            <li>Silent corruption — verify checksums and keep multiple independent copies.</li>
            <li>Key loss — store encryption keys in a secure, off-site location.</li>
          </ul>

          <div className="mt-8">
            <p className="text-muted-foreground mb-2">
              Rotate encryption keys annually and record the key location in your secure vault. Test
              key rotation on a non-production snapshot before rolling to production. Document
              rotation steps and a rollback plan, and notify the team regularly.
            </p>
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
          <h2 className="text-xl font-semibold">Sample restore script</h2>
          <p className="text-muted-foreground">
            A basic restore helper can speed drills and be reused by on-call engineers.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`#!/usr/bin/env bash
# restore-check.sh
REPO=/mnt/backup/repo
TARGET=/tmp/restore-check
mkdir -p "$TARGET"
borg extract $REPO::latest path/to/sample.file --target $TARGET
sha256sum $TARGET/path/to/sample.file`}</code>
          </pre>

          <h2 className="text-xl font-semibold">Estimating restore time</h2>
          <p className="text-muted-foreground">
            Measure real restore times for representative datasets. Track average throughput (MB/s)
            and time-to-first-byte for single-file restores — these numbers help set user
            expectations during incidents.
          </p>

          <h2 className="text-xl font-semibold">Testing plan and outcomes</h2>
          <p className="text-muted-foreground">
            Run a monthly restore drill: choose a random snapshot, restore 10 representative files,
            measure success and time, and log outcomes. If a drill fails, escalate to the backups
            owner and mark the snapshot as suspect.
          </p>

          <div className="mt-8">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="localbackup-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
