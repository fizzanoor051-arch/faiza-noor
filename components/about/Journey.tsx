"use client";

import { useEffect, useRef, useState } from "react";

const journey = [
  {
    index: "01",
    phase: "FOUNDATION",
    title: "Learning the web",
    description:
      "Started with the fundamentals of HTML, CSS, and JavaScript, building a strong understanding of how the web actually works.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    index: "02",
    phase: "INTERFACE",
    title: "Building modern UIs",
    description:
      "Moved into React and TypeScript to create reusable interfaces, component systems, responsive layouts, and interactive experiences.",
    tags: ["React", "TypeScript", "UI"],
  },
  {
    index: "03",
    phase: "FULL-STACK",
    title: "Thinking beyond the browser",
    description:
      "Expanded into Next.js, Node.js, Express, APIs, authentication, databases, deployment, and the architecture behind production applications.",
    tags: ["Next.js", "Node.js", "APIs"],
  },
  {
    index: "04",
    phase: "NEXT PHASE",
    title: "Engineering for scale",
    description:
      "Continuing to strengthen backend architecture, testing, cloud deployment, Docker, and practical AI integrations.",
    tags: ["Docker", "Cloud", "AI"],
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-3xl border border-white/10 bg-white/[0.018] p-6 backdrop-blur-xl sm:p-8"
    >
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-purple-300/60">
            journey.log
          </p>

          <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">
            From curiosity to engineering
          </h3>
        </div>

        <div className="hidden rounded-full border border-white/8 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:block">
          04 phases
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-5 left-[19px] top-5 w-px bg-gradient-to-b from-purple-400/40 via-white/10 to-transparent" />

        <div className="space-y-8">
          {journey.map((item, index) => (
            <article
              key={item.index}
              className={`relative pl-14 transition-all duration-700 ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 130}ms`,
              }}
            >
              {/* Timeline node */}
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#090910]">
                <span className="h-2 w-2 rounded-full bg-purple-300/70 shadow-[0_0_12px_rgba(192,132,252,0.55)]" />
              </div>

              <div className="group rounded-2xl border border-transparent p-1 transition-all duration-300 hover:border-white/7 hover:bg-white/[0.025]">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-purple-300/65">
                    {item.phase}
                  </span>

                  <span className="font-mono text-[9px] text-white/20">
                    / {item.index}
                  </span>
                </div>

                <h4 className="text-lg font-medium text-white">
                  {item.title}
                </h4>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/40">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/7 bg-white/[0.025] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 transition-colors group-hover:text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Closing line */}
      <div className="mt-10 flex items-center gap-3 border-t border-white/7 pt-6">
        <span className="h-px flex-1 bg-white/7" />

        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          still building
        </span>

        <span className="h-px flex-1 bg-white/7" />
      </div>
    </div>
  );
}