import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CM Regmi | Systems Architect Profile" },
      {
        name: "description",
        content:
          "Profile of CM Regmi, Systems Architect. Two decades of expertise in technical documentation, Android kernel optimization, and Windows system hardening methods.",
      },
      { property: "og:title", content: "About CM Regmi | Systems Architect Profile" },
      {
        property: "og:description",
        content:
          "Profile of CM Regmi, Systems Architect. Two decades of expertise in technical documentation, Android kernel optimization, and Windows system hardening methods.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cmregmi.com.np/about" }],
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
          CM Regmi designs systems that respect the silicon they run on. Two decades of moving bits
          between rings, kernels, and userland.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
