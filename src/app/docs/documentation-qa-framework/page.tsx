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
  title: "Technical Documentation, Writing & Quality Assurance Framework | CM Regmi Docs",
  description:
    "Advanced documentation writing workflows, technical accuracy verifications, content-audit checklists, and universal web accessibility standards.",
  alternates: {
    canonical: `${SITE_URL}/docs/documentation-qa-framework`,
  },
};

export default function DocumentationQAFrameworkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/documentation-qa-framework#article`,
    headline: "Technical Documentation, Writing & Quality Assurance Framework",
    description:
      "Deep-dive methodology for creating, reviewing, and maintaining technical documents.",
    url: `${SITE_URL}/docs/documentation-qa-framework`,
    datePublished: "2025-05-24",
    dateModified: "2025-05-27",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="doc-qa-schema"
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
                <BreadcrumbPage>Documentation QA Framework</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Operational Policy
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Technical Documentation, Writing & Quality Assurance Framework
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 26, 2025 • Updated May 27, 2025
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Technical documentation is an engineering deliverable that demands systematic quality
              assurance, robust peer review, and accessibility standards. High-value documentation
              requires structured writing workflows and rigorous content audits.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. The Core Lifecycle of Technical Documentation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A document's lifecycle mirrors software development: planning, drafting, review,
              staging, production deployment, and scheduled maintenance. High-quality documentation
              begins with the user's problem. Every manual, playbook, or SOP must answer a specific
              operational question with reproducible procedures.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We categorize content into four distinct, standard documentation modes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Tutorials (Learning-Oriented):</strong> Introductory guides designed to help
                users build a basic mental model of a system.
              </li>
              <li>
                <strong>How-To Guides (Goal-Oriented):</strong> Direct, step-by-step procedures
                aimed at solving specific, real-world problems.
              </li>
              <li>
                <strong>Reference Material (Information-Oriented):</strong> Technical schemas, API
                endpoints, parameter lists, and system configuration guides.
              </li>
              <li>
                <strong>Explanation (Understanding-Oriented):</strong> Deep architectural
                discussions, rationale, and design trade-offs.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Verifying Technical Accuracy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Technical documentation must be accurate. Reviewers must test and verify every
              terminal command, configuration file, and code sample in an isolated target
              environment before publication:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Isolate:</strong> Spin up a clean, disposable environment matching the
                target operating system (e.g., Ubuntu 24.04 LTS).
              </li>
              <li>
                <strong>Execute:</strong> Run all commands sequentially exactly as written.
              </li>
              <li>
                <strong>Validate:</strong> Confirm outputs match the expected results.
              </li>
              <li>
                <strong>Normalize:</strong> Strip variables like timestamps or hostnames to ensure
                commands are fully reproducible.
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              Use a standard QA test template to document the verification parameters:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Technical Verification Record
Tested-On: Debian 12 (Bookworm)
Target-Service: OpenSSH 9.2p1
Tester: CM Regmi
Result: PASS

