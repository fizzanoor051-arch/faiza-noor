"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Check,
  Cpu,
  Fingerprint,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type Question = {
  prompt: string;
  humanAnswer: number;
  aiAnswer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    prompt:
      "A person says: “I have two coins totaling 30 cents, and one of them isn't a nickel.” What are the coins?",
    humanAnswer: 1,
    aiAnswer: 2,
    explanation:
      "One coin isn't a nickel — but the other one can be. The answer is a quarter and a nickel.",
  },
  {
    prompt:
      "Which is heavier: 1kg of iron or 1kg of feathers?",
    humanAnswer: 0,
    aiAnswer: 0,
    explanation: "They are both exactly 1kg.",
  },
  {
    prompt:
      "A room has 3 switches outside and 3 bulbs inside. You may enter once. How can you identify each switch?",
    humanAnswer: 2,
    aiAnswer: 1,
    explanation:
      "Use heat as evidence: turn one on, wait, turn it off, turn another on, then enter.",
  },
  {
    prompt:
      "What becomes larger when you take more away from it?",
    humanAnswer: 1,
    aiAnswer: 1,
    explanation: "A hole becomes larger as more material is removed.",
  },
];

const OPTIONS = [
  ["A", "Both are equal"],
  ["B", "A hole"],
  ["C", "A quarter + nickel"],
  ["D", "Use temperature"],
];

export default function AIvsHuman({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [round, setRound] = useState(0);
  const [humanScore, setHumanScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[round];

  const availableOptions = useMemo(() => {
    return OPTIONS.map((option, index) => ({
      label: option[0],
      text: option[1],
      index,
    }));
  }, []);

  const answer = (index: number) => {
    if (selected !== null || finished) return;

    setSelected(index);

    const humanCorrect = index === question.humanAnswer;
    const aiCorrect = question.aiAnswer === question.humanAnswer;

    if (humanCorrect) {
      setHumanScore((value) => value + 1);
    }

    if (aiCorrect) {
      setAiScore((value) => value + 1);
    }

    window.setTimeout(() => {
      if (round === QUESTIONS.length - 1) {
        setFinished(true);

        const finalHuman = humanScore + (humanCorrect ? 1 : 0);
        const finalAI = aiScore + (aiCorrect ? 1 : 0);

        if (finalHuman > finalAI) {
          onComplete?.(800);
        } else {
          onFail?.();
        }

        return;
      }

      setRound((value) => value + 1);
      setSelected(null);
    }, 1100);
  };

  if (finished) {
    const humanWon = humanScore > aiScore;

    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl rounded-[30px] border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            {humanWon ? (
              <Fingerprint className="h-9 w-9 text-violet-300" />
            ) : (
              <Bot className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-violet-300">
            Cognitive Duel Complete
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {humanWon ? "Human Wins." : "AI Wins."}
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/40">
            {humanWon
              ? "Congratulations. Your messy biological brain survived."
              : "The machine predicted your reasoning better than you did."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <UserRound className="mx-auto h-5 w-5 text-violet-300" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-white/25">
                Human
              </p>
              <p className="mt-1 text-3xl font-semibold text-white">
                {humanScore}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <Bot className="mx-auto h-5 w-5 text-violet-300" />
              <p className="mt-3 text-[10px] uppercase tracking-widest text-white/25">
                AI
              </p>
              <p className="mt-1 text-3xl font-semibold text-white">
                {aiScore}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="mt-8 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/55 transition hover:bg-white/10 hover:text-white"
          >
            Back to Mind Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[80vh] w-full max-w-5xl px-4 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-violet-300">
            <Cpu className="h-4 w-4" />
            Neural Duel
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            AI vs Human
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
            Four questions. One biological brain. One suspicious machine.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
            <UserRound className="h-3.5 w-3.5 text-violet-300" />
            <span className="font-mono text-xs text-white">{humanScore}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
            <Bot className="h-3.5 w-3.5 text-violet-300" />
            <span className="font-mono text-xs text-white">{aiScore}</span>
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-10"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/25">
          <Brain className="h-4 w-4" />
          Question {round + 1}/{QUESTIONS.length}
        </div>

        <h2 className="mt-6 text-xl font-medium leading-8 text-white sm:text-2xl">
          {question.prompt}
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {availableOptions.map((option) => {
            const isSelected = selected === option.index;
            const isCorrect = option.index === question.humanAnswer;

            return (
              <button
                key={option.index}
                type="button"
                onClick={() => answer(option.index)}
                className={`group rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? isCorrect
                      ? "border-emerald-400/30 bg-emerald-400/[0.08]"
                      : "border-red-400/30 bg-red-400/[0.08]"
                    : "border-white/[0.07] bg-black/20 hover:border-violet-300/25 hover:bg-white/[0.045]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-xs text-white/50">
                    {option.label}
                  </span>

                  {isSelected &&
                    (isCorrect ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <X className="h-4 w-4 text-red-300" />
                    ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-white/55">
                  {option.text}
                </p>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-6 rounded-2xl border border-violet-300/10 bg-violet-400/[0.04] p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
              <p className="text-xs leading-6 text-white/45">
                {question.explanation}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}