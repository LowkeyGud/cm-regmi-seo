import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const runtime = "edge";

export const metadata = {
  title: "About CM Regmi | Systems Architect Profile",
  description: "Profile of CM Regmi, Systems Architect. Two decades of expertise in technical documentation, Android kernel optimization, and Windows system hardening methods.",
  openGraph: {
    title: "About CM Regmi | Systems Architect Profile",
    description: "Profile of CM Regmi, Systems Architect. Two decades of expertise in technical documentation, Android kernel optimization, and Windows system hardening methods.",
  },
  alternates: {
    canonical: "https://cmregmi.com.np/about",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">◢ About</p>
        <h1 className="text-5xl font-black tracking-tight">Operator profile.</h1>
        <img
          src="/images/technical-lab-setup.jpg"
          width="800"
          height="450"
          alt="CM Regmi Technical Laboratory Setup"
          className="mt-8 rounded-lg border border-border bg-muted/20 object-cover"
        />
        <p className="mt-8 text-lg text-muted-foreground">
          CM Regmi designs systems that respect the silicon they run on. Two decades of moving bits
          between rings, kernels, and userland have established a deep appreciation for optimization and security.
        </p>
        <p className="mt-6 text-lg text-muted-foreground">
          With extensive experience engineering solutions across the full stack—from bare-metal Android kernel
          modifications to heavily-secured Windows enterprise domains—the focus remains strictly on
          removing friction and ensuring uncompromising reliability. Every configuration, architecture design, 
          and deployed infrastructure undergoes rigorous testing methodologies to withstand immense pressure.
        </p>
        <p className="mt-6 text-lg text-muted-foreground">
          This platform serves as a digital archive and central documentation hub, providing engineers
          and architects an unfiltered look into practical system optimization techniques, vulnerability
          mitigation strategies, and the philosophical approach required to maintain high-performance machinery.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
