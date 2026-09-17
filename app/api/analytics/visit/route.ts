
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME =
  process.env.MONGODB_DB || "portfolio_analytics";

function getDevice(userAgent: string) {
  if (
    /tablet|ipad|playbook|silk/i.test(
      userAgent
    )
  ) {
    return "Tablet";
  }

  if (
    /mobile|iphone|ipod|android/i.test(
      userAgent
    )
  ) {
    return "Mobile";
  }

  return "Desktop";
}

function getBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) {
    return "Edge";
  }

  if (/opr|opera/i.test(userAgent)) {
    return "Opera";
  }

  if (
    /chrome/i.test(userAgent) &&
    !/edg/i.test(userAgent)
  ) {
    return "Chrome";
  }

  if (/firefox/i.test(userAgent)) {
    return "Firefox";
  }

  if (
    /safari/i.test(userAgent) &&
    !/chrome/i.test(userAgent)
  ) {
    return "Safari";
  }

  return "Unknown";
}

function getOS(userAgent: string) {
  if (/windows nt/i.test(userAgent)) {
    return "Windows";
  }

  if (
    /iphone|ipad|ipod/i.test(
      userAgent
    )
  ) {
    return "iOS";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/mac os x/i.test(userAgent)) {
    return "macOS";
  }

  if (/linux/i.test(userAgent)) {
    return "Linux";
  }

  return "Unknown";
}

export async function POST(
  request: NextRequest
) {
  try {
    /*
     * =========================================================
     * PRIVATE ANALYTICS EXCLUSION
     * =========================================================
     *
     * If the owner has enabled "EXCLUDE MY VISITS"
     * from the private admin dashboard, this request
     * is ignored completely.
     *
     * The cookie is HttpOnly and therefore cannot be
     * modified/read by normal client-side JavaScript.
     */

    const analyticsExcluded =
      request.cookies.get(
        "analytics_excluded"
      )?.value;

    if (analyticsExcluded === "true") {
      return NextResponse.json({
        success: true,
        tracked: false,
        excluded: true,
        message:
          "Visit excluded from analytics",
      });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const body =
      await request.json().catch(
        () => ({})
      );

    const visitorId =
      typeof body.visitorId === "string" &&
      body.visitorId.trim().length > 0
        ? body.visitorId.trim()
        : null;
            const latitude =
      typeof body.latitude === "number" &&
      Number.isFinite(body.latitude) &&
      body.latitude >= -90 &&
      body.latitude <= 90
        ? body.latitude
        : null;

    const longitude =
      typeof body.longitude === "number" &&
      Number.isFinite(body.longitude) &&
      body.longitude >= -180 &&
      body.longitude <= 180
        ? body.longitude
        : null;

    const locationAccuracy =
      typeof body.accuracy === "number" &&
      Number.isFinite(body.accuracy) &&
      body.accuracy >= 0
        ? body.accuracy
        : null;

    const path =
      typeof body.path === "string" &&
      body.path.trim().length > 0
        ? body.path.trim()
        : "/";

    if (!visitorId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "visitorId is required",
        },
        {
          status: 400,
        }
      );
    }

    const host =
      request.headers.get("host") ||
      "";

    const isLocalhost =
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      host.startsWith("[::1]");

    if (isLocalhost) {
      return NextResponse.json({
        success: true,
        tracked: false,
        message:
          "Localhost visit ignored",
      });
    }

    const userAgent =
      request.headers.get(
        "user-agent"
      ) || "";

    const referrer =
      request.headers.get(
        "referer"
      ) || "";

    const country =
      request.headers.get(
        "x-vercel-ip-country"
      ) || "Unknown";

    const region =
      request.headers.get(
        "x-vercel-ip-country-region"
      ) || "";

    const city =
      request.headers.get(
        "x-vercel-ip-city"
      ) || "Unknown";

    const device =
      getDevice(userAgent);

    const browser =
      getBrowser(userAgent);

    const os =
      getOS(userAgent);

    const now = new Date();

    const existingVisitor =
      await db
        .collection(
          "analytics_visitors"
        )
        .findOne({
          visitorId,
        });

    if (!existingVisitor) {
      await db
        .collection(
          "analytics_visitors"
        )
        .insertOne({
          visitorId,
          country,
          region,
          city,
          latitude,
          longitude,
          locationAccuracy,
          device,
          browser,
          os,
          firstVisit: now,
          lastVisit: now,
          lastActivity: now,
          pages: [path],
          referrer,
          projectClicks: [],
          createdAt: now,
          updatedAt: now,
        });
    } else {
      const updateFields: Record<
        string,
        unknown
      > = {
        lastVisit: now,
        lastActivity: now,
        updatedAt: now,
          ...(latitude !== null &&
        longitude !== null
          ? {
              latitude,
              longitude,
              locationAccuracy,
            }
          : {}),
      };

      if (
        (!existingVisitor.country ||
          existingVisitor.country ===
            "Unknown") &&
        country !== "Unknown"
      ) {
        updateFields.country =
          country;
      }

      if (
        (!existingVisitor.region ||
          existingVisitor.region ===
            "Unknown") &&
        region
      ) {
        updateFields.region =
          region;
      }

      if (
        (!existingVisitor.city ||
          existingVisitor.city ===
            "Unknown") &&
        city !== "Unknown"
      ) {
        updateFields.city =
          city;
      }

      await db
        .collection(
          "analytics_visitors"
        )
        .updateOne(
          {
            visitorId,
          },
          {
            $set: updateFields,
            $addToSet: {
              pages: path,
            },
          }
        );
    }

    await db
      .collection("analytics_events")
      .insertOne({
        type: "visit",
        visitorId,
        path,
        referrer,
        userAgent,
        device,
        browser,
        os,
        country,
        region,
        city,
        latitude,
        longitude,
        locationAccuracy,
        createdAt: now,
      });

    return NextResponse.json({
      success: true,
      tracked: true,
      excluded: false,
    });
  } catch (error) {
    console.error(
      "Analytics visit error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to record visit",
      },
      {
        status: 500,
      }
    );
  }
}
