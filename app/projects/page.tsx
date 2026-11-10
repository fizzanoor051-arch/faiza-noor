"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";

type Project = {
  title: string;
  kind: string;
  year: string;
  number: string;
  emoji: string;
  image: string;
  images: string[];
  description: string;
  overview: string;
  problem: string[];
  features: string[];
  solution: string[];
  value: string[];
  tags: string[];
  colors: [string, string];
  live: string;
  code: string;
  status?: string;
};

type Mode = "cover" | "bento" | "index";

type OfficeSkill = {
  title: string;
  category: string;
  description: string;
  features: string[];
  emoji: string;
  color: string;
};

const projects: Project[] = [
  {
    title: "NexaFlow AI",
    kind: "AI Operations Platform",
    year: "2026",
    number: "01",
    emoji: "✳",
    image: "/images/projects/nexaflow-ai/1.png",
    images: [
      "/images/projects/nexaflow-ai/1.png",
      "/images/projects/nexaflow-ai/3.png",
      "/images/projects/nexaflow-ai/5.png",
    ],
    description:
      "An AI-powered business operations platform that transforms everyday requests into structured workflows, leads, tasks and actionable insights.",
    overview:
      "NexaFlow AI is an intelligent business operations platform designed to bring workflows, conversations, leads, tasks and analytics into one unified workspace. It helps businesses turn unstructured requests into organized actions.",
    problem: [
      "Business requests and customer conversations can become scattered across different tools.",
      "Manually identifying customer intent and extracting useful information takes time.",
      "Leads and follow-up tasks can be difficult to organize consistently.",
      "Teams need a clearer view of workflow activity and operational progress.",
    ],
    features: [
      "AI-powered understanding of natural-language business requests",
      "Business intent classification and information extraction",
      "Lead creation and lead organization",
      "Task creation, assignment and follow-up tracking",
      "Suggested responses and actionable workflow steps",
      "Dashboard and analytics workspace",
      "Conversations, Workflows, Leads and Tasks sections",
    ],
    solution: [
      "Understand: interpret a business request and identify its intent.",
      "Decide: structure relevant information and suggest suitable next actions.",
      "Execute: turn the request into organized leads, tasks and workflows.",
      "Track: review activity and follow the progress of business operations.",
    ],
    value: [
      "Reduces repetitive manual organization.",
      "Helps teams structure incoming customer requests.",
      "Makes lead and task follow-ups easier to manage.",
      "Provides a unified view of business workflow activity.",
    ],
    tags: ["Next.js", "React", "TypeScript", "AI Integration", "Vercel"],
    colors: ["#7664ff", "#20d9d0"],
    live: "https://nexaflow-ai-by-faiza.vercel.app/",
    code: "https://github.com/fizzanoor051-arch/-Nexaflow-AI-by-FAIZA",
  },
  {
    title: "LUXORA STORE",
    kind: "E-commerce Experience",
    year: "2026",
    number: "02",
    emoji: "✧",
     image: "/images/projects/luxro-store/2.png",
    images: [
      "/images/projects/luxro-store/2.png",
      "/images/projects/luxro-store/3.png",
      "/images/projects/luxro-store/5.png",
"/images/projects/luxro-store/9.png",
      "/images/projects/luxro-store/7.png",
    ],
    description:
      "A premium e-commerce experience focused on elegant product discovery, modern visuals and a smooth online shopping journey.",
    overview:
      "LUXORA is a modern online store concept designed to make product discovery feel clean, intuitive and engaging. The experience focuses on presenting products through a polished storefront and organized shopping interface.",
    problem: [
      "Online stores need clear product presentation to help visitors explore collections.",
      "Unorganized product browsing can make shopping feel difficult.",
      "A consistent visual experience is important for building customer confidence.",
    ],
    features: [
      "Modern storefront and homepage experience",
      "Organized product collection and browsing",
      "Product-focused visual presentation",
      "Responsive layouts for different screen sizes",
      "Clean navigation and shopping interface",
    ],
    solution: [
      "Created a premium visual direction for the storefront.",
      "Organized the shopping experience around product discovery.",
      "Designed clear sections for collections and featured products.",
      "Focused on responsive presentation and straightforward navigation.",
    ],
    value: [
      "Gives an online store a more polished digital presence.",
      "Makes product collections easier to explore.",
      "Creates a more consistent shopping experience.",
    ],
    tags: ["React.js", "TypeScript", "Next.js", "E-commerce"],
    colors: ["#b58b61", "#e9d8bd"],
    live: "https://luxora-zuq4.vercel.app/",
    code: "https://github.com/fizzanoor051-arch/LUXORA",
  },
  {
    title: "SHOPSPHERE",
    kind: "E-commerce Platform",
    year: "2026",
    number: "03",
    emoji: "◈",
      image: "/images/projects/shopsphere/1.png",
    images: [
      "/images/projects/shopsphere/1.png",
      "/images/projects/shopsphere/2.png",
      "/images/projects/shopsphere/3.png",

      "/images/projects/luxro-store/7.png",
    ],
    description:
      "A modern e-commerce experience built around product discovery, clean navigation and reusable React components.",
    overview:
      "ShopSphere is an e-commerce project focused on presenting products through an organized and responsive shopping interface. It demonstrates modern frontend development and a structured approach to building an online store.",
    problem: [
      "Customers need a straightforward way to explore available products.",
      "A cluttered interface can make product discovery less convenient.",
      "Online shopping experiences need consistent layouts across devices.",
    ],
    features: [
      "Product-focused storefront",
      "Organized product browsing experience",
      "Clean navigation and interface structure",
      "Responsive page layouts",
      "Reusable React-based interface components",
    ],
    solution: [
      "Built a modern storefront with a clear visual hierarchy.",
      "Structured the interface around product discovery.",
      "Used reusable components to keep the interface consistent.",
      "Designed responsive layouts for different devices.",
    ],
    value: [
      "Provides a clear online shopping interface.",
      "Makes product browsing more organized.",
      "Demonstrates a reusable and maintainable frontend approach.",
    ],
    tags: ["React.js", "JavaScript", "Vite", "E-commerce"],
    colors: ["#3989ed", "#7c5cff"],
    live: "https://shopsphere-ecommerce-beta.vercel.app/",
    code: "https://github.com/fizzanoor051-arch/Shopsphere-ecommerce",
  },
  {
    title: "MEDICARE",
    kind: "Healthcare Platform",
    year: "2026",
    number: "04",
    emoji: "✚",
     image: "/images/projects/medicare/1.png",
    images: [
      "/images/projects/medicare/1.png",
      "/images/projects/medicare/2.png",
      "/images/projects/medicare/3.png",
        "/images/projects/medicare/4.png",
          "/images/projects/medicare/5.png",
        "/images/projects/medicare/6.png",

      "/images/projects/luxro-store/7.png",
    ],
    description:
      "A professional healthcare interface designed to make medical services, doctors and appointment information easier to explore.",
    overview:
      "Medicare is a healthcare website project focused on presenting medical services through a clean, accessible and organized interface. It gives visitors a clear starting point for exploring healthcare information.",
    problem: [
      "Healthcare websites need clear information architecture.",
      "Visitors should be able to understand available services without confusion.",
      "Medical interfaces should remain readable and usable across devices.",
    ],
    features: [
      "Healthcare-focused website interface",
      "Medical service presentation",
      "Organized page sections and navigation",
      "Responsive frontend layout",
      "Clean and accessible visual presentation",
    ],
    solution: [
      "Created a healthcare-oriented visual interface.",
      "Organized information into clear website sections.",
      "Focused on readable content and intuitive navigation.",
      "Adapted the layout for different screen sizes.",
    ],
    value: [
      "Gives healthcare services a professional online presence.",
      "Makes important information easier to browse.",
      "Provides a responsive interface for visitors.",
    ],
    tags: ["React.js", "JavaScript", "CSS", "Healthcare UI"],
    colors: ["#25a9a0", "#4c8cff"],
    live: "https://classy-vacherin-7a04fc.netlify.app/",
    code: "https://github.com/fizzanoor051-arch/hospital-react-project",
  },
  {
    title: "FAIZA NOOR",
    kind: "Personal Portfolio",
    year: "2025",
    number: "05",
    emoji: "✦",
        image: "/images/projects/portfolio/1.png",
    images: [
      "/images/projects/portfolio/1.png",
      "/images/projects/portfolio/2.png",
      "/images/projects/portfolio/4.png",
        "/images/projects/portfolio/5.png",
          "/images/projects/portfolio/6.png",
      

      
    ],
    description:
      "An earlier personal portfolio created to present development skills, projects and professional work through a dedicated website.",
    overview:
      "This earlier portfolio is a personal website project created to showcase web development work, technical skills and selected projects. It represents an earlier stage of the developer portfolio journey.",
    problem: [
      "Developers need a central place to present their work.",
      "Project links and technical skills should be easy to explore.",
      "A personal website helps communicate professional capabilities.",
    ],
    features: [
      "Personal developer introduction",
      "Project showcase",
      "Technical skills presentation",
      "Professional portfolio sections",
      "Direct project and contact navigation",
    ],
    solution: [
      "Created a dedicated online space for development work.",
      "Organized projects and skills into accessible sections.",
      "Used a personal visual identity to present the developer profile.",
    ],
    value: [
      "Creates a central place to explore previous work.",
      "Makes project discovery easier for visitors.",
      "Documents the evolution of the developer portfolio.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Portfolio"],
    colors: ["#9c65f5", "#e879b5"],
    live: "https://faiza-noor-portfolio.vercel.app/",
    code: "https://github.com/fizzanoor051-arch/Faiza-Noor-portfolio",
  },
];



