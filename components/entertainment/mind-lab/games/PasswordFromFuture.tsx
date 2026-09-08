"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Binary,
  Clock4,
  KeyRound,
  Lock,
  Radio,
  Sparkles,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

const FUTURE_MESSAGES = [
  {
    year: "2031",
    message: "THE FIRST NUMBER IS THE NUMBER OF LETTERS IN FUTURE.",
    answer: "6",
  },
  {
    year: "2042",
    message: "THE SECOND NUMBER IS THE NUMBER OF SIDES ON A HEXAGON.",
    answer: "6",
  },
  {
    year: "2099",
    message: "THE THIRD NUMBER IS THE NUMBER OF PLANETS IN OUR SOLAR SYSTEM.",
    answer: "8",
  },
];

export default function PasswordFromFuture({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [code, setCode] = useState("");
  const [stage, setStage] = useState(0);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  const current = FUTURE_MESSAGES[stage];

  const targetCode = useMemo(
    () => FUTURE_MESSAGES.map((item) => item.answer).join(""),
    []
  );

  const submit = () => {
    if (code.length !== 3 || finished || failed) return;

    if (code === targetCode) {
      setFinished(true);
      onComplete?.(900);
    } else {
      setFailed(true);
      onFail?.();
    }
  };

  const append = (value: string) => {
    if (code.length >= 3 || finished || failed) return;
    setCode((currentCode) => currentCode + value);
  };

  const reset = () => {
    setCode("");
    setStage(0);
    setFinished(false);
    setFailed(false);
  };

  if (finished || failed) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl rounded-[30px] border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            {finished ? (
              <Sparkles className="h-9 w-9 text-violet-300" />
            ) : (
              <Lock className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-violet-300">
            Temporal Authentication
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">
            {finished ? "Connection Established." : "Timeline Rejected."}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/40">
            {finished
              ? "The future has officially accepted your authentication."
              : `Your code ${code || "???"
                } does not exist in the approved timeline.`}
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-violet-300/20 bg-violet-500/10 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:bg-white/10 hover:text-white"
            >
              Exit
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[80vh] w-full max-w-4xl px-4 py-16">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-violet-300">
        <Radio className="h-4 w-4" />
        Temporal Signal Detected
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
        Password From The Future
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
        A transmission arrived from tomorrow. Decode it before the signal
        disappears.
      </p>

      <div className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-black/30">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <Clock4 className="h-3.5 w-3.5" />
            Transmission {stage + 1}/3
          </div>

          <span className="font-mono text-[10px] text-violet-300">
            YEAR {current.year}
          </span>
        </div>

        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-10"
        >
          <div className="flex items-start gap-4">
            <Binary className="mt-1 h-5 w-5 shrink-0 text-violet-300" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                Incoming message
              </p>

              <p className="mt-4 font-mono text-sm uppercase leading-8 text-white/70 sm:text-base">
                {current.message}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-violet-300" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              Temporal Key
            </span>
          </div>

          <span className="font-mono text-xs text-white/30">
            {code.length}/3
          </span>
        </div>

        <div className="mt-5 flex h-20 items-center justify-center rounded-2xl border border-white/10 bg-black/30 font-mono text-3xl tracking-[0.7em] text-violet-200">
          {code || "___"}
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
            (number) => (
              <button
                key={number}
                type="button"
                onClick={() => append(number)}
                className="rounded-xl border border-white/10 bg-white/[0.035] py-4 font-mono text-sm text-white/60 transition hover:border-violet-300/25 hover:bg-violet-500/10 hover:text-white"
              >
                {number}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => setCode((value) => value.slice(0, -1))}
            className="rounded-xl border border-white/10 bg-white/[0.035] py-4 text-[10px] uppercase tracking-widest text-white/35 transition hover:bg-white/10 hover:text-white"
          >
            Del
          </button>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={code.length !== 3}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-300/20 bg-violet-500/10 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-violet-200 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Lock className="h-3.5 w-3.5" />
          Authenticate Timeline
        </button>
      </div>
    </div>
  );
}