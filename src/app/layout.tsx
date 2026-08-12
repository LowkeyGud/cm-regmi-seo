import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { BackToTop } from "@/components/TableOfContents";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://cmregmi.com.np";
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-5019530661594566";

export const metadata: Metadata = {
  title: "CM Regmi | Professional Systems Engineer & Documentation Architect",
  description:
    "Professional systems engineering guides, Windows hardening baselines, and Android enterprise administration documentation.",
  authors: [{ name: "CM Regmi" }],
  creator: "CM Regmi",
  publisher: "CM Regmi",
  keywords:
    "systems engineer, Android optimization, Windows hardening, technical documentation, systems architecture",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CM Regmi",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CM Regmi",
    title: "CM Regmi | Professional Systems Engineer",
    description:
      "Android optimization, Windows system hardening, and expert technical documentation",
    images: [
      {
        url: `${SITE_URL}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "CM Regmi - Systems Engineer & Documentation Hub",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CM Regmi | Systems Engineer",
    description: "Professional technical documentation and system optimization",
    images: [`${SITE_URL}/og-home.png`],
    creator: "@cmregmi",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff0000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CM Regmi" />

        {/* Google AdSense — loaded with consent-aware attributes; Google CMP injects consent UI */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          data-ad-client={ADSENSE_ID}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
