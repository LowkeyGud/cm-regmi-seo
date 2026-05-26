"use client";

import { useEffect, useState } from "react";

export default function AdsSlot({ adClientId, adSlotId }: { adClientId?: string; adSlotId?: string }) {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ads_consent");
      setConsent(stored === "yes");
    } catch (e) {
      setConsent(false);
    }
  }, []);

  useEffect(() => {
    if (!consent) return;
    if (!adClientId) return;

    if (!document.querySelector(`script[data-ads-client="${adClientId}"]`)) {
      const s = document.createElement("script");
      s.setAttribute("data-ads-client", adClientId || "");
      s.async = true;
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`;
      document.head.appendChild(s);
    }

    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      // ignore
    }
  }, [consent, adClientId]);

  if (!consent) {
    return (
      <div style={{ minHeight: 100 }} aria-hidden>
        {/* Placeholder sized box */}
      </div>
    );
  }

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClientId}
        data-ad-slot={adSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
