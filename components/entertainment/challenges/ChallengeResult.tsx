
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

type ChallengeResultProps = {
  onRetry: () => void;
};

export default function ChallengeResult({
  onRetry,
}: ChallengeResultProps) {
  return (
    <div className="relative mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
      {/* Success glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.07] blur-[130px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-full text-center">
        {/* Success icon */}
        <motion.div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-emerald-400/20 bg-emerald-400/[0.06]"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 14,
          }}
        >
          <ShieldCheck className="h-9 w-9 text-emerald-300" />
        </motion.div>

        {/* Status */}
        <motion.div
          className="mt-7 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-300/60">
            System recovered
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          Nice try.
          <br />
          <span className="text-white/25">You didn&apos;t break it.</span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/35 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          The attack simulation completed successfully. The interface
          recovered automatically and all systems are back online.
        </motion.p>

        {/* Results */}
        <motion.div
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            {
              icon: Check,
              value: "100%",
              label: "Recovery",
            },
            {
              icon: Zap,
              value: "0",
              label: "Downtime",
            },
            {
              icon: Code2,
              value: "∞",
              label: "Scalability",
            },
            {
              icon: ShieldCheck,
              value: "OK",
              label: "System",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
              >
                <Icon className="mx-auto h-4 w-4 text-emerald-300/60" />

                <p className="mt-3 font-mono text-lg text-white/70">
                  {item.value}
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/20">
                  {item.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Technical note */}
        <motion.div
          className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Terminal className="h-4 w-4 text-white/20" />

          <p className="font-mono text-[9px] leading-5 text-white/25">
            resilience.protocol ={" "}
            <span className="text-emerald-300/60">"active"</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <button
            type="button"
            onClick={onRetry}
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-xs font-medium text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
            Try again
          </button>

          <button
            type="button"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.03]"
          >
            <Sparkles className="h-4 w-4" />
            Explore the real work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
