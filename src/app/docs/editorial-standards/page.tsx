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
    datePublished: "2025-05-24",
    dateModified: "2025-05-24",
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
              By <strong>CM Regmi</strong> • Published May 26, 2025
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

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Review rules for reviewers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every page that reaches the library passes through a review gate before publication.
              The review is not a formality; it is the point at which the standards on this page are
              actually enforced. A reviewer checks four things in order: accuracy, usefulness,
              clarity, and maintenance. If any of the four fails, the page does not ship in its
              current form.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Accuracy is the most expensive check because it can require running commands. A
              reviewer who cannot verify a claim should ask the author for a reproduction log rather
              than approving on trust. Usefulness means the page solves the problem it promises to
              solve, with a worked example a reader can follow. Clarity is about structure: the page
              should be scannable and each step should be obvious. Maintenance means the page
              carries a date, a scope, and a note about when it should be revisited.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The reviewer records a decision in the pull request, and the decision is either a
              clear approve, a request for changes with specific items, or a hold because the
              content needs a subject-matter expert. A vague comment like "this needs polish" is not
              acceptable; every request must name the failing item and the change required. This
              keeps the review loop honest and makes the standards auditable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Example: enforcing a style rule in practice
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A concrete example shows how a standard moves from a rule on this page to a fixed page
              in the library. A draft for a backup guide opened with the sentence: "Backups are
              important for your data." A reviewer flagged it because it states the obvious and adds
              nothing a reader can act on. Under the usefulness and originality standards on this
              page, the sentence did not earn its place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The author replaced it with: "If your storage drive fails, a local copy on a second
              physical disk is the fastest way to restore service." The revision names the failure,
              the method, and the benefit, and it gives the reader a reason to keep reading. The
              edited opening was also shorter, which supported the site's text-first, no-filler
              promise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical outcome was visible in reader behaviour. The revised page held readers
              longer and produced fewer "where do I start" questions in the feedback form. It also
              made future edits faster, because each section started from a concrete claim instead
              of a decorative sentence. This is the kind of small, repeatable correction that the
              standards are designed to produce across the whole library.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This example also illustrates a cross-check between the editorial standards and the
              content review checklist. The opening rewrite satisfied the usefulness check on the
              checklist, and it followed the no-filler rule on this page. The two documents are
              meant to be used together: the standards define the rules, and the checklist provides
              the step-by-step way to enforce them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Using a linter to keep style consistent
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Enforcing style by hand is slow and inconsistent. The library uses a small set of
              automated checks so that the mechanical parts of the standards are applied the same
              way on every page. A linter catches inconsistent headings, list formatting, and
              trailing whitespace before a human reviewer ever reads the draft.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Run a style check on a single draft
npx markdownlint "docs/draft-guide.md" --config .markdownlint.json

