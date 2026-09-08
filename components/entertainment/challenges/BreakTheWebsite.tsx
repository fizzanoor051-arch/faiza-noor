
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bug,
  Cpu,
  MousePointer2,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { useState } from "react";

import ChallengeResult from "./ChallengeResult";
import GlitchExperience from "./GlitchExperience";

export default function BreakTheWebsite() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startChallenge = () => {
    setStarted(true);
  };

  const finishChallenge = () => {
    setCompleted(true);
  };

  const resetChallenge = () => {
    setStarted(false);
    setCompleted(false);
  };

  return (
    <section
      id="break-the-website"
      className="relative min-h-screen overflow-hidden bg-[#030305] px-5 py-28 text-white sm:px-8 lg:px-12"
    >
      {/* Ambient atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.06] blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        {!started && !completed && (
          <motion.div
            key="intro"
            className="relative mx-auto flex min-h-[75vh] max-w-6xl flex-col items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/15 bg-red-500/[0.04] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>

              <span className="text-[9px] uppercase tracking-[0.28em] text-red-300/70">
                Security Challenge / Active
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Think you can
              <br />
              <span className="text-red-500">break it?</span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/35 sm:text-base">
              Most portfolios ask you to look at their work. Mine gives you
              permission to attack it.
            </p>

            {/* System cards */}
            <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: Bug,
                  label: "Stress Test",
                },
                {
                  icon: Cpu,
                  label: "Runtime",
                },
                {
                  icon: Zap,
                  label: "Performance",
                },
                {
                  icon: ShieldCheck,
                  label: "Recovery",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Icon className="mx-auto h-5 w-5 text-white/30" />

                    <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-white/25">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.button
              type="button"
              onClick={startChallenge}
              className="group relative mt-12 overflow-hidden rounded-full border border-red-500/30 bg-red-500/[0.08] px-8 py-4"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <span className="absolute inset-0 -translate-x-full bg-red-500/10 transition-transform duration-500 group-hover:translate-x-0" />

              <span className="relative flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                <MousePointer2 className="h-4 w-4" />
                Accept the challenge
              </span>
            </motion.button>

            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] text-white/15">
              <Terminal className="h-3 w-3" />
              <span>challenge://break-website</span>
            </div>
          </motion.div>
        )}

        {started && !completed && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlitchExperience onComplete={finishChallenge} />
          </motion.div>
        )}

        {completed && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChallengeResult onRetry={resetChallenge} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom label */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/10">
          Interactive System / 01
        </p>
      </div>
    </section>
  );
}
