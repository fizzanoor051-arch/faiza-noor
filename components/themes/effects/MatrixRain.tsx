"use client";

import { useMemo } from "react";

type MatrixRainProps = {
  density?: number;
  opacity?: number;
  className?: string;
};

const CHARACTERS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>[]{}/*+-=λΣΞ∆";

export default function MatrixRain({
  density = 42,
  opacity = 0.55,
  className = "",
}: MatrixRainProps) {
  const columns = useMemo(() => {
    return Array.from({ length: density }, (_, index) => {
      const length =
        10 + Math.floor(Math.random() * 24);

      const characters = Array.from(
        { length },
        () =>
          CHARACTERS[
            Math.floor(
              Math.random() *
                CHARACTERS.length
            )
          ]
      );

      return {
        id: index,
        characters,
        left: Math.random() * 100,
        delay: -(Math.random() * 12),
        duration: 6 + Math.random() * 10,
        size: 9 + Math.random() * 7,
      };
    });
  }, [density]);

  return (
    <div
      className={`matrix-rain-effect ${className}`}
      style={
        {
          "--matrix-opacity": opacity,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-rain-column"
          style={
            {
              left: `${column.left}%`,
              animationDelay: `${column.delay}s`,
              animationDuration: `${column.duration}s`,
              fontSize: `${column.size}px`,
            } as React.CSSProperties
          }
        >
          {column.characters.map(
            (character, index) => (
              <span
                key={`${column.id}-${index}`}
                className={
                  index === 0
                    ? "matrix-rain-head"
                    : ""
                }
              >
                {character}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
}