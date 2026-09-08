"use client";

import ContributionGraph from "./ContributionGraph";

export default function GitHubSection() {
  return (
    <section
      id="github"
      className="relative overflow-hidden bg-[#05050b] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
              <span className="h-px w-10 bg-cyan-400" />
              Open Source
            </div>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Code in{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Motion
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/50">
              A visual snapshot of the engineering activity behind the
              projects, experiments, and learning happening in my development
              workflow.
            </p>
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:border-cyan-300/30 hover:bg-cyan-400/5 hover:text-white"
          >
            <span>View GitHub</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>

        {/* GitHub panel */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              github / activity
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {/* Stats */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="font-mono text-2xl font-semibold">BUILD</p>
                <p className="mt-2 text-xs text-white/35">
                  Projects & experiments
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="font-mono text-2xl font-semibold">LEARN</p>
                <p className="mt-2 text-xs text-white/35">
                  Continuous improvement
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="font-mono text-2xl font-semibold">SHIP</p>
                <p className="mt-2 text-xs text-white/35">
                  From idea to deployment
                </p>
              </div>
            </div>

            <ContributionGraph />

            {/* Bottom */}
            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono">
                $ git status --short
              </span>

              <span className="text-emerald-300/60">
                workflow ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}