"use client";

import type { Service } from "./ServicesSection";

type ServiceCardProps = {
  service: Service;
  index: number;
  active: boolean;
  onSelect: () => void;
};

export default function ServiceCard({
  service,
  index,
  active,
  onSelect,
}: ServiceCardProps) {
  return (
    <article
      onClick={onSelect}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 ${
        active
          ? "border-purple-300/20 bg-white/[0.04] shadow-[0_0_55px_rgba(139,92,246,0.06)]"
          : "border-white/8 bg-white/[0.018] hover:border-white/15 hover:bg-white/[0.03]"
      }`}
    >
      {/* Top line */}
      <div
        className={`absolute left-0 top-0 h-px bg-gradient-to-r from-purple-400 to-cyan-300 transition-all duration-700 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-[10px] transition-all duration-300 ${
                active
                  ? "border-purple-300/25 bg-purple-300/10 text-purple-200"
                  : "border-white/8 bg-white/[0.02] text-white/25"
              }`}
            >
              {service.number}
            </span>

            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                service / {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-1 text-lg font-medium text-white">
                {service.title}
              </h3>
            </div>
          </div>

          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
              active
                ? "rotate-0 border-purple-300/20 bg-purple-300/10 text-purple-200"
                : "-rotate-45 border-white/7 text-white/20 group-hover:rotate-0"
            }`}
          >
            ↗
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-7 text-sm font-medium text-white/65">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm leading-7 text-white/35">
          {service.description}
        </p>

        {/* Deliverables */}
        <div className="mt-7 border-t border-white/7 pt-6">
          <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
            deliverables
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-[10px] text-white/35"
              >
                <span
                  className={`h-1 w-1 rounded-full transition-colors ${
                    active ? "bg-cyan-300/70" : "bg-white/20"
                  }`}
                />

                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mt-7 flex flex-wrap gap-2">
          {service.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg border border-white/7 bg-white/[0.02] px-2.5 py-1.5 font-mono text-[8px] text-white/25 transition-colors group-hover:text-white/40"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="mt-7 flex items-center justify-between border-t border-white/7 pt-5">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/15">
            service.available
          </span>

          <span
            className={`flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] transition-colors ${
              active ? "text-emerald-300/60" : "text-white/20"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                active ? "bg-emerald-400" : "bg-white/20"
              }`}
            />

            {active ? "selected" : "available"}
          </span>
        </div>
      </div>
    </article>
  );
}