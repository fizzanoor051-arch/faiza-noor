"use client";

import { useEffect, useState } from "react";

export default function ExcludeMyVisits() {
  const [excluded, setExcluded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadStatus() {
      try {
        const response = await fetch(
          "/api/analytics/exclude",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (mounted) {
            setVisible(false);
          }
          return;
        }

        const data = await response.json();

        if (mounted) {
          setExcluded(data.excluded === true);
          setVisible(true);
        }
      } catch (error) {
        console.error(
          "Failed to load analytics exclusion status:",
          error
        );

        if (mounted) {
          setVisible(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStatus();

    return () => {
      mounted = false;
    };
  }, []);

  async function toggleExclusion() {
    const password = window.prompt(
      excluded
        ? "Enter your private analytics password to include your visits again:"
        : "Enter your private analytics password to exclude your visits:"
    );

    if (!password) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/analytics/exclude",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            secret: password,
            enabled: !excluded,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        window.alert(
          data.message ||
            "Invalid password or request failed."
        );
        return;
      }

      setExcluded(data.excluded === true);

      window.alert(
        data.excluded
          ? "Your visits and project clicks are now excluded."
          : "Your visits and project clicks are now being counted again."
      );
    } catch (error) {
      console.error(
        "Analytics exclusion toggle failed:",
        error
      );

      window.alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading || !visible) {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                excluded
                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                  : "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              }`}
            />

            <h3 className="text-sm font-semibold tracking-wide text-white">
              PRIVATE ANALYTICS CONTROL
            </h3>
          </div>

          <p className="mt-1 text-xs text-white/50">
            {excluded
              ? "Your visits and project clicks are currently excluded."
              : "Your visits and project clicks are currently being counted."}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleExclusion}
          disabled={saving}
          className={`rounded-xl border px-4 py-2.5 text-xs font-bold tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
            excluded
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
              : "border-[#E7B84B]/40 bg-[#E7B84B]/10 text-[#F5D98B] hover:border-[#E7B84B]/70 hover:bg-[#E7B84B]/20 hover:shadow-[0_0_20px_rgba(231,184,75,0.15)]"
          }`}
        >
          {saving
            ? "UPDATING..."
            : excluded
            ? "INCLUDE MY VISITS"
            : "EXCLUDE MY VISITS"}
        </button>
      </div>
    </div>
  );
}