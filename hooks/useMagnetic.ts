"use client";

import { useEffect, useRef } from "react";

interface MagneticOptions {
  strength?: number;
  disabled?: boolean;
}

export function useMagnetic({
  strength = 0.25,
  disabled = false,
}: MagneticOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || disabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        (rect.left + rect.width / 2);

      const y =
        event.clientY -
        (rect.top + rect.height / 2);

      const moveX = x * strength;
      const moveY = y * strength;

      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const handleMouseLeave = () => {
      element.style.transform =
        "translate3d(0, 0, 0)";
    };

    element.addEventListener(
      "mousemove",
      handleMouseMove
    );

    element.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      element.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      element.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      element.style.transform =
        "translate3d(0, 0, 0)";
    };
  }, [strength, disabled]);

  return elementRef;
}