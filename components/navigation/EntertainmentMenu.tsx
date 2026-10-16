
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Command,
  Gamepad2,
  MousePointer2,
  Sparkles,
  X,
  Zap,
  Crown,
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
    subtitle: "The Kingdom Awaits",
    description: "Discover my portfolio through an interactive digital adventure.",
    accent: "gold",
  },
  {
    id: "break",
    number: "02",
    icon: Zap,
    title: "Break It",
    subtitle: "Chaos Laboratory",
    description: "Push the limits, test the boundaries, and see what happens.",
    accent: "rose",
  },
  {
    id: "tic-tac-toe",
    number: "03",
    icon: Gamepad2,
    title: "Tic-Tac-Toe",
    subtitle: "The Royal Challenge",
    description: "Face the computer and claim three in a row.",
    accent: "lavender",
  },
  {
    id: "snake-ladder",
    number: "04",
    icon: Gamepad2,
    title: "Snake & Ladder",
    subtitle: "A Royal Adventure",
    description: "Roll the dice, climb the ladders, and race to the finish.",
    accent: "gold",
  },
  {
    id: "chess",
    number: "05",
    icon: Brain,
    title: "AI Chess",
    subtitle: "Mind Over Magic",
    description: "Challenge an intelligent opponent in a battle of strategy.",
    accent: "lavender",
  },
  {
    id: "puzzle",
    number: "06",
    icon: Brain,
    title: "Puzzles",
    subtitle: "Secrets of the Tower",
    description: "Uncover hidden patterns, solve tricky riddles, and think deeper.",
    accent: "rose",
  },
  {
    id: "command",
    number: "07",
    icon: Command,
    title: "Command",
    subtitle: "The Control Tower",
    description: "Navigate the portfolio like a developer behind the scenes.",
    accent: "lavender",
  },
  {
    id: "mind-lab",
    number: "08",
    icon: Brain,
    title: "Mind Lab",
    subtitle: "The Enchanted Trial",
    description: "Enter the lab, outsmart the traps, and test your mind.",
    accent: "gold",
  },
];

const accentStyles = {
  gold: {
    icon: "border-amber-200/20 bg-amber-300/[0.08] text-amber-200",
    glow: "group-hover:shadow-[0_0_45px_rgba(245,190,95,0.10)]",
    label: "text-amber-200/65",
  },
  rose: {
    icon: "border-rose-200/20 bg-rose-300/[0.08] text-rose-200",
    glow: "group-hover:shadow-[0_0_45px_rgba(244,114,182,0.10)]",
    label: "text-rose-200/65",
  },
  lavender: {
    icon: "border-violet-200/20 bg-violet-300/[0.08] text-violet-200",
    glow: "group-hover:shadow-[0_0_45px_rgba(196,181,253,0.10)]",
    label: "text-violet-200/65",
  },
};

