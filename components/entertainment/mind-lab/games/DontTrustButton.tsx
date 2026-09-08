"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Eye,
  Fingerprint,
  Ghost,
  MousePointer2,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

type DontTrustButtonProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type ButtonPosition = {
  x: number;
  y: number;
};

export default function DontTrustButton({
  onComplete,
  onFail,
  onExit,
}: DontTrustButtonProps) {
  const [stage, setStage] = useState(0);
  const [position, setPosition] = useState<ButtonPosition>({
    x: 0,
    y: 0,
  });
  const [message, setMessage] = useState("Choose one.");
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);

  const moveButton = () => {
    const x = Math.floor(Math.random() * 150) - 75;
    const y = Math.floor(Math.random() * 90) - 45;

    setPosition({ x, y });
    setClicks((value) => value + 1);
    setMessage("Too slow.");

    onFail?.();
  };

  const chooseSafe = () => {
    setClicks((value) => value + 1);

    if (stage === 0) {
      setStage(1);
      setMessage("Interesting. You trusted it.");
      return;
    }

    if (stage === 1) {
      setStage(2);
      setMessage("Again? Bold.");
      return;
    }

    setWon(true);
    setMessage("You survived the interface.");
    onComplete?.(400);
  };

  useEffect(() => {
    if (stage === 0) {
      setMessage("Choose one.");
    }
  }, [stage]);

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08080d]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-300/15 bg-rose-300/[0.04]">
              <Fingerprint className="h-5 w-5 text-rose-200/80" />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-rose-200/50">
                Behavioral Test
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Don&apos;t Trust The Button
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/20">
            <Eye className="h-3.5 w-3.5" />
            System watching
          </div>
        </div>

        {/* Message */}
        <div className="mx-auto mt-10 max-w-xl text-center">
          <motion.div
            animate={won ? { rotate: [0, -4, 4, 0] } : {}}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-violet-300/15 bg-violet-300/[0.04]"
          >
            {won ? (
              <Sparkles className="h-7 w-7 text-violet-300" />
            ) : (
              <Ghost className="h-7 w-7 text-white/35" />
            )}
          </motion.div>

          <p className="mt-5 text-[9px] uppercase tracking-[0.28em] text-white/20">
            Interaction protocol
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {message}
          </h3>

          <p className="mt-2 text-xs leading-6 text-white/30">
            One button is safe.
            <br />
            The others have questionable intentions.
          </p>
        </div>

        {/* Arena */}
        <div className="relative mx-auto mt-9 h-[320px] max-w-2xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-black/30">
          {/* Scan grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "35px 35px",
            }}
          />

          {/* Center indicator */}
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

          {/* Safe button */}
          <motion.button
            type="button"
            disabled={won}
            onClick={chooseSafe}
            animate={{
              x: stage === 0 ? 0 : position.x,
              y: stage === 0 ? 0 : position.y,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-violet-300/20 bg-violet-300/[0.08] px-7 py-5 shadow-[0_0_45px_rgba(139,92,246,0.15)] transition-colors hover:bg-violet-300/[0.13]"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-violet-200">
              <Shield className="h-3.5 w-3.5" />
              Probably Safe
            </span>
          </motion.button>

          {/* Trap buttons */}
          <motion.button
            type="button"
            disabled={won}
            onClick={moveButton}
            animate={{
              x: [-10, 10, -10],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute left-[12%] top-[20%] rounded-xl border border-rose-300/10 bg-rose-300/[0.025] px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-rose-200/35 hover:bg-rose-300/[0.06]"
          >
            DO NOT
          </motion.button>

          <motion.button
            type="button"
            disabled={won}
            onClick={moveButton}
            animate={{
              x: [5, -7, 5],
              y: [-4, 5, -4],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
            }}
            className="absolute bottom-[18%] right-[12%] rounded-xl border border-rose-300/10 bg-rose-300/[0.025] px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-rose-200/35 hover:bg-rose-300/[0.06]"
          >
            TRUST ME
          </motion.button>

          {/* Cursor indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/15">
            <MousePointer2 className="h-3 w-3" />
            Click behavior monitored
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/15">
            <AlertTriangle className="h-3 w-3" />
            {clicks} interactions
          </div>
        </div>

        {/* Success */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.03] p-4"
            >
              <Zap className="h-4 w-4 text-emerald-300" />

              <p className="text-xs text-emerald-300/80">
                Interface survived. Your trust issues did not.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/15">
            <Zap className="h-3 w-3" />
            Stage {stage + 1}/3
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