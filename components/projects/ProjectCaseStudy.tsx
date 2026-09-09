"use client";

import type { Project } from "@/data/projects";

type ProjectCaseStudyProps = {
  project: Project;
};

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  /*
   * Project numbers are generated from the shared projects data
   * instead of relying on a separate `number` property.
   */
  const projectNumber = String(
    ["Luxora-store", "shopsphere", "modern-hospital", "faiza-noor-portfolio"].indexOf(
      project.id
    ) + 1
  ).padStart(2, "0");

  return (
    <article className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.018]">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="border-b border-white/7 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-purple-300/60">
              case.study / {projectNumber}
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
          </div>

          <span className="w-fit rounded-full border border-white/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
            {project.category}
          </span>
        </div>

        <p className="mt-5 max-w-4xl text-sm leading-7 text-white/40">
          {project.description}
        </p>
      </div>

      {/* =====================================================
          CASE STUDY GRID
          ===================================================== */}

      <div className="grid divide-y divide-white/7 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {/* Problem */}
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            01 / Problem
          </p>

          <p className="mt-5 text-sm leading-7 text-white/40">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            02 / Solution
          </p>

          <p className="mt-5 text-sm leading-7 text-white/40">
            {project.solution}
          </p>
        </div>

        {/* Role */}
        <div className="p-6 sm:p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            03 / Role
          </p>

          <p className="mt-5 text-sm leading-7 text-white/40">
            {project.role}
          </p>
        </div>
      </div>

      {/* =====================================================
          TECHNOLOGY STACK + FEATURES
          ===================================================== */}

      <div className="border-t border-white/7 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          {/* Technology Stack */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              Technology stack
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((technology: string) => (
                <span
                  key={technology}
                  className="rounded-lg border border-white/7 bg-white/[0.025] px-3 py-2 text-[10px] text-white/40"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Core Features */}
          <div className="sm:max-w-[360px]">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              Core features
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {project.features.map((feature: string) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-[10px] text-white/35"
                >
                  <span className="h-1 w-1 rounded-full bg-purple-300/60" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          METRICS
          ===================================================== */}

      <div className="grid border-t border-white/7 sm:grid-cols-3">
        {project.metrics.map(
          (
            metric: { label: string; value: string },
            index: number
          ) => (
            <div
              key={metric.label}
              className={`p-6 ${
                index !== project.metrics.length - 1
                  ? "border-b border-white/7 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                {metric.label}
              </p>

              <p className="mt-2 text-sm text-white/55">
                {metric.value}
              </p>
            </div>
          )
        )}
      </div>
    </article>
  );
}