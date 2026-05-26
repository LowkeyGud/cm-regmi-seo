import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Metadata } from "next";
import Link from "next/link";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";
export const metadata: Metadata = {
  title: "Local Network Troubleshooting | CM Regmi Docs",
  description: "A practical local network troubleshooting checklist for connectivity issues.",
  alternates: { canonical: `${SITE_URL}/docs/network-troubleshooting` },
};

export default function NetworkTroubleshooting() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/network-troubleshooting#article`,
    headline: "Local Network Troubleshooting",
    description: "A practical local network troubleshooting checklist for connectivity issues.",
    url: `${SITE_URL}/docs/network-troubleshooting`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="net-trouble-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Local Network Troubleshooting</h1>
        <p className="text-sm text-muted-foreground mb-4">
          By <strong>CM Regmi</strong> • Published May 26, 2026
        </p>

        <p className="text-muted-foreground mb-4">
          Start simple: check physical links, IP addresses, DNS, and routing. Isolate the scope of
          the failure (device, local network, ISP) before changing configurations.
        </p>
        <p className="text-muted-foreground mb-4">
          I always try to narrow a network issue before touching settings, because changing things
          too early usually makes the diagnosis messier. A clean checklist keeps the problem in view
          and stops me from chasing three causes at once.
        </p>

        <h2 className="text-xl font-semibold mt-6">Basic checklist</h2>
        <ol className="list-decimal pl-6 text-muted-foreground">
          <li>Confirm physical connectivity and link lights.</li>
          <li>Verify IP address and gateway configuration.</li>
          <li>Test DNS resolution using authoritative resolvers.</li>
          <li>Trace routes to suspect endpoints and check for asymmetric paths.</li>
        </ol>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Useful commands (quick reference)</h2>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
            <code>{`# show interfaces and addresses
ip addr show

# check routing table
ip route show

# DNS lookup
dig +short example.com @1.1.1.1

# basic path test
traceroute example.com

# interactive path + latency (mtr)
mtr --report example.com

# capture a brief packet trace (requires root)
tcpdump -i eth0 -w /tmp/capture.pcap host 203.0.113.5 and port 443 -c 100`}</code>
          </pre>

          <p className="text-muted-foreground">
            Keep captures short and avoid capturing sensitive payloads. Use secure transfer to move
            traces to analysis systems.
          </p>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Step-by-step workflow</h2>
          <ol className="list-decimal pl-6 text-muted-foreground">
            <li>
              Confirm whether the issue affects a single client, multiple devices, or the entire
              network.
            </li>
            <li>
              If single-client: check local interface, firewall rules, and DNS settings on that
              device.
            </li>
            <li>
              If multiple clients: check DHCP server, switch ports, VLANs, and upstream provider
              reachability.
            </li>
            <li>
              Collect a timed trace (mtr or traceroute) and a small tcpdump sample for correlation.
            </li>
            <li>
              Escalate to the ISP with the time-stamped evidence if the path fails beyond their
              handoff point.
            </li>
          </ol>
        </section>

        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Example scenario</h2>
          <p className="text-muted-foreground">
            A laptop could not reach one public service but other devices on the same network could.
            The root cause was an IPv6-only route leaking from a VPN client. The fix was to remove
            the erroneous route and pin the client to prefer IPv4 for that host. Documenting the
            exact commands used during diagnosis saved time during rollback.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/docs" className="text-primary hover:underline">
            Back to Docs Hub
          </Link>
        </div>

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
        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="net-trouble-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
