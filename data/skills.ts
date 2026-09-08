import type { LucideIcon } from "lucide-react";

import {
  Braces,
  Code2,
  Database,
  FileCode2,
  FileSpreadsheet,
  FileText,
  GitBranch,
  Globe2,
  Layers3,
  LayoutDashboard,
  MonitorSmartphone,
  Palette,
  Presentation,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
  Wrench,
  Cloud,
  Container,
  Bot,
  Megaphone,
  PenTool,
  PenLine,
  Table2,
  Workflow,
  Zap,
  GraduationCap,
  BookOpen,
  HeartHandshake,
} from "lucide-react";

export type SkillLevel =
  | "Expert"
  | "Advanced"
  | "Intermediate";

export type Skill = {
  name: string;
  short: string;
  category: string;
  level: SkillLevel;
  percentage: number;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export type SkillCategory = {
  id: string;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    eyebrow: "01 / INTERFACE",
    icon: MonitorSmartphone,
  },
  {
    id: "backend",
    label: "Backend",
    eyebrow: "02 / SYSTEMS",
    icon: Server,
  },
  {
    id: "database",
    label: "Database",
    eyebrow: "03 / DATA",
    icon: Database,
  },
  {
    id: "development",
    label: "Development",
    eyebrow: "04 / ENGINEERING",
    icon: Code2,
  },
  {
    id: "ai",
    label: "AI Integration",
    eyebrow: "05 / INTELLIGENCE",
    icon: Bot,
  },
  {
    id: "office",
    label: "MS Office",
    eyebrow: "06 / PRODUCTIVITY",
    icon: FileSpreadsheet,
  },
  {
    id: "freelancing",
    label: "Freelancing",
    eyebrow: "07 / DIGITAL",
    icon: Globe2,
  },
  {
    id: "teaching",
    label: "Teaching",
    eyebrow: "08 / EDUCATION",
    icon: GraduationCap,
  },
];

