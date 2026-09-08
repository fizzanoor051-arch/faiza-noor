"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  Grid3X3,
  Lock,
  Scan,
  Sparkles,
  Target,
  TimerReset,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type Cell = {
  id: number;
  active: boolean;
};

const SIZE = 4;
const TOTAL = SIZE * SIZE;

function createPattern(count: number): number[] {
  const values = Array.from({ length: TOTAL }, (_, index) => index);

  return values
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .sort((a, b) => a - b);
}

export default function MemoryMatrix({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<number[]>(() => createPattern(4));
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(3);

  const targetCount = Math.min(3 + level, 8);

  useEffect(() => {
    setPattern(createPattern(targetCount));
    setSelected([]);
    setVisible(true);
    setTime(Math.max(2, 4 - level));

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, Math.max(2, 4 - level) * 1000);

    return () => window.clearTimeout(timer);
  }, [level, targetCount]);

  useEffect(() => {
    if (!visible || complete || failed) return;

    const interval = window.setInterval(() => {
      setTime((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [visible, complete, failed]);

  const cells = useMemo<Cell[]>(
    () =>
      Array.from({ length: TOTAL }, (_, id) => ({
        id,
        active: pattern.includes(id),
      })),
    [pattern]
  );

  const choose = (id: number) => {
    if (visible || complete || failed) return;
    if (selected.includes(id)) return;

    if (!pattern.includes(id)) {
      setMistakes((value) => value + 1);
      setFailed(true);
      onFail?.();
      return;
    }

    const next = [...selected, id];
    setSelected(next);

    if (next.length === pattern.length) {
      if (level >= 4) {
        setComplete(true);
        onComplete?.(1100 + level * 250);
      } else {
        setLevel((value) => value + 1);
      }
    }
  };

  const restart = () => {
    setLevel(1);
    setPattern(createPattern(4));
    setSelected([]);
    setVisible(true);
    setTime(3);
    setMistakes(0);
    setComplete(false);
    setFailed(false);
  };

  if (complete || failed) {
    const success = complete;

    return (
      <div className="relative flex min-h-[84vh] items-center justify-center overflow-hidden px-4 py-16">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`pointer-events-none absolute h-96 w-96 rounded-full blur-[120px] ${
            success ? "bg-violet-500" : "bg-red-500"
          }`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#09090d]/95 p-8 text-center backdrop-blur-2xl sm:p-12"
        >
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border ${
              success
                ? "border-violet-300/20 bg-violet-500/10"
                : "border-red-300/20 bg-red-500/10"
            }`}
          >
            {success ? (
              <Brain className="h-9 w-9 text-violet-200" />
            ) : (
              <Lock className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Memory Matrix
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {success ? "Memory Core Unlocked." : "Matrix Breached."}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            {success
              ? "Your visual memory survived four increasingly hostile levels."
              : "One wrong tile was enough to trigger the security response."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[9px] uppercase tracking-widest text-white/20">
                Level
              </p>
              <p className="mt-2 font-mono text-2xl text-white">
                {level}/4
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[9px] uppercase tracking-widest text-white/20">
                Mistakes
              </p>
              <p className="mt-2 font-mono text-2xl text-white">{mistakes}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {!success && (
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
              >
                <TimerReset className="h-3.5 w-3.5" />
                Rebuild Matrix
              </button>
            )}

            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-white/10 bg-white/[0.05] px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              Back to Mind Lab
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[84vh] w-full max-w-4xl px-4 py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-300">
            <Scan className="h-4 w-4" />
            Visual Cognition
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Memory Matrix
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Memorize the glowing cells. Then reconstruct the pattern from
            memory.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
            <Target className="h-3.5 w-3.5 text-violet-300" />
            <span className="font-mono text-xs text-white/50">
              LEVEL {level}
            </span>
          </div>

          {visible && (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
              <Eye className="h-3.5 w-3.5 text-violet-300" />
              <span className="font-mono text-xs text-white/50">
                {time}s
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.025] p-5 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Grid3X3 className="h-4 w-4 text-violet-300" />

            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
              {visible ? "Memorize" : "Reconstruct"}
            </p>
          </div>

          <p className="font-mono text-[10px] text-white/20">
            {selected.length}/{pattern.length}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-2 sm:gap-3">
          {cells.map((cell) => {
            const isSelected = selected.includes(cell.id);
            const glowing = visible && cell.active;

            return (
              <motion.button
                key={cell.id}
                type="button"
                onClick={() => choose(cell.id)}
                animate={
                  glowing
                    ? {
                        scale: [1, 1.04, 1],
                        opacity: [0.7, 1, 0.7],
                      }
                    : undefined
                }
                transition={{
                  duration: 1,
                  repeat: glowing ? Infinity : 0,
                }}
                className={`aspect-square rounded-xl border transition sm:rounded-2xl ${
                  glowing
                    ? "border-violet-300/40 bg-violet-400/25 shadow-[0_0_35px_rgba(139,92,246,0.18)]"
                    : isSelected
                      ? "border-violet-300/30 bg-violet-500/15"
                      : "border-white/[0.07] bg-black/20 hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`mx-auto block h-1.5 w-1.5 rounded-full transition ${
                    glowing || isSelected
                      ? "bg-violet-200"
                      : "bg-white/5"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/15">
          <Sparkles className="h-3 w-3" />
          Level {level} • {targetCount} cells to remember
        </div>
      </div>
    </div>
  );
}