"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  DoorOpen,
  Eye,
  KeyRound,
  Lock,
  Skull,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type Door = {
  id: number;
  symbol: string;
  label: string;
  correct: boolean;
  trap?: string;
};

const DOORS: Door[] = [
  {
    id: 1,
    symbol: "◈",
    label: "THE OBVIOUS DOOR",
    correct: false,
    trap: "You chose the door that everyone chooses.",
  },
  {
    id: 2,
    symbol: "△",
    label: "THE SILENT DOOR",
    correct: true,
  },
  {
    id: 3,
    symbol: "◉",
    label: "THE WATCHING DOOR",
    correct: false,
    trap: "The door was watching your choice before you made it.",
  },
  {
    id: 4,
    symbol: "∞",
    label: "THE ENDLESS DOOR",
    correct: false,
    trap: "You entered an infinite loop. Fortunately, we pulled you out.",
  },
];

export default function ImpossibleDoor({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"search" | "opened" | "failed">("search");
  const [attempts, setAttempts] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);

  const remaining = useMemo(() => Math.max(3 - attempts, 0), [attempts]);

  useEffect(() => {
    if (phase !== "opened") return;

    const timer = window.setTimeout(() => {
      onComplete?.(1200);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [phase, onComplete]);

  const chooseDoor = (door: Door) => {
    if (phase !== "search") return;

    setSelected(door.id);

    if (door.correct) {
      setPhase("opened");
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (nextAttempts >= 3) {
      setPhase("failed");
      onFail?.();
    } else {
      window.setTimeout(() => {
        setSelected(null);
      }, 650);
    }
  };

  const revealHint = () => {
    setHintLevel((value) => Math.min(value + 1, 2));
  };

  if (phase === "opened") {
    return (
      <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden px-4 py-16">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-2xl text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-300/20 bg-violet-500/10"
          >
            <DoorOpen className="h-10 w-10 text-violet-200" />
          </motion.div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Impossible Door
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">
            You Found It.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
            The correct door was never the most attractive one. You actually
            looked for the pattern.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3">
            <Sparkles className="h-4 w-4 text-violet-300" />
            <span className="font-mono text-xs text-white/60">
              +1200 XP
            </span>
          </div>

          <div>
            <button
              type="button"
              onClick={onExit}
              className="mt-8 rounded-full border border-white/10 bg-white/[0.05] px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              Back to Mind Lab
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (phase === "failed") {
    return (
      <div className="flex min-h-[82vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl rounded-[30px] border border-red-300/10 bg-red-400/[0.025] p-8 text-center backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-300/10 bg-red-400/[0.05]">
            <Skull className="h-9 w-9 text-red-300" />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-red-300/70">
            Door Protocol Failed
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">
            The Door Won.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/40">
            Three attempts. Zero excuses. The correct door was waiting for
            someone patient enough to notice the pattern.
          </p>

          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            Return to Mind Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[82vh] w-full max-w-5xl px-4 py-16">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-violet-300">
        <Lock className="h-4 w-4" />
        Restricted Cognitive Chamber
      </div>

      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-white sm:text-5xl">
            The Impossible Door
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Four doors. One exit. The obvious answer is probably wrong.
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-xs text-white/40">
          ATTEMPTS LEFT: {remaining}
        </div>
      </div>

      <div className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-10">
        <div className="flex items-start gap-4">
          <Eye className="mt-1 h-5 w-5 shrink-0 text-violet-300" />

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              System observation
            </p>

            <p className="mt-3 text-sm leading-7 text-white/55">
              “The correct door does not lie, does not speak, and does not try
              to impress you.”
            </p>
          </div>
        </div>

        {hintLevel > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-5 rounded-2xl border border-violet-300/10 bg-violet-400/[0.04] p-4 text-xs leading-6 text-violet-100/60"
          >
            {hintLevel === 1
              ? "Hint 01: Look at what the doors are NOT doing."
              : "Hint 02: Silence is information. The correct door has no persuasive label."}
          </motion.div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {DOORS.map((door) => {
            const isSelected = selected === door.id;

            return (
              <motion.button
                key={door.id}
                type="button"
                onClick={() => chooseDoor(door)}
                animate={
                  isSelected && !door.correct
                    ? { x: [0, -8, 8, -5, 5, 0] }
                    : undefined
                }
                className="group relative min-h-52 overflow-hidden rounded-[26px] border border-white/10 bg-black/25 p-7 text-left transition hover:-translate-y-1 hover:border-violet-300/25 hover:bg-white/[0.045]"
              >
                <div className="absolute right-5 top-5 font-mono text-[10px] text-white/15">
                  0{door.id}
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-white/60 transition group-hover:border-violet-300/20 group-hover:text-violet-200">
                  {door.symbol}
                </div>

                <h3 className="mt-7 text-sm font-semibold tracking-wide text-white">
                  {door.label}
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/30">
                  {door.correct
                    ? "No promises. No persuasion."
                    : door.trap}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/20">
            <TriangleAlert className="h-3.5 w-3.5" />
            Choose carefully
          </div>

          <button
            type="button"
            onClick={revealHint}
            disabled={hintLevel >= 2}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-white/40 transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
          >
            <KeyRound className="h-3.5 w-3.5" />
            Reveal Hint
          </button>
        </div>
      </div>
    </div>
  );
}