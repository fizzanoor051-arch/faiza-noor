"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { useRouter } from "next/navigation";

type SearchResult = {
  title: string;
  description: string;
  href: string;
  category: string;
};

type VisualMode = {
  id: string;
  label: string;
  short: string;
  icon: string;
  description: string;
};

const SEARCH_RESULTS: SearchResult[] = [
  {
    title: "Home",
    description: "Return to the main portfolio experience",
    href: "/",
    category: "PAGE",
  },
  {
    title: "About",
    description: "Discover who Faiza Noor is",
    href: "/about",
    category: "PAGE",
  },
  {
    title: "Projects",
    description: "Explore selected development projects",
    href: "/projects",
    category: "WORK",
  },
  {
    title: "Experience",
    description: "Development experience and journey",
    href: "/experience",
    category: "CAREER",
  },
  {
    title: "Services",
    description: "Full-stack web development services",
    href: "/services",
    category: "SERVICE",
  },
  {
    title: "Contact",
    description: "Start a project or collaboration",
    href: "/contact",
    category: "CONTACT",
  },
  {
    title: "Resume",
    description: "View or download the CV",
    href: "/resume",
    category: "DOCUMENT",
  },
  {
    title: "Education",
    description: "Education and academic background",
    href: "/about",
    category: "ABOUT",
  },
  {
    title: "Skills",
    description: "Frontend, backend and full-stack skills",
    href: "/about",
    category: "ABOUT",
  },
  {
    title: "Certificates",
    description: "Professional certifications",
    href: "/about",
    category: "ABOUT",
  },
    {
    title: "FN AI",
    description: "MEET ME",
    href: "/ai",
    category: "ABOUT",
  },
];

const VISUAL_MODES: VisualMode[] = [
  {
    id: "normal",
    label: "Normal",
    short: "NRM",
    icon: "◉",
    description: "Original portfolio experience",
  },
  {
    id: "light",
    label: "Light",
    short: "LGT",
    icon: "☼",
    description: "Clean bright interface",
  },
  {
    id: "dark",
    label: "Dark",
    short: "DRK",
    icon: "◐",
    description: "Deep cinematic darkness",
  },
  {
    id: "natural",
    label: "Natural",
    short: "NAT",
    icon: "◇",
    description: "Organic calm atmosphere",
  },
  {
    id: "3d",
    label: "3D World",
    short: "3D",
    icon: "⬡",
    description: "Depth-focused visual world",
  },
  {
    id: "cinematic",
    label: "Full Animation",
    short: "FX",
    icon: "✦",
    description: "Cinematic motion experience",
  },
  {
    id: "cartoon",
    label: "Cartoon World",
    short: "TOON",
    icon: "✧",
    description: "Playful illustrated atmosphere",
  },
  {
    id: "coding",
    label: "Coding World",
    short: "DEV",
    icon: "</>",
    description: "Developer terminal universe",
  },
  {
    id: "matrix",
    label: "Matrix",
    short: "MTRX",
    icon: "▦",
    description: "Digital green-code atmosphere",
  },
];

const INITIAL_POSITION = {
  x: 0,
  y: 0,
};

const THEME_STORAGE_KEY = "faiza-portfolio-visual-mode";

