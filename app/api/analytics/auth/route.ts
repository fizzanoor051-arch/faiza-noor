import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ANALYTICS_ADMIN_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Analytics admin secret is not configured",
        },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const secret =
      typeof body.secret === "string"
        ? body.secret
        : "";

    if (!secret || secret !== ADMIN_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid analytics credentials",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Analytics authentication successful",
    });

    response.cookies.set("analytics_admin", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Analytics authentication error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
      },
      {
        status: 500,
      }
    );
  }
}