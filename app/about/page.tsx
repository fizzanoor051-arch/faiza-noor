import Link from "next/link";

const education = [
  {
    year: "2025",
    title: "F.Sc. Pre-Medical",
    institution: "Higher Secondary Education",
    result: "Completed",
    description:
      "Completed higher secondary education with a strong academic foundation in science and analytical subjects.",
  },
  {
    year: "2024",
    title: "Matriculation",
    institution: "Secondary School Education",
    result: "Completed",
    description:
      "Built a strong academic foundation with a focus on science, mathematics and problem-solving.",
  },
];

const technologies = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Git & GitHub",
  "Docker",
  "AI Integration",
  "Authentication Systems",
  "Frontend Web Development",
  "Backend Web Development",
  "Full Stack Development",
  "Responsive Web Design",

];

const focusAreas = [
  {
    number: "01",
    title: "Frontend Engineering",
    text:
      "Building responsive, accessible and highly interactive interfaces with React, Next.js and TypeScript.",
  },
  {
    number: "02",
    title: "Backend Engineering",
    text:
      "Building scalable and efficient backend systems with Node.js, Express.js and databases.",
  },
  {
    number: "03",
    title: "Full Stack Systems",
    text:
      "Connecting polished frontend experiences with scalable APIs, databases, authentication and backend architecture.",
  },
  {
    number: "04",
    title: "Digital Experiences",
    text:
      "Creating cinematic interfaces that combine visual storytelling, motion design and strong engineering.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* =========================================
          BACKGROUND
      ========================================== */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute right-[5%] top-[35%] h-[380px] w-[380px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full bg-violet-500/8 blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      {/* =========================================
          HERO
      ========================================== */}
      <section className="relative z-10 px-6 pb-24 pt-36 sm:px-10 lg:px-16 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-white/40" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
              02 / About
            </span>
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-6 max-w-xl text-sm uppercase tracking-[0.25em] text-purple-300/70">
                Full Stack Web Engineer
              </p>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[7.5rem]">
                I BUILD
                <br />
                <span className="bg-linear-to-r from-white via-white to-white/35 bg-clip-text text-transparent">
                  DIGITAL WORLDS.
                </span>
              </h1>
            </div>

            <div className="max-w-md lg:pb-3">
              <p className="text-base leading-8 text-white/55 sm:text-lg">
                I&apos;m Faiza Noor, a Full Stack Web Engineer focused on
                building modern digital products that feel as refined as they
                function.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                Open to selected freelance projects
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          INTRODUCTION
      ========================================== */}
      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
              01 — Identity
            </span>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Engineering with
              <br />
              <span className="text-white/40">intention.</span>
            </h2>
          </div>

          <div className="max-w-3xl space-y-7 text-base leading-8 text-white/55 sm:text-lg">
            <p>
              I&apos;m passionate about turning ideas into polished,
              production-ready web experiences. My approach combines frontend
              engineering, backend architecture, interaction design and
              performance.
            </p>

            <p>
              I care about the details people notice and the engineering
              details they don&apos;t. From responsive layouts and smooth
              animations to clean APIs and scalable application structure,
              every layer should work together.
            </p>

            <p>
              My goal is simple: create websites and applications that are
              visually memorable, technically strong and genuinely useful for
              the people who use them.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          EDUCATION
      ========================================== */}
      <section
        id="education"
        className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
                02 — Education
              </span>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Academic
                <br />
                <span className="text-white/35">foundation.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/40">
              My academic background gave me the discipline, curiosity and
              problem-solving mindset that I now bring into software
              engineering.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {education.map((item) => (
              <article
                key={item.title}
                className="group relative bg-[#08080f] p-7 transition-colors duration-500 hover:bg-[#0d0c17] sm:p-10"
              >
                <div className="absolute right-8 top-8 text-[10px] uppercase tracking-[0.25em] text-white/25">
                  {item.year}
                </div>

                <div className="mb-14 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-xs text-white/60 transition-all duration-500 group-hover:border-purple-300/40 group-hover:text-purple-200">
                  FN
                </div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-purple-300/60">
                  {item.institution}
                </p>

                <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                  {item.title}
                </h3>

                <div className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {item.result}
                </div>

                <p className="mt-7 max-w-lg text-sm leading-7 text-white/40">
                  {item.description}
                </p>

                <div className="mt-10 h-px w-full bg-white/8">
                  <div className="h-px w-0 bg-purple-300/60 transition-all duration-700 group-hover:w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          JOURNEY
      ========================================== */}
      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
                03 — Journey
              </span>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                From curiosity
                <br />
                <span className="text-white/35">to engineering.</span>
              </h2>
            </div>

            <div className="border-l border-white/10 pl-7 sm:pl-10">
              <div className="relative pb-14">
                <span className="absolute -left-[34px] top-1 h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,0.7)] sm:-left-[45px]" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  Foundation
                </span>

                <h3 className="mt-3 text-2xl font-medium">
                  Learning how things work
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                  My journey started with a curiosity for technology and
                  problem-solving. I began with the fundamentals of web
                  development and gradually moved toward modern application
                  architecture.
                </p>
              </div>

              <div className="relative pb-14">
                <span className="absolute -left-[34px] top-1 h-2 w-2 rounded-full border border-purple-300/60 bg-[#05050a] sm:-left-[45px]" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  Engineering
                </span>

                <h3 className="mt-3 text-2xl font-medium">
                  Building real applications
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                  I expanded into React, Next.js, TypeScript, Node.js,
                  databases, APIs and authentication — moving from individual
                  interfaces toward complete full-stack systems.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[34px] top-1 h-2 w-2 rounded-full border border-purple-300/60 bg-[#05050a] sm:-left-[45px]" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  Now
                </span>

                <h3 className="mt-3 text-2xl font-medium">
                  Creating premium digital experiences
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                  Today I focus on combining engineering with visual
                  storytelling — creating websites that are fast, scalable,
                  interactive and memorable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          TECHNICAL EXPERTISE
      ========================================== */}
      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
              04 — Technical Expertise
            </span>

            <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              The tools behind
              <br />
              <span className="text-white/35">the experience.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-xs tracking-wide text-white/55 transition-all duration-300 hover:border-purple-300/30 hover:bg-purple-500/5 hover:text-white"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          WHAT I DO
      ========================================== */}
      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
              05 — What I Do
            </span>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Engineering meets
              <br />
              <span className="text-white/35">experience design.</span>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <article
                key={area.number}
                className="group bg-[#08080f] p-8 transition-colors duration-500 hover:bg-[#0c0b15] lg:p-10"
              >
                <span className="text-[10px] tracking-[0.25em] text-white/25">
                  {area.number}
                </span>

                <h3 className="mt-20 text-2xl font-medium tracking-[-0.03em]">
                  {area.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/40">
                  {area.text}
                </p>

                <div className="mt-10 h-px w-full bg-white/8">
                  <div className="h-px w-0 bg-purple-300/60 transition-all duration-700 group-hover:w-1/2" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================== */}
      <section className="relative z-10 px-6 py-28 sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-purple-300/70">
            Let&apos;s build something exceptional
          </span>

          <h2 className="mt-7 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            HAVE AN IDEA?
            <br />
            <span className="text-white/30">
              LET&apos;S ENGINEER IT.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
            Explore my work or get in touch if you have a project that needs
            thoughtful design and serious engineering.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 rounded-full border border-white/15 bg-white px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-white/90"
            >
              Explore Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-white/10 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white/65 transition-all duration-300 hover:border-purple-300/30 hover:text-white"
            >
              Start a Conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}