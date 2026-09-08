
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

const THEME_STORAGE_KEY =
  "faiza-portfolio-visual-mode";

export default function SearchBar() {
  const router = useRouter();

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const closeTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

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

  /*
   * =====================================================
   * SEARCH OPEN / SIZE
   * =====================================================
   */

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchSize, setSearchSize] =
    useState<
      "small" | "medium" | "large"
    >("medium");

  /*
   * =====================================================
   * FILTERED RESULTS
   * =====================================================
   */

  const filteredResults =
    query.trim().length === 0
      ? SEARCH_RESULTS
      : SEARCH_RESULTS.filter(
          (item) => {
            const searchable =
              `${item.title} ${item.description} ${item.category}`.toLowerCase();

            return searchable.includes(
              query.toLowerCase()
            );
          }
        );

  /*
   * =====================================================
   * CLEAR CLOSE TIMER
   * =====================================================
   */

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(
        closeTimerRef.current
      );

      closeTimerRef.current = null;
    }
  };

  /*
   * =====================================================
   * OPEN SEARCH
   * =====================================================
   */

  const openSearch = () => {
    clearCloseTimer();

    setSearchOpen(true);
    setFocused(true);
    setModeOpen(false);

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);
  };

  /*
   * =====================================================
   * CLOSE SEARCH
   * =====================================================
   */

  const closeSearch = () => {
    clearCloseTimer();

    setSearchOpen(false);
    setFocused(false);
    setModeOpen(false);

    inputRef.current?.blur();
  };

  /*
   * =====================================================
   * CLOSE WHEN MOUSE LEAVES
   * =====================================================
   */

  const handleSearchMouseEnter = () => {
    clearCloseTimer();
  };

  const handleSearchMouseLeave = () => {
    if (!searchOpen) {
      return;
    }

    /*
     * Small delay makes the interaction feel
     * smooth instead of abruptly disappearing.
     */
    closeTimerRef.current =
      setTimeout(() => {
        closeSearch();
      }, 180);
  };

  /*
   * =====================================================
   * SEARCH SIZE
   * =====================================================
   */

  const increaseSearchSize = () => {
    setSearchSize(
      (current) => {
        if (current === "small") {
          return "medium";
        }

        if (current === "medium") {
          return "large";
        }

        return "large";
      }
    );
  };

  const decreaseSearchSize = () => {
    setSearchSize(
      (current) => {
        if (current === "large") {
          return "medium";
        }

        if (current === "medium") {
          return "small";
        }

        return "small";
      }
    );
  };

  /*
   * =====================================================
   * LOAD SAVED VISUAL MODE
   * =====================================================
   */

  useEffect(() => {
    try {
      const savedMode =
        window.localStorage.getItem(
          THEME_STORAGE_KEY
        );

      if (
        savedMode &&
        VISUAL_MODES.some(
          (mode) =>
            mode.id === savedMode
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

  /*
   * =====================================================
   * CLEANUP TIMER
   * =====================================================
   */

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  /*
   * =====================================================
   * CHANGE VISUAL MODE
   * =====================================================
   */

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

  /*
   * =====================================================
   * DRAGGING
   * =====================================================
   */

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
    if (
      !dragRef.current.dragging
    ) {
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
    if (
      !dragRef.current.dragging
    ) {
      return;
    }

    dragRef.current.dragging =
      false;

    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  /*
   * =====================================================
   * OPEN SEARCH RESULT
   * =====================================================
   */

  const openResult = (
    result: SearchResult
  ) => {
    setQuery("");
    setFocused(false);
    setModeOpen(false);
    setSearchOpen(false);

    router.push(result.href);
  };

  /*
   * =====================================================
   * KEYBOARD CONTROLS
   * =====================================================
   */

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

      /*
       * "/" opens search
       */
      if (
        event.key === "/" &&
        !typing
      ) {
        event.preventDefault();

        openSearch();

        return;
      }

      /*
       * ESC closes search
       */
      if (
        event.key === "Escape"
      ) {
        closeSearch();

        return;
      }

      if (
        !focused ||
        filteredResults.length === 0
      ) {
        return;
      }

      /*
       * Arrow Down
       */
      if (
        event.key === "ArrowDown"
      ) {
        event.preventDefault();

        setActiveIndex(
          (current) =>
            (current + 1) %
            filteredResults.length
        );

        return;
      }

      /*
       * Arrow Up
       */
      if (
        event.key === "ArrowUp"
      ) {
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

      /*
       * Enter
       */
      if (
        event.key === "Enter"
      ) {
        event.preventDefault();

        const selected =
          filteredResults[
            activeIndex
          ];

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

  /*
   * =====================================================
   * OUTSIDE CLICK
   * =====================================================
   */

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
        closeSearch();
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

  /*
   * =====================================================
   * RESET SEARCH INDEX
   * =====================================================
   */

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  /*
   * =====================================================
   * CURRENT MODE
   * =====================================================
   */

  const currentMode =
    VISUAL_MODES.find(
      (mode) =>
        mode.id === activeMode
    ) ??
    VISUAL_MODES[0];

  return (
    <>
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
        } ${
          searchOpen
            ? "premium-search-wrapper--open"
            : "premium-search-wrapper--collapsed"
        } premium-search-size-${searchSize}`}
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
        onMouseEnter={
          handleSearchMouseEnter
        }
        onMouseLeave={
          handleSearchMouseLeave
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

          {/* =================================================
              CLOSED STATE — ONLY GLOWING ICON
          ================================================= */}

          {!searchOpen && (
            <button
              type="button"
              className="premium-search-collapsed-button"
              onClick={(event) => {
                event.stopPropagation();
                openSearch();
              }}
              aria-label="Open search"
            >
              <span
                className="premium-search-collapsed-icon"
                aria-hidden="true"
              />

              <span
                className="premium-search-collapsed-ring"
                aria-hidden="true"
              />
            </button>
          )}

          {/* =================================================
              OPEN STATE
          ================================================= */}

          {searchOpen && (
            <>
              <span
                className="premium-search-drag-handle"
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </span>

              <button
                type="button"
                className="premium-search-icon-button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeSearch();
                }}
                aria-label="Close search"
              >
                <span
                  className="premium-search-icon"
                  aria-hidden="true"
                />
              </button>

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

              {/* =================================================
                  PLUS / MINUS
              ================================================= */}

              <div
                className="premium-search-size-controls"
                onPointerDown={(event) =>
                  event.stopPropagation()
                }
                onMouseEnter={
                  handleSearchMouseEnter
                }
              >
                <button
                  type="button"
                  className="premium-search-size-button"
                  onClick={
                    increaseSearchSize
                  }
                  aria-label="Increase search bar size"
                  title="Increase size"
                >
                  +
                </button>

                <button
                  type="button"
                  className="premium-search-size-button"
                  onClick={
                    decreaseSearchSize
                  }
                  aria-label="Decrease search bar size"
                  title="Decrease size"
                >
                  −
                </button>
              </div>

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

              {/* =================================================
                  VISUAL MODE
              ================================================= */}

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
                    (current) =>
                      !current
                  );

                  setFocused(false);
                }}
                aria-label="Open visual modes"
                aria-expanded={
                  modeOpen
                }
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
            </>
          )}
        </div>

        {/* =================================================
            VISUAL MODE MENU
        ================================================= */}

        {searchOpen &&
          modeOpen && (
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
                            {
                              mode.label
                            }
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
                  {
                    currentMode.short
                  }
                </span>
              </div>
            </div>
          )}

        {/* =================================================
            SEARCH RESULTS
        ================================================= */}

        {searchOpen &&
          focused && (
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

              {filteredResults.length >
              0 ? (
                /*
                 * IMPORTANT:
                 * This wrapper is independently scrollable.
                 */
                <div className="premium-search-scroll-area">
                  <div className="premium-search-result-list">
                    {filteredResults.map(
                      (
                        result,
                        index
                      ) => {
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
                              openResult(
                                result
                              )
                            }
                          >
                            <span className="premium-search-result-number">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span className="premium-search-result-content">
                              <span className="premium-search-result-title">
                                {
                                  result.title
                                }
                              </span>

                              <span className="premium-search-result-description">
                                {
                                  result.description
                                }
                              </span>
                            </span>

                            <span className="premium-search-result-category">
                              {
                                result.category
                              }
                            </span>

                            <span className="premium-search-result-arrow">
                              ↗
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
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
                    Try Projects,
                    About, Services
                    or Contact
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

      {/* =====================================================
          NEW SEARCH STYLES
          These are intentionally inside this component,
          because you don't have a separate CSS file.
      ===================================================== */}

      <style jsx>{`
        /*
         * =================================================
         * COLLAPSED — ONLY ICON
         * =================================================
         */

        .premium-search-wrapper--collapsed {
          width: auto !important;
          min-width: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        .premium-search-wrapper--collapsed
          .premium-search-bar {
          width: 42px !important;
          height: 42px !important;
          min-width: 42px !important;
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-search-wrapper--collapsed
          .premium-search-energy {
          display: none !important;
        }

        .premium-search-collapsed-button {
          position: relative;
          width: 34px;
          height: 34px;
          padding: 0;
          margin: 0;
          border: none !important;
          outline: none;
          background: transparent !important;
          box-shadow: none !important;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          z-index: 10;
        }

        /*
         * Search glass
         */

        .premium-search-collapsed-icon {
          position: relative;
          display: block;
          width: 17px;
          height: 17px;
          border: 2px solid currentColor;
          border-radius: 50%;
          filter:
            drop-shadow(
              0 0 4px currentColor
            )
            drop-shadow(
              0 0 9px currentColor
            );
          transition:
            transform 0.25s ease,
            filter 0.25s ease;
        }

        .premium-search-collapsed-icon::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 2px;
          right: -6px;
          bottom: -3px;
          border-radius: 999px;
          background: currentColor;
          transform: rotate(45deg);
          box-shadow:
            0 0 4px currentColor,
            0 0 8px currentColor;
        }

        /*
         * Tiny glow — NOT a background/circle.
         */

        .premium-search-collapsed-ring {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid currentColor;
          opacity: 0;
          pointer-events: none;
          transform: scale(0.6);
          animation:
            premiumSearchGlow 2.2s
            ease-out infinite;
        }

        .premium-search-collapsed-button:hover
          .premium-search-collapsed-icon {
          transform: scale(1.12);
          filter:
            drop-shadow(
              0 0 5px currentColor
            )
            drop-shadow(
              0 0 12px currentColor
            )
            drop-shadow(
              0 0 20px currentColor
            );
        }

        @keyframes premiumSearchGlow {
          0% {
            opacity: 0;
            transform: scale(0.65);
          }

          25% {
            opacity: 0.28;
          }

          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }

        /*
         * =================================================
         * OPEN SEARCH
         * =================================================
         */

        .premium-search-wrapper--open
          .premium-search-bar {
          transition:
            width 0.45s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              ),
            height 0.3s ease,
            box-shadow 0.35s ease;
        }

        .premium-search-wrapper--open
          .premium-search-icon-button {
          border: none;
          outline: none;
          background: transparent;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        /*
         * =================================================
         * SIZE CONTROLS
         * =================================================
         */

        .premium-search-size-controls {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 4px;
          flex-shrink: 0;
        }

        .premium-search-size-button {
          width: 25px;
          height: 25px;
          padding: 0;
          border-radius: 7px;
          border: 1px solid currentColor;
          background: transparent;
          color: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          line-height: 1;
          cursor: pointer;
          opacity: 0.7;
          transition:
            opacity 0.2s ease,
            transform 0.2s ease,
            background 0.2s ease;
        }

        .premium-search-size-button:hover {
          opacity: 1;
          transform: scale(1.08);
          background: rgba(
            255,
            255,
            255,
            0.08
          );
        }

        /*
         * =================================================
         * SEARCH WIDTHS
         * =================================================
         */

        .premium-search-size-small
          .premium-search-bar {
          width: min(
            430px,
            calc(100vw - 40px)
          ) !important;
        }

        .premium-search-size-medium
          .premium-search-bar {
          width: min(
            620px,
            calc(100vw - 40px)
          ) !important;
        }

        .premium-search-size-large
          .premium-search-bar {
          width: min(
            820px,
            calc(100vw - 40px)
          ) !important;
        }

        /*
         * =================================================
         * OPEN ANIMATION
         * =================================================
         */

        .premium-search-wrapper--open
          .premium-search-bar {
          animation:
            premiumSearchOpen 0.45s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }

        @keyframes premiumSearchOpen {
          from {
            opacity: 0.55;
            transform: scale(0.86);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /*
         * =================================================
         * SEARCH RESULTS — SCROLL FIX
         * =================================================
         */

        .premium-search-results {
          max-height: min(
            560px,
            calc(100vh - 150px)
          ) !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .premium-search-scroll-area {
          flex: 1 1 auto;
          min-height: 0;
          max-height: min(
            390px,
            calc(100vh - 280px)
          );
          overflow-y: auto !important;
          overflow-x: hidden !important;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color:
            currentColor
            transparent;
          padding-right: 2px;
        }

        /*
         * Chrome / Edge scrollbar
         */

        .premium-search-scroll-area::-webkit-scrollbar {
          width: 5px;
        }

        .premium-search-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }

        .premium-search-scroll-area::-webkit-scrollbar-thumb {
          background: currentColor;
          border-radius: 999px;
          opacity: 0.35;
        }

        .premium-search-scroll-area::-webkit-scrollbar-thumb:hover {
          opacity: 0.75;
        }

        /*
         * Result list must NOT create a second
         * conflicting scroll area.
         */

        .premium-search-scroll-area
          .premium-search-result-list {
          overflow: visible !important;
          max-height: none !important;
        }

        /*
         * =================================================
         * MOBILE
         * =================================================
         */

        @media (max-width: 700px) {
          .premium-search-wrapper--collapsed
            .premium-search-bar {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
          }

          .premium-search-collapsed-button {
            width: 32px;
            height: 32px;
          }

          .premium-search-collapsed-icon {
            width: 16px;
            height: 16px;
          }

          .premium-search-size-small
            .premium-search-bar,
          .premium-search-size-medium
            .premium-search-bar,
          .premium-search-size-large
            .premium-search-bar {
            width: calc(
              100vw - 28px
            ) !important;
          }

          .premium-search-size-controls {
            gap: 2px;
          }

          .premium-search-size-button {
            width: 22px;
            height: 22px;
            font-size: 15px;
          }

          .premium-search-results {
            max-height: calc(
              100vh - 120px
            ) !important;
          }

          .premium-search-scroll-area {
            max-height: calc(
              100vh - 260px
            );
          }
        }

        /*
         * =================================================
         * REDUCED MOTION
         * =================================================
         */

        @media (prefers-reduced-motion: reduce) {
          .premium-search-collapsed-ring,
          .premium-search-wrapper--open
            .premium-search-bar {
            animation: none !important;
          }

          .premium-search-wrapper--open
            .premium-search-bar {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
