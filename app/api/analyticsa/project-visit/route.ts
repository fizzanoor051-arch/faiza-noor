
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "portfolio_analytics";

function cleanString(value: unknown, maxLength = 1000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-client-ip") ||
    ""
  );
}

function getGeoData(request: NextRequest) {
  return {
    country:
      cleanString(request.headers.get("x-vercel-ip-country"), 100) ||
      cleanString(request.headers.get("x-country"), 100),

    region:
      cleanString(
        request.headers.get("x-vercel-ip-country-region"),
        100
      ) || cleanString(request.headers.get("x-region"), 100),

    city:
      cleanString(request.headers.get("x-vercel-ip-city"), 100) ||
      cleanString(request.headers.get("x-city"), 100),

    latitude:
      cleanString(request.headers.get("x-vercel-ip-latitude"), 100) ||
      cleanString(request.headers.get("x-latitude"), 100),

    longitude:
      cleanString(request.headers.get("x-vercel-ip-longitude"), 100) ||
      cleanString(request.headers.get("x-longitude"), 100),

    locationAccuracy:
      cleanString(request.headers.get("x-vercel-ip-accuracy"), 100) ||
      cleanString(request.headers.get("x-location-accuracy"), 100),
  };
}

/*
 * ----------------------------------------------------
 * CORS
 * ----------------------------------------------------
 *
 * Allow external projects to send analytics events
 * to the central portfolio API.
 *
 * No credentials/cookies are required for this
 * analytics endpoint.
 */

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin");

  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      request.headers.get("access-control-request-headers") ||
      "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(
  request: NextRequest,
  body: unknown,
  status = 200
) {
  return NextResponse.json(body, {
    status,
    headers: getCorsHeaders(request),
  });
}

