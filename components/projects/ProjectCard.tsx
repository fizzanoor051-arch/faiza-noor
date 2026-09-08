
"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onSelect?: () => void;
}

export default function ProjectCard({
  project,
  onSelect,
}: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/30 hover:bg-white/[0.04]">
      
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

      <div className="relative z-10">
        
        {/* Top Meta */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="rounded-full border border-violet-400/20 bg-violet-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-violet-300">
            {project.category}
          </span>

          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          {project.tagline}
        </p>

        {/* Stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-zinc-400"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-white transition hover:border-violet-400/30 hover:bg-violet-400/10"
          >
            View case study
          </Link>

          {onSelect && (
            <button
              type="button"
              onClick={onSelect}
              className="inline-flex min-h-10 items-center rounded-full border border-white/10 px-4 text-xs font-semibold text-zinc-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
