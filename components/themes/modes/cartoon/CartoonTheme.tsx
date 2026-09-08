"use client";

import { useEffect } from "react";

export default function CartoonTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("cartoon-world-active");

    body.classList.remove(
      "natural-world-active",
      "three-d-world-active",
      "matrix-world-active",
      "coding-world-active",
      "cinematic-world-active"
    );

    return () => {
      body.classList.remove("cartoon-world-active");
    };
  }, []);

  return (
    <div
      className="cartoon-world"
      aria-hidden="true"
    >
      {/* Cartoon sky */}
      <div className="cartoon-world__sky" />

      {/* Big rainbow */}
      <div className="cartoon-world__rainbow">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Puffy clouds */}
      <div className="cartoon-world__clouds">
        <span>
          <i />
          <i />
          <i />
        </span>

        <span>
          <i />
          <i />
          <i />
        </span>

        <span>
          <i />
          <i />
          <i />
        </span>
      </div>

      {/* Smiling sun */}
      <div className="cartoon-world__sun">
        <span className="cartoon-eye cartoon-eye--left" />
        <span className="cartoon-eye cartoon-eye--right" />
        <span className="cartoon-smile" />
      </div>

      {/* Floating balloons */}
      <div className="cartoon-world__balloons">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Stars */}
      <div className="cartoon-world__stars">
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index}>
            ★
          </span>
        ))}
      </div>

      {/* Bubbles */}
      <div className="cartoon-world__bubbles">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Cute floating monsters */}
      <div className="cartoon-world__friends">
        <div className="cartoon-friend cartoon-friend--one">
          <span className="friend-eye" />
          <span className="friend-eye" />
          <span className="friend-mouth" />
        </div>

        <div className="cartoon-friend cartoon-friend--two">
          <span className="friend-eye" />
          <span className="friend-eye" />
          <span className="friend-mouth" />
        </div>

        <div className="cartoon-friend cartoon-friend--three">
          <span className="friend-eye" />
          <span className="friend-eye" />
          <span className="friend-mouth" />
        </div>
      </div>

      {/* Confetti */}
      <div className="cartoon-world__confetti">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Ground */}
      <div className="cartoon-world__ground">
        <span />
        <span />
        <span />
      </div>

      {/* Foreground clouds */}
      <div className="cartoon-world__foreground-clouds">
        <span />
        <span />
      </div>

      {/* Soft vignette */}
      <div className="cartoon-world__vignette" />
    </div>
  );
}