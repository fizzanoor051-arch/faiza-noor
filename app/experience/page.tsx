
import Link from "next/link";
import { experience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.035] blur-[130px]" />
        <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-[5%] left-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.025] blur-[140px]" />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:px-10 lg:py-28">
        {/* =========================================================
            HERO
        ========================================================= */}
        <header className="relative max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-cyan-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-400 sm:text-xs">
              Experience / Professional Journey
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Building skills.
            <span className="block text-white/30">
              Building real solutions.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-base leading-8 text-white/50 sm:text-lg">
            A multidisciplinary professional journey spanning Full Stack Web
            Development, Microsoft Office, and teaching — built through
            hands-on practice, real-world problem solving, continuous learning,
            and project-based work.
          </p>

          {/* Availability / positioning */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300/80">
                Open to Opportunities
              </span>
            </div>

            <div className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Full Stack Web Developer
            </div>
          </div>

          {/* =========================================================
              EXPERIENCE METRICS
          ========================================================= */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                6+
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                Months
              </p>
              <p className="mt-1 text-xs text-white/25">
                Full Stack Development
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                1+
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                Year
              </p>
              <p className="mt-1 text-xs text-white/25">
                MS Office Experience
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                2
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                Years
              </p>
              <p className="mt-1 text-xs text-white/25">
                Teaching Experience
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                E2E
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                Development
              </p>
              <p className="mt-1 text-xs text-white/25">
                Frontend → Backend
              </p>
            </div>
          </div>
        </header>

        {/* =========================================================
            EXPERIENCE SECTION
        ========================================================= */}
        <section className="mt-24 md:mt-32">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-400">
                Career Timeline
              </span>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Experience that compounds.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/35 md:text-right">
              Each experience has contributed a different layer of technical,
              professional, communication, and problem-solving capability.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Desktop timeline */}
            <div className="absolute left-[19px] top-6 hidden h-[calc(100%-48px)] w-px bg-gradient-to-b from-cyan-400/60 via-white/10 to-transparent md:block" />

            <div className="space-y-8 md:space-y-10">
              {experience.map((item, index) => (
                <article
                  key={item.id}
                  className="group relative md:pl-16"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-8 hidden md:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-[#05050a] transition duration-500 group-hover:border-cyan-400/50">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.8)] transition duration-500 group-hover:scale-125" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04] hover:shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
                    {/* Top Accent */}
                    <div className="h-px w-full bg-gradient-to-r from-cyan-400/80 via-blue-400/30 to-transparent" />

                    {/* Background Glow */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-400/[0.025] blur-3xl transition duration-500 group-hover:bg-cyan-400/[0.06]" />

                    <div className="relative p-7 sm:p-8 md:p-10">
                      {/* Header Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-[10px]">
                            {item.period}
                          </span>

                          <span className="rounded-full border border-white/[0.07] px-3.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-white/25 sm:text-[10px]">
                            {item.type}
                          </span>
                        </div>

                        <span className="font-mono text-xs text-white/15">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Role */}
                      <div className="mt-8">
                        <h3 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl md:text-4xl">
                          {item.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-cyan-400/70">
                            {item.organization}
                          </span>

                          <span className="hidden text-white/15 sm:inline">
                            /
                          </span>

                          <span className="text-xs text-white/25">
                            Professional Experience
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-7 max-w-4xl text-sm leading-8 text-white/50 sm:text-base">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-9">
                        <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
                          Key Contributions
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          {item.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="group/highlight flex gap-3 rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3.5 transition duration-300 hover:border-cyan-400/15 hover:bg-cyan-400/[0.025]"
                            >
                              <span className="mt-0.5 text-sm text-cyan-400/70 transition group-hover/highlight:text-cyan-300">
                                ↳
                              </span>

                              <span className="text-sm leading-6 text-white/45">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mt-10 border-t border-white/[0.06] pt-7">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
                            Technologies & Expertise
                          </span>

                          <span className="text-[9px] uppercase tracking-[0.2em] text-white/15">
                            Core Stack
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-[11px] text-white/40 transition duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04] hover:text-cyan-300"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FULL STACK CAPABILITY
        ========================================================= */}
        <section className="mt-24 md:mt-32">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 sm:p-9 md:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  Development Capability
                </span>

                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  From idea to
                  <span className="text-white/30"> working product.</span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
                  My development experience covers the complete application
                  lifecycle — from designing responsive interfaces to building
                  backend logic, connecting databases, securing APIs, and
                  preparing applications for deployment.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    number: "01",
                    title: "Frontend Engineering",
                    text: "Responsive, accessible and polished interfaces.",
                  },
                  {
                    number: "02",
                    title: "Backend Development",
                    text: "Server-side logic, APIs and application architecture.",
                  },
                  {
                    number: "03",
                    title: "Database Systems",
                    text: "Structured data, queries and database-driven applications.",
                  },
                  {
                    number: "04",
                    title: "Authentication",
                    text: "Secure login flows, protected routes and user access.",
                  },
                  {
                    number: "05",
                    title: "API Integration",
                    text: "REST APIs, third-party services and data communication.",
                  },
                  {
                    number: "06",
                    title: "Deployment",
                    text: "Production builds, hosting and deployment workflows.",
                  },
                ].map((capability) => (
                  <div
                    key={capability.number}
                    className="rounded-2xl border border-white/[0.07] bg-black/10 p-5 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.025]"
                  >
                    <div className="font-mono text-[10px] text-cyan-400/60">
                      {capability.number}
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-white/80">
                      {capability.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/30">
                      {capability.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROFESSIONAL FOCUS
        ========================================================= */}
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/[0.05] via-white/[0.025] to-transparent p-7 sm:p-9 md:p-12">
          <div className="max-w-4xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Current Focus
            </span>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Growing as a complete web developer.
            </h2>

            <p className="mt-5 text-sm leading-8 text-white/45 sm:text-base">
              I am focused on turning technical knowledge into practical,
              production-oriented solutions. My goal is not simply to write
              code, but to understand the complete problem — design the
              experience, architect the application, implement the logic,
              manage data, integrate services, test the system, and deliver a
              reliable final product.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "React.js",
                "TypeScript",
                "Next.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "PostgreSQL",
                "SQL",
                "REST APIs",
                "Authentication",
                "Git & GitHub",
                "Docker",
                "Testing",
                "Deployment",
                "AI Integration",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-black/10 px-3.5 py-2 text-[11px] text-white/40 transition hover:border-cyan-400/20 hover:text-cyan-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            BACK BUTTON
        ========================================================= */}
        <div className="mt-12 flex">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm text-white/55 transition duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            <span>Back to Home</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
