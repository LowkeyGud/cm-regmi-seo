import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Managing App Permissions | CM Regmi Docs",
  description: "Principles for reviewing and limiting app permissions on mobile and desktop.",
  alternates: { canonical: `${SITE_URL}/docs/managing-app-permissions` },
};

export default function ManagingAppPermissions() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/managing-app-permissions#article`,
    headline: "Managing App Permissions",
    description: "Principles for reviewing and limiting app permissions on mobile and desktop.",
    url: `${SITE_URL}/docs/managing-app-permissions`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="permissions-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Managing App Permissions</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>
        <p className="text-muted-foreground mb-4">
          Limit permissions to the minimum required for the app's stated function. Revoke unused
          permissions and audit new apps before granting broad access.
        </p>
        <h2 className="text-xl font-semibold mt-6">Platform-specific checks</h2>
        <p className="text-muted-foreground mb-4">
          On Android, open Settings → Apps → Permissions and use one-time grants where available. On
          iOS, review permissions in Settings → Privacy.
        </p>
        <h2 className="text-xl font-semibold mt-6">Verification steps</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>List permissions for a target app and capture the values.</li>
          <li>Revoke a non-essential permission and exercise the app feature that uses it.</li>
          <li>Confirm whether the app degrades gracefully or requests the permission again.</li>
          <li>Log the outcome and revert if a critical feature breaks unexpectedly.</li>
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
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="permissions-1" />
      </section>
      <SiteFooter />
    </div>
  );
}
