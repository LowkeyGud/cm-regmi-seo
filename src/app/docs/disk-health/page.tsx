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
  title: "Disk Health Monitoring | CM Regmi Docs",
  description:
    "SMART attribute analysis, smartctl usage, error trend tracking, reallocated and pending sector interpretation, fsck, scrubs, TRIM, and disk replacement thresholds.",
  alternates: { canonical: `${SITE_URL}/docs/disk-health` },
  openGraph: {
    title: "Disk Health Monitoring | CM Regmi Docs",
    description:
      "SMART attribute analysis, smartctl usage, error trend tracking, reallocated and pending sector interpretation, fsck, scrubs, TRIM, and disk replacement thresholds.",
    url: `${SITE_URL}/docs/disk-health`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disk Health Monitoring | CM Regmi Docs",
    description:
      "SMART attribute analysis, smartctl usage, error trend tracking, reallocated and pending sector interpretation, fsck, scrubs, TRIM, and disk replacement thresholds.",
  },
  robots: { index: true, follow: true },
};

export default function DiskHealth() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/disk-health#article`,
    headline: "Disk Health Monitoring",
    description:
      "SMART attribute analysis, smartctl usage, error trend tracking, reallocated and pending sector interpretation, fsck, scrubs, TRIM, and disk replacement thresholds.",
    url: `${SITE_URL}/docs/disk-health`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="disk-health-schema"
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
                <BreadcrumbPage>Disk Health Monitoring</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Storage Reliability
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Disk Health Monitoring
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Hard drives and solid-state drives fail on their own schedule, and the only warning
              you get is the telemetry they emit before, and sometimes during, the failure. SMART
              attributes, self-test logs, reallocated sector counts, and filesystem consistency
              checks are the core of a disk health practice that replaces surprises with a
              replacement plan. This guide covers the tools, the numbers that matter, the trends
              that predict failure, and the precise thresholds that justify taking a disk out of
              service.
            </p>
          </header>

          <TableOfContents />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Why Disk Health Monitoring Must Be Proactive
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Disks fail in two very different ways. Catastrophic failures happen without warning
              and take the whole device offline in seconds. Predictable failures, by contrast, give
              you days or even weeks of notice through self-diagnostic counters, retried read/write
              errors, and slowly growing bad-sector maps. The difference between a lost weekend and
              a clean migration is almost always a monitoring practice that was in place before the
              disk misbehaved.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Proactive monitoring also changes the economics of storage. A disk replaced on
              schedule costs the price of the disk and an hour of your time. A disk replaced after
              it takes down a database can cost a recovery window, corrupted files, degraded RAID
              rebuilds, and the trust of the people who depend on the service. Monitoring is cheap,
              repeated, and boring — which is exactly why it works.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The tooling starts with Self-Monitoring, Analysis and Reporting Technology (SMART), a
              standard built into practically every drive manufactured in the last two decades.
              SMART collects raw counters inside the drive firmware and exposes them to the
              operating system through ATA, NVMe, SATA, and SAS interfaces. The counters are not a
              perfect crystal ball, but they are the most reliable failure signal you can get
              without destroying the drive to inspect it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On Linux, smartctl from the smartmontools package is the standard utility for reading
              these counters. It also drives the built-in self-test routines that stress every
              sector the drive knows about. On the filesystem side, fsck, btrfs scrub, zpool scrub,
              and TRIM complement the drive-level telemetry by confirming that the data written to
              the disk is actually readable back. Monitoring should span both layers, because a
              drive can report perfect attributes while the filesystem on top of it is quietly
              corrupting data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Reading ATAs with smartctl</h2>
            <p className="text-muted-foreground leading-relaxed">
              The first task on any new server is to confirm that SMART is enabled and the
              attributes are readable. Most distributions bundle smartmontools, but a minimal
              container or VM host may need the package installed explicitly. SMART reporting is
              handled by the drive firmware, so it works on physical disks that expose an ATA or
              SCSI command set; USB-attached enclosures and some virtualization layers can hide it,
              a failure mode covered in the Troubleshooting section below.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Install smartmontools (Debian/Ubuntu)
sudo apt install smartmontools

# Show the health status summary for a whole disk
sudo smartctl -H /dev/sda

# Full attribute table for a SATA/ATA disk
sudo smartctl -A /dev/sda

