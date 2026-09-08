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
    description: "Explore my portfolio in a different way.",
  },
  {
    id: "break",
    number: "02",
    icon: Zap,
    title: "Break It",
    subtitle: "Try To Break My Website",
    description: "Think you can break it? Go ahead.",
  },
  {
    id: "playground",
    number: "03",
    icon: Brain,
    title: "Playground",
    subtitle: "Interactive Lab",
    description: "Play with ideas, technology and experiments.",
  },
  {
    id: "secret",
    number: "04",
    icon: Eye,
    title: "Secret",
    subtitle: "Easter Egg",
    description: "There may be something hidden here.",
  },
  {
    id: "command",
    number: "05",
    icon: Command,
    title: "Command",
    subtitle: "Command Center",
    description: "Navigate my portfolio like a developer.",
  },
  {
    id: "hire",
    number: "06",
    icon: Heart,
    title: "Why Hire Me?",
    subtitle: "The Real Question",
    description: "See what I can bring to your next project.",
  },
  {
    id: "mind-lab",
    number: "07",
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
        <>
          {/* =====================================================
              BACKDROP
          ===================================================== */}

          <motion.div
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* =====================================================
              SCROLLABLE MENU WRAPPER
          ===================================================== */}

          <motion.div
            className="fixed inset-0 z-[999] overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =================================================
                MENU CONTAINER
            ================================================= */}

            <div className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[28px] border border-white/10 bg-[#09090f]/95 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
              {/* =================================================
                  AMBIENT GLOW
              ================================================= */}

              <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />

              <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

              <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-600/[0.04] blur-[110px]" />

              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <Sparkles className="h-5 w-5 text-violet-300" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-violet-300">
                        Entertainment
                      </p>

                      <span className="h-1 w-1 rounded-full bg-white/30" />

                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                        Experience Hub
                      </span>
                    </div>

                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      Don&apos;t just browse. Explore.
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close entertainment menu"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>

              {/* =================================================
                  INTRO
              ================================================= */}

              <div className="relative px-6 pb-5 pt-6 sm:px-8">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="max-w-xl text-sm leading-6 text-white/45">
                      A collection of interactive experiences built to show
                      that a portfolio doesn&apos;t have to feel like a
                      portfolio.
                    </p>
                  </div>

                  <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25 sm:flex">
                    <MousePointer2 className="h-3.5 w-3.5" />
                    Choose your experience
                  </div>
                </div>
              </div>

              {/* =================================================
                  EXPERIENCE GRID
              ================================================= */}

              <div className="relative grid grid-cols-1 gap-3 px-6 pb-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
                {experiences.map((experience, index) => {
                  const Icon = experience.icon;
                  const isMindLab = experience.id === "mind-lab";

                  return (
                    <motion.button
                      key={experience.id}
                      type="button"
                      onClick={() => onSelect(experience.id)}
                      className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                        isMindLab
                          ? "border-violet-400/20 bg-violet-500/[0.045] hover:border-violet-300/40 hover:bg-violet-500/[0.08]"
                          : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.055]"
                      }`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.055,
                        duration: 0.35,
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className={`pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full blur-3xl transition-all duration-500 ${
                          isMindLab
                            ? "bg-violet-500/10 group-hover:bg-violet-500/30"
                            : "bg-violet-500/0 group-hover:bg-violet-500/20"
                        }`}
                      />

                      {/* Mind Lab extra glow */}
                      {isMindLab && (
                        <>
                          <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl transition-all duration-500 group-hover:bg-fuchsia-500/20" />

                          <div className="pointer-events-none absolute right-5 top-5 h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_15px_rgba(167,139,250,0.9)]" />
                        </>
                      )}

                      <div className="relative">
                        {/* =================================================
                            CARD TOP
                        ================================================= */}

                        <div className="flex items-start justify-between">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                              isMindLab
                                ? "border-violet-400/25 bg-violet-500/10 group-hover:border-violet-300/40 group-hover:bg-violet-500/15"
                                : "border-white/10 bg-white/[0.045] group-hover:border-violet-400/30 group-hover:bg-violet-500/10"
                            }`}
                          >
                            <Icon
                              className={`h-[18px] w-[18px] transition-colors duration-300 ${
                                isMindLab
                                  ? "text-violet-300"
                                  : "text-white/60 group-hover:text-violet-300"
                              }`}
                            />
                          </div>

                          <span className="font-mono text-[10px] tracking-widest text-white/20">
                            {experience.number}
                          </span>
                        </div>

                        {/* =================================================
                            CARD CONTENT
                        ================================================= */}

                        <div className="mt-5">
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-[10px] font-medium uppercase tracking-[0.2em] ${
                                isMindLab
                                  ? "text-violet-300"
                                  : "text-violet-300/70"
                              }`}
                            >
                              {experience.subtitle}
                            </p>

                            {isMindLab && (
                              <span className="rounded-full border border-violet-300/20 bg-violet-400/10 px-2 py-0.5 text-[8px] uppercase tracking-[0.15em] text-violet-200">
                                New
                              </span>
                            )}
                          </div>

                          <h3 className="mt-1 text-base font-semibold text-white">
                            {experience.title}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-white/35">
                            {experience.description}
                          </p>
                        </div>

                        {/* =================================================
                            CARD FOOTER
                        ================================================= */}

                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 transition-colors duration-300 group-hover:text-white/50">
                            {isMindLab ? "Enter the lab" : "Open experience"}
                          </span>

                          <ArrowUpRight
                            className={`h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                              isMindLab
                                ? "text-violet-300/60 group-hover:text-violet-200"
                                : "text-white/25 group-hover:text-violet-300"
                            }`}
                          />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="relative flex flex-col gap-3 border-t border-white/[0.07] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/20">
                  Built with curiosity • Designed with intention
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-left text-[10px] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white/70 sm:text-right"
                >
                  Return to portfolio
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}