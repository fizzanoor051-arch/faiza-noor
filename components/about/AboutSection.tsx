"use client";

import { useEffect, useRef, useState } from "react";
import IdentityCard from "./IdentityCard";
import Journey from "./Journey";

const highlights = [
  {
    number: "01",
    title: "Product Thinking",
    description:
      "I focus on building interfaces that are clear, useful, responsive, and designed around real user needs.",
  },
  {
    number: "02",
    title: "Engineering Mindset",
    description:
      "From component architecture to APIs and data flow, I think beyond visuals and build systems that can grow.",
  },
  {
    number: "03",
    title: "Continuous Learning",
    description:
      "I keep expanding my stack while turning new concepts into practical projects and real-world solutions.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[18%] h-[420px] w-[420px] rounded-full bg-purple-600/8 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-[380px] w-[380px] rounded-full bg-cyan-500/6 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div
        className={`relative mx-auto max-w-7xl transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Section heading */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-purple-400" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300">
                01 / About
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              More than code.
              <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                I build digital systems.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:ml-auto">
            <p className="text-base leading-8 text-white/55 sm:text-lg">
              I&apos;m Faiza Noor, a Full-Stack Web Engineer focused on creating
              modern web experiences where thoughtful design meets reliable
              engineering.
            </p>
          </div>
        </div>

        {/* Identity + Journey */}
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <IdentityCard />
          <Journey />
        </div>

        {/* Engineering principles */}
        <div className="mt-20">
          <div className="mb-8 flex items-center justify-between gap-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/30">
                Engineering principles
              </p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">
                How I approach the work
              </h3>
            </div>

            <div className="hidden h-px flex-1 bg-white/8 sm:block" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item, index) => (
              <article
                key={item.number}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-purple-400/25 hover:bg-white/[0.045]"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-xs text-purple-300/70">
                    {item.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-hover:bg-purple-300 group-hover:shadow-[0_0_14px_rgba(192,132,252,0.8)]" />
                </div>

                <h4 className="mb-3 text-lg font-medium text-white">
                  {item.title}
                </h4>

                <p className="text-sm leading-7 text-white/45">
                  {item.description}
                </p>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-700 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 border-y border-white/8 py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-white/40">
              Design the experience. Engineer the system. Ship something people
              actually want to use.
            </p>

            <a
              href="#projects"
              className="group inline-flex w-fit items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              Explore my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
