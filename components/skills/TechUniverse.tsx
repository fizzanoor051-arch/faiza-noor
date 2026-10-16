"use client";

import { useState, type CSSProperties } from "react";

/**
 * Shared skill shape used by TechNode and SkillDetails.
 * These fields are for components that need constellation positioning
 * and technology details.
 */
export type Skill = {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
  description: string;
  technologies: string[];
  position: {
    x: number;
    y: number;
  };
};

/**
 * Shape used by the existing golden animated TechUniverse UI.
 * Keeping this separate avoids forcing extra fields onto every skill.
 */
type UniverseSkill = {
  name: string;
  icon: string;
  category: string;
  level: number;
  description: string;
};

const skills: UniverseSkill[] = [
  // FRONTEND
  { name: "React.js", icon: "⚛️", category: "Frontend", level: 95, description: "Reusable components, hooks, state management and interactive interfaces." },
  { name: "Next.js", icon: "▲", category: "Frontend", level: 92, description: "App Router, server rendering, layouts and full-stack React applications." },
  { name: "JavaScript", icon: "🟨", category: "Frontend", level: 95, description: "Modern JavaScript, asynchronous programming, DOM and web APIs." },
  { name: "TypeScript", icon: "🔷", category: "Frontend", level: 90, description: "Type-safe applications, interfaces, generics and maintainable code." },
  { name: "HTML5", icon: "🌐", category: "Frontend", level: 95, description: "Semantic markup and accessible web page structure." },
  { name: "CSS3", icon: "🎨", category: "Frontend", level: 95, description: "Modern layouts, animations, transitions and responsive styling." },
  { name: "Tailwind CSS", icon: "💨", category: "Frontend", level: 93, description: "Utility-first styling and consistent responsive design systems." },
  { name: "Responsive UI", icon: "📱", category: "Frontend", level: 92, description: "Interfaces that adapt to phones, tablets and desktop screens." },
  { name: "Framer Motion", icon: "✨", category: "Frontend", level: 82, description: "Fluid page transitions, micro-interactions and animated interfaces." },
  { name: "Accessibility", icon: "♿", category: "Frontend", level: 80, description: "Accessible navigation, semantic elements and keyboard interactions." },

  // BACKEND
  { name: "Node.js", icon: "🟢", category: "Backend", level: 84, description: "Server-side JavaScript, modules and asynchronous services." },
  { name: "Express.js", icon: "🚂", category: "Backend", level: 84, description: "REST endpoints, middleware, routes and controller architecture." },
  { name: "REST APIs", icon: "🔌", category: "Backend", level: 88, description: "API design, HTTP methods, status codes and resource handling." },
  { name: "Authentication", icon: "🔐", category: "Backend", level: 82, description: "Login flows, sessions, JWT and protected routes." },
  { name: "Authorization", icon: "🛡️", category: "Backend", level: 80, description: "Role-based access control and permission checks." },
  { name: "CRUD Systems", icon: "⚙️", category: "Backend", level: 88, description: "Create, read, update and delete workflows with validation." },
  { name: "Server Actions", icon: "🧩", category: "Backend", level: 80, description: "Server-side mutations and form handling in modern Next.js." },
  { name: "Middleware", icon: "🔀", category: "Backend", level: 80, description: "Request processing, validation and reusable server logic." },

  // DATABASE
  { name: "MongoDB", icon: "🍃", category: "Database", level: 85, description: "Document models, collections, queries and schema design." },
  { name: "Mongoose", icon: "📚", category: "Database", level: 82, description: "MongoDB schemas, models, validation and relationships." },
  { name: "PostgreSQL", icon: "🐘", category: "Database", level: 80, description: "Relational data, SQL queries and structured data models." },
  { name: "Prisma ORM", icon: "🔷", category: "Database", level: 78, description: "Typed database access, schema management and migrations." },
  { name: "Data Modeling", icon: "🗃️", category: "Database", level: 80, description: "Structuring data and designing maintainable database schemas." },

  // DEVOPS
  { name: "Git", icon: "🌿", category: "DevOps", level: 88, description: "Version control, branches, commits and merge workflows." },
  { name: "GitHub", icon: "🐙", category: "DevOps", level: 88, description: "Repositories, collaboration, pull requests and source management." },
  { name: "Docker", icon: "🐳", category: "DevOps", level: 78, description: "Container fundamentals, Dockerfiles and repeatable environments." },
  { name: "CI/CD", icon: "🔄", category: "DevOps", level: 75, description: "Automated checks and deployment pipeline fundamentals." },
  { name: "Vercel", icon: "▲", category: "DevOps", level: 88, description: "Deployments, environment variables and production hosting." },
  { name: "Environment Setup", icon: "🔧", category: "DevOps", level: 82, description: "Configuration, environment variables and development tooling." },

  // TESTING
  { name: "Jest", icon: "🧪", category: "Testing", level: 75, description: "Unit tests and JavaScript testing fundamentals." },
  { name: "Vitest", icon: "⚗️", category: "Testing", level: 75, description: "Fast unit testing for modern JavaScript projects." },
  { name: "Playwright", icon: "🎭", category: "Testing", level: 70, description: "Browser automation and end-to-end testing fundamentals." },
  { name: "Debugging", icon: "🔍", category: "Testing", level: 85, description: "Tracing issues, inspecting requests and resolving application bugs." },
  { name: "Performance", icon: "⚡", category: "Testing", level: 82, description: "Rendering efficiency, loading performance and frontend optimization." },

  // AI & APIS
  { name: "AI Integration", icon: "🤖", category: "AI & APIs", level: 82, description: "Adding AI-powered features to web applications." },
  { name: "OpenAI APIs", icon: "🧠", category: "AI & APIs", level: 80, description: "Connecting language-model APIs to application workflows." },
  { name: "API Integration", icon: "🔗", category: "AI & APIs", level: 85, description: "Integrating external services and handling API responses." },
  { name: "Webhooks", icon: "🪝", category: "AI & APIs", level: 75, description: "Connecting application events with external services." },

  // ENGINEERING
  { name: "Project Architecture", icon: "🏗️", category: "Engineering", level: 82, description: "Organizing reusable modules and scalable application structure." },
  { name: "Form Validation", icon: "✅", category: "Engineering", level: 88, description: "Validating input and improving form reliability." },
  { name: "Security Basics", icon: "🔒", category: "Engineering", level: 78, description: "Safer input handling, access control and configuration practices." },
  { name: "Technical SEO", icon: "🔎", category: "Engineering", level: 80, description: "Metadata, semantic markup and search-friendly page structure." },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Testing",
  "AI & APIs",
  "Engineering",
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

// NEW: automatic golden light streaks
const goldStreaks = [
  { top: "12%", delay: "-2s", duration: "13s", width: "35%" },
  { top: "28%", delay: "-8s", duration: "17s", width: "27%" },
  { top: "43%", delay: "-5s", duration: "15s", width: "42%" },
  { top: "61%", delay: "-11s", duration: "19s", width: "30%" },
  { top: "77%", delay: "-4s", duration: "16s", width: "38%" },
  { top: "91%", delay: "-14s", duration: "20s", width: "25%" },
];

// NEW: golden particles distributed across the background
const goldDust = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 41 + 9) % 100}%`,
  top: `${(index * 29 + 13) % 100}%`,
  delay: `${-((index * 1.3) % 12)}s`,
  duration: `${5 + (index % 7)}s`,
  size: index % 4 === 0 ? 4 : index % 3 === 0 ? 3 : 2,
}));

export default function TechUniverse() {
  const [category, setCategory] = useState("All");
  const [selectedName, setSelectedName] = useState("React.js");

  const visible = skills.filter(
    (skill) => category === "All" || skill.category === category,
  );

  const selected =
    visible.find((skill) => skill.name === selectedName) ?? visible[0];

  return (
    <section id="stack" className="magic-world">
      <div className="magic-world__backdrop" aria-hidden="true">
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

        {/* NEW: flowing golden light trails */}
        <div className="magic-gold-motion">
          {goldStreaks.map((streak, index) => (
            <span
              key={`gold-streak-${index}`}
              className={`magic-gold-streak magic-gold-streak--${index % 3}`}
              style={
                {
                  top: streak.top,
                  width: streak.width,
                  animationDelay: streak.delay,
                  animationDuration: streak.duration,
                  "--gold-index": index,
                } as CSSProperties
              }
            />
          ))}

          {/* NEW: floating golden dust */}
          {goldDust.map((particle, index) => (
            <span
              key={`gold-dust-${index}`}
              className="magic-gold-dust"
              style={
                {
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                } as CSSProperties
              }
            />
          ))}

          {/* NEW: slowly sweeping ambient gold glow */}
          <div className="magic-gold-ambient magic-gold-ambient--one" />
          <div className="magic-gold-ambient magic-gold-ambient--two" />
        </div>

        <div className="services-mist services-mist-one" />
        <div className="services-mist services-mist-two" />
        <div className="services-horizon" />
      </div>

      <div className="magic-world__content">
        <header className="magic-heading">
          <span className="magic-eyebrow">
            <span className="magic-star">✳</span>
            THE CRAFT BEHIND THE CODE
          </span>

          <h2>
            My skills,
            <br />
            <span>my universe.</span>
          </h2>

          <p>
            From beautiful interfaces to powerful backend systems, every skill
            has a place in the bigger picture.
          </p>
        </header>

        <div className="magic-categories" aria-label="Skill categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={
                category === item ? "magic-filter active" : "magic-filter"
              }
              aria-pressed={category === item}
            >
              {item}
              {item === "All" && (
                <span className="filter-count">{skills.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="magic-layout">
          <div className="magic-field">
            <div className="magic-field__top">
              <span>✦ SKILL CONSTELLATION</span>
              <span>{visible.length} SKILLS</span>
            </div>

            <div className="magic-orbital-glow" aria-hidden="true" />
            <div
              className="magic-orbital-glow magic-orbital-glow--two"
              aria-hidden="true"
            />

            <div className="magic-orbs">
              {visible.map((skill, index) => (
                <button
                  type="button"
                  key={skill.name}
                  onClick={() => setSelectedName(skill.name)}
                  className={`magic-skill ${
                    selected.name === skill.name ? "magic-skill--selected" : ""
                  }`}
                  style={
                    {
                      "--index": index,
                      "--float-duration": `${4.2 + (index % 5) * 0.65}s`,
                    } as CSSProperties
                  }
                  aria-pressed={selected.name === skill.name}
                  aria-label={`${skill.name}, ${skill.level}% self-assessed proficiency`}
                >
                  <span className="magic-skill__icon">{skill.icon}</span>
                  <span className="magic-skill__name">{skill.name}</span>
                  <span className="magic-skill__level">{skill.level}%</span>
                  <span className="magic-skill__shine" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="magic-field__bottom">
              <span className="magic-bottom-star">✧</span>
              Select any floating skill to explore it
            </div>
          </div>

          <aside className="magic-profile" aria-live="polite">
            <span className="magic-profile__eyebrow">SKILL SPOTLIGHT</span>

            <div className="magic-profile__icon" key={selected.name}>
              {selected.icon}
            </div>

            <span className="magic-profile__category">
              {selected.category}
            </span>

            <h3 key={`title-${selected.name}`}>{selected.name}</h3>

            <p className="magic-profile__description">
              {selected.description}
            </p>

            <div className="magic-profile__rule" />

            <div className="magic-profile__meter">
              <div>
                <span>SELF-ASSESSED PROFICIENCY</span>
                <strong>{selected.level}%</strong>
              </div>

              <div
                className="magic-meter"
                role="progressbar"
                aria-label={`${selected.name} self-assessed proficiency`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={selected.level}
              >
                <span
                  key={`${selected.name}-${selected.level}`}
                  style={{ width: `${selected.level}%` }}
                />
              </div>
            </div>

            <p className="magic-profile__note">
              Skills grow through building, testing and shipping real projects.
            </p>
          </aside>
        </div>

        <footer className="magic-footer">
          <p>One connected skill set. Countless ways to build.</p>
          <a href="#projects">
            EXPLORE PROJECTS <span>↗</span>
          </a>
        </footer>
      </div>

      <style jsx global>{`
        .magic-world {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 100px 24px 42px;
          color: #fff7e9;
          background: #080510;
        }

        .magic-world__backdrop {
          position: absolute;
          z-index: -1;
          inset: 0;
          overflow: hidden;
          background: #080510;
          pointer-events: none;
        }

        .magic-world__content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin: auto;
        }

        /* =========================================
           NEW GOLDEN MOTION BACKGROUND
           Existing background colors stay unchanged.
        ========================================= */

        .magic-gold-motion {
          position: absolute;
          z-index: 5;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.9;
          mix-blend-mode: screen;
        }

        .magic-gold-streak {
          position: absolute;
          left: -45%;
          display: block;
          height: 1px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 196, 89, 0.02) 12%,
            rgba(255, 213, 128, 0.3) 43%,
            rgba(255, 235, 183, 0.95) 50%,
            rgba(255, 192, 72, 0.24) 60%,
            transparent 100%
          );
          box-shadow:
            0 0 5px rgba(255, 194, 79, 0.28),
            0 0 14px rgba(255, 189, 64, 0.13);
          transform: rotate(-19deg);
          transform-origin: center;
          animation-name: magic-gold-streak-travel;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, left, opacity;
        }

        .magic-gold-streak::after {
          position: absolute;
          top: -2px;
          right: 22%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ffe9b0;
          box-shadow:
            0 0 6px 2px rgba(255, 207, 111, 0.7),
            0 0 17px 5px rgba(255, 180, 55, 0.25);
          content: "";
        }

        .magic-gold-streak--0 {
          height: 1px;
        }

        .magic-gold-streak--1 {
          height: 2px;
          opacity: 0.55;
          filter: blur(0.3px);
        }

        .magic-gold-streak--2 {
          height: 1px;
          opacity: 0.72;
          transform: rotate(-12deg);
        }

        @keyframes magic-gold-streak-travel {
          0% {
            left: -48%;
            opacity: 0;
            translate: 0 18px;
          }
          12% {
            opacity: 0.75;
          }
          50% {
            opacity: 1;
          }
          85% {
            opacity: 0.5;
          }
          100% {
            left: 115%;
            opacity: 0;
            translate: 0 -18px;
          }
        }

        .magic-gold-dust {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: #ffd77d;
          box-shadow:
            0 0 5px 1px rgba(255, 204, 102, 0.55),
            0 0 13px 2px rgba(255, 185, 64, 0.2);
          opacity: 0;
          animation-name: magic-gold-particle-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes magic-gold-particle-drift {
          0% {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.5);
          }
          25% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.95;
            transform: translate3d(18px, -16px, 0) scale(1.15);
          }
          75% {
            opacity: 0.55;
          }
          100% {
            opacity: 0;
            transform: translate3d(-12px, -36px, 0) scale(0.6);
          }
        }

        .magic-gold-ambient {
          position: absolute;
          width: 45%;
          height: 35%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(255, 184, 61, 0.075) 0%,
            rgba(255, 198, 100, 0.035) 35%,
            transparent 72%
          );
          filter: blur(25px);
          animation: magic-gold-ambient-drift 18s ease-in-out infinite alternate;
          will-change: transform;
        }

        .magic-gold-ambient--one {
          top: 8%;
          left: -12%;
        }

        .magic-gold-ambient--two {
          right: -12%;
          bottom: 5%;
          animation-delay: -9s;
          animation-duration: 22s;
        }

        @keyframes magic-gold-ambient-drift {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
            opacity: 0.5;
          }
          50% {
            transform: translate3d(28px, -18px, 0) scale(1.12);
            opacity: 1;
          }
          100% {
            transform: translate3d(-12px, 20px, 0) scale(1);
            opacity: 0.65;
          }
        }

        /* =========================================
           ORIGINAL TECH UNIVERSE STYLING
        ========================================= */

        .magic-heading {
          max-width: 650px;
          margin-bottom: 35px;
        }

        .magic-eyebrow,
        .magic-field__top,
        .magic-field__bottom,
        .magic-profile__eyebrow,
        .magic-profile__category,
        .magic-profile__meter > div:first-child,
        .magic-footer a {
          font-family: var(--font-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.16em;
        }

        .magic-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #e8cb91;
        }

        .magic-star {
          font-size: 16px;
          animation: magic-star-spin 18s linear infinite;
        }

        .magic-heading h2 {
          margin: 24px 0 17px;
          font-size: clamp(45px, 6.5vw, 80px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.065em;
        }

        .magic-heading h2 span {
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
          font-family: Georgia, serif;
          font-weight: 400;
          font-style: italic;
          animation: services-gradient-shift 8s ease-in-out infinite alternate;
        }

        .magic-heading p {
          max-width: 440px;
          color: rgba(255, 247, 233, 0.72);
          font-size: 14px;
          line-height: 1.9;
        }

        .magic-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .magic-filter {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border: 1px solid rgba(234, 203, 145, 0.22);
          border-radius: 6px;
          background: rgba(8, 5, 16, 0.72);
          color: rgba(255, 247, 233, 0.78);
          font-size: 11px;
          cursor: pointer;
          transition:
            border-color 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }

        .magic-filter:hover,
        .magic-filter.active {
          border-color: rgba(234, 203, 145, 0.7);
          background: rgba(234, 203, 145, 0.12);
          color: #ffe5ad;
        }

        .magic-filter:hover {
          transform: translateY(-2px);
        }

        .magic-filter:focus-visible,
        .magic-skill:focus-visible,
        .magic-footer a:focus-visible {
          outline: 2px solid #ffe5ad;
          outline-offset: 4px;
        }

        .filter-count {
          color: #eacb91;
          font-family: monospace;
          font-size: 9px;
        }

        .magic-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(245px, 0.7fr);
          align-items: stretch;
          gap: 20px;
        }

        .magic-field {
          position: relative;
          min-width: 0;
          min-height: 650px;
          overflow: hidden;
          border: 1px solid rgba(219, 190, 255, 0.15);
          background:
            radial-gradient(
              ellipse at 50% 45%,
              rgba(147, 103, 143, 0.12),
              transparent 55%
            ),
            rgba(16, 11, 27, 0.72);
          box-shadow:
            inset 0 0 80px rgba(125, 87, 157, 0.055),
            0 15px 50px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(8px);
        }

        .magic-field__top {
          position: absolute;
          z-index: 4;
          top: 20px;
          right: 20px;
          left: 20px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255, 232, 195, 0.66);
          font-size: 8px;
        }

        .magic-orbital-glow {
          position: absolute;
          top: 45%;
          left: 50%;
          width: 250px;
          height: 250px;
          border: 1px solid rgba(234, 203, 145, 0.17);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: magic-orbit 34s linear infinite;
          pointer-events: none;
        }

        .magic-orbital-glow::before,
        .magic-orbital-glow::after {
          position: absolute;
          top: 10%;
          left: 14%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffe4a9;
          box-shadow: 0 0 15px 3px rgba(255, 207, 120, 0.35);
          content: "";
        }

        .magic-orbital-glow::after {
          top: auto;
          right: 8%;
          bottom: 22%;
          left: auto;
          width: 3px;
          height: 3px;
        }

        .magic-orbital-glow--two {
          width: 430px;
          height: 430px;
          border-style: dashed;
          border-color: rgba(195, 158, 210, 0.14);
          animation-duration: 58s;
          animation-direction: reverse;
        }

        .magic-orbs {
          position: absolute;
          inset: 0;
        }

        .magic-skill {
          position: absolute;
          top: calc(68px + (var(--index) * 47px) % 490px);
          left: calc(7% + (var(--index) * 37%) % 84%);
          display: flex;
          width: 112px;
          min-height: 112px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 12px 6px;
          overflow: hidden;
          border: 1px solid rgba(234, 203, 145, 0.35);
          border-radius: 50%;
          background: radial-gradient(
            circle at 35% 25%,
            rgba(48, 31, 60, 0.97),
            rgba(8, 5, 16, 0.98) 75%
          );
          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.24),
            inset 0 0 18px rgba(255, 230, 183, 0.045);
          color: #fff6e6;
          opacity: 0;
          cursor: pointer;
          animation:
            magic-orb-appear 0.6s ease forwards,
            magic-orb-float var(--float-duration) ease-in-out infinite;
          animation-delay: calc(var(--index) * 45ms), calc(var(--index) * -0.5s);
          transition:
            border-color 0.25s,
            box-shadow 0.25s,
            background 0.25s;
        }

        .magic-skill:nth-child(3n) {
          border-radius: 43% 57% 51% 49% / 50% 44% 56% 50%;
        }

        .magic-skill:nth-child(3n + 1) {
          border-radius: 48% 52% 43% 57% / 43% 55% 45% 57%;
        }

        .magic-skill__icon {
          font-size: 22px;
          line-height: 1.2;
          filter: drop-shadow(0 0 7px rgba(255, 219, 153, 0.17));
        }

        .magic-skill__name {
          max-width: 100%;
          padding: 0 4px;
          font-size: 10px;
          font-weight: 500;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .magic-skill__level {
          color: #f2d49c;
          font-family: monospace;
          font-size: 10px;
        }

        .magic-skill__shine {
          position: absolute;
          top: -65%;
          left: -100%;
          width: 45%;
          height: 230%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 242, 210, 0.16),
            transparent
          );
          transform: rotate(25deg);
          animation: magic-shimmer 7s ease-in-out infinite;
          animation-delay: calc(var(--index) * -0.3s);
          pointer-events: none;
        }

        .magic-skill:hover,
        .magic-skill--selected {
          z-index: 5;
          border-color: rgba(255, 226, 166, 0.98);
          background: radial-gradient(circle at 35% 25%, #75546e, #2c2139 78%);
          box-shadow:
            0 0 0 4px rgba(234, 203, 145, 0.07),
            0 0 35px rgba(242, 199, 121, 0.2);
        }

        .magic-skill--selected .magic-skill__icon {
          filter: drop-shadow(0 0 8px rgba(255, 219, 153, 0.48));
        }

        .magic-field__bottom {
          position: absolute;
          right: 18px;
          bottom: 17px;
          left: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 238, 207, 0.65);
          font-size: 8px;
        }

        .magic-bottom-star {
          color: #f2d49c;
          font-size: 14px;
        }

        .magic-profile {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          overflow: hidden;
          padding: 29px 23px;
          border: 1px solid rgba(219, 190, 255, 0.15);
          background: rgba(16, 11, 27, 0.85);
          box-shadow:
            0 25px 100px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(20px);
          transition:
            border-color 500ms ease,
            box-shadow 500ms ease;
        }

        .magic-profile::before {
          position: absolute;
          top: -90px;
          right: -80px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.1);
          filter: blur(65px);
          animation: services-glow-breathe 8s ease-in-out infinite alternate;
          content: "";
          pointer-events: none;
        }

        .magic-profile:hover {
          border-color: rgba(216, 180, 254, 0.25);
          box-shadow:
            0 30px 100px rgba(60, 24, 91, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .magic-profile__eyebrow {
          color: #eacb91;
          font-size: 8px;
        }

        .magic-profile__icon {
          display: grid;
          width: 58px;
          height: 58px;
          margin-top: 30px;
          place-items: center;
          border: 1px solid rgba(219, 190, 255, 0.15);
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(192, 132, 252, 0.12),
            rgba(253, 230, 138, 0.06)
          );
          box-shadow: 0 0 28px rgba(234, 203, 145, 0.07);
          font-size: 27px;
          animation: magic-icon-enter 0.4s ease both;
        }

        .magic-profile__category {
          margin-top: 23px;
          color: rgba(255, 238, 207, 0.63);
          font-size: 8px;
          text-transform: uppercase;
        }

        .magic-profile h3 {
          margin-top: 8px;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 500;
          letter-spacing: -0.05em;
          overflow-wrap: anywhere;
        }

        .magic-profile__description {
          margin-top: 14px;
          color: rgba(255, 247, 233, 0.76);
          font-size: 12px;
          line-height: 1.9;
        }

        .magic-profile__rule {
          height: 1px;
          margin: 25px 0;
          background: linear-gradient(
            90deg,
            rgba(234, 203, 145, 0.48),
            transparent
          );
        }

        .magic-profile__meter {
          margin-top: auto;
          padding-top: 30px;
        }

        .magic-profile__meter > div:first-child {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          color: rgba(255, 238, 207, 0.65);
          font-size: 8px;
        }

        .magic-profile__meter strong {
          color: #f2d49c;
          font-size: 14px;
          font-weight: 500;
        }

        .magic-meter {
          height: 3px;
          margin-top: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.12);
        }

        .magic-meter span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #c084fc, #f6dca5);
          box-shadow: 0 0 10px rgba(246, 220, 165, 0.28);
          animation: magic-meter-grow 0.55s ease both;
        }

        .magic-profile__note {
          margin-top: 22px;
          color: rgba(255, 247, 233, 0.55);
          font-size: 10px;
          line-height: 1.8;
        }

        .magic-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-top: 26px;
          padding-top: 20px;
          border-top: 1px solid rgba(219, 190, 255, 0.15);
        }

        .magic-footer p {
          color: rgba(255, 247, 233, 0.68);
          font-size: 11px;
          line-height: 1.8;
        }

        .magic-footer a {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #f2d49c;
          font-size: 8px;
          text-decoration: none;
          white-space: nowrap;
        }

        .magic-footer a span {
          font-size: 17px;
          transition: transform 0.2s;
        }

        .magic-footer a:hover span {
          transform: translate(3px, -3px);
        }

        @keyframes magic-orb-float {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -9px;
          }
        }

        @keyframes magic-orb-appear {
          from {
            opacity: 0;
            scale: 0.72;
          }
          to {
            opacity: 1;
            scale: 1;
          }
        }

        @keyframes magic-orbit {
          to {
            rotate: 360deg;
          }
        }

        @keyframes magic-shimmer {
          0%, 20% {
            left: -100%;
          }
          55%, 100% {
            left: 160%;
          }
        }

        @keyframes magic-icon-enter {
          from {
            opacity: 0;
            scale: 0.7;
            rotate: -12deg;
          }
          to {
            opacity: 1;
            scale: 1;
            rotate: 0deg;
          }
        }

        @keyframes magic-meter-grow {
          from {
            width: 0;
          }
        }

        @keyframes magic-star-spin {
          to {
            rotate: 360deg;
          }
        }

        @media (min-width: 761px) {
          .magic-orbs {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            align-content: center;
            justify-items: center;
            gap: 12px;
            padding: 78px 20px 58px;
          }

          .magic-skill {
            position: relative;
            top: auto;
            left: auto;
            width: clamp(84px, 8.4vw, 108px);
            min-height: 108px;
          }
        }

        @media (max-width: 760px) {
          .magic-world {
            padding: 76px 17px 35px;
          }

          .magic-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
          }

          .magic-field {
            min-height: 620px;
          }

          .magic-orbs {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            align-content: center;
            justify-items: center;
            gap: 14px 5px;
            padding: 65px 12px 48px;
          }

          .magic-skill {
            position: relative;
            top: auto;
            left: auto;
            width: clamp(84px, 24vw, 110px);
            min-height: 98px;
          }

          .magic-orbital-glow {
            width: 190px;
            height: 190px;
          }

          .magic-orbital-glow--two {
            width: 320px;
            height: 320px;
          }

          .magic-profile {
            min-height: 300px;
            padding: 24px;
          }

          .magic-profile__icon {
            margin-top: 20px;
          }

          .magic-profile__meter {
            margin-top: 26px;
            padding-top: 0;
          }

          .magic-gold-motion {
            opacity: 0.7;
          }

          .magic-gold-streak {
            height: 1px;
          }
        }

        @media (max-width: 390px) {
          .magic-world {
            padding-right: 12px;
            padding-left: 12px;
          }

          .magic-field {
            min-height: 600px;
          }

          .magic-orbs {
            gap: 12px 2px;
            padding-right: 6px;
            padding-left: 6px;
          }

          .magic-skill {
            width: 83px;
            min-height: 91px;
            padding: 7px 4px;
          }

          .magic-skill__icon {
            font-size: 19px;
          }

          .magic-skill__name {
            font-size: 9px;
          }

          .magic-skill__level {
            font-size: 9px;
          }

          .magic-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .magic-world *,
          .magic-world *::before,
          .magic-world *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
