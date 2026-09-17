
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

    const projectSlug =
      typeof body.projectSlug === "string" && body.projectSlug.length > 0
        ? body.projectSlug
        : null;

    const projectName =
      typeof body.projectName === "string" && body.projectName.length > 0
        ? body.projectName
        : null;

    const projectUrl =
      typeof body.projectUrl === "string" ? body.projectUrl : "";

    if (!visitorId || !projectSlug || !projectName) {
      return NextResponse.json(
        {
          success: false,
          message: "visitorId, projectSlug and projectName are required",
        },
        { status: 400 }
      );
    }

    await db.collection("analytics_events").insertOne({
      type: "project_click",
      visitorId,
      projectSlug,
      projectName,
      projectUrl,
      referrer: request.headers.get("referer") || "",
      userAgent: request.headers.get("user-agent") || "",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Analytics project click error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to record project click",
      },
      { status: 500 }
    );
  }
}
