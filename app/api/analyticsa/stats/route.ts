
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME =
  process.env.MONGODB_DB ||
  "portfolio_analytics";

const PROJECTS = {
  "nexaflow-ai": {
    name: "NexaFlow AI",
    url: "https://nexaflow-ai-sepia.vercel.app/",
  },
  luxora: {
    name: "Luxora Store",
    url: "https://luxora-zuq4.vercel.app/",
  },
  shopsphere: {
    name: "ShopSphere",
    url: "https://shopsphere-ecommerce-beta.vercel.app/",
  },
  medicare: {
    name: "Medicare",
    url: "https://classy-vacherin-7a04fc.netlify.app/",
  },
} as const;

function getStartDate(period: string) {
  const now = new Date();

  switch (period) {
    case "today": {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return start;
    }

    case "3d":
      return new Date(
        now.getTime() -
          3 * 24 * 60 * 60 * 1000
      );

    case "7d":
      return new Date(
        now.getTime() -
          7 * 24 * 60 * 60 * 1000
      );

    case "15d":
      return new Date(
        now.getTime() -
          15 * 24 * 60 * 60 * 1000
      );

    case "20d":
      return new Date(
        now.getTime() -
          20 * 24 * 60 * 60 * 1000
      );

    case "1m":
      return new Date(
        now.getTime() -
          30 * 24 * 60 * 60 * 1000
      );

    case "2m":
      return new Date(
        now.getTime() -
          60 * 24 * 60 * 60 * 1000
      );

    case "3m":
      return new Date(
        now.getTime() -
          90 * 24 * 60 * 60 * 1000
      );

    case "4m":
      return new Date(
        now.getTime() -
          120 * 24 * 60 * 60 * 1000
      );

    case "5m":
      return new Date(
        now.getTime() -
          150 * 24 * 60 * 60 * 1000
      );

    case "6m":
      return new Date(
        now.getTime() -
          180 * 24 * 60 * 60 * 1000
      );

    case "9m":
      return new Date(
        now.getTime() -
          270 * 24 * 60 * 60 * 1000
      );

    case "12m":
      return new Date(
        now.getTime() -
          365 * 24 * 60 * 60 * 1000
      );

    case "1y":
      return new Date(
        now.getTime() -
          365 * 24 * 60 * 60 * 1000
      );

    case "all":
    default:
      return null;
  }
}

function safeDate(value: unknown) {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return new Date(0);
}

function getProjectName(
  projectSlug?: string
) {
  if (
    projectSlug &&
    projectSlug in PROJECTS
  ) {
    return PROJECTS[
      projectSlug as keyof typeof PROJECTS
    ].name;
  }

  return projectSlug || "Unknown";
}

function getProjectUrl(
  projectSlug?: string
) {
  if (
    projectSlug &&
    projectSlug in PROJECTS
  ) {
    return PROJECTS[
      projectSlug as keyof typeof PROJECTS
    ].url;
  }

  return "";
}

