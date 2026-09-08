"use client";

import { useEffect } from "react";

export default function LightTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("visual-world-active");

    body.classList.remove(
      "matrix-world-active",
      "three-d-world-active",
      "coding-world-active",
      "cartoon-world-active",
      "cinematic-world-active",
      "natural-world-active"
    );

    body.classList.add("light-world-active");

    return () => {
      body.classList.remove(
        "visual-world-active",
        "light-world-active"
      );
    };
  }, []);

  return (
    <div
      className="light-theme-atmosphere"
      aria-hidden="true"
    >
      <div className="light-theme-glow light-theme-glow--one" />
      <div className="light-theme-glow light-theme-glow--two" />
      <div className="light-theme-grid" />
      <div className="light-theme-noise" />
    </div>
  );
}