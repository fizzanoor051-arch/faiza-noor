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
  Sparkles,
  Terminal,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import "./resume.css";

const experience = [
  {
    number: "01",
    period: "2025 — PRESENT",
    role: "Full Stack Web Developer",
    company: "Freelance / Independent",
    description:
      "Building modern, responsive and interactive web experiences using React, Next.js, TypeScript and Node.js.",
    points: [
      "Developing responsive frontend interfaces with React and Next.js",
      "Creating reusable components and scalable UI structures",
      "Working with REST APIs, authentication and backend logic",
      "Building database-driven applications and CRUD functionality",
      "Optimizing websites for performance, responsiveness and usability",
    ],
  },
  {
    number: "02",
    period: "2023 — PRESENT",
    role: "MS Office & Digital Productivity",
    company: "Freelance / Independent",
    description:
      "Creating professional business documents, spreadsheets, presentations and structured digital data solutions.",
    points: [
      "Advanced Microsoft Excel spreadsheets and data management",
      "Professional Microsoft Word documentation",
      "Business presentations using Microsoft PowerPoint",
      "Data entry, formatting and document organization",
      "Creating practical productivity-focused digital solutions",
    ],
  },
];

const education = [
  {
    year: "2024 — 2025",
    title: "F.Sc. Pre-Medical",
    institute: "BISE Gujranwala",
    result: "Approx. 88%",
  },
  {
    year: "2023 — 2024",
    title: "Matriculation",
    institute: "BISE Gujranwala",
    result: "92%",
  },
];

const coreSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Tailwind CSS",
  "Git & GitHub",
  "AI Integration",
];

const strengths = [
  "Responsive Web Development",
  "Modern UI Implementation",
  "Full-Stack Application Development",
  "API Integration",
  "Database Development",
  "Performance Optimization",
  "Problem Solving",
  "Professional Documentation",
];

const projects = [
  {
    title: "Cinematic Portfolio",
    type: "NEXT.JS / TYPESCRIPT",
    description:
      "A premium cinematic portfolio experience focused on interaction, motion, storytelling and modern web engineering.",
  },
  {
    title: "ShopSphere",
    type: "REACT / VITE",
    description:
      "A modern e-commerce interface with product browsing, routing, cart functionality and reusable React components.",
  },
  {
    title: "Modern Hospital",
    type: "REACT / UI",
    description:
      "A professional healthcare website concept with departments, doctors, services, appointments and responsive layouts.",
  },
];

const certifications = [
  {
    title: "Web Development",
    description:
      "Practical development experience across frontend and full-stack technologies.",
  },
  {
    title: "MS Office & Digital Productivity",
    description:
      "Practical experience with Word, Excel, PowerPoint, data entry and documentation.",
  },
];