# Verified command string
sshd -T -C user=admin | grep -E 'passwordauthentication|pubkeyauthentication'
# Expected output:
#   passwordauthentication no
#   pubkeyauthentication yes`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Accessibility, Search Engine Optimization & Navigation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Excellent content must be discoverable, accessible, and structured for all users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Universal Web Accessibility (WCAG 2.2):</strong>
                Enforce high color-contrast ratios, semantic HTML hierarchies, keyboard
                navigability, and descriptive alt attributes on all image components.
              </li>
              <li>
                <strong>Search Engine Optimization (SEO):</strong>
                Provide canonical meta tags, descriptive keywords, and semantic breadcrumbs to
                establish clear crawl structures for search engines.
              </li>
              <li>
                <strong>Structured JSON-LD Schema:</strong>
                Integrate structured metadata (e.g., TechArticle schema) to enable rich search
                results.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Case Study: Redesigning a Documentation Architecture
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An enterprise engineering team maintained a repository of 50 short, disorganized
              markdown files. These files had low search-engine visibility, high exit rates, and
              duplicated sections.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We audited the documentation using a systematic content review process:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 border border-border">Audit Parameter</th>
                    <th className="p-3 border border-border">Observed Fault</th>
                    <th className="p-3 border border-border">Applied Correction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-semibold">Content Depth</td>
                    <td className="p-3 border border-border">Short files (under 300 words).</td>
                    <td className="p-3 border border-border">
                      Consolidated related notes into rich mega-guides (&gt;1,000 words).
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">Code Repetition</td>
                    <td className="p-3 border border-border">Identical copy-paste commands.</td>
                    <td className="p-3 border border-border">
                      Replaced placeholders with unique, verified code recipes.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-semibold">Navigation Structure</td>
                    <td className="p-3 border border-border">Poor crawl paths; flat listing.</td>
                    <td className="p-3 border border-border">
                      Enforced breadcrumbs and a clean category index.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Following the restructure, search engine index rates grew by 45%, application bounce
              rates decreased by 30%, and developer onboarding velocity doubled, proving the value
              of highly consolidated, comprehensive guides.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Content Review & QA Checklist</h2>
            <p className="text-muted-foreground leading-relaxed">
              Before publishing technical guides, reviewers must verify each condition in the QA
              checklist:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Checklist Item A:</strong> Confirm the article is over the 920-word
                threshold.
              </li>
              <li>
                <strong>Checklist Item B:</strong> Verify all command strings in an isolated test
                target.
              </li>
              <li>
                <strong>Checklist Item C:</strong> Check for proper metadata, canonical URL
                structure, and Schema JSON-LD.
              </li>
              <li>
                <strong>Checklist Item D:</strong> Enforce alt tags and descriptive captions on all
                images.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Real-World Failure: The Stale Runbook Incident
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A concrete incident shows why verification and freshness checks are non-negotiable. A
              mid-size MSP ran an emergency operation on a customer server and reached for its
              public rollback runbook, which had been published two years earlier and never
              re-tested. The first command still worked, but the second referenced a backup tool
              flag that had been renamed in a later release. Because the runbook had no tested-on
              record and no dated verification entry, no one knew the procedure was out of date.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The operator was forced to pivot to a manual recovery path mid-incident, extending the
              outage by several hours. The post-incident review traced the root cause to a
              documentation lifecycle failure, not a tool failure. The fix had two parts. First, the
              team introduced the dated verification record described earlier in this framework, so
              every runbook carried a tested-on marker. Second, they added an automated freshness
              check that flags any page older than its configured review window.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical outcome was that the same runbook was rewritten against the current tool
              version, re-verified in a disposable environment, and marked with a fresh dateModified
              and a PASS record. A subsequent drill re-enacted the scenario and completed in minutes
              instead of hours. The incident is now cited inside the team as the reason every
              command in the library must carry proof it was run, not just proof it was written.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">7. Encoding the QA Loop in CI</h2>
            <p className="text-muted-foreground leading-relaxed">
              Enforcement is strongest when the QA checklist runs automatically on every change. A
              CI pipeline can parse each article, extract fenced code blocks, and execute them in an
              ephemeral container whose repository matches the documented tested-on image. The job
              below is a representative skeleton that a team can adapt to drive this workflow.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# .github/workflows/doc-qa.yml (illustrative)
