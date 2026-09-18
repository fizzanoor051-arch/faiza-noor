
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProjectVisitor {
  visitorId: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number | null;
  longitude?: number | null;
  locationAccuracy?: number | null;
  referrer?: string;
  device?: string;
  browser?: string;
  os?: string;
  firstVisit?: string;
  lastVisit?: string;
  visits?: number;
}

interface ProjectDetail {
  projectSlug: string;
  projectName: string;
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit?: string | null;
  countries: Array<{
    name: string;
    visits: number;
  }>;
  cities: Array<{
    name: string;
    visits: number;
  }>;
  referrers: Array<{
    referrer: string;
    visits: number;
  }>;
  devices: Array<{
    device: string;
    visits: number;
  }>;
  browsers: Array<{
    browser: string;
    visits: number;
  }>;
  operatingSystems: Array<{
    os: string;
    visits: number;
  }>;
  visitors: ProjectVisitor[];
}

interface ProjectStat {
  projectSlug: string;
  projectName: string;
  clicks: number;
  uniqueVisitors: number;
}

interface AnalyticsResponse {
  success: boolean;
  projectDetails?: ProjectDetail[];
  projects?: ProjectStat[];
  message?: string;
}

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

const projectUrls: Record<string, string> = {
  "nexaflow-ai":
    "https://nexaflow-ai-by-faiza.vercel.app/",
  luxora:
    "https://luxora-zuq4.vercel.app/",
  shopsphere:
    "https://shopsphere-ecommerce-beta.vercel.app/",
  medicare:
    "https://classy-vacherin-7a04fc.netlify.app/",
};

