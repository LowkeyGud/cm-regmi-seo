import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const runtime = "edge";

const SITE_URL = "https://cmregmi.com.np";
const OG_IMAGE = `${SITE_URL}/og-contact.png`;

export const metadata: Metadata = {
  title: "Contact CM Regmi | Technical Consulting & Systems Architecture",
  description:
    "Get in touch with CM Regmi for Android kernel optimization, Windows system hardening, and enterprise architecture engagements. Professional technical support.",
  keywords:
    "Contact CM Regmi, Systems Architecture Consulting, Android Kernel Support, Technical Documentation Services",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact CM Regmi | Systems Architecture Engagements",
    description:
      "Inquire about professional consulting for systems optimization and architectural design.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Contact CM Regmi for Technical Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CM Regmi",
    description: "Professional technical consulting and systems architecture services",
    images: [OG_IMAGE],
    creator: "@cmregmi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  // ContactPage Schema for Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact CM Regmi",
    description: "Contact page for professional systems architecture and optimization services.",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "CM Regmi",
      email: "learntechcontact@gmail.com",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
        {/* SEO Breadcrumbs */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-10">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary font-bold italic">
            ◢ Secure Channel
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Initiate contact.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            For architecture engagements, optimization collaborations, or technical inquiries.
            Typical response time: <strong>Within 24-48 business hours.</strong>
          </p>
        </header>

        <section className="bg-muted/30 p-8 rounded-2xl border border-border shadow-sm">
          <form className="space-y-6" action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold tracking-tight">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold tracking-tight">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="john@enterprise.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-semibold tracking-tight">
                Subject
              </label>
              <select
                id="subject"
                className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option>Systems Architecture Review</option>
                <option>Android Kernel Optimization</option>
                <option>Windows Hardening Inquiry</option>
                <option>Other / General Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold tracking-tight">
                Project Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Describe your technical challenges or project scope..."
              />
            </div>

            {/* Mandatory Disclaimer for Google Ads/Privacy Compliance */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                required
                className="mt-1 h-4 w-4 rounded border-border"
              />
              <label htmlFor="privacy" className="text-xs text-muted-foreground leading-tight">
                I agree to the processing of my contact details for the purpose of this inquiry.
                Read our{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                for details.
              </label>
            </div>

            <button
              type="submit"
              className="w-full sm:w-max flex justify-center rounded-lg bg-primary px-10 py-4 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              Dispatch Message
            </button>
          </form>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-border pt-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Direct Communication</h2>
            <p className="text-muted-foreground text-sm mb-6">
              For PGP-encrypted communication or high-priority inquiries, use the direct address
              below:
            </p>
            <a
              href="mailto:learntechcontact@gmail.com"
              className="group relative inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-6 py-4 text-sm font-mono font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
            >
              learntechcontact@gmail.com
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Office Hours</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Monday — Friday</strong>
              <br />
              09:00 — 17:00 (NPT)
              <br />
              <span className="text-xs italic">
                Located in Bagmati, Nepal. Remote Consulting Worldwide.
              </span>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
