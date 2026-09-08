"use client";

import { useEffect } from "react";

const MATRIX_COLUMNS = Array.from(
  { length: 34 },
  (_, index) => index
);

export default function MatrixTheme() {
  useEffect(() => {
    const body = document.body;

    body.classList.add("matrix-world-active");

    body.classList.remove(
      "visual-world-active",
      "three-d-world-active",
      "coding-world-active",
      "cartoon-world-active",
      "cinematic-world-active",
      "natural-world-active"
    );

    return () => {
      body.classList.remove("matrix-world-active");
    };
  }, []);

  return (
    <div
      className="matrix-world"
      aria-hidden="true"
    >
      <div className="matrix-vignette" />

      <div className="matrix-scanlines" />

      <div className="matrix-glow" />

      <div className="matrix-rain">
        {MATRIX_COLUMNS.map((column) => (
          <span
            key={column}
            className={`matrix-column matrix-column-${column}`}
          >
            {Array.from(
              { length: 22 },
              (_, index) => (
                <i key={index}>
                  {
                    [
                      "0",
                      "1",
                      "ア",
                      "カ",
                      "7",
                      "∆",
                      "λ",
                      "Ξ",
                      "Σ",
                      "01",
                    ][
                      (index + column) %
                        10
                    ]
                  }
                </i>
              )
            )}
          </span>
        ))}
      </div>

      <div className="matrix-center-core">
        <span className="matrix-core-ring matrix-core-ring-1" />
        <span className="matrix-core-ring matrix-core-ring-2" />
        <span className="matrix-core-ring matrix-core-ring-3" />

        <span className="matrix-core-label">
          SYSTEM
        </span>

        <span className="matrix-core-status">
          ONLINE
        </span>
      </div>

      <div className="matrix-hud matrix-hud-left">
        <span>NEURAL LINK</span>
        <strong>CONNECTED</strong>
      </div>

      <div className="matrix-hud matrix-hud-right">
        <span>REALITY LAYER</span>
        <strong>ACTIVE</strong>
      </div>

      <div className="matrix-terminal">
        <span>root@faiza:~$</span>
        <strong>enter_the_matrix</strong>
        <b>_</b>
      </div>

      <div className="matrix-corners">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}