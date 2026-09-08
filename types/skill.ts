export type SkillLevel =
  | "Core"
  | "Working"
  | "Learning"
  | "Exploring";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  description: string;
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: Skill[];
}