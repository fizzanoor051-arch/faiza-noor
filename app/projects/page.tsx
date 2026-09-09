"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  FileText,
  GitBranch,
  Layers3,
  Maximize2,
  Minus,
  Plus,
  Presentation,
  RotateCcw,
  Table2,
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
  screenshots: string[];
  video: string;
  featured?: boolean;
  liveUrl: string;
  githubUrl: string;
  backendGithubUrl?: string;
};

const projects: Project[] = [
  /* =========================================================
     01 — LUXORA STORE
     ========================================================= */

  {
    id: "luxora-store",
    number: "01",
    title: "Luxora STORE",
    shortTitle: "Luxora",
    category: "FULL STACK",
    year: "2026",
    type: "PREMIUM E-COMMERCE EXPERIENCE",

    description:
      "A premium e-commerce experience designed around elegant product discovery, immersive visuals, smooth interactions and a scalable modern architecture.",

    longDescription:
      "Luxora Store is a premium digital commerce experience created to demonstrate how a modern online store can combine strong visual design with real product-focused functionality. The experience is structured around product discovery, detailed product presentation, responsive layouts, reusable components and a polished shopping journey.",

    technologies: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Responsive UI",
    ],

    features: [
      "Premium storefront",
      "Product discovery",
      "Product detail experience",
      "Shopping cart",
      "Responsive interface",
      "Reusable components",
      "Modern navigation",
      "Conversion-focused UI",
    ],

    screenshots: [
      "/images/projects/luxro-store/1.png",
      "/images/projects/luxro-store/2.png",
      "/images/projects/luxro-store/3.png",
      "/images/projects/luxro-store/4.png",
      "/images/projects/luxro-store/5.png",
      "/images/projects/luxro-store/6.png",
      "/images/projects/luxro-store/7.png",
      "/images/projects/luxro-store/8.png",
      "/images/projects/luxro-store/9.png",
      "/images/projects/luxro-store/12.png",
    ],

    video:
      "/videos/projects/LUXORA _ Premium AI-Powered Shopping - Google Chrome 2026-09-09 09-00-36.mp4",

    featured: true,

    liveUrl: "https://luxora-zuq4.vercel.app/",
    githubUrl: "https://github.com/fizzanoor051-arch/LUXORA.git",
  },

  /* =========================================================
     02 — SHOPSPHERE
     ========================================================= */

  {
    id: "shopsphere",
    number: "02",
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
      "Express.js",
      "MongoDB",
      "REST API",
    ],

    features: [
      "Product catalog",
      "Shopping cart",
      "User authentication",
      "REST API",
      "Backend integration",
      "Responsive UI",
    ],

    screenshots: [
      "/images/projects/shopsphere/1.png",
      "/images/projects/shopsphere/2.png",
      "/images/projects/shopsphere/3.png",
      "/images/projects/shopsphere/4.png",
      "/images/projects/shopsphere/5.png",
    ],

    video:
      "/videos/projects/client - Google Chrome 2026-09-09 09-06-45.mp4",

    liveUrl: "https://shopsphere-ecommerce-beta.vercel.app/",
    githubUrl:
      "https://github.com/fizzanoor051-arch/Shopsphere-ecommerce.git",
    backendGithubUrl:
      "https://github.com/fizzanoor051-arch/Shopsphere-backend.git",
  },

  /* =========================================================
     03 — MEDICARE
     ========================================================= */

  {
    id: "hospital",
    number: "03",
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

    screenshots: [
      "/images/projects/medicare/1.png",
      "/images/projects/medicare/2.png",
      "/images/projects/medicare/3.png",
      "/images/projects/medicare/4.png",
      "/images/projects/medicare/5.png",
      "/images/projects/medicare/6.png",
      "/images/projects/medicare/7.png",
      "/images/projects/medicare/8.png",
    ],

    video:
      "/videos/projects/NOOR Health & Medical Center - Google Chrome 2026-09-09 09-05-03.mp4",

    liveUrl: "https://classy-vacherin-7a04fc.netlify.app/",
    githubUrl:
      "https://github.com/fizzanoor051-arch/hospital-react-project.git",
  },

  /* =========================================================
     04 — FAIZA NOOR PORTFOLIO
     ========================================================= */

  {
    id: "portfolio",
    number: "04",
    title: "FAIZA NOOR",
    shortTitle: "Portfolio",
    category: "UI / UX",
    year: "2026",
    type: "CINEMATIC PORTFOLIO",

    description:
      "A personal portfolio engineered as an immersive digital experience rather than a conventional developer website.",

    longDescription:
      "The Faiza Noor portfolio is designed around cinematic storytelling, motion, interactive navigation and premium visual hierarchy. The goal is to communicate technical ability through the experience itself while presenting projects, skills, services and professional information in a cohesive digital system.",

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

    screenshots: [
      "/images/projects/portfolio/1.png",
      "/images/projects/portfolio/2.png",
      "/images/projects/portfolio/4.png",
      "/images/projects/portfolio/5.png",
    ],

    video: "/videos/projects/portfolio-demo.mp4",

    liveUrl: "https://faiza-noor-portfolio.vercel.app/",
    githubUrl:
      "https://github.com/fizzanoor051-arch/Faiza-Noor-portfolio.git",
  },

  /* =========================================================
     05 — RESUME SYSTEM
     ========================================================= */

  {
    id: "resume",
    number: "05",
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

    screenshots: [
      "/images/projects/resume/01-profile.png",
      "/images/projects/resume/02-experience.png",
      "/images/projects/resume/03-skills.png",
      "/images/projects/resume/04-projects.png",
      "/images/projects/resume/05-contact.png",
    ],

    video: "/videos/projects/resume-demo.mp4",

    liveUrl: "",
    githubUrl: "",
  },

  /* =========================================================
     06 — CARE DASHBOARD
     ========================================================= */

  {
    id: "hospital-dashboard",
    number: "06",
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

    screenshots: [
      "/images/projects/care-dashboard/01-overview.png",
      "/images/projects/care-dashboard/02-analytics.png",
      "/images/projects/care-dashboard/03-patients.png",
      "/images/projects/care-dashboard/04-reports.png",
      "/images/projects/care-dashboard/05-settings.png",
    ],

    video: "/videos/projects/care-dashboard-demo.mp4",

    liveUrl: "",
    githubUrl: "",
  },

  /* =========================================================
     07 — BUSINESS SUITE
     ========================================================= */

  {
    id: "business",
    number: "07",
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

    screenshots: [
      "/images/projects/business/01-overview.png",
      "/images/projects/business/02-dashboard.png",
      "/images/projects/business/03-data.png",
      "/images/projects/business/04-reports.png",
      "/images/projects/business/05-presentation.png",
    ],

    video: "/videos/projects/business-demo.mp4",

    liveUrl: "",
    githubUrl: "",
  },
];

const categories: Category[] = [
  "ALL",
  "FULL STACK",
  "FRONTEND",
  "UI / UX",
];

/* =========================================================
   MS OFFICE
   ========================================================= */

type OfficeCategory = "WORD" | "EXCEL" | "POWERPOINT";

type OfficeProject = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tools: string[];
  deliverables: string[];
  preview?: string;
  fileUrl?: string;
};

type OfficeSuiteItem = {
  id: OfficeCategory;
  label: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  projects: OfficeProject[];
};

