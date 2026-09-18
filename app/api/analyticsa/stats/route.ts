import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

const DB_NAME =
  process.env.MONGODB_DB || "portfolio_analytics";

const PROJECTS = {
  "nexaflow-ai": {
    name: "NexaFlow AI",
    url: "https://nexaflow-ai-by-faiza.vercel.app/",
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
        now.getTime() - 3 * 24 * 60 * 60 * 1000
      );

    case "7d":
      return new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      );

    case "15d":
      return new Date(
        now.getTime() - 15 * 24 * 60 * 60 * 1000
      );

    case "20d":
      return new Date(
        now.getTime() - 20 * 24 * 60 * 60 * 1000
      );

    case "1m":
      return new Date(
        now.getTime() - 30 * 24 * 60 * 60 * 1000
      );

    case "2m":
      return new Date(
        now.getTime() - 60 * 24 * 60 * 60 * 1000
      );

    case "3m":
      return new Date(
        now.getTime() - 90 * 24 * 60 * 60 * 1000
      );

    case "4m":
      return new Date(
        now.getTime() - 120 * 24 * 60 * 60 * 1000
      );

    case "5m":
      return new Date(
        now.getTime() - 150 * 24 * 60 * 60 * 1000
      );

    case "6m":
      return new Date(
        now.getTime() - 180 * 24 * 60 * 60 * 1000
      );

    case "9m":
      return new Date(
        now.getTime() - 270 * 24 * 60 * 60 * 1000
      );

    case "12m":
      return new Date(
        now.getTime() - 365 * 24 * 60 * 60 * 1000
      );

    case "1y":
      return new Date(
        now.getTime() - 365 * 24 * 60 * 60 * 1000
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

function cleanString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getProjectName(projectSlug?: string) {
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

function getProjectUrl(projectSlug?: string) {
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

function incrementMap(
  map: Map<string, number>,
  value: string
) {
  const key = value.trim();

  if (!key) {
    return;
  }

  map.set(
    key,
    (map.get(key) || 0) + 1
  );
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

    /*
     * ---------------------------------------------------------
     * ANALYTICS RESET
     * ---------------------------------------------------------
     */

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

    /*
     * ---------------------------------------------------------
     * LOAD EVENTS
     * ---------------------------------------------------------
     */

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

    /*
     * ---------------------------------------------------------
     * LOAD STORED VISITOR INFORMATION
     *
     * This is important for project analytics.
     *
     * Sometimes the project_click event may not contain all
     * metadata, while analytics_visitors already contains it.
     *
     * ---------------------------------------------------------
     */

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
            cleanString(
              visitor.country
            ),

          region:
            cleanString(
              visitor.region
            ),

          city:
            cleanString(
              visitor.city
            ),

          device:
            cleanString(
              visitor.device
            ),

          browser:
            cleanString(
              visitor.browser
            ),

          os:
            cleanString(
              visitor.os
            ),

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
            cleanString(
              visitor.firstReferrer ||
                visitor.referrer
            ),

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
     * ---------------------------------------------------------
     * EXISTING PORTFOLIO VISITOR INTELLIGENCE
     *
     * Preserved.
     * ---------------------------------------------------------
     */

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

    /*
     * Merge current event information into visitor records.
     *
     * Existing portfolio analytics remains based on this map.
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
          cleanString(
            event.country
          );
      }

      if (
        !existing.region &&
        event.region
      ) {
        existing.region =
          cleanString(
            event.region
          );
      }

      if (
        !existing.city &&
        event.city
      ) {
        existing.city =
          cleanString(
            event.city
          );
      }

      if (
        !existing.device &&
        event.device
      ) {
        existing.device =
          cleanString(
            event.device
          );
      }

      if (
        !existing.browser &&
        event.browser
      ) {
        existing.browser =
          cleanString(
            event.browser
          );
      }

      if (
        !existing.os &&
        event.os
      ) {
        existing.os =
          cleanString(
            event.os
          );
      }

      if (
        !existing.referrer &&
        event.referrer
      ) {
        existing.referrer =
          cleanString(
            event.referrer
          );
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
     * Only visitors active in the selected period.
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
     * ---------------------------------------------------------
     * PROJECT STATISTICS
     * ---------------------------------------------------------
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
          ? event.projectSlug.trim()
          : "unknown";

      if (
        !projectMap.has(slug)
      ) {
        projectMap.set(
          slug,
          {
            projectSlug:
              slug,

            projectName:
              cleanString(
                event.projectName
              ) ||
              getProjectName(
                slug
              ),

            clicks: 0,

            uniqueVisitors:
              new Set<string>(),
          }
        );
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
     * Ensure all known projects appear,
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
        projectMap.set(
          slug,
          {
            projectSlug:
              slug,

            projectName:
              projectInfo.name,

            clicks: 0,

            uniqueVisitors:
              new Set<string>(),
          }
        );
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
     * ---------------------------------------------------------
     * DETAILED PROJECT ANALYTICS
     *
     * IMPORTANT FIX:
     *
     * We no longer build details ONLY from PROJECTS.
     *
     * We also include any real project slug found in
     * project_click events.
     *
     * This allows legacy projects such as:
     * hospital-live
     * shopsphere-live
     *
     * to have their actual event data displayed.
     * ---------------------------------------------------------
     */

    const projectSlugs =
      new Set<string>(
        Object.keys(PROJECTS)
      );

    for (const event of projectEvents) {
      const slug =
        cleanString(
          event.projectSlug
        );

      if (slug) {
        projectSlugs.add(
          slug
        );
      }
    }

    const projectDetails =
      Array.from(
        projectSlugs
      ).map(
        (projectSlug) => {
          const projectInfo =
            PROJECTS[
              projectSlug as keyof typeof PROJECTS
            ];

          const projectEventsForSlug =
            projectEvents.filter(
              (event) =>
                cleanString(
                  event.projectSlug
                ) ===
                projectSlug
            );

          /*
           * Project visitor IDs.
           */

          const projectVisitorIds =
            new Set<string>();

          for (const event of projectEventsForSlug) {
            if (
              typeof event.visitorId ===
              "string"
            ) {
              projectVisitorIds.add(
                event.visitorId
              );
            }
          }

          /*
           * Distribution maps.
           */

          const countryMap =
            new Map<
              string,
              number
            >();

          const cityMap =
            new Map<
              string,
              number
            >();

          const projectReferrerMap =
            new Map<
              string,
              number
            >();

          const deviceMap =
            new Map<
              string,
              number
            >();

          const browserMap =
            new Map<
              string,
              number
            >();

          const osMap =
            new Map<
              string,
              number
            >();

          /*
           * ---------------------------------------------------
           * Build distributions.
           *
           * Event data gets priority.
           * Stored visitor data is used when event data is
           * missing.
           * ---------------------------------------------------
           */

          for (const event of projectEventsForSlug) {
            const storedVisitor =
              typeof event.visitorId ===
              "string"
                ? visitorMap.get(
                    event.visitorId
                  )
                : undefined;

            const country =
              cleanString(
                event.country
              ) ||
              cleanString(
                storedVisitor?.country
              );

            const city =
              cleanString(
                event.city
              ) ||
              cleanString(
                storedVisitor?.city
              );

            const referrer =
              cleanString(
                event.referrer
              ) ||
              cleanString(
                storedVisitor?.referrer
              );

            const device =
              cleanString(
                event.device
              ) ||
              cleanString(
                storedVisitor?.device
              );

            const browser =
              cleanString(
                event.browser
              ) ||
              cleanString(
                storedVisitor?.browser
              );

            const os =
              cleanString(
                event.os
              ) ||
              cleanString(
                storedVisitor?.os
              );

            incrementMap(
              countryMap,
              country
            );

            incrementMap(
              cityMap,
              city
            );

            incrementMap(
              projectReferrerMap,
              referrer
            );

            incrementMap(
              deviceMap,
              device
            );

            incrementMap(
              browserMap,
              browser
            );

            incrementMap(
              osMap,
              os
            );
          }

          /*
           * ---------------------------------------------------
           * Individual project visitors
           * ---------------------------------------------------
           */

          const projectVisitors =
            Array.from(
              projectVisitorIds
            ).map(
              (visitorId) => {
                const visitorEvents =
                  projectEventsForSlug.filter(
                    (event) =>
                      event.visitorId ===
                      visitorId
                  );

                const sortedEvents =
                  [
                    ...visitorEvents,
                  ].sort(
                    (a, b) =>
                      safeDate(
                        a.createdAt
                      ).getTime() -
                      safeDate(
                        b.createdAt
                      ).getTime()
                  );

                const firstEvent =
                  sortedEvents[0];

                const lastEvent =
                  sortedEvents[
                    sortedEvents.length -
                      1
                  ];

                const storedVisitor =
                  visitorMap.get(
                    visitorId
                  );

                /*
                 * Find latest event that actually contains
                 * useful metadata.
                 */

                const eventWithLocation =
                  [
                    ...sortedEvents,
                  ]
                    .reverse()
                    .find(
                      (event) =>
                        cleanString(
                          event.country
                        ) ||
                        cleanString(
                          event.city
                        ) ||
                        typeof event.latitude ===
                          "number" ||
                        typeof event.longitude ===
                          "number"
                    );

                const eventWithTechnology =
                  [
                    ...sortedEvents,
                  ]
                    .reverse()
                    .find(
                      (event) =>
                        cleanString(
                          event.device
                        ) ||
                        cleanString(
                          event.browser
                        ) ||
                        cleanString(
                          event.os
                        )
                    );

                const eventWithReferrer =
                  [
                    ...sortedEvents,
                  ]
                    .reverse()
                    .find(
                      (event) =>
                        cleanString(
                          event.referrer
                        )
                    );

                const country =
                  cleanString(
                    eventWithLocation?.country
                  ) ||
                  cleanString(
                    storedVisitor?.country
                  );

                const region =
                  cleanString(
                    eventWithLocation?.region
                  ) ||
                  cleanString(
                    storedVisitor?.region
                  );

                const city =
                  cleanString(
                    eventWithLocation?.city
                  ) ||
                  cleanString(
                    storedVisitor?.city
                  );

                const latitude =
                  typeof eventWithLocation?.latitude ===
                  "number"
                    ? eventWithLocation.latitude
                    : typeof storedVisitor?.latitude ===
                        "number"
                      ? storedVisitor.latitude
                      : null;

                const longitude =
                  typeof eventWithLocation?.longitude ===
                  "number"
                    ? eventWithLocation.longitude
                    : typeof storedVisitor?.longitude ===
                        "number"
                      ? storedVisitor.longitude
                      : null;

                const locationAccuracy =
                  typeof eventWithLocation?.locationAccuracy ===
                  "number"
                    ? eventWithLocation.locationAccuracy
                    : typeof storedVisitor?.locationAccuracy ===
                        "number"
                      ? storedVisitor.locationAccuracy
                      : null;

                const device =
                  cleanString(
                    eventWithTechnology?.device
                  ) ||
                  cleanString(
                    storedVisitor?.device
                  );

                const browser =
                  cleanString(
                    eventWithTechnology?.browser
                  ) ||
                  cleanString(
                    storedVisitor?.browser
                  );

                const os =
                  cleanString(
                    eventWithTechnology?.os
                  ) ||
                  cleanString(
                    storedVisitor?.os
                  );

                const referrer =
                  cleanString(
                    eventWithReferrer?.referrer
                  ) ||
                  cleanString(
                    storedVisitor?.referrer
                  );

                return {
                  visitorId,

                  country,

                  region,

                  city,

                  latitude,

                  longitude,

                  locationAccuracy,

                  referrer,

                  device,

                  browser,

                  os,

                  firstVisit:
                    firstEvent
                      ? safeDate(
                          firstEvent.createdAt
                        ).toISOString()
                      : storedVisitor?.firstVisit ||
                        "",

                  lastVisit:
                    lastEvent
                      ? safeDate(
                          lastEvent.createdAt
                        ).toISOString()
                      : storedVisitor?.lastVisit ||
                        "",

                  visits:
                    visitorEvents.length,
                };
              }
            );

          /*
           * ---------------------------------------------------
           * Last project visit
           * ---------------------------------------------------
           */

          const lastVisitEvent =
            [
              ...projectEventsForSlug,
            ].sort(
              (a, b) =>
                safeDate(
                  b.createdAt
                ).getTime() -
                safeDate(
                  a.createdAt
                ).getTime()
            )[0];

          /*
           * ---------------------------------------------------
           * Project name/url
           *
           * Known projects use configured values.
           * Legacy projects use actual event projectName.
           * ---------------------------------------------------
           */

          const firstNamedEvent =
            projectEventsForSlug.find(
              (event) =>
                cleanString(
                  event.projectName
                )
            );

          const projectName =
            projectInfo?.name ||
            cleanString(
              firstNamedEvent?.projectName
            ) ||
            getProjectName(
              projectSlug
            );

          const projectUrl =
            projectInfo?.url ||
            getProjectUrl(
              projectSlug
            );

          return {
            projectSlug,

            projectName,

            projectUrl,

            totalVisits:
              projectEventsForSlug.length,

            uniqueVisitors:
              projectVisitorIds.size,

            lastVisit:
              lastVisitEvent
                ? safeDate(
                    lastVisitEvent.createdAt
                  ).toISOString()
                : null,

            countries:
              Array.from(
                countryMap.entries()
              )
                .map(
                  ([
                    name,
                    visits,
                  ]) => ({
                    name,
                    visits,
                  })
                )
                .sort(
                  (a, b) =>
                    b.visits -
                    a.visits
                ),

            cities:
              Array.from(
                cityMap.entries()
              )
                .map(
                  ([
                    name,
                    visits,
                  ]) => ({
                    name,
                    visits,
                  })
                )
                .sort(
                  (a, b) =>
                    b.visits -
                    a.visits
                ),

            referrers:
              Array.from(
                projectReferrerMap.entries()
              )
                .map(
                  ([
                    referrer,
                    visits,
                  ]) => ({
                    referrer,
                    visits,
                  })
                )
                .sort(
                  (a, b) =>
                    b.visits -
                    a.visits
                ),

            devices:
              Array.from(
                deviceMap.entries()
              )
                .map(
                  ([
                    device,
                    visits,
                  ]) => ({
                    device,
                    visits,
                  })
                )
                .sort(
                  (a, b) =>
                    b.visits -
                    a.visits
                ),

            browsers:
              Array.from(
                browserMap.entries()
              )
                .map(
                  ([
                    browser,
                    visits,
                  ]) => ({
                    browser,
                    visits,
                  })
                )
                .sort(
                  (a, b) =>
                    b.visits -
                    a.visits
                ),

            operatingSystems:
              Array.from(
                osMap.entries()
              )
                .map(
                  ([
                    os,
                    visits,
                  ]) => ({
                    os,
                    visits,
                  })
                )
                .sort(
                  (a, b) =>
                    b.visits -
                    a.visits
                ),

            visitors:
              projectVisitors,
          };
        }
      );

    /*
     * ---------------------------------------------------------
     * PORTFOLIO REFERRER STATISTICS
     * ---------------------------------------------------------
     */

    const referrerMap =
      new Map<
        string,
        number
      >();

    for (const event of visitEvents) {
      const referrer =
        cleanString(
          event.referrer
        );

      const key =
        referrer ||
        "Direct";

      referrerMap.set(
        key,
        (referrerMap.get(
          key
        ) || 0) + 1
      );
    }

    for (const event of projectEvents) {
      const referrer =
        cleanString(
          event.referrer
        );

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
          ([
            referrer,
            visits,
          ]) => ({
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
     * ---------------------------------------------------------
     * YOUR CLICKS
     * ---------------------------------------------------------
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
     * ---------------------------------------------------------
     * RECENT ACTIVITY
     * ---------------------------------------------------------
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
            cleanString(
              event.projectName
            ) ||
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
     * ---------------------------------------------------------
     * OVERVIEW
     * ---------------------------------------------------------
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

    /*
     * ---------------------------------------------------------
     * RESPONSE
     * ---------------------------------------------------------
     */

    const response = {
      success: true,

      /*
       * Detailed project analytics.
       */
      projectDetails,

      /*
       * Existing portfolio overview.
       */
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