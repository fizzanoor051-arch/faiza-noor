"use client";

import ContactTerminal from "./ContactTerminal";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#05050b] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient lights */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[140px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-purple-300">
            <span className="h-px w-10 bg-purple-400" />
            Contact
          </div>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
            Have an idea?
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Let&apos;s build it.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Whether you have a complete product idea or just the first
            concept, send the details. We can turn the idea into a clear,
            practical development plan.
          </p>
        </div>

        {/* Contact layout */}
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactTerminal />
          <ContactForm />
        </div>

        {/* Bottom availability */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.018] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>

            <span className="text-sm text-white/55">
              Currently open to new projects
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
            response / project discussion
          </span>
        </div>
      </div>
    </section>
  );
}