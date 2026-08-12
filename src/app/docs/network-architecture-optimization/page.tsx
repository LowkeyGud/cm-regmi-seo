import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TableOfContents } from "@/components/TableOfContents";
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

          <TableOfContents />

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

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Real-World Example: Migrating a Branch Office from MPLS to WireGuard
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A regional distribution company ran its head office and three branch warehouses on
              legacy MPLS circuits, with the farthest branch about thirty kilometers away. That
              branch carried both an ERP client and VoIP traffic over a 4 Mbps link, and during
              month-end reconciliation the ERP sync took more than forty minutes. Calls dropped
              whenever someone uploaded a large report. The plan was to move the branch to a
              dedicated fiber line and terminate it through a WireGuard site-to-site tunnel, without
              re-architecting the applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Before the migration we recorded a baseline with the same tools described in this
              guide. A single iperf3 stream between the head office and the branch measured 3.2 Mbps
              with retransmissions spiking under load, and a traceroute showed four hops with the
              final two adding jitter above 60 milliseconds. A DF-bit ping sweep revealed a path MTU
              of only 1380 bytes; any packet above that size returned the classic "Message too long"
              error. Those three numbers became the acceptance criteria for the new link.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Baseline on the old MPLS link, head-office side
iperf3 -s

# Branch side, 30-second single-stream test
iperf3 -c 10.8.0.1 -t 30`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              On migration day we configured the head-office router as the WireGuard peer, set the
              tunnel interface MTU to 1360 on both ends to stay safely under the discovered path
              MTU, and enabled BBR with the fq queue discipline on the WAN interface. The tuning was
              placed in a drop-in file under /etc/sysctl.d so it survived reboots, and the same
              iperf3 command was re-run immediately after the cutover.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical outcome was decisive. Single-stream throughput rose from 3.2 Mbps to 86
              Mbps, packet loss across the tunnel fell to zero, and the month-end ERP sync completed
              in under six minutes. VoIP quality returned to its normal baseline because the tunnel
              no longer fragmented traffic. The entire change, including a rehearsed rollback, fit
              inside a single ninety-minute maintenance window.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Measuring Throughput and Latency with iperf3
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Kernel tuning is only useful when you can prove it changed something measurable.
              iperf3 is the standard tool for repeatable throughput tests because it prints a
              summary that is easy to compare across runs. Start the server on the endpoint you
              intend to test, then connect from the client with a fixed duration and a fixed number
              of parallel streams.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# On the receiving host, listen on the default port
iperf3 -s

# On the sending host: 30 seconds, 4 parallel streams, 1 MB TCP window
iperf3 -c 10.8.0.1 -t 30 -P 4 -w 1M`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Read the summary at the end of the client output rather than the live ticker. The Retr
              column counts retransmissions; a value that climbs as you add parallel streams is a
              strong signal that the TCP window, the MTU, or the queue discipline is wrong. Always
              run the identical command before and after a change, and record both results in your
              change log.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To compare congestion control algorithms, switch the kernel setting and re-run the
              exact same test:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Switch from cubic to BBR for this comparison
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr
sysctl net.ipv4.tcp_congestion_control
# Expected: net.ipv4.tcp_congestion_control = bbr`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              For latency, keep the test simple: ping the remote gateway with a fixed packet count
              and record the average and the jitter, which is the deviation between consecutive
              round trips. Do not rely on a single measurement. A practical habit is to store the
              iperf3 summary and the ping statistics next to the sysctl change in the change log,
              which is exactly the pattern described in the{" "}
              <Link href="/docs/incident-runbook" className="text-primary hover:underline">
                incident runbook template
              </Link>
              . When a problem appears later, you can compare against a real baseline instead of
              guessing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Applying Kernel Tuning Safely in Production
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Editing /etc/sysctl.conf works, but a drop-in file under /etc/sysctl.d is safer on
              shared hosts because it is clearly named, easy to remove, and applied automatically at
              boot. Keep the file idempotent so that running sysctl --system twice produces the same
              result.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# File: /etc/sysctl.d/99-network-tuning.conf
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_fastopen = 3

