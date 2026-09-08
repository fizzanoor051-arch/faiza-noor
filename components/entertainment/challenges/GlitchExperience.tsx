
"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Binary,
  Bug,
  Cpu,
  Database,
  Globe2,
  Lock,
  Network,
  Terminal,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

type GlitchExperienceProps = {
  onComplete: () => void;
};

const stages = [
  "Initializing attack surface...",
  "Scanning interface...",
  "Injecting stress test...",
  "Testing component resilience...",
  "Overloading visual layer...",
  "Attempting system breach...",
];

const nodes = [
  { icon: Globe2, label: "CLIENT" },
  { icon: Network, label: "ROUTER" },
  { icon: Cpu, label: "RUNTIME" },
  { icon: Database, label: "DATA" },
];

export default function GlitchExperience({
  onComplete,
}: GlitchExperienceProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 2;

        if (next >= 100) {
          window.clearInterval(interval);

          window.setTimeout(() => {
            onComplete();
          }, 700);

          return 100;
        }

        return next;
      });
    }, 80);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const nextStage = Math.min(
      stages.length - 1,
      Math.floor(progress / (100 / stages.length))
    );

    setStage(nextStage);
  }, [progress]);

  return (
    <div className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
      {/* Glitch atmosphere */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-0 bg-red-500/[0.015]" />
      </motion.div>

      <div className="relative w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.06]">
              <Bug className="h-4 w-4 text-red-400" />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Attack Simulation
              </p>

              <p className="mt-1 font-mono text-[9px] text-red-400/60">
                STATUS: RUNNING
              </p>
            </div>
          </div>

          <div className="font-mono text-[10px] text-white/20">
            {String(progress).padStart(3, "0")}%
          </div>
        </div>

        {/* Terminal */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-black/40 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          {/* Terminal top */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-4">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />

            <span className="ml-3 font-mono text-[9px] text-white/15">
              security-simulation
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_0.8fr]">
            {/* Left */}
            <div className="border-b border-white/[0.06] p-6 lg:border-b-0 lg:border-r sm:p-8">
              <div className="flex items-center gap-2 font-mono text-[10px] text-red-400/70">
                <Terminal className="h-3.5 w-3.5" />
                root@faiza-portfolio:~$
              </div>

              <div className="mt-7 min-h-[210px] font-mono text-xs leading-7">
                {stages.slice(0, stage + 1).map((text, index) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      index === stage
                        ? "text-red-300"
                        : "text-white/25"
                    }
                  >
                    <span className="mr-3 text-white/10">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>

                    {text}

                    {index === stage && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                        }}
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-8">
                <div className="mb-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-white/20">
                  <span>System stress</span>
                  <span>{progress}/100</span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full bg-red-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative p-6 sm:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                System map
              </p>

              <div className="relative mt-8 flex min-h-[260px] flex-col justify-between">
                {nodes.map((node, index) => {
                  const Icon = node.icon;
                  const active = progress >= index * 25;

                  return (
                    <div key={node.label} className="relative flex items-center gap-4">
                      {index < nodes.length - 1 && (
                        <div className="absolute left-[17px] top-[38px] h-[42px] w-px bg-white/[0.07]" />
                      )}

                      <motion.div
                        className="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border"
                        animate={{
                          borderColor: active
                            ? "rgba(239,68,68,0.4)"
                            : "rgba(255,255,255,0.07)",
                          backgroundColor: active
                            ? "rgba(239,68,68,0.08)"
                            : "rgba(255,255,255,0.02)",
                        }}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            active ? "text-red-400" : "text-white/20"
                          }`}
                        />
                      </motion.div>

                      <div>
                        <p
                          className={`font-mono text-[9px] tracking-[0.2em] ${
                            active ? "text-white/60" : "text-white/20"
                          }`}
                        >
                          {node.label}
                        </p>

                        <p className="mt-1 font-mono text-[8px] text-white/15">
                          {active ? "ACCESSING..." : "WAITING"}
                        </p>
                      </div>

                      {active && (
                        <motion.div
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-red-400"
                          animate={{
                            opacity: [0.2, 1, 0.2],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Warning */}
              <motion.div
                className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/[0.035] px-4 py-3"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <AlertTriangle className="h-4 w-4 text-red-400/70" />

                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-red-300/50">
                  Unauthorized activity detected
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-white/15">
          <span className="flex items-center gap-2">
            <Lock className="h-3 w-3" />
            Simulation only
          </span>

          <span className="flex items-center gap-2">
            <Binary className="h-3 w-3" />
            Secure runtime
          </span>
        </div>
      </div>
    </div>
  );
}
