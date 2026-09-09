
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Command,
  Eye,
  Gamepad2,
  Heart,
  MousePointer2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

type EntertainmentMenuProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
};

const experiences = [
  {
    id: "explore",
    number: "01",
    icon: Gamepad2,
    title: "Explore",
    subtitle: "Interactive Experience",
    description:
      "Explore my portfolio in a different way.",
  },

  {
    id: "break",
    number: "02",
    icon: Zap,
    title: "Break It",
    subtitle: "Try To Break My Website",
    description:
      "Think you can break it? Go ahead.",
  },

  {
    id: "tic-tac-toe",
    number: "04",
    icon: Gamepad2,
    title: "Tic-Tac-Toe",
    subtitle: "AI Challenge",
    description:
      "Challenge the computer and try to get three in a row.",
  },

  {
    id: "snake-ladder",
    number: "05",
    icon: Gamepad2,
    title: "Snake & Ladder",
    subtitle: "Classic Board Game",
    description:
      "Roll the dice, climb ladders, avoid snakes and race to 100.",
  },

  {
    id: "chess",
    number: "06",
    icon: Brain,
    title: "AI Chess",
    subtitle: "AI Chess",
    description:
      "Challenge the computer in a classic game of strategy.",
  },

  {
    id: "puzzle",
    number: "07",
    icon: Brain,
    title: "Puzzles",
    subtitle: "Mind Challenge",
    description:
      "Solve difficult logic puzzles, spot hidden traps and challenge your thinking.",
  },

  {
    id: "command",
    number: "08",
    icon: Command,
    title: "Command",
    subtitle: "Command Center",
    description:
      "Navigate my portfolio like a developer.",
  },

  {
    id: "mind-lab",
    number: "10",
    icon: Brain,
    title: "Mind Lab",
    subtitle: "Cognitive Challenge",
    description:
      "Enter the lab. Solve puzzles, survive traps and test your mind.",
  },
];

export default function EntertainmentMenu({
  open,
  onClose,
  onSelect,
}: EntertainmentMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] overflow-y-auto bg-[#050507] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {/* =====================================================
              BACKGROUND ATMOSPHERE
          ===================================================== */}

          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {/* Main purple glow */}
            <div className="absolute left-1/2 top-[42%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/[0.10] blur-[170px]" />

            {/* Pink glow */}
            <div className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-fuchsia-600/[0.06] blur-[150px]" />

            {/* Blue glow */}
            <div className="absolute -right-32 bottom-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/[0.06] blur-[160px]" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)]" />
          </div>

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-10 pt-7 sm:px-8 lg:px-10">
            <div className="flex items-start justify-between gap-6">
              {/* LEFT */}

              <div>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="mb-4 flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/[0.08]">
                    <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                  </div>

                  <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/35">
                    Entertainment Hub
                  </span>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.05,
                  }}
                >
                  <h1 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                    Choose an{" "}
                    <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                      experience.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/40 sm:text-[15px]">
                    A collection of interactive experiments, games,
                    challenges and hidden experiences built into my
                    portfolio.
                  </p>
                </motion.div>
              </div>

              {/* CLOSE */}

              <motion.button
                type="button"
                onClick={onClose}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.1,
                }}
                className="group flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <span>Close</span>

                <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90" />
              </motion.button>
            </div>

            {/* ===================================================
                EXPERIENCE COUNT
            =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="h-px w-10 bg-white/10" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
                11 Experiences
              </span>

              <div className="h-px flex-1 bg-white/[0.06]" />
            </motion.div>
          </div>

          {/* =====================================================
              EXPERIENCE GRID
          ===================================================== */}

          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-20 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {experiences.map((experience, index) => {
                const Icon = experience.icon;

                return (
                  <motion.button
                    key={experience.id}
                    type="button"
                    onClick={() => onSelect(experience.id)}
                    initial={{
                      opacity: 0,
                      y: 24,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.06 * index,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    className="group relative min-h-[230px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-6 text-left backdrop-blur-xl transition-all duration-500 hover:border-violet-300/[0.22] hover:bg-white/[0.045] sm:p-7"
                  >
                    {/* CARD GLOW */}

                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.07] blur-3xl transition-all duration-500 group-hover:bg-fuchsia-500/[0.12]" />

                    <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/[0.035] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* TOP ROW */}

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/20 transition-all duration-500 group-hover:border-violet-300/20 group-hover:bg-violet-500/[0.08]">
                        <Icon className="h-[18px] w-[18px] text-white/45 transition-all duration-500 group-hover:text-violet-200" />
                      </div>

                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 transition-colors duration-300 group-hover:text-violet-200/45">
                        {experience.number}
                      </span>
                    </div>

                    {/* CONTENT */}

                    <div className="relative mt-8">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-violet-300/45 transition-colors duration-300 group-hover:text-violet-200/70">
                          {experience.subtitle}
                        </span>
                      </div>

                      <h2 className="text-xl font-medium tracking-[-0.025em] text-white/90 transition-colors duration-300 group-hover:text-white sm:text-[22px]">
                        {experience.title}
                      </h2>

                      <p className="mt-3 max-w-sm text-[12px] leading-6 text-white/35 transition-colors duration-300 group-hover:text-white/50">
                        {experience.description}
                      </p>
                    </div>

                    {/* ARROW */}

                    <div className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-black/20 text-white/25 transition-all duration-500 group-hover:border-violet-300/20 group-hover:bg-violet-500/[0.08] group-hover:text-violet-200">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* BOTTOM LINE */}

                    <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-violet-400/60 via-fuchsia-400/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.button>
                );
              })}
            </div>

            {/* ===================================================
                FOOTER HINT
            =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.75,
              }}
              className="mt-10 flex items-center justify-center gap-2 text-center"
            >
              <MousePointer2 className="h-3 w-3 text-white/20" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                Select an experience to enter
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
