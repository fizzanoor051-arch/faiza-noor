"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

interface ProjectCardProps {
  project: Project;
  onSelect?: () => void;
}

export default function ProjectCard({
  project,
  onSelect,
}: ProjectCardProps) {
  const accent =
    project.color === "violet" ||
    project.color === "purple"
      ? {
          text: "text-violet-300",
          border: "border-violet-400/25",
          hoverBorder:
            "hover:border-violet-400/40",
          bg: "bg-violet-400/10",
          hoverBg:
            "hover:bg-violet-400/[0.08]",
        }
      : project.color === "cyan"
        ? {
            text: "text-cyan-300",
            border: "border-cyan-400/25",
            hoverBorder:
              "hover:border-cyan-400/40",
            bg: "bg-cyan-400/10",
            hoverBg:
              "hover:bg-cyan-400/[0.08]",
          }
        : {
            text: "text-blue-300",
            border: "border-blue-400/25",
            hoverBorder:
              "hover:border-blue-400/40",
            bg: "bg-blue-400/10",
            hoverBg:
              "hover:bg-blue-400/[0.08]",
          };

  return (
    <article className="group relative">
      {/* ================================================= */}
      {/* PROJECT NUMBER */}
      {/* ================================================= */}

      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.2em] ${accent.text} opacity-70`}
          >
            {String(
              ["luxro-store", "shopsphere", "modern-hospital", "faiza-noor-portfolio"].indexOf(
                project.id
              ) + 1
            ).padStart(2, "0")}
          </span>

          <span className="h-px w-8 bg-white/10" />

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
            {project.category}
          </span>
        </div>

        <span className="font-mono text-[9px] tracking-[0.12em] text-white/20">
          {project.year}
        </span>
      </div>

      {/* ================================================= */}
      {/* MAIN MEDIA PREVIEW */}
      {/* ================================================= */}

      <ProjectPreview project={project} />

      {/* ================================================= */}
      {/* PROJECT INFORMATION */}
      {/* ================================================= */}

      <div className="relative mt-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-500 group-hover:border-white/[0.13] group-hover:bg-white/[0.03] sm:p-6">
        {/* Ambient glow */}
        <div
          className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full ${accent.bg} opacity-30 blur-[90px] transition duration-700 group-hover:opacity-60`}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border ${accent.border} ${accent.bg} px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] ${accent.text}`}
                >
                  {project.category}
                </span>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                  {project.status}
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {project.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/40">
                {project.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid shrink-0 grid-cols-3 gap-2 lg:min-w-[300px]">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/[0.07] bg-black/20 px-3 py-3"
                >
                  <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/20">
                    {metric.label}
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-white/60">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* STACK */}
          {/* ================================================= */}

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                Technology stack
              </span>

              <span className="h-px flex-1 bg-white/[0.05]" />
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] text-white/35 transition duration-300 hover:border-white/15 hover:text-white/60"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* FEATURES */}
          {/* ================================================= */}

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                Core capabilities
              </span>

              <span className="h-px flex-1 bg-white/[0.05]" />
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.slice(0, 6).map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-2.5"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg.replace(
                      "/10",
                      "/70"
                    )}`}
                  />

                  <span className="text-[10px] text-white/35">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-5">
            {/* Case Study */}
            <Link
              href={`/projects/${project.slug}`}
              className={`inline-flex min-h-11 items-center justify-center rounded-full border ${accent.border} ${accent.bg} px-5 text-xs font-semibold text-white transition-all duration-300 ${accent.hoverBorder} ${accent.hoverBg}`}
            >
              <span>View case study</span>

              <span className="ml-2 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>

            {/* Live Demo */}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.07] hover:text-emerald-300"
              >
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                Live Demo
              </a>
            ) : (
              <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.015] px-5 text-xs font-semibold text-white/20">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white/20" />
                Live Demo
              </span>
            )}

            {/* GitHub */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                GitHub
                <span className="ml-2 text-white/30">
                  ↗
                </span>
              </a>
            ) : (
              <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.015] px-5 text-xs font-semibold text-white/20">
                GitHub
              </span>
            )}

            {/* Quick Preview */}
            {onSelect && (
              <button
                type="button"
                onClick={onSelect}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/[0.08] px-5 text-xs font-semibold text-white/35 transition-all duration-300 hover:border-cyan-400/25 hover:text-cyan-300"
              >
                Quick preview
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}