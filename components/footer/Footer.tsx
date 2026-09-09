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

const particleColors = [
  "#ff4f9a",
  "#ff6fae",
  "#ff365f",
  "#ff8fab",
  "#ffd166",
  "#ffe08a",
  "#ff9b71",
  "#ff6b81",
  "#fda4af",
  "#ffb4d2",
  "#fbbf8a",
  "#fff0a8",
];

const orbitParticles = Array.from({ length: 22 }, (_, index) => {
  const angle = (360 / 22) * index;
  const delay = -(index * 0.17);

  return {
    index,
    angle,
    delay,
    size: 3 + (index % 3),
    color: particleColors[index % particleColors.length],
    duration: 5.8 + (index % 5) * 0.18,
  };
});

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
              <span className="relative z-10">Start a project</span>

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
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/[0.05] shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-500 group-hover:rotate-[-4deg] group-hover:border-violet-300/40 group-hover:bg-violet-400/[0.10]">
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
            FAIZA NOOR — LIVING PARTICLE ORBIT
        ========================================================= */}

        <section
          aria-label="Faiza Noor particle signature"
          className="relative mt-12 h-[185px] overflow-hidden sm:mt-16 sm:h-[205px] lg:mt-20 lg:h-[220px]"
        >
          {/* Feminine ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.055] blur-[75px]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/[0.04] blur-[65px]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/[0.035] blur-[60px]" />

          {/* =======================================================
              OUTER FLYING ORBIT
          ======================================================= */}

          <div className="footer-orbit-field absolute left-1/2 top-1/2 h-[135px] w-[255px] -translate-x-1/2 -translate-y-1/2 sm:h-[150px] sm:w-[300px] lg:h-[165px] lg:w-[345px]">
            <div className="footer-orbit-egg absolute inset-0 rounded-[50%]" />

            <div className="footer-orbit-egg-two absolute inset-[16%_7%] rounded-[50%]" />

            {orbitParticles.map((particle) => (
              <span
                key={particle.index}
                className="footer-orbit-particle absolute left-1/2 top-1/2 rounded-full"
                style={
                  {
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: particle.color,
                    boxShadow: `
                      0 0 6px ${particle.color},
                      0 0 13px ${particle.color},
                      0 0 24px ${particle.color}
                    `,
                    "--particle-angle": `${particle.angle}deg`,
                    "--particle-delay": particle.delay,
                    "--particle-duration": `${particle.duration}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* =======================================================
              INNER FLOW RING
          ======================================================= */}

          <div className="footer-inner-flow absolute left-1/2 top-1/2 h-[78px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]" />

          {/* =======================================================
              CENTER ENERGY
          ======================================================= */}

          <div className="footer-center-energy pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

          <div className="footer-center-burst pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full" />

          {/* =======================================================
              PARTICLE NAME
          ======================================================= */}

          <div className="footer-particle-name absolute inset-0 flex items-center justify-center">
            {/* Soft glow layer */}
            <span className="footer-name-soft absolute select-none bg-gradient-to-r from-pink-300 via-rose-200 via-red-300 to-yellow-200 bg-clip-text text-[clamp(2.1rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-transparent">
              FAIZA NOOR
            </span>

            {/* Main flowing name */}
            <span className="footer-name-main relative select-none bg-gradient-to-r from-pink-300 via-baby-pink via-rose-300 via-red-300 via-orange-200 to-yellow-200 bg-[length:250%_100%] bg-clip-text text-[clamp(2.1rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-transparent">
              FAIZA NOOR
            </span>

            {/* Light passing across the name */}
            <span className="footer-name-shine pointer-events-none absolute select-none bg-gradient-to-r from-transparent via-white/80 to-transparent bg-clip-text text-[clamp(2.1rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-transparent">
              FAIZA NOOR
            </span>
          </div>

          {/* Tiny footer label */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
            <span className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.3em] text-white/15">
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
              <span>© {year} FAIZA NOOR. ALL RIGHTS RESERVED.</span>

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
          PARTICLE ORBIT / NAME MOTION CSS
      ========================================================= */}

      <style jsx>{`
        /* ---------------------------------------------------------
           MAIN EGG-SHAPED ORBIT
        --------------------------------------------------------- */

        .footer-orbit-field {
          transform-style: preserve-3d;
          animation: footerEggFloat 6s ease-in-out infinite;
        }

        .footer-orbit-egg {
          border: 1px solid rgba(255, 105, 165, 0.12);
          box-shadow:
            0 0 25px rgba(255, 79, 154, 0.035),
            inset 0 0 25px rgba(255, 79, 154, 0.025);
          transform: rotate(-7deg) scaleY(0.82);
          animation: footerEggRotate 5.8s ease-in-out infinite;
        }

        .footer-orbit-egg-two {
          border: 1px solid rgba(255, 209, 102, 0.065);
          transform: rotate(9deg) scaleY(0.82);
          animation: footerEggRotateTwo 7s ease-in-out infinite;
        }

        /* ---------------------------------------------------------
           PARTICLES
        --------------------------------------------------------- */

        .footer-orbit-particle {
          margin-left: -50%;
          margin-top: -50%;
          transform-origin: 0 0;
          opacity: 0;
          animation:
            footerParticleOrbit var(--particle-duration) cubic-bezier(
                0.55,
                0.08,
                0.25,
                0.95
              )
              var(--particle-delay) infinite;
          will-change: transform, opacity;
        }

        /* ---------------------------------------------------------
           INNER FLOW
        --------------------------------------------------------- */

        .footer-inner-flow {
          border: 1px solid rgba(255, 105, 165, 0.055);
          box-shadow:
            0 0 30px rgba(255, 79, 154, 0.04),
            inset 0 0 25px rgba(255, 209, 102, 0.025);
          animation: footerInnerFlow 5.8s ease-in-out infinite;
        }

        /* ---------------------------------------------------------
           CENTER ENERGY
        --------------------------------------------------------- */

        .footer-center-energy {
          opacity: 0;
          box-shadow:
            0 0 8px rgba(255, 255, 255, 0.95),
            0 0 18px rgba(255, 105, 165, 0.9),
            0 0 35px rgba(255, 209, 102, 0.65);
          animation: footerEnergyCore 5.8s ease-in-out infinite;
        }

        .footer-center-burst {
          opacity: 0;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 105, 165, 0.6) 12%,
            rgba(255, 54, 95, 0.28) 28%,
            rgba(255, 209, 102, 0.12) 48%,
            transparent 72%
          );
          filter: blur(3px);
          animation: footerEnergyBurst 5.8s ease-in-out infinite;
        }

        /* ---------------------------------------------------------
           NAME
        --------------------------------------------------------- */

        .footer-particle-name {
          pointer-events: none;
          opacity: 0;
          transform: scale(0.76);
          filter: blur(7px);
          animation: footerNameFormation 5.8s ease-in-out infinite;
        }

        .footer-name-main {
          background-image: linear-gradient(
            90deg,
            #ff8fbe 0%,
            #ff4f9a 18%,
            #ff9dbd 34%,
            #ff365f 50%,
            #ff8c69 67%,
            #ffd166 84%,
            #ffb4d2 100%
          );
          text-shadow:
            0 0 12px rgba(255, 79, 154, 0.28),
            0 0 30px rgba(255, 54, 95, 0.16),
            0 0 55px rgba(255, 209, 102, 0.1);
          animation: footerNameColorFlow 3.8s linear infinite;
        }

        .footer-name-soft {
          opacity: 0.7;
          filter: blur(13px);
          background-image: linear-gradient(
            90deg,
            #ff4f9a,
            #ffb4d2,
            #ff365f,
            #ffd166,
            #ff8fab
          );
          background-size: 250% 100%;
          animation:
            footerNameColorFlow 3.8s linear infinite,
            footerNameGlow 2.8s ease-in-out infinite;
        }

        .footer-name-shine {
          opacity: 0;
          width: 100%;
          background-image: linear-gradient(
            105deg,
            transparent 20%,
            transparent 40%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 60%,
            transparent 80%
          );
          background-size: 220% 100%;
          animation: footerNameShine 5.8s ease-in-out infinite;
        }

        /* ---------------------------------------------------------
           EGG FLOAT
        --------------------------------------------------------- */

        @keyframes footerEggFloat {
          0%,
          100% {
            transform: translateY(4px) rotateX(0deg);
          }

          50% {
            transform: translateY(-5px) rotateX(4deg);
          }
        }

        @keyframes footerEggRotate {
          0%,
          100% {
            transform: rotate(-7deg) scaleY(0.82) scaleX(1);
            opacity: 0.35;
          }

          50% {
            transform: rotate(8deg) scaleY(0.78) scaleX(1.04);
            opacity: 0.7;
          }
        }

        @keyframes footerEggRotateTwo {
          0%,
          100% {
            transform: rotate(9deg) scaleY(0.82) scaleX(1);
            opacity: 0.2;
          }

          50% {
            transform: rotate(-10deg) scaleY(0.75) scaleX(1.05);
            opacity: 0.55;
          }
        }

        /* ---------------------------------------------------------
           PARTICLES:
           0-20% = fly in
           20-48% = orbit
           48-64% = spiral inward
           64-70% = merge
           70-100% = fly back out
        --------------------------------------------------------- */

        @keyframes footerParticleOrbit {
          0% {
            opacity: 0;
            transform:
              rotate(var(--particle-angle))
              translateX(155px)
              scale(0.15);
          }

          8% {
            opacity: 0.95;
            transform:
              rotate(calc(var(--particle-angle) - 15deg))
              translateX(145px)
              scale(0.7);
          }

          20% {
            opacity: 1;
            transform:
              rotate(calc(var(--particle-angle) + 10deg))
              translateX(125px)
              scale(1);
          }

          32% {
            opacity: 1;
            transform:
              rotate(calc(var(--particle-angle) + 100deg))
              translateX(125px)
              scale(1.05);
          }

          43% {
            opacity: 1;
            transform:
              rotate(calc(var(--particle-angle) + 205deg))
              translateX(125px)
              scale(0.95);
          }

          50% {
            opacity: 1;
            transform:
              rotate(calc(var(--particle-angle) + 285deg))
              translateX(108px)
              scale(1);
          }

          56% {
            opacity: 1;
            transform:
              rotate(calc(var(--particle-angle) + 390deg))
              translateX(72px)
              scale(0.9);
          }

          61% {
            opacity: 1;
            transform:
              rotate(calc(var(--particle-angle) + 500deg))
              translateX(34px)
              scale(0.7);
          }

          66% {
            opacity: 0.95;
            transform:
              rotate(calc(var(--particle-angle) + 620deg))
              translateX(8px)
              scale(0.25);
          }

          70% {
            opacity: 0;
            transform:
              rotate(calc(var(--particle-angle) + 700deg))
              translateX(0)
              scale(0.05);
          }

          76% {
            opacity: 0;
            transform:
              rotate(calc(var(--particle-angle) + 760deg))
              translateX(25px)
              scale(0.05);
          }

          84% {
            opacity: 0.75;
            transform:
              rotate(calc(var(--particle-angle) + 820deg))
              translateX(75px)
              scale(0.7);
          }

          92% {
            opacity: 0.95;
            transform:
              rotate(calc(var(--particle-angle) + 900deg))
              translateX(130px)
              scale(0.95);
          }

          100% {
            opacity: 0;
            transform:
              rotate(calc(var(--particle-angle) + 980deg))
              translateX(165px)
              scale(0.1);
          }
        }

        /* ---------------------------------------------------------
           INNER RING
        --------------------------------------------------------- */

        @keyframes footerInnerFlow {
          0%,
          42% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7) rotate(0deg);
          }

          52% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(0.9) rotate(20deg);
          }

          62% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.05) rotate(60deg);
          }

          70% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(100deg);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7) rotate(180deg);
          }
        }

        /* ---------------------------------------------------------
           ENERGY
        --------------------------------------------------------- */

        @keyframes footerEnergyCore {
          0%,
          56% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2);
          }

          61% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(0.8);
          }

          66% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.7);
          }

          71% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.4);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2);
          }
        }

        @keyframes footerEnergyBurst {
          0%,
          58% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2);
          }

          64% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(0.7);
          }

          72% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.8);
          }

          84% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.5);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.5);
          }
        }

        /* ---------------------------------------------------------
           NAME FORMATION
        --------------------------------------------------------- */

        @keyframes footerNameFormation {
          0%,
          45% {
            opacity: 0;
            transform: scale(0.76);
            filter: blur(8px);
          }

          53% {
            opacity: 0.08;
            transform: scale(0.82);
            filter: blur(6px);
          }

          60% {
            opacity: 0.45;
            transform: scale(0.94);
            filter: blur(2px);
          }

          66% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          74%,
          91% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }

          100% {
            opacity: 0;
            transform: scale(1.06);
            filter: blur(6px);
          }
        }

        @keyframes footerNameColorFlow {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes footerNameGlow {
          0%,
          100% {
            opacity: 0.45;
          }

          50% {
            opacity: 0.9;
          }
        }

        @keyframes footerNameShine {
          0%,
          58% {
            opacity: 0;
            background-position: -100% 50%;
          }

          64% {
            opacity: 0;
            background-position: -50% 50%;
          }

          72% {
            opacity: 0.75;
            background-position: 100% 50%;
          }

          80%,
          100% {
            opacity: 0;
            background-position: 180% 50%;
          }
        }

        /* ---------------------------------------------------------
           MOBILE
        --------------------------------------------------------- */

        @media (max-width: 640px) {
          .footer-orbit-field {
            transform: scale(0.78);
          }

          .footer-orbit-particle {
            animation-duration: 5.4s;
          }

          .footer-particle-name,
          .footer-name-soft,
          .footer-name-main,
          .footer-name-shine,
          .footer-center-energy,
          .footer-center-burst {
            animation-duration: 5.4s;
          }

          .footer-name-main,
          .footer-name-soft,
          .footer-name-shine {
            letter-spacing: -0.075em;
          }
        }

        /* ---------------------------------------------------------
           REDUCED MOTION
        --------------------------------------------------------- */

        @media (prefers-reduced-motion: reduce) {
          .footer-orbit-field,
          .footer-orbit-egg,
          .footer-orbit-egg-two,
          .footer-orbit-particle,
          .footer-inner-flow,
          .footer-center-energy,
          .footer-center-burst,
          .footer-particle-name,
          .footer-name-soft,
          .footer-name-main,
          .footer-name-shine {
            animation: none !important;
          }

          .footer-particle-name {
            opacity: 1;
            transform: none;
            filter: none;
          }

          .footer-name-main {
            background-position: 50% 50%;
          }
        }
      `}</style>
    </footer>
  );
}