
"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Printer,
  Sparkles,
  Terminal,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* =========================================================
   CV
========================================================= */

const CV_FILE = "/files/Faiza-Noor-CV.pdf";

/* =========================================================
   EDUCATION
========================================================= */

const education = [
  {
    year: "2025",
    title: "F.Sc. Pre-Medical",
    institution: "BISE Gujranwala",
    result: "completed",
    description:
      "Completed higher secondary education with a science-focused academic foundation.",
  },
  {
    year: "2024",
    title: "Matriculation",
    institution: "BISE Gujranwala",
    result: "completed",
    description:
      "Built a strong academic foundation with a focus on science, mathematics and problem-solving.",
  },
];

/* =========================================================
   EXPERIENCE
========================================================= */

const experience = [
  {
    number: "01",
    period: "2025 — PRESENT",
    role: "Full Stack Web Engineer",
    company: "Freelance / Independent",
    description:
      "Building modern, responsive and interactive web applications using React, Next.js, TypeScript and Node.js.",
    points: [
      "Developing responsive frontend interfaces with React and Next.js",
      "Creating reusable components and scalable UI structures",
      "Working with REST APIs, authentication and backend logic",
      "Building database-driven applications and CRUD functionality",
      "Optimizing applications for performance, responsiveness and usability",
    ],
  },
  {
    number: "02",
    period: "2025 — PRESENT",
    role: "AI-Assisted Web Development",
    company: "Independent Projects",
    description:
      "Using modern AI-assisted development workflows to accelerate product development while maintaining control over architecture, code quality and user experience.",
    points: [
      "Integrating AI capabilities into modern web applications",
      "Designing AI-powered product experiences and dashboards",
      "Using AI-assisted development tools for faster implementation",
      "Connecting frontend interfaces with APIs and application logic",
      "Building practical automation and productivity-focused features",
    ],
  },
  {
    number: "03",
    period: "~1 YEAR",
    role: "MS Office & Digital Productivity",
    company: "Freelance / Independent",
    description:
      "Creating professional documents, spreadsheets, presentations and structured digital solutions.",
    points: [
      "Microsoft Excel spreadsheets and data management",
      "Professional Microsoft Word documentation",
      "Business presentations using Microsoft PowerPoint",
      "Data entry, formatting and document organization",
      "Practical productivity-focused digital solutions",
    ],
  },
];

/* =========================================================
   CORE SKILLS
========================================================= */

const coreSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Authentication",
  "CRUD Systems",
  "Git & GitHub",
  "AI Integration",
  "Responsive Design",
  "Docker",
];

/* =========================================================
   STRENGTHS
========================================================= */

const strengths = [
  "Responsive Web Development",
  "Modern UI Implementation",
  "Full-Stack Application Development",
  "API Integration",
  "Database Development",
  "Authentication Systems",
  "Performance Optimization",
  "Problem Solving",
];

/* =========================================================
   PROJECTS
========================================================= */

const projects = [
  {
    title: "NexaFlow AI",
    type: "NEXT.JS / TYPESCRIPT / AI",
    description:
      "An AI-powered operations control center concept focused on workflows, automation, tasks, leads, analytics and intelligent productivity.",
    href: "https://nexaflow-ai-by-faiza.vercel.app/",
  },
  {
    title: "LUXORA",
    type: "NEXT.JS / AI / E-COMMERCE",
    description:
      "A premium AI-powered shopping experience combining modern product discovery, polished interfaces and interactive user experiences.",
    href: "https://luxora-zuq4.vercel.app/",
  },
  {
    title: "ShopSphere",
    type: "REACT / EXPRESS / MONGODB",
    description:
      "A full-stack e-commerce application with product browsing, routing, cart functionality, APIs and database-backed functionality.",
    href: "https://shopsphere-ecommerce-beta.vercel.app/",
  },
  {
    title: "Medicare",
    type: "REACT / RESPONSIVE UI",
    description:
      "A professional healthcare website concept with departments, doctors, services, appointments and responsive layouts.",
    href: "https://classy-vacherin-7a04fc.netlify.app/",
  },
];

/* =========================================================
   FOCUS AREAS
========================================================= */

