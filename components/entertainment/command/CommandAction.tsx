"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  GitBranch,
  Mail,
  Sparkles,
  Terminal,
  User,
} from "lucide-react";

export type CommandActionItem = {
  id: string;
  label: string;
  description: string;
  icon:
    | "terminal"
    | "code"
    | "github"
    | "gitBranch"
    | "git-branch"
    | "mail"
    | "user"
    | "sparkles"
    | "external";
  action: () => void;
};

type CommandActionProps = {
  action: CommandActionItem;
  index: number;
  onExecute: (action: CommandActionItem) => void;
};

const icons = {
  terminal: Terminal,
  code: Code2,

  // GitHub removed — using GitBranch instead
  github: GitBranch,
  gitBranch: GitBranch,
  "git-branch": GitBranch,

  mail: Mail,
  user: User,
  sparkles: Sparkles,
  external: ExternalLink,
};

export function CommandAction({
  action,
  index,
  onExecute,
}: CommandActionProps) {
  const Icon = icons[action.icon];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onExecute(action)}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-4 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/5.5"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-violet-400/30 group-hover:bg-violet-500/10">
          <Icon
            size={19}
            strokeWidth={1.7}
            className="text-white/70 transition-colors duration-300 group-hover:text-violet-300"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="truncate text-sm font-medium text-white/90">
              {action.label}
            </span>

            <span className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/35 sm:inline-block">
              CMD
            </span>
          </div>

          <p className="truncate text-xs leading-relaxed text-white/40">
            {action.description}
          </p>
        </div>

        {/* Arrow */}
        <ArrowUpRight
          size={17}
          strokeWidth={1.7}
          className="shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
        />
      </div>

      {/* Bottom scan line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent group-hover:w-full"
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}

export default CommandAction;