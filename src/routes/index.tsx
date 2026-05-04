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
  Download,
  FileCode2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CM Regmi | Professional Systems Engineer & Documentation Architect" },
      {
        name: "description",
        content: "Android hacks, Windows system optimization, and expert technical documentation.",
      },
      { property: "og:title", content: "CM Regmi | Professional Systems Engineer & Documentation Architect" },
      {
        property: "og:description",
        content: "Android hacks, Windows system optimization, and expert technical documentation.",
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
        <EngineeringInsights />
        <Bento />
        <Resources />
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

function Resources() {
  const resources = [
    { title: "Android Rooting Hack-Sheet", size: "1.2 MB PDF", icon: FileCode2 },
    { title: "Windows 11 Debloat Commands", size: "84 KB TXT", icon: Terminal },
    { title: "Kernel Parameter Baseline", size: "240 KB PDF", icon: FileCode2 },
    { title: "Network Stack Optimization", size: "45 KB MD", icon: Terminal },
  ];

  return (
    <section className="border-b border-border bg-card/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            ◢ Resources
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Active Intelligence.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Downloadable Hack Sheets, Command Cheat-Sheets, and parameter baselines for field operations.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((res) => (
            <div
              key={res.title}
              className="group flex flex-col justify-between rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary/50 hover:bg-secondary/20"
            >
              <div>
                <res.icon className="mb-4 h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="font-semibold tracking-tight text-foreground">{res.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground font-mono">{res.size}</p>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 self-start rounded bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Download className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
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

function EngineeringInsights() {
  return (
    <section className="border-b border-border bg-card/10">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            ◢ Engineering Insights
          </p>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            The Hardware-Software Symbiosis
          </h2>
        </div>
        
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-muted-foreground">
          <p>
            The intersection of hardware potential and software execution is where true performance is unlocked. In modern development and system architecture, theoretical benchmarks are irrelevant if the low-level interactions are not meticulously tuned. This philosophy drives my approach to hardware-specific optimizations, particularly concerning mobile, desktop, and workstation hybrid environments. To extract the ceiling of a system’s capabilities, an architect must stop treating the operating system as an opaque abstraction layer and instead manipulate the direct channels between the kernel scheduler and the silicon footprint.
          </p>
          <p>
            My extensive work with the <strong className="text-foreground font-semibold">ROG Zephyrus G14 (Ryzen 9 5900HS / RTX 3060)</strong> architecture serves as a prime example of this methodology. Out-of-the-box configurations for such high-end hardware typically prioritize average consumer use cases over the raw, sustained computational throughput needed for intensive kernel compilation or continuous hypervisor virtualization. By interfacing directly with advanced ACPI tables, modifying SoC power limits, and implementing custom undervolting profiles via specialized x86 tuning utilities, I successfully redesigned the laptop's thermal and power delivery constraints. This micro-architecture tuning enables deterministic turbo boost behaviors, ensuring that complex development pipelines, multiple concurrent containers, and nested emulators run at peak efficiency without thermal throttling artificially degrading I/O performance over extended periods. 
          </p>

          <h3 className="text-2xl font-bold tracking-tight text-foreground pt-8">Kernel Optimization for Mobile Emulation</h3>
          <p>
            Operating at the bleeding edge of the Android ecosystem demands a testing environment that accurately mimics real-world hardware realities without compromising host system constraints. My current research and execution focus involves Android 17 virtualization and deep AVD (Android Virtual Device) manipulation. Traditional Android emulation workflows rely heavily on standardized Hyper-V or HAXM implementations that are highly abstracted and rarely optimized for the distinct I/O patterns of a modern, heavily modified Android kernel.
          </p>
          <p>
            I approach AVD environments as highly dynamic targets rather than static, generic software images. This pipeline includes deploying sophisticated rooting methods specifically tailored for virtualized x86_64 and ARM64 architectures, bypassing standard bootloader verification checks, and injecting Magisk or KernelSU binaries directly into the emulator’s Ramdisk partition. Injecting a systemic root framework into an AVD is not simply an exercise in escalating computational privileges—it enables profound system instrumentation. From modifying CPU schedulers within the virtualized guest to tweaking out-of-memory (OOM) management policies, this low-level access allows developers to simulate precise hardware constraints, battery drain scenarios, and resource scarcity exactly as they appear on both flagship devices and low-end physical silicon. 
          </p>
          <p>
            Concurrently, optimizing Windows as the host subsystem for this high-performance development ecosystem is equally critical. Windows hardening goes far beyond simply disabling unwanted telemetry or stripping out bloatware. It involves deploying rigorous policy baselines, configuring Hyper-V isolation features, enforcing strict AppLocker policies to prevent subsystem drift, and specifically tuning the WSL2 (Windows Subsystem for Linux) networking stack to drastically reduce packet overhead between the Windows host kernel and the Linux guest. A rigid, extremely lean Windows environment provides a deterministic host—a non-negotiable requirement when compiling millions of lines of AOSP (Android Open Source Project) code or stress-testing low-level Android 17 framework implementations.
          </p>

          <h3 className="text-2xl font-bold tracking-tight text-foreground pt-8">Foundations in Methodical Engineering</h3>
          <p>
            This rigorous, evidence-based approach to systems architecture is deeply rooted in formal analytic disciplines. As a registered engineer certified by the <strong className="text-foreground font-semibold">Nepal Engineering Council (NEC)</strong>, my technical execution is inherently governed by uncompromising principles of reliability, systemic safety, and mathematically reproducible outcomes. The methodologies learned through rigorous formal engineering practices directly and positively inform my approach to software architecture and documentation.
          </p>
          <p>
            In mechanical or civil engineering disciplines, the failure to rigorously document a structural constraint, shear limit, or material tolerance inevitably leads to catastrophic physical failure. When directly applied to software infrastructure, the failure to properly document a kernel patch, a memory allocation strategy, or a precise virtualization configuration leads to unmaintainable codebases, extreme technical debt, and broader ecosystem fragmentation. My formal NEC certification continuously instills a disciplined mindset where undocumented code is simply considered broken code. This ensures every individual project, shell script, architectural decision, and binary patch I author is accompanied by deeply thorough, schematic-level documentation.
          </p>

          <h3 className="text-2xl font-bold tracking-tight text-foreground pt-8">The 'Learn Tech' Philosophy</h3>
          <p>
            In recent years, the technical education and developer-advocacy landscape has skewed heavily toward short-form, ephemeral video content designed for engagement rather than deep comprehension. While visually stimulating, these formats frequently abstract away the inevitable friction and troubleshooting necessary for genuine technical mastery. The <strong className="text-foreground font-semibold">Learn Tech</strong> philosophy pivots sharply away from this trend, arguing vigorously that structured, long-form documentation is infinitely superior for substantive, long-lasting engineering education.
          </p>
          <p>
            Highly complex procedures—such as unpacking and rewriting a raw <code>boot.img</code>, compiling an optimized toolchain, or debugging a segmentation fault inside a custom cross-compiled Linux kernel—cannot be adequately represented in a rapid-fire, highly edited video timeline. Long-form, highly structured documentation fundamentally provides necessary temporal permanence. It explicitly allows an operator to cleanly search for specific hex error codes, closely study command syntaxes, and methodically understand the procedural logic at their own individual pace. The core mechanism of the Learn Tech philosophy is driven by the absolute conviction that true engineering mastery comes primarily from reading, executing, inevitably failing, and referencing explicit technical documentation, rather than passively watching a successful execution sequence without ever grasping the underlying variable states.
          </p>

          <h3 className="text-2xl font-bold tracking-tight text-foreground pt-8">The Future of Documentation in an AI-Driven Era</h3>
          <p>
            As the software engineering landscape moves dynamically further into an era heavily influenced by sophisticated large language models and autonomous agents, the specific role of human-authored, deeply structured technical documentation becomes significantly more vital, not less. Current AI models excel at synthesizing and reformulating existing knowledge; however, they do not natively invent novel low-level exploit chains or autonomously design bespoke thermal redistribution solutions for highly niche hardware configurations like the G14.
          </p>
          <p>
            High-quality, meticulously long-form technical narratives actively serve as the necessary ground truth and high-signal training data from which AI agents can effectively assist rather than hallucinate. By consistently maintaining an objective, densely informative, and highly structural baseline standard of technical documentation, I aim to provide not just an immediate resource for human developers, but a verifiable repository of fundamental systems knowledge that structurally anchors future automated programming tools. Ultimately, foundational engineering insights must remain immutable, accurately searchable, and technically definitive—a standard I obsessively uphold across all my technical deployments, written guides, and architectural designs.
          </p>
        </div>
      </div>
    </section>
  );
}
