
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Code2,
  Compass,
  Gamepad2,
  Sparkles,
  Zap,
} from "lucide-react";
import { MouseEvent, useRef } from "react";

export type ExperienceItem = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: "compass" | "code" | "game" | "brain" | "zap" | "spark";
  accent: string;
  tag: string;
};

type ExperienceCardProps = {
  experience: ExperienceItem;
  index: number;
  onOpen: (experience: ExperienceItem) => void;
};

const icons = {
  compass: Compass,
  code: Code2,
  game: Gamepad2,
  brain: Brain,
  zap: Zap,
  spark: Sparkles,
};

export default function ExperienceCard({
  experience,
  index,
  onOpen,
}: ExperienceCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    { stiffness: 180, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
    { stiffness: 180, damping: 20 }
  );

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const Icon = icons[experience.icon];

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const resetCard = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(experience)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
      className="group relative w-full text-left"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        perspective: 1200,
      }}
    >
      <motion.div
        className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0a0a11]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:min-h-[390px] sm:p-8"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.015,
          y: -5,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
      >
        {/* Dynamic cursor light */}
        <motion.div
          className="pointer-events-none absolute -inset-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
          style={{
            left: glowX,
            top: glowY,
            background: `radial-gradient(circle, ${experience.accent}, transparent 60%)`,
          }}
        />

        {/* Technical grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Orbital ring */}
        <motion.div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/[0.06]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/[0.05]"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Number */}
        <div
          className="absolute right-7 top-7 font-mono text-[10px] tracking-[0.3em] text-white/20"
          style={{ transform: "translateZ(45px)" }}
        >
          {experience.number}
        </div>

        {/* Icon */}
        <motion.div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] shadow-2xl"
          style={{
            transform: "translateZ(55px)",
          }}
          whileHover={{
            rotateZ: 5,
            scale: 1.06,
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
            style={{ background: experience.accent }}
          />

          <Icon
            className="relative h-7 w-7 text-white/75 transition-colors duration-500 group-hover:text-white"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Content */}
        <div
          className="relative mt-12"
          style={{
            transform: "translateZ(45px)",
          }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: experience.accent }}
          >
            {experience.eyebrow}
          </p>

          <h3 className="mt-3 max-w-[300px] text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            {experience.title}
          </h3>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/40">
            {experience.description}
          </p>
        </div>

        {/* Bottom */}
        <div
          className="absolute bottom-7 left-6 right-6 flex items-center justify-between border-t border-white/[0.07] pt-5 sm:left-8 sm:right-8"
          style={{
            transform: "translateZ(35px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: experience.accent }}
            />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
              {experience.tag}
            </span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08]">
            <ArrowUpRight className="h-4 w-4 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
        </div>

        {/* Edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[30px] border border-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${experience.accent}35`,
          }}
        />
      </motion.div>
    </motion.button>
  );
}
