import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FileQuestion, Home, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found | CM Regmi",
  description:
    "The page you're looking for doesn't exist. Return to the home page or explore our documentation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-yellow-500/10 p-4">
              <FileQuestion className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-6xl font-black mb-2">404</h1>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on
            track.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
            >
              <Search className="h-4 w-4" />
              Explore Documentation
            </Link>
          </div>

          <div className="mt-12 rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-semibold mb-4">Suggested Pages</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <Link href="/docs" className="text-primary hover:underline">
                Documentation
              </Link>
              <Link href="/about" className="text-primary hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
