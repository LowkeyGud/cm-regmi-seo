import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CM Regmi" },
      { name: "description", content: "Initiate contact for systems architecture engagements." },
      { property: "og:title", content: "Contact — CM Regmi" },
      { property: "og:description", content: "Initiate contact for systems architecture engagements." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">◢ Contact</p>
        <h1 className="text-5xl font-black tracking-tight">Initiate contact.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          For engagements, collaborations, or low-level questions:
        </p>
        <a
          href="mailto:hello@cmregmi.dev"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
        >
          hello@cmregmi.dev
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
