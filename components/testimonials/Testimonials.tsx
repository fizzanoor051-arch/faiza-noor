"use client";

const principles = [
  {
    number: "01",
    title: "Built with purpose",
    description:
      "Every feature should solve a real problem and make the product more useful.",
    icon: "✧",
  },
  {
    number: "02",
    title: "Engineered to scale",
    description:
      "Maintainable code, reusable components, and thoughtful full-stack architecture.",
    icon: "⌘",
  },
  {
    number: "03",
    title: "Designed for people",
    description:
      "Responsive interfaces, clear navigation, and smooth user experiences.",
    icon: "◇",
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

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="tangled-testimonials relative isolate overflow-hidden bg-[#080510] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Code-generated enchanted sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="testimonial-nebula testimonial-nebula-one" />
        <div className="testimonial-nebula testimonial-nebula-two" />
        <div className="testimonial-nebula testimonial-nebula-three" />

        <div className="testimonial-orbit testimonial-orbit-one" />
        <div className="testimonial-orbit testimonial-orbit-two" />
        <div className="testimonial-orbit testimonial-orbit-three" />

        <div className="testimonial-star-field" />

        {Array.from({ length: 32 }, (_, index) => (
          <span
            key={`star-${index}`}
            className="testimonial-star"
            style={{
              left: `${(index * 37 + 11) % 100}%`,
              top: `${(index * 53 + 7) % 100}%`,
              animationDelay: `${(index % 8) * -0.7}s`,
              animationDuration: `${3 + (index % 5)}s`,
              transform: `scale(${index % 3 === 0 ? 1.4 : 1})`,
            }}
          />
        ))}

        {fireflies.map((fly, index) => (
          <span
            key={`fly-${index}`}
            className="testimonial-firefly"
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
            className="testimonial-lantern-path"
            style={{
              left: lantern.left,
              animationDelay: lantern.delay,
              animationDuration: lantern.duration,
            }}
          >
            <div
              className="testimonial-lantern"
              style={{
                width: lantern.size,
                height: lantern.size * 1.45,
                animationDelay: `${index * -0.6}s`,
              }}
            >
              <span className="testimonial-lantern-light" />
            </div>
          </div>
        ))}

        <div className="testimonial-mist testimonial-mist-one" />
        <div className="testimonial-mist testimonial-mist-two" />

        <div className="testimonial-horizon" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-amber-200/80" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-amber-100/75 sm:text-xs">
                Trust · Quality · Craft
              </span>
            </div>

            <h2
              id="testimonials-heading"
              className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              Quality speaks.
              <br />
              <span className="testimonial-gradient-text">
                Trust follows.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/55">
            Thoughtful engineering, purposeful design, and transparent
            collaboration are at the heart of every web project I build.
          </p>
        </div>

        {/* Main glass panel */}
        <div className="testimonial-main-panel group/panel relative overflow-hidden rounded-[28px] border border-purple-200/[0.16] bg-[#100a1b]/75 p-6 backdrop-blur-2xl sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="testimonial-panel-glow pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full border border-purple-200/[0.10]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-8 h-52 w-52 rounded-full border border-amber-200/[0.09]"
          />

          <div
            aria-hidden="true"
            className="testimonial-panel-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Left message */}
            <div className="flex flex-col">
              <span className="testimonial-quote-mark mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-100/[0.06] font-serif text-4xl text-amber-100/90">
                “
              </span>

              <p className="max-w-lg text-2xl font-medium leading-relaxed tracking-[-0.025em] text-white/90 sm:text-3xl">
                No invented reviews.
                <br />
                <span className="testimonial-gradient-text">
                  Just honest work,
                </span>{" "}
                real skills, and a commitment to building better products.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-amber-200/60" />
                <span className="text-xs tracking-wide text-white/45">
                  The standard behind my work
                </span>
              </div>

              <div className="mt-9 flex items-center gap-3">
                <span className="testimonial-status-dot" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-purple-100/60">
                  Quality over shortcuts
                </span>
              </div>
            </div>

            {/* Right principles */}
            <div className="flex flex-col gap-3">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="testimonial-principle-card group/card rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-purple-200/25 hover:bg-purple-300/[0.055] hover:shadow-[0_12px_40px_rgba(126,34,206,0.10)] sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="testimonial-principle-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-200/[0.14] bg-purple-300/[0.07] text-xl text-amber-100/90 transition-all duration-500 group-hover/card:rotate-6 group-hover/card:border-amber-200/30 group-hover/card:bg-amber-200/[0.08]">
                      {principle.icon}
                    </span>

                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-medium text-white/95 sm:text-base">
                          {principle.title}
                        </h3>

                        <span className="font-mono text-[10px] text-white/30 transition-colors group-hover/card:text-amber-100/70">
                          {principle.number}
                        </span>
                      </div>

                      <p className="text-xs leading-6 text-white/50 sm:text-sm">
                        {principle.description}
                      </p>
                    </div>
                  </div>

                  <div className="testimonial-card-line mt-5 h-px w-0 bg-gradient-to-r from-purple-300/70 via-amber-200/60 to-transparent transition-all duration-700 group-hover/card:w-full" />
                </article>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="relative mt-10 flex flex-col gap-4 border-t border-white/[0.09] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                "Clean Code",
                "Responsive Design",
                "Scalable Architecture",
              ].map((item) => (
                <span
                  key={item}
                  className="testimonial-skill-chip rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-[10px] text-white/55 transition-all duration-300 hover:border-amber-200/25 hover:bg-amber-100/[0.05] hover:text-amber-100/90"
                >
                  {item}
                </span>
              ))}
            </div>

            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber-100/75">
              <span className="testimonial-status-dot" />
              Honest by design
            </span>
          </div>
        </div>

        {/* Honest future-feedback note */}
        <p className="mt-6 text-center text-xs leading-6 text-white/35">
          Verified client testimonials will be featured here as they become
          available.
        </p>
      </div>

      <style jsx>{`
        .tangled-testimonials {
          isolation: isolate;
          --lantern-gold: rgba(255, 211, 128, 0.9);
        }

        .testimonial-nebula {
          position: absolute;
          width: min(55vw, 650px);
          aspect-ratio: 1;
          border-radius: 9999px;
          filter: blur(110px);
          pointer-events: none;
          will-change: transform;
        }

        .testimonial-nebula-one {
          left: -18%;
          top: 8%;
          background: rgba(115, 45, 180, 0.17);
          animation: testimonial-nebula-drift 19s ease-in-out infinite alternate;
        }

        .testimonial-nebula-two {
          right: -20%;
          top: 14%;
          background: rgba(175, 60, 160, 0.12);
          animation: testimonial-nebula-drift 24s ease-in-out infinite alternate-reverse;
        }

        .testimonial-nebula-three {
          left: 28%;
          bottom: -32%;
          background: rgba(201, 137, 48, 0.09);
          animation: testimonial-nebula-drift 21s ease-in-out infinite alternate;
        }

        .testimonial-orbit {
          position: absolute;
          border: 1px solid rgba(219, 190, 255, 0.055);
          border-radius: 50%;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .testimonial-orbit-one {
          width: 480px;
          height: 480px;
          top: -190px;
          right: -90px;
          transform: rotateX(64deg) rotateZ(-22deg);
          animation: testimonial-orbit-turn 36s linear infinite;
        }

        .testimonial-orbit-two {
          width: 360px;
          height: 360px;
          top: -130px;
          right: -30px;
          border-color: rgba(255, 211, 128, 0.07);
          transform: rotateX(62deg) rotateZ(28deg);
          animation: testimonial-orbit-turn 29s linear infinite reverse;
        }

        .testimonial-orbit-three {
          width: 220px;
          height: 220px;
          bottom: 3%;
          left: -110px;
          border-color: rgba(198, 157, 255, 0.07);
          transform: rotateX(65deg) rotateZ(-35deg);
          animation: testimonial-orbit-turn 32s linear infinite;
        }

        .testimonial-star-field {
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

        .testimonial-star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #fff2cf;
          box-shadow: 0 0 9px 2px rgba(255, 213, 142, 0.3);
          animation: testimonial-twinkle ease-in-out infinite;
        }

        .testimonial-firefly {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ffe7a5;
          box-shadow:
            0 0 7px 2px rgba(255, 208, 112, 0.55),
            0 0 20px 4px rgba(249, 168, 37, 0.14);
          animation: testimonial-firefly-float 7s ease-in-out infinite;
        }

        .testimonial-lantern-path {
          position: absolute;
          bottom: -70px;
          z-index: 0;
          animation: testimonial-lantern-rise linear infinite;
          will-change: transform;
        }

        .testimonial-lantern {
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
          animation: testimonial-lantern-sway 4s ease-in-out infinite;
        }

        .testimonial-lantern::before {
          content: "";
          position: absolute;
          top: -4px;
          left: 20%;
          width: 60%;
          height: 3px;
          border-radius: 2px;
          background: rgba(255, 220, 153, 0.65);
        }

        .testimonial-lantern::after {
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

        .testimonial-lantern-light {
          width: 42%;
          height: 58%;
          border-radius: 50%;
          background: #ffe4a1;
          box-shadow:
            0 0 7px 3px rgba(255, 205, 110, 0.65),
            0 0 18px 6px rgba(249, 168, 37, 0.28);
          animation: testimonial-lantern-glow 3s ease-in-out infinite;
        }

        .testimonial-mist {
          position: absolute;
          width: 70%;
          height: 180px;
          border-radius: 50%;
          filter: blur(65px);
          opacity: 0.12;
          pointer-events: none;
        }

        .testimonial-mist-one {
          bottom: -120px;
          left: -10%;
          background: #9d6bfa;
          animation: testimonial-mist-breathe 12s ease-in-out infinite alternate;
        }

        .testimonial-mist-two {
          right: -15%;
          bottom: -130px;
          background: #d9a84d;
          animation: testimonial-mist-breathe 15s ease-in-out infinite alternate-reverse;
        }

        .testimonial-horizon {
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

        .testimonial-gradient-text {
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
          animation: testimonial-gradient-shift 8s ease-in-out infinite alternate;
        }

        .testimonial-main-panel {
          box-shadow:
            0 25px 100px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);
          transition:
            border-color 500ms ease,
            box-shadow 500ms ease;
        }

        .testimonial-main-panel:hover {
          border-color: rgba(216, 180, 254, 0.23);
          box-shadow:
            0 30px 100px rgba(60, 24, 91, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .testimonial-panel-glow {
          background: rgba(168, 85, 247, 0.1);
          filter: blur(65px);
          animation: testimonial-glow-breathe 8s ease-in-out infinite alternate;
        }

        .testimonial-panel-shimmer {
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.018) 50%,
            transparent 80%
          );
          transform: translateX(-140%);
          transition: transform 1.4s ease;
        }

        .testimonial-main-panel:hover .testimonial-panel-shimmer {
          transform: translateX(360%);
        }

        .testimonial-quote-mark {
          box-shadow:
            0 0 35px rgba(255, 200, 106, 0.045),
            inset 0 0 20px rgba(255, 255, 255, 0.015);
          transition:
            transform 500ms ease,
            box-shadow 500ms ease;
        }

        .testimonial-main-panel:hover .testimonial-quote-mark {
          transform: translateY(-3px) rotate(-4deg);
          box-shadow: 0 0 35px rgba(255, 200, 106, 0.1);
        }

        .testimonial-principle-card {
          position: relative;
          overflow: hidden;
        }

        .testimonial-principle-icon {
          box-shadow: inset 0 0 15px rgba(196, 140, 255, 0.035);
        }

        .testimonial-status-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #f8d88f;
          box-shadow: 0 0 9px rgba(253, 230, 138, 0.7);
          animation: testimonial-status-pulse 2.5s ease-in-out infinite;
        }

        @keyframes testimonial-lantern-rise {
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

        @keyframes testimonial-lantern-sway {
          0%,
          100% {
            rotate: -5deg;
          }
          50% {
            rotate: 6deg;
          }
        }

        @keyframes testimonial-lantern-glow {
          0%,
          100% {
            opacity: 0.75;
            box-shadow:
              0 0 7px 3px rgba(255, 205, 110, 0.55),
              0 0 18px 6px rgba(249, 168, 37, 0.2);
          }
          50% {
            opacity: 1;
            box-shadow:
              0 0 9px 4px rgba(255, 220, 140, 0.8),
              0 0 24px 8px rgba(249, 168, 37, 0.32);
          }
        }

        @keyframes testimonial-firefly-float {
          0%,
          100% {
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

        @keyframes testimonial-twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes testimonial-nebula-drift {
          0% {
            translate: -2% 0;
            scale: 1;
          }
          100% {
            translate: 5% 7%;
            scale: 1.13;
          }
        }

        @keyframes testimonial-orbit-turn {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }

        @keyframes testimonial-mist-breathe {
          0% {
            transform: translate3d(-3%, 0, 0) scale(0.9);
            opacity: 0.07;
          }
          100% {
            transform: translate3d(8%, -15px, 0) scale(1.12);
            opacity: 0.16;
          }
        }

        @keyframes testimonial-gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 100% center;
          }
        }

        @keyframes testimonial-glow-breathe {
          0% {
            opacity: 0.55;
            scale: 0.9;
          }
          100% {
            opacity: 1;
            scale: 1.15;
          }
        }

        @keyframes testimonial-status-pulse {
          0%,
          100% {
            opacity: 0.65;
            box-shadow: 0 0 5px rgba(253, 230, 138, 0.35);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 12px rgba(253, 230, 138, 0.8);
          }
        }

        @media (max-width: 640px) {
          .testimonial-nebula {
            filter: blur(75px);
            opacity: 0.8;
          }

          .testimonial-orbit-one {
            right: -250px;
          }

          .testimonial-orbit-two {
            right: -180px;
          }

          .testimonial-lantern-path:nth-of-type(3n) {
            opacity: 0.45;
          }

          .testimonial-firefly {
            width: 3px;
            height: 3px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tangled-testimonials *,
          .tangled-testimonials *::before,
          .tangled-testimonials *::after {
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