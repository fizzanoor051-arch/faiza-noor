"use client";

import { useState } from "react";
import ProjectPreview from "./ProjectPreview";
import ProjectCaseStudy from "./ProjectCaseStudy";
export type Project = {
id: string;
slug: string;
number: string;
title: string;
shortTitle: string;
category: string;
year: string;
status: string;

description: string;
problem: string;
solution: string;
role: string;

stack: string[];
features: string[];

metrics: {
label: string;
value: string;
}[];

color: "purple" | "cyan" | "blue";

// Optional project preview data
tagline?: string;
featured?: boolean;
screenshots?: string[];
video?: string;
};

export const projects: Project[] = [
  {
    id: "shopsphere",
    slug: "shopsphere",
    number: "01",
    title: "ShopSphere",
    shortTitle: "E-Commerce",
    category: "Full-Stack",
    year: "2026",
    status: "BUILDING",
    description:
      "A modern e-commerce experience focused on product discovery, clean navigation, responsive interfaces, and scalable application structure.",
    problem:
      "Online stores can quickly become difficult to navigate when product discovery, filtering, cart interactions, and responsive behavior are not designed as one system.",
    solution:
      "Built a component-driven commerce interface with reusable product structures, routing, cart flows, and a foundation ready to connect with backend services.",
    role: "Frontend / Full-Stack Development",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
    ],
    features: [
      "Product discovery",
      "Dynamic routing",
      "Shopping cart",
      "Responsive UI",
      "Reusable components",
      "API-ready architecture",
    ],
    metrics: [
      { label: "Architecture", value: "Component-driven" },
      { label: "Interface", value: "Responsive" },
      { label: "Routing", value: "Dynamic" },
    ],
    color: "purple",
  },
  {
    id: "hospital",
    slug: "modern-hospital",
    number: "02",
    title: "Modern Hospital",
    shortTitle: "Healthcare Platform",
    category: "Web Application",
    year: "2026",
    status: "BUILDING",
    description:
      "A professional healthcare platform concept designed around quick access, doctor discovery, departments, appointments, pharmacy information, and patient-focused navigation.",
    problem:
      "Healthcare websites often overload users with information, making important actions such as finding a doctor or reaching emergency information harder than they should be.",
    solution:
      "Designed a structured healthcare experience where high-priority actions are visible, content is organized by intent, and the interface remains responsive across devices.",
    role: "Frontend Development",
    stack: [
      "React",
      "TypeScript",
      "CSS",
      "Responsive Design",
      "Component Architecture",
    ],
    features: [
      "Doctor directory",
      "Departments",
      "Appointment flow",
      "Emergency access",
      "Services",
      "Testimonials",
    ],
    metrics: [
      { label: "UX Focus", value: "Patient-first" },
      { label: "Layout", value: "Responsive" },
      { label: "Structure", value: "Modular" },
    ],
    color: "cyan",
  },
  {
    id: "portfolio",
    slug: "faiza-noor-portfolio",
    number: "03",
    title: "Faiza Noor Portfolio",
    shortTitle: "Personal System",
    category: "Frontend",
    year: "2026",
    status: "ACTIVE",
    description:
      "A highly interactive engineering portfolio designed as a digital system rather than a conventional collection of sections.",
    problem:
      "A developer portfolio needs to communicate technical ability, design thinking, personality, and project depth without overwhelming visitors.",
    solution:
      "Created an immersive interface combining system visualization, interactive technology maps, case studies, engineering principles, and direct conversion paths.",
    role: "Design / Frontend Engineering",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Animation",
      "Responsive UI",
    ],
    features: [
      "Interactive tech universe",
      "System architecture",
      "Project case studies",
      "Command menu",
      "Cinematic interactions",
      "Responsive experience",
    ],
    metrics: [
      { label: "Experience", value: "Interactive" },
      { label: "Design", value: "Custom" },
      { label: "Performance", value: "Responsive" },
    ],
    color: "blue",
  },
];

const colorMap = {
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

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const theme = colorMap[activeProject.color];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-[-10%] top-[20%] h-[480px] w-[480px] rounded-full blur-[150px] transition-all duration-1000 ${theme.glow}`}
        />

        <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-purple-400" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300/70">
                04 / Selected Work
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Projects built to
              <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                solve problems.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40 lg:ml-auto">
            Not just screenshots. Explore the thinking, architecture, decisions,
            and technologies behind each project.
          </p>
        </div>

        {/* Featured workspace */}
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Project selector */}
          <div className="space-y-3">
            {projects.map((project) => {
              const active = activeProject.id === project.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ${
                    active
                      ? `${colorMap[project.color].border} bg-white/[0.045]`
                      : "border-white/7 bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.035]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-[10px] ${
                        active
                          ? colorMap[project.color].text
                          : "text-white/20"
                      }`}
                    >
                      {project.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="truncate text-sm font-medium text-white">
                          {project.title}
                        </h3>

                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
                        )}
                      </div>

                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                        {project.category}
                      </p>
                    </div>

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

                  <div
                    className={`absolute bottom-0 left-0 h-px transition-all duration-500 ${
                      active
                        ? "w-full bg-gradient-to-r from-purple-400 to-cyan-300"
                        : "w-0 group-hover:w-full bg-white/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <ProjectPreview project={activeProject} />
        </div>

        {/* Case study */}
        <div className="mt-6">
          <ProjectCaseStudy project={activeProject} />
        </div>
      </div>
    </section>
  );
}