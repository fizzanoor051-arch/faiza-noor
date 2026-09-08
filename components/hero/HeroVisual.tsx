
"use client";

import { useEffect, useState } from "react";

const systemLayers = [
  {
    number: "01",
    label: "INTERFACE",
    tech: "NEXT.JS / REACT",
  },
  {
    number: "02",
    label: "APPLICATION",
    tech: "TYPESCRIPT",
  },
  {
    number: "03",
    label: "API",
    tech: "NODE / EXPRESS",
  },
  {
    number: "04",
    label: "DATA",
    tech: "DATABASE",
  },
];

export default function HeroVisual() {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveLayer((current) => (current + 1) % systemLayers.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[430px] w-full max-w-[580px] sm:h-[540px]">
      {/* Large atmospheric glow */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[90px]" />

      {/* Orbit 01 */}
      <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] sm:h-[300px] sm:w-[300px]" />

      {/* Orbit 02 */}
      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.09] sm:h-[430px] sm:w-[430px]" />

      {/* Orbit 03 */}
      <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/[0.05] sm:h-[520px] sm:w-[520px]" />

      {/* Orbiting particles */}
      <OrbitParticle className="left-[13%] top-[30%]" delay="0s" />
      <OrbitParticle className="right-[12%] top-[22%]" delay="1.4s" />
      <OrbitParticle className="bottom-[17%] left-[25%]" delay="2.3s" />
      <OrbitParticle className="bottom-[25%] right-[19%]" delay="3.1s" />

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 sm:h-48 sm:w-48">
        <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-violet-300/20 border-dashed" />

        <div className="absolute inset-3 rounded-full border border-white/10 bg-[#09090f]/90 shadow-[0_0_100px_rgba(139,92,246,0.12)] backdrop-blur-xl" />

        <div className="absolute inset-8 rounded-full border border-violet-300/15 bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-400/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25">
            Core
          </span>

          <span className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
            FN<span className="text-violet-400">.</span>
          </span>

          <span className="mt-2 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.2em] text-emerald-300/60">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            System online
          </span>
        </div>
      </div>

      {/* System layer cards */}
      <div className="absolute left-0 top-1/2 hidden w-44 -translate-y-1/2 sm:block">
        <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.25em] text-white/20">
          System layers
        </div>

        <div className="space-y-2">
          {systemLayers.map((layer, index) => (
            <button
              key={layer.number}
              type="button"
              onMouseEnter={() => setActiveLayer(index)}
              className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-500 ${
                activeLayer === index
                  ? "border-violet-400/25 bg-violet-500/[0.08]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
              }`}
            >
              <span
                className={`font-mono text-[8px] ${
                  activeLayer === index
                    ? "text-violet-300"
                    : "text-white/20"
                }`}
              >
                {layer.number}
              </span>

              <span className="min-w-0">
                <span className="block text-[9px] font-semibold tracking-wide text-white/60">
                  {layer.label}
                </span>

                <span className="mt-0.5 block truncate font-mono text-[7px] text-white/20">
                  {layer.tech}
                </span>
              </span>

              <span className="ml-auto text-white/10 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Right data panel */}
      <div className="absolute right-0 top-8 hidden w-36 sm:block">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/20">
              runtime
            </span>

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/70" />
          </div>

          <DataRow label="UI" value="READY" />
          <DataRow label="API" value="READY" />
          <DataRow label="DATA" value="READY" />

          <div className="mt-4 border-t border-white/[0.07] pt-3">
            <div className="mb-1 flex justify-between font-mono text-[7px] text-white/20">
              <span>BUILD</span>
              <span>100%</span>
            </div>

            <div className="h-px bg-white/10">
              <div className="h-full w-full bg-gradient-to-r from-violet-400 to-cyan-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/15">
          Design · Engineer · Ship
        </p>
      </div>
    </div>
  );
}

function OrbitParticle({
  className,
  delay,
}: {
  className: string;
  delay: string;
}) {
  return (
    <span
      className={`absolute h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300/70 shadow-[0_0_18px_rgba(167,139,250,0.8)] ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span className="font-mono text-[7px] text-white/25">{label}</span>

      <span className="font-mono text-[7px] text-emerald-300/50">
        {value}
      </span>
    </div>
  );
}
