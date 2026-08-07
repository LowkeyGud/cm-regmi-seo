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

            <p className="text-muted-foreground leading-relaxed">
              Technical writing differs from other forms of writing because its purpose is to help
              someone accomplish a task or make a decision with confidence. Good technical
              documentation outlives the tool it describes, gets updated when conditions change, and
              reduces the need for repeat questions. The workflow below is the process used for
              every article on this site.
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
            <p className="text-muted-foreground leading-relaxed">
              Ask: What does the reader already know? What are they trying to do right now? What
              mistake are they trying to avoid? Writing without answering these questions produces
              pages that are technically accurate but practically useless. A document written for
              "everyone" is actually written for no one.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Write the reader profile and success criteria in two sentences before writing anything
              else. Example: "The reader is a systems administrator deploying hardening changes to
              production servers. Success is a completed deployment with verified rollback
              capability within 30 minutes."
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Gather evidence first</h2>
            <p className="text-muted-foreground leading-relaxed">
              Good technical content is not built from memory alone. Gather notes, test results,
              screenshots if they are actually necessary, version numbers, and any error messages
              that matter. The point is to write from observable facts instead of vibes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For procedure documents, this means running the procedure yourself in a clean
              environment and recording each step. For comparison articles, it means testing all
              options under the same conditions. For conceptual explanations, it means verifying
              claims against primary sources like vendor documentation, specifications, or code.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Record the evidence alongside the draft. Version numbers, test environment specs,
              command outputs, and configuration files should be captured at the time of writing,
              not reconstructed later from memory. This practice catches assumptions that turn out
              to be false and provides proof when readers ask for clarification.
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
            <p className="text-muted-foreground leading-relaxed">
              The outline step is where you discover gaps in your evidence. If you cannot outline
              the verification section, you have not finished testing. If the outline has three
              sections on prerequisites and one sentence on the main procedure, the balance is
              wrong. Fix these structural problems before investing time in polished prose.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A strong outline also makes review faster. Reviewers can comment on structure before
              you spend hours on wording. Structural changes late in the writing process are
              expensive. Early outline review prevents that waste.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Keep the prose specific</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Specific writing builds trust. Vague writing forces readers to guess, and guessing
              leads to mistakes. Each sentence should be verifiable or clearly marked as opinion.
            </p>
            <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                <strong>Use concrete nouns instead of vague phrases.</strong>
                <p className="text-sm mt-1">
                  Write "the kernel parameter vm.swappiness" instead of "a tunable setting." Write
                  "PostgreSQL 14" instead of "a recent database version." Concrete nouns let readers
                  verify claims and reproduce results.
                </p>
              </li>
              <li>
                <strong>Say exactly what changed, not just that something was improved.</strong>
                <p className="text-sm mt-1">
                  "Latency dropped from 140ms to 95ms at the 95th percentile" is a claim that can be
                  checked. "Performance improved" is marketing language that belongs nowhere in
                  technical documentation.
                </p>
              </li>
              <li>
                <strong>Use examples when they remove ambiguity rather than adding filler.</strong>
                <p className="text-sm mt-1">
                  An example should clarify a confusing point or demonstrate a common case. If the
                  example restates what the text already said without adding specificity, delete it.
                  Filler examples train readers to skip them.
                </p>
              </li>
              <li>
                <strong>
                  Separate recommendation from observation so readers can see the reasoning.
                </strong>
                <p className="text-sm mt-1">
                  State facts first: "On this hardware, the write cache flushes every 5 seconds."
                  Then state recommendations: "Set the flush interval to 2 seconds for workloads
                  that cannot tolerate 5 seconds of data loss." Let readers decide if the tradeoff
                  applies to their situation.
                </p>
              </li>
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
            <p className="text-muted-foreground leading-relaxed">
              Every procedural page needs a verification section. The reader should know how to
              confirm that the procedure succeeded. This goes beyond "it worked on my machine." A
              verification section includes command output expected, file states to check, service
              status codes, and what to do if the verification fails.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For conceptual pages, verification means providing citations or references to primary
              sources. If you claim that a certain kernel parameter affects memory management, link
              to the kernel documentation or a measured experiment. Unverified claims are
              hypotheses, not documentation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. Review for maintenance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Technical pages do not stay correct on their own. They need version numbers, update
              dates, and periodic review. When something changes upstream, the page should be
              updated or narrowed instead of kept alive by filler text.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every technical page should include a last-updated date and a version scope. If the
              page describes a procedure for Ubuntu 22.04, say that explicitly. When Ubuntu 24.04
              releases, update the page or add a note that it has not been tested on the new
              version. This prevents readers from following stale instructions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Schedule a review cycle for high-traffic pages. A quarterly review catches drift
              before readers encounter broken procedures. Low-traffic pages can default to
              review-on-feedback, but should still include contact information for corrections.
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
            reviewers should run the QA checklist: confirm reproducibility, validate command outputs
            in an isolated environment, and ensure the article includes a maintenance note.
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
