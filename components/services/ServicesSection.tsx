"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";

export type Service = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
};

const services: Service[] = [
  {
    number: "01",
    title: "Frontend Engineering",
    subtitle: "Interfaces that feel intentional.",
    description:
      "Modern, responsive interfaces built with reusable components, thoughtful interactions, clean architecture, and attention to the details users actually notice.",
    deliverables: [
      "Responsive websites",
      "React applications",
      "Next.js applications",
      "Reusable UI systems",
      "Interactive experiences",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    number: "02",
    title: "Full-Stack Development",
    subtitle: "From interface to data.",
    description:
      "End-to-end web applications connecting polished frontend experiences with APIs, backend services, authentication, databases, and deployment workflows.",
    deliverables: [
      "Full-stack applications",
      "REST APIs",
      "Authentication",
      "Database integration",
      "Application architecture",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
    ],
  },
  {
    number: "03",
    title: "Website Development",
    subtitle: "A digital presence built properly.",
    description:
      "Professional websites for personal brands, businesses, startups, and products—with responsive layouts, clear content hierarchy, and conversion-focused experiences.",
    deliverables: [
      "Business websites",
      "Portfolio websites",
      "Landing pages",
      "Product websites",
      "Mobile-first layouts",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "CSS",
    ],
  },
  {
    number: "04",
    title: "API & Backend Integration",
    subtitle: "Make the frontend communicate.",
    description:
      "Connecting interfaces to backend systems through structured APIs, handling application states, errors, authentication, and data-driven workflows.",
    deliverables: [
      "API integration",
      "REST endpoints",
      "Data fetching",
      "Authentication flows",
      "Error handling",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "REST",
      "TypeScript",
    ],
  },
  {
    number: "05",
    title: "UI Modernization",
    subtitle: "Turn dated experiences into modern products.",
    description:
      "Reworking existing interfaces with cleaner information architecture, responsive behavior, modern visual systems, and improved user experience.",
    deliverables: [
      "UI redesign",
      "Responsive improvements",
      "Component refactoring",
      "Visual modernization",
      "UX improvements",
    ],
    technologies: [
      "React",
      "CSS",
      "Tailwind CSS",
      "Design Systems",
    ],
  },
  {
    number: "06",
    title: "AI-Ready Web Experiences",
    subtitle: "Preparing products for intelligent features.",
    description:
      "Designing application structures that can incorporate practical AI-powered functionality while keeping the core user experience clear and useful.",
    deliverables: [
      "AI feature concepts",
      "AI-ready architecture",
      "API integration",
      "Interactive tools",
      "Automation ideas",
    ],
    technologies: [
      "Next.js",
      "APIs",
      "TypeScript",
      "AI Integration",
    ],
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState("01");

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#05050a] px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[10%] h-[420px] w-[420px] rounded-full bg-purple-600/7 blur-[150px]" />

        <div className="absolute bottom-[5%] right-[10%] h-[380px] w-[380px] rounded-full bg-cyan-500/5 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-purple-400" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300/70">
                06 / Services
              </span>
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              What I can
              <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                build for you.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40 lg:ml-auto">
            Whether you need a polished website, a modern frontend, or a
            complete web application, I focus on building useful products—not
            just attractive screens.
          </p>
        </div>

        {/* Services */}
        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              active={activeService === service.number}
              onSelect={() => setActiveService(service.number)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/8 bg-white/[0.018]">
          <div className="relative p-7 sm:p-10">
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-purple-500/5 to-transparent" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-purple-300/50">
                  have a project in mind?
                </p>

                <h3 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
                  Let&apos;s turn the idea into something people can use.
                </h3>
              </div>

              <a
                href="#contact"
                className="group inline-flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-purple-300/25 hover:bg-purple-300/10 hover:text-white"
              >
                Start a conversation

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}