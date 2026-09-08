"use client";

import { useEffect, useMemo } from "react";

type CartoonEffectsProps = {
  intensity?: number;
  className?: string;
};

const CARTOON_SYMBOLS = [
  "★",
  "✦",
  "✧",
  "●",
  "○",
  "✿",
  "♡",
  "!",
  "?",
  "+",
];

export default function CartoonEffects({
  intensity = 1,
  className = "",
}: CartoonEffectsProps) {
  const particles = useMemo(() => {
    return Array.from(
      { length: 30 },
      (_, index) => ({
        id: index,
        symbol:
          CARTOON_SYMBOLS[
            Math.floor(
              Math.random() *
                CARTOON_SYMBOLS.length
            )
          ],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: -(Math.random() * 8),
        duration:
          4 + Math.random() * 6,
        size:
          10 + Math.random() * 18,
        drift:
          -50 + Math.random() * 100,
      })
    );
  }, []);

  useEffect(() => {
    document.body.classList.add(
      "cartoon-effects-active"
    );

    return () => {
      document.body.classList.remove(
        "cartoon-effects-active"
      );
    };
  }, []);

  return (
    <div
      className={`cartoon-effects ${className}`}
      style={
        {
          "--cartoon-intensity": intensity,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* =================================================
          SKY
      ================================================= */}

      <div className="cartoon-sky" />

      {/* =================================================
          SUN
      ================================================= */}

      <div className="cartoon-sun">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* =================================================
          CLOUDS
      ================================================= */}

      <div className="cartoon-cloud cartoon-cloud-one">
        <span />
        <span />
        <span />
      </div>

      <div className="cartoon-cloud cartoon-cloud-two">
        <span />
        <span />
        <span />
      </div>

      <div className="cartoon-cloud cartoon-cloud-three">
        <span />
        <span />
        <span />
      </div>

      {/* =================================================
          FLOATING DOODLES
      ================================================= */}

      <div className="cartoon-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="cartoon-particle"
            style={
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                fontSize: `${particle.size}px`,
                "--cartoon-drift": `${particle.drift}px`,
              } as React.CSSProperties
            }
          >
            {particle.symbol}
          </span>
        ))}
      </div>

      {/* =================================================
          BUBBLES
      ================================================= */}

      <div className="cartoon-bubbles">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      {/* =================================================
          DOODLE STARS
      ================================================= */}

      <div className="cartoon-star cartoon-star-one">
        ★
      </div>

      <div className="cartoon-star cartoon-star-two">
        ✦
      </div>

      <div className="cartoon-star cartoon-star-three">
        ✧
      </div>

      {/* =================================================
          FUNNY SPEED LINES
      ================================================= */}

      <div className="cartoon-speed-lines">
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* =================================================
          SPEECH BUBBLE
      ================================================= */}

      <div className="cartoon-speech">
        <span>HELLO!</span>
      </div>

      {/* =================================================
          GROUND
      ================================================= */}

      <div className="cartoon-ground" />
    </div>
  );
}