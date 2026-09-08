
"use client";

import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";
import { useState } from "react";

type SecretTriggerProps = {
  onActivate: () => void;
};

export default function SecretTrigger({
  onActivate,
}: SecretTriggerProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      aria-label="Secret"
      onClick={onActivate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition-all duration-500 hover:border-white/10 hover:bg-white/[0.03]"
      whileTap={{ scale: 0.9 }}
    >
      {/* Hidden glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.4 : 0.6,
        }}
      />

      <Fingerprint
        className="relative h-4 w-4 text-white/10 transition-all duration-500 group-hover:text-violet-300/70"
        strokeWidth={1.4}
      />

      {/* Tiny indicator */}
      <motion.span
        className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-violet-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0.15 }}
      />
    </motion.button>
  );
}
