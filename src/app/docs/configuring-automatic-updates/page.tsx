import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Configuring Automatic Updates | CM Regmi Docs",
  description:
    "Balancing timely updates with operational stability: strategies for automatic updates.",
  alternates: { canonical: `${SITE_URL}/docs/configuring-automatic-updates` },
};

export default function ConfiguringAutomaticUpdates() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/configuring-automatic-updates#article`,
    headline: "Configuring Automatic Updates",
    description:
      "Balancing timely updates with operational stability: strategies for automatic updates.",
    url: `${SITE_URL}/docs/configuring-automatic-updates`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="autoup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Configuring Automatic Updates</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Automatic updates reduce exposure to known vulnerabilities but can introduce regressions.
          Use staged rollouts, maintenance windows, and clear rollback plans for critical systems.
        </p>
        <p className="text-muted-foreground mb-4">
          I usually prefer automatic updates on systems that can tolerate a restart, because
          security patches tend to matter more than waiting for the perfect manual window. The part
          I watch most closely is whether the system still comes back cleanly after the update
          lands.
        </p>

        <h2 className="text-xl font-semibold mt-6">Staged rollouts and gating</h2>
        <p className="text-muted-foreground">
          Apply updates first to a small canary group to catch regressions before the wider fleet
          receives them. Use metrics and health checks to gate further rollout. Examples of health
          gates include HTTP 200 checks, DB connectivity, and critical log error thresholds.
        </p>

        <h2 className="text-xl font-semibold mt-6">Example: Debian/Ubuntu unattended-upgrades</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`// /etc/apt/apt.conf.d/50unattended-upgrades
Unattended-Upgrade::Allowed-Origins {
    "${distro}:${release}";
};
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          Outcome: systems will install security updates and reboot during the maintenance window.
          Verify with `sudo unattended-upgrade --dry-run` and check logs in
          /var/log/unattended-upgrades/.
        </p>

        <h2 className="text-xl font-semibold mt-6">Example: systemd timer for package updates</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# /etc/systemd/system/apt-update.service
[Unit]
Description=Run apt-get update and upgrade

[Service]
Type=oneshot
ExecStart=/usr/bin/apt-get update && /usr/bin/apt-get -y upgrade

# /etc/systemd/system/apt-update.timer
[Unit]
Description=Run apt update daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          Outcome: a timed, auditable update run. Combine with a pre-update snapshot to enable quick
          rollback.
        </p>

        <h2 className="text-xl font-semibold mt-6">Rollback strategies</h2>
        <p className="text-muted-foreground mb-4">
          Always have a tested rollback: filesystem snapshot (LVM, ZFS), VM snapshot, or package
          pinning. Example: create an LVM snapshot before updates and destroy it only after the
          canary passes.
        </p>

        <h2 className="text-xl font-semibold mt-6">Example webhook alert for failed updates</h2>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`#!/usr/bin/env bash
# simple notifier to call a webhook when updates fail
if ! /usr/bin/apt-get -y upgrade; then
  curl -X POST -H 'Content-Type: application/json' -d '{"text":"Update failed on host $(hostname)"}' https://hooks.example.com/updates
fi`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Verification and monitoring</h2>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>Validate updates using canary metrics and health-check thresholds.</li>
          <li>Monitor logs, boot times, and critical service endpoints for regressions.</li>
          <li>Run smoke-tests automatically after each update to confirm essential flows.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Desktop & macOS updates</h2>
        <p className="text-muted-foreground mb-4">For macOS use `softwareupdate` for automation:</p>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# List updates
softwareupdate -l
# Install recommended
softwareupdate -i -r`}</code>
        </pre>

        <h2 className="text-xl font-semibold mt-6">Windows update considerations</h2>
        <p className="text-muted-foreground mb-4">
          Use WSUS or Windows Update for Business to stage updates. Test updates in a pilot group
          and use System Restore or image-based rollbacks in environments where snapshotting is not
          available.
        </p>

        <h2 className="text-xl font-semibold mt-6">Operational checklist</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>Create pre-update snapshots for critical systems.</li>
          <li>
            Run updates on canary machines and observe metrics for at least one business cycle.
          </li>
          <li>Widen the rollout only when health gates are satisfied.</li>
          <li>Document any manual steps and update runbooks for the next incident.</li>
        </ol>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Examples & commands</h2>
          <p className="text-muted-foreground">
            Practical commands and a short example help engineers reproduce and verify the behaviour
            quickly.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Quick example
echo "verify service"`}</code>
          </pre>
          <h3 className="text-lg font-semibold">Verification & outcomes</h3>
          <p className="text-muted-foreground">
            After applying a change, measure the outcome and record whether the problem improved.
            Keep the verification script committed with the docs.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Run the verification script</li>
            <li>Confirm expected output</li>
            <li>Log results and next steps</li>
          </ul>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="autoup-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
