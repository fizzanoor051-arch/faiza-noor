"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Flame,
  Gamepad2,
  Sparkles,
  Zap,
} from "lucide-react";

type MindLabIntroProps = {
  onStart: () => void;
};

export default function MindLabIntro({ onStart }: MindLabIntroProps) {
  return (
    <section className="relative min-h-[680px] overflow-hidden rounded-[32px] border border-white/10 bg-[#07070c]">
      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[130px]"
          animate={{
            x: [0, 70, 0],
            y: [0, 40, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Scanline */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 2.5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* =====================================================
          CHINESE-ANIMATION-INSPIRED ORIGINAL MASCOT
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute right-[5%] top-[7%] hidden h-[320px] w-[320px] lg:block"
        animate={{
          y: [0, -14, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Aura */}
        <div className="absolute inset-8 rounded-full bg-violet-500/10 blur-[70px]" />

        {/* Floating ring */}
        <motion.div
          className="absolute inset-5 rounded-full border border-violet-300/20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-10 rounded-full border border-cyan-300/10 border-dashed"
          animate={{ rotate: -360 }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Mascot body */}
        <div className="absolute left-1/2 top-1/2 h-36 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[45%] border border-white/15 bg-gradient-to-b from-violet-300/20 to-violet-900/20 shadow-[0_0_60px_rgba(139,92,246,0.25)] backdrop-blur-xl">
          {/* Head */}
          <div className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-[45%] border border-white/15 bg-[#171321]">
            {/* Hair */}
            <div className="absolute -top-5 left-2 h-9 w-20 rounded-full bg-gradient-to-r from-[#171321] via-violet-950 to-[#171321]" />

            {/* Eyes */}
            <div className="absolute left-5 top-10 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            <div className="absolute right-5 top-10 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />

            {/* Smile */}
            <div className="absolute bottom-5 left-1/2 h-2 w-7 -translate-x-1/2 rounded-b-full border-b border-violet-300/60" />

            {/* Mark */}
            <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border border-violet-300/50 bg-violet-400/20" />
          </div>

          {/* Robe */}
          <div className="absolute bottom-0 left-1/2 h-20 w-24 -translate-x-1/2 rounded-t-[40%] border-t border-white/10 bg-gradient-to-b from-violet-500/10 to-transparent" />

          {/* Energy core */}
          <motion.div
            className="absolute left-1/2 top-12 h-5 w-5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(103,232,249,0.8)]"
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>

        {/* Floating seals */}
        <motion.div
          className="absolute right-2 top-12 flex h-10 w-10 rotate-12 items-center justify-center border border-violet-300/20 bg-violet-400/5 text-[9px] text-violet-200/70"
          animate={{ rotate: [12, 4, 12] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          思
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-0 flex h-10 w-10 -rotate-12 items-center justify-center border border-cyan-300/20 bg-cyan-400/5 text-[9px] text-cyan-200/70"
          animate={{ rotate: [-12, -3, -12] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          心
        </motion.div>
      </motion.div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 flex min-h-[680px] items-center px-6 py-14 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-violet-300">
              <Brain className="h-3 w-3" />
              Mind Lab
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-white/35">
              <Gamepad2 className="h-3 w-3" />
              Interactive
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-3 text-[10px] uppercase tracking-[0.35em] text-violet-300/60"
          >
            Welcome to the dangerous side of the portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl"
          >
            Play with
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
              your mind.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-7 max-w-xl text-sm leading-7 text-white/40 sm:text-base"
          >
            Logic. Memory. Patterns. Debugging. Deception.
            <br />
            Your reflexes won't save you here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={onStart}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.03]"
            >
              Enter Mind Lab
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 py-3.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
              <Flame className="h-3.5 w-3.5 text-orange-300/70" />
              Danger level: Unknown
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-2"
          >
            {[
              ["06+", "Challenges"],
              ["∞", "Attempts"],
              ["???", "Secrets"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"
              >
                <p className="font-mono text-lg text-white">{value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/25">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-5 right-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/15">
        <Zap className="h-3 w-3" />
        Think before you click
      </div>
    </section>
  );
}