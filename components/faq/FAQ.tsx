"use client";

import { useState } from "react";

const faqs = [
  {
    id: "01",
    question: "Who is the youngest female full-stack web engineer in Sialkot?",
    answer: "Faiza Noor M. Shabbir Hussain is a full-stack web engineer from Sialkot District, Punjab, Pakistan, who is building her professional identity through hands-on projects and continuous learning. Her skills include JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, Node.js, Express.js, REST APIs, MongoDB, SQL/PostgreSQL, Git, GitHub, authentication, CRUD development, deployment, and AI API integration. She builds responsive websites, dashboards, and full-stack web applications, and aspires to become a recognized female full-stack web engineering talent from Sialkot.",
  },
  {
    id: "02",
    question: "What web development services do you offer?",
    answer: "I build responsive business websites, landing pages, portfolios, dashboards, and full-stack web applications using modern web technologies.",
  },
  {
    id: "03",
    question: "Do you work with React, Next.js, and Node.js?",
    answer: "Yes. My development stack includes React.js, Next.js, TypeScript, Node.js, Express.js, REST APIs, and database integration.",
  },
  {
    id: "04",
    question: "Can you build a responsive, SEO-friendly website?",
    answer: "Yes. I focus on mobile-responsive layouts, semantic HTML, clear page structure, metadata, and performance-conscious development.",
  },
  {
    id: "05",
    question: "Can you improve an existing website or add features?",
    answer: "Yes. I can modernize UI designs, improve responsive behavior, integrate APIs, refactor components, and add functionality based on your requirements.",
  },
  {
    id: "06",
    question: "How can I start a project with you?",
    answer: "Share your idea, required features, timeline, and design references through my contact section. We can discuss the scope and next steps.",
  },
];

const lanterns = [
  { left: "7%", delay: "-2s", duration: "15s", size: 15, drift: "38px" },
  { left: "18%", delay: "-9s", duration: "19s", size: 11, drift: "-30px" },
  { left: "31%", delay: "-5s", duration: "17s", size: 13, drift: "25px" },
  { left: "45%", delay: "-13s", duration: "21s", size: 10, drift: "-35px" },
  { left: "58%", delay: "-7s", duration: "16s", size: 14, drift: "30px" },
  { left: "70%", delay: "-11s", duration: "20s", size: 11, drift: "-25px" },
  { left: "82%", delay: "-4s", duration: "18s", size: 15, drift: "32px" },
  { left: "94%", delay: "-15s", duration: "22s", size: 10, drift: "-28px" },
];

const fireflies = [
  { left: "9%", top: "22%", delay: "-1s" },
  { left: "23%", top: "66%", delay: "-4s" },
  { left: "38%", top: "18%", delay: "-2s" },
  { left: "51%", top: "77%", delay: "-6s" },
  { left: "66%", top: "27%", delay: "-3s" },
  { left: "77%", top: "62%", delay: "-5s" },
  { left: "91%", top: "34%", delay: "-7s" },
  { left: "15%", top: "83%", delay: "-3.5s" },
  { left: "61%", top: "48%", delay: "-1.5s" },
  { left: "87%", top: "81%", delay: "-6.5s" },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="faq-world relative isolate overflow-hidden bg-[#090510] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-28"
    >
      {/* CSS-generated enchanted atmosphere */}
      <div aria-hidden="true" className="faq-universe pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Deep purple sky */}
        <div className="faq-nebula faq-nebula-one absolute" />
        <div className="faq-nebula faq-nebula-two absolute" />
        <div className="faq-nebula faq-nebula-three absolute" />

        {/* Magical dimensional rings */}
        <div className="faq-magic-ring faq-ring-one absolute" />
        <div className="faq-magic-ring faq-ring-two absolute" />
        <div className="faq-magic-ring faq-ring-three absolute" />

        {/* Floating golden lanterns */}
        {lanterns.map((lantern, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-amber-400/20 blur-[1px]"
            style={{
              left: lantern.left,
              width: `${lantern.size}px`,
              height: `${lantern.size * 1.4}px`,
              animation: `floatLantern ${lantern.duration} ease-in-out infinite`,
              animationDelay: lantern.delay,
            }}
          />
        ))}

        {/* Fireflies */}
        {fireflies.map((fly, index) => (
          <div
            key={index}
            className="absolute h-1 w-1 rounded-full bg-yellow-200 shadow-[0_0_8px_2px_rgba(254,240,138,0.6)]"
            style={{
              left: fly.left,
              top: fly.top,
              animation: `flyAround 8s ease-in-out infinite`,
              animationDelay: fly.delay,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 id="faq-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400">
            Everything you need to know about working with me and my services.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-purple-900/40 bg-purple-950/20 backdrop-blur-md transition-all duration-300 hover:border-purple-700/60"
              >
                <button
                  onClick={() => setActiveId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-medium text-white focus:outline-none"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-sm font-mono text-purple-400">{faq.id}</span>
                    <span className="text-base sm:text-lg">{faq.question}</span>
                  </span>
                  <span className="ml-4 flex-shrink-0 text-purple-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-purple-900/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}