// Featured project kept separate from the five selected projects below.
const paperowProject: Project = {
  title: "Paperow AI",
  kind: "AI Document Intelligence Platform",
  year: "2026",
  number: "FEATURED",
  emoji: "✳",
         image: "/images/projects/1.png",
    images: [
      "/images/projects/1.png",
   
    ],
  description:
    "An AI-powered document-to-data workspace that turns invoices, receipts and order messages into structured information that people can review, edit and export.",
  overview:
    "Paperow AI is an in-progress document intelligence platform focused on reducing repetitive business data entry. A user can upload a PDF or image, or paste document text. Paperow extracts useful fields into an organized table, then lets the user review and edit the results before exporting them as CSV. The goal is to make everyday document processing more organized for freelancers, small businesses and teams that work with business records.",
  problem: [
    "Freelancers and businesses often retype invoice, receipt and order details into spreadsheets.",
    "Important information can be scattered across PDFs, images and customer order messages.",
    "Manual entry takes time and can introduce avoidable typing mistakes.",
    "Extracted information needs a human review step before it is treated as an approved business record.",
  ],
  features: [
    "PDF, image and pasted-text input",
    "AI-powered extraction for invoices, receipts and order messages",
    "Structured extraction results in an editable review table",
    "Confidence indicators to help identify fields that may need attention",
    "Validation and checks for extracted values",
    "Saved document history with search and filters",
    "CSV export for spreadsheet workflows",
    "Dashboard statistics and follow-up task support",
  ],
  solution: [
    "Upload: accept a business document as a PDF, image or pasted text.",
    "Extract: use an AI-powered workflow to identify and structure relevant fields.",
    "Review: present extracted values in an editable table with confidence and validation cues.",
    "Approve: keep the user in control of checking the data before using it.",
    "Export: provide structured CSV data for use in spreadsheet-based workflows.",
    "Technology: Next.js 14 App Router, React, TypeScript, Tailwind CSS, MongoDB with Mongoose, NextAuth, Zod, Gemini API and Vitest.",
  ],
  value: [
    "Reduces repetitive copying of document details into spreadsheets.",
    "Makes business information easier to review and organize.",
    "Keeps a human approval step between AI extraction and exported data.",
    "Creates a practical starting point for more efficient document-processing workflows.",
    "Active development: bulk upload, privacy page, Google Sheets export, accounting-friendly CSV options and configurable data-retention improvements are still in progress.",
  ],
  tags: [
    "Next.js 14",
    "TypeScript",
    "Gemini AI",
    "MongoDB",
    "Zod",
    "Tailwind CSS",
  ],
  colors: ["#16b8a6", "#6478f5"],
  live: "https://paperow-ai.vercel.app/",
  code: "https://github.com/fizzanoor051-arch/paperow-ai",
  status: "IN PROGRESS",
};

