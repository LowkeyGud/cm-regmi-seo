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
              By <strong>CM Regmi</strong> • Published May 26, 2025
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
            <h2 className="text-2xl font-bold tracking-tight">
              7. Pin versions and capture reproducible examples
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Documentation rots fastest in the examples that cannot be re-run. When a procedure
              mentions a package version, a kernel parameter, or an image tag, pin it in a code
              block so a reader can reproduce the exact environment instead of guessing. Capture the
              full command list that produces the output you show, not a paraphrase of it. If you
              display command output, generate it with the pinned tools so the numbers in the page
              are real and checkable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The environment block below takes seconds to write and removes an entire class of
              reader questions. It also gives you a record of what you actually tested, which is the
              same evidence the verification step will ask for later.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Record the exact environment so a reader can reproduce the example
cat /etc/os-release | grep PRETTY_NAME
uname -r
python3 --version
pip show restic 2>/dev/null | grep Version`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Without a pinned environment, a reader on a different version may follow the steps and
              fail for reasons unrelated to their task. With it, they can either match the version
              or recognize immediately that the example does not apply to their build and stop
              before wasting time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Worked example: documenting a rollback procedure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A writer documented a rollback procedure for a five-server checkout service. The first
              draft said simply "restore the previous version from the registry." Reviewers flagged
              it as unreproducible because it did not say how to identify the previous version or
              how to confirm the rollback had actually landed. The writer went back to the
              gather-evidence step: they listed the last three image tags, picked a known-good tag,
              and ran the rollback twice in staging while recording the output verbatim.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# The evidence the writer captured before drafting
docker images --format "{{.Repository}}:{{.Tag}} {{.CreatedSince}}"
# v2026.05.20  2 days ago
# v2026.05.13  9 days ago   <-- known good

kubectl set image deploy/checkout web=registry/checkout:v2026.05.13
kubectl rollout status deploy/checkout
# deployment "checkout" successfully rolled out`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The final page showed the exact command and the exact confirmation line that proves
              the rollback succeeded. Six months later the page required fewer corrections than the
              previous draft did in a single week, because the command was pinned, the confirmation
              was explicit, and the rollback target was named rather than described vaguely. That is
              the practical outcome of gathering evidence first: a page that survives contact with
              the real system and stays useful instead of drifting into folklore. The same evidence
              became the acceptance test for future edits: any proposed change to the page had to
              reproduce the pinned command and its confirmation line before it could merge, which
              kept the procedure honest long after the original author moved on.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Troubleshooting: when a draft gets stuck
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every writer hits the point where a draft stops improving. The usual causes are not a
              lack of effort but a missing piece of evidence, an unclear reader, or an outline that
              does not match the task. Work through these checks before rewriting the same sentences
              again.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Return to the reader definition.</strong>
                <p className="text-sm mt-1">
                  If the draft is drifting, the reader profile and the success criterion were
                  probably not specific enough. Rewrite them in one sentence each and delete
                  anything in the draft that does not serve either.
                </p>
              </li>
              <li>
                <strong>Run the procedure yourself once more.</strong>
                <p className="text-sm mt-1">
                  A draft that feels vague is usually missing an observed step. Re-run the commands
                  in a clean environment and record each keystroke you actually typed, including the
                  ones you assumed were obvious.
                </p>
              </li>
              <li>
                <strong>Ask what the reader will check when they finish.</strong>
                <p className="text-sm mt-1">
                  If you cannot state the verification in one sentence, the verification section is
                  missing or the procedure is incomplete. Write the check that proves the task
                  succeeded, then make sure the steps lead to it.
                </p>
              </li>
              <li>
                <strong>Get a second reader early.</strong>
                <p className="text-sm mt-1">
                  A fresh pair of eyes will find the assumption that made sense to you but not to
                  anyone else. Ask one question: "What would you type first, and what would you
                  expect to happen?" Their answer reveals the gap.
                </p>
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              If none of these resolves the block, the page is probably trying to do two jobs at
              once. Split it into two pages, each with its own reader, and the friction usually
              disappears. The{" "}
              <Link
                href="/docs/documentation-qa-framework"
                className="text-primary hover:underline"
              >
                documentation QA framework
              </Link>{" "}
              and the{" "}
              <Link href="/docs/content-review-checklist" className="text-primary hover:underline">
                content review checklist
              </Link>{" "}
              describe the review checks that catch these problems before publication.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                How much evidence is enough before I start writing?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Enough to write the outline without guessing. If you can outline the procedure, the
                verification, and the maintenance note from the evidence you have gathered, you have
                enough. If any section requires a placeholder, gather the missing fact before
                drafting prose around it.
              </p>
              <h3 className="text-lg font-bold">
                Should I document what I already know from memory?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Not for procedures. Memory is where subtle errors enter documentation, especially
                version numbers and option names. Verify claims against a real run or a primary
                source before committing them to a page that others will follow as fact.
              </p>
              <h3 className="text-lg font-bold">
                How do I keep a page accurate after upstream changes?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Record a last-updated date and a version scope, then schedule a review cycle for
                high-traffic pages. When the upstream tool changes, update the page or add a note
                that it has not been tested on the new version rather than silently leaving stale
                steps.
              </p>
              <h3 className="text-lg font-bold">
                What is the difference between a style guide and a workflow?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A workflow is the sequence of steps for producing and maintaining a page, which this
                article describes. A style guide, like the{" "}
                <Link href="/docs/editorial-standards" className="text-primary hover:underline">
                  editorial standards page
                </Link>
                , is the set of rules about voice, tone, and formatting applied within those steps.
                You need both, and they serve different purposes.
              </p>
              <h3 className="text-lg font-bold">
                Why do my examples keep getting ignored by readers?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Examples that restate the surrounding text without adding a specific number,
                version, or real output teach readers to skip them. Keep only examples that add
                verifiable detail, and readers will start reading them again because they carry
                information the prose does not.
              </p>
              <h3 className="text-lg font-bold">
                How do I verify a page without breaking a live system?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Run procedures in a disposable environment that matches the stated OS and versions,
                and capture output with timestamps. For measurement claims, record the conditions of
                the test rather than treating one run as universal truth. See{" "}
                <Link
                  href="/docs/measuring-performance-safely"
                  className="text-primary hover:underline"
                >
                  measuring performance safely
                </Link>{" "}
                for a full approach.
              </p>
              <h3 className="text-lg font-bold">
                What should I do with feedback that contradicts the page?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Treat the contradiction as a signal to verify, not to delete. Re-run the procedure,
                and if the reader is correct, update the page and note what changed. If the page is
                correct, add the version or condition that explains the difference so the next
                reader is not confused. Unresolved contradictions are the fastest way a page loses
                trust.
              </p>
            </div>
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
        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
