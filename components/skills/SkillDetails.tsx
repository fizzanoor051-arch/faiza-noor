"use client";

import type { Skill } from "./TechUniverse";

interface SkillDetailsProps {
  skill: Skill;
}

export default function SkillDetails({
  skill,
}: SkillDetailsProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#08080f] p-6 sm:p-7 lg:p-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative">
        {/* Label */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
              selected.node
            </p>

            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-cyan-300/50">
              technology.details
            </p>
          </div>

          <span className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-emerald-300/60">
              active
            </span>
          </span>
        </div>

        {/* Skill title */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-purple-300/60">
              {skill.category}
            </span>

            <span className="h-px w-8 bg-white/10" />

            <span className="font-mono text-[9px] text-white/20">
              #{skill.id}
            </span>
          </div>

          <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            {skill.name}
          </h3>
        </div>

        {/* Level */}
        <div className="mb-8 rounded-2xl border border-white/7 bg-white/[0.025] p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              proficiency
            </span>

            <span className="font-mono text-sm font-semibold text-cyan-300">
              {skill.level}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-300 transition-all duration-700"
              style={{
                width: `${skill.level}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between font-mono text-[7px] uppercase tracking-[0.15em] text-white/15">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
            overview
          </p>

          <p className="text-sm leading-7 text-white/45">
            {skill.description}
          </p>
        </div>

        {/* Technologies */}
        <div>
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
            capabilities
          </p>

          <div className="flex flex-wrap gap-2">
            {skill.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2 text-[9px] uppercase tracking-[0.1em] text-white/40 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.04] hover:text-cyan-200/70"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom system info */}
        <div className="mt-8 border-t border-white/7 pt-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
                node
              </p>

              <p className="mt-1 font-mono text-[9px] text-white/35">
                {skill.id}
              </p>
            </div>

            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
                layer
              </p>

              <p className="mt-1 font-mono text-[9px] text-white/35">
                {skill.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}