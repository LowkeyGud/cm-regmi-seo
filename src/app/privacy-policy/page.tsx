import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const runtime = "edge";

export const metadata = {
  title: "Privacy Policy — CM Regmi",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-black tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
          <p>
            Welcome to the professional portfolio and technical documentation hub of CM Regmi. We
            respect your privacy and are committed to protecting your personal data.
          </p>

          <h2 className="text-2xl font-bold text-foreground">2. Cookies and Web Beacons</h2>
          <p>
            This site uses cookies to store information, such as your personal preferences when you
            visit our site. This could include only showing you a popup once in your visit, or the
            ability to login to some of our features, such as forums.
          </p>

          <h2 className="text-2xl font-bold text-foreground">3. Google AdSense</h2>
          <p>
            We use third-party advertising companies, including Google, to serve ads when you visit
            our Website. Google uses cookies to serve ads based on your prior visits to our website
            or other websites.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Google's use of advertising cookies enables it and its partners to serve ads to you
              based on your visits to our site and/or other sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Ads Settings
              </a>
              .
            </li>
            <li>
              Alternatively, you can opt out of a third-party vendor's use of cookies for
              personalized advertising by visiting{" "}
              <a
                href="https://youradchoices.com/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                www.aboutads.info
              </a>
              .
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:learntechcontact@gmaill.com" className="text-primary hover:underline">
              learntechcontact@gmaill.com
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
