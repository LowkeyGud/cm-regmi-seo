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

const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Network Troubleshooting Field Guide | CM Regmi Docs",
  description:
    "Methodical approach to diagnosing latency, packet loss, and connectivity with ping, traceroute, mtr, tcpdump, iperf, and DNS queries.",
  alternates: { canonical: `${SITE_URL}/docs/network-troubleshooting` },
  openGraph: {
    title: "Network Troubleshooting Field Guide | CM Regmi Docs",
    description:
      "Methodical approach to diagnosing latency, packet loss, and connectivity with ping, traceroute, mtr, tcpdump, iperf, and DNS queries.",
    url: `${SITE_URL}/docs/network-troubleshooting`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Troubleshooting Field Guide | CM Regmi Docs",
    description:
      "Methodical approach to diagnosing latency, packet loss, and connectivity with ping, traceroute, mtr, tcpdump, iperf, and DNS queries.",
  },
  robots: { index: true, follow: true },
};

export default function NetworkTroubleshootingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/network-troubleshooting#article`,
    headline: "Network Troubleshooting Field Guide",
    description:
      "Methodical approach to diagnosing latency, packet loss, and connectivity with ping, traceroute, mtr, tcpdump, iperf, and DNS queries.",
    url: `${SITE_URL}/docs/network-troubleshooting`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="network-troubleshooting-schema"
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
                <BreadcrumbPage>Network Troubleshooting</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Networking
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Network Troubleshooting Field Guide
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A slow or flaky network usually announces its problem through three symptoms: latency,
              packet loss, or outright connectivity failure. This field guide gives you a repeatable
              workflow to separate the cause from the symptom using tools that are already on almost
              every machine, from ping and traceroute to mtr, tcpdump, iperf, and DNS queries.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Start With a Hypothesis, Not a Tool
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The most common troubleshooting mistake is running a dozen tools at once and chasing
              whichever output looks alarming. Instead, form a hypothesis from the symptom. Is one
              site slow while everything else is fine, which points to DNS or a remote path? Is the
              whole office slow, which points to a shared uplink or router? Is a single machine
              slow, which points to its NIC, cables, or local software?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Write down the symptom, the expected behavior, and the first tool you will use. Each
              tool narrows the range of possible causes. This discipline turns a chaotic session
              into a short path to the root cause and prevents you from adjusting settings that were
              never the problem in the first place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Baseline Connectivity With Ping
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Ping is the first tool because it answers two questions instantly: can I reach the
              host, and how long does a round trip take? It sends an ICMP echo request and reports
              the round-trip time and any loss. Run a longer, continuous ping to your gateway, then
              to a public address, and note the difference.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Continuous ping to your default gateway
ping -c 100 192.168.1.1

# With timestamps to correlate spikes with events
ping -D 8.8.8.8`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Interpreting the numbers matters. A steady low latency to your gateway but high
              latency to the internet means the problem is outside your network. Spikes that line up
              with backups or media streams point to bufferbloat on your own links. Occasional loss
              to a remote host is normal on congested public paths, so do not overreact to a single
              dropped packet.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Remember that ICMP is often rate-limited or blocked. A host that does not answer ping
              may still be perfectly reachable for TCP traffic. Treat ping as a fast signal, not the
              final word, and confirm any finding with a TCP-level test before drawing conclusions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Traceroute to Find Where the Path Degrades
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When latency is high or the path is unclear, traceroute reveals every hop between you
              and the destination and the time each hop reports. It sends packets with increasing
              TTL so each router in turn replies. The output shows where latency jumps, where loss
              begins, and whether the path even reaches the target.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Classic traceroute
traceroute -n 8.8.8.8

# From PowerShell on Windows
tracert -d 8.8.8.8`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Reading traceroute requires caution. A hop that shows no reply is often just a router
              that does not answer ICMP for security, not a failure. Latency from your location to
              the first few hops is the true measure; latency across remote hops is not added to the
              same time base, so a high reading there may be the router's processing time, not a
              real problem.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The real value is in the shape of the graph. If latency is low and stable through your
              ISP's first hop and then jumps at a specific transit hop, you have found the region to
              blame, even if you cannot fix it. If latency climbs gradually, the path itself is long
              or congested, which is a routing decision you may be able to influence.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Use mtr to Watch Continuously</h2>
            <p className="text-muted-foreground leading-relaxed">
              Traceroute gives a snapshot; mtr combines traceroute with continuous ping, repeating
              the probe to every hop and reporting loss and latency that changes over time. This
              makes transient problems, intermittent loss, and worsening congestion visible, while a
              single traceroute run might miss them entirely.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Combine ping + traceroute in a live view
