"use client";

import type { ArchitectureLayer } from "./SystemArchitecture";

type ArchitectureNodeProps = {
  layer: ArchitectureLayer;
  active: boolean;
  index: number;
  onSelect: () => void;
};

export default function ArchitectureNode({
  layer,
  active,
  index,
  onSelect,
}: ArchitectureNodeProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Select ${layer.title} architecture layer`}
      className={`group relative w-full text-left transition-all duration-500 ${
        active ? "scale-[1.015]" : "hover:scale-[1.005]"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:p-6 ${
          active
            ? "border-purple-300/25 bg-purple-300/[0.055] shadow-[0_0_60px_rgba(139,92,246,0.1)]"
            : "border-white/8 bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.035]"
        }`}
      >
        {/* Active glow */}
        <div
          className={`pointer-events-none absolute left-0 top-0 h-full w-1 transition-all duration-500 ${
            active
              ? "bg-gradient-to-b from-purple-300 via-cyan-300 to-transparent"
              : "bg-transparent"
          }`}
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Number */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-xs transition-all duration-300 ${
              active
                ? "border-purple-300/25 bg-purple-300/10 text-purple-200"
                : "border-white/8 bg-white/[0.025] text-white/30"
            }`}
          >
            {layer.number}
          </div>

          {/* Main */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.24em] transition-colors ${
                  active ? "text-cyan-200/70" : "text-white/25"
                }`}
              >
                {layer.label}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/15" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                layer {index + 1}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-medium text-white">
              {layer.title}
            </h3>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 sm:max-w-[310px] sm:justify-end">
            {layer.technologies.map((technology) => (
              <span
                key={technology}
                className={`rounded-lg border px-2.5 py-1.5 text-[9px] transition-colors ${
                  active
                    ? "border-white/10 bg-white/[0.035] text-white/55"
                    : "border-white/6 bg-white/[0.018] text-white/25"
                }`}
              >
                {technology}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:flex ${
              active
                ? "border-purple-300/20 bg-purple-300/10 text-purple-200"
                : "border-white/7 text-white/20"
            }`}
          >
            →
          </div>
        </div>

        {/* Bottom status */}
        <div className="relative mt-5 flex items-center justify-between border-t border-white/6 pt-4">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
            architecture.node
          </span>

          <span
            className={`font-mono text-[8px] uppercase tracking-[0.18em] transition-colors ${
              active ? "text-emerald-300/60" : "text-white/20"
            }`}
          >
            {active ? "● connected" : "○ idle"}
          </span>
        </div>

        {/* Hover line */}
        <div
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-700 ${
            active ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </div>
    </button>
  );
}