"use client";

import { useState } from "react";

export default function ClearAnalytics() {
  const [saving, setSaving] = useState(false);

  async function clearAnalytics() {
    const confirmed = window.confirm(
      "This will reset your analytics counts from now onward. Old MongoDB data will NOT be deleted. Continue?"
    );

    if (!confirmed) {
      return;
    }

    const password = window.prompt(
      "Enter your private analytics password to clear recent analytics:"
    );

    if (!password) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/analytics/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            secret: password,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        window.alert(
          data.message ||
            "Analytics reset failed."
        );
        return;
      }

      window.alert(
        "Analytics cleared successfully. Your new count starts from 0 now."
      );

      window.location.reload();
    } catch (error) {
      console.error(
        "Analytics reset failed:",
        error
      );

      window.alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mb-6 rounded-2xl border border-red-400/20 bg-black/20 p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            ANALYTICS RESET
          </h3>

          <p className="mt-1 text-xs text-white/50">
            Start a fresh analytics count without deleting
            your historical MongoDB data.
          </p>
        </div>

        <button
          type="button"
          onClick={clearAnalytics}
          disabled={saving}
          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-xs font-bold tracking-wider text-red-300 transition-all duration-300 hover:border-red-400/60 hover:bg-red-400/20 hover:shadow-[0_0_20px_rgba(248,113,113,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "CLEARING..."
            : "CLEAR RECENT ANALYTICS"}
        </button>
      </div>
    </div>
  );
}