export const skills: Skill[] = [
  /* =========================================================
     FRONTEND
  ========================================================= */

  {
    name: "HTML5",
    short: "HTML",
    category: "frontend",
    level: "Advanced",
    percentage: 95,
    description:
      "Semantic, accessible and well-structured web markup.",
    icon: FileCode2,
    featured: true,
  },

  {
    name: "CSS3",
    short: "CSS",
    category: "frontend",
    level: "Advanced",
    percentage: 94,
    description:
      "Responsive layouts, animations, effects and modern styling.",
    icon: Palette,
    featured: true,
  },

  {
    name: "JavaScript",
    short: "JS",
    category: "frontend",
    level: "Advanced",
    percentage: 90,
    description:
      "Modern JavaScript, DOM, events, async logic and application behavior.",
    icon: Braces,
    featured: true,
  },

  {
    name: "TypeScript",
    short: "TS",
    category: "frontend",
    level: "Advanced",
    percentage: 88,
    description:
      "Type-safe application architecture and scalable React development.",
    icon: Code2,
    featured: true,
  },

  {
    name: "React.js",
    short: "REACT",
    category: "frontend",
    level: "Advanced",
    percentage: 90,
    description:
      "Reusable component architecture and interactive interfaces.",
    icon: Layers3,
    featured: true,
  },

  {
    name: "Next.js",
    short: "NEXT",
    category: "frontend",
    level: "Advanced",
    percentage: 88,
    description:
      "Production-ready React applications using the Next.js ecosystem.",
    icon: Zap,
    featured: true,
  },

  {
    name: "Tailwind CSS",
    short: "TW",
    category: "frontend",
    level: "Advanced",
    percentage: 90,
    description:
      "Utility-first responsive UI systems and rapid interface development.",
    icon: Palette,
    featured: true,
  },

  {
    name: "Responsive Web Design",
    short: "RWD",
    category: "frontend",
    level: "Advanced",
    percentage: 95,
    description:
      "Mobile-first layouts that adapt across phones, tablets and desktops.",
    icon: MonitorSmartphone,
  },

  {
    name: "UI Implementation",
    short: "UI",
    category: "frontend",
    level: "Advanced",
    percentage: 90,
    description:
      "Converting visual concepts into polished production interfaces.",
    icon: LayoutDashboard,
  },

  /* =========================================================
     BACKEND
  ========================================================= */

  {
    name: "Node.js",
    short: "NODE",
    category: "backend",
    level: "Intermediate",
    percentage: 78,
    description:
      "Server-side JavaScript, APIs and backend application logic.",
    icon: Server,
    featured: true,
  },

  {
    name: "Express.js",
    short: "EXPRESS",
    category: "backend",
    level: "Intermediate",
    percentage: 78,
    description:
      "RESTful backend services, routing and middleware architecture.",
    icon: Workflow,
  },

  {
    name: "REST APIs",
    short: "API",
    category: "backend",
    level: "Advanced",
    percentage: 84,
    description:
      "Designing and consuming structured REST API services.",
    icon: Globe2,
  },

  {
    name: "Authentication",
    short: "AUTH",
    category: "backend",
    level: "Intermediate",
    percentage: 76,
    description:
      "Login systems, protected routes and authentication workflows.",
    icon: ShieldCheck,
  },

  {
    name: "Authorization",
    short: "RBAC",
    category: "backend",
    level: "Intermediate",
    percentage: 74,
    description:
      "Access control and role-based application permissions.",
    icon: ShieldCheck,
  },

  {
    name: "CRUD Applications",
    short: "CRUD",
    category: "backend",
    level: "Advanced",
    percentage: 84,
    description:
      "Create, read, update and delete workflows for full-stack applications.",
    icon: Wrench,
  },

  {
    name: "Server-side Logic",
    short: "SERVER",
    category: "backend",
    level: "Intermediate",
    percentage: 76,
    description:
      "Business logic, request handling and backend workflows.",
    icon: Terminal,
  },

  /* =========================================================
     DATABASE
  ========================================================= */

  {
    name: "MongoDB",
    short: "MONGO",
    category: "database",
    level: "Intermediate",
    percentage: 78,
    description:
      "Document-based database design and application integration.",
    icon: Database,
    featured: true,
  },

  {
    name: "PostgreSQL",
    short: "POSTGRES",
    category: "database",
    level: "Intermediate",
    percentage: 72,
    description:
      "Relational data modeling and SQL-backed application systems.",
    icon: Database,
  },

  {
    name: "SQL",
    short: "SQL",
    category: "database",
    level: "Intermediate",
    percentage: 76,
    description:
      "Queries, relationships and structured relational data.",
    icon: Table2,
  },

  {
    name: "Database Design",
    short: "DB",
    category: "database",
    level: "Intermediate",
    percentage: 75,
    description:
      "Structuring application data for maintainability and scalability.",
    icon: Database,
  },

  /* =========================================================
     DEVELOPMENT / ENGINEERING
  ========================================================= */

  {
    name: "Git",
    short: "GIT",
    category: "development",
    level: "Advanced",
    percentage: 88,
    description:
      "Version control, branching, commits and collaborative workflows.",
    icon: GitBranch,
    featured: true,
  },

  {
    name: "GitHub",
    short: "GH",
    category: "development",
    level: "Advanced",
    percentage: 88,
    description:
      "Repository management, collaboration and project delivery.",
    icon: Code2,
    featured: true,
  },

  {
    name: "API Integration",
    short: "API INT",
    category: "development",
    level: "Advanced",
    percentage: 85,
    description:
      "Connecting frontend applications with external and internal APIs.",
    icon: Workflow,
  },

  {
    name: "Deployment",
    short: "DEPLOY",
    category: "development",
    level: "Intermediate",
    percentage: 78,
    description:
      "Preparing and deploying web applications for production.",
    icon: Cloud,
  },

  {
    name: "Cloud",
    short: "CLOUD",
    category: "development",
    level: "Intermediate",
    percentage: 70,
    description:
      "Understanding cloud-based deployment and application environments.",
    icon: Cloud,
  },

  {
    name: "Docker",
    short: "DOCKER",
    category: "development",
    level: "Intermediate",
    percentage: 68,
    description:
      "Containerized application environments and development workflows.",
    icon: Container,
  },

  {
    name: "Testing",
    short: "TEST",
    category: "development",
    level: "Intermediate",
    percentage: 70,
    description:
      "Testing application behavior and identifying regressions.",
    icon: TestTube2,
  },

  {
    name: "Debugging",
    short: "DEBUG",
    category: "development",
    level: "Advanced",
    percentage: 88,
    description:
      "Finding, diagnosing and fixing frontend and backend issues.",
    icon: Wrench,
  },

  {
    name: "Performance Optimization",
    short: "PERF",
    category: "development",
    level: "Intermediate",
    percentage: 76,
    description:
      "Improving loading, rendering and application performance.",
    icon: Zap,
  },

  /* =========================================================
     AI
  ========================================================= */

  {
    name: "AI Integration",
    short: "AI",
    category: "ai",
    level: "Intermediate",
    percentage: 72,
    description:
      "Integrating AI capabilities into modern web applications.",
    icon: Bot,
    featured: true,
  },

  {
    name: "AI-powered Web Features",
    short: "AI WEB",
    category: "ai",
    level: "Intermediate",
    percentage: 70,
    description:
      "Building intelligent features around web application workflows.",
    icon: Sparkles,
  },

  {
    name: "AI API Integration",
    short: "AI API",
    category: "ai",
    level: "Intermediate",
    percentage: 72,
    description:
      "Connecting web applications with AI-powered APIs and services.",
    icon: Bot,
  },

  /* =========================================================
     MS OFFICE
  ========================================================= */

  {
    name: "Microsoft Word",
    short: "WORD",
    category: "office",
    level: "Advanced",
    percentage: 94,
    description:
      "Professional documents, formatting, templates, reports and structured business documentation.",
    icon: FileText,
    featured: true,
  },

  {
    name: "Microsoft Excel",
    short: "EXCEL",
    category: "office",
    level: "Advanced",
    percentage: 94,
    description:
      "Professional spreadsheets, formulas, data organization and structured workbooks.",
    icon: FileSpreadsheet,
    featured: true,
  },

  {
    name: "Advanced Excel",
    short: "ADV EXCEL",
    category: "office",
    level: "Advanced",
    percentage: 90,
    description:
      "Advanced formulas, functions, trackers, dashboards and data workflows.",
    icon: Table2,
    featured: true,
  },

  {
    name: "Excel Formulas & Functions",
    short: "FORMULAS",
    category: "office",
    level: "Advanced",
    percentage: 90,
    description:
      "Working with formulas, functions and calculations for professional Excel tasks.",
    icon: Braces,
  },

  {
    name: "Excel Dashboards",
    short: "DASHBOARD",
    category: "office",
    level: "Advanced",
    percentage: 84,
    description:
      "Creating organized dashboards, trackers and visual summaries in Excel.",
    icon: LayoutDashboard,
  },

  {
    name: "Data Entry",
    short: "DATA",
    category: "office",
    level: "Advanced",
    percentage: 94,
    description:
      "Accurate and organized digital data entry, processing and record management.",
    icon: Table2,
    featured: true,
  },

  {
    name: "Data Management",
    short: "DATA MGMT",
    category: "office",
    level: "Advanced",
    percentage: 86,
    description:
      "Organizing, maintaining and managing structured digital information.",
    icon: Database,
  },

  {
    name: "Data Cleaning",
    short: "CLEANING",
    category: "office",
    level: "Advanced",
    percentage: 82,
    description:
      "Cleaning, organizing and preparing datasets for accurate professional use.",
    icon: Wrench,
  },

  {
    name: "Microsoft PowerPoint",
    short: "PPT",
    category: "office",
    level: "Advanced",
    percentage: 92,
    description:
      "Professional presentations, visual storytelling and polished business slides.",
    icon: Presentation,
    featured: true,
  },

  {
    name: "Business Presentations",
    short: "BIZ PPT",
    category: "office",
    level: "Advanced",
    percentage: 90,
    description:
      "Creating clean, structured and persuasive presentations for professional audiences.",
    icon: Presentation,
  },

  {
    name: "Professional Documentation",
    short: "DOCS",
    category: "office",
    level: "Advanced",
    percentage: 92,
    description:
      "Creating clear, structured and professional business documents.",
    icon: FileText,
  },

  {
    name: "Document Formatting",
    short: "FORMAT",
    category: "office",
    level: "Advanced",
    percentage: 92,
    description:
      "Professional formatting, layouts, styles and document presentation.",
    icon: FileText,
  },

  {
    name: "PDF & Document Handling",
    short: "PDF",
    category: "office",
    level: "Advanced",
    percentage: 88,
    description:
      "Managing, organizing and preparing professional digital documents and PDF files.",
    icon: FileCode2,
  },

  {
    name: "Microsoft Office Suite",
    short: "MS OFFICE",
    category: "office",
    level: "Advanced",
    percentage: 94,
    description:
      "Professional use of Microsoft Office tools for documents, spreadsheets and presentations.",
    icon: Layers3,
    featured: true,
  },

  /* =========================================================
     FREELANCING / DIGITAL
  ========================================================= */

  {
    name: "Web Development",
    short: "WEB DEV",
    category: "freelancing",
    level: "Advanced",
    percentage: 90,
    description:
      "Building modern responsive websites and full-stack web applications.",
    icon: Globe2,
    featured: true,
  },

  {
    name: "Content Writing",
    short: "CONTENT",
    category: "freelancing",
    level: "Advanced",
    percentage: 84,
    description:
      "Writing clear, useful and audience-focused digital content.",
    icon: PenLine,
  },

  {
    name: "Copywriting",
    short: "COPY",
    category: "freelancing",
    level: "Intermediate",
    percentage: 78,
    description:
      "Writing persuasive copy for websites, services and digital products.",
    icon: PenTool,
  },

  {
    name: "Digital Marketing",
    short: "MARKETING",
    category: "freelancing",
    level: "Intermediate",
    percentage: 72,
    description:
      "Digital promotion concepts, audience targeting and online presence.",
    icon: Megaphone,
  },

  {
    name: "Graphic Design",
    short: "DESIGN",
    category: "freelancing",
    level: "Intermediate",
    percentage: 72,
    description:
      "Creating clean visual assets and design concepts for digital work.",
    icon: Palette,
  },

  /* =========================================================
     TEACHING
  ========================================================= */

  {
    name: "Teaching / Tutoring",
    short: "TEACHING",
    category: "teaching",
    level: "Advanced",
    percentage: 90,
    description:
      "Explaining concepts clearly and providing structured academic support to students.",
    icon: GraduationCap,
    featured: true,
  },

  {
    name: "Online Tutoring",
    short: "ONLINE",
    category: "teaching",
    level: "Advanced",
    percentage: 86,
    description:
      "Providing personalized academic guidance and learning support through online sessions.",
    icon: MonitorSmartphone,
  },

  {
    name: "Lesson Planning",
    short: "LESSON",
    category: "teaching",
    level: "Advanced",
    percentage: 84,
    description:
      "Planning structured lessons with clear objectives and learning activities.",
    icon: BookOpen,
  },

  {
    name: "Student Assessment",
    short: "ASSESS",
    category: "teaching",
    level: "Advanced",
    percentage: 82,
    description:
      "Evaluating student understanding through assignments and structured assessment.",
    icon: TestTube2,
  },

  {
    name: "Student Support",
    short: "SUPPORT",
    category: "teaching",
    level: "Advanced",
    percentage: 88,
    description:
      "Providing personalized guidance, feedback and academic support to students.",
    icon: HeartHandshake,
  },
];

export const featuredSkills = skills.filter(
  (skill) => skill.featured
);

export const totalSkills = skills.length;