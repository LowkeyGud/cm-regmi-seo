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
  title: "Editorial Standards | CM Regmi Docs",
  description:
    "How the CM Regmi documentation library is selected, written, reviewed, corrected, and updated.",
  alternates: {
    canonical: `${SITE_URL}/docs/editorial-standards`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Editorial Standards | CM Regmi Docs",
    description: "Documentation standards, review rules, and update policy for the site.",
    url: `${SITE_URL}/docs/editorial-standards`,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Editorial Standards | CM Regmi Docs",
    description: "How the site's documentation is written and maintained.",
    creator: "@cmregmi",
  },
};

export default function EditorialStandardsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/editorial-standards#article`,
    headline: "Editorial Standards",
    description:
      "How the CM Regmi documentation library is selected, written, reviewed, corrected, and updated.",
    url: `${SITE_URL}/docs/editorial-standards`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="editorial-standards-schema"
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
                <BreadcrumbPage>Editorial Standards</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-10">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Documentation Policy
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">Editorial Standards</h1>
            <p className="text-sm text-muted-foreground mb-4">
              By <strong>CM Regmi</strong> • Published May 26, 2026
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              This page explains how the documentation library is selected, written, reviewed, and
              maintained. Its job is to show that the site contains original, useful, and
              maintainable material rather than thin summary content.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I keep these standards explicit because it is too easy for a site to drift into vague,
              repetitive writing once publishing gets faster. When I come back to a page, I want to
              know exactly what problem it solves and whether I would still stand behind it.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What qualifies for publication</h2>
            <p className="text-muted-foreground leading-relaxed">
              A page enters the library only when it answers a specific user problem. The content
              must be original, technically grounded, and written for a real reader who needs a
              decision, a procedure, or a clear explanation. Pages that merely repeat common search
              results, rephrase marketing copy, or restate a single paragraph in different words do
              not meet the standard.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Useful pages are narrow enough to be honest and deep enough to be useful. They
              distinguish between facts, recommendations, and opinions. They also say when advice
              depends on a device model, operating system version, or security policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">What is excluded</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>Copied summaries that do not add new explanation or context.</li>
              <li>Pages that rely on generic claims without a concrete procedure or example.</li>
              <li>Promotional pages that exist mainly to move a visitor to another click.</li>
              <li>
                Instructions that are unsafe, misleading, or missing a clear warning about risk.
              </li>
              <li>Content with no maintenance note, no scope, and no update policy.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">How a page is structured</h2>
            <p className="text-muted-foreground leading-relaxed">
              Each page should begin with the problem statement, then explain the relevant concepts
              in plain language, and finally provide a checklist or sequence the reader can follow.
              Where a page includes a recommendation, it should also explain why the recommendation
              exists and what trade-off it creates.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The site intentionally uses a text-first format. That keeps the pages fast, easy to
              scan, and easy to update. A useful guide does not need decorative images to prove its
              value; it needs clarity, consistency, and enough detail to be actionable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Update and correction policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every substantive page should carry a publication date and a last-updated date. When a
              recommendation changes, the page should be revised instead of silently left behind. If
              a mistake is found, it should be corrected directly in the page so the reader sees the
              current version, not a stale note.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If a page becomes outdated because a platform changed its behaviour, the page should
              be narrowed or rewritten rather than padded with extra words. A smaller accurate page
              is better than a larger one that is outdated or repetitive.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Reader promise</h2>
            <p className="text-muted-foreground leading-relaxed">
              The promise of this documentation library is simple: no filler, no copied fluff, and
              no pages that exist only to look busy. Each document should reduce uncertainty for the
              reader and make the next step obvious.
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you want to request a correction or propose a new page, use the contact page.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Contact Page
              </Link>
            </div>
          </section>
        </article>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="editorial-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
