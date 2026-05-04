import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CM Regmi" },
      { name: "description", content: "Systems architect bridging hardware and software." },
      { property: "og:title", content: "About — CM Regmi" },
      { property: "og:description", content: "Systems architect bridging hardware and software." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">◢ About</p>
        <h1 className="text-5xl font-black tracking-tight">Operator profile.</h1>
        <img
          src="/images/technical-lab-setup.jpg"
          width="800"
          height="450"
          alt="CM Regmi Technical Laboratory Setup"
          className="mt-8 rounded-lg border border-border bg-muted/20 object-cover"
        />
        <p className="mt-8 text-lg text-muted-foreground">
          CM Regmi designs systems that respect the silicon they run on. Two decades
          of moving bits between rings, kernels, and userland.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
