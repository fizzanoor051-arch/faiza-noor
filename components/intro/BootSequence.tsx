"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnergyCore } from "./EnergyCore";
import { ParticleField } from "./ParticleField";

const INITIALIZING_STEPS = [
  "INITIALIZING INTERFACE",
  "LOADING UI / UX ENGINE",
  "REACT 19 / NEXT.JS READY",
  "NODE.JS & MONGODB ONLINE",
  "DEPLOYING PORTFOLIO ENVIRONMENT",
];

interface BootProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scene, setScene] = useState<"darkness" | "core" | "welcome" | "loading">("darkness");

  useEffect(() => {
    // Stage Transitions Timeline
    const t1 = setTimeout(() => setScene("core"), 1000);
    const t2 = setTimeout(() => setScene("welcome"), 3000);
    const t3 = setTimeout(() => setScene("loading"), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (scene !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [scene, onComplete]);

  useEffect(() => {
    if (scene === "loading") {
      const stepInterval = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % INITIALIZING_STEPS.length);
      }, 700);
      return () => clearInterval(stepInterval);
    }
  }, [scene]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030308] text-white overflow-hidden"
    >
      <ParticleField />

      {/* Ambient background light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_radial-gradient(rgba(88,28,135,0.15),transparent_70%)]" />

      <AnimatePresence mode="wait">
        {/* SCENE 02 & 03: ENERGY CORE / PORTAL */}
        {(scene === "core" || scene === "welcome") && (
          <motion.div
            key="core-scene"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
            className="absolute"
          >
            <EnergyCore />
          </motion.div>
        )}

        {/* SCENE 04: WELCOME TYPOGRAPHY */}
        {scene === "welcome" && (
          <motion.div
            key="welcome-text"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1.2 }}
            className="z-10 text-center tracking-[0.35em]"
          >
            <p className="text-xs uppercase text-purple-400/80 mb-2 font-mono">Welcome To My</p>
            <h1 className="text-5xl font-extrabold tracking-[0.2em] md:text-7xl text-glow bg-gradient-to-r from-white via-purple-200 to-indigo-400 bg-clip-text text-transparent">
              PORTFOLIO
            </h1>
          </motion.div>
        )}

        {/* SCENE 05 & 06: SYSTEM BOOT & LOADING */}
        {scene === "loading" && (
          <motion.div
            key="loading-scene"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="z-10 w-full max-w-md px-6 font-mono"
          >
            <div className="glass-panel p-6 rounded-xl border border-purple-500/20 shadow-2xl">
              <div className="flex justify-between items-center mb-4 text-xs tracking-widest text-purple-300">
                <span>SYSTEM ONLINE</span>
                <span>{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-purple-950/60 rounded-full overflow-hidden mb-6 border border-purple-800/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status Step Ticker */}
              <div className="text-left text-[11px] tracking-wider text-purple-200/70 h-6">
                &gt; {INITIALIZING_STEPS[stepIndex]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}