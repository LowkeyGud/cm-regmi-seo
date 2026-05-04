import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Technical Documentation & Architecture | CM Regmi" },
      { name: "description", content: "Explore CM Regmi's central technical documentation hub containing in-depth playbooks for Android kernel optimization and Windows system hardening strategies." },
      { property: "og:title", content: "Technical Documentation & Architecture | CM Regmi" },
      { property: "og:description", content: "Explore CM Regmi's central technical documentation hub containing in-depth playbooks for Android kernel optimization and Windows system hardening strategies." },
    ],
    links: [
      { rel: "canonical", href: "https://cmregmi.com.np/docs" },
    ],
  }),
  component: Docs,
});

function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Docs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article>
          <header className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">◢ Documentation</p>
            <h1 className="text-5xl font-black tracking-tight">Documentation Hub</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Long-form technical documentation, kernel notes, hardening playbooks, and architecture decision records.
            </p>
          </header>

          <section className="mt-12 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Android Kernel Optimization</h2>
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
              alt="Macro shot of a high-performance computer CPU circuit board representing hardware-level tuning" 
              className="rounded-lg object-cover w-full h-64 border border-border"
            />
            <p className="text-muted-foreground leading-relaxed">
              Optimizing Android kernels requires an in-depth understanding of the governor, scheduling, and thermal thresholds...
            </p>
          </section>

          <section className="mt-12 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Windows System Hardening</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reducing the attack surface of a Windows environment through strict policy enforcement, telemetry disabling, and advanced endpoint protection strategies...
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
