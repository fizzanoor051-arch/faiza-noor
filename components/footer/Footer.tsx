"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  GitBranch,
  Code2,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Full-Stack Development",
  "Frontend Engineering",
  "Interactive Web Experiences",
  "AI Integration",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/fizzanoor051-arch",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/faiza-noor-b2711b42b",
    icon: Code2,
  },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#020207] text-white"
    >
      {/* ATMOSPHERIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/[0.075] blur-[160px]" />
        <div className="absolute right-[-180px] top-[28%] h-[440px] w-[440px] rounded-full bg-blue-600/[0.045] blur-[150px]" />
        <div className="absolute bottom-[-220px] left-[-160px] h-[480px] w-[480px] rounded-full bg-fuchsia-600/[0.035] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-6 pt-10 sm:px-8 sm:pb-10 sm:pt-20 lg:px-12 lg:pt-24 xl:px-16">
        {/* FINAL CTA */}
        <section className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] px-5 py-8 backdrop-blur-sm sm:rounded-[32px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-600/[0.11] blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[110px]" />
          <div className="pointer-events-none absolute right-6 top-6 hidden h-20 w-20 rounded-full border border-white/[0.04] sm:block" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/[0.06]">
                  <Sparkles className="h-3.5 w-3.5 text-violet-200/70" />
                  <span className="absolute inset-[-4px] rounded-full border border-violet-300/[0.06]" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/30">
                  Next chapter
                </span>
              </div>

              <h2 className="max-w-5xl text-[clamp(2.35rem,7vw,7.2rem)] font-semibold leading-[0.87] tracking-[-0.06em] text-white">
                LET&apos;S BUILD
                <br />
                <span className="bg-gradient-to-r from-white via-violet-100 to-white/35 bg-clip-text text-transparent">
                  SOMETHING
                </span>
                <br />
                IMPOSSIBLE.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-6 text-white/40 sm:mt-7 sm:leading-7 sm:text-[15px]">
                Have an idea that deserves more than a template? Let&apos;s
                turn it into a fast, immersive and memorable digital
                experience.
              </p>
            </div>

            <a
              href="/contact"
              className="group relative inline-flex min-h-[54px] w-full items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-7 text-[13px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.025] hover:border-pink-300/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40 sm:min-h-[56px] sm:w-fit sm:min-w-[200px] sm:text-[14px]"
            >
              <span className="relative z-10">
                <strong>Start a project</strong>
              </span>

              <ArrowUpRight className="relative z-10 ml-3 h-4 w-4 text-white transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.95)]" />

              <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-700 ease-out group-hover:translate-y-0" />
            </a>
          </div>
        </section>

        {/* BRAND / NAV / SERVICES / CONNECT */}
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-20 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.45fr_0.7fr_0.9fr_0.9fr] lg:gap-10 xl:mt-24">
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="#home" className="group inline-flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/[0.05] shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-500 group-hover:rotate-[-4deg] group-hover:border-violet-300/40 group-hover:bg-violet-400/[0.10] sm:h-12 sm:w-12 sm:rounded-2xl">
                <span className="font-mono text-xs font-semibold text-violet-100 sm:text-sm">
                  FN
                </span>

                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.85)]" />
              </span>

              <span className="text-xs font-semibold tracking-[0.08em] text-white sm:text-sm">
                FAIZA NOOR
              </span>
            </Link>

            <p className="mt-5 max-w-md text-[12px] leading-6 text-white/38 sm:mt-7 sm:text-[14px] sm:leading-7">
              Full-Stack Web Engineer crafting thoughtful interfaces,
              scalable applications and cinematic digital experiences from
              frontend to backend.
            </p>

            <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-300/[0.12] bg-emerald-400/[0.035] px-3 py-2 sm:mt-7 sm:gap-3 sm:px-4 sm:py-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-emerald-300/65 sm:text-[9px] sm:tracking-[0.16em]">
                Available for selected projects
              </span>
            </div>

            <a
              href="mailto:hello@faizanoor.dev"
              className="group mt-4 flex min-h-[40px] w-fit items-center gap-2 py-2 text-[12px] text-white/35 transition-colors duration-300 hover:text-white sm:mt-6 sm:min-h-[44px] sm:gap-3 sm:text-sm"
            >
              <Mail className="h-3.5 w-3.5 text-white/25 transition-colors duration-300 group-hover:text-violet-300 sm:h-4 sm:w-4" />

              <span>hello@faizanoor.dev</span>

              <ArrowUpRight className="h-3 w-3 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
            </a>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px] sm:tracking-[0.28em]">
              Explore
            </p>

            <nav className="mt-3 flex flex-col sm:mt-5">
              {navigation.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-[36px] items-center justify-between border-b border-white/[0.045] text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[39px] sm:text-[13px]"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {item.label}
                  </span>

                  <span className="font-mono text-[7px] text-white/15 transition-colors duration-300 group-hover:text-violet-300/60 sm:text-[8px]">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* SERVICES */}
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px] sm:tracking-[0.28em]">
              Capabilities
            </p>

            <div className="mt-3 flex flex-col sm:mt-5">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="group flex min-h-[36px] items-center border-b border-white/[0.045] text-[10px] text-white/40 sm:min-h-[39px] sm:text-[13px]"
                >
                  <span className="mr-2 shrink-0 font-mono text-[7px] text-white/15 sm:mr-3 sm:text-[8px]">
                    0{index + 1}
                  </span>

                  <span className="transition-colors duration-300 group-hover:text-white">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CONNECT — HORIZONTAL */}
          <div className="col-span-2 lg:col-span-1">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px] sm:tracking-[0.28em]">
              Connect
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-5 sm:gap-x-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[40px] items-center gap-2 text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px] sm:text-[13px]"
                  >
                    <Icon className="h-3.5 w-3.5 text-white/20 transition-colors duration-300 group-hover:text-violet-300 sm:h-4 sm:w-4" />

                    <span>{link.label}</span>

                    <ArrowUpRight className="h-3 w-3 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60 sm:h-3.5 sm:w-3.5" />
                  </a>
                );
              })}

              <a
                href="mailto:hello@faizanoor.dev"
                className="group flex min-h-[40px] items-center gap-2 text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px] sm:text-[13px]"
              >
                <Mail className="h-3.5 w-3.5 text-white/20 transition-colors duration-300 group-hover:text-violet-300 sm:h-4 sm:w-4" />

                <span>Email</span>

                <ArrowUpRight className="h-3 w-3 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60 sm:h-3.5 sm:w-3.5" />
              </a>

              <a
                href="#contact"
                className="group flex min-h-[40px] items-center gap-2 text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px] sm:text-[13px]"
              >
                <span>Let&apos;s work together</span>

                <span className="text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-300">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SYSTEM BAR */}
        <div className="relative mt-10 border-t border-white/[0.07] pt-5 sm:mt-16 sm:pt-7">
          <div className="flex flex-col gap-5 text-[8px] text-white/20 sm:gap-5 sm:text-[9px] lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span>© {year} FAIZA NOOR. ALL RIGHTS RESERVED.</span>

              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

              <span className="font-mono uppercase tracking-[0.12em]">
                Built with Next.js
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-start sm:gap-5">
              <span className="font-mono uppercase tracking-[0.15em]">
                Design
              </span>

              <span className="font-mono uppercase tracking-[0.15em]">
                Engineer
              </span>

              <span className="font-mono uppercase tracking-[0.15em]">
                Ship
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.025] transition-all duration-300 hover:border-violet-300/30 hover:bg-violet-400/[0.07] focus:outline-none focus:ring-2 focus:ring-violet-300/30 sm:ml-2 sm:h-11 sm:w-11"
              >
                <MoveUpRight className="h-3.5 w-3.5 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-violet-200" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-4 sm:h-10" />
      </div>
    </footer>
  );
}