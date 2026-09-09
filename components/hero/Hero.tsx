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
  href="/projects"
  className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
    View My Work
  </span>
</a>

<a
  href="/contact"
  className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
    Contact Me
  </span>
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