
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type SkillItem = { name: string; level: number };
type Category = {
  name: string;
  icon: string;
  benefit: string;
  skills: SkillItem[];
};

const categories: Category[] = [
  {
    name: "Frontend",
    icon: "⚛️",
    benefit: "Fast, beautiful, mobile-friendly interfaces your visitors enjoy using.",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 95 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Responsive UI", level: 92 },
      { name: "Framer Motion", level: 82 },
      { name: "Accessibility", level: 80 },
    ],
  },
  {
    name: "Backend",
    icon: "🚂",
    benefit: "Reliable server logic, secure logins and clean APIs behind the scenes.",
    skills: [
      { name: "Node.js", level: 84 },
      { name: "Express.js", level: 84 },
      { name: "REST APIs", level: 88 },
      { name: "Authentication", level: 82 },
      { name: "Authorization", level: 80 },
      { name: "CRUD Systems", level: 88 },
      { name: "Server Actions", level: 80 },
      { name: "Middleware", level: 80 },
    ],
  },
  {
    name: "Database",
    icon: "🍃",
    benefit: "Your data stored safely, structured well and quick to fetch.",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Mongoose", level: 82 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma ORM", level: 78 },
      { name: "Data Modeling", level: 80 },
    ],
  },
  {
    name: "DevOps",
    icon: "🐳",
    benefit: "Smooth deployments and safe teamwork so updates go live without drama.",
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 88 },
      { name: "Docker", level: 78 },
      { name: "CI/CD", level: 75 },
      { name: "Vercel", level: 88 },
      { name: "Environment Setup", level: 82 },
    ],
  },
  {
    name: "Testing",
    icon: "🧪",
    benefit: "Bugs caught early, so your product stays stable and fast.",
    skills: [
      { name: "Jest", level: 75 },
      { name: "Vitest", level: 75 },
      { name: "Playwright", level: 70 },
      { name: "Debugging", level: 85 },
      { name: "Performance", level: 82 },
    ],
  },
  {
    name: "AI & APIs",
    icon: "🤖",
    benefit: "Smart features and third-party tools connected into your product.",
    skills: [
      { name: "AI Integration", level: 82 },
      { name: "OpenAI APIs", level: 80 },
      { name: "API Integration", level: 85 },
      { name: "Webhooks", level: 75 },
    ],
  },
  {
    name: "Engineering",
    icon: "🏗️",
    benefit: "Solid planning, secure forms and SEO so the project scales and gets found.",
    skills: [
      { name: "Project Architecture", level: 82 },
      { name: "Form Validation", level: 88 },
      { name: "Security Basics", level: 78 },
      { name: "Technical SEO", level: 80 },
    ],
  },
];

const N = categories.length;
const STEP = 360 / N;

