"use client";

import { useEffect } from "react";

export default function DarkTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add(
      "visual-world-active"
    );

    body.classList.remove(
      "matrix-world-active",
      "three-d-world-active",
      "coding-world-active",
      "cartoon-world-active",
      "cinematic-world-active",
      "natural-world-active",
      "light-world-active"
    );

    body.classList.add(
      "dark-world-active"
    );

    return () => {
      body.classList.remove(
        "visual-world-active",
        "dark-world-active"
      );
    };
  }, []);

  return (
    <div
      className="dark-theme-atmosphere"
      aria-hidden="true"
    >
      <div className="dark-theme-orb dark-theme-orb--one" />

      <div className="dark-theme-orb dark-theme-orb--two" />

      <div className="dark-theme-grid" />

      <div className="dark-theme-vignette" />

      <div className="dark-theme-noise" />
    </div>
  );
}