/*
 * ----------------------------------------------------
 * OPTIONS / PREFLIGHT
 * ----------------------------------------------------
 */

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/*
 * ----------------------------------------------------
 * POST
 * ----------------------------------------------------
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    /*
     * ----------------------------------------------------
     * PROJECT INFORMATION
     * ----------------------------------------------------
     *
     * No fixed PROJECTS list.
     *
     * Every project sends:
     * projectSlug
     * projectName
     * projectUrl
     *
     * Therefore future projects can automatically appear.
     */

    const projectSlug = cleanString(body?.projectSlug, 200);

    const projectName =
      cleanString(body?.projectName, 300) ||
      projectSlug ||
      "Unknown Project";

    const projectUrl = cleanString(body?.projectUrl, 1000);

    if (!projectSlug) {
      return jsonResponse(
        request,
        {
          success: false,
          error: "projectSlug is required",
        },
        400
      );
    }

    /*
     * ----------------------------------------------------
     * VISITOR INFORMATION
     * ----------------------------------------------------
     */

    const visitorId = cleanString(body?.visitorId, 300);

    if (!visitorId) {
      return jsonResponse(
        request,
        {
          success: false,
          error: "visitorId is required",
        },
        400
      );
    }

    const now = new Date();

    const userAgent =
      cleanString(body?.userAgent, 2000) ||
      cleanString(request.headers.get("user-agent"), 2000);

    const referrer =
      cleanString(body?.referrer, 2000) ||
      cleanString(request.headers.get("referer"), 2000);

    const ip = getClientIp(request);

    const geo = getGeoData(request);

    /*
     * Browser/device information is normally supplied
     * by ProjectVisitTracker.
     */

    const device = cleanString(body?.device, 100);
    const browser = cleanString(body?.browser, 100);
    const os = cleanString(body?.os, 100);

    const path =
      cleanString(body?.path, 1000) ||
      cleanString(request.nextUrl.pathname, 1000) ||
      "/";

    /*
     * ----------------------------------------------------
     * FINAL GEO DATA
     * ----------------------------------------------------
     *
     * Body data gets priority.
     * Vercel/request headers are used as fallback.
     */

    const country =
      cleanString(body?.country, 100) ||
      geo.country;

    const region =
      cleanString(body?.region, 100) ||
      geo.region;

    const city =
      cleanString(body?.city, 100) ||
      geo.city;

    const latitude =
      cleanString(body?.latitude, 100) ||
      geo.latitude;

    const longitude =
      cleanString(body?.longitude, 100) ||
      geo.longitude;

    const locationAccuracy =
      cleanString(body?.locationAccuracy, 100) ||
      geo.locationAccuracy;

    /*
     * ----------------------------------------------------
     * MONGODB
     * ----------------------------------------------------
     */

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const eventsCollection =
      db.collection("analytics_events");

    const visitorsCollection =
      db.collection("analytics_visitors");

    /*
     * ----------------------------------------------------
     * 1. SAVE PROJECT VISIT EVENT
     * ----------------------------------------------------
     */

    const event = {
      type: "project_click",

      projectName,
      projectSlug,
      projectUrl,

      /*
       * Important:
       * This event happened on the actual project site.
       */
      source: "external_project_visit",

      visitorId,

      path,
      referrer,
      userAgent,
      ip,

      country,
      region,
      city,

      latitude,
      longitude,
      locationAccuracy,

      device,
      browser,
      os,

      createdAt: now,
    };

    const insertResult =
      await eventsCollection.insertOne(event);

    /*
     * ----------------------------------------------------
     * 2. FIND PROJECT VISITOR
     * ----------------------------------------------------
     *
     * Same visitor can visit different projects.
     *
     * Therefore visitorId + projectSlug is used.
     */

    const visitorFilter = {
      visitorId,
      projectSlug,
    };

    const existingVisitor =
      await visitorsCollection.findOne(visitorFilter);

    /*
     * ----------------------------------------------------
     * 3. FIRST VISIT
     * ----------------------------------------------------
     */

    if (!existingVisitor) {
      await visitorsCollection.insertOne({
        visitorId,

        projectSlug,
        projectName,
        projectUrl,

        country,
        region,
        city,

        latitude,
        longitude,
        locationAccuracy,

        device,
        browser,
        os,

        userAgent,
        ip,
        referrer,

        firstVisit: now,
        lastVisit: now,

        visitCount: 1,
        projectClicks: 1,

        pages: [path],

        createdAt: now,
        updatedAt: now,
      });
    }

    /*
     * ----------------------------------------------------
     * 4. RETURNING VISITOR
     * ----------------------------------------------------
     */

    else {
      const setFields: Record<string, unknown> = {};

      /*
       * Only replace stored information when useful
       * information is available.
       */

      if (projectName) {
        setFields.projectName = projectName;
      }

      if (projectUrl) {
        setFields.projectUrl = projectUrl;
      }

      if (country) {
        setFields.country = country;
      }

      if (region) {
        setFields.region = region;
      }

      if (city) {
        setFields.city = city;
      }

      if (latitude) {
        setFields.latitude = latitude;
      }

      if (longitude) {
        setFields.longitude = longitude;
      }

      if (locationAccuracy) {
        setFields.locationAccuracy =
          locationAccuracy;
      }

      if (device) {
        setFields.device = device;
      }

      if (browser) {
        setFields.browser = browser;
      }

      if (os) {
        setFields.os = os;
      }

      if (userAgent) {
        setFields.userAgent = userAgent;
      }

      if (ip) {
        setFields.ip = ip;
      }

      if (referrer) {
        setFields.referrer = referrer;
      }

      await visitorsCollection.updateOne(
        visitorFilter,
        {
          $set: {
            ...setFields,
            lastVisit: now,
            updatedAt: now,
          },

          $inc: {
            visitCount: 1,
            projectClicks: 1,
          },

          $addToSet: {
            pages: path,
          },
        }
      );
    }

    /*
     * ----------------------------------------------------
     * 5. SUCCESS
     * ----------------------------------------------------
     */

    return jsonResponse(request, {
      success: true,
      tracked: true,

      eventId:
        insertResult.insertedId.toString(),

      projectSlug,
      projectName,
      projectUrl,

      visitorId,

      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error(
      "PROJECT VISIT TRACKING ERROR:",
      error
    );

    return jsonResponse(
      request,
      {
        success: false,
        error: "Failed to track project visit",
      },
      500
    );
  }
}
