
"use client";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

const lanterns = [
  { left: "9%", top: "22%", size: 19 },
  { left: "82%", top: "17%", size: 23 },
  { left: "74%", top: "76%", size: 16 },
  { left: "17%", top: "78%", size: 22 },
  { left: "92%", top: "48%", size: 17 },
  { left: "53%", top: "12%", size: 14 },
];

const skills = ["Next.js", "React", "Node.js", "AI Integration"];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [activeLantern, setActiveLantern] = useState(-1);

  // REAL CURSOR POSITION
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);

  // SMOOTH FOLLOWING TRAILS
  const trailX1 = useSpring(cursorX, {
    stiffness: 90,
    damping: 20,
  });
  const trailY1 = useSpring(cursorY, {
    stiffness: 90,
    damping: 20,
  });

  const trailX2 = useSpring(cursorX, {
    stiffness: 45,
    damping: 18,
  });
  const trailY2 = useSpring(cursorY, {
    stiffness: 45,
    damping: 18,
  });

  const trailX3 = useSpring(cursorX, {
    stiffness: 25,
    damping: 16,
  });
  const trailY3 = useSpring(cursorY, {
    stiffness: 25,
    damping: 16,
  });

  // BACKGROUND PARALLAX
  const backgroundX = useTransform(offsetX, [-700, 700], [18, -18]);
  const backgroundY = useTransform(offsetY, [-500, 500], [12, -12]);

  // INTERACTIVE 3D ORB
  const orbX = useSpring(
    useTransform(offsetX, [-700, 700], [-32, 32]),
    { stiffness: 65, damping: 18 }
  );

  const orbY = useSpring(
    useTransform(offsetY, [-500, 500], [-28, 28]),
    { stiffness: 65, damping: 18 }
  );

  const orbRotateX = useSpring(
    useTransform(offsetY, [-500, 500], [18, -18]),
    { stiffness: 70, damping: 20 }
  );

  const orbRotateY = useSpring(
    useTransform(offsetX, [-700, 700], [-20, 20]),
    { stiffness: 70, damping: 20 }
  );

  // POINTER INTERACTION
  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    cursorX.set(x);
    cursorY.set(y);

    offsetX.set(x - rect.width / 2);
    offsetY.set(y - rect.height / 2);

    cursorOpacity.set(1);
  };

  const handlePointerLeave = () => {
    cursorOpacity.set(0);
    setActiveLantern(-1);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#170F1D] px-6 pb-16 pt-24"
    >

      {/* ORIGINAL TANGLED IMAGE - NEVER REMOVED */}
      <motion.div
        className="pointer-events-none absolute inset-[-25px] z-0 bg-cover bg-center bg-no-repeat"
        style={{
          x: reduceMotion ? 0 : backgroundX,
          y: reduceMotion ? 0 : backgroundY,
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(15,10,24,0.86) 0%,
              rgba(15,10,24,0.63) 48%,
              rgba(15,10,24,0.28) 100%
            ),
            url('/images/tangled.jpg')
          `,
        }}
      />

      {/* CINEMATIC OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#170F1D]/30 via-transparent to-[#170F1D]/85" />

      {/* GOLDEN ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(255,190,85,0.16),transparent_45%)]" />

      {/* CURSOR FOLLOWING LIGHT */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute z-[3] h-[480px] w-[480px] rounded-full"
          style={{
            left: cursorX,
            top: cursorY,
            opacity: cursorOpacity,
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, rgba(255,198,92,0.13) 0%, rgba(255,170,70,0.06) 35%, transparent 70%)",
          }}
        />
      )}

      {/* MAGICAL CURSOR TRAIL */}
      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute z-[12] h-3 w-3 rounded-full bg-amber-100 shadow-[0_0_18px_5px_rgba(255,210,100,0.7)]"
            style={{
              left: cursorX,
              top: cursorY,
              opacity: cursorOpacity,
              x: "-50%",
              y: "-50%",
            }}
          />

          <motion.div
            className="pointer-events-none absolute z-[11] h-7 w-7 rounded-full border border-amber-200/60"
            style={{
              left: trailX1,
              top: trailY1,
              opacity: cursorOpacity,
              x: "-50%",
              y: "-50%",
            }}
          />

          <motion.div
            className="pointer-events-none absolute z-[10] h-12 w-12 rounded-full border border-amber-300/30"
            style={{
              left: trailX2,
              top: trailY2,
              opacity: cursorOpacity,
              x: "-50%",
              y: "-50%",
            }}
          />

          <motion.div
            className="pointer-events-none absolute z-[9] h-20 w-20 rounded-full border border-pink-200/15"
            style={{
              left: trailX3,
              top: trailY3,
              opacity: cursorOpacity,
              x: "-50%",
              y: "-50%",
            }}
          />
        </>
      )}

      {/* MAGICAL INTERCONNECTED LIGHT THREADS */}
      <svg
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="threadGradient">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0 30 Q25 5 48 35 T100 25"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth=".15"
          strokeDasharray="2 2"
          animate={reduceMotion ? {} : { pathLength: [0.3, 1, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.path
          d="M0 75 Q30 45 55 75 T100 60"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth=".15"
          strokeDasharray="2 3"
          animate={reduceMotion ? {} : { pathLength: [1, 0.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </svg>

      {/* INTERACTIVE LANTERNS */}
      {lanterns.map((lantern, index) => (
        <motion.div
          key={index}
          onHoverStart={() => setActiveLantern(index)}
          onHoverEnd={() => setActiveLantern(-1)}
          className="absolute z-[4] cursor-pointer rounded-full"
          style={{
            left: lantern.left,
            top: lantern.top,
            width: lantern.size,
            height: lantern.size * 1.35,
            background:
              "radial-gradient(ellipse, #FFF8D6 0%, #FBBF24 45%, #F97316 80%, transparent 100%)",
            boxShadow:
              activeLantern === index
                ? "0 0 30px 15px rgba(255,195,65,0.75)"
                : "0 0 15px 5px rgba(251,191,36,0.35)",
          }}
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -20, 0],
                  x: [0, 8, -5, 0],
                  scale: activeLantern === index ? 1.8 : [0.9, 1.1, 0.9],
                }
          }
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* RIGHT SIDE - FLOATING 3D MAGICAL ORB */}
      <div
        className="pointer-events-none absolute right-[5%] top-1/2 z-[5] hidden -translate-y-1/2 lg:block"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          style={{
            x: reduceMotion ? 0 : orbX,
            y: reduceMotion ? 0 : orbY,
            rotateX: reduceMotion ? 0 : orbRotateX,
            rotateY: reduceMotion ? 0 : orbRotateY,
          }}
          animate={reduceMotion ? {} : { y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-64 w-64 items-center justify-center"
        >
          {/* OUTER RING */}
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-amber-200/30"
          />

          <motion.div
            animate={reduceMotion ? {} : { rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute inset-5 rounded-full border border-dashed border-pink-200/30"
          />

          {/* ORB */}
          <div
            className="relative flex h-36 w-36 items-center justify-center rounded-full border border-amber-100/40 bg-gradient-to-br from-amber-100/30 via-purple-500/30 to-pink-500/30 shadow-[inset_-15px_-15px_35px_rgba(0,0,0,0.4),0_0_65px_rgba(251,191,36,0.3)] backdrop-blur-xl"
          >
            <div className="absolute left-5 top-5 h-10 w-10 rounded-full bg-white/40 blur-xl" />

            <Sparkles className="h-12 w-12 text-amber-100 drop-shadow-[0_0_15px_rgba(255,220,130,0.9)]" />

            <div className="absolute inset-3 rounded-full border border-white/20" />
          </div>

          {/* ORBITING LIGHT */}
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-amber-100 shadow-[0_0_20px_8px_rgba(251,191,36,0.6)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-[6] mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl space-y-8"
        >

         

          {/* NAME */}
          <h1 className="text-5xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Hi, I&apos;m
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Faiza Noor
            </span>
            <span className="text-amber-300">.</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-xl text-base leading-relaxed text-gray-200/90 sm:text-lg md:text-xl">
            I build modern, scalable web applications with polished user
            experiences, robust full-stack architecture, and intelligent
            AI-powered solutions.
          </p>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-gray-200 backdrop-blur-md"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="/projects"
              className="group relative inline-flex min-h-[50px] items-center gap-2 overflow-hidden rounded-full border border-amber-200/50 bg-violet-700 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(251,191,36,0.3)]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-pink-600 via-fuchsia-500 to-amber-400 transition-transform duration-700 group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>

            <a
              href="/contact"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-white/30 bg-white/[0.07] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-amber-200/70"
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* FOOTER TEXT */}
          <div className="flex items-center gap-3 pt-2 text-xs tracking-wide text-gray-300/70">
            <span className="h-px w-9 bg-amber-300/60" />
            Turning ideas into digital experiences.
          </div>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-28 bg-gradient-to-t from-[#170F1D] to-transparent" />
    </section>
  );
}