export default function SearchBar() {
  const router = useRouter();

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const dragRef = useRef({
    dragging: false,
    startPointerX: 0,
    startPointerY: 0,
    startX: INITIAL_POSITION.x,
    startY: INITIAL_POSITION.y,
  });

  const [position, setPosition] =
    useState(INITIAL_POSITION);

  const [query, setQuery] =
    useState("");

  const [focused, setFocused] =
    useState(false);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [dragging, setDragging] =
    useState(false);

  const [modeOpen, setModeOpen] =
    useState(false);

  const [activeMode, setActiveMode] =
    useState("normal");

  const filteredResults =
    query.trim().length === 0
      ? SEARCH_RESULTS.slice(0, 5)
      : SEARCH_RESULTS.filter((item) => {
          const searchable =
            `${item.title} ${item.description} ${item.category}`
              .toLowerCase();

          return searchable.includes(
            query.toLowerCase()
          );
        }).slice(0, 7);

  /* =====================================================
     LOAD SAVED VISUAL MODE
  ===================================================== */

  useEffect(() => {
    try {
      const savedMode =
        window.localStorage.getItem(
          THEME_STORAGE_KEY
        );

      if (
        savedMode &&
        VISUAL_MODES.some(
          (mode) => mode.id === savedMode
        )
      ) {
        setActiveMode(savedMode);
        document.body.dataset.visualMode =
          savedMode;
      } else {
        document.body.dataset.visualMode =
          "normal";
      }
    } catch {
      document.body.dataset.visualMode =
        "normal";
    }
  }, []);

  /* =====================================================
     CHANGE VISUAL MODE
  ===================================================== */

  const changeVisualMode = (
    mode: VisualMode
  ) => {
    setActiveMode(mode.id);

    document.body.dataset.visualMode =
      mode.id;

    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        mode.id
      );
    } catch {
      // localStorage may be unavailable.
    }

    setModeOpen(false);
  };

  /* =====================================================
     DRAGGING
  ===================================================== */

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const target =
      event.target as HTMLElement;

    if (
      target.closest("input") ||
      target.closest("button") ||
      target.closest(
        ".premium-search-results"
      ) ||
      target.closest(
        ".premium-search-mode-menu"
      )
    ) {
      return;
    }

    event.preventDefault();

    dragRef.current = {
      dragging: true,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
    };

    setDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!dragRef.current.dragging) {
      return;
    }

    const deltaX =
      event.clientX -
      dragRef.current.startPointerX;

    const deltaY =
      event.clientY -
      dragRef.current.startPointerY;

    setPosition({
      x:
        dragRef.current.startX +
        deltaX,
      y:
        dragRef.current.startY +
        deltaY,
    });
  };

  const handlePointerUp = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!dragRef.current.dragging) {
      return;
    }

    dragRef.current.dragging = false;

    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  /* =====================================================
     OPEN SEARCH RESULT
  ===================================================== */

  const openResult = (
    result: SearchResult
  ) => {
    setQuery("");
    setFocused(false);
    setModeOpen(false);

    router.push(result.href);
  };

  /* =====================================================
     KEYBOARD CONTROLS
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement | null;

      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (
        event.key === "/" &&
        !typing
      ) {
        event.preventDefault();

        inputRef.current?.focus();

        setFocused(true);

        return;
      }

      if (event.key === "Escape") {
        setFocused(false);

        setModeOpen(false);

        inputRef.current?.blur();

        return;
      }

      if (
        !focused ||
        filteredResults.length === 0
      ) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setActiveIndex(
          (current) =>
            (current + 1) %
            filteredResults.length
        );

        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setActiveIndex(
          (current) =>
            (current -
              1 +
              filteredResults.length) %
            filteredResults.length
        );

        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const selected =
          filteredResults[activeIndex];

        if (selected) {
          openResult(selected);
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    focused,
    filteredResults,
    activeIndex,
  ]);

  /* =====================================================
     OUTSIDE CLICK
  ===================================================== */

  useEffect(() => {
    const handleOutside = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setFocused(false);
        setModeOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, []);

  /* =====================================================
     RESET SEARCH INDEX
  ===================================================== */

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const currentMode =
    VISUAL_MODES.find(
      (mode) => mode.id === activeMode
    ) ?? VISUAL_MODES[0];

  return (
    <div
      ref={wrapperRef}
      className={`premium-search-wrapper ${
        focused
          ? "premium-search-wrapper--focused"
          : ""
      } ${
        dragging
          ? "premium-search-wrapper--dragging"
          : ""
      } ${
        modeOpen
          ? "premium-search-wrapper--mode-open"
          : ""
      }`}
      style={{
        transform: `translate3d(
          calc(-50% + ${position.x}px),
          ${position.y}px,
          0
        )`,
      }}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerUp
      }
    >
      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <div className="premium-search-bar">
        <span
          className="premium-search-energy"
          aria-hidden="true"
        />

        <span
          className="premium-search-drag-handle"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>

        <span
          className="premium-search-icon"
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value
            )
          }
          onFocus={() =>
            setFocused(true)
          }
          placeholder="Search portfolio..."
          aria-label="Search portfolio"
          autoComplete="off"
          spellCheck={false}
        />

        <button
          type="button"
          className="premium-search-shortcut"
          onClick={() => {
            inputRef.current?.focus();
            setFocused(true);
            setModeOpen(false);
          }}
          aria-label="Focus search"
        >
          /
        </button>

        {/* =============================================
            VISUAL MODE BUTTON
        ============================================= */}

        <button
          type="button"
          className={`premium-search-mode-trigger ${
            modeOpen
              ? "is-open"
              : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();

            setModeOpen(
              (current) => !current
            );

            setFocused(false);
          }}
          aria-label="Open visual modes"
          aria-expanded={modeOpen}
        >
          <span className="premium-search-mode-trigger-icon">
            {currentMode.icon}
          </span>

          <span className="premium-search-mode-trigger-label">
            {currentMode.short}
          </span>
        </button>

        <span
          className="premium-search-status"
          aria-hidden="true"
        />
      </div>

      {/* =================================================
          VISUAL MODE MENU
      ================================================= */}

      {modeOpen && (
        <div
          className="premium-search-mode-menu"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
        >
          <div className="premium-search-mode-header">
            <div>
              <span className="premium-search-mode-eyebrow">
                PORTFOLIO ENGINE
              </span>

              <span className="premium-search-mode-title">
                VISUAL MODE
              </span>
            </div>

            <span className="premium-search-mode-count">
              {String(
                VISUAL_MODES.length
              ).padStart(2, "0")}
            </span>
          </div>

          <div className="premium-search-mode-grid">
            {VISUAL_MODES.map(
              (mode) => {
                const selected =
                  mode.id ===
                  activeMode;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    className={`premium-search-mode-option ${
                      selected
                        ? "is-selected"
                        : ""
                    }`}
                    onClick={() =>
                      changeVisualMode(
                        mode
                      )
                    }
                  >
                    <span className="premium-search-mode-icon">
                      {mode.icon}
                    </span>

                    <span className="premium-search-mode-copy">
                      <span className="premium-search-mode-name">
                        {mode.label}
                      </span>

                      <span className="premium-search-mode-description">
                        {
                          mode.description
                        }
                      </span>
                    </span>

                    <span className="premium-search-mode-check">
                      {selected
                        ? "●"
                        : "○"}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <div className="premium-search-mode-footer">
            <span>
              <span className="premium-search-mode-live-dot" />
              LIVE VISUAL SYSTEM
            </span>

            <span>
              MODE:{" "}
              {currentMode.short}
            </span>
          </div>
        </div>
      )}

      {/* =================================================
          SEARCH RESULTS
      ================================================= */}

      {focused && (
        <div
          className="premium-search-results"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
        >
          <div className="premium-search-results-top">
            <span>
              {query
                ? "SEARCH RESULTS"
                : "QUICK NAVIGATION"}
            </span>

            <span>
              {String(
                filteredResults.length
              ).padStart(2, "0")}
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="premium-search-result-list">
              {filteredResults.map(
                (result, index) => {
                  const active =
                    index ===
                    activeIndex;

                  return (
                    <button
                      key={`${result.title}-${result.href}`}
                      type="button"
                      className={`premium-search-result ${
                        active
                          ? "is-active"
                          : ""
                      }`}
                      onMouseEnter={() =>
                        setActiveIndex(
                          index
                        )
                      }
                      onClick={() =>
                        openResult(result)
                      }
                    >
                      <span className="premium-search-result-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="premium-search-result-content">
                        <span className="premium-search-result-title">
                          {result.title}
                        </span>

                        <span className="premium-search-result-description">
                          {
                            result.description
                          }
                        </span>
                      </span>

                      <span className="premium-search-result-category">
                        {result.category}
                      </span>

                      <span className="premium-search-result-arrow">
                        ↗
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          ) : (
            <div className="premium-search-empty">
              <span className="premium-search-empty-icon">
                ∅
              </span>

              <span>
                No matching destination
              </span>

              <small>
                Try Projects, About,
                Services or Contact
              </small>
            </div>
          )}

          <div className="premium-search-footer">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              Navigate
            </span>

            <span>
              <kbd>ENTER</kbd>
              Open
            </span>

            <span>
              <kbd>ESC</kbd>
              Close
            </span>

            <span className="premium-search-drag-hint">
              DRAG TO MOVE
            </span>
          </div>
        </div>
      )}
    </div>
  );
}