export type ProjectCategory =
  | "Full-Stack"
  | "Web Application"
  | "Frontend";

export type ProjectStatus =
  | "BUILDING"
  | "ACTIVE"
  | "EXPERIMENTAL";

export interface ProjectMetric {
  label: string;
  value: string;
}

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
  metrics: ProjectMetric[];
  color: string;
  featured: boolean;
  slug: string;
}

export type ProjectFilter =
  | "All"
  | ProjectCategory;