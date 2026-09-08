"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Eye,
  Fingerprint,
  Ghost,
  Lock,
  Sparkles,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type MemoryHeistProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

const objects = [
  { id: "jade", symbol: "◆", name: "Jade Seal" },
  { id: "moon", symbol: "☾", name: "Moon Charm" },
  { id: "lantern", symbol: "✦", name: "Lantern" },
  { id: "dragon", symbol: "龍", name: "Dragon Mark" },
  { id: "coin", symbol: "◎", name: "Ancient Coin" },
  { id: "flower", symbol: "✿", name: "Lotus" },
];

export default function MemoryHeist({
  onComplete,
  onFail,
  onExit,
}: MemoryHeistProps) {
  const [phase, setPhase] = useState<"observe" | "heist" | "answer">(
    "observe"
  );
  const [countdown, setCountdown] = useState(6);
  const [missing, setMissing] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  const shuffled = useMemo(() => {
    return [...objects].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    if (phase !== "observe") return;

    const interval = window.setInterval(() => {
      setCountdown((value) => {
        if (value <= 1) {
          window.clearInterval(interval);

          const target =
            shuffled[Math.floor(Math.random() * shuffled.length)];

          setMissing(target.id);
          setPhase("heist");
          setTimeout(() => setPhase("answer"), 900);

          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [phase, shuffled]);

  const answer = (id: string) => {
    if (phase !== "answer") return;

    setSelected(id);

    if (id === missing) {
      setWon(true);
      onComplete?.(350);
    } else {
      onFail?.();
    }
  };

  const restart = () => {
    window.location.reload();
  };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08080d]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <div className="relative p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04]">
              <Brain className="h-5 w-5 text-cyan-200/80" />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-cyan-200/50">
                Memory Protocol
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Memory Heist
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2">
            <Timer className="h-3.5 w-3.5 text-cyan-300/60" />
            <span className="font-mono text-[9px] text-white/35">
              {phase === "observe"
                ? `${countdown}s`
                : phase === "heist"
                  ? "..."
                  : "RECALL"}
            </span>
          </div>
        </div>

        {/* Intro */}
        <div className="mx-auto mt-9 max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
            {phase === "observe" ? (
              <Eye className="h-6 w-6 text-cyan-300/60" />
            ) : (
              <Ghost className="h-6 w-6 text-violet-300/60" />
            )}
          </div>

          <p className="mt-5 text-[9px] uppercase tracking-[0.28em] text-white/20">
            {phase === "observe"
              ? "Observe everything"
              : phase === "heist"
                ? "Something disappeared"
                : "Identify the missing object"}
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {phase === "observe"
              ? "Remember the room."
              : phase === "heist"
                ? "THE HEIST."
                : "What vanished?"}
          </h3>
        </div>

        {/* Memory Room */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {shuffled.map((item, index) => {
              const hidden =
                phase === "heist" && item.id === missing;

              return (
                <motion.div
                  key={item.id}
                  animate={
                    hidden
                      ? {
                          opacity: 0,
                          scale: 0.5,
                          rotate: 20,
                        }
                      : {
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }
                  }
                  className={`relative aspect-square overflow-hidden rounded-2xl border ${
                    hidden
                      ? "border-transparent"
                      : "border-white/[0.08] bg-white/[0.025]"
                  }`}
                >
                  {!hidden && (
                    <div className="flex h-full flex-col items-center justify-center">
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 2, -2, 0],
                        }}
                        transition={{
                          duration: 3 + (index % 2),
                          repeat: Infinity,
                        }}
                        className="text-4xl text-violet-200/70"
                      >
                        {item.symbol}
                      </motion.div>

                      <p className="mt-4 text-[8px] uppercase tracking-[0.18em] text-white/20">
                        {item.name}
                      </p>
                    </div>
                  )}

                  <span className="absolute right-3 top-3 font-mono text-[8px] text-white/10">
                    0{index + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Answers */}
        <AnimatePresence>
          {phase === "answer" && !won && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-7 max-w-3xl"
            >
              <p className="mb-3 text-center text-[9px] uppercase tracking-[0.2em] text-white/20">
                Select the object that disappeared
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {objects.map((item) => {
                  const isSelected = selected === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => answer(item.id)}
                      className={`rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? "border-violet-300/25 bg-violet-300/[0.06]"
                          : "border-white/[0.07] bg-white/[0.02] hover:border-violet-300/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="text-2xl text-white/60">
                        {item.symbol}
                      </span>

                      <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-white/25">
                        {item.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Win */}
        {won && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.03] p-5 text-center"
          >
            <Trophy className="mx-auto h-6 w-6 text-emerald-300" />

            <p className="mt-3 text-xs font-medium text-emerald-300">
              MEMORY VERIFIED
            </p>

            <p className="mt-2 text-[10px] leading-5 text-white/30">
              You noticed the missing object.
              <br />
              The thief is disappointed.
            </p>

            <button
              type="button"
              onClick={restart}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[9px] uppercase tracking-[0.18em] text-white/45 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Again
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/15">
            <Fingerprint className="h-3 w-3" />
            Memory integrity: {won ? "100%" : "???%"}
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