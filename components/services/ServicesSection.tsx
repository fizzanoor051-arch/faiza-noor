"use client";

import { useState } from "react";

export type Service = {
  number: string;
  icon: string;
  title: string;
  short: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  stack: string[];
};


const services: Service[] = [
  {
    number: "01",
    icon: "✧",
    title: "Full-Stack Development",
    short: "Complete web applications",
    subtitle: "From first interaction to final deployment.",
    description:
      "I build complete web applications with modern frontend interfaces, secure backend logic, database integration, and scalable architecture.",
    deliverables: [
      "Full-stack web applications",
      "REST APIs & backend services",
      "Authentication & authorization",
      "Database design & integration",
    ],
    stack: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
  },
  {
    number: "02",
    icon: "◈",
    title: "Frontend Engineering",
    short: "Interfaces with purpose",
    subtitle: "Clean code. Precise details. Smooth experiences.",
    description:
      "I develop responsive, accessible frontend experiences using reusable components, thoughtful interactions, and maintainable architecture.",
    deliverables: [
      "Interactive React applications",
      "Reusable component systems",
      "Responsive UI development",
      "Performance-focused interfaces",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "03",
    icon: "⌘",
    title: "Website Development",
    short: "Websites built to stand out",
    subtitle: "A stronger digital presence for your business.",
    description:
      "I create modern business websites, personal portfolios, landing pages, and product websites designed for usability, mobile responsiveness, and discoverability.",
    deliverables: [
      "Business & portfolio websites",
      "SEO-friendly page structure",
      "Landing pages & product sites",
      "Mobile-first layouts",
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS"],
  },
  {
    number: "04",
    icon: "⟡",
    title: "API & Backend Systems",
    short: "Reliable data and logic",
    subtitle: "Connect every layer of your application.",
    description:
      "I integrate APIs and build backend functionality that connects user interfaces with databases, authentication systems, and external services.",
    deliverables: [
      "REST API development",
      "Third-party API integration",
      "Database operations",
      "Validation & error handling",
    ],
    stack: ["Node.js", "Express.js", "REST APIs", "MongoDB"],
  },
  {
    number: "05",
    icon: "✳",
    title: "UI Modernization",
    short: "A smarter visual experience",
    subtitle: "Give existing products a fresh direction.",
    description:
      "I modernize existing websites and applications with refined layouts, consistent design systems, responsive behavior, and purposeful micro-interactions.",
    deliverables: [
      "Website redesign",
      "Component refactoring",
      "Responsive improvements",
      "Visual consistency & usability",
    ],
    stack: ["React", "Tailwind CSS", "TypeScript", "Design Systems"],
  },
  {
    number: "06",
    icon: "☼",
    title: "AI-Powered Web Apps",
    short: "Useful intelligence, built in",
    subtitle: "Bring practical AI capabilities into your product.",
    description:
      "I integrate AI APIs into web applications to support intelligent tools, conversational experiences, content workflows, and task automation.",
    deliverables: [
      "AI API integration",
      "Interactive AI tools",
      "AI-assisted workflows",
      "Product-focused AI features",
    ],
    stack: ["Next.js", "TypeScript", "AI APIs", "Node.js"],
  },
];

const lanterns = [
  { left: "5%", delay: "-8s", duration: "19s", size: 13 },
  { left: "17%", delay: "-2s", duration: "23s", size: 10 },
  { left: "31%", delay: "-13s", duration: "21s", size: 15 },
  { left: "46%", delay: "-5s", duration: "25s", size: 11 },
  { left: "60%", delay: "-16s", duration: "22s", size: 14 },
  { left: "74%", delay: "-10s", duration: "20s", size: 10 },
  { left: "88%", delay: "-4s", duration: "24s", size: 14 },
  { left: "96%", delay: "-14s", duration: "21s", size: 9 },
];

const fireflies = [
  { left: "8%", top: "23%", delay: "0s" },
  { left: "19%", top: "65%", delay: "2s" },
  { left: "29%", top: "35%", delay: "4s" },
  { left: "41%", top: "78%", delay: "1s" },
  { left: "53%", top: "17%", delay: "3s" },
  { left: "65%", top: "54%", delay: "5s" },
  { left: "76%", top: "29%", delay: "2.5s" },
  { left: "91%", top: "68%", delay: "1.5s" },
  { left: "84%", top: "12%", delay: "4.5s" },
  { left: "36%", top: "12%", delay: "3.5s" },
  { left: "13%", top: "86%", delay: "5.5s" },
  { left: "69%", top: "85%", delay: "0.8s" },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="tangled-services relative isolate overflow-hidden bg-[#080510] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Animated Tangled-inspired background — no images */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="services-nebula services-nebula-one" />
        <div className="services-nebula services-nebula-two" />
        <div className="services-nebula services-nebula-three" />

        <div className="services-orbit services-orbit-one" />
        <div className="services-orbit services-orbit-two" />
        <div className="services-orbit services-orbit-three" />

        <div className="services-star-field" />

        {Array.from({ length: 32 }, (_, index) => (
          <span
            key={`star-${index}`}
            className="services-star"
            style={{
              left: `${(index * 37 + 11) % 100}%`,
              top: `${(index * 53 + 7) % 100}%`,
              animationDelay: `${(index % 8) * -0.7}s`,
              animationDuration: `${3 + (index % 5)}s`,
            }}
          />
        ))}

        {fireflies.map((fly, index) => (
          <span
            key={`firefly-${index}`}
            className="services-firefly"
            style={{
              left: fly.left,
              top: fly.top,
              animationDelay: fly.delay,
            }}
          />
        ))}

        {lanterns.map((lantern, index) => (
          <div
            key={`lantern-${index}`}
            className="services-lantern-path"
            style={{
              left: lantern.left,
              animationDelay: lantern.delay,
              animationDuration: lantern.duration,
            }}
          >
            <div
              className="services-lantern"
              style={{
                width: lantern.size,
                height: lantern.size * 1.45,
                animationDelay: `${index * -0.6}s`,
              }}
            >
              <span className="services-lantern-light" />
            </div>
          </div>
        ))}

        <div className="services-mist services-mist-one" />
        <div className="services-mist services-mist-two" />
        <div className="services-horizon" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-amber-200/80" />
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-amber-100/75 sm:text-xs">
                What I Build · 06 Services
              </span>
            </div>

            <h2
              id="services-heading"
              className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              Engineering ideas
              <br />
              <span className="services-gradient-text">
                into digital reality.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/55 md:pb-1">
            Full-stack web engineering for modern products, ambitious ideas,
            and growing businesses.
          </p>
        </div>

        {/* Interactive services */}
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
          {/* Left navigation */}
          <div
            className="flex flex-col gap-2"
            role="group"
            aria-label="Choose a web development service"
          >
            {services.map((service, index) => {
              const isActive = activeService === index;

              return (
                <button
                  key={service.number}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveService(index)}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                    isActive
                      ? "border-purple-300/30 bg-gradient-to-r from-purple-500/[0.16] to-fuchsia-400/[0.05] shadow-[0_0_35px_rgba(139,92,246,0.08)]"
                      : "border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.05]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-4 left-0 top-4 w-[2px] rounded-full bg-gradient-to-b from-amber-200 to-purple-400" />
                  )}

                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-xl transition-all duration-300 ${
                        isActive
                          ? "border-amber-200/20 bg-amber-200/[0.08] text-amber-200"
                          : "border-white/[0.07] bg-white/[0.03] text-purple-200/70 group-hover:text-purple-100"
                      }`}
                    >
                      {service.icon}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="mb-1 flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] ${
                            isActive ? "text-amber-200/80" : "text-white/35"
                          }`}
                        >
                          {service.number}
                        </span>

                        {isActive && (
                          <span className="h-px w-5 bg-amber-200/40" />
                        )}
                      </span>

                      <span
                        className={`block text-sm font-medium tracking-[-0.02em] sm:text-base ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {service.title}
                      </span>

                      <span className="mt-1 block text-xs text-white/45">
                        {service.short}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`text-lg transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-amber-200"
                          : "-translate-x-1 text-white/30 group-hover:translate-x-0 group-hover:text-white/70"
                      }`}
                    >
                      ↗
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right detail panel */}
          <div
            className="services-detail-panel relative flex min-h-[440px] flex-col overflow-hidden rounded-3xl border border-purple-200/[0.15] bg-[#100b1b]/85 p-6 shadow-[0_25px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-9 lg:min-h-[540px] lg:p-10"
            aria-live="polite"
          >
            <div
              aria-hidden="true"
              className="services-panel-glow pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-purple-200/[0.09]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-8 h-48 w-48 rounded-full border border-amber-200/[0.08]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-12 top-12 h-28 w-28 rounded-full bg-purple-500/[0.10] blur-3xl"
            />

            <div className="services-panel-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3" />

            <div key={active.number} className="services-detail-content relative flex flex-1 flex-col">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-200/[0.05] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-amber-100/85">
                    <span className="services-status-dot" />
                    Service {active.number}
                  </span>

                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-purple-200/70">
                    {active.short}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="services-active-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-purple-200/15 bg-gradient-to-br from-purple-300/[0.12] to-amber-200/[0.06] text-3xl text-amber-100 sm:h-16 sm:w-16 sm:text-4xl"
                >
                  {active.icon}
                </span>
              </div>

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                {active.title}
              </h3>

              <p className="mt-3 text-sm font-medium text-purple-100/85">
                {active.subtitle}
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                {active.description}
              </p>

              <div className="my-7 h-px w-full bg-gradient-to-r from-purple-200/25 via-white/[0.09] to-transparent" />

              <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">
                What you get
              </h4>

              <ul className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {active.deliverables.map((item, index) => (
                  <li
                    key={item}
                    className="services-deliverable flex items-start gap-2.5 text-xs leading-5 text-white/80 sm:text-sm"
                    style={{ animationDelay: `${index * 65}ms` }}
                  >
                    <span aria-hidden="true" className="mt-1 text-amber-200">
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <h4 className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/45">
                  Technology stack
                </h4>

                <div className="flex flex-wrap gap-2">
                  {active.stack.map((tech, index) => (
                    <span
                      key={tech}
                      className="services-tech-chip rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[11px] text-purple-100/80"
                      style={{ animationDelay: `${index * 55}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
                  <span className="text-[10px] uppercase tracking-[0.17em] text-white/45">
                    Thoughtful code. Useful products.
                  </span>

                  <span className="font-mono text-xs text-amber-200/80">
                    {active.number} / 06
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-nebula {
          position: absolute;
          width: min(55vw, 650px);
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          will-change: transform;
        }

        .services-nebula-one {
          top: 5%;
          left: -18%;
          background: rgba(115, 45, 180, 0.17);
          animation: services-nebula-drift 19s ease-in-out infinite alternate;
        }

        .services-nebula-two {
          top: 14%;
          right: -20%;
          background: rgba(175, 60, 160, 0.12);
          animation: services-nebula-drift 24s ease-in-out infinite alternate-reverse;
        }

        .services-nebula-three {
          bottom: -32%;
          left: 28%;
          background: rgba(201, 137, 48, 0.09);
          animation: services-nebula-drift 21s ease-in-out infinite alternate;
        }

        .services-orbit {
          position: absolute;
          border: 1px solid rgba(219, 190, 255, 0.055);
          border-radius: 50%;
          pointer-events: none;
        }

        .services-orbit-one {
          width: 480px;
          height: 480px;
          top: -190px;
          right: -90px;
          transform: rotateX(64deg) rotateZ(-22deg);
          animation: services-orbit-turn 36s linear infinite;
        }

        .services-orbit-two {
          width: 360px;
          height: 360px;
          top: -130px;
          right: -30px;
          border-color: rgba(255, 211, 128, 0.07);
          transform: rotateX(62deg) rotateZ(28deg);
          animation: services-orbit-turn 29s linear infinite reverse;
        }

        .services-orbit-three {
          width: 220px;
          height: 220px;
          bottom: 3%;
          left: -110px;
          border-color: rgba(198, 157, 255, 0.07);
          transform: rotateX(65deg) rotateZ(-35deg);
          animation: services-orbit-turn 32s linear infinite;
        }

        .services-star-field {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.75) 0.6px,
            transparent 0.8px
          );
          background-size: 26px 26px;
          mask-image: linear-gradient(
            to bottom,
            black,
            rgba(0, 0, 0, 0.6) 65%,
            transparent
          );
        }

        .services-star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #fff2cf;
          box-shadow: 0 0 9px 2px rgba(255, 213, 142, 0.3);
          animation: services-twinkle ease-in-out infinite;
        }

        .services-firefly {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ffe7a5;
          box-shadow:
            0 0 7px 2px rgba(255, 208, 112, 0.55),
            0 0 20px 4px rgba(249, 168, 37, 0.14);
          animation: services-firefly-float 7s ease-in-out infinite;
        }

        .services-lantern-path {
          position: absolute;
          bottom: -70px;
          z-index: 0;
          animation: services-lantern-rise linear infinite;
          will-change: transform;
        }

        .services-lantern {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 223, 156, 0.5);
          border-radius: 5px 5px 7px 7px;
          background: linear-gradient(
            135deg,
            rgba(255, 220, 150, 0.27),
            rgba(233, 147, 47, 0.09)
          );
          box-shadow:
            0 0 10px rgba(255, 192, 87, 0.16),
            inset 0 0 9px rgba(255, 224, 155, 0.2);
          transform: rotate(2deg);
          animation: services-lantern-sway 4s ease-in-out infinite;
        }

        .services-lantern::before {
          content: "";
          position: absolute;
          top: -4px;
          left: 20%;
          width: 60%;
          height: 3px;
          border-radius: 2px;
          background: rgba(255, 220, 153, 0.65);
        }

        .services-lantern::after {
          content: "";
          position: absolute;
          top: -10px;
          left: 50%;
          width: 7px;
          height: 7px;
          border: 1px solid rgba(255, 220, 153, 0.4);
          border-bottom: 0;
          border-radius: 7px 7px 0 0;
          transform: translateX(-50%);
        }

        .services-lantern-light {
          width: 42%;
          height: 58%;
          border-radius: 50%;
          background: #ffe4a1;
          box-shadow:
            0 0 7px 3px rgba(255, 205, 110, 0.65),
            0 0 18px 6px rgba(249, 168, 37, 0.28);
          animation: services-lantern-glow 3s ease-in-out infinite;
        }

        .services-mist {
          position: absolute;
          width: 70%;
          height: 180px;
          border-radius: 50%;
          filter: blur(65px);
          opacity: 0.12;
          pointer-events: none;
        }

        .services-mist-one {
          bottom: -120px;
          left: -10%;
          background: #9d6bfa;
          animation: services-mist-breathe 12s ease-in-out infinite alternate;
        }

        .services-mist-two {
          right: -15%;
          bottom: -130px;
          background: #d9a84d;
          animation: services-mist-breathe 15s ease-in-out infinite alternate-reverse;
        }

        .services-horizon {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(189, 143, 255, 0.15),
            rgba(255, 217, 144, 0.2),
            transparent
          );
          box-shadow: 0 0 30px rgba(180, 124, 255, 0.1);
        }

        .services-gradient-text {
          background: linear-gradient(
            100deg,
            #e5c9ff 0%,
            #e9b9fa 40%,
            #ffe7ad 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: services-gradient-shift 8s ease-in-out infinite alternate;
        }

        .services-detail-panel {
          box-shadow:
            0 25px 100px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);
          transition:
            border-color 500ms ease,
            box-shadow 500ms ease;
        }

        .services-detail-panel:hover {
          border-color: rgba(216, 180, 254, 0.25);
          box-shadow:
            0 30px 100px rgba(60, 24, 91, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .services-panel-glow {
          background: rgba(168, 85, 247, 0.1);
          filter: blur(65px);
          animation: services-glow-breathe 8s ease-in-out infinite alternate;
        }

        .services-panel-shimmer {
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.018) 50%,
            transparent 80%
          );
          transform: translateX(-140%);
          transition: transform 1.4s ease;
        }

        .services-detail-panel:hover .services-panel-shimmer {
          transform: translateX(360%);
        }

        .services-detail-content {
          animation: services-content-enter 450ms ease-out both;
        }

        .services-active-icon {
          box-shadow:
            0 0 30px rgba(255, 200, 106, 0.045),
            inset 0 0 20px rgba(255, 255, 255, 0.015);
          animation: services-icon-float 5s ease-in-out infinite;
        }

        .services-deliverable {
          animation: services-item-enter 400ms ease-out both;
        }

        .services-tech-chip {
          animation: services-item-enter 400ms ease-out both;
          transition:
            border-color 300ms ease,
            color 300ms ease,
            background 300ms ease,
            transform 300ms ease;
        }

        .services-tech-chip:hover {
          transform: translateY(-2px);
          border-color: rgba(253, 230, 138, 0.3);
          background: rgba(253, 230, 138, 0.06);
          color: #fff0c7;
        }

        .services-status-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #f8d88f;
          box-shadow: 0 0 9px rgba(253, 230, 138, 0.7);
          animation: services-status-pulse 2.5s ease-in-out infinite;
        }

        @keyframes services-lantern-rise {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          8% {
            opacity: 0.75;
          }
          78% {
            opacity: 0.5;
          }
          100% {
            transform: translate3d(25px, -115vh, 0);
            opacity: 0;
          }
        }

        @keyframes services-lantern-sway {
          0%, 100% {
            rotate: -5deg;
          }
          50% {
            rotate: 6deg;
          }
        }

        @keyframes services-lantern-glow {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes services-firefly-float {
          0%, 100% {
            opacity: 0.2;
            transform: translate3d(0, 0, 0) scale(0.7);
          }
          35% {
            opacity: 0.9;
            transform: translate3d(9px, -12px, 0) scale(1.2);
          }
          70% {
            opacity: 0.4;
            transform: translate3d(-7px, -22px, 0) scale(0.85);
          }
        }

        @keyframes services-twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes services-nebula-drift {
          0% {
            translate: -2% 0;
            scale: 1;
          }
          100% {
            translate: 5% 7%;
            scale: 1.13;
          }
        }

        @keyframes services-orbit-turn {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }

        @keyframes services-mist-breathe {
          0% {
            transform: translate3d(-3%, 0, 0) scale(0.9);
            opacity: 0.07;
          }
          100% {
            transform: translate3d(8%, -15px, 0) scale(1.12);
            opacity: 0.16;
          }
        }

        @keyframes services-gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 100% center;
          }
        }

        @keyframes services-glow-breathe {
          0% {
            opacity: 0.55;
            scale: 0.9;
          }
          100% {
            opacity: 1;
            scale: 1.15;
          }
        }

        @keyframes services-icon-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes services-content-enter {
          from {
            opacity: 0;
            transform: translateY(9px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes services-item-enter {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes services-status-pulse {
          0%, 100% {
            opacity: 0.65;
            box-shadow: 0 0 5px rgba(253, 230, 138, 0.35);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 12px rgba(253, 230, 138, 0.8);
          }
        }

        @media (max-width: 640px) {
          .services-nebula {
            filter: blur(75px);
            opacity: 0.8;
          }

          .services-orbit-one {
            right: -250px;
          }

          .services-orbit-two {
            right: -180px;
          }

          .services-firefly {
            width: 3px;
            height: 3px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tangled-services *,
          .tangled-services *::before,
          .tangled-services *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}