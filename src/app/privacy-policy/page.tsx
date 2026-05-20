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
const OG_IMAGE = `${SITE_URL}/og-legal.png`;

export const metadata: Metadata = {
  title: "Privacy Policy | CM Regmi Technical Documentation Hub",
  description:
    "Official Privacy Policy for CM Regmi. Learn how we handle data, execute Google AdSense implementations, and manage cookie compliance.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | CM Regmi",
    description: "Learn about our privacy practices and data handling policies",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CM Regmi Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CM Regmi",
    description: "Learn about our privacy practices and data handling",
    images: [OG_IMAGE],
    creator: "@cmregmi",
  },
};

export default function PrivacyPolicy() {
  // Legal JSON-LD Schema for rich search results and platform trust
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "@id": `${SITE_URL}/privacy-policy#policy`,
    name: "Privacy Policy for CM Regmi",
    description:
      "Official Privacy Policy for CM Regmi. Learn how we handle data, execute Google AdSense implementations, and manage cookie compliance.",
    url: `${SITE_URL}/privacy-policy`,
    datePublished: "2024-01-01",
    dateModified: "2026-05-10",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/privacy-policy#mainentity`,
      name: "Privacy Policy",
      url: `${SITE_URL}/privacy-policy`,
    },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <Script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        {/* SEO Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <header className="mb-10 border-b border-border pb-6">
            <h1 className="text-4xl font-black tracking-tight mb-3">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> May 10, 2026
            </p>
          </header>

          <div className="text-muted-foreground space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
              <p>
                Welcome to the technical hub of CM Regmi. We respect your privacy and are committed
                to protecting your personal data. This Privacy Policy outlines our compliance
                metrics regarding the collection, use, and disclosure of personal data when you use
                our digital services and the choices you have associated with that data.
              </p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-bold text-foreground">
                2. Information Collection and Use
              </h2>
              <p>
                While using our platform, we may collect minimal data logs standard to web
                interactions to measure page performance and delivery speed. This includes device
                Internet Protocol (IP) addresses, browser type, browser version, the pages of our
                site that you visit, the time and date of your visit, and the time spent on those
                pages.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-bold text-foreground">
                3. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to track the activity on our site
                and maintain certain user preferences. Cookies are files with a small amount of data
                which may include an anonymous unique identifier. You can instruct your browser to
                refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            {/* CRITICAL FOR GOOGLE ADSENSE & ADS APPROVAL */}
            <section id="adsense" className="bg-muted/30 p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mt-0">
                4. Google AdSense & Third-Party Advertising
              </h2>
              <p>
                We use third-party advertising companies, including <strong>Google AdSense</strong>,
                to serve ads when you visit our website. These companies may use cookies to serve
                ads based on your prior visits to our website or other websites on the internet.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sm">
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads
                  to you based on your visits to our site and/or other sites on the Internet.
                </li>
                <li>
                  You may opt out of personalized advertising by visiting the official
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
                <li>
                  Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for
                  personalized advertising by visiting
                  <a
                    href="https://youradchoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    www.aboutads.info
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-bold text-foreground">
                5. Your Data Protection Rights (GDPR / CCPA)
              </h2>
              <p>
                Depending on your geographical location, you have rights under data protection laws.
                These include the right to access the minimal data we hold about you, the right to
                correct inaccurate data, the right to request erasure, and the right to withdraw
                your consent to data processing.
              </p>
            </section>

            {/* RESOLVES EMAIL TYPO RED FLAG */}
            <section id="contact" className="pt-6 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mt-0">6. Contact Information</h2>
              <p>
                For questions regarding this policy or to request the deletion of any automated log
                data associated with your session, please contact our administrative inbox:
              </p>
              <div className="mt-4">
                <a
                  href="mailto:learntechcontact@gmail.com"
                  className="inline-flex items-center px-5 py-3 rounded-md bg-muted text-foreground border border-border font-mono font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  learntechcontact@gmail.com
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
