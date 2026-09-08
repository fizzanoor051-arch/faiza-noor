"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  Code2,
  Layers3,
  Mail,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { useState } from "react";

import HireCTA from "./HireCTA";
import ProjectStarter, {
  ProjectConfig,
} from "./ProjectStarter";

type HireExperienceProps = {
  onClose?: () => void;
};

const typeNames: Record<string, string> = {
  website: "Business Website",
  ecommerce: "E-commerce Experience",
  webapp: "Web Application",
  portfolio: "Portfolio Experience",
};

const scaleNames: Record<string, string> = {
  focused: "Focused",
  growth: "Growth",
  ambitious: "Ambitious",
};

export default function HireExperience({
  onClose,
}: HireExperienceProps) {
  const [started, setStarted] = useState(false);
  const [config, setConfig] = useState<ProjectConfig | null>(null);

  const handleComplete = (project: ProjectConfig) => {
    setConfig(project);
  };

  const projectName = config
    ? typeNames[config.type] ?? "Custom Project"
    : "your next project";

  const startContact = () => {
    window.location.href = "/contact";
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020204] px-5 py-20 text-white sm:px-8 lg:px-12">
      {/* Background */}
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
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/[0.05] blur-[160px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/25 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Exit experience
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300/60" />
            Hire protocol online
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Intro */}
          {!started && !config && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-4xl py-24 text-center"
            >
              <motion.div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-violet-300/10 bg-violet-500/[0.05]"
                animate={{
                  rotateY: [0, 12, 0, -12, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <BriefcaseBusiness
                  className="h-8 w-8 text-violet-200/60"
                  strokeWidth={1}
                />
              </motion.div>

              <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.3em] text-violet-300/50">
                Collaboration protocol
              </p>

              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Have an idea?
                <br />
                <span className="text-white/20">Let's make it real.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/30">
                Instead of filling out a boring form, let's build a
                quick project profile together. A few choices and you'll
                have a starting direction.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-white/[0.07] px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-white/20">
                  <Code2 className="h-3 w-3" />
                  Code
                </span>

                <span className="flex items-center gap-2 rounded-full border border-white/[0.07] px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-white/20">
                  <Layers3 className="h-3 w-3" />
                  Architecture
                </span>

                <span className="flex items-center gap-2 rounded-full border border-white/[0.07] px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-white/20">
                  <Sparkles className="h-3 w-3" />
                  Experience
                </span>
              </div>

              <button
                type="button"
                onClick={() => setStarted(true)}
                className="group mt-12 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
              >
                <Zap className="h-3.5 w-3.5" />

                Start project builder

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <p className="mt-5 font-mono text-[8px] text-white/10">
                Takes approximately 30 seconds
              </p>
            </motion.div>
          )}

          {/* Builder */}
          {started && !config && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-4xl py-16"
            >
              <div className="mb-10">
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-violet-300/40">
                  Initializing project
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white/80 sm:text-5xl">
                  Configure your idea.
                </h2>
              </div>

              <div className="rounded-[32px] border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-10">
                <ProjectStarter onComplete={handleComplete} />
              </div>
            </motion.div>
          )}

          {/* Result */}
          {config && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16"
            >
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                    }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/10 bg-emerald-300/[0.04]"
                  >
                    <Check
                      className="h-6 w-6 text-emerald-300/60"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.3em] text-emerald-300/40">
                    Project profile generated
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white/80 sm:text-6xl">
                    Your idea has a shape.
                  </h2>
                </div>

                {/* Profile */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                      Project
                    </p>

                    <p className="mt-3 text-sm text-white/60">
                      {projectName}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                      Scale
                    </p>

                    <p className="mt-3 text-sm text-white/60">
                      {scaleNames[config.scale] ?? config.scale}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                      Mission
                    </p>

                    <p className="mt-3 text-sm text-white/60">
                      {config.goal}
                    </p>
                  </div>
                </div>

                {/* Terminal */}
                <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/30">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
                    <Terminal className="h-3.5 w-3.5 text-white/15" />

                    <span className="font-mono text-[8px] text-white/15">
                      project.profile
                    </span>
                  </div>

                  <div className="p-5 font-mono text-[9px] leading-7">
                    <p className="text-white/20">
                      &gt; project_type ={" "}
                      <span className="text-violet-300/50">
                        "{config.type}"
                      </span>
                    </p>

                    <p className="text-white/20">
                      &gt; project_scale ={" "}
                      <span className="text-violet-300/50">
                        "{config.scale}"
                      </span>
                    </p>

                    <p className="text-white/20">
                      &gt; mission ={" "}
                      <span className="text-violet-300/50">
                        "{config.goal}"
                      </span>
                    </p>

                    <p className="mt-2 text-emerald-300/50">
                      &gt; profile_ready ✓
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <HireCTA
                    projectType={projectName.toLowerCase()}
                    onStart={startContact}
                  />
                </div>

                {/* Reset */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setConfig(null);
                      setStarted(false);
                    }}
                    className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15 transition hover:text-white/40"
                  >
                    ← Start over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="border-t border-white/[0.05] py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/10">
              <Sparkles className="h-3 w-3" />
              Built for meaningful collaborations
            </div>

            <div className="flex items-center gap-2 font-mono text-[8px] text-white/10">
              <Mail className="h-3 w-3" />
              contact://faiza-noor
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}