const focusAreas = [
  {
    number: "01",
    title: "Frontend Engineering",
    text:
      "Building responsive, accessible and highly interactive interfaces with React, Next.js and TypeScript.",
  },
  {
    number: "02",
    title: "Backend Engineering",
    text:
      "Building APIs, authentication systems, database logic and backend functionality with Node.js and Express.",
  },
  {
    number: "03",
    title: "Full Stack Systems",
    text:
      "Connecting polished frontend experiences with APIs, databases, authentication and scalable application structures.",
  },
  {
    number: "04",
    title: "AI & Automation",
    text:
      "Creating practical AI-powered features, intelligent workflows and modern productivity-focused experiences.",
  },
];

/* =========================================================
   ADDITIONAL
========================================================= */

const additional = [
  {
    title: "AI Integration",
    description:
      "Exploring practical AI integrations and intelligent product experiences.",
  },
  {
    title: "MS Office",
    description:
      "Microsoft Word, Excel, PowerPoint, documentation and digital productivity.",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    if (!showCV) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowCV(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showCV]);

  const printCV = () => {
    const printWindow = window.open(CV_FILE, "_blank");

    if (printWindow) {
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
      }, 800);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05050a] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-[5%] top-[5%] h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute right-[5%] top-[25%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[30%] h-[350px] w-[350px] rounded-full bg-violet-500/8 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="relative z-30 border-b border-white/8 bg-[#05050a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
              Available for selected projects
            </span>
          </div>

          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-white/30 sm:block">
            FAIZA NOOR / PROFILE
          </span>

          <button
            type="button"
            onClick={() => setShowCV(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition-all hover:border-purple-300/30 hover:text-white"
          >
            <Download size={14} />
            CV
          </button>
        </div>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10 px-6 pb-24 pt-28 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-white/40" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
              01 / Professional Profile
            </span>
          </div>

          <div className="grid items-end gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-6 text-sm uppercase tracking-[0.25em] text-purple-300/70">
                Full Stack Web Engineer
              </p>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-[7.3rem]">
                FAIZA
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-transparent">
                  NOOR.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
                I build modern digital products that combine clean engineering,
                thoughtful interfaces and interactive experiences.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowCV(true)}
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-purple-400/40 bg-purple-700 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-[1.02] hover:border-pink-300/60 hover:bg-purple-600"
                >
                  <ArrowDownToLine size={17} />
                  Download CV
                </button>

                <Link
                  href="/contact"
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-white/10 px-7 text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition-all hover:border-purple-300/30 hover:text-white"
                >
                  Hire Me
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-8 backdrop-blur-xl sm:p-10">
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-600/15 blur-[80px]" />

              <div className="relative">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white/60">
                  <UserRound size={30} strokeWidth={1.3} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  Full Stack / Creative Engineering
                </span>

                <h2 className="mt-5 text-4xl font-medium leading-none tracking-[-0.04em]">
                  DIGITAL
                  <br />
                  BUILDER
                </h2>

                <div className="my-8 h-px bg-white/10" />

                <div className="space-y-5 text-[10px] uppercase tracking-[0.2em]">
                  <div className="flex justify-between gap-5">
                    <span className="text-white/30">Location</span>
                    <span className="text-white/60">Pakistan</span>
                  </div>

                  <div className="flex justify-between gap-5">
                    <span className="text-white/30">Focus</span>
                    <span className="text-white/60">Web Engineering</span>
                  </div>

                  <div className="flex justify-between gap-5">
                    <span className="text-white/30">Mode</span>
                    <span className="text-white/60">Remote / Freelance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK STATS */}

          <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "FULL STACK", "Frontend + Backend"],
              ["02", "MODERN STACK", "React / Next.js / Node"],
              ["03", "AI READY", "AI + Automation"],
              ["04", "CLIENT READY", "Remote / Freelance"],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="bg-[#08080f] p-7 transition-colors hover:bg-[#0d0c17]"
              >
                <span className="text-[10px] tracking-[0.2em] text-white/25">
                  {number}
                </span>

                <strong className="mt-7 block text-sm tracking-wide">
                  {title}
                </strong>

                <p className="mt-2 text-xs text-white/35">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          IDENTITY
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
              02 — Identity
            </span>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Engineering with
              <br />
              <span className="text-white/35">intention.</span>
            </h2>
          </div>

          <div className="max-w-3xl space-y-7 text-base leading-8 text-white/50 sm:text-lg">
            <p>
              I&apos;m Faiza Noor, a Full Stack Web Engineer focused on turning
              ideas into polished, production-ready web experiences.
            </p>

            <p>
              My work combines frontend engineering, backend architecture,
              responsive design, APIs, databases and interaction design. I
              care about both the details users notice and the engineering
              details that make an application reliable.
            </p>

            <p>
              My goal is to create websites and applications that are
              visually memorable, technically strong and genuinely useful.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.6fr]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
                03 — Experience
              </span>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Building
                <br />
                <span className="text-white/35">real systems.</span>
              </h2>
            </div>

            <p className="self-end text-sm leading-7 text-white/40">
              Practical experience across full-stack development, AI-assisted
              workflows, digital productivity and independent projects.
            </p>
          </div>

          <div className="space-y-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
            {experience.map((item) => (
              <article
                key={item.number}
                className="group grid gap-8 bg-[#08080f] p-7 transition-colors hover:bg-[#0d0c17] sm:p-10 lg:grid-cols-[80px_1fr]"
              >
                <div className="text-xs tracking-[0.2em] text-white/25">
                  {item.number}
                </div>

                <div>
                  <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-white/30 sm:flex-row sm:justify-between">
                    <span>{item.period}</span>
                    <span>{item.company}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                    {item.role}
                  </h3>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/40">
                    {item.description}
                  </p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-6 text-white/45"
                      >
                        <Check
                          size={15}
                          className="mt-1 shrink-0 text-purple-300/70"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <section
        id="education"
        className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
              04 — Education
            </span>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Academic
              <br />
              <span className="text-white/35">foundation.</span>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {education.map((item) => (
              <article
                key={item.title}
                className="group relative bg-[#08080f] p-8 transition-colors hover:bg-[#0d0c17] sm:p-10"
              >
                <div className="absolute right-8 top-8 text-[10px] uppercase tracking-[0.25em] text-white/25">
                  {item.year}
                </div>

                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all group-hover:border-purple-300/40 group-hover:text-purple-200">
                  <GraduationCap size={21} />
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300/60">
                  {item.institution}
                </p>

                <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                  {item.title}
                </h3>

                <div className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {item.result}
                </div>

                <p className="mt-6 max-w-lg text-sm leading-7 text-white/40">
                  {item.description}
                </p>

                <div className="mt-9 h-px w-full bg-white/8">
                  <div className="h-px w-0 bg-purple-300/60 transition-all duration-700 group-hover:w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          JOURNEY
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
                05 — Journey
              </span>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                From curiosity
                <br />
                <span className="text-white/35">to engineering.</span>
              </h2>
            </div>

            <div className="border-l border-white/10 pl-7 sm:pl-10">
              {[
                [
                  "Foundation",
                  "Learning how things work",
                  "My journey started with curiosity for technology and problem-solving. I began with web development fundamentals and gradually moved toward modern application architecture.",
                ],
                [
                  "Engineering",
                  "Building real applications",
                  "I expanded into React, Next.js, TypeScript, Node.js, databases, APIs and authentication — moving from individual interfaces toward complete full-stack systems.",
                ],
                [
                  "Now",
                  "Creating intelligent digital experiences",
                  "Today I focus on combining engineering, visual design and AI-powered functionality to create applications that are fast, scalable, interactive and useful.",
                ],
              ].map(([label, title, text], index) => (
                <div
                  key={label}
                  className={`relative ${
                    index !== 2 ? "pb-14" : ""
                  }`}
                >
                  <span
                    className={`absolute -left-[34px] top-1 h-2 w-2 rounded-full ${
                      index === 0
                        ? "bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,0.7)]"
                        : "border border-purple-300/60 bg-[#05050a]"
                    } sm:-left-[45px]`}
                  />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                    {label}
                  </span>

                  <h3 className="mt-3 text-2xl font-medium">{title}</h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL SKILLS
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.6fr]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
                06 — Technical Expertise
              </span>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                The tools behind
                <br />
                <span className="text-white/35">the experience.</span>
              </h2>
            </div>

            <p className="self-end text-sm leading-7 text-white/40">
              A modern stack for building responsive, scalable and
              production-oriented web applications.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {coreSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-xs tracking-wide text-white/55 transition-all duration-300 hover:border-purple-300/30 hover:bg-purple-500/5 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {focusAreas.map((area) => (
              <article
                key={area.number}
                className="group bg-[#08080f] p-8 transition-colors hover:bg-[#0c0b15]"
              >
                <span className="text-[10px] tracking-[0.25em] text-white/25">
                  {area.number}
                </span>

                <h3 className="mt-16 text-xl font-medium tracking-[-0.03em]">
                  {area.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/40">
                  {area.text}
                </p>

                <div className="mt-9 h-px w-full bg-white/8">
                  <div className="h-px w-0 bg-purple-300/60 transition-all duration-700 group-hover:w-1/2" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

   
   

      {/* =====================================================
          STRENGTHS
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
                08 — Strengths
              </span>

              <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                How I
                <br />
                <span className="text-white/35">work.</span>
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {strengths.map((strength, index) => (
                <div
                  key={strength}
                  className="flex items-center gap-4 bg-[#08080f] p-6 transition-colors hover:bg-[#0d0c17]"
                >
                  <span className="text-[10px] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1 text-sm text-white/55">
                    {strength}
                  </span>

                  <Check size={14} className="text-purple-300/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ADDITIONAL
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/70">
              09 — Additional
            </span>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Knowledge &
              <br />
              <span className="text-white/35">capabilities.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {additional.map((item, index) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 transition-colors hover:border-purple-300/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <Sparkles
                    size={19}
                    className="text-purple-300/60"
                  />

                  <span className="text-[10px] text-white/25">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-14 text-2xl font-medium">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/40">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO
      ===================================================== */}

      <section className="relative z-10 border-t border-white/8 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <Mail size={19} className="text-purple-300/70" />

            <span className="mt-6 block text-[10px] uppercase tracking-[0.2em] text-white/30">
              Email
            </span>

            <a
              href="mailto:fizzanoor051@gmail.com"
              className="mt-2 block text-sm text-white/60 hover:text-white"
            >
              fizzanoor051@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <MapPin size={19} className="text-purple-300/70" />

            <span className="mt-6 block text-[10px] uppercase tracking-[0.2em] text-white/30">
              Location
            </span>

            <span className="mt-2 block text-sm text-white/60">
              Pakistan
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <BriefcaseBusiness
              size={19}
              className="text-purple-300/70"
            />

            <span className="mt-6 block text-[10px] uppercase tracking-[0.2em] text-white/30">
              Availability
            </span>

            <span className="mt-2 block text-sm text-white/60">
              Remote / Freelance / Contract
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative z-10 px-6 py-28 sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-purple-300/70">
            Let&apos;s build something exceptional
          </span>

          <h2 className="mt-7 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            HAVE AN IDEA?
            <br />
            <span className="text-white/30">
              LET&apos;S ENGINEER IT.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
            Explore my work or get in touch if you have a project that needs
            thoughtful design and serious engineering.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="group relative inline-flex min-h-[56px] w-full items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-7 text-[14px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.025] hover:border-pink-300/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] sm:w-fit sm:min-w-[200px]"
            >
              <span className="absolute inset-x-0 bottom-0 h-full translate-y-full bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-700 group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center">
                <span>Explore Projects</span>

                <span className="ml-3 transition-all duration-500 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-white/10 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white/65 transition-all duration-300 hover:border-purple-300/30 hover:text-white"
            >
              Start a Conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-[10px] uppercase tracking-[0.2em] text-white/25 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <span>FAIZA NOOR © 2026</span>
          <span>FULL STACK WEB ENGINEER</span>
          <span>BUILT WITH INTENT.</span>
        </div>
      </footer>

      {/* =====================================================
          CV MODAL
      ===================================================== */}

      {showCV && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCV(false);
            }
          }}
        >
          <div className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#09090f] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                  FAIZA NOOR / DOCUMENT
                </span>

                <h2 className="mt-1 text-lg font-medium">
                  CURRICULUM VITAE
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowCV(false)}
                className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/50 transition hover:border-white/20 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-black">
              <iframe
                src={`${CV_FILE}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Faiza Noor CV"
                className="h-full w-full"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Professional CV / Faiza Noor
              </span>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={printCV}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/50 hover:text-white"
                >
                  <Printer size={14} />
                  Print
                </button>

                <a
                  href={CV_FILE}
                  download="Faiza-Noor-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-purple-200"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
