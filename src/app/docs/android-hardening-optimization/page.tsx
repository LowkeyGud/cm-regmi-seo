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
  title: "Android Hardening & Optimization Guide | CM Regmi",
  description: "Advanced enterprise-grade mobile systems security, OEM bloatware pruning, background service tuning, and battery diagnostics.",
  alternates: { canonical: `${SITE_URL}/docs/android-hardening-optimization` },
};

export default function AndroidHardeningOptimization() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/android-hardening-optimization#article`,
    headline: "Android Systems Hardening & Optimization Guide",
    description: "Deep-dive guide to securing and optimizing enterprise Android deployments without root permissions.",
    url: `${SITE_URL}/docs/android-hardening-optimization`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-27",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="android-opt-schema"
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
                <BreadcrumbPage>Android Hardening & Optimization</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Enterprise Mobility
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Android Systems Hardening & Optimization
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 26, 2026 • Updated May 27, 2026
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Operating enterprise Android fleets requires a disciplined balance between user productivity, 
              hardware durability, and operational data security. This manual details standard non-root 
              procedures to minimize attack surfaces, optimize CPU/memory constraints, and diagnose 
              hardware metrics.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Attack Surface Reduction & OEM Bloatware Scoping</h2>
            <p className="text-muted-foreground leading-relaxed">
              Commercial Android devices ship with pre-installed carrier and OEM applications that operate outside 
              standard enterprise scopes. These applications consume background cycles, execute telemetry tracking, 
              and expand the system's overall threat posture. Stripping these packages preserves physical RAM 
              headroom and limits data leakage channels.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Using the Android Debug Bridge (ADB), administrators can safely uninstall packages for the primary user 
              without modification of the system partition. This ensures the physical device remains securely inside its 
              cryptographic integrity state (preserving Android Verified Boot and safety baselines) while eliminating 
              background noise.
            </p>
            
            <h3 className="text-lg font-bold">Safe Package Auditing Methodology</h3>
            <p className="text-muted-foreground leading-relaxed">
              Before deploying audit scripts, connect a target terminal and generate a clean list of all package names 
              associated with the current user:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Generate a raw package inventory
adb shell pm list packages --user 0

# Filter package list to identify non-essential vendor packages
adb shell pm list packages --user 0 | grep -E 'carrier|telemetry|oem|analytics'`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Once non-essential packages are categorized, apply clean purging loops. The target code disables the 
              association of the package for User 0, immediately halting execution and clearing caches:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Disable and uninstall package for the default system user
adb shell pm uninstall -k --user 0 com.oem.telemetry.tracker
# Result: "Success" printed, background process terminated immediately

# Re-enable a packaged component if dynamic regression is identified
adb shell cmd package install-existing com.oem.telemetry.tracker`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Hardening Userland Permissions & Security Policies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Modern Android architectures isolate applications using distinct Linux User IDs (UIDs). However, application 
              designers frequently request broad runtime permissions (e.g., background location, external storage, contacts). 
              For enterprise environments, enforce strict scoping rules:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Background Location Stripping:</strong> Never permit apps to read coarse or fine location coordinates 
                outside foreground usage boundaries.
              </li>
              <li>
                <strong>Sensors and Camera Scoping:</strong> Audit high-risk peripheral access. Limit microphone and camera 
                permissions to real-time interactive tasks.
              </li>
              <li>
                <strong>API Boundaries:</strong> Ensure enterprise apps target newer API configurations (API Level 34+), 
                preventing downgrade attacks that exploit older, permissive package managers.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Using standard ADB terminal commands, security administrators can programmaticlly verify app capability bounds 
              and instantly revoke broad permissions:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query specific granted permissions for a target app
adb shell dumpsys package com.enterprise.fieldapp | grep -A 10 "requested permissions"

# Programmatically revoke background location from a target app
adb shell pm revoke com.enterprise.fieldapp android.permission.ACCESS_BACKGROUND_LOCATION`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. Battery Wear Diagnostics & Thermal Management</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lithium-ion wear is governed heavily by ambient operational temperature, charge cycles, and voltage states. 
              Degraded batteries display severe state-of-charge jumps or drop voltage below critical operational limits 
              under processor load, causing random soft-reboots.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Administrators should collect raw statistics directly from the battery controller subclass. Use the standard 
              diagnostics module to read current temperature, voltage levels, charge counts, and estimated health indexes:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query the real-time battery status interface
adb shell dumpsys battery

# Example Dumpsys Output Analysis:
#   AC powered: false
#   USB powered: true
#   status: 2 (Charging)
#   health: 2 (Good)
#   present: true
#   level: 82 (Percentage)
#   scale: 100
#   temp: 312 (31.2 degrees Celsius - keep under 40 degrees)
#   voltage: 4102 (4.102 Volts - watch for drops below 3.4V)`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              If devices operate continuously inside hot environments (e.g., delivery vehicle mounts), cap the charge limits 
              at 80% using custom power supplies or MDM-level profiles to reduce lithium degradation and gas-buildup risks.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Case Study: Mitigating System Freeze & Memory Exhaustion</h2>
            <p className="text-muted-foreground leading-relaxed">
              An enterprise client deploying field tablets faced persistent system freezes and high application reload latency 
              during customer interactions. We initiated a profiling sequence using the system memory utility interface to 
              inspect the allocation of physical memory:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Inspect global RAM metrics and swap files
adb shell dumpsys meminfo

# Output indicated:
#   Total RAM: 3,840 MB
#   Free RAM: 180 MB (Extremely low)
#   Cached RAM: 450 MB
#   Used RAM: 3,210 MB (Large background OEM packages active)`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The diagnostics showed that three pre-installed social and marketing apps were spawning persistent background 
              daemons, forcing the system's Low Memory Killer (LMK) to constantly terminate the primary enterprise database app. 
              By purging these OEM packages via User-0 ADB loops and restricting background executions, the baseline free RAM 
              increased to 950 MB, resolving system freeze incidents and cutting reload delays to zero.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Verification & Fleet Enforcement Playbook</h2>
            <p className="text-muted-foreground leading-relaxed">
              Verify compliance sitewide by creating automated sanity audit scripts that can be integrated into staging builds. 
              The checklist below outlines verification tasks:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Step A:</strong> Check package inventory to verify zero banned packages are active.
              </li>
              <li>
                <strong>Step B:</strong> Query location permissions to confirm no active permissions for userland apps.
              </li>
              <li>
                <strong>Step C:</strong> Review temperature profiles to ensure operating thermal boundaries are maintained.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Ensure regular diagnostic passes are automated on the devices during local charge windows, forwarding telemetry 
              securely to your centralized systems monitoring interface.
            </p>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </article>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">Device profiling, diagnostics & automation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Before deploying broad changes, profile a representative device and capture a reproducible
          diagnostic bundle (battery metrics, memory footprint, running services, and package
          inventory). Automate these collection steps so verification becomes a predictable gate
          in your staging pipeline.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Example collection steps: run dumpsys battery, dumpsys meminfo, and list packages for user 0;
          save the outputs and compare them against a golden baseline for the same device family.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          When scripting ADB operations, always run in audit mode first and inspect the candidate list
          before applying removals. Promote changes to production only after a 24-hour soak test in
          a staging ring and automated verification of health metrics.
        </p>

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="android-hardening-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
