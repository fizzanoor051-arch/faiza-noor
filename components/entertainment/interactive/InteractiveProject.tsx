"use client";

import { motion } from "framer-motion";
import {
  Braces,
  Check,
  Code2,
  Database,
  Layers,
  MousePointer2,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

const skills = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: 90,
    icon: Code2,
    description: "Component-driven interfaces and interactive experiences.",
  },
  {
    id: "next",
    name: "Next.js",
    category: "Framework",
    level: 88,
    icon: Layers,
    description: "Production-ready React applications with modern architecture.",
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend",
    level: 82,
    icon: Server,
    description: "APIs, server-side logic and application infrastructure.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Language",
    level: 85,
    icon: Braces,
    description: "Safer and more scalable JavaScript development.",
  },
  {
    id: "database",
    name: "Databases",
    category: "Data",
    level: 78,
    icon: Database,
    description: "Structured data, models and application persistence.",
  },
];

export default function SkillPlayground() {
  const [activeSkill, setActiveSkill] = useState("react");
  const [tested, setTested] = useState(false);

  const skill = useMemo(
    () =>
      skills.find((item) => item.id === activeSkill) ??
      skills[0],
    [activeSkill]
  );

  const Icon = skill.icon;

  const testSkill = () => {
    setTested(false);

    setTimeout(() => {
      setTested(true);
    }, 700);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020204] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.05] blur-[140px]"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <MousePointer2 className="h-4 w-4 text-violet-300/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
              Skill playground
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Don't just
            <br />
            <span className="text-white/20">read the skills.</span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-white/30">
            Interact with the stack. Select a technology and run a
            simulated capability test.
          </p>
        </div>

        {/* Playground */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Skill selector */}
          <div className="space-y-2">
            {skills.map((item) => {
              const ItemIcon = item.icon;
              const active = activeSkill === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSkill(item.id);
                    setTested(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                    active
                      ? "border-violet-300/15 bg-violet-500/[0.07]"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <ItemIcon
                    className={`h-4 w-4 ${
                      active
                        ? "text-violet-200/70"
                        : "text-white/20"
                    }`}
                    strokeWidth={1.5}
                  />

                  <div className="flex-1">
                    <p
                      className={`text-xs ${
                        active ? "text-white/75" : "text-white/35"
                      }`}
                    >
                      {item.name}
                    </p>

                    <p className="mt-1 font-mono text-[7px] uppercase text-white/15">
                      {item.category}
                    </p>
                  </div>

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Skill detail */}
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-xl sm:p-10"
          >
            <div className="absolute right-8 top-8">
              <Sparkles className="h-4 w-4 text-white/10" />
            </div>

            <div className="flex flex-col justify-between gap-10 lg:flex-row">
              <div className="max-w-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/10 bg-violet-500/[0.05]">
                  <Icon
                    className="h-7 w-7 text-violet-200/60"
                    strokeWidth={1}
                  />
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <h3 className="text-3xl font-medium tracking-tight text-white/80">
                    {skill.name}
                  </h3>

                  <span className="rounded-full border border-white/[0.07] px-2.5 py-1 font-mono text-[7px] uppercase text-white/20">
                    {skill.category}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/30">
                  {skill.description}
                </p>
              </div>

              {/* Score */}
              <div className="flex items-center gap-5 lg:flex-col lg:items-end">
                <div className="font-mono text-5xl font-light text-white/70">
                  {skill.level}
                  <span className="text-xl text-white/15">%</span>
                </div>

                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                  Capability
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-12">
              <div className="mb-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-white/15">
                <span>Skill depth</span>
                <span>{skill.level}%</span>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className="h-full rounded-full bg-violet-300/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>

            {/* Test */}
            <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-white/20" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                  Ready for capability test
                </span>
              </div>

              <button
                type="button"
                onClick={testSkill}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-[9px] uppercase tracking-[0.18em] text-white/40 transition-all hover:border-violet-300/20 hover:text-white"
              >
                {tested ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300/70" />
                    Test passed
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5" />
                    Run test
                  </>
                )}
              </button>
            </div>

            {tested && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-xl border border-emerald-300/10 bg-emerald-300/[0.03] px-4 py-3 font-mono text-[8px] uppercase tracking-[0.15em] text-emerald-300/50"
              >
                ✓ Simulation complete — system responded successfully.
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}