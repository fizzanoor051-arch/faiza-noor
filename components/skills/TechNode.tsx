"use client";

import type { Skill } from "./TechUniverse";

type TechNodeProps = {
  skill: Skill;
  active: boolean;
  onSelect: () => void;
};

export default function TechNode({
  skill,
  active,
  onSelect,
}: TechNodeProps) {
  const categoryClass =
    skill.category === "Frontend"
      ? "border-cyan-300/20 bg-cyan-300/5"
      : skill.category === "Backend"
        ? "border-blue-300/20 bg-blue-300/5"
        : skill.category === "Database"
          ? "border-purple-300/20 bg-purple-300/5"
          : "border-white/10 bg-white/[0.025]";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View ${skill.name} details`}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{
        left: `${skill.position.x}%`,
        top: `${skill.position.y}%`,
      }}
    >
      {/* Connection point */}
      <span
        className={`absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
          active
            ? "bg-purple-400/10 blur-2xl"
            : "bg-transparent"
        }`}
      />

      {/* Node */}
      <span
        className={`group flex min-w-[92px] flex-col items-center gap-2 rounded-2xl border px-3 py-3 backdrop-blur-md transition-all duration-300 ${
          categoryClass
        } ${
          active
            ? "scale-110 border-purple-300/40 bg-white/[0.07] shadow-[0_0_35px_rgba(139,92,246,0.18)]"
            : "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
        }`}
      >
        {/* Dot */}
        <span
          className={`relative flex h-7 w-7 items-center justify-center rounded-full border ${
            active
              ? "border-purple-300/40 bg-purple-300/10"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-all ${
              active
                ? "bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,0.9)]"
                : "bg-white/30 group-hover:bg-white/60"
            }`}
          />
        </span>

        {/* Name */}
        <span className="whitespace-nowrap text-[10px] font-medium text-white/75">
          {skill.name}
        </span>

        {/* Level */}
        <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
          {skill.level}%
        </span>
      </span>
    </button>
  );
}