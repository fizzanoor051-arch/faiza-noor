"use client";

import { useEffect, useState } from "react";

interface Overview {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  last7DaysVisits: number;
  last30DaysVisits: number;
  totalProjectClicks: number;
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

interface AnalyticsData {
  success: boolean;
  overview: Overview;
  projects: ProjectStat[];
  recentActivity: Activity[];
  referrers: ReferrerStat[];
  generatedAt: string;
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
    key: "last30DaysVisits",
    label: "Last 30 Days",
  },
  {
    key: "totalProjectClicks",
    label: "Project Clicks",
  },
] as const;

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/analytics/stats", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          window.location.href = "/secret-admin";
          return;
        }

        throw new Error(
          result.message || "Failed to load analytics"
        );
      }

      setData(result);
    } catch (error) {
      console.error("Analytics dashboard error:", error);

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
    loadAnalytics();
  }, []);

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
          <p className="text-sm text-red-300">{error}</p>

          <button
            onClick={loadAnalytics}
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

          <button
            onClick={loadAnalytics}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 transition hover:border-[#E7B84B]/40 hover:text-white"
          >
            Refresh Data
          </button>
        </div>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-[#E7B84B]/30 hover:bg-white/[0.045]"
            >
              <p className="text-sm text-white/45">
                {card.label}
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {data.overview[card.key].toLocaleString()}
              </p>

              <div className="mt-5 h-px w-full bg-white/5 transition group-hover:bg-[#E7B84B]/20" />
            </div>
          ))}
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

          {data.projects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/40">
              No project clicks recorded yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {data.projects.map((project) => (
                <div
                  key={project.projectSlug}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#E7B84B]/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">
                        {project.projectName}
                      </h3>

                      <p className="mt-1 text-xs text-white/35">
                        {project.projectSlug}
                      </p>
                    </div>

                    <span className="rounded-full border border-[#E7B84B]/20 bg-[#E7B84B]/10 px-3 py-1 text-xs text-[#F5D98B]">
                      {project.clicks} clicks
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
              ))}
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
            {data.recentActivity.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">
                No activity recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {data.recentActivity.map((activity, index) => (
                  <div
                    key={`${activity.createdAt}-${index}`}
                    className="flex flex-col gap-3 p-5 transition hover:bg-white/[0.025] md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${
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

                      <p className="mt-2 pl-5 text-xs text-white/35">
                        {activity.path ||
                          activity.projectSlug ||
                          "Portfolio"}
                      </p>
                    </div>

                    <p className="text-xs text-white/35">
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
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
            {data.referrers.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">
                No referrer data available yet.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {data.referrers.map((referrer, index) => (
                  <div
                    key={`${referrer.referrer}-${index}`}
                    className="flex items-center justify-between gap-4 p-5"
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

        {/* Footer info */}
        <div className="border-t border-white/5 pt-5 text-xs text-white/25">
          Last updated:{" "}
          {new Date(data.generatedAt).toLocaleString()}
        </div>
      </div>
    </main>
  );
}