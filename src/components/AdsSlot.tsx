"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdsSlot — Google AdSense ad unit component.
 *
 * Uses Google Consent Mode v2 for consent checking (not localStorage).
 * The global adsbygoogle.js script is loaded in <RootLayout> with the
 * correct data-ad-client, so this component only needs to render the
 * <ins> element and push to the adsbygoogle queue once consent is granted.
 *
 * adSlotId: optional numeric AdSense ad unit ID. When omitted, the slot
 *   runs in AdSense Auto-ads mode (data-ad-format="auto", no data-ad-slot).
 *   When provided, it must be a numeric string from your AdSense dashboard.
 */
export default function AdsSlot({
  adClientId = "ca-pub-5019530661594566",
  adSlotId,
}: {
  adClientId?: string;
  adSlotId?: string;
}) {
  const insRef = useRef<HTMLDivElement>(null);
  const [consentGranted, setConsentGranted] = useState(false);

  // Restore a previously stored consent decision after hydration and listen
  // for live updates from the CookieConsent banner. The gtag dataLayer cannot
  // drive this on page load: its consent 'default' is always 'denied', so we
  // read the user's stored choice directly.
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("ads_consent") === "yes") {
      setConsentGranted(true);
    }
    const handler = (e: CustomEvent) => {
      setConsentGranted(e.detail?.ad_storage === "granted");
    };
    window.addEventListener("consent:update", handler as EventListener);
    return () => window.removeEventListener("consent:update", handler as EventListener);
  }, []);

  // Push the ad to the adsbygoogle queue once consent is granted
  useEffect(() => {
    if (!consentGranted) return;
    if (!adClientId) return;
    if (!insRef.current) return;

    try {
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        // Clear any previous push for this element to avoid duplicates
        adsbygoogle.push({});
      }
    } catch (e) {
      // Silently ignore — ad may not be ready yet
      console.debug("[AdsSlot] adsbygoogle push deferred", e);
    }
  }, [consentGranted, adClientId]);

  // While consent is pending or denied, render a placeholder
  if (!consentGranted) {
    return (
      <div
        ref={insRef}
        style={{ minHeight: 100, width: "100%" }}
        aria-label="Advertisement placeholder — awaiting consent"
      />
    );
  }

  // Build the ins element attributes
  const insProps: Record<string, string> = {
    className: "adsbygoogle",
    style: "display:block",
    "data-ad-client": adClientId || "",
    "data-ad-format": "auto",
    "data-full-width-responsive": "true",
  };

  // Only set data-ad-slot if a valid numeric ID is provided
  if (adSlotId && /^\d+$/.test(adSlotId)) {
    insProps["data-ad-slot"] = adSlotId;
  }

  return (
    <div ref={insRef}>
      <ins {...insProps}></ins>
    </div>
  );
}
