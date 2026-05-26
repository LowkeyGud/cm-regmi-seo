import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export default function BrowserPrivacy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/browser-privacy#article`,
    headline: "Browser Privacy for Users",
    description: "Practical browser privacy controls and hygiene for everyday users.",
    url: `${SITE_URL}/docs/browser-privacy`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="browser-privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Browser Privacy for Users</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Browser privacy is about reducing unnecessary exposure: fewer trackers, tighter
          permissions, and a habit of reviewing extensions and site data. This guide gives concrete
          steps, example settings for major browsers, and verification methods.
        </p>

        <h2 className="text-xl font-semibold mt-6">Privacy settings examples</h2>
        <ul className="list-disc pl-6 text-muted-foreground">
          <li>
            Use strict tracking protection where available and review site permissions per-site.
          </li>
          <li>Limit extensions to a small, audited set (uBlock Origin, Cookie AutoDelete).</li>
          <li>Consider DNS-level filtering for system-wide protection (NextDNS, Pi-hole).</li>
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
