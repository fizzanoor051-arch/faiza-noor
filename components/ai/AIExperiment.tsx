"use client";

type AIExperimentData = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
};

interface AIExperimentProps {
  experiment: AIExperimentData;
}

export default function AIExperiment({
  experiment,
}: AIExperimentProps) {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
          ai-lab/{experiment.id}
        </span>
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Number + category */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-purple-400/20 bg-purple-400/5 px-3 py-1 font-mono text-xs text-purple-300">
            EXP.{experiment.number}
          </span>

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            {experiment.category}
          </span>

          <span className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-300/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {experiment.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-8 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {experiment.title}
        </h3>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
          {experiment.description}
        </p>

        {/* Visualization */}
        <div className="relative my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#080812] p-6">
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(168,85,247,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,.25) 1px, transparent 1px)",
                backgroundSize: "35px 35px",
              }}
            />
          </div>

          <div className="relative flex min-h-[190px] items-center justify-center">
            {/* Outer rings */}
            <div className="absolute h-40 w-40 rounded-full border border-purple-400/10" />
            <div className="absolute h-28 w-28 rounded-full border border-cyan-400/10" />
            <div className="absolute h-20 w-20 rounded-full border border-purple-400/20" />

            {/* Connection nodes */}
            <div className="absolute left-[22%] top-[25%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,.8)]" />
            <div className="absolute right-[22%] top-[32%] h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_15px_rgba(192,132,252,.8)]" />
            <div className="absolute bottom-[20%] left-[30%] h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_15px_rgba(147,197,253,.8)]" />
            <div className="absolute bottom-[22%] right-[30%] h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_15px_rgba(192,132,252,.8)]" />

            {/* Core */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-300/30 bg-purple-500/10 shadow-[0_0_50px_rgba(168,85,247,.15)]">
              <span className="font-mono text-sm font-semibold text-purple-200">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Stack */}
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
            Technology Layer
          </p>

          <div className="flex flex-wrap gap-2">
            {experiment.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-xs text-white/55"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] leading-5 text-white/25">
            // AI is treated as a tool for experimentation and product
            engineering — not a replacement for thoughtful human decisions.
          </p>
        </div>
      </div>
    </div>
  );
}