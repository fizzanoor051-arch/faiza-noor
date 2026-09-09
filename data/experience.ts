
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
    id: "full-stack-web-development",
    period: "2026 — PRESENT",
    type: "INDEPENDENT / FREELANCE",
    title: "Full Stack Web Developer",
    organization: "Independent Projects & Freelance Development",
    description:
      "Hands-on experience developing modern web applications across the full development lifecycle, from responsive frontend interfaces and reusable component systems to backend logic, REST APIs, databases, authentication, testing, deployment, and AI-powered integrations.",
    highlights: [
      "Developing responsive and accessible interfaces using React, TypeScript, and Next.js",
      "Building reusable components and scalable frontend architectures",
      "Developing backend functionality with Node.js and Express.js",
      "Designing and integrating REST APIs for real-world application workflows",
      "Working with MongoDB, PostgreSQL, and SQL-based database concepts",
      "Implementing authentication, protected routes, form handling, and validation",
      "Building complete ecommerce, healthcare, portfolio, dashboard, and SaaS-style applications",
      "Using Git and GitHub for version control and structured development workflows",
      "Working with deployment, production builds, environment configuration, and hosting workflows",
      "Exploring testing, Docker, cloud workflows, and AI API integration",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "REST APIs",
      "Authentication",
      "Git",
      "GitHub",
      "Docker",
      "AI Integration",
    ],
    current: true,
  },

  {
    id: "ms-office-specialist",
    period: "2025 — PRESENT",
    type: "PROFESSIONAL / INDEPENDENT",
    title: "MS Office Specialist",
    organization: "Independent Work & Practical Projects",
    description:
      "Approximately one year of practical experience using Microsoft Office to create professional documents, spreadsheets, presentations, reports, dashboards, and organized business-ready materials with a strong focus on accuracy, presentation, and efficient data handling.",
    highlights: [
      "Creating professional and structured documents using Microsoft Word",
      "Building advanced Excel spreadsheets for data organization, analysis, and reporting",
      "Developing dashboards, trackers, formulas, charts, and business-oriented reports in Excel",
      "Creating polished PowerPoint presentations with clear visual hierarchy and professional layouts",
      "Working with data entry, formatting, sorting, filtering, and spreadsheet organization",
      "Using formulas and functions to automate calculations and improve spreadsheet efficiency",
      "Preparing professional templates, reports, tables, and documentation",
      "Applying consistent formatting and visual presentation across business documents",
      "Organizing information accurately while maintaining attention to detail",
    ],
    technologies: [
      "Microsoft Excel",
      "Advanced Excel",
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Excel Formulas",
      "Functions",
      "Charts",
      "Dashboards",
      "Data Analysis",
      "Data Entry",
      "Reports",
      "Documentation",
    ],
    current: true,
  },

  {
    id: "home-tutoring",
    period: "2024 — 2026",
    type: "TEACHING / EDUCATION",
    title: "Home Tutor",
    organization: "Independent Teaching",
    description:
      "Two years of independent home tutoring experience focused on helping students understand academic concepts, improve problem-solving abilities, stay organized with their studies, and build confidence through structured and personalized learning support.",
    highlights: [
      "Providing one-to-one academic support based on individual student needs",
      "Explaining complex concepts in clear, simple, and understandable ways",
      "Preparing structured lessons and adapting teaching methods to different learning styles",
      "Helping students strengthen problem-solving, comprehension, and study skills",
      "Monitoring student progress and identifying areas that require additional support",
      "Maintaining consistent communication and a supportive learning environment",
      "Managing schedules, lesson planning, and time effectively",
      "Developing strong communication, patience, organization, and interpersonal skills",
    ],
    technologies: [
      "Lesson Planning",
      "Student Support",
      "Academic Guidance",
      "Communication",
      "Problem Solving",
      "Time Management",
      "Organization",
      "Presentation Skills",
    ],
    current: false,
  },
];
