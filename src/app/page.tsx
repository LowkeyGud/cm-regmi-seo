import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  ArrowRight,
  Cpu,
  ExternalLink,
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

// ─── Runtime ─────────────────────────────────────────────────────────────────
// Edge runtime kept — compatible with all changes below.
export const runtime = "edge";

// ─── Site Config ─────────────────────────────────────────────────────────────
const SITE_URL = "https://cmregmi.com.np";
const SITE_NAME = "CM Regmi";
const SITE_DESCRIPTION =
  "CM Regmi — Systems Architect & Digital Strategist. Expert technical documentation covering Android kernel optimization, Windows system hardening, and cross-platform architecture.";
const OG_IMAGE = `${SITE_URL}/og-home.png`;

// ─── Metadata export (Next.js App Router) ────────────────────────────────────
// This replaces all manual <head> tag management and is the correct pattern
// for Next.js App Router. Google AdSense reviewers verify these signals.
export const metadata: Metadata = {
  // ── Primary ──────────────────────────────────────────────────────────────
  title: `${SITE_NAME} | Systems Architect & Documentation Hub`,
  description: SITE_DESCRIPTION,
  keywords:
    "CM Regmi, systems architect, Android kernel optimization, Windows hardening, iOS optimization, tech documentation, Nepal engineer, NEC certified, AOSP, Linux kernel",
  authors: [{ name: "CM Regmi", url: SITE_URL }],
  creator: "CM Regmi",
  publisher: "CM Regmi",

  // ── Canonical ─────────────────────────────────────────────────────────────
  // Prevents duplicate-content penalties from any trailing-slash variants.
  alternates: { canonical: SITE_URL },

  // ── Robots ────────────────────────────────────────────────────────────────
  // Explicit robots directive is a direct AdSense approval signal.
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

  // ── Open Graph ────────────────────────────────────────────────────────────
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

  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Systems Architect`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@cmregmi",
  },
};

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
// Three schemas for E-E-A-T + rich-result signals:
//   Person      — registers identity, credentials (NEC), expertise areas
//   WebSite     — domain entity, enables Sitelinks Search Box
//   ProfilePage — describes this specific page with dateModified
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
    title: "Android Hacks",
    description:
      "Root workflows, kernel tuning, recovery tooling, and performance-centred Android modifications for power users and advanced operators.",
    borderClass: "border-primary",
    href: "https://learntech.cmregmi.com.np/category/android",
  },
  {
    title: "Windows Power-Tools",
    description:
      "System hardening, debloating, policy baselines, and low-friction automation for leaner and more resilient Windows environments.",
    borderClass: "border-foreground",
    href: "https://learntech.cmregmi.com.np/category/windows",
  },
  {
    title: "iOS Optimisation",
    description:
      "Practical device maintenance, workflow acceleration, and ecosystem-level tuning focused on stability, longevity, and daily efficiency.",
    borderClass: "border-primary",
    href: "https://learntech.cmregmi.com.np/category/ios",
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
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
                    aria-label={`Read ${card.title} guides on Learn Tech`}
                  >
                    Read Guides
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
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

// ─── Resources ────────────────────────────────────────────────────────────────
// ⚠️  ADSENSE RED FLAG FIXED:
// The original used <button> elements with zero href — AdSense reviewers flag
// non-functional UI as deceptive / low-quality content and reject on that
// basis alone. Resources are now either real <a download> anchors or clearly
// labelled "Coming Soon" so the UI is completely honest.
// Replace href: null + available: false with real paths when files are ready.
const resources = [
  {
    title: "Android Rooting Hack-Sheet",
    size: "1.2 MB · PDF",
    icon: FileCode2,
    href: "https://learntech.cmregmi.com.np/resources/android-rooting-hacksheet.pdf",
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
            Downloadable hack sheets, command cheat-sheets, and parameter baselines for field
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
                    // Functional anchor — honest, not flagged by AdSense
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
                    // Clearly labelled unavailable — honest UI, no AdSense flag
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
          <h2
            id="insights-heading"
            className="text-balance text-4xl font-bold tracking-tight md:text-5xl"
          >
            The Hardware-Software Symbiosis
          </h2>
        </header>

        <article
          itemScope
          itemType="https://schema.org/TechArticle"
          className="space-y-8 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {/* Hidden microdata — author + date for Google E-E-A-T */}
          <meta itemProp="author" content="CM Regmi" />
          <meta itemProp="datePublished" content="2024-01-01" />
          <meta itemProp="inLanguage" content="en-US" />
          <meta itemProp="headline" content="The Hardware-Software Symbiosis" />
          <meta itemProp="publisher" content="CM Regmi" />

          <div itemProp="articleBody">
            <p>
              The intersection of hardware potential and software execution is where true
              performance is unlocked. In modern development and system architecture, theoretical
              benchmarks are irrelevant if the low-level interactions are not meticulously tuned.
              This philosophy drives my approach to hardware-specific optimisations, particularly
              concerning mobile, desktop, and workstation hybrid environments. To extract the
              ceiling of a system&apos;s capabilities, an architect must stop treating the operating
              system as an opaque abstraction layer and instead manipulate the direct channels
              between the kernel scheduler and the silicon footprint.
            </p>
            <p>
              My extensive work with the{" "}
              <strong className="text-foreground font-semibold">
                ROG Zephyrus G14 (Ryzen 9 5900HS / RTX 3060)
              </strong>{" "}
              architecture serves as a prime example of this methodology. By interfacing directly
              with advanced ACPI tables, modifying SoC power limits, and implementing custom
              undervolting profiles via specialised x86 tuning utilities, I successfully redesigned
              the laptop&apos;s thermal and power delivery constraints. This micro-architecture
              tuning enables deterministic turbo boost behaviours, ensuring that complex development
              pipelines, multiple concurrent containers, and nested emulators run at peak efficiency
              without thermal throttling artificially degrading I/O performance over extended
              periods.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">
              Kernel Optimisation for Mobile Emulation
            </h3>
            <p>
              Operating at the bleeding edge of the Android ecosystem demands a testing environment
              that accurately mimics real-world hardware realities. My current research involves
              Android 17 virtualisation and deep AVD (Android Virtual Device) manipulation.
              Traditional Android emulation workflows rely heavily on standardised Hyper-V or HAXM
              implementations that are highly abstracted and rarely optimised for the distinct I/O
              patterns of a modern, heavily modified Android kernel.
            </p>
            <p>
              I approach AVD environments as highly dynamic targets rather than static, generic
              software images. This pipeline includes deploying sophisticated rooting methods
              specifically tailored for virtualised x86_64 and ARM64 architectures, bypassing
              standard bootloader verification checks, and injecting Magisk or KernelSU binaries
              directly into the emulator&apos;s Ramdisk partition. From modifying CPU schedulers
              within the virtualised guest to tweaking out-of-memory (OOM) management policies, this
              low-level access allows developers to simulate precise hardware constraints exactly as
              they appear on both flagship devices and low-end physical silicon.
            </p>
            <p>
              Concurrently, optimising Windows as the host subsystem is equally critical. Windows
              hardening involves deploying rigorous policy baselines, configuring Hyper-V isolation
              features, enforcing strict AppLocker policies to prevent subsystem drift, and
              specifically tuning the WSL2 networking stack to reduce packet overhead between the
              Windows host kernel and the Linux guest.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">
              Foundations in Methodical Engineering
            </h3>
            <p>
              This rigorous, evidence-based approach is deeply rooted in formal analytic
              disciplines. As a registered engineer certified by the{" "}
              <strong className="text-foreground font-semibold">
                Nepal Engineering Council (NEC)
              </strong>
              , my technical execution is governed by uncompromising principles of reliability,
              systemic safety, and mathematically reproducible outcomes. My NEC certification
              continuously instils a disciplined mindset where undocumented code is simply
              considered broken code — ensuring every project, shell script, architectural decision,
              and binary patch I author is accompanied by deeply thorough, schematic-level
              documentation.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">
              The &lsquo;Learn Tech&rsquo; Philosophy
            </h3>
            <p>
              The <strong className="text-foreground font-semibold">Learn Tech</strong> philosophy
              pivots sharply away from short-form, ephemeral video content, arguing that structured,
              long-form documentation is infinitely superior for substantive engineering education.
              Highly complex procedures — such as unpacking and rewriting a raw{" "}
              <code className="rounded bg-secondary/50 px-1.5 py-0.5 font-mono text-sm text-foreground">
                boot.img
              </code>
              , compiling an optimised toolchain, or debugging a segmentation fault inside a custom
              cross-compiled Linux kernel — cannot be adequately represented in a rapid-fire,
              heavily edited video timeline.
            </p>

            <h3 className="pt-8 text-2xl font-bold tracking-tight text-foreground">
              The Future of Documentation in an AI-Driven Era
            </h3>
            <p>
              As the software engineering landscape moves further into an era influenced by large
              language models and autonomous agents, human-authored, deeply structured technical
              documentation becomes significantly more vital, not less. High-quality, long-form
              technical narratives serve as the necessary ground truth from which AI agents can
              effectively assist rather than hallucinate. By maintaining an objective, densely
              informative baseline standard of technical documentation, I aim to provide a
              verifiable repository of fundamental systems knowledge that structurally anchors
              future automated programming tools.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
