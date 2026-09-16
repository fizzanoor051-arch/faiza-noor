import PortfolioIntro from "@/components/PortfolioIntro";

import { Hero } from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import TechUniverse from "@/components/skills/TechUniverse";

import EngineeringWorkflow from "@/components/workflow/EngineeringWorkflow";
import ServicesSection from "@/components/services/ServicesSection";

import ExperienceSection from "@/components/experience/ExperienceSection";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/FAQ";

export default function HomePage() {
  return (
    <>
      {/* Premium Portfolio Intro */}
      <PortfolioIntro />

      <section
        id="home"
        className="home-section home-hero-section"
        aria-label="Introduction"
      >
        <Hero />
      </section>

      <section
        id="about"
        className="home-section"
        aria-labelledby="about-heading"
      >
        <AboutSection />
      </section>

      <section
        id="skills"
        className="home-section home-section-dark"
        aria-labelledby="skills-heading"
      >
        <TechUniverse />
      </section>

      <section
        id="workflow"
        className="home-section home-section-dark"
        aria-labelledby="workflow-heading"
      >
        <EngineeringWorkflow />
      </section>

      <section
        id="services"
        className="home-section"
        aria-labelledby="services-heading"
      >
        <ServicesSection />
      </section>

      <section
        id="experience"
        className="home-section home-section-dark"
        aria-labelledby="experience-heading"
      >
        <ExperienceSection />
      </section>

      <section
        id="testimonials"
        className="home-section"
        aria-labelledby="testimonials-heading"
      >
        <Testimonials />
      </section>

      <section
        id="faq"
        className="home-section home-section-dark"
        aria-labelledby="faq-heading"
      >
        <FAQ />
      </section>
    </>
  );
}