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

function sendVisit(
  visitorId: string,
  path: string,
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  }
) {
  const payload = {
    visitorId,
    path,
    ...(location
      ? {
          latitude:
            location.latitude,
          longitude:
            location.longitude,
          accuracy:
            location.accuracy,
        }
      : {}),
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

      const path =
        window.location.pathname;

      /*
       * Ask the browser for the most precise
       * location available.
       *
       * This requires the visitor's permission.
       */
      if (
        "geolocation" in navigator
      ) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendVisit(
              visitorId,
              path,
              {
                latitude:
                  position.coords.latitude,
                longitude:
                  position.coords.longitude,
                accuracy:
                  position.coords.accuracy,
              }
            );
          },
          () => {
            /*
             * If the visitor denies location
             * permission, the server will use
             * its IP/Vercel location fallback.
             */
            sendVisit(
              visitorId,
              path
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        /*
         * Browser does not support
         * Geolocation API.
         */
        sendVisit(
          visitorId,
          path
        );
      }
    } catch (error) {
      console.error(
        "Visitor tracker error:",
        error
      );
    }
  }, []);

  return null;
}