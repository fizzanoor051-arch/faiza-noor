"use client";

import { FormEvent, useState } from "react";

export default function SecretAdminPage() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analytics/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid secret");
        return;
      }

      window.location.href = "/secret-admin/dashboard";
    } catch (error) {
      console.error("Analytics login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030308] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E7B84B]">
              Private Area
            </p>

            <h1 className="mt-3 text-3xl font-semibold">
              Analytics Admin
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Enter your private analytics secret to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="analytics-secret"
                className="mb-2 block text-sm text-white/70"
              >
                Admin Secret
              </label>

              <input
                id="analytics-secret"
                type="password"
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                placeholder="Enter your private secret"
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[#E7B84B]/60 focus:ring-1 focus:ring-[#E7B84B]/30"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#E7B84B] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#F5D98B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Enter Analytics"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}