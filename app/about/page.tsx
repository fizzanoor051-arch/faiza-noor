import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title:
    "Faiza Noor M. Shabbir Hussain | Full-Stack Web Engineer in Sialkot",
  description:
    "Meet Faiza Noor M. Shabbir Hussain, a self-learning Full-Stack Web Engineer from Sialkot District, Pakistan, building modern web applications with React, Next.js, TypeScript, Node.js, databases, and AI integration.",
  keywords: [
    "Faiza Noor",
    "Faiza Noor M. Shabbir Hussain",
    "Full-Stack Web Engineer in Sialkot",
    "Female Full-Stack Web Engineer Sialkot",
    "Web Developer District Sialkot",
    "React Developer Pakistan",
    "Next.js Developer Pakistan",
    "Full-Stack Developer Pakistan",
    "Node.js Developer",
    "AI Web Development",
  ],
  openGraph: {
    title: "Faiza Noor | Full-Stack Web Engineer",
    description:
      "Explore Faiza Noor's web engineering journey, technical skills, and selected projects.",
    type: "profile",
    url: "https://faiza-noor10.vercel.app/about",
    images: ["/images/enchanted-kingdom.webp"],
  },
  alternates: {
    canonical: "https://faiza-noor10.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}