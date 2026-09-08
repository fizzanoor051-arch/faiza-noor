export const EASINGS = {
  smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
  standard: "cubic-bezier(0.22, 1, 0.36, 1)",
  cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
  linear: "linear",
};

export const DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 400,
  medium: 700,
  slow: 1000,
  cinematic: 1400,
};

export const fadeInUp = {
  opacity: 0,
  transform: "translateY(24px)",
};

export const fadeIn = {
  opacity: 0,
};

export const scaleIn = {
  opacity: 0,
  transform: "scale(0.94)",
};

export const slideFromLeft = {
  opacity: 0,
  transform: "translateX(-32px)",
};

export const slideFromRight = {
  opacity: 0,
  transform: "translateX(32px)",
};

export const revealTransition = {
  duration: DURATIONS.medium,
  easing: EASINGS.smooth,
};

export const hoverTransition = {
  duration: DURATIONS.fast,
  easing: EASINGS.standard,
};

export const cinematicTransition = {
  duration: DURATIONS.cinematic,
  easing: EASINGS.cinematic,
};

export const magneticTransition = {
  duration: 500,
  easing: EASINGS.standard,
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.15,
};

export const STAGGER_CONFIG = {
  fast: 0.05,
  normal: 0.08,
  relaxed: 0.12,
};

export const SPRING_CONFIG = {
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

export function createDelay(
  index: number,
  step = 0.08
) {
  return index * step;
}