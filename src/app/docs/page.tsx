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
import Link from "next/link";

export const runtime = "edge";

export const metadata = {
  title: "Technical Documentation & Architecture | CM Regmi",
  description: "Explore CM Regmi's central technical documentation hub containing in-depth playbooks for Android kernel optimization and Windows system hardening strategies.",
  openGraph: {
    title: "Technical Documentation & Architecture | CM Regmi",
    description: "Explore CM Regmi's central technical documentation hub containing in-depth playbooks for Android kernel optimization and Windows system hardening strategies.",
  },
  alternates: {
    canonical: "https://cmregmi.com.np/docs",
  },
};

export default function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Docs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article>
          <header className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
              ◢ Documentation
            </p>
            <h1 className="text-5xl font-black tracking-tight">Documentation Hub</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Long-form technical documentation, kernel notes, hardening playbooks, and architecture
              decision records.
            </p>
          </header>

          <section className="mt-12 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Android Kernel Optimization</h2>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
              alt="Macro shot of a high-performance computer CPU circuit board representing hardware-level tuning"
              className="rounded-lg object-cover w-full h-64 border border-border"
            />
            <p className="text-muted-foreground leading-relaxed">
              Optimizing Android kernels requires an in-depth understanding of the CPU frequency governors, task scheduling paradigms, and aggressive thermal thresholds. By modifying parameters within EAS (Energy Aware Scheduling), developers can achieve significantly improved battery life without compromising peak UI responsiveness. Additionally, disabling extraneous wakelocks and utilizing custom EAS algorithms ensures background tasks remain strictly confined to the efficiency cluster.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Furthermore, advanced memory management via ZRAM tweaking and adjusting the swappiness parameters allows resource-constrained devices to handle large context-switching payloads efficiently. Overclocking the GPU and undervolting the CPU requires careful stability testing to prevent random soft-reboots under heavy compute workloads.
            </p>
          </section>

          <section className="mt-12 space-y-6 flex-1 pb-12">
            <h2 className="text-3xl font-bold tracking-tight">Windows System Hardening</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reducing the attack surface of a Windows environment through strict Group Policy Objects (GPO) enforcement, telemetry disabling, and advanced endpoint protection strategies is fundamental for a secured enterprise node. Hardening implementations typically begin with the principle of least privilege, stripping local administrator rights from daily workflow accounts, and restricting application execution environments using AppLocker or Windows Defender Application Control (WDAC).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              System administrators should also implement rigorous firewall rulesets dropping all inbound traffic by default, while monitoring outbound queries. Disabling SMBv1, enforcing NTLM signing, and requiring secure RPC channels mitigate lateral movement risks. The implementation of modern Credential Guard significantly reduces the effectiveness of Pass-the-Hash (PtH) and mimikatz-style attacks on the local SAM database.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
