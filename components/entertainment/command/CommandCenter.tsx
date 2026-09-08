"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Command,
  Cpu,
  GitBranch,
  Mail,
  Search,
  Sparkles,
  Terminal,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import CommandAction, {
  CommandActionItem,
} from "./CommandAction";

type CommandCenterProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandCenter({
  open,
  onClose,
}: CommandCenterProps) {
  const [query, setQuery] = useState("");
  const [executed, setExecuted] = useState<string | null>(null);

  const executeAction = (action: CommandActionItem) => {
    setExecuted(action.label);

    action.action();

    setTimeout(() => {
      setExecuted(null);
    }, 1800);
  };

  const actions: CommandActionItem[] = [
    {
      id: "work",
      label: "Explore my work",
      description: "Open the projects built across my development journey.",
      icon: "code",
      action: () => {
        window.location.href = "/projects";
      },
    },
    {
      id: "about",
      label: "Meet the developer",
      description: "Discover my story, mindset and engineering approach.",
      icon: "user",
      action: () => {
        window.location.href = "/about";
      },
    },
    {
      id: "services",
      label: "View services",
      description: "See what I can build for your business or idea.",
      icon: "sparkles",
      action: () => {
        window.location.href = "/services";
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "Inspect repositories, experiments and code.",
      icon: "git-branch",
      action: () => {
        window.open(
          "https://github.com/fizzanoor051-arch",
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      id: "contact",
      label: "Start a conversation",
      description: "Have a project? Let's build something memorable.",
      icon: "mail",
      action: () => {
        window.location.href = "/contact";
      },
    },
  ];

  const filteredActions = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return actions;

    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1400] overflow-y-auto bg-[#020204]/95 px-4 py-6 text-white backdrop-blur-2xl sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background */}
          <div className="pointer-events-none fixed inset-0">
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <motion.div
              className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[150px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/30 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Exit command
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] text-white/25 transition-all hover:border-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Heading */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-500/[0.06]">
                  <Command className="h-4 w-4 text-violet-300/60" />
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
                  Developer command center
                </span>
              </div>

              <h1 className="mt-7 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
                Control
                <br />
                <span className="text-white/20">the experience.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/30">
                One interface. Every important destination. Think of this
                as the shortcut layer of my portfolio.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search command..."
                  autoFocus
                  className="h-16 w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] pl-13 pr-20 font-mono text-sm text-white/70 outline-none backdrop-blur-xl placeholder:text-white/15 transition-all focus:border-violet-300/20 focus:bg-white/[0.04]"
                />

                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  <kbd className="rounded-md border border-white/[0.07] px-2 py-1 font-mono text-[8px] text-white/20">
                    ESC
                  </kbd>
                </div>
              </div>
            </motion.div>

            {/* Status */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300/70" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                  System online
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[8px] text-white/15">
                <Cpu className="h-3 w-3" />
                {filteredActions.length} commands
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredActions.map((action, index) => (
                  <CommandAction
                    key={action.id}
                    action={action}
                    index={index}
                    onExecute={executeAction}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty */}
            {filteredActions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <Terminal className="mx-auto h-7 w-7 text-white/15" />

                <p className="mt-4 text-sm text-white/30">
                  No command found.
                </p>

                <p className="mt-1 font-mono text-[9px] text-white/15">
                  Try another search.
                </p>
              </motion.div>
            )}

            {/* Execution feedback */}
            <AnimatePresence>
              {executed && (
                <motion.div
                  className="fixed bottom-7 left-1/2 z-[1600] -translate-x-1/2 rounded-full border border-emerald-300/10 bg-black/70 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-300/60 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                >
                  <span className="mr-2">✓</span>
                  Executing {executed}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] py-6 sm:flex-row">
              <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/10">
                <Sparkles className="h-3 w-3" />
                Built with curiosity
              </div>

              <div className="font-mono text-[8px] text-white/10">
                command://faiza-noor
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}