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
                <h2 className="text-2xl font-bold tracking-tight">
                  Practical reviewer checklist and examples
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A reviewer should confirm the article's purpose, test examples, link integrity,
                  and whether the maintenance note exists. If the article contains commands, the
                  reviewer should run them in an isolated environment or request test output from
                  the author.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Use a short, repeatable checklist in PRs: sanity test, link check, accessibility
                  quick-scan, and accuracy confirmation by a subject-matter expert. Log the reviewer
                  decisions in the PR.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For content that modifies system state (configs, scripts), require an automated
                  verification job or a small runnable test that proves the steps complete as
                  described.
                </p>
              </section>
              By <strong>CM Regmi</strong> • Published May 26, 2025
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
              <code>{`Date-Modified: 2025-05-24
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
            <h2 className="text-2xl font-bold tracking-tight">
              Why the checklist is ordered this way
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The order of checks is deliberate. Accuracy comes first because a beautiful page that
              is wrong is worse than none. Usefulness comes second because a correct page that helps
              nobody still fails its purpose. Clarity, safety, and maintenance follow because they
              keep the page usable over time. A reviewer who works top to bottom catches the most
              expensive problems first and leaves the cheapest style tweaks for last.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This ordering also mirrors how a reader experiences a page. A reader first trusts the
              content or loses trust in it, then decides whether it solves their problem, then
              judges how easy it was to follow, and finally notices whether it looks current. By
              checking in the same order, the reviewer stays aligned with the reader's concerns
              instead of imposing a separate editorial agenda.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Keep the checklist short enough to complete in one sitting. A review tool that
              requires forty minutes of setup will be ignored. The goal is a repeatable ritual, not
              a gauntlet. If a checklist item never catches a real problem in practice, remove it
              and replace it with one that does. A living checklist is a working checklist.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">A concrete review walk-through</h2>
            <p className="text-muted-foreground leading-relaxed">
              To make the checklist concrete, here is a short real-world example. A support engineer
              submitted a page titled "Restore a Home Directory from a Local Backup". The draft
              contained one command and a sentence that said the command worked. The reviewer ran
              the command in a disposable container, found that it errored on the second step
              because a flag was misspelled, and caught that the page referenced a backup path that
              only existed on the author's laptop.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The reviewer logged two issues and attached the trimmed terminal output. The author
              fixed the flag, replaced the laptop path with a parameterized example, and re-ran the
              verification. After the change, a second reviewer executed the corrected steps from a
              blank machine and confirmed the restore produced the expected file listing. The page
              shipped with a PASS record. The practical outcome was that two people could reproduce
              the procedure end to end, and the same example later became the template for three
              other backup guides on the site.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is the difference between a page that states a claim and a page that proves it. A
              review is only useful when it produces an artifact a future reader can recheck: a
              verified command, a golden output, or a reproduction log. If a reviewer cannot reach a
              PASS, the page should not be published with a green status.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Before and after: one editing pass
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A useful way to apply the checklist is to take a weak sentence and show the revision.
              Consider this original line from a draft: "You should back up your configs regularly."
              The sentence is vague because it never says what to back up, how, or how to confirm
              the copy succeeded. A reviewer who flags this would ask for specifics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The revised line reads: "Copy the contents of the SSH config directory to an encrypted
              archive every night, then verify the archive by running a checksum comparison." The
              revision names the target, the frequency, the destination type, and the verification
              step. It turns a sentiment into an instruction the reader can act on without asking
              follow-up questions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A second common weak pattern is the sentence that promises a tool does something
              without showing it: "The monitoring dashboard shows failures." A stronger version is:
              "The monitoring dashboard lists failures in the top panel; to confirm a service is
              healthy, check that the status column reports Active for more than sixty seconds." The
              second version gives the reader a way to interpret the display and a threshold to
              compare against.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              During an editing pass, the reviewer should ask three questions of every paragraph:
              does it state a fact or an opinion, does it include enough context to act on, and does
              it point to a way to verify the outcome. If the answer is no to any question, the
              paragraph needs another pass. This rule alone removes most of the filler that makes
              technical pages feel shallow.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Runnable QA and lint commands</h2>
            <p className="text-muted-foreground leading-relaxed">
              Checks that run by hand are easy to skip. The checklist is far more reliable when it
              is encoded as a script that a reviewer can run once and inspect. Below is a small
              shell script that checks a markdown article for the most common review failures:
              broken relative links, missing alt text on images, and code blocks that are missing a
              language label.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/usr/bin/env bash
# review.sh - quick sanity checks for a markdown doc
DOC="\${1:?usage: review.sh <file.md>}"
FAIL=0
# 1. broken relative markdown links
grep -oE '\]\([./][^)]*\)' "\$DOC" | while read -r L; do
  TARGET=$(echo "\$L" | sed -E 's/]\((.*)\)/\\1/')
  [ -f "\$TARGET" ] || echo "MISSING LINK: \$TARGET"
done
# 2. images without alt text
grep -nE '!\[[[:space:]]*\]\(' "\$DOC" && echo "IMAGE MISSING ALT" && FAIL=1
# 3. fenced code blocks without a language hint
awk '/^\\\`\\\`\\\`/{n++; next} n%2==1{next} 1' "\$DOC" >/dev/null
grep -nE '^\\\`\\\`\\\`[[:space:]]*$' "\$DOC" && echo "CODE BLOCK WITHOUT LANGUAGE" && FAIL=1
[ "\$FAIL" -eq 0 ] && echo "REVIEW CHECKS PASSED" || echo "REVIEW CHECKS FAILED"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              A reviewer runs the script with the article path and gets a list of concrete problems
              rather than a vague request for more polish. The script is intentionally simple so it
              can be extended. Teams often add a rule for forbidden words, a rule for minimum
              section count, or a check that a dateModified field is present in the front matter.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">A markdown style-checker command</h2>
            <p className="text-muted-foreground leading-relaxed">
              Style consistency is easier to enforce with an existing linter than with a custom
              script. The markdownlint tool exposes dozens of rules and can be run from a command
              line or inside a CI job. The command below invokes a focused rule set that matches
              this site's editorial voice: consistent list indentation, one blank line before
              headings, and no trailing whitespace.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# style check for a single article
npx markdownlint "docs/backup-strategies.md" \
  --config .markdownlint.json \
  --disable MD013 MD033 \
  --enable MD009 MD022 MD026

# or scan the whole docs tree and fail on any violation
npx markdownlint "docs/**/*.md" --config .markdownlint.json`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The disabled rules are deliberate: MD013 (line length) is relaxed because long command
              lines are common in technical writing, and MD033 (inline HTML) is relaxed because
              pages occasionally need small HTML elements. Enforcing the remaining rules keeps
              formatting predictable without forcing awkward line breaks. A team that runs this in
              its PR pipeline catches style drift before it reaches readers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">A review-checklist script</h2>
            <p className="text-muted-foreground leading-relaxed">
              Beyond style, the review process benefits from a machine-checkable checklist that
              produces a simple yes or no per item. The snippet below models the quick reviewer
              checklist from this page as a small script that prints a pass or fail line for each
              requirement. It is not meant to replace human judgment; it is meant to make the common
              checks impossible to forget.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/usr/bin/env bash
# checklist.sh - print pass/fail for core review items
DOC="\${1:?usage: checklist.sh <file.md>}"
check() { if grep -qE "\$2" "\$DOC"; then echo "PASS: \$1"; else echo "FAIL: \$1"; fi; }
check "has H1 title"        '^# '
check "has intro paragraph" '^[A-Z][^#].*\.$'
check "has verification"    -i 'verif' 
check "has update date"     -i 'dateModified|updated'
check "has warning/risk"    -i 'warning|caution|risk'
echo "---"
echo "Reviewer must confirm commands were run in a disposable environment."`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The script's value is that it produces an explicit record. When it is saved in the
              repository, the review history shows which checks were evaluated and when. That
              traceability matters for audits and for new team members who want to learn what a good
              review looks like without guessing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Troubleshooting reviews</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reviews stall for predictable reasons. The first is a missing reviewer: a page waits
              for approval that never comes. The fix is a time-boxed escalation. If a review has no
              response within two working days, the page owner re-assigns it to a second reviewer or
              marks it as a draft so it does not appear stale to readers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The second reason is an unverifiable claim. When a reviewer cannot run a command
              because the environment is unavailable, the correct action is to ask the author for a
              recorded reproduction log or a video capture of the exact steps. A claim that cannot
              be tested must be labelled as unverified and moved out of the critical path until
              evidence arrives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The third reason is stale content. A page that references a tool version that no
              longer exists should be reviewed before any new reader lands on it. The recovery
              sequence is: confirm the page still applies, update version references, re-run the
              commands, and update the dateModified field. If the feature no longer exists, narrow
              the page or remove it rather than leaving incorrect instructions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When a review is blocked by disagreement between reviewers, escalate to a decision
              owner and capture both positions in the PR notes. Record the deciding factor, usually
              user safety or reproducibility, so the resolution can be referenced later. A review
              that ends with a written decision is more valuable than one that ends with silence.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">How long should a review take?</h3>
              <p className="text-muted-foreground leading-relaxed">
                For a page under a thousand words, budget thirty to sixty minutes: a quick read, a
                command verification pass in a disposable environment, and a link check. Larger
                runbooks can take a full day. The time-box matters more than the number; set a
                deadline so the review does not block publishing indefinitely.
              </p>
              <h3 className="text-lg font-bold">What if I cannot reproduce a command?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ask the author for a recorded reproduction log or mark the claim as unverified. Do
                not silently approve. An unverified command is the most common source of broken
                documentation, so flagging it early is more valuable than letting it reach readers.
              </p>
              <h3 className="text-lg font-bold">Who approves the final version?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A subject-matter expert confirms accuracy, and a second reviewer confirms
                readability and structure. If the two roles are the same person, a separate reviewer
                should at least re-run the commands so a second pair of eyes touches the critical
                steps.
              </p>
              <h3 className="text-lg font-bold">
                Should I review code examples with the same rules as prose?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, and more strictly. Code must be runnable, deterministic where possible, and
                accompanied by expected output. Prose can be edited freely, but code changes must
                trigger a re-verification pass before the page is marked green.
              </p>
              <h3 className="text-lg font-bold">
                How do I handle a page that is outdated but not broken?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Update the version references and dateModified field, re-run the commands, and add a
                note about what changed. If the update is large, treat it as a new review cycle
                rather than a quick fix so nothing is silently missed.
              </p>
              <h3 className="text-lg font-bold">What is the minimum evidence for a PASS?</h3>
              <p className="text-muted-foreground leading-relaxed">
                At minimum, the commands run successfully in a clean environment, the outputs match
                the documented expected results, and the page states the tested-on environment. A
                screenshot is optional; a reproducible command output is not.
              </p>
              <h3 className="text-lg font-bold">Can automation replace a human reviewer?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automation replaces the repeatable checks, not the judgment. Use scripts for links,
                style, and schema. Keep a human reviewer for meaning, safety, and whether the page
                actually answers the reader's problem. The two complement each other.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Use this checklist together with the editorial standards page and the QA framework
              page for the full review process. Prefer reproducible evidence over rhetorical
              confidence.
            </p>
          </section>

          <section className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Continue with the full methodology on the QA framework page, or review the writing
                workflow that produces the drafts you are checking.
              </p>
              <Link
                href="/docs/documentation-qa-framework"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Documentation QA Framework
              </Link>
              <Link
                href="/docs/technical-writing-workflow"
                className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open Technical Writing Workflow
              </Link>
            </div>
          </section>
        </article>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