const officeSkills: OfficeSkill[] = [
  {
    title: "Microsoft Word",
    category: "Document Creation & Formatting",
    description:
      "Professional document creation and formatting for business reports, proposals, resumes, letters and structured business documentation.",
    features: [
      "Business Reports & Proposals",
      "Professional Document Formatting",
      "Resume & Letter Layouts",
      "Tables, Headers & Page Design",
    ],
    emoji: "📄",
    color: "#3284e8",
  },
  {
    title: "Microsoft Excel",
    category: "Spreadsheets & Data Management",
    description:
      "Organized spreadsheets and data management using formulas, functions, charts and structured worksheets for business productivity.",
    features: [
      "Formulas & Functions",
      "Data Organization & Cleaning",
      "Charts & Data Visualization",
      "Reports & Pivot Tables",
    ],
    emoji: "📊",
    color: "#21a366",
  },
  {
    title: "Microsoft PowerPoint",
    category: "Presentations & Visual Communication",
    description:
      "Clear and engaging presentations for business proposals, project showcases, educational content and professional communication.",
    features: [
      "Business Presentations",
      "Pitch Deck Layouts",
      "Presentation Design",
      "Visual Storytelling",
    ],
    emoji: "📽️",
    color: "#e87535",
  },
  {
    title: "Microsoft Outlook",
    category: "Email & Productivity Management",
    description:
      "Organized email communication and productivity workflows using Outlook email, calendar scheduling and contact management features.",
    features: [
      "Professional Email Organization",
      "Calendar & Scheduling",
      "Contact Management",
      "Productivity Workflows",
    ],
    emoji: "✉️",
    color: "#1685d8",
  },
];

const modes: { id: Mode; label: string }[] = [
  { id: "cover", label: "3D Gallery" },
  { id: "bento", label: "Tilt Grid" },
  { id: "index", label: "Index + Preview" },
];

function ProjectCard({
  project,
  className = "",
  style,
  onClick,
  onMouseMove,
  onMouseLeave,
}: {
  project: Project;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  onMouseMove?: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <article
      className={`pj3d-card ${className}`}
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="pj3d-shot"
        style={
          {
            "--c1": project.colors[0],
            "--c2": project.colors[1],
          } as CSSProperties
        }
      >
        {project.image ? (
          <img
            className="pj3d-project-image"
            src={project.image}
            alt={`${project.title} project screenshot`}
            loading="lazy"
          />
        ) : (
          <div className="pj3d-placeholder">
            <span>{project.emoji}</span>
            <small>{project.title}</small>
          </div>
        )}

        <span className="pj3d-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="pj3d-body">
        <small>
          {project.kind} · {project.year}
        </small>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="pj3d-tags">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="pj3d-links">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo ↗
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub ↗
          </a>
        </div>

        <span className="pj3d-details-hint">Explore project details ↗</span>
      </div>
    </article>
  );
}

