import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Network Optimizations for Reliability | CM Regmi Docs",
  description: "Practical network optimizations: MTU, queueing, and failure isolation.",
  alternates: { canonical: `${SITE_URL}/docs/network-optimizations` },
};

export default function NetworkOptimizations() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/network-optimizations#article`,
    headline: "Network Optimizations for Reliability",
    description: "Practical network optimizations: MTU, queueing, and failure isolation.",
    url: `${SITE_URL}/docs/network-optimizations`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="netopt-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Network Optimizations for Reliability</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>
        <p className="text-muted-foreground mb-4">
          Small configuration changes can reduce packet loss and latency variance. Focus on MTU
          alignment, sensible queueing disciplines, and keeping buffers sized for real traffic
          patterns rather than worst-case bursts.
        </p>
        <h2 className="text-xl font-semibold mt-6">MTU and path MTU discovery</h2>
        <p className="text-muted-foreground mb-4">
          Match MTU across tunnels and interfaces to avoid fragmentation and path discovery delays.
          When using tunnels, test actual packet sizes across paths rather than assuming defaults.
        </p>
        <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
          <code>{`# Test path MTU
ping -M do -s 1460 example.com
# shrink payload until packets succeed`}</code>
        </pre>
        <h2 className="text-xl font-semibold mt-6">Queueing and latency</h2>
        <p className="text-muted-foreground mb-4">
          Queueing discipline matters when a connection is busy. Use fq_codel on Linux for
          general-purpose latency reduction on congested links.
        </p>
        <h2 className="text-xl font-semibold mt-6">Test one change at a time</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Change MTU before changing queue settings.</li>
          <li>Measure the effect on a known path, not only on idle links.</li>
          <li>Keep notes on what helped and what made things worse.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6">Failure isolation</h2>
        <p className="text-muted-foreground mb-4">
          A good network change should make failures easier to localize, not harder.
        </p>
        <h2 className="text-xl font-semibold mt-6">Basic checks to run</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Measure latency and packet loss with <code>mtr</code> or <code>ping</code> before and
            after changes.
          </li>
          <li>
            Use <code>tc</code> to apply fq_codel on Linux and measure queueing delay under load.
          </li>
          <li>Document the old config so you can revert quickly if behaviour worsens.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6">How I avoid over-tuning</h2>
        <p className="text-muted-foreground mb-4">
          I try not to turn a working network into a tuning hobby. The best result is often the one
          that removes the obvious bottleneck and then stops.
        </p>
        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>
      </main>
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="netopt-1" />
      </section>
      <SiteFooter />
    </div>
  );
}
