"use client";

import { useEffect } from "react";

export default function CinematicTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("cinematic-world-active");

    body.classList.remove(
      "natural-world-active",
      "three-d-world-active",
      "matrix-world-active",
      "coding-world-active",
      "cartoon-world-active"
    );

    return () => {
      body.classList.remove("cinematic-world-active");
    };
  }, []);

  return (
    <div
      className="cinematic-world"
      aria-hidden="true"
    >
      {/* Deep horror atmosphere */}
      <div className="cinematic-world__void" />

      {/* Moon */}
      <div className="cinematic-world__moon">
        <span />
      </div>

      {/* Moving clouds */}
      <div className="cinematic-world__clouds">
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Haunted fog */}
      <div className="cinematic-world__fog">
        <span />
        <span />
        <span />
      </div>

      {/* Distant haunted forest */}
      <div className="cinematic-world__forest">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Giant shadow silhouette */}
      <div className="cinematic-world__shadow">
        <span className="shadow-head" />
        <span className="shadow-body" />
        <span className="shadow-arm shadow-arm--left" />
        <span className="shadow-arm shadow-arm--right" />
      </div>

      {/* Floating eyes */}
      <div className="cinematic-world__eyes">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Flying bats */}
      <div className="cinematic-world__bats">
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
      </div>

      {/* Falling ash */}
      <div className="cinematic-world__ash">
        {Array.from({ length: 30 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Horror particles */}
      <div className="cinematic-world__particles">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Lightning */}
      <div className="cinematic-world__lightning">
        <span />
        <span />
      </div>

      {/* Film scratches */}
      <div className="cinematic-world__film">
        <span />
        <span />
        <span />
      </div>

      {/* Cinematic scanline */}
      <div className="cinematic-world__scanline" />

      {/* Heavy vignette */}
      <div className="cinematic-world__vignette" />

      {/* Horror title flash */}
      <div className="cinematic-world__whisper">
        <span>DO NOT LOOK BACK</span>
      </div>
    </div>
  );
}