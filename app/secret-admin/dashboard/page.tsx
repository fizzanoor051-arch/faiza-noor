
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
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
  projectClicks?: string[];
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

interface LocationStat {
  name: string;
  country: string;
  city: string;
  visitors: number;
  percentage: number;
}

const HIDDEN_VISITORS_KEY = "faiza_hidden_analytics_visitors";
const HIDDEN_ACTIVITY_KEY = "faiza_hidden_analytics_activity";
const HIDDEN_ACTIVITY_SECTION_KEY = "faiza_hidden_activity_section";

const statCards = [
  { key: "totalVisits", label: "Total Visits" },
  { key: "uniqueVisitors", label: "Unique Visitors" },
  { key: "todayVisits", label: "Today" },
  { key: "last7DaysVisits", label: "Last 7 Days" },
  { key: "yourClicks", label: "Your Clicks" },
  { key: "totalProjectClicks", label: "Project Clicks" },
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
] as const;

function getLocationStats(visitors: Visitor[]): LocationStat[] {
  const locations = new Map<
    string,
    { country: string; city: string; visitors: number }
  >();

  for (const visitor of visitors) {
    const country = visitor.country?.trim() || "Unknown";
    const city =
      visitor.city?.trim() && visitor.city !== "Unknown"
        ? visitor.city.trim()
        : "";

    const key = `${country}|||${city}`;
    const existing = locations.get(key);

    if (existing) {
      existing.visitors += 1;
    } else {
      locations.set(key, { country, city, visitors: 1 });
    }
  }

  const total = visitors.length;

  return Array.from(locations.values())
    .map((location) => ({
      ...location,
      name: location.city
        ? `${location.city}, ${location.country}`
        : location.country,
      percentage:
        total > 0 ? (location.visitors / total) * 100 : 0,
    }))
    .sort((a, b) => b.visitors - a.visitors);
}