export default function ResumePage() {
  const downloadResume = () => {
    window.print();
  };

  return (
    <main className="resume-page">
      {/* BACKGROUND */}
      <div className="resume-noise" />
      <div className="resume-grid" />
      <div className="resume-orb resume-orb-one" />
      <div className="resume-orb resume-orb-two" />

      {/* TOP BAR */}
      <div className="resume-topbar">
        <div className="resume-topbar-inner">
          <span className="resume-status">
            <span className="resume-status-dot" />
            AVAILABLE FOR PROJECTS
          </span>

          <span className="resume-top-label">FAIZA NOOR / RESUME</span>

          <button
            type="button"
            className="resume-print-button"
            onClick={downloadResume}
          >
            <Download size={15} />
            DOWNLOAD / PRINT
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="resume-hero">
        <div className="resume-container">
          <div className="resume-hero-grid">
            <div className="resume-hero-copy">
              <div className="resume-eyebrow">
                <span>01</span>
                PROFESSIONAL PROFILE
              </div>

              <h1>
                FAIZA
                <span>NOOR.</span>
              </h1>

              <div className="resume-role">
                <Terminal size={18} />
                FULL STACK WEB ENGINEER
              </div>

              <p className="resume-hero-description">
                I build modern digital experiences that combine clean
                engineering, thoughtful interfaces and cinematic interaction.
                My focus is on creating responsive, scalable and professional
                web applications that are built to make an impression.
              </p>

              <div className="resume-hero-actions">
                <button
                  type="button"
                  className="resume-primary-button"
                  onClick={downloadResume}
                >
                  <ArrowDownToLine size={17} />
                  DOWNLOAD CV
                </button>

                <Link href="/contact" className="resume-secondary-button">
                  HIRE ME
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>

            <div className="resume-profile-card">
              <div className="resume-card-glow" />

              <div className="resume-profile-icon">
                <UserRound size={38} strokeWidth={1.4} />
              </div>

              <span className="resume-profile-small">
                FULL STACK / CREATIVE ENGINEERING
              </span>

              <h2>
                DIGITAL
                <br />
                BUILDER
              </h2>

              <div className="resume-profile-line" />

              <div className="resume-profile-meta">
                <div>
                  <span>LOCATION</span>
                  <strong>PAKISTAN</strong>
                </div>

                <div>
                  <span>FOCUS</span>
                  <strong>WEB ENGINEERING</strong>
                </div>

                <div>
                  <span>MODE</span>
                  <strong>REMOTE / FREELANCE</strong>
                </div>
              </div>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="resume-stats">
            <div className="resume-stat">
              <span>01</span>
              <strong>FULL STACK</strong>
              <p>Frontend + Backend</p>
            </div>

            <div className="resume-stat">
              <span>02</span>
              <strong>MODERN STACK</strong>
              <p>React / Next.js / Node</p>
            </div>

            <div className="resume-stat">
              <span>03</span>
              <strong>UI FOCUSED</strong>
              <p>Responsive & Interactive</p>
            </div>

            <div className="resume-stat">
              <span>04</span>
              <strong>CLIENT READY</strong>
              <p>Freelance / Remote</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="resume-section resume-about">
        <div className="resume-container">
          <div className="resume-section-heading">
            <div className="resume-eyebrow">
              <span>02</span>
              ABOUT ME
            </div>

            <h2>
              ENGINEERING
              <br />
              WITH <em>INTENTION.</em>
            </h2>
          </div>

          <div className="resume-about-grid">
            <div className="resume-about-number">FN</div>

            <div className="resume-about-content">
              <p className="resume-large-text">
                I am a passionate web developer focused on turning ideas into
                polished digital products.
              </p>

              <p>
                My work combines modern frontend development, backend
                engineering, responsive design and interactive experiences. I
                enjoy solving complex problems while keeping the final
                experience simple, elegant and intuitive for the user.
              </p>

              <p>
                I continuously improve my technical skills and explore better
                ways to build reliable, scalable and visually impressive web
                applications.
              </p>

              <div className="resume-about-tags">
                <span>BUILD</span>
                <span>DESIGN</span>
                <span>ENGINEER</span>
                <span>OPTIMIZE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="resume-section">
        <div className="resume-container">
          <div className="resume-section-heading split-heading">
            <div>
              <div className="resume-eyebrow">
                <span>03</span>
                EXPERIENCE
              </div>

              <h2>
                WORK
                <br />
                <em>EXPERIENCE.</em>
              </h2>
            </div>

            <p>
              Practical experience across web development, digital
              productivity and freelance-oriented projects.
            </p>
          </div>

          <div className="resume-timeline">
            {experience.map((item) => (
              <article className="resume-experience" key={item.number}>
                <div className="resume-experience-number">
                  {item.number}
                </div>

                <div className="resume-experience-main">
                  <div className="resume-experience-top">
                    <span>{item.period}</span>
                    <span>{item.company}</span>
                  </div>

                  <h3>{item.role}</h3>

                  <p className="resume-experience-description">
                    {item.description}
                  </p>

                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>
                        <Check size={15} />
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

      {/* EDUCATION */}
      <section className="resume-section resume-dark-section">
        <div className="resume-container">
          <div className="resume-section-heading">
            <div className="resume-eyebrow">
              <span>04</span>
              EDUCATION
            </div>

            <h2>
              ACADEMIC
              <br />
              <em>BACKGROUND.</em>
            </h2>
          </div>

          <div className="resume-education-grid">
            {education.map((item) => (
              <article className="resume-education-card" key={item.title}>
                <div className="resume-education-icon">
                  <GraduationCap size={23} />
                </div>

                <span>{item.year}</span>

                <h3>{item.title}</h3>

                <p>{item.institute}</p>

                <strong>{item.result}</strong>

                <ChevronRight className="resume-arrow" size={19} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="resume-section">
        <div className="resume-container">
          <div className="resume-section-heading split-heading">
            <div>
              <div className="resume-eyebrow">
                <span>05</span>
                TECHNICAL SKILLS
              </div>

              <h2>
                THE
                <br />
                <em>STACK.</em>
              </h2>
            </div>

            <p>
              A modern technology stack for creating responsive, scalable and
              production-ready web experiences.
            </p>
          </div>

          <div className="resume-skills-layout">
            <div className="resume-skill-feature">
              <Code2 size={32} strokeWidth={1.4} />

              <span>PRIMARY STACK</span>

              <h3>
                MODERN
                <br />
                WEB
                <br />
                ENGINEERING
              </h3>

              <div className="resume-skill-feature-line" />
              <p>
                React-driven interfaces, Next.js applications, TypeScript,
                backend APIs and database-powered systems.
              </p>
            </div>

            <div className="resume-skill-list">
              {coreSkills.map((skill, index) => (
                <div className="resume-skill-item" key={skill}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{skill}</strong>
                  <ArrowUpRight size={15} />
                </div>
              ))}
            </div>
          </div>

          <div className="resume-strengths">
            {strengths.map((strength) => (
              <div className="resume-strength" key={strength}>
                <Check size={14} />
                {strength}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="resume-section resume-project-section">
        <div className="resume-container">
          <div className="resume-section-heading">
            <div className="resume-eyebrow">
              <span>06</span>
              SELECTED WORK
            </div>

            <h2>
              BUILT
              <br />
              <em>IN PRACTICE.</em>
            </h2>
          </div>

          <div className="resume-projects">
            {projects.map((project, index) => (
              <article className="resume-project-card" key={project.title}>
                <div className="resume-project-number">
                  0{index + 1}
                </div>

                <div className="resume-project-content">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <Link href="/projects">
                    VIEW PROJECT
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS / ADDITIONAL */}
      <section className="resume-section">
        <div className="resume-container">
          <div className="resume-section-heading">
            <div className="resume-eyebrow">
              <span>07</span>
              ADDITIONAL
            </div>

            <h2>
              KNOWLEDGE &
              <br />
              <em>CAPABILITIES.</em>
            </h2>
          </div>

          <div className="resume-cert-grid">
            {certifications.map((item, index) => (
              <article className="resume-cert-card" key={item.title}>
                <div className="resume-cert-top">
                  <Sparkles size={19} />
                  <span>0{index + 1}</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="resume-contact">
        <div className="resume-contact-bg" />

        <div className="resume-container">
          <div className="resume-contact-content">
            <div className="resume-eyebrow">
              <span>08</span>
              LET'S WORK TOGETHER
            </div>

            <h2>
              HAVE AN IDEA?
              <br />
              <em>LET'S BUILD IT.</em>
            </h2>

            <p>
              Looking for someone who can turn your idea into a polished,
              modern and professional web experience?
            </p>

            <div className="resume-contact-actions">
              <Link href="/contact" className="resume-primary-button">
                <Mail size={17} />
                START A PROJECT
              </Link>

              <Link href="/services" className="resume-secondary-button">
                VIEW SERVICES
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          <div className="resume-contact-meta">
            <div>
              <MapPin size={17} />
              <span>PAKISTAN</span>
            </div>

            <div>
              <BriefcaseBusiness size={17} />
              <span>FREELANCE / REMOTE</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="resume-footer">
        <div className="resume-container">
          <span>FAIZA NOOR © 2026</span>
          <span>FULL STACK WEB ENGINEER</span>
          <span>BUILT WITH INTENT.</span>
        </div>
      </footer>
    </main>
  );
}