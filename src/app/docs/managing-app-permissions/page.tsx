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
  title: "Managing App Permissions on Android | CM Regmi",
  description:
    "Complete enterprise guide to Android app permission management, including runtime permissions, special access controls, ADB permission auditing, and security best practices for organizational device deployments.",
  alternates: { canonical: `${SITE_URL}/docs/managing-app-permissions` },
};

export default function ManagingAppPermissions() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/managing-app-permissions#article`,
    headline: "Managing App Permissions on Android: Enterprise Security Guide",
    description:
      "Comprehensive guide to Android permission models, runtime permission handling, special access controls, and automated permission auditing for enterprise device management without root permissions.",
    url: `${SITE_URL}/docs/managing-app-permissions`,
    datePublished: "2026-08-11",
    dateModified: "2026-08-11",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="managing-app-permissions-schema"
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
                <BreadcrumbPage>Managing App Permissions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Enterprise Mobility • Security & Privacy
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Managing App Permissions on Android
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published August 11, 2026
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Android app permissions represent the primary security boundary between applications
              and sensitive user data. This comprehensive guide covers the Android permission model,
              runtime permission handling, special access controls, ADB-based permission auditing,
              and enterprise strategies for maintaining secure device configurations across
              organizational fleets without requiring root access.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Understanding the Android Permission Model
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Android employs a sandbox-based security model where each application runs in its own
              isolated process with a unique user ID. Permissions grant apps controlled access to
              protected system features and user data outside their sandbox. Understanding this
              model is essential for enterprise administrators responsible for securing device
              fleets against data leakage and unauthorized access.
            </p>

            <h3 className="text-lg font-bold">Permission Protection Levels</h3>
            <p className="text-muted-foreground leading-relaxed">
              Android categorizes permissions into four protection levels, each with distinct grant
              mechanisms and security implications. Normal permissions pose minimal risk to user
              privacy or device operation. These include network access, vibration control, and
              setting the device wallpaper. Apps automatically receive normal permissions at install
              time without user interaction, as they cannot access sensitive data or affect other
              applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dangerous permissions grant access to sensitive user data or device capabilities that
              could impact user privacy or device functionality. Examples include camera access,
              location services, contacts, SMS, microphone, and external storage. Starting with
              Android 6.0 (API level 23), dangerous permissions require explicit user approval at
              runtime, even if declared in the app manifest. Users can grant or deny individual
              dangerous permissions through system dialogs or settings menus.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Signature permissions are granted only to apps signed with the same certificate as the
              app that declared the permission. This protection level enables secure communication
              between related applications from the same developer while preventing third-party apps
              from accessing privileged functionality. System-level signature permissions protect
              critical OS features from unauthorized modification.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`Android Permission Protection Levels:

Normal Permissions (Auto-granted):
  - ACCESS_NETWORK_STATE - Check network connectivity
  - VIBRATE - Control device vibration
  - SET_WALLPAPER - Set device wallpaper
  - INTERNET - Full network access
  - BLUETOOTH - Pair with Bluetooth devices
  - WAKE_LOCK - Prevent device sleep
  
Dangerous Permissions (Runtime approval required):
  - CAMERA - Take photos and record videos
  - READ_CONTACTS - Access contact database
  - ACCESS_FINE_LOCATION - Precise GPS location
  - READ_SMS - Read text messages
  - RECORD_AUDIO - Record audio via microphone
  - READ_EXTERNAL_STORAGE - Read shared storage
  - PHONE - Access phone state and identity
  
Signature Permissions (Same-signer only):
  - BIND_NOTIFICATION_LISTENER_SERVICE
  - PACKAGE_USAGE_STATS
  - REAL_GET_TASKS
  - MANAGE_ACCOUNTS
  
Privileged/System Permissions (System image only):
  - DELETE_PACKAGES - Delete installed apps
  - DEVICE_POWER - Control device power states
  - MODIFY_PHONE_STATE - Modify phone configuration`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Runtime Permission Handling</h2>
            <p className="text-muted-foreground leading-relaxed">
              Android 6.0 introduced the runtime permission model, fundamentally changing how apps
              request and users grant dangerous permissions. This shift empowers users to make
              contextual decisions about permission grants while requiring developers to implement
              graceful degradation when permissions are denied.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When an app requires a dangerous permission, it must first check whether the
              permission has already been granted using ContextCompat.checkSelfPermission(). If the
              permission is not granted, the app requests it by calling
              ActivityCompat.requestPermissions(), which triggers a system dialog presenting the
              permission rationale to the user.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`// Java: Runtime Permission Request Pattern
if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
        != PackageManager.PERMISSION_GRANTED) {
    if (ActivityCompat.shouldShowRequestPermissionRationale(this,
            Manifest.permission.CAMERA)) {
        showCameraPermissionRationale();
    } else {
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.CAMERA},
                REQUEST_CAMERA_PERMISSION);
    }
} else {
    initializeCamera();
}`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. Special App Access</h2>
            <p className="text-muted-foreground leading-relaxed">
              Beyond standard runtime permissions, Android maintains several categories of special
              access that require explicit user navigation through system settings. Usage stats
              permission grants apps access to detailed information about app usage patterns.
              Notification access allows apps to read and respond to notifications on behalf of the
              user. Device Administrator privileges grant extensive control over device security
              policies.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# ADB commands for special permissions
adb shell pm grant com.example.app android.permission.PACKAGE_USAGE_STATS
adb shell pm revoke com.example.app android.permission.PACKAGE_USAGE_STATS
adb shell dpm set-device-owner --name com.enterprise.mdm/.DeviceAdminReceiver`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. ADB Permission Auditing</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Android Debug Bridge provides enterprise administrators with powerful tools for
              auditing and managing app permissions across device fleets. The dumpsys package
              command outputs comprehensive permission information for installed apps.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# List all permissions granted to a specific app
adb shell dumpsys package com.example.app | grep -A 50 "granted=true"

# Find all apps with CAMERA permission
adb shell pm list permissions -g | grep -B 5 "android.permission.CAMERA"

# Grant/revoke permissions
adb shell pm grant com.example.app android.permission.CAMERA
adb shell pm revoke com.example.app android.permission.CAMERA`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Enterprise Strategies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Organizations deploying Android devices at scale need systematic approaches to
              permission management. Establish baseline policies defining acceptable permissions for
              different device roles. Implement automated compliance monitoring scripts. Provide
              user training on recognizing dangerous permission requests.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. Troubleshooting</h2>
            <p className="text-muted-foreground leading-relaxed">
              Common issues include app crashes after permission denial, permissions resetting after
              updates, and ghost permissions from uninstalled apps. Use ADB logcat to identify
              permission-related crashes. Reset permissions using adb shell pm reset-permissions
              when needed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">7. FAQ</h2>
            <h3 className="text-lg font-bold">Q: Can I permanently block permission requests?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Android does not provide native functionality to permanently block permission
              requests, but repeatedly denying will cause apps to stop asking. MDM solutions can
              enforce policies.
            </p>
            <h3 className="text-lg font-bold">Q: How often should I review permissions?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Quarterly reviews work for most users. Enterprise environments benefit from monthly
              audits.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Effective Android permission management requires understanding the permission model,
              implementing systematic auditing, and maintaining user awareness. Enterprise
              administrators equipped with ADB tools and clear policies can secure device fleets
              while enabling productive application usage.
            </p>
          </section>

          <AdsSlot />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
