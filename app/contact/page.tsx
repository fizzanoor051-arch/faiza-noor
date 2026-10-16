
"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  Copy,
  Globe,
  Heart,
  BriefcaseBusiness,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import "./contact.css";

const CONTACT = {
  name: "Faiza Noor",
  role: "Full-Stack Web Engineer",
  email: "fizzanoor051@gmail.com",
  whatsappNumber: "+923019346310",
  linkedin: "https://www.linkedin.com/in/faiza-noor-b2711b42b/",
  github: "https://github.com/fizzanoor051-arch",
  indeed: "https://profile.indeed.com/",
  location: "Punjab, Pakistan",
  timezone: "PKT · UTC+5",
  availability: "Available for freelance projects",
  responseTime: "Usually within 24 hours",
};

const whatsappDigits = CONTACT.whatsappNumber.replace(/\D/g, "");

const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;

const defaultMessage =
  "Hi Faiza! I'd like to discuss a web development project.";

const services = [
  "Full-Stack Development",
  "React & Next.js",
  "Business Websites",
  "Custom Dashboards",
  "E-commerce Solutions",
  "API Integration",
  "Responsive UI",
  "Website Optimization",
];

const profiles = [
  {
    number: "01",
    name: "LinkedIn",
    subtitle: "PROFESSIONAL NETWORK",
    description:
      "Connect for professional opportunities, collaborations and meaningful conversations.",
    href: CONTACT.linkedin,
    icon: BriefcaseBusiness,
  },
  {
    number: "02",
    name: "GitHub",
    subtitle: "PROJECTS & CODE",
    description:
      "Explore my repositories, web applications and hands-on development work.",
    href: CONTACT.github,
    icon: Code2,
  },
  {
    number: "03",
    name: "Indeed",
    subtitle: "CAREER PROFILE",
    description:
      "Visit my profile for career-related opportunities and professional updates.",
    href: CONTACT.indeed,
    icon: Globe,
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState<"email" | "whatsapp" | null>(null);
  const [formPrepared, setFormPrepared] = useState(false);
  const [copyError, setCopyError] = useState(false);

  // WhatsApp message-box state: hooks must stay inside the component.
  const [whatsappName, setWhatsappName] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  const copyValue = async (
    value: string,
    type: "email" | "whatsapp"
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setCopyError(false);
      window.setTimeout(() => setCopied(null), 2200);
    } catch {
      setCopyError(true);
      window.prompt("Copy this value:", value);
    }
  };

  const sendWhatsAppMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = whatsappMessage.trim();
    if (!message) return;

    const fullMessage = [
      "Hi Faiza!",
      whatsappName.trim()
        ? `My name is ${whatsappName.trim()}.`
        : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const url = whatsappLink(fullMessage);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) return;

    const mailSubject = subject || `Project enquiry from ${name}`;

    const body = [
      "Hello Faiza,",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Project details:",
      message,
      "",
      "Sent through your portfolio contact form.",
    ].join("\n");

    const mailto =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(body)}`;

    setFormPrepared(true);
    window.location.href = mailto;
  };

  return (
    <main className="contact-page" id="top">
      <div className="contact-atmosphere" aria-hidden="true">
        <span className="contact-glow contact-glow-one" />
        <span className="contact-glow contact-glow-two" />
        <span className="contact-orbit" />
        <span className="contact-orbit contact-orbit-two" />
      </div>

      {/* HERO */}
      <section className="contact-hero contact-container">
        <div className="contact-topline">
         
          <span className="contact-index">CONTACT / 06</span>
        </div>

        <div className="contact-hero-grid">
          <div className="contact-hero-copy">
            <span className="contact-eyebrow">
              HAVE A PROJECT IN MIND?
            </span>

            <h1 className="contact-title">
              Let&apos;s build
              <span> something great.</span>
            </h1>

            <p className="contact-intro">
              From a first idea to a fully functional digital
              product, I help turn your vision into thoughtful,
              reliable web experiences.
            </p>

            <div className="contact-hero-actions">
              <a
                href="#contact-form"
                className="contact-button contact-button-primary"
              >
                Start a project
                <ArrowDownRight size={17} />
              </a>

              <a
                href={whatsappLink(defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-button contact-button-secondary"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="contact-availability">
              <span className="contact-status-dot" />
              <span>{CONTACT.availability}</span>
            </div>
          </div>

          <aside className="contact-feature-card">
            <div className="contact-feature-top">
              <span className="contact-feature-icon">
                <Sparkles size={20} />
              </span>
              <span className="contact-feature-label">
                A NOTE FROM MY DESK
              </span>
            </div>

            <div className="contact-feature-art" aria-hidden="true">
              <span className="contact-art-ring contact-art-ring-one" />
              <span className="contact-art-ring contact-art-ring-two" />
              <span className="contact-art-star">✦</span>
              <span className="contact-art-sparkle">✧</span>
              <span className="contact-art-monogram">
                FN<span>.</span>
              </span>
            </div>

            <h2>Good ideas start with a conversation.</h2>
            <p>
              You don&apos;t need a perfect brief. Share what you have
              in mind, and we can figure out the next step together.
            </p>

            <div className="contact-feature-bottom">
              <span>FAIZA NOOR</span>
              <span>DESIGN · DEVELOP · DELIVER</span>
            </div>
          </aside>
        </div>

        <a href="#direct-contact" className="contact-scroll-link">
          <span>EXPLORE CONTACT OPTIONS</span>
          <ArrowDownRight size={15} />
        </a>
      </section>

      {/* DIRECT CONTACT */}
      <section
        className="contact-section contact-container"
        id="direct-contact"
      >
        <div className="contact-section-heading">
          <div>
            <span className="contact-overline">GET IN TOUCH</span>
            <h2>
              Choose your <span>connection.</span>
            </h2>
          </div>
          <p>
            Have a question, an opportunity or a project to discuss?
            Reach me through whichever channel works best for you.
          </p>
        </div>

        <div className="contact-direct-grid">
          <article className="contact-direct-card">
            <div className="contact-direct-icon">
              <Mail size={21} />
            </div>

            <div className="contact-direct-copy">
              <span className="contact-card-label">EMAIL ME</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="contact-direct-value"
              >
                {CONTACT.email}
              </a>
              <p>Projects, enquiries and opportunities.</p>
            </div>

            <button
              type="button"
              className="contact-copy-button"
              onClick={() => copyValue(CONTACT.email, "email")}
              aria-label="Copy email address"
            >
              {copied === "email" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
            </button>
          </article>

          <article className="contact-direct-card contact-direct-card-whatsapp">
            <div className="contact-direct-icon">
              <MessageCircle size={21} />
            </div>

            <div className="contact-direct-copy">
              <span className="contact-card-label">WHATSAPP</span>
              <a
                href={whatsappLink(defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-value"
              >
                {CONTACT.whatsappNumber}
              </a>
              <p>Quick questions and project discussions.</p>
            </div>

            <button
              type="button"
              className="contact-copy-button"
              onClick={() =>
                copyValue(CONTACT.whatsappNumber, "whatsapp")
              }
              aria-label="Copy WhatsApp number"
            >
              {copied === "whatsapp" ? (
                <Check size={17} />
              ) : (
                <Copy size={17} />
              )}
            </button>
          </article>
        </div>

        {/* DIRECT WHATSAPP MESSAGE BOX */}
        <div className="tangled-whatsapp-panel">
          <div className="tangled-whatsapp-visual" aria-hidden="true">
            <span className="tangled-lantern">✦</span>
            <span className="tangled-lantern tangled-lantern-two">✧</span>
            <span className="tangled-lantern tangled-lantern-three">✦</span>
            <span className="tangled-whatsapp-orbit" />
            <MessageCircle size={34} strokeWidth={1.4} />
          </div>

          <div className="tangled-whatsapp-content">
            <span className="tangled-eyebrow">
              <Sparkles size={13} />
              A LITTLE MESSAGE, A NEW BEGINNING
            </span>

            <h3>
              Send me a message,
              <span> let&apos;s make it happen.</span>
            </h3>

            <p>
              Have an idea, a question or a project in mind?
              Write directly here and continue the conversation on WhatsApp.
            </p>

            <form
              className="tangled-whatsapp-form"
              onSubmit={sendWhatsAppMessage}
            >
              <label className="tangled-whatsapp-field">
                <span>
                  Your name <small>(optional)</small>
                </span>
                <input
                  type="text"
                  value={whatsappName}
                  onChange={(event) => setWhatsappName(event.target.value)}
                  placeholder="What should I call you?"
                  autoComplete="name"
                  maxLength={80}
                />
              </label>

              <label className="tangled-whatsapp-field">
                <span>
                  Your message <b>*</b>
                </span>
                <textarea
                  value={whatsappMessage}
                  onChange={(event) =>
                    setWhatsappMessage(event.target.value)
                  }
                  placeholder="Hi Faiza! I'd like to discuss a project..."
                  rows={4}
                  maxLength={2000}
                  required
                />
                <small className="tangled-message-count">
                  {whatsappMessage.length}/2000
                </small>
              </label>

              <button
                type="submit"
                className="tangled-whatsapp-submit"
              >
                <MessageCircle size={18} />
                Send on WhatsApp
                <ArrowUpRight size={17} />
              </button>

              <span className="tangled-whatsapp-disclaimer">
                WhatsApp opens with your message ready to send.
                You must press Send in WhatsApp to deliver it.
              </span>
            </form>
          </div>
        </div>

        <p className="contact-copy-status" role="status" aria-live="polite">
          {copied === "email" && "Email address copied."}
          {copied === "whatsapp" && "WhatsApp number copied."}
          {copyError && "If copying failed, use the copy prompt instead."}
        </p>
      </section>

      {/* SOCIAL PROFILES */}
      <section className="contact-section contact-container">
        <div className="contact-section-heading">
          <div>
            <span className="contact-overline">AROUND THE WEB</span>
            <h2>
              Find me <span>online.</span>
            </h2>
          </div>
          <p>
            Explore my work, professional background and
            development journey.
          </p>
        </div>

        <div className="contact-profile-grid">
          {profiles.map((profile) => {
            const Icon = profile.icon;

            return (
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-profile-card"
                key={profile.number}
              >
                <div className="contact-profile-top">
                  <span>{profile.number} / 03</span>
                  <ArrowUpRight size={18} />
                </div>

                <div className="contact-profile-icon">
                  <Icon size={22} strokeWidth={1.7} />
                </div>

                <span className="contact-profile-subtitle">
                  {profile.subtitle}
                </span>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>

                <span className="contact-profile-link">
                  Visit profile <ArrowUpRight size={15} />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* EMAIL CONTACT FORM */}
      <section
        className="contact-form-section contact-container"
        id="contact-form"
      >
        <div className="contact-form-copy">
          <span className="contact-overline">
            YOUR IDEA, YOUR NEXT STEP
          </span>
          <h2>
            Let&apos;s talk about <span>your project.</span>
          </h2>
          <p>
            Tell me a little about what you want to build. Share
            your goals, the problem you&apos;re solving or even a rough
            starting point.
          </p>

          <div className="contact-detail-list">
            <div className="contact-detail-item">
              <span className="contact-detail-icon">
                <MapPin size={17} />
              </span>
              <div>
                <span>LOCATION</span>
                <strong>{CONTACT.location}</strong>
              </div>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-icon">
                <Clock3 size={17} />
              </span>
              <div>
                <span>TIME ZONE</span>
                <strong>{CONTACT.timezone}</strong>
              </div>
            </div>

            <div className="contact-detail-item">
              <span className="contact-detail-icon">
                <Mail size={17} />
              </span>
              <div>
                <span>RESPONSE TIME</span>
                <strong>{CONTACT.responseTime}</strong>
              </div>
            </div>
          </div>

          <div className="contact-form-note">
            <Heart size={17} />
            <p>
              <strong>Every great build starts somewhere.</strong>
              A simple message is all it takes to begin.
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-heading">
            <div>
              <span className="contact-overline">PROJECT ENQUIRY</span>
              <h3>Send a message</h3>
            </div>
            <span className="contact-form-heading-icon">
              <Send size={20} />
            </span>
          </div>

          <div className="contact-fields-grid">
            <label className="contact-field">
              <span>
                Your name <b>*</b>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </label>

            <label className="contact-field">
              <span>
                Email address <b>*</b>
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label className="contact-field">
            <span>What are you looking to build?</span>
            <input
              type="text"
              name="subject"
              placeholder="Website, application, dashboard..."
            />
          </label>

          <label className="contact-field">
            <span>
              Tell me about your idea <b>*</b>
            </span>
            <textarea
              name="message"
              placeholder="Your goals, requirements, timeline or anything you'd like to share..."
              rows={5}
              required
            />
          </label>

          <div className="contact-form-bottom">
            <p>
              This prepares an email in your default email app.
              Review it there and press Send to contact me.
            </p>

            <button type="submit" className="contact-submit-button">
              {formPrepared ? "Prepare again" : "Prepare email"}
              {formPrepared ? (
                <Check size={17} />
              ) : (
                <ArrowUpRight size={17} />
              )}
            </button>
          </div>
        </form>
      </section>

      {/* SERVICES */}
      <section className="contact-services contact-container">
        <div className="contact-services-heading">
          <span className="contact-overline">HOW I CAN HELP</span>
          <h2>
            From ideas to <span>real products.</span>
          </h2>
          <p>
            Thoughtful engineering for useful, accessible and
            responsive digital experiences.
          </p>
        </div>

        <div className="contact-services-list">
          {services.map((service, index) => (
            <div className="contact-service-chip" key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{service}</span>
              <Sparkles size={14} />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="contact-footer contact-container">
        <a
          href="#top"
          className="contact-footer-brand"
          aria-label="Back to top"
        >
          FN<span>.</span>
        </a>

        <div className="contact-footer-name">
          <strong>{CONTACT.name}</strong>
          <span>{CONTACT.role}</span>
        </div>

        <p className="contact-footer-signoff">
          Built with care <Heart size={13} /> and curiosity.
        </p>

        <span className="contact-footer-copyright">
          © {new Date().getFullYear()} FAIZA NOOR
        </span>
      </footer>

      {/* FIXED WHATSAPP CTA */}
      <a
        href={whatsappLink(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-floating-whatsapp"
        aria-label="Start a WhatsApp conversation"
      >
        <MessageCircle size={19} />
        <span>Let&apos;s talk</span>
      </a>
    </main>
  );
}
