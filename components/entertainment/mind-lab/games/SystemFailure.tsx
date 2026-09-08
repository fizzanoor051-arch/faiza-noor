"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertOctagon,
  Cpu,
  Database,
  Power,
  RotateCcw,
  ShieldAlert,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";

type GameProps = {
  onComplete?: (reward: number) => void;
  onFail?: () => void;
  onExit?: () => void;
};

type SystemNode = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const NODES: SystemNode[] = [
  { id: "core", label: "CORE", icon: Cpu },
  { id: "network", label: "NETWORK", icon: Wifi },
  { id: "database", label: "DATABASE", icon: Database },
  { id: "security", label: "SECURITY", icon: ShieldAlert },
];

const CORRECT_SEQUENCE = ["network", "database", "security", "core"];

export default function SystemFailure({
  onComplete,
  onFail,
  onExit,
}: GameProps) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [time, setTime] = useState(20);
  const [failure, setFailure] = useState(false);
  const [complete, setComplete] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "CRITICAL: SYSTEM INSTABILITY DETECTED",
    "NETWORK PACKETS CORRUPTED",
    "DATABASE RESPONSE UNSTABLE",
    "SECURITY LAYER DISCONNECTED",
    "CORE FAILURE IMMINENT",
  ];

  useEffect(() => {
    if (failure || complete) return;

    const timer = window.setInterval(() => {
      setTime((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          setFailure(true);
          onFail?.();
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [failure, complete, onFail]);

  useEffect(() => {
    if (failure || complete) return;

    const timer = window.setInterval(() => {
      setMessageIndex((value) => (value + 1) % messages.length);
    }, 1500);

    return () => window.clearInterval(timer);
  }, [failure, complete, messages.length]);

  const clickNode = (id: string) => {
    if (failure || complete) return;

    const expected = CORRECT_SEQUENCE[sequence.length];

    if (id !== expected) {
      setFailure(true);
      onFail?.();
      return;
    }

    const next = [...sequence, id];
    setSequence(next);

    if (next.length === CORRECT_SEQUENCE.length) {
      setComplete(true);
      onComplete?.(1400);
    }
  };

  const reset = () => {
    setSequence([]);
    setTime(20);
    setFailure(false);
    setComplete(false);
  };

  if (complete || failure) {
    const success = complete;

    return (
      <div className="relative flex min-h-[84vh] items-center justify-center overflow-hidden px-4 py-16">
        {success && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="pointer-events-none absolute h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]"
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#09090d]/95 p-8 text-center backdrop-blur-2xl sm:p-12"
        >
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border ${
              success
                ? "border-violet-300/20 bg-violet-500/10"
                : "border-red-300/20 bg-red-500/10"
            }`}
          >
            {success ? (
              <Power className="h-9 w-9 text-violet-200" />
            ) : (
              <AlertOctagon className="h-9 w-9 text-red-300" />
            )}
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.35em] text-violet-300">
            System Protocol
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {success ? "System Restored." : "SYSTEM FAILURE."}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            {success
              ? "You restored the infrastructure by identifying the dependency chain."
              : "Wrong dependency. The system collapsed before you could recover it."}
          </p>

          {success && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] uppercase tracking-widest text-white/20">
                  Nodes
                </p>
                <p className="mt-2 font-mono text-2xl text-white">04/04</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-[9px] uppercase tracking-widest text-white/20">
                  Time
                </p>
                <p className="mt-2 font-mono text-2xl text-white">{time}s</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {!success && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-7 py-3 text-[10px] uppercase tracking-[0.2em] text-violet-200 transition hover:bg-violet-500/20"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reboot System
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
    <div className="relative mx-auto min-h-[84vh] w-full max-w-5xl px-4 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-red-300/70">
              <AlertOctagon className="h-4 w-4" />
              Emergency Protocol
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              System Failure
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
              The system is collapsing. Restore the dependency chain before
              the timer reaches zero.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-red-300/10 bg-red-500/[0.05] px-5 py-2.5">
            <Zap className="h-3.5 w-3.5 text-red-300" />
            <span className="font-mono text-sm text-red-200">{time}s</span>
          </div>
        </div>

        <div className="mt-8 rounded-[30px] border border-white/10 bg-[#07070a]/90 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <Terminal className="h-4 w-4 text-red-300/70" />

            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="font-mono text-[10px] text-red-200/60"
              >
                {messages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {NODES.map((node, index) => {
              const Icon = node.icon;
              const activated = sequence.includes(node.id);
              const next = CORRECT_SEQUENCE[sequence.length] === node.id;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => clickNode(node.id)}
                  animate={
                    next
                      ? {
                          boxShadow: [
                            "0 0 0 rgba(0,0,0,0)",
                            "0 0 30px rgba(139,92,246,.12)",
                            "0 0 0 rgba(0,0,0,0)",
                          ],
                        }
                      : undefined
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`relative overflow-hidden rounded-[24px] border p-6 text-left transition ${
                    activated
                      ? "border-violet-300/25 bg-violet-500/[0.08]"
                      : "border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                >
                  <span className="absolute right-5 top-5 font-mono text-[9px] text-white/15">
                    0{index + 1}
                  </span>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      activated
                        ? "border-violet-300/20 bg-violet-500/10"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        activated ? "text-violet-200" : "text-white/40"
                      }`}
                    />
                  </div>

                  <p className="mt-6 text-sm font-semibold tracking-wide text-white">
                    {node.label}
                  </p>

                  <p className="mt-2 text-xs text-white/25">
                    {activated
                      ? "NODE STABILIZED"
                      : next
                        ? "DEPENDENCY REQUIRED"
                        : "UNSTABLE"}
                  </p>

                  {activated && (
                    <div className="absolute inset-x-0 bottom-0 h-px bg-violet-300/30" />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              Recovery sequence
            </p>

            <p className="font-mono text-[10px] text-violet-200/50">
              {sequence.length}/4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}