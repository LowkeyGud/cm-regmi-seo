"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ads_consent";
const PERSONALIZATION_KEY = "ads_personalization";

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

/**
 * CookieConsent — Google Consent Mode v2 compliant banner.
 *
 * On accept: updates gtag consent to 'granted' for ad-related storage
 *   and dispatches a 'consent:update' event that AdsSlot listens for.
 * On reject: keeps consent 'denied' (ads are not loaded).
 *
 * This replaces the previous hand-rolled localStorage-only banner with
 * Google's official consent framework, satisfying AdSense EEA/UK requirements.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [personalized, setPersonalized] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const pers = localStorage.getItem(PERSONALIZATION_KEY);
    setPersonalized(pers === null ? true : pers === "true");
    if (!stored) setVisible(true);
  }, []);

  const updateGtagConsent = (granted: boolean) => {
    if (typeof window === "undefined" || !(window as any).gtag) return;
    const adStorage = granted ? "granted" : "denied";
    const adUserData = granted ? "granted" : "denied";
    const adPersonalization = granted && personalized ? "granted" : "denied";
    const analyticsStorage = granted ? "granted" : "denied";

    (window as any).gtag("consent", "update", {
      ad_storage: adStorage,
      ad_user_data: adUserData,
      ad_personalization: adPersonalization,
      analytics_storage: analyticsStorage,
    });

    // Dispatch a custom event so AdsSlot components can react
    window.dispatchEvent(
      new CustomEvent("consent:update", {
        detail: { ad_storage: adStorage },
      })
    );
  };

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "yes");
    localStorage.setItem(PERSONALIZATION_KEY, String(personalized));
    setCookie("ads_consent", "yes");
    setCookie("ads_personalization", String(personalized));
    updateGtagConsent(true);
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "no");
    localStorage.setItem(PERSONALIZATION_KEY, String(personalized));
    setCookie("ads_consent", "no");
    setCookie("ads_personalization", String(personalized));
    updateGtagConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(800px,calc(100%-32px))] -translate-x-1/2 rounded-lg border border-border bg-card p-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            We use cookies for site functionality and advertising.
          </p>
          <p className="text-xs text-muted-foreground">
            Google Consent Mode v2 manages your preferences. Ads are not loaded until you consent.
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
            onClick={handleReject}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm hover:bg-muted"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
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
