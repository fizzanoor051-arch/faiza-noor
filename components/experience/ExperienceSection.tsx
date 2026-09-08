"use client";

import { useState } from "react";
import ExperienceItem from "./ExperienceItem";

const experiences = [
  {
    id: "01",
    period: "2025 — PRESENT",
    type: "INDEPENDENT",
    title: "Full-Stack Web Development",
    company: "Independent Projects & Freelance Work",
    description:
      "Building modern web applications and portfolio-grade products while continuously expanding from frontend engineering into full-stack development.",
    highlights: [
      "Developing responsive interfaces with React and Next.js",
      "Building reusable components and scalable UI systems",
      "Working with TypeScript for safer application development",
      "Integrating APIs and backend services",
      "Using Git and GitHub for version control and project workflows",
      "Exploring Node.js, Express.js, databases, authentication, and deployment",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "02",
    period: "2024 — PRESENT",
    type: "DEVELOPMENT",
    title: "Web Engineering Journey",
    company: "Continuous Learning",
    description:
      "A hands-on learning journey focused on turning concepts into real projects and developing a stronger understanding of modern web architecture.",
    highlights: [
      "Started with HTML, CSS, and JavaScript fundamentals",
      "Progressed into React-based application development",
      "Learned component architecture and reusable UI patterns",
      "Worked with routing, APIs, forms, state, and application logic",
      "Expanded into Next.js and TypeScript",
      "Currently developing backend and full-stack engineering skills",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Next.js",
    ],
  },
  {
    id: "03",
    period: "ONGOING",
    type: "EXPERIMENTAL",
    title: "Product & Interface Experiments",
    company: "Personal Lab",
    description:
      "Designing and experimenting with digital products to improve problem-solving, visual thinking, frontend architecture, and product-oriented development.",
    highlights: [
      "E-commerce interface development",
      "Healthcare website architecture",
      "Portfolio and personal brand experiences",
      "Interactive UI experiments",
      "Responsive design and accessibility considerations",
      "Exploring AI-assisted development workflows",
    ],
    technologies: [
      "UI/UX",
      "React",
      "Next.js",
      "APIs",
      "AI",
      "Responsive Design",
    ],
  },
];

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState(experiences[0].id);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#05050b] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient lights */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-purple-500/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-purple-300">
            <span className="h-px w-10 bg-purple-400" />
            Experience
          </div>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Built through{" "}
            <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              practice.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
            My experience is centered around building real projects, learning
            modern engineering practices, and continuously turning new
            concepts into working products.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-5 hidden h-[calc(100%-40px)] w-px bg-gradient-to-b from-purple-400/40 via-white/10 to-transparent md:block" />

          <div className="space-y-5">
            {experiences.map((experience) => (
              <ExperienceItem
                key={experience.id}
                experience={experience}
                isActive={activeId === experience.id}
                onClick={() => setActiveId(experience.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/25">
            Experience / continuously evolving
          </p>

          <p className="text-sm text-white/35">
            Learn → Build → Refine → Repeat
          </p>
        </div>
      </div>
    </section>
  );
}