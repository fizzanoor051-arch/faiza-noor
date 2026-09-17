
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Sparkles } from "lucide-react";

function TypingSkill() {
  const skills = [
    "React Developer ⚛️",
    "Next.js Developer ▲",
    "JavaScript Developer 🟨",
    "TypeScript Developer 🔷",
    "Full-Stack Engineer 💻",
    "Frontend Developer 🎨",
    "Backend Developer ⚙️",
    "MERN Developer 🚀",
    "Database Developer 🗄️",
    "AI Integration Developer 🤖",
    "REST API Developer 🔌",
    "UI/UX Developer ✨",
  ];

  const [skillIndex, setSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[skillIndex];
    const typingSpeed = deleting ? 40 : 75;

    const timer = setTimeout(() => {
      if (!deleting) {
        const nextText = currentSkill.slice(
          0,
          displayText.length + 1
        );

        setDisplayText(nextText);

        if (nextText === currentSkill) {
          setTimeout(() => {
            setDeleting(true);
          }, 1600);
        }
      } else {
        const nextText = currentSkill.slice(
          0,
          Math.max(0, displayText.length - 1)
        );

        setDisplayText(nextText);

        if (nextText === "") {
          setDeleting(false);

          setSkillIndex(
            (current) => (current + 1) % skills.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, deleting, skillIndex]);

  return <>{displayText}</>;
}

export function Hero() {
  const techStack = [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
  ];

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
            Building modern, scalable web applications with polished user experiences, robust full-stack architecture, and intelligent AI-powered solutions.
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

        {/* Right Column — Premium Cyber Developer Core */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-[540px] h-[450px] overflow-hidden rounded-[28px] border border-purple-500/25 bg-[#07070d]/90 shadow-[0_0_80px_rgba(109,40,217,0.18)] backdrop-blur-xl">

            {/* Cyber ambient glow */}
            <motion.div
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [0.95, 1.08, 0.95],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[100px]"
            />

            {/* Technical grid */}
            <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(rgba(168,85,247,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.5)_1px,transparent_1px)] [background-size:35px_35px]" />

            {/* Scan lines */}
            <motion.div
              animate={{ y: ["-100%", "500%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-[1px]"
            />

            <motion.div
              animate={{ y: ["500%", "-100%"] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
            />

            {/* Terminal Header */}
            <div className="relative z-20 flex items-center justify-between border-b border-purple-500/20 bg-black/40 px-5 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>

                <div className="ml-2 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-purple-400" />
                  <span className="text-[11px] font-mono tracking-wider text-purple-300">
                    faiza-noor-dev.ts
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                />
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
                  Online
                </span>
              </div>
            </div>

            {/* Background code fragments */}
            <div className="absolute inset-0 pointer-events-none select-none font-mono text-[9px] leading-5">
              <motion.div
                animate={{ y: [0, -18, 0], opacity: [0.12, 0.22, 0.12] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-5 top-24 text-purple-400"
              >
                <div>const developer = {"{"}</div>
                <div className="pl-3">name: &quot;Faiza Noor&quot;,</div>
                <div className="pl-3">stack: &quot;Full-Stack&quot;,</div>
                <div className="pl-3">status: &quot;building...&quot;</div>
                <div>{"}"}</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], opacity: [0.08, 0.18, 0.08] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-5 top-32 text-cyan-400 text-right"
              >
                <div>async function create()</div>
                <div>{"{"}</div>
                <div className="pr-3">return innovation;</div>
                <div>{"}"}</div>
              </motion.div>

              <motion.div
                animate={{ opacity: [0.05, 0.16, 0.05] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-28 left-8 text-pink-400"
              >
                {"<AI-powered />"}
              </motion.div>

              <motion.div
                animate={{ opacity: [0.05, 0.16, 0.05] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute bottom-32 right-8 text-purple-400"
              >
                {"<scale />"}
              </motion.div>
            </div>

            {/* Central Developer Core */}
            <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">

              {/* Outer rotating technical ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-14 rounded-full border border-dashed border-purple-500/20"
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,1)]" />
              </motion.div>

              {/* Inner rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-9 rounded-full border border-cyan-400/15"
              >
                <span className="absolute right-1 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
              </motion.div>

              {/* Main core */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 25px rgba(139,92,246,0.18), inset 0 0 30px rgba(139,92,246,0.08)",
                    "0 0 55px rgba(34,211,238,0.25), inset 0 0 40px rgba(34,211,238,0.08)",
                    "0 0 25px rgba(139,92,246,0.18), inset 0 0 30px rgba(139,92,246,0.08)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-44 w-44 items-center justify-center rounded-full border border-purple-400/30 bg-[#080812]/95 backdrop-blur-xl"
              >
                {/* Core radial lines */}
                <div className="absolute inset-4 rounded-full border border-purple-400/10" />
                <div className="absolute inset-8 rounded-full border border-cyan-400/10" />

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
                />

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
                />

                {/* Identity */}
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.04, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-2xl font-black tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300"
                  >
                    FAIZA
                  </motion.div>

                  <div className="mt-1 text-[8px] font-mono tracking-[0.45em] text-gray-500">
                    NOOR
                  </div>

                  <div className="mx-auto mt-3 h-px w-14 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

                  <div className="mt-2 text-[7px] font-mono tracking-[0.28em] text-cyan-400/70">
                    CODE • CREATE • SCALE
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Tech Stack */}
            <div className="absolute left-5 right-5 top-[250px] z-20 flex flex-wrap justify-center gap-2">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: [0.55, 1, 0.55],
                    y: [0, index % 2 === 0 ? -3 : 3, 0],
                  }}
                  transition={{
                    opacity: {
                      duration: 2.5 + index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    y: {
                      duration: 3 + index * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="flex items-center gap-1.5 rounded-md border border-purple-400/15 bg-black/50 px-2.5 py-1.5 backdrop-blur-md"
                >
                  <Code className="h-3 w-3 text-cyan-400" />
                  <span className="font-mono text-[9px] text-gray-300">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* System Status */}
            <div className="absolute bottom-[82px] left-5 right-5 flex items-center justify-between rounded-lg border border-purple-500/15 bg-black/40 px-4 py-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                />

                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-gray-500">
                  System Ready
                </span>
              </div>

              <div className="font-mono text-[8px] tracking-[0.2em] text-purple-400/70">
                FULL-STACK / AI / WEB
              </div>
            </div>

            {/* Skill Typing Area */}
            <div className="absolute bottom-5 left-0 right-0 z-30 flex flex-col items-center">
              <div className="mb-2 text-[9px] font-mono uppercase tracking-[0.3em] text-gray-500">
                FAIZA NOOR • FULL-STACK DEVELOPER
              </div>

              <div className="flex h-9 min-w-[285px] items-center justify-center rounded-lg border border-purple-500/25 bg-black/60 px-5 shadow-[0_0_25px_rgba(139,92,246,0.1)] backdrop-blur-xl">
                <span className="font-mono text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                  <TypingSkill />
                </span>

                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  className="ml-1 h-4 w-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
              </div>
            </div>

            {/* Corner HUD details */}
            <div className="absolute bottom-3 left-4 font-mono text-[7px] tracking-[0.25em] text-purple-500/30">
              01 / DEV_CORE
            </div>

            <div className="absolute bottom-3 right-4 font-mono text-[7px] tracking-[0.25em] text-cyan-500/30">
              ONLINE
            </div>

            {/* Corner brackets */}
            <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-purple-400/30" />
            <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-purple-400/30" />
            <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-purple-400/30" />
            <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-purple-400/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
