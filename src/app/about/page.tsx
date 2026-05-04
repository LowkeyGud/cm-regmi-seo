import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const runtime = "edge";

export const metadata = {
  title: "About CM Regmi | Systems Architect & Optimization Expert",
  description:
    "Learn about CM Regmi's 20+ years of experience in Android kernel optimization, Windows system hardening, and enterprise infrastructure architecture.",
  keywords:
    "CM Regmi, Systems Architect, Android Kernel Expert, Windows Hardening Specialist, Technical Consultant",
  openGraph: {
    title: "About CM Regmi | Systems Architect Profile",
    description: "20 years of expertise in technical documentation and system optimization.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "CM Regmi Technical Infrastructure Lab",
      },
    ],
    type: "profile",
  },
  alternates: {
    canonical: "https://cmregmi.com.np/about",
  },
};

export default function About() {
  // Structured Data (JSON-LD) for Search Engine Authority
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "CM Regmi",
      jobTitle: "Systems Architect",
      description: "Expert in Android kernel optimization and Windows enterprise hardening.",
      url: "https://cmregmi.com.np",
      knowsAbout: [
        "Android Kernel Optimization",
        "Windows System Hardening",
        "Enterprise Architecture",
        "Cybersecurity",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <header className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-bold">
            ◢ Professional Profile
          </p>
          <h1 className="text-5xl font-black tracking-tight lg:text-6xl">Systems Architect.</h1>
        </header>

        {/* Unsplash Optimized Image */}
        <section className="mt-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border shadow-2xl bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
              alt="High-tech server room environment representing CM Regmi's technical laboratory and systems architecture focus"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground text-center italic">
            Primary Testing Environment — Specialized in Kernel and Network Hardening
          </p>
        </section>

        <section className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            CM Regmi designs systems that respect the silicon they run on. With two decades of
            experience moving bits between rings, kernels, and userland, I provide specialized
            consultancy in optimization and security.
          </p>

          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div className="p-6 rounded-lg border border-border bg-muted/30">
              <h3 className="font-bold text-lg mb-2">Core Expertise</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Android Kernel (EAS/Linux) Tuning</li>
                <li>• Windows Enterprise Hardening (GPO/WDAC)</li>
                <li>• Low-Latency System Architecture</li>
                <li>• Technical Documentation & SOPs</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-border bg-muted/30">
              <h3 className="font-bold text-lg mb-2">Methodology</h3>
              <p className="text-sm text-muted-foreground">
                Every configuration and architecture design undergoes rigorous stress-testing to
                ensure reliability under immense compute pressure.
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            This platform serves as a digital archive and central documentation hub. It provides
            engineers and architects an unfiltered look into practical system optimization
            techniques and vulnerability mitigation strategies.
          </p>
        </section>

        {/* Business Transparency Section - Vital for Google Ads Approval */}
        <section className="mt-16 pt-10 border-t border-border">
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center">
            <h2 className="text-2xl font-bold mb-4">Inquiries & Consulting</h2>
            <p className="text-muted-foreground mb-6">
              Available for technical architectural reviews and specialized system hardening
              projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-lg"
              >
                Get in Touch
              </Link>
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View Documentation
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>Based in Nepal • Global Technical Consulting</p>
            <p className="mt-2 flex items-center justify-center gap-2">
              <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-primary underline underline-offset-4">
                Terms
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
