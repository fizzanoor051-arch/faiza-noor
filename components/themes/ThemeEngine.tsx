"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import {
  useTheme,
  type ThemeMode,
} from "./ThemeProvider";

import NormalTheme from "./modes/normal/NormalTheme";
import LightTheme from "./modes/light/LightTheme";
import DarkTheme from "./modes/dark/DarkTheme";
import NaturalTheme from "./modes/natural/NaturalTheme";
import ThreeDTheme from "./modes/3d/ThreeDTheme";
import CinematicTheme from "./modes/cinematic/CinematicTheme";
import CartoonTheme from "./modes/cartoon/CartoonTheme";
import CodingTheme from "./modes/coding/CodingTheme";
import MatrixTheme from "./modes/matrix/MatrixTheme";

type ThemeEngineProps = {
  children: ReactNode;
};

const WORLD_CLASSES = [
  "visual-world-active",
  "natural-world-active",
  "three-d-world-active",
  "cinematic-world-active",
  "cartoon-world-active",
  "coding-world-active",
  "matrix-world-active",
] as const;

function cleanWorldClasses() {
  const body = document.body;

  WORLD_CLASSES.forEach((className) => {
    body.classList.remove(className);
  });
}

function ThemeVisualLayer({
  theme,
}: {
  theme: ThemeMode;
}) {
  switch (theme) {
    case "normal":
      return <NormalTheme />;

    case "light":
      return <LightTheme />;

    case "dark":
      return <DarkTheme />;

    case "natural":
      return <NaturalTheme />;

    case "3d":
      return <ThreeDTheme />;

    case "cinematic":
      return <CinematicTheme />;

    case "cartoon":
      return <CartoonTheme />;

    case "coding":
      return <CodingTheme />;

    case "matrix":
      return <MatrixTheme />;

    default:
      return <NormalTheme />;
  }
}

export default function ThemeEngine({
  children,
}: ThemeEngineProps) {
  const { theme } = useTheme();

  const previousTheme =
    useRef<ThemeMode>(theme);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    cleanWorldClasses();

    /*
     * Keep all theme states synchronized.
     */
    body.dataset.theme = theme;
    html.dataset.theme = theme;

    body.dataset.visualMode = theme;
    html.dataset.visualMode = theme;

    body.dataset.activeTheme = theme;
    html.dataset.activeTheme = theme;

    /*
     * Transition state
     */
    body.classList.add(
      "theme-transitioning"
    );

    body.dataset.previousTheme =
      previousTheme.current;

    previousTheme.current = theme;

    const timer =
      window.setTimeout(() => {
        body.classList.remove(
          "theme-transitioning"
        );
      }, 900);

    return () => {
      window.clearTimeout(timer);

      body.classList.remove(
        "theme-transitioning"
      );
    };
  }, [theme]);

  return (
    <>
      <ThemeVisualLayer
        theme={theme}
      />

      <div
        className={`theme-site theme-site--${theme}`}
        data-theme-site={theme}
      >
        {children}
      </div>
    </>
  );
}