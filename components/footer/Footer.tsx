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
    href: "https://github.com/",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
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
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top violet atmosphere */}
        <div className="absolute left-1/2 top-[-220px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/[0.075] blur-[160px]" />

        {/* Right blue atmosphere */}
        <div className="absolute right-[-180px] top-[28%] h-[440px] w-[440px] rounded-full bg-blue-600/[0.045] blur-[150px]" />

        {/* Bottom violet atmosphere */}
        <div className="absolute bottom-[-220px] left-[-160px] h-[480px] w-[480px] rounded-full bg-fuchsia-600/[0.035] blur-[160px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-20 lg:px-12 lg:pt-24 xl:px-16">
        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] px-6 py-10 backdrop-blur-sm sm:rounded-[32px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          {/* CTA glows */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-600/[0.11] blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[110px]" />

          {/* Decorative corner */}
          <div className="pointer-events-none absolute right-6 top-6 hidden h-20 w-20 rounded-full border border-white/[0.04] sm:block" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            {/* CTA text */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/[0.06]">
                  <Sparkles className="h-3.5 w-3.5 text-violet-200/70" />

                  <span className="absolute inset-[-4px] rounded-full border border-violet-300/[0.06]" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/30">
                  Next chapter
                </span>
              </div>

              <h2 className="max-w-5xl text-[clamp(2.7rem,7vw,7.2rem)] font-semibold leading-[0.87] tracking-[-0.06em] text-white">
                LET&apos;S BUILD
                <br />

                <span className="bg-gradient-to-r from-white via-violet-100 to-white/35 bg-clip-text text-transparent">
                  SOMETHING
                </span>

                <br />

                IMPOSSIBLE.
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/40 sm:text-[15px]">
                Have an idea that deserves more than a template? Let&apos;s
                turn it into a fast, immersive and memorable digital
                experience.
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="group relative inline-flex min-h-[56px] w-full items-center justify-center overflow-hidden rounded-full border border-white/[0.12] bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-500 hover:scale-[1.025] hover:border-violet-200 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300/40 sm:w-fit sm:min-w-[200px]"
            >
              <span className="relative z-10">
                Start a project
              </span>

              <ArrowUpRight className="relative z-10 ml-3 h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />

              <span className="absolute inset-0 translate-y-full bg-violet-300 transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>
        </section>

        {/* =========================================================
            BRAND / NAV / SERVICES / CONNECT
        ========================================================= */}

        <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-[1.45fr_0.7fr_0.9fr_0.9fr] lg:gap-10 xl:mt-24">
          {/* =======================================================
              BRAND
          ======================================================= */}

          <div>
            <Link
              href="#home"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/[0.05] shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-500 group-hover:rotate-[-4deg] group-hover:border-violet-300/40 group-hover:bg-violet-400/[0.10]"
              >
                <span className="font-mono text-sm font-semibold text-violet-100">
                  FN
                </span>

                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,0.85)]" />
              </span>

              <span className="text-sm font-semibold tracking-[0.08em] text-white">
                FAIZA NOOR
              </span>
            </Link>

            <p className="mt-7 max-w-md text-[14px] leading-7 text-white/38">
              Full-Stack Web Engineer crafting thoughtful interfaces,
              scalable applications and cinematic digital experiences from
              frontend to backend.
            </p>

            {/* Availability */}
            <div className="mt-7 inline-flex max-w-full items-center gap-3 rounded-full border border-emerald-300/[0.12] bg-emerald-400/[0.035] px-4 py-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300/65">
                Available for selected projects
              </span>
            </div>

            {/* Email */}
            <a
              href="mailto:hello@faizanoor.dev"
              className="group mt-6 flex min-h-[44px] w-fit items-center gap-3 py-2 text-sm text-white/35 transition-colors duration-300 hover:text-white"
            >
              <Mail className="h-4 w-4 text-white/25 transition-colors duration-300 group-hover:text-violet-300" />

              <span>hello@faizanoor.dev</span>

              <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* =======================================================
              NAVIGATION
          ======================================================= */}

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
              Explore
            </p>

            <nav className="mt-5 flex flex-col">
              {navigation.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-[46px] items-center justify-between border-b border-white/[0.045] text-[13px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[39px]"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {item.label}
                  </span>

                  <span className="font-mono text-[8px] text-white/15 transition-colors duration-300 group-hover:text-violet-300/60">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* =======================================================
              SERVICES
          ======================================================= */}

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
              Capabilities
            </p>

            <div className="mt-5 flex flex-col">
              {services.map((service, index) => (
                <div
                  key={service}
                  className="group flex min-h-[46px] items-center border-b border-white/[0.045] text-[13px] text-white/40 sm:min-h-[39px]"
                >
                  <span className="mr-3 shrink-0 font-mono text-[8px] text-white/15">
                    0{index + 1}
                  </span>

                  <span className="transition-colors duration-300 group-hover:text-white">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =======================================================
              CONNECT
          ======================================================= */}

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
              Connect
            </p>

            <div className="mt-5 flex flex-col">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[48px] items-center justify-between border-b border-white/[0.045] text-[13px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-white/20 transition-colors duration-300 group-hover:text-violet-300" />

                      {link.label}
                    </span>

                    <ArrowUpRight className="h-3.5 w-3.5 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
                  </a>
                );
              })}

              {/* Email */}
              <a
                href="mailto:hello@faizanoor.dev"
                className="group flex min-h-[48px] items-center justify-between border-b border-white/[0.045] text-[13px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px]"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/20 transition-colors duration-300 group-hover:text-violet-300" />

                  Email
                </span>

                <ArrowUpRight className="h-3.5 w-3.5 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              {/* Contact */}
              <a
                href="#contact"
                className="group flex min-h-[48px] items-center justify-between border-b border-white/[0.045] text-[13px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px]"
              >
                <span>Let&apos;s work together</span>

                <span className="text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-300">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            3D FAIZA NOOR SIGNATURE
        ========================================================= */}

        <section
          aria-label="Faiza Noor signature"
          className="relative mt-20 h-[250px] overflow-hidden sm:mt-28 sm:h-[330px] lg:mt-32 lg:h-[430px]"
        >
          {/* Main aura */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[105px] sm:h-72 sm:w-72 lg:h-[420px] lg:w-[420px]" />

          {/* Secondary aura */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[80px] sm:h-40 sm:w-72 lg:h-56 lg:w-[420px]" />

          {/* =======================================================
              3D ORBIT 1
          ======================================================= */}

          <div
            className="footer-orbit footer-orbit-one pointer-events-none absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.09] sm:h-[270px] sm:w-[270px] lg:h-[350px] lg:w-[350px]"
          />

          {/* =======================================================
              3D ORBIT 2
          ======================================================= */}

          <div
            className="footer-orbit footer-orbit-two pointer-events-none absolute left-1/2 top-1/2 h-[145px] w-[145px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/[0.07] sm:h-[215px] sm:w-[215px] lg:h-[290px] lg:w-[290px]"
          />

          {/* =======================================================
              3D WORDMARK STAGE
          ======================================================= */}

          <div className="absolute left-1/2 top-1/2 h-[150px] w-full -translate-x-1/2 -translate-y-1/2 [perspective:1200px] sm:h-[220px] lg:h-[290px]">
            <div className="footer-wordmark-stage relative h-full w-full">
              {/* Deep shadow */}
              <div className="footer-wordmark-shadow absolute inset-0 flex items-center justify-center whitespace-nowrap">
                <span className="select-none text-[16vw] font-black leading-none tracking-[-0.095em] text-violet-950/[0.55] sm:text-[13vw] lg:text-[10.5vw]">
                  FAIZA NOOR
                </span>
              </div>

              {/* Deep 3D extrusion */}
              <div className="footer-wordmark-extrusion absolute inset-0 flex items-center justify-center whitespace-nowrap">
                <span className="select-none text-[16vw] font-black leading-none tracking-[-0.095em] text-violet-400/[0.045] sm:text-[13vw] lg:text-[10.5vw]">
                  FAIZA NOOR
                </span>
              </div>

              {/* Main face */}
              <div className="footer-wordmark-face absolute inset-0 flex items-center justify-center whitespace-nowrap">
                <span className="select-none bg-gradient-to-b from-white/[0.11] via-violet-100/[0.055] to-white/[0.018] bg-clip-text text-[16vw] font-black leading-none tracking-[-0.095em] text-transparent sm:text-[13vw] lg:text-[10.5vw]">
                  FAIZA NOOR
                </span>
              </div>

              {/* Highlight line */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap">
                <span className="footer-highlight select-none text-[16vw] font-black leading-none tracking-[-0.095em] text-white/[0.025] sm:text-[13vw] lg:text-[10.5vw]">
                  FAIZA NOOR
                </span>
              </div>
            </div>
          </div>

          {/* =======================================================
              SIDE LABELS
          ======================================================= */}

          <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 sm:block">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/[0.08]" />

              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/15">
                Digital craft
              </span>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right sm:block">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/15">
                Full-stack / 2026
              </span>

              <span className="h-px w-8 bg-white/[0.08]" />
            </div>
          </div>

          {/* Mobile center label */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden">
            <span className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.28em] text-white/15">
              Digital craft / full-stack
            </span>
          </div>
        </section>

        {/* =========================================================
            BOTTOM SYSTEM BAR
        ========================================================= */}

        <div className="relative border-t border-white/[0.07] pt-7">
          <div className="flex flex-col gap-7 text-[9px] text-white/20 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Copyright */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span>
                © {year} FAIZA NOOR. ALL RIGHTS RESERVED.
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

              <span className="font-mono uppercase tracking-[0.12em]">
                Built with Next.js
              </span>
            </div>

            {/* System status */}
            <div className="flex items-center justify-between gap-4 sm:justify-start sm:gap-5">
              <span className="font-mono uppercase tracking-[0.18em]">
                Design
              </span>

              <span className="font-mono uppercase tracking-[0.18em]">
                Engineer
              </span>

              <span className="font-mono uppercase tracking-[0.18em]">
                Ship
              </span>

              {/* Back to top */}
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.025] transition-all duration-300 hover:border-violet-300/30 hover:bg-violet-400/[0.07] focus:outline-none focus:ring-2 focus:ring-violet-300/30 sm:ml-2"
              >
                <MoveUpRight className="h-3.5 w-3.5 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-violet-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom breathing room */}
        <div className="h-6 sm:h-10" />
      </div>

      {/* =========================================================
          3D / MOTION CSS
      ========================================================= */}

      <style jsx>{`
        .footer-wordmark-stage {
          transform-style: preserve-3d;
          animation: footerStageFloat 9s ease-in-out infinite;
        }

        .footer-wordmark-face {
          transform: translateZ(0);
          animation: footerFaceRotate 13s ease-in-out infinite;
        }

        .footer-wordmark-extrusion {
          transform: translate3d(11px, 9px, -25px);
          animation: footerExtrusionRotate 13s ease-in-out infinite;
        }

        .footer-wordmark-shadow {
          transform: translate3d(19px, 16px, -45px);
          filter: blur(1px);
          opacity: 0.8;
          animation: footerShadowRotate 13s ease-in-out infinite;
        }

        .footer-highlight {
          animation: footerHighlight 6s ease-in-out infinite;
        }

        .footer-orbit-one {
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) perspective(900px)
            rotateX(68deg) rotateZ(0deg);
          animation: orbitOne 18s linear infinite;
        }

        .footer-orbit-two {
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) perspective(900px)
            rotateY(68deg) rotateZ(0deg);
          animation: orbitTwo 14s linear infinite reverse;
        }

        @keyframes footerStageFloat {
          0%,
          100% {
            transform: perspective(1200px) rotateX(2deg) rotateY(-6deg)
              translateY(0px);
          }

          50% {
            transform: perspective(1200px) rotateX(-2deg) rotateY(6deg)
              translateY(-9px);
          }
        }

        @keyframes footerFaceRotate {
          0%,
          100% {
            transform: perspective(1200px) rotateY(-5deg) translateZ(0);
          }

          50% {
            transform: perspective(1200px) rotateY(5deg) translateZ(0);
          }
        }

        @keyframes footerExtrusionRotate {
          0%,
          100% {
            transform: translate3d(11px, 9px, -25px)
              perspective(1200px) rotateY(-5deg);
          }

          50% {
            transform: translate3d(-11px, -6px, -25px)
              perspective(1200px) rotateY(5deg);
          }
        }

        @keyframes footerShadowRotate {
          0%,
          100% {
            transform: translate3d(19px, 16px, -45px)
              perspective(1200px) rotateY(-5deg);
          }

          50% {
            transform: translate3d(-17px, -10px, -45px)
              perspective(1200px) rotateY(5deg);
          }
        }

        @keyframes footerHighlight {
          0%,
          100% {
            transform: translateX(-8px);
            opacity: 0.3;
          }

          50% {
            transform: translateX(8px);
            opacity: 0.8;
          }
        }

        @keyframes orbitOne {
          from {
            transform: translate(-50%, -50%) perspective(900px)
              rotateX(68deg) rotateZ(0deg);
          }

          to {
            transform: translate(-50%, -50%) perspective(900px)
              rotateX(68deg) rotateZ(360deg);
          }
        }

        @keyframes orbitTwo {
          from {
            transform: translate(-50%, -50%) perspective(900px)
              rotateY(68deg) rotateZ(0deg);
          }

          to {
            transform: translate(-50%, -50%) perspective(900px)
              rotateY(68deg) rotateZ(360deg);
          }
        }

        @media (max-width: 640px) {
          .footer-wordmark-stage {
            animation-duration: 11s;
          }

          .footer-wordmark-face {
            animation-duration: 14s;
          }

          .footer-wordmark-extrusion {
            animation-duration: 14s;
          }

          .footer-wordmark-shadow {
            animation-duration: 14s;
          }

          .footer-orbit-one {
            animation-duration: 22s;
          }

          .footer-orbit-two {
            animation-duration: 18s;
          }

          .footer-highlight {
            animation-duration: 7s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-wordmark-stage,
          .footer-wordmark-face,
          .footer-wordmark-extrusion,
          .footer-wordmark-shadow,
          .footer-highlight,
          .footer-orbit-one,
          .footer-orbit-two {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  );
}