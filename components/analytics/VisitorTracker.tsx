
"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    // Do not count private analytics pages as portfolio visits.
    if (window.location.pathname.startsWith("/secret-admin")) {
      return;
    }

    try {
      const STORAGE_KEY = "faiza_portfolio_visitor_id";
      const SESSION_KEY = "faiza_portfolio_visit_tracked";

      let visitorId = localStorage.getItem(STORAGE_KEY);

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, visitorId);
      }

      // Prevent duplicate visit events during the same browser session.
      const existingSession = sessionStorage.getItem(SESSION_KEY);

      if (existingSession) {
        return;
      }

      sessionStorage.setItem(SESSION_KEY, "true");

      const payload = {
        visitorId,
        path: window.location.pathname,
        referrer: document.referrer || "",
      };

      fetch("/api/analytics/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((error) => {
        console.error("Visitor tracking failed:", error);
      });
    } catch (error) {
      console.error("Visitor tracker error:", error);
    }
  }, []);

  return null;
}
