import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "portfolio_analytics";

export async function GET(request: NextRequest) {
  try {
    const adminCookie = request.cookies.get("analytics_admin")?.value;

    if (adminCookie !== "authenticated") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const events = db.collection("analytics_events");

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOf7Days = new Date(now);
    startOf7Days.setDate(startOf7Days.getDate() - 7);

    const startOf30Days = new Date(now);
    startOf30Days.setDate(startOf30Days.getDate() - 30);

    const [
      totalVisits,
      uniqueVisitors,
      todayVisits,
      last7DaysVisits,
      last30DaysVisits,
      totalProjectClicks,
      projectStats,
      recentActivity,
      referrerStats,
    ] = await Promise.all([
      events.countDocuments({
        type: "visit",
      }),

      events.distinct("visitorId", {
        type: "visit",
      }),

      events.countDocuments({
        type: "visit",
        createdAt: {
          $gte: startOfToday,
        },
      }),

      events.countDocuments({
        type: "visit",
        createdAt: {
          $gte: startOf7Days,
        },
      }),

      events.countDocuments({
        type: "visit",
        createdAt: {
          $gte: startOf30Days,
        },
      }),

      events.countDocuments({
        type: "project_click",
      }),

      events
        .aggregate([
          {
            $match: {
              type: "project_click",
            },
          },
          {
            $group: {
              _id: {
                projectSlug: "$projectSlug",
                projectName: "$projectName",
              },
              clicks: {
                $sum: 1,
              },
              uniqueVisitors: {
                $addToSet: "$visitorId",
              },
            },
          },
          {
            $project: {
              _id: 0,
              projectSlug: "$_id.projectSlug",
              projectName: "$_id.projectName",
              clicks: 1,
              uniqueVisitors: {
                $size: "$uniqueVisitors",
              },
            },
          },
          {
            $sort: {
              clicks: -1,
            },
          },
        ])
        .toArray(),

      events
        .find(
          {},
          {
            projection: {
              _id: 0,
              type: 1,
              visitorId: 1,
              path: 1,
              projectSlug: 1,
              projectName: 1,
              projectUrl: 1,
              referrer: 1,
              createdAt: 1,
            },
          }
        )
        .sort({
          createdAt: -1,
        })
        .limit(20)
        .toArray(),

      events
        .aggregate([
          {
            $match: {
              type: "visit",
              referrer: {
                $nin: ["", null],
              },
            },
          },
          {
            $group: {
              _id: "$referrer",
              visits: {
                $sum: 1,
              },
            },
          },
          {
            $project: {
              _id: 0,
              referrer: "$_id",
              visits: 1,
            },
          },
          {
            $sort: {
              visits: -1,
            },
          },
          {
            $limit: 10,
          },
        ])
        .toArray(),
    ]);

    return NextResponse.json({
      success: true,

      overview: {
        totalVisits,
        uniqueVisitors: uniqueVisitors.length,
        todayVisits,
        last7DaysVisits,
        last30DaysVisits,
        totalProjectClicks,
      },

      projects: projectStats,

      recentActivity,

      referrers: referrerStats,

      generatedAt: now.toISOString(),
    });
  } catch (error) {
    console.error("Analytics stats error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load analytics statistics",
      },
      {
        status: 500,
      }
    );
  }
}