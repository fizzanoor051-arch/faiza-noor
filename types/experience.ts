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