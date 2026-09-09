"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Command,
  Layers3,
  MousePointer2,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import {
  skillCategories,
  skills,
  type Skill,
} from "@/data/skills";

import "./skills.css";

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] =
    useState("all");

  const [activeSkill, setActiveSkill] =
    useState<Skill | null>(null);

  const [showAll, setShowAll] =
    useState(false);

  const [scrollProgress, setScrollProgress] =
    useState(0);

  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* =========================================================
     ESC CLOSE
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setActiveSkill(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") {
      return skills;
    }

    return skills.filter(
      (skill) =>
        skill.category === activeCategory
    );
  }, [activeCategory]);

  const visibleSkills = showAll
    ? filteredSkills
    : filteredSkills.slice(0, 12);

  /* =========================================================
     COUNTERS
  ========================================================= */

  const expertCount = skills.filter(
    (skill) =>
      skill.level === "Expert"
  ).length;

  const advancedCount = skills.filter(
    (skill) =>
      skill.level === "Advanced"
  ).length;

  const intermediateCount =
    skills.filter(
      (skill) =>
        skill.level === "Intermediate"
    ).length;

  /* =========================================================
     CATEGORY CHANGE
  ========================================================= */

  const handleCategoryChange = (
    category: string
  ) => {
    setActiveCategory(category);
    setShowAll(false);

    requestAnimationFrame(() => {
      document
        .getElementById("skill-grid")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className="skills-page">

      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      <div
        className="skills-scroll-progress"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      />

      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div
        className="skills-noise"
        aria-hidden="true"
      />

      <div
        className="skills-orb skills-orb-one"
        aria-hidden="true"
      />

      <div
        className="skills-orb skills-orb-two"
        aria-hidden="true"
      />

      <div
        className="skills-grid-lines"
        aria-hidden="true"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="skills-hero">

        <div className="skills-hero-top">

          <div className="skills-eyebrow">
            <span className="skills-eyebrow-dot" />

            <span>
              07 / CAPABILITIES
            </span>
          </div>

          <div className="skills-hero-code">
            <Command size={13} />

            <span>
              SYSTEM / ONLINE
            </span>
          </div>

        </div>

        <div className="skills-hero-content">

          <div className="skills-hero-index">
            <span>FN</span>
            <span>2026</span>
          </div>

          <div className="skills-hero-title-wrap">

            <p className="skills-kicker">
              FULL-STACK WEB ENGINEER
            </p>

            <h1 className="skills-hero-title">

              <span>
                THE
              </span>

              <span className="skills-title-accent">
                SKILL
              </span>

              <span>
                SET.
              </span>

            </h1>

            <p className="skills-hero-description">
              A complete technical toolkit
              built for modern digital
              products — from interface
              architecture to backend
              systems, databases, AI and
              professional productivity.
            </p>

          </div>

        </div>

        {/* HERO STATS */}

        <div className="skills-hero-stats">

          <div className="skills-stat">
            <span className="skills-stat-number">
              {skills.length}
            </span>

            <span className="skills-stat-label">
              TOTAL SKILLS
            </span>
          </div>

          <div className="skills-stat">
            <span className="skills-stat-number">
              {skillCategories.length}
            </span>

            <span className="skills-stat-label">
              DOMAINS
            </span>
          </div>

          <div className="skills-stat">
            <span className="skills-stat-number">
              {expertCount}
            </span>

            <span className="skills-stat-label">
              EXPERT
            </span>
          </div>

          <div className="skills-stat">
            <span className="skills-stat-number">
              {advancedCount}
            </span>

            <span className="skills-stat-label">
              ADVANCED
            </span>
          </div>

          <div className="skills-stat">
            <span className="skills-stat-number">
              {intermediateCount}
            </span>

            <span className="skills-stat-label">
              DEVELOPING
            </span>
          </div>

        </div>

        <div className="skills-scroll-hint">

          <MousePointer2 size={13} />

          <span>
            EXPLORE CAPABILITIES
          </span>

          <ArrowDown size={13} />

        </div>

      </section>

      {/* =====================================================
          CATEGORY NAV
      ===================================================== */}

      <section className="skills-category-section">

        <div className="skills-section-heading">

          <div>

            <span className="skills-section-eyebrow">
              01 / INDEX
            </span>

            <h2>
              Explore
              <span>
                disciplines.
              </span>
            </h2>

          </div>

          <p>
            Navigate through the technical
            and professional capabilities
            behind my work.
          </p>

        </div>

        <div className="skills-category-nav">

          <button
            type="button"
            className={`skills-category-button ${
              activeCategory === "all"
                ? "is-active"
                : ""
            }`}
            onClick={() =>
              handleCategoryChange("all")
            }
          >

            <span className="category-button-number">
              00
            </span>

            <span className="category-button-icon">
              <Layers3 size={16} />
            </span>

            <span>
              All Skills
            </span>

            <ChevronRight size={14} />

          </button>

          {skillCategories.map(
            (category, index) => {

              const Icon =
                category.icon;

              return (
                <button
                  type="button"
                  key={category.id}
                  className={`skills-category-button ${
                    activeCategory ===
                    category.id
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategoryChange(
                      category.id
                    )
                  }
                >

                  <span className="category-button-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="category-button-icon">
                    <Icon size={16} />
                  </span>

                  <span>
                    {category.label}
                  </span>

                  <ChevronRight size={14} />

                </button>
              );
            }
          )}

        </div>

      </section>

      {/* =====================================================
          SKILLS GRID
      ===================================================== */}

      <section
        className="skills-grid-section"
        id="skill-grid"
      >

        <div className="skills-grid-header">

          <div>

            <span className="skills-section-eyebrow">
              02 / CAPABILITY MATRIX
            </span>

            <h2>
              Technical
              <span>
                arsenal.
              </span>
            </h2>

          </div>

          <div className="skills-grid-meta">

            <span>
              SHOWING
            </span>

            <strong>
              {visibleSkills.length
                .toString()
                .padStart(2, "0")}
            </strong>

            <span>
              /
            </span>

            <span>
              {filteredSkills.length
                .toString()
                .padStart(2, "0")}
            </span>

          </div>

        </div>

        <div className="skills-grid">

          {visibleSkills.map(
            (skill, index) => {

              const Icon =
                skill.icon;

              return (
                <article
                  key={`${skill.name}-${index}`}
                  className="skill-card"
                  onClick={() =>
                    setActiveSkill(skill)
                  }
                  tabIndex={0}
                  onKeyDown={(event) => {

                    if (
                      event.key ===
                        "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();

                      setActiveSkill(
                        skill
                      );
                    }

                  }}
                >

                  <div className="skill-card-glow" />

                  <div className="skill-card-top">

                    <span className="skill-card-index">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="skill-card-arrow">
                      <ArrowUpRight
                        size={15}
                      />
                    </span>

                  </div>

                  <div className="skill-card-icon">
                    <Icon
                      size={25}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div className="skill-card-body">

                    <div className="skill-card-title-row">

                      <h3>
                        {skill.name}
                      </h3>

                      <span>
                        {skill.short}
                      </span>

                    </div>

                    <p>
                      {skill.description}
                    </p>

                  </div>

                  <div className="skill-card-bottom">

                    <div className="skill-level">

                      <span>
                        {skill.level}
                      </span>

                      <strong>
                        {skill.percentage}%
                      </strong>

                    </div>

                    <div className="skill-progress">

                      <span
                        style={{
                          width: `${skill.percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>

        {/* SHOW MORE */}

        {filteredSkills.length > 12 && (
          <button
            type="button"
            className="skills-show-more"
            onClick={() =>
              setShowAll(
                (current) => !current
              )
            }
          >

            <span>
              {showAll
                ? "SHOW LESS"
                : `SHOW ${
                    filteredSkills.length - 12
                  } MORE`}
            </span>

            {showAll ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}

          </button>
        )}

      </section>

      {/* =====================================================
          CORE STACK
      ===================================================== */}

      <section className="skills-stack-section">

        <div className="skills-stack-intro">

          <span className="skills-section-eyebrow">
            03 / CORE STACK
          </span>

          <h2>
            Built around
            <span>
              modern technology.
            </span>
          </h2>

          <p>
            The technologies I use to
            design, build, connect,
            deploy and maintain modern
            digital experiences.
          </p>

        </div>

        <div className="skills-stack-marquee">

          <div className="skills-marquee-track">

            {[
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
              "Git",
              "GitHub",
              "Docker",
              "AI Integration",
            ].map(
              (technology, index) => (
                <span
                  key={`${technology}-${index}`}
                >
                  <Code2 size={14} />
                  {technology}
                </span>
              )
            )}

            {[
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
              "Git",
              "GitHub",
              "Docker",
              "AI Integration",
            ].map(
              (technology, index) => (
                <span
                  key={`duplicate-${technology}-${index}`}
                >
                  <Code2 size={14} />
                  {technology}
                </span>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          WORKFLOW
      ===================================================== */}

      <section className="skills-workflow-section">

        <div className="skills-section-heading">

          <div>

            <span className="skills-section-eyebrow">
              04 / WORKFLOW
            </span>

            <h2>
              From idea
              <span>
                to interface.
              </span>
            </h2>

          </div>

          <p>
            A practical workflow combining
            design thinking, engineering,
            testing and deployment.
          </p>

        </div>

        <div className="skills-workflow">

          {[
            {
              number: "01",
              title: "DISCOVER",
              text: "Understand the product, users, goals and technical requirements.",
            },
            {
              number: "02",
              title: "ARCHITECT",
              text: "Plan components, routes, APIs, data structures and application flow.",
            },
            {
              number: "03",
              title: "BUILD",
              text: "Develop responsive interfaces and scalable full-stack functionality.",
            },
            {
              number: "04",
              title: "REFINE",
              text: "Debug, test, optimize performance and polish the experience.",
            },
            {
              number: "05",
              title: "DEPLOY",
              text: "Prepare the application for production and continuous improvement.",
            },
          ].map((step) => (

            <div
              key={step.number}
              className="workflow-item"
            >

              <span className="workflow-number">
                {step.number}
              </span>

              <div className="workflow-line" />

              <div className="workflow-content">

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="skills-cta">

        <div className="skills-cta-grid" />

        <div className="skills-cta-content">

          <span className="skills-section-eyebrow">
            05 / NEXT PROJECT
          </span>

          <h2>
            Have an idea?
            <br />
            <span>
              Let&apos;s build it.
            </span>
          </h2>

          <p>
            From a sharp landing page to
            a complete full-stack product,
            I turn ideas into polished
            digital experiences.
          </p>

          <a
  href="/contact"
  className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 flex items-center">
    <span className="font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
      START A PROJECT
    </span>

    <ArrowUpRight
      size={15}
      className="ml-2 text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_7px_rgba(251,113,133,0.95)]"
    />
  </span>
</a>

        </div>

      </section>

      {/* =====================================================
          SKILL DETAIL MODAL
      ===================================================== */}

      {activeSkill && (
        <div
          className="skill-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeSkill.name} details`}
          onClick={() =>
            setActiveSkill(null)
          }
        >

          <div
            className="skill-modal-card"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="skill-modal-close"
              onClick={() =>
                setActiveSkill(null)
              }
              aria-label="Close skill details"
            >
              ×
            </button>

            <div className="skill-modal-icon">

              {(() => {
                const Icon =
                  activeSkill.icon;

                return (
                  <Icon
                    size={34}
                    strokeWidth={1.4}
                  />
                );
              })()}

            </div>

            <span className="skills-section-eyebrow">
              {activeSkill.category.toUpperCase()}
              {" / "}
              {activeSkill.short}
            </span>

            <h2>
              {activeSkill.name}
            </h2>

            <p>
              {activeSkill.description}
            </p>

            <div className="skill-modal-level">

              <div>

                <span>
                  CURRENT LEVEL
                </span>

                <strong>
                  {activeSkill.level}
                </strong>

              </div>

              <strong>
                {activeSkill.percentage}%
              </strong>

            </div>

            <div className="skill-modal-progress">

              <span
                style={{
                  width: `${activeSkill.percentage}%`,
                }}
              />

            </div>

            <div className="skill-modal-footer">

              <span>
                <Check size={12} />
                AVAILABLE IN MY STACK
              </span>

              <span>
                FN / 2026
              </span>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}