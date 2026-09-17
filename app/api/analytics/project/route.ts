
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME =
  process.env.MONGODB_DB || "portfolio_analytics";

export async function POST(
  request: NextRequest
) {
  try {
    /*
     * =========================================================
     * PRIVATE ANALYTICS EXCLUSION
     * =========================================================
     *
     * If the owner has enabled "EXCLUDE MY VISITS",
     * project clicks from this browser are ignored.
     *
     * The cookie is HttpOnly and is checked server-side.
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
          "Project click excluded from analytics",
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

    const projectSlug =
      typeof body.projectSlug === "string" &&
      body.projectSlug.trim().length > 0
        ? body.projectSlug.trim()
        : null;

    const projectName =
      typeof body.projectName === "string" &&
      body.projectName.trim().length > 0
        ? body.projectName.trim()
        : null;

    const projectUrl =
      typeof body.projectUrl === "string"
        ? body.projectUrl.trim()
        : "";

    if (
      !visitorId ||
      !projectSlug ||
      !projectName
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "visitorId, projectSlug and projectName are required",
        },
        {
          status: 400,
        }
      );
    }

    const now = new Date();

    const referrer =
      request.headers.get(
        "referer"
      ) || "";

    const userAgent =
      request.headers.get(
        "user-agent"
      ) || "";

    await db
      .collection("analytics_events")
      .insertOne({
        type: "project_click",
        visitorId,
        projectSlug,
        projectName,
        projectUrl,
        referrer,
        userAgent,
        createdAt: now,
      });

    await db
      .collection("analytics_visitors")
      .updateOne(
        {
          visitorId,
        },
        {
          $addToSet: {
            projectClicks:
              projectName,
          },
          $set: {
            lastActivity: now,
            updatedAt: now,
          },
        }
      );

    return NextResponse.json({
      success: true,
      tracked: true,
      excluded: false,
    });
  } catch (error) {
    console.error(
      "Analytics project click error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to record project click",
      },
      {
        status: 500,
      }
    );
  }
}
