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
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Network Architecture, Optimization & Troubleshooting Guide | CM Regmi Docs",
  description:
    "Advanced TCP/IP kernel tuning, split-tunnel VPN, WireGuard site-to-site architecture, MTU discovery, and network tracing.",
  alternates: {
    canonical: `${SITE_URL}/docs/network-architecture-optimization`,
  },
};

export default function NetworkArchitectureOptimizationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/network-architecture-optimization#article`,
    headline: "Network Architecture, Optimization & Troubleshooting Guide",
    description:
      "Deep-dive guide to enterprise networks, routing, and low-latency transport protocols.",
    url: `${SITE_URL}/docs/network-architecture-optimization`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-27",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="network-opt-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
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
                <BreadcrumbLink asChild>
                  <Link href="/docs">Docs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Network Architecture & Optimization</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Network Operations
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Network Architecture, Optimization & Troubleshooting Guide
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 26, 2026 • Updated May 27, 2026
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Modern low-latency application delivery depends heavily on transport protocol
              efficiency, routing stability, and secure vpn tunneling. Resolving throughput
              constraints requires deep optimizations within sysctl settings, MTU discovery
              mechanisms, and split-tunnel setups.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Tuning the Linux TCP/IP Stack for High Throughput
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Default Linux kernel TCP/IP network buffers are optimized for low-bandwidth
              connections or localized desktop usage. On high-performance nodes, these defaults
              create immediate bottlenecks.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Administrators should optimize TCP window sizing, congestion control algorithms, and
              queue limits using sysctl:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Append these optimizations to /etc/sysctl.conf
# Enable BBR TCP Congestion Control (requires Linux 4.9+)
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr

# Increase maximum TCP receive and send window buffers
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216

# Enable TCP Fast Open (TFO) to speed up connection handshakes
net.ipv4.tcp_fastopen = 3`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Apply configurations immediately without rebooting the system:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`sudo sysctl -p
# Result: BBR active, kernel sockets readied for low-latency traffic`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. MTU Path Discovery & Network Fragmentation Triage
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Maximum Transmission Unit (MTU) conflicts are a common cause of stalled connections,
              failed SSL handshakes, and packet loss. When packets exceed the MTU of any
              intermediary node along the path, they are fragmented or dropped silently.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To locate the exact MTU constraints on a network path, run a ping probe sweeping the
              size while setting the "Don't Fragment" (DF) bit:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Execute a ping probe with a size of 1472 bytes (plus 28 bytes of headers = 1500 byte packet)
ping -M do -s 1472 -c 3 example.com

# If packet fails with "local error: Message too long", decrement size until it passes:
ping -M do -s 1422 -c 3 example.com
# Once successful, add header bytes to calculate the exact MTU (1422 + 28 = 1450 MTU)`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Securing Connections with WireGuard VPN Site-to-Site Tunnels
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              WireGuard operates inside the Linux kernel space, offering superior performance,
              simpler key management, and drastically reduced overhead compared to legacy IPsec or
              OpenVPN solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For enterprise routing, implement split-tunnel configurations that direct corporate
              subnet traffic through the tunnel while routing general public internet traffic
              through the default gateway:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# File: /etc/wireguard/wg0.conf
[Interface]
PrivateKey = eI2f/Xh7... (Client Private Key)
Address = 10.8.0.2/24
DNS = 10.8.0.1
MTU = 1420

[Peer]
PublicKey = gU3a9kK1... (Server Public Key)
Endpoint = gateway.enterprise.com:51820
# Split-tunneling: route only corporate subnets through VPN
AllowedIPs = 10.0.0.0/8, 192.168.10.0/24`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Case Study: Troubleshooting Latency Spikes inside a VPN
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An offsite accounting team complained of severe application latency and disconnected
              sessions during high-volume data loads. We initiated a multi-layered diagnostic pass.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              First, we performed a traceroute to inspect latency hops across the VPN gateway:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Run traceroute checking path latency
traceroute -I -q 1 10.8.0.1

# Output indicated:
#   1  10.8.0.1 (VPN Gateway)  18.2ms
#   2  192.168.1.1 (Intermediary Router)  114.5ms (Severe spikes here)
#   3  * * * (Dropped packets)`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The traceroute identified a bottleneck at the intermediary router. We ran a packet
              trace on the local server interface to inspect traffic flow and fragmentation flags:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Run a brief packet trace on the WireGuard interface
tcpdump -n -i wg0 -c 100

# Capture showed:
#   IP 10.8.0.2 > 10.8.0.1: Flags [DF], proto UDP, length 1500 (need to fragment but DF set)`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The trace confirmed that the local WireGuard client interface was attempting to push
              packets with a standard 1500-byte MTU. The WAN connection possessed an MTU limit of
              1450, dropping UDP fragments. Lowering the WireGuard MTU setting to 1420 resolved the
              issue, eliminating drops and restoring latency to a stable 18ms baseline.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Verification & Diagnostic Playbook
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Implement these verification steps when diagnosing network issues:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Step A:</strong> Test basic reachability with `ping` to confirm local and
                remote gateway routing.
              </li>
              <li>
                <strong>Step B:</strong> Trace network hops using `traceroute` to isolate path
                latency bottlenecks.
              </li>
              <li>
                <strong>Step C:</strong> Check MTU sizes using DF-bit ping sweeps to find the
                maximum non-fragmented packet size.
              </li>
              <li>
                <strong>Step D:</strong> Monitor live packet flows with `tcpdump` to verify MTU
                compliance and identify drops.
              </li>
            </ul>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
        </article>
      </main>

      <section className="space-y-6 mx-auto max-w-3xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">
          Validation, MTU discovery & reproducible tuning
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          After applying sysctl or kernel tuning, validate the change with reproducible tests.
          Capture before/after measurements using iperf3 for throughput, ping sweeps for MTU, and
          traceroute for hop-level latency. Keep the exact commands and environment in your runbook
          so tests are repeatable by other engineers.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          For MTU issues, run DF-bit ping sweeps to locate the maximum non-fragmenting packet size,
          then adjust WireGuard or interface MTU accordingly. Document the measured MTU value with
          the test timestamp and the endpoint used for verification.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          When tuning TCP buffers or enabling BBR, run multiple short iperf3 runs and record median
          values; do not rely on a single test which can be skewed by transient traffic.
        </p>

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="network-hardening-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
