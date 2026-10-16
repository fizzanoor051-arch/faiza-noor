
"use client";

import { useState } from "react";

const faqs = [
  {
    id: "01",
    question: "What web development services do you offer?",
    answer:
      "I build responsive business websites, landing pages, portfolios, dashboards, and full-stack web applications using modern web technologies.",
  },
  {
    id: "02",
    question: "Do you work with React, Next.js, and Node.js?",
    answer:
      "Yes. My development stack includes React.js, Next.js, TypeScript, Node.js, Express.js, REST APIs, and database integration.",
  },
  {
    id: "03",
    question: "Can you build a responsive, SEO-friendly website?",
    answer:
      "Yes. I focus on mobile-responsive layouts, semantic HTML, clear page structure, metadata, and performance-conscious development.",
  },
  {
    id: "04",
    question: "Can you improve an existing website or add features?",
    answer:
      "Yes. I can modernize UI designs, improve responsive behavior, integrate APIs, refactor components, and add functionality based on your requirements.",
  },
  {
    id: "05",
    question: "How can I start a project with you?",
    answer:
      "Share your idea, required features, timeline, and design references through my contact section. We can discuss the scope and next steps.",
  },
];

const lanterns = [
  { left: "7%", delay: "-2s", duration: "15s", size: 15, drift: "38px" },
  { left: "18%", delay: "-9s", duration: "19s", size: 11, drift: "-30px" },
  { left: "31%", delay: "-5s", duration: "17s", size: 13, drift: "25px" },
  { left: "45%", delay: "-13s", duration: "21s", size: 10, drift: "-35px" },
  { left: "58%", delay: "-7s", duration: "16s", size: 14, drift: "30px" },
  { left: "70%", delay: "-11s", duration: "20s", size: 11, drift: "-25px" },
  { left: "82%", delay: "-4s", duration: "18s", size: 15, drift: "32px" },
  { left: "94%", delay: "-15s", duration: "22s", size: 10, drift: "-28px" },
];

