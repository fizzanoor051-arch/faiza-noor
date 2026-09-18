import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const DB_NAME =
  process.env.MONGODB_DB || "portfolio_analytics";

type ResolvedLocation = {
  city: string;
  country: string;
  region: string;
};

type ProjectConfig = {
  name: string;
  slug: string;
};

const PROJECTS: ProjectConfig[] = [
  {
    name: "NexaFlow AI",
    slug: "nexaflow-ai",
  },
  {
    name: "Luxora Store",
    slug: "luxora",
  },
  {
    name: "ShopSphere",
    slug: "shopsphere",
  },
  {
    name: "Medicare",
    slug: "medicare",
  },
];

function getStartDate(
  period: string,
  now: Date
) {
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

    start.setDate(
      start.getDate() -
        (days[period] - 1)
    );

    return start;
  }

  const monthsMatch =
    period.match(/^(\d+)m$/);

  if (monthsMatch) {
    const months = Number(
      monthsMatch[1]
    );

    start.setMonth(
      start.getMonth() - months
    );

    return start;
  }

  if (period === "1y") {
    start.setFullYear(
      start.getFullYear() - 1
    );

    return start;
  }

  return null;
}

/*
 * =========================================================
 * GPS REVERSE GEOCODING
 * =========================================================
 */