mtr -rwz 8.8.8.8

# report mode, 20 cycles, numeric output
mtr -r -c 20 -n 1.1.1.1`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Watch the loss column carefully. Loss at the first hop is usually the real loss on
              your local link. Loss at a middle hop that does not appear in later hops is likely the
              router not answering some probes, not genuine loss. Genuine loss is loss that persists
              to the final destination, because that loss affects your traffic directly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Running mtr to several independent destinations helps you decide whether a problem is
              general or path-specific. If every destination degrades at roughly the same hop, your
              ISP's upstream is congested. If only one destination is bad, the fault is on that
              remote network or the path to it, and your options are different.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Measure Throughput With iperf</h2>
            <p className="text-muted-foreground leading-relaxed">
              Latency and loss tell you the link is unhealthy, but they do not tell you how much
              real data can move. iperf saturates a link with test traffic and reports the achieved
              throughput. It is the definitive way to separate a slow application from a slow
              network, because it removes the application from the equation.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# On the server
iperf3 -s

# On the client, test for 30 seconds
iperf3 -c 10.0.0.20 -t 30`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Run iperf in both directions and with a few TCP window sizes, because asymmetric links
              behave differently each way. Compare the result to the link's rated speed and to a
              local test between two machines on the same switch. If local iperf is fast but
              internet iperf is slow, your ISP uplink is the limit. If even local iperf is slow, the
              problem is inside your network, on a cable, switch, or NIC.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              iperf also helps validate optimization work. If you are tuning TCP buffers or
              congestion control, iperf is the repeatable benchmark you run before and after each
              change to prove it moved the needle. This mirrors the measurement-first discipline
              discussed in{" "}
              <Link
                href="/docs/measuring-performance-safely"
                className="text-primary hover:underline"
              >
                Measuring Performance Safely
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">6. Inspect Packets With tcpdump</h2>
            <p className="text-muted-foreground leading-relaxed">
              When the path looks fine but a specific service misbehaves, tcpdump captures the
              actual packets on the wire. It shows retransmissions, handshake failures, malformed
              responses, and whether traffic even reaches the interface. Nothing else confirms what
              is really happening as directly as reading the packets themselves.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Capture on an interface with a filter for a host and port
sudo tcpdump -i eth0 host 10.0.0.20 and port 443

