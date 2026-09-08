"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import EntertainmentMenu from "../navigation/EntertainmentMenu";

import ExploreExperience from "./experiences/ExploreExperience";
import BreakTheWebsite from "./challenges/BreakTheWebsite";
import InteractiveDemo from "./interactive/InteractiveDemo";
import SecretExperience from "./easter-eggs/SecretExperience";
import CommandCenter from "./command/CommandCenter";
import HireExperience from "./hire/HireExperience";

// =============================================================
// MIND LAB
// =============================================================

import MindLab from "./mind-lab/MindLab";

type EntertainmentHubProps = {
  open: boolean;
  onClose: () => void;
};

type ExperienceId =
  | "explore"
  | "break"
  | "playground"
  | "secret"
  | "command"
  | "hire"
  | "mind-lab";

export default function EntertainmentHub({
  open,
  onClose,
}: EntertainmentHubProps) {
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceId | null>(null);

  /* =========================================================
     SELECT EXPERIENCE
  ========================================================= */

  const handleSelect = (id: string) => {
    if (
      id !== "explore" &&
      id !== "break" &&
      id !== "playground" &&
      id !== "secret" &&
      id !== "command" &&
      id !== "hire" &&
      id !== "mind-lab"
    ) {
      return;
    }

    setSelectedExperience(id);
  };

  /* =========================================================
     BACK TO ENTERTAINMENT MENU
  ========================================================= */

  const handleBack = () => {
    setSelectedExperience(null);
  };

  /* =========================================================
     CLOSE EVERYTHING
  ========================================================= */

  const handleClose = () => {
    setSelectedExperience(null);
    onClose();
  };

  /* =========================================================
     EXPERIENCE WRAPPER
  ========================================================= */

  const ExperienceShell = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <motion.div
        className="fixed inset-0 z-[1000] overflow-y-auto overflow-x-hidden bg-[#050507] px-5 pb-12 pt-24 sm:px-8 lg:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ===================================================
            BACKGROUND ATMOSPHERE
        =================================================== */}

        <div className="pointer-events-none fixed inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* ===================================================
            TOP NAV
        =================================================== */}

        <div className="pointer-events-none fixed left-0 right-0 top-0 z-[1100] flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={handleBack}
            className="pointer-events-auto group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />

            Back to experiences
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="pointer-events-auto rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
          >
            Close
          </button>
        </div>

        {/* ===================================================
            EXPERIENCE CONTENT
        =================================================== */}

        <div className="relative mx-auto min-h-full w-full max-w-[1500px]">
          {children}
        </div>

        {/* ===================================================
            BOTTOM SPACE
        =================================================== */}

        <div
          className="h-10 w-full shrink-0"
          aria-hidden="true"
        />
      </motion.div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AnimatePresence mode="wait">
      {/* =====================================================
          ENTERTAINMENT MENU
      ===================================================== */}

      {open && !selectedExperience && (
        <EntertainmentMenu
          key="entertainment-menu"
          open={open}
          onClose={handleClose}
          onSelect={handleSelect}
        />
      )}

      {/* =====================================================
          EXPLORE
      ===================================================== */}

      {open && selectedExperience === "explore" && (
        <ExperienceShell key="explore">
          <ExploreExperience />
        </ExperienceShell>
      )}

      {/* =====================================================
          BREAK THE WEBSITE
      ===================================================== */}

      {open && selectedExperience === "break" && (
        <ExperienceShell key="break">
          <BreakTheWebsite />
        </ExperienceShell>
      )}

      {/* =====================================================
          PLAYGROUND
      ===================================================== */}

      {open && selectedExperience === "playground" && (
        <ExperienceShell key="playground">
          <InteractiveDemo />
        </ExperienceShell>
      )}

      {/* =====================================================
          SECRET
      ===================================================== */}

      {open && selectedExperience === "secret" && (
        <ExperienceShell key="secret">
          <SecretExperience
            open={true}
            onClose={handleBack}
          />
        </ExperienceShell>
      )}

      {/* =====================================================
          COMMAND CENTER
      ===================================================== */}

      {open && selectedExperience === "command" && (
        <ExperienceShell key="command">
          <CommandCenter
            open={open}
            onClose={handleBack}
          />
        </ExperienceShell>
      )}

      {/* =====================================================
          HIRE EXPERIENCE
      ===================================================== */}

      {open && selectedExperience === "hire" && (
        <ExperienceShell key="hire">
          <HireExperience onClose={handleBack} />
        </ExperienceShell>
      )}

      {/* =====================================================
          MIND LAB
      ===================================================== */}

      {open && selectedExperience === "mind-lab" && (
        <ExperienceShell key="mind-lab">
          <MindLab />
        </ExperienceShell>
      )}
    </AnimatePresence>
  );
}