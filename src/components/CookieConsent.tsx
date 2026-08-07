"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ads_consent";
const PERSONALIZATION_KEY = "ads_personalization";

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);
  const [personalized, setPersonalized] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const pers = localStorage.getItem(PERSONALIZATION_KEY);
    setConsent(stored);
    setPersonalized(pers === null ? true : pers === "true");
    if (!stored) setVisible(true);
  }, []);

  useEffect(() => {
    if (consent === "yes") {
      // Persist choices
      localStorage.setItem(STORAGE_KEY, "yes");
      localStorage.setItem(PERSONALIZATION_KEY, String(personalized));
      setCookie("ads_consent", "yes");
      setCookie("ads_personalization", String(personalized));
      // Load AdSense script if configured
      const adId = process?.env?.NEXT_PUBLIC_ADSENSE_ID;
      if (
        adId &&
        typeof document !== "undefined" &&
        !document.querySelector(`script[data-ad-client=\"${adId}\"]`)
      ) {
        const s = document.createElement("script");
        s.async = true;
        s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        s.setAttribute("data-ad-client", adId);
        document.head.appendChild(s);
      }
      setVisible(false);
    } else if (consent === "no") {
      localStorage.setItem(STORAGE_KEY, "no");
      localStorage.setItem(PERSONALIZATION_KEY, String(personalized));
      setCookie("ads_consent", "no");
      setCookie("ads_personalization", String(personalized));
      setVisible(false);
    }
  }, [consent, personalized]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(800px,calc(100%-32px))] -translate-x-1/2 rounded-lg border border-border bg-card p-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            We use cookies for site functionality and advertising.
          </p>
          <p className="text-xs text-muted-foreground">
            You can accept or manage personalization. Ads are not loaded until you consent.
          </p>
        </div>
        <div className="mt-3 flex gap-2 sm:mt-0">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={personalized}
              onChange={(e) => setPersonalized(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-xs">Allow personalized ads</span>
          </label>
          <button
            onClick={() => setConsent("no")}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm hover:bg-muted"
          >
            Reject
          </button>
          <button
            onClick={() => setConsent("yes")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Accept
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        <a href="/ads-and-cookies" className="text-primary hover:underline">
          Ads & Cookies Policy
        </a>
      </div>
    </div>
  );
}