function OfficeCard({ skill }: { skill: OfficeSkill }) {
  return (
    <article className="pj3d-office-card">
      <div
        className="pj3d-office-icon"
        style={{ "--office-color": skill.color } as CSSProperties}
        aria-hidden="true"
      >
        {skill.emoji}
      </div>

      <div className="pj3d-office-content">
        <span className="pj3d-office-category">{skill.category}</span>
        <h4>{skill.title}</h4>
        <p>{skill.description}</p>

        <ul>
          {skill.features.map((feature) => (
            <li key={feature}>
              <span aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState(
    project.images[0] || "",
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.body.classList.add("pj3d-modal-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("pj3d-modal-open");
    };
  }, [onClose]);

  return (
    <div
      className="pj3d-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="pj3d-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pj3d-modal-title"
      >
        <button
          type="button"
          className="pj3d-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>

        <div className="pj3d-modal-top">
          <span className="pj3d-modal-eyebrow">
            {project.status ? `${project.status} · PROJECT CASE STUDY` : `PROJECT CASE STUDY · ${project.number}`}
          </span>
          <h2 id="pj3d-modal-title">{project.title}</h2>
          <p>{project.description}</p>

          <div className="pj3d-tags pj3d-modal-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        {project.images.length > 0 && (
          <div className="pj3d-gallery">
            <div className="pj3d-gallery-main">
              <img
                src={selectedImage}
                alt={`${project.title} interface preview`}
              />
            </div>

            <div className="pj3d-gallery-thumbs">
              {project.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={selectedImage === image ? "active" : ""}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View project screenshot ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pj3d-modal-content">
          <section className="pj3d-detail-section">
            <span className="pj3d-detail-label">01 / OVERVIEW</span>
            <h3>About the project</h3>
            <p>{project.overview}</p>
          </section>

          <section className="pj3d-detail-section">
            <span className="pj3d-detail-label">02 / THE CHALLENGE</span>
            <h3>Problems it addresses</h3>
            <ul>
              {project.problem.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pj3d-detail-section">
            <span className="pj3d-detail-label">03 / FEATURES</span>
            <h3>What it includes</h3>
            <div className="pj3d-feature-grid">
              {project.features.map((feature) => (
                <div className="pj3d-feature" key={feature}>
                  <span>✦</span>
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="pj3d-detail-section">
            <span className="pj3d-detail-label">04 / IMPLEMENTATION</span>
            <h3>How it was approached</h3>
            <ul>
              {project.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pj3d-detail-section">
            <span className="pj3d-detail-label">05 / PROJECT VALUE</span>
            <h3>Practical value</h3>
            <ul>
              {project.value.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="pj3d-modal-actions">
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            View Live Project <span>↗</span>
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary"
          >
            Explore GitHub <span>↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default function ProjectsShowcase() {
  const [mode, setMode] = useState<Mode>("cover");
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null,
  );

  const total = projects.length;

  const next = () => setCur((c) => (c + 1) % total);
  const prev = () => setCur((c) => (c - 1 + total) % total);

  const changeMode = (m: Mode) => {
    setMode(m);
    setCur(0);
  };

  useEffect(() => {
    if (mode !== "cover" || paused || selectedProject) return;

    const timer = window.setInterval(() => {
      setCur((current) => (current + 1) % total);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [mode, paused, total, selectedProject]);

  useEffect(() => {
    if (mode !== "cover") return;

    const onKey = (event: KeyboardEvent) => {
      if (selectedProject) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, selectedProject]);

  const tilt = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();

    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;

    el.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(14px)`;
  };

  const untilt = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="pj3d">
      <div className="pj3d-wrap">
        <div className="pj3d-eyebrow">✳ SELECTED WORK</div>

        <h2 className="pj3d-title">
          Projects that <span>shipped.</span>
        </h2>

        <p className="pj3d-sub">
          Explore selected web development projects, full-stack applications,
          AI-powered solutions and modern digital experiences. Each project
          demonstrates practical problem-solving, thoughtful design and
          development skills.
        </p>

        <button
          type="button"
          className="pj3d-paperow-feature"
          onClick={() => openProject(paperowProject)}
          aria-label="Explore the Paperow AI in-progress project case study"
        >
          <span className="pj3d-paperow-visual" aria-hidden="true">
            <span className="pj3d-paperow-orbit orbit-one" />
            <span className="pj3d-paperow-orbit orbit-two" />
            <span className="pj3d-paperow-doc doc-one">PDF</span>
            <span className="pj3d-paperow-doc doc-two">AI</span>
            <span className="pj3d-paperow-table">
              <i /><i /><i /><i /><i /><i />
            </span>
            <span className="pj3d-paperow-spark">✳</span>
          </span>
          <span className="pj3d-paperow-copy">
            <span className="pj3d-paperow-meta">
              <span>FEATURED PROJECT</span>
              <b>IN PROGRESS</b>
            </span>
            <strong>Paperow AI</strong>
            <span className="pj3d-paperow-kind">
              AI DOCUMENT INTELLIGENCE · 2026
            </span>
            <span className="pj3d-paperow-description">
              Turn invoices, receipts and order messages into structured,
              reviewable business data — then export it as CSV.
            </span>
            <span className="pj3d-paperow-tags">
              <i>Next.js</i><i>TypeScript</i><i>Gemini AI</i><i>MongoDB</i>
            </span>
            <span className="pj3d-paperow-action">
              Explore the project case study <b>↗</b>
            </span>
          </span>
        </button>

        <div className="pj3d-tabs" role="tablist" aria-label="Project layouts">
          {modes.map((m) => (
            <button
              type="button"
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              className={mode === m.id ? "on" : ""}
              onClick={() => changeMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {mode === "cover" && (
          <>
            <div
              className="pj3d-cover"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {projects.map((project, i) => {
                const d = i - cur;
                const a = Math.abs(d);

                return (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    className={d === 0 ? "act" : ""}
                    style={{
                      transform: `translateX(calc(-50% + ${d * 76}%)) translateZ(${
                        -a * 130
                      }px) rotateY(${-d * 28}deg)`,
                      zIndex: 10 - a,
                      opacity: a > 2 ? 0 : 1 - a * 0.25,
                      pointerEvents: a > 2 ? "none" : "auto",
                    }}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a")) return;
                      setCur(i);
                      openProject(project);
                    }}
                  />
                );
              })}
            </div>

            <div className="pj3d-ctrl">
              <button type="button" onClick={prev} aria-label="Previous project">
                ←
              </button>

              <span className="pj3d-counter">
                {String(cur + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <button type="button" onClick={next} aria-label="Next project">
                →
              </button>
            </div>
          </>
        )}

        {mode === "bento" && (
          <div className="pj3d-bento">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                style={{ animationDelay: `${i * 70}ms` }}
                onMouseMove={tilt}
                onMouseLeave={untilt}
                onClick={() => openProject(project)}
              />
            ))}
          </div>
        )}

        {mode === "index" && (
          <div className="pj3d-index">
            <div className="pj3d-rows">
              {projects.map((project, i) => (
                <button
                  type="button"
                  key={project.title}
                  className={`pj3d-row ${i === cur ? "on" : ""}`}
                  onMouseEnter={() => setCur(i)}
                  onFocus={() => setCur(i)}
                  onClick={() => {
                    setCur(i);
                    openProject(project);
                  }}
                >
                  <small>{project.number}</small>
                  <b>{project.title}</b>
                  <small>{project.kind}</small>
                </button>
              ))}
            </div>

            <div className="pj3d-preview" aria-live="polite">
              <ProjectCard
                key={projects[cur].title}
                project={projects[cur]}
                className="pj3d-flip"
                onClick={() => openProject(projects[cur])}
              />
            </div>
          </div>
        )}

        <section className="pj3d-office" aria-labelledby="pj3d-office-title">
          <div className="pj3d-office-heading">
            <span className="pj3d-office-eyebrow">
              ✳ ADDITIONAL EXPERTISE
            </span>

            <h3 id="pj3d-office-title">
              Microsoft Office & <span>Productivity Tools.</span>
            </h3>

            <p>
              Beyond web development, I also work with Microsoft Office
              applications to create professional business documents,
              organized spreadsheets, data reports and engaging presentations.
              Explore my additional skills in Microsoft Word, Excel, PowerPoint
              and Outlook for business documentation, data management and
              everyday productivity workflows.
            </p>
          </div>

          <div className="pj3d-office-grid">
            {officeSkills.map((skill) => (
              <OfficeCard key={skill.title} skill={skill} />
            ))}
          </div>

          <div className="pj3d-office-note">
            <span aria-hidden="true">✦</span>
            <p>
              Combining technical development skills with business
              productivity tools to support organized workflows, clear
              communication and professional digital solutions.
            </p>
          </div>
        </section>
      </div>

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style jsx global>{`
        .pj3d {
          --pj-bg: #07080f;
          --pj-solid: #121423;
          --pj-tx: #eef0ff;
          --pj-mut: #9aa0c3;
          --pj-bd: rgba(255, 255, 255, 0.12);
          --pj-a: #7c5cff;
          --pj-b: #22d3ee;
          position: relative;
          overflow: hidden;
          background: var(--pj-bg);
          color: var(--pj-tx);
          scroll-margin-top: 110px;
        }

        .pj3d::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              600px 400px at 15% 5%,
              rgba(124, 92, 255, 0.2),
              transparent
            ),
            radial-gradient(
              600px 400px at 90% 70%,
              rgba(34, 211, 238, 0.15),
              transparent
            );
          pointer-events: none;
        }

        .pj3d-wrap {
          position: relative;
          max-width: 1200px;
          margin: auto;
          padding: clamp(115px, 13vw, 145px) 20px 80px;
        }

        .pj3d-eyebrow {
          color: var(--pj-b);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.25em;
        }

        .pj3d-title {
          margin: 12px 0;
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.05;
        }

        .pj3d-title span,
        .pj3d-office-heading h3 span {
          background: linear-gradient(90deg, var(--pj-a), var(--pj-b));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .pj3d-sub {
          max-width: 680px;
          color: var(--pj-mut);
          line-height: 1.7;
        }

        .pj3d-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 28px 0 10px;
        }

        .pj3d-tabs button {
          padding: 9px 16px;
          border: 1px solid var(--pj-bd);
          border-radius: 999px;
          background: var(--pj-solid);
          color: var(--pj-mut);
          font: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: 0.25s;
        }

        .pj3d-tabs button.on {
          border-color: var(--pj-a);
          color: var(--pj-tx);
          box-shadow: 0 0 24px rgba(124, 92, 255, 0.35);
        }

        .pj3d-paperow-feature:focus-visible,
        .pj3d-tabs button:focus-visible,
        .pj3d-ctrl button:focus-visible,
        .pj3d-row:focus-visible,
        .pj3d-links a:focus-visible,
        .pj3d-modal button:focus-visible {
          outline: 2px solid var(--pj-b);
          outline-offset: 3px;
        }

        /* FEATURED PAPEROW AI PROJECT */
        .pj3d-paperow-feature {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
          align-items: stretch;
          width: 100%;
          min-height: 285px;
          margin: 28px 0 30px;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(34, 211, 238, 0.28);
          border-radius: 24px;
          background:
            radial-gradient(500px 280px at 0% 0%, rgba(22, 184, 166, 0.14), transparent),
            linear-gradient(120deg, #111b2a, #111323 68%);
          color: var(--pj-tx);
          text-align: left;
          cursor: pointer;
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.22);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .pj3d-paperow-feature:hover {
          transform: translateY(-5px);
          border-color: rgba(34, 211, 238, 0.65);
          box-shadow: 0 28px 75px rgba(22, 184, 166, 0.12);
        }

        .pj3d-paperow-visual {
          position: relative;
          display: grid;
          min-height: 285px;
          place-items: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 48% 48%, rgba(34, 211, 238, 0.15), transparent 43%),
            linear-gradient(135deg, rgba(22, 184, 166, 0.13), rgba(100, 120, 245, 0.12));
        }

        .pj3d-paperow-orbit {
          position: absolute;
          width: 245px;
          height: 245px;
          border: 1px solid rgba(133, 225, 225, 0.19);
          border-radius: 50%;
        }

        .pj3d-paperow-orbit.orbit-two {
          width: 185px;
          height: 185px;
          border-style: dashed;
          transform: rotateX(62deg) rotateZ(-25deg);
        }

        .pj3d-paperow-doc {
          position: absolute;
          z-index: 2;
          display: grid;
          width: 78px;
          height: 96px;
          place-items: center;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 13px;
          background: linear-gradient(145deg, #263b51, #172338);
          color: #dffbff;
          font-size: 17px;
          font-weight: 800;
          box-shadow: 0 18px 38px #0005;
        }

        .pj3d-paperow-doc.doc-one {
          transform: translate(-68px, -18px) rotate(-12deg);
        }

        .pj3d-paperow-doc.doc-two {
          transform: translate(66px, 20px) rotate(11deg);
          background: linear-gradient(145deg, #334b75, #202b4b);
          color: #b9c7ff;
        }

        .pj3d-paperow-table {
          position: absolute;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          width: 112px;
          padding: 12px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 12px;
          background: rgba(10, 17, 31, .94);
          box-shadow: 0 18px 45px #0008;
          transform: translate(0, 78px);
        }

        .pj3d-paperow-table i {
          height: 5px;
          border-radius: 5px;
          background: linear-gradient(90deg, #29d5c2, #758bff);
          opacity: .8;
        }

        .pj3d-paperow-spark {
          position: absolute;
          top: 24px;
          right: 28px;
          color: #5de7d5;
          font-size: 28px;
          filter: drop-shadow(0 0 15px #2dd4bf88);
        }

        .pj3d-paperow-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: clamp(24px, 4vw, 42px);
        }

        .pj3d-paperow-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 17px;
          color: #7ce8df;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .16em;
        }

        .pj3d-paperow-meta b {
          padding: 6px 9px;
          border: 1px solid rgba(45, 212, 191, .3);
          border-radius: 999px;
          background: rgba(45, 212, 191, .09);
          color: #79eadb;
          letter-spacing: .08em;
        }

        .pj3d-paperow-copy > strong {
          font-size: clamp(30px, 4vw, 43px);
          letter-spacing: -.045em;
        }

        .pj3d-paperow-kind {
          margin-top: 8px;
          color: #8d9dbb;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        .pj3d-paperow-description {
          max-width: 460px;
          margin-top: 17px;
          color: var(--pj-mut);
          font-size: 13px;
          line-height: 1.8;
        }

        .pj3d-paperow-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 18px;
        }

        .pj3d-paperow-tags i {
          padding: 6px 9px;
          border: 1px solid var(--pj-bd);
          border-radius: 999px;
          color: #c5d2e8;
          font-size: 10px;
          font-style: normal;
        }

        .pj3d-paperow-action {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 22px;
          color: #8eece2;
          font-size: 12px;
          font-weight: 700;
        }

        .pj3d-paperow-action b {
          font-size: 17px;
        }

        /* Keep the navigation from overlapping the open case study modal. */
        body.pj3d-modal-open header,
        body.pj3d-modal-open nav,
        body.pj3d-modal-open [role="navigation"] {
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .pj3d-card {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
          align-items: stretch;
          overflow: hidden;
          border: 1px solid var(--pj-bd);
          border-radius: 22px;
          background: var(--pj-solid);
          transition:
            border-color 0.3s,
            box-shadow 0.3s;
        }

        .pj3d-shot {
          position: relative;
          height: 100%;
          min-height: 245px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--c1), var(--c2));
        }

        .pj3d-project-image {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .pj3d-card:hover .pj3d-project-image {
          transform: scale(1.04);
        }

        .pj3d-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background:
            radial-gradient(circle at 50% 35%, #ffffff24, transparent 45%),
            linear-gradient(135deg, var(--c1), var(--c2));
        }

        .pj3d-placeholder span {
          font-size: 52px;
          filter: drop-shadow(0 8px 18px #0005);
        }

        .pj3d-placeholder small {
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-shadow: 0 2px 8px #0008;
        }

        .pj3d-dots {
          position: absolute;
          top: 13px;
          left: 14px;
          z-index: 1;
          display: flex;
          gap: 5px;
        }

        .pj3d-dots i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
        }

        .pj3d-body {
          padding: 19px;
        }

        .pj3d-body > small {
          color: var(--pj-b);
          font-size: 11px;
          font-weight: 600;
        }

        .pj3d-body h3 {
          margin: 8px 0;
          font-size: 20px;
        }

        .pj3d-body p {
          margin: 0 0 14px;
          color: var(--pj-mut);
          font-size: 13px;
          line-height: 1.65;
        }

        .pj3d-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .pj3d-tags span {
          padding: 5px 9px;
          border: 1px solid var(--pj-bd);
          border-radius: 999px;
          color: var(--pj-mut);
          font-size: 10px;
        }

        .pj3d-links {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }

        .pj3d-links a {
          border-bottom: 1px solid var(--pj-b);
          color: var(--pj-tx);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
        }

        .pj3d-details-hint {
          display: block;
          margin-top: 14px;
          color: #a99aff;
          font-size: 11px;
          letter-spacing: 0.03em;
        }

        .pj3d-cover {
          position: relative;
          height: 465px;
          margin-top: 22px;
          perspective: 1400px;
          transform-style: preserve-3d;
        }

        .pj3d-cover .pj3d-card {
          position: absolute;
          top: 35px;
          left: 50%;
          width: min(620px, 72vw);
          min-height: 285px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition:
            transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 0.6s,
            border-color 0.3s,
            box-shadow 0.3s;
        }

        .pj3d-cover .pj3d-card.act {
          border-color: var(--pj-a);
          box-shadow:
            0 0 40px rgba(124, 92, 255, 0.3),
            0 25px 60px rgba(0, 0, 0, 0.3);
        }

        .pj3d-cover .pj3d-card.act .pj3d-shot {
          height: auto;
          min-height: 285px;
        }

        .pj3d-ctrl {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 0;
        }

        .pj3d-ctrl button {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid var(--pj-bd);
          border-radius: 50%;
          background: var(--pj-solid);
          color: var(--pj-tx);
          font-size: 19px;
          cursor: pointer;
          transition: 0.25s;
        }

        .pj3d-ctrl button:hover {
          border-color: var(--pj-b);
          background: rgba(34, 211, 238, 0.1);
          transform: scale(1.06);
        }

        .pj3d-counter {
          color: var(--pj-mut);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .pj3d-bento {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 25px;
          perspective: 1000px;
        }

        .pj3d-bento .pj3d-card {
          cursor: pointer;
          transform-style: preserve-3d;
          transition:
            transform 0.15s ease-out,
            border-color 0.3s;
          animation: pj3d-in 0.6s both;
        }

        .pj3d-bento .pj3d-card:first-child {
          grid-column: span 2;
        }

        .pj3d-bento .pj3d-card:first-child .pj3d-shot {
          min-height: 270px;
        }

        .pj3d-bento .pj3d-card:hover {
          border-color: var(--pj-b);
        }

        .pj3d-index {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          align-items: start;
          gap: 28px;
          margin-top: 25px;
        }

        .pj3d-rows {
          display: grid;
        }

        .pj3d-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 8px;
          border: 0;
          border-bottom: 1px solid var(--pj-bd);
          background: none;
          color: var(--pj-mut);
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: 0.3s;
        }

        .pj3d-row b {
          flex: 1;
          font-size: clamp(18px, 2.5vw, 27px);
          color: inherit;
          transition: 0.3s;
        }

        .pj3d-row small {
          font-size: 11px;
        }

        .pj3d-row.on {
          padding-left: 22px;
          color: var(--pj-tx);
        }

        .pj3d-row.on b {
          background: linear-gradient(90deg, var(--pj-a), var(--pj-b));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .pj3d-preview {
          position: sticky;
          top: 30px;
          perspective: 900px;
        }

        .pj3d-preview .pj3d-card {
          cursor: pointer;
        }

        .pj3d-flip {
          animation: pj3d-flip 0.6s both;
        }

        /* PROJECT DETAILS MODAL */

        .pj3d-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          overflow-y: auto;
          background: rgba(3, 4, 12, 0.86);
          backdrop-filter: blur(14px);
          animation: pj3d-modal-fade 0.25s ease both;
        }

        .pj3d-modal {
          position: relative;
          width: min(900px, 100%);
          max-height: min(90vh, 950px);
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 23px;
          background:
            radial-gradient(
              500px 260px at 0% 0%,
              rgba(124, 92, 255, 0.14),
              transparent
            ),
            #10121f;
          box-shadow: 0 30px 100px #0009;
          scrollbar-width: thin;
          scrollbar-color: #6252a5 #111;
          animation: pj3d-modal-up 0.35s ease both;
        }

        .pj3d-modal-close {
          position: sticky;
          top: 13px;
          float: right;
          z-index: 5;
          display: grid;
          width: 39px;
          height: 39px;
          margin: 13px 13px -52px 0;
          place-items: center;
          border: 1px solid var(--pj-bd);
          border-radius: 50%;
          background: #171a2b;
          color: #fff;
          font-size: 25px;
          cursor: pointer;
        }

        .pj3d-modal-top {
          padding: 38px 38px 25px;
        }

        .pj3d-modal-eyebrow,
        .pj3d-detail-label {
          color: var(--pj-b);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        .pj3d-modal-top h2 {
          margin: 13px 0 10px;
          font-size: clamp(30px, 5vw, 48px);
          letter-spacing: -0.04em;
        }

        .pj3d-modal-top > p {
          max-width: 700px;
          color: var(--pj-mut);
          font-size: 14px;
          line-height: 1.8;
        }

        .pj3d-modal-tags {
          margin-top: 18px;
        }

        .pj3d-gallery {
          padding: 0 38px 25px;
        }

        .pj3d-gallery-main {
          height: 390px;
          overflow: hidden;
          border: 1px solid var(--pj-bd);
          border-radius: 15px;
          background: #090b15;
        }

        .pj3d-gallery-main img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .pj3d-gallery-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .pj3d-gallery-thumbs button {
          width: 105px;
          height: 68px;
          padding: 0;
          overflow: hidden;
          border: 1px solid var(--pj-bd);
          border-radius: 9px;
          background: #090b15;
          opacity: 0.65;
          cursor: pointer;
        }

        .pj3d-gallery-thumbs button.active {
          border-color: var(--pj-b);
          opacity: 1;
        }

        .pj3d-gallery-thumbs img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pj3d-modal-content {
          display: grid;
          gap: 0;
          padding: 0 38px;
        }

        .pj3d-detail-section {
          padding: 25px 0;
          border-top: 1px solid var(--pj-bd);
        }

        .pj3d-detail-section h3 {
          margin: 9px 0 13px;
          color: var(--pj-tx);
          font-size: 22px;
        }

        .pj3d-detail-section > p,
        .pj3d-detail-section li {
          color: var(--pj-mut);
          font-size: 13px;
          line-height: 1.8;
        }

        .pj3d-detail-section ul {
          display: grid;
          gap: 8px;
          margin: 0;
          padding-left: 20px;
        }

        .pj3d-detail-section li::marker {
          color: var(--pj-b);
        }

        .pj3d-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .pj3d-feature {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 13px;
          border: 1px solid var(--pj-bd);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.025);
          color: #d6d9ec;
          font-size: 12px;
          line-height: 1.6;
        }

        .pj3d-feature span {
          color: var(--pj-b);
        }

        .pj3d-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 25px 38px 35px;
          border-top: 1px solid var(--pj-bd);
        }

        .pj3d-modal-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 18px;
          border: 1px solid transparent;
          border-radius: 9px;
          background: linear-gradient(100deg, #7657ed, #258dca);
          color: white;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: 0.25s;
        }

        .pj3d-modal-actions a:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px #7657ed44;
        }

        .pj3d-modal-actions a.secondary {
          border-color: var(--pj-bd);
          background: #191c2d;
          color: var(--pj-tx);
        }

        /* MICROSOFT OFFICE */

        .pj3d-office {
          position: relative;
          margin-top: 105px;
          padding-top: 65px;
          border-top: 1px solid var(--pj-bd);
        }

        .pj3d-office-heading {
          max-width: 760px;
          margin-bottom: 34px;
        }

        .pj3d-office-eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          color: var(--pj-b);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.24em;
        }

        .pj3d-office-heading h3 {
          margin: 0 0 16px;
          font-size: clamp(29px, 4.5vw, 46px);
          line-height: 1.15;
          letter-spacing: -0.035em;
        }

        .pj3d-office-heading p {
          max-width: 700px;
          margin: 0;
          color: var(--pj-mut);
          font-size: 14px;
          line-height: 1.85;
        }

        .pj3d-office-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .pj3d-office-card {
          display: flex;
          align-items: flex-start;
          gap: 17px;
          min-width: 0;
          padding: 23px;
          border: 1px solid var(--pj-bd);
          border-radius: 17px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.045),
            rgba(255, 255, 255, 0.012)
          );
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .pj3d-office-card:hover {
          transform: translateY(-5px);
          border-color: rgba(34, 211, 238, 0.45);
          background: rgba(255, 255, 255, 0.055);
          box-shadow: 0 16px 38px rgba(0, 0, 0, 0.2);
        }

        .pj3d-office-icon {
          display: grid;
          flex: 0 0 49px;
          width: 49px;
          height: 49px;
          place-items: center;
          border: 1px solid
            color-mix(in srgb, var(--office-color), transparent 60%);
          border-radius: 13px;
          background: color-mix(
            in srgb,
            var(--office-color),
            transparent 88%
          );
          font-size: 23px;
        }

        .pj3d-office-content {
          min-width: 0;
        }

        .pj3d-office-category {
          display: block;
          margin: 2px 0 7px;
          color: var(--pj-b);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.11em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .pj3d-office-content h4 {
          margin: 0 0 9px;
          color: var(--pj-tx);
          font-size: 19px;
          font-weight: 700;
        }

        .pj3d-office-content p {
          margin: 0 0 15px;
          color: var(--pj-mut);
          font-size: 12px;
          line-height: 1.75;
        }

        .pj3d-office-content ul {
          display: grid;
          gap: 9px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .pj3d-office-content li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #c8cce0;
          font-size: 11px;
          line-height: 1.5;
        }

        .pj3d-office-content li span {
          color: var(--pj-b);
          font-size: 12px;
          font-weight: 800;
        }

        .pj3d-office-note {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-top: 23px;
          padding: 18px 20px;
          border: 1px solid rgba(124, 92, 255, 0.22);
          border-radius: 13px;
          background: rgba(124, 92, 255, 0.055);
        }

        .pj3d-office-note > span {
          color: #a78bfa;
          font-size: 18px;
        }

        .pj3d-office-note p {
          margin: 0;
          color: var(--pj-mut);
          font-size: 12px;
          line-height: 1.8;
        }

        @keyframes pj3d-in {
          from {
            opacity: 0;
            transform: translateY(24px) rotateX(-25deg);
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pj3d-flip {
          from {
            opacity: 0;
            transform: rotateY(-35deg) translateX(30px);
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pj3d-modal-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pj3d-modal-up {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 900px) {
          .pj3d-cover .pj3d-card {
            width: min(560px, 76vw);
          }

          .pj3d-wrap {
            max-width: 100%;
          }

          .pj3d-cover {
            height: 445px;
          }

          .pj3d-cover .pj3d-card {
            width: min(540px, 78vw);
          }

          .pj3d-cover .pj3d-card.act .pj3d-shot {
            min-height: 245px;
          }

          .pj3d-bento {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pj3d-bento .pj3d-card:first-child {
            grid-column: span 2;
          }
        }

        @media (max-width: 760px) {
          .pj3d-paperow-feature {
            grid-template-columns: 1fr;
          }

          .pj3d-paperow-visual {
            min-height: 220px;
          }

          .pj3d-paperow-copy {
            padding: 25px 22px;
          }

          .pj3d-card {
            grid-template-columns: 1fr;
          }

          .pj3d-shot {
            height: 190px;
            min-height: 190px;
          }

          .pj3d-cover .pj3d-card {
            width: min(390px, 78vw);
          }

          .pj3d-cover .pj3d-card.act .pj3d-shot {
            height: 180px;
            min-height: 180px;
          }

          .pj3d-wrap {
            padding-top: 105px;
            padding-bottom: 60px;
          }

          .pj3d-bento {
            grid-template-columns: 1fr;
          }

          .pj3d-bento .pj3d-card:first-child {
            grid-column: auto;
          }

          .pj3d-index {
            grid-template-columns: 1fr;
          }

          .pj3d-preview {
            position: static;
          }

          .pj3d-cover {
            height: 440px;
            perspective: 1100px;
          }

          .pj3d-cover .pj3d-card {
            width: min(360px, 82vw);
          }

          .pj3d-cover .pj3d-card.act .pj3d-shot {
            height: 170px;
            min-height: 170px;
          }

          .pj3d-shot {
            height: 170px;
            min-height: 170px;
          }

          .pj3d-body {
            padding: 16px;
          }

          .pj3d-body h3 {
            font-size: 19px;
          }

          .pj3d-body p {
            font-size: 13px;
          }

          .pj3d-office {
            margin-top: 75px;
            padding-top: 45px;
          }

          .pj3d-office-grid {
            grid-template-columns: 1fr;
          }

          .pj3d-office-card {
            padding: 19px;
          }

          .pj3d-modal-backdrop {
            align-items: flex-start;
            padding: 12px;
          }

          .pj3d-modal {
            max-height: 94vh;
            border-radius: 17px;
          }

          .pj3d-modal-top {
            padding: 30px 20px 20px;
          }

          .pj3d-gallery {
            padding: 0 20px 20px;
          }

          .pj3d-gallery-main {
            height: 240px;
          }

          .pj3d-modal-content {
            padding: 0 20px;
          }

          .pj3d-modal-actions {
            padding: 20px;
          }

          .pj3d-feature-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 420px) {
          .pj3d-wrap {
            padding-right: 15px;
            padding-left: 15px;
          }

          .pj3d-cover {
            height: 420px;
          }

          .pj3d-cover .pj3d-card {
            width: min(340px, 84vw);
          }

          .pj3d-cover .pj3d-card.act .pj3d-shot {
            height: 165px;
          }

          .pj3d-cover .pj3d-card.act .pj3d-body {
            padding: 15px;
          }

          .pj3d-office-card {
            gap: 12px;
            padding: 16px;
          }

          .pj3d-office-icon {
            flex-basis: 42px;
            width: 42px;
            height: 42px;
            font-size: 20px;
          }

          .pj3d-office-heading h3 {
            font-size: 30px;
          }

          .pj3d-office-note {
            padding: 15px;
          }

          .pj3d-gallery-main {
            height: 190px;
          }

          .pj3d-gallery-thumbs button {
            width: 78px;
            height: 55px;
          }

          .pj3d-modal-actions {
            flex-direction: column;
          }

          .pj3d-modal-actions a {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pj3d *,
          .pj3d *::before,
          .pj3d *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}