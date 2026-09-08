
import { Hero } from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import TechUniverse from "@/components/skills/TechUniverse";
import SystemArchitecture from "@/components/architecture/SystemArchitecture";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import EngineeringWorkflow from "@/components/workflow/EngineeringWorkflow";
import ServicesSection from "@/components/services/ServicesSection";
import AILab from "@/components/ai/AILab";
import GitHubSection from "@/components/github/GitHubSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/FAQ";
import ContactSection from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
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
        id="architecture"
        className="home-section"
        aria-labelledby="architecture-heading"
      >
        <SystemArchitecture />
      </section>

      <section
        id="projects"
        className="home-section home-projects-section"
        aria-labelledby="projects-heading"
      >
        <FeaturedProjects />
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
        id="ai-lab"
        className="home-section home-section-dark"
        aria-labelledby="ai-heading"
      >
        <AILab />
      </section>

      <section
        id="github"
        className="home-section"
        aria-labelledby="github-heading"
      >
        <GitHubSection />
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

      <section
        id="contact"
        className="home-section home-contact-section"
        aria-labelledby="contact-heading"
      >
        <ContactSection />
      </section>
    </>
  );
}

