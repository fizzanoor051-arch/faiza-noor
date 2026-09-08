
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Command,
  Fingerprint,
  Ghost,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

type SecretExperienceProps = {
  open: boolean;
  onClose: () => void;
};

const messages = [
  "You found something that wasn't supposed to be obvious.",
  "Most people never look this closely.",
  "Curiosity is a pretty good developer skill.",
];

export default function SecretExperience({
  open,
  onClose,
}: SecretExperienceProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1500] overflow-hidden bg-[#020204] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[150px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <motion.div
              className="absolute left-0 right-0 h-px bg-violet-300/10"
              animate={{
                top: ["0%", "100%"],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-white/40 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Leave secret
            </button>

            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
              <Fingerprint className="h-3.5 w-3.5" />
              Restricted module
            </div>
          </div>

          {/* Main */}
          <div className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-5 pb-16">
            <div className="w-full max-w-5xl">
              <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1fr]">
                {/* Secret object */}
                <motion.div
                  className="relative mx-auto h-[300px] w-[300px] sm:h-[390px] sm:w-[390px]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ perspective: 1000 }}
                >
                  {/* Rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-violet-300/10"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute inset-8 rounded-full border border-dashed border-white/[0.07]"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 16,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="absolute inset-[60px] rounded-full border border-white/[0.06]"
                    animate={{
                      scale: [1, 1.06, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Core */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[34px] border border-violet-300/15 bg-violet-500/[0.05] shadow-[0_0_100px_rgba(139,92,246,0.12)] backdrop-blur-xl"
                    animate={{
                      rotateX: [0, 10, 0, -10, 0],
                      rotateY: [0, -10, 0, 10, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Ghost
                        className="h-12 w-12 text-violet-200/70"
                        strokeWidth={1}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Floating nodes */}
                  <motion.div
                    className="absolute left-3 top-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                    animate={{ y: [-8, 8, -8] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Code2 className="h-4 w-4 text-white/30" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-12 right-0 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                    animate={{ y: [8, -8, 8] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Command className="h-4 w-4 text-white/30" />
                  </motion.div>

                  <motion.div
                    className="absolute right-10 top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className="h-3.5 w-3.5 text-white/25" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-violet-300/70" />

                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-violet-300/60">
                      You found the hidden layer
                    </p>
                  </div>

                  <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
                    Curiosity
                    <br />
                    <span className="text-white/25">wins.</span>
                  </h1>

                  <div className="mt-7 space-y-3">
                    {messages.map((message, index) => (
                      <motion.p
                        key={message}
                        className="text-sm leading-7 text-white/35"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.15,
                        }}
                      >
                        {message}
                      </motion.p>
                    ))}
                  </div>

                  {/* Terminal */}
                  <motion.div
                    className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/30"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                      <Terminal className="h-3.5 w-3.5 text-white/20" />

                      <span className="font-mono text-[8px] text-white/15">
                        secret.log
                      </span>
                    </div>

                    <div className="px-4 py-4 font-mono text-[9px] leading-6">
                      <p className="text-white/20">
                        &gt; scanning visitor...
                      </p>

                      <p className="text-violet-300/50">
                        &gt; curiosity detected
                      </p>

                      <p className="text-emerald-300/50">
                        &gt; access granted ✓
                      </p>
                    </div>
                  </motion.div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Return to reality
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-0 right-0 z-10 text-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/10">
            easter-egg://discovered
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
