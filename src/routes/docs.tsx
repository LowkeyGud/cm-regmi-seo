import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation Hub — CM Regmi" },
      { name: "description", content: "Technical writeups on kernel optimization, Windows hardening and cross-platform architecture." },
      { property: "og:title", content: "Documentation Hub — CM Regmi" },
      { property: "og:description", content: "Technical writeups and reference material." },
    ],
  }),
  component: Docs,
});

function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">◢ Documentation</p>
        <h1 className="text-5xl font-black tracking-tight">Documentation Hub</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Long-form technical documentation will live on a dedicated subdomain.
          Stay tuned — kernel notes, hardening playbooks, and architecture decision
          records are inbound.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
