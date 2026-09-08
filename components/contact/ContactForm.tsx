"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
      Frontend-only for now.

      Later this can connect to:
      - Next.js API route
      - Formspree
      - Resend
      - Nodemailer
      - Custom backend
    */

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">
      {/* Form heading */}
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-300/60">
          Start a conversation
        </p>

        <h3 className="mt-3 text-2xl font-semibold">
          Tell me about your project.
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/35">
          Share as much detail as you have. Even a rough idea is enough to
          start the conversation.
        </p>
      </div>

      {submitted ? (
        <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10">
            <span className="text-2xl text-emerald-300">✓</span>
          </div>

          <h3 className="mt-6 text-2xl font-semibold">
            Message prepared.
          </h3>

          <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
            The form is currently running in frontend-only mode. Once the
            backend/email service is connected, submissions can be delivered
            directly.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-7 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs text-white/55 transition hover:border-purple-300/30 hover:text-white"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/30"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-purple-300/30 focus:bg-purple-400/[0.03]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/30"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="fizza@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-purple-300/30 focus:bg-purple-400/[0.03]"
              />
            </div>
          </div>

          {/* Project type */}
          <div>
            <label
              htmlFor="project"
              className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/30"
            >
              Project type
            </label>

            <select
              id="project"
              name="project"
              defaultValue=""
              required
              className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white/60 outline-none transition focus:border-purple-300/30 focus:bg-purple-400/[0.03]"
            >
              <option value="" disabled>
                Select a project type
              </option>
              <option value="website">Website</option>
              <option value="web-app">Web Application</option>
              <option value="ecommerce">E-commerce</option>
              <option value="frontend">Frontend Development</option>
              <option value="full-stack">Full-Stack Development</option>
              <option value="redesign">Website Redesign</option>
              <option value="other">Something else</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/30"
            >
              Budget range
            </label>

            <select
              id="budget"
              name="budget"
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white/60 outline-none transition focus:border-purple-300/30 focus:bg-purple-400/[0.03]"
            >
              <option value="" disabled>
                Select a range
              </option>
              <option value="under-250">Under $250</option>
              <option value="250-500">$250 — $500</option>
              <option value="500-1000">$500 — $1,000</option>
              <option value="1000-plus">$1,000+</option>
              <option value="discuss">Let&apos;s discuss</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/30"
            >
              Project details
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="What are you trying to build?"
              className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-purple-300/30 focus:bg-purple-400/[0.03]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-purple-300/20 bg-purple-500/10 px-5 py-4 text-sm font-medium text-purple-100 transition hover:border-purple-300/40 hover:bg-purple-500/20"
          >
            <span>Send Project Brief</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          <p className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
            No spam · Just a project conversation
          </p>
        </form>
      )}
    </div>
  );
}