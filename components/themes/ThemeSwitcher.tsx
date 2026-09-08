"use client";

import {
  useMemo,
  useState,
  type CSSProperties,
} from "react";

import {
  useTheme,
  type ThemeMode,
} from "./ThemeProvider";

/* =====================================================
   THEME DEFINITIONS
===================================================== */

type ThemeDefinition = {
  id: ThemeMode;
  label: string;
  short: string;
  description: string;
  icon: string;
};

const THEMES: ThemeDefinition[] = [
  {
    id: "normal",
    label: "Normal",
    short: "NRM",
    description: "Original portfolio experience",
    icon: "◈",
  },
  {
    id: "light",
    label: "Light",
    short: "LGT",
    description: "Clean bright professional world",
    icon: "☼",
  },
  {
    id: "dark",
    label: "Dark",
    short: "DRK",
    description: "Deep premium dark interface",
    icon: "◐",
  },
  {
    id: "natural",
    label: "Natural",
    short: "NAT",
    description: "Organic atmospheric world",
    icon: "✿",
  },
  {
    id: "3d",
    label: "3D World",
    short: "3D",
    description: "Immersive dimensional experience",
    icon: "◇",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    short: "FX",
    description: "Dark cinematic movie atmosphere",
    icon: "◉",
  },
  {
    id: "cartoon",
    label: "Cartoon World",
    short: "TOON",
    description: "Playful animated universe",
    icon: "★",
  },
  {
    id: "coding",
    label: "Coding World",
    short: "DEV",
    description: "Developer terminal environment",
    icon: "</>",
  },
  {
    id: "matrix",
    label: "Matrix",
    short: "MTRX",
    description: "Digital reality interface",
    icon: "01",
  },
];

/* =====================================================
   PROPS
===================================================== */

type ThemeSwitcherProps = {
  compact?: boolean;
  className?: string;
};

/* =====================================================
   COMPONENT
===================================================== */

export default function ThemeSwitcher({
  compact = false,
  className = "",
}: ThemeSwitcherProps) {
  const {
    theme,
    setTheme,
    resetTheme,
  } = useTheme();

  const [open, setOpen] =
    useState(false);

  /* ===================================================
     CURRENT THEME
  =================================================== */

  const currentTheme = useMemo(() => {
    return (
      THEMES.find(
        (item) => item.id === theme
      ) ?? THEMES[0]
    );
  }, [theme]);

  /* ===================================================
     THEME CHANGE
  =================================================== */

  const handleThemeChange = (
    nextTheme: ThemeMode
  ) => {
    setTheme(nextTheme);
    setOpen(false);
  };

  /* ===================================================
     RESET
  =================================================== */

  const handleReset = () => {
    resetTheme();
    setOpen(false);
  };

  /* ===================================================
     CSS VARIABLES
  =================================================== */

  const switcherStyle =
    {
      "--theme-count":
        THEMES.length,
    } as CSSProperties;

  /* ===================================================
     COMPACT MODE
     Useful for SearchBar / Navbar / Floating UI
  =================================================== */

  if (compact) {
    return (
      <div
        className={`theme-switcher theme-switcher--compact ${className}`}
        style={switcherStyle}
      >
        <button
          type="button"
          className="theme-switcher__trigger"
          aria-label={`Current theme: ${currentTheme.label}`}
          aria-expanded={open}
          onClick={() =>
            setOpen((value) => !value)
          }
        >
          <span className="theme-switcher__trigger-icon">
            {currentTheme.icon}
          </span>

          <span className="theme-switcher__trigger-copy">
            <span className="theme-switcher__trigger-label">
              {currentTheme.short}
            </span>

            <span className="theme-switcher__trigger-dot" />
          </span>

          <span
            className={`theme-switcher__chevron ${
              open
                ? "theme-switcher__chevron--open"
                : ""
            }`}
          >
            ↓
          </span>
        </button>

        {open && (
          <div className="theme-switcher__dropdown">
            <div className="theme-switcher__dropdown-header">
              <div>
                <span className="theme-switcher__eyebrow">
                  VISUAL SYSTEM
                </span>

                <strong>
                  SELECT WORLD
                </strong>
              </div>

              <span className="theme-switcher__status">
                {currentTheme.short}
              </span>
            </div>

            <div className="theme-switcher__grid">
              {THEMES.map((item) => {
                const selected =
                  item.id === theme;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`theme-switcher__item ${
                      selected
                        ? "theme-switcher__item--active"
                        : ""
                    }`}
                    onClick={() =>
                      handleThemeChange(
                        item.id
                      )
                    }
                  >
                    <span className="theme-switcher__item-icon">
                      {item.icon}
                    </span>

                    <span className="theme-switcher__item-content">
                      <span className="theme-switcher__item-label">
                        {item.label}
                      </span>

                      <span className="theme-switcher__item-description">
                        {item.description}
                      </span>
                    </span>

                    {selected && (
                      <span className="theme-switcher__item-check">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="theme-switcher__reset"
              onClick={handleReset}
            >
              <span>
                RESET TO NORMAL
              </span>

              <span>↺</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ===================================================
     FULL MODE
     Main Theme Control Panel
  =================================================== */

  return (
    <section
      className={`theme-switcher theme-switcher--full ${className}`}
      style={switcherStyle}
    >
      {/* =============================================
          HEADER
      ============================================= */}

      <div className="theme-switcher__header">
        <div className="theme-switcher__heading">
          <span className="theme-switcher__eyebrow">
            FAIZA NOOR // VISUAL ENGINE
          </span>

          <h2>
            Choose Your World
          </h2>

          <p>
            Transform the entire portfolio
            experience.
          </p>
        </div>

        <div className="theme-switcher__current">
          <span className="theme-switcher__current-icon">
            {currentTheme.icon}
          </span>

          <div>
            <span>
              ACTIVE WORLD
            </span>

            <strong>
              {currentTheme.label}
            </strong>
          </div>
        </div>
      </div>

      {/* =============================================
          THEME GRID
      ============================================= */}

      <div className="theme-switcher__full-grid">
        {THEMES.map((item, index) => {
          const selected =
            item.id === theme;

          return (
            <button
              key={item.id}
              type="button"
              className={`theme-switcher__full-card ${
                selected
                  ? "theme-switcher__full-card--active"
                  : ""
              }`}
              onClick={() =>
                handleThemeChange(
                  item.id
                )
              }
            >
              {/* Number */}

              <span className="theme-switcher__card-number">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              {/* Icon */}

              <span className="theme-switcher__card-icon">
                {item.icon}
              </span>

              {/* Content */}

              <span className="theme-switcher__card-content">
                <span className="theme-switcher__card-label">
                  {item.label}
                </span>

                <span className="theme-switcher__card-description">
                  {item.description}
                </span>
              </span>

              {/* Short Code */}

              <span className="theme-switcher__card-code">
                {item.short}
              </span>

              {/* Active */}

              {selected && (
                <span className="theme-switcher__card-active">
                  ACTIVE
                </span>
              )}

              {/* Corner */}

              <span className="theme-switcher__card-corner" />
            </button>
          );
        })}
      </div>

      {/* =============================================
          FOOTER
      ============================================= */}

      <div className="theme-switcher__footer">
        <span>
          {THEMES.length} VISUAL WORLDS
        </span>

        <button
          type="button"
          onClick={handleReset}
          className="theme-switcher__footer-reset"
        >
          RESET EXPERIENCE
        </button>

        <span>
          CURRENT:{" "}
          {currentTheme.short}
        </span>
      </div>
    </section>
  );
}