
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  Code2,
  GraduationCap,
  GitBranch,
  MapPin,
  X,
  Cloud,
  Monitor,
} from "lucide-react";

const CV_FILE = "/files/Faiza-Noor-CV.pdf";

const FULL_NAME = "Faiza Noor M. Shabbir Hussain";

const technologies = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Git & GitHub",
  "AI API Integration",
];

export default function AboutClient() {
  const [cvOpen, setCvOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!cvOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCvOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [cvOpen]);

  return (
    <main
      className="tangled-page min-h-screen overflow-hidden text-white"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content={FULL_NAME} />
      <meta itemProp="jobTitle" content="Full-Stack Web Engineer" />
      <meta
        itemProp="url"
        content="https://faiza-noor10.vercel.app/about"
      />
      <meta
        itemProp="description"
        content="Faiza Noor M. Shabbir Hussain is a female Full-Stack Web Engineer based in Sialkot District, Punjab, Pakistan, focused on modern web applications, React, Next.js, TypeScript, Node.js, databases, and AI-powered digital experiences."
      />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .tangled-page,
        .tangled-page * {
          box-sizing: border-box;
        }

        .tangled-page {
          --purple: #a78bfa;
          --lavender: #e9ddff;
          --gold: #ffd58a;
          --gold-light: #fff0c7;
          background: #171027;
          color: #fff;
        }

        .tangled-container {
          width: 100%;
          max-width: 1160px;
          margin-inline: auto;
          padding-inline: 24px;
        }

        .tangled-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background:
            radial-gradient(
              ellipse at 75% 28%,
              rgba(155, 112, 217, 0.2),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #211638 0%,
              #171027 58%,
              #211437 100%
            );
        }

        .tangled-hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: -20%;
          left: -45%;
          width: 48%;
          height: 150%;
          pointer-events: none;
          opacity: 0.5;
          filter: blur(55px);
          transform: rotate(20deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 207, 126, 0.13),
            rgba(255, 225, 169, 0.2),
            transparent
          );
          animation: golden-light-travel 12s ease-in-out infinite;
        }

        .tangled-hero::after {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at 15% 15%,
            rgba(203, 177, 255, 0.08),
            transparent 30%
          );
        }

        @keyframes golden-light-travel {
          0% {
            left: -45%;
            opacity: 0.12;
          }
          35% {
            opacity: 0.6;
          }
          75% {
            opacity: 0.3;
          }
          100% {
            left: 115%;
            opacity: 0.08;
          }
        }

        .tangled-title {
          background: linear-gradient(
            115deg,
            #ffffff 8%,
            #eadcff 43%,
            #ffd995 82%,
            #fff0c7 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .tangled-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #d9c5ff;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }

        .tangled-label::before {
          content: "";
          width: 22px;
          height: 1px;
          background: var(--gold);
        }

        .tangled-heading {
          color: #fff;
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 750;
          letter-spacing: -0.045em;
          line-height: 1.17;
        }

        .tangled-copy {
          color: rgba(244, 237, 255, 0.77);
          font-size: 15px;
          line-height: 1.9;
        }

        .tangled-card {
          position: relative;
          border: 1px solid rgba(224, 207, 255, 0.15);
          border-radius: 19px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.075),
            rgba(255, 255, 255, 0.025)
          );
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
          transition:
            border-color 220ms ease,
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .tangled-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 213, 138, 0.4);
          box-shadow: 0 16px 38px rgba(7, 4, 19, 0.2);
        }

        .tangled-icon {
          display: flex;
          height: 54px;
          width: 54px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 213, 138, 0.22);
          border-radius: 15px;
          background: rgba(255, 213, 138, 0.08);
          color: var(--gold);
        }

        .tangled-button {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid rgba(255, 224, 164, 0.8);
          border-radius: 11px;
          padding: 11px 17px;
          background: linear-gradient(110deg, #ffe6b1, #edbd76);
          color: #291a37;
          font-size: 13px;
          font-weight: 750;
          text-decoration: none;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .tangled-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(237, 189, 118, 0.2);
        }

        .tangled-button-secondary {
          border-color: rgba(231, 216, 255, 0.27);
          background: rgba(255, 255, 255, 0.04);
          color: #f7f0ff;
        }

        .tangled-button-secondary:hover {
          border-color: rgba(255, 213, 138, 0.55);
          background: rgba(255, 255, 255, 0.09);
          box-shadow: none;
        }

        .tangled-link {
          color: #f5d9a1;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .tangled-link:hover {
          color: white;
        }

        .tangled-section {
          padding-block: 76px;
          scroll-margin-top: 90px;
        }

        .tangled-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(221, 195, 255, 0.25),
            rgba(255, 213, 138, 0.25),
            transparent
          );
        }

        .tangled-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(226, 208, 255, 0.15);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.035);
          padding: 10px 13px;
          color: #f0e8ff;
          font-size: 13px;
          transition:
            border-color 180ms ease,
            background 180ms ease;
        }

        .tangled-chip:hover {
          border-color: rgba(255, 213, 138, 0.4);
          background: rgba(255, 213, 138, 0.06);
        }

        @media (max-width: 640px) {
          .tangled-container {
            padding-inline: 20px;
          }

          .tangled-section {
            padding-block: 54px;
          }

          .tangled-hero::before {
            width: 75%;
            filter: blur(45px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .tangled-page *,
          .tangled-page *::before,
          .tangled-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="tangled-hero">
        <div className="tangled-container grid min-h-[690px] items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:pb-20">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/20 bg-white/[0.04] px-4 py-2 text-xs text-purple-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Continuously learning and building
            </div>

            <p className="tangled-label mb-5">About Me</p>

            <h1 className="tangled-title text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Faiza Noor
              <span className="mt-3 block text-2xl font-medium text-purple-100 sm:text-3xl">
                M. Shabbir Hussain
              </span>
            </h1>

            <h2 className="mt-7 max-w-2xl text-xl font-semibold leading-relaxed text-white sm:text-2xl">
              Female Full-Stack Web Engineer{" "}
              <span className="text-amber-200">
                building thoughtful digital experiences.
              </span>
            </h2>

            <p className="tangled-copy mt-5 max-w-2xl">
              I&apos;m Faiza Noor M. Shabbir Hussain, a Full-Stack Web Engineer
              from Sialkot District, Punjab, Pakistan. I build modern web
              applications using React, Next.js, TypeScript, Node.js,
              databases, and AI integration. I&apos;m committed to continuous
              learning, practical problem-solving, and creating useful digital
              experiences.
            </p>

            <p className="tangled-copy mt-4 max-w-2xl">
              Faiza Noor M. Shabbir Hussain is a female Full-Stack Web Engineer
              based in Sialkot District, Punjab, Pakistan. Her professional
              interests include frontend and backend engineering, modern web
              technologies, database integration, and AI-powered applications.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-purple-100/75">
              My long-term goal is to earn recognition among the youngest
              female Full-Stack Web Engineers in Sialkot District through
              continuous learning, practical projects, technical growth, and
              meaningful contributions to web engineering.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="tangled-button"
                type="button"
                onClick={() => setCvOpen(true)}
              >
                <ArrowDownToLine size={16} />
                View My CV
              </button>

              <Link
                className="tangled-button tangled-button-secondary"
                href="/projects"
              >
                Explore My Work <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-purple-100/70">
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-amber-200" />
                Sialkot District, Pakistan
              </span>

              <a
                className="tangled-link inline-flex items-center gap-2"
                href="https://github.com/fizzanoor051-arch"
                target="_blank"
                rel="noreferrer"
                itemProp="sameAs"
              >
                <GitBranch size={14} />
                GitHub Profile <ArrowUpRight size={12} />
              </a>

              <a
                className="tangled-link inline-flex items-center gap-2"
                href="https://www.linkedin.com/in/faiza-noor-b2711b42b/"
                target="_blank"
                rel="noreferrer"
                itemProp="sameAs"
              >
                LinkedIn Profile <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="tangled-section scroll-mt-24">
        <div className="tangled-container grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="tangled-label">My Journey</p>

            <h2 className="tangled-heading mt-5">
              Curious by nature.
              <span className="mt-2 block text-purple-300">
                Committed to growth.
              </span>
            </h2>
          </div>

          <div>
            <div className="tangled-copy space-y-5">
              <p>
                I&apos;m Faiza Noor M. Shabbir Hussain, a Full-Stack Web
                Engineer based in Sialkot District, Punjab, Pakistan. I enjoy
                developing responsive web experiences and learning how
                frontend interfaces, server-side logic, APIs, and databases
                work together.
              </p>

              <p>
                My technical interests include React, Next.js, TypeScript,
                Node.js, REST APIs, database integration, and AI-powered
                features. I improve my skills through self-learning,
                experimentation, and practical development.
              </p>

              <p>
                I aspire to build a strong professional reputation as a female
                web engineer from District Sialkot. My focus is on improving
                my engineering abilities, delivering quality work, and
                continuing to grow with every project.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <article className="tangled-card p-5">
                <BookOpen size={22} className="text-amber-200" />

                <h3 className="mt-4 font-semibold text-white">
                  Continuous Learning
                </h3>

                <p className="mt-2 text-sm leading-6 text-purple-100/65">
                  Strengthening fundamentals and exploring technologies
                  through hands-on practice.
                </p>
              </article>

              <article className="tangled-card p-5">
                <Code2 size={22} className="text-purple-300" />

                <h3 className="mt-4 font-semibold text-white">
                  Full-Stack Development
                </h3>

                <p className="mt-2 text-sm leading-6 text-purple-100/65">
                  Bringing frontend, backend, APIs, and data together in
                  practical applications.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="tangled-section scroll-mt-24">
        <div className="tangled-container">
          <div className="max-w-2xl">
            <p className="tangled-label">Education</p>

            <h2 className="tangled-heading mt-5">
              My academic foundation.
            </h2>

            <p className="tangled-copy mt-4">
              My academic background includes science studies, analytical
              learning, and a continuing interest in technology. I combine
              that foundation with self-directed learning in web engineering.
            </p>
          </div>

          <article className="tangled-card mt-8 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="tangled-icon">
                <GraduationCap size={30} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-200">
                  Intermediate Education
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  F.Sc. Pre-Medical
                </h3>

                <p className="mt-2 text-base font-semibold text-purple-100">
                  Punjab Group of Colleges, Pasrur
                </p>

                <p className="mt-1 text-sm text-purple-100/55">
                  Pasrur, Punjab, Pakistan
                </p>

                <div className="tangled-divider my-5" />

                <p className="tangled-copy">
                  Studied Biology, Chemistry, and Physics through the
                  Pre-Medical stream. This academic background helped develop
                  my scientific understanding, analytical thinking, and
                  structured approach to learning. I continue to build on
                  these foundations while pursuing web engineering.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Professional Development */}
      <section
        id="training"
        className="tangled-section scroll-mt-24 border-y border-white/10 bg-white/[0.025]"
      >
        <div className="tangled-container">
          <div className="max-w-2xl">
            <p className="tangled-label">Professional Development</p>

            <h2 className="tangled-heading mt-5">
              Training, practice &amp; continuous learning.
            </h2>

            <p className="tangled-copy mt-4">
              Alongside formal education, I am developing practical skills
              through technical training, independent study, and preparation
              for further professional certifications.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="tangled-card p-6 sm:p-7">
              <div className="tangled-icon">
                <Monitor size={27} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-amber-200">
                2026
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                MS Office Training
              </h3>

              <p className="mt-2 font-medium text-purple-100">
                IT Center, Narowal
              </p>

              <p className="mt-3 text-sm leading-7 text-purple-100/70">
                Developing practical productivity skills with Microsoft
                Office tools, including Word document formatting, Excel
                spreadsheets and data organization, and PowerPoint
                presentations.
              </p>
            </article>

            <article className="tangled-card p-6 sm:p-7">
              <div className="tangled-icon">
                <Code2 size={27} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-amber-200">
                Web Development
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                Full-Stack Web Development
              </h3>

              <p className="mt-2 font-medium text-purple-100">
                NAVTTC, self-learning &amp; W3Schools
              </p>

              <p className="mt-3 text-sm leading-7 text-purple-100/70">
                Building knowledge of frontend and backend development,
                JavaScript, React, Next.js, APIs, databases, and modern web
                application workflows through training resources and
                practical projects.
              </p>

              <a
                href="https://www.w3schools.com/"
                target="_blank"
                rel="noreferrer"
                className="tangled-link mt-4 inline-flex items-center gap-2 text-sm"
              >
                W3Schools learning resources <ArrowUpRight size={14} />
              </a>
            </article>

            <article className="tangled-card p-6 sm:p-7 md:col-span-2">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="tangled-icon">
                  <Cloud size={27} />
                </div>

                <div className="flex-1">
                  <span className="inline-flex rounded-full border border-amber-200/25 bg-amber-100/[0.07] px-3 py-1 text-xs font-semibold text-amber-200">
                    Currently Preparing
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-white">
                    Microsoft Azure Certification Preparation
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-purple-100/70">
                    Currently preparing for a Microsoft Azure exam to expand
                    my understanding of cloud computing and Microsoft Azure
                    services. This is an ongoing learning goal; certification
                    has not been claimed as completed.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CV Preview */}
      {cvOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080512]/85 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCvOpen(false);
          }}
        >
          <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-purple-100/20 bg-[#171027] shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <h2
                  id="cv-modal-title"
                  className="text-sm font-semibold text-white"
                >
                  {FULL_NAME} — CV
                </h2>

                <p className="mt-1 text-xs text-purple-100/60">
                  Curriculum Vitae
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={CV_FILE}
                  download
                  className="tangled-button tangled-button-secondary !min-h-9 !px-3 !py-2"
                >
                  <ArrowDownToLine size={14} />
                  <span className="hidden sm:inline">Download CV</span>
                </a>

                <button
                  type="button"
                  onClick={() => setCvOpen(false)}
                  aria-label="Close CV preview"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/80 transition hover:bg-white/10"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-white">
              <iframe
                title={`${FULL_NAME} CV preview`}
                src={CV_FILE}
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
