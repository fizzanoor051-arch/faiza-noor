
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-[#170F1D]">

      {/* Tangled-inspired background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(15, 10, 24, 0.88) 0%,
              rgba(15, 10, 24, 0.68) 45%,
              rgba(15, 10, 24, 0.30) 100%
            ),
            url('/images/tangled.jpg')
          `,
        }}
      />

      {/* Existing glow and grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#f4c875_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Original background glow and subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content — Left side, space reserved on the right */}
      <div className="relative z-10 max-w-7xl w-full flex items-center justify-start pl-2 sm:pl-6 lg:pl-10 pt-8 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8 max-w-2xl"
        >
          {/* Professional Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-purple-300 text-xs tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FULL STACK WEB ENGINEER</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.1]">
            Hi, I&apos;m <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Faiza Noor
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
            Building modern, scalable web applications with polished user
            experiences, robust full-stack architecture, and intelligent
            AI-powered solutions.
          </p>

          {/* Buttons — Original liquid pink animations preserved */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* View My Work */}
            <a
              href="/projects"
              className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
            >
              {/* Liquid pink fill */}
              <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

              {/* Liquid glow */}
              <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

              {/* Button text */}
              <span className="relative z-10 font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
                View My Work
              </span>
            </a>

            {/* Contact Me */}
            <a
              href="/contact"
              className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
            >
              {/* Liquid pink fill */}
              <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

              {/* Liquid glow */}
              <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

              {/* Button text */}
              <span className="relative z-10 font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
                Contact Me
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
