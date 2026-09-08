"use client";

interface Experience {
  id: string;
  period: string;
  type: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

interface ExperienceItemProps {
  experience: Experience;
  isActive: boolean;
  onClick: () => void;
}

export default function ExperienceItem({
  experience,
  isActive,
  onClick,
}: ExperienceItemProps) {
  return (
    <div className="relative pl-0 md:pl-14">
      {/* Timeline node */}
      <div
        className={`absolute left-[11px] top-7 hidden h-[18px] w-[18px] rounded-full border md:block ${
          isActive
            ? "border-purple-300 bg-purple-400/20 shadow-[0_0_25px_rgba(168,85,247,.45)]"
            : "border-white/15 bg-[#05050b]"
        }`}
      >
        <span
          className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isActive ? "bg-purple-300" : "bg-white/20"
          }`}
        />
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`w-full rounded-3xl border text-left transition-all duration-500 ${
          isActive
            ? "border-purple-400/25 bg-purple-500/[0.045]"
            : "border-white/8 bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.03]"
        }`}
      >
        {/* Main row */}
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[180px_1fr_auto] lg:items-start">
          {/* Period */}
          <div>
            <p className="font-mono text-xs tracking-wider text-purple-300/70">
              {experience.period}
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
              {experience.type}
            </p>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {experience.title}
            </h3>

            <p className="mt-1 text-sm text-white/35">
              {experience.company}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
              {experience.description}
            </p>
          </div>

          {/* Arrow */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
              isActive
                ? "border-purple-300/30 bg-purple-400/10 text-purple-200"
                : "border-white/10 text-white/30"
            }`}
          >
            <span
              className={`transition-transform duration-300 ${
                isActive ? "rotate-90" : ""
              }`}
            >
              →
            </span>
          </div>
        </div>

        {/* Expanded details */}
        <div
          className={`grid transition-all duration-500 ${
            isActive
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 px-6 pb-7 pt-6 sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                {/* Highlights */}
                <div>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/25">
                    What I worked on
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {experience.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex gap-3 rounded-xl border border-white/6 bg-white/[0.02] p-3"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300/70" />

                        <span className="text-xs leading-5 text-white/45">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/25">
                    Technologies
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2 font-mono text-[10px] text-white/45"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}