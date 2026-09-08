"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Check,
  Flame,
  Lock,
  MousePointer2,
  ShieldAlert,
  Sparkles,
  Terminal,
  Timer,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import MindLabIntro from "./MindLabIntro";
import MindLabScore from "./MindLabScore";
import MindLabResult from "./MindLabResult";

type MindLabProps = {
  onBack?: () => void;
};

type GameStatus = "locked" | "available" | "completed";

const challenges = [
  {
    id: "liar",
    number: "01",
    title: "The Liar Machine",
    type: "DECEPTION",
    description: "One statement is lying. The machine wants you to trust it.",
    difficulty: "MEDIUM",
  },
  {
    id: "coffee",
    number: "02",
    title: "Hacker's Coffee",
    type: "DEBUGGING",
    description: "Coffee.exe crashed. Find the line that murdered it.",
    difficulty: "EASY",
  },
  {
    id: "button",
    number: "03",
    title: "Don't Trust The Button",
    type: "PSYCHOLOGY",
    description: "Some buttons are safe. Some are absolutely not.",
    difficulty: "HARD",
  },
  {
    id: "memory",
    number: "04",
    title: "Memory Heist",
    type: "MEMORY",
    description: "Observe the room. Then reconstruct what disappeared.",
    difficulty: "HARD",
  },
  {
    id: "detective",
    number: "05",
    title: "60-Second Detective",
    type: "INVESTIGATION",
    description: "Read the logs. Find the culprit before time runs out.",
    difficulty: "EXTREME",
  },
  {
    id: "pattern",
    number: "06",
    title: "Pattern Killer",
    type: "PATTERN",
    description: "The obvious pattern is probably the trap.",
    difficulty: "EXTREME",
  },
];

