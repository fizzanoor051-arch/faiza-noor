"use client";

import { useEffect, useRef } from "react";

type ThreeDWorldProps = {
  intensity?: number;
  className?: string;
};

export default function ThreeDWorld({
  intensity = 1,
  className = "",
}: ThreeDWorldProps) {
  const worldRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const world = worldRef.current;

    if (!world) return;

    let frame = 0;

    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;

    let positionX = 0;
    let positionY = 0;

    const animate = () => {
      rotationX +=
        0.003 * intensity;

      rotationY +=
        0.006 * intensity;

      rotationZ +=
        0.0015 * intensity;

      positionX =
        Math.sin(rotationY * 0.8) *
        18 *
        intensity;

      positionY =
        Math.cos(rotationX * 0.7) *
        12 *
        intensity;

      world.style.transform = `
        translate3d(
          ${positionX}px,
          ${positionY}px,
          0
        )
        rotateX(${Math.sin(rotationX) * 2.5}deg)
        rotateY(${Math.sin(rotationY) * 3.5}deg)
        rotateZ(${rotationZ}deg)
      `;

      frame =
        requestAnimationFrame(
          animate
        );
    };

    frame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [intensity]);

  return (
    <div
      ref={worldRef}
      className={`three-d-world-effect ${className}`}
      aria-hidden="true"
    >
      <div className="three-d-depth three-d-depth-back" />

      <div className="three-d-depth three-d-depth-mid" />

      <div className="three-d-orbit three-d-orbit-one">
        <span />
      </div>

      <div className="three-d-orbit three-d-orbit-two">
        <span />
      </div>

      <div className="three-d-orbit three-d-orbit-three">
        <span />
      </div>

      <div className="three-d-core">
        <span className="three-d-core-ring" />
        <span className="three-d-core-ring" />
        <span className="three-d-core-ring" />

        <span className="three-d-core-dot" />
      </div>

      <div className="three-d-light-beam three-d-light-beam-one" />
      <div className="three-d-light-beam three-d-light-beam-two" />

      <div className="three-d-floor" />
    </div>
  );
}