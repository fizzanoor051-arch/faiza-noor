"use client";

import { motion } from "framer-motion";

export function EnergyCore() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Glow Ring */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.8, 1.15, 1], opacity: [0.3, 0.8, 0.6] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-cyan-500/30 blur-2xl"
      />

      {/* Rotating Core Grid Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="relative flex h-64 w-64 items-center justify-center rounded-full border border-purple-500/30 bg-purple-950/10 backdrop-blur-3xl"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="h-48 w-48 rounded-full border border-dashed border-cyan-400/40"
        />
        {/* Inner Aperture Node */}
        <div className="absolute h-24 w-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 opacity-80 blur-md" />
        <div className="absolute h-8 w-8 rounded-full bg-cyan-300 shadow-[0_0_25px_#a855f7]" />
      </motion.div>
    </div>
  );
}