# Fail CI when any page violates the style rules
npx markdownlint "docs/**/*.md" --config .markdownlint.json`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Automation does not replace the reviewer's judgment about meaning or safety, but it
              does remove the low-value arguments about formatting. When the mechanical checks pass,
              the human reviewer can spend attention on the questions that matter: whether the
              content is accurate, useful, and honest. This division keeps the review loop fast and
              the standards consistent.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/usr/bin/env bash
# basic-stats.sh - report readability and freshness for a draft
DOC="\${1:?usage: basic-stats.sh <file.md>}"
echo "words: \$(wc -w < "\$DOC")"
grep -n "dateModified\|Updated:" "\$DOC" && echo "has update date" || echo "MISSING update date"
grep -nE '^#{2,3} ' "\$DOC" | head -20`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              How standards map to the rest of the library
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The editorial standards do not exist in isolation. They are the top layer of a set of
              documents that govern how the library is written and maintained. The content review
              checklist turns these rules into a step-by-step pass, and the documentation QA
              framework provides the lifecycle and verification methodology behind both.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When these documents are read together, a clear picture emerges. The standards decide
              what is worth publishing. The checklist decides how to check a specific page against
              the standards. The QA framework decides how to verify commands and keep pages fresh
              over time. Together they explain not only what the library contains, but why a reader
              can trust it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This layered approach is deliberate. Separating the "why" from the "how" keeps each
              document short and focused. A new contributor can read the standards once to learn the
              principles, then consult the checklist and framework when they need the mechanical
              detail. That structure mirrors how the technical content on this site is written:
              start with the problem, then provide the steps.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The same layered approach extends to the technical content pages themselves. A guide
              about managing application permissions follows the same problem-first shape as a guide
              about interpreting system logs, even though the topics are unrelated. That consistency
              is not accidental; it is the result of applying these standards uniformly across the
              library, and it is what lets a regular reader move confidently between very different
              topics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When the standards are applied to technical pages, the cross-links between them also
              follow the review rules. Every link must point to a page that genuinely helps the
              reader continue their task, not to a page that merely mentions the same keyword. This
              keeps the site's internal links useful and prevents a page from turning into a hub of
              low-value navigation.
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                The standards on this page work together with the operational documents that govern
                the rest of the library. Open the review checklist to enforce a single page, or the
                QA framework for the full verification lifecycle and runnable automation recipes.
              </p>
              <Link
                href="/docs/content-review-checklist"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Content Review Checklist
              </Link>
              <Link
                href="/docs/documentation-qa-framework"
                className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Documentation QA Framework
              </Link>
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Readers also benefit from this consistency. Once a reader learns that every page
              follows the same shape, they can scan any new page quickly because they know where the
              requirements, steps, and warnings will appear. Predictable structure reduces the
              reader's effort, which is precisely the goal the reader promise sets out. A library
              that behaves the same way on every page builds trust through familiarity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting the standards</h2>
            <p className="text-muted-foreground leading-relaxed">
              Even with clear rules, teams hit predictable problems. The first is scope creep: a
              page starts as a narrow how-to and grows until it tries to cover everything. The fix
              is to return to the original problem statement, cut anything that does not serve it,
              and move unrelated material to its own page. A narrow, accurate page is easier to
              maintain than a broad, vague one.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The second is stale advice. When a platform changes behaviour, a page that was once
              accurate becomes misleading. The correct response is not to add a warning note on top
              of outdated steps; it is to rewrite the affected steps and update the dateModified
              field. If the feature no longer exists, narrow the page to the part that still applies
              or remove it from the index.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The third is reviewer disagreement. When two reviewers disagree about whether content
              meets the standard, escalate to the document owner and record the deciding factor,
              which is usually user safety or reproducibility. A written decision is more useful
              than an unresolved thread, because it gives future reviewers a precedent to follow.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The fourth is maintenance debt. Pages that are never revisited quietly drift out of
              date. The fix is to assign an owner to every page and to use the monthly triage from
              the QA framework to review pages flagged by the freshness checks. A page with a clear
              owner and a review date is far less likely to mislead a reader months later.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                What is the minimum length for a published page?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                There is no strict minimum, but the site aims for pages that are deep enough to
                carry a worked example and a verification step. A page that is only a short summary
                does not meet the usefulness standard and is either expanded or not published.
              </p>
              <h3 className="text-lg font-bold">Can I reuse content from another source?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only if it adds original explanation, context, or a worked example. Content that
                merely copies or lightly rewrites another source is excluded by the originality
                standard. The library's value comes from material a reader cannot find elsewhere in
                the same form.
              </p>
              <h3 className="text-lg font-bold">Who decides what gets published?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The document owner makes the final call, after the page passes the review gate. The
                owner is responsible for keeping the page accurate and current, and for deciding
                when a page should be narrowed or removed.
              </p>
              <h3 className="text-lg font-bold">How do I correct an error on a page?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Correct it directly in the page so readers see the current version, and update the
                dateModified field. A note that says "this is wrong" is not enough; the fix itself
                should be published.
              </p>
              <h3 className="text-lg font-bold">Are promotional pages allowed?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Pages that exist mainly to move a visitor to another click do not meet the
                standard. Every page should solve a real reader problem on its own merits.
              </p>
              <h3 className="text-lg font-bold">How often are pages reviewed?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The cadence depends on the content: quarterly for runbooks and security material,
                annually for reference pages. Pages flagged by automated freshness checks enter the
                monthly triage.
              </p>
              <h3 className="text-lg font-bold">
                Can a page be published without a maintenance note?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No. The exclusion list makes clear that content with no maintenance note, no scope,
                and no update policy does not qualify. A maintenance note is what keeps the page
                trustworthy over time.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between these standards and the review checklist?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The standards define the principles and the "why" behind what gets published. The
                content review checklist is the step-by-step "how" used to check a single page. The
                documentation QA framework adds the verification lifecycle. Read them together for
                the complete picture.
              </p>
            </div>
          </section>
        </article>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">
          Standards, update cadence & accountability
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Set a review cadence (e.g., quarterly for runbooks, annually for references) and assign a
          document owner. Maintain a changelog in the article's front matter and record the reason
          for each substantive edit to support audits and compliance reviews.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Hold a lightweight monthly triage for pages flagged by the QA pipeline. Prioritize fixes
          by user impact and security risk. For each accepted change, require a test or verification
          entry that explains how the edit was validated.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Encourage authors to include a short maintenance note indicating when the page should be
          revisited and what external signals (library updates, API changes) should trigger updates.
        </p>

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
