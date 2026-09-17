
"use client";

export interface ProjectTrackerData {
  projectSlug: string;
  projectName: string;
  projectUrl?: string;
}

export function trackProjectClick({
  projectSlug,
  projectName,
  projectUrl = "",
}: ProjectTrackerData) {
  try {
    const STORAGE_KEY = "faiza_portfolio_visitor_id";

    let visitorId = localStorage.getItem(STORAGE_KEY);

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, visitorId);
    }

    const payload = {
      visitorId,
      projectSlug,
      projectName,
      projectUrl,
    };

    fetch("/api/analytics/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((error) => {
      console.error("Project tracking failed:", error);
    });
  } catch (error) {
    console.error("Project tracker error:", error);
  }
}
