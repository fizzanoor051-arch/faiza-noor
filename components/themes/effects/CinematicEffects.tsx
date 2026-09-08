"use client";

import { useEffect, useMemo } from "react";

type CinematicEffectsProps = {
  intensity?: number;
  className?: string;
};

const WHISPERS = [
  "DON'T LOOK BACK",
  "SYSTEM BREACH",
  "SIGNAL LOST",
  "SOMETHING IS HERE",
  "DO NOT ENTER",
  "UNKNOWN",
  "404 : REALITY",
];

export default function CinematicEffects({
  intensity = 1,
  className = "",
}: CinematicEffectsProps) {
  const whispers = useMemo(() => {
    return Array.from(
      { length: WHISPERS.length },
      (_, index) => ({
        id: index,
        text: WHISPERS[index],
        left: 5 + Math.random() * 80,
        top: 15 + Math.random() * 70,
        delay: -(Math.random() * 12),
        duration: 8 + Math.random() * 8,
      })
    );
  }, []);

  useEffect(() => {
    const body = document.body;

    body.classList.add("cinematic-effects-active");

    return () => {
      body.classList.remove("cinematic-effects-active");
    };
  }, []);

  return (
    <div
      className={`cinematic-effects ${className}`}
      style={
        {
          "--cinematic-intensity": intensity,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* =================================================
          ATMOSPHERIC FOG
      ================================================= */}

      <div className="cinematic-fog cinematic-fog-one" />
      <div className="cinematic-fog cinematic-fog-two" />
      <div className="cinematic-fog cinematic-fog-three" />

      {/* =================================================
          MOON
      ================================================= */}

      <div className="cinematic-moon">
        <div className="cinematic-moon-shadow" />
      </div>

      {/* =================================================
          VIGNETTE
      ================================================= */}

      <div className="cinematic-vignette" />

      {/* =================================================
          FILM GRAIN
      ================================================= */}

      <div className="cinematic-film-grain" />

      {/* =================================================
          FILM SCRATCHES
      ================================================= */}

      <div className="cinematic-scratches">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* =================================================
          SHADOW FIGURE
      ================================================= */}

      <div className="cinematic-shadow-figure">
        <div className="shadow-head" />
        <div className="shadow-body" />
      </div>

      {/* =================================================
          DISTANT EYES
      ================================================= */}

      <div className="cinematic-eyes">
        <span />
        <span />
      </div>

      {/* =================================================
          RED WARNING LIGHT
      ================================================= */}

      <div className="cinematic-warning-light" />

      {/* =================================================
          WHISPER TEXT
      ================================================= */}

      <div className="cinematic-whispers">
        {whispers.map((item) => (
          <span
            key={item.id}
            style={
              {
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              } as React.CSSProperties
            }
          >
            {item.text}
          </span>
        ))}
      </div>

      {/* =================================================
          CINEMATIC LIGHT BEAMS
      ================================================= */}

      <div className="cinematic-beam cinematic-beam-one" />
      <div className="cinematic-beam cinematic-beam-two" />

      {/* =================================================
          HEARTBEAT PULSE
      ================================================= */}

      <div className="cinematic-heartbeat">
        <span />
      </div>

      {/* =================================================
          BLACKOUT FLASH
      ================================================= */}

      <div className="cinematic-blackout" />
    </div>
  );
}