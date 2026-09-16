"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Particle = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
};

const codeFragments = [
  "</>",
  "{ }",
  "01",
  "&&",
  "=>",
  "/>",
  "01",
  "{}",
  "[]",
  "npm",
  "API",
  "AI",
  "TS",
  "JS",
  "∞",
];

export default function PortfolioIntro() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"boot" | "title" | "exit">("boot");

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 95 }, (_, i) => ({
        id: i,
        left: (i * 31.73) % 100,
        size: 1 + ((i * 19) % 22) / 10,
        delay: (i % 25) * 0.06,
        duration: 3.5 + ((i * 17) % 38) / 10,
        drift: -45 + ((i * 43) % 90),
        opacity: 0.25 + ((i * 23) % 70) / 100,
      })),
    [],
  );

  useEffect(() => {
  const titleTimer = window.setTimeout(() => {
    setPhase("title");
  }, 1800);

  const exitTimer = window.setTimeout(() => {
    setPhase("exit");
  }, 4700);

  const hideTimer = window.setTimeout(() => {
    setVisible(false);

    window.dispatchEvent(
      new CustomEvent("portfolio-intro-complete")
    );
  }, 5450);

  return () => {
    window.clearTimeout(titleTimer);
    window.clearTimeout(exitTimer);
    window.clearTimeout(hideTimer);
  };
}, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "exit" ? 0 : 1,
          }}
          transition={{
            duration: phase === "exit" ? 0.75 : 0.2,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-[#020104] text-white"
        >
          {/* =====================================================
              DEEP SPACE / DIGITAL BACKGROUND
          ====================================================== */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(91,33,182,0.12),transparent_35%),radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.06),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(88,28,135,0.07),transparent_30%)]" />

          {/* ultra subtle grid */}

          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.35) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* vertical digital scan */}

          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/25 to-transparent"
            animate={{
              top: ["-5%", "105%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* =====================================================
              PURPLE NEON PARTICLE FIELD
          ====================================================== */}

          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute rounded-full bg-violet-200"
                style={{
                  left: `${particle.left}%`,
                  top: "-5px",
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  boxShadow: `
                    0 0 ${particle.size * 2}px rgba(196,181,253,0.95),
                    0 0 ${particle.size * 5}px rgba(139,92,246,0.65),
                    0 0 ${particle.size * 9}px rgba(109,40,217,0.25)
                  `,
                }}
                initial={{
                  y: -20,
                  x: 0,
                  opacity: 0,
                }}
                animate={{
                  y: [
                    "-5vh",
                    "22vh",
                    "48vh",
                    "74vh",
                    "108vh",
                  ],
                  x: [
                    0,
                    particle.drift * 0.2,
                    particle.drift,
                    particle.drift * 0.6,
                    particle.drift * 0.25,
                  ],
                  opacity: [
                    0,
                    particle.opacity,
                    particle.opacity * 0.9,
                    particle.opacity * 0.5,
                    0,
                  ],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* =====================================================
              RANDOM CODE PARTICLES
          ====================================================== */}

          <div className="absolute inset-0">
            {codeFragments.map((code, i) => (
              <motion.span
                key={`${code}-${i}`}
                className="absolute font-mono text-[8px] text-violet-400/25 sm:text-[9px]"
                style={{
                  left: `${(i * 43.8) % 96}%`,
                  top: `${10 + ((i * 29.7) % 80)}%`,
                }}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: [0, 0.7, 0.15, 0],
                  y: [20, 0, -15],
                  x: [0, i % 2 === 0 ? 10 : -10],
                }}
                transition={{
                  duration: 2.8 + (i % 4) * 0.5,
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                {code}
              </motion.span>
            ))}
          </div>

          {/* =====================================================
              SIDE HUD DATA
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.6 }}
            className="absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.25em] text-white/20 lg:block"
          >
            <div>SYS_01</div>
            <div className="mt-3">NODE // 001</div>
            <div className="mt-3">STATUS</div>

            <div className="mt-2 flex items-center gap-2 text-violet-400/50">
              <span className="h-1 w-1 rounded-full bg-violet-400" />
              ONLINE
            </div>

            <div className="mt-6 h-20 w-px bg-gradient-to-b from-violet-500/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.6 }}
            className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-right font-mono text-[8px] uppercase tracking-[0.25em] text-white/20 lg:block"
          >
            <div>BUILD_2026</div>
            <div className="mt-3">NEXT.JS</div>
            <div className="mt-3">REACT</div>
            <div className="mt-3">TYPESCRIPT</div>

            <div className="mt-6 ml-auto h-20 w-px bg-gradient-to-b from-violet-500/40 to-transparent" />
          </motion.div>

          {/* =====================================================
              CENTER
          ====================================================== */}

          <div className="relative z-30 flex min-h-screen items-center justify-center px-6">
            <AnimatePresence mode="wait">
              {phase === "boot" && (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.03,
                    filter: "blur(6px)",
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md"
                >
                  {/* terminal top */}

                  <div className="mb-5 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.9)]" />

                    <span>FAIZA.NOOR / SYSTEM</span>
                  </div>

                  {/* terminal */}

                  <div className="border border-violet-500/[0.12] bg-black/30 p-5 backdrop-blur-md">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-mono text-[8px] text-white/20">
                        PORTFOLIO_BOOT
                      </span>

                      <span className="font-mono text-[8px] text-violet-400/40">
                        001
                      </span>
                    </div>

                    <div className="space-y-2 font-mono text-[9px] sm:text-[10px]">
                      <div className="text-white/25">
                        <span className="text-violet-500/60">&gt;</span>{" "}
                        initializing experience...
                      </div>

                      <div className="text-white/30">
                        <span className="text-violet-500/60">&gt;</span>{" "}
                        loading creative_engine
                      </div>

                      <div className="text-white/35">
                        <span className="text-violet-500/60">&gt;</span>{" "}
                        compiling digital_experience
                      </div>

                      <div className="text-violet-300/65">
                        <span className="text-violet-500/60">&gt;</span>{" "}
                        system ready_
                      </div>
                    </div>

                    <div className="mt-6 h-px overflow-hidden bg-white/[0.05]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {phase !== "boot" && (
                <motion.div
                  key="title"
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.96,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                    scale: 1.02,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center"
                >
                  {/* code identity */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.1,
                      duration: 0.6,
                    }}
                    className="mb-7 font-mono text-[9px] uppercase tracking-[0.35em] text-violet-400/60 sm:text-[10px]"
                  >
                    &lt; FAIZA.NOOR /&gt;
                  </motion.div>

                  {/* welcome */}

                  <motion.h1
                    initial={{
                      opacity: 0,
                      letterSpacing: "0.35em",
                    }}
                    animate={{
                      opacity: 1,
                      letterSpacing: "0.18em",
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 1,
                    }}
                    className="text-4xl font-light uppercase text-white sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{
                      textShadow:
                        "0 0 35px rgba(139,92,246,0.22)",
                    }}
                  >
                    Welcome
                  </motion.h1>

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.45,
                      duration: 0.8,
                    }}
                    className="mt-3 bg-gradient-to-r from-violet-300 via-white to-violet-300 bg-clip-text text-xl font-medium uppercase tracking-[0.25em] text-transparent sm:text-3xl md:text-4xl"
                  >
                    To My Portfolio
                  </motion.div>

                  {/* code-style separator */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      width: 0,
                    }}
                    animate={{
                      opacity: 1,
                      width: 170,
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 0.8,
                    }}
                    className="mx-auto mt-8 flex h-px items-center justify-center bg-gradient-to-r from-transparent via-violet-500/70 to-transparent"
                  />

                  {/* developer signature */}

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 1,
                      duration: 0.8,
                    }}
                    className="mt-7 font-mono text-[9px] uppercase tracking-[0.32em] text-white/30 sm:text-[10px]"
                  >
                    FULL_STACK_ENGINEER.exe
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 1.2,
                    }}
                    className="mt-3 font-mono text-[8px] tracking-[0.18em] text-violet-400/45"
                  >
                    {"{ build • create • innovate }"}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =====================================================
              BOTTOM STATUS
          ====================================================== */}

          <div className="absolute bottom-6 left-6 font-mono text-[7px] uppercase tracking-[0.3em] text-white/15 sm:text-[8px]">
            NEXUS // DIGITAL EXPERIENCE
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.3em] text-white/15 sm:text-[8px]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,1)]" />
            ONLINE
          </div>

          {/* =====================================================
              FINAL SCAN FLASH
          ====================================================== */}

          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: phase === "exit" ? 1 : 0,
              opacity: phase === "exit" ? 0.65 : 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="absolute left-0 right-0 top-1/2 z-50 h-px origin-center bg-violet-200"
            style={{
              boxShadow:
                "0 0 12px rgba(196,181,253,0.9), 0 0 45px rgba(139,92,246,0.9)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}