"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Crown,
  Flame,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

type MindLabResultProps = {
  xp: number;
  level: number;
  completed: number;
  total: number;
  combo: number;
  onReplay: () => void;
  onBack: () => void;
};

export default function MindLabResult({
  xp,
  level,
  completed,
  total,
  combo,
  onReplay,
  onBack,
}: MindLabResultProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const rank =
    percentage >= 90
      ? "SYSTEM ARCHITECT"
      : percentage >= 70
        ? "MASTER THINKER"
        : percentage >= 50
          ? "TACTICAL MIND"
          : "CURIOUS HUMAN";

  return (
    <section className="relative flex min-h-[650px] items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-[#07070c] p-6 sm:p-10">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[130px]"
          animate={{
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10"
          animate={{ rotate: 360 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 border-dashed"
          animate={{ rotate: -360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Confetti particles */}
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/30"
            style={{
              left: `${(i * 43) % 100}%`,
              top: `${(i * 29) % 100}%`,
            }}
            animate={{
              y: [-10, 25, -10],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.12,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-violet-300/20 bg-violet-400/5 shadow-[0_0_70px_rgba(139,92,246,0.2)]"
        >
          <Crown className="h-9 w-9 text-violet-200" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300/70"
        >
          Cognitive clearance complete
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
        >
          {rank}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/35"
        >
          You survived the Mind Lab.
          <br />
          The system has decided you are probably dangerous.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          <ResultStat
            icon={<Sparkles className="h-4 w-4" />}
            value={String(xp)}
            label="XP"
          />

          <ResultStat
            icon={<Trophy className="h-4 w-4" />}
            value={`${percentage}%`}
            label="Clearance"
          />

          <ResultStat
            icon={<Flame className="h-4 w-4" />}
            value={`×${combo}`}
            label="Combo"
          />

          <ResultStat
            icon={<Star className="h-4 w-4" />}
            value={`L${level}`}
            label="Level"
          />
        </motion.div>

        {/* Funny system message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75 }}
          className="mx-auto mt-7 max-w-xl rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
        >
          <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/20">
            <Brain className="h-3.5 w-3.5" />
            System observation
          </div>

          <p className="mt-3 text-xs leading-6 text-white/45">
            {percentage >= 90
              ? "We checked the logs twice. Unfortunately, you are actually good at this."
              : percentage >= 60
                ? "Suspiciously competent. We recommend keeping an eye on you."
                : "Your brain survived. Your dignity may need another attempt."}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={onReplay}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-semibold text-black transition-all hover:scale-[1.03]"
          >
            <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" />
            Run it again
          </button>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-medium text-white/55 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Mind Lab
          </button>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/15">
          <Zap className="h-3 w-3" />
          The lab remembers
        </div>
      </div>
    </section>
  );
}

function ResultStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex justify-center text-violet-300/60">{icon}</div>
      <p className="mt-2 font-mono text-lg text-white">{value}</p>
      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/20">
        {label}
      </p>
    </div>
  );
}