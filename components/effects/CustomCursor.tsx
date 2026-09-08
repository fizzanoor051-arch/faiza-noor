"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    if (mediaQuery.matches) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let animationFrame = 0;

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;

      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      animationFrame = requestAnimationFrame(animateFollower);
    };

    const handlePointerOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest(
          "a, button, input, textarea, select, [data-cursor-hover]",
        )
      ) {
        cursor.classList.add("cursor-active");
        follower.classList.add("cursor-active");
      }
    };

    const handlePointerOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest(
          "a, button, input, textarea, select, [data-cursor-hover]",
        )
      ) {
        cursor.classList.remove("cursor-active");
        follower.classList.remove("cursor-active");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mouseout", handlePointerOut);

    animationFrame = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerOut);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-[width,height] duration-200"
        aria-hidden="true"
      />

      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 transition-[width,height,border-color,background-color] duration-300"
        aria-hidden="true"
      />

      <style jsx global>{`
        .cursor-active {
          width: 42px !important;
          height: 42px !important;
          border-color: rgba(192, 132, 252, 0.65) !important;
        }
      `}</style>
    </>
  );
}