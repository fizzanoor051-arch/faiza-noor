
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Mail,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const capabilities = [
  "Full-stack engineering",
  "Interactive web experiences",
  "AI-powered products",
  "SaaS & dashboard systems",
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/fizzanoor051-arch",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/faiza-noor-b2711b42b",
    icon: "linkedin",
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.41.11-2.93 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.52.23 2.65.11 2.93.72.77 1.15 1.76 1.15 2.97 0 4.27-2.6 5.22-5.08 5.5.4.34.75 1 .75 2.02v3.11c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8 19H4.9V9H8ZM6.45 7.63a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM19.1 19H16v-4.87c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.27-1.87 2.57V19H9.4V9h2.98v1.37h.04a3.27 3.27 0 0 1 2.94-1.62c3.14 0 3.74 2.07 3.74 4.77Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="fn-footer relative isolate overflow-hidden bg-[#05050a] text-white"
    >
      <style>{`
        .fn-footer { --fn-violet: 167, 139, 250; }
        .fn-footer::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .22;
          background-image:
            linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 78%, transparent);
        }
        .fn-footer::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(124,58,237,.16), transparent 48%),
            linear-gradient(to bottom, transparent 35%, rgba(3,3,8,.65));
        }
        .fn-footer-content { position: relative; z-index: 1; }
        .fn-orb-stage {
          position: absolute;
          z-index: -1;
          top: -178px;
          left: 50%;
          width: min(650px, 90vw);
          aspect-ratio: 1;
          transform: translateX(-50%);
          perspective: 900px;
          pointer-events: none;
          opacity: .75;
        }
        .fn-orb {
          position: absolute;
          inset: 14%;
          border-radius: 50%;
          background: radial-gradient(circle at 32% 28%, rgba(196,181,253,.32), rgba(124,58,237,.13) 24%, rgba(37,99,235,.07) 48%, transparent 70%);
          box-shadow: inset 0 0 65px rgba(167,139,250,.09), 0 0 100px rgba(124,58,237,.10);
          transform-style: preserve-3d;
          animation: fn-float 9s ease-in-out infinite;
        }
        .fn-orb::before, .fn-orb::after {
          content: "";
          position: absolute;
          inset: 7%;
          border: 1px solid rgba(196,181,253,.23);
          border-radius: 50%;
          transform: rotateX(67deg) rotateZ(-24deg);
          box-shadow: 0 0 35px rgba(167,139,250,.08);
        }
        .fn-orb::after {
          inset: 17% -5%;
          transform: rotateY(67deg) rotateZ(24deg);
          border-color: rgba(96,165,250,.22);
        }
        .fn-orb-ring {
          position: absolute;
          inset: 2%;
          border: 1px solid rgba(167,139,250,.13);
          border-radius: 50%;
          transform: rotateX(72deg) rotateZ(-18deg);
          animation: fn-spin 24s linear infinite;
        }
        .fn-orb-ring.ring-two {
          inset: 8% -4%;
          border-color: rgba(96,165,250,.16);
          transform: rotateY(70deg) rotateZ(25deg);
          animation-duration: 31s;
          animation-direction: reverse;
        }
        .fn-footer-grid {
          display: grid;
          grid-template-columns: minmax(0,1.4fr) repeat(3,minmax(0,.75fr));
          gap: 2.5rem;
        }
        .fn-link {
          position: relative;
          transition: color .25s ease, transform .25s ease;
        }
        .fn-link:hover { color: #fff; transform: translateX(4px); }
        .fn-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, rgba(196,181,253,.9), transparent);
          transition: transform .3s ease;
        }
        .fn-link:hover::after { transform: scaleX(1); }
        .fn-glass {
          border: 1px solid rgba(255,255,255,.10);
          background: linear-gradient(135deg, rgba(255,255,255,.065), rgba(255,255,255,.018));
          box-shadow: inset 0 1px rgba(255,255,255,.055), 0 18px 60px rgba(0,0,0,.16);
          backdrop-filter: blur(18px);
        }
        .fn-cta {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: linear-gradient(115deg, #a78bfa, #7c3aed 48%, #2563eb);
          box-shadow: 0 12px 38px rgba(124,58,237,.22);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .fn-cta::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          transform: translateX(-130%) skewX(-22deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent);
          transition: transform .75s ease;
        }
        .fn-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 48px rgba(124,58,237,.35);
        }
        .fn-cta:hover::before { transform: translateX(130%) skewX(-22deg); }
        .fn-status-dot {
          box-shadow: 0 0 0 0 rgba(52,211,153,.45);
          animation: fn-pulse 2.2s ease-out infinite;
        }
        .fn-marquee { animation: fn-marquee 28s linear infinite; }
        .fn-marquee-wrap:hover .fn-marquee { animation-play-state: paused; }
        .fn-backtop {
          transition: transform .3s ease, border-color .3s ease, background .3s ease;
        }
        .fn-backtop:hover {
          transform: translateY(-4px) rotate(45deg);
          border-color: rgba(196,181,253,.5);
          background: rgba(139,92,246,.12);
        }
        .fn-social {
          transition: transform .25s ease, color .25s ease, border-color .25s ease, background .25s ease;
        }
        .fn-social:hover {
          transform: translateY(-4px);
          color: #c4b5fd;
          border-color: rgba(167,139,250,.5);
          background: rgba(139,92,246,.12);
        }
        @keyframes fn-float {
          0%,100% { transform: translate3d(0,0,0) rotateX(0deg); }
          50% { transform: translate3d(0,16px,0) rotateX(5deg); }
        }
        @keyframes fn-spin {
          from { transform: rotateX(72deg) rotateZ(-18deg); }
          to { transform: rotateX(72deg) rotateZ(342deg); }
        }
        @keyframes fn-pulse {
          0% { box-shadow: 0 0 0 0 rgba(52,211,153,.38); }
          70%,100% { box-shadow: 0 0 0 7px rgba(52,211,153,0); }
        }
        @keyframes fn-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 767px) {
          .fn-footer-grid {
            grid-template-columns: repeat(2,minmax(0,1fr));
            gap: 2rem 1.5rem;
          }
          .fn-brand-column { grid-column: 1 / -1; }
          .fn-orb-stage { top: -105px; width: 430px; opacity: .55; }
        }
        @media (max-width: 420px) {
          .fn-footer-grid { gap: 1.75rem 1rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fn-footer *, .fn-footer *::before, .fn-footer *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* Animated 3D background */}
      <div className="fn-orb-stage" aria-hidden="true">
        <div className="fn-orb">
          <div className="fn-orb-ring" />
          <div className="fn-orb-ring ring-two" />
        </div>
      </div>

      <div className="fn-footer-content mx-auto max-w-7xl px-5 pb-6 pt-16 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28">
        {/* Availability badge */}
        <div className="mb-8 flex justify-center">
          <div className="fn-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-white/75 sm:text-sm">
            <span className="fn-status-dot h-2 w-2 rounded-full bg-emerald-400" />
            Open to remote opportunities
          </div>
        </div>

        {/* Main heading */}
      

         

          

          
        

        {/* Marquee */}
        <div className="fn-marquee-wrap relative mb-14 overflow-hidden border-y border-white/[0.08] py-5 sm:mb-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#05050a] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#05050a] to-transparent sm:w-24" />

          <div className="fn-marquee flex w-max items-center">
            {[...capabilities, ...capabilities].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex shrink-0 items-center gap-5 px-5 sm:gap-8 sm:px-8"
              >
                <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em] text-white/55 sm:text-sm sm:tracking-[0.2em]">
                  {item}
                </span>
                <span className="text-violet-400/70" aria-hidden="true">
                  ✳
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer columns */}
        <div className="fn-footer-grid">
          {/* Brand */}
          <div className="fn-brand-column">
            <Link
              href="#home"
              aria-label="Faiza Noor — Back to home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/20 to-blue-500/10 text-violet-200 shadow-[0_0_35px_rgba(139,92,246,0.12)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                <Code2 size={23} />
              </span>

              <span>
                <span className="block text-lg font-semibold tracking-tight text-white">
                  Faiza Noor
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-violet-300/75">
                  Full-Stack Web Engineer
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Engineering modern web products with clean architecture,
              thoughtful design, and a focus on meaningful results.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.label} profile`}
                  title={social.label}
                  className="fn-glass fn-social flex h-11 w-11 items-center justify-center rounded-xl text-white/75"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navigation
            </h3>

            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="fn-link inline-flex text-sm text-white/50 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Expertise
            </h3>

            <ul className="space-y-4">
              {capabilities.map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className="fn-link inline-flex text-sm leading-6 text-white/50 hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Let&apos;s connect
            </h3>

            <p className="text-sm leading-7 text-white/50">
              Have a project, an idea, or a remote opportunity in mind?
              Let&apos;s discuss what we can create together.
            </p>

            <Link
              href="#contact"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
            >
              <Mail size={16} />
              Get in touch
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

          
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/[0.09] pt-6 sm:mt-20 sm:pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-white/40">
              © {year}{" "}
              <span className="font-medium text-white/70">Faiza Noor</span>.
              Crafted with purpose and precision.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="inline-flex items-center gap-2 text-xs text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Built for the modern web
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                title="Back to top"
                className="fn-glass fn-backtop flex h-10 w-10 items-center justify-center rounded-xl text-white/75"
              >
                <MoveUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
