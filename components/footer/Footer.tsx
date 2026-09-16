
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
        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] px-5 py-8 backdrop-blur-sm sm:rounded-[32px] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-600/[0.11] blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[110px]" />

          <div className="pointer-events-none absolute right-6 top-6 hidden h-20 w-20 rounded-full border border-white/[0.04] sm:block" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            {/* CTA text */}
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

            {/* CTA Button */}
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

        {/* =========================================================
            BRAND / NAV / SERVICES / CONNECT
        ========================================================= */}

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-20 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.45fr_0.7fr_0.9fr_0.9fr] lg:gap-10 xl:mt-24">
          {/* =======================================================
              BRAND
          ======================================================= */}

          <div className="col-span-2 lg:col-span-1">
            <Link
              href="#home"
              className="group inline-flex items-center gap-3"
            >
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

          {/* =======================================================
              NAVIGATION
          ======================================================= */}

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

          {/* =======================================================
              SERVICES
          ======================================================= */}

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

          {/* =======================================================
              CONNECT
          ======================================================= */}

          <div className="col-span-2 lg:col-span-1">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/25 sm:text-[9px] sm:tracking-[0.28em]">
              Connect
            </p>

            <div className="mt-3 flex flex-col sm:mt-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[40px] items-center justify-between border-b border-white/[0.045] text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px] sm:text-[13px]"
                  >
                    <span className="flex items-center gap-2 sm:gap-3">
                      <Icon className="h-3.5 w-3.5 text-white/20 transition-colors duration-300 group-hover:text-violet-300 sm:h-4 sm:w-4" />

                      {link.label}
                    </span>

                    <ArrowUpRight className="h-3 w-3 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60 sm:h-3.5 sm:w-3.5" />
                  </a>
                );
              })}

              <a
                href="mailto:hello@faizanoor.dev"
                className="group flex min-h-[40px] items-center justify-between border-b border-white/[0.045] text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px] sm:text-[13px]"
              >
                <span className="flex items-center gap-2 sm:gap-3">
                  <Mail className="h-3.5 w-3.5 text-white/20 transition-colors duration-300 group-hover:text-violet-300 sm:h-4 sm:w-4" />

                  Email
                </span>

                <ArrowUpRight className="h-3 w-3 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60 sm:h-3.5 sm:w-3.5" />
              </a>

              <a
                href="#contact"
                className="group flex min-h-[40px] items-center justify-between border-b border-white/[0.045] text-[11px] text-white/40 transition-colors duration-300 hover:text-white sm:min-h-[42px] sm:text-[13px]"
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
          className="relative mt-10 h-[160px] overflow-hidden sm:mt-16 sm:h-[205px] lg:mt-20 lg:h-[220px]"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.055] blur-[75px]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/[0.04] blur-[65px]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/[0.035] blur-[60px]" />

          {/* Outer orbit */}
          <div className="footer-orbit-field absolute left-1/2 top-1/2 h-[125px] w-[235px] -translate-x-1/2 -translate-y-1/2 sm:h-[150px] sm:w-[300px] lg:h-[165px] lg:w-[345px]">
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

          {/* Inner flow ring */}
          <div className="footer-inner-flow absolute left-1/2 top-1/2 h-[72px] w-[155px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] sm:h-[78px] sm:w-[170px]" />

          {/* Center energy */}
          <div className="footer-center-energy pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full" />

          <div className="footer-center-burst pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full" />

          {/* Particle name */}
          <div className="footer-particle-name absolute inset-0 flex items-center justify-center">
            <span className="footer-name-soft absolute select-none bg-gradient-to-r from-pink-300 via-rose-200 via-red-300 to-yellow-200 bg-clip-text text-[clamp(1.8rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-transparent">
              FAIZA NOOR
            </span>

            <span className="footer-name-main relative select-none bg-gradient-to-r from-pink-300 via-baby-pink via-rose-300 via-red-300 via-orange-200 to-yellow-200 bg-[length:250%_100%] bg-clip-text text-[clamp(1.8rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-transparent">
              FAIZA NOOR
            </span>

            <span className="footer-name-shine pointer-events-none absolute select-none bg-gradient-to-r from-transparent via-white/80 to-transparent bg-clip-text text-[clamp(1.8rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em] text-transparent">
              FAIZA NOOR
            </span>
          </div>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
            <span className="whitespace-nowrap font-mono text-[6px] uppercase tracking-[0.25em] text-white/15 sm:text-[7px] sm:tracking-[0.3em]">
              Digital craft / full-stack
            </span>
          </div>
        </section>

        {/* =========================================================
            BOTTOM SYSTEM BAR
        ========================================================= */}

        <div className="relative border-t border-white/[0.07] pt-5 sm:pt-7">
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

      {/* =========================================================
          PARTICLE ORBIT / NAME MOTION CSS
      ========================================================= */}

      <style jsx>{`
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

        .footer-orbit-particle {
          margin-left: -50%;
          margin-top: -50%;
          transform-origin: 0 0;
          opacity: 0;
          animation:
            footerParticleOrbit var(--particle-duration)
              cubic-bezier(0.55, 0.08, 0.25, 0.95)
              var(--particle-delay) infinite;
          will-change: transform, opacity;
        }

        .footer-inner-flow {
          border: 1px solid rgba(255, 105, 165, 0.055);
          box-shadow:
            0 0 30px rgba(255, 79, 154, 0.04),
            inset 0 0 25px rgba(255, 209, 102, 0.025);
          animation: footerInnerFlow 5.8s ease-in-out infinite;
        }

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
