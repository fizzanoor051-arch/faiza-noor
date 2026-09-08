"use client";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  "All",
  "Full-Stack",
  "Web Application",
  "Frontend",
];

export default function ProjectFilter({
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`
              rounded-full border px-5 py-2.5
              text-xs font-semibold uppercase
              tracking-[0.14em]
              transition-all duration-300
              ${
                isActive
                  ? "border-violet-400/50 bg-violet-500/15 text-violet-200 shadow-[0_0_25px_rgba(139,92,246,0.15)]"
                  : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}