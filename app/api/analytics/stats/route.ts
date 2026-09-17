import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB || "portfolio_analytics";

function getStartDate(period: string, now: Date) {
if (!period || period === "all") {
return null;
}

const start = new Date(now);

if (period === "today") {
start.setHours(0, 0, 0, 0);
return start;
}

const days: Record<string, number> = {
"3d": 3,
"7d": 7,
"15d": 15,
"20d": 20,
};

if (days[period]) {
start.setHours(0, 0, 0, 0);
start.setDate(start.getDate() - (days[period] - 1));
return start;
}

const monthsMatch = period.match(/^(\d+)m$/);

if (monthsMatch) {
const months = Number(monthsMatch[1]);
start.setMonth(start.getMonth() - months);
return start;
}

if (period === "1y") {
start.setFullYear(start.getFullYear() - 1);
return start;
}

return null;
}

export async function GET(request: NextRequest) {
try {
const adminCookie =
request.cookies.get("analytics_admin")?.value;


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
const visitors = db.collection("analytics_visitors");

/*
 * =========================================================
 * CURRENT ADMIN VISITOR
 * =========================================================
 *
 * The dashboard sends the browser's visitorId.
 * This allows "Your Clicks" to show only clicks generated
 * from the browser currently being used by the admin.
 */

const yourVisitorId =
  request.nextUrl.searchParams.get("visitorId") || "";

const now = new Date();

const period =
  request.nextUrl.searchParams.get("period") || "all";

const selectedStartDate = getStartDate(period, now);

/*
 * =========================================================
 * ANALYTICS RESET CONTROLS
 * =========================================================
 *
 * Each section has its own reset timestamp.
 *
 * visitorDetails
 * projectClicks
 * recentActivity
 * referrers
 *
 * Events before the corresponding reset timestamp are
 * hidden from that section.
 *
 * The original events are NOT deleted. This allows the
 * future Trash / Undo system to restore them.
 */

const controlsCollection =
  db.collection("analytics_controls");

const resetControls =
  await controlsCollection.findOne(
    {
      key: "analytics_resets",
    }
  );
const visitorDetailsReset =
  resetControls?.visitorDetails
    ? new Date(resetControls.visitorDetails)
    : null;

const projectClicksReset =
  resetControls?.projectClicks
    ? new Date(resetControls.projectClicks)
    : null;

const recentActivityReset =
  resetControls?.recentActivity
    ? new Date(resetControls.recentActivity)
    : null;

const referrersReset =
  resetControls?.referrers
    ? new Date(resetControls.referrers)
    : null;

/*
 * =========================================================
 * DATE FILTER HELPERS
 * =========================================================
 */

const createDateFilter = (
  resetDate: Date | null
) => {
  const filter: {
    createdAt?: {
      $gte?: Date;
      $lte?: Date;
    };
  } = {};

  if (selectedStartDate && resetDate) {
    filter.createdAt = {
      $gte:
        selectedStartDate > resetDate
          ? selectedStartDate
          : resetDate,
      $lte: now,
    };
  } else if (selectedStartDate) {
    filter.createdAt = {
      $gte: selectedStartDate,
      $lte: now,
    };
  } else if (resetDate) {
    filter.createdAt = {
      $gte: resetDate,
      $lte: now,
    };
  }

  return filter;
};

/*
 * =========================================================
 * ADMIN PATH PROTECTION
 * =========================================================
 *
 * /secret-admin should never be counted as a normal
 * portfolio visit.
 */

const portfolioVisitFilter = {
  $or: [
    {
      path: {
        $exists: false,
      },
    },
    {
      path: {
        $not: /^\/secret-admin(?:\/|$)/,
      },
    },
  ],
};

/*
 * =========================================================
 * SECTION DATE FILTERS
 * =========================================================
 */

const visitorDetailsDateFilter =
  createDateFilter(visitorDetailsReset);

const projectClicksDateFilter =
  createDateFilter(projectClicksReset);

const recentActivityDateFilter =
  createDateFilter(recentActivityReset);

const referrersDateFilter =
  createDateFilter(referrersReset);

/*
 * =========================================================
 * VISITOR DETAILS
 * =========================================================
 *
 * This section uses its own reset timestamp.
 */

const visitMatch = {
  type: "visit",
  ...visitorDetailsDateFilter,
  ...portfolioVisitFilter,
};

/*
 * =========================================================
 * PROJECT CLICKS
 * =========================================================
 *
 * This section uses its own reset timestamp.
 */

const projectClickMatch = {
  type: "project_click",
  ...projectClicksDateFilter,
};

/*
 * =========================================================
 * YOUR CLICKS
 * =========================================================
 *
 * Your clicks follow the Project Clicks reset because
 * they are a filtered view of project click events.
 */

const yourClicksMatch = yourVisitorId
  ? {
      type: "project_click",
      visitorId: yourVisitorId,
      ...projectClicksDateFilter,
    }
  : {
      type: "project_click",
      ...projectClicksDateFilter,
      visitorId: "__no_current_visitor__",
    };

/*
 * =========================================================
 * RECENT ACTIVITY
 * =========================================================
 *
 * Recent Activity has its own independent reset.
 */

const recentVisitMatch = {
  type: "visit",
  ...recentActivityDateFilter,
  ...portfolioVisitFilter,
};

const recentProjectClickMatch = {
  type: "project_click",
  ...recentActivityDateFilter,
};

/*
 * =========================================================
 * LOAD MAIN ANALYTICS DATA
 * =========================================================
 */

const [
  totalVisits,
  uniqueVisitors,
  totalProjectClicks,
  yourClicks,
  projectStats,
  recentActivity,
  referrerStats,
  visitorEvents,
  storedVisitors,
  projectClickEvents,
] = await Promise.all([
  /*
   * Visitor Details totals
   */
  events.countDocuments(visitMatch),

  events.distinct(
    "visitorId",
    visitMatch
  ),

  /*
   * Project Click totals
   */
  events.countDocuments(projectClickMatch),

  events.countDocuments(yourClicksMatch),

  /*
   * Project performance
   */
  events
    .aggregate([
      {
        $match: projectClickMatch,
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

  /*
   * Recent Activity
   *
   * Uses its own reset timestamp.
   */
  events
    .find(
      {
        $or: [
          recentVisitMatch,
          recentProjectClickMatch,
        ],
      },
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

  /*
   * Referrers
   *
   * Uses its own reset timestamp.
   */
  events
    .aggregate([
      {
        $match: {
          type: "visit",
          ...referrersDateFilter,
          ...portfolioVisitFilter,
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

  /*
   * Visitor intelligence
   *
   * Uses Visitor Details reset.
   */
  events
    .find(
      visitMatch,
      {
        projection: {
          _id: 0,
          visitorId: 1,
          country: 1,
          region: 1,
          city: 1,
          device: 1,
          browser: 1,
          os: 1,
          path: 1,
          referrer: 1,
          createdAt: 1,
        },
      }
    )
    .sort({
      createdAt: -1,
    })
    .toArray(),

  /*
   * Stored visitor information
   */
  visitors
    .find(
      {},
      {
        projection: {
          _id: 0,
          visitorId: 1,
          country: 1,
          region: 1,
          city: 1,
          device: 1,
          browser: 1,
          os: 1,
          firstVisit: 1,
          lastVisit: 1,
          pages: 1,
          referrer: 1,
          projectClicks: 1,
        },
      }
    )
    .toArray(),

  /*
   * Project click intelligence
   */
  events
    .find(
      projectClickMatch,
      {
        projection: {
          _id: 0,
          visitorId: 1,
          projectName: 1,
        },
      }
    )
    .toArray(),
]);

/*
 * =========================================================
 * BUILD VISITOR INTELLIGENCE
 * =========================================================
 */

const visitorMap = new Map<
  string,
  {
    visitorId: string;
    country: string;
    region: string;
    city: string;
    device: string;
    browser: string;
    os: string;
    firstVisit: Date | null;
    lastVisit: Date | null;
    pages: string[];
    referrer: string;
    projectClicks: string[];
  }
>();

for (const event of visitorEvents) {
  if (!event.visitorId) continue;

  const eventDate = event.createdAt
    ? new Date(event.createdAt)
    : null;

  const existing =
    visitorMap.get(event.visitorId);

  if (!existing) {
    visitorMap.set(event.visitorId, {
      visitorId: event.visitorId,
      country: event.country || "Unknown",
      region: event.region || "",
      city: event.city || "Unknown",
      device: event.device || "Unknown",
      browser: event.browser || "Unknown",
      os: event.os || "Unknown",
      firstVisit: eventDate,
      lastVisit: eventDate,
      pages: event.path
        ? [event.path]
        : [],
      referrer: event.referrer || "",
      projectClicks: [],
    });

    continue;
  }

  if (
    eventDate &&
    (!existing.firstVisit ||
      eventDate.getTime() <
        new Date(
          existing.firstVisit
        ).getTime())
  ) {
    existing.firstVisit = eventDate;
  }

  if (
    eventDate &&
    (!existing.lastVisit ||
      eventDate.getTime() >
        new Date(
          existing.lastVisit
        ).getTime())
  ) {
    existing.lastVisit = eventDate;
  }

  if (
    event.path &&
    !existing.pages.includes(event.path)
  ) {
    existing.pages.push(event.path);
  }

  if (
    (!existing.country ||
      existing.country === "Unknown") &&
    event.country
  ) {
    existing.country = event.country;
  }

  if (
    !existing.region &&
    event.region
  ) {
    existing.region = event.region;
  }

  if (
    (!existing.city ||
      existing.city === "Unknown") &&
    event.city
  ) {
    existing.city = event.city;
  }

  if (
    (!existing.device ||
      existing.device === "Unknown") &&
    event.device
  ) {
    existing.device = event.device;
  }

  if (
    (!existing.browser ||
      existing.browser === "Unknown") &&
    event.browser
  ) {
    existing.browser = event.browser;
  }

  if (
    (!existing.os ||
      existing.os === "Unknown") &&
    event.os
  ) {
    existing.os = event.os;
  }

  if (
    !existing.referrer &&
    event.referrer
  ) {
    existing.referrer = event.referrer;
  }
}

/*
 * =========================================================
 * MERGE STORED VISITOR INFORMATION
 * =========================================================
 */

for (const visitor of storedVisitors) {
  if (!visitor.visitorId) continue;

  const existing =
    visitorMap.get(visitor.visitorId);

  if (!existing) continue;

  if (
    (!existing.country ||
      existing.country === "Unknown") &&
    visitor.country
  ) {
    existing.country =
      visitor.country;
  }

  if (
    !existing.region &&
    visitor.region
  ) {
    existing.region =
      visitor.region;
  }

  if (
    (!existing.city ||
      existing.city === "Unknown") &&
    visitor.city
  ) {
    existing.city =
      visitor.city;
  }

  if (
    (!existing.device ||
      existing.device === "Unknown") &&
    visitor.device
  ) {
    existing.device =
      visitor.device;
  }

  if (
    (!existing.browser ||
      existing.browser === "Unknown") &&
    visitor.browser
  ) {
    existing.browser =
      visitor.browser;
  }

  if (
    (!existing.os ||
      existing.os === "Unknown") &&
    visitor.os
  ) {
    existing.os =
      visitor.os;
  }
}

/*
 * =========================================================
 * PROJECT CLICKS FOR VISITORS
 * =========================================================
 */

for (const click of projectClickEvents) {
  if (
    !click.visitorId ||
    !click.projectName
  ) {
    continue;
  }

  const visitor =
    visitorMap.get(click.visitorId);

  if (!visitor) continue;

  if (
    !visitor.projectClicks.includes(
      click.projectName
    )
  ) {
    visitor.projectClicks.push(
      click.projectName
    );
  }
}

const visitorStats =
  Array.from(
    visitorMap.values()
  )
    .sort((a, b) => {
      const aTime = a.lastVisit
        ? new Date(
            a.lastVisit
          ).getTime()
        : 0;

      const bTime = b.lastVisit
        ? new Date(
            b.lastVisit
          ).getTime()
        : 0;

      return bTime - aTime;
    })
    .map((visitor) => ({
      ...visitor,
      firstVisit:
        visitor.firstVisit
          ? new Date(
              visitor.firstVisit
            )
          : null,
      lastVisit:
        visitor.lastVisit
          ? new Date(
              visitor.lastVisit
            )
          : null,
    }));

/*
 * =========================================================
 * STANDARD OVERVIEW PERIODS
 * =========================================================
 */

const startOfToday =
  new Date(now);

startOfToday.setHours(
  0,
  0,
  0,
  0
);

const startOf7Days =
  new Date(now);

startOf7Days.setDate(
  startOf7Days.getDate() - 6
);

startOf7Days.setHours(
  0,
  0,
  0,
  0
);

/*
 * Last 30 Days is intentionally no longer used by the
 * dashboard card. It is kept in the API temporarily so
 * existing code does not break.
 */

const startOf30Days =
  new Date(now);

startOf30Days.setDate(
  startOf30Days.getDate() - 29
);

startOf30Days.setHours(
  0,
  0,
  0,
  0
);

/*
 * =========================================================
 * TODAY / 7 DAYS / 30 DAYS
 * =========================================================
 *
 * These overview values follow the Visitor Details reset.
 */

const overviewResetDate =
  visitorDetailsReset;

const todayFilter =
  overviewResetDate &&
  overviewResetDate > startOfToday
    ? {
        $gte:
          overviewResetDate,
        $lte: now,
      }
    : {
        $gte: startOfToday,
        $lte: now,
      };

const sevenDayFilter =
  overviewResetDate &&
  overviewResetDate > startOf7Days
    ? {
        $gte:
          overviewResetDate,
        $lte: now,
      }
    : {
        $gte: startOf7Days,
        $lte: now,
      };

const thirtyDayFilter =
  overviewResetDate &&
  overviewResetDate > startOf30Days
    ? {
        $gte:
          overviewResetDate,
        $lte: now,
      }
    : {
        $gte: startOf30Days,
        $lte: now,
      };

const [
  todayVisits,
  last7DaysVisits,
  last30DaysVisits,
] = await Promise.all([
  events.countDocuments({
    type: "visit",
    ...portfolioVisitFilter,
    createdAt: todayFilter,
  }),

  events.countDocuments({
    type: "visit",
    ...portfolioVisitFilter,
    createdAt: sevenDayFilter,
  }),

  events.countDocuments({
    type: "visit",
    ...portfolioVisitFilter,
    createdAt: thirtyDayFilter,
  }),
]);

/*
 * =========================================================
 * RESPONSE
 * =========================================================
 *
 * resetTimes are returned so the dashboard can know when
 * each section was last cleared.
 */

return NextResponse.json({
  success: true,

  period,

  overview: {
    totalVisits,
    uniqueVisitors:
      uniqueVisitors.length,
    todayVisits,
    last7DaysVisits,
    last30DaysVisits,
    totalProjectClicks,
    yourClicks,
  },

  resetTimes: {
    visitorDetails:
      visitorDetailsReset
        ? visitorDetailsReset.toISOString()
        : null,

    projectClicks:
      projectClicksReset
        ? projectClicksReset.toISOString()
        : null,

    recentActivity:
      recentActivityReset
        ? recentActivityReset.toISOString()
        : null,

    referrers:
      referrersReset
        ? referrersReset.toISOString()
        : null,
  },

  projects: projectStats,

  recentActivity,

  referrers:
    referrerStats,

  visitors:
    visitorStats,

  generatedAt:
    now.toISOString(),
});


} catch (error) {
console.error(
"Analytics stats error:",
error
);


return NextResponse.json(
  {
    success: false,
    message:
      "Failed to load analytics statistics",
  },
  {
    status: 500,
  }
);


}
}
