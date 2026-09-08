"use client";

import { motion } from "framer-motion";
import { Code, Terminal, Sparkles } from "lucide-react";

export function Hero() {
  const techStack = ["React", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript"];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-[#030308]">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column — Content Intro */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FULL STACK WEB ENGINEER</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I&apos;m <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Faiza Noor
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed">
            Crafting scalable web applications, sleek UI/UX interfaces, and performant back-end systems.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-purple-500/30 hover:bg-purple-950/40 text-purple-200 font-medium text-sm transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Column — Code Terminal & Skill Badges */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono text-purple-300">faiza-noor-dev.ts</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-mono text-gray-400">// Primary Tech Stack</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {techStack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-purple-500/20 bg-purple-950/20 hover:border-purple-400/50 transition-colors"
                  >
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-mono text-gray-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}