const fireflies = [
  { left: "9%", top: "22%", delay: "-1s" },
  { left: "23%", top: "66%", delay: "-4s" },
  { left: "38%", top: "18%", delay: "-2s" },
  { left: "51%", top: "77%", delay: "-6s" },
  { left: "66%", top: "27%", delay: "-3s" },
  { left: "77%", top: "62%", delay: "-5s" },
  { left: "91%", top: "34%", delay: "-7s" },
  { left: "15%", top: "83%", delay: "-3.5s" },
  { left: "61%", top: "48%", delay: "-1.5s" },
  { left: "87%", top: "81%", delay: "-6.5s" },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="faq-world relative isolate overflow-hidden bg-[#090510] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"
    >
      {/* CSS-generated enchanted atmosphere */}
      <div
        aria-hidden="true"
        className="faq-universe pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Deep purple sky */}
        <div className="faq-nebula faq-nebula-one absolute" />
        <div className="faq-nebula faq-nebula-two absolute" />
        <div className="faq-nebula faq-nebula-three absolute" />

        {/* Magical dimensional rings */}
        <div className="faq-magic-ring faq-ring-one absolute" />
        <div className="faq-magic-ring faq-ring-two absolute" />
        <div className="faq-magic-ring faq-ring-three absolute" />

        {/* Floating golden lanterns */}
        {lanterns.map((lantern, index) => (
          <div
            key={index}
            className="faq-lantern-path absolute"
            style={
              {
                left: lantern.left,
                "--lantern-delay": lantern.delay,
                "--lantern-duration": lantern.duration,
                "--lantern-drift": lantern.drift,
                "--lantern-size": `${lantern.size}px`,
              } as React.CSSProperties
            }
          >
            <div className="faq-lantern">
              <span className="faq-lantern-core" />
              <span className="faq-lantern-cap" />
            </div>
          </div>
        ))}

        {/* Golden fireflies */}
        {fireflies.map((fly, index) => (
          <span
            key={index}
            className="faq-firefly absolute"
            style={{
              left: fly.left,
              top: fly.top,
              animationDelay: fly.delay,
            }}
          />
        ))}

        {/* Tiny magical stars */}
        <div className="faq-star faq-star-one absolute">✦</div>
        <div className="faq-star faq-star-two absolute">✧</div>
        <div className="faq-star faq-star-three absolute">✦</div>
        <div className="faq-star faq-star-four absolute">✧</div>

        {/* Atmospheric ground mist */}
        <div className="faq-mist absolute inset-x-0 bottom-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-amber-200/70" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-amber-100/80 sm:text-xs">
              A little clarity
            </span>
            <span className="h-px w-8 bg-amber-200/70" />
          </div>

          <h2
            id="faq-heading"
            className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            Curious about
            <br />
            <span className="bg-gradient-to-r from-purple-200 via-fuchsia-200 to-amber-100 bg-clip-text text-transparent">
              working together?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/55">
            Everything you need to know about my web development services,
            technology stack, and project process.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <article
                key={faq.id}
                className={`faq-card overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-purple-200/25 bg-[#160d25]/90 shadow-[0_8px_35px_rgba(139,92,246,0.1)]"
                    : "border-white/[0.10] bg-[#100b1b]/75 hover:border-purple-200/20 hover:bg-[#160d25]/85"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setActiveId(isOpen ? null : faq.id)
                    }
                    className="group flex w-full items-center gap-4 px-4 py-5 text-left sm:px-6"
                  >
                    <span
                      className={`font-mono text-[10px] transition-colors ${
                        isOpen ? "text-amber-200" : "text-white/35"
                      }`}
                    >
                      {faq.id}
                    </span>

                    <span
                      className={`flex-1 text-sm font-medium leading-6 transition-colors sm:text-base ${
                        isOpen ? "text-white" : "text-white/75"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-amber-200/30 bg-amber-200/[0.09] text-amber-100"
                          : "border-white/10 text-white/50 group-hover:border-purple-200/25 group-hover:text-purple-100"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div id={panelId} hidden={!isOpen}>
                  <div className="ml-4 border-l border-amber-200/25 pb-5 pl-4 pr-5 sm:ml-6 sm:pl-5 sm:pr-8">
                    <p className="max-w-2xl text-sm leading-7 text-white/60">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing detail */}
        <div className="mt-8 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-6 bg-purple-200/25" />
          <p className="text-xs text-white/50">
            Have a project in mind? Let&apos;s talk.
          </p>
          <span className="h-px w-6 bg-purple-200/25" />
        </div>
      </div>

      <style jsx>{`
        .faq-world {
          isolation: isolate;
          perspective: 1000px;
        }

        .faq-universe {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .faq-nebula {
          border-radius: 50%;
          filter: blur(85px);
          will-change: transform;
        }

        .faq-nebula-one {
          width: 440px;
          height: 440px;
          left: -150px;
          top: 5%;
          background: radial-gradient(
            circle,
            rgba(139, 72, 225, 0.24),
            rgba(91, 33, 182, 0.08) 45%,
            transparent 72%
          );
          animation: nebula-float-one 18s ease-in-out infinite alternate;
        }

        .faq-nebula-two {
          width: 400px;
          height: 400px;
          right: -140px;
          top: 18%;
          background: radial-gradient(
            circle,
            rgba(192, 100, 255, 0.17),
            rgba(126, 34, 206, 0.06) 50%,
            transparent 72%
          );
          animation: nebula-float-two 23s ease-in-out infinite alternate;
        }

        .faq-nebula-three {
          width: 420px;
          height: 300px;
          bottom: -170px;
          left: 28%;
          background: radial-gradient(
            ellipse,
            rgba(245, 158, 11, 0.12),
            rgba(168, 85, 247, 0.09) 45%,
            transparent 75%
          );
          animation: nebula-float-three 20s ease-in-out infinite alternate;
        }

        .faq-magic-ring {
          border: 1px solid rgba(211, 175, 255, 0.08);
          border-radius: 50%;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .faq-ring-one {
          width: 540px;
          height: 540px;
          right: -180px;
          top: -210px;
          transform: rotateX(62deg) rotateZ(-22deg);
          box-shadow:
            0 0 45px rgba(168, 85, 247, 0.045),
            inset 0 0 35px rgba(168, 85, 247, 0.035);
          animation: ring-drift-one 32s ease-in-out infinite alternate;
        }

        .faq-ring-two {
          width: 380px;
          height: 380px;
          left: -190px;
          bottom: -140px;
          border-color: rgba(253, 230, 138, 0.09);
          transform: rotateX(66deg) rotateZ(25deg);
          animation: ring-drift-two 27s ease-in-out infinite alternate;
        }

        .faq-ring-three {
          width: 260px;
          height: 260px;
          left: 42%;
          top: 8%;
          border-color: rgba(196, 181, 253, 0.055);
          transform: rotateX(70deg);
          animation: ring-drift-three 35s ease-in-out infinite alternate;
        }

        .faq-lantern-path {
          bottom: -90px;
          opacity: 0;
          transform: translate3d(0, 0, 0);
          animation: lantern-rise var(--lantern-duration) linear
            var(--lantern-delay) infinite;
          will-change: transform, opacity;
        }

        .faq-lantern {
          position: relative;
          width: var(--lantern-size);
          height: calc(var(--lantern-size) * 1.35);
          border: 1px solid rgba(255, 225, 153, 0.65);
          border-radius: 45% 45% 38% 38%;
          background: linear-gradient(
            145deg,
            rgba(255, 231, 169, 0.9),
            rgba(251, 191, 36, 0.48) 48%,
            rgba(217, 119, 6, 0.24)
          );
          box-shadow:
            0 0 10px rgba(251, 191, 36, 0.55),
            0 0 28px rgba(245, 158, 11, 0.24),
            inset 0 0 7px rgba(255, 255, 255, 0.65);
          animation: lantern-sway 4s ease-in-out infinite alternate;
        }

        .faq-lantern::before {
          content: "";
          position: absolute;
          left: 25%;
          right: 25%;
          top: -3px;
          height: 3px;
          border-radius: 100%;
          background: rgba(255, 228, 165, 0.8);
        }

        .faq-lantern-cap {
          position: absolute;
          left: 35%;
          right: 35%;
          bottom: -4px;
          height: 4px;
          border-radius: 0 0 50% 50%;
          background: rgba(251, 191, 36, 0.7);
        }

        .faq-lantern-core {
          position: absolute;
          inset: 22%;
          border-radius: 50%;
          background: #fff4c4;
          filter: blur(2px);
          opacity: 0.85;
          box-shadow: 0 0 10px 4px rgba(255, 217, 120, 0.7);
        }

        .faq-firefly {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ffe9a8;
          box-shadow:
            0 0 6px 2px rgba(251, 191, 36, 0.55),
            0 0 18px 4px rgba(251, 191, 36, 0.15);
          animation: firefly-glow 4s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .faq-star {
          color: rgba(255, 225, 160, 0.7);
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.55);
          animation: star-twinkle 5s ease-in-out infinite;
        }

        .faq-star-one {
          left: 12%;
          top: 38%;
          font-size: 15px;
        }

        .faq-star-two {
          right: 13%;
          top: 16%;
          font-size: 22px;
          animation-delay: -2s;
        }

        .faq-star-three {
          right: 25%;
          bottom: 18%;
          font-size: 12px;
          animation-delay: -3.5s;
        }

        .faq-star-four {
          left: 32%;
          bottom: 10%;
          font-size: 17px;
          animation-delay: -1.5s;
        }

        .faq-mist {
          height: 220px;
          background: linear-gradient(
            to top,
            rgba(84, 45, 126, 0.12),
            rgba(70, 35, 112, 0.035) 45%,
            transparent
          );
          animation: mist-breathe 12s ease-in-out infinite alternate;
        }

        .faq-card {
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        @keyframes lantern-rise {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.7);
          }
          10% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.72;
            transform: translate3d(var(--lantern-drift), -55vh, 0)
              scale(1);
          }
          85% {
            opacity: 0.65;
          }
          100% {
            opacity: 0;
            transform: translate3d(
                calc(var(--lantern-drift) * -0.4),
                -115vh,
                0
              )
              scale(0.75);
          }
        }

        @keyframes lantern-sway {
          from {
            transform: rotate(-8deg) translateY(-3px);
          }
          to {
            transform: rotate(8deg) translateY(3px);
          }
        }

        @keyframes firefly-glow {
          0%,
          100% {
            opacity: 0.18;
            transform: translate3d(0, 0, 0) scale(0.7);
          }
          50% {
            opacity: 1;
            transform: translate3d(10px, -18px, 0) scale(1.4);
          }
        }

        @keyframes star-twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.7) rotate(0deg);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.15) rotate(35deg);
          }
        }

        @keyframes nebula-float-one {
          from {
            transform: translate3d(0, 0, -50px) scale(0.9);
          }
          to {
            transform: translate3d(70px, 45px, 30px) scale(1.12);
          }
        }

        @keyframes nebula-float-two {
          from {
            transform: translate3d(0, 0, -30px) scale(1);
          }
          to {
            transform: translate3d(-65px, 55px, 35px) scale(1.15);
          }
        }

        @keyframes nebula-float-three {
          from {
            transform: translate3d(-35px, 0, -20px);
          }
          to {
            transform: translate3d(45px, -30px, 20px);
          }
        }

        @keyframes ring-drift-one {
          from {
            margin-top: 0;
            rotate: -4deg;
          }
          to {
            margin-top: 35px;
            rotate: 5deg;
          }
        }

        @keyframes ring-drift-two {
          from {
            translate: 0 0;
            rotate: -5deg;
          }
          to {
            translate: 25px -25px;
            rotate: 6deg;
          }
        }

        @keyframes ring-drift-three {
          from {
            translate: 0 0;
            rotate: -12deg;
          }
          to {
            translate: 20px 30px;
            rotate: 12deg;
          }
        }

        @keyframes mist-breathe {
          from {
            opacity: 0.55;
            transform: translateX(-2%);
          }
          to {
            opacity: 1;
            transform: translateX(2%);
          }
        }

        @media (max-width: 640px) {
          .faq-nebula {
            filter: blur(65px);
          }

          .faq-ring-one {
            right: -340px;
          }

          .faq-ring-three {
            left: 20%;
          }

          .faq-lantern-path {
            opacity: 0;
          }

          .faq-card {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-world *,
          .faq-world *::before,
          .faq-world *::after {
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
