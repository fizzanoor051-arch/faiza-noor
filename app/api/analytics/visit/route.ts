
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "portfolio_analytics";

function getDevice(userAgent: string) {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return "Tablet";
  }

  if (/mobile|iphone|ipod|android/i.test(userAgent)) {
    return "Mobile";
  }

  return "Desktop";
}

function getBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) return "Edge";
  if (/opr|opera/i.test(userAgent)) return "Opera";
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
    return "Chrome";
  }
  if (/firefox/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    return "Safari";
  }

  return "Unknown";
}

function getOS(userAgent: string) {
  if (/windows nt/i.test(userAgent)) return "Windows";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/android/i.test(userAgent)) return "Android";
  if (/mac os x/i.test(userAgent)) return "macOS";
  if (/linux/i.test(userAgent)) return "Linux";

  return "Unknown";
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const body = await request.json().catch(() => ({}));

    const visitorId =
      typeof body.visitorId === "string" && body.visitorId.length > 0
        ? body.visitorId
        : null;

    const path =
      typeof body.path === "string" && body.path.length > 0
        ? body.path
        : "/";

    const referrer =
      typeof body.referrer === "string" ? body.referrer : "";

    if (!visitorId) {
      return NextResponse.json(
        {
          success: false,
          message: "visitorId is required",
        },
        { status: 400 }
      );
    }

    // Do not record localhost visits as portfolio visits.
    const host = request.headers.get("host") || "";

    const isLocalhost =
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1") ||
      host.startsWith("[::1]");

    if (isLocalhost) {
      return NextResponse.json({
        success: true,
        tracked: false,
        message: "Localhost visit ignored",
      });
    }

    const userAgent = request.headers.get("user-agent") || "";

    // Vercel can provide approximate geographic information
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("x-vercel-ip-country-region") ||
      "Unknown";

    const region =
      request.headers.get("x-vercel-ip-country-region") || "";

    const city =
      request.headers.get("x-vercel-ip-city") || "Unknown";

    const device = getDevice(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    const now = new Date();

    // Check whether this visitor already exists
    const existingVisitor = await db
      .collection("analytics_visitors")
      .findOne({ visitorId });

    if (!existingVisitor) {
      await db.collection("analytics_visitors").insertOne({
        visitorId,
        country,
        region,
        city,
        device,
        browser,
        os,
        firstVisit: now,
        lastVisit: now,
        pages: [path],
        referrer,
        projectClicks: [],
        createdAt: now,
        updatedAt: now,
      });
    } else {
      await db.collection("analytics_visitors").updateOne(
        { visitorId },
        {
          $set: {
            lastVisit: now,
            updatedAt: now,
            country:
              existingVisitor.country === "Unknown"
                ? country
                : existingVisitor.country,
            region:
              existingVisitor.region || region,
            city:
              existingVisitor.city === "Unknown"
                ? city
                : existingVisitor.city,
          },
          $addToSet: {
            pages: path,
          },
        }
      );
    }

    // Keep the existing event tracking
    await db.collection("analytics_events").insertOne({
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
      createdAt: now,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Analytics visit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to record visit",
      },
      { status: 500 }
    );
  }
}
