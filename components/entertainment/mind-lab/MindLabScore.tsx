"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Gauge,
  Heart,
  ShieldAlert,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

type MindLabScoreProps = {
  xp: number;
  combo: number;
  level: number;
  lives: number;
  danger: number;
  completed: number;
  total: number;
};

export default function MindLabScore({
  xp,
  combo,
  level,
  lives,
  danger,
  completed,
  total,
}: MindLabScoreProps) {
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="mb-7">
      {/* Main HUD */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <HudItem
          icon={<Sparkles className="h-4 w-4" />}
          label="Mind XP"
          value={String(xp).padStart(4, "0")}
        />

        <HudItem
          icon={<Flame className="h-4 w-4" />}
          label="Combo"
          value={`×${combo}`}
        />

        <HudItem
          icon={<Trophy className="h-4 w-4" />}
          label="Level"
          value={String(level).padStart(2, "0")}
        />

        <HudItem
          icon={<Heart className="h-4 w-4" />}
          label="Lives"
          value={`${lives}/3`}
        />

        <HudItem
          icon={<Gauge className="h-4 w-4" />}
          label="Danger"
          value={`${danger}%`}
        />
      </div>

      {/* Progress */}
      <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5 text-violet-300/70" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
              Cognitive clearance
            </span>
          </div>

          <span className="font-mono text-[10px] text-white/35">
            {completed}/{total}
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[8px] uppercase tracking-[0.18em] text-white/15">
          <span>Beginner</span>
          <span>Dangerous</span>
          <span>Unreasonable</span>
        </div>
      </div>
    </div>
  );
}

function HudItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-colors hover:border-white/[0.14]"
    >
      <div className="flex items-center justify-between">
        <span className="text-white/30 transition-colors group-hover:text-violet-300/70">
          {icon}
        </span>

        <Zap className="h-3 w-3 text-white/10" />
      </div>

      <p className="mt-3 font-mono text-base text-white">{value}</p>

      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/20">
        {label}
      </p>
    </motion.div>
  );
}