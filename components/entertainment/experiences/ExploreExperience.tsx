
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ExperienceCard, {
  ExperienceItem,
} from "./ExperienceCard";
import ExperienceLauncher from "./ExperienceLauncher";

const experiences: ExperienceItem[] = [
  {
    id: "creative",
    number: "01",
    title: "Creative Mode",
    eyebrow: "Explore",
    description:
      "Step outside the traditional portfolio and discover how creativity, interaction and engineering come together.",
    icon: "spark",
    accent: "#a78bfa",
    tag: "Creative Experience",
  },
  {
    id: "developer",
    number: "02",
    title: "Developer Mode",
    eyebrow: "Explore",
    description:
      "Dive into the systems, technologies and engineering decisions behind the work.",
    icon: "code",
    accent: "#60a5fa",
    tag: "Engineering",
  },
  {
    id: "play",
    number: "03",
    title: "Play Mode",
    eyebrow: "Explore",
    description:
      "Interact, experiment and discover the playful side of a developer portfolio.",
    icon: "game",
    accent: "#c084fc",
    tag: "Interactive",
  },
  {
    id: "mind",
    number: "04",
    title: "Mind of a Builder",
    eyebrow: "Explore",
    description:
      "See how an idea moves from a rough concept to a polished digital experience.",
    icon: "brain",
    accent: "#818cf8",
    tag: "Process",
  },
  {
    id: "system",
    number: "05",
    title: "System Mode",
    eyebrow: "Explore",
    description:
      "Peek behind the interface and explore the architecture powering modern web experiences.",
    icon: "zap",
    accent: "#93c5fd",
    tag: "Architecture",
  },
  {
    id: "future",
    number: "06",
    title: "Future Mode",
    eyebrow: "Explore",
    description:
      "A glimpse into experimental interfaces, AI integration and the next generation of the web.",
    icon: "compass",
    accent: "#d8b4fe",
    tag: "Experiments",
  },
];

export default function ExploreExperience() {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);

  return (
    <>
      <section
        id="explore-experience"
        className="relative overflow-hidden bg-[#050507] px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      >
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[130px]"
            animate={{
              x: [0, 60, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-[5%] right-[5%] h-[450px] w-[450px] rounded-full bg-blue-600/[0.07] blur-[140px]"
            animate={{
              x: [0, -50, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1450px]">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />

                <span className="text-[9px] uppercase tracking-[0.28em] text-white/40">
                  Entertainment / Explore
                </span>
              </div>

              <h2 className="mt-8 text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl">
                Don&apos;t just
                <br />
                <span className="text-white/30">look around.</span>
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                This is where the portfolio stops being a portfolio. Choose a
                mode and experience the way I think, build and create.
              </p>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                onOpen={setSelectedExperience}
              />
            ))}
          </div>

          {/* Bottom statement */}
          <motion.div
            className="mx-auto mt-20 flex max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-16 bg-white/10" />

            <p className="mt-7 text-xs uppercase tracking-[0.24em] text-white/20">
              Built to be experienced
            </p>
          </motion.div>
        </div>
      </section>

      <ExperienceLauncher
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </>
  );
}
