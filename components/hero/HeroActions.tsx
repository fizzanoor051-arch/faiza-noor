
"use client";

export default function HeroActions() {
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <a
        href="#projects"
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-violet-300/30 bg-violet-500/15 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-100 transition-all duration-300 hover:border-violet-200/60 hover:bg-violet-500/25"
      >
        <span className="relative z-10">Explore My Work</span>

        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative z-10 ml-3 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>

      <a
        href="#contact"
        className="group inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
      >
        <span>Let's Build</span>

        <span className="ml-3 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-300">
          ↗
        </span>
      </a>

      <a
        href="/resume"
        className="group inline-flex h-12 items-center justify-center rounded-full px-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white"
      >
        Resume
        <span className="ml-2 transition-transform duration-300 group-hover:translate-y-0.5">
          ↓
        </span>
      </a>
    </div>
  );
}
