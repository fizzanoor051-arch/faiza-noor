
"use client";

import {
  Globe,
  Code2,
  MonitorSmartphone,
  Server,
  Database,
  ShoppingCart,
  LayoutDashboard,
  Palette,
  Sparkles,
  ShieldCheck,
  Search,
  Gauge,
  Bug,
  Rocket,
  Workflow,
  Cloud,
  Smartphone,
  Wrench,
} from "lucide-react";

import "./services.css";

const services = [
  { name: "Website Development", icon: Globe },
  { name: "Full-Stack Development", icon: Code2 },
  { name: "Frontend Development", icon: MonitorSmartphone },
  { name: "Backend Development", icon: Server },
  { name: "React & Next.js Development", icon: Code2 },
  { name: "REST API Development", icon: Workflow },
  { name: "Database Design & Integration", icon: Database },
  { name: "E-Commerce Development", icon: ShoppingCart },
  { name: "Dashboard & Admin Panels", icon: LayoutDashboard },
  { name: "UI Implementation", icon: Palette },
  { name: "AI API Integration", icon: Sparkles },
  { name: "Authentication & Authorization", icon: ShieldCheck },
  { name: "SEO Optimization", icon: Search },
  { name: "Performance Optimization", icon: Gauge },
  { name: "Website Bug Fixing", icon: Bug },
  { name: "Website Redesign", icon: Smartphone },
  { name: "Deployment & Hosting", icon: Cloud },
  { name: "Website Maintenance", icon: Wrench },
  { name: "Responsive Web Design", icon: MonitorSmartphone },
  { name: "Custom Web Applications", icon: Rocket },
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <span className="services-kicker">
          WHAT I DO
        </span>

        <h1 className="services-title">
          My <span>Services.</span>
        </h1>

        <p className="services-hero-description">
          Full-stack web solutions designed to build, improve
          and grow your digital presence.
        </p>
      </section>

      <section className="services-matrix-section">
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                className="service-card"
                key={service.name}
              >
                <span className="service-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="service-card-icon">
                  <Icon size={23} strokeWidth={1.6} />
                </div>

                <h2>{service.name}</h2>

                <span className="service-card-arrow">
                  ↗
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
