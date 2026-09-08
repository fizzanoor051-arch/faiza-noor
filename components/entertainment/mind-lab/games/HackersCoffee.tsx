"use client";

import { motion } from "framer-motion";
import {
  Bug,
  Check,
  Coffee,
  Code2,
  Flame,
  RotateCcw,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

type HackersCoffeeProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

const bugs = [
  {
    id: 1,
    code: "const cups = 3;",
    explanation: "Nothing suspicious here.",
    correct: false,
  },
  {
    id: 2,
    code: "cups--;",
    explanation: "The developer drank one. Acceptable behavior.",
    correct: false,
  },
  {
    id: 3,
    code: "console.log(coffee.cup);",
    explanation: "The object contains `cups`, not `cup`.",
    correct: true,
  },
  {
    id: 4,
    code: "temperature: 94",
    explanation: "Perfect coffee temperature. Probably.",
    correct: false,
  },
];

export default function HackersCoffee({
  onComplete,
  onFail,
  onExit,
}: HackersCoffeeProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [fixed, setFixed] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const chooseBug = (id: number) => {
    if (fixed) return;

    const bug = bugs.find((item) => item.id === id);

    setSelected(id);
    setAttempts((value) => value + 1);

    if (bug?.correct) {
      setTimeout(() => {
        setFixed(true);
        onComplete?.(250);
      }, 700);
    } else {
      onFail?.();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08090d]">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-500/5 blur-[110px]" />

      <div className="relative p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/15 bg-orange-300/[0.04]">
              <Coffee className="h-5 w-5 text-orange-200/80" />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-orange-200/50">
                Emergency Debugging
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Hacker&apos;s Coffee
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/20">
            <Flame className="h-3.5 w-3.5 text-orange-300/60" />
            Coffee critical
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/50">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/40" />

            <span className="ml-2 font-mono text-[9px] text-white/20">
              coffee-system.log
            </span>
          </div>

          <div className="p-5 font-mono text-xs leading-7">
            <p className="text-emerald-300/60">
              $ npm run coffee
            </p>

            <p className="text-white/30">
              Starting caffeine engine...
            </p>

            <p className="text-white/30">
              Loading developer...
            </p>

            <p className="text-rose-300/70">
              ERROR: coffee-system crashed.
            </p>

            <p className="mt-2 text-white/20">
              &gt; Find the line responsible.
            </p>
          </div>
        </div>

        {/* Code */}
        <div className="mt-6 space-y-2">
          {bugs.map((bug) => {
            const active = selected === bug.id;
            const correct = active && bug.correct;
            const wrong = active && !bug.correct;

            return (
              <motion.button
                key={bug.id}
                type="button"
                disabled={fixed}
                onClick={() => chooseBug(bug.id)}
                whileHover={!fixed ? { x: 4 } : {}}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                  correct
                    ? "border-emerald-300/20 bg-emerald-300/[0.04]"
                    : wrong
                      ? "border-rose-300/15 bg-rose-300/[0.03]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-orange-300/15"
                }`}
              >
                <span className="mt-0.5 font-mono text-[10px] text-white/20">
                  {String(bug.id).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-white/65">
                    {bug.code}
                  </p>

                  {active && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-2 text-[10px] leading-5 ${
                        bug.correct
                          ? "text-emerald-300/60"
                          : "text-rose-300/50"
                      }`}
                    >
                      {bug.explanation}
                    </motion.p>
                  )}
                </div>

                {correct && (
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" />
                )}

                {wrong && (
                  <X className="h-4 w-4 shrink-0 text-rose-300" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Result */}
        {fixed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.03] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20">
                <Coffee className="h-4 w-4 text-emerald-300" />
              </div>

              <div>
                <p className="text-xs font-medium text-emerald-300">
                  COFFEE RESTORED
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  The developer may continue existing.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/15">
            <Bug className="h-3 w-3" />
            Attempts: {attempts}
          </div>

          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="text-[9px] uppercase tracking-[0.18em] text-white/25 hover:text-white/60"
            >
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}