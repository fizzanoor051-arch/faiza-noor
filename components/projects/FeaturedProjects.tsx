"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";
import ProjectCaseStudy from "./ProjectCaseStudy";

/* =========================================================
   COLOR MAP
   ========================================================= */

const colorMap = {
  violet: {
    glow: "bg-violet-500/15",
    border: "border-violet-300/20",
    text: "text-violet-200",
  },

  purple: {
    glow: "bg-purple-500/15",
    border: "border-purple-300/20",
    text: "text-purple-200",
  },

  cyan: {
    glow: "bg-cyan-500/10",
    border: "border-cyan-300/20",
    text: "text-cyan-200",
  },

  blue: {
    glow: "bg-blue-500/10",
    border: "border-blue-300/20",
    text: "text-blue-200",
  },
};

/* =========================================================
   PROJECT NUMBER
   ========================================================= */

function getProjectNumber(id: string) {
  const index = projects.findIndex((project) => project.id === id);

  return String(index + 1).padStart(2, "0");
}

/* =========================================================
   FEATURED PROJECTS
   ========================================================= */

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const theme =
    colorMap[activeProject.color as keyof typeof colorMap] ??
    colorMap.purple;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Main ambient glow */}
        <div
          className={`absolute left-[-10%] top-[20%] h-[480px] w-[480px] rounded-full blur-[150px] transition-all duration-1000 ${theme.glow}`}
        />

        {/* Secondary cyan glow */}
        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div className="relative mx-auto max-w-7xl">
        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-purple-400" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300/70">
                04 / Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Projects built to
              <br />

              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                solve problems.
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="max-w-lg text-sm leading-7 text-white/40 lg:ml-auto">
            Not just screenshots. Explore the thinking, architecture,
            decisions, and technologies behind each project.
          </p>
        </div>

        {/* ===================================================
            FEATURED WORKSPACE
            =================================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* =================================================
              PROJECT SELECTOR
              ================================================= */}

          <div className="space-y-3">
            {projects.map((project) => {
              const active = activeProject.id === project.id;

              const projectTheme =
                colorMap[project.color as keyof typeof colorMap] ??
                colorMap.purple;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${
                    active
                      ? `${projectTheme.border} bg-white/[0.045]`
                      : "border-white/7 bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.035]"
                  }`}
                >
                  {/* Project row */}
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <span
                      className={`font-mono text-[10px] ${
                        active
                          ? projectTheme.text
                          : "text-white/20"
                      }`}
                    >
                      {getProjectNumber(project.id)}
                    </span>

                    {/* Project information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="truncate text-sm font-medium text-white">
                          {project.title}
                        </h3>

                        {/* Active indicator */}
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
                        )}
                      </div>

                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                        {project.category}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span
                      className={`text-lg transition-transform duration-300 ${
                        active
                          ? "translate-x-0 text-white/60"
                          : "-translate-x-1 text-white/15"
                      }`}
                    >
                      →
                    </span>
                  </div>

                  {/* Bottom active line */}
                  <div
                    className={`absolute bottom-0 left-0 h-px transition-all duration-500 ${
                      active
                        ? "w-full bg-gradient-to-r from-purple-400 to-cyan-300"
                        : "w-0 bg-white/20 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* =================================================
              PROJECT PREVIEW
              ================================================= */}

          <ProjectPreview project={activeProject} />
        </div>

        {/* ===================================================
            CASE STUDY
            =================================================== */}

        <div className="mt-6">
          <ProjectCaseStudy project={activeProject} />
        </div>
      </div>
    </section>
  );
}