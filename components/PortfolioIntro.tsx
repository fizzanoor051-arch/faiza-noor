"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const INTRO_STYLES = String.raw`
.pi-intro {
  --pi-bg: #070910;
  --pi-cyan: #63e6f5;
  --pi-violet: #a78bfa;
  --pi-muted: #8993a8;
  position: fixed;
  inset: 0;
  z-index: 99999;
  overflow: hidden;
  display: grid;
  place-items: center;
  isolation: isolate;
  color: #f4f7ff;
  background: radial-gradient(ellipse at 50% 44%, #141b2b 0%, #0a0d17 48%, #05060b 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.pi-intro *, .pi-intro *::before, .pi-intro *::after { box-sizing: border-box; }
.pi-intro--checking { background: #070910; }
.pi-grid {
  position: absolute; inset: -30%; z-index: -4; opacity: .23;
  background-image: linear-gradient(rgba(117, 151, 191, .13) 1px, transparent 1px), linear-gradient(90deg, rgba(117, 151, 191, .13) 1px, transparent 1px);
  background-size: 58px 58px;
  transform: perspective(700px) rotateX(58deg) scale(1.5);
  transform-origin: center 62%;
  mask-image: linear-gradient(to bottom, transparent 2%, #000 38%, #000 78%, transparent 100%);
  animation: pi-grid-drift 22s linear infinite;
}
@keyframes pi-grid-drift { from { background-position: 0 0; } to { background-position: 0 116px; } }
.pi-glow { position: absolute; z-index: -3; width: min(55vw, 700px); aspect-ratio: 1; border-radius: 50%; filter: blur(90px); pointer-events: none; }
.pi-glow--one { top: -38%; left: -14%; background: rgba(34, 211, 238, .15); }
.pi-glow--two { right: -18%; bottom: -45%; background: rgba(139, 92, 246, .19); }
.pi-scanline { position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: .12; background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(255,255,255,.08) 4px); }
.pi-particles { position: absolute; inset: 0; pointer-events: none; }
.pi-particle { position: absolute; display: block; border-radius: 50%; background: #8ceeff; box-shadow: 0 0 12px 2px rgba(99,230,245,.45); }
.pi-topline, .pi-bottomline { position: absolute; left: clamp(22px, 5vw, 76px); right: clamp(22px, 5vw, 76px); display: flex; justify-content: space-between; align-items: center; color: #8290a8; font-size: 9px; letter-spacing: .2em; font-weight: 650; }
.pi-topline { top: 34px; }
.pi-bottomline { bottom: 34px; }
.pi-topline-right b { color: var(--pi-cyan); padding: 0 7px; }
.pi-status-dot, .pi-eyebrow span, .pi-kicker span { display: inline-block; width: 6px; height: 6px; margin-right: 9px; border-radius: 50%; background: var(--pi-cyan); box-shadow: 0 0 12px var(--pi-cyan); }
.pi-content { position: relative; z-index: 2; width: min(900px, calc(100% - 40px)); display: flex; flex-direction: column; align-items: center; perspective: 1200px; padding: 44px 0 58px; }
.pi-terminal-wrap { width: min(530px, 88vw); margin-bottom: 34px; }
.pi-terminal { overflow: hidden; border: 1px solid rgba(143, 177, 219, .22); border-radius: 13px; background: linear-gradient(145deg, rgba(17, 24, 39, .94), rgba(8, 12, 22, .96)); box-shadow: 0 28px 100px rgba(0,0,0,.48), 0 0 55px rgba(68, 210, 235, .09), inset 0 1px rgba(255,255,255,.07); backdrop-filter: blur(18px); transform: rotateX(2deg); }
.pi-terminal-bar { height: 39px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 15px; border-bottom: 1px solid rgba(143,177,219,.13); color: #8390a6; font: 10px ui-monospace, SFMono-Regular, Menlo, monospace; }
.pi-window-dots { display: flex; gap: 5px; }
.pi-window-dots i { width: 7px; height: 7px; border-radius: 50%; background: #fb7185; }
.pi-window-dots i:nth-child(2) { background: #fbbf24; }
.pi-window-dots i:nth-child(3) { background: #4ade80; }
.pi-terminal-lock { color: #5bc8b1; font-size: 8px; letter-spacing: .1em; }
.pi-terminal-body { position: relative; padding: 19px 24px 17px; min-height: 164px; }
.pi-terminal-label { margin-bottom: 12px; color: #65738b; font: 9px ui-monospace, monospace; letter-spacing: .16em; }
.pi-terminal-label span { color: var(--pi-cyan); margin-right: 8px; }
.pi-code-line { display: flex; align-items: center; min-height: 21px; color: #d8e1f1; font: 11px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; white-space: pre; }
.pi-line-number { width: 31px; flex: 0 0 31px; color: #46536a; user-select: none; }
.pi-purple { color: #c4a4ff; }
.pi-blue { color: #83b8ff; }
.pi-green { color: #a5e6b0; }
.pi-yellow { color: #f5d58a; }
.pi-cyan { color: #69dce9; }
.pi-terminal-cursor { width: 7px; height: 13px; margin: 5px 0 0 31px; background: var(--pi-cyan); box-shadow: 0 0 12px rgba(99,230,245,.7); }
.pi-terminal-footer { height: 30px; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; border-top: 1px solid rgba(143,177,219,.12); color: #63718a; font: 8px ui-monospace, monospace; letter-spacing: .12em; }
.pi-terminal-footer span:first-child { color: #6bd8b5; }
.pi-terminal-footer i { display: inline-block; width: 5px; height: 5px; margin-right: 6px; border-radius: 50%; background: #6bd8b5; box-shadow: 0 0 8px #6bd8b5; }
.pi-kicker { display: flex; align-items: center; gap: 9px; color: #a6b2c8; font-size: 10px; letter-spacing: .3em; }
.pi-kicker span { width: 4px; height: 4px; margin: 0; }
.pi-headline { max-width: 760px; text-align: center; }
.pi-eyebrow { display: flex; align-items: center; justify-content: center; gap: 10px; color: #91a0b8; font-size: 9px; letter-spacing: .34em; font-weight: 700; }
.pi-eyebrow span { width: 22px; height: 1px; margin: 0; border-radius: 0; }
.pi-headline h1 { margin: 17px 0 10px; color: #f5f7ff; font-size: clamp(42px, 7.4vw, 82px); line-height: .98; letter-spacing: -.065em; font-weight: 760; }
.pi-headline h1 em { color: transparent; font-style: normal; background: linear-gradient(100deg, #75e9f2 5%, #9ba8ff 53%, #c4a2ff 95%); -webkit-background-clip: text; background-clip: text; filter: drop-shadow(0 0 24px rgba(112, 208, 244, .16)); }
.pi-headline p { max-width: 510px; margin: 0 auto; color: #a2aec2; font-size: clamp(12px, 1.5vw, 15px); line-height: 1.8; letter-spacing: .015em; }
.pi-name { margin-top: 22px; color: #e8eefb; font-size: 10px; font-weight: 750; letter-spacing: .28em; }
.pi-name span { padding: 0 7px; color: var(--pi-cyan); }
.pi-tech { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 17px; }
.pi-tech span { padding: 6px 11px; border: 1px solid rgba(145, 172, 209, .18); border-radius: 999px; background: rgba(18, 27, 44, .52); color: #aebbd0; font-size: 9px; letter-spacing: .08em; }
.pi-orbit { position: absolute; z-index: 0; left: 50%; top: 43%; border: 1px solid rgba(111, 208, 231, .12); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%) rotate(-18deg); }
.pi-orbit--outer { width: min(76vw, 870px); height: min(31vw, 360px); }
.pi-orbit--inner { width: min(61vw, 690px); height: min(24vw, 270px); transform: translate(-50%, -50%) rotate(22deg); border-color: rgba(171, 143, 255, .13); }
.pi-orbit span { position: absolute; top: 8%; right: 14%; color: rgba(111, 220, 239, .56); font: 8px ui-monospace, monospace; letter-spacing: .2em; }
.pi-orbit--inner span { top: auto; right: auto; bottom: 8%; left: 13%; color: rgba(191, 164, 255, .62); }
.pi-orbit i, .pi-orbit b { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: var(--pi-cyan); box-shadow: 0 0 14px 3px rgba(99,230,245,.5); }
.pi-orbit i { top: 50%; left: -3px; }
.pi-orbit b { right: 12%; bottom: 7%; background: #b49aff; box-shadow: 0 0 14px 3px rgba(180,154,255,.5); }
.pi-progress { position: absolute; left: 50%; bottom: 69px; width: min(250px, 48vw); transform: translateX(-50%); }
.pi-progress-meta { display: flex; justify-content: space-between; margin-bottom: 7px; color: #68768d; font: 8px ui-monospace, monospace; letter-spacing: .12em; }
.pi-progress-meta span:last-child { color: #9be8ef; }
.pi-progress-track { height: 2px; overflow: hidden; background: rgba(143, 177, 219, .17); }
.pi-progress-track span { display: block; height: 100%; background: linear-gradient(90deg, #55dbe9, #a78bfa); box-shadow: 0 0 10px rgba(99,230,245,.65); transition: width .08s linear; }
.pi-skip { position: absolute; right: clamp(22px, 5vw, 76px); bottom: 66px; padding: 9px 12px; border: 1px solid rgba(143,177,219,.2); border-radius: 999px; background: rgba(12,17,29,.55); color: #9ba9bf; cursor: pointer; font: 8px ui-monospace, monospace; letter-spacing: .16em; transition: color .2s, border-color .2s, background .2s; }
.pi-skip:hover { color: #eafcff; border-color: rgba(99,230,245,.55); background: rgba(40,75,92,.35); }
.pi-skip span { padding-left: 5px; color: var(--pi-cyan); }
.pi-exit-flare { position: absolute; inset: -20%; z-index: 5; pointer-events: none; background: radial-gradient(ellipse at center, rgba(110,225,245,.22), transparent 48%); }

@media (max-width: 640px) {
  .pi-topline, .pi-bottomline { left: 18px; right: 18px; font-size: 7px; letter-spacing: .12em; }
  .pi-topline { top: 20px; }
  .pi-bottomline { bottom: 22px; }
  .pi-topline-right { display: none; }
  .pi-content { width: calc(100% - 28px); padding: 30px 0 70px; }
  .pi-terminal-wrap { width: min(100%, 440px); margin-bottom: 27px; }
  .pi-terminal-bar { padding: 0 10px; font-size: 8px; }
  .pi-terminal-lock { display: none; }
  .pi-terminal-body { padding: 15px 13px; min-height: 150px; }
  .pi-code-line { font-size: 9px; }
  .pi-line-number { width: 25px; flex-basis: 25px; }
  .pi-terminal-footer { padding: 0 10px; font-size: 7px; }
  .pi-headline h1 { font-size: clamp(39px, 11vw, 58px); }
  .pi-headline p { max-width: 340px; font-size: 12px; }
  .pi-eyebrow { font-size: 8px; letter-spacing: .2em; }
  .pi-orbit--outer { width: 110vw; height: 60vw; }
  .pi-orbit--inner { width: 90vw; height: 48vw; }
  .pi-progress { bottom: 65px; width: 190px; left: 18px; transform: none; }
  .pi-skip { right: 18px; bottom: 57px; }
}

@media (prefers-reduced-motion: reduce) {
  .pi-grid { animation: none; }
  .pi-progress-track span { transition: none; }
}
`;

const INTRO_STORAGE_KEY = "faiza-portfolio-intro-seen";
const TOTAL_MS = 7600;

type Stage = "checking" | "boot" | "reveal" | "exit" | "done";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

const codeLines = [
  {
    n: "01",
    code: <><span className="pi-purple">const</span> <span className="pi-blue">creativeIdeas</span> = <span className="pi-green">"build"</span>;</>,
  },
  {
    n: "02",
    code: <><span className="pi-purple">const</span> <span className="pi-blue">realSolutions</span> = <span className="pi-green">true</span>;</>,
  },
  {
    n: "03",
    code: <><span className="pi-purple">function</span> <span className="pi-yellow">createExperience</span>() {'{'}</>,
  },
  {
    n: "04",
    code: <>　<span className="pi-purple">return</span> <span className="pi-cyan">innovation</span> + <span className="pi-cyan">purpose</span>;</>,
  },
  {
    n: "05",
    code: <>{'}'}</>,
  },
];

function IntroProgress({ total }: { total: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const id = window.setInterval(() => {
      setPct(Math.min(100, Math.round(((Date.now() - start) / total) * 100)));
    }, 50);

    return () => window.clearInterval(id);
  }, [total]);

  return (
    <div className="pi-progress" aria-hidden="true">
      <div className="pi-progress-meta">
        <span>INITIALIZING EXPERIENCE</span>
        <span>{String(pct).padStart(2, "0")}%</span>
      </div>
      <div className="pi-progress-track">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function PortfolioIntro() {
  const [stage, setStage] = useState<Stage>("checking");
  const timers = useRef<number[]>([]);
  const reduceMotion = useReducedMotion();

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 38 }, (_, i) => ({
        id: i,
        left: (i * 37.7 + 5) % 100,
        top: (i * 61.3 + 8) % 100,
        size: 2 + (i % 3),
        delay: (i % 11) * 0.23,
        duration: 4 + (i % 5) * 1.1,
      })),
    [],
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();

    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Storage may be unavailable; the intro can still finish normally.
    }

    document.body.style.overflow = "";
    setStage("done");
    window.dispatchEvent(new CustomEvent("portfolio-intro-complete"));
  }, [clearTimers]);

  const skip = useCallback(() => {
    clearTimers();
    setStage("exit");
    timers.current.push(window.setTimeout(finish, reduceMotion ? 0 : 550));
  }, [clearTimers, finish, reduceMotion]);

  useEffect(() => {
    let seen = false;

    try {
      seen = sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
    } catch {
      seen = false;
    }

    if (seen) {
      setStage("done");
      window.dispatchEvent(new CustomEvent("portfolio-intro-complete"));
      return;
    }

    if (reduceMotion) {
      setStage("reveal");
      document.body.style.overflow = "hidden";
      timers.current = [window.setTimeout(finish, 1800)];
    } else {
      setStage("boot");
      document.body.style.overflow = "hidden";

      timers.current = [
        window.setTimeout(() => setStage("reveal"), 3000),
        window.setTimeout(() => setStage("exit"), TOTAL_MS - 650),
        window.setTimeout(finish, TOTAL_MS),
      ];
    }

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [clearTimers, finish, reduceMotion]);

  if (stage === "done") return null;

  if (stage === "checking") {
    return (
      <>
        <style>{INTRO_STYLES}</style>
        <div className="pi-intro pi-intro--checking" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <style>{INTRO_STYLES}</style>

      <AnimatePresence>
        <motion.div
          key="portfolio-intro"
          className="pi-intro"
          role="presentation"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "exit" ? 0 : 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <div className="pi-grid" />
          <div className="pi-glow pi-glow--one" />
          <div className="pi-glow pi-glow--two" />
          <div className="pi-scanline" />

          <div className="pi-particles" aria-hidden="true">
            {particles.map((p) => (
              <motion.i
                key={p.id}
                className="pi-particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -24, 0],
                        opacity: [0.15, 0.8, 0.15],
                        scale: [0.8, 1.3, 0.8],
                      }
                }
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="pi-orbit pi-orbit--outer" aria-hidden="true">
            <span>REACT</span>
            <i />
            <b />
          </div>

          <div className="pi-orbit pi-orbit--inner" aria-hidden="true">
            <span>AI</span>
            <i />
            <b />
          </div>

          <motion.div
            className="pi-topline"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span>
              <span className="pi-status-dot" />
              DIGITAL EXPERIENCE / 2026
            </span>
            <span className="pi-topline-right">
              DESIGN <b>×</b> ENGINEERING
            </span>
          </motion.div>

          <div className="pi-content">
            <motion.div
              className="pi-terminal-wrap"
              initial={{ opacity: 0, y: 34, rotateX: 12, scale: 0.94 }}
              animate={{
                opacity: stage === "exit" ? 0 : 1,
                y: 0,
                rotateX: 0,
                scale: stage === "exit" ? 0.96 : 1,
              }}
              transition={{
                duration: 1.15,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="pi-terminal">
                <div className="pi-terminal-bar">
                  <div className="pi-window-dots">
                    <i />
                    <i />
                    <i />
                  </div>

                  <span>faiza@creative-studio <b>—</b> ~/portfolio</span>
                  <span className="pi-terminal-lock">● SECURE SESSION</span>
                </div>

                <div className="pi-terminal-body">
                  <div className="pi-terminal-label">
                    <span>01</span> / THE DEVELOPER MINDSET
                  </div>

                  {codeLines.map((line, index) => (
                    <motion.div
                      className="pi-code-line"
                      key={line.n}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: stage === "exit" ? 0 : 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.65 + index * 0.2,
                        duration: 0.45,
                      }}
                    >
                      <span className="pi-line-number">{line.n}</span>
                      <code>{line.code}</code>
                    </motion.div>
                  ))}

                  <motion.div
                    className="pi-terminal-cursor"
                    animate={
                      reduceMotion ? undefined : { opacity: [1, 0, 1] }
                    }
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                </div>

                <div className="pi-terminal-footer">
                  <span><i /> SYSTEM ONLINE</span>
                  <span>BUILDING WHAT MATTERS</span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {stage === "boot" && (
                <motion.div
                  key="boot"
                  className="pi-kicker"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                >
                  <span /> FROM CONCEPT TO CODE <span />
                </motion.div>
              )}

              {(stage === "reveal" || stage === "exit") && (
                <motion.div
                  key="headline"
                  className="pi-headline"
                  initial={{
                    opacity: 0,
                    y: 28,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="pi-eyebrow">
                    <span /> FULL-STACK DEVELOPER <span />
                  </div>

                  <h1>
                    Ideas into <em>impact.</em>
                  </h1>

                  <p>
                    Designing thoughtful digital experiences.
                    Engineering solutions that make a difference.
                  </p>

                  <div className="pi-name">
                    FAIZA NOOR <span>·</span> PORTFOLIO 2026
                  </div>

                  <div className="pi-tech">
                    <span>Next.js</span>
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>AI</span>
                    <span>Full-Stack</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pi-bottomline">
            <span>CREATIVITY, BUILT WITH CODE.</span>
            <span>
              AVAILABLE FOR GREAT IDEAS <b>↗</b>
            </span>
          </div>

          <IntroProgress total={TOTAL_MS} />

          <motion.div
            className="pi-exit-flare"
            animate={{
              opacity: stage === "exit" ? 1 : 0,
              scale: stage === "exit" ? 1.4 : 0.7,
            }}
            transition={{ duration: 0.6 }}
          />

          <button
            type="button"
            className="pi-skip"
            onClick={skip}
            aria-label="Skip portfolio intro"
          >
            SKIP INTRO <span>↗</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}