export type ProjectCategory =
  | "Full-Stack"
  | "Web Application"
  | "Frontend";

export type ProjectStatus = "BUILDING" | "ACTIVE" | "EXPERIMENTAL";

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
}

export const projects: Project[] = [
  {
    id: "shopsphere",
    title: "ShopSphere",
    shortTitle: "ShopSphere",
    category: "Full-Stack",
    year: "2026",
    status: "BUILDING",
    tagline: "A modern commerce experience built for scale.",
    description:
      "A modern ecommerce interface focused on clean product discovery, reusable components, smooth navigation, and a foundation ready for full-stack expansion.",
    problem:
      "Ecommerce interfaces can quickly become difficult to maintain when product views, navigation, cart interactions, and authentication are tightly coupled.",
    solution:
      "ShopSphere separates the interface into reusable components and routes while keeping the architecture ready for APIs, authentication, product data, and backend services.",
    role: "Frontend / Full-Stack Development",
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
  },

  {
    id: "modern-hospital",
    title: "Modern Hospital",
    shortTitle: "Hospital",
    category: "Web Application",
    year: "2026",
    status: "BUILDING",
    tagline: "A digital healthcare experience designed around clarity.",
    description:
      "A professional healthcare web application concept combining hospital information, departments, doctors, services, appointments, emergency access, and patient-focused navigation.",
    problem:
      "Healthcare websites often contain large amounts of information without providing a clear path for patients to find the right service or take action.",
    solution:
      "The project organizes information into focused sections and reusable interfaces, creating a clearer experience for discovering doctors, departments, services, and appointment flows.",
    role: "Frontend / Application Development",
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
  },

  {
    id: "faiza-noor-portfolio",
    title: "Faiza Noor Portfolio",
    shortTitle: "Portfolio",
    category: "Frontend",
    year: "2026",
    status: "ACTIVE",
    tagline: "An interactive engineering portfolio built as a digital system.",
    description:
      "A premium interactive portfolio designed to present development work, technical thinking, experiments, services, and engineering capabilities through a distinctive digital experience.",
    problem:
      "Traditional portfolios often present skills and projects as static lists without communicating how a developer thinks, builds, and solves problems.",
    solution:
      "The portfolio treats the website itself as a product, combining system-inspired visuals, interactive sections, technical storytelling, project case studies, and a structured user journey.",
    role: "Design / Frontend Engineering",
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
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured
);

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Full-Stack",
  "Web Application",
  "Frontend",
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}