async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<ResolvedLocation | null> {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(
        latitude
      )}&longitude=${encodeURIComponent(
        longitude
      )}&localityLanguage=en`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    const city =
      typeof data.city === "string" &&
      data.city.trim()
        ? data.city.trim()
        : typeof data.locality ===
              "string" &&
          data.locality.trim()
        ? data.locality.trim()
        : "";

    const country =
      typeof data.countryName ===
        "string" &&
      data.countryName.trim()
        ? data.countryName.trim()
        : "";

    const region =
      typeof data.principalSubdivision ===
        "string" &&
      data.principalSubdivision.trim()
        ? data.principalSubdivision.trim()
        : "";

    if (
      !city &&
      !country &&
      !region
    ) {
      return null;
    }

    return {
      city: city || "Unknown",
      country:
        country || "Unknown",
      region,
    };
  } catch (error) {
    console.error(
      "Reverse geocoding failed:",
      error
    );

    return null;
  }
}

export async function GET(
  request: NextRequest
) {
  try {
    /*
     * =======================================================
     * ADMIN AUTH
     * =======================================================
     */

    const adminCookie =
      request.cookies.get(
        "analytics_admin"
      )?.value;

    if (
      adminCookie !==
      "authenticated"
    ) {
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

    const client =
      await clientPromise;

    const db =
      client.db(DB_NAME);

    const events =
      db.collection(
        "analytics_events"
      );

    const visitors =
      db.collection(
        "analytics_visitors"
      );

    /*
     * =======================================================
     * CURRENT ADMIN VISITOR
     * =======================================================
     */

    const yourVisitorId =
      request.nextUrl.searchParams.get(
        "visitorId"
      ) || "";

    const now = new Date();

    const period =
      request.nextUrl.searchParams.get(
        "period"
      ) || "all";

    const selectedStartDate =
      getStartDate(
        period,
        now
      );

    /*
     * =======================================================
     * ANALYTICS RESET CONTROLS
     * =======================================================
     */

    const controlsCollection =
      db.collection(
        "analytics_controls"
      );

    const resetControls =
      await controlsCollection.findOne(
        {
          key: "analytics_resets",
        }
      );

    const visitorDetailsReset =
      resetControls?.visitorDetails
        ? new Date(
            resetControls.visitorDetails
          )
        : null;

    const projectClicksReset =
      resetControls?.projectClicks
        ? new Date(
            resetControls.projectClicks
          )
        : null;

    const recentActivityReset =
      resetControls?.recentActivity
        ? new Date(
            resetControls.recentActivity
          )
        : null;

    const globalReset =
      resetControls?.global
        ? new Date(
            resetControls.global
          )
        : null;

    const referrersReset =
      resetControls?.referrers
        ? new Date(
            resetControls.referrers
          )
        : null;

    /*
     * =======================================================
     * DATE FILTER HELPER
     * =======================================================
     */

    const createDateFilter = (
      resetDate: Date | null
    ) => {
      const effectiveReset =
        globalReset &&
        resetDate
          ? globalReset >
            resetDate
            ? globalReset
            : resetDate
          : globalReset ||
            resetDate;

      const filter: {
        createdAt?: {
          $gte?: Date;
          $lte?: Date;
        };
      } = {};

      if (
        selectedStartDate &&
        effectiveReset
      ) {
        filter.createdAt = {
          $gte:
            selectedStartDate >
            effectiveReset
              ? selectedStartDate
              : effectiveReset,
          $lte: now,
        };
      } else if (
        selectedStartDate
      ) {
        filter.createdAt = {
          $gte:
            selectedStartDate,
          $lte: now,
        };
      } else if (
        effectiveReset
      ) {
        filter.createdAt = {
          $gte:
            effectiveReset,
          $lte: now,
        };
      }

      return filter;
    };

    /*
     * =======================================================
     * ADMIN PATH PROTECTION
     * =======================================================
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
            $not:
              /^\/secret-admin(?:\/|$)/,
          },
        },
      ],
    };

    /*
     * =======================================================
     * SECTION DATE FILTERS
     * =======================================================
     */

    const visitorDetailsDateFilter =
      createDateFilter(
        visitorDetailsReset
      );

    const projectClicksDateFilter =
      createDateFilter(
        projectClicksReset
      );

    const recentActivityDateFilter =
      createDateFilter(
        recentActivityReset
      );

    const referrersDateFilter =
      createDateFilter(
        referrersReset
      );

    /*
     * =======================================================
     * VISITOR DETAILS
     * =======================================================
     */

    const visitMatch = {
      type: "visit",
      ...visitorDetailsDateFilter,
      ...portfolioVisitFilter,
    };

    /*
     * =======================================================
     * PROJECT EVENTS
     * =======================================================
     *
     * External project trackers currently save their
     * project visits as type = "project_click".
     *
     * We use the real MongoDB events here.
     */

    const projectClickMatch = {
      type: "project_click",
      ...projectClicksDateFilter,
    };

    /*
     * =======================================================
     * YOUR CLICKS
     * =======================================================
     */

    const yourClicksMatch =
      yourVisitorId
        ? {
            type: "project_click",
            visitorId:
              yourVisitorId,
            ...projectClicksDateFilter,
          }
        : {
            type: "project_click",
            ...projectClicksDateFilter,
            visitorId:
              "__no_current_visitor__",
          };

    /*
     * =======================================================
     * RECENT ACTIVITY
     * =======================================================
     */

    const recentVisitMatch = {
      type: "visit",
      ...recentActivityDateFilter,
      ...portfolioVisitFilter,
    };

    const recentProjectClickMatch =
      {
        type: "project_click",
        ...recentActivityDateFilter,
      };

    /*
     * =======================================================
     * LOAD MAIN DATA
     * =======================================================
     */

    const [
      totalVisits,
      uniqueVisitors,
      totalProjectClicks,
      yourClicks,
      projectStatsRaw,
      recentActivity,
      referrerStats,
      visitorEvents,
      storedVisitors,
      projectClickEvents,
    ] = await Promise.all([
      events.countDocuments(
        visitMatch
      ),

      events.distinct(
        "visitorId",
        visitMatch
      ),

      events.countDocuments(
        projectClickMatch
      ),

      events.countDocuments(
        yourClicksMatch
      ),

      events
        .aggregate([
          {
            $match:
              projectClickMatch,
          },

          {
            $group: {
              _id: {
                projectSlug:
                  "$projectSlug",

                projectName:
                  "$projectName",
              },

              clicks: {
                $sum: 1,
              },

              uniqueVisitors: {
                $addToSet:
                  "$visitorId",
              },

              lastVisit: {
                $max:
                  "$createdAt",
              },
            },
          },

          {
            $project: {
              _id: 0,

              projectSlug:
                "$_id.projectSlug",

              projectName:
                "$_id.projectName",

              clicks: 1,

              uniqueVisitors: {
                $size:
                  "$uniqueVisitors",
              },

              lastVisit: 1,
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

      events
        .aggregate([
          {
            $match: {
              type: "visit",
              ...referrersDateFilter,
              ...portfolioVisitFilter,

              referrer: {
                $nin: [
                  "",
                  null,
                ],
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

              referrer:
                "$_id",

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
              latitude: 1,
              longitude: 1,
              locationAccuracy: 1,
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
              latitude: 1,
              longitude: 1,
              locationAccuracy: 1,
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
       * IMPORTANT:
       * Load ALL project event information needed
       * for the project detail section.
       */

      events
        .find(
          projectClickMatch,
          {
            projection: {
              _id: 0,
              visitorId: 1,
              projectName: 1,
              projectSlug: 1,
              referrer: 1,
              path: 1,
              country: 1,
              region: 1,
              city: 1,
              latitude: 1,
              longitude: 1,
              locationAccuracy: 1,
              device: 1,
              browser: 1,
              os: 1,
              createdAt: 1,
            },
          }
        )
        .sort({
          createdAt: -1,
        })
        .toArray(),
    ]);

    /*
     * =======================================================
     * BUILD PROJECT STATS
     * =======================================================
     */

    const projectStatsMap =
      new Map<
        string,
        {
          projectSlug: string;
          projectName: string;
          clicks: number;
          uniqueVisitors: number;
          lastVisit: Date | null;
        }
      >();

    /*
     * Start with all four projects.
     *
     * This means a project will still appear as 0
     * even before anyone visits it.
     */

    for (const project of PROJECTS) {
      projectStatsMap.set(
        project.slug,
        {
          projectSlug:
            project.slug,

          projectName:
            project.name,

          clicks: 0,

          uniqueVisitors: 0,

          lastVisit: null,
        }
      );
    }

    for (const project of projectStatsRaw) {
      if (
        typeof project.projectSlug !==
        "string"
      ) {
        continue;
      }

      projectStatsMap.set(
        project.projectSlug,
        {
          projectSlug:
            project.projectSlug,

          projectName:
            project.projectName ||
            project.projectSlug,

          clicks:
            Number(
              project.clicks || 0
            ),

          uniqueVisitors:
            Number(
              project.uniqueVisitors ||
                0
            ),

          lastVisit:
            project.lastVisit
              ? new Date(
                  project.lastVisit
                )
              : null,
        }
      );
    }

    const projectStats =
      PROJECTS.map(
        (project) =>
          projectStatsMap.get(
            project.slug
          )!
      );

    /*
     * =======================================================
     * BUILD VISITOR INTELLIGENCE
     * =======================================================
     */

    const visitorMap = new Map<
      string,
      {
        visitorId: string;
        country: string;
        region: string;
        city: string;
        latitude: number | null;
        longitude: number | null;
        locationAccuracy: number | null;
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

    /*
     * =======================================================
     * GPS CACHE
     * =======================================================
     */

    const locationCache =
      new Map<
        string,
        ResolvedLocation | null
      >();

    const getResolvedLocation =
      async (
        latitude: number | null,
        longitude: number | null
      ) => {
        if (
          typeof latitude !==
            "number" ||
          typeof longitude !==
            "number"
        ) {
          return null;
        }

        const key =
          `${latitude.toFixed(
            5
          )},${longitude.toFixed(
            5
          )}`;

        if (
          locationCache.has(key)
        ) {
          return (
            locationCache.get(
              key
            ) || null
          );
        }

        const location =
          await reverseGeocode(
            latitude,
            longitude
          );

        locationCache.set(
          key,
          location
        );

        return location;
      };

    /*
     * =======================================================
     * PROCESS PORTFOLIO VISITS
     * =======================================================
     */

    for (const event of visitorEvents) {
      if (!event.visitorId) {
        continue;
      }

      const eventLatitude =
        typeof event.latitude ===
        "number"
          ? event.latitude
          : null;

      const eventLongitude =
        typeof event.longitude ===
        "number"
          ? event.longitude
          : null;

      const gpsLocation =
        await getResolvedLocation(
          eventLatitude,
          eventLongitude
        );

      const eventDate =
        event.createdAt
          ? new Date(
              event.createdAt
            )
          : null;

      const existing =
        visitorMap.get(
          event.visitorId
        );

      if (!existing) {
        visitorMap.set(
          event.visitorId,
          {
            visitorId:
              event.visitorId,

            country:
              gpsLocation?.country ||
              event.country ||
              "Unknown",

            region:
              gpsLocation?.region ||
              event.region ||
              "",

            city:
              gpsLocation?.city ||
              event.city ||
              "Unknown",

            latitude:
              eventLatitude,

            longitude:
              eventLongitude,

            locationAccuracy:
              typeof event.locationAccuracy ===
              "number"
                ? event.locationAccuracy
                : null,

            device:
              event.device ||
              "Unknown",

            browser:
              event.browser ||
              "Unknown",

            os:
              event.os ||
              "Unknown",

            firstVisit:
              eventDate,

            lastVisit:
              eventDate,

            pages: event.path
              ? [event.path]
              : [],

            referrer:
              event.referrer ||
              "",

            projectClicks: [],
          }
        );

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
        existing.firstVisit =
          eventDate;
      }

      if (
        eventDate &&
        (!existing.lastVisit ||
          eventDate.getTime() >
            new Date(
              existing.lastVisit
            ).getTime())
      ) {
        existing.lastVisit =
          eventDate;
      }

      if (
        event.path &&
        !existing.pages.includes(
          event.path
        )
      ) {
        existing.pages.push(
          event.path
        );
      }

      if (
        gpsLocation?.country
      ) {
        existing.country =
          gpsLocation.country;
      } else if (
        (!existing.country ||
          existing.country ===
            "Unknown") &&
        event.country
      ) {
        existing.country =
          event.country;
      }

      if (
        gpsLocation?.region
      ) {
        existing.region =
          gpsLocation.region;
      } else if (
        !existing.region &&
        event.region
      ) {
        existing.region =
          event.region;
      }

      if (
        gpsLocation?.city
      ) {
        existing.city =
          gpsLocation.city;
      } else if (
        (!existing.city ||
          existing.city ===
            "Unknown") &&
        event.city
      ) {
        existing.city =
          event.city;
      }

      if (
        eventLatitude !== null &&
        eventLongitude !== null
      ) {
        existing.latitude =
          eventLatitude;

        existing.longitude =
          eventLongitude;

        existing.locationAccuracy =
          typeof event.locationAccuracy ===
          "number"
            ? event.locationAccuracy
            : null;
      }

      if (
        (!existing.device ||
          existing.device ===
            "Unknown") &&
        event.device
      ) {
        existing.device =
          event.device;
      }

      if (
        (!existing.browser ||
          existing.browser ===
            "Unknown") &&
        event.browser
      ) {
        existing.browser =
          event.browser;
      }

      if (
        (!existing.os ||
          existing.os ===
            "Unknown") &&
        event.os
      ) {
        existing.os =
          event.os;
      }

      if (
        !existing.referrer &&
        event.referrer
      ) {
        existing.referrer =
          event.referrer;
      }
    }

    /*
     * =======================================================
     * MERGE STORED VISITOR INFORMATION
     * =======================================================
     */

    for (const visitor of storedVisitors) {
      if (!visitor.visitorId) {
        continue;
      }

      const existing =
        visitorMap.get(
          visitor.visitorId
        );

      if (!existing) {
        continue;
      }

      const storedLatitude =
        typeof visitor.latitude ===
        "number"
          ? visitor.latitude
          : null;

      const storedLongitude =
        typeof visitor.longitude ===
        "number"
          ? visitor.longitude
          : null;

      const storedGpsLocation =
        await getResolvedLocation(
          storedLatitude,
          storedLongitude
        );

      if (
        storedGpsLocation?.country
      ) {
        existing.country =
          storedGpsLocation.country;
      } else if (
        (!existing.country ||
          existing.country ===
            "Unknown") &&
        visitor.country
      ) {
        existing.country =
          visitor.country;
      }

      if (
        storedGpsLocation?.region
      ) {
        existing.region =
          storedGpsLocation.region;
      } else if (
        !existing.region &&
        visitor.region
      ) {
        existing.region =
          visitor.region;
      }

      if (
        storedGpsLocation?.city
      ) {
        existing.city =
          storedGpsLocation.city;
      } else if (
        (!existing.city ||
          existing.city ===
            "Unknown") &&
        visitor.city
      ) {
        existing.city =
          visitor.city;
      }

      if (
        storedLatitude !== null &&
        storedLongitude !== null
      ) {
        existing.latitude =
          storedLatitude;

        existing.longitude =
          storedLongitude;

        existing.locationAccuracy =
          typeof visitor.locationAccuracy ===
          "number"
            ? visitor.locationAccuracy
            : null;
      }

      if (
        (!existing.device ||
          existing.device ===
            "Unknown") &&
        visitor.device
      ) {
        existing.device =
          visitor.device;
      }

      if (
        (!existing.browser ||
          existing.browser ===
            "Unknown") &&
        visitor.browser
      ) {
        existing.browser =
          visitor.browser;
      }

      if (
        (!existing.os ||
          existing.os ===
            "Unknown") &&
        visitor.os
      ) {
        existing.os =
          visitor.os;
      }

      if (
        !existing.referrer &&
        visitor.referrer
      ) {
        existing.referrer =
          visitor.referrer;
      }
    }

    /*
     * =======================================================
     * PROJECT CLICKS FOR PORTFOLIO VISITORS
     * =======================================================
     */

    for (const click of projectClickEvents) {
      if (
        !click.visitorId ||
        !click.projectName
      ) {
        continue;
      }

      const visitor =
        visitorMap.get(
          click.visitorId
        );

      if (!visitor) {
        continue;
      }

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

    /*
     * =======================================================
     * STANDARD VISITOR RESPONSE
     * =======================================================
     */

    const visitorStats =
      Array.from(
        visitorMap.values()
      )
        .sort((a, b) => {
          const aTime =
            a.lastVisit
              ? new Date(
                  a.lastVisit
                ).getTime()
              : 0;

          const bTime =
            b.lastVisit
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

          projectClicks:
            visitor.projectClicks.length,
        }));

    /*
     * =======================================================
     * PROJECT DETAIL DATA
     * =======================================================
     *
     * This is the new section.
     *
     * Each project gets its own visitor intelligence.
     * Only REAL project event data is used.
     */

    type ProjectVisitorDetail = {
      visitorId: string;
      country: string;
      region: string;
      city: string;
      latitude: number | null;
      longitude: number | null;
      locationAccuracy:
        number | null;
      referrer: string;
      device: string;
      browser: string;
      os: string;
      firstVisit: Date | null;
      lastVisit: Date | null;
      visits: number;
    };

    type ProjectDetail = {
      projectSlug: string;
      projectName: string;
      totalVisits: number;
      uniqueVisitors: number;
      lastVisit: Date | null;
      countries: string[];
      cities: string[];
      referrers: string[];
      devices: string[];
      browsers: string[];
      operatingSystems: string[];
      visitors: ProjectVisitorDetail[];
    };

    const projectDetailsMap =
      new Map<
        string,
        ProjectDetail
      >();

    /*
     * Initialize all projects.
     */

    for (const project of PROJECTS) {
      projectDetailsMap.set(
        project.slug,
        {
          projectSlug:
            project.slug,

          projectName:
            project.name,

          totalVisits: 0,

          uniqueVisitors: 0,

          lastVisit: null,

          countries: [],

          cities: [],

          referrers: [],

          devices: [],

          browsers: [],

          operatingSystems: [],

          visitors: [],
        }
      );
    }

    /*
     * Temporary per-project visitor maps.
     */

    const projectVisitorMaps =
      new Map<
        string,
        Map<
          string,
          ProjectVisitorDetail
        >
      >();

    for (const project of PROJECTS) {
      projectVisitorMaps.set(
        project.slug,
        new Map()
      );
    }

    /*
     * Process every real project visit.
     */

    for (
      const event of projectClickEvents
    ) {
      const slug =
        typeof event.projectSlug ===
        "string"
          ? event.projectSlug
          : "";

      if (!slug) {
        continue;
      }

      const project =
        projectDetailsMap.get(
          slug
        );

      if (!project) {
        continue;
      }

      /*
       * Total project visits.
       */

      project.totalVisits += 1;

      /*
       * Last project visit.
       */

      const eventDate =
        event.createdAt
          ? new Date(
              event.createdAt
            )
          : null;

      if (
        eventDate &&
        (!project.lastVisit ||
          eventDate.getTime() >
            new Date(
              project.lastVisit
            ).getTime())
      ) {
        project.lastVisit =
          eventDate;
      }

      /*
       * Location.
       */

      const eventLatitude =
        typeof event.latitude ===
        "number"
          ? event.latitude
          : null;

      const eventLongitude =
        typeof event.longitude ===
        "number"
          ? event.longitude
          : null;

      const gpsLocation =
        await getResolvedLocation(
          eventLatitude,
          eventLongitude
        );

      const country =
        gpsLocation?.country ||
        event.country ||
        "Unknown";

      const city =
        gpsLocation?.city ||
        event.city ||
        "Unknown";

      /*
       * Summary arrays.
       */

      if (
        country &&
        !project.countries.includes(
          country
        )
      ) {
        project.countries.push(
          country
        );
      }

      if (
        city &&
        city !== "Unknown" &&
        !project.cities.includes(
          city
        )
      ) {
        project.cities.push(
          city
        );
      }

      if (
        event.referrer &&
        !project.referrers.includes(
          event.referrer
        )
      ) {
        project.referrers.push(
          event.referrer
        );
      }

      if (
        event.device &&
        !project.devices.includes(
          event.device
        )
      ) {
        project.devices.push(
          event.device
        );
      }

      if (
        event.browser &&
        !project.browsers.includes(
          event.browser
        )
      ) {
        project.browsers.push(
          event.browser
        );
      }

      if (
        event.os &&
        !project.operatingSystems.includes(
          event.os
        )
      ) {
        project.operatingSystems.push(
          event.os
        );
      }

      /*
       * Visitor ID.
       */

      if (!event.visitorId) {
        continue;
      }

      const projectVisitors =
        projectVisitorMaps.get(
          slug
        );

      if (!projectVisitors) {
        continue;
      }

      const existingVisitor =
        projectVisitors.get(
          event.visitorId
        );

      if (!existingVisitor) {
        projectVisitors.set(
          event.visitorId,
          {
            visitorId:
              event.visitorId,

            country,

            region:
              gpsLocation?.region ||
              event.region ||
              "",

            city,

            latitude:
              eventLatitude,

            longitude:
              eventLongitude,

            locationAccuracy:
              typeof event.locationAccuracy ===
              "number"
                ? event.locationAccuracy
                : null,

            referrer:
              event.referrer || "",

            device:
              event.device ||
              "Unknown",

            browser:
              event.browser ||
              "Unknown",

            os:
              event.os ||
              "Unknown",

            firstVisit:
              eventDate,

            lastVisit:
              eventDate,

            visits: 1,
          }
        );

        continue;
      }

      /*
       * Existing project visitor.
       */

      existingVisitor.visits += 1;

      if (
        eventDate &&
        (!existingVisitor.firstVisit ||
          eventDate.getTime() <
            new Date(
              existingVisitor.firstVisit
            ).getTime())
      ) {
        existingVisitor.firstVisit =
          eventDate;
      }

      if (
        eventDate &&
        (!existingVisitor.lastVisit ||
          eventDate.getTime() >
            new Date(
              existingVisitor.lastVisit
            ).getTime())
      ) {
        existingVisitor.lastVisit =
          eventDate;
      }

      /*
       * GPS gets priority.
       */

      if (
        gpsLocation?.country
      ) {
        existingVisitor.country =
          gpsLocation.country;
      } else if (
        (!existingVisitor.country ||
          existingVisitor.country ===
            "Unknown") &&
        event.country
      ) {
        existingVisitor.country =
          event.country;
      }

      if (
        gpsLocation?.region
      ) {
        existingVisitor.region =
          gpsLocation.region;
      } else if (
        !existingVisitor.region &&
        event.region
      ) {
        existingVisitor.region =
          event.region;
      }

      if (
        gpsLocation?.city
      ) {
        existingVisitor.city =
          gpsLocation.city;
      } else if (
        (!existingVisitor.city ||
          existingVisitor.city ===
            "Unknown") &&
        event.city
      ) {
        existingVisitor.city =
          event.city;
      }

      if (
        eventLatitude !== null &&
        eventLongitude !== null
      ) {
        existingVisitor.latitude =
          eventLatitude;

        existingVisitor.longitude =
          eventLongitude;

        existingVisitor.locationAccuracy =
          typeof event.locationAccuracy ===
          "number"
            ? event.locationAccuracy
            : null;
      }

      if (
        event.referrer &&
        !existingVisitor.referrer
      ) {
        existingVisitor.referrer =
          event.referrer;
      }

      if (
        (!existingVisitor.device ||
          existingVisitor.device ===
            "Unknown") &&
        event.device
      ) {
        existingVisitor.device =
          event.device;
      }

      if (
        (!existingVisitor.browser ||
          existingVisitor.browser ===
            "Unknown") &&
        event.browser
      ) {
        existingVisitor.browser =
          event.browser;
      }

      if (
        (!existingVisitor.os ||
          existingVisitor.os ===
            "Unknown") &&
        event.os
      ) {
        existingVisitor.os =
          event.os;
      }
    }

    /*
     * =======================================================
     * FINALIZE PROJECT DETAILS
     * =======================================================
     */

    for (const project of PROJECTS) {
      const detail =
        projectDetailsMap.get(
          project.slug
        );

      const projectVisitors =
        projectVisitorMaps.get(
          project.slug
        );

      if (
        !detail ||
        !projectVisitors
      ) {
        continue;
      }

      detail.uniqueVisitors =
        projectVisitors.size;

      detail.visitors =
        Array.from(
          projectVisitors.values()
        ).sort((a, b) => {
          const aTime =
            a.lastVisit
              ? new Date(
                  a.lastVisit
                ).getTime()
              : 0;

          const bTime =
            b.lastVisit
              ? new Date(
                  b.lastVisit
                ).getTime()
              : 0;

          return bTime - aTime;
        });
    }

    const projectDetails =
      PROJECTS.map(
        (project) =>
          projectDetailsMap.get(
            project.slug
          )!
      );

    /*
     * =======================================================
     * STANDARD OVERVIEW PERIODS
     * =======================================================
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
     * =======================================================
     * OVERVIEW RESET DATE
     * =======================================================
     */

    const overviewResetDate =
      globalReset &&
      visitorDetailsReset
        ? globalReset >
          visitorDetailsReset
          ? globalReset
          : visitorDetailsReset
        : globalReset ||
          visitorDetailsReset;

    const todayFilter =
      overviewResetDate &&
      overviewResetDate >
        startOfToday
        ? {
            $gte:
              overviewResetDate,
            $lte: now,
          }
        : {
            $gte:
              startOfToday,
            $lte: now,
          };

    const sevenDayFilter =
      overviewResetDate &&
      overviewResetDate >
        startOf7Days
        ? {
            $gte:
              overviewResetDate,
            $lte: now,
          }
        : {
            $gte:
              startOf7Days,
            $lte: now,
          };

    const thirtyDayFilter =
      overviewResetDate &&
      overviewResetDate >
        startOf30Days
        ? {
            $gte:
              overviewResetDate,
            $lte: now,
          }
        : {
            $gte:
              startOf30Days,
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
        createdAt:
          todayFilter,
      }),

      events.countDocuments({
        type: "visit",
        ...portfolioVisitFilter,
        createdAt:
          sevenDayFilter,
      }),

      events.countDocuments({
        type: "visit",
        ...portfolioVisitFilter,
        createdAt:
          thirtyDayFilter,
      }),
    ]);

    /*
     * =======================================================
     * RESPONSE
     * =======================================================
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

        global:
          globalReset
            ? globalReset.toISOString()
            : null,
      },

      /*
       * Existing project summary.
       */

      projects:
        projectStats,

      /*
       * NEW:
       * Full project-specific details.
       */

      projectDetails,

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