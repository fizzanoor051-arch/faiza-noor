"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="project-archive"
      className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
              Project Archive
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              More things I&apos;ve built.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              A growing collection of interfaces, web applications, and
              full-stack experiments built while learning, testing, and
              improving my engineering workflow.
            </p>
          </div>

          <div className="text-sm text-white/40">
            {filteredProjects.length.toString().padStart(2, "0")} projects
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <ProjectFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Projects */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <p className="text-sm text-white/50">
              No projects found in this category yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}