function readStringArray(key: string): string[] {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function saveStringArray(key: string, values: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch (error) {
    console.error(`Could not save ${key}:`, error);
  }
}

function getActivityId(activity: Activity): string {
  // Prefer a stable identifier derived from activity fields.
  return [
    activity.createdAt,
    activity.type,
    activity.visitorId || "",
    activity.path || "",
    activity.projectSlug || "",
    activity.referrer || "",
  ].join("::");
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("all");

  const [hiddenVisitorIds, setHiddenVisitorIds] = useState<string[]>([]);
  const [hiddenActivityIds, setHiddenActivityIds] = useState<string[]>([]);
  const [activitySectionHidden, setActivitySectionHidden] = useState(false);
  const [savedPreferencesLoaded, setSavedPreferencesLoaded] = useState(false);

  useEffect(() => {
    setHiddenVisitorIds(readStringArray(HIDDEN_VISITORS_KEY));
    setHiddenActivityIds(readStringArray(HIDDEN_ACTIVITY_KEY));

    try {
      setActivitySectionHidden(
        localStorage.getItem(HIDDEN_ACTIVITY_SECTION_KEY) === "true"
      );
    } catch (error) {
      console.error("Could not load activity section preference:", error);
    } finally {
      setSavedPreferencesLoaded(true);
    }
  }, []);

  async function loadAnalytics(selectedPeriod = period) {
    try {
      setLoading(true);
      setError("");

      let visitorId = "";

      try {
        visitorId =
          localStorage.getItem("faiza_portfolio_visitor_id") || "";
      } catch {
        visitorId = "";
      }

      const query = new URLSearchParams({ period: selectedPeriod });

      if (visitorId) {
        query.set("visitorId", visitorId);
      }

      const response = await fetch(
        `/api/analyticsa/stats?${query.toString()}`,
        {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          window.location.href = "/secret-admin";
          return;
        }

        throw new Error(result.message || "Failed to load analytics");
      }

      setData(result as AnalyticsData);
    } catch (error) {
      console.error("Analytics dashboard error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAnalytics("all");
    // Initial dashboard load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePeriodChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedPeriod = event.target.value;
    setPeriod(selectedPeriod);
    void loadAnalytics(selectedPeriod);
  }

  function hideVisitor(visitorId: string) {
    const updated = Array.from(
      new Set([...hiddenVisitorIds, visitorId])
    );

    setHiddenVisitorIds(updated);
    saveStringArray(HIDDEN_VISITORS_KEY, updated);
  }

  function restoreHiddenVisitors() {
    setHiddenVisitorIds([]);

    try {
      localStorage.removeItem(HIDDEN_VISITORS_KEY);
    } catch (error) {
      console.error("Could not restore visitor cards:", error);
    }
  }

  function removeActivity(activity: Activity) {
    const activityId = getActivityId(activity);

    const updated = Array.from(
      new Set([...hiddenActivityIds, activityId])
    );

    setHiddenActivityIds(updated);
    saveStringArray(HIDDEN_ACTIVITY_KEY, updated);
  }

  function restoreActivities() {
    setHiddenActivityIds([]);

    try {
      localStorage.removeItem(HIDDEN_ACTIVITY_KEY);
    } catch (error) {
      console.error("Could not restore activity:", error);
    }
  }

  function toggleActivitySection() {
    const nextValue = !activitySectionHidden;

    setActivitySectionHidden(nextValue);

    try {
      localStorage.setItem(
        HIDDEN_ACTIVITY_SECTION_KEY,
        String(nextValue)
      );
    } catch (error) {
      console.error("Could not save activity section preference:", error);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030308] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#E7B84B]" />
          <p className="text-sm text-white/50">Loading analytics...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030308] px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
          <p className="text-sm text-red-300">{error}</p>
          <button
            onClick={() => void loadAnalytics(period)}
            className="mt-5 rounded-xl bg-[#E7B84B] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#F5D98B]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!data) return null;

  const visibleVisitors = savedPreferencesLoaded
    ? data.visitors.filter(
        (visitor) => !hiddenVisitorIds.includes(visitor.visitorId)
      )
    : data.visitors;

  const locationStats = getLocationStats(data.visitors);
  const totalLocationVisitors = data.visitors.length;

  const visibleActivity = data.recentActivity.filter(
    (activity) => !hiddenActivityIds.includes(getActivityId(activity))
  );

  return (
    <main className="min-h-screen bg-[#030308] px-4 py-7 text-white sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
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
            <div className="relative">
              <select
                value={period}
                onChange={handlePeriodChange}
                className="w-full appearance-none rounded-xl border border-[#E7B84B]/20 bg-[#11130f] px-4 py-2.5 pr-10 text-sm text-white/80 outline-none transition hover:border-[#E7B84B]/40 focus:border-[#E7B84B]/60 sm:w-auto"
              >
                {timeFilters.map((filter) => (
                  <option
                    key={filter.value}
                    value={filter.value}
                    className="bg-[#11130f] text-white"
                  >
                    {filter.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#E7B84B]">
                ▼
              </span>
            </div>

            <button
              onClick={() => void loadAnalytics(period)}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 transition hover:border-[#E7B84B]/40 hover:text-white"
            >
              Refresh Data
            </button>
          </div>
        </div>

        <ExcludeMyVisits />
        <ClearAnalytics />

        {/* Selected Period */}
        <div className="mb-5 mt-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#E7B84B]" />
          <p className="text-sm text-white/45">
            Showing data for{" "}
            <span className="text-[#F5D98B]">
              {timeFilters.find((filter) => filter.value === period)?.label}
            </span>
          </p>
        </div>

        {/* Country and Location Analytics */}
        <section className="mb-8">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Geographic Insights
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Country & Location Analytics
            </h2>
            <p className="mt-1 text-sm text-white/40">
              Visitor distribution by recorded country and city.
            </p>
          </div>

          {locationStats.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/40">
              No location data available for this period.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locationStats.map((location) => (
                <div
                  key={`${location.country}-${location.city || "country-only"}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#E7B84B]/35 hover:bg-white/[0.045]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/85">
                        {location.name}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {location.visitors}{" "}
                        {location.visitors === 1 ? "visitor" : "visitors"}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-[#E7B84B]/25 bg-[#E7B84B]/10 px-3 py-1.5 text-sm font-semibold text-[#F5D98B]">
                      {location.percentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-[#E7B84B] transition-all duration-500"
                      style={{
                        width: `${Math.min(location.percentage, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/30">
                    Of {totalLocationVisitors.toLocaleString()} recorded visitor
                    {totalLocationVisitors === 1 ? "" : "s"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => (
            <div
              key={card.key}
              className={`group rounded-2xl border p-5 backdrop-blur-xl transition ${
                card.key === "yourClicks"
                  ? "border-[#E7B84B]/30 bg-[#E7B84B]/[0.05] hover:border-[#E7B84B]/60"
                  : "border-white/10 bg-white/[0.03] hover:border-[#E7B84B]/30 hover:bg-white/[0.045]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-white/45">{card.label}</p>
                {card.key === "yourClicks" && (
                  <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#F5D98B]">
                    Local
                  </span>
                )}
              </div>

              <p
                className={`mt-3 text-3xl font-semibold tracking-tight ${
                  card.key === "yourClicks" ? "text-[#F5D98B]" : ""
                }`}
              >
                {data.overview[card.key].toLocaleString()}
              </p>

              {card.key === "yourClicks" && (
                <p className="mt-2 text-xs text-white/35">
                  Clicks from this browser
                </p>
              )}

              <div className="mt-4 h-px w-full bg-white/5 transition group-hover:bg-[#E7B84B]/20" />
            </div>
          ))}
        </section>

        {/* Visitor Details */}
        <section className="mt-8">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
                Visitor Intelligence
              </p>
              <h2 className="mt-2 text-xl font-semibold">Visitor Details</h2>
              <p className="mt-1 text-sm text-white/40">
                Visitors who visited during the selected period.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <span className="text-xs text-white/40">Visible Cards</span>
                <span className="ml-2 text-sm font-semibold text-[#F5D98B]">
                  {visibleVisitors.length}
                </span>
              </div>

              {hiddenVisitorIds.length > 0 && (
                <button
                  type="button"
                  onClick={restoreHiddenVisitors}
                  className="rounded-xl border border-[#E7B84B]/25 bg-[#E7B84B]/10 px-4 py-2 text-xs font-medium text-[#F5D98B] transition hover:bg-[#E7B84B]/20"
                >
                  Restore Hidden ({hiddenVisitorIds.length})
                </button>
              )}
            </div>
          </div>

          {visibleVisitors.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center">
              <p className="text-sm text-white/50">
                {data.visitors.length === 0
                  ? "No visitors found for this period."
                  : "All visitor cards are hidden."}
              </p>
              {hiddenVisitorIds.length > 0 && (
                <button
                  type="button"
                  onClick={restoreHiddenVisitors}
                  className="mt-4 rounded-xl bg-[#E7B84B] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#F5D98B]"
                >
                  Restore Visitor Cards
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {visibleVisitors.map((visitor, index) => (
                <div
                  key={visitor.visitorId}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-[#E7B84B]/30 hover:bg-white/[0.045]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#E7B84B]">
                        Visitor #{index + 1}
                      </p>
                      <p className="mt-2 max-w-[220px] truncate text-xs text-white/25">
                        {visitor.visitorId}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                        Active
                      </span>
                      <button
                        type="button"
                        onClick={() => hideVisitor(visitor.visitorId)}
                        aria-label={`Remove visitor ${visitor.visitorId} from dashboard`}
                        title="Remove visitor card"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-xs font-medium text-red-300 transition hover:border-red-400/50 hover:bg-red-400/15 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-3.5 w-3.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="m19 6-1 14H6L5 6" />
                          <path d="M10 10v6M14 10v6" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Location
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/80">
                      {visitor.country || "Unknown"}
                      {visitor.city && visitor.city !== "Unknown"
                        ? ` · ${visitor.city}`
                        : ""}
                    </p>
                    {visitor.region && (
                      <p className="mt-1 text-xs text-white/35">
                        {visitor.region}
                      </p>
                    )}
                    {typeof visitor.latitude === "number" &&
                      typeof visitor.longitude === "number" && (
                        <p className="mt-2 text-[11px] text-white/25">
                          Coordinates: {visitor.latitude.toFixed(5)},{" "}
                          {visitor.longitude.toFixed(5)}
                          {typeof visitor.locationAccuracy === "number"
                            ? ` · ±${Math.round(visitor.locationAccuracy)}m`
                            : ""}
                        </p>
                      )}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { label: "Device", value: visitor.device },
                      { label: "Browser", value: visitor.browser },
                      { label: "OS", value: visitor.os },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          {item.label}
                        </p>
                        <p className="mt-2 break-words text-sm text-white/75">
                          {item.value || "Unknown"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-[10px] uppercase tracking-wider text-white/30">
                        First Visit
                      </p>
                      <p className="mt-2 text-xs text-white/70">
                        {visitor.firstVisit
                          ? new Date(visitor.firstVisit).toLocaleString()
                          : "Unknown"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-[10px] uppercase tracking-wider text-white/30">
                        Last Visit
                      </p>
                      <p className="mt-2 text-xs text-white/70">
                        {visitor.lastVisit
                          ? new Date(visitor.lastVisit).toLocaleString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Pages Visited
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {visitor.pages && visitor.pages.length > 0 ? (
                        visitor.pages.map((page) => (
                          <span
                            key={page}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
                          >
                            {page}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-white/30">
                          No page data
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Referrer
                    </p>
                    <p className="mt-2 truncate text-sm text-white/60">
                      {visitor.referrer || "Direct visit"}
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      Project Clicks
                    </p>
                    <div className="mt-2">
                      {visitor.projectClicks &&
                      visitor.projectClicks.length > 0 ? (
                        <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-3 py-1 text-xs text-[#F5D98B]">
                          {visitor.projectClicks.length} project{" "}
                          {visitor.projectClicks.length === 1 ? "click" : "clicks"}
                        </span>
                      ) : (
                        <p className="text-xs text-white/30">
                          No project clicks
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Projects */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Project Performance
            </p>
            <h2 className="mt-2 text-xl font-semibold">Project Clicks</h2>
          </div>

          {data.projects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center text-sm text-white/40">
              No project clicks recorded for this period.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {data.projects.map((project) => (
                <div
                  key={project.projectSlug}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#E7B84B]/40 hover:bg-white/[0.045]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{project.projectName}</h3>
                      <p className="mt-1 text-xs text-white/35">
                        {project.projectSlug}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-3 py-1 text-xs text-[#F5D98B]">
                      {project.clicks} clicks
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex gap-8">
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

                    <Link
                      href={`/secret-admin/dashboard/projects/${project.projectSlug}`}
                      className="shrink-0 rounded-xl border border-[#E7B84B]/30 bg-[#E7B84B]/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5D98B] transition hover:border-[#E7B84B]/70 hover:bg-[#E7B84B]/20 hover:text-white"
                    >
                      View Page
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Activity */}
        <section className="mt-8">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
                Activity
              </p>
              <h2 className="mt-2 text-xl font-semibold">Recent Activity</h2>
              <p className="mt-1 text-sm text-white/40">
                {visibleActivity.length} visible activities
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {hiddenActivityIds.length > 0 && (
                <button
                  type="button"
                  onClick={restoreActivities}
                  className="rounded-lg border border-[#E7B84B]/25 px-3 py-2 text-xs text-[#F5D98B] transition hover:bg-[#E7B84B]/10"
                >
                  Restore Removed
                </button>
              )}

              <button
                type="button"
                onClick={toggleActivitySection}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/65 transition hover:border-[#E7B84B]/30 hover:text-white"
              >
                {activitySectionHidden ? "Show Activity" : "Hide Activity"}
              </button>
            </div>
          </div>

          {!activitySectionHidden && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              {visibleActivity.length === 0 ? (
                <div className="p-7 text-center text-sm text-white/40">
                  No visible activity for this period.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {visibleActivity.map((activity) => {
                    const activityId = getActivityId(activity);

                    return (
                      <div
                        key={activityId}
                        className="flex flex-col gap-3 p-4 transition hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${
                                activity.type === "project_click"
                                  ? "bg-[#E7B84B]"
                                  : "bg-emerald-400"
                              }`}
                            />
                            <p className="text-sm font-medium">
                              {activity.type === "project_click"
                                ? `Project clicked: ${
                                    activity.projectName || "Unknown"
                                  }`
                                : "Portfolio visited"}
                            </p>
                          </div>

                          <p className="mt-2 break-words pl-5 text-xs text-white/35">
                            {activity.path ||
                              activity.projectSlug ||
                              "Portfolio"}
                          </p>

                          {activity.referrer && (
                            <p className="mt-1 max-w-[600px] truncate pl-5 text-xs text-white/25">
                              From: {activity.referrer}
                            </p>
                          )}

                          <p className="mt-1 pl-5 text-xs text-white/35">
                            {new Date(activity.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeActivity(activity)}
                          aria-label="Remove activity from dashboard"
                          title="Remove activity from dashboard"
                          className="self-start rounded-lg border border-red-400/20 bg-red-400/[0.05] px-3 py-2 text-xs text-red-300 transition hover:border-red-400/50 hover:bg-red-400/10 sm:self-center"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Referrers */}
        <section className="mt-8 pb-8">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Traffic Sources
            </p>
            <h2 className="mt-2 text-xl font-semibold">Referrers</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
            {data.referrers.length === 0 ? (
              <div className="p-7 text-center text-sm text-white/40">
                No referrer data available for this period.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {data.referrers.map((referrer, index) => (
                  <div
                    key={`${referrer.referrer}-${index}`}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <p className="truncate text-sm text-white/70">
                      {referrer.referrer}
                    </p>
                    <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                      {referrer.visits} visits
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
