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
  title: "Network Optimization Techniques | CM Regmi Docs",
  description:
    "Practical guide to TCP buffer tuning, congestion control, traffic shaping, DNS optimization, caching, and jumbo frames.",
  alternates: { canonical: `${SITE_URL}/docs/network-optimizations` },
  openGraph: {
    title: "Network Optimization Techniques | CM Regmi Docs",
    description:
      "Practical guide to TCP buffer tuning, congestion control, traffic shaping, DNS optimization, caching, and jumbo frames.",
    url: `${SITE_URL}/docs/network-optimizations`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Optimization Techniques | CM Regmi Docs",
    description:
      "Practical guide to TCP buffer tuning, congestion control, traffic shaping, DNS optimization, caching, and jumbo frames.",
  },
  robots: { index: true, follow: true },
};

export default function NetworkOptimizationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/network-optimizations#article`,
    headline: "Network Optimization Techniques",
    description:
      "Practical guide to TCP buffer tuning, congestion control, traffic shaping, DNS optimization, caching, and jumbo frames.",
    url: `${SITE_URL}/docs/network-optimizations`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="network-optimizations-schema"
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
                <BreadcrumbPage>Network Optimizations</BreadcrumbPage>
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
              Network Optimization Techniques
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Squeezing the last bit of performance out of a network is rarely about adding
              bandwidth. It is about how the transport stack, buffers, congestion control, DNS
              resolver, and caches interact under real workload. This guide walks through the
              highest-impact TCP tuning, traffic shaping, and protocol-level optimizations you can
              apply without changing your physical links.
            </p>
          </header>

          <TableOfContents />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. TCP Buffer Sizing and Window Tuning
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every TCP connection relies on a receive and a send buffer. If the buffers are too
              small, the window cannot grow to fill the bandwidth-delay product of the link, which
              is the round-trip time multiplied by the available bandwidth. A server with a 100 ms
              latency to clients and a 10 Gbps pipe needs buffers in the tens of megabytes to keep
              that pipe full. Most operating systems ship conservative defaults tuned for a home
              connection.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On Linux you inspect and change these values with sysctl. The kernel treats the values
              as minimum, default, and maximum sizes in bytes. Raising the maximum alone is often
              enough, because the kernel can grow buffers automatically under load. Setting the
              minimum too high wastes memory on thousands of idle connections.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Show current TCP buffer settings
sysctl net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.core.rmem_max net.core.wmem_max

# Raise maximums for a high-bandwidth, long-RTT link
sudo sysctl -w net.core.rmem_max=33554432
sudo sysctl -w net.core.wmem_max=33554432
sudo sysctl -w net.ipv4.tcp_rmem="4096 131072 33554432"
sudo sysctl -w net.ipv4.tcp_wmem="4096 65536 33554432"`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Two related settings matter as much as raw buffer sizes. The first is the window
              scaling factor, which modern kernels enable by default through
              net.ipv4.tcp_window_scaling. The second is autotuning, controlled by
              net.ipv4.tcp_moderate_rcvbuf. You should leave both enabled. Disabling them forces a
              fixed small window that cripples throughput regardless of how much RAM you throw at
              the machine.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When you tune buffers, measure before and after with a tool that saturates the link. A
              raw buffer increase does nothing if the bottleneck is elsewhere. A common mistake is
              raising memory to huge values and then watching memory pressure grow, because a single
              aggressive connection can now absorb 32 MB. Keep an eye on netstat -s and the sockstat
              counters to confirm the buffers are being used rather than just reserved.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Choosing a Congestion Control Algorithm
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Congestion control decides how fast a sender grows its window and how aggressively it
              backs off when the network signals loss. The default Cubic works well on lossy
              high-bandwidth links but can be sluggish on low-latency datacenter or video traffic.
              BBR, introduced in Linux 4.9, models the network instead of reacting to loss, which
              often yields higher throughput and lower latency on high-delay links.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Enable BBR and its fair-queueing qdisc permanently
echo "net.core.default_qdisc = fq" | sudo tee -a /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control = bbr" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Confirm the change is active
sysctl net.ipv4.tcp_congestion_control`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              BBR pairs with the fq qdisc, which applies fair queueing and pacing. Without fq, BBR
              does not have the pacing control it expects and can behave inconsistently. If your
              kernel predates BBR, Cubic with an aggressive initial window is a safe fallback. The
              lesson is that the congestion control choice interacts with the queuing discipline, so
              evaluate them as a pair rather than individually.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Real networks rarely have a single ideal algorithm. If you route a mix of real-time
              voice, file transfer, and bulk backup over one pipe, the algorithm that optimizes one
              flow can punish another. That is where traffic shaping and QoS, covered in the next
              section, take over to give each flow class its own treatment.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Traffic Shaping and Quality of Service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Quality of service, or QoS, is about priorities. When a link is saturated, the router
              must decide which packets drop or queue first. Without shaping, interactive SSH and
              voice calls compete with a bulk backup for the same buffer, and the backup often wins
              simply because it generates so many packets. The result is latency spikes for
              everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Linux uses tc, the traffic control tool, to classify and shape traffic. A common
              pattern is a hierarchical token bucket that caps the total link rate, combined with a
              priority queue so that interactive traffic is dequeued before bulk traffic. The
              following snippet classifies traffic by port: ports for interactive protocols get the
              highest priority, bulk transfer gets the lowest.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Example: prioritize interactive traffic on eth0
