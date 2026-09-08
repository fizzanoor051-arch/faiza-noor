"use client";

import { useState } from "react";

const facts = [
  ["ROLE", "Full-Stack Web Engineer"],
  ["FOCUS", "Modern Web Applications"],
  ["FRONTEND", "React / Next.js"],
  ["LANGUAGE", "TypeScript"],
  ["BACKEND", "Node.js / Express"],
  ["APPROACH", "Product-first Engineering"],
];

export default function IdentityCard() {
  const [active, setActive] = useState(false);

  return (
    <article
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="group relative min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-[#090910]/80 p-6 backdrop-blur-xl sm:p-8"
    >
      {/* Card glow */}
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-600/15 blur-[100px] transition-all duration-700 ${
          active ? "scale-125 opacity-100" : "scale-100 opacity-60"
        }`}
      />

      <div className="relative flex h-full flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/8 pb-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              identity.module
            </span>
          </div>

          <span className="font-mono text-[10px] text-white/20">
            FN / 001
          </span>
        </div>

        {/* Identity visual */}
        <div className="relative flex flex-1 flex-col items-center justify-center py-10">
          <div className="relative flex h-40 w-40 items-center justify-center">
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-purple-400/15" />
            <div className="absolute -inset-5 rounded-full border border-white/5" />
            <div className="absolute -inset-10 rounded-full border border-white/[0.035]" />

            {/* Orbit dot */}
            <div className="absolute -right-1 top-8 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />

            {/* Core */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-purple-300/25 bg-gradient-to-br from-purple-500/20 via-[#11111b] to-cyan-500/10 shadow-[0_0_80px_rgba(139,92,246,0.18)]">
              <div className="text-center">
                <div className="text-3xl font-semibold tracking-[-0.08em] text-white">
                  FN
                </div>
                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.25em] text-white/35">
                  engineer
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Faiza Noor
            </h3>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-purple-300/70">
              Full-Stack Web Engineer
            </p>
          </div>
        </div>

        {/* Facts */}
        <div className="rounded-2xl border border-white/7 bg-black/20">
          {facts.map(([label, value], index) => (
            <div
              key={label}
              className={`flex items-center justify-between gap-5 px-4 py-3.5 ${
                index !== facts.length - 1 ? "border-b border-white/6" : ""
              }`}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                {label}
              </span>

              <span className="text-right text-xs text-white/65">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            system identity
          </span>

          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            online
          </span>
        </div>
      </div>
    </article>
  );
}