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
  title: "Windows Security Baseline & Hardening Manual | CM Regmi Docs",
  description:
    "Enterprise Windows security configurations, Group Policy hardening, Application Control (WDAC), update strategies, and rollback playbooks.",
  alternates: {
    canonical: `${SITE_URL}/docs/windows-security-baseline`,
  },
};

export default function WindowsSecurityBaselinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/windows-security-baseline#article`,
    headline: "Windows Security Baseline & Hardening Manual",
    description:
      "Deep-dive manual for enterprise Windows security hardening, GPO compliance, and update management.",
    url: `${SITE_URL}/docs/windows-security-baseline`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-27",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="windows-security-baseline-schema"
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
                <BreadcrumbPage>Windows Security Baseline</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>

        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Active Directory & Hardening
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Windows Security Baseline & Hardening Manual
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 26, 2026 • Updated May 27, 2026
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Securing enterprise Windows deployments requires robust configuration baselines that
              drastically limit the system's attack surface. Relying on default Windows
              configurations leaves critical vectors exposed. This manual covers Group Policy
              Objects (GPO) configuration, Application Control policies, and reliable deployment
              strategies.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Hardening Group Policy Objects & Security Parameters
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Enterprise security begins with Group Policy Objects (GPO) applied across domain units
              or locally on standalone systems. These configurations dismantle common exploit paths,
              restrict unauthorized execution scopes, and establish strict user privilege baselines.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Administrators must enforce the absolute isolation of administrative credentials.
              Strip standard daily users of local administrator memberships and strictly limit
              permissions using the principles of least privilege. Disable unsecured legacy
              communication interfaces, such as SMBv1, which present severe vulnerabilities to
              network propagation payloads.
            </p>

            <h3 className="text-lg font-bold">Recommended GPO Enforcement Configurations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Implement these essential policies across your Active Directory domain or through the
              local group policy editor:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 border border-border">Policy Path / Variable</th>
                    <th className="p-3 border border-border">Enforced Configuration</th>
                    <th className="p-3 border border-border">Objective</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-mono">
                      Microsoft network server: Digitally sign communications
                    </td>
                    <td className="p-3 border border-border font-mono">Enabled (Always)</td>
                    <td className="p-3 border border-border">
                      Prevents SMB replay and spoofing attempts.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-mono">
                      User Account Control: Run all administrators in Admin Approval Mode
                    </td>
                    <td className="p-3 border border-border font-mono">Enabled</td>
                    <td className="p-3 border border-border">
                      Ensures explicit consent is requested for elevated tasks.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-mono">
                      Turn off Autoplay on all drives
                    </td>
                    <td className="p-3 border border-border font-mono">Enabled (All Drives)</td>
                    <td className="p-3 border border-border">
                      Blocks unauthorized code execution via external physical media.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-mono">
                      Limit local account use of blank passwords to console logon only
                    </td>
                    <td className="p-3 border border-border font-mono">Enabled</td>
                    <td className="p-3 border border-border">
                      Halts network authentication using empty password credentials.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Enforcing Windows Defender Application Control (WDAC)
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Traditional blacklisting solutions fail to stop modern threats. Implementing Windows
              Defender Application Control (WDAC) enforces a strict default-deny posture. Only code
              signed by trusted authorities or explicitly whitelisted by system administrators is
              allowed to run.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              WDAC policies can be created using PowerShell. Administrators should start by
              configuring policies in audit mode to verify compatibility before transitioning to
              strict blocking mode:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Generate a new base policy scanning the Windows system folder
New-CIPolicy -FilePath "C:\\wdac\\policy.xml" -Level Publisher -Fallback Hash -ScanPath "C:\\Windows"

# Convert the policy XML to binary format for deployment
ConvertFrom-CIPolicy -XmlFilePath "C:\\wdac\\policy.xml" -BinaryFilePath "C:\\Windows\\System32\\CodeIntegrity\\SIPolicy.p7b"

# Enable enforcement mode (once audit phase confirms zero false positives)
Set-RuleOption -FilePath "C:\\wdac\\policy.xml" -Option 3 -Delete
# Result: Policy moves from Audit to Enforcement state`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Staged Updates, Patch Hardening & Safe Rollbacks
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Vulnerability patching must occur systematically. However, bad patches can disrupt
              system stability and interrupt business operations. Establish a structured staging
              pipeline:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Pilot Ring (Canary):</strong> Deploy updates immediately to 5% of
                non-critical workstations. Monitor event logs for 72 hours for driver
                incompatibilities or memory faults.
              </li>
              <li>
                <strong>Broad Deployment Ring:</strong> Widen deployment once the pilot ring
                validates stability.
              </li>
              <li>
                <strong>System Restore Integrity:</strong> Ensure System Restore points are enabled
                and configured prior to patch applications.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              If an update introduces a critical regression, administrators can use PowerShell to
              trigger an automated rollback of the offending package:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query recently installed updates to identify package names
Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5

# Programmatically uninstall a buggy update package without user interaction
wusa.exe /uninstall /kb:5031245 /quiet /norestart
# Result: Update rolls back silently, logs written to Event Viewer`}</code>
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. Case Study: Recovering a Enterprise Node from Driver Faults
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              An enterprise server recently failed to boot after receiving a third-party storage
              controller driver update. The machine encountered a persistent Blue Screen of Death
              (BSOD) due to a driver crash.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We booted the system into the Windows Recovery Environment (WinRE) and ran recovery
              tools. We mounted the offline system registry and queried the driver load order to
              identify the target:
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`# Query offline drivers installed on the system volume
dism /Image:D:\\ /Get-Drivers /Format:Table

# Locate the corrupt storage driver (e.g., oem32.inf) and force-remove it
dism /Image:D:\\ /Remove-Driver /Driver:oem32.inf
# Result: "The operation completed successfully." System boots cleanly on generic drivers.`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Following recovery, we configured a policy to restrict the automatic update of drivers
              on Windows Update, ensuring all device driver staging undergoes manual administrative
              approval in testing environments first.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Sane Maintenance and Audit Playbook
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Windows security requires ongoing maintenance. Implement an audit cadence to keep
              configurations aligned with your targets:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Weekly:</strong> Review Microsoft Security Advisories and evaluate update
                deployments in testing rings.
              </li>
              <li>
                <strong>Monthly:</strong> Run compliance reports using the Group Policy analyzer
                tool.
              </li>
              <li>
                <strong>Quarterly:</strong> Rotate administrative passwords, audit active directory
                group membership structures, and perform restore drills using offline server
                backups.
              </li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              By maintaining a structured testing ring, ensuring regular backups, and executing
              systematic audits, administrators can prevent common Windows vulnerabilities from
              disrupting business productivity.
            </p>
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
          Automated compliance testing & rollback validation
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Integrate automated compliance checks into your deployment pipeline. Run verification jobs
          that confirm GPO application, WDAC policy compatibility (audit mode), and the ability to
          rollback updates without service disruption. These checks reduce the risk of a broken
          rollout reaching production.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Suggested checks include running a GPO report export, scanning WDAC audit logs for
          unexpected denials, and validating that critical services continue to respond. Stage these
          checks in a pilot ring before broad production rollout.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Operational verification should include sampling endpoints for expected responses,
          verifying that audit-only WDAC generates no blocking events, and ensuring automated
          rollback jobs restore known-good states within defined SLA windows.
        </p>

        <AdsSlot adClientId={process.env.NEXT_PUBLIC_ADSENSE_ID} adSlotId="winsec-1" />
      </section>

      <SiteFooter />
    </div>
  );
}
