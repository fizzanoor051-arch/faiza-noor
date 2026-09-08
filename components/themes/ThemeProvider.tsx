"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode =
  | "normal"
  | "light"
  | "dark"
  | "natural"
  | "3d"
  | "cinematic"
  | "cartoon"
  | "coding"
  | "matrix";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resetTheme: () => void;
  isTheme: (theme: ThemeMode) => boolean;
};

const STORAGE_KEY = "faiza-noor-theme";
const DEFAULT_THEME: ThemeMode = "normal";

const VALID_THEMES: ThemeMode[] = [
  "normal",
  "light",
  "dark",
  "natural",
  "3d",
  "cinematic",
  "cartoon",
  "coding",
  "matrix",
];

const ThemeContext =
  createContext<ThemeContextValue | undefined>(undefined);

function isValidTheme(
  value: string | null
): value is ThemeMode {
  return (
    value !== null &&
    VALID_THEMES.includes(value as ThemeMode)
  );
}

function applyTheme(theme: ThemeMode) {
  const html = document.documentElement;
  const body = document.body;

  /*
   * Main theme attributes
   */
  html.dataset.theme = theme;
  body.dataset.theme = theme;

  /*
   * Compatibility with your existing SearchBar CSS
   */
  html.dataset.visualMode = theme;
  body.dataset.visualMode = theme;

  /*
   * Active theme attributes
   */
  html.dataset.activeTheme = theme;
  body.dataset.activeTheme = theme;

  /*
   * Remove old theme classes
   */
  body.classList.remove(
    ...VALID_THEMES.map(
      (item) => `theme-${item}`
    )
  );

  /*
   * Add current theme class
   */
  body.classList.add(
    `theme-${theme}`
  );

  /*
   * CSS variable
   */
  html.style.setProperty(
    "--active-theme",
    `"${theme}"`
  );
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<ThemeMode>(DEFAULT_THEME);

  useEffect(() => {
    try {
      const saved =
        window.localStorage.getItem(
          STORAGE_KEY
        );

      if (isValidTheme(saved)) {
        setThemeState(saved);
        applyTheme(saved);
      } else {
        applyTheme(DEFAULT_THEME);
      }
    } catch {
      applyTheme(DEFAULT_THEME);
    }
  }, []);

  const setTheme = useCallback(
    (nextTheme: ThemeMode) => {
      setThemeState(nextTheme);

      applyTheme(nextTheme);

      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          nextTheme
        );
      } catch {
        // Storage unavailable.
      }
    },
    []
  );

  const resetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME);
  }, [setTheme]);

  const isTheme = useCallback(
    (value: ThemeMode) => {
      return theme === value;
    },
    [theme]
  );

  const contextValue =
    useMemo<ThemeContextValue>(
      () => ({
        theme,
        setTheme,
        resetTheme,
        isTheme,
      }),
      [
        theme,
        setTheme,
        resetTheme,
        isTheme,
      ]
    );

  return (
    <ThemeContext.Provider
      value={contextValue}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
}

/*
 * Also export default so either import style works.
 */
export default ThemeProvider;