# NVMe drives use a different namespace
sudo smartctl -A /dev/nvme0`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The health summary line is the fastest triage. A PASS result means the drive's own
              firmware has not yet decided that a critical threshold was crossed. A FAILED result
              means at least one attribute sat in the FAILING_NOW state at the last check. Treat the
              summary with respect but also with skepticism: it is a single boolean computed by the
              manufacturer's threshold table, and those tables are frequently conservative. Raw
              counters that are climbing can be more informative than a PASS line that has stopped
              updating.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The attribute table deserves careful interpretation because the columns mean different
              things. The ID is a fixed numeric attribute identifier; the name is a vendor label
              that occasionally differs across manufacturers; the VALUE column is a normalized score
              where lower is worse and 100 means near-new condition; the WORST column records the
              lowest normalized value ever seen; the THRESHOLD column is the score below which the
              firmware flags a failure; and the RAW_VALUE is the raw counter, the number you should
              be trending over time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For a quick inventory across all attached disks, a simple loop through the block
              devices produces a fleet-wide summary. On systems with many disks, this is the first
              command to run during any maintenance window.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Quick health pass/fail for every attached ATA disk
for disk in /dev/sd?; do
  echo "=== $disk ==="
  sudo smartctl -H "$disk" | grep -E "SMART overall|cannot enable|No such device"
done`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. The Attributes That Predict Failure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Not every one of the dozens of attributes deserves the same attention. In practice a
              handful of counters carry most of the predictive signal, and they map differently onto
              spinning hard drives and solid-state drives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For hard drives, the attributes that matter most are Reallocated_Sector_Count (ID 5),
              Current_Pending_Sector (ID 197), Offline_Uncorrectable (ID 198), and
              Reported_Uncorrectable_Errors (ID 187). These four counters describe a physical
              failure cascade: the media weakens, read errors appear, the drive quietly relocates
              data to spare sectors, the relocation list grows, and eventually the drive reports
              errors it can no longer hide. Also watch Temperature_Celsius (ID 194) and
              Power_On_Hours (ID 9), because sustained heat is the silent driver behind all the
              mechanical counters.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For solid-state drives the signal is different. NAND wears out with program-erase
              cycles, so the counters that matter are Wear_Leveling_Count, Media_Wearout_Indicator,
              and the percentage of the rated lifetime already consumed. NVMe drives report this as
              the Percentage Used field and the media and data integrity error counters. On both
              technologies, unexpected power-loss events appear in counts such as
              Unsafe_Shutdown_Count and Power_Cycle_Count, and a rapidly climbing unsafe-shutdown
              counter is grounds to investigate the power supply and UPS before blaming the disk.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Focused extract for the counters that drive replacement decisions
sudo smartctl -A /dev/sda | grep -E \
  "Reallocated_Sector|Current_Pending|Offline_Uncorrectable|Reported_Uncorrect|Power_On_Hours|Temperature"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The important habit is to record these numbers on a regular schedule instead of
              inspecting them once during installation. A single reading tells you very little; a
              sequence of readings tells you the rate at which the drive is degrading. A drive with
              zero reallocated sectors yesterday and twenty today is in a different class of danger
              than a drive that has held a constant count of ten for two years.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Error Trends and Self-Test Logs
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Raw counters are one half of the story; the drive's own logs are the other half.
              smartctl exposes two journals: the error log, which records recent command failures
              with the exact logical block addresses involved, and the self-test log, which records
              the outcome of every short or extended test the drive has been asked to run. Both logs
              persist across reboots inside the drive firmware, and both deserve a periodic read.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Smart error log (often abbreviated; read periodically)
sudo smartctl -l error /dev/sda

# Self-test log, shows past test outcomes
sudo smartctl -l selftest /dev/sda

# Run a short background test (a few minutes, safe while running)
sudo smartctl -t short /dev/sda

# Run the full extended test (can take hours on large disks)
sudo smartctl -t long /dev/sda

