import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Android Device Maintenance | CM Regmi Docs",
  description:
    "Practical Android maintenance advice covering storage, battery health, logs, and resets.",
  alternates: { canonical: `${SITE_URL}/docs/android-device-maintenance` },
};

export default function AndroidDeviceMaintenance() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/android-device-maintenance#article`,
    headline: "Android Device Maintenance",
    description:
      "Practical Android maintenance advice covering storage, battery health, logs, and resets.",
    url: `${SITE_URL}/docs/android-device-maintenance`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="android-maintenance-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Android Device Maintenance</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Good maintenance keeps Android devices predictable: leave storage headroom, watch battery
          health, and avoid piling on background-heavy apps.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Storage and backup discipline</h2>
          <p className="text-muted-foreground leading-relaxed">
            Storage health matters because a nearly full device has less room for updates, caches,
            and temporary files. Use a simple backup job to copy important folders off-device.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Sync DCIM to a backup folder
rsync -a --delete /sdcard/DCIM/ /backup/android/dcim/
# Verify copied files with a checksum or spot-check`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Battery wear signals</h2>
          <p className="text-muted-foreground leading-relaxed">
            If the battery percentage drops quickly or the device shuts down above 10%, check wear
            before changing software settings. Battery health below about 80% is often a hardware
            signal rather than a tuning problem.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Diagnostics and logs</h2>
          <p className="text-muted-foreground leading-relaxed">
            Collect a short timeline: battery stats, system logs, and a list of recently installed
            apps. Reproduce the behaviour while logging so you can correlate spikes with usage.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Note the time and exact symptom.</li>
            <li>
              Run <code>adb bugreport</code> or <code>dumpsys</code> and save the output.
            </li>
            <li>Reproduce the behaviour for 10 to 20 minutes while logging.</li>
            <li>Correlate wake locks and background sync with the spike.</li>
          </ol>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Safe factory reset and validation</h2>
          <p className="text-muted-foreground leading-relaxed">
            If the device remains unreliable after targeted fixes, a factory reset can restore a
            clean baseline. After the reset, install only the apps you need and monitor behaviour
            for a few days before restoring large photo libraries.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-2xl font-bold tracking-tight">Quick checklist</h2>
          <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
            <li>Keep at least 10 to 15 percent free storage.</li>
            <li>Review the battery screen when drain feels unusual.</li>
            <li>Remove apps you no longer use or trust.</li>
            <li>Back up photos before a major reset or migration.</li>
          </ul>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="android-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
