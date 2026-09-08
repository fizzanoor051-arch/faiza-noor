"use client";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#05050b] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-px w-10 bg-cyan-400" />
            Feedback
          </div>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Let the{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              work
            </span>{" "}
            speak.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/45">
            This section is intentionally honest. As my professional client
            portfolio grows, verified client feedback will be added here.
          </p>
        </div>

        {/* Honest feedback state */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
          {/* Decorative quote */}
          <div className="absolute right-8 top-4 font-serif text-[120px] leading-none text-white/[0.025]">
            “
          </div>

          <div className="relative max-w-3xl">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/20 bg-purple-400/5">
              <span className="font-serif text-3xl text-purple-200/70">
                “
              </span>
            </div>

            <p className="text-xl leading-9 text-white/65 sm:text-2xl">
              “The strongest proof of a developer is not an invented list of
              testimonials — it is the quality, clarity, and consistency of
              the work they build.”
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <span className="text-sm font-medium text-white/60">
                Portfolio principle
              </span>

              <span className="text-xs uppercase tracking-[0.2em] text-white/25">
                Verified feedback will appear here
              </span>
            </div>
          </div>

          {/* Bottom status */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              testimonials / waiting for verified feedback
            </span>

            <span className="flex items-center gap-2 text-xs text-purple-300/60">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300/70" />
              HONEST BY DESIGN
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}