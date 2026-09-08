"use client";

import type { WorkflowItem } from "./EngineeringWorkflow";

type WorkflowStepProps = {
  step: WorkflowItem;
  index: number;
  active: boolean;
  onSelect: () => void;
};

export default function WorkflowStep({
  step,
  index,
  active,
  onSelect,
}: WorkflowStepProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative w-full text-left outline-none"
    >
      <div
        className={`relative flex min-h-[104px] items-center gap-4 rounded-2xl border p-4 transition-all duration-500 sm:gap-6 sm:p-5 ${
          active
            ? "border-purple-300/20 bg-purple-300/[0.045] shadow-[0_0_45px_rgba(139,92,246,0.07)]"
            : "border-white/7 bg-white/[0.018] hover:border-white/14 hover:bg-white/[0.03]"
        }`}
      >
        {/* Number node */}
        <div
          className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            active
              ? "border-purple-300/30 bg-purple-300/10 text-purple-200"
              : "border-white/8 bg-[#090910] text-white/30"
          }`}
        >
          <span className="font-mono text-[10px]">
            {step.number}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`font-mono text-[8px] uppercase tracking-[0.2em] transition-colors ${
                active ? "text-cyan-200/60" : "text-white/20"
              }`}
            >
              {step.phase}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

            <span className="hidden font-mono text-[8px] text-white/15 sm:block">
              PHASE {index + 1}
            </span>
          </div>

          <h3 className="mt-2 truncate text-sm font-medium text-white sm:text-base">
            {step.title}
          </h3>
        </div>

        {/* Arrow */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            active
              ? "border-purple-300/20 bg-purple-300/10 text-purple-200"
              : "border-white/7 text-white/15 group-hover:text-white/40"
          }`}
        >
          →
        </div>

        {/* Active line */}
        <div
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-500 ${
            active ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </div>
    </button>
  );
}