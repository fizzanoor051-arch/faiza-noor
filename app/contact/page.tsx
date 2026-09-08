
"use client";

import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  GitBranch,
  Globe2,
  Link,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
  BriefcaseBusiness,
  Phone,
  Smile,
  Paperclip,
} from "lucide-react";
import "./contact.css";

/* =========================================================
   CONTACT DETAILS
   ========================================================= */

const CONTACT = {
  name: "Faiza Noor",
  role: "Full Stack Web Engineer",
  email: "fizzanoor051@gmail.com",

  // Pakistan WhatsApp number with country code.
  whatsappNumber: "+923019346310",

  linkedin: "www.linkedin.com/in/faiza-noor-b2711b42b",
  github: "https://github.com/fizzanoor051-arch",
  indeed: "https://profile.indeed.com/",

  location: "Punjab, Pakistan",
  timezone: "PKT (UTC +5)",
  availability: "Available for freelance projects",
  responseTime: "Usually replies within 24 hours",
};

/* =========================================================
   HELPERS
   ========================================================= */

const whatsappDigits = CONTACT.whatsappNumber.replace(/\D/g, "");

const createWhatsAppLink = (message: string) => {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    message
  )}`;
};

const defaultWhatsAppMessage =
  "Hi Faiza! I would like to discuss a web development project with you.";

const whatsappLink = createWhatsAppLink(defaultWhatsAppMessage);

const emailLink = `mailto:${CONTACT.email}`;

const socialLinks = [
  {
    number: "01",
    title: "LinkedIn",
    label: "Professional Network",
    description:
      "Let's connect professionally and discuss opportunities, collaborations and projects.",
    href: CONTACT.linkedin,
    icon: Link,
    accent: "linkedin",
  },
  {
    number: "02",
    title: "GitHub",
    label: "Code & Projects",
    description:
      "Explore my development work, experiments, repositories and technical projects.",
    href: CONTACT.github,
    icon: GitBranch,
    accent: "github",
  },
  {
    number: "03",
    title: "Indeed",
    label: "Professional Profile",
    description:
      "View my professional profile and discover my experience and career background.",
    href: CONTACT.indeed,
    icon: BriefcaseBusiness,
    accent: "indeed",
  },
];

const services = [
  "Full Stack Web Development",
  "React / Next.js Development",
  "Modern Frontend Development",
  "Responsive Website Development",
  "UI / UX Implementation",
  "Business Websites",
  "E-commerce Development",
  "Website Redesign & Optimization",
];

/* =========================================================
   WHATSAPP CHAT TYPES
   ========================================================= */

type WhatsAppMessage = {
  id: number;
  sender: "faiza" | "visitor";
  text: string;
  time: string;
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function ContactPage() {
  const [copied, setCopied] = useState<
    "email" | "whatsapp" | null
  >(null);

  const [sent, setSent] = useState(false);

  /* =======================================================
     WHATSAPP CHAT STATE
     ======================================================= */

  const [whatsappChatOpen, setWhatsappChatOpen] = useState(false);

  const [whatsappMessage, setWhatsappMessage] = useState("");

  const [whatsappMessages, setWhatsappMessages] = useState<
    WhatsAppMessage[]
  >([
    {
      id: 1,
      sender: "faiza",
      text: "Hi! 👋 Welcome to my portfolio. How can I help you?",
      time: "Now",
    },
    {
      id: 2,
      sender: "faiza",
      text: "Have a project in mind? Feel free to send me a message.",
      time: "Now",
    },
  ]);

  /* =======================================================
     COPY TO CLIPBOARD
     ======================================================= */

  const copyToClipboard = async (
    value: string,
    type: "email" | "whatsapp"
  ) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      window.setTimeout(() => {
        setCopied(null);
      }, 2200);
    } catch {
      window.prompt(
        type === "email"
          ? "Copy email:"
          : "Copy WhatsApp number:",
        value
      );
    }
  };

  /* =======================================================
     NORMAL CONTACT FORM
     ======================================================= */

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      return;
    }

    const mailSubject =
      subject || `Project Inquiry from ${name}`;

    const body = [
      `Hello Faiza,`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      ``,
      `Project Details:`,
      message,
      ``,
      `Sent from your portfolio contact form.`,
    ].join("\n");

    window.location.href = `${emailLink}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    form.reset();
  };

  /* =======================================================
     REAL WHATSAPP SEND
     ======================================================= */

  const sendWhatsAppMessage = () => {
    const text = whatsappMessage.trim();

    if (!text) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    /*
      Show the visitor's message inside the portfolio preview
      before opening real WhatsApp.
    */

    setWhatsappMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "visitor",
        text,
        time: currentTime,
      },
    ]);

    /*
      Clear input.
    */

    setWhatsappMessage("");

    /*
      IMPORTANT:
      This opens REAL WhatsApp.

      The visitor will then see your WhatsApp chat and can
      actually send the message to your number.
    */

    const realWhatsAppLink = createWhatsAppLink(text);

    window.open(
      realWhatsAppLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     OPEN REAL WHATSAPP WITH DEFAULT MESSAGE
     ======================================================= */

  const openWhatsApp = () => {
    window.open(
      whatsappLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     OPEN EMBEDDED CHAT PREVIEW
     ======================================================= */

  const openWhatsAppChat = () => {
    setWhatsappChatOpen(true);

    window.setTimeout(() => {
      document
        .getElementById("embedded-whatsapp-chat")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  /* =======================================================
     QUICK REPLY → REAL WHATSAPP
     ======================================================= */

  const sendQuickWhatsAppMessage = (text: string) => {
    setWhatsappMessage(text);

    const realWhatsAppLink = createWhatsAppLink(text);

    window.open(
      realWhatsAppLink,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="contact-page">
      {/* =====================================================
          ATMOSPHERE
          ===================================================== */}

      <div className="contact-noise" />
      <div className="contact-grid" />

      <div className="contact-orb contact-orb-one" />
      <div className="contact-orb contact-orb-two" />
      <div className="contact-orb contact-orb-three" />

      <div className="contact-scanline" />

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="contact-hero">
        <div className="contact-hero-top">
          <span className="contact-kicker">
            <span className="contact-kicker-dot" />
            OPEN FOR NEW CONNECTIONS
          </span>

          <span className="contact-index">
            06 / CONTACT
          </span>
        </div>

        <div className="contact-hero-content">
          <div className="contact-hero-copy">
            <p className="contact-eyebrow">
              HAVE AN IDEA?
            </p>

            <h1 className="contact-title">
              LET&apos;S
              <span>BUILD.</span>
            </h1>

            <p className="contact-intro">
              Great digital products start with a conversation.
              Tell me what you&apos;re building, what you need,
              or simply say hello.
            </p>

            <div className="contact-hero-actions">
              <a
                href="#contact-form"
                className="contact-main-button"
              >
                START A PROJECT
                <ArrowDown size={17} />
              </a>

              {/* REAL WHATSAPP */}

              <button
                type="button"
                onClick={openWhatsApp}
                className="contact-whatsapp-button"
              >
                <MessageCircle size={17} />
                CHAT ON WHATSAPP
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="contact-hero-side">
            <div className="contact-status-card">
              <div className="contact-status-top">
                <span className="contact-status-dot" />
                <span>STATUS</span>
              </div>

              <strong>
                {CONTACT.availability}
              </strong>

              <p>
                Currently open to selected freelance,
                collaboration and web development
                opportunities.
              </p>
            </div>

            <div className="contact-scroll-mark">
              <span>SCROLL TO CONNECT</span>
              <ArrowDown size={15} />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK CONTACT STRIP
          ===================================================== */}

      <section className="contact-quick-section">
        <div className="contact-section-heading">
          <div>
            <span className="contact-mini-label">
              DIRECT CHANNELS
            </span>

            <h2>REACH ME DIRECTLY.</h2>
          </div>

          <p>
            Choose whichever channel is most convenient.
            No account or signup is required.
          </p>
        </div>

        <div className="contact-quick-grid">
          {/* EMAIL */}

          <div className="contact-quick-card">
            <div className="contact-quick-icon">
              <Mail size={20} />
            </div>

            <div className="contact-quick-content">
              <span>EMAIL</span>

              <a href={emailLink}>
                {CONTACT.email}
              </a>
            </div>

            <button
              type="button"
              className="contact-copy-button"
              onClick={() =>
                copyToClipboard(
                  CONTACT.email,
                  "email"
                )
              }
              aria-label="Copy email address"
            >
              {copied === "email" ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {/* WHATSAPP */}

          <div className="contact-quick-card contact-quick-whatsapp">
            <div className="contact-quick-icon">
              <MessageCircle size={20} />
            </div>

            <div className="contact-quick-content">
              <span>WHATSAPP</span>

              <button
                type="button"
                className="contact-whatsapp-number-button"
                onClick={openWhatsApp}
              >
                {CONTACT.whatsappNumber}
              </button>
            </div>

            <button
              type="button"
              className="contact-copy-button"
              onClick={() =>
                copyToClipboard(
                  CONTACT.whatsappNumber,
                  "whatsapp"
                )
              }
              aria-label="Copy WhatsApp number"
            >
              {copied === "whatsapp" ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="contact-copy-feedback">
          {copied === "email" && (
            <>
              <Check size={13} />
              Email copied to clipboard
            </>
          )}

          {copied === "whatsapp" && (
            <>
              <Check size={13} />
              WhatsApp number copied
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          WHATSAPP CHAT
          ===================================================== */}

      <section
        className="contact-whatsapp-chat-section"
        id="embedded-whatsapp-chat"
      >
        <div className="contact-whatsapp-chat-shell">
          <div className="contact-whatsapp-chat-heading">
            <div>
              <span className="contact-mini-label">
                DIRECT MESSAGE
              </span>

              <h2>
                CHAT WITH
                <span>FAIZA.</span>
              </h2>

              <p>
                Type your message below and continue the
                conversation directly on WhatsApp.
              </p>
            </div>

            <div className="contact-whatsapp-live">
              <span />
              ONLINE
            </div>
          </div>

          <div
            className={`contact-whatsapp-chat-window ${
              whatsappChatOpen ? "is-open" : ""
            }`}
          >
            {/* CHAT HEADER */}

            <div className="contact-whatsapp-chat-header">
              <div className="contact-whatsapp-profile">
                <div className="contact-whatsapp-avatar">
                  <MessageCircle size={22} />
                </div>

                <div>
                  <strong>Faiza Noor</strong>

                  <span>
                    <i />
                    Online
                  </span>
                </div>
              </div>

              <div className="contact-whatsapp-header-actions">
                <button
                  type="button"
                  aria-label="Call"
                  onClick={() => {
                    window.location.href = `tel:${CONTACT.whatsappNumber}`;
                  }}
                >
                  <Phone size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Close chat"
                  onClick={() =>
                    setWhatsappChatOpen(false)
                  }
                >
                  ×
                </button>
              </div>
            </div>

            {/* CHAT BODY */}

            <div className="contact-whatsapp-chat-body">
              <div className="contact-whatsapp-date">
                TODAY
              </div>

              <div className="contact-whatsapp-welcome">
                <div className="contact-whatsapp-welcome-icon">
                  🔒
                </div>

                <p>
                  Your message will continue in WhatsApp.
                </p>
              </div>

              {whatsappMessages.map((message) => (
                <div
                  key={message.id}
                  className={`contact-whatsapp-message ${
                    message.sender === "visitor"
                      ? "visitor"
                      : "faiza"
                  }`}
                >
                  <p>{message.text}</p>

                  <span>
                    {message.time}

                    {message.sender ===
                      "visitor" && (
                      <b>✓✓</b>
                    )}
                  </span>
                </div>
              ))}

              <div className="contact-whatsapp-typing">
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* QUICK REPLIES */}

            <div className="contact-whatsapp-quick-replies">
              {[
                "I need a website",
                "I have an e-commerce idea",
                "Let's discuss a project",
              ].map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() =>
                    sendQuickWhatsAppMessage(text)
                  }
                >
                  {text}
                </button>
              ))}
            </div>

            {/* INPUT */}

            <form
              className="contact-whatsapp-input-area"
              onSubmit={(event) => {
                event.preventDefault();
                sendWhatsAppMessage();
              }}
            >
              <button
                type="button"
                className="contact-whatsapp-attach"
                aria-label="Attach"
                onClick={openWhatsApp}
              >
                <Paperclip size={19} />
              </button>

              <input
                type="text"
                value={whatsappMessage}
                onChange={(event) =>
                  setWhatsappMessage(
                    event.target.value
                  )
                }
                placeholder="Type a message..."
                aria-label="WhatsApp message"
                onFocus={() =>
                  setWhatsappChatOpen(true)
                }
              />

              <button
                type="button"
                className="contact-whatsapp-emoji"
                aria-label="Emoji"
                onClick={() =>
                  setWhatsappMessage(
                    (prev) => `${prev} 👋`
                  )
                }
              >
                <Smile size={19} />
              </button>

              <button
                type="submit"
                className="contact-whatsapp-send"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL / PROFESSIONAL NETWORKS
          ===================================================== */}

      <section className="contact-social-section">
        <div className="contact-section-heading">
          <div>
            <span className="contact-mini-label">
              FIND ME ONLINE
            </span>

            <h2>LET&apos;S CONNECT.</h2>
          </div>

          <p>
            Explore my professional profiles, development
            work and direct communication channels.
          </p>
        </div>

        <div className="contact-social-grid">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.number}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`contact-social-card ${item.accent}`}
              >
                <div className="contact-social-number">
                  {item.number}
                </div>

                <div className="contact-social-icon">
                  <Icon
                    size={22}
                    strokeWidth={1.6}
                  />
                </div>

                <div className="contact-social-body">
                  <span>{item.label}</span>

                  <h3>{item.title}</h3>

                  <p>
                    {item.description}
                  </p>
                </div>

                <div className="contact-social-arrow">
                  <ArrowUpRight size={19} />
                </div>
              </a>
            );
          })}

          {/* WHATSAPP SOCIAL CARD */}

          <button
            type="button"
            onClick={openWhatsApp}
            className="contact-social-card whatsapp"
          >
            <div className="contact-social-number">
              04
            </div>

            <div className="contact-social-icon">
              <MessageCircle
                size={22}
                strokeWidth={1.6}
              />
            </div>

            <div className="contact-social-body">
              <span>DIRECT CONVERSATION</span>

              <h3>WhatsApp</h3>

              <p>
                Start a direct conversation with me
                instantly without leaving the
                portfolio.
              </p>
            </div>

            <div className="contact-social-arrow">
              <ArrowUpRight size={19} />
            </div>
          </button>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTACT / FORM
          ===================================================== */}

      <section
        className="contact-form-section"
        id="contact-form"
      >
        <div className="contact-form-intro">
          <span className="contact-mini-label">
            PROJECT INQUIRY
          </span>

          <h2>
            HAVE SOMETHING
            <span>IN MIND?</span>
          </h2>

          <p>
            Whether you have a complete project brief or
            just the first idea, send it over. We can
            figure out the next step together.
          </p>

          <div className="contact-info-stack">
            <div className="contact-info-row">
              <div className="contact-info-icon">
                <MapPin size={17} />
              </div>

              <div>
                <span>LOCATION</span>
                <strong>
                  {CONTACT.location}
                </strong>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">
                <Clock3 size={17} />
              </div>

              <div>
                <span>TIMEZONE</span>
                <strong>
                  {CONTACT.timezone}
                </strong>
              </div>
            </div>

            <div className="contact-info-row">
              <div className="contact-info-icon">
                <Globe2 size={17} />
              </div>

              <div>
                <span>RESPONSE</span>
                <strong>
                  {CONTACT.responseTime}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-form-header">
            <div>
              <span>01</span>
              <p>YOUR DETAILS</p>
            </div>

            <UserRound size={18} />
          </div>

          <div className="contact-fields-grid">
            <label className="contact-field">
              <span>
                YOUR NAME <b>*</b>
              </span>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </label>

            <label className="contact-field">
              <span>
                EMAIL ADDRESS <b>*</b>
              </span>

              <input
                type="email"
                name="email"
                placeholder="fizza@example.com"
                required
                autoComplete="email"
              />
            </label>
          </div>

          <label className="contact-field">
            <span>PROJECT / SUBJECT</span>

            <input
              type="text"
              name="subject"
              placeholder="Website, e-commerce, dashboard..."
            />
          </label>

          <label className="contact-field">
            <span>
              TELL ME ABOUT IT <b>*</b>
            </span>

            <textarea
              name="message"
              placeholder="Tell me about your idea, goals, timeline, budget or anything else that might help..."
              rows={7}
              required
            />
          </label>

          <div className="contact-form-bottom">
            <p>
              By clicking send, your default email client
              will open with the project details prepared
              for you.
            </p>

            <button
              type="submit"
              className="contact-submit-button"
            >
              {sent
                ? "MESSAGE READY"
                : "SEND INQUIRY"}

              {sent ? (
                <Check size={17} />
              ) : (
                <Send size={17} />
              )}
            </button>
          </div>
        </form>
      </section>

      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section className="contact-services-section">
        <div className="contact-services-heading">
          <span className="contact-mini-label">
            WHAT I CAN BUILD
          </span>

          <h2>
            FROM CONCEPT
            <span>TO CODE.</span>
          </h2>
        </div>

        <div className="contact-services-list">
          {services.map((service, index) => (
            <div
              key={service}
              className="contact-service-item"
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{service}</p>

              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          BIG WHATSAPP CTA
          ===================================================== */}

      <section className="contact-whatsapp-section">
        <div className="contact-whatsapp-glow" />

        <div className="contact-whatsapp-inner">
          <div className="contact-whatsapp-symbol">
            <MessageCircle
              size={31}
              strokeWidth={1.5}
            />
          </div>

          <span className="contact-mini-label">
            FASTEST WAY TO REACH ME
          </span>

          <h2>
            LET&apos;S TALK
            <span>ON WHATSAPP.</span>
          </h2>

          <p>
            Skip the formalities. Send me a message
            directly and let&apos;s talk about your idea.
          </p>

          <button
            type="button"
            onClick={openWhatsApp}
            className="contact-big-whatsapp"
          >
            OPEN DIRECT CHAT
            <ArrowUpRight size={18} />
          </button>

          <small>
            {CONTACT.whatsappNumber}
          </small>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="contact-final-section">
        <div className="contact-final-line" />

        <span className="contact-final-label">
          YOUR NEXT PROJECT
        </span>

        <h2>
          COULD START
          <span>RIGHT HERE.</span>
        </h2>

        <p>
          Have the idea. I&apos;ll help turn it into a
          digital experience that feels as good as it
          works.
        </p>

        <div className="contact-final-actions">
          <a
            href={emailLink}
            className="contact-final-email"
          >
            <Mail size={17} />
            EMAIL ME
            <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            onClick={openWhatsApp}
            className="contact-final-chat"
          >
            <MessageCircle size={17} />
            WHATSAPP
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* =====================================================
          FLOATING WHATSAPP
          ===================================================== */}

      <button
        type="button"
        onClick={openWhatsApp}
        className="contact-floating-whatsapp"
        aria-label="Chat with Faiza on WhatsApp"
      >
        <MessageCircle size={21} />
        <span>CHAT</span>
      </button>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="contact-footer">
        <div className="contact-footer-left">
          <span className="contact-footer-logo">
            FN<span>.</span>
          </span>

          <p>
            {CONTACT.name} — {CONTACT.role}
          </p>
        </div>

        <div className="contact-footer-center">
          <Sparkles size={14} />
          <span>
            CRAFTING DIGITAL EXPERIENCES
          </span>
        </div>

        <div className="contact-footer-right">
          <span>
            © {new Date().getFullYear()}
          </span>

          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </main>
  );
}
