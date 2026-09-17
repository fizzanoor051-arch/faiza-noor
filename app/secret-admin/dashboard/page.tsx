
"use client";

import { useEffect, useState } from "react";
import ExcludeMyVisits from "@/components/analytics/ExcludeMyVisits";
import ClearAnalytics from "@/components/analytics/ClearAnalytics";

interface Overview {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  last7DaysVisits: number;
  last30DaysVisits: number;
  totalProjectClicks: number;
  yourClicks: number;
}

interface ProjectStat {
  projectSlug: string;
  projectName: string;
  clicks: number;
  uniqueVisitors: number;
}

interface Activity {
  type: string;
  visitorId?: string;
  path?: string;
  projectSlug?: string;
  projectName?: string;
  projectUrl?: string;
  referrer?: string;
  createdAt: string;
}

interface ReferrerStat {
  referrer: string;
  visits: number;
}

interface Visitor {
  visitorId: string;
  country?: string;
  region?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  firstVisit: string;
  lastVisit: string;
  pages?: string[];
  referrer?: string;
  projectClicks?: number;
  latitude?: number | null;
  longitude?: number | null;
  locationAccuracy?: number | null;
}

interface AnalyticsData {
  success: boolean;
  overview: Overview;
  projects: ProjectStat[];
  recentActivity: Activity[];
  referrers: ReferrerStat[];
  visitors: Visitor[];
  generatedAt: string;
  period?: string;
}

const statCards = [
  {
    key: "totalVisits",
    label: "Total Visits",
  },
  {
    key: "uniqueVisitors",
    label: "Unique Visitors",
  },
  {
    key: "todayVisits",
    label: "Today",
  },
  {
    key: "last7DaysVisits",
    label: "Last 7 Days",
  },
  {
    key: "yourClicks",
    label: "Your Clicks",
  },
  {
    key: "totalProjectClicks",
    label: "Project Clicks",
  },
] as const;

const timeFilters = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "3d", label: "Last 3 Days" },
  { value: "7d", label: "Last 7 Days" },
  { value: "15d", label: "Last 15 Days" },
  { value: "20d", label: "Last 20 Days" },
  { value: "1m", label: "Last 1 Month" },
  { value: "2m", label: "Last 2 Months" },
  { value: "3m", label: "Last 3 Months" },
  { value: "4m", label: "Last 4 Months" },
  { value: "5m", label: "Last 5 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "7m", label: "Last 7 Months" },
  { value: "8m", label: "Last 8 Months" },
  { value: "9m", label: "Last 9 Months" },
  { value: "10m", label: "Last 10 Months" },
  { value: "11m", label: "Last 11 Months" },
  { value: "12m", label: "Last 12 Months" },
  { value: "1y", label: "Last 1 Year" },
];

