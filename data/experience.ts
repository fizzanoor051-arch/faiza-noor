export interface Experience {
  id: string;
  period: string;
  type: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
  technologies: string[];
  current?: boolean;
}

export const experience: Experience[] = [
  {
    id: "independent-development",
    period: "2025 — PRESENT",
    type: "INDEPENDENT",
    title: "Full-Stack Web Development",
    organization: "Independent Projects & Freelance Work",
    description:
      "Building practical web applications and continuously developing frontend and backend engineering skills through real project work.",
    highlights: [
      "Building responsive React and Next.js interfaces",
      "Developing reusable component architectures",
      "Working with APIs and backend concepts",
      "Creating ecommerce and healthcare application projects",
      "Practicing deployment and production workflows",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Git",
    ],
    current: true,
  },

  {
    id: "web-engineering-journey",
    period: "2024 — PRESENT",
    type: "DEVELOPMENT",
    title: "Web Engineering Journey",
    organization: "Continuous Learning",
    description:
      "A structured journey from core web development into modern full-stack engineering.",
    highlights: [
      "Started with HTML, CSS, and JavaScript",
      "Progressed into React and TypeScript",
      "Expanded into Next.js and backend development",
      "Practiced database and API concepts",
      "Learning modern deployment and engineering practices",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Next.js",
    ],
    current: true,
  },

  {
    id: "product-lab",
    period: "ONGOING",
    type: "EXPERIMENTAL",
    title: "Product & Interface Experiments",
    organization: "Personal Lab",
    description:
      "Exploring new interface ideas, product patterns, animations, AI integrations, and development workflows.",
    highlights: [
      "Experimenting with interactive interfaces",
      "Exploring motion and visual storytelling",
      "Testing AI-assisted product concepts",
      "Studying modern frontend architecture",
      "Building small experiments to learn by doing",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "AI APIs",
      "Animations",
    ],
    current: true,
  },
];