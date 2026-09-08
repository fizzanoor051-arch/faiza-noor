"use client";

import type { Project } from "./FeaturedProjects";

type ProjectPreviewProps = {
  project: Project;
};

export default function ProjectPreview({
  project,
}: ProjectPreviewProps) {
  const accent =
    project.color === "purple"
      ? "purple"
      : project.color === "cyan"
        ? "cyan"
        : "blue";

  return (
    <div className="relative min-h-[470px] overflow-hidden rounded-3xl border border-white/8 bg-[#090910]">
      {/* Browser top */}
      <div className="flex items-center justify-between border-b border-white/7 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>

        <div className="rounded-full border border-white/7 bg-white/[0.025] px-4 py-1.5 font-mono text-[8px] text-white/25">
          {project.slug}.app
        </div>

        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-300/50">
          {project.status}
        </span>
      </div>

      {/* Preview area */}
      <div className="relative flex min-h-[415px] items-center justify-center overflow-hidden p-6">
        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow */}
        <div
          className={`absolute h-72 w-72 rounded-full blur-[100px] ${
            accent === "purple"
              ? "bg-purple-500/15"
              : accent === "cyan"
                ? "bg-cyan-500/10"
                : "bg-blue-500/10"
          }`}
        />

        {/* Mock application */}
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c14]/90 shadow-2xl backdrop-blur-xl">
          {/* App navigation */}
          <div className="flex items-center justify-between border-b border-white/7 px-4 py-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  accent === "purple"
                    ? "bg-purple-400/10"
                    : accent === "cyan"
                      ? "bg-cyan-400/10"
                      : "bg-blue-400/10"
                }`}
              >
                <span className="text-[8px] font-semibold">FN</span>
              </div>

              <span className="text-[9px] font-medium text-white/60">
                {project.shortTitle}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="h-1.5 w-8 rounded-full bg-white/8" />
              <span className="h-1.5 w-5 rounded-full bg-white/8" />
            </div>
          </div>

          {/* App content */}
          <div className="grid grid-cols-[0.75fr_1.25fr] gap-3 p-4">
            <div className="space-y-2">
              <div className="h-24 rounded-xl border border-white/7 bg-white/[0.025]" />
              <div className="h-12 rounded-xl border border-white/7 bg-white/[0.025]" />
              <div className="h-16 rounded-xl border border-white/7 bg-white/[0.025]" />
            </div>

            <div className="space-y-3">
              <div className="h-28 rounded-xl border border-white/7 bg-gradient-to-br from-white/[0.055] to-transparent" />

              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 rounded-xl border border-white/7 bg-white/[0.025]" />
                <div className="h-20 rounded-xl border border-white/7 bg-white/[0.025]" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-white/7" />
                <div
                  className={`h-7 w-16 rounded-lg ${
                    accent === "purple"
                      ? "bg-purple-400/15"
                      : accent === "cyan"
                        ? "bg-cyan-400/15"
                        : "bg-blue-400/15"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project label */}
        <div className="absolute bottom-5 left-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
            live preview / concept
          </p>

          <p className="mt-1 text-xs text-white/45">
            {project.title}
          </p>
        </div>

        <div className="absolute bottom-5 right-5">
          <span className="rounded-full border border-white/8 bg-black/30 px-3 py-1.5 font-mono text-[8px] text-white/25 backdrop-blur-md">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}