sudo tc qdisc add dev eth0 root handle 1: htb default 30
sudo tc class add dev eth0 parent 1: classid 1:1 htb rate 950mbit
sudo tc class add dev eth0 parent 1:1 classid 1:10 htb rate 100mbit prio 0
sudo tc class add dev eth0 parent 1:1 classid 1:30 htb rate 850mbit prio 2
sudo tc filter add dev eth0 protocol ip parent 1: prio 1 \\
  u32 match ip dport 22 0xffff flowid 1:10`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Two practical rules keep shaping reliable. First, shape at the egress interface to
              something slightly below the real provider rate, because shaping above the actual line
              rate does nothing. Second, use classes for traffic you can identify, and always
              provide a default class so unknown traffic still has somewhere to go. Otherwise
              unclassified packets get dropped entirely.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              QoS is most valuable on asymmetric links like typical fiber-to-the-home, where upload
              and download are shared asymmetrically. On a symmetric enterprise link with excess
              headroom, shaping mostly adds complexity. Measure saturation before investing in an
              elaborate policy; if the link never exceeds 40 percent utilization, prioritize
              elsewhere.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. DNS Optimization</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every connection begins with a DNS lookup, so resolver latency multiplies across a
              busy service. The biggest wins come from caching at the edge, choosing a low-latency
              resolver, and reducing the number of queries a page triggers. A recursive resolver
              running locally on a caching DNS server often cuts lookup time from tens of
              milliseconds to sub-millisecond for repeated names.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For Linux you can run a small caching forwarder such as systemd-resolved or dnsmasq,
              which forwards unknown queries to an upstream provider while caching responses. This
              reduces upstream query volume and hides the latency of the upstream resolver on every
              subsequent lookup. The following configures dnsmasq to cache aggressively and forward
              to a couple of public resolvers.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# /etc/dnsmasq.conf - caching forwarder
server=1.1.1.1
server=8.8.8.8
cache-size=10000
no-negcache
log-queries
# Cache DNS results at the OS level
no-resolv`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Beyond the resolver, reduce the number of distinct hostnames in a page. Every unique
              domain in a page load forces additional lookups. Consolidating assets onto fewer
              hostnames, or using HTTP/2 connection reuse so a single TLS connection handles many
              requests, cuts the number of round trips before first byte. Setting a longer TTL on
              records that change rarely also lets both the browser and resolver cache them longer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Tune the cache to match change frequency. A record that changes rarely, like an MX or
              the canonical name of a static endpoint, can hold a TTL of a day or more. A record
              that backs a load balancer behind dynamic scaling should keep a short TTL so clients
              fail over quickly. There is a tradeoff between lookup speed and failover speed that
              you must choose deliberately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">5. Caching Strategies at the Edge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Caching is the highest-leverage optimization available because it removes work before
              it reaches the network. A reverse proxy that serves a warm copy of a static asset from
              memory avoids the backend round trip entirely. The same idea applies at the browser,
              where HTTP cache headers tell the client how long it can reuse a response without
              revalidating.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The key is correct cache semantics rather than aggressive caching. Static assets that
              are content-addressed, meaning their filename includes a content hash, can be cached
              for months. HTML pages that change frequently should use a short TTL with revalidation
              so clients always get current content while still avoiding a full download on every
              visit. The interaction with your TCP tuning matters too: a cache hit means the heavy
              transport work happens once and then gets replayed cheaply.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Example response headers for a content-hashed static asset
