"use client";

import { useEffect } from "react";

export default function CodingTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("coding-world-active");

    body.classList.remove(
      "visual-world-active",
      "matrix-world-active",
      "three-d-world-active",
      "cartoon-world-active",
      "cinematic-world-active",
      "natural-world-active"
    );

    return () => {
      body.classList.remove("coding-world-active");
    };
  }, []);

  return (
    <div
      className="coding-world"
      aria-hidden="true"
    >
      <div className="coding-grid" />

      <div className="coding-terminal-glow" />

      <div className="coding-scanline" />

      <div className="coding-noise" />

      <div className="coding-floating-code">
        <span className="code-line code-line-1">
          {"const developer = new Engineer();"}
        </span>

        <span className="code-line code-line-2">
          {"developer.build('future');"}
        </span>

        <span className="code-line code-line-3">
          {"await createSomethingImpossible();"}
        </span>

        <span className="code-line code-line-4">
          {"git commit -m \"ship excellence\""}
        </span>
      </div>

      <div className="coding-hud">
        <span>SYS::ONLINE</span>
        <span>BUILD::READY</span>
        <span>NODE::ACTIVE</span>
      </div>

      <div className="coding-cursor" />

      <div className="coding-data-stream">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="coding-corner coding-corner-tl" />
      <div className="coding-corner coding-corner-tr" />
      <div className="coding-corner coding-corner-bl" />
      <div className="coding-corner coding-corner-br" />
    </div>
  );
}