import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs — CM Regmi" },
      { name: "description", content: "Experiments at the edge of hardware and software." },
      { property: "og:title", content: "Labs — CM Regmi" },
      { property: "og:description", content: "Experiments at the edge of hardware and software." },
    ],
  }),
  component: Labs,
});

function Labs() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">◢ Labs</p>
        <h1 className="text-5xl font-black tracking-tight">Labs</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          A workbench for experimental tooling, prototypes, and benchmarks.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
