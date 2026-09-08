"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    id: "01",
    question: "What kind of websites do you build?",
    answer:
      "I focus on modern, responsive websites and web applications including business websites, landing pages, e-commerce interfaces, dashboards, portfolios, and custom React/Next.js applications.",
  },
  {
    id: "02",
    question: "Do you work with React and Next.js?",
    answer:
      "Yes. React and Next.js are central to my current frontend and full-stack development workflow. I use them to build reusable, responsive, and structured web experiences.",
  },
  {
    id: "03",
    question: "Can you connect a frontend to an API or backend?",
    answer:
      "Yes. I can work with REST APIs and integrate frontend applications with backend services. My current full-stack path also includes Node.js, Express.js, authentication, databases, and deployment.",
  },
  {
    id: "04",
    question: "Will the website work on mobile devices?",
    answer:
      "Yes. Responsive behavior is considered from the beginning so the interface can adapt across mobile, tablet, laptop, and larger screens.",
  },
  {
    id: "05",
    question: "Can you improve an existing website?",
    answer:
      "Yes. I can help modernize an existing interface by improving its visual system, responsiveness, component structure, performance considerations, and overall user experience.",
  },
  {
    id: "06",
    question: "How do you approach a new project?",
    answer:
      "I start by understanding the goal and users, then plan the structure, design the experience, build the interface, connect the required functionality, test important flows, and prepare the project for deployment.",
  },
  {
    id: "07",
    question: "Do you provide backend development?",
    answer:
      "I am expanding into full-stack development with Node.js, Express.js, APIs, authentication, and databases. For projects requiring advanced backend architecture, the exact scope should be discussed before starting.",
  },
  {
    id: "08",
    question: "How can I start a project with you?",
    answer:
      "Send the project requirements, goals, preferred timeline, and any existing designs or references through the contact section. From there, the scope can be discussed and the next steps defined.",
  },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#05050b] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-purple-300">
            <span className="h-px w-8 bg-purple-400" />
            FAQ
            <span className="h-px w-8 bg-purple-400" />
          </div>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions,{" "}
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              answered.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            A few practical answers before we turn an idea into a working
            product.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={activeId === faq.id}
              onToggle={() =>
                setActiveId((current) =>
                  current === faq.id ? null : faq.id,
                )
              }
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
            Still have a question? Let&apos;s talk about your project.
          </p>
        </div>
      </div>
    </section>
  );
}