import Link from "next/link";
import { experience } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <span className="text-xs uppercase tracking-[0.35em] text-cyan-400">
          Experience / Journey
        </span>

        <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
          Engineering in progress.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
          A transparent look at my development journey, independent projects,
          learning, and ongoing experimentation.
        </p>

        <div className="mt-20 space-y-8">
          {experience.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-widest text-cyan-400">
                  {item.period}
                </span>

                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  {item.type}
                </span>
              </div>

              <h2 className="mt-7 text-2xl font-medium md:text-3xl">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-white/35">
                {item.organization}
              </p>

              <p className="mt-6 max-w-3xl leading-8 text-white/55">
                {item.description}
              </p>

              <div className="mt-8 grid gap-3">
                {item.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex gap-3 text-sm text-white/55"
                  >
                    <span className="text-cyan-400">↳</span>
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {item.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/40"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-block rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-cyan-400/50 hover:bg-white/5"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}