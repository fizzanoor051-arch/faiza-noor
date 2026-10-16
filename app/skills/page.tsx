
"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import { skills } from "@/data/skills";
import "./skills.css";

const INITIAL_VISIBLE = 6;

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default function SkillsPage() {
  const [showAllWeb, setShowAllWeb] = useState(false);
  const [showAllOffice, setShowAllOffice] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const { webSkills, officeSkills } = useMemo(() => {
    const officeKeywords = [
      "ms office",
      "microsoft office",
      "microsoft word",
      "ms word",
      "word",
      "excel",
      "powerpoint",
      "power point",
      "outlook",
      "office",
    ];

    const office = skills.filter((skill) => {
      const searchable = normalize(
        `${skill.name} ${skill.short} ${skill.category}`
      );

      return officeKeywords.some((keyword) =>
        searchable.includes(normalize(keyword))
      );
    });

    const officeNames = new Set(office.map((skill) => skill.name));

    return {
      officeSkills: office,
      webSkills: skills.filter((skill) => !officeNames.has(skill.name)),
    };
  }, []);

  const renderSkillCards = (
    items: typeof skills,
    showAll: boolean,
    sectionKey: string
  ) => {
    const visibleSkills = showAll
      ? items
      : items.slice(0, INITIAL_VISIBLE);

    return (
      <>
        <div className="skills-grid">
          {visibleSkills.map((skill, index) => {
            const Icon = skill.icon;
            const skillKey = `${sectionKey}-${skill.name}`;
            const isExpanded = expandedSkill === skillKey;
            const percentage = Math.min(
              100,
              Math.max(80, skill.percentage)
            );

            return (
              <article
                className={`skill-card ${isExpanded ? "is-expanded" : ""}`}
                key={`${skillKey}-${index}`}
              >
                <div className="skill-card-main">
                  <div className="skill-card-icon">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>

                  <div className="skill-card-info">
                    <h3>{skill.name}</h3>
                    <span>{skill.short}</span>
                  </div>

                  <button
                    type="button"
                    className="skill-card-toggle"
                    onClick={() =>
                      setExpandedSkill(isExpanded ? null : skillKey)
                    }
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Hide" : "Show"} ${skill.name} details`}
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="skill-card-details">
                    <p>{skill.description}</p>

                    <div className="skill-card-progress-heading">
                      <span>SKILL PROFICIENCY</span>
                      <strong>{percentage}%</strong>
                    </div>

                    <div
                      className="skill-card-progress"
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percentage}
                    >
                      <span style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {items.length > INITIAL_VISIBLE && (
          <button
            type="button"
            className="skills-see-more"
            onClick={() => {
              if (sectionKey === "web") {
                setShowAllWeb(!showAll);
              } else {
                setShowAllOffice(!showAll);
              }
            }}
            aria-expanded={showAll}
          >
            {showAll ? "Show Less" : "See More"}
            <ArrowDown
              size={15}
              className={showAll ? "skills-arrow-up" : ""}
            />
          </button>
        )}

        {items.length === 0 && (
          <p className="skills-empty">
            Add skills for this section in your skills data file.
          </p>
        )}
      </>
    );
  };

  return (
    <main className="skills-page">
      <section className="skills-hero">
        <span className="skills-kicker">
          <Sparkles size={13} />
          MY EXPERTISE
        </span>

        <h1 className="skills-title">
          Skills & <span>Craft.</span>
        </h1>

        <p className="skills-description">
          Technical expertise and productivity tools I use to build
          thoughtful digital experiences.
        </p>

        <div className="skills-hero-line">
          <span />
          <Sparkles size={13} />
          <span />
        </div>
      </section>

      <section className="skills-content" aria-labelledby="web-skills-title">
        <div className="skills-section-top">
          <div>
            <span className="skills-overline">01 / DEVELOPMENT</span>
            <h2 id="web-skills-title">
              Full-Stack Web <span>Engineer</span>
            </h2>
            <p className="skills-section-description">
              Building responsive interfaces, robust backends and modern web applications.
            </p>
          </div>

          <span className="skills-total">
            {String(webSkills.length).padStart(2, "0")} SKILLS
          </span>
        </div>

        {renderSkillCards(webSkills, showAllWeb, "web")}
      </section>

      <section
        className="skills-content skills-office-section"
        aria-labelledby="office-skills-title"
      >
        <div className="skills-section-top">
          <div>
            <span className="skills-overline">02 / PRODUCTIVITY</span>
            <h2 id="office-skills-title">
              MS Office <span>Specialist</span>
            </h2>
            <p className="skills-section-description">
              Professional documents, spreadsheets, presentations and organized workflows.
            </p>
          </div>

          <span className="skills-total">
            {String(officeSkills.length).padStart(2, "0")} SKILLS
          </span>
        </div>

        {renderSkillCards(officeSkills, showAllOffice, "office")}
      </section>

      <footer className="skills-footer">
        <span>DESIGNED WITH PURPOSE</span>
        <span className="skills-footer-star">✦</span>
        <span>BUILT WITH CURIOSITY</span>
      </footer>
    </main>
  );
}
