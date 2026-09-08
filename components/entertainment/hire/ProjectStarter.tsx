"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe,
  Layers3,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export type ProjectConfig = {
  type: string;
  scale: string;
  goal: string;
};

type ProjectStarterProps = {
  onComplete: (config: ProjectConfig) => void;
};

const projectTypes = [
  {
    id: "website",
    title: "Business Website",
    description: "A premium website for a company or brand.",
    icon: Building2,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "A complete online store and shopping experience.",
    icon: ShoppingBag,
  },
  {
    id: "webapp",
    title: "Web Application",
    description: "A custom application with real functionality.",
    icon: Layers3,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "A distinctive personal or professional portfolio.",
    icon: BriefcaseBusiness,
  },
];

const projectScales = [
  {
    id: "focused",
    title: "Focused",
    description: "A polished project with a clear scope.",
    icon: Smartphone,
  },
  {
    id: "growth",
    title: "Growth",
    description: "A larger experience built to evolve.",
    icon: Globe,
  },
  {
    id: "ambitious",
    title: "Ambitious",
    description: "Complex, custom and highly interactive.",
    icon: Rocket,
  },
];

const projectGoals = [
  "Launch something new",
  "Improve an existing website",
  "Build a business idea",
  "Create a unique experience",
];

export default function ProjectStarter({
  onComplete,
}: ProjectStarterProps) {
  const [step, setStep] = useState(0);

  const [config, setConfig] = useState<ProjectConfig>({
    type: "",
    scale: "",
    goal: "",
  });

  const canContinue =
    step === 0
      ? Boolean(config.type)
      : step === 1
        ? Boolean(config.scale)
        : Boolean(config.goal);

  const next = () => {
    if (!canContinue) return;

    if (step < 2) {
      setStep((value) => value + 1);
    } else {
      onComplete(config);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep((value) => value - 1);
    }
  };

  return (
    <div className="relative">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/15">
            Project configurator
          </p>

          <p className="mt-2 text-xs text-white/30">
            Step {step + 1} of 3
          </p>
        </div>

        <div className="flex gap-1.5">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="h-1 rounded-full"
              animate={{
                width: item <= step ? 32 : 14,
                opacity: item <= step ? 0.7 : 0.2,
              }}
              style={{
                background:
                  item <= step
                    ? "rgba(196,181,253,0.7)"
                    : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Step 1 */}
        {step === 0 && (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-violet-300/60" />

                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
                  First question
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/80 sm:text-4xl">
                What are we building?
              </h3>

              <p className="mt-3 text-sm text-white/25">
                Pick the closest match. We can customize everything later.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {projectTypes.map((item) => {
                const Icon = item.icon;
                const selected = config.type === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setConfig((value) => ({
                        ...value,
                        type: item.id,
                      }))
                    }
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-violet-300/20 bg-violet-500/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-black/20">
                        <Icon
                          className={`h-4 w-4 ${
                            selected
                              ? "text-violet-200/70"
                              : "text-white/25"
                          }`}
                          strokeWidth={1.4}
                        />
                      </div>

                      {selected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-300/10">
                          <Check className="h-3 w-3 text-violet-200/70" />
                        </span>
                      )}
                    </div>

                    <h4 className="mt-5 text-sm text-white/65">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-white/20">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <Layers3 className="h-4 w-4 text-violet-300/60" />

                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
                  Project scale
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/80 sm:text-4xl">
                How ambitious is it?
              </h3>

              <p className="mt-3 text-sm text-white/25">
                There is no wrong answer. This just helps shape the
                starting point.
              </p>
            </div>

            <div className="grid gap-3">
              {projectScales.map((item) => {
                const Icon = item.icon;
                const selected = config.scale === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setConfig((value) => ({
                        ...value,
                        scale: item.id,
                      }))
                    }
                    className={`group flex items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-violet-300/20 bg-violet-500/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-black/20">
                      <Icon
                        className={`h-5 w-5 ${
                          selected
                            ? "text-violet-200/70"
                            : "text-white/25"
                        }`}
                        strokeWidth={1.3}
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm text-white/65">
                        {item.title}
                      </h4>

                      <p className="mt-1.5 text-xs text-white/20">
                        {item.description}
                      </p>
                    </div>

                    {selected && (
                      <Check className="h-4 w-4 text-violet-200/70" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <Rocket className="h-4 w-4 text-violet-300/60" />

                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
                  Mission
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/80 sm:text-4xl">
                What should it achieve?
              </h3>

              <p className="mt-3 text-sm text-white/25">
                Choose the outcome that matters most.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {projectGoals.map((goal) => {
                const selected = config.goal === goal;

                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() =>
                      setConfig((value) => ({
                        ...value,
                        goal,
                      }))
                    }
                    className={`flex min-h-[100px] items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-violet-300/20 bg-violet-500/[0.08]"
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
                    }`}
                  >
                    <span className="max-w-[220px] text-sm text-white/55">
                      {goal}
                    </span>

                    {selected && (
                      <Check className="h-4 w-4 shrink-0 text-violet-200/70" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] transition ${
            step === 0
              ? "pointer-events-none text-white/10"
              : "text-white/30 hover:text-white"
          }`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!canContinue}
          className={`group flex items-center gap-3 rounded-full px-6 py-3 text-[9px] uppercase tracking-[0.18em] transition-all ${
            canContinue
              ? "bg-white text-black hover:bg-white/90"
              : "cursor-not-allowed bg-white/[0.05] text-white/15"
          }`}
        >
          {step === 2 ? "Create project brief" : "Continue"}

          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}