import { SiteFooter } from "@/components/SiteFooter";
import AdsSlot from "@/components/AdsSlot";
import { SiteHeader } from "@/components/SiteHeader";
import {
  ArrowRight,
  Cpu,
  FileCode2,
  GitBranch,
  Layers,
  PlayCircle,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

const SITE_URL = "https://cmregmi.com.np";
const SITE_NAME = "CM Regmi";
const SITE_DESCRIPTION =
  "CM Regmi — Systems Architect & Digital Strategist. Expert technical documentation covering Android kernel optimization, Windows system hardening, and cross-platform architecture.";
const OG_IMAGE = `${SITE_URL}/og-home.png`;

export const metadata: Metadata = {
  title: `${SITE_NAME} | Systems Architect & Documentation Hub`,
  description: SITE_DESCRIPTION,
  keywords:
    "CM Regmi, systems architect, Android kernel optimization, Windows hardening, iOS optimization, tech documentation, Nepal engineer, NEC certified, AOSP, Linux kernel",
  authors: [{ name: "CM Regmi", url: SITE_URL }],
  creator: "CM Regmi",
  publisher: "CM Regmi",

  alternates: { canonical: SITE_URL },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Systems Architect & Documentation Hub`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CM Regmi — Systems Architect & Documentation Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Systems Architect`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@cmregmi",
  },
};

function HomeSchemas() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "CM Regmi",
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: "Systems Architect & Digital Strategist",
    description:
      "NEC-certified engineer specialising in Android kernel optimisation, Windows system hardening, and cross-platform architecture.",
    knowsAbout: [
      "Android Kernel Optimization",
      "Windows System Hardening",
      "iOS Optimization",
      "Linux Kernel",
      "AOSP",
      "Cross-Platform Architecture",
      "Low-Level Systems Programming",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      recognizedBy: {
        "@type": "Organization",
        name: "Nepal Engineering Council",
        alternateName: "NEC",
        url: "https://nec.gov.np",
      },
    },
    sameAs: ["https://www.youtube.com/@LearnTechYT", "https://learntech.cmregmi.com.np"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#webpage`,
    name: `${SITE_NAME} | Systems Architect & Documentation Hub`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
    dateModified: new Date().toISOString().split("T")[0],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
    </>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* JSON-LD — Next.js hoists <script> tags inside RSC to <head> */}
      <HomeSchemas />

      {/* Skip-nav for accessibility (required for Google quality review) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">
        <Hero />
        <DocumentationHubPreview />
        <EngineeringInsights />
        <Bento />
        {/* <Resources /> */}
        <Stack />
      </main>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="home-1" />
      </section>

      <SiteFooter />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial-red)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
              aria-hidden="true"
            />
            Available for select engagements
          </div>

          {/* H1: primary keyword "Systems Architect" in first 4 words */}
          <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            CM Regmi:
            <br />
            Systems Architect
            <br />
            <span className="text-primary">&amp;</span> Digital Strategist.
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Bridging the gap between hardware potential and software execution. Specialised in
            Android kernel optimisation, Windows system hardening, and cross-platform architecture.
            NEC-certified engineer based in Nepal.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#documentation"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
            >
              View Documentation
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Initiate Contact
            </Link>
          </div>
        </div>

        {/* Decorative terminal aside — hidden from assistive tech */}
        <aside className="lg:col-span-4" aria-hidden="true" role="presentation">
          <div className="h-full rounded-lg border border-border bg-card p-6 font-mono text-xs">
            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="ml-2">~/regmi/status</span>
            </div>
            <pre className="leading-relaxed text-muted-foreground">
              {`> uname -sr\nLinux 6.8.0-kernel\n> systemctl status\n● architect.service\n  Active: `}
              <span className="text-primary">running</span>
              {`\n  Domains: 4\n  Latency: 12ms\n> whoami\n`}
              <span className="text-foreground">cm.regmi</span>
              {`\n> _`}
            </pre>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ─── Documentation Hub Preview ────────────────────────────────────────────────
const documentationCards = [
  {
    title: "Documentation QA Framework",
    description:
      "Our methodologies for document review, technical verification playbooks, and universal web accessibility standards.",
    borderClass: "border-primary",
    href: "/docs/documentation-qa-framework",
  },
  {
    title: "Android Hardening & Optimization",
    description:
      "Enterprise-grade diagnostics covering Android systems architecture, background daemon management, and permission security scaling.",
    borderClass: "border-foreground",
    href: "/docs/android-hardening-optimization",
  },
  {
    title: "Windows Security Baseline",
    description:
      "Rigorous operational baselines detailing Group Policy Objects (GPO), Application Control policy, and automated patch rollouts.",
    borderClass: "border-primary",
    href: "/docs/windows-security-baseline",
  },
];

