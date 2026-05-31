"use client";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TriangleAlert as AlertTriangle, Hop as Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-red-500/10 p-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-black mb-4">Something Went Wrong</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We encountered an unexpected error. Our team has been notified, and we're working to fix
            it.
          </p>

          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mb-8 rounded-lg bg-red-950/20 p-4 text-left">
              <p className="text-xs font-mono text-red-400">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mt-12 rounded-lg border border-border bg-card p-6">
            <h2 className="text-sm font-semibold mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link href="/docs" className="text-primary hover:underline">
                Documentation
              </Link>
              <Link href="/about" className="text-primary hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
