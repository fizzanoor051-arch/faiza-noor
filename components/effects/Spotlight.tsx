"use client";

import { useEffect, useRef } from "react";

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;

    if (!spotlight) return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    if (mediaQuery.matches) {
      spotlight.style.display = "none";
      return;
    }

    let animationFrame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const animate = () => {
      spotlight.style.transform = `translate3d(
        ${x - 250}px,
        ${y - 250}px,
        0
      )`;

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[500px] w-[500px] rounded-full bg-purple-500/[0.035] blur-[100px]"
      aria-hidden="true"
    />
  );
}