import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import AdsSlot from "@/components/AdsSlot";
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";
const SITE_URL = "https://cmregmi.com.np";

export const metadata: Metadata = {
  title: "Secure SSH Basics | CM Regmi Docs",
  description: "Practical SSH hardening basics: key management, disabling password login, and agents.",
  alternates: { canonical: `${SITE_URL}/docs/secure-ssh-basics` },
};

export default function SecureSSHBasics() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/secure-ssh-basics#article`,
    headline: "Secure SSH Basics",
    description: "Practical SSH hardening basics: key management, disabling password login, and agents.",
    url: `${SITE_URL}/docs/secure-ssh-basics`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script id="ssh-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <h1 className="text-3xl font-bold mb-4">Secure SSH Basics</h1>
        <p className="text-sm text-muted-foreground mb-4">By <strong>CM Regmi</strong> • Published May 26, 2026</p>
        <p className="text-muted-foreground mb-4">Use key-based authentication, prefer strong key algorithms, disable root and password logins where possible, and keep a separate administrative access path for recovery.</p>
        <h2 className="text-xl font-semibold mt-6">Key hygiene</h2>
        <p className="text-muted-foreground mb-4">Rotate keys on a schedule, remove old public keys from authorized lists, and avoid sharing private keys across systems.</p>
        <h2 className="text-xl font-semibold mt-6">Operational checklist</h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground"><li>Confirm that key login works before disabling passwords.</li><li>Make sure a fallback admin path exists.</li><li>Check logs after the first few logins to verify the pattern is normal.</li></ol>
        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Recommended sshd_config snippets</h2>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm"><code>{`# /etc/ssh/sshd_config (important lines)
PermitRootLogin no
PasswordAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes
AllowUsers alice bob`}</code></pre>
        </section>
        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Key rotation and agent use</h2>
          <p className="text-muted-foreground">Rotate keys periodically, remove unused public keys from <code>~/.ssh/authorized_keys</code>, and use <code>ssh-agent</code> or hardware keys for long-term protection.</p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm"><code>{`# generate a new key with strong algorithm
ssh-keygen -t ed25519 -C "work-key-2026"

# copy public key to host
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host`}</code></pre>
        </section>
        <div className="mt-8"><Link href="/docs" className="text-primary hover:underline">Back to Docs Hub</Link></div>
        <section className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Examples & commands</h2>
          <p className="text-muted-foreground">Practical commands and a short example help engineers reproduce and verify the behaviour quickly.</p>
          <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm"><code>{`# Quick example
echo "verify service"`}</code></pre>
          <h3 className="text-lg font-semibold">Verification & outcomes</h3>
          <p className="text-muted-foreground">After applying a change, measure the outcome and record whether the problem improved. Keep the verification script committed with the docs.</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground"><li>Run the verification script</li><li>Confirm expected output</li><li>Log results and next steps</li></ul>
        </section>
      </main>
      <section className="mx-auto max-w-3xl px-6 pb-12"><AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="ssh-1" /></section>
      <SiteFooter />
    </div>
  );
}
