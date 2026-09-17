
"use client";

import { useEffect } from "react";

const VISITOR_ID_KEY =
  "faiza_portfolio_visitor_id";

const SESSION_KEY =
  "faiza_portfolio_visit_tracked";

function getVisitorId() {
  try {
    let visitorId =
      localStorage.getItem(
        VISITOR_ID_KEY
      );

    if (!visitorId) {
      visitorId = crypto.randomUUID();

      localStorage.setItem(
        VISITOR_ID_KEY,
        visitorId
      );
    }

    return visitorId;
  } catch {
    return null;
  }
}

export default function VisitorTracker() {
  useEffect(() => {
    if (
      window.location.pathname.startsWith(
        "/secret-admin"
      )
    ) {
      return;
    }

    try {
      const visitorId =
        getVisitorId();

      if (!visitorId) {
        return;
      }

      const alreadyTracked =
        sessionStorage.getItem(
          SESSION_KEY
        );

      if (alreadyTracked) {
        return;
      }

      sessionStorage.setItem(
        SESSION_KEY,
        "true"
      );

      const payload = {
        visitorId,
        path:
          window.location.pathname,
      };

      fetch(
        "/api/analytics/visit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
          keepalive: true,
        }
      ).catch((error) => {
        console.error(
          "Visitor tracking failed:",
          error
        );
      });
    } catch (error) {
      console.error(
        "Visitor tracker error:",
        error
      );
    }
  }, []);

  return null;
}
