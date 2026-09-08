"use client";

import { useState } from "react";
import ArchitectureNode from "./ArchitectureNode";
import ConnectionLines from "./ConnectionLines";

export type ArchitectureLayer = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
};

const layers: ArchitectureLayer[] = [
  {
    id: "interface",
    number: "01",
    label: "INTERFACE",
    title: "User Experience",
    description:
      "The visible layer where users interact with the product through responsive, accessible, and polished interfaces.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    status: "CLIENT READY",
  },
  {
    id: "application",
    number: "02",
    label: "APPLICATION",
    title: "Frontend Logic",
    description:
      "Reusable components, state management, routing, validation, and application logic connect the interface to the system.",
    technologies: ["React", "TypeScript", "Next.js"],
    status: "APPLICATION READY",
  },
  {
    id: "api",
    number: "03",
    label: "API",
    title: "Service Layer",
    description:
      "REST APIs provide a structured communication layer between the client application and backend services.",
    technologies: ["Node.js", "Express.js", "REST APIs"],
    status: "API READY",
  },
  {
    id: "data",
    number: "04",
    label: "DATA",
    title: "Persistence Layer",
    description:
      "Application data is structured, stored, queried, and managed through database systems designed around the product requirements.",
    technologies: ["MongoDB", "SQL", "Data Models"],
    status: "DATA READY",
  },
  {
    id: "deployment",
    number: "05",
    label: "DEPLOYMENT",
    title: "Production Layer",
    description:
      "Applications move from development to production through version control, containerization, testing, and cloud deployment workflows.",
    technologies: ["Git", "Docker", "Cloud"],
    status: "SHIP READY",
  },
];

export default function SystemArchitecture() {
  const [activeLayer, setActiveLayer] = useState(layers[0]);

  return (
    <section
      id="architecture"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-[450px] w-[450px] rounded-full bg-purple-600/8 blur-[150px]" />

        <div className="absolute bottom-[5%] right-[10%] h-[380px] w-[380px] rounded-full bg-cyan-500/6 blur-[150px]" />

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
        {/* Heading */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-purple-400" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300/70">
                03 / System Architecture
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              I don&apos;t just build
              <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                the interface.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40 lg:ml-auto">
            A modern application is a system. This is how I think about the
            path from a user interaction to the data and infrastructure behind
            it.
          </p>
        </div>

        {/* Architecture workspace */}
        <div className="overflow-hidden rounded-3xl border border-white/8 bg-[#08080f]">
          {/* Workspace header */}
          <div className="flex flex-col gap-5 border-b border-white/7 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                system.diagram
              </p>

              <p className="mt-1 text-xs text-white/35">
                Request → Logic → API → Data → Production
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-300/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
                architecture online
              </span>

              <span className="hidden h-4 w-px bg-white/10 sm:block" />

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/20 sm:block">
                v1.0
              </span>
            </div>
          </div>

          {/* Diagram */}
          <div className="relative min-h-[720px] overflow-hidden px-5 py-12 sm:px-8 lg:px-14">
            {/* Decorative grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "45px 45px",
              }}
            />

            {/* Connection system */}
            <ConnectionLines activeId={activeLayer.id} />

            {/* Architecture nodes */}
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5">
              {layers.map((layer, index) => (
                <ArchitectureNode
                  key={layer.id}
                  layer={layer}
                  active={activeLayer.id === layer.id}
                  index={index}
                  onSelect={() => setActiveLayer(layer)}
                />
              ))}
            </div>

            {/* Side labels */}
            <div className="pointer-events-none absolute bottom-8 left-8 hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/15 lg:block">
              <p>REQUEST FLOW</p>
              <p className="mt-2 text-white/25">↓</p>
            </div>

            <div className="pointer-events-none absolute bottom-8 right-8 hidden text-right font-mono text-[8px] uppercase tracking-[0.2em] text-white/15 lg:block">
              <p>PRODUCTION SYSTEM</p>
              <p className="mt-2 text-white/25">●</p>
            </div>
          </div>
        </div>

        {/* Active layer details */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/8 bg-white/[0.018] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
                selected.layer
              </span>

              <span className="font-mono text-[9px] text-purple-300/50">
                {activeLayer.number}
              </span>
            </div>

            <div className="mt-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-purple-300/60">
                {activeLayer.label}
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {activeLayer.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/40">
                {activeLayer.description}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-white/[0.018] p-6 sm:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
              layer stack
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeLayer.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-2.5 text-xs text-white/50"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-white/7 pt-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/50">
                {activeLayer.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}