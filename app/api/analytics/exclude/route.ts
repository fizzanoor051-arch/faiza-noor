import { NextRequest, NextResponse } from "next/server";

const EXCLUDE_SECRET =
  process.env.ANALYTICS_EXCLUDE_SECRET;

export async function GET(
  request: NextRequest
) {
  try {
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
        { status: 401 }
      );
    }

    const excluded =
      request.cookies.get(
        "analytics_excluded"
      )?.value === "true";

    return NextResponse.json({
      success: true,
      excluded,
    });
  } catch (error) {
    console.error(
      "Analytics exclusion status error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to get exclusion status",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    if (!EXCLUDE_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Analytics exclude secret is not configured",
        },
        { status: 500 }
      );
    }

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
        { status: 401 }
      );
    }

    const body =
      await request.json().catch(
        () => ({})
      );

    const secret =
      typeof body.secret === "string"
        ? body.secret
        : "";

    const enabled =
      body.enabled === true;

    if (
      !secret ||
      secret !== EXCLUDE_SECRET
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid exclusion secret",
        },
        { status: 401 }
      );
    }

    const response =
      NextResponse.json({
        success: true,
        excluded: enabled,
      });

    response.cookies.set(
      "analytics_excluded",
      enabled ? "true" : "false",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        path: "/",
        maxAge: enabled
          ? 60 * 60 * 24 * 365
          : 0,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Analytics exclusion error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update analytics exclusion",
      },
      { status: 500 }
    );
  }
}