"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Database,
  Globe2,
  Layers3,
  MonitorSmartphone,
  MousePointer2,
  Palette,
  Rocket,
  Server,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import "./services.css";

type Service = {
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  details: string[];
  icon: typeof Code2;
  featured?: boolean;
};

const serviceCategories = [
  {
    id: "all",
    label: "All Services",
    number: "00",
    icon: Layers3,
  },
  {
    id: "web",
    label: "Web Development",
    number: "01",
    icon: Globe2,
  },
  {
    id: "fullstack",
    label: "Full Stack",
    number: "02",
    icon: Code2,
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    number: "03",
    icon: Database,
  },
  {
    id: "ui",
    label: "UI & Frontend",
    number: "04",
    icon: MonitorSmartphone,
  },
  {
    id: "backend",
    label: "Backend & API",
    number: "05",
    icon: Server,
  },
  {
    id: "ai",
    label: "AI Integration",
    number: "06",
    icon: Sparkles,
  },
  {
    id: "support",
    label: "Support & Fixes",
    number: "07",
    icon: Wrench,
  },
];

const services: Service[] = [
  {
    number: "01",
    title: "Custom Website Development",
    shortTitle: "CUSTOM WEB",
    category: "web",
    description:
      "Premium, responsive websites designed and developed around your brand, audience and business goals.",
    details: [
      "Custom page architecture",
      "Responsive mobile-first development",
      "Modern animations and interactions",
      "SEO-friendly structure",
      "Performance-focused implementation",
    ],
    icon: Globe2,
    featured: true,
  },
  {
    number: "02",
    title: "Full-Stack Web Applications",
    shortTitle: "FULL STACK",
    category: "fullstack",
    description:
      "Complete web applications connecting polished frontend experiences with reliable backend systems and databases.",
    details: [
      "React / Next.js applications",
      "Node.js & Express backend",
      "Database integration",
      "Authentication systems",
      "REST API architecture",
    ],
    icon: Code2,
    featured: true,
  },
  {
    number: "03",
    title: "E-Commerce Development",
    shortTitle: "E-COMMERCE",
    category: "ecommerce",
    description:
      "Modern online stores built to make products easy to discover, understand and purchase.",
    details: [
      "Product catalogue",
      "Shopping cart experience",
      "Product filtering and search",
      "Customer authentication",
      "Order and checkout workflows",
    ],
    icon: Database,
    featured: true,
  },
  {
    number: "04",
    title: "Landing Page Development",
    shortTitle: "LANDING PAGE",
    category: "web",
    description:
      "High-impact landing pages built to communicate your value quickly and guide visitors toward action.",
    details: [
      "Conversion-focused layouts",
      "Strong visual hierarchy",
      "Responsive design",
      "CTA optimization",
      "Smooth micro-interactions",
    ],
    icon: Rocket,
  },
  {
    number: "05",
    title: "Business Websites",
    shortTitle: "BUSINESS WEB",
    category: "web",
    description:
      "Professional digital homes for businesses, startups, agencies, personal brands and local services.",
    details: [
      "Professional page structure",
      "Services and about sections",
      "Contact and inquiry flows",
      "Responsive experience",
      "Brand-focused presentation",
    ],
    icon: Layers3,
  },
  {
    number: "06",
    title: "React & Next.js Development",
    shortTitle: "REACT / NEXT",
    category: "ui",
    description:
      "Modern frontend development using reusable components, scalable architecture and polished interactions.",
    details: [
      "React component systems",
      "Next.js App Router",
      "Reusable UI architecture",
      "Dynamic pages",
      "Modern responsive interfaces",
    ],
    icon: MonitorSmartphone,
    featured: true,
  },
  {
    number: "07",
    title: "UI Implementation",
    shortTitle: "UI BUILD",
    category: "ui",
    description:
      "Turning designs, ideas or references into accurate, responsive and production-ready interfaces.",
    details: [
      "Pixel-conscious implementation",
      "Responsive layouts",
      "Interactive states",
      "Animation and transitions",
      "Clean component structure",
    ],
    icon: Palette,
  },
  {
    number: "08",
    title: "Dashboard Development",
    shortTitle: "DASHBOARDS",
    category: "ui",
    description:
      "Clean and functional dashboards for managing data, users, products, analytics and business workflows.",
    details: [
      "Admin interfaces",
      "Data visualization",
      "Tables and filters",
      "Responsive layouts",
      "Reusable dashboard components",
    ],
    icon: Layers3,
  },
  {
    number: "09",
    title: "REST API Development",
    shortTitle: "REST API",
    category: "backend",
    description:
      "Structured backend APIs that allow applications, databases and services to communicate reliably.",
    details: [
      "API route architecture",
      "Request and response handling",
      "CRUD operations",
      "Database connectivity",
      "Error handling",
    ],
    icon: Server,
  },
  {
    number: "10",
    title: "Authentication Systems",
    shortTitle: "AUTH",
    category: "backend",
    description:
      "Secure application access flows with login, registration, protected routes and role-based permissions.",
    details: [
      "Login and registration",
      "Protected routes",
      "User sessions",
      "Role-based access",
      "Authorization workflows",
    ],
    icon: Code2,
  },
  {
    number: "11",
    title: "API Integration",
    shortTitle: "API CONNECT",
    category: "backend",
    description:
      "Connecting your website or application with external APIs and third-party services.",
    details: [
      "Third-party API integration",
      "Frontend data fetching",
      "Loading and error states",
      "Data transformation",
      "API-driven interfaces",
    ],
    icon: Globe2,
  },
  {
    number: "12",
    title: "AI-Powered Web Features",
    shortTitle: "AI WEB",
    category: "ai",
    description:
      "Adding practical AI capabilities to websites and applications to create smarter digital experiences.",
    details: [
      "AI API integration",
      "AI-assisted workflows",
      "Intelligent web features",
      "Prompt-based functionality",
      "AI-enhanced user experiences",
    ],
    icon: Sparkles,
    featured: true,
  },
  {
    number: "13",
    title: "Website Bug Fixing",
    shortTitle: "BUG FIX",
    category: "support",
    description:
      "Diagnosing and fixing frontend, backend, responsive and functionality issues in existing projects.",
    details: [
      "UI and layout fixes",
      "React / Next.js debugging",
      "JavaScript errors",
      "Responsive issues",
      "Broken functionality",
    ],
    icon: Wrench,
  },
  {
    number: "14",
    title: "Performance Optimization",
    shortTitle: "OPTIMIZE",
    category: "support",
    description:
      "Improving the speed, responsiveness and overall quality of existing web applications.",
    details: [
      "Frontend optimization",
      "Rendering improvements",
      "Asset optimization",
      "Code cleanup",
      "Performance-focused fixes",
    ],
    icon: Rocket,
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") {
      return services;
    }

    return services.filter(
      (service) => service.category === activeCategory
    );
  }, [activeCategory]);

  const visibleServices = showAll
    ? filteredServices
    : filteredServices.slice(0, 8);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(
        height > 0 ? (scrollTop / height) * 100 : 0
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeService ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeService]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowAll(false);

    window.requestAnimationFrame(() => {
      document
        .getElementById("service-matrix")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  return (
    <main className="services-page">
      <div
        className="services-scroll-progress"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      />

      <div className="services-noise" aria-hidden="true" />
      <div className="services-grid-lines" aria-hidden="true" />

      <div
        className="services-orb services-orb-one"
        aria-hidden="true"
      />

      <div
        className="services-orb services-orb-two"
        aria-hidden="true"
      />

      {/* HERO */}

      <section className="services-hero">
        <div className="services-hero-top">
          <div className="services-eyebrow">
            <span className="services-eyebrow-dot" />
            <span>06 / SERVICES</span>
          </div>

          <div className="services-system-status">
            <span>AVAILABLE FOR PROJECTS</span>
            <span className="services-status-dot" />
          </div>
        </div>

        <div className="services-hero-content">
          <div className="services-hero-index">
            <span>FN</span>
            <span>2026</span>
          </div>

          <div className="services-title-area">
            <p className="services-kicker">
              DIGITAL PRODUCTS / WEB EXPERIENCES
            </p>

            <h1 className="services-title">
              <span>WHAT</span>
              <span className="services-title-accent">I BUILD.</span>
            </h1>

            <p className="services-hero-description">
              From high-converting websites to complete full-stack
              applications, I build modern digital experiences with
              thoughtful interfaces, reliable systems and clean
              engineering.
            </p>

            <div className="services-hero-actions">
             <a
  href="#service-matrix"
  className="group relative inline-flex min-h-[56px] w-full items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-7 py-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.025] hover:border-pink-300/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40 sm:w-fit sm:min-w-[200px]"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-10 left-1/2 h-24 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-xl opacity-0 transition-all duration-700 group-hover:bottom-[-5px] group-hover:opacity-100" />

  {/* Floating liquid bubble */}
  <span className="absolute bottom-[-20px] left-[15%] h-16 w-16 rounded-full bg-pink-300/70 blur-md opacity-0 transition-all duration-700 group-hover:bottom-[8px] group-hover:opacity-100" />

  <span className="relative z-10 flex items-center">
    <span className="font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
      EXPLORE SERVICES
    </span>

    <ArrowDown
      size={16}
      className="ml-3 text-white transition-all duration-500 group-hover:translate-y-1 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.95)]"
    />
  </span>
</a>
              <a href="/contact" className="services-secondary-button">
                <span>START A PROJECT</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="services-hero-bottom">
          <div className="services-mini-stat">
            <strong>14+</strong>
            <span>SERVICES</span>
          </div>

          <div className="services-mini-stat">
            <strong>FULL</strong>
            <span>STACK</span>
          </div>

          <div className="services-mini-stat">
            <strong>WEB</strong>
            <span>FOCUSED</span>
          </div>

          <div className="services-scroll-cue">
            <MousePointer2 size={13} />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      {/* INTRO */}

      <section className="services-intro">
        <div className="services-section-label">
          <span>01 / APPROACH</span>
          <div />
        </div>

        <div className="services-intro-grid">
          <h2>
            Not just a website.
            <span>A digital experience.</span>
          </h2>

          <div className="services-intro-copy">
            <p>
              Every project starts with understanding the goal behind
              the product. The result should not only look impressive —
              it should feel intentional, work smoothly and make sense
              for the people using it.
            </p>

            <div className="services-principles">
              <span>
                <Check size={13} />
                PURPOSEFUL
              </span>
              <span>
                <Check size={13} />
                RESPONSIVE
              </span>
              <span>
                <Check size={13} />
                SCALABLE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY NAV */}

      <section className="services-category-section">
        <div className="services-section-heading">
          <div>
            <span className="services-section-eyebrow">
              02 / SERVICE INDEX
            </span>

            <h2>
              Choose your
              <span>direction.</span>
            </h2>
          </div>

          <p>
            Explore the services I offer across frontend, full-stack,
            backend, e-commerce, AI and technical support.
          </p>
        </div>

        <div className="services-category-nav">
          {serviceCategories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.id}
                type="button"
                className={`services-category-button ${
                  activeCategory === category.id ? "is-active" : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="services-category-number">
                  {category.number}
                </span>

                <span className="services-category-icon">
                  <Icon size={15} />
                </span>

                <span>{category.label}</span>

                <ChevronRight size={14} />
              </button>
            );
          })}
        </div>
      </section>

      {/* SERVICE MATRIX */}

      <section
        className="services-matrix-section"
        id="service-matrix"
      >
        <div className="services-matrix-header">
          <div>
            <span className="services-section-eyebrow">
              03 / CAPABILITY MATRIX
            </span>

            <h2>
              Services
              <span>designed to ship.</span>
            </h2>
          </div>

          <div className="services-result-count">
            <span>SHOWING</span>
            <strong>
              {visibleServices.length.toString().padStart(2, "0")}
            </strong>
            <span>/</span>
            <span>
              {filteredServices.length.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="services-grid">
          {visibleServices.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className={`service-card ${
                  service.featured ? "is-featured" : ""
                }`}
                tabIndex={0}
                onClick={() => setActiveService(service)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    setActiveService(service);
                  }
                }}
              >
                <div className="service-card-glow" />

                <div className="service-card-top">
                  <span>{service.number}</span>

                  <span className="service-card-open">
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <div className="service-card-icon">
                  <Icon size={27} strokeWidth={1.5} />
                </div>

                <div className="service-card-content">
                  <span className="service-card-category">
                    {service.shortTitle}
                  </span>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </div>

                <div className="service-card-footer">
                  <span>VIEW DETAILS</span>
                  <ChevronRight size={14} />
                </div>
              </article>
            );
          })}
        </div>

        {filteredServices.length > 8 && (
          <button
            type="button"
            className="services-show-more"
            onClick={() => setShowAll((current) => !current)}
          >
            <span>
              {showAll
                ? "SHOW LESS"
                : `SHOW ${filteredServices.length - 8} MORE`}
            </span>

            {showAll ? (
              <ArrowDown
                size={16}
                style={{ transform: "rotate(180deg)" }}
              />
            ) : (
              <ArrowDown size={16} />
            )}
          </button>
        )}
      </section>

      {/* PROCESS */}

      <section className="services-process-section">
        <div className="services-section-heading">
          <div>
            <span className="services-section-eyebrow">
              04 / PROCESS
            </span>

            <h2>
              Simple process.
              <span>Serious results.</span>
            </h2>
          </div>

          <p>
            A focused workflow keeps the project clear from the first
            conversation to final delivery.
          </p>
        </div>

        <div className="services-process">
          {[
            {
              number: "01",
              title: "DISCOVER",
              text: "Understand the idea, goals, audience and technical requirements.",
            },
            {
              number: "02",
              title: "PLAN",
              text: "Define the structure, user flow, technology and development direction.",
            },
            {
              number: "03",
              title: "BUILD",
              text: "Develop the experience with clean code, responsive layouts and scalable components.",
            },
            {
              number: "04",
              title: "REFINE",
              text: "Test, debug, optimize and polish every important interaction.",
            },
            {
              number: "05",
              title: "LAUNCH",
              text: "Prepare the finished product for deployment and continued growth.",
            },
          ].map((step) => (
            <div className="services-process-item" key={step.number}>
              <span className="services-process-number">
                {step.number}
              </span>

              <div className="services-process-line" />

              <div className="services-process-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}

      <section className="services-why-section">
        <div className="services-section-label">
          <span>05 / WHY WORK TOGETHER</span>
          <div />
        </div>

        <div className="services-why-grid">
          <h2>
            Built with
            <span>intention.</span>
          </h2>

          <div className="services-why-list">
            <div>
              <span>01</span>
              <div>
                <h3>Modern Technology</h3>
                <p>
                  React, Next.js, TypeScript, Node.js and modern web
                  development practices.
                </p>
              </div>
            </div>

            <div>
              <span>02</span>
              <div>
                <h3>Design Meets Engineering</h3>
                <p>
                  Visual polish and technical quality are treated as
                  part of the same product.
                </p>
              </div>
            </div>

            <div>
              <span>03</span>
              <div>
                <h3>Responsive by Default</h3>
                <p>
                  The experience is designed to work beautifully across
                  phones, tablets and desktop screens.
                </p>
              </div>
            </div>

            <div>
              <span>04</span>
              <div>
                <h3>Clear Communication</h3>
                <p>
                  Straightforward collaboration, organized work and
                  transparent project progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="services-cta">
        <div className="services-cta-grid" />

        <div className="services-cta-content">
          <span className="services-section-eyebrow">
            06 / YOUR NEXT MOVE
          </span>

          <h2>
            Have a project
            <br />
            <span>in mind?</span>
          </h2>

          <p>
            Tell me what you are building. Let&apos;s turn the idea
            into a polished digital experience.
          </p>

          <a href="/contact" className="services-cta-button">
            <span>LET&apos;S WORK TOGETHER</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="services-cta-corner">
          <span>FN / 2026</span>
          <span>WEB ENGINEER</span>
        </div>
      </section>

      {/* MODAL */}

      {activeService && (
        <div
          className="service-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeService.title} details`}
          onClick={() => setActiveService(null)}
        >
          <div
            className="service-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="service-modal-close"
              onClick={() => setActiveService(null)}
              aria-label="Close service details"
            >
              <X size={19} />
            </button>

            <div className="service-modal-top">
              <span>{activeService.number}</span>

              <div className="service-modal-icon">
                {(() => {
                  const Icon = activeService.icon;

                  return (
                    <Icon
                      size={34}
                      strokeWidth={1.4}
                    />
                  );
                })()}
              </div>
            </div>

            <span className="services-section-eyebrow">
              {activeService.shortTitle}
            </span>

            <h2>{activeService.title}</h2>

            <p className="service-modal-description">
              {activeService.description}
            </p>

            <div className="service-modal-divider" />

            <div className="service-modal-includes">
              <span>WHAT&apos;S INCLUDED</span>

              <div>
                {activeService.details.map((detail) => (
                  <span key={detail}>
                    <Check size={13} />
                    {detail}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="/contact"
              className="service-modal-cta"
              onClick={() => setActiveService(null)}
            >
              <span>DISCUSS THIS SERVICE</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </main>
  );
}