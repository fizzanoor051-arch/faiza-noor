"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  GitBranch,
  Layers3,
  X,
} from "lucide-react";
import Link from "next/link";
import "./projects.css";

type Category = "ALL" | "FULL STACK" | "FRONTEND" | "UI / UX";

type Project = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: Exclude<Category, "ALL">;
  year: string;
  type: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  featured?: boolean;
  liveUrl: string;
  githubUrl: string;
};

const projects: Project[] = [
  {
    id: "shopsphere",
    number: "01",
    title: "SHOPSPHERE",
    shortTitle: "E-Commerce",
    category: "FULL STACK",
    year: "2026",
    type: "E-COMMERCE EXPERIENCE",
    description:
      "A modern e-commerce experience built around clean product discovery, smooth navigation and reusable React architecture.",
    longDescription:
      "ShopSphere is a modern e-commerce project focused on creating a polished shopping experience. The interface is designed around reusable components, structured product presentation, routing and a scalable frontend architecture.",
    technologies: [
      "React.js",
      "JavaScript",
      "Vite",
      "React Router",
      "CSS",
    ],
    features: [
      "Product browsing",
      "Product cards",
      "Shopping cart",
      "React Router navigation",
      "Reusable components",
      "Responsive layout",
    ],
    featured: true,

    // ADD YOUR REAL LINKS LATER
    liveUrl: "#",
    githubUrl: "#",
  },

  {
    id: "hospital",
    number: "02",
    title: "MEDICARE",
    shortTitle: "Hospital",
    category: "FRONTEND",
    year: "2026",
    type: "HEALTHCARE PLATFORM",
    description:
      "A professional healthcare interface designed to make medical services, doctors and appointments easier to explore.",
    longDescription:
      "Medicare is a responsive healthcare website concept with a strong focus on information architecture and user accessibility. It brings doctors, departments, services and appointment-related actions into one structured experience.",
    technologies: [
      "React.js",
      "JavaScript",
      "CSS",
      "Responsive Design",
    ],
    features: [
      "Doctor directory",
      "Departments",
      "Medical services",
      "Appointment interface",
      "Emergency access",
      "Responsive UI",
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  {
    id: "portfolio",
    number: "03",
    title: "FAIZA NOOR",
    shortTitle: "Portfolio",
    category: "UI / UX",
    year: "2026",
    type: "CINEMATIC PORTFOLIO",
    description:
      "A personal portfolio engineered as an immersive digital experience rather than a conventional developer website.",
    longDescription:
      "The Faiza Noor portfolio is designed around cinematic storytelling, motion, interactive navigation and premium visual hierarchy. The goal is to communicate technical ability through the experience itself.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "CSS",
      "Framer Motion",
    ],
    features: [
      "Cinematic navigation",
      "Interactive sections",
      "Responsive design",
      "Motion effects",
      "Project showcase",
      "Premium visual system",
    ],
    featured: true,

    liveUrl: "#",
    githubUrl: "#",
  },

  {
    id: "resume",
    number: "04",
    title: "RESUME SYSTEM",
    shortTitle: "Resume",
    category: "UI / UX",
    year: "2026",
    type: "PROFESSIONAL PROFILE",
    description:
      "A cinematic digital resume system presenting experience, education, skills and selected work in an editorial format.",
    longDescription:
      "A digital resume experience designed to move beyond a traditional static CV. The page combines structured professional information with a strong visual identity and responsive presentation.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "CSS",
    ],
    features: [
      "Professional profile",
      "Experience timeline",
      "Education section",
      "Technical stack",
      "Project showcase",
      "Print-ready layout",
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  {
    id: "hospital-dashboard",
    number: "05",
    title: "CARE DASHBOARD",
    shortTitle: "Dashboard",
    category: "FULL STACK",
    year: "2026",
    type: "DATA / DASHBOARD UI",
    description:
      "A dashboard concept focused on presenting operational information through clean data structures and intuitive interfaces.",
    longDescription:
      "Care Dashboard explores how complex operational information can be presented through a focused interface. The concept emphasizes hierarchy, reusable components and clear data visualization patterns.",
    technologies: [
      "React.js",
      "TypeScript",
      "API Integration",
      "CSS",
    ],
    features: [
      "Dashboard layout",
      "Data cards",
      "Navigation system",
      "Reusable UI",
      "API-ready structure",
      "Responsive interface",
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  {
    id: "business",
    number: "06",
    title: "BUSINESS SUITE",
    shortTitle: "Business",
    category: "FRONTEND",
    year: "2026",
    type: "BUSINESS PRODUCTIVITY",
    description:
      "A collection of professional digital productivity concepts combining structured information with practical interfaces.",
    longDescription:
      "Business Suite represents a set of practical productivity-focused interfaces designed for professional workflows, documentation and data management.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Microsoft Office",
    ],
    features: [
      "Professional documents",
      "Data management",
      "Spreadsheet workflows",
      "Business presentations",
      "Structured information",
      "Clean UI systems",
    ],

    liveUrl: "#",
    githubUrl: "#",
  },
];

const categories: Category[] = [
  "ALL",
  "FULL STACK",
  "FRONTEND",
  "UI / UX",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("ALL");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  const featuredProject = projects.find(
    (project) => project.featured
  );

  return (
    <main className="projects-page">
      {/* ATMOSPHERE */}
      <div className="projects-noise" />
      <div className="projects-grid-bg" />
      <div className="projects-orb projects-orb-one" />
      <div className="projects-orb projects-orb-two" />

      {/* HERO */}
      <section className="projects-hero">
        <div className="projects-container">
          <div className="projects-hero-top">
            <div className="projects-eyebrow">
              <span>01</span>
              SELECTED PROJECTS
            </div>

            <div className="projects-hero-meta">
              <span>FAIZA NOOR</span>
              <span>FULL STACK WEB ENGINEER</span>
            </div>
          </div>

          <div className="projects-hero-title">
            <h1>
              DIGITAL
              <span>WORK.</span>
            </h1>

            <div className="projects-hero-side">
              <div className="projects-side-line" />

              <p>
                A collection of interfaces, applications and digital
                experiences built with modern web technologies and a
                strong focus on detail.
              </p>

              <span className="projects-scroll-label">
                SCROLL TO EXPLORE ↓
              </span>
            </div>
          </div>

          <div className="projects-hero-bottom">
            <div>
              <strong>
                {String(projects.length).padStart(2, "0")}
              </strong>
              <span>SELECTED BUILDS</span>
            </div>

            <div>
              <strong>2026</strong>
              <span>CURRENT COLLECTION</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>MORE IN PROGRESS</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featuredProject && (
        <section className="projects-featured">
          <div className="projects-container">
            <div className="projects-section-label">
              <span>02</span>
              FEATURED WORK
            </div>

            <article
              className="projects-featured-card"
              onClick={() =>
                setSelectedProject(featuredProject)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSelectedProject(featuredProject);
                }
              }}
            >
              <div className="projects-featured-visual">
                <div className="projects-visual-grid" />

                <div className="projects-visual-orbit orbit-one" />
                <div className="projects-visual-orbit orbit-two" />

                <div className="projects-featured-window">
                  <div className="projects-window-bar">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="projects-window-content">
                    <div className="projects-window-sidebar">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>

                    <div className="projects-window-main">
                      <div className="projects-window-heading" />
                      <div className="projects-window-heading short" />

                      <div className="projects-window-cards">
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="projects-window-large" />
                    </div>
                  </div>
                </div>

                <span className="projects-visual-label">
                  01 / SELECTED EXPERIENCE
                </span>
              </div>

              <div className="projects-featured-info">
                <div className="projects-featured-top">
                  <span>{featuredProject.category}</span>
                  <span>{featuredProject.year}</span>
                </div>

                <h2>{featuredProject.title}</h2>

                <p>{featuredProject.description}</p>

                <div className="projects-tech-row">
                  {featuredProject.technologies
                    .slice(0, 5)
                    .map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                </div>

                <div className="projects-featured-actions">
                  <a
                    href={featuredProject.liveUrl}
                    className="projects-primary-button"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    VIEW LIVE
                    <ExternalLink size={16} />
                  </a>

                  <a
                    href={featuredProject.githubUrl}
                    className="projects-secondary-button"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    VIEW GITHUB
                    <GitBranch size={16} />
                  </a>

                  <button
                    type="button"
                    className="projects-open-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProject(featuredProject);
                    }}
                  >
                    EXPLORE
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* PROJECT ARCHIVE */}
      <section className="projects-work">
        <div className="projects-container">
          <div className="projects-section-heading">
            <div>
              <div className="projects-eyebrow">
                <span>03</span>
                PROJECT ARCHIVE
              </div>

              <h2>
                THE
                <br />
                <em>WORK.</em>
              </h2>
            </div>

            <p>
              Explore the collection by project type. Every build is
              approached as a real digital product, not just a visual
              mockup.
            </p>
          </div>

          {/* FILTER */}
          <div className="projects-filter">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article
                className="project-card"
                key={project.id}
                onClick={() =>
                  setSelectedProject(project)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="project-card-visual">
                  <div className="project-card-number">
                    {project.number}
                  </div>

                  <div className="project-card-mark">
                    <Layers3
                      size={32}
                      strokeWidth={1.1}
                    />
                  </div>

                  <span className="project-card-type">
                    {project.type}
                  </span>

                  <div className="project-card-corner">
                    <ArrowUpRight size={19} />
                  </div>
                </div>

                <div className="project-card-info">
                  <div className="project-card-meta">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="project-card-bottom">
                    <div className="project-card-tech">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                    </div>

                    <span className="project-view">
                      VIEW
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  {/* PROJECT LINKS */}
                  <div className="project-card-links">
                    <a
                      href={project.liveUrl}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      VIEW LIVE
                      <ExternalLink size={13} />
                    </a>

                    <a
                      href={project.githubUrl}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      VIEW GITHUB
                      <GitBranch size={13} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="projects-process">
        <div className="projects-container">
          <div className="projects-section-heading">
            <div>
              <div className="projects-eyebrow">
                <span>04</span>
                HOW I BUILD
              </div>

              <h2>
                FROM
                <br />
                <em>IDEA → REALITY.</em>
              </h2>
            </div>
          </div>

          <div className="projects-process-grid">
            <div className="projects-process-item">
              <span>01</span>
              <Code2 size={22} />

              <h3>DISCOVER</h3>

              <p>
                Understand the idea, audience, goals and technical
                requirements before writing the first line of code.
              </p>
            </div>

            <div className="projects-process-item">
              <span>02</span>
              <Layers3 size={22} />

              <h3>STRUCTURE</h3>

              <p>
                Plan the architecture, components, pages and
                interactions so the product has a solid foundation.
              </p>
            </div>

            <div className="projects-process-item">
              <span>03</span>
              <ExternalLink size={22} />

              <h3>BUILD</h3>

              <p>
                Develop responsive interfaces and functionality
                using modern web technologies.
              </p>
            </div>

            <div className="projects-process-item">
              <span>04</span>
              <ArrowUpRight size={22} />

              <h3>REFINE</h3>

              <p>
                Test, optimize and polish the experience across
                devices before the final delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="projects-cta">
        <div className="projects-cta-glow" />

        <div className="projects-container">
          <div className="projects-eyebrow">
            <span>05</span>
            NEXT PROJECT
          </div>

          <h2>
            YOUR IDEA
            <br />
            <em>COULD BE NEXT.</em>
          </h2>

          <p>
            Have a website, application or digital product in mind?
            Let's turn the idea into something people remember.
          </p>

          <div className="projects-cta-actions">
            <Link
              href="/contact"
              className="projects-primary-button"
            >
              START A PROJECT
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/services"
              className="projects-secondary-button"
            >
              VIEW SERVICES
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            <div className="project-modal-number">
              {selectedProject.number} / PROJECT
            </div>

            <div className="project-modal-header">
              <div>
                <span>{selectedProject.type}</span>

                <h2>{selectedProject.title}</h2>
              </div>

              <div className="project-modal-year">
                {selectedProject.year}
              </div>
            </div>

            <p className="project-modal-description">
              {selectedProject.longDescription}
            </p>

            <div className="project-modal-columns">
              <div>
                <span className="project-modal-label">
                  TECHNOLOGIES
                </span>

                <div className="project-modal-tags">
                  {selectedProject.technologies.map(
                    (tech) => (
                      <span key={tech}>{tech}</span>
                    )
                  )}
                </div>
              </div>

              <div>
                <span className="project-modal-label">
                  KEY FEATURES
                </span>

                <ul className="project-modal-features">
                  {selectedProject.features.map(
                    (feature) => (
                      <li key={feature}>
                        <span />
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* MODAL LINKS */}
            <div className="project-modal-actions">
              <a
                href={selectedProject.liveUrl}
                className="projects-primary-button"
              >
                VIEW LIVE
                <ExternalLink size={16} />
              </a>

              <a
                href={selectedProject.githubUrl}
                className="projects-secondary-button"
              >
                <GitBranch size={16} />
                VIEW GITHUB
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}