# Count retransmissions to spot loss at the TCP layer
sudo tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'
sudo netstat -s | grep -i retrans`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Start with a narrow filter to keep output manageable, then broaden as needed. A burst
              of retransmissions confirms loss or an undersized buffer. A connection that never
              completes the three-way handshake points to a firewall dropping SYNs rather than a
              network fault. Repeated out-of-order segments often indicate a load-balanced or
              asymmetric path.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              tcpdump output is dense, so capture to a file and analyze offline with a tool like
              Wireshark when the trace is complex. The value of tcpdump is that it shows you ground
              truth, so use it to confirm or reject a hypothesis rather than to explore randomly.
              Capturing with no plan is a fast way to generate hundreds of lines of noise.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. Diagnose DNS Problems With Query Tools
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Many "the internet is down" reports turn out to be DNS failures. Before touching
              network gear, test whether name resolution works. If a page loads by IP but not by
              name, or a browser says it cannot find the server, the problem is almost always DNS,
              not the network path.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query a name against the system resolver and a public one
nslookup example.com
nslookup example.com 1.1.1.1

# Show full lookup timing and server used
dig example.com +time
dig @1.1.1.1 example.com +stats`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Compare the answer from your resolver against a public resolver. If your resolver is
              slow, missing, or returns stale records, fix that resolver first. Query timing reveals
              slow upstreams, and repeated queries that always hit upstream rather than cache point
              to a broken cache. A record that resolves on the public resolver but not yours often
              indicates a local DNS server issue.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Check the server your resolver uses. Misconfigured DNS on a client can point to an
              unreachable or slow server, adding latency to every lookup. For more depth on making
              lookups faster, see the DNS section of{" "}
              <Link href="/docs/network-optimizations" className="text-primary hover:underline">
                Network Optimization Techniques
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. A Worked Example: Intermittent Slow Web Access
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Consider a small office where web browsing periodically becomes sluggish for a few
              minutes at a time. No outages are reported, just slowdowns. The instinct is to blame
              the ISP, but a methodical pass tells a different story.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A continuous ping to the office gateway showed stable low latency, so the local link
              was fine. mtr to several public destinations showed the slowdown matched a transit hop
              shared by all paths, but loss was not reaching the destination, so the public network
              was congested rather than broken. iperf to the ISP uplink confirmed the line could
              still carry full speed. The picture was bufferbloat, not loss.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because the gateways buffers were filling during congestion, latency spiked while
              bandwidth stayed high. The fix was traffic shaping at the router to cap upload to
              below the real line rate and prioritize interactive traffic, plus enabling an active
              queue management discipline. Afterward, interactive latency stayed flat during the
              same busy periods. The practical outcome was that the slowdowns stopped without any
              ISP ticket, purely from understanding whether the symptom was loss or latency.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The lesson is that each tool answers a different question. Ping said reachability was
              fine, mtr located the congested region, iperf ruled out a line fault, and the shape of
              the latency pointed to buffers rather than loss. Together they turned a vague
              complaint into a specific, fixable condition.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. Troubleshooting the Troubleshooting Process
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If the tools all look normal but the symptom persists, the gap is usually between the
              symptom and the test. A latency problem on a specific application will not show up in
              a ping to the gateway, because the traffic never reaches that application. Reproduce
              the actual failing operation while capturing at the interface to see the real traffic
              pattern.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another common trap is testing at the wrong time. Network problems are frequently
              intermittent and tied to load, so a single test during an idle period proves nothing.
              Run continuous tools like mtr during the reported symptom window, and keep a baseline
              so you can recognize an anomaly when you see one. Logging your tests, timestamps, and
              results turns a confusing session into a replayable record.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For a structured incident process, review the{" "}
              <Link href="/docs/incident-runbook" className="text-primary hover:underline">
                Incident Runbook
              </Link>{" "}
              to see how a good response sequence keeps a diagnosis on track. And remember that
              noisy data is common on the public internet, so distinguishing genuine loss from
              uncooperative routers is the skill that makes these tools usable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">
                Q: Why does traceroute show loss but the site works?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Many routers do not answer every ICMP probe, which shows up as loss at that hop even
                though your real traffic passes through fine. Genuine loss is loss that persists to
                the final destination. Focus on the last hop.
              </p>
              <h3 className="text-lg font-bold">
                Q: Ping works but the website is still slow, why?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ping only proves basic reachability and latency to a host. Web traffic adds DNS, TCP
                handshakes, TLS, and the server's own load. Use dig for DNS, iperf for throughput,
                and tcpdump to see the actual connection progress.
              </p>
              <h3 className="text-lg font-bold">
                Q: What is the difference between latency and throughput?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Latency is the time for a single round trip; throughput is how much data moves per
                second. High latency makes each small request slow, while low throughput slows large
                transfers. Both can be bad independently, and each is measured by different tools.
              </p>
              <h3 className="text-lg font-bold">Q: Is packet loss always the ISP's fault?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Not at all. Loss can come from a bad cable, an oversubscribed local switch, a
                failing NIC, or an undersized buffer on your own router. Test locally with iperf and
                mtr before blaming the provider.
              </p>
              <h3 className="text-lg font-bold">Q: Why does mtr need sudo to run?</h3>
              <p className="text-muted-foreground leading-relaxed">
                mtr sends raw IP packets to set the TTL that traceroute relies on, which requires
                elevated privileges. Some platforms offer a setuid or capability-based install that
                avoids sudo, but running it as a normal user restricts that feature.
              </p>
              <h3 className="text-lg font-bold">Q: How do I know if my DNS is the real problem?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Load the failing site by its IP address. If it loads by IP but not by name, or if
                dig returns slow or empty results while a public resolver answers fast, DNS is the
                culprit. Compare your resolver to a public one directly.
              </p>
              <h3 className="text-lg font-bold">
                Q: Should I use ICMP blocking as a security measure?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Blocking all ICMP hurts troubleshooting and path MTU discovery. If you must limit
                it, allow a modest rate of echo requests rather than dropping everything, so both
                your own diagnostics and your network's health checks still function.
              </p>
            </div>
          </section>

          <div className="mt-8 pt-4 border-t border-border">
            <Link href="/docs" className="text-primary hover:underline">
              Back to Docs Hub
            </Link>
          </div>
          <AdsSlot />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
