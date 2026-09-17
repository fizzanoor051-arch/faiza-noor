
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "portfolio_analytics";

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

    await db.collection("analytics_events").insertOne({
      type: "visit",
      visitorId,
      path,
      referrer,
      userAgent: request.headers.get("user-agent") || "",
      createdAt: new Date(),
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