# Apply all drop-in files and verify each value
sudo sysctl --system
sysctl net.ipv4.tcp_congestion_control
sysctl net.core.rmem_max`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Large receive buffers consume kernel memory, so on nodes with limited RAM check free
              memory after applying the values and be ready to revert. A TCP window that is too
              large on a high-latency path can also delay the detection of a dropped packet. Every
              value you change should be reversible: record the previous value before you apply the
              new one, then verify the new value with a sysctl read command.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If a setting causes problems, revert immediately with sysctl -w using the old value
              and remove the drop-in file, then re-run sysctl --system so the revert survives the
              next reboot. Finish by re-running the same read command you used to confirm the
              original change. This verify-change-verify loop mirrors the configuration rollback
              discipline covered in the{" "}
              <Link
                href="/docs/infrastructure-admin-monitoring"
                className="text-primary hover:underline"
              >
                infrastructure administration and monitoring guide
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Troubleshooting Network Failures, Step by Step
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When a connection is slow or failing, work from the physical layer upward and change
              one variable at a time. This flow turns a vague symptom into a measured cause.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Confirm the physical link.</strong> Use ethtool on the WAN interface and
                check the negotiated speed. A link negotiating at 100 Mbps when the provider
                advertises 1 Gbps is a common, invisible bottleneck.
              </li>
              <li>
                <strong>Inspect interface error counters.</strong> Run ip -s link show and look at
                the dropped, errored, and overrun counters. Rising counters point at hardware or
                driver problems before any kernel tuning matters.
              </li>
              <li>
                <strong>Prove the path MTU end to end.</strong> Run a DF-bit ping sweep against the
                remote gateway with the tunnel up, not just against the local router. The remote
                endpoint is the one that matters.
              </li>
              <li>
                <strong>Inspect live TCP sessions.</strong> Use ss -tin to see window sizes, the
                congestion control in use, and retransmit counts for connections that are actually
                running.
              </li>
              <li>
                <strong>Watch the traffic itself.</strong> Capture a small sample on the tunnel
                interface with tcpdump and look for DF flags on oversized packets.
              </li>
              <li>
                <strong>Check the logs.</strong> Review journalctl for systemd-sysctl and the kernel
                ring buffer; both report rejected sysctl keys and interface errors that are easy to
                miss.
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              A worked example: the accounting application was slow every morning even though the
              physical link looked healthy and interface counters were clean. A DF-bit sweep against
              the remote gateway failed at 1472 bytes but passed at 1422, which showed the path MTU
              had changed after an upstream provider added a router. Lowering the tunnel MTU to 1400
              restored normal speeds within minutes. The key discipline was testing end to end
              instead of assuming the local configuration was the problem.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If the symptom is retransmissions but the counters are clean, run iperf3 with parallel
              streams and compare the result with the baseline you recorded earlier. A large gap
              between the baseline and the current value points to a path change rather than a local
              misconfiguration, which redirects the investigation to the carrier or the intermediate
              routers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                Why does my WireGuard tunnel still drop packets after I set MTU 1420?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The MTU on the WireGuard interface only controls what the tunnel itself sends. If
                the physical WAN path supports less than 1420 bytes, packets can still be dropped at
                an upstream router. Re-run a DF-bit ping sweep with the tunnel active, subtract the
                WireGuard overhead (roughly 60 bytes for the UDP and WireGuard headers), and set the
                interface MTU to the result. Repeat the sweep until the largest probe passes
                cleanly.
              </p>
              <h3 className="text-lg font-bold">How do I confirm that BBR is actually in use?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Run sysctl net.ipv4.tcp_congestion_control and confirm it prints bbr. The setting
                applies to new connections only; sockets established before the change keep their
                previous algorithm until they are re-established, so wait a few minutes or restart
                the client before judging the effect.
              </p>
              <h3 className="text-lg font-bold">Is TCP Fast Open safe to enable everywhere?</h3>
              <p className="text-muted-foreground leading-relaxed">
                TFO saves one round trip on repeat connections, which helps API-heavy workloads. It
                is generally safe on endpoints you control, but it changes how the kernel accepts
                connections, so enable it gradually and verify with a connection test. The value 3
                enables both the client and the server side.
              </p>
              <h3 className="text-lg font-bold">
                What payload should I start with when probing for the path MTU?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Start at 1472 bytes, which is 1500 minus the 28 bytes of IP and ICMP header.
                Decrement in steps of 8 until the probe passes, then add the 28 bytes back to obtain
                the path MTU. The result is valid only for the tested path; a different route or
                provider can produce a different value.
              </p>
              <h3 className="text-lg font-bold">
                Why is my single-stream iperf3 result far below the line rate?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A single TCP stream is limited by the window size and the round-trip time, not just
                by the link speed. Re-run the test with four or eight parallel streams and compare
                the aggregate. If parallel streams approach the line rate while a single stream does
                not, the bottleneck is a per-flow setting such as the window or queue, which is
                exactly the class of problem the sysctl tuning in this guide addresses.
              </p>
              <h3 className="text-lg font-bold">
                Should I run throughput tests through the tunnel or on the raw interface?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Run both. Testing through the tunnel validates the end-to-end configuration,
                including MTU and WireGuard overhead. Testing the raw WAN interface afterwards
                separates tunnel problems from path problems. If the raw interface is fast but the
                tunnel is slow, focus on the tunnel MTU and the queue discipline.
              </p>
              <h3 className="text-lg font-bold">What does Flags [DF] mean in a tcpdump capture?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The packet has the Don't Fragment bit set, so routers along the path will not
                fragment it. If the packet exceeds the path MTU it is dropped, and the sender
                eventually retransmits, which looks like intermittent latency. Seeing DF flags on
                packets larger than the measured path MTU is a direct sign of an MTU mismatch.
              </p>
            </div>
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

        <AdsSlot />
      </section>

      <SiteFooter />
    </div>
  );
}
