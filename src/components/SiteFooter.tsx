import { Link } from "@tanstack/react-router";
import { Activity, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black text-white/90">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-8 md:flex-row md:justify-between">
        
        <div className="flex-1 space-y-4">
          <h3 className="font-bold text-lg tracking-tight text-white">CM Regmi</h3>
          <p className="text-sm text-stone-400 max-w-xs">
            Systems Architect & Digital Strategist. Engineered with precision.
          </p>
          
          <div className="mt-6 w-full max-w-sm rounded-md border border-stone-800 bg-stone-900/50 p-4 font-mono text-xs">
            <div className="mb-2 flex items-center gap-2 text-stone-100">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span>Node Status: Online</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Last Documentation Update: May 4, 2026</span>
            </div>
          </div>
        </div>

        <div className="flex-1 md:text-right space-y-4">
          <h3 className="font-bold text-lg tracking-tight text-white">Legal Documents</h3>
          <div className="flex flex-col space-y-2 text-sm md:items-end">
            <Link to="/privacy-policy" className="text-stone-300 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-stone-300 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/ads-and-cookies" className="text-stone-300 hover:text-white transition-colors">Ads & Cookies Policy</Link>
          </div>
        </div>

      </div>
      
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row text-xs text-stone-500">
          <p>© {new Date().getFullYear()} CM Regmi. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">
            Systems · Kernels · Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
