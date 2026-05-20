import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Script from "next/script";

export const runtime = "edge";

const SITE_URL = "https://cmregmi.com.np";
const OG_IMAGE = `${SITE_URL}/og-legal.png`;

export const metadata: Metadata = {
  title: "Terms of Service | CM Regmi",
  description:
    "Terms and conditions for using CM Regmi's technical documentation, system hardening playbooks, and architecture records.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: {
    title: "Terms of Service | CM Regmi",
    description: "Terms and conditions for using CM Regmi services",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CM Regmi Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CM Regmi",
    description: "Terms and conditions for CM Regmi services",
    images: [OG_IMAGE],
    creator: "@cmregmi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/terms-of-service#webpage`,
    name: "Terms of Service",
    description:
      "Terms and conditions for using CM Regmi's technical documentation, system hardening playbooks, and architecture records.",
    url: `${SITE_URL}/terms-of-service`,
    datePublished: "2024-01-01",
    dateModified: "2026-05-10",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/terms-of-service#terms`,
      name: "Terms of Service",
      url: `${SITE_URL}/terms-of-service`,
    },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <h1 className="text-4xl font-black tracking-tight mb-4">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8 border-b pb-4">
          Last updated: May 10, 2026
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing the documentation provided by CM Regmi, you agree to be bound by these
              Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="border-l-4 border-primary pl-6 py-2">
            <h2 className="text-2xl font-bold text-foreground">
              2. Technical Disclaimer (Important)
            </h2>
            <p className="font-medium text-foreground">
              The technical guides, including Android kernel optimization and Windows hardening
              strategies, are provided for educational purposes only.
            </p>
            <p>
              Modifying system kernels or security policies carries inherent risks. CM Regmi is not
              responsible for any hardware damage, data loss, or system instability resulting from
              the application of technical notes found on this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Intellectual Property</h2>
            <p>
              Content published here is the intellectual property of CM Regmi. You may use the
              information for personal, non-commercial use. Redistribution of technical playbooks
              without attribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Limitation of Liability</h2>
            <p>
              In no event shall CM Regmi or its affiliates be liable for any damages (including,
              without limitation, damages for loss of data or profit) arising out of the use or
              inability to use the materials on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Contact Information</h2>
            <p>
              Direct all legal or technical inquiries to:{" "}
              <a
                href="mailto:learntechcontact@gmail.com"
                className="text-primary font-bold hover:underline"
              >
                learntechcontact@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