function DocumentationHubPreview() {
  return (
    <section
      id="documentation"
      aria-labelledby="docs-heading"
      className="border-b border-foreground/80"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            ◢ Documentation Hub
          </p>
          <h2
            id="docs-heading"
            className="text-balance text-4xl font-bold tracking-tight md:text-5xl"
          >
            Field-tested guides across Android, Windows, and iOS.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            A preview of the technical library behind CM Regmi&apos;s performance, optimisation, and
            system architecture practice — structured for operators who want actionable
            documentation instead of generic advice.
          </p>
          <Link
            href="/docs"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-primary px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Browse All Docs
            <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
          </Link>
        </header>

        {/* Card grid — each card now links to its specific category page */}
        <ul className="grid gap-4 lg:grid-cols-3" role="list">
          {documentationCards.map((card) => (
            <li key={card.title}>
              <article
                className={`flex min-h-[280px] flex-col justify-between rounded-lg border bg-card/40 p-6 ${card.borderClass}`}
              >
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{card.description}</p>
                </div>
                <div className="mt-8">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
                    aria-label={`Read ${card.title}`}
                  >
                    Read Docs
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* YouTube Integration */}
        <div className="mt-8 rounded-lg border border-foreground bg-secondary/20 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                ◢ YouTube Integration
              </p>
              <h3 className="text-3xl font-bold tracking-tight">Learn Tech</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The <strong className="text-foreground font-semibold">Learn Tech</strong> channel
                acts as a visual laboratory for the technical documentation on this site — turning
                written guides into walkthroughs, testing environments, optimisation demos, and
                reproducible experiments.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@LearnTechYT"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-md border border-primary px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              aria-label="Visit Learn Tech YouTube channel"
            >
              Visit Channel
              <PlayCircle className="h-4 w-4 text-primary" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Bento Grid ───────────────────────────────────────────────────────────────
const tiles = [
  {
    icon: Cpu,
    title: "Kernel Optimisation",
    desc: "Custom Android kernels tuned for thermals, battery, and burst performance.",
    span: "md:col-span-2 md:row-span-2",
    accent: true,
  },
  {
    icon: Shield,
    title: "System Hardening",
    desc: "Windows attack-surface reduction and policy baselines.",
  },
  {
    icon: Layers,
    title: "Cross-Platform Architecture",
    desc: "Unified design across mobile, desktop, and edge.",
  },
  {
    icon: Terminal,
    title: "Low-Level Tooling",
    desc: "Bootloaders, recovery, and diagnostics.",
  },
  {
    icon: GitBranch,
    title: "Pipeline Strategy",
    desc: "Reproducible builds and signed releases.",
  },
  {
    icon: Zap,
    title: "Performance Audits",
    desc: "Profiling that translates into shipped wins.",
  },
];

function Bento() {
  return (
    <section aria-labelledby="capabilities-heading" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <header className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
              ◢ Capabilities
            </p>
            <h2
              id="capabilities-heading"
              className="text-balance text-4xl font-bold tracking-tight md:text-5xl"
            >
              Engineered surfaces, not slideware.
            </h2>
          </div>
        </header>

        <ul className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3" role="list">
          {tiles.map(({ icon: Icon, title, desc, span, accent }) => (
            <li key={title}>
              <article
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border p-6 transition-all hover:border-primary/60 ${accent ? "bg-card" : "bg-card/50"
                  } ${span ?? ""}`}
              >
                {accent && (
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
                    style={{ background: "var(--color-primary)" }}
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={`h-7 w-7 ${accent ? "text-primary" : "text-foreground"}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="relative">
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const resources = [
  {
    title: "Android Enterprise Hardening Manual",
    size: "1.2 MB · PDF",
    icon: FileCode2,
    href: "https://learntech.cmregmi.com.np/resources/android-hardening-manual.pdf",
    available: true,
  },
  {
    title: "Windows 11 Debloat Commands",
    size: "84 KB · TXT",
    icon: Terminal,
    href: "https://learntech.cmregmi.com.np/resources/windows11-debloat.txt",
    available: true,
  },
  {
    title: "Kernel Parameter Baseline",
    size: "240 KB · PDF",
    icon: FileCode2,
    href: null,
    available: false,
  },
  {
    title: "Network Stack Optimisation",
    size: "45 KB · MD",
    icon: Terminal,
    href: null,
    available: false,
  },
];

function Resources() {
  return (
    <section aria-labelledby="resources-heading" className="border-b border-border bg-card/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            ◢ Resources
          </p>
          <h2
            id="resources-heading"
            className="text-balance text-4xl font-bold tracking-tight md:text-5xl"
          >
            Active Intelligence.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Downloadable hardening checklists, command cheat-sheets, and parameter baselines for field
            operations.
          </p>
        </header>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" role="list">
          {resources.map((res) => (
            <li key={res.title}>
              <div className="group flex h-full flex-col justify-between rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary/50 hover:bg-secondary/20">
                <div>
                  <res.icon
                    className="mb-4 h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold tracking-tight text-foreground">{res.title}</h3>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">{res.size}</p>
                </div>

                <div className="mt-6">
                  {res.available && res.href ? (
                    <a
                      href={res.href}
                      download
                      className="inline-flex items-center gap-2 self-start rounded bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                      aria-label={`Download ${res.title}`}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground/60">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
                        aria-hidden="true"
                      />
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Stack ────────────────────────────────────────────────────────────────────
const stackItems = [
  "Linux Kernel",
  "AOSP",
  "Win32",
  "Rust",
  "C / C++",
  "TypeScript",
  "WebAssembly",
  "eBPF",
];

function Stack() {
  return (
    <section aria-labelledby="stack-heading" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p
          id="stack-heading"
          className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          ◢ Technology Stack
        </p>
        <ul className="flex flex-wrap gap-3" role="list" aria-label="Technologies used">
          {stackItems.map((item) => (
            <li key={item}>
              <span className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Engineering Insights ─────────────────────────────────────────────────────
// Long-form content is a major E-E-A-T asset.
// Added <article> with TechArticle microdata, correct heading hierarchy,
// and author/datePublished signals — all key for Google's quality review.
function EngineeringInsights() {
  return (
    <section aria-labelledby="insights-heading" className="border-b border-border bg-card/10">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <header className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            ◢ Engineering Insights
          </p>
          <h2 id="insights-heading" className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            How useful documentation is actually produced
          </h2>
        </header>

        <article
          itemScope
          itemType="https://schema.org/TechArticle"
          className="space-y-8 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          <meta itemProp="author" content="CM Regmi" />
          <meta itemProp="datePublished" content="2024-01-01" />
          <meta itemProp="inLanguage" content="en-US" />
          <meta itemProp="headline" content="How useful documentation is actually produced" />
          <meta itemProp="publisher" content="CM Regmi" />

          <div itemProp="articleBody">
            <p>
              Good technical documentation starts with a simple rule: explain what changed, why it
              changed, how it was verified, and what could go wrong. That sequence matters more
              than visual polish when the goal is to help a reader solve a real problem without
              guessing.
            </p>
            <p>
              A useful page begins with the reader&apos;s problem, not the author&apos;s preferences.
              For example, a maintenance note should identify symptoms, list the smallest safe
              checks first, and separate permanent settings from reversible tests. That makes the
              content easier to trust and easier to act on.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">1. Start with a baseline</h3>
            <p>
              Baselines are the difference between a diagnosis and a guess. A good guide records
              the original state of the system, the observed behaviour, the version or model in use,
              and the exact conditions under which a test was run. Without that context, even a
              correct tip becomes hard to reproduce.
            </p>
            <p>
              This site now follows that same rule. The documentation pages are text-first, narrow
              in scope, and built to show intent quickly. A reader should be able to scan the
              headings and know whether the page is about prevention, configuration, maintenance, or
              recovery.
            </p>
            <p>
              Validation matters more than confidence. A useful note says what was checked, what
              actually happened, and whether the advice is reversible. If a change is experimental,
              the page should say so. If a recommendation depends on a specific device class or
              operating-system version, the page should say that too.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">2. Keep changes reversible</h3>
            <p>
              Content with real value often looks conservative. It tells readers how to back up
              first, how to test one variable at a time, and how to revert when results are worse
              than expected. That kind of guidance is more useful than a dramatic promise because it
              survives real-world edge cases.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">3. Document the failure modes</h3>
            <p>
              A trustworthy technical page is honest about trade-offs. If a battery-saving setting
              reduces performance, that should be stated. If a security control may block a workflow,
              that should be stated. Readers do not need perfection; they need clarity.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">4. Finish with a maintenance note</h3>
            <p>
              The last section should tell the reader when to revisit the page, what version it was
              based on, and who should use it. That turns static content into maintainable content,
              which is exactly what review systems and real readers both reward.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
