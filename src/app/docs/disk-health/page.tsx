import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Disk Health and Filesystems | CM Regmi Docs",
  description: "What to monitor for disk health and general filesystem hygiene.",
  alternates: { canonical: `${SITE_URL}/docs/disk-health` },
};

export default function DiskHealth() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/disk-health#article`,
    headline: "Disk Health and Filesystems",
    description: "What to monitor for disk health and general filesystem hygiene.",
    url: `${SITE_URL}/docs/disk-health`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="disk-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Disk Health and Filesystems</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Monitor SMART attributes for physical disks, keep spare capacity for journaling, and
          schedule periodic filesystem checks for systems that cannot be disrupted unexpectedly.
        </p>
        <p className="text-muted-foreground mb-4">
          I usually check disk health any time a machine starts feeling slow or noisy, because those
          are often the first signs that something is drifting. Catching SMART warnings early has
          saved me from turning a small storage issue into a recovery job more than once.
        </p>

        <h2 className="text-xl font-semibold mt-6">SMART example</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Check SMART attributes
smartctl -a /dev/sda
# Look for Reallocated_Sector_Ct, Current_Pending_Sector`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Maintenance routine</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Check disk health before performance starts to drop noticeably.</li>
          <li>Keep free space available for snapshots, logs, and temporary files.</li>
          <li>Replace disks before the failure becomes a recovery event.</li>
        </ul>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Filesystem checks and repair</h2>
          <p className="text-muted-foreground">
            For filesystems like ext4, periodic `fsck` runs during maintenance windows detect and
            fix metadata issues. On production systems prefer read-only checks and schedule offline
            repairs when possible.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# run a non-destructive filesystem check (example for ext4)
sudo fsck -n /dev/sda1

# to repair (schedule during maintenance):
sudo fsck -y /dev/sda1`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">ZFS and scrub maintenance</h2>
          <p className="text-muted-foreground">
            ZFS provides built-in data integrity checks. Schedule periodic scrubs and monitor
            `zpool` health to detect silent corruption early.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# start a scrub
sudo zpool scrub tank

# check status
zpool status -v`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">SMART long test and interpretation</h2>
          <p className="text-muted-foreground">
            Run a long self-test when SMART reports pre-failure attributes. After the test, inspect
            the log and return code to decide whether to replace the disk.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# start a long test
sudo smartctl -t long /dev/sda
# wait for completion, then
sudo smartctl -l selftest /dev/sda`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Monitoring and alerting</h2>
          <p className="text-muted-foreground">
            Export SMART and pool health metrics to your monitoring stack. Alert on growing
            reallocated sector counts, rising temperature trends, or scrubs that find mismatches.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Case study</h2>
          <p className="text-muted-foreground">
            A small NAS showed intermittent slow IO. SMART reported rising pending sectors; after an
            emergency snapshot and data migration to a healthy disk, the team scheduled a rolling
            replacement. The incident cost less than a full data recovery and validated the
            monitoring configuration.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="disk-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
