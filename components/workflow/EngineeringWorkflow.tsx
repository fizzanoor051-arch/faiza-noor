"use client";

import { useState } from "react";
import WorkflowStep from "./WorkflowStep";

export type WorkflowItem = {
  number: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
};

const workflow: WorkflowItem[] = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Understand the problem",
    description:
      "Before writing code, I understand the product goal, users, requirements, constraints, and the outcome the project needs to achieve.",
    deliverables: [
      "Requirements",
      "User goals",
      "Project scope",
      "Technical direction",
    ],
  },
  {
    number: "02",
    phase: "PLAN",
    title: "Design the system",
    description:
      "I break the product into reusable pieces and think through information architecture, components, data flow, APIs, and technical decisions.",
    deliverables: [
      "Architecture",
      "Component structure",
      "Data flow",
      "Development plan",
    ],
  },
  {
    number: "03",
    phase: "BUILD",
    title: "Engineer the experience",
    description:
      "The interface is built with reusable components, responsive behavior, clean code, meaningful interactions, and maintainable structure.",
    deliverables: [
      "Frontend",
      "Components",
      "Interactions",
      "Responsive UI",
    ],
  },
  {
    number: "04",
    phase: "CONNECT",
    title: "Bring the system together",
    description:
      "Frontend experiences connect with APIs, backend services, authentication, databases, and the other pieces required by the product.",
    deliverables: [
      "REST APIs",
      "Backend logic",
      "Authentication",
      "Database",
    ],
  },
  {
    number: "05",
    phase: "REFINE",
    title: "Test and improve",
    description:
      "I review the experience across devices, fix issues, improve usability, and strengthen the application before it reaches production.",
    deliverables: [
      "Testing",
      "Bug fixing",
      "UX review",
      "Performance",
    ],
  },
  {
    number: "06",
    phase: "SHIP",
    title: "Deploy and iterate",
    description:
      "The finished product is prepared for deployment and future improvements, with a structure that can evolve as the product grows.",
    deliverables: [
      "Git workflow",
      "Deployment",
      "Monitoring",
      "Iteration",
    ],
  },
];

export default function EngineeringWorkflow() {
  const [activeStep, setActiveStep] = useState("01");

  const selectedStep =
    workflow.find((item) => item.number === activeStep) ?? workflow[0];

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[30%] h-[450px] w-[450px] rounded-full bg-purple-600/7 blur-[150px]" />

        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[150px]" />

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
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-300" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/60">
                05 / Engineering Workflow
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              From idea
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                to shipped product.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40 lg:ml-auto">
            A structured workflow keeps the project focused—from understanding
            the problem to building, testing, deploying, and improving the
            final product.
          </p>
        </div>

        {/* Workflow */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Steps */}
          <div className="relative">
            <div className="absolute bottom-8 left-[23px] top-8 hidden w-px bg-gradient-to-b from-purple-400/30 via-white/10 to-cyan-300/20 sm:block" />

            <div className="space-y-3">
              {workflow.map((step, index) => (
                <WorkflowStep
                  key={step.number}
                  step={step}
                  index={index}
                  active={activeStep === step.number}
                  onSelect={() => setActiveStep(step.number)}
                />
              ))}
            </div>
          </div>

          {/* Selected step */}
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#090910] p-6 sm:p-8 lg:sticky lg:top-24 lg:h-fit">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/7 pb-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                  current.phase
                </span>

                <span className="font-mono text-[10px] text-purple-300/60">
                  {selectedStep.number} / 06
                </span>
              </div>

              <div className="py-10">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-purple-300/60">
                  {selectedStep.phase}
                </span>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  {selectedStep.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/40">
                  {selectedStep.description}
                </p>
              </div>

              <div className="border-t border-white/7 pt-6">
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                  phase deliverables
                </p>

                <div className="grid gap-2">
                  {selectedStep.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/60" />

                      <span className="text-xs text-white/45">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] px-4 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-300/50">
                  process / structured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/7 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/20">
            discover → plan → build → connect → refine → ship
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-purple-300/40">
            engineering / mindset
          </span>
        </div>
      </div>
    </section>
  );
}