import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ads-and-cookies")({
  head: () => ({
    meta: [
      { title: "Ads & Cookies Policy | CM Regmi" },
      {
        name: "description",
        content: "Details on our advertisement implementation and cookie tracking specifications.",
      },
    ],
  }),
  component: AdsAndCookies,
});

function AdsAndCookies() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-bold tracking-tight">Ads & Cookies Policy</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>
            This site uses cookies to ensure optimal functionality, understand user behavior, and
            serve relevant, non-disruptive advertisements.
          </p>
          <h2 className="text-2xl font-semibold text-foreground">Cookie Utilization</h2>
          <p>
            We deploy essential cookies required for site navigation alongside analytical cookies
            that track page velocity and reading metrics. These help us tune the platform's
            performance and accessibility.
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            Advertising and Third-Party Networks
          </h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior
            visits to this website or other websites. Google's use of advertising cookies enables it
            and its partners to serve ads to our users based on their visit to our sites and/or
            other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Google's Ads Settings
            </a>
            . Alternatively, you can opt out of a third-party vendor's use of cookies for
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
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