# Poll until the running test finishes
sudo smartctl -l selftest /dev/sda | tail -5`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Self-tests are the closest thing to a stress test a drive can run on itself. A short
              test sweeps a bounded sample of the disk surface and the read/write heads, while a
              long test reads every addressable sector once, which is why it takes hours on a
              multi-terabyte drive. A completed test with an overall status of Completed Without
              Error is strong evidence the media is currently readable; a status of Completed With
              Read Failures, Failed, or Aborted places the drive firmly on the replacement list.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trend analysis is what turns these logs into decisions. The most useful monitoring
              setups store the raw attribute values and the self-test outcomes in a small time
              series, or even a flat file, and alert when a delta crosses a threshold between two
              samples. A wildcard rule such as any increase in pending sectors, any failure in a
              scheduled self-test, or a temperature reading above the vendor ceiling for more than
              an hour covers most real-world incidents before they escalate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Reallocated and Pending Sectors Explained
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Reallocated sectors and pending sectors are the two counters that most reliably
              predict imminent hard drive trouble, and yet they are frequently misunderstood. A
              reallocated sector is one the drive has already decided is unreliable: it failed
              verification, its data was moved to a reserved spare region of the platter, and the
              address was remapped. The drive hides this from the operating system entirely, so the
              only way to know it happened is the raw counter.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A pending sector is a sector that has failed at least one read or write attempt but
              has not yet been reallocated. It sits in a transition state: if a subsequent write
              succeeds, the drive may clear the pending flag; if the reads keep failing, the sector
              is eventually reallocated and the count moves from 197 to 5. Pending sectors are
              therefore a leading indicator, which is why a nonzero current pending count is often
              more urgent than the cumulative reallocation count.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A single reallocated sector on a ten-year-old drive is not itself a crisis; the media
              is old and these counters rise slowly with age. The judgment call is about velocity.
              If the count is stable across a month of weekly samples, the drive can usually soldier
              on under observation. If the count jumps between samples, or pending sectors appear at
              the same time, the platter is failing faster than the spare pool can keep up, and
              every new bad sector risks files you have not backed up. Treat rapid growth as a
              reason to stage a migration, not to wait.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because disk-health work and data protection work feed each other, monitoring smart
              counters does not replace a backup strategy; it complements one. The moment a disk
              shows a worrying trend, the correct move is to confirm a fresh backup of its contents
              exists before touching anything. The storage backup and recovery playbook covers how
              to keep those copies verified so that a failing disk is a maintenance event, not a
              data-loss event.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Filesystem Integrity: fsck, Scrub, and TRIM
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Drive firmware counters cannot tell you whether the filesystem sitting on top of the
              device is internally consistent. Every major Linux filesystem therefore ships its own
              integrity check, and running those checks on a schedule is what separates a healthy
              storage stack from one that only looks healthy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For ext4 and its ancestors, fsck verifies the metadata structures against the journal
              during a clean boot sequence. Running fsck on a mounted filesystem is dangerous for
              write-heavy workloads, so the practical pattern is to force a check at controlled
              times, capture the output, and treat any reported inconsistency as a hardware suspect.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Force a consistency pass on the next reboot for an unmounted check
sudo tune2fs -c 1 /dev/sda1 && sudo reboot

# Manual check on an unmounted filesystem
sudo fsck -f /dev/sda1

# Btrfs: verify data and metadata checksums across the whole tree
sudo btrfs scrub start /mnt/data
sudo btrfs scrub status /mnt/data

# ZFS: verify checksums for every block in the pool
sudo zpool scrub zp1
sudo zpool status zp1`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Copy-on-write filesystems add a crucial property: they store checksums for every
              block, so a scrub can prove that the data read back matches the data originally
              written. A btrfs scrub or a zpool scrub reads every block in the tree or pool and
              compares the stored checksum; if a block disagrees, the scrub reports it and, on a
              redundant configuration, repairs it from a mirror or parity device. A scrub that
              reports new errors between runs is among the strongest signals that a device in the
              pool is degrading, even when its SMART counters look innocent.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Solid-state storage adds a different maintenance task: TRIM. When the operating system
              deletes a file, the underlying NAND cells still hold the old data, and future writes
              must erase those cells before programming them, which slows down the drive. TRIM tells
              the controller which cells are free so it can schedule the erase in the background.
              Forcing a periodic TRIM pass keeps SSD write performance and wear leveling in their
              intended state, and modern schedulers make it possible to run it safely even while the
              drive is in use.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Session TRIM on a mounted SSD, then confirm the filesystem supports it
sudo fstrim -v /
lsblk -D /dev/sda

