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
  title: "Technical Writing Workflow | CM Regmi Docs",
  description:
    "A practical workflow for researching, drafting, verifying, and maintaining technical documentation.",
  alternates: {
    canonical: `${SITE_URL}/docs/technical-writing-workflow`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Technical Writing Workflow | CM Regmi Docs",
    description: "A text-first workflow for reliable technical writing.",
    url: `${SITE_URL}/docs/technical-writing-workflow`,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Technical Writing Workflow | CM Regmi Docs",
    description: "How to write technical guides that stay useful over time.",
    creator: "@cmregmi",
  },
};

export default function TechnicalWritingWorkflowPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/technical-writing-workflow#article`,
    headline: "Technical Writing Workflow",
    description:
      "A practical workflow for researching, drafting, verifying, and maintaining technical documentation.",
    url: `${SITE_URL}/docs/technical-writing-workflow`,
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
        id="technical-writing-workflow-schema"
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
                <BreadcrumbPage>Technical Writing Workflow</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-10">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Writing Process
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Technical Writing Workflow
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              By <strong>CM Regmi</strong> • Published May 26, 2026
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              A useful document is built by process, not by luck. This page describes a simple
              workflow for turning a technical idea into a page that stays accurate after the first
              publish.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Define the reader and the job</h2>
            <p className="text-muted-foreground leading-relaxed">
              Before writing, decide who the page is for and what decision it should help them make.
              A guide for beginners should define terms and avoid assumptions. A guide for advanced
              readers can move faster, but it still needs enough context to be understood without
              guessing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Gather evidence first</h2>
            <p className="text-muted-foreground leading-relaxed">
              Good technical content is not built from memory alone. Gather notes, test results,
              screenshots if they are actually necessary, version numbers, and any error messages
              that matter. The point is to write from observable facts instead of vibes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Write the outline before the prose
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A strong outline keeps the page from becoming a pile of disconnected paragraphs. A
              useful structure often looks like this: problem statement, prerequisites, explanation,
              step sequence, verification, trade-offs, and maintenance note. Not every page needs
              the same shape, but every page needs a shape.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Keep the prose specific</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>Use concrete nouns instead of vague phrases.</li>
              <li>Say exactly what changed, not just that something was improved.</li>
              <li>Use examples when they remove ambiguity rather than adding filler.</li>
              <li>Separate recommendation from observation so the reader can see the reasoning.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Add verification</h2>
            <p className="text-muted-foreground leading-relaxed">
              Verification is what turns an opinion into a document the reader can trust. If the
              page describes a setting change, include what should be checked after the change. If
              the page compares two options, say how the comparison was made. If the page warns
              about a risk, make the risk explicit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. Review for maintenance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Technical pages do not stay correct on their own. They need version numbers, update
              dates, and periodic review. When something changes upstream, the page should be
              updated or narrowed instead of kept alive by filler text.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">A reusable article template</h2>
            <div className="rounded-xl border border-border bg-muted/30 p-6 text-muted-foreground">
              <p className="font-semibold text-foreground">Template:</p>
              <p>Problem - context - steps - verification - caveats - update note.</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              That template is intentionally simple. Simplicity helps because it makes the page easy
              to scan, easy to maintain, and easy to expand without losing the original point.
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you want the broader content standards behind this process, read the editorial
                policy page.
              </p>
              <Link
                href="/docs/editorial-standards"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Editorial Standards
              </Link>
            </div>
          </section>
        </article>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Verification guidance</h2>
          <p className="text-muted-foreground">
            Prefer concrete, article-specific verification steps. For writing workflow pages,
            reviewers should run the QA checklist: confirm reproducibility, validate command
            outputs in an isolated environment, and ensure the article includes a maintenance note.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Run the documented examples in a disposable VM matching the stated OS.</li>
            <li>Confirm outputs match expected hashes or deterministic results.</li>
            <li>Record test environment metadata (OS, versions, and timestamps) with results.</li>
          </ul>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="writing-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
