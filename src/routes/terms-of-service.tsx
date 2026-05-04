import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [{ title: "Terms of Service — CM Regmi" }],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-black tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or
            software) on CM Regmi's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-bold text-foreground">3. Disclaimer</h2>
          <p>
            The materials on CM Regmi's website are provided on an 'as is' basis. CM Regmi makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties
            including, without limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of intellectual property or other
            violation of rights.
          </p>

          <h2 className="text-2xl font-bold text-foreground">4. Contact Information</h2>
          <p>
            If you have any questions or concerns regarding our Terms of Service, please contact us
            at{" "}
            <a href="mailto:learntechcontact@gmaill.com" className="text-primary hover:underline">
              learntechcontact@gmaill.com
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
