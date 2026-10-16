
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE_URL = "https://faiza-noor10.vercel.app";

const fullName = "Faiza Noor M. Shabbir Hussain";

export const metadata: Metadata = {
  title:
    "Faiza Noor M. Shabbir Hussain | Female Full-Stack Web Engineer in Sialkot",

  description:
    "Official profile of Faiza Noor M. Shabbir Hussain, a female Full-Stack Web Engineer based in Sialkot District, Punjab, Pakistan. Explore her React, Next.js, TypeScript, Node.js, database, and AI web development skills, projects, education, and professional journey.",

  alternates: {
    canonical: `${SITE_URL}/about`,
  },

  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    siteName: "Faiza Noor Portfolio",
    title: `${fullName} | Full-Stack Web Engineer`,
    description:
      "Discover Faiza Noor M. Shabbir Hussain's professional journey, web engineering skills, education, and projects in Sialkot District, Pakistan.",
    images: [
      {
        url: "/images/enchanted-kingdom.webp",
        alt: `${fullName} — Full-Stack Web Engineer`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${fullName} | Full-Stack Web Engineer`,
    description:
      "Explore the official portfolio, skills, and projects of Faiza Noor M. Shabbir Hussain from Sialkot District, Pakistan.",
    images: ["/images/enchanted-kingdom.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#person`,
  name: fullName,
  url: `${SITE_URL}/about`,
  jobTitle: "Full-Stack Web Engineer",
  description:
    "A female Full-Stack Web Engineer based in Sialkot District, Punjab, Pakistan, focused on modern web applications and AI-powered digital experiences.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sialkot District",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  knowsAbout: [
    "Full-Stack Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "REST APIs",
    "AI API Integration",
  ],
  sameAs: [
    "https://github.com/fizzanoor051-arch",
    "https://www.linkedin.com/in/faiza-noor-b2711b42b/",
  ],
};

export default function AboutPage() {
  const safePersonSchema = JSON.stringify(personSchema).replace(
    /</g,
    "\\u003c",
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safePersonSchema }}
      />
      <AboutClient />
    </>
  );
}
