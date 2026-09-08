"use client";

import { useMemo } from "react";

type CodeParticlesProps = {
  count?: number;
  className?: string;
};

const CODE_SYMBOLS = [
  "</>",
  "{}",
  "()",
  "[]",
  "=>",
  "&&",
  "||",
  "++",
  "--",
  "01",
  "TS",
  "JS",
  "CSS",
  "API",
  "SQL",
  "npm",
  "git",
  "dev",
  "AI",
  "λ",
  "∞",
  "0101",
];

export default function CodeParticles({
  count = 45,
  className = "",
}: CodeParticlesProps) {
  const particles = useMemo(() => {
    return Array.from(
      { length: count },
      (_, index) => ({
        id: index,

        symbol:
          CODE_SYMBOLS[
            Math.floor(
              Math.random() *
                CODE_SYMBOLS.length
            )
          ],

        left: Math.random() * 100,

        top: Math.random() * 100,

        delay:
          -(Math.random() * 10),

        duration:
          8 + Math.random() * 14,

        size:
          8 + Math.random() * 7,

        drift:
          -60 + Math.random() * 120,

        rotation:
          -12 + Math.random() * 24,
      })
    );
  }, [count]);

  return (
    <div
      className={`code-particles ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="code-particle"
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              fontSize: `${particle.size}px`,
              "--particle-drift": `${particle.drift}px`,
              "--particle-rotation": `${particle.rotation}deg`,
            } as React.CSSProperties
          }
        >
          {particle.symbol}
        </span>
      ))}
    </div>
  );
}