function SkillOrbField({ skills }: { skills: SkillItem[] }) {
  const fieldRef = useRef<HTMLDivElement>(null);

  const repelOrbs = (clientX: number, clientY: number) => {
    const field = fieldRef.current;
    if (!field) return;

    field.querySelectorAll<HTMLElement>("[data-skill-orb]").forEach((orb) => {
      const rect = orb.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - clientX;
      const dy = rect.top + rect.height / 2 - clientY;
      const distance = Math.hypot(dx, dy);
      const range = 155;

      if (distance < range) {
        const force = (range - distance) * 0.85;
        const angleX = distance === 0 ? 1 : dx / distance;
        const angleY = distance === 0 ? 0 : dy / distance;

        orb.style.setProperty("--push-x", `${angleX * force}px`);
        orb.style.setProperty("--push-y", `${angleY * force}px`);
        orb.style.setProperty("--orb-scale", "1.12");
      } else {
        orb.style.setProperty("--push-x", "0px");
        orb.style.setProperty("--push-y", "0px");
        orb.style.setProperty("--orb-scale", "1");
      }
    });
  };

  const resetOrbs = () => {
    fieldRef.current?.querySelectorAll<HTMLElement>("[data-skill-orb]").forEach((orb) => {
      orb.style.setProperty("--push-x", "0px");
      orb.style.setProperty("--push-y", "0px");
      orb.style.setProperty("--orb-scale", "1");
    });
  };

  const getSymbol = (name: string) => {
    const symbols: Record<string, string> = {
      "React.js": "⚛",
      "Next.js": "N",
      JavaScript: "JS",
      TypeScript: "TS",
      HTML5: "5",
      CSS3: "3",
      "Node.js": "⬡",
      MongoDB: "◉",
      GitHub: "⌘",
      Docker: "▤",
      "OpenAI APIs": "✳",
    };

    return symbols[name] || name.slice(0, 2).toUpperCase();
  };

  return (
    <div
      ref={fieldRef}
      className="sk3d-orb-field"
      onPointerMove={(e) => repelOrbs(e.clientX, e.clientY)}
      onPointerLeave={resetOrbs}
      aria-label="Interactive floating technology skills"
    >
      <div className="sk3d-orbit sk3d-orbit--one" />
      <div className="sk3d-orbit sk3d-orbit--two" />

      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="sk3d-orb-wrap"
          style={{
            animationDelay: `${(index % 7) * -0.43}s`,
            "--orb-size": `${76 + ((index * 17) % 35)}px`,
          } as CSSProperties}
        >
          <div
            className={`sk3d-orb sk3d-orb--${index % 5}`}
            data-skill-orb
            title={skill.name}
            style={{ animationDelay: `${(index % 6) * -0.31}s` } as CSSProperties}
          >
            <span className="sk3d-orb__symbol">{getSymbol(skill.name)}</span>
            <span className="sk3d-orb__name">{skill.name}</span>
          </div>
        </div>
      ))}

      <p className="sk3d-orb-hint">
        Move your cursor near a skill orb to see it react
      </p>
    </div>
  );
}

