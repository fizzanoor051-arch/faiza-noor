import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const DB_NAME =
  process.env.MONGODB_DB || "portfolio_analytics";

const RESET_SECRET =
  process.env.ANALYTICS_EXCLUDE_SECRET;

export async function POST(
  request: NextRequest
) {
  try {
    /*
     * =========================================================
     * CONFIGURATION CHECK
     * =========================================================
     */

    if (!RESET_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Analytics reset secret is not configured",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * =========================================================
     * ADMIN AUTHENTICATION
     * =========================================================
     */

    const adminCookie =
      request.cookies.get(
        "analytics_admin"
      )?.value;

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

    /*
     * =========================================================
     * READ PASSWORD
     * =========================================================
     */

    const body =
      await request.json().catch(
        () => ({})
      );

    const secret =
      typeof body.secret === "string"
        ? body.secret
        : "";

    if (
      !secret ||
      secret !== RESET_SECRET
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid reset password",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * =========================================================
     * CREATE RESET TIMESTAMP
     * =========================================================
     *
     * Nothing is deleted from MongoDB.
     *
     * Everything before this timestamp will be treated
     * as historical data and hidden from the dashboard.
     *
     * New visits/clicks after this timestamp will count
     * normally.
     */

    const resetAt = new Date();

    const client =
      await clientPromise;

    const db =
      client.db(DB_NAME);

    /*
     * =========================================================
     * SAVE GLOBAL RESET
     * =========================================================
     *
     * Keep the existing individual reset fields intact.
     * Add a global reset timestamp that can be used by
     * the dashboard as the new starting point.
     */

    await db
      .collection(
        "analytics_controls"
      )
      .updateOne(
        {
          key: "analytics_resets",
        },
        {
          $set: {
            global: resetAt,
            updatedAt: resetAt,
          },
        },
        {
          upsert: true,
        }
      );

    return NextResponse.json({
      success: true,
      resetAt:
        resetAt.toISOString(),
      message:
        "Analytics have been reset successfully.",
    });
  } catch (error) {
    console.error(
      "Analytics reset error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to reset analytics",
      },
      {
        status: 500,
      }
    );
  }
}