export async function GET(
  request: NextRequest
) {
  try {
    const adminCookie =
      request.cookies.get(
        "analytics_admin"
      )?.value;

    if (!adminCookie) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } =
      new URL(request.url);

    const period =
      searchParams.get("period") ||
      "all";

    const requestedVisitorId =
      searchParams.get("visitorId") ||
      "";

    const client =
      await clientPromise;

    const db =
      client.db(DB_NAME);

    const controls =
      await db
        .collection(
          "analytics_controls"
        )
        .findOne({
          key: "analytics_resets",
        });

    const globalResetDate =
      controls?.global
        ? safeDate(controls.global)
        : null;

    const periodStart =
      getStartDate(period);

    let effectiveStart =
      periodStart;

    if (
      globalResetDate &&
      (!effectiveStart ||
        globalResetDate >
          effectiveStart)
    ) {
      effectiveStart =
        globalResetDate;
    }

    const eventFilter: Record<
      string,
      unknown
    > = {
      path: {
        $not: /^\/secret-admin(?:\/|$)/,
      },
    };

    if (effectiveStart) {
      eventFilter.createdAt = {
        $gte: effectiveStart,
      };
    }

    const events =
      await db
        .collection(
          "analytics_events"
        )
        .find(eventFilter)
        .sort({
          createdAt: -1,
        })
        .limit(10000)
        .toArray();

    const visitEvents =
      events.filter(
        (event) =>
          event.type ===
          "visit"
      );

    const projectEvents =
      events.filter(
        (event) =>
          event.type ===
          "project_click"
      );

    const allVisitorIds =
      new Set<string>();

    for (const event of events) {
      if (
        typeof event.visitorId ===
        "string"
      ) {
        allVisitorIds.add(
          event.visitorId
        );
      }
    }

    const visitors =
      await db
        .collection(
          "analytics_visitors"
        )
        .find({})
        .limit(10000)
        .toArray();

    const visitorMap =
      new Map<
        string,
        Record<string, any>
      >();

    for (const visitor of visitors) {
      if (
        typeof visitor.visitorId !==
        "string"
      ) {
        continue;
      }

      visitorMap.set(
        visitor.visitorId,
        {
          visitorId:
            visitor.visitorId,

          country:
            visitor.country ||
            "",

          region:
            visitor.region ||
            "",

          city:
            visitor.city ||
            "",

          device:
            visitor.device ||
            "",

          browser:
            visitor.browser ||
            "",

          os:
            visitor.os ||
            "",

          firstVisit:
            visitor.firstSeenAt
              ? safeDate(
                  visitor.firstSeenAt
                ).toISOString()
              : "",

          lastVisit:
            visitor.lastSeenAt
              ? safeDate(
                  visitor.lastSeenAt
                ).toISOString()
              : "",

          pages:
            Array.isArray(
              visitor.pages
            )
              ? visitor.pages
              : [],

          referrer:
            visitor.firstReferrer ||
            visitor.referrer ||
            "",

          projectClicks:
            Number(
              visitor.projectVisits ||
                0
            ),

          latitude:
            typeof visitor.latitude ===
            "number"
              ? visitor.latitude
              : null,

          longitude:
            typeof visitor.longitude ===
            "number"
              ? visitor.longitude
              : null,

          locationAccuracy:
            typeof visitor.locationAccuracy ===
            "number"
              ? visitor.locationAccuracy
              : null,
        }
      );
    }

    /*
     * Merge information from current
     * period events into visitor records.
     */
    for (const event of events) {
      if (
        typeof event.visitorId !==
        "string"
      ) {
        continue;
      }

      const existing =
        visitorMap.get(
          event.visitorId
        ) || {
          visitorId:
            event.visitorId,
          country: "",
          region: "",
          city: "",
          device: "",
          browser: "",
          os: "",
          firstVisit: "",
          lastVisit: "",
          pages: [],
          referrer: "",
          projectClicks: 0,
          latitude: null,
          longitude: null,
          locationAccuracy:
            null,
        };

      const eventDate =
        safeDate(
          event.createdAt
        );

      const existingFirst =
        existing.firstVisit
          ? safeDate(
              existing.firstVisit
            )
          : null;

      const existingLast =
        existing.lastVisit
          ? safeDate(
              existing.lastVisit
            )
          : null;

      if (
        !existingFirst ||
        eventDate <
          existingFirst
      ) {
        existing.firstVisit =
          eventDate.toISOString();
      }

      if (
        !existingLast ||
        eventDate >
          existingLast
      ) {
        existing.lastVisit =
          eventDate.toISOString();
      }

      if (
        !existing.country &&
        event.country
      ) {
        existing.country =
          event.country;
      }

      if (
        !existing.region &&
        event.region
      ) {
        existing.region =
          event.region;
      }

      if (
        !existing.city &&
        event.city
      ) {
        existing.city =
          event.city;
      }

      if (
        !existing.referrer &&
        event.referrer
      ) {
        existing.referrer =
          event.referrer;
      }

      if (
        typeof event.latitude ===
        "number"
      ) {
        existing.latitude =
          event.latitude;
      }

      if (
        typeof event.longitude ===
        "number"
      ) {
        existing.longitude =
          event.longitude;
      }

      if (
        typeof event.locationAccuracy ===
        "number"
      ) {
        existing.locationAccuracy =
          event.locationAccuracy;
      }

      if (
        typeof event.path ===
        "string" &&
        event.path !==
          "/secret-admin"
      ) {
        const pages =
          Array.isArray(
            existing.pages
          )
            ? existing.pages
            : [];

        if (
          !pages.includes(
            event.path
          )
        ) {
          pages.push(
            event.path
          );
        }

        existing.pages =
          pages;
      }

      if (
        event.type ===
        "project_click"
      ) {
        existing.projectClicks =
          Number(
            existing.projectClicks ||
              0
          ) + 1;
      }

      visitorMap.set(
        event.visitorId,
        existing
      );
    }

    /*
     * Only visitors active in the
     * selected period are returned.
     */
    const periodVisitorIds =
      new Set<string>();

    for (const event of events) {
      if (
        typeof event.visitorId ===
        "string"
      ) {
        periodVisitorIds.add(
          event.visitorId
        );
      }
    }

    const visitorList =
      Array.from(
        periodVisitorIds
      )
        .map((visitorId) =>
          visitorMap.get(
            visitorId
          )
        )
        .filter(Boolean);

    /*
     * Project statistics.
     */
    const projectMap =
      new Map<
        string,
        {
          projectSlug: string;
          projectName: string;
          clicks: number;
          uniqueVisitors: Set<string>;
        }
      >();

    for (const event of projectEvents) {
      const slug =
        typeof event.projectSlug ===
        "string"
          ? event.projectSlug
          : "unknown";

      if (
        !projectMap.has(slug)
      ) {
        projectMap.set(slug, {
          projectSlug:
            slug,
          projectName:
            getProjectName(
              slug
            ),
          clicks: 0,
          uniqueVisitors:
            new Set<string>(),
        });
      }

      const project =
        projectMap.get(slug)!;

      project.clicks += 1;

      if (
        typeof event.visitorId ===
        "string"
      ) {
        project.uniqueVisitors.add(
          event.visitorId
        );
      }
    }

    /*
     * Ensure all known projects
     * appear in the dashboard,
     * even when they have 0 visits.
     */
    for (const [
      slug,
      projectInfo,
    ] of Object.entries(
      PROJECTS
    )) {
      if (
        !projectMap.has(slug)
      ) {
        projectMap.set(slug, {
          projectSlug:
            slug,
          projectName:
            projectInfo.name,
          clicks: 0,
          uniqueVisitors:
            new Set<string>(),
        });
      }
    }

    const projectStats =
      Array.from(
        projectMap.values()
      ).map((project) => ({
        projectSlug:
          project.projectSlug,

        projectName:
          project.projectName,

        clicks:
          project.clicks,

        uniqueVisitors:
          project.uniqueVisitors
            .size,
      }));

    /*
     * Referrer statistics.
     */
    const referrerMap =
      new Map<string, number>();

    for (const event of visitEvents) {
      const referrer =
        typeof event.referrer ===
        "string"
          ? event.referrer.trim()
          : "";

      const key =
        referrer || "Direct";

      referrerMap.set(
        key,
        (referrerMap.get(
          key
        ) || 0) + 1
      );
    }

    for (const event of projectEvents) {
      const referrer =
        typeof event.referrer ===
        "string"
          ? event.referrer.trim()
          : "";

      if (!referrer) {
        continue;
      }

      referrerMap.set(
        referrer,
        (referrerMap.get(
          referrer
        ) || 0) + 1
      );
    }

    const referrers =
      Array.from(
        referrerMap.entries()
      )
        .map(
          ([referrer, visits]) => ({
            referrer,
            visits,
          })
        )
        .sort(
          (a, b) =>
            b.visits -
            a.visits
        )
        .slice(0, 20);

    /*
     * Your own clicks.
     */
    const yourClicks =
      requestedVisitorId
        ? projectEvents.filter(
            (event) =>
              event.visitorId ===
              requestedVisitorId
          ).length
        : 0;

    /*
     * Recent activity.
     */
    const recentActivity =
      events
        .slice(0, 100)
        .map((event) => ({
          type:
            event.type ||
            "visit",

          visitorId:
            event.visitorId ||
            "",

          path:
            event.path ||
            "",

          projectSlug:
            event.projectSlug ||
            "",

          projectName:
            event.projectName ||
            getProjectName(
              event.projectSlug
            ),

          projectUrl:
            getProjectUrl(
              event.projectSlug
            ),

          referrer:
            event.referrer ||
            "",

          createdAt:
            safeDate(
              event.createdAt
            ).toISOString(),
        }));

    /*
     * Overview.
     */
    const totalVisits =
      visitEvents.length;

    const uniqueVisitors =
      new Set(
        visitEvents
          .map(
            (event) =>
              event.visitorId
          )
          .filter(
            (id) =>
              typeof id ===
              "string"
          )
      ).size;

    const now =
      new Date();

    const todayStart =
      new Date(now);

    todayStart.setHours(
      0,
      0,
      0,
      0
    );

    const sevenDaysAgo =
      new Date(
        now.getTime() -
          7 *
            24 *
            60 *
            60 *
            1000
      );

    const thirtyDaysAgo =
      new Date(
        now.getTime() -
          30 *
            24 *
            60 *
            60 *
            1000
      );

    const todayVisits =
      visitEvents.filter(
        (event) =>
          safeDate(
            event.createdAt
          ) >= todayStart
      ).length;

    const last7DaysVisits =
      visitEvents.filter(
        (event) =>
          safeDate(
            event.createdAt
          ) >= sevenDaysAgo
      ).length;

    const last30DaysVisits =
      visitEvents.filter(
        (event) =>
          safeDate(
            event.createdAt
          ) >= thirtyDaysAgo
      ).length;

    const totalProjectClicks =
      projectEvents.length;

    const response = {
      success: true,

      overview: {
        totalVisits,
        uniqueVisitors,
        todayVisits,
        last7DaysVisits,
        last30DaysVisits,
        totalProjectClicks,
        yourClicks,
      },

      projects:
        projectStats,

      recentActivity,

      referrers,

      visitors:
        visitorList,

      generatedAt:
        new Date().toISOString(),

      period,

      resetTimes: {
        global:
          globalResetDate
            ? globalResetDate.toISOString()
            : null,
      },
    };

    return NextResponse.json(
      response,
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Analytics stats error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load analytics.",
      },
      {
        status: 500,
      }
    );
  }
}
