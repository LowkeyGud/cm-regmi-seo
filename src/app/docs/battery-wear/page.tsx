import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Understanding Battery Wear | CM Regmi Docs",
  description: "Practical notes on battery wear, calibration, and expectations for mobile devices.",
  alternates: { canonical: `${SITE_URL}/docs/battery-wear` },
};

export default function BatteryWear() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/battery-wear#article`,
    headline: "Understanding Battery Wear",
    description: "Practical notes on battery wear, calibration, diagnostics and replacement.",
    url: `${SITE_URL}/docs/battery-wear`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="battery-wear-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Understanding Battery Wear</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Battery capacity decreases with charge cycles and time. Modern lithium-ion cells decline
          predictably; proper charging habits and thermal control extend useful life but cannot
          prevent gradual wear. This guide explains how to diagnose wear, what to expect, and how to
          choose between further diagnostics and replacement.
        </p>

        <h2 className="text-xl font-semibold mt-6">How to measure battery health</h2>
        <p className="text-muted-foreground mb-4">
          Start with the device-provided diagnostics where available, then run independent checks.
          Below are commands for common platforms that yield design capacity, full charge capacity,
          and cycle counts.
        </p>

        <h3 className="text-lg font-semibold mt-4">Linux (upower / sysfs)</h3>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Find the battery device
upower -e
# Example output includes /org/freedesktop/UPower/devices/battery_BAT0
upower -i /org/freedesktop/UPower/devices/battery_BAT0 | egrep 'percentage|energy-full|energy-full-design|cycle-count'
# Or read sysfs
cat /sys/class/power_supply/BAT0/energy_full
cat /sys/class/power_supply/BAT0/energy_full_design
cat /sys/class/power_supply/BAT0/cycle_count`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          Outcome: compute health percent = (energy_full / energy_full_design) * 100. Under 80% is
          commonly considered degraded for mobile batteries used daily; under 60% is a clear
          candidate for replacement in many workflows.
        </p>

        <h3 className="text-lg font-semibold mt-4">Android (adb)</h3>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Requires adb and an unlocked device
adb shell dumpsys battery
dumpsys battery | egrep 'level|status|health|capacity|chargeCounter'
# Some devices provide battery capacity or chargeCounter that can be used to estimate health`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          Outcome: compare reported capacity and cycle behaviour to vendor specs. If the device
          reports a dramatically lower 'capacity' value, consider calibration and then replacement.
        </p>

        <h3 className="text-lg font-semibold mt-4">Windows</h3>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Run in an elevated PowerShell session
powercfg /batteryreport /output C:\\battery-report.html
# Open the generated HTML and inspect 'Design Capacity' vs 'Full Charge Capacity'`}</code>
        </pre>
        <p className="text-muted-foreground leading-relaxed">
          Outcome: the battery report shows trends and cycle counts. If full charge capacity is
          significantly below design capacity, plan replacement after backing up important data.
        </p>

        <h2 className="text-xl font-semibold mt-6">Calibration, what it can and cannot do</h2>
        <p className="text-muted-foreground mb-4">
          Calibration attempts to resync the reported percentage with the actual capacity. It
          involves a full charge and controlled discharge but does not restore lost chemical
          capacity. Use calibration to improve reporting accuracy before deciding on replacement.
        </p>

        <h2 className="text-xl font-semibold mt-6">Practical troubleshooting checklist</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>Record current health percentage and cycle count.</li>
          <li>Ensure the device is updated and no runaway process is causing heat.</li>
          <li>
            Run a calibration cycle (full charge → full discharge → full charge) and re-measure.
          </li>
          <li>If health remains low, evaluate replacement options and trusted sources.</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">Replacement planning and verification</h2>
        <p className="text-muted-foreground mb-4">
          Before replacing a battery, verify the part number, back up user data, and test the new
          battery to ensure charging and temperature behaviour are restored. After replacement,
          rerun the initial diagnostics and confirm health percentage approaches vendor spec.
        </p>

        <h2 className="text-xl font-semibold mt-6">Case study: laptop battery recovery</h2>
        <p className="text-muted-foreground mb-4">
          I diagnosed a laptop that dropped from 5 hours runtime to 2 hours over several months. The
          Linux sysfs readings showed energy_full at 30Wh vs design 62Wh (~48% health). After trying
          calibration (which did not materially change the percentage) I replaced the battery with a
          vendor part. The new pack reported 96% health and restored expected runtime. The honest
          outcome was replacement, not further tuning.
        </p>

        <h2 className="text-xl font-semibold mt-6">Quick safety checklist before hardware work</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Back up data and verify the backup's integrity.</li>
          <li>Power down and disconnect the device from mains before opening it.</li>
          <li>Use anti-static precautions and follow manufacturer repair guides.</li>
        </ul>

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
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="battery-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
