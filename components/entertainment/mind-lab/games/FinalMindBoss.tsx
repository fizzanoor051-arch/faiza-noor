"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Check,
  Crown,
  Eye,
  LockKeyhole,
  Skull,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type BossQuestion = {
  text: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUESTIONS: BossQuestion[] = [
  {
    text: "You are in a race. You overtake the person in second place. What position are you now in?",
    options: ["First", "Second", "Third", "Last"],
    answer: 1,
    explanation:
      "You took the position of the person you overtook. You are second.",
  },
  {
    text: "A clock shows 3:15. What is the smaller angle between the hands?",
    options: ["0°", "7.5°", "15°", "30°"],
    answer: 1,
    explanation:
      "The minute hand is at 90°. The hour hand has moved 7.5° past 3.",
  },
  {
    text: "A farmer has 17 sheep. All but 9 run away. How many remain?",
    options: ["8", "9", "17", "0"],
    answer: 1,
    explanation: "“All but 9” means 9 remain.",
  },
  {
    text: "Which statement is logically impossible?",
    options: [
      "Some A are B.",
      "No A are B.",
      "All A are B.",
      "Some A are not A.",
    ],
    answer: 3,
    explanation:
      "An object cannot simultaneously be A and not A under ordinary logic.",
  },
  {
    text: "The boss says: “The more you know, the less you can be certain.” What should you do?",
    options: [
      "Trust the first answer.",
      "Question your assumptions.",
      "Choose randomly.",
      "Stop thinking.",
    ],
    answer: 1,
    explanation:
      "The final test is not memorization. It is your ability to challenge assumptions.",
  },
];

export default function FinalMindBoss({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  const question = QUESTIONS[round];

  const percentage = useMemo(
    () => Math.round((score / QUESTIONS.length) * 100),
    [score]
  );

  const choose = (index: number) => {
    if (selected !== null || finished || failed) return;

    setSelected(index);

    const correct = index === question.answer;

    if (correct) {
      setScore((value) => value + 1);
      setCombo((value) => value + 1);

      window.setTimeout(() => {
        if (round === QUESTIONS.length - 1) {
          setFinished(true);
          onComplete?.(2000 + combo * 150 + 750);
        } else {
          setRound((value) => value + 1);
          setSelected(null);
        }
      }, 1000);
    } else {
      setCombo(0);

      window.setTimeout(() => {
        setFailed(true);
        onFail?.();
      }, 850);
    }
  };

  if (finished) {
    return (
      <div className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4 py-16">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.12, 0.25, 0.12],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[140px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-3xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-300/20 bg-violet-500/10"
          >
            <Crown className="h-10 w-10 text-violet-200" />
          </motion.div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-violet-300">
            Final Mind Boss Defeated
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">
            Cognitive Clearance: MAX.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
            You didn't just answer questions. You survived the final layer:
            questioning your own assumptions.
          </p>

          <div className="mt-9 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[9px] uppercase tracking-widest text-white/20">
                Score
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {score}/{QUESTIONS.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[9px] uppercase tracking-widest text-white/20">
                Accuracy
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {percentage}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[9px] uppercase tracking-widest text-white/20">
                XP
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                2,750+
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-violet-300/20 bg-violet-500/10 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
            >
              Return to Mind Lab
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="flex min-h-[88vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl rounded-[30px] border border-red-300/10 bg-red-400/[0.025] p-8 text-center backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-300/10 bg-red-400/[0.05]">
            <Skull className="h-9 w-9 text-red-300" />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-red-300/70">
            Mind Boss Protocol
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">
            You Were Outsmarted.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/40">
            The boss only needed one wrong assumption. You reached round{" "}
            {round + 1} before the system terminated the challenge.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              Back to Mind Lab
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto min-h-[88vh] w-full max-w-5xl px-4 py-16">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-300">
              <Zap className="h-4 w-4" />
              Final Protocol
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Final Mind Boss
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
              The final opponent isn't a person. It's the part of your brain
              that answers too quickly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
              <Brain className="h-3.5 w-3.5 text-violet-300" />
              <span className="font-mono text-xs text-white/60">
                {score}/{QUESTIONS.length}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              <span className="font-mono text-xs text-white/60">
                COMBO x{combo}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-violet-400"
            animate={{
              width: `${((round + 1) / QUESTIONS.length) * 100}%`,
            }}
          />
        </div>

        <motion.div
          key={round}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">
                <Terminal className="h-4 w-4 text-violet-300" />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Boss Query
                </p>

                <p className="mt-1 font-mono text-xs text-white/40">
                  0{round + 1} / 0{QUESTIONS.length}
                </p>
              </div>
            </div>

            <LockKeyhole className="h-4 w-4 text-white/15" />
          </div>

          <h2 className="mt-8 text-xl font-medium leading-8 text-white sm:text-2xl sm:leading-9">
            {question.text}
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {question.options.map((option, index) => {
              const selectedOption = selected === index;
              const correct = index === question.answer;

              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => choose(index)}
                  whileHover={selected === null ? { y: -2 } : undefined}
                  className={`group rounded-2xl border p-5 text-left transition ${
                    selectedOption
                      ? correct
                        ? "border-emerald-400/30 bg-emerald-400/[0.08]"
                        : "border-red-400/30 bg-red-400/[0.08]"
                      : "border-white/[0.07] bg-black/20 hover:border-violet-300/25 hover:bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] font-mono text-xs text-white/40">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <AnimatePresence>
                      {selectedOption &&
                        (correct ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="h-4 w-4 text-emerald-300" />
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <X className="h-4 w-4 text-red-300" />
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-white/55">
                    {option}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-violet-300/10 bg-violet-500/[0.04] p-5"
              >
                <div className="flex gap-3">
                  <Eye className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300/60">
                      Boss Explanation
                    </p>

                    <p className="mt-2 text-xs leading-6 text-white/45">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/15">
          <Skull className="h-3 w-3" />
          No save points. No shortcuts.
        </div>
      </div>
    </div>
  );
}