export default function MindLab({ onBack }: MindLabProps) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(1);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [danger, setDanger] = useState(17);

  const [completed, setCompleted] = useState<string[]>([]);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const total = challenges.length;

  const statusFor = (id: string): GameStatus => {
    if (completed.includes(id)) return "completed";

    if (id === "liar") return "available";

    const index = challenges.findIndex((item) => item.id === id);
    const previous = challenges[index - 1];

    if (!previous) return "available";

    return completed.includes(previous.id) ? "available" : "locked";
  };

  const handleComplete = (id: string, reward: number) => {
    if (completed.includes(id)) return;

    setCompleted((current) => [...current, id]);
    setXp((current) => current + reward * combo);
    setCombo((current) => Math.min(current + 1, 9));
    setDanger((current) => Math.min(current + 9, 99));

    const newCompleted = completed.length + 1;

    if (newCompleted % 2 === 0) {
      setLevel((current) => current + 1);
    }

    setActiveGame(null);

    if (newCompleted === total) {
      setTimeout(() => setFinished(true), 450);
    }
  };

  const handleFail = () => {
    setLives((current) => Math.max(current - 1, 0));
    setCombo(1);
    setDanger((current) => Math.max(current - 5, 0));
  };

  const resetLab = () => {
    setStarted(false);
    setFinished(false);
    setXp(0);
    setCombo(1);
    setLevel(1);
    setLives(3);
    setDanger(17);
    setCompleted([]);
    setActiveGame(null);
  };

  const activeChallenge = useMemo(
    () => challenges.find((item) => item.id === activeGame),
    [activeGame]
  );

  return (
    <div className="mx-auto w-full max-w-[1400px] pb-16">
      <AnimatePresence mode="wait">
        {/* =====================================================
            INTRO
        ===================================================== */}

        {!started && !finished && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MindLabIntro onStart={() => setStarted(true)} />
          </motion.div>
        )}

        {/* =====================================================
            LAB
        ===================================================== */}

        {started && !finished && (
          <motion.div
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-violet-300/70">
                  <Brain className="h-3.5 w-3.5" />
                  Mind Lab / Active Session
                </div>

                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                  Think carefully.
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/35">
                  Every challenge changes the rules slightly.
                  <br />
                  The lab is watching how you think.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Session online
                </span>
              </div>
            </div>

            {/* Score HUD */}
            <MindLabScore
              xp={xp}
              combo={combo}
              level={level}
              lives={lives}
              danger={danger}
              completed={completed.length}
              total={total}
            />

            {/* =================================================
                ACTIVE GAME
            ================================================= */}

            {activeChallenge ? (
              <ActiveChallenge
                challenge={activeChallenge}
                onComplete={(reward) =>
                  handleComplete(activeChallenge.id, reward)
                }
                onFail={handleFail}
                onExit={() => setActiveGame(null)}
              />
            ) : (
              /* =================================================
                  GAME GRID
              ================================================= */

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge, index) => {
                  const status = statusFor(challenge.id);

                  return (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      index={index}
                      status={status}
                      onClick={() => {
                        if (status === "available") {
                          setActiveGame(challenge.id);
                        }
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Bottom */}
            <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  if (onBack) onBack();
                }}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25 transition-colors hover:text-white/65"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to experiences
              </button>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/15">
                <MousePointer2 className="h-3 w-3" />
                Choose wisely
              </div>
            </div>
          </motion.div>
        )}

        {/* =====================================================
            RESULT
        ===================================================== */}

        {finished && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <MindLabResult
              xp={xp}
              level={level}
              completed={completed.length}
              total={total}
              combo={combo}
              onReplay={resetLab}
              onBack={() => {
                setFinished(false);
                setStarted(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   CHALLENGE CARD
============================================================ */

function ChallengeCard({
  challenge,
  index,
  status,
  onClick,
}: {
  challenge: (typeof challenges)[number];
  index: number;
  status: GameStatus;
  onClick: () => void;
}) {
  const locked = status === "locked";
  const completed = status === "completed";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={locked}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.4,
      }}
      whileHover={!locked ? { y: -5 } : {}}
      whileTap={!locked ? { scale: 0.985 } : {}}
      className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${
        locked
          ? "cursor-not-allowed border-white/[0.05] bg-white/[0.015] opacity-45"
          : completed
            ? "border-emerald-300/15 bg-emerald-300/[0.025]"
            : "border-white/[0.08] bg-white/[0.025] hover:border-violet-300/20 hover:bg-white/[0.045]"
      }`}
    >
      {/* Hover atmosphere */}
      {!locked && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/0 blur-3xl transition-all duration-500 group-hover:bg-violet-500/15" />
      )}

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
              completed
                ? "border-emerald-300/20 bg-emerald-300/5"
                : "border-white/10 bg-white/[0.035]"
            }`}
          >
            {locked ? (
              <Lock className="h-4 w-4 text-white/25" />
            ) : completed ? (
              <Check className="h-4 w-4 text-emerald-300" />
            ) : (
              <Sparkles className="h-4 w-4 text-violet-300/70" />
            )}
          </div>

          <span className="font-mono text-[10px] tracking-widest text-white/15">
            {challenge.number}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300/55">
              {challenge.type}
            </p>

            <span className="h-1 w-1 rounded-full bg-white/15" />

            <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
              {challenge.difficulty}
            </p>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white">
            {challenge.title}
          </h2>

          <p className="mt-2 text-xs leading-6 text-white/30">
            {challenge.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/20 group-hover:text-white/50">
            {locked
              ? "Complete previous challenge"
              : completed
                ? "Challenge cleared"
                : "Enter challenge →"}
          </span>

          {!locked && !completed && (
            <Zap className="h-3.5 w-3.5 text-white/20 group-hover:text-violet-300" />
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* ============================================================
   ACTIVE CHALLENGE
============================================================ */

function ActiveChallenge({
  challenge,
  onComplete,
  onFail,
  onExit,
}: {
  challenge: (typeof challenges)[number];
  onComplete: (reward: number) => void;
  onFail: () => void;
  onExit: () => void;
}) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const submit = (value: string, correct: boolean, reward: number) => {
    setAnswer(value);

    if (correct) {
      setMessage("ACCESS GRANTED. The machine reluctantly respects you.");
      setTimeout(() => onComplete(reward), 650);
    } else {
      setMessage("WRONG. The system is enjoying this.");
      onFail();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-white/10 bg-white/[0.025] p-6 sm:p-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-violet-300/60">
            <Terminal className="h-3.5 w-3.5" />
            {challenge.number} / {challenge.type}
          </div>

          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            {challenge.title}
          </h2>

          <p className="mt-3 max-w-xl text-xs leading-6 text-white/35">
            {challenge.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2.5 text-[9px] uppercase tracking-[0.18em] text-white/35 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Challenges
        </button>
      </div>

      {/* Game content */}
      <div className="mx-auto mt-10 max-w-3xl">
        {challenge.id === "liar" && (
          <LiarGame
            answer={answer}
            onAnswer={(value, correct) =>
              submit(value, correct, correct ? 300 : 0)
            }
          />
        )}

        {challenge.id === "coffee" && (
          <CoffeeGame
            answer={answer}
            onAnswer={(value, correct) =>
              submit(value, correct, correct ? 200 : 0)
            }
          />
        )}

        {challenge.id === "button" && (
          <ButtonGame
            answer={answer}
            onAnswer={(value, correct) =>
              submit(value, correct, correct ? 400 : 0)
            }
          />
        )}

        {challenge.id === "memory" && (
          <MemoryGame
            answer={answer}
            onAnswer={(value, correct) =>
              submit(value, correct, correct ? 350 : 0)
            }
          />
        )}

        {challenge.id === "detective" && (
          <DetectiveGame
            answer={answer}
            onAnswer={(value, correct) =>
              submit(value, correct, correct ? 500 : 0)
            }
          />
        )}

        {challenge.id === "pattern" && (
          <PatternGame
            answer={answer}
            onAnswer={(value, correct) =>
              submit(value, correct, correct ? 450 : 0)
            }
          />
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-2xl border p-4 text-center text-xs ${
              message.startsWith("ACCESS")
                ? "border-emerald-300/15 bg-emerald-300/[0.03] text-emerald-300"
                : "border-rose-300/10 bg-rose-300/[0.03] text-rose-300"
            }`}
          >
            {message}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

/* ============================================================
   01 — LIAR MACHINE
============================================================ */

function LiarGame({
  answer,
  onAnswer,
}: {
  answer: string | null;
  onAnswer: (value: string, correct: boolean) => void;
}) {
  const statements = [
    "The moon is closer to Earth than the Sun.",
    "A byte contains 16 bits.",
    "React components can be functions.",
  ];

  return (
    <GameFrame
      title="Find the lie."
      subtitle="Only ONE statement is false."
    >
      <div className="space-y-2">
        {statements.map((statement, index) => {
          const value = String(index);

          return (
            <button
              key={statement}
              disabled={answer !== null}
              onClick={() => onAnswer(value, index === 1)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition-all hover:border-violet-300/25 hover:bg-white/[0.04] disabled:opacity-60"
            >
              <span className="font-mono text-xs text-violet-300/50">
                0{index + 1}
              </span>

              <span className="flex-1 text-sm text-white/60 group-hover:text-white">
                {statement}
              </span>
            </button>
          );
        })}
      </div>
    </GameFrame>
  );
}

/* ============================================================
   02 — HACKER'S COFFEE
============================================================ */

function CoffeeGame({
  answer,
  onAnswer,
}: {
  answer: string | null;
  onAnswer: (value: string, correct: boolean) => void;
}) {
  return (
    <GameFrame
      title="Coffee.exe is dead."
      subtitle="Find the line that caused the crash."
    >
      <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-6 font-mono text-xs leading-7 text-white/55">
{`const coffee = {
  temperature: 94,
  cups: 3,
  developer: "awake",
};

if (coffee.temperature < 90) {
  throw new Error("Coffee too cold");
}

coffee.cups--;

console.log(coffee.cup);`}
      </pre>

      <p className="mt-6 text-xs text-white/35">
        Which line is suspicious?
      </p>

      <div className="mt-4 grid gap-2">
        {[
          ["A", "coffee.cups--;"],
          ["B", 'console.log(coffee.cup);'],
          ["C", "temperature: 94"],
        ].map(([key, value]) => (
          <button
            key={key}
            disabled={answer !== null}
            onClick={() => onAnswer(key, key === "B")}
            className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-left text-xs text-white/55 hover:border-violet-300/20 hover:text-white disabled:opacity-50"
          >
            <span className="mr-3 font-mono text-violet-300/60">{key}</span>
            {value}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

/* ============================================================
   03 — DON'T TRUST THE BUTTON
============================================================ */

function ButtonGame({
  answer,
  onAnswer,
}: {
  answer: string | null;
  onAnswer: (value: string, correct: boolean) => void;
}) {
  return (
    <GameFrame
      title="Choose carefully."
      subtitle="One button gives you XP. One resets the room. One does absolutely nothing."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          disabled={answer !== null}
          onClick={() => onAnswer("red", false)}
          className="h-32 rounded-2xl border border-rose-300/10 bg-rose-300/[0.025] text-[10px] uppercase tracking-[0.2em] text-rose-200/50 hover:bg-rose-300/[0.07]"
        >
          DO NOT
          <br />
          PRESS
        </button>

        <button
          disabled={answer !== null}
          onClick={() => onAnswer("violet", true)}
          className="h-32 rounded-2xl border border-violet-300/10 bg-violet-300/[0.025] text-[10px] uppercase tracking-[0.2em] text-violet-200/50 hover:bg-violet-300/[0.07]"
        >
          probably
          <br />
          safe
        </button>

        <button
          disabled={answer !== null}
          onClick={() => onAnswer("gray", false)}
          className="h-32 rounded-2xl border border-white/10 bg-white/[0.025] text-[10px] uppercase tracking-[0.2em] text-white/30 hover:bg-white/[0.06]"
        >
          boring
          <br />
          button
        </button>
      </div>
    </GameFrame>
  );
}

/* ============================================================
   04 — MEMORY HEIST
============================================================ */

function MemoryGame({
  answer,
  onAnswer,
}: {
  answer: string | null;
  onAnswer: (value: string, correct: boolean) => void;
}) {
  const items = ["△", "◆", "●", "✦", "◇", "□"];

  return (
    <GameFrame
      title="Memory Heist."
      subtitle="Which symbol was in position four?"
    >
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {items.map((item, index) => (
          <button
            key={item}
            disabled={answer !== null}
            onClick={() => onAnswer(item, index === 3)}
            className="aspect-square rounded-2xl border border-white/10 bg-black/30 text-2xl text-white/60 hover:border-violet-300/25 hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

/* ============================================================
   05 — DETECTIVE
============================================================ */

function DetectiveGame({
  answer,
  onAnswer,
}: {
  answer: string | null;
  onAnswer: (value: string, correct: boolean) => void;
}) {
  const logs = [
    "21:04:11 — API healthy",
    "21:04:19 — Database healthy",
    "21:04:22 — Unknown request accepted",
    "21:04:23 — Cache latency +890%",
    "21:04:24 — API healthy",
  ];

  return (
    <GameFrame
      title="Who touched the system?"
      subtitle="One event doesn't belong."
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {logs.map((log, index) => (
          <button
            key={log}
            disabled={answer !== null}
            onClick={() => onAnswer(String(index), index === 2)}
            className="flex w-full border-b border-white/[0.05] px-5 py-4 text-left font-mono text-xs text-white/45 hover:bg-white/[0.04] hover:text-white"
          >
            <span className="mr-5 text-violet-300/40">0{index + 1}</span>
            {log}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

/* ============================================================
   06 — PATTERN KILLER
============================================================ */

function PatternGame({
  answer,
  onAnswer,
}: {
  answer: string | null;
  onAnswer: (value: string, correct: boolean) => void;
}) {
  return (
    <GameFrame
      title="Kill the pattern."
      subtitle="What number comes next?"
    >
      <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center font-mono text-2xl tracking-[0.3em] text-white">
        1 · 1 · 2 · 3 · 5 · 8 · ?
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {["11", "13", "14"].map((value) => (
          <button
            key={value}
            disabled={answer !== null}
            onClick={() => onAnswer(value, value === "13")}
            className="rounded-xl border border-white/10 bg-white/[0.025] py-4 font-mono text-sm text-white/50 hover:border-violet-300/25 hover:text-white"
          >
            {value}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}

/* ============================================================
   GAME FRAME
============================================================ */

function GameFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-7 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.04]">
          <ShieldAlert className="h-5 w-5 text-violet-300/70" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>

          <p className="mt-1 text-xs text-white/30">{subtitle}</p>
        </div>
      </div>

      {children}

      <div className="mt-7 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/15">
        <Timer className="h-3 w-3" />
        Think before you click
      </div>
    </div>
  );
}