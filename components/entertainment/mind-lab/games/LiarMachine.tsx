"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Check,
  Eye,
  Flame,
  Lock,
  ShieldAlert,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LiarMachineProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type Statement = {
  id: number;
  text: string;
  tag: string;
  truth: boolean;
};

const rounds: Statement[][] = [
  [
    {
      id: 1,
      text: "React components can be written as functions.",
      tag: "CODE",
      truth: true,
    },
    {
      id: 2,
      text: "A byte contains exactly 16 bits.",
      tag: "SYSTEM",
      truth: false,
    },
    {
      id: 3,
      text: "The browser can execute JavaScript.",
      tag: "WEB",
      truth: true,
    },
  ],
  [
    {
      id: 1,
      text: "CSS can change the visual appearance of a webpage.",
      tag: "STYLE",
      truth: true,
    },
    {
      id: 2,
      text: "HTML stands for HyperText Markup Language.",
      tag: "WEB",
      truth: true,
    },
    {
      id: 3,
      text: "HTTP status 404 means everything is perfect.",
      tag: "NETWORK",
      truth: false,
    },
  ],
  [
    {
      id: 1,
      text: "JavaScript arrays can contain multiple values.",
      tag: "CODE",
      truth: true,
    },
    {
      id: 2,
      text: "A database is designed to store and organize data.",
      tag: "DATA",
      truth: true,
    },
    {
      id: 3,
      text: "The CSS property display: none makes an element visible.",
      tag: "STYLE",
      truth: false,
    },
  ],
];

export default function LiarMachine({
  onComplete,
  onFail,
  onExit,
}: LiarMachineProps) {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const statements = useMemo(() => rounds[round], [round]);

  const handleAnswer = (statement: Statement) => {
    if (revealed) return;

    setSelected(statement.id);
    setRevealed(true);

    if (statement.truth === false) {
      setScore((value) => value + 100 + streak * 25);
      setStreak((value) => value + 1);
    } else {
      setStreak(0);
      onFail?.();
    }
  };

  useEffect(() => {
    if (!revealed) return;

    const timer = window.setTimeout(() => {
      if (statements.find((item) => item.id === selected)?.truth === false) {
        if (round === rounds.length - 1) {
          setFinished(true);
          onComplete?.(score + 100 + streak * 25);
        } else {
          setRound((value) => value + 1);
          setSelected(null);
          setRevealed(false);
        }
      }
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [
    revealed,
    selected,
    round,
    statements,
    score,
    streak,
    onComplete,
  ]);

  if (finished) {
    return (
      <GameResult
        score={score}
        streak={streak}
        onReplay={() => {
          setRound(0);
          setSelected(null);
          setRevealed(false);
          setScore(0);
          setStreak(0);
          setFinished(false);
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#09090f]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="relative p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-300/[0.05]">
              <Brain className="h-5 w-5 text-violet-300" />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-violet-300/60">
                Cognitive Protocol
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                The Liar Machine
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Stat icon={<Flame />} value={`×${streak}`} />
            <Stat icon={<Sparkles />} value={`${score} XP`} />
          </div>
        </div>

        {/* Progress */}
        <div className="mt-7">
          <div className="flex justify-between text-[8px] uppercase tracking-[0.2em] text-white/20">
            <span>Round {round + 1}</span>
            <span>{rounds.length} rounds</span>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300"
              animate={{
                width: `${((round + 1) / rounds.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Mission */}
        <div className="mt-9 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
            <Eye className="h-6 w-6 text-white/40" />
          </div>

          <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/25">
            Detection required
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Find the lie.
          </h3>

          <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-white/30">
            One statement is false. The machine knows which one.
            <br />
            It hopes you don't.
          </p>
        </div>

        {/* Statements */}
        <div className="mx-auto mt-8 max-w-2xl space-y-2">
          {statements.map((statement, index) => {
            const isSelected = selected === statement.id;
            const isLie = statement.truth === false;

            let stateClass =
              "border-white/[0.08] bg-white/[0.025] hover:border-violet-300/20 hover:bg-white/[0.045]";

            if (revealed && isSelected && isLie) {
              stateClass =
                "border-emerald-300/20 bg-emerald-300/[0.04]";
            }

            if (revealed && isSelected && !isLie) {
              stateClass = "border-rose-300/20 bg-rose-300/[0.04]";
            }

            return (
              <motion.button
                key={`${round}-${statement.id}`}
                type="button"
                disabled={revealed}
                onClick={() => handleAnswer(statement)}
                whileHover={!revealed ? { x: 4 } : {}}
                whileTap={!revealed ? { scale: 0.99 } : {}}
                className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all ${stateClass}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 font-mono text-[10px] text-white/30">
                  0{index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[8px] uppercase tracking-[0.18em] text-violet-300/50">
                      {statement.tag}
                    </span>

                    {revealed && isSelected && (
                      <span
                        className={`text-[8px] uppercase tracking-[0.18em] ${
                          isLie
                            ? "text-emerald-300"
                            : "text-rose-300"
                        }`}
                      >
                        {isLie ? "LIE DETECTED" : "FALSE ALARM"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-6 text-white/60 group-hover:text-white">
                    {statement.text}
                  </p>
                </div>

                {revealed && isSelected ? (
                  isLie ? (
                    <Check className="h-5 w-5 shrink-0 text-emerald-300" />
                  ) : (
                    <X className="h-5 w-5 shrink-0 text-rose-300" />
                  )
                ) : (
                  <ShieldAlert className="h-4 w-4 shrink-0 text-white/15" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/15">
            <Lock className="h-3 w-3" />
            Machine integrity: unstable
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

function Stat({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2">
      <span className="h-3.5 w-3.5 text-violet-300/60">{icon}</span>
      <span className="font-mono text-[9px] text-white/45">{value}</span>
    </div>
  );
}

function GameResult({
  score,
  streak,
  onReplay,
  onExit,
}: {
  score: number;
  streak: number;
  onReplay: () => void;
  onExit?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-[30px] border border-emerald-300/15 bg-[#09090f] p-8 text-center sm:p-12"
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 3, -3, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-emerald-300/20 bg-emerald-300/[0.04]"
      >
        <Sparkles className="h-8 w-8 text-emerald-300" />
      </motion.div>

      <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-emerald-300/60">
        Protocol cleared
      </p>

      <h2 className="mt-2 text-3xl font-semibold text-white">
        Machine defeated.
      </h2>

      <p className="mt-3 text-xs leading-6 text-white/30">
        It lied. You noticed.
        <br />
        Slightly concerning levels of observation detected.
      </p>

      <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-2">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="font-mono text-xl text-white">{score}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/20">
            XP
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="font-mono text-xl text-white">×{streak}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/20">
            Final Combo
          </p>
        </div>
      </div>

      <div className="mt-7 flex justify-center gap-2">
        <button
          type="button"
          onClick={onReplay}
          className="rounded-full bg-white px-5 py-3 text-xs font-semibold text-black"
        >
          Run again
        </button>

        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="rounded-full border border-white/10 px-5 py-3 text-xs text-white/50 hover:text-white"
          >
            Exit
          </button>
        )}
      </div>
    </motion.div>
  );
}