function formatDate(value?: string | null) {
  if (!value) {
    return "No visits yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString();
}

function formatShortDate(value?: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}

function shortVisitorId(value: string) {
  if (!value) {
    return "Unknown";
  }

  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

function safeArray<T>(value: T[] | undefined) {
  return Array.isArray(value) ? value : [];
}

function createEmptyProject(
  project: ProjectStat
): ProjectDetail {
  return {
    projectSlug: project.projectSlug,
    projectName: project.projectName,
    totalVisits: project.clicks,
    uniqueVisitors: project.uniqueVisitors,
    lastVisit: null,
    countries: [],
    cities: [],
    referrers: [],
    devices: [],
    browsers: [],
    operatingSystems: [],
    visitors: [],
  };
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-[#E7B84B]/30 hover:bg-white/[0.045]">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>

      {detail && (
        <p className="mt-2 text-xs text-white/35">
          {detail}
        </p>
      )}

      <div className="mt-5 h-px w-full bg-white/5 transition group-hover:bg-[#E7B84B]/20" />
    </div>
  );
}

function DistributionCard({
  title,
  items,
  valueLabel,
}: {
  title: string;
  items: Array<{
    name: string;
    visits: number;
  }>;
  valueLabel?: string;
}) {
  const total = items.reduce(
    (sum, item) => sum + item.visits,
    0
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#E7B84B]">
          Breakdown
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {title}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-white/5 bg-black/20 p-5 text-center text-sm text-white/35">
          No data available.
        </p>
      ) : (
        <div className="space-y-4">
          {items.slice(0, 8).map((item, index) => {
            const percentage =
              total > 0
                ? Math.round(
                    (item.visits / total) * 100
                  )
                : 0;

            return (
              <div key={`${item.name}-${index}`}>
                <div className="flex items-center justify-between gap-4">
                  <p className="truncate text-sm text-white/70">
                    {item.name || "Unknown"}
                  </p>

                  <span className="shrink-0 text-xs text-[#F5D98B]">
                    {item.visits}{" "}
                    {valueLabel || "visits"}
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-[#E7B84B] transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        percentage,
                        item.visits > 0 ? 3 : 0
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-[10px] text-white/25">
                  {percentage}% of recorded activity
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProjectAnalyticsPage() {
  const params = useParams();

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : "";

  const [period, setPeriod] =
    useState("all");

  const [project, setProject] =
    useState<ProjectDetail | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProjectAnalytics =
    useCallback(async () => {
      if (!slug) {
        setError("Project slug is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `/api/analyticsa/stats?period=${encodeURIComponent(
              period
            )}`,
            {
              method: "GET",
              cache: "no-store",
              credentials: "include",
            }
          );

        const result =
          (await response.json()) as AnalyticsResponse;

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
              "Failed to load project analytics."
          );
        }

        const details =
          Array.isArray(
            result.projectDetails
          )
            ? result.projectDetails
            : [];

        /*
         * First use the complete project details.
         */
        const selectedProject =
          details.find(
            (item) =>
              item.projectSlug === slug
          );

        if (selectedProject) {
          setProject(selectedProject);
          return;
        }

        /*
         * If a project exists in the dashboard
         * project list but does not yet have a
         * projectDetails object, create an empty
         * detail view from its real click stats.
         *
         * This allows old/existing project slugs
         * such as hospital-live and shopsphere-live
         * to open their analytics page instead of
         * showing "Project not found".
         */
        const projectStats =
          Array.isArray(result.projects)
            ? result.projects
            : [];

        const projectFromStats =
          projectStats.find(
            (item) =>
              item.projectSlug === slug
          );

        if (projectFromStats) {
          setProject(
            createEmptyProject(
              projectFromStats
            )
          );
          return;
        }

        setProject(null);
        setError(
          "Project not found in analytics."
        );
      } catch (error) {
        console.error(
          "Project analytics error:",
          error
        );

        setProject(null);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load project analytics."
        );
      } finally {
        setLoading(false);
      }
    }, [period, slug]);

  useEffect(() => {
    void loadProjectAnalytics();
  }, [loadProjectAnalytics]);

  const selectedPeriodLabel =
    useMemo(() => {
      return (
        timeFilters.find(
          (item) =>
            item.value === period
        )?.label || "All Time"
      );
    }, [period]);

  const projectUrl =
    projectUrls[slug] || "#";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030308] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#E7B84B]" />

          <p className="text-sm text-white/50">
            Loading project analytics...
          </p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030308] px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
            Project Analytics
          </p>

          <h1 className="mt-3 text-2xl font-semibold">
            Unable to load project
          </h1>

          <p className="mt-3 text-sm text-white/40">
            {error ||
              "No project analytics were found."}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/secret-admin/dashboard"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:border-[#E7B84B]/40 hover:text-white"
            >
              Back to Dashboard
            </Link>

            <button
              onClick={() =>
                void loadProjectAnalytics()
              }
              className="rounded-xl bg-[#E7B84B] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#F5D98B]"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  const visitors =
    safeArray(project.visitors);

  const countries =
    safeArray(project.countries);

  const cities =
    safeArray(project.cities);

  const referrers =
    safeArray(project.referrers);

  const devices = safeArray(
    project.devices
  ).map((item) => ({
    name: item.device || "Unknown",
    visits: item.visits,
  }));

  const browsers = safeArray(
    project.browsers
  ).map((item) => ({
    name: item.browser || "Unknown",
    visits: item.visits,
  }));

  const operatingSystems =
    safeArray(
      project.operatingSystems
    ).map((item) => ({
      name: item.os || "Unknown",
      visits: item.visits,
    }));

  return (
    <main className="min-h-screen bg-[#030308] px-5 py-8 text-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link
                href="/secret-admin/dashboard"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40 transition hover:text-[#F5D98B]"
              >
                ← Back to Analytics
              </Link>

              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#E7B84B]">
                Project Intelligence
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold md:text-4xl">
                  {project.projectName}
                </h1>

                <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-3 py-1 text-xs text-[#F5D98B]">
                  {project.projectSlug}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm text-white/45">
                Detailed visitor intelligence and
                activity for this project only.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <select
                  value={period}
                  onChange={(event) =>
                    setPeriod(
                      event.target.value
                    )
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

              {projectUrl !== "#" && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#E7B84B]/30 bg-[#E7B84B]/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#F5D98B] transition hover:border-[#E7B84B]/70 hover:bg-[#E7B84B]/20 hover:text-white"
                >
                  Open Project ↗
                </a>
              )}

              <button
                onClick={() =>
                  void loadProjectAnalytics()
                }
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/65 transition hover:border-[#E7B84B]/40 hover:text-white"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#E7B84B]" />

            <p className="text-sm text-white/40">
              Showing{" "}
              <span className="text-[#F5D98B]">
                {selectedPeriodLabel}
              </span>
            </p>
          </div>
        </header>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Visits"
            value={project.totalVisits.toLocaleString()}
            detail="Recorded project visits"
          />

          <StatCard
            label="Unique Visitors"
            value={project.uniqueVisitors.toLocaleString()}
            detail="Distinct visitor IDs"
          />

          <StatCard
            label="Countries"
            value={countries.length}
            detail="Recorded locations"
          />

          <StatCard
            label="Last Visit"
            value={formatShortDate(
              project.lastVisit
            )}
            detail={
              project.lastVisit
                ? formatDate(
                    project.lastVisit
                  )
                : "No visit recorded"
            }
          />
        </section>

        {/* Location + Traffic */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <DistributionCard
            title="Countries"
            items={countries}
          />

          <DistributionCard
            title="Cities"
            items={cities}
          />
        </section>

        {/* Technology */}
        <section className="mt-5 grid gap-5 lg:grid-cols-3">
          <DistributionCard
            title="Devices"
            items={devices}
          />

          <DistributionCard
            title="Browsers"
            items={browsers}
          />

          <DistributionCard
            title="Operating Systems"
            items={operatingSystems}
          />
        </section>

        {/* Referrers */}
        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
              Traffic Sources
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              Referrers
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Where visitors came from before
              reaching this project.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            {referrers.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/35">
                No referrer data available.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {referrers.map(
                  (item, index) => (
                    <div
                      key={`${item.referrer}-${index}`}
                      className="flex flex-col gap-2 p-5 transition hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="truncate text-sm text-white/70">
                        {item.referrer ||
                          "Direct visit"}
                      </p>

                      <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                        {item.visits} visits
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* Visitor Intelligence */}
        <section className="mt-10 pb-12">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#E7B84B]">
                Visitor Intelligence
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Project Visitors
              </h2>

              <p className="mt-2 text-sm text-white/40">
                Detailed visitors recorded for{" "}
                {project.projectName}.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-xs text-white/40">
                Visitors
              </span>

              <span className="ml-2 text-sm font-semibold text-[#F5D98B]">
                {visitors.length}
              </span>
            </div>
          </div>

          {visitors.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-sm text-white/45">
                No project visitors found for
                this period.
              </p>

              <p className="mt-2 text-xs text-white/25">
                Once real visitors access this
                project, their analytics will
                appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {visitors.map(
                (visitor, index) => (
                  <article
                    key={
                      visitor.visitorId
                    }
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-[#E7B84B]/30 hover:bg-white/[0.045]"
                  >
                    {/* Visitor Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#E7B84B]">
                          Visitor #
                          {index + 1}
                        </p>

                        <p
                          title={
                            visitor.visitorId
                          }
                          className="mt-2 max-w-[240px] truncate font-mono text-xs text-white/30"
                        >
                          {
                            shortVisitorId(
                              visitor.visitorId
                            )
                          }
                        </p>
                      </div>

                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                        Tracked
                      </span>
                    </div>

                    {/* Location */}
                    <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-wider text-white/30">
                          Location
                        </p>

                        {typeof visitor.visits ===
                          "number" && (
                          <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-2.5 py-1 text-[10px] text-[#F5D98B]">
                            {visitor.visits}{" "}
                            {visitor.visits ===
                            1
                              ? "visit"
                              : "visits"}
                          </span>
                        )}
                      </div>

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
                          <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                            <p className="text-[10px] uppercase tracking-wider text-white/25">
                              GPS Coordinates
                            </p>

                            <p className="mt-1 font-mono text-xs text-white/55">
                              {visitor.latitude.toFixed(
                                5
                              )}
                              ,{" "}
                              {visitor.longitude.toFixed(
                                5
                              )}
                            </p>

                            {typeof visitor.locationAccuracy ===
                              "number" && (
                              <p className="mt-1 text-[10px] text-white/25">
                                Accuracy ±
                                {Math.round(
                                  visitor.locationAccuracy
                                )}
                                m
                              </p>
                            )}
                          </div>
                        )}
                    </div>

                    {/* Device Information */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          Device
                        </p>

                        <p className="mt-2 truncate text-sm text-white/75">
                          {visitor.device ||
                            "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          Browser
                        </p>

                        <p className="mt-2 truncate text-sm text-white/75">
                          {visitor.browser ||
                            "Unknown"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          OS
                        </p>

                        <p className="mt-2 truncate text-sm text-white/75">
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

                        <p className="mt-2 text-xs text-white/65">
                          {formatDate(
                            visitor.firstVisit
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-wider text-white/30">
                          Last Visit
                        </p>

                        <p className="mt-2 text-xs text-white/65">
                          {formatDate(
                            visitor.lastVisit
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Referrer */}
                    <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <p className="text-[10px] uppercase tracking-wider text-white/30">
                        Referrer
                      </p>

                      <p className="mt-2 truncate text-sm text-white/60">
                        {visitor.referrer ||
                          "Direct visit"}
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
