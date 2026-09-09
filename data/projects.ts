export type ProjectCategory =
  | "Full-Stack"
  | "Web Application"
  | "Frontend";

export type ProjectStatus =
  | "BUILDING"
  | "ACTIVE"
  | "EXPERIMENTAL";

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;

  tagline: string;
  description: string;

  problem: string;
  solution: string;
  role: string;

  stack: string[];
  features: string[];

  metrics: {
    label: string;
    value: string;
  }[];

  color: string;
  featured: boolean;
  slug: string;

  // Project media
  screenshots: string[];
  video: string;

  // Project links
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  // =========================================================
  // 01 — LUXRO STORE
  // =========================================================
  {
    id: "Luxora-store",
    title: "Luxora Store",
    shortTitle: "Luxora",
    category: "Full-Stack",
    year: "2026",
    status: "ACTIVE",

    tagline:
      "A premium ecommerce experience engineered for modern digital commerce.",

    description:
      "Luxora Store is a premium ecommerce experience focused on product discovery, visual presentation, responsive interactions, and a polished shopping journey.",

    problem:
      "Modern ecommerce products need to balance strong visual identity with intuitive navigation, fast product discovery, and a frictionless shopping experience.",

    solution:
      "Luxora Store combines a premium interface with reusable product experiences, structured navigation, responsive layouts, and an architecture designed for scalable ecommerce functionality.",

    role:
      "Full-Stack Development / UI Engineering",

    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
    ],

    features: [
      "Premium ecommerce interface",
      "Product discovery experience",
      "Responsive product layouts",
      "Reusable UI architecture",
      "Shopping experience",
      "Modern navigation system",
      "Scalable application structure",
    ],

    metrics: [
      {
        label: "Experience",
        value: "Premium",
      },
      {
        label: "Architecture",
        value: "Scalable",
      },
      {
        label: "Status",
        value: "Active",
      },
    ],

    color: "violet",
    featured: true,
    slug: "luxro-store",

    screenshots: [
      "/images/projects/luxora/1.png",
      "/images/projects/luxora/2.png",
      "/images/projects/luxora/3.png",
      "/images/projects/luxora/4.png",
      "/images/projects/luxora/5.png",
      "/images/projects/luxora/6.png",
      "/images/projects/luxora/7.png",
      "/images/projects/luxora/8.png",
      "/images/projects/luxora/9.png",
      "/images/projects/luxora/12.png",
    ],

    video:
      "public/videos/projects/LUXORA _ Premium AI-Powered Shopping - Google Chrome 2026-09-09 09-00-36.mp4",

    liveUrl: "https://luxora-zuq4.vercel.app/",
    githubUrl: "https://github.com/fizzanoor051-arch/LUXORA.git",
  },

  // =========================================================
  // 02 — SHOPSPHERE
  // =========================================================
  {
    id: "shopsphere",
    title: "ShopSphere",
    shortTitle: "ShopSphere",
    category: "Full-Stack",
    year: "2026",
    status: "BUILDING",

    tagline:
      "A modern commerce experience built for scale.",

    description:
      "A modern ecommerce interface focused on clean product discovery, reusable components, smooth navigation, and a foundation ready for full-stack expansion.",

    problem:
      "Ecommerce interfaces can quickly become difficult to maintain when product views, navigation, cart interactions, and authentication are tightly coupled.",

    solution:
      "ShopSphere separates the interface into reusable components and routes while keeping the architecture ready for APIs, authentication, product data, and backend services.",

    role:
      "Frontend / Full-Stack Development",

    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "React Router",
      "Node.js",
      "REST APIs",
    ],

    features: [
      "Responsive ecommerce interface",
      "Reusable product components",
      "Product browsing experience",
      "Shopping cart flow",
      "Authentication-ready architecture",
      "Scalable route structure",
    ],

    metrics: [
      {
        label: "Architecture",
        value: "Modular",
      },
      {
        label: "Focus",
        value: "UX",
      },
      {
        label: "Status",
        value: "Building",
      },
    ],

    color: "violet",
    featured: true,
    slug: "shopsphere",

    screenshots: [
      "/images/projects/shopsphere/01-home.png",
      "/images/projects/shopsphere/02-shop.png",
      "/images/projects/shopsphere/03-product.png",
      "/images/projects/shopsphere/04-cart.png",
      "/images/projects/shopsphere/05-login.png",
    ],

    video:
      "/videos/projects/shopsphere-demo.mp4",

    liveUrl: "",
    githubUrl: "",
  },

  // =========================================================
  // 03 — MODERN HOSPITAL
  // =========================================================
  {
    id: "modern-hospital",
    title: "Modern Hospital",
    shortTitle: "Hospital",
    category: "Web Application",
    year: "2026",
    status: "BUILDING",

    tagline:
      "A digital healthcare experience designed around clarity.",

    description:
      "A professional healthcare web application concept combining hospital information, departments, doctors, services, appointments, emergency access, and patient-focused navigation.",

    problem:
      "Healthcare websites often contain large amounts of information without providing a clear path for patients to find the right service or take action.",

    solution:
      "The project organizes information into focused sections and reusable interfaces, creating a clearer experience for discovering doctors, departments, services, and appointment flows.",

    role:
      "Frontend / Application Development",

    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "REST APIs",
      "Responsive UI",
    ],

    features: [
      "Doctor directory",
      "Department discovery",
      "Appointment flow",
      "Emergency access",
      "Healthcare services",
      "Responsive interface",
    ],

    metrics: [
      {
        label: "Architecture",
        value: "Component-based",
      },
      {
        label: "Priority",
        value: "Clarity",
      },
      {
        label: "Status",
        value: "Building",
      },
    ],

    color: "cyan",
    featured: true,
    slug: "modern-hospital",

    screenshots: [
      "/images/projects/hospital/01-home.png",
      "/images/projects/hospital/02-doctors.png",
      "/images/projects/hospital/03-departments.png",
      "/images/projects/hospital/04-appointment.png",
      "/images/projects/hospital/05-services.png",
    ],

    video:
      "/videos/projects/hospital-demo.mp4",

    liveUrl: "",
    githubUrl: "",
  },

  // =========================================================
  // 04 — FAIZA NOOR PORTFOLIO
  // =========================================================
  {
    id: "faiza-noor-portfolio",
    title: "Faiza Noor Portfolio",
    shortTitle: "Portfolio",
    category: "Frontend",
    year: "2026",
    status: "ACTIVE",

    tagline:
      "An interactive engineering portfolio built as a digital system.",

    description:
      "A premium interactive portfolio designed to present development work, technical thinking, experiments, services, and engineering capabilities through a distinctive digital experience.",

    problem:
      "Traditional portfolios often present skills and projects as static lists without communicating how a developer thinks, builds, and solves problems.",

    solution:
      "The portfolio treats the website itself as a product, combining system-inspired visuals, interactive sections, technical storytelling, project case studies, and a structured user journey.",

    role:
      "Design / Frontend Engineering",

    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Animations",
      "Responsive Design",
    ],

    features: [
      "Interactive hero system",
      "Technical skill universe",
      "Project case studies",
      "Engineering workflow",
      "AI experimentation lab",
      "Responsive navigation",
      "Interactive command menu",
    ],

    metrics: [
      {
        label: "Interface",
        value: "Interactive",
      },
      {
        label: "Design",
        value: "Original",
      },
      {
        label: "Status",
        value: "Active",
      },
    ],

    color: "blue",
    featured: true,
    slug: "faiza-noor-portfolio",

    screenshots: [
      "/images/projects/portfolio/01-home.png",
      "/images/projects/portfolio/02-about.png",
      "/images/projects/portfolio/03-projects.png",
      "/images/projects/portfolio/04-skills.png",
      "/images/projects/portfolio/05-contact.png",
    ],

    video:
      "/videos/projects/portfolio-demo.mp4",

    liveUrl: "",
    githubUrl: "",
  },
];

// =========================================================
// FEATURED PROJECTS
// =========================================================

export const featuredProjects = projects.filter(
  (project) => project.featured
);

// =========================================================
// PROJECT CATEGORIES
// =========================================================

export const projectCategories: Array<
  "All" | ProjectCategory
> = [
  "All",
  "Full-Stack",
  "Web Application",
  "Frontend",
];

// =========================================================
// FIND PROJECT BY SLUG
// =========================================================

export function getProjectBySlug(slug: string) {
  return projects.find(
    (project) => project.slug === slug
  );
}