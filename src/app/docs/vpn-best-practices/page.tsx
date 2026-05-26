import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "VPN Best Practices | CM Regmi Docs",
  description:
    "Guidance for secure, performant VPN configurations and split-tunnel considerations.",
  alternates: { canonical: `${SITE_URL}/docs/vpn-best-practices` },
};

export default function VPNBestPractices() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/vpn-best-practices#article`,
    headline: "VPN Best Practices",
    description:
      "Guidance for secure, performant VPN configurations and split-tunnel considerations.",
    url: `${SITE_URL}/docs/vpn-best-practices`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="vpn-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">VPN Best Practices</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Choose a simple, well-understood VPN technology (for example WireGuard) and prefer
          configurations that minimise surface area: use split-tunnel when appropriate, avoid
          routing unnecessary traffic through the tunnel, and check MTU behaviour on real paths.
        </p>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Practical MTU and fragmentation checks</h2>
          <p className="text-muted-foreground">
            Tunnels add extra headers which can cause fragmentation. A simple probe using ping can
            help find a safe MTU:
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# find largest MTU that doesn't fragment (Linux)
ping -M do -s 1420 example.com
# reduce the size until packets succeed`}</code>
          </pre>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">WireGuard example (minimal)</h2>
          <p className="text-muted-foreground">
            WireGuard is simple and performant; below is a minimal peer config for a client.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`[Interface]
PrivateKey = <client-key>
Address = 10.0.0.2/32
DNS = 1.1.1.1
MTU = 1420

[Peer]
PublicKey = <server-key>
Endpoint = vpn.example.com:51820
AllowedIPs = 0.0.0.0/0, ::/0`}</code>
          </pre>
          <p className="text-muted-foreground">
            For split-tunnel, set <code>AllowedIPs</code> to only the networks that must traverse
            the VPN (for example <code>10.0.0.0/8</code>, <code>192.168.0.0/16</code>).
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Operational monitoring</h2>
          <p className="text-muted-foreground">
            Monitor VPN uptime, handshake frequency, and error rates. Export interface counters to
            your monitoring system and alert on increased packet loss or excessive rekeying.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Verification checklist</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Test DNS and routing before and after enabling the tunnel.</li>
            <li>Confirm only the intended services are exposed over the tunnel.</li>
            <li>Check MTU behaviour using real-path probes.</li>
          </ul>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Examples & commands</h2>
          <p className="text-muted-foreground">
            Practical commands and a short example help engineers reproduce and verify the behaviour
            quickly.
          </p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# Quick example
echo "verify service"`}</code>
          </pre>
          <h3 className="text-lg font-semibold">Verification & outcomes</h3>
          <p className="text-muted-foreground">
            After applying a change, measure the outcome and record whether the problem improved.
            Keep the verification script committed with the docs.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Run the verification script</li>
            <li>Confirm expected output</li>
            <li>Log results and next steps</li>
          </ul>
        </section>
      </main>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="vpn-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
