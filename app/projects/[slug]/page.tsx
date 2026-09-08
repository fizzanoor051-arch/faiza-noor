import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Link
          href="/projects"
          className="text-sm text-white/40 transition hover:text-cyan-300"
        >
          ← Back to Projects
        </Link>

        <div className="mt-16">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              {project.category}
            </span>

            <span className="text-xs text-white/30">
              {project.year}
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/40">
              {project.status}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-8xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-9 text-white/55">
            {project.tagline}
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 lg:col-span-2">
            <span className="text-xs uppercase tracking-widest text-white/30">
              Overview
            </span>

            <p className="mt-5 leading-8 text-white/60">
              {project.description}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <span className="text-xs uppercase tracking-widest text-white/30">
              Role
            </span>

            <p className="mt-5 leading-7 text-white/70">
              {project.role}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <span className="text-xs uppercase tracking-widest text-white/30">
              Problem
            </span>

            <p className="mt-5 leading-8 text-white/60">
              {project.problem}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <span className="text-xs uppercase tracking-widest text-white/30">
              Solution
            </span>

            <p className="mt-5 leading-8 text-white/60">
              {project.solution}
            </p>
          </article>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-7">
          <span className="text-xs uppercase tracking-widest text-white/30">
            Technology Stack
          </span>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <span className="text-xs uppercase tracking-widest text-white/30">
              Features
            </span>

            <ul className="mt-6 space-y-4">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm leading-7 text-white/60"
                >
                  <span className="text-cyan-400">+</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <span className="text-xs uppercase tracking-widest text-white/30">
              Project Signals
            </span>

            <div className="mt-6 space-y-5">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <span className="text-sm text-white/40">
                    {metric.label}
                  </span>

                  <span className="text-sm text-white/80">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}