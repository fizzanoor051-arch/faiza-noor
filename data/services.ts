export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  status: string;
}

export const services: Service[] = [
  {
    id: "frontend-engineering",
    number: "01",
    title: "Frontend Engineering",
    subtitle: "INTERFACE SYSTEMS",
    description:
      "Responsive and interactive frontend experiences built with modern React and Next.js architecture.",
    deliverables: [
      "Responsive web interfaces",
      "Reusable React components",
      "Interactive UI systems",
      "Responsive navigation",
      "Performance-focused structure",
      "Accessibility-conscious interfaces",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "CSS",
      "Tailwind CSS",
    ],
    status: "AVAILABLE",
  },

  {
    id: "full-stack-development",
    number: "02",
    title: "Full-Stack Development",
    subtitle: "PRODUCT SYSTEMS",
    description:
      "End-to-end web application development connecting modern interfaces with APIs, databases, and backend services.",
    deliverables: [
      "Full-stack application structure",
      "Frontend architecture",
      "API integration",
      "Authentication flows",
      "Database-connected features",
      "Deployment-ready foundations",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL",
    ],
    status: "AVAILABLE",
  },

  {
    id: "website-development",
    number: "03",
    title: "Website Development",
    subtitle: "DIGITAL PRESENCE",
    description:
      "Professional websites designed to communicate clearly, work across devices, and create a strong digital presence.",
    deliverables: [
      "Business websites",
      "Portfolio websites",
      "Landing pages",
      "Service websites",
      "Responsive layouts",
      "Modern visual systems",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "CSS",
      "Responsive Design",
    ],
    status: "AVAILABLE",
  },

  {
    id: "api-backend",
    number: "04",
    title: "API & Backend Integration",
    subtitle: "SYSTEM CONNECTION",
    description:
      "Connecting frontend experiences with APIs and backend services to create functional application workflows.",
    deliverables: [
      "REST API integration",
      "CRUD workflows",
      "Authentication-ready flows",
      "Data fetching",
      "Loading and error states",
      "Frontend-backend connection",
    ],
    technologies: [
      "REST APIs",
      "Node.js",
      "Express.js",
      "Next.js",
      "TypeScript",
    ],
    status: "EXPANDING",
  },

  {
    id: "ui-modernization",
    number: "05",
    title: "UI Modernization",
    subtitle: "EXPERIENCE UPGRADE",
    description:
      "Improving outdated interfaces with cleaner layouts, responsive behavior, stronger hierarchy, and modern interactions.",
    deliverables: [
      "Interface redesign",
      "Responsive improvements",
      "Component restructuring",
      "Visual hierarchy",
      "Interaction improvements",
      "Modern UI patterns",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "CSS",
      "UI Systems",
    ],
    status: "AVAILABLE",
  },

  {
    id: "ai-ready",
    number: "06",
    title: "AI-Ready Web Experiences",
    subtitle: "EXPERIMENTAL LAYER",
    description:
      "Exploring practical AI integrations that can add useful functionality to modern web products.",
    deliverables: [
      "AI API integration",
      "AI-powered interface concepts",
      "Smart content experiments",
      "Developer workflow automation",
      "AI-ready architecture planning",
    ],
    technologies: [
      "AI APIs",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
    ],
    status: "EXPLORING",
  },
];