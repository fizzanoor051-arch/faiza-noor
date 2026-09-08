"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Fingerprint,
  KeyRound,
  Lock,
  Shield,
  ShieldAlert,
  Sparkles,
  Terminal,
  Unlock,
  X,
  Zap,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type LockStage = {
  label: string;
  clue: string;
  target: string;
};

const STAGES: LockStage[] = [
  {
    label: "ALPHA",
    clue: "The first digit is the number of letters in the word MIND.",
    target: "4",
  },
  {
    label: "BETA",
    clue: "The second digit is 3 × 2.",
    target: "6",
  },
  {
    label: "OMEGA",
    clue: "The final digit is the number of sides on a triangle.",
    target: "3",
  },
];

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function FinalLock({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [unlocked, setUnlocked] = useState(false);
  const [failed, setFailed] = useState(false);
  const [shake, setShake] = useState(false);

  const current = STAGES[stage];

  const progress = useMemo(
    () => ((stage + (input ? 0.5 : 0)) / STAGES.length) * 100,
    [stage, input]
  );

  const pressDigit = (digit: string) => {
    if (unlocked || failed || input.length >= 1) return;
    setInput(digit);

    window.setTimeout(() => {
      if (digit === current.target) {
        if (stage === STAGES.length - 1) {
          setUnlocked(true);
          onComplete?.(1800);
        } else {
          setStage((value) => value + 1);
          setInput("");
        }
      } else {
        setAttempts((value) => {
          const next = value - 1;

          if (next <= 0) {
            setFailed(true);
            onFail?.();
          }

          return next;
        });

        setShake(true);
        window.setTimeout(() => {
          setShake(false);
          setInput("");
        }, 600);
      }
    }, 500);
  };

  const reset = () => {
    setStage(0);
    setInput("");
    setAttempts(3);
    setUnlocked(false);
    setFailed(false);
    setShake(false);
  };

  if (unlocked || failed) {
    return (
      <div className="relative flex min-h-[84vh] items-center justify-center overflow-hidden px-4 py-16">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.06, 0.16, 0.06],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-[130px] ${
            unlocked ? "bg-violet-500" : "bg-red-500"
          }`}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-2xl rounded-[34px] border border-white/10 bg-[#08080c]/95 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12"
        >
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border ${
              unlocked
                ? "border-violet-300/25 bg-violet-500/10"
                : "border-red-300/20 bg-red-500/10"
            }`}
          >
            {unlocked ? (
              <Unlock className="h-9 w-9 text-violet-200" />
            ) : (
              <ShieldAlert className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            Final Security Layer
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {unlocked ? "FINAL LOCK DECRYPTED." : "ACCESS DENIED."}
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/40">
            {unlocked
              ? "You solved the complete authentication sequence. The vault recognizes you."
              : "Three wrong decisions triggered the final security lockdown."}
          </p>

          {unlocked && (
            <div className="mt-8 rounded-2xl border border-violet-300/10 bg-violet-500/[0.05] p-5">
              <p className="text-[9px] uppercase tracking-[0.25em] text-violet-200/50">
                Authentication Key
              </p>

              <p className="mt-2 font-mono text-3xl tracking-[0.4em] text-white">
                463
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {!unlocked && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-violet-300/20 bg-violet-500/10 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
              >
                Retry Protocol
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
    <div className="relative mx-auto min-h-[84vh] w-full max-w-4xl px-4 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-300">
              <Fingerprint className="h-4 w-4" />
              Deep Security
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Final Lock
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              The last lock doesn't require speed. It requires thinking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition ${
                  index < attempts ? "bg-violet-300/70" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 h-px bg-white/10">
          <motion.div
            className="h-full bg-violet-300"
            animate={{ width: `${progress}%` }}
          />
        </div>

        <motion.div
          animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : undefined}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-10 max-w-xl rounded-[34px] border border-white/10 bg-[#09090d] p-6 shadow-2xl sm:p-9"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
                <Lock className="h-4 w-4 text-violet-300" />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Security layer
                </p>

                <p className="mt-1 text-xs font-medium text-white/70">
                  {current.label}
                </p>
              </div>
            </div>

            <Shield className="h-4 w-4 text-white/20" />
          </div>

          <div className="py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-violet-300/10 bg-violet-500/[0.04]">
              <KeyRound className="h-7 w-7 text-violet-200/70" />
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-violet-300/70">
              Decode the clue
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
              {current.clue}
            </p>

            <div className="mt-7 flex justify-center">
              <div className="flex h-16 w-20 items-center justify-center rounded-2xl border border-white/10 bg-black/30 font-mono text-2xl text-white">
                {input || "•"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {DIGITS.map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => pressDigit(digit)}
                className="flex h-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] font-mono text-sm text-white/50 transition hover:-translate-y-0.5 hover:border-violet-300/20 hover:bg-violet-500/[0.07] hover:text-white"
              >
                {digit}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/15">
            <Terminal className="h-3 w-3" />
            Layer {stage + 1} / {STAGES.length}
          </div>
        </motion.div>
      </div>
    </div>
  );
}