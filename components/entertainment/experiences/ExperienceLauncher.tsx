
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Command,
  Gamepad2,
  Sparkles,
  Zap,
} from "lucide-react";

import type { ExperienceItem } from "./ExperienceCard";

type ExperienceLauncherProps = {
  experience: ExperienceItem | null;
  onClose: () => void;
};

export default function ExperienceLauncher({
  experience,
  onClose,
}: ExperienceLauncherProps) {
  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          className="fixed inset-0 z-[1200] overflow-hidden bg-[#040406]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
              style={{
                background: `radial-gradient(circle, ${experience.accent}30, transparent 65%)`,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
              }}
            />

            {/* Scanline */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-white/10"
              animate={{
                top: ["0%", "100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-white/50 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back
            </button>

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: experience.accent }}
              />
              Experience Mode
            </div>
          </div>

          {/* Main */}
          <div className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-5 pb-16">
            <motion.div
              className="w-full max-w-5xl"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
                {/* Text */}
                <div>
                  <motion.p
                    className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: experience.accent }}
                  >
                    {experience.eyebrow}
                  </motion.p>

                  <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
                    {experience.title}
                  </h1>

                  <p className="mt-7 max-w-xl text-base leading-8 text-white/40 sm:text-lg">
                    {experience.description}
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.03]"
                    >
                      Enter experience
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-6 py-3.5 text-xs font-medium text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>

                {/* 3D Object */}
                <div
                  className="relative mx-auto h-[330px] w-[330px] sm:h-[400px] sm:w-[400px]"
                  style={{ perspective: 1000 }}
                >
                  {/* Outer rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute inset-8 rounded-full border border-dashed border-white/[0.08]"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute inset-16 rounded-full border border-white/[0.06]"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />

                  {/* Core */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-[38px] border border-white/15 bg-white/[0.045] shadow-[0_0_100px_rgba(255,255,255,0.05)] backdrop-blur-xl"
                    animate={{
                      rotateX: [0, 8, 0, -8, 0],
                      rotateY: [0, -8, 0, 8, 0],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-[38px] blur-2xl"
                      style={{
                        background: `radial-gradient(circle, ${experience.accent}40, transparent 65%)`,
                      }}
                    />

                    <div className="relative flex h-full items-center justify-center">
                      <Sparkles
                        className="h-12 w-12 text-white/80"
                        strokeWidth={1}
                      />
                    </div>
                  </motion.div>

                  {/* Floating nodes */}
                  <motion.div
                    className="absolute left-4 top-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                    animate={{
                      y: [-8, 8, -8],
                      rotate: [-4, 4, -4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Gamepad2 className="h-5 w-5 text-white/45" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-16 right-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                    animate={{
                      y: [8, -8, 8],
                      rotate: [4, -4, 4],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Command className="h-5 w-5 text-white/45" />
                  </motion.div>

                  <motion.div
                    className="absolute right-12 top-8 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
                    animate={{
                      y: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className="h-4 w-4 text-white/40" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center">
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/20">
              <span className="font-mono">{experience.number}</span>
              <span className="h-px w-8 bg-white/10" />
              <span>Interactive module</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
