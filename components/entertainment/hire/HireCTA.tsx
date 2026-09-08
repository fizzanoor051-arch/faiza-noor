"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Sparkles,
  Zap,
} from "lucide-react";

type HireCTAProps = {
  projectType?: string;
  onStart?: () => void;
};

export default function HireCTA({
  projectType = "your next project",
  onStart,
}: HireCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.025] p-8 text-white backdrop-blur-xl sm:p-12"
    >
      {/* Glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/10 bg-violet-500/[0.06]"
          animate={{
            rotateY: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            className="h-6 w-6 text-violet-200/60"
            strokeWidth={1.2}
          />
        </motion.div>

        <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.3em] text-violet-300/50">
          Ready to build
        </p>

        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
          Let's build
          <br />
          <span className="text-white/20">{projectType}.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/30">
          You bring the idea. I bring the design, code, architecture
          and attention to detail needed to turn it into a real product.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            "Custom UI",
            "Responsive",
            "Modern Stack",
            "Performance",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/25"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-300/40" />
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white/90"
          >
            <Zap className="h-3.5 w-3.5" />

            Start a project

            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/contact";
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-white/40 transition-all duration-300 hover:border-white/20 hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />

            Contact me
          </button>
        </div>
      </div>
    </motion.div>
  );
}