export default function AnalyticsDashboard() {
  const [data, setData] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [period, setPeriod] =
    useState("all");

  async function loadAnalytics(
    selectedPeriod = period
  ) {
    try {
      setLoading(true);
      setError("");

      let visitorId = "";

      try {
        visitorId =
          localStorage.getItem(
            "faiza_portfolio_visitor_id"
          ) || "";
      } catch {
        visitorId = "";
      }

      const query =
        new URLSearchParams({
          period: selectedPeriod,
        });

      if (visitorId) {
        query.set(
          "visitorId",
          visitorId
        );
      }

      const response =
        await fetch(
          `/api/analyticsa/stats?${query.toString()}`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        if (response.status === 401) {
          window.location.href =
            "/secret-admin";
          return;
        }

        throw new Error(
          result.message ||
            "Failed to load analytics"
        );
      }

      setData(result);
    } catch (error) {
      console.error(
        "Analytics dashboard error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAnalytics("all");
  }, []);

  function handlePeriodChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const selectedPeriod =
      event.target.value;

    setPeriod(selectedPeriod);
    void loadAnalytics(
      selectedPeriod
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#030308] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#E7B84B]" />

          <p className="text-sm text-white/50">
            Loading analytics...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#030308] text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
          <p className="text-sm text-red-300">
            {error}
          </p>

          <button
            onClick={() =>
              void loadAnalytics(period)
            }
            className="mt-5 rounded-xl bg-[#E7B84B] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#F5D98B]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#030308] px-6 py-10 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#E7B84B]">
              Private Analytics
            </p>

            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
              Portfolio Control Center
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Private visitor and project activity overview.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Time Filter */}
            <div className="relative">
              <select
                value={period}
                onChange={
                  handlePeriodChange
                }
                className="w-full appearance-none rounded-xl border border-[#E7B84B]/20 bg-[#11130f] px-4 py-2.5 pr-10 text-sm text-white/80 outline-none transition hover:border-[#E7B84B]/40 focus:border-[#E7B84B]/60 sm:w-auto"
              >
                {timeFilters.map(
                  (filter) => (
                    <option
                      key={
                        filter.value
                      }
                      value={
                        filter.value
                      }
                      className="bg-[#11130f] text-white"
                    >
                      {filter.label}
                    </option>
                  )
                )}
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#E7B84B]">
                ▼
              </span>
            </div>

            <button
              onClick={() =>
                void loadAnalytics(
                  period
                )
              }
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 transition hover:border-[#E7B84B]/40 hover:text-white"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Private Analytics Exclusion */}
        <ExcludeMyVisits />

        {/* Analytics Reset */}
        <ClearAnalytics />

        {/* Selected Period */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#E7B84B]" />

          <p className="text-sm text-white/45">
            Showing data for{" "}
            <span className="text-[#F5D98B]">
              {
                timeFilters.find(
                  (filter) =>
                    filter.value ===
                    period
                )?.label
              }
            </span>
          </p>
        </div>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map(
            (card) => (
              <div
                key={card.key}
                className={`group rounded-2xl border p-6 backdrop-blur-xl transition ${
                  card.key ===
                  "yourClicks"
                    ? "border-[#E7B84B]/30 bg-[#E7B84B]/[0.05] hover:border-[#E7B84B]/60"
                    : "border-white/10 bg-white/[0.03] hover:border-[#E7B84B]/30 hover:bg-white/[0.045]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white/45">
                    {card.label}
                  </p>

                  {card.key ===
                    "yourClicks" && (
                    <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#F5D98B]">
                      Local
                    </span>
                  )}
                </div>

                <p
                  className={`mt-3 text-3xl font-semibold tracking-tight ${
                    card.key ===
                    "yourClicks"
                      ? "text-[#F5D98B]"
                      : ""
                  }`}
                >
                  {data.overview[
                    card.key
                  ].toLocaleString()}
                </p>

                {card.key ===
                  "yourClicks" && (
                  <p className="mt-2 text-xs text-white/35">
                    Clicks from this browser
                  </p>
                )}

                <div className="mt-5 h-px w-full bg-white/5 transition group-hover:bg-[#E7B84B]/20" />
              </div>
            )
          )}
        </section>

        {/* Visitor Details */}
        <section className="mt-10">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
                Visitor Intelligence
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Visitor Details
              </h2>

              <p className="mt-2 text-sm text-white/40">
                Visitors who visited during the selected period.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-xs text-white/40">
                Visitors
              </span>

              <span className="ml-2 text-sm font-semibold text-[#F5D98B]">
                {data.visitors.length}
              </span>
            </div>
          </div>

          {data.visitors.length ===
          0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/40">
              No visitors found for this period.
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {data.visitors.map(
                (
                  visitor,
                  index
                ) => (
                  <div
                    key={
                      visitor.visitorId
                    }
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-[#E7B84B]/30 hover:bg-white/[0.045]"
                  >
                    {/* Visitor Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#E7B84B]">
                          Visitor #
                          {index + 1}
                        </p>

                        <p className="mt-2 max-w-[220px] truncate text-xs text-white/25">
                          {
                            visitor.visitorId
                          }
                        </p>
                      </div>

                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                        Active
                      </span>
                    </div>

                    {/* Location */}
                    <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        Location
                      </p>

                      <p className="mt-2 text-sm font-medium text-white/80">
                        {visitor.country ||
                          "Unknown"}

                        {visitor.city &&
                        visitor.city !==
                          "Unknown"
                          ? ` · ${visitor.city}`
                          : ""}
                      </p>

                      {visitor.region && (
                        <p className="mt-1 text-xs text-white/35">
                          {
                            visitor.region
                          }
                        </p>
                      )}

                      {typeof visitor.latitude ===
                        "number" &&
                        typeof visitor.longitude ===
                          "number" && (
                          <p className="mt-2 text-[11px] text-white/25">
                            GPS:{" "}
                            {visitor.latitude.toFixed(
                              5
                            )}
                            ,{" "}
                            {visitor.longitude.toFixed(
                              5
                            )}
                            {typeof visitor.locationAccuracy ===
                              "number"
                              ? ` · ±${Math.round(
                                  visitor.locationAccuracy
                                )}m`
                              : ""}
                          </p>
                        )}
                    </div>

                    {/* Device Information */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          Device
                        </p>

                        <p className="mt-2 text-sm text-white/75">
                          {visitor.device ||
                            "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          Browser
                        </p>

                        <p className="mt-2 text-sm text-white/75">
                          {visitor.browser ||
                            "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          OS
                        </p>

                        <p className="mt-2 text-sm text-white/75">
                          {visitor.os ||
                            "Unknown"}
                        </p>
                      </div>
                    </div>

                    {/* Visit Times */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          First Visit
                        </p>

                        <p className="mt-2 text-xs text-white/70">
                          {visitor.firstVisit
                            ? new Date(
                                visitor.firstVisit
                              ).toLocaleString()
                            : "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          Last Visit
                        </p>

                        <p className="mt-2 text-xs text-white/70">
                          {visitor.lastVisit
                            ? new Date(
                                visitor.lastVisit
                              ).toLocaleString()
                            : "Unknown"}
                        </p>
                      </div>
                    </div>

                    {/* Pages */}
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        Pages Visited
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {visitor.pages &&
                        visitor.pages.length >
                          0 ? (
                          visitor.pages.map(
                            (page) => (
                              <span
                                key={
                                  page
                                }
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
                              >
                                {page}
                              </span>
                            )
                          )
                        ) : (
                          <span className="text-xs text-white/30">
                            No page data
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Referrer */}
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        Referrer
                      </p>

                      <p className="mt-2 truncate text-sm text-white/60">
                        {visitor.referrer ||
                          "Direct visit"}
                      </p>
                    </div>

                    {/* Project Clicks */}
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        Project Clicks
                      </p>

                      <div className="mt-2">
                        {visitor.projectClicks &&
                        visitor.projectClicks >
                          0 ? (
                          <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-3 py-1 text-xs text-[#F5D98B]">
                            {
                              visitor.projectClicks
                            }{" "}
                            project{" "}
                            {visitor.projectClicks ===
                            1
                              ? "click"
                              : "clicks"}
                          </span>
                        ) : (
                          <p className="text-xs text-white/30">
                            No project clicks
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* Projects */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Project Performance
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Project Clicks
            </h2>
          </div>

          {data.projects.length ===
          0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/40">
              No project clicks recorded for this period.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {data.projects.map(
                (project) => (
                  <div
                    key={
                      project.projectSlug
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#E7B84B]/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">
                          {
                            project.projectName
                          }
                        </h3>

                        <p className="mt-1 text-xs text-white/35">
                          {
                            project.projectSlug
                          }
                        </p>
                      </div>

                      <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-3 py-1 text-xs text-[#F5D98B]">
                        {
                          project.clicks
                        }{" "}
                        clicks
                      </span>
                    </div>

                    <div className="mt-6 flex gap-8">
                      <div>
                        <p className="text-2xl font-semibold">
                          {project.clicks.toLocaleString()}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Total Clicks
                        </p>
                      </div>

                      <div>
                        <p className="text-2xl font-semibold">
                          {project.uniqueVisitors.toLocaleString()}
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Unique Visitors
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* Recent Activity */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Activity
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Recent Activity
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {data.recentActivity
              .length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">
                No activity recorded for this period.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {data.recentActivity.map(
                  (
                    activity,
                    index
                  ) => (
                    <div
                      key={`${activity.createdAt}-${index}`}
                      className="flex flex-col gap-3 p-5 transition hover:bg-white/[0.025] md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              activity.type ===
                              "project_click"
                                ? "bg-[#E7B84B]"
                                : "bg-emerald-400"
                            }`}
                          />

                          <p className="text-sm font-medium">
                            {activity.type ===
                            "project_click"
                              ? `Project clicked: ${
                                  activity.projectName ||
                                  "Unknown"
                                }`
                              : "Portfolio visited"}
                          </p>
                        </div>

                        <p className="mt-2 pl-5 text-xs text-white/35">
                          {activity.path ||
                            activity.projectSlug ||
                            "Portfolio"}
                        </p>

                        {activity.referrer && (
                          <p className="mt-1 pl-5 truncate max-w-[600px] text-xs text-white/20">
                            From:{" "}
                            {
                              activity.referrer
                            }
                          </p>
                        )}
                      </div>

                      <p className="text-xs text-white/35">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* Referrers */}
        <section className="mt-10 pb-10">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Traffic Sources
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Referrers
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
            {data.referrers.length ===
            0 ? (
              <div className="p-8 text-center text-sm text-white/40">
                No referrer data available for this period.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {data.referrers.map(
                  (
                    referrer,
                    index
                  ) => (
                    <div
                      key={`${referrer.referrer}-${index}`}
                      className="flex items-center justify-between gap-4 p-5"
                    >
                      <p className="truncate text-sm text-white/70">
                        {
                          referrer.referrer
                        }
                      </p>

                      <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                        {
                          referrer.visits
                        }{" "}
                        visits
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