export default function EntertainmentMenu({
  open,
  onClose,
  onSelect,
}: EntertainmentMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="tangled-entertainment-menu"
          className="fixed inset-0 z-[1000] overflow-x-hidden overflow-y-auto bg-[#100919] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
        >
          {/* ENCHANTED BACKGROUND */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,75,157,0.25),transparent_52%),linear-gradient(145deg,#100919_0%,#1b1028_48%,#100b19_100%)]" />

            <motion.div
              className="absolute -left-40 top-[25%] h-[440px] w-[440px] rounded-full bg-fuchsia-500/[0.09] blur-[130px]"
              animate={reduceMotion ? undefined : { x: [0, 35, 0], y: [0, -25, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute -right-32 top-[40%] h-[500px] w-[500px] rounded-full bg-amber-400/[0.07] blur-[145px]"
              animate={reduceMotion ? undefined : { x: [0, -25, 0], y: [0, 30, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,231,190,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,231,190,.5) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            {/* Floating enchanted lights */}
            {Array.from({ length: 24 }, (_, i) => (
              <motion.span
                key={i}
                className="absolute block rounded-full bg-amber-100"
                style={{
                  left: `${(i * 41 + 7) % 100}%`,
                  top: `${(i * 29 + 11) % 100}%`,
                  width: i % 4 === 0 ? 4 : 2,
                  height: i % 4 === 0 ? 4 : 2,
                  boxShadow: "0 0 12px 2px rgba(255,214,135,.45)",
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -18, 0],
                        opacity: [0.15, 0.8, 0.15],
                        scale: [0.8, 1.3, 0.8],
                      }
                }
                transition={{
                  duration: 3 + (i % 5),
                  delay: (i % 7) * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(8,4,13,0.5)_100%)]" />
          </div>

          {/* MAIN CONTENT — extra top spacing below the navbar */}
          <main className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
            {/* HEADER */}
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-5 flex flex-wrap items-center gap-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/[0.07] shadow-[0_0_25px_rgba(245,190,95,0.08)]">
                    <Sparkles className="h-4 w-4 text-amber-200" />
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-amber-100/60 sm:text-[10px]">
                    The Enchanted Experience
                  </span>

                  <span className="hidden h-px w-10 bg-amber-200/25 sm:block" />

                  <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/30 sm:inline">
                    A little magic, a lot of code
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.08 }}
                >
                  <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
                    Enter a world
                    <br />
                    beyond the{" "}
                    <span className="bg-gradient-to-r from-amber-100 via-rose-200 to-violet-300 bg-clip-text text-transparent">
                      ordinary.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-violet-100/55 sm:text-base sm:leading-8">
                    Welcome to my little corner of the kingdom — a collection
                    of interactive experiments, playful challenges, and
                    unexpected discoveries.
                  </p>
                </motion.div>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close entertainment menu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group mt-1 flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-3 text-white/65 backdrop-blur-xl transition-all hover:border-amber-200/30 hover:bg-amber-100/[0.08] hover:text-amber-100 sm:px-4"
              >
                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] sm:inline">
                  Close
                </span>
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </motion.button>
            </div>

            {/* DIVIDER / COUNT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mb-7 mt-10 flex items-center gap-4 sm:mb-9 sm:mt-14"
            >
              <Crown className="h-3.5 w-3.5 text-amber-200/65" />
              <span className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.24em] text-amber-100/45">
                Choose your adventure
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-200/20 via-violet-200/10 to-transparent" />
              <span className="whitespace-nowrap font-mono text-[10px] text-white/35">
                {String(experiences.length).padStart(2, "0")} EXPERIENCES
              </span>
            </motion.div>

            {/* EXPERIENCE CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {experiences.map((experience, index) => {
                const Icon = experience.icon;
                const accent = accentStyles[experience.accent as keyof typeof accentStyles];

                return (
                  <motion.button
                    key={experience.id}
                    type="button"
                    onClick={() => onSelect(experience.id)}
                    aria-label={`Open ${experience.title}: ${experience.subtitle}`}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      delay: reduceMotion ? 0 : 0.045 * index,
                      ease: "easeOut",
                    }}
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className={`group relative min-h-[238px] overflow-hidden rounded-[26px] border border-violet-100/[0.12] bg-[#21152d]/65 p-6 text-left shadow-[0_15px_55px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-[border-color,background-color,box-shadow] duration-500 hover:border-amber-100/25 hover:bg-[#2b1b39]/85 sm:p-7 ${accent.glow}`}
                  >
                    {/* Card's golden sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-amber-100/[0.025] opacity-70" />

                    <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-violet-400/[0.10] blur-[65px] transition-all duration-700 group-hover:bg-amber-200/[0.13]" />

                    <div className="pointer-events-none absolute -bottom-16 -left-12 h-32 w-32 rounded-full bg-fuchsia-400/[0.06] blur-[50px] transition-all duration-700 group-hover:bg-fuchsia-300/[0.12]" />

                    <div className="relative flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-[17px] border shadow-inner transition-all duration-500 group-hover:scale-105 ${accent.icon}`}>
                        <Icon className="h-[19px] w-[19px]" strokeWidth={1.7} />
                      </div>

                      <span className="font-mono text-[10px] tracking-[0.22em] text-white/30 transition-colors group-hover:text-amber-100/75">
                        {experience.number}
                      </span>
                    </div>

                    <div className="relative mt-8 pr-5">
                      <div className={`mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] ${accent.label}`}>
                        {experience.subtitle}
                      </div>

                      <h2 className="text-xl font-semibold tracking-[-0.035em] text-white/90 transition-colors duration-300 group-hover:text-amber-50 sm:text-[22px]">
                        {experience.title}
                      </h2>

                      <p className="mt-3 max-w-sm text-[12px] leading-[1.9] text-violet-100/50 transition-colors duration-300 group-hover:text-violet-50/70 sm:text-[13px]">
                        {experience.description}
                      </p>
                    </div>

                    <div className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-black/15 text-white/45 transition-all duration-500 group-hover:border-amber-200/30 group-hover:bg-amber-100/[0.08] group-hover:text-amber-100">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <div className="absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-200/70 via-rose-200/40 to-violet-300/10 transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.button>
                );
              })}
            </div>

            {/* FOOTER */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:mt-14"
            >
              <div className="flex items-center gap-2 text-amber-100/45">
                <MousePointer2 className="h-3.5 w-3.5" />
                <span className="text-[9px] font-medium uppercase tracking-[0.23em]">
                  Select an experience to begin
                </span>
                <Sparkles className="h-3 w-3" />
              </div>

              <p className="text-[10px] text-white/25">
                Crafted with curiosity, creativity & a little magic.
              </p>
            </motion.div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
