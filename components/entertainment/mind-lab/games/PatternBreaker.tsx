"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  CircleDot,
  Lock,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type Puzzle = {
  sequence: string[];
  answer: string;
  rule: string;
};

const PUZZLES: Puzzle[] = [
  {
    sequence: ["A", "C", "F", "J", "O", "?"],
    answer: "U",
    rule: "The gaps increase by one letter each time: +2, +3, +4, +5, +6.",
  },
  {
    sequence: ["2", "6", "12", "20", "30", "?"],
    answer: "42",
    rule: "Multiply consecutive integers: 1×2, 2×3, 3×4, 4×5...",
  },
  {
    sequence: ["1", "11", "21", "1211", "111221", "?"],
    answer: "312211",
    rule: "Read the previous number aloud: one 1, one 2, two 1s...",
  },
  {
    sequence: ["B", "E", "J", "Q", "Z", "?"],
    answer: "K",
    rule: "Letter positions jump +3, +5, +7, +9, then +11 with wrap-around.",
  },
];

export default function PatternBreaker({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  const puzzle = PUZZLES[round];

  const options = useMemo(() => {
    const answer = puzzle.answer;

    if (round === 0) {
      return ["R", "S", "T", "U"];
    }

    if (round === 1) {
      return ["36", "40", "42", "44"];
    }

    if (round === 2) {
      return ["212211", "312211", "311221", "111321"];
    }

    return ["J", "K", "L", "M"];
  }, [round, puzzle.answer]);

  const choose = (value: string) => {
    if (selected !== null || finished || failed) return;

    setSelected(value);

    if (value !== puzzle.answer) {
      window.setTimeout(() => {
        setFailed(true);
        onFail?.();
      }, 700);

      return;
    }

    const nextScore = score + 150;
    setScore(nextScore);

    if (round === PUZZLES.length - 1) {
      window.setTimeout(() => {
        setFinished(true);
        onComplete?.(800 + nextScore);
      }, 900);
      return;
    }

    window.setTimeout(() => {
      setRound((value) => value + 1);
      setSelected(null);
    }, 1100);
  };

  if (finished || failed) {
    const success = finished;

    return (
      <div className="flex min-h-[82vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-2xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.045]">
            {success ? (
              <Sparkles className="h-9 w-9 text-violet-300" />
            ) : (
              <Lock className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Pattern Core
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {success ? "Pattern System Broken." : "Pattern Won."}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            {success
              ? "You discovered every hidden rule before the system could hide them."
              : "The pattern was designed to punish fast guesses. It worked."}
          </p>

          <div className="mt-8 font-mono text-3xl text-white">
            {score} XP
          </div>

          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-full border border-white/10 bg-white/[0.05] px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-white/55 transition hover:bg-white/10 hover:text-white"
          >
            Back to Mind Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[82vh] w-full max-w-4xl px-4 py-16">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-300">
        <BrainCircuit className="h-4 w-4" />
        Cognitive Decryption
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
        Pattern Breaker
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
        Don't predict the next value. Discover the rule generating it.
      </p>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-violet-300" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Round {round + 1}/{PUZZLES.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-violet-300" />
          <span className="font-mono text-xs text-white/50">{score} XP</span>
        </div>
      </div>

      <motion.div
        key={round}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.025] p-6 sm:p-10"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
          <CircleDot className="h-3.5 w-3.5" />
          Sequence detected
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {puzzle.sequence.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 }}
              className={`flex min-h-16 min-w-16 items-center justify-center rounded-2xl border px-4 font-mono text-lg ${
                item === "?"
                  ? "border-dashed border-violet-300/30 bg-violet-500/[0.06] text-violet-200"
                  : "border-white/10 bg-black/20 text-white/65"
              }`}
            >
              {item}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              className={`rounded-2xl border p-5 font-mono text-sm transition ${
                selected === option
                  ? option === puzzle.answer
                    ? "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-200"
                    : "border-red-400/30 bg-red-400/[0.08] text-red-200"
                  : "border-white/10 bg-black/20 text-white/55 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-violet-500/[0.07] hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-[9px] uppercase tracking-[0.2em] text-white/15">
          The rule reveals itself after correct analysis
        </p>
      </motion.div>
    </div>
  );
}