"use client";

import { useState } from "react";
import AIExperiment from "./AIExperiment";

const experiments = [
  {
    id: "ai-ui",
    number: "01",
    title: "AI UI Generation",
    category: "INTERFACE",
    description:
      "Exploring how AI-assisted workflows can accelerate interface ideation while keeping the final implementation clean, responsive, and production-oriented.",
    stack: ["React", "Next.js", "TypeScript", "AI"],
    status: "EXPLORING",
  },
  {
    id: "ai-content",
    number: "02",
    title: "Smart Content Layer",
    category: "CONTENT",
    description:
      "Designing content systems where structured data can be transformed into useful, contextual experiences through AI-assisted processing.",
    stack: ["Next.js", "APIs", "TypeScript", "AI"],
    status: "EXPLORING",
  },
  {
    id: "ai-workflow",
    number: "03",
    title: "Developer Workflow",
    category: "ENGINEERING",
    description:
      "Experimenting with AI as an engineering assistant for debugging, documentation, refactoring, and repetitive development workflows.",
    stack: ["Node.js", "Git", "APIs", "AI"],
    status: "EXPERIMENTAL",
  },
];

export default function AILab() {
  const [activeId, setActiveId] = useState(experiments[0].id);

  const activeExperiment =
    experiments.find((experiment) => experiment.id === activeId) ??
    experiments[0];

  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-[#05050b] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[130px]" />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-purple-300">
              <span className="h-px w-10 bg-purple-400" />
              Experimental Layer
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              AI{" "}
              <span className="bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Lab
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              A space for exploring practical ways AI can enhance modern web
              products, developer workflows, and digital experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                Lab Status
              </span>

              <span className="flex items-center gap-2 text-xs text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                ACTIVE
              </span>
            </div>

            <div className="mt-5 h-px bg-white/10" />

            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-semibold">03</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">
                  Experiments
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold">∞</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">
                  Ideas
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold">24/7</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">
                  Learning
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Lab */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Experiment navigation */}
          <div className="space-y-3">
            {experiments.map((experiment) => {
              const isActive = experiment.id === activeId;

              return (
                <button
                  key={experiment.id}
                  type="button"
                  onClick={() => setActiveId(experiment.id)}
                  className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-purple-400/40 bg-purple-500/[0.08]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-purple-300" : "text-white/25"
                        }`}
                      >
                        {experiment.number}
                      </span>

                      <span
                        className={`text-[10px] uppercase tracking-[0.2em] ${
                          isActive ? "text-purple-300/80" : "text-white/30"
                        }`}
                      >
                        {experiment.category}
                      </span>
                    </div>

                    <span
                      className={`h-2 w-2 rounded-full transition ${
                        isActive
                          ? "bg-purple-300 shadow-[0_0_12px_rgba(192,132,252,.8)]"
                          : "bg-white/15"
                      }`}
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-medium">
                    {experiment.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {experiment.status}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Experiment detail */}
          <AIExperiment experiment={activeExperiment} />
        </div>
      </div>
    </section>
  );
}