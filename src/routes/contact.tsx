import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CM Regmi" },
      { name: "description", content: "Initiate contact for systems architecture engagements." },
      { property: "og:title", content: "Contact — CM Regmi" },
      {
        property: "og:description",
        content: "Initiate contact for systems architecture engagements.",
      },
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

        <form className="mt-8 space-y-6 max-w-md" action="#" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="How can we help you?"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground mb-4">Or email directly:</p>
          <a
            href="mailto:learntechcontact@gmaill.com"
            className="inline-block rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-red-glow)]"
          >
            learntechcontact@gmaill.com
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
