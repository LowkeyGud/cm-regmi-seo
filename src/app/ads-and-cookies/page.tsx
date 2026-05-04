import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";
import Script from "next/script";

export const runtime = "edge";

export const metadata = {
  title: "Privacy & Cookie Policy | CM Regmi",
  description:
    "Our comprehensive policy regarding data collection, cookie usage, and third-party advertising transparency for CM Regmi's technical hub.",
  alternates: {
    canonical: "https://cmregmi.com.np/cookies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AdsAndCookies() {
  // Schema.org Privacy Policy identification
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "Ads and Cookies Policy",
    url: "https://cmregmi.com.np/cookies",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    knowsAbout: ["Data Privacy", "Cookie Usage", "GDPR Compliance"],
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <Script
        id="policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <header className="mb-12 border-b border-border pb-8">
            <h1 className="text-4xl font-black tracking-tight mb-4">Ads & Cookies Policy</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <p>
                <strong>Effective Date:</strong> May 20, 2024
              </p>
              <span>•</span>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </header>

          <section className="space-y-6">
            <p className="text-lg leading-relaxed">
              At <strong>CM Regmi</strong>, transparency is fundamental to our technical operations.
              This policy explains how we use cookies and similar technologies to enhance your
              experience, ensure site security, and serve relevant advertisements.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              1. What are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device that help websites remember your
              preferences and analyze traffic patterns. We use both session cookies (which expire
              once you close your browser) and persistent cookies (which stay on your device until
              deleted).
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              2. Categorization of Cookies
            </h2>
            <div className="grid gap-4 mt-4">
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <h3 className="font-bold text-primary mt-0">Essential Cookies</h3>
                <p className="text-sm mb-0">
                  Strictly necessary for the website to function. These cannot be switched off and
                  do not store personally identifiable information.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <h3 className="font-bold text-primary mt-0">Analytical Cookies</h3>
                <p className="text-sm mb-0">
                  Provided by services like Google Analytics to measure site speed, page
                  performance, and popular content.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <h3 className="font-bold text-primary mt-0">Marketing & Advertising</h3>
                <p className="text-sm mb-0">
                  Used by third-party vendors to deliver ads based on your previous visits to this
                  or other websites.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              3. Google Advertising Disclosure
            </h2>
            <p>As a participant in Google-led advertising programs, we disclose the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Third-party vendors, including <strong>Google</strong>, use cookies to serve ads
                based on your prior visits.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to
                you based on your visit to this site and/or other sites on the Internet.
              </li>
              <li>
                We do not share any personally identifiable technical documentation data with these
                vendors.
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              4. User Control & Opt-Out
            </h2>
            <p>
              You have the right to control your digital footprint. You can manage or opt-out of
              personalized advertising via the following channels:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Google Ad Settings
              </a>
              <a
                href="https://youradchoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                About Ads (Opt-Out)
              </a>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground pt-8 border-t">
              5. Contact Information
            </h2>
            <p>
              If you have questions regarding this policy or how your data is handled on
              <strong> cmregmi.com.np</strong>, please reach out via our
              <Link href="/contact" className="text-primary font-bold hover:underline ml-1">
                Official Contact Page
              </Link>
              .
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