Cache-Control: public, max-age=31536000, immutable
ETag: "a1b2c3d4"

# For a frequently changing HTML page, revalidate instead
Cache-Control: public, max-age=60, must-revalidate`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Measure cache hit ratio rather than assuming it is high. A low ratio means your
              content-addressing or invalidation scheme is broken, and no amount of bandwidth will
              fix the repeated origin fetches. Tools that inspect response headers in bulk, combined
              with access-log analysis of cache status, reveal which objects miss most and why.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Jumbo Frames and MTU Considerations
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A standard Ethernet frame carries up to 1500 bytes of payload. Jumbo frames allow up
              to 9000 bytes, which reduces the number of packets, and therefore the per-packet CPU
              and header overhead, for large transfers. On a storage or backup network that moves
              bulk data, jumbo frames can noticeably improve throughput and lower CPU usage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Jumbo frames only help if the entire path supports them, from the source NIC through
              every switch to the destination. A single switch port or link misconfigured to 1500
              bytes will fragment, drop, or silently throttle jumbo traffic. The safe way to confirm
              support is end-to-end packet size discovery rather than trusting a local MTU setting.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Set MTU 9000 on a Linux interface
sudo ip link set dev eth0 mtu 9000

# Verify end-to-end jumbo support to a peer
ping -M do -s 8972 10.0.0.20
# Success implies a path MTU of at least 9000`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              The -M do flag disables fragmentation, so success proves every hop can carry a 9000
              byte frame. If the ping fails, walk the MTU down until you find the largest supported
              size, then decide whether to keep jumbo frames or revert. For internet-facing traffic,
              keep MTU at 1500 because the public path is out of your control and jumbo frames
              rarely survive across providers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A common real-world outcome: a home-lab storage server moving nightly backups across a
              dedicated 10 Gbps switch. Enabling jumbo frames on the storage VLAN and the backup
              host cut CPU utilization during transfers by about a third while throughput stayed
              flat, because the bottleneck was the disk, not the wire. That is the pattern to
              expect, jumbo frames reduce overhead without creating bandwidth, so pair them with
              fast storage to see real gains.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. A Worked Example: Optimizing a Home-Lab Backup Link
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Consider a small home-lab with a NAS, a dedicated backup server, and a 10 Gbps switch
              connecting them to a router that peers to a 1 Gbps ISP link. Nightly backups of
              several terabytes were taking far longer than the raw bandwidth suggested, and
              interactive access to the NAS during the backup became sluggish.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The first fix was TCP buffer tuning on the backup server and NAS, because the default
              buffers capped throughput below the 10 Gbps line rate. Raising the receive and send
              maximums and confirming autotuning was active immediately removed the flat 2 Gbps
              ceiling. Next, BBR plus the fq qdisc reduced latency under load and kept throughput
              high on the storage VLAN.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Then came shaping. Rather than let backups flood the 1 Gbps ISP uplink, a tc policy
              capped backup egress to 70 percent of the line rate and gave interactive SSH and the
              NAS management web UI a priority class. Interactive latency returned to normal during
              backup windows. Finally, jumbo frames on the storage VLAN cut CPU overhead on the
              transfer path. The combined result was a backup window that finished faster, lower
              peak CPU, and no more interactive stalls, all from configuration changes with no new
              hardware.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The order matters. Start with buffers and congestion control, measure, then add
              shaping to protect latency, and only then consider jumbo frames. Each step compounds
              on the previous one, and measuring after each change tells you which step actually
              moved the number you care about.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Troubleshooting Network Optimization Issues
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When a tuned network does not perform as expected, work methodically from the physical
              layer up. Confirm the link itself can saturate with a direct iperf test before blaming
              kernel settings. If iperf shows the wire speed but real transfers are slow, the
              bottleneck is upstream in buffers, DNS, or the application, not the cable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Use retransmission counts as a first signal. A high rate of TCP retransmissions points
              to buffer or congestion problems. Check ethtool statistics for dropped and errored
              frames, and confirm the NIC queues are not overflowing. If retransmissions are low but
              throughput is low, suspect window sizing or a rate limiter.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Always isolate variables. Tune one sysctl, measure, revert if it does not help, and
              move on. Restart everything at once and you will not know which change mattered, or
              which one caused a regression. Keep a baseline measurement of throughput, latency, and
              retransmissions so you can compare each experiment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For deeper tracing, pair these techniques with the field guide in{" "}
              <Link href="/docs/network-troubleshooting" className="text-primary hover:underline">
                Network Troubleshooting
              </Link>
              . If the bottleneck is DNS or caching rather than transport, the diagnostic approach
              in that guide applies directly. Related reading on keeping your overall lab healthy
              lives in{" "}
              <Link
                href="/docs/infrastructure-admin-monitoring"
                className="text-primary hover:underline"
              >
                Infrastructure Admin Monitoring
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">9. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Q: Should I always enable BBR on every server?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Not always. BBR shines on high-bandwidth, high-delay links and under loss. On a
                low-latency LAN or when your kernel is old, Cubic is fine. Test with iperf under
                real load and compare throughput and latency before switching globally.
              </p>
              <h3 className="text-lg font-bold">Q: Do jumbo frames speed up the internet?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Jumbo frames help only within networks you control, like a storage VLAN. The
                public internet path uses 1500-byte frames, so keep internet-facing MTU at 1500 and
                reserve jumbo frames for internal links that are end-to-end jumbo capable.
              </p>
              <h3 className="text-lg font-bold">
                Q: Why did my throughput drop after I raised TCP buffers?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Large buffers can increase latency under bufferbloat and waste memory on many idle
                connections. Raise the maximum but keep autotuning on, and confirm you are not
                setting a huge minimum. Measure retransmissions and memory pressure after the
                change.
              </p>
              <h3 className="text-lg font-bold">
                Q: Is traffic shaping worth it on a small setup?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Only if you actually saturate a link. On an idle symmetric pipe, shaping adds
                complexity with no benefit. It earns its keep on asymmetric ISP links or during bulk
                backup windows where interactive traffic must stay responsive.
              </p>
              <h3 className="text-lg font-bold">Q: What is bufferbloat and why does it matter?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bufferbloat is excessive latency caused by oversized buffers that hold packets too
                long during congestion. It is why latency spikes under load even when bandwidth is
                fine. Active queue management like the fq qdisc and sane buffer caps reduce it.
              </p>
              <h3 className="text-lg font-bold">Q: How do I pick a good DNS TTL?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Match the TTL to how often the record changes and how quickly you need failover.
                Static records can live for a day. Records that back scaling or failover should be
                short so clients notice the change quickly, trading some lookup latency for faster
                resilience.
              </p>
              <h3 className="text-lg font-bold">
                Q: Which single change gives the most benefit first?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Usually raising the TCP buffer maximums and confirming autotuning, because default
                buffers are the most common throughput ceiling. Measure before and after, then move
                on to congestion control and shaping only if the numbers still fall short.
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
