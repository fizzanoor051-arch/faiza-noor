"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Check,
  MousePointer2,
  Palette,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function InteractiveDemo() {
  const [intensity, setIntensity] = useState(70);
  const [active, setActive] = useState(true);
  const [optimized, setOptimized] = useState(false);

  const reset = () => {
    setIntensity(70);
    setActive(true);
    setOptimized(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030305] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          className="absolute left-[30%] top-[30%] h-[450px] w-[450px] rounded-full bg-violet-500/[0.05] blur-[140px]"
          animate={{
            scale: active ? [1, 1.2, 1] : 1,
            opacity: active ? [0.3, 0.7, 0.3] : 0.2,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <MousePointer2 className="h-4 w-4 text-violet-300/60" />

            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
              Interactive demo
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
            See the
            <br />
            <span className="text-white/20">interface react.</span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-white/30">
            A small playground demonstrating the kind of interactive
            thinking I bring into real interfaces.
          </p>
        </div>

        {/* Demo */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl">
          {/* Browser header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>

            <div className="font-mono text-[8px] text-white/10">
              interactive-demo.local
            </div>

            <button
              type="button"
              onClick={reset}
              className="text-white/20 transition hover:text-white/60"
              aria-label="Reset demo"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px]">
            {/* Visual */}
            <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden p-8">
              {/* Orb */}
              <motion.div
                className="relative flex h-48 w-48 items-center justify-center rounded-full border border-violet-300/10"
                animate={{
                  scale: active
                    ? 0.8 + intensity / 250
                    : 0.8,
                  rotate: optimized ? 180 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="absolute inset-6 rounded-full border border-white/[0.08]"
                  animate={{
                    rotate: active ? 360 : 0,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="absolute inset-12 rounded-full bg-violet-400/[0.08] blur-2xl"
                  animate={{
                    opacity: active ? 1 : 0.3,
                    scale: active
                      ? 0.8 + intensity / 200
                      : 0.7,
                  }}
                />

                <motion.div
                  className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/[0.06]"
                  animate={{
                    rotateY: active ? [0, 15, 0, -15, 0] : 0,
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles
                    className="h-7 w-7 text-violet-200/60"
                    strokeWidth={1}
                  />
                </motion.div>
              </motion.div>

              {/* Floating metrics */}
              <div className="absolute left-7 top-7 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Activity className="h-3 w-3 text-emerald-300/50" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/20">
                    Runtime
                  </span>
                </div>

                <p className="mt-2 font-mono text-sm text-white/50">
                  {active ? "ACTIVE" : "PAUSED"}
                </p>
              </div>

              <div className="absolute bottom-7 right-7 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-violet-300/50" />

                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/20">
                    Intensity
                  </span>
                </div>

                <p className="mt-2 font-mono text-sm text-white/50">
                  {intensity}%
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="border-t border-white/[0.06] p-6 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-violet-300/50" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                  Controls
                </span>
              </div>

              {/* Toggle */}
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/55">
                    Live animation
                  </p>

                  <p className="mt-1 text-[9px] text-white/15">
                    Control the visual engine
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActive((value) => !value)}
                  className={`relative h-6 w-11 rounded-full border transition ${
                    active
                      ? "border-violet-300/20 bg-violet-400/20"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <motion.span
                    className="absolute top-1 h-4 w-4 rounded-full bg-white/70"
                    animate={{
                      left: active ? "22px" : "3px",
                    }}
                  />
                </button>
              </div>

              {/* Slider */}
              <div className="mt-9">
                <div className="flex justify-between">
                  <p className="text-xs text-white/55">
                    Intensity
                  </p>

                  <span className="font-mono text-[9px] text-white/20">
                    {intensity}%
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  value={intensity}
                  onChange={(event) =>
                    setIntensity(Number(event.target.value))
                  }
                  className="mt-5 w-full accent-violet-300"
                />
              </div>

              {/* Optimization */}
              <button
                type="button"
                onClick={() => setOptimized((value) => !value)}
                className={`mt-8 flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                  optimized
                    ? "border-emerald-300/10 bg-emerald-300/[0.03]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <div>
                  <p className="text-xs text-white/55">
                    Performance mode
                  </p>

                  <p className="mt-1 text-[9px] text-white/15">
                    Optimize visual rendering
                  </p>
                </div>

                {optimized ? (
                  <Check className="h-4 w-4 text-emerald-300/60" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-white/15" />
                )}
              </button>

              {/* Result */}
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-white/20" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                    Engine status
                  </span>
                </div>

                <p className="mt-3 font-mono text-xs text-emerald-300/40">
                  {optimized
                    ? "OPTIMIZED / 60 FPS TARGET"
                    : active
                      ? "RUNNING / INTERACTIVE"
                      : "PAUSED / IDLE"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/10">
          <MousePointer2 className="h-3 w-3" />
          Move. Adjust. Experiment.
        </div>
      </div>
    </section>
  );
}