const officeSuite: OfficeSuiteItem[] = [
  /* =========================================================
     WORD
     ========================================================= */

  {
    id: "WORD",
    label: "MS WORD",
    subtitle: "DOCUMENTATION SYSTEMS",
    description:
      "Professional documents, reports, resumes, business templates and structured documentation designed for real-world workflows.",
    icon: <FileText size={30} strokeWidth={1.3} />,
    accent: "#7c5cff",

    projects: [
      {
        id: "word-ats-resume",
        title: "ATS Resume System",
        description:
          "Professional ATS-friendly resume and CV document system.",
        longDescription:
          "A professionally structured resume system designed for modern job applications. The document focuses on ATS-friendly formatting, clean hierarchy, readable sections and professional presentation while keeping the structure easy to edit and reuse.",
        tools: [
          "Microsoft Word",
          "Styles & Formatting",
          "Tables",
          "Headers & Footers",
          "ATS Formatting",
        ],
        deliverables: [
          "ATS-friendly resume layout",
          "Professional typography hierarchy",
          "Structured experience section",
          "Skills and education sections",
          "Reusable editable document",
        ],
        preview: "/images/projects/office/word/ats-resume.png",
        fileUrl: "",
      },

      {
        id: "word-business-report",
        title: "Business Report",
        description:
          "Structured corporate report with professional formatting.",
        longDescription:
          "A corporate business report designed to present information in a clear and professional format. It uses consistent headings, page structure, tables, visual hierarchy and organized sections suitable for business documentation.",
        tools: [
          "Microsoft Word",
          "Page Layout",
          "Styles",
          "Tables",
          "Professional Formatting",
        ],
        deliverables: [
          "Executive-style report structure",
          "Professional cover page",
          "Organized headings",
          "Tables and data sections",
          "Print-ready document",
        ],
        preview: "/images/projects/office/word/business-report.png",
        fileUrl: "",
      },

      {
        id: "word-company-documentation",
        title: "Company Documentation",
        description:
          "Organized business documentation and internal documents.",
        longDescription:
          "A structured company documentation system created for organizing internal business information. The project demonstrates professional document architecture, consistent formatting and easy navigation across multiple sections.",
        tools: [
          "Microsoft Word",
          "Styles",
          "Navigation Pane",
          "Tables",
          "Document Design",
        ],
        deliverables: [
          "Company information structure",
          "Internal documentation pages",
          "Consistent formatting system",
          "Reusable document sections",
          "Professional document template",
        ],
        preview:
          "/images/projects/office/word/company-documentation.png",
        fileUrl: "",
      },

      {
        id: "word-letter-suite",
        title: "Professional Letter Suite",
        description:
          "Business letters, official communication and reusable templates.",
        longDescription:
          "A collection of professional business communication templates designed for formal workplace use. The suite includes reusable structures for official letters, business communication and professional correspondence.",
        tools: [
          "Microsoft Word",
          "Templates",
          "Page Layout",
          "Typography",
          "Business Writing",
        ],
        deliverables: [
          "Official letter template",
          "Business communication template",
          "Formal correspondence layout",
          "Reusable headers",
          "Print-ready letter formats",
        ],
        preview:
          "/images/projects/office/word/letter-suite.png",
        fileUrl: "",
      },

      {
        id: "word-project-documentation",
        title: "Project Documentation",
        description:
          "Professional project documentation with structured sections.",
        longDescription:
          "A complete project documentation format designed to organize project objectives, scope, requirements, timelines, milestones and outcomes into one professional document.",
        tools: [
          "Microsoft Word",
          "Project Documentation",
          "Tables",
          "Styles",
          "Page Design",
        ],
        deliverables: [
          "Project overview",
          "Objectives and scope",
          "Requirements section",
          "Milestone structure",
          "Project outcome documentation",
        ],
        preview:
          "/images/projects/office/word/project-documentation.png",
        fileUrl: "",
      },

      {
        id: "word-professional-forms",
        title: "Professional Forms",
        description:
          "Clean printable forms and document templates.",
        longDescription:
          "A collection of clean, printable professional forms created for practical business workflows. The layouts are designed around usability, clear field structure and professional visual presentation.",
        tools: [
          "Microsoft Word",
          "Tables",
          "Form Layout",
          "Page Design",
          "Print Formatting",
        ],
        deliverables: [
          "Professional form layouts",
          "Input field structure",
          "Printable document design",
          "Reusable templates",
          "Business-ready formatting",
        ],
        preview:
          "/public/files/professional-forms.pdf",
        fileUrl: "",
      },
    ],
  },

  /* =========================================================
     EXCEL
     ========================================================= */

  {
    id: "EXCEL",
    label: "MS EXCEL",
    subtitle: "ANALYTICS & DASHBOARDS",
    description:
      "Interactive dashboards, financial systems, sales analytics, attendance tracking and business data management solutions.",
    icon: <Table2 size={30} strokeWidth={1.3} />,
    accent: "#36d399",

    projects: [
      {
        id: "excel-sales-dashboard",
        title: "Sales Dashboard & Analytics",
        description:
          "Professional sales KPIs, revenue analytics and performance tracking dashboard.",
        longDescription:
          "An executive-style sales analytics dashboard designed to transform raw sales data into clear business insights. The workbook focuses on KPIs, revenue trends, sales performance, product analysis and decision-ready visual reporting.",
        tools: [
          "Microsoft Excel",
          "Pivot Tables",
          "Pivot Charts",
          "XLOOKUP",
          "SUMIFS",
          "Conditional Formatting",
          "Dashboard Design",
        ],
        deliverables: [
          "Executive sales dashboard",
          "Revenue KPI cards",
          "Sales performance analysis",
          "Product and category analysis",
          "Interactive reporting structure",
        ],
        preview:
          "/images/projects/office/excel/sales-dashboard.png",
        fileUrl: "",
      },

      {
        id: "excel-financial-dashboard",
        title: "Business Financial Dashboard",
        description:
          "Revenue, expenses, profit and financial performance management system.",
        longDescription:
          "A professional financial management workbook designed to provide a clear view of revenue, expenses, profit and financial performance. The dashboard helps convert financial records into useful management-level insights.",
        tools: [
          "Microsoft Excel",
          "Financial Formulas",
          "Pivot Tables",
          "Charts",
          "SUMIFS",
          "IF Functions",
          "Dashboard Design",
        ],
        deliverables: [
          "Revenue overview",
          "Expense analysis",
          "Profit tracking",
          "Monthly financial trends",
          "Management dashboard",
        ],
        preview:
          "/images/projects/office/excel/financial-dashboard.png",
        fileUrl: "",
        
      },

      {
        id: "excel-attendance-tracker",
        title: "Employee Attendance Tracker",
        description:
          "Automated attendance tracking and employee reporting workbook.",
        longDescription:
          "An employee attendance management workbook created to simplify daily attendance recording and monthly reporting. The system organizes employee records, attendance status and summary calculations into a practical business tool.",
        tools: [
          "Microsoft Excel",
          "Data Validation",
          "COUNTIF",
          "Conditional Formatting",
          "Tables",
          "Attendance Formulas",
        ],
        deliverables: [
          "Employee attendance sheet",
          "Daily attendance tracking",
          "Monthly summaries",
          "Attendance percentage",
          "Employee reporting",
        ],
        preview:
          "/images/projects/office/excel/attendance-tracker.png",
        fileUrl: "",
      },

      {
        id: "excel-budget-tracker",
        title: "Monthly Budget Tracker",
        description:
          "Personal and business budgeting with expense analysis.",
        longDescription:
          "A practical budgeting workbook designed to track income, planned spending, actual expenses and remaining budget. It provides a structured overview of financial activity across monthly periods.",
        tools: [
          "Microsoft Excel",
          "SUMIFS",
          "IF Functions",
          "Tables",
          "Charts",
          "Conditional Formatting",
        ],
        deliverables: [
          "Monthly budget planner",
          "Income tracking",
          "Expense categorization",
          "Budget vs actual analysis",
          "Monthly summary",
        ],
        preview:
          "/images/projects/office/excel/budget-tracker.png",
        fileUrl: "",
      },

      {
        id: "excel-inventory-management",
        title: "Inventory Management System",
        description:
          "Inventory tracking, stock levels and product management workbook.",
        longDescription:
          "An inventory management workbook designed to track products, quantities, stock movement and inventory status. The system provides a structured foundation for monitoring stock levels and identifying items that require attention.",
        tools: [
          "Microsoft Excel",
          "Tables",
          "Data Validation",
          "XLOOKUP",
          "Conditional Formatting",
          "Inventory Formulas",
        ],
        deliverables: [
          "Product inventory database",
          "Stock level tracking",
          "Low-stock indicators",
          "Product lookup system",
          "Inventory summary",
        ],
        preview:
          "/images/projects/office/excel/inventory-management.png",
        fileUrl: "",
      },

      {
        id: "excel-sales-revenue",
        title: "Sales & Revenue Tracker",
        description:
          "Sales records, revenue calculations and monthly performance analysis.",
        longDescription:
          "A structured sales and revenue tracking workbook designed to record transactions and analyze performance across time. The project focuses on clean data organization and automated calculations.",
        tools: [
          "Microsoft Excel",
          "SUMIFS",
          "XLOOKUP",
          "Tables",
          "Charts",
          "Data Analysis",
        ],
        deliverables: [
          "Sales transaction sheet",
          "Revenue calculations",
          "Monthly performance summary",
          "Sales trend analysis",
          "Reporting structure",
        ],
        preview:
          "/images/projects/office/excel/sales-revenue-tracker.png",
        fileUrl: "",
      },

      {
        id: "excel-expense-management",
        title: "Expense Management System",
        description:
          "Structured expense recording and category-based financial analysis.",
        longDescription:
          "An expense management workbook designed to organize business spending into categories and time periods. It provides clear visibility into expense patterns and supports better financial monitoring.",
        tools: [
          "Microsoft Excel",
          "SUMIFS",
          "Categories",
          "Tables",
          "Charts",
          "Conditional Formatting",
        ],
        deliverables: [
          "Expense database",
          "Category-based analysis",
          "Monthly expense summary",
          "Spending breakdown",
          "Financial reporting view",
        ],
        preview:
          "/images/projects/office/excel/expense-management.png",
        fileUrl: "",
      },

      {
        id: "excel-kpi-dashboard",
        title: "KPI Performance Dashboard",
        description:
          "Executive-level KPI monitoring and business performance visualization.",
        longDescription:
          "An executive KPI dashboard designed to provide a high-level view of business performance. The project combines structured data with visual indicators to communicate important metrics quickly and clearly.",
        tools: [
          "Microsoft Excel",
          "Pivot Tables",
          "Charts",
          "KPI Cards",
          "Conditional Formatting",
          "Dashboard Design",
        ],
        deliverables: [
          "Executive KPI dashboard",
          "Performance indicators",
          "Trend visualization",
          "Target vs actual analysis",
          "Management reporting view",
        ],
        preview:
          "/images/projects/office/excel/kpi-dashboard.png",
        fileUrl: "",
      },
    ],
  },

  /* =========================================================
     POWERPOINT
     ========================================================= */

  {
    id: "POWERPOINT",
    label: "MS POWERPOINT",
    subtitle: "BUSINESS PRESENTATIONS",
    description:
      "High-impact business presentations, pitch decks, company profiles, marketing decks and professional visual storytelling.",
    icon: <Presentation size={30} strokeWidth={1.3} />,
    accent: "#ff7a59",

    projects: [
      {
        id: "ppt-business-presentation",
        title: "Business Presentation",
        description:
          "Professional corporate presentation with structured visual storytelling.",
        longDescription:
          "A polished business presentation designed to communicate information through strong visual hierarchy, structured storytelling and professional slide composition. The deck balances content clarity with modern presentation aesthetics.",
        tools: [
          "Microsoft PowerPoint",
          "Slide Master",
          "Shapes",
          "Charts",
          "Typography",
          "Visual Storytelling",
        ],
        deliverables: [
          "Professional title slide",
          "Business content slides",
          "Data visualization",
          "Consistent slide system",
          "Presentation-ready deck",
        ],
        preview:
          "/images/projects/office/powerpoint/business-presentation.png",
        fileUrl: "",
      },

      {
        id: "ppt-company-profile",
        title: "Company Profile Deck",
        description:
          "Premium company introduction and corporate profile presentation.",
        longDescription:
          "A professional company profile deck designed to introduce a business, communicate its identity, highlight services and present key information in a visually engaging format.",
        tools: [
          "Microsoft PowerPoint",
          "Slide Master",
          "Layouts",
          "Icons",
          "Shapes",
          "Brand Presentation",
        ],
        deliverables: [
          "Company introduction",
          "Mission and vision",
          "Services overview",
          "Company highlights",
          "Professional closing slide",
        ],
        preview:
          "/images/projects/office/powerpoint/company-profile.png",
        fileUrl: "",
      },

      {
        id: "ppt-business-proposal",
        title: "Business Proposal",
        description:
          "Client-facing proposal deck designed for professional communication.",
        longDescription:
          "A client-facing business proposal presentation created to communicate an opportunity, proposed solution, value proposition and project structure in a clear and persuasive visual format.",
        tools: [
          "Microsoft PowerPoint",
          "Presentation Design",
          "Charts",
          "Icons",
          "Layouts",
          "Visual Hierarchy",
        ],
        deliverables: [
          "Proposal introduction",
          "Problem and solution",
          "Service overview",
          "Project scope",
          "Professional call-to-action",
        ],
        preview:
          "/images/projects/office/powerpoint/business-proposal.png",
        fileUrl: "",
      },

      {
        id: "ppt-marketing-presentation",
        title: "Marketing Presentation",
        description:
          "Visual marketing strategy and campaign presentation.",
        longDescription:
          "A marketing presentation designed to communicate campaign direction, audience insights, marketing strategy and key objectives through a visually consistent slide system.",
        tools: [
          "Microsoft PowerPoint",
          "Marketing Strategy",
          "Charts",
          "Visual Design",
          "Layouts",
          "Infographics",
        ],
        deliverables: [
          "Marketing overview",
          "Target audience section",
          "Campaign strategy",
          "Visual data presentation",
          "Campaign objectives",
        ],
        preview:
          "/images/projects/office/powerpoint/marketing-presentation.png",
        fileUrl: "",
      },

      {
        id: "ppt-project-presentation",
        title: "Project Presentation",
        description:
          "Structured project overview, objectives, milestones and outcomes.",
        longDescription:
          "A professional project presentation designed to communicate project objectives, progress, milestones, deliverables and outcomes in a structured and easy-to-follow format.",
        tools: [
          "Microsoft PowerPoint",
          "Timeline Design",
          "Charts",
          "Shapes",
          "Icons",
          "Presentation Structure",
        ],
        deliverables: [
          "Project overview",
          "Objectives",
          "Milestone timeline",
          "Progress reporting",
          "Final outcomes",
        ],
        preview:
          "/images/projects/office/powerpoint/project-presentation.png",
        fileUrl: "",
      },

      {
        id: "ppt-pitch-deck",
        title: "Pitch Deck",
        description:
          "Professional investor/client pitch deck with strong visual hierarchy.",
        longDescription:
          "A high-impact pitch deck designed to present an idea, product or business opportunity through concise storytelling, strong visual hierarchy and persuasive presentation structure.",
        tools: [
          "Microsoft PowerPoint",
          "Pitch Deck Design",
          "Visual Storytelling",
          "Charts",
          "Icons",
          "Slide Master",
        ],
        deliverables: [
          "Opening pitch slide",
          "Problem and opportunity",
          "Solution presentation",
          "Business/value proposition",
          "Closing pitch slide",
        ],
        preview:
          "/images/projects/office/powerpoint/pitch-deck.png",
        fileUrl: "",
      },
    ],
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("ALL");

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [activeOfficeCategory, setActiveOfficeCategory] =
    useState<OfficeCategory>("WORD");

  /* =========================================================
     OFFICE PROJECT MODAL
     ========================================================= */

  const [selectedOfficeProject, setSelectedOfficeProject] =
    useState<{
      project: OfficeProject;
      category: OfficeCategory;
      accent: string;
    } | null>(null);

  /* =========================================================
     IMAGE LIGHTBOX STATE
     ========================================================= */

  const [lightboxProject, setLightboxProject] =
    useState<Project | null>(null);

  const [lightboxIndex, setLightboxIndex] =
    useState(0);

  const [zoom, setZoom] = useState(1);

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

  /* =========================================================
     OPEN OFFICE PROJECT
     ========================================================= */

  const openOfficeProject = (
    project: OfficeProject,
    category: OfficeCategory,
    accent: string
  ) => {
    setSelectedOfficeProject({
      project,
      category,
      accent,
    });
  };

  /* =========================================================
     CLOSE OFFICE PROJECT
     ========================================================= */

  const closeOfficeProject = () => {
    setSelectedOfficeProject(null);
  };

  /* =========================================================
     OPEN IMAGE LIGHTBOX
     ========================================================= */

  const openImageViewer = (
    project: Project,
    index: number
  ) => {
    setLightboxProject(project);
    setLightboxIndex(index);
    setZoom(1);
  };

  /* =========================================================
     CLOSE IMAGE LIGHTBOX
     ========================================================= */

  const closeImageViewer = () => {
    setLightboxProject(null);
    setLightboxIndex(0);
    setZoom(1);
  };

  /* =========================================================
     PREVIOUS IMAGE
     ========================================================= */

  const previousImage = () => {
    if (!lightboxProject) return;

    setLightboxIndex((current) =>
      current === 0
        ? lightboxProject.screenshots.length - 1
        : current - 1
    );

    setZoom(1);
  };

  /* =========================================================
     NEXT IMAGE
     ========================================================= */

  const nextImage = () => {
    if (!lightboxProject) return;

    setLightboxIndex((current) =>
      current ===
      lightboxProject.screenshots.length - 1
        ? 0
        : current + 1
    );

    setZoom(1);
  };

  /* =========================================================
     ZOOM IN
     ========================================================= */

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(Number((current + 0.25).toFixed(2)), 3)
    );
  };

  /* =========================================================
     ZOOM OUT
     ========================================================= */

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(Number((current - 0.25).toFixed(2)), 0.5)
    );
  };

  /* =========================================================
     RESET ZOOM
     ========================================================= */

  const resetZoom = () => {
    setZoom(1);
  };

  /* =========================================================
     KEYBOARD CONTROLS — IMAGE
     ========================================================= */

  useEffect(() => {
    if (!lightboxProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeImageViewer();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "+" || event.key === "=") {
        zoomIn();
      }

      if (event.key === "-") {
        zoomOut();
      }

      if (event.key === "0") {
        resetZoom();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [lightboxProject]);

  /* =========================================================
     KEYBOARD CONTROLS — OFFICE MODAL
     ========================================================= */

  useEffect(() => {
    if (!selectedOfficeProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOfficeProject();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedOfficeProject]);

  /* =========================================================
     LOCK PAGE SCROLL
     ========================================================= */

  useEffect(() => {
    if (lightboxProject || selectedOfficeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxProject, selectedOfficeProject]);

  return (
    <main className="projects-page">
      {/* =====================================================
          ATMOSPHERE
          ===================================================== */}

      <div className="projects-noise" />
      <div className="projects-grid-bg" />
      <div className="projects-orb projects-orb-one" />
      <div className="projects-orb projects-orb-two" />

      {/* =====================================================
          HERO
          ===================================================== */}

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
                A collection of interfaces, applications and
                digital experiences built with modern web
                technologies and a strong focus on detail.
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

      {/* =====================================================
          FEATURED
          ===================================================== */}

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

                <div
                  className="projects-featured-window"
                  style={{
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div className="projects-window-bar">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div
                    style={{
                      position: "relative",
                      height: "calc(100% - 30px)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={featuredProject.screenshots[0]}
                      alt={`${featuredProject.title} preview`}
                      onClick={(event) => {
                        event.stopPropagation();
                        openImageViewer(
                          featuredProject,
                          0
                        );
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                        cursor: "zoom-in",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(5,5,12,.65), transparent 55%)",
                        pointerEvents: "none",
                      }}
                    />

                    <button
                      type="button"
                      aria-label="Open screenshot"
                      onClick={(event) => {
                        event.stopPropagation();
                        openImageViewer(
                          featuredProject,
                          0
                        );
                      }}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                        zIndex: 5,
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        border:
                          "1px solid rgba(255,255,255,.18)",
                        background:
                          "rgba(0,0,0,.48)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backdropFilter:
                          "blur(10px)",
                      }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: 18,
                    bottom: 38,
                    display: "flex",
                    gap: 7,
                    zIndex: 5,
                  }}
                >
                  {featuredProject.screenshots.map(
                    (screenshot, index) => (
                      <button
                        type="button"
                        key={screenshot}
                        aria-label={`Open screenshot ${
                          index + 1
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          openImageViewer(
                            featuredProject,
                            index
                          );
                        }}
                        style={{
                          width: 42,
                          height: 30,
                          padding: 0,
                          borderRadius: 5,
                          overflow: "hidden",
                          border:
                            index === 0
                              ? "1px solid rgba(255,255,255,.85)"
                              : "1px solid rgba(255,255,255,.22)",
                          background: "#111",
                          cursor: "zoom-in",
                        }}
                      >
                        <img
                          src={screenshot}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </button>
                    )
                  )}
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
                  {featuredProject.liveUrl ? (
                   <a
  href={featuredProject.liveUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex min-h-[56px] w-full items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-7 py-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.025] hover:border-pink-300/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40 sm:w-fit sm:min-w-[200px]"
  onClick={(event) => event.stopPropagation()}
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-10 left-1/2 h-24 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-xl opacity-0 transition-all duration-700 group-hover:bottom-[-5px] group-hover:opacity-100" />

  {/* Floating liquid bubble */}
  <span className="absolute bottom-[-20px] left-[15%] h-16 w-16 rounded-full bg-pink-300/70 blur-md opacity-0 transition-all duration-700 group-hover:bottom-[8px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 flex items-center">
    <span className="font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
      VIEW LIVE
    </span>

    <ExternalLink
      size={16}
      className="ml-3 text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.95)]"
    />
  </span>
</a>
                  ) : null}

                  <div className="project-links">
                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        <GitBranch size={16} />
                        Frontend
                        <ArrowUpRight size={14} />
                      </a>
                    )}

                    {featuredProject.backendGithubUrl && (
                      <a
                        href={
                          featuredProject.backendGithubUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        <GitBranch size={16} />
                        Backend
                        <ArrowUpRight size={14} />
                      </a>
                    )}

                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        <ExternalLink size={16} />
                        Live Demo
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    className="projects-open-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProject(
                        featuredProject
                      );
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

      {/* =====================================================
          PROJECT ARCHIVE
          ===================================================== */}

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
              Explore the collection by project type. Every
              build is approached as a real digital product,
              not just a visual mockup.
            </p>
          </div>

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
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

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
                <div
                  className="project-card-visual"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {project.screenshots[0] ? (
                    <img
                      src={project.screenshots[0]}
                      alt={`${project.title} preview`}
                      onClick={(event) => {
                        event.stopPropagation();
                        openImageViewer(project, 0);
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        cursor: "zoom-in",
                      }}
                    />
                  ) : null}

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(5,5,12,.88), rgba(5,5,12,.05) 70%)",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    className="project-card-number"
                    style={{ zIndex: 3 }}
                  >
                    {project.number}
                  </div>

                  <div
                    className="project-card-mark"
                    style={{
                      zIndex: 3,
                      position: "relative",
                    }}
                  >
                    <Layers3
                      size={32}
                      strokeWidth={1.1}
                    />
                  </div>

                  <span
                    className="project-card-type"
                    style={{ zIndex: 3 }}
                  >
                    {project.type}
                  </span>

                  <div
                    style={{
                      position: "absolute",
                      left: 16,
                      bottom: 16,
                      display: "flex",
                      gap: 5,
                      zIndex: 4,
                    }}
                  >
                    {project.screenshots
                      .slice(0, 5)
                      .map((screenshot, index) => (
                        <button
                          type="button"
                          key={screenshot}
                          aria-label={`Open ${
                            project.title
                          } screenshot ${index + 1}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            openImageViewer(
                              project,
                              index
                            );
                          }}
                          style={{
                            width: 31,
                            height: 22,
                            padding: 0,
                            borderRadius: 4,
                            overflow: "hidden",
                            border:
                              index === 0
                                ? "1px solid rgba(255,255,255,.8)"
                                : "1px solid rgba(255,255,255,.18)",
                            background: "#111",
                            cursor: "zoom-in",
                          }}
                        >
                          <img
                            src={screenshot}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </button>
                      ))}
                  </div>

                  <div
                    className="project-card-corner"
                    style={{ zIndex: 4 }}
                  >
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

                  <div className="project-card-links">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        VIEW LIVE
                        <ExternalLink size={13} />
                      </a>
                    ) : null}

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        VIEW GITHUB
                        <GitBranch size={13} />
                      </a>
                    ) : null}

                    {project.backendGithubUrl ? (
                      <a
                        href={project.backendGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        VIEW BACKEND
                        <GitBranch size={13} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MS OFFICE — PROFESSIONAL PRODUCTIVITY SUITE
          ===================================================== */}

      <section
        style={{
          position: "relative",
          padding: "120px 0",
          overflow: "hidden",
          borderTop:
            "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,92,255,.12), transparent 68%)",
            top: -180,
            left: -160,
            pointerEvents: "none",
            filter: "blur(20px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(54,211,153,.08), transparent 68%)",
            right: -160,
            bottom: -180,
            pointerEvents: "none",
            filter: "blur(20px)",
          }}
        />

        <div className="projects-container">

          {/* HEADER */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 40,
              marginBottom: 55,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <div className="projects-eyebrow">
                <span>05</span>
                PROFESSIONAL PRODUCTIVITY
              </div>

              <h2
                style={{
                  margin: "18px 0 0",
                  fontSize:
                    "clamp(48px, 7vw, 92px)",
                  lineHeight: ".88",
                  letterSpacing: "-.055em",
                  fontWeight: 500,
                }}
              >
                MS OFFICE
                <br />
                <em
                  style={{
                    fontStyle: "normal",
                    opacity: .48,
                  }}
                >
                  SUITE.
                </em>
              </h2>
            </div>

            <div
              style={{
                maxWidth: 430,
                paddingBottom: 8,
              }}
            >
              <p
                style={{
                  margin: 0,
                  color:
                    "rgba(255,255,255,.52)",
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                A professional productivity portfolio
                covering documentation, business analytics,
                dashboards and high-impact presentations.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 18,
                  color:
                    "rgba(255,255,255,.34)",
                  fontSize: 9,
                  letterSpacing: ".16em",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background:
                      "rgba(255,255,255,.22)",
                  }}
                />
                WORD / EXCEL / POWERPOINT
              </div>
            </div>
          </div>

          {/* OFFICE CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: 14,
              position: "relative",
              zIndex: 2,
            }}
          >
            {officeSuite.map((office) => {
              const active =
                activeOfficeCategory === office.id;

              return (
                <button
                  type="button"
                  key={office.id}
                  onClick={() =>
                    setActiveOfficeCategory(
                      office.id
                    )
                  }
                  style={{
                    position: "relative",
                    minHeight: 300,
                    padding: 28,
                    textAlign: "left",
                    color: "#fff",
                    borderRadius: 18,
                    border: active
                      ? `1px solid ${office.accent}66`
                      : "1px solid rgba(255,255,255,.09)",
                    background: active
                      ? `linear-gradient(145deg, ${office.accent}13, rgba(255,255,255,.035))`
                      : "rgba(255,255,255,.025)",
                    boxShadow: active
                      ? `0 20px 80px ${office.accent}12, inset 0 1px 0 rgba(255,255,255,.08)`
                      : "inset 0 1px 0 rgba(255,255,255,.04)",
                    cursor: "pointer",
                    transition:
                      "all .35s ease",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: active ? 0 : "50%",
                      width: active ? "100%" : 0,
                      height: 1,
                      background: office.accent,
                      boxShadow: active
                        ? `0 0 22px ${office.accent}`
                        : "none",
                      transition:
                        "all .4s ease",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: 22,
                      right: 24,
                      fontSize: 9,
                      letterSpacing: ".16em",
                      color:
                        "rgba(255,255,255,.24)",
                    }}
                  >
                    0
                    {officeSuite.findIndex(
                      (item) =>
                        item.id === office.id
                    ) + 1}
                  </span>

                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: office.accent,
                      border: `1px solid ${office.accent}35`,
                      background: `${office.accent}0d`,
                      boxShadow: active
                        ? `0 0 35px ${office.accent}12`
                        : "none",
                      marginBottom: 30,
                      transition:
                        "all .35s ease",
                    }}
                  >
                    {office.icon}
                  </div>

                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: "-.02em",
                    }}
                  >
                    {office.label}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 8,
                      letterSpacing: ".18em",
                      color: office.accent,
                      fontWeight: 600,
                    }}
                  >
                    {office.subtitle}
                  </div>

                  <p
                    style={{
                      margin:
                        "20px 0 24px",
                      maxWidth: 330,
                      fontSize: 12,
                      lineHeight: 1.7,
                      color:
                        "rgba(255,255,255,.42)",
                    }}
                  >
                    {office.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 17,
                      borderTop:
                        "1px solid rgba(255,255,255,.07)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: ".12em",
                        color:
                          "rgba(255,255,255,.36)",
                      }}
                    >
                      {office.projects.length
                        .toString()
                        .padStart(2, "0")}{" "}
                      PROJECTS
                    </span>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: 9,
                        letterSpacing: ".12em",
                        color: active
                          ? "#fff"
                          : "rgba(255,255,255,.4)",
                      }}
                    >
                      EXPLORE
                      <ArrowUpRight
                        size={14}
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE FOLDER */}

          <div
            style={{
              marginTop: 18,
              position: "relative",
              zIndex: 2,
              border:
                "1px solid rgba(255,255,255,.08)",
              borderRadius: 18,
              background:
                "rgba(255,255,255,.018)",
              overflow: "hidden",
            }}
          >
            {officeSuite
              .filter(
                (office) =>
                  office.id ===
                  activeOfficeCategory
              )
              .map((office) => (
                <div key={office.id}>

                  {/* FOLDER HEADER */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 20,
                      padding:
                        "22px 26px",
                      borderBottom:
                        "1px solid rgba(255,255,255,.07)",
                      background:
                        "rgba(255,255,255,.02)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 13,
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: office.accent,
                          background:
                            `${office.accent}10`,
                          border:
                            `1px solid ${office.accent}30`,
                        }}
                      >
                        {office.icon}
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: ".08em",
                          }}
                        >
                          {office.label}
                        </div>

                        <div
                          style={{
                            marginTop: 4,
                            fontSize: 8,
                            letterSpacing: ".14em",
                            color:
                              "rgba(255,255,255,.3)",
                          }}
                        >
                          /PRODUCTIVITY-SUITE/
                          {office.id.toLowerCase()}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: ".12em",
                        color:
                          "rgba(255,255,255,.3)",
                      }}
                    >
                      {office.projects.length
                        .toString()
                        .padStart(2, "0")}{" "}
                      PROFESSIONAL BUILDS
                    </span>
                  </div>

                  {/* PROJECT LIST */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                    }}
                  >
                    {office.projects.map(
                      (
                        project,
                        index
                      ) => (
                        <div
                          key={project.id}
                          style={{
                            padding:
                              "22px 26px",
                            borderBottom:
                              "1px solid rgba(255,255,255,.055)",
                            borderRight:
                              index % 2 === 0
                                ? "1px solid rgba(255,255,255,.055)"
                                : "none",
                            transition:
                              "background .25s ease",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            openOfficeProject(
                              project,
                              office.id,
                              office.accent
                            )
                          }
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: 14,
                              alignItems: "flex-start",
                            }}
                          >
                            <span
                              style={{
                                flexShrink: 0,
                                fontSize: 9,
                                letterSpacing:
                                  ".12em",
                                color:
                                  office.accent,
                                paddingTop: 2,
                              }}
                            >
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <div
                              style={{
                                flex: 1,
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems:
                                    "flex-start",
                                  justifyContent:
                                    "space-between",
                                  gap: 16,
                                }}
                              >
                                <h4
                                  style={{
                                    margin: 0,
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color:
                                      "rgba(255,255,255,.9)",
                                  }}
                                >
                                  {
                                    project.title
                                  }
                                </h4>

                                <button
                                  type="button"
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();

                                    openOfficeProject(
                                      project,
                                      office.id,
                                      office.accent
                                    );
                                  }}
                                  style={{
                                    flexShrink: 0,
                                    display:
                                      "inline-flex",
                                    alignItems:
                                      "center",
                                    gap: 6,
                                    border:
                                      `1px solid ${office.accent}40`,
                                    background:
                                      `${office.accent}0b`,
                                    color:
                                      office.accent,
                                    borderRadius: 7,
                                    padding:
                                      "7px 10px",
                                    fontSize: 8,
                                    letterSpacing:
                                      ".12em",
                                    fontWeight: 600,
                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  OPEN
                                  <ArrowUpRight
                                    size={12}
                                  />
                                </button>
                              </div>

                              <p
                                style={{
                                  margin:
                                    "7px 0 14px",
                                  fontSize: 10,
                                  lineHeight:
                                    1.6,
                                  color:
                                    "rgba(255,255,255,.35)",
                                  maxWidth: 560,
                                }}
                              >
                                {
                                  project.description
                                }
                              </p>

                              <div
                                style={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "space-between",
                                  gap: 12,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 8,
                                    letterSpacing:
                                      ".1em",
                                    color:
                                      "rgba(255,255,255,.22)",
                                  }}
                                >
                                  {project.tools
                                    .slice(
                                      0,
                                      3
                                    )
                                    .join(
                                      " / "
                                    )}
                                </span>

                                <span
                                  style={{
                                    display:
                                      "flex",
                                    alignItems:
                                      "center",
                                    gap: 5,
                                    fontSize: 8,
                                    letterSpacing:
                                      ".1em",
                                    color:
                                      "rgba(255,255,255,.3)",
                                  }}
                                >
                                  VIEW DETAILS
                                  <ArrowUpRight
                                    size={11}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* FOOTER NOTE */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              marginTop: 22,
              padding:
                "0 4px",
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: ".12em",
                color:
                  "rgba(255,255,255,.24)",
              }}
            >
              PROFESSIONAL OFFICE WORKFLOW
            </span>

            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 9,
                letterSpacing: ".12em",
                color:
                  "rgba(255,255,255,.28)",
              }}
            >
              DOCUMENTS
              <span>•</span>
              ANALYTICS
              <span>•</span>
              PRESENTATIONS
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
          ===================================================== */}

      <section className="projects-process">
        <div className="projects-container">
          <div className="projects-section-heading">
            <div>
              <div className="projects-eyebrow">
                <span>06</span>
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
                Understand the idea, audience, goals and
                technical requirements before writing the
                first line of code.
              </p>
            </div>

            <div className="projects-process-item">
              <span>02</span>
              <Layers3 size={22} />

              <h3>STRUCTURE</h3>

              <p>
                Plan the architecture, components, pages and
                interactions so the product has a solid
                foundation.
              </p>
            </div>

            <div className="projects-process-item">
              <span>03</span>
              <ExternalLink size={22} />

              <h3>BUILD</h3>

              <p>
                Develop responsive interfaces and
                functionality using modern web technologies.
              </p>
            </div>

            <div className="projects-process-item">
              <span>04</span>
              <ArrowUpRight size={22} />

              <h3>REFINE</h3>

              <p>
                Test, optimize and polish the experience
                across devices before the final delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
          ===================================================== */}

      <section className="projects-cta">
        <div className="projects-cta-glow" />

        <div className="projects-container">
          <div className="projects-eyebrow">
            <span>07</span>
            NEXT PROJECT
          </div>

          <h2>
            YOUR IDEA
            <br />
            <em>COULD BE NEXT.</em>
          </h2>

          <p>
            Have a website, application or digital product in
            mind? Let's turn the idea into something people
            remember.
          </p>

          <div className="projects-cta-actions">
           <Link
  href="/contact"
  className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 flex items-center">
    <span className="font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
      START A PROJECT
    </span>

    <ArrowUpRight
      size={15}
      className="ml-2 text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_7px_rgba(251,113,133,0.95)]"
    />
  </span>
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

      {/* =====================================================
          PROJECT DETAILS MODAL — WEB
          ===================================================== */}

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

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(5, minmax(0, 1fr))",
                gap: 8,
                marginBottom: 28,
              }}
            >
              {selectedProject.screenshots.map(
                (screenshot, index) => (
                  <button
                    type="button"
                    key={screenshot}
                    onClick={() =>
                      openImageViewer(
                        selectedProject,
                        index
                      )
                    }
                    aria-label={`Zoom ${
                      selectedProject.title
                    } screenshot ${index + 1}`}
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 10",
                      overflow: "hidden",
                      borderRadius: 8,
                      border:
                        "1px solid rgba(255,255,255,.1)",
                      background: "#09090d",
                      padding: 0,
                      cursor: "zoom-in",
                    }}
                  >
                    <img
                      src={screenshot}
                      alt={`${selectedProject.title} screenshot ${
                        index + 1
                      }`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        left: 7,
                        bottom: 6,
                        fontSize: 9,
                        letterSpacing: ".08em",
                        color:
                          "rgba(255,255,255,.85)",
                        background:
                          "rgba(0,0,0,.58)",
                        padding: "3px 5px",
                        borderRadius: 3,
                      }}
                    >
                      0{index + 1}
                    </span>

                    <span
                      style={{
                        position: "absolute",
                        right: 7,
                        top: 7,
                        width: 25,
                        height: 25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                        background:
                          "rgba(0,0,0,.55)",
                        color: "#fff",
                      }}
                    >
                      <Maximize2 size={12} />
                    </span>
                  </button>
                )
              )}
            </div>

            {selectedProject.video && (
              <div
                style={{
                  marginBottom: 30,
                  borderRadius: 10,
                  overflow: "hidden",
                  border:
                    "1px solid rgba(255,255,255,.1)",
                  background: "#050508",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    fontSize: 10,
                    letterSpacing: ".16em",
                    color:
                      "rgba(255,255,255,.55)",
                    borderBottom:
                      "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  PROJECT WALKTHROUGH
                </div>

                <video
                  controls
                  preload="metadata"
                  style={{
                    width: "100%",
                    display: "block",
                    maxHeight: 520,
                    background: "#000",
                  }}
                >
                  <source
                    src={selectedProject.video}
                    type="video/mp4"
                  />
                  Your browser does not support video
                  playback.
                </video>
              </div>
            )}

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

            {(selectedProject.liveUrl ||
              selectedProject.githubUrl ||
              selectedProject.backendGithubUrl) && (
              <div className="project-modal-actions">
                {selectedProject.liveUrl ? (
                <a
  href={selectedProject.liveUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 flex items-center">
    <span className="font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
      VIEW LIVE
    </span>

    <ExternalLink
      size={15}
      className="ml-2 text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_7px_rgba(251,113,133,0.95)]"
    />
  </span>
</a>
                ) : null}

                {selectedProject.githubUrl ? (
                <a
  href={selectedProject.githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-700 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-500 hover:scale-[1.02] hover:border-pink-300/70 hover:shadow-[0_0_32px_rgba(236,72,153,0.55)] focus:outline-none focus:ring-2 focus:ring-pink-300/40"
>
  {/* Liquid pink fill */}
  <span className="absolute inset-x-0 bottom-0 h-full translate-y-[105%] bg-gradient-to-t from-pink-600 via-fuchsia-500 to-pink-300 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />

  {/* Liquid glow */}
  <span className="absolute -bottom-8 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[50%] bg-pink-300/70 blur-lg opacity-0 transition-all duration-700 group-hover:bottom-[-4px] group-hover:opacity-100" />

  {/* Content */}
  <span className="relative z-10 flex items-center">
    <GitBranch
      size={15}
      className="text-white transition-all duration-500 group-hover:text-pink-100 group-hover:drop-shadow-[0_0_7px_rgba(251,113,133,0.95)]"
    />

    <span className="ml-2 font-medium text-white drop-shadow-[0_1px_3px_rgba(40,0,60,0.8)]">
      VIEW GITHUB
    </span>
  </span>
</a>
                ) : null}

                {selectedProject.backendGithubUrl ? (
                  <a
                    href={selectedProject.backendGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-secondary-button"
                  >
                    <GitBranch size={16} />
                    VIEW BACKEND
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          MS OFFICE PROJECT DETAIL MODAL
          ===================================================== */}

      {selectedOfficeProject && (
        <div
          onClick={closeOfficeProject}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99990,
            background:
              "rgba(2,2,7,.88)",
            backdropFilter: "blur(18px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              position: "relative",
              width: "min(920px, 100%)",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
              borderRadius: 22,
              border:
                `1px solid ${selectedOfficeProject.accent}35`,
              background:
                "linear-gradient(145deg, rgba(17,17,27,.98), rgba(7,7,13,.98))",
              boxShadow:
                `0 40px 140px rgba(0,0,0,.65), 0 0 80px ${selectedOfficeProject.accent}0c`,
            }}
          >
            {/* TOP ACCENT */}

            <div
              style={{
                position: "absolute",
                top: 0,
                left: "8%",
                right: "8%",
                height: 1,
                background:
                  selectedOfficeProject.accent,
                boxShadow:
                  `0 0 28px ${selectedOfficeProject.accent}`,
              }}
            />

            {/* CLOSE */}

            <button
              type="button"
              onClick={closeOfficeProject}
              aria-label="Close Office project"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                zIndex: 5,
                width: 40,
                height: 40,
                borderRadius: 9,
                border:
                  "1px solid rgba(255,255,255,.12)",
                background:
                  "rgba(255,255,255,.05)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>

            {/* HEADER */}

            <div
              style={{
                padding:
                  "38px 38px 28px",
                borderBottom:
                  "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding:
                      "7px 10px",
                    borderRadius: 7,
                    border:
                      `1px solid ${selectedOfficeProject.accent}30`,
                    background:
                      `${selectedOfficeProject.accent}0b`,
                    color:
                      selectedOfficeProject.accent,
                    fontSize: 8,
                    letterSpacing: ".16em",
                    fontWeight: 700,
                  }}
                >
                  MS {selectedOfficeProject.category}
                </span>

                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: ".14em",
                    color:
                      "rgba(255,255,255,.28)",
                  }}
                >
                  PROFESSIONAL BUILD
                </span>
              </div>

              <h2
                style={{
                  margin: 0,
                  paddingRight: 50,
                  fontSize:
                    "clamp(30px, 5vw, 52px)",
                  lineHeight: 1,
                  letterSpacing:
                    "-.045em",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {
                  selectedOfficeProject.project
                    .title
                }
              </h2>

              <p
                style={{
                  margin:
                    "16px 0 0",
                  maxWidth: 720,
                  fontSize: 13,
                  lineHeight: 1.8,
                  color:
                    "rgba(255,255,255,.48)",
                }}
              >
                {
                  selectedOfficeProject.project
                    .longDescription
                }
              </p>
            </div>

            {/* PREVIEW */}

            <div
              style={{
                padding:
                  "28px 38px 0",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: 300,
                  borderRadius: 14,
                  overflow: "hidden",
                  border:
                    "1px solid rgba(255,255,255,.09)",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,.035), rgba(255,255,255,.012))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedOfficeProject.project.preview ? (
                  <>
                    <img
                      src={
                        selectedOfficeProject
                          .project.preview
                      }
                      alt={
                        selectedOfficeProject
                          .project.title
                      }
                      style={{
                        width: "100%",
                        height: 430,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(4,4,10,.5), transparent 60%)",
                        pointerEvents: "none",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          selectedOfficeProject
                            .project
                            .preview,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      style={{
                        position: "absolute",
                        right: 15,
                        top: 15,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        padding:
                          "9px 12px",
                        borderRadius: 8,
                        border:
                          "1px solid rgba(255,255,255,.15)",
                        background:
                          "rgba(0,0,0,.55)",
                        backdropFilter:
                          "blur(10px)",
                        color: "#fff",
                        fontSize: 8,
                        letterSpacing: ".12em",
                        cursor: "pointer",
                      }}
                    >
                      OPEN PREVIEW
                      <ExternalLink
                        size={13}
                      />
                    </button>
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: 40,
                    }}
                  >
                    <div
                      style={{
                        width: 76,
                        height: 76,
                        margin:
                          "0 auto 20px",
                        borderRadius: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color:
                          selectedOfficeProject.accent,
                        border:
                          `1px solid ${selectedOfficeProject.accent}30`,
                        background:
                          `${selectedOfficeProject.accent}0c`,
                        boxShadow:
                          `0 0 50px ${selectedOfficeProject.accent}10`,
                      }}
                    >
                      {selectedOfficeProject.category ===
                      "WORD" ? (
                        <FileText
                          size={36}
                          strokeWidth={1.2}
                        />
                      ) : selectedOfficeProject.category ===
                        "EXCEL" ? (
                        <Table2
                          size={36}
                          strokeWidth={1.2}
                        />
                      ) : (
                        <Presentation
                          size={36}
                          strokeWidth={1.2}
                        />
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: ".16em",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      PROJECT PREVIEW
                    </div>

                    <p
                      style={{
                        margin:
                          "9px auto 0",
                        maxWidth: 330,
                        fontSize: 10,
                        lineHeight: 1.6,
                        color:
                          "rgba(255,255,255,.3)",
                      }}
                    >
                      Add the project screenshot
                      to display the visual preview
                      here.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 22,
                padding:
                  "28px 38px",
              }}
            >
              {/* TOOLS */}

              <div
                style={{
                  padding: 22,
                  borderRadius: 14,
                  border:
                    "1px solid rgba(255,255,255,.07)",
                  background:
                    "rgba(255,255,255,.018)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    marginBottom: 15,
                    fontSize: 9,
                    letterSpacing: ".16em",
                    color:
                      "rgba(255,255,255,.3)",
                  }}
                >
                  TOOLS & SKILLS
                </span>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                  }}
                >
                  {selectedOfficeProject.project.tools.map(
                    (tool) => (
                      <span
                        key={tool}
                        style={{
                          padding:
                            "7px 9px",
                          borderRadius: 6,
                          border:
                            `1px solid ${selectedOfficeProject.accent}20`,
                          background:
                            `${selectedOfficeProject.accent}08`,
                          color:
                            "rgba(255,255,255,.65)",
                          fontSize: 9,
                        }}
                      >
                        {tool}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* DELIVERABLES */}

              <div
                style={{
                  padding: 22,
                  borderRadius: 14,
                  border:
                    "1px solid rgba(255,255,255,.07)",
                  background:
                    "rgba(255,255,255,.018)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    marginBottom: 15,
                    fontSize: 9,
                    letterSpacing: ".16em",
                    color:
                      "rgba(255,255,255,.3)",
                  }}
                >
                  KEY DELIVERABLES
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 10,
                  }}
                >
                  {selectedOfficeProject.project.deliverables.map(
                    (item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems:
                            "flex-start",
                          gap: 9,
                          fontSize: 10,
                          lineHeight: 1.5,
                          color:
                            "rgba(255,255,255,.55)",
                        }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            width: 5,
                            height: 5,
                            marginTop: 5,
                            borderRadius:
                              "50%",
                            background:
                              selectedOfficeProject.accent,
                            boxShadow:
                              `0 0 10px ${selectedOfficeProject.accent}`,
                          }}
                        />
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER ACTIONS */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: 15,
                padding:
                  "20px 38px 30px",
                borderTop:
                  "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: 8,
                    letterSpacing: ".14em",
                    color:
                      "rgba(255,255,255,.22)",
                  }}
                >
                  PROFESSIONAL PRODUCTIVITY
                </span>

                <span
                  style={{
                    display: "block",
                    marginTop: 5,
                    fontSize: 9,
                    color:
                      "rgba(255,255,255,.36)",
                  }}
                >
                  {selectedOfficeProject.category ===
                  "WORD"
                    ? "DOCUMENTATION & BUSINESS COMMUNICATION"
                    : selectedOfficeProject.category ===
                      "EXCEL"
                    ? "ANALYTICS & BUSINESS DATA"
                    : "PRESENTATION & VISUAL STORYTELLING"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 9,
                  alignItems: "center",
                }}
              >
                {selectedOfficeProject.project
                  .fileUrl ? (
                  <a
                    href={
                      selectedOfficeProject.project
                        .fileUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:
                        "inline-flex",
                      alignItems:
                        "center",
                      gap: 8,
                      padding:
                        "11px 15px",
                      borderRadius: 8,
                      background:
                        selectedOfficeProject.accent,
                      color: "#08080d",
                      textDecoration:
                        "none",
                      fontSize: 9,
                      letterSpacing:
                        ".12em",
                      fontWeight: 700,
                    }}
                  >
                    OPEN FILE
                    <ExternalLink
                      size={14}
                    />
                  </a>
                ) : selectedOfficeProject.project
                    .preview ? (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        selectedOfficeProject
                          .project
                          .preview,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    style={{
                      display:
                        "inline-flex",
                      alignItems:
                        "center",
                      gap: 8,
                      padding:
                        "11px 15px",
                      borderRadius: 8,
                      border:
                        `1px solid ${selectedOfficeProject.accent}45`,
                      background:
                        `${selectedOfficeProject.accent}10`,
                      color:
                        selectedOfficeProject.accent,
                      fontSize: 9,
                      letterSpacing:
                        ".12em",
                      fontWeight: 700,
                      cursor:
                        "pointer",
                    }}
                  >
                    OPEN PREVIEW
                    <ExternalLink
                      size={14}
                    />
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={closeOfficeProject}
                  style={{
                    display:
                      "inline-flex",
                    alignItems:
                      "center",
                    gap: 8,
                    padding:
                      "11px 15px",
                    borderRadius: 8,
                    border:
                      "1px solid rgba(255,255,255,.12)",
                    background:
                      "rgba(255,255,255,.04)",
                    color:
                      "rgba(255,255,255,.7)",
                    fontSize: 9,
                    letterSpacing:
                      ".12em",
                    cursor:
                      "pointer",
                  }}
                >
                  CLOSE
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          FULLSCREEN IMAGE LIGHTBOX
          ===================================================== */}

      {lightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxProject.title} screenshot viewer`}
          onClick={closeImageViewer}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background:
              "rgba(2,2,7,.96)",
            backdropFilter: "blur(18px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              flexShrink: 0,
              height: 68,
              padding:
                "0 18px",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              borderBottom:
                "1px solid rgba(255,255,255,.09)",
              background:
                "rgba(4,4,10,.72)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: ".18em",
                  color:
                    "rgba(255,255,255,.42)",
                  whiteSpace:
                    "nowrap",
                }}
              >
                {lightboxProject.number}
              </span>

              <span
                style={{
                  width: 1,
                  height: 18,
                  background:
                    "rgba(255,255,255,.16)",
                }}
              />

              <span
                style={{
                  fontSize: 12,
                  letterSpacing: ".14em",
                  color: "#fff",
                  fontWeight: 600,
                  whiteSpace:
                    "nowrap",
                  overflow: "hidden",
                  textOverflow:
                    "ellipsis",
                }}
              >
                {lightboxProject.title}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  zoomOut();
                }}
                aria-label="Zoom out"
                title="Zoom out"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 7,
                  border:
                    "1px solid rgba(255,255,255,.12)",
                  background:
                    "rgba(255,255,255,.05)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Minus size={16} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  resetZoom();
                }}
                title="Reset zoom"
                style={{
                  minWidth: 58,
                  height: 38,
                  padding:
                    "0 8px",
                  borderRadius: 7,
                  border:
                    "1px solid rgba(255,255,255,.12)",
                  background:
                    "rgba(255,255,255,.05)",
                  color:
                    "rgba(255,255,255,.78)",
                  fontSize: 10,
                  letterSpacing:
                    ".06em",
                  cursor: "pointer",
                }}
              >
                {Math.round(
                  zoom * 100
                )}
                %
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  zoomIn();
                }}
                aria-label="Zoom in"
                title="Zoom in"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 7,
                  border:
                    "1px solid rgba(255,255,255,.12)",
                  background:
                    "rgba(255,255,255,.05)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Plus size={16} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  resetZoom();
                }}
                aria-label="Reset zoom"
                title="Reset zoom"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 7,
                  border:
                    "1px solid rgba(255,255,255,.12)",
                  background:
                    "rgba(255,255,255,.05)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={15} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeImageViewer();
                }}
                aria-label="Close image viewer"
                title="Close"
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 5,
                  borderRadius: 7,
                  border:
                    "1px solid rgba(255,255,255,.16)",
                  background:
                    "rgba(255,255,255,.08)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding:
                "30px 80px 100px",
            }}
          >
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous screenshot"
              title="Previous screenshot"
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform:
                  "translateY(-50%)",
                zIndex: 10,
                width: 48,
                height: 48,
                borderRadius:
                  "50%",
                border:
                  "1px solid rgba(255,255,255,.16)",
                background:
                  "rgba(0,0,0,.55)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter:
                  "blur(10px)",
              }}
            >
              <ArrowLeft size={20} />
            </button>

            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "auto",
              }}
            >
              <img
                src={
                  lightboxProject.screenshots[
                    lightboxIndex
                  ]
                }
                alt={`${lightboxProject.title} screenshot ${
                  lightboxIndex + 1
                }`}
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  transform: `scale(${zoom})`,
                  transformOrigin:
                    "center center",
                  transition:
                    "transform .2s ease",
                  cursor:
                    zoom > 1
                      ? "zoom-out"
                      : "zoom-in",
                  userSelect: "none",
                  borderRadius: 6,
                  boxShadow:
                    "0 30px 100px rgba(0,0,0,.55)",
                }}
                onClick={(event) => {
                  event.stopPropagation();

                  if (zoom === 1) {
                    zoomIn();
                  }
                }}
              />
            </div>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next screenshot"
              title="Next screenshot"
              style={{
                position: "absolute",
                right: 18,
                top: "50%",
                transform:
                  "translateY(-50%)",
                zIndex: 10,
                width: 48,
                height: 48,
                borderRadius:
                  "50%",
                border:
                  "1px solid rgba(255,255,255,.16)",
                background:
                  "rgba(0,0,0,.55)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter:
                  "blur(10px)",
              }}
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              position: "absolute",
              left: "50%",
              bottom: 18,
              transform:
                "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding:
                "8px 10px",
              borderRadius: 10,
              border:
                "1px solid rgba(255,255,255,.1)",
              background:
                "rgba(8,8,15,.82)",
              backdropFilter:
                "blur(16px)",
              maxWidth:
                "calc(100vw - 30px)",
              overflowX:
                "auto",
            }}
          >
            {lightboxProject.screenshots.map(
              (screenshot, index) => (
                <button
                  type="button"
                  key={screenshot}
                  onClick={() => {
                    setLightboxIndex(
                      index
                    );
                    setZoom(1);
                  }}
                  aria-label={`Screenshot ${
                    index + 1
                  }`}
                  style={{
                    flexShrink: 0,
                    width: 76,
                    height: 48,
                    padding: 0,
                    overflow:
                      "hidden",
                    borderRadius: 5,
                    border:
                      index ===
                      lightboxIndex
                        ? "1px solid rgba(255,255,255,.9)"
                        : "1px solid rgba(255,255,255,.12)",
                    background:
                      "#111",
                    opacity:
                      index ===
                      lightboxIndex
                        ? 1
                        : 0.55,
                    cursor:
                      "pointer",
                    transition:
                      "all .2s ease",
                  }}
                >
                  <img
                    src={screenshot}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit:
                        "cover",
                      display:
                        "block",
                    }}
                  />
                </button>
              )
            )}
          </div>

          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 22,
              fontSize: 10,
              letterSpacing: ".12em",
              color:
                "rgba(255,255,255,.45)",
              pointerEvents:
                "none",
            }}
          >
            {String(
              lightboxIndex + 1
            ).padStart(2, "0")}{" "}
            /{" "}
            {String(
              lightboxProject
                .screenshots
                .length
            ).padStart(2, "0")}
          </div>

          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 22,
              fontSize: 9,
              letterSpacing: ".08em",
              color:
                "rgba(255,255,255,.32)",
              pointerEvents:
                "none",
            }}
          >
            ← → NAVIGATE&nbsp;&nbsp; • &nbsp;&nbsp;
            + − ZOOM&nbsp;&nbsp; • &nbsp;&nbsp;
            ESC CLOSE
          </div>
        </div>
      )}
    </main>
  );
}