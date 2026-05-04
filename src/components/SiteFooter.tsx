export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} CM Regmi. Engineered with precision.</p>
        <p className="font-mono text-xs uppercase tracking-widest">
          Systems · Kernels · Architecture
        </p>
      </div>
    </footer>
  );
}
