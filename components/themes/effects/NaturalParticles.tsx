"use client";

import { useEffect, useMemo } from "react";

type NaturalParticlesProps = {
  count?: number;
  intensity?: number;
  className?: string;
};

const NATURE_SYMBOLS = [
  "✿",
  "❀",
  "✦",
  "•",
  "❋",
  "✧",
];

export default function NaturalParticles({
  count = 38,
  intensity = 1,
  className = "",
}: NaturalParticlesProps) {
  const particles = useMemo(() => {
    return Array.from(
      { length: count },
      (_, index) => ({
        id: index,

        symbol:
          NATURE_SYMBOLS[
            Math.floor(
              Math.random() *
                NATURE_SYMBOLS.length
            )
          ],

        left:
          Math.random() * 100,

        size:
          5 + Math.random() * 14,

        delay:
          -(Math.random() * 12),

        duration:
          8 + Math.random() * 12,

        drift:
          -80 + Math.random() * 160,

        rotate:
          -180 + Math.random() * 360,

        opacity:
          0.2 + Math.random() * 0.7,
      })
    );
  }, [count]);

  useEffect(() => {
    document.body.classList.add(
      "natural-particles-active"
    );

    return () => {
      document.body.classList.remove(
        "natural-particles-active"
      );
    };
  }, []);

  return (
    <div
      className={`natural-particles ${className}`}
      style={
        {
          "--nature-intensity": intensity,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* =================================================
          ATMOSPHERIC LIGHT
      ================================================= */}

      <div className="natural-sunlight" />

      {/* =================================================
          WIND
      ================================================= */}

      <div className="natural-wind natural-wind-one" />
      <div className="natural-wind natural-wind-two" />
      <div className="natural-wind natural-wind-three" />

      {/* =================================================
          FLOATING FLOWERS / POLLEN
      ================================================= */}

      <div className="natural-particle-field">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="natural-particle"
            style={
              {
                left: `${particle.left}%`,
                fontSize: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                opacity: particle.opacity,
                "--nature-drift": `${particle.drift}px`,
                "--nature-rotate": `${particle.rotate}deg`,
              } as React.CSSProperties
            }
          >
            {particle.symbol}
          </span>
        ))}
      </div>

      {/* =================================================
          FIREFLIES
      ================================================= */}

      <div className="natural-fireflies">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      {/* =================================================
          LEAVES
      ================================================= */}

      <div className="natural-leaves">
        <span>🍃</span>
        <span>🍃</span>
        <span>🍃</span>
        <span>🍃</span>
        <span>🍃</span>
      </div>

      {/* =================================================
          MOUNTAIN SILHOUETTE
      ================================================= */}

      <div className="natural-mountains">
        <span className="mountain mountain-one" />
        <span className="mountain mountain-two" />
        <span className="mountain mountain-three" />
      </div>

      {/* =================================================
          ORGANIC GLOW
      ================================================= */}

      <div className="natural-organic-glow" />

      {/* =================================================
          SOFT HORIZON
      ================================================= */}

      <div className="natural-horizon" />
    </div>
  );
}