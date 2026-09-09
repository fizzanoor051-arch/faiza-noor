"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

interface ProjectPreviewProps {
  project: Project;
}

export default function ProjectPreview({
  project,
}: ProjectPreviewProps) {
  const [activeImage, setActiveImage] = useState(0);

  const screenshots: string[] = project.screenshots ?? [];

  useEffect(() => {
    setActiveImage(0);
  }, [project.slug]);

  /* =========================================================
     ACCENT THEME
     ========================================================= */

  const accent =
    project.color === "violet"
      ? {
          text: "text-violet-300",
          border: "border-violet-400/20",
          bg: "bg-violet-400/10",
          glow: "bg-violet-500/20",
          button:
            "hover:border-violet-400/40 hover:bg-violet-400/10",
        }
      : project.color === "purple"
        ? {
            text: "text-violet-300",
            border: "border-violet-400/20",
            bg: "bg-violet-400/10",
            glow: "bg-violet-500/20",
            button:
              "hover:border-violet-400/40 hover:bg-violet-400/10",
          }
        : project.color === "cyan"
          ? {
              text: "text-cyan-300",
              border: "border-cyan-400/20",
              bg: "bg-cyan-400/10",
              glow: "bg-cyan-500/20",
              button:
                "hover:border-cyan-400/40 hover:bg-cyan-400/10",
            }
          : {
              text: "text-blue-300",
              border: "border-blue-400/20",
              bg: "bg-blue-400/10",
              glow: "bg-blue-500/20",
              button:
                "hover:border-blue-400/40 hover:bg-blue-400/10",
            };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#07070c] shadow-2xl shadow-black/30">
      {/* =====================================================
          CINEMATIC AMBIENT BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -left-32 -top-32 h-72 w-72 rounded-full blur-[120px] ${accent.glow}`}
        />

        <div
          className={`absolute -bottom-32 -right-32 h-80 w-80 rounded-full blur-[130px] ${accent.glow}`}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* =====================================================
          BROWSER BAR
          ===================================================== */}

      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.07] bg-white/[0.015] px-5 py-4 backdrop-blur-xl sm:px-6">
        {/* Browser dots */}
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/30" />
        </div>

        {/* Browser address */}
        <div className="hidden rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-1.5 font-mono text-[9px] tracking-[0.16em] text-white/30 sm:block">
          {project.slug}.app
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/70" />

          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-300/50">
            {project.status}
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN PREVIEW
          ===================================================== */}

      <div className="relative z-10 p-4 sm:p-6">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {/* Main image */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#0b0b12]">
            {screenshots.length > 0 ? (
              <img
                src={screenshots[activeImage]}
                alt={`${project.title} screenshot ${activeImage + 1}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <span className="font-mono text-xs text-white/20">
                    PROJECT PREVIEW
                  </span>

                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/10">
                    Screenshots coming soon
                  </p>
                </div>
              </div>
            )}

            {/* Cinematic overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            {/* Project label */}
            <div className="absolute left-4 top-4">
              <span
                className={`rounded-full border ${accent.border} ${accent.bg} px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] ${accent.text} backdrop-blur-xl`}
              >
                Project /{" "}
                {String(activeImage + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Counter */}
            {screenshots.length > 0 && (
              <div className="absolute bottom-4 right-4">
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[9px] text-white/50 backdrop-blur-xl">
                  {String(activeImage + 1).padStart(2, "0")} /{" "}
                  {String(screenshots.length).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* =================================================
                PREVIOUS SCREENSHOT
                ================================================= */}

            {screenshots.length > 1 && (
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() =>
                  setActiveImage((current) =>
                    current === 0
                      ? screenshots.length - 1
                      : current - 1
                  )
                }
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 opacity-0 backdrop-blur-xl transition duration-300 hover:bg-white/10 group-hover:opacity-100"
              >
                ←
              </button>
            )}

            {/* =================================================
                NEXT SCREENSHOT
                ================================================= */}

            {screenshots.length > 1 && (
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() =>
                  setActiveImage(
                    (current) =>
                      (current + 1) % screenshots.length
                  )
                }
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 opacity-0 backdrop-blur-xl transition duration-300 hover:bg-white/10 group-hover:opacity-100"
              >
                →
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            THUMBNAILS
            ===================================================== */}

        {screenshots.length > 1 && (
          <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
            {screenshots.map(
              (image: string, index: number) => {
                const active = index === activeImage;

                return (
                  <button
                    key={image}
                    type="button"
                    aria-label={`View screenshot ${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className={`group/thumb relative overflow-hidden rounded-xl border transition-all duration-300 ${
                      active
                        ? `${accent.border} ring-1 ring-white/10`
                        : "border-white/[0.07] opacity-55 hover:border-white/20 hover:opacity-100"
                    }`}
                  >
                    <div className="aspect-video overflow-hidden bg-[#0c0c13]">
                      <img
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className={`h-full w-full object-cover transition duration-500 ${
                          active
                            ? "scale-105"
                            : "group-hover/thumb:scale-105"
                        }`}
                      />
                    </div>

                    <div className="absolute bottom-1.5 left-1.5 rounded-md border border-white/10 bg-black/50 px-1.5 py-0.5 font-mono text-[7px] text-white/50 backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          PROJECT IDENTIFICATION
          ===================================================== */}

      <div className="relative z-10 border-t border-white/[0.07] px-5 py-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`font-mono text-[8px] uppercase tracking-[0.2em] ${accent.text} opacity-70`}
              >
                Selected work
              </span>

              <span className="h-px w-8 bg-white/10" />

              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
                {project.year}
              </span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {project.title}
            </h3>

            <p className="mt-1 max-w-2xl text-xs leading-6 text-white/35 sm:text-sm">
              {project.tagline ?? project.description}
            </p>
          </div>

          {/* Category */}
          <div className="shrink-0">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          VIDEO DEMO
          ===================================================== */}

      {project.video && (
        <div className="relative z-10 border-t border-white/[0.07] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                Product walkthrough
              </p>

              <h4 className="mt-1 text-sm font-semibold text-white/80">
                See it in motion
              </h4>
            </div>

            <span className="hidden rounded-full border border-white/[0.07] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/25 sm:block">
              demo.mp4
            </span>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black">
            <video
              className="aspect-video w-full object-cover"
              controls
              playsInline
              preload="metadata"
            >
              <source
                src={project.video}
                type="video/mp4"
              />

              Your browser does not support video playback.
            </video>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.05]" />
          </div>
        </div>
      )}

      {/* =====================================================
          TECHNOLOGY STRIP
          ===================================================== */}

      <div className="relative z-10 flex flex-wrap items-center gap-2 border-t border-white/[0.07] px-5 py-4 sm:px-6">
        <span className="mr-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
          Built with
        </span>

        {project.stack
          .slice(0, 6)
          .map((technology: string) => (
            <span
              key={technology}
              className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[8px] text-white/30 transition hover:border-white/15 hover:text-white/50"
            >
              {technology}
            </span>
          ))}
      </div>
    </div>
  );
}