"use client";

import { useState } from "react";
import TechNode from "./TechNode";
import SkillCategory from "./SkillCategory";
import SkillDetails from "./SkillDetails";

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
  technologies: string[];
  position: {
    x: number;
    y: number;
  };
};

const skills: Skill[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 88,
    description:
      "Building reusable component systems, interactive interfaces, dynamic pages, and modern React applications.",
    technologies: ["Components", "Hooks", "State", "Reusable UI"],
    position: { x: 50, y: 35 },
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    level: 82,
    description:
      "Developing modern web applications with Next.js architecture, routing, rendering strategies, and scalable project structure.",
    technologies: ["App Router", "Routing", "SSR", "Full-Stack"],
    position: { x: 73, y: 25 },
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Language",
    level: 78,
    description:
      "Using strong typing to create safer, maintainable, and scalable JavaScript applications.",
    technologies: ["Types", "Interfaces", "Generics", "Type Safety"],
    position: { x: 82, y: 52 },
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Language",
    level: 90,
    description:
      "Strong foundation in modern JavaScript for application logic, DOM interaction, asynchronous programming, and web APIs.",
    technologies: ["ES6+", "Async", "DOM", "APIs"],
    position: { x: 27, y: 25 },
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    level: 72,
    description:
      "Building server-side applications and backend services using the JavaScript runtime ecosystem.",
    technologies: ["Runtime", "HTTP", "Modules", "APIs"],
    position: { x: 28, y: 62 },
  },
  {
    id: "express",
    name: "Express",
    category: "Backend",
    level: 70,
    description:
      "Creating REST APIs, middleware systems, routes, and backend application structures with Express.",
    technologies: ["REST", "Routes", "Middleware", "Controllers"],
    position: { x: 48, y: 72 },
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    level: 68,
    description:
      "Working with document-oriented data models and database-driven application architecture.",
    technologies: ["Documents", "Collections", "Queries", "Models"],
    position: { x: 70, y: 72 },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 84,
    description:
      "Creating responsive, consistent, and highly customizable interfaces with utility-first styling.",
    technologies: ["Responsive", "Utilities", "Design Systems", "UI"],
    position: { x: 17, y: 48 },
  },
  {
    id: "git",
    name: "Git / GitHub",
    category: "Tools",
    level: 82,
    description:
      "Managing source code, version history, collaboration, branches, and deployment workflows.",
    technologies: ["Git", "GitHub", "Branches", "Version Control"],
    position: { x: 85, y: 75 },
  },
];

const categories = [
  "All",
  "Frontend",
  "Language",
  "Backend",
  "Database",
  "Tools",
];

export default function TechUniverse() {
  const [activeSkill, setActiveSkill] = useState<Skill>(skills[0]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const visibleActiveSkill = filteredSkills.some(
    (skill) => skill.id === activeSkill.id
  )
    ? activeSkill
    : filteredSkills[0] ?? skills[0];

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[25%] h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[140px]" />

        <div className="absolute bottom-[10%] right-[5%] h-[350px] w-[350px] rounded-full bg-cyan-500/6 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-300" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                02 / Tech Universe
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              The tools behind
              <br />

              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                the interface.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40 lg:ml-auto">
            Explore the technologies I use to turn ideas into responsive
            interfaces, APIs, data-driven applications, and production-ready
            systems.
          </p>
        </div>

        {/* Categories */}
        <SkillCategory
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Universe */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="relative min-h-[620px] overflow-hidden rounded-3xl border border-white/8 bg-[#08080f]">
            {/* Universe Header */}
            <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                  technology.map
                </p>

                <p className="mt-1 text-xs text-white/35">
                  {filteredSkills.length} active nodes
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/7 bg-white/[0.025] px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
                  system online
                </span>
              </div>
            </div>

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "55px 55px",
              }}
            />

            {/* Connection Rings */}
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/8" />

            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-purple-300/20 bg-[#0c0b15] shadow-[0_0_80px_rgba(139,92,246,0.2)]">
              <div className="text-center">
                <div className="text-2xl font-semibold tracking-[-0.08em]">
                  FN
                </div>

                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.2em] text-white/30">
                  core
                </div>
              </div>
            </div>

            {/* Nodes */}
            {filteredSkills.map((skill) => (
              <TechNode
                key={skill.id}
                skill={skill}
                active={visibleActiveSkill.id === skill.id}
                onSelect={() => setActiveSkill(skill)}
              />
            ))}

            {/* Bottom Legend */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-3 sm:bottom-7 sm:left-7">
              {[
                ["Core", "bg-purple-300"],
                ["Frontend", "bg-cyan-300"],
                ["Backend", "bg-blue-300"],
              ].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${color}`}
                  />

                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Skill Details */}
          <SkillDetails skill={visibleActiveSkill} />
        </div>
      </div>
    </section>
  );
}