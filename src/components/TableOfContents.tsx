"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/^[\d.]+\s*/, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * TableOfContents — scans the nearest <article> for its <h2> headings,
 * assigns stable anchor ids, and renders a collapsible in-article table of
 * contents with scroll-spy highlighting. Improves Google Ads "navigability"
 * and on-page UX for long technical guides.
 */
export function TableOfContents() {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector("article") || document.querySelector("main");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll<HTMLElement>("h2"));
    const seen = new Map<string, number>();
    const next: TocItem[] = [];

    headings.forEach((h) => {
      let text = h.textContent?.trim() || "";
      // Drop numbered prefixes like "6." or "1.2" from the anchor text.
      text = text.replace(/^\d+([.:]\d+)*\.\s*/, "");
      if (!text) return;

      let id = slugify(text) || "section";
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;

      h.id = id;
      h.classList.add("scroll-mt-24");
      next.push({ id, text });
    });

    setItems(next);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="mb-8 rounded-xl border border-border bg-muted/50 p-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-sm font-bold uppercase tracking-wider"
      >
        <span>On this page</span>
        <span aria-hidden="true" className="text-primary">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <nav aria-label="Table of contents" className="mt-3">
          <ol className="space-y-1.5 border-l border-border pl-4">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block text-sm leading-snug transition-colors ${
                    activeId === item.id
                      ? "font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

/**
 * BackToTop — floating button that appears after the user scrolls, returning
 * them to the top of the page. Improves navigability on long articles.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