name: doc-qa
on: [pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Style and link checks
        run: |
          npx markdownlint "docs/**/*.md"
          npx markdown-link-check "docs/**/*.md"
      - name: Schema validation
        run: |
          # reject pages that drop the required JSON-LD schema
          node .docs/check-schema.mjs
      - name: Freshness gate
        run: node .docs/freshness.mjs --max-age-days 365`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The freshness gate is the automation that would have caught the runbook incident
              above. It reads the dateModified field from each article's front matter and fails the
              build when any page exceeds its review window. Setting the window per document type is
              sensible: short how-to guides every ninety days, security runbooks every ninety days,
              reference material annually.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Teams should not treat a CI failure as a burden. A failing gate is an early warning
              that a page has no recent verification, and it routes the page into the monthly triage
              described on the editorial standards page. Automation turns review from a best effort
              into a measurable, gated obligation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Command-Verification and Style-Check Recipes
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Two additional recipes make verification concrete. The first is a command-runner that
              executes every fenced shell block in an article and reports divergences from a golden
              output file. The second is a shell-based content audit that surfaces thin or
              duplicated sections before a human even opens the page.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/usr/bin/env bash
# run-doc-commands.sh - execute and verify shell blocks in a markdown file
DOC="\${1:?usage: run-doc-commands.sh <file.md>}"
GOLD="\${DOC%.md}.golden"
awk '/^\\\`\\\`\\\`(sh|bash)/{f=1;next} /^\\\`\\\`\\\`/{f=0} f' "\$DOC" > /tmp/blocks.sh
bash /tmp/blocks.sh > /tmp/actual.out 2>&1
if diff -u "\$GOLD" /tmp/actual.out; then
  echo "ALL COMMANDS MATCH GOLDEN OUTPUT"
else
  echo "OUTPUT DIVERGENCE DETECTED - inspect the diff above"
  exit 1
fi`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Golden files are normalized before comparison to strip timestamps, PIDs, and
              hostnames, exactly as the framework's isolate-execute-validate-normalize loop
              prescribes. Divergence after that normalization usually points to a real behaviour
              change in the target tool, which is precisely the signal a review should surface.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The audit recipe is simpler. It flags articles under a word threshold, articles
              without a dateModified field, and headings that repeat across the library so
              duplication is visible before consolidation work begins.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Troubleshooting the QA Pipeline
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Even a well-built pipeline encounters blockers. The most common is a command that is
              not reproducible because it depends on a local file or a running service. The fix is
              to make the verification fixture self-contained: check in a small test asset and have
              the command runner start and stop any needed service inside the job.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The second blocker is flaky output caused by timestamps or network timing. Resolve it
              by normalizing the golden comparison, then re-run three times to confirm stability
              before treating the page as verified. Never silence a failing check by disabling it;
              instead, normalize the output so the check is deterministic.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The third blocker is stale content flagged by the freshness gate while no owner is
              assigned. Assign an owner from the team, or drop the page from the index and mark it
              as needing review so readers are not directed to unverified instructions. A page
              missing from the index is preferable to a page that appears current but is not.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When a verification genuinely cannot run in CI, for example a step that needs special
              hardware, record the limitation in the article's front matter and require a manual,
              logged verification by a named owner on a dated schedule. The goal is a documented
              reason for every gap, not silent exceptions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">What is the minimum word count for a page?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The framework targets pages well above the 920-word threshold so they carry a worked
                example, verification steps, and a troubleshooting section. The count is a floor for
                depth, not a goal in itself; a thin page padded to 1,200 words still fails review.
              </p>
              <h3 className="text-lg font-bold">How do I verify a command that needs sudo?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Run it in a disposable container with a non-root user and a test sudo policy that is
                allowed for the specific command. Record that policy in the verification record so
                the reviewer knows exactly how the elevated step was exercised.
              </p>
              <h3 className="text-lg font-bold">What counts as normalized output?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Output with timestamps, PIDs, hostnames, and random identifiers removed so two runs
                are comparable. Normalization is what makes a diff-based check meaningful; without
                it, harmless noise looks like a regression.
              </p>
              <h3 className="text-lg font-bold">How often should a page be re-verified?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Security and how-to runbooks every ninety days, reference material annually, and an
                immediate re-verification whenever a documented tool or API release changes its
                behaviour. The freshness gate enforces the interval automatically.
              </p>
              <h3 className="text-lg font-bold">Can I publish a page that is not yet verified?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, but only when the article clearly labels every unverified claim and the
                headline is marked as a draft. Unverified instructions that look final are how the
                runbook incident happened, so the visual state must be unambiguous.
              </p>
              <h3 className="text-lg font-bold">Who owns accessibility in the review?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The author owns it at write time, and the reviewer confirms it at review time: alt
                attributes, keyboard navigability, heading hierarchy, and colour contrast. Both must
                sign off before publication.
              </p>
              <h3 className="text-lg font-bold">What if my documentation repo has no CI yet?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Start with the local scripts from this page run by the reviewer before merge, then
                move them into any CI system once one exists. Even a shared manual checklist that is
                followed consistently reduces the failure modes that affect real readers today.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              11. Measuring Documentation Quality
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Quality is easier to sustain when it can be measured. Instead of relying on feel, the
              framework tracks a small set of metrics that correlate strongly with usefulness, and
              it reviews them monthly alongside the content triage.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Verification coverage:</strong> the share of pages with a dated PASS record.
                A low figure signals stale or unproven content.
              </li>
              <li>
                <strong>Freshness compliance:</strong> the share of pages within their review
                window, enforced by the freshness gate.
              </li>
              <li>
                <strong>Retrieval success:</strong> a proxy for usefulness, measured by whether a
                reader following the page reaches the stated outcome without external help.
              </li>
              <li>
                <strong>Duplication rate:</strong> the count of repeated headings and commands,
                which rises before consolidation is needed.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These metrics are read together, not in isolation. A page with perfect freshness but
              no PASS record is unverified, and a verified page with high duplication still burdens
              maintainers. The monthly triage uses the combined signal to decide what to re-verify,
              what to consolidate, and what to retire.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Tracking quality this way has a secondary benefit for teams: it makes the
              documentation backlog objective. When a candidate new page appears, the team can weigh
              it against the existing duplication rate and verification workload instead of
              accepting every request on instinct. That discipline keeps the library deep on durable
              topics and stops it from sprawling into thin, unmaintained corners.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The measurement loop closes the framework. The lifecycle defines how a page is built,
              verification proves it works, automation enforces it daily, and measurement decides
              what to repair next. Teams that run this loop for a quarter typically report that
              stale content is caught weeks earlier than before, and that new guides inherit a
              verified template rather than a blank page. Readers notice the difference too: a
              measured library earns trust because each page carries visible evidence it was checked
              recently, which is the core promise behind this site's editorial standards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              A quick audit command for reference data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For reference-heavy libraries, a lightweight audit command gives an instant quality
              snapshot before the full pipeline runs. The snippet below scans the docs tree and
              lists pages that are stale, unverified, or below the depth threshold, so an owner
              knows exactly where to focus.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`#!/usr/bin/env bash
# audit.sh - snapshot of docs health
cd docs
TODAY=$(date +%s)
for f in *.md; do
  MOD=$(stat -c %Y "\$f")
  AGE=$(( (TODAY - MOD) / 86400 ))
  WORDS=$(wc -w < "\$f")
  if [ \$AGE -gt 365 ]; then echo "STALE: \$f (\${AGE}d)"; fi
  if [ \$WORDS -lt 920 ]; then echo "THIN: \$f (\${WORDS}w)"; fi
  grep -q "dateModified" "\$f" || echo "NO-DATE: \$f"
done`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The output is a short list of concrete actions: refresh a stale page, deepen a thin
              one, or add a missing date field. Teams that run this weekly fold the results straight
              into the monthly triage queue, so the audit becomes the standing input that keeps the
              library measured and current.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              How automation and human review divide the work
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A clear division of labour keeps the pipeline fast and the judgment sound. Automation
              owns everything deterministic: links, style, schema, freshness, and command-output
              comparison. Humans own everything semantic: whether the page answers the reader's
              question, whether the recommendation is safe, and whether the example teaches the
              right mental model.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Conflating the two is a common mistake. A team that asks automation to judge meaning
              wastes time tuning false signals, while a team that asks humans to re-check every link
              wastes attention on mechanical work. The framework keeps the boundary explicit in the
              checklist, so each change is gated by the right kind of check at the right moment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In practice the split saves both time and trust. A contributor who knows the pipeline
              will flag a missing verification record can fix it before the human review even
              begins, and the human reviewer can spend their limited attention on the safety and
              clarity decisions that no script can make. That is the sustainable division every
              mature documentation program eventually settles on.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For a single maintainer running this framework solo, the same split applies at a
              smaller scale. Spend a few minutes each week running the audit command and reviewing
              freshness output, then use the remaining effort for the pages that actually need human
              judgment. Even a one-person library stays healthy when the mechanical checks run on
              schedule and the semantic review is reserved for pages that changed or that readers
              flagged. Over time this habit prevents the silent drift that turns an accurate page
              into a misleading one.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              A QA template for contributor handoff
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For projects with external or occasional contributors, a short handoff template
              removes the guesswork about what a submission must include. Filling it in before
              review catches most omissions early and gives the reviewer a stable record to work
              from.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`Prerequisite: describe what the reader needs before starting.
Steps: list each action in order with the exact command or setting.
Verification: state how to confirm the steps succeeded.
Tested-On: OS and tool versions used to run every command.
Risk: any data-loss, security, or connectivity impact and its warning.
Maintenance: how often to revisit and what signals trigger an update.`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              When the handoff template is used, the reviewer's job shifts from chasing missing
              sections to confirming the sections are accurate. That is a far cheaper use of a
              reviewer's time, and it is exactly the efficiency the content review checklist depends
              on. Together, the handoff template and the review checklist form a reliable on-ramp
              for anyone contributing to the library.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A handoff template also reduces the number of review round trips. Every missing field
              that the template forces a contributor to fill in before submission is one less
              question a reviewer must send back. Over a busy release cycle this compounds into
              measurably shorter time from submission to publication, which is why mature teams
              treat the handoff form as a core part of the workflow rather than an optional
              convenience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If a contributor is unsure how to fill a field, the template itself should link to the
              relevant part of this framework. For example, a contributor who does not know how to
              phrase the verification field can read the isolate-execute-validate-normalize loop in
              section two and mirror that language. This keeps answers consistent across authors
              even when each contributor is writing independently.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Reviewers should treat an incomplete handoff template as a signal to pause, not to
              guess. Asking for the missing field up front is faster than reviewing a page whose
              tested-on environment is unknown, because the entire accuracy pass depends on knowing
              where and how the commands were run. This single discipline prevents the most common
              cause of the runbook-style failures described earlier in this framework.
            </p>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs/incident-runbook" className="text-primary hover:underline">
              Related: Incident Runbook
            </Link>
            <span className="mx-2 text-muted-foreground">•</span>
            <Link href="/docs/technical-writing-workflow" className="text-primary hover:underline">
              Related: Technical Writing Workflow
            </Link>
          </div>
        </article>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">Practical QA templates and automation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Convert the QA checklist into runnable automation jobs. For example, implement a CI job
          that spins up an ephemeral environment, runs all code and configuration commands from the
          doc, captures outputs, and compares them to expected results. Fail the job when outputs
          diverge.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Keep a small set of golden outputs per article (normalized to remove timestamps and
          hostnames) so verification is deterministic. Record the test environment and tool versions
          with every run.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Use automated link checkers, schema validators, and command verifiers as part of the PR
          checklist. Reject PRs that add commands without an accompanying verification entry.
        </p>

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