# Persistent weekly TRIM via systemd (no manual schedule needed)
sudo systemctl enable fstrim.timer
sudo systemctl start fstrim.timer
sudo systemctl list-timers fstrim.timer`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Firmware-level TRIM and filesystem-level checks complement the SMART readings from
              earlier sections. A drive can fail a scrub while passing every SMART attribute if the
              flash translation layer is remapping silently, and a drive can pass a scrub while its
              reallocated counters climb. Only when you run all three layers — drive telemetry,
              periodic self-tests, and filesystem consistency checks — on a regular cadence do you
              get a trustworthy picture of the disk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">7. Replacement Thresholds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Thresholds turn telemetry into decisions, and they need to be strict enough to protect
              data and practical enough not to generate a replacement request every time a disk
              sneezes. The values below are operational starting points used widely in production;
              adjust for your vendor documentation and your tolerance for downtime.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                Reallocated_Sector_Count jumping by one or more between consecutive weekly samples
                on a hard drive: begin migration immediately. A jump of five or more in one sample
                is grounds for hot-spare activation, not just observation.
              </li>
              <li>
                Current_Pending_Sector above zero on a hard drive: schedule replacement within the
                current maintenance window if the count persists across one full-surface long test.
              </li>
              <li>
                Any self-test completing with Read Failures or Failed: replace the drive. A single
                failed long test is a confirmed media defect, not a rounding error.
              </li>
              <li>
                SSD Media_Wearout_Indicator (or NVMe Percentage Used) above 90 percent: treat as
                capacity for write lives exhausted; plan replacement before the next large write
                campaign.
              </li>
              <li>
                Temperature sustained above the vendor ceiling (commonly 55 to 60 degrees Celsius
                for 3.5-inch enterprise disks): fix the cooling, and if the disk also shows any
                attribute growth, replace it.
              </li>
              <li>
                A scrub that reports uncorrectable errors on a pool with redundancy: identify and
                replace the failing device immediately; your redundancy has already absorbed one hit
                and will not absorb a second.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              The discipline underneath all of these thresholds is that a disk listed for
              replacement should be replaced with the same seriousness as a dated component reaching
              end-of-life. An observation window of a few weeks is fine for a drive that is stable
              and simply old. A drive with active error growth is a liability the moment the next
              replication cycle starts, and the honest answer to the question of when to replace it
              is always before the next incremental backup, not after it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Real-World Example: A Quietly Failing VM Host
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A homelab operator ran a small virtualization host with three 3.5-inch disks in a ZFS
              mirror with a hot spare. The pool ran for months without incident, SMART health checks
              reported PASS, and nightly jobs completed on time. What nobody had configured was a
              periodic scrub or a trend collection, because at the time every check was a one-off
              manual command.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After a move that left the server under a desk with blocked airflow, the disk
              temperatures climbed into the high sixties for several days. A weekly monitor script,
              added during a quiet weekend, exposed the change: the primary mirror device had
              developed seven pending sectors, its reallocated count jumped from zero to four in a
              single week, and a forced long self-test failed on a block in the middle of the
              device.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The fix was deliberately boring. The operator verified a ZFS snapshot of every dataset
              existed, confirmed a second full backup on a separate server, retired the failing disk
              from the mirror, inserted a disk that had already passed a long self-test, let the
              resilver complete, and then ran a full scrub. The scrub completed with zero errors,
              the pool maintained redundancy throughout, and no virtual machine missed a single
              reboot. The disks themselves were then moved to a position with airflow, and the
              monitor script stayed in place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The lesson generalizes to hardware beyond storage. Just as disk telemetry degrades
              gradually and predictably, so does a worn battery degrade through a measurable set of
              cycles and temperatures. The monitoring habits on this page — baseline, trend,
              threshold, replace before failure — are the same habits you apply to other aging
              hardware; the battery wear guide covers that companion practice in full. And when the
              failing disk is inside a workload that also depends on backups and disaster recovery,
              the storage backup and DR playbook shows how to structure those layers so a disk
              replacement never becomes a data-loss incident.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">9. Troubleshooting</h2>
            <p className="text-muted-foreground leading-relaxed">
              SMART and scrub commands should behave predictably, but real hardware throws curve
              balls. When a check fails, work through the following sequence instead of guessing.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Start with device identity.</strong> Run lsblk and confirm the exact block
                device you are targeting. Hundreds of failed alert scripts come from checking
                /dev/sda when the failing disk is actually /dev/sdc after a machine reboot
                reassigned letters.
              </li>
              <li>
                <strong>Confirm SMART is visible at all.</strong> Run smartctl -i /dev/sdX and check
                the device model line. If the tool reports that SMART is unavailable, the disk may
                be behind a USB bridge, an enclosure without full ATA pass-through, or a virtualized
                controller that does not forward the commands. If the disk is a SCSI or SAS device,
                use the smartctl -d scsi mode instead of the default ATA handling.
              </li>
              <li>
                <strong>
                  If SMART reports a PASS but you suspect problems, trust the raw counters and the
                  logs, not the summary.
                </strong>{" "}
                Read smartctl -A and -l error after a failed workload. A PASS line does not clear
                pending sectors that keep reappearing.
              </li>
              <li>
                <strong>If a self-test never completes, check the test log directly.</strong> Run
                smartctl -l selftest and read the overall status, not just the elapsed time. A test
                can stall against a read-error storm; that stall is itself a diagnostic result.
              </li>
              <li>
                <strong>If a scrub reports errors, identify which device caused them.</strong> On
                ZFS, zpool status reports the device that failed checksum verification. On btrfs,
                the scrub output names the device for each bad block. Replace that specific device,
                never the whole array, and let the redundancy rebuild.
              </li>
              <li>
                <strong>If the filesystem refuses to mount cleanly, do not force things.</strong>
                Capture the exact error, then boot a live medium or recovery mode to run fsck on the
                unmounted device. Forcing a mount on a corrupt filesystem can turn recoverable
                damage into permanent loss.
              </li>
              <li>
                <strong>Escalate when the pattern is environmental, not mechanical.</strong> If
                pending sectors appear on multiple family members after a temperature or power
                event, fix the rack airflow, the PSU, or the UPS, and re-run the baseline before
                replacing every disk.
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">How often should I run SMART self-tests?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Run a short test weekly on every production disk and a long test monthly on disks
                that hold irreplaceable or slow-moving data. Schedule the long tests in the quiet
                window because a multi-terabyte drive can take several hours to complete a full
                pass.
              </p>
              <h3 className="text-lg font-bold">
                Is a reallocated sector always a reason to replace the disk?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Not immediately. A drive with a small, stable reallocated count can live for years
                because modern disks ship with a reserve of spare sectors. The alarm condition is
                growth between samples, pending sectors appearing alongside it, or a failing
                self-test. Stable counters mean monitor closely; growing counters mean migrate.
              </p>
              <h3 className="text-lg font-bold">
                Why does smartctl report PASS while the drive is clearly failing?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The PASS line is computed from the manufacturer threshold table, and those tables
                are intentionally conservative and sometimes stale. The raw counters and the
                self-test log are far more sensitive. Always trend the raw values instead of
                trusting the summary when the drive misbehaves.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between Current_Pending_Sector and Reallocated_Sector_Count?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A pending sector has failed at least one read or write attempt and is waiting for a
                decision. A reallocated sector has already been declared bad and remapped to a spare
                region. Pending sectors are the earlier stage and therefore the more urgent leading
                indicator.
              </p>
              <h3 className="text-lg font-bold">Does TRIM fix a slow SSD?</h3>
              <p className="text-muted-foreground leading-relaxed">
                TRIM regains performance that was lost because deleted data still occupied NAND
                cells. If the SSD is slow because wear has been exhausted, TRIM will not restore it;
                the controller needs the erase budget that is already spent. Check the wear counters
                before assuming fstrim is the answer.
              </p>
              <h3 className="text-lg font-bold">How long does a ZFS or btrfs scrub take?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Roughly the time it takes to read the occupied space on the pool. A few terabytes
                usually complete in hours on a current server, and both filesystems let you check
                progress and cancel the job without harming the pool. Run scrubs at a low-traffic
                time and check for new errors after every run.
              </p>
              <h3 className="text-lg font-bold">Can SMART work on disks behind a USB enclosure?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Often, but not always. Some enclosures translate only block storage and drop the ATA
                pass-through commands that SMART uses. If smartctl reports an error, try the
                smartctl -d sat mode, which wraps the commands in a SCSI translation layer that many
                bridges accept. Some enclosures simply lack the bridge feature entirely.
              </p>
              <h3 className="text-lg font-bold">
                Is a failed long self-test a guaranteed disk failure?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Not guaranteed, but it is a confirmed media defect on at least one region of the
                platter. The drive firmware itself marked the test as failed. Continue using the
                disk only while you stage a replacement, and back up its contents first. The prudent
                operational answer is to replace it.
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
