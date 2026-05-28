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
  title: "Content Review Checklist | CM Regmi Docs",
  description:
    "A practical checklist for reviewing technical pages for accuracy, usefulness, clarity, and maintenance.",
  alternates: {
    canonical: `${SITE_URL}/docs/content-review-checklist`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Content Review Checklist | CM Regmi Docs",
    description: "A text-first checklist for reviewing technical pages.",
    url: `${SITE_URL}/docs/content-review-checklist`,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Content Review Checklist | CM Regmi Docs",
    description: "A practical checklist for technical page quality.",
    creator: "@cmregmi",
  },
};

export default function ContentReviewChecklistPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/content-review-checklist#article`,
    headline: "Content Review Checklist",
    description:
      "A practical checklist for reviewing technical pages for accuracy, usefulness, clarity, and maintenance.",
    url: `${SITE_URL}/docs/content-review-checklist`,
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
        id="content-review-checklist-schema"
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
                <BreadcrumbPage>Content Review Checklist</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-10">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              Review Standard
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Content Review Checklist
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
        <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
          <h2 className="text-2xl font-bold tracking-tight">Practical reviewer checklist and examples</h2>
          <p className="text-muted-foreground leading-relaxed">
            A reviewer should confirm the article's purpose, test examples, link integrity, and whether
            the maintenance note exists. If the article contains commands, the reviewer should run them
            in an isolated environment or request test output from the author.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Use a short, repeatable checklist in PRs: sanity test, link check, accessibility quick-scan,
            and accuracy confirmation by a subject-matter expert. Log the reviewer decisions in the PR.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For content that modifies system state (configs, scripts), require an automated verification
            job or a small runnable test that proves the steps complete as described.
          </p>
        </section>
              By <strong>CM Regmi</strong> • Published May 26, 2026
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              This checklist helps keep technical pages accurate, useful, and easy to maintain. It
              is built to turn vague guidance into reproducible steps, and to document verification
              tactics so future readers and reviewers can confirm results quickly.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Accuracy — concrete verification</h2>
            <p className="text-muted-foreground leading-relaxed">
              For every factual claim, include at least one reproducible verification step. If the
              page includes commands, run them in a disposable environment and paste trimmed output
              snippets or hash summaries so reviewers can match results.
            </p>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>Record the OS and versions used for testing (e.g., Ubuntu 22.04, Android 13).</li>
              <li>
                Prefer commands whose output is deterministic; where it is not, show how to
                normalize or parse the output for comparison.
              </li>
              <li>Annotate opinion vs. verifiable fact explicitly.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Usefulness — worked examples</h2>
            <p className="text-muted-foreground leading-relaxed">
              A useful article puts a working example first. Add a minimal, end-to-end example that
              achieves the stated outcome and a second, annotated version that explains each step.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`// Minimal verification example (bash)
mkdir -p /tmp/example && cd /tmp/example
echo 'hello' > testfile.txt
sha256sum testfile.txt
# expected: a 64-character hash followed by 'testfile.txt'`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Add expected outputs and common differences (timestamps, ephemeral IDs) so reviewers
              know which parts to ignore when comparing results.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Clarity & structure</h2>
            <p className="text-muted-foreground leading-relaxed">
              Use the predictable order: Summary → Requirements → Steps → Verification →
              Troubleshooting. Break sections into short paragraphs, and use bullet lists for
              actionable items.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Where steps require a particular permission or elevated privilege, call it out with a
              short badge (e.g., <strong>Requires sudo</strong> or <strong>Risk: Data Loss</strong>
              ).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Safety & responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              Place a prominent caution on any step that can delete data, modify security settings,
              or change network connectivity. Provide a short rollback or recovery snippet.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Rollback example (restic)
restic snapshots
# pick snapshot id
restic restore <snapshot-id> --target /restored`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Maintenance & metadata</h2>
            <p className="text-muted-foreground leading-relaxed">
              Add a visible `dateModified` and `tested-on` table. Use relative links to tools and
              upstream docs, and prefer parameterized examples rather than embedding secrets or
              hard-coded paths.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`Date-Modified: 2026-05-24
Tested-On: Ubuntu 22.04, Android 13
Author: CM Regmi`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Reviewer templates</h2>
            <p className="text-muted-foreground leading-relaxed">
              Use these short comments to speed up reviews — copy/paste and edit the specifics.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`[ACCURACY] Please verify the example on Ubuntu 22.04; the 'apt' output differs on 20.04.
[VERIFICATION] Add 'sha256sum' verification and expected hash for the example backup.
[CLARITY] Step 4 assumes the user mounted the device; add mount instructions or link.`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Common failure patterns & fixes</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                Summary-only pages — Fix: Add one full worked example plus verification steps.
              </li>
              <li>
                Unverified assertions — Fix: Run commands, capture outputs, and attach trimmed
                evidence or logs.
              </li>
              <li>
                Hidden assumptions (permissions, devices) — Fix: Add a requirements section and mark
                steps that need elevated privileges.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Accessibility & SEO quick checks</h2>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>All images need descriptive alt text.</li>
              <li>Tables should include summary or caption for screen readers.</li>
              <li>Code must be selectable text; don’t use screenshots for code examples.</li>
              <li>
                Include structured data where relevant (TechArticle schema is good for guides).
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Quick reviewer checklist</h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Primary claim reproducible: Yes / No</li>
              <li>Verification steps present: Yes / No</li>
              <li>Last-updated present: Date included</li>
              <li>Author contact: Present / Absent</li>
              <li>Accessibility: Images / Code blocks / Tables checked</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">How to act on failures</h2>
            <p className="text-muted-foreground leading-relaxed">
              If the page fails the verification pass, the reviewer should choose one of three
              outcomes: rewrite (add missing examples), flag for quick update (small fixes), or
              unpublish (content is misleading or risky). Document the decision and the steps the
              author must take before republishing.
            </p>
          </section>

          <section className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use this checklist together with the editorial standards page for the full review
                process. Prefer reproducible evidence over rhetorical confidence.
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
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="review-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
