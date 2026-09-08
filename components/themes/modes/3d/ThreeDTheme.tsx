"use client";

import { useEffect } from "react";

export default function ThreeDTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("three-d-world-active");

    body.classList.remove(
      "natural-world-active",
      "matrix-world-active",
      "coding-world-active",
      "cartoon-world-active",
      "cinematic-world-active"
    );

    return () => {
      body.classList.remove("three-d-world-active");
    };
  }, []);

  return (
    <div
      className="three-d-world"
      aria-hidden="true"
    >
      {/* Deep environment */}
      <div className="three-d-world__environment" />

      {/* Cinematic light */}
      <div className="three-d-world__light three-d-world__light--one" />
      <div className="three-d-world__light three-d-world__light--two" />

      {/* Infinite perspective floor */}
      <div className="three-d-world__floor">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Giant rotating 3D structures */}
      <div className="three-d-world__scene">

        <div className="three-d-object three-d-object--cube">
          <span className="face face--front">FN</span>
          <span className="face face--back">FN</span>
          <span className="face face--right">01</span>
          <span className="face face--left">10</span>
          <span className="face face--top">AI</span>
          <span className="face face--bottom">DEV</span>
        </div>

        <div className="three-d-object three-d-object--ring">
          <span />
          <span />
          <span />
        </div>

        <div className="three-d-object three-d-object--diamond">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="three-d-object three-d-object--orb">
          <span />
        </div>

        <div className="three-d-object three-d-object--small-cube">
          <span />
        </div>

      </div>

      {/* Floating particles */}
      <div className="three-d-world__particles">
        {Array.from({ length: 34 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Orbit system */}
      <div className="three-d-world__orbit">
        <span />
        <span />
        <span />
      </div>

      {/* Atmospheric fog */}
      <div className="three-d-world__fog" />

      {/* Cinematic vignette */}
      <div className="three-d-world__vignette" />
    </div>
  );
}