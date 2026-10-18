import PortfolioIntro from "@/components/PortfolioIntro";

import { Hero } from "@/components/hero/Hero";

import TechUniverse from "@/components/skills/TechUniverse";

import PersonSchema from "@/components/seo/PersonSchema";
import ServicesSection from "@/components/services/ServicesSection";


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

    <>
  <PersonSchema />
  {/* Tumhara existing homepage content */}
</>

      <section
        id="skills"
        className="home-section home-section-dark"
        aria-labelledby="skills-heading"
      >
        <TechUniverse />
      </section>

     

      <section
        id="services"
        className="home-section"
        aria-labelledby="services-heading"
      >
        <ServicesSection />
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