export default function SkillsUniverse() {
  const [state, setState] = useState({ cur: 0, rot: 0 });
  const [radius, setRadius] = useState(300);
  const sceneRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const { cur, rot } = state;
  const active = categories[cur];

  const go = (i: number) => {
    setState((s) => {
      let d = (((i - s.cur) % N) + N) % N;
      if (d > N / 2) d -= N;

      return {
        cur: ((i % N) + N) % N,
        rot: s.rot + d * STEP,
      };
    });
  };

  useEffect(() => {
    const update = () => {
      const w = sceneRef.current?.clientWidth ?? 900;
      setRadius(Math.min(390, Math.max(245, w / 2.25)));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => go(cur + 1), 2000);
    return () => window.clearTimeout(timer);
  }, [cur, rot]);

  return (
    <section id="stack" className="sk3d">
      <div className="sk3d-wrap">
        <div className="sk3d-eyebrow">✳ THE CRAFT BEHIND THE CODE ✳</div>

        <h2 className="sk3d-title">
          My Skills, <span>My Universe.</span>
        </h2>

        <p className="sk3d-sub">
          Explore my technical universe — a collection of skills working
          together to build beautiful, powerful digital experiences.
        </p>

        <div
          ref={sceneRef}
          className="sk3d-scene"
          onPointerDown={(e) => {
            startX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (
              startX.current !== null &&
              Math.abs(e.clientX - startX.current) > 50
            ) {
              go(cur + (e.clientX < startX.current ? 1 : -1));
            }
            startX.current = null;
          }}
          onPointerCancel={() => {
            startX.current = null;
          }}
        >
          <div
            className="sk3d-ring"
            style={{ transform: `translateZ(-${radius}px) rotateY(${-rot}deg)` }}
          >
            {categories.map((category, index) => (
              <button
                type="button"
                key={category.name}
                className={`sk3d-panel ${index === cur ? "on" : ""}`}
                style={{
                  transform: `rotateY(${index * STEP}deg) translateZ(${radius}px)`,
                }}
                onClick={() => go(index)}
                aria-pressed={index === cur}
              >
                <span className="sk3d-panel__icon">{category.icon}</span>
                <b>{category.name}</b>
                <small>{category.skills.length} technologies</small>
                <span className="sk3d-panel__action">Explore <i>→</i></span>
              </button>
            ))}
          </div>
        </div>

        <div className="sk3d-nav">
          <button type="button" onClick={() => go(cur - 1)} aria-label="Previous category">
            ←
          </button>
          <span>{String(cur + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          <button type="button" onClick={() => go(cur + 1)} aria-label="Next category">
            →
          </button>
        </div>

        <p className="sk3d-hint">
          Drag, swipe or select a glowing card to explore
        </p>

        <div className="sk3d-info" aria-live="polite">
          <div>
            <span className="sk3d-info__eyebrow">EXPLORE THE CATEGORY</span>
            <h3>{active.icon} {active.name}</h3>
            <p>{active.benefit}</p>
          </div>
          <span className="sk3d-info__count">{active.skills.length} skills</span>
        </div>

        <SkillOrbField key={active.name} skills={active.skills} />

        <p className="sk3d-foot">
          One connected skill set. Countless ways to build.
          <br />
          Every skill is part of the bigger picture.
        </p>
      </div>

      <style jsx global>{`
        .sk3d {
          --sk-bg: #070817;
          --sk-text: #f4f5ff;
          --sk-muted: #aab2d8;
          --sk-violet: #a78bfa;
          --sk-cyan: #52e5ff;
          --sk-pink: #ff6bd6;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          color: var(--sk-text);
          background:
            radial-gradient(ellipse at 12% 18%, rgba(105,75,255,.24), transparent 38%),
            radial-gradient(ellipse at 88% 25%, rgba(0,215,255,.19), transparent 36%),
            radial-gradient(ellipse at 52% 90%, rgba(255,65,190,.15), transparent 42%),
            #070817;
        }

        .sk3d::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background-image:
            radial-gradient(1px 1px at 12% 20%, #ffffffaa 50%, transparent 100%),
            radial-gradient(1px 1px at 76% 15%, #52e5ff99 50%, transparent 100%),
            radial-gradient(2px 2px at 86% 72%, #ff6bd699 50%, transparent 100%),
            radial-gradient(1px 1px at 30% 82%, #a78bfa99 50%, transparent 100%);
          background-size: 240px 220px, 310px 270px, 390px 330px, 280px 250px;
          animation: sk3d-stars 18s linear infinite;
        }

        .sk3d-wrap {
          position: relative;
          max-width: 1240px;
          margin: auto;
          padding: 76px 24px 72px;
          text-align: center;
        }

        .sk3d-eyebrow {
          color: var(--sk-cyan);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .34em;
          text-shadow: 0 0 18px rgba(82,229,255,.6);
        }

        .sk3d-title {
          margin: 14px 0 10px;
          color: #fff;
          font-size: clamp(38px, 6vw, 72px);
          font-weight: 800;
          letter-spacing: -.045em;
          line-height: 1.05;
        }

        .sk3d-title span {
          background: linear-gradient(100deg, #b9a2ff 5%, #55e8ff 52%, #ff83d9 95%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 18px rgba(82,229,255,.2));
        }

        .sk3d-sub {
          max-width: 760px;
          margin: 0 auto;
          color: var(--sk-muted);
          font-size: clamp(14px, 1.6vw, 18px);
          line-height: 1.7;
        }

        .sk3d-scene {
          display: flex;
          height: 390px;
          margin: 30px 0 0;
          align-items: center;
          justify-content: center;
          perspective: 1400px;
          touch-action: pan-y;
          cursor: grab;
        }

        .sk3d-scene:active { cursor: grabbing; }

        .sk3d-ring {
          position: relative;
          width: 205px;
          height: 270px;
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(.2,.8,.2,1);
        }

        .sk3d-panel {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 13px;
          padding: 22px 16px;
          border: 1px solid rgba(145,154,255,.5);
          border-radius: 25px;
          background:
            radial-gradient(circle at 18% 0%, rgba(132,91,255,.24), transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(0,220,255,.14), transparent 48%),
            linear-gradient(155deg, rgba(23,25,58,.98), rgba(8,11,28,.97));
          box-shadow: inset 0 0 28px rgba(117,125,255,.07), 0 18px 55px rgba(0,0,0,.5);
          color: var(--sk-text);
          font: inherit;
          cursor: pointer;
          backface-visibility: hidden;
          transition: border-color .35s, box-shadow .35s, background .35s;
        }

        .sk3d-panel__icon {
          display: grid;
          width: 76px;
          height: 76px;
          place-items: center;
          border: 1px solid rgba(82,229,255,.62);
          border-radius: 23px;
          background: radial-gradient(circle, rgba(112,91,255,.3), rgba(40,211,255,.05) 70%);
          color: #67eaff;
          font-size: 42px;
          filter: drop-shadow(0 0 13px rgba(82,229,255,.58));
        }

        .sk3d-panel b { font-size: clamp(19px, 2vw, 25px); }
        .sk3d-panel small { color: var(--sk-muted); font-size: 12px; }

        .sk3d-panel__action {
          margin-top: 8px;
          padding: 8px 17px;
          border: 1px solid rgba(82,229,255,.55);
          border-radius: 30px;
          color: #8ceeff;
          font-size: 12px;
          font-weight: 700;
        }

        .sk3d-panel__action i { margin-left: 5px; font-style: normal; }

        .sk3d-panel.on {
          border-color: #8cecff;
          background:
            radial-gradient(circle at 15% 0%, rgba(140,94,255,.36), transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(0,220,255,.2), transparent 55%),
            linear-gradient(155deg, rgba(31,29,75,.99), rgba(8,16,37,.98));
          box-shadow:
            inset 0 0 35px rgba(119,119,255,.12),
            0 0 24px rgba(82,229,255,.32),
            0 0 70px rgba(146,91,255,.22);
        }

        .sk3d-panel:focus-visible,
        .sk3d-nav button:focus-visible {
          outline: 2px solid var(--sk-cyan);
          outline-offset: 4px;
        }

        .sk3d-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          margin-top: -4px;
        }

        .sk3d-nav button {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          border: 1px solid rgba(82,229,255,.62);
          border-radius: 50%;
          background: rgba(14,19,47,.92);
          color: #8ceeff;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 0 18px rgba(82,229,255,.15);
          transition: transform .25s, box-shadow .25s, background .25s;
        }

        .sk3d-nav button:hover {
          transform: scale(1.1);
          background: rgba(62,48,125,.78);
          box-shadow: 0 0 25px rgba(82,229,255,.32);
        }

        .sk3d-nav span {
          color: var(--sk-cyan);
          font-size: 12px;
          font-variant-numeric: tabular-nums;
          letter-spacing: .16em;
        }

        .sk3d-hint {
          margin: 14px 0 34px;
          color: var(--sk-muted);
          font-size: 12px;
        }

        .sk3d-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          max-width: 1000px;
          margin: 0 auto 20px;
          padding: 22px 26px;
          border: 1px solid rgba(135,147,255,.36);
          border-radius: 20px;
          background: linear-gradient(110deg, rgba(34,27,75,.88), rgba(10,23,48,.86));
          box-shadow: inset 0 0 30px rgba(119,119,255,.06), 0 15px 40px rgba(0,0,0,.2);
          text-align: left;
        }

        .sk3d-info__eyebrow {
          color: var(--sk-cyan);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .22em;
        }

        .sk3d-info h3 {
          margin: 5px 0;
          color: #f2f0ff;
          font-size: 26px;
        }

        .sk3d-info p {
          margin: 0;
          color: var(--sk-muted);
          line-height: 1.6;
        }

        .sk3d-info__count {
          flex: 0 0 auto;
          padding: 9px 14px;
          border: 1px solid rgba(82,229,255,.55);
          border-radius: 30px;
          color: #8ceeff;
          font-size: 12px;
        }

        .sk3d-orb-field {
          position: relative;
          display: flex;
          min-height: 360px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 22px 25px;
          max-width: 1080px;
          margin: 0 auto;
          padding: 46px 24px 58px;
          perspective: 900px;
          isolation: isolate;
        }

        .sk3d-orbit {
          position: absolute;
          z-index: -1;
          top: 50%;
          left: 50%;
          width: min(92%, 850px);
          height: 180px;
          border: 1px solid rgba(82,229,255,.32);
          border-radius: 50%;
          transform: translate(-50%,-50%) rotate(-8deg);
          box-shadow: 0 0 24px rgba(82,229,255,.1), inset 0 0 20px rgba(146,91,255,.08);
          pointer-events: none;
        }

        .sk3d-orbit--two {
          width: min(78%, 690px);
          height: 245px;
          transform: translate(-50%,-50%) rotate(12deg);
          border-color: rgba(255,107,214,.25);
        }

        .sk3d-orb-wrap {
          display: grid;
          width: var(--orb-size, 90px);
          height: calc(var(--orb-size, 90px) + 23px);
          flex: 0 0 auto;
          place-items: center;
          animation: sk3d-float 4.8s ease-in-out infinite;
          will-change: transform;
        }

        .sk3d-orb {
          --push-x: 0px;
          --push-y: 0px;
          --orb-scale: 1;
          --orb-edge: rgba(110,225,255,.95);
          --orb-light: rgba(82,229,255,.42);
          --orb-shadow: rgba(146,91,255,.34);
          --orb-base: rgba(35,57,115,.97);
          --orb-glow: rgba(82,229,255,.4);
          --orb-halo: rgba(146,91,255,.24);
          position: relative;
          display: flex;
          width: var(--orb-size, 90px);
          height: var(--orb-size, 90px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border: 1px solid var(--orb-edge);
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 22%, rgba(255,255,255,.78), transparent 12%),
            radial-gradient(circle at 34% 30%, var(--orb-light), transparent 43%),
            radial-gradient(circle at 72% 78%, var(--orb-shadow), transparent 55%),
            linear-gradient(145deg, var(--orb-base), rgba(8,11,29,.99) 72%);
          box-shadow:
            inset -8px -10px 22px rgba(0,0,0,.55),
            inset 5px 5px 14px rgba(220,244,255,.2),
            0 0 18px var(--orb-glow),
            0 0 42px var(--orb-halo);
          color: #f4f5ff;
          transform: translate3d(var(--push-x),var(--push-y),0) scale(var(--orb-scale));
          transition: transform .32s cubic-bezier(.2,.8,.2,1), box-shadow .3s;
          animation: sk3d-orb-pulse 5s ease-in-out infinite;
          will-change: transform;
          user-select: none;
        }

        .sk3d-orb::after {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(225,240,255,.22);
          border-radius: inherit;
          pointer-events: none;
        }

        .sk3d-orb--1 {
          --orb-edge: rgba(255,112,218,.98);
          --orb-light: rgba(255,91,209,.48);
          --orb-shadow: rgba(127,73,255,.4);
          --orb-base: rgba(93,30,112,.97);
          --orb-glow: rgba(255,91,209,.42);
          --orb-halo: rgba(127,73,255,.26);
        }

        .sk3d-orb--2 {
          --orb-edge: rgba(126,255,197,.98);
          --orb-light: rgba(67,255,186,.42);
          --orb-shadow: rgba(0,172,177,.38);
          --orb-base: rgba(17,91,87,.97);
          --orb-glow: rgba(67,255,186,.38);
          --orb-halo: rgba(0,172,177,.24);
        }

        .sk3d-orb--3 {
          --orb-edge: rgba(255,195,105,.98);
          --orb-light: rgba(255,174,74,.5);
          --orb-shadow: rgba(255,83,132,.35);
          --orb-base: rgba(116,53,35,.97);
          --orb-glow: rgba(255,157,74,.4);
          --orb-halo: rgba(255,83,132,.22);
        }

        .sk3d-orb--4 {
          --orb-edge: rgba(174,151,255,.98);
          --orb-light: rgba(151,117,255,.5);
          --orb-shadow: rgba(53,174,255,.38);
          --orb-base: rgba(51,39,125,.97);
          --orb-glow: rgba(151,117,255,.42);
          --orb-halo: rgba(53,174,255,.25);
        }

        .sk3d-orb__symbol {
          color: #e7faff;
          font-size: clamp(19px,2.3vw,28px);
          font-weight: 900;
          line-height: 1;
          text-shadow: 0 0 13px var(--orb-glow);
        }

        .sk3d-orb__name {
          max-width: 88%;
          overflow: hidden;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-shadow: 0 1px 5px #000;
        }

        .sk3d-orb:hover {
          box-shadow:
            inset -8px -10px 22px rgba(0,0,0,.5),
            0 0 25px var(--orb-glow),
            0 0 55px var(--orb-halo);
        }

        .sk3d-orb-hint {
          position: absolute;
          right: 0;
          bottom: 8px;
          left: 0;
          margin: 0;
          color: #aebbe8;
          font-size: 11px;
          letter-spacing: .04em;
          pointer-events: none;
        }

        .sk3d-foot {
          margin: 28px 0 0;
          color: #aebbe8;
          font-size: 13px;
          line-height: 1.8;
          text-align: center;
        }

        @keyframes sk3d-float {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(4deg); }
        }

        @keyframes sk3d-orb-pulse {
          0%,100% { filter: brightness(.96); }
          50% { filter: brightness(1.15); }
        }

        @keyframes sk3d-stars {
          from { background-position: 0 0,0 0,0 0,0 0; }
          to { background-position: 240px 220px,-310px 270px,390px -330px,-280px 250px; }
        }

        @media (max-width: 700px) {
          .sk3d-wrap { padding: 58px 16px 52px; }
          .sk3d-scene { height: 320px; }
          .sk3d-ring { width: 165px; height: 225px; }
          .sk3d-panel { gap: 10px; padding: 16px 10px; border-radius: 19px; }
          .sk3d-panel__icon { width: 58px; height: 58px; border-radius: 18px; font-size: 32px; }
          .sk3d-panel b { font-size: 18px; }
          .sk3d-panel small { font-size: 10px; }
          .sk3d-panel__action { padding: 6px 12px; font-size: 10px; }
          .sk3d-info { align-items: flex-start; padding: 18px; }
          .sk3d-info h3 { font-size: 22px; }
          .sk3d-info p { font-size: 13px; }
          .sk3d-orb-field { min-height: 330px; gap: 15px; padding: 36px 8px 54px; }
          .sk3d-orb-wrap { --orb-size: 72px !important; }
          .sk3d-orbit { height: 130px; }
          .sk3d-orbit--two { height: 190px; }
        }

        @media (max-width: 420px) {
          .sk3d-scene { height: 285px; }
          .sk3d-ring { width: 145px; height: 205px; }
          .sk3d-nav { gap: 14px; }
          .sk3d-nav button { width: 42px; height: 42px; }
          .sk3d-info { flex-direction: column; }
          .sk3d-info__count { align-self: flex-start; }
          .sk3d-orb-field { gap: 12px; }
          .sk3d-orb-wrap { --orb-size: 64px !important; }
          .sk3d-orb__name { font-size: 9px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sk3d *,
          .sk3d *::before,
          .sk3d *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
