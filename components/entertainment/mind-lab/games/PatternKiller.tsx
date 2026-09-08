"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Crosshair, LockKeyhole, Sparkles } from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type Pattern = {
  sequence: number[];
  answer: number;
  rule: string;
};

const PATTERNS: Pattern[] = [
  {
    sequence: [2, 4, 8, 16, 32],
    answer: 64,
    rule: "Each number doubles.",
  },
  {
    sequence: [3, 6, 12, 24, 48],
    answer: 96,
    rule: "Each number doubles.",
  },
  {
    sequence: [1, 4, 9, 16, 25],
    answer: 36,
    rule: "Perfect squares: 1², 2², 3²...",
  },
  {
    sequence: [5, 10, 20, 40, 80],
    answer: 160,
    rule: "Each number doubles.",
  },
  {
    sequence: [2, 6, 12, 20, 30],
    answer: 42,
    rule: "n × (n + 1): 1×2, 2×3, 3×4...",
  },
];

export default function PatternKiller({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [round, setRound] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrong, setWrong] = useState(false);

  const current = PATTERNS[round];

  const options = useMemo(() => {
    const values = [
      current.answer,
      current.answer + 6,
      current.answer - 6,
      current.answer * 2,
    ];

    return [...new Set(values)].sort(() => Math.random() - 0.5);
  }, [round, current.answer]);

  const submit = (value: number) => {
    if (finished || wrong) return;

    if (value !== current.answer) {
      setWrong(true);
      onFail?.();
      return;
    }

    const nextScore = score + 100;
    setScore(nextScore);

    if (round === PATTERNS.length - 1) {
      setFinished(true);
      onComplete?.(500 + nextScore);
      return;
    }

    setInput("");
    setRound((value) => value + 1);
  };

  if (finished || wrong) {
    const success = finished;

    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-[30px] border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            {success ? (
              <Sparkles className="h-9 w-9 text-violet-300" />
            ) : (
              <LockKeyhole className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-violet-300">
            Pattern Analysis Complete
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">
            {success ? "Pattern Killer." : "The Pattern Killed You."}
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/40">
            {success
              ? "Your brain successfully detected every hidden rule."
              : "You chose a number that looked right. That's exactly how the trap works."}
          </p>

          <div className="mt-8 text-4xl font-semibold text-white">
            {score} XP
          </div>

          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            Back to Mind Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[80vh] w-full max-w-4xl px-4 py-16">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-violet-300">
        <BrainCircuit className="h-4 w-4" />
        Cognitive Weapon
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
        Pattern Killer
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
        The obvious answer is sometimes the trap. Find the actual rule.
      </p>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
          Pattern {round + 1}/{PATTERNS.length}
        </span>

        <span className="font-mono text-sm text-violet-200">
          {score} XP
        </span>
      </div>

      <motion.div
        key={round}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-6 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-10"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
          <Crosshair className="h-3.5 w-3.5" />
          Find the missing number
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {current.sequence.map((number, index) => (
            <div
              key={`${number}-${index}`}
              className="flex h-16 min-w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-4 font-mono text-xl text-white sm:h-20 sm:min-w-20 sm:text-2xl"
            >
              {number}
            </div>
          ))}

          <div className="flex h-16 min-w-16 items-center justify-center rounded-2xl border border-dashed border-violet-300/30 bg-violet-400/[0.06] px-4 font-mono text-xl text-violet-200 sm:h-20 sm:min-w-20 sm:text-2xl">
            ?
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => submit(option)}
              className="rounded-2xl border border-white/10 bg-white/[0.035] py-5 font-mono text-lg text-white/70 transition hover:-translate-y-1 hover:border-violet-300/30 hover:bg-violet-400/[0.08] hover:text-white"
            >
              {option}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.18em] text-white/20">
          Rule discovered only after solving
        </p>
      </motion.div>
    </div>
  );
}