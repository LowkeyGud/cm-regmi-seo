import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  ExternalLink,
  GitBranch,
  Layers,
  PlayCircle,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CM Regmi — Systems Architect & Digital Strategist" },
      {
        name: "description",
        content:
          "Bridging the gap between hardware potential and software execution. Android kernel optimization, Windows hardening, cross-platform architecture.",
      },
      { property: "og:title", content: "CM Regmi — Systems Architect & Digital Strategist" },
      {
        property: "og:description",
        content: "Bridging the gap between hardware potential and software execution.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main>
        <Hero />
        <DocumentationHubPreview />
        <Bento />
        <Stack />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial-red)" }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Available for select engagements
          </div>
          <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            CM Regmi:
            <br />
            Systems Architect
            <br />
            <span className="text-primary">&</span> Digital Strategist.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Bridging the gap between hardware potential and software execution.
            Specialized in Android kernel optimization, Windows system hardening,
            and cross-platform architecture.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#documentation"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
            >
              View Documentation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Initiate Contact
            </Link>
          </div>
        </div>
        <aside className="lg:col-span-4">
          <div className="h-full rounded-lg border border-border bg-card p-6 font-mono text-xs">
            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              <span className="ml-2">~/regmi/status</span>
            </div>
            <pre className="leading-relaxed text-muted-foreground">
{`> uname -sr
Linux 6.8.0-kernel
> systemctl status
● architect.service
  Active: `}
              <span className="text-primary">running</span>
              {`
  Domains: 4
  Latency: 12ms
> whoami
`}
              <span className="text-foreground">cm.regmi</span>
              {`
> _`}
            </pre>
          </div>
        </aside>
      </div>
    </section>
  );
}

const documentationCards = [
  {
    title: "Android Hacks",
    description:
      "Root workflows, kernel tuning, recovery tooling, and performance-centered Android modifications for power users and advanced operators.",
    borderClass: "border-primary",
  },
  {
    title: "Windows Power-Tools",
    description:
      "System hardening, debloating, policy baselines, and low-friction automation for leaner and more resilient Windows environments.",
    borderClass: "border-foreground",
  },
  {
    title: "iOS Optimization",
    description:
      "Practical device maintenance, workflow acceleration, and ecosystem-level tuning focused on stability, longevity, and daily efficiency.",
    borderClass: "border-primary",
  },
];

function DocumentationHubPreview() {
  return (
    <section id="documentation" className="border-b border-foreground/80">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            ◢ Documentation Hub
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Field-tested guides across Android, Windows, and iOS.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            A preview of the technical library behind CM Regmi’s performance,
            optimization, and system architecture practice—structured for
            operators who want actionable documentation instead of generic
            advice.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {documentationCards.map((card) => (
            <article
              key={card.title}
              className={`flex min-h-[280px] flex-col justify-between rounded-lg border bg-card/40 p-6 ${card.borderClass}`}
            >
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="https://learntech.cmregmi.com.np"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
                >
                  Read Guides
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-foreground bg-secondary/20 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                ◢ YouTube Integration
              </p>
              <h3 className="text-3xl font-bold tracking-tight">Learn Tech</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                The <span className="text-foreground">Learn Tech</span> channel
                acts as a visual laboratory for the technical documentation on
                this site—turning written guides into walkthroughs, testing
                environments, optimization demos, and reproducible experiments.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@LearnTechYT"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-md border border-primary px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Visit Channel
              <PlayCircle className="h-4 w-4 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const tiles = [
  {
    icon: Cpu,
    title: "Kernel Optimization",
    desc: "Custom Android kernels tuned for thermals, battery and burst performance.",
    span: "md:col-span-2 md:row-span-2",
    accent: true,
  },
  {
    icon: Shield,
    title: "System Hardening",
    desc: "Windows attack-surface reduction & policy baselines.",
  },
  {
    icon: Layers,
    title: "Cross-Platform Architecture",
    desc: "Unified design across mobile, desktop, edge.",
  },
  { icon: Terminal, title: "Low-Level Tooling", desc: "Bootloaders, recovery, diagnostics." },
  { icon: GitBranch, title: "Pipeline Strategy", desc: "Reproducible builds and signed releases." },
  { icon: Zap, title: "Performance Audits", desc: "Profiling that translates into shipped wins." },
];

function Bento() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
              ◢ Capabilities
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Engineered surfaces, not slideware.
            </h2>
          </div>
          <Link
            to="/labs"
            className="hidden shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground md:inline-flex"
          >
            Visit Labs →
          </Link>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3">
          {tiles.map(({ icon: Icon, title, desc, span, accent }) => (
            <article
              key={title}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border p-6 transition-all hover:border-primary/60 ${
                accent ? "bg-card" : "bg-card/50"
              } ${span ?? ""}`}
            >
              {accent && (
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
                  style={{ background: "var(--color-primary)" }}
                />
              )}
              <Icon
                className={`h-7 w-7 ${accent ? "text-primary" : "text-foreground"}`}
                strokeWidth={1.5}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const items = [
    "Linux Kernel",
    "AOSP",
    "Win32",
    "Rust",
    "C / C++",
    "TypeScript",
    "WebAssembly",
    "eBPF",
  ];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          ◢ Stack
        </p>
        <div className="flex flex-wrap gap-3">
          {items.map((i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
