"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Check,
  ChevronRight,
  KeyRound,
  Lightbulb,
  Lock,
  Shield,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type LogicPuzzle = {
  id: number;
  title: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const PUZZLES: LogicPuzzle[] = [
  {
    id: 1,
    title: "THE THREE BOXES",
    question:
      "Three boxes are labelled APPLES, ORANGES and MIXED. Every label is wrong. You may take one fruit from one box. Which box should you choose?",
    options: ["APPLES", "ORANGES", "MIXED", "It doesn't matter"],
    answer: 2,
    explanation:
      "Pick the MIXED box. Since every label is wrong, that box cannot actually be mixed. One fruit reveals its real identity, allowing the other two boxes to be solved.",
  },
  {
    id: 2,
    title: "THE CLOCK TRAP",
    question:
      "A clock shows 3:15. What is the smaller angle between the hour and minute hands?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    answer: 1,
    explanation:
      "The minute hand is at 90°. The hour hand has moved 7.5° past 3 because 15 minutes have passed.",
  },
  {
    id: 3,
    title: "THE SWITCH ROOM",
    question:
      "You have three switches outside a room and one bulb inside. You can enter the room only once. How do you identify the correct switch?",
    options: [
      "Turn all switches on",
      "Turn one on and enter immediately",
      "Turn one on, wait, turn it off, turn another on, then enter",
      "Impossible",
    ],
    answer: 2,
    explanation:
      "Use heat as the second signal. The bulb that is on belongs to the second switch; the warm but off bulb belongs to the first.",
  },
  {
    id: 4,
    title: "THE NUMBER GATE",
    question:
      "If 2 + 3 = 10, 3 + 4 = 21, and 4 + 5 = 36, what does 5 + 6 equal?",
    options: ["45", "50", "55", "60"],
    answer: 2,
    explanation:
      "The pattern is a × (a + b): 2×5=10, 3×7=21, 4×9=36, therefore 5×11=55.",
  },
];

export default function LogicVault({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [question, setQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [failed, setFailed] = useState(false);
  const [complete, setComplete] = useState(false);

  const puzzle = PUZZLES[question];

  const progress = useMemo(
    () => ((question + (selected !== null ? 1 : 0)) / PUZZLES.length) * 100,
    [question, selected]
  );

  const choose = (index: number) => {
    if (selected !== null || failed || complete) return;

    setSelected(index);

    if (index !== puzzle.answer) {
      window.setTimeout(() => {
        setFailed(true);
        onFail?.();
      }, 800);

      return;
    }

    const nextScore = score + 250;
    setScore(nextScore);

    if (question === PUZZLES.length - 1) {
      window.setTimeout(() => {
        setComplete(true);
        onComplete?.(1200 + nextScore);
      }, 1000);

      return;
    }

    window.setTimeout(() => {
      setQuestion((value) => value + 1);
      setSelected(null);
    }, 1400);
  };

  const restart = () => {
    setQuestion(0);
    setSelected(null);
    setScore(0);
    setFailed(false);
    setComplete(false);
  };

  if (complete || failed) {
    const success = complete;

    return (
      <div className="relative flex min-h-[84vh] items-center justify-center overflow-hidden px-4 py-16">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`pointer-events-none absolute h-[450px] w-[450px] rounded-full blur-[140px] ${
            success ? "bg-violet-500" : "bg-red-500"
          }`}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-2xl rounded-[34px] border border-white/10 bg-[#09090d]/95 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12"
        >
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border ${
              success
                ? "border-violet-300/20 bg-violet-500/10"
                : "border-red-300/20 bg-red-500/10"
            }`}
          >
            {success ? (
              <KeyRound className="h-9 w-9 text-violet-200" />
            ) : (
              <X className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Cognitive Vault
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {success ? "Vault Opened." : "Vault Rejected You."}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            {success
              ? "Four logic gates cleared. Your reasoning survived the vault."
              : "One wrong assumption was enough to trigger the vault's defense system."}
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Cognitive Score
            </p>

            <p className="mt-2 font-mono text-3xl text-white">
              {score} XP
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {!success && (
              <button
                type="button"
                onClick={restart}
                className="rounded-full border border-violet-300/20 bg-violet-500/10 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
              >
                Re-enter Vault
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
    <div className="mx-auto min-h-[84vh] w-full max-w-5xl px-4 py-16">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-300">
            <Brain className="h-4 w-4" />
            Advanced Reasoning
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Logic Vault
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            Four gates. No guessing. The vault rewards people who question
            their first assumption.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
          <Zap className="h-3.5 w-3.5 text-violet-300" />
          <span className="font-mono text-xs text-white/50">
            {score} XP
          </span>
        </div>
      </div>

      <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-violet-300"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        key={question}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-[#09090d] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
              <Lock className="h-4 w-4 text-violet-300" />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Gate {question + 1} / {PUZZLES.length}
              </p>

              <p className="mt-1 text-xs font-medium text-white/70">
                {puzzle.title}
              </p>
            </div>
          </div>

          <Shield className="h-4 w-4 text-white/15" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-violet-300/70" />

              <p className="text-sm leading-7 text-white/65">
                {puzzle.question}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {puzzle.options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrect = index === puzzle.answer;

              let stateClass =
                "border-white/[0.07] bg-white/[0.02] text-white/50 hover:border-white/15 hover:bg-white/[0.045] hover:text-white";

              if (isSelected && isCorrect) {
                stateClass =
                  "border-emerald-300/25 bg-emerald-400/[0.07] text-emerald-200";
              }

              if (isSelected && !isCorrect) {
                stateClass =
                  "border-red-300/25 bg-red-400/[0.07] text-red-200";
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(index)}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition ${stateClass}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 font-mono text-xs text-white/30">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="flex-1 text-xs leading-5">
                    {option}
                  </span>

                  {isSelected ? (
                    isCorrect ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <X className="h-4 w-4 text-red-300" />
                    )
                  ) : (
                    <ChevronRight className="h-4 w-4 text-white/15 transition-transform group-hover:translate-x-1 group-hover:text-white/40" />
                  )}
                </button>
              );
            })}
          </div>

          {selected !== null && selected === puzzle.answer && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex gap-3 rounded-2xl border border-violet-300/10 bg-violet-500/[0.04] p-4"
            >
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300">
                  Vault Insight
                </p>

                <p className="mt-2 text-xs leading-6 text-white/40">
                  {puzzle.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/15">
            <TerminalIcon />
            Logic integrity
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-300/60" />
            <span className="font-mono text-[9px] text-white/20">
              STABLE
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TerminalIcon() {
  return (
    <span className="inline-flex">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 17 6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
    </span>
  );
}