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
  title: "Browser Privacy & Hardening Guide | CM Regmi Docs",
  description:
    "Hardening Firefox and Chrome, disabling telemetry, resisting fingerprinting, enabling DNS-over-HTTPS, and keeping browser extensions clean.",
  alternates: { canonical: `${SITE_URL}/docs/browser-privacy` },
  openGraph: {
    title: "Browser Privacy & Hardening Guide | CM Regmi Docs",
    description:
      "Hardening Firefox and Chrome, disabling telemetry, resisting fingerprinting, enabling DNS-over-HTTPS, and keeping browser extensions clean.",
    url: `${SITE_URL}/docs/browser-privacy`,
    siteName: "CM Regmi",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browser Privacy & Hardening Guide | CM Regmi Docs",
    description:
      "Hardening Firefox and Chrome, disabling telemetry, resisting fingerprinting, enabling DNS-over-HTTPS, and keeping browser extensions clean.",
  },
  robots: { index: true, follow: true },
};

export default function BrowserPrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/docs/browser-privacy#article`,
    headline: "Browser Privacy & Hardening Guide",
    description:
      "Hardening Firefox and Chrome, disabling telemetry, resisting fingerprinting, enabling DNS-over-HTTPS, and keeping browser extensions clean.",
    url: `${SITE_URL}/docs/browser-privacy`,
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Script
        id="browser-privacy-schema"
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
                <BreadcrumbPage>Browser Privacy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <article className="space-y-8">
          <header className="space-y-4 border-b border-border pb-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
              ◢ Privacy Engineering
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Browser Privacy &amp; Hardening Guide
            </h1>
            <p className="text-sm text-muted-foreground">
              By <strong>CM Regmi</strong> • Published May 24, 2026 • Updated May 24, 2026
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The browser is where most of your identity leaks, often through defaults you never
              touched. This guide hardens Firefox and Chrome, disables telemetry, reduces
              fingerprinting surface, routes DNS through DNS-over-HTTPS, and keeps your extensions
              from quietly becoming the weak link.
            </p>
          </header>

          <TableOfContents />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              1. Start From the Defaults, Not From Trust
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Modern browsers ship with convenience baked in, and convenience is often a privacy
              leak. Default configurations frequently sync browsing history to a vendor account,
              send crash reports and usage telemetry automatically, preload sites, and keep
              third-party cookies enabled. None of this is malicious; it is just tuned for
              usefulness rather than discretion. Hardening begins by reviewing those defaults
              instead of assuming they are right.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The mental model is threat-modeling rather than paranoia. Ask what you actually want
              protected — your search history from your employer, your identity from an advertising
              network, your passwords from the vendor — and tune to that. A hardened browser that
              breaks every site you use is not a win; a browser that quietly leaks your habits is a
              silent loss. This guide targets the middle: strong privacy with minimal breakage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Before you start, back up your current bookmarks and settings, and test changes
              incrementally. Because the security posture of the whole operating system shapes the
              browser experience, the{" "}
              <Link href="/docs/windows-security-baseline">Windows security baseline</Link> is a
              useful companion for anyone hardening on Windows.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              2. Disabling Telemetry and Vendor Data Collection
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Telemetry is the flow of usage data — page titles, feature flags, crash dumps — back
              to the vendor. Firefox and Chrome both collect varying amounts by default, and both
              provide toggles to stop most of it. In Firefox, open Settings, navigate to the Privacy
              section, and turn off usage data, crash reports, and the studies program. In Chrome,
              open Settings, then Sync and Google services, and disable the options that share usage
              statistics, crash details, and improve search suggestions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Turning off the GUI toggles is usually enough for most people. For deeper control in
              Firefox, you can pin preferences through the config interface, which lets you disable
              telemetry channels that the menus do not expose. The trade-off to remember: disabling
              crash reporting means your bugs are reported less to the vendor, so weigh the privacy
              gain against how much you value contributing diagnostics.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`// about:config (Firefox) — disable telemetry & studies
toolkit.telemetry.enabled ; false
toolkit.telemetry.unified ; false
app.normandy.enabled ; false
datareporting.healthreport.uploadEnabled ; false`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              These are representative keys that exist in modern Firefox; if a key is not present in
              your version, the toggle simply does not apply. The point is the practice: audit the
              telemetry surfaces, disable the ones you are not comfortable with, and re-check after
              major updates, because vendors occasionally re-enable defaults on upgrade.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              3. Reducing Your Fingerprinting Surface
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Fingerprinting identifies your browser by the combination of its properties — screen
              resolution, timezone, installed fonts, user agent, language, graphics card — that
              together form a stable, often unique signature even with cookies cleared. You cannot
              make a modern browser vanish entirely, but you can shrink the surface it exposes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The practical moves are to disable WebRTC IP leakage (the leak that reveals your real
              IP address even behind a VPN), resist fingerprinting where the browser offers it, keep
              your font list from growing, and avoid adding the same set of extensions that other
              unique combinations reveal. The single most effective habit is consistency: a smaller,
              stable set of browser properties fingerprints less uniquely than a wildly varied one.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`// Firefox: enable strict tracking protection & resist fingerprinting
privacy.resistFingerprinting ; true
privacy.fingerprintingProtection ; true
media.peerconnection.enabled ; true
# Combined with uBlock Origin to block fingerprinting scripts`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              Be realistic about the ceiling. No extension makes you anonymous on the modern web;
              the goal is to be unremarkable rather than to disappear. If you rely on a VPN or a
              proxy for location hiding, the WebRTC fix above matters more than almost anything
              else, because a leaking WebRTC call can announce your true address through the very
              layer meant to hide it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              4. DNS-over-HTTPS for Private Resolution
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every time you visit a site, a DNS query asks some resolver to map the domain to an
              address. By default that query often travels in plaintext, visible to whoever can see
              your traffic — your network operator, the coffee-shop Wi-Fi, or a snooping party on
              the wire. DNS-over-HTTPS (DoH) wraps those queries in an encrypted HTTPS connection to
              a resolver you choose, hiding the query content from the network between you and that
              resolver.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Both major browsers now offer DoH. In Firefox, look for DNS over HTTPS in the Settings
              network area and select a resolver such as NextDNS, Cloudflare, or Quad9. In Chrome,
              enable DoH through the Security settings and the DNS provider list. The careful choice
              is a resolver whose logging policy matches your comfort; a DoH connection hides the
              query from your network but hands it to whichever resolver you pick.
            </p>
            <pre className="rounded-md bg-black/5 p-4 overflow-x-auto text-sm">
              <code>{`// Firefox about:config — force DoH with a chosen resolver
network.trr.mode ; 2          // enable DoH but fall back if needed
network.trr.uri  ; https://dns.example.net/dns-query
network.trr.exclude-ca ; false`}</code>
            </pre>
            <p className="text-muted-foreground leading-relaxed">
              If your home network already runs a trusted resolver, you can pin DoH to that instead
              of a public one, which keeps your DNS inside your own domain of trust. The deeper
              decision about where your DNS lives and how it integrates with a self-hosted stack is
              exactly what the{" "}
              <Link href="/docs/network-architecture-optimization">
                network architecture optimization page
              </Link>{" "}
              explores.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              5. Extension Hygiene: The Quiet Weak Link
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Extensions are where hardening so often comes undone. A tiny add-on with broad
              permissions can read every page you open, rewrite your new-tab page, or exfiltrate
              your browsing history — and the permissions are usually granted by default on install.
              Extension hygiene is not about avoiding extensions; it is about installing few,
              checking their permissions, and reviewing them regularly.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Start with the golden rule: the fewer extensions, the better. Each one is both a
              fingerprinting signal and an attack surface. Review the permission list before every
              install and reject anything that over-reaches — a password manager does not need to
              read every page, but an ad-blocker legitimately does. Check the publisher, the install
              count, and whether the extension is actively maintained, then re-audit your list every
              few months and remove anything you no longer use.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beware of extensions that appear legitimately but change ownership or quietly update
              their permission scope. The classic pattern is a useful tool whose author sells it;
              the next version asks for far more permissions and monetizes your data. Your defense
              is periodic review, automatic-update awareness, and preferring open-source, widely
              audited options. Pairing this with the app-permission discipline described in the{" "}
              <Link href="/docs/managing-app-permissions">managing app permissions guide</Link>{" "}
              gives a consistent policy across your whole device.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              6. Cookies, Storage, and a Cleaning Schedule
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Beyond third-party blocking, a workable browser privacy setup includes deciding how
              long cookies and site storage persist. Strictly restricting everything breaks logins,
              so the realistic approach is to block third-party cookies, clear site data on exit for
              sites you do not trust, and keep a small allow-list for sites that need to remember
              you.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Configure the browser to clear cookies and site data when it closes, and rely on your
              password manager and remembered sign-ins for the few sites you genuinely want to stay
              logged in. This gives you the privacy benefit of a &quot;clean slate&quot; without the
              constant re-login pain, because the few keepers are allowed explicitly rather than
              preserved by default.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser profiles help you separate contexts cleanly — one for work, one for personal,
              one for banking. Because each profile keeps its own cookies, storage, and extensions,
              a single misbehaving site cannot contaminate the whole picture. Over time this
              separation is one of the highest-leverage privacy habits a single user can adopt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              7. A Maintainable Hardening Checklist
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Hardening done once and forgotten degrades as the browser updates and as your habits
              change. The sustainable version is a short checklist you can re-run after each major
              update and a lighter review a few times a year. Keep it explicit and repeatable rather
              than intuitive.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After every major browser update: confirm telemetry is still off, confirm DoH is still
              enabled and pointing at your resolver, confirm strict tracking protection is active,
              and confirm your extension list did not silently grow. Every few months: audit
              extension permissions, review your cookie allow-list, check your profile separation,
              and look at the tracking and fingerprinting settings again to account for any new
              defaults.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Write the checklist down the same way you would document any repeatable process. The{" "}
              <Link href="/docs/technical-writing-workflow">technical writing workflow</Link> and
              its companion{" "}
              <Link href="/docs/documentation-qa-framework">documentation QA framework</Link> are
              useful references if you want to turn your hardening routine into a document other
              people on your network can follow.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              8. Troubleshooting Hardening Side Effects
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Hardening occasionally breaks something, and the fix is usually a narrow adjustment
              rather than undoing everything. If a site will not log in or shows a blank payment
              page, a strict cookie or tracking setting is likely at fault — add the site to your
              allow-list and reload before blaming the browser.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If sites take noticeably longer to load or show confusing &quot;connection not
              secure&quot; screens, check your DoH resolver — a misconfigured resolver or a
              blocklist is the usual cause, and switching resolvers or reviewing blocklist rules
              fixes it. If a video or voice site claims your camera is unavailable, a hardened media
              permission or a WebRTC setting is interfering; grant permission explicitly on that
              domain.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If captchas and login challenges appear more often, that is a sign your fingerprint
              differs enough to look slightly automated — soften fingerprinting resistance slightly
              rather than turning it off. And if an extension updates and immediately starts
              behaving oddly, review its new permissions and be ready to disable it. A calm,
              incremental approach to each symptom keeps your privacy without sacrificing the sites
              you depend on.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              9. A Real-World Example: Hardening One Machine, Quietly
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A home-lab owner used the same browser profile for banking, work, and browsing, with a
              dozen extensions installed over several years. When they reviewed their browsing data
              for a privacy audit, the picture was messy: the browser synced history to a vendor
              account, third-party cookies were on, WebRTC could reveal their real address, and two
              extensions had changed ownership and quietly broadened their permissions to read every
              page.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Applying this guide produced a controlled result over a single afternoon. They
              disabled telemetry and syncing, enabled strict tracking protection and fingerprinting
              resistance, turned on DoH with a low-logging resolver, fixed the WebRTC leak, and cut
              the extension list from twelve to four, auditing permissions on each that remained.
              They split the browser into three profiles — work, personal, banking — so the contexts
              no longer mixed cookies or data.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The outcome was measurable on their own checks: a fingerprint test showed a much less
              distinctive signature, the DNS panel showed all queries resolving through their chosen
              encrypted resolver, and the network trace no longer exposed the real IP through
              WebRTC. Everyday sites kept working because the tightening was incremental and the
              allow-list handled the few that needed cookies. The machine became markedly less
              distinctive on the open web, with no daily friction and no loss of the sites they
              actually used.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">10. Frequently Asked Questions</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Will hardening slow down my browsing?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Usually only slightly, and often not at all. Blocking trackers and routing DNS over
                HTTPS can actually feel faster by cutting script-heavy page weight. If a specific
                site feels slow, narrow the change for that site rather than reverting the whole
                setup.
              </p>
              <h3 className="text-lg font-bold">
                Does a private or incognito window keep me private?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                It stops local history from being saved, but it does not stop fingerprinting, your
                ISP, or site tracking. It is a clean-slate convenience, not an anonymity tool, so
                treat it accordingly.
              </p>
              <h3 className="text-lg font-bold">Which DNS-over-HTTPS resolver should I choose?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pick one whose logging policy you can accept. If you run your own resolver on the
                network, pin DoH to that; otherwise a low-logging public resolver is a good default.
                Test your choice, since blocklists differ between providers.
              </p>
              <h3 className="text-lg font-bold">Is it safe to use a password manager extension?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, from a reputable, actively maintained vendor with clearly scoped permissions.
                The risk is rarely the password manager itself; it is adding it alongside many other
                broad-permission extensions. Keep the set small and audited.
              </p>
              <h3 className="text-lg font-bold">Can I really be anonymous with these settings?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. These settings reduce your exposure and make you less distinctive, but they do
                not make you anonymous. For genuine anonymity you would need a much heavier,
                separate threat model; for everyday privacy this guide is a strong, practical
                baseline.
              </p>
              <h3 className="text-lg font-bold">Do I need to harden both Firefox and Chrome?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only if you use both. Pick a primary hardened browser and keep the other as a
                fallback for sites that misbehave. The discipline is consistency in one main
                profile, not identical settings on two browsers.
              </p>
              <h3 className="text-lg font-bold">
                Will sites break because of strict tracking protection?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Occasionally. Some sites lean on third-party trackers for logins or embeds. The
                standard fix is to add those specific sites to your allow-list so the rest of your
                browsing stays strict without you re-logging in everywhere.
              </p>
              <h3 className="text-lg font-bold">Why do captchas keep appearing after I harden?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aggressive fingerprinting resistance can make you look slightly automated to
                anti-bot systems. Relax fingerprinting resistance by a notch while keeping cookies,
                DoH, and extension hygiene intact — you usually lose little privacy for a big
                reduction in friction.
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
