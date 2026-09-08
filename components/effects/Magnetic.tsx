"use client";

import {
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    if (mediaQuery.matches) return;

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      const maxDistance = 100;

      const limitedX = Math.max(
        -maxDistance,
        Math.min(maxDistance, distanceX),
      );

      const limitedY = Math.max(
        -maxDistance,
        Math.min(maxDistance, distanceY),
      );

      element.style.transform = `translate3d(
        ${limitedX * strength}px,
        ${limitedY * strength}px,
        0
      )`;
    };

    const handleLeave = () => {
      element.style.transform = "translate3d(0, 0, 0)";
    };

    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}