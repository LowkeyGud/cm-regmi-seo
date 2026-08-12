"use client";

import { useEffect, useRef } from "react";

/**
 * AdsSlot — Google AdSense ad unit component.
 *
 * With Google's certified CMP (enabled in AdSense → Privacy & messaging),
 * the adsbygoogle.js script handles consent internally. This component
 * simply renders the <ins> element; the library will only request/fill
 * ads when the user has granted consent via the CMP.
 *
 * adSlotId: optional numeric AdSense ad unit ID. When omitted, the slot
 *   renders as a responsive display unit (data-ad-format="auto", no data-ad-slot).
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

  // Build the ins element attributes
  const dataAdSlot = adSlotId && /^\d+$/.test(adSlotId) ? adSlotId : undefined;

  // Push to adsbygoogle queue once the element is in the DOM.
  // The adsbygoogle library (loaded in layout.tsx) will handle consent
  // and only fill the slot when ad_storage is granted.
  useEffect(() => {
    if (!adClientId || !insRef.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch (e) {
      console.debug("[AdsSlot] adsbygoogle push deferred", e);
    }
  }, [adClientId]);

  return (
    <div ref={insRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClientId}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-slot={dataAdSlot}
      ></ins>
    </div>
  );
}
