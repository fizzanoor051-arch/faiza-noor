"use client";

import { useEffect } from "react";

export default function NaturalTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("natural-world-active");

    body.classList.remove(
      "matrix-world-active",
      "three-d-world-active",
      "coding-world-active",
      "cartoon-world-active",
      "cinematic-world-active"
    );

    return () => {
      body.classList.remove("natural-world-active");
    };
  }, []);

  return (
    <div
      className="natural-world"
      aria-hidden="true"
    >
      {/* Atmospheric sky */}
      <div className="natural-world__sky" />

      {/* Soft sunlight */}
      <div className="natural-world__sun">
        <span />
      </div>

      {/* Distant mountains */}
      <div className="natural-world__mountains natural-world__mountains--far">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="natural-world__mountains natural-world__mountains--near">
        <span />
        <span />
        <span />
      </div>

      {/* Atmospheric mist */}
      <div className="natural-world__mist natural-world__mist--one" />
      <div className="natural-world__mist natural-world__mist--two" />

      {/* Floating flowers / petals */}
      <div className="natural-world__petals">
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

      {/* Grass field */}
      <div className="natural-world__ground">
        <div className="natural-world__grass">
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        {/* Flowers */}
        <div className="natural-world__flowers">
          <span className="flower flower--one">
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>

          <span className="flower flower--two">
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>

          <span className="flower flower--three">
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>

          <span className="flower flower--four">
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>
        </div>
      </div>

      {/* Fireflies / nature particles */}
      <div className="natural-world__fireflies">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Subtle divine light rays */}
      <div className="natural-world__rays">
        <span />
        <span />
        <span />
      </div>

      {/* Vignette */}
      <div className="natural-world__vignette" />
    </div>
  );
}