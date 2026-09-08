"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/data/navigation";
import EntertainmentHub from "@/components/entertainment/EntertainmentHub";
import SearchBar from "@/components/navigation/SearchBar";

type NavItem = {
  label: string;
  href: string;
  number: string;
};

export default function Navbar() {
  const pathname = usePathname();

  /* =========================================================
     RESPONSIVE STATE
  ========================================================= */

  const [isMobile, setIsMobile] = useState(false);

  /* =========================================================
     DESKTOP STATE
  ========================================================= */

  const [verticalMode, setVerticalMode] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  /* =========================================================
     ENTERTAINMENT STATE
  ========================================================= */

  const [entertainmentOpen, setEntertainmentOpen] = useState(false);

  /* =========================================================
     MOBILE STATE
  ========================================================= */

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] =
    useState<string | null>(null);

  /* =========================================================
     CLOSE TIMER
  ========================================================= */

  const closeTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /* =========================================================
     DETECT MOBILE
  ========================================================= */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const handleResize = () => {
      const mobile = mediaQuery.matches;

      setIsMobile(mobile);

      if (mobile) {
        setVerticalMode(false);
        setSideOpen(false);
        setHoveredItem(null);
      } else {
        setMobileMenuOpen(false);
        setMobileExpandedItem(null);
      }
    };

    handleResize();

    mediaQuery.addEventListener(
      "change",
      handleResize
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleResize
      );
    };
  }, []);

  /* =========================================================
     CLOSE ENTERTAINMENT WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setEntertainmentOpen(false);
  }, [pathname]);

  /* =========================================================
     FIND NAVIGATION ITEMS
  ========================================================= */

  const findItem = (
    ...labels: string[]
  ): NavItem | undefined => {
    return navigationItems.find((item) =>
      labels.some(
        (label) =>
          item.label.toLowerCase() ===
          label.toLowerCase()
      )
    );
  };

  const homeItem = findItem("Home");
  const aboutItem = findItem("About");
  const projectsItem = findItem("Projects");
  const contactItem = findItem("Contact");

  const educationItem =
    findItem("Education");

  const certificatesItem = findItem(
    "Certificates",
    "Certificate"
  );

  const skillsItem =
    findItem("Skills");

  const servicesItem = findItem(
    "Services",
    "Service"
  );

  const cvItem = findItem(
    "CV",
    "Resume"
  );

  const experienceItem =
    findItem("Experience");

  /* =========================================================
     ABOUT DROPDOWN
  ========================================================= */

  const aboutDropdownItems = [
    educationItem,
    certificatesItem,
    skillsItem,
    servicesItem,
    cvItem,
  ].filter(Boolean) as NavItem[];

  /* =========================================================
     PROJECTS DROPDOWN
  ========================================================= */

  const projectsDropdownItems = [
    projectsItem,
    skillsItem,
    experienceItem,
  ].filter(Boolean) as NavItem[];

  /* =========================================================
     MAIN NAVIGATION
  ========================================================= */

  const mainNavigation = [
    homeItem,
    aboutItem,
    projectsItem,
    contactItem,
  ].filter(Boolean) as NavItem[];

  /* =========================================================
     SIDEBAR NAVIGATION
  ========================================================= */

  const sidebarNavigation = [
    homeItem,
    aboutItem,
    projectsItem,
    contactItem,
  ].filter(Boolean) as NavItem[];

  /* =========================================================
     TIMER HELPERS
  ========================================================= */

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  /* =========================================================
     OPEN DESKTOP SIDEBAR
  ========================================================= */

  const openSidebar = () => {
    if (isMobile) return;

    clearCloseTimer();

    setSideOpen(true);
  };

  /* =========================================================
     CLOSE DESKTOP SIDEBAR
  ========================================================= */

  const closeSidebar = () => {
    if (isMobile) return;

    clearCloseTimer();

    setSideOpen(false);
    setVerticalMode(false);
    setHoveredItem(null);
  };

  /* =========================================================
     DESKTOP / MOBILE TRIGGER
  ========================================================= */

  const toggleNavigation = () => {
    clearCloseTimer();

    // MOBILE
    if (isMobile) {
      setMobileMenuOpen((current) => !current);
      setMobileExpandedItem(null);
      return;
    }

    // DESKTOP
    if (verticalMode) {
      // Vertical → Horizontal
      setVerticalMode(false);
      setSideOpen(false);
      setHoveredItem(null);
    } else {
      // Horizontal → Vertical
      setVerticalMode(true);
      setSideOpen(true);
    }
  };

  /* =========================================================
     CLOSE EVERYTHING
  ========================================================= */

  const closeNavigation = () => {
    clearCloseTimer();

    setVerticalMode(false);
    setSideOpen(false);
    setHoveredItem(null);

    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  };

  /* =========================================================
     CLOSE NAVIGATION BEFORE PAGE NAVIGATION
  ========================================================= */

  const handleDesktopLinkClick = () => {
    clearCloseTimer();

    setHoveredItem(null);
    setEntertainmentOpen(false);

    setSideOpen(false);
    setVerticalMode(false);
  };

  /* =========================================================
     MOBILE LINK CLICK
  ========================================================= */

  const handleMobileLinkClick = () => {
    clearCloseTimer();

    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
    setEntertainmentOpen(false);
  };

  /* =========================================================
     ENTERTAINMENT OPEN
  ========================================================= */

  const openEntertainment = () => {
    clearCloseTimer();

    setHoveredItem(null);

    if (isMobile) {
      setMobileMenuOpen(false);
      setMobileExpandedItem(null);
    }

    setSideOpen(false);
    setVerticalMode(false);

    setEntertainmentOpen(true);
  };

  /* =========================================================
     ENTERTAINMENT CLOSE
  ========================================================= */

  const closeEntertainment = () => {
    setEntertainmentOpen(false);
  };

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  /* =========================================================
     ACTIVE STATE
  ========================================================= */

  const isItemActive = (item: NavItem) => {
    if (item.href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(item.href);
  };

  /* =========================================================
     MOBILE DROPDOWN TOGGLE
  ========================================================= */

  const toggleMobileDropdown = (
    href: string
  ) => {
    setMobileExpandedItem((current) =>
      current === href ? null : href
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="premium-navbar-root">

      {/* =====================================================
          MAIN NAV TRIGGER
      ===================================================== */}

      <button
        type="button"
        aria-label={
          isMobile
            ? mobileMenuOpen
              ? "Close mobile navigation"
              : "Open mobile navigation"
            : verticalMode
            ? "Return to horizontal navigation"
            : "Open vertical navigation"
        }
        aria-expanded={
          isMobile
            ? mobileMenuOpen
            : verticalMode
        }
        onClick={toggleNavigation}
        onMouseEnter={
          !isMobile && verticalMode
            ? openSidebar
            : undefined
        }
        className={`premium-nav-trigger ${
          verticalMode
            ? "premium-nav-trigger--vertical"
            : ""
        } ${
          mobileMenuOpen
            ? "premium-nav-trigger--mobile-open"
            : ""
        } relative z-[1300]`}
      >

        {/* LAPTOP ICON */}

        <span
          className="nav-laptop"
          aria-hidden="true"
        >
          <span className="nav-laptop-screen">
            <span className="nav-laptop-glow" />
          </span>

          <span className="nav-laptop-base" />
        </span>

        {/* HAMBURGER */}

        <span
          className={`nav-hamburger ${
            verticalMode ||
            mobileMenuOpen
              ? "nav-hamburger--close"
              : ""
          }`}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>

        {/* RING */}

        <span
          className="nav-trigger-ring"
          aria-hidden="true"
        />
      </button>

      {/* =====================================================
          DESKTOP HORIZONTAL NAVBAR
      ===================================================== */}

      <header
        className={`premium-topbar relative z-[1200] ${
          verticalMode
            ? "premium-topbar--hidden"
            : ""
        }`}
      >
        <span
          className="nav-purple-sweep"
          aria-hidden="true"
        />

        {/* BRAND */}

        <Link
          href="/"
          className="premium-nav-brand"
          onClick={handleDesktopLinkClick}
        >
          <span className="premium-brand-mark">
            FN
          </span>

          <span className="premium-brand-copy">
            <span className="premium-brand-name">
              FAIZA NOOR
            </span>

            <span className="premium-brand-role">
              FULL-STACK ENGINEER
            </span>
          </span>
        </Link>

        {/* =================================================
            DESKTOP LINKS
        ================================================= */}

        <nav
          className="premium-horizontal-links"
          aria-label="Primary navigation"
        >
          {mainNavigation.map((item) => {
            const isActive =
              isItemActive(item);

            const isHovered =
              hoveredItem === item.href;

            /* =============================================
               ABOUT
            ============================================= */

            if (
              aboutItem &&
              item.href ===
                aboutItem.href
            ) {
              return (
                <div
                  key={item.href}
                  className={`premium-about-wrapper ${
                    isHovered
                      ? "is-open"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHoveredItem(
                      item.href
                    );
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleDesktopLinkClick}
                    className={`premium-horizontal-link ${
                      isActive
                        ? "is-active"
                        : ""
                    } ${
                      isHovered
                        ? "is-hovered"
                        : ""
                    }`}
                  >
                    <span
                      className="nav-item-light"
                      aria-hidden="true"
                    />

                    <span className="nav-item-number">
                      {item.number}
                    </span>

                    <span className="nav-item-label">
                      {item.label}
                    </span>

                    <span
                      className={`nav-item-arrow nav-dropdown-arrow ${
                        isHovered
                          ? "is-rotated"
                          : ""
                      }`}
                    >
                      ↓
                    </span>

                    <span
                      className="nav-item-line"
                      aria-hidden="true"
                    />
                  </Link>

                  {aboutDropdownItems.length >
                    0 && (
                    <div
                      className={`premium-about-dropdown ${
                        isHovered
                          ? "is-open"
                          : ""
                      }`}
                    >
                      <div className="dropdown-top-line">
                        <span />
                        <span>
                          ABOUT / 00
                        </span>
                      </div>

                      {aboutDropdownItems.map(
                        (
                          dropdownItem,
                          index
                        ) => {
                          const dropdownActive =
                            isItemActive(
                              dropdownItem
                            );

                          return (
                            <Link
                              key={`${dropdownItem.href}-${dropdownItem.label}`}
                              href={
                                dropdownItem.href
                              }
                              onClick={
                                handleDesktopLinkClick
                              }
                              className={`premium-about-dropdown-item ${
                                dropdownActive
                                  ? "is-active"
                                  : ""
                              }`}
                            >
                              <span className="dropdown-number">
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <span className="dropdown-label">
                                {
                                  dropdownItem.label
                                }
                              </span>

                              <span className="dropdown-arrow">
                                ↗
                              </span>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              );
            }

            /* =============================================
               PROJECTS
            ============================================= */

            if (
              projectsItem &&
              item.href ===
                projectsItem.href
            ) {
              return (
                <div
                  key={item.href}
                  className={`premium-projects-wrapper ${
                    isHovered
                      ? "is-open"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHoveredItem(
                      item.href
                    );
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleDesktopLinkClick}
                    className={`premium-horizontal-link ${
                      isActive
                        ? "is-active"
                        : ""
                    } ${
                      isHovered
                        ? "is-hovered"
                        : ""
                    }`}
                  >
                    <span
                      className="nav-item-light"
                      aria-hidden="true"
                    />

                    <span className="nav-item-number">
                      {item.number}
                    </span>

                    <span className="nav-item-label">
                      {item.label}
                    </span>

                    <span
                      className={`nav-item-arrow nav-dropdown-arrow ${
                        isHovered
                          ? "is-rotated"
                          : ""
                      }`}
                    >
                      ↓
                    </span>

                    <span
                      className="nav-item-line"
                      aria-hidden="true"
                    />
                  </Link>

                  {projectsDropdownItems.length >
                    0 && (
                    <div
                      className={`premium-projects-dropdown ${
                        isHovered
                          ? "is-open"
                          : ""
                      }`}
                    >
                      <div className="dropdown-top-line">
                        <span />
                        <span>
                          PROJECTS / 00
                        </span>
                      </div>

                      {projectsDropdownItems.map(
                        (
                          dropdownItem,
                          index
                        ) => {
                          const dropdownActive =
                            isItemActive(
                              dropdownItem
                            );

                          return (
                            <Link
                              key={`${dropdownItem.href}-${dropdownItem.label}-${index}`}
                              href={
                                dropdownItem.href
                              }
                              onClick={
                                handleDesktopLinkClick
                              }
                              className={`premium-project-dropdown-item ${
                                dropdownActive
                                  ? "is-active"
                                  : ""
                              }`}
                            >
                              <span className="dropdown-number">
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <span className="dropdown-label">
                                {
                                  dropdownItem.label
                                }
                              </span>

                              <span className="dropdown-arrow">
                                ↗
                              </span>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              );
            }

            /* =============================================
               NORMAL LINK
            ============================================= */

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredItem(
                    item.href
                  );
                }}
                onMouseLeave={() =>
                  setHoveredItem(null)
                }
                onClick={handleDesktopLinkClick}
                className={`premium-horizontal-link ${
                  isActive
                    ? "is-active"
                    : ""
                } ${
                  isHovered
                    ? "is-hovered"
                    : ""
                }`}
              >
                <span
                  className="nav-item-light"
                  aria-hidden="true"
                />

                <span className="nav-item-number">
                  {item.number}
                </span>

                <span className="nav-item-label">
                  {item.label}
                </span>

                <span className="nav-item-arrow">
                  →
                </span>

                <span
                  className="nav-item-line"
                  aria-hidden="true"
                />
              </Link>
            );
          })}

          {/* =================================================
              ENTERTAINMENT
          ================================================= */}

          <button
            type="button"
            aria-label="Open entertainment"
            aria-expanded={entertainmentOpen}
            onClick={openEntertainment}
            onMouseEnter={() => {
              clearCloseTimer();
              setHoveredItem(
                "entertainment"
              );
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
            }}
            className={`premium-horizontal-link ${
              entertainmentOpen ||
              hoveredItem ===
                "entertainment"
                ? "is-hovered"
                : ""
            }`}
          >
            <span
              className="nav-item-light"
              aria-hidden="true"
            />

            <span className="nav-item-number">
              05
            </span>

            <span className="nav-item-label">
              ENTERTAINMENT
            </span>

            <span className="nav-item-arrow">
              ✦
            </span>

            <span
              className="nav-item-line"
              aria-hidden="true"
            />
          </button>
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="premium-nav-right">

          {/* AVAILABLE */}

          <span className="nav-availability">
            <span
              className="nav-availability-dot"
              aria-hidden="true"
            />

            AVAILABLE
          </span>

          {/* CV */}

          <a
            href="/Faiza-Noor-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv-button"
          >
            <span>
              SEE MY CV
            </span>

            <span className="nav-cv-arrow">
              ↗
            </span>
          </a>

          {/* HIRE ME */}

          <Link
            href="/contact"
            className="nav-contact-button"
            onClick={handleDesktopLinkClick}
          >
            <span
              className="nav-contact-liquid"
              aria-hidden="true"
            >
              <span className="nav-contact-liquid-bubble bubble-1" />
              <span className="nav-contact-liquid-bubble bubble-2" />
              <span className="nav-contact-liquid-bubble bubble-3" />
            </span>

            <span
              className="nav-contact-hearts"
              aria-hidden="true"
            >
              <span>♥</span>
              <span>♥</span>
              <span>♥</span>
              <span>♥</span>
              <span>♥</span>
              <span>♥</span>
              <span>♥</span>
            </span>

            <span
              className="nav-contact-shine"
              aria-hidden="true"
            />

            <span className="nav-contact-text">
              <strong>
                HIRE ME
              </strong>
            </span>

            <span className="nav-contact-arrow">
              ↗
            </span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          FLOATING SEARCH BAR
          IMPORTANT: OUTSIDE HEADER
      ===================================================== */}

      <SearchBar />

      {/* =====================================================
          DESKTOP VERTICAL BACKDROP
      ===================================================== */}

      <div
        className={`vertical-nav-backdrop ${
          !isMobile &&
          verticalMode &&
          sideOpen
            ? "is-visible"
            : ""
        }`}
        aria-hidden="true"
      />

      {/* =====================================================
          DESKTOP VERTICAL SIDEBAR
      ===================================================== */}

      <aside
        onMouseEnter={
          !isMobile
            ? openSidebar
            : undefined
        }
        onMouseLeave={
          !isMobile
            ? closeSidebar
            : undefined
        }
        className={`premium-sidebar relative z-[1200] ${
          !isMobile && verticalMode
            ? "premium-sidebar--enabled"
            : ""
        } ${
          !isMobile && sideOpen
            ? "premium-sidebar--open"
            : ""
        }`}
        aria-hidden={
          isMobile ||
          !verticalMode ||
          !sideOpen
        }
      >
        <span
          className="sidebar-purple-sweep"
          aria-hidden="true"
        />

        {/* SIDEBAR BRAND */}

        <div className="sidebar-brand-row">

          <Link
            href="/"
            onClick={() => {
              closeNavigation();
              setEntertainmentOpen(false);
            }}
            className="sidebar-brand"
          >
            <span className="sidebar-brand-mark">
              FN
            </span>

            <span>
              <span className="sidebar-brand-name">
                FAIZA NOOR
              </span>

              <span className="sidebar-brand-role">
                FULL-STACK ENGINEER
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Return to horizontal navigation"
            onClick={toggleNavigation}
            className="sidebar-return"
          >
            ↗
          </button>
        </div>

        {/* HEADING */}

        <div className="sidebar-heading">

          <span
            className="sidebar-heading-line"
            aria-hidden="true"
          />

          <span>
            Navigation
          </span>

          <span className="sidebar-heading-index">
            00
          </span>
        </div>

        {/* SIDEBAR LINKS */}

        <nav
          className="sidebar-links"
          aria-label="Sidebar navigation"
        >
          {sidebarNavigation.map(
            (item) => {
              const isActive =
                isItemActive(item);

              const isHovered =
                hoveredItem ===
                item.href;

              const isAbout =
                aboutItem &&
                item.href ===
                  aboutItem.href;

              const isProjects =
                projectsItem &&
                item.href ===
                  projectsItem.href;

              const hasDropdown =
                Boolean(
                  isAbout &&
                  aboutDropdownItems.length >
                    0
                ) ||
                Boolean(
                  isProjects &&
                  projectsDropdownItems.length >
                    0
                );

              const childItems =
                isAbout
                  ? aboutDropdownItems
                  : isProjects
                  ? projectsDropdownItems
                  : [];

              return (
                <div
                  key={item.href}
                  className={`sidebar-nav-group ${
                    hasDropdown
                      ? "sidebar-nav-group--dropdown"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHoveredItem(
                      item.href
                    );
                    openSidebar();
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                  }}
                >

                  {/* MAIN ROW */}

                  <div
                    className={`sidebar-main-row ${
                      isActive
                        ? "is-active"
                        : ""
                    } ${
                      isHovered
                        ? "is-hovered"
                        : ""
                    }`}
                  >
                    <span
                      className="sidebar-link-light"
                      aria-hidden="true"
                    />

                    <Link
                      href={item.href}
                      className="sidebar-main-link"
                      onClick={() => {
                        clearCloseTimer();
                        setSideOpen(false);
                        setVerticalMode(false);
                        setHoveredItem(null);
                        setEntertainmentOpen(false);
                      }}
                    >
                      <span className="sidebar-number">
                        {item.number}
                      </span>

                      <span className="sidebar-label">
                        {item.label}
                      </span>
                    </Link>

                    {/* DROPDOWN */}

                    {hasDropdown ? (
                      <span
                        className={`sidebar-expand-indicator ${
                          isHovered
                            ? "is-open"
                            : ""
                        }`}
                        aria-hidden="true"
                      >
                        ↓
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        aria-hidden="true"
                        tabIndex={-1}
                        className="sidebar-main-arrow"
                        onClick={() => {
                          clearCloseTimer();
                          setSideOpen(false);
                          setVerticalMode(false);
                          setHoveredItem(null);
                          setEntertainmentOpen(false);
                        }}
                      >
                        →
                      </Link>
                    )}

                    <span
                      className="sidebar-energy-line"
                      aria-hidden="true"
                    />
                  </div>

                  {/* SUBMENU */}

                  {hasDropdown && (
                    <div
                      className={`sidebar-submenu ${
                        isHovered
                          ? "is-open"
                          : ""
                      }`}
                    >
                      <div className="sidebar-submenu-inner">

                        <div className="sidebar-submenu-rail">
                          <span />
                        </div>

                        <div className="sidebar-submenu-items">

                          {childItems.map(
                            (
                              childItem,
                              index
                            ) => {
                              const childActive =
                                isItemActive(
                                  childItem
                                );

                              return (
                                <Link
                                  key={`${childItem.href}-${childItem.label}-${index}`}
                                  href={
                                    childItem.href
                                  }
                                  className={`sidebar-submenu-item ${
                                    childActive
                                      ? "is-active"
                                      : ""
                                  }`}
                                  onMouseEnter={() => {
                                    clearCloseTimer();
                                    openSidebar();
                                  }}
                                  onClick={() => {
                                    clearCloseTimer();
                                    setSideOpen(false);
                                    setVerticalMode(false);
                                    setHoveredItem(null);
                                    setEntertainmentOpen(false);
                                  }}
                                >
                                  <span className="sidebar-sub-number">
                                    {String(
                                      index + 1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}
                                  </span>

                                  <span className="sidebar-sub-label">
                                    {
                                      childItem.label
                                    }
                                  </span>

                                  <span className="sidebar-sub-arrow">
                                    ↗
                                  </span>
                                </Link>
                              );
                            }
                          )}

                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}

          {/* =================================================
              ENTERTAINMENT — SIDEBAR
          ================================================= */}

          <button
            type="button"
            aria-label="Open entertainment"
            onClick={() => {
              clearCloseTimer();
              setSideOpen(false);
              setVerticalMode(false);
              setHoveredItem(null);
              setEntertainmentOpen(true);
            }}
            className="sidebar-nav-group sidebar-entertainment-item"
          >
            <div className="sidebar-main-row">
              <span
                className="sidebar-link-light"
                aria-hidden="true"
              />

              <span className="sidebar-main-link">
                <span className="sidebar-number">
                  05
                </span>

                <span className="sidebar-label">
                  ENTERTAINMENT
                </span>
              </span>

              <span
                className="sidebar-main-arrow"
                aria-hidden="true"
              >
                ✦
              </span>

              <span
                className="sidebar-energy-line"
                aria-hidden="true"
              />
            </div>
          </button>
        </nav>

        {/* SIDEBAR ACTIONS */}

        <div className="sidebar-actions">

          <a
            href="/Faiza-Noor-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-cv-button"
          >
            <span>
              SEE MY CV
            </span>

            <span>
              ↗
            </span>
          </a>

          <Link
            href="/contact"
            className="sidebar-hire-button"
            onClick={() => {
              closeNavigation();
              setEntertainmentOpen(false);
            }}
          >
            <span>
              HIRE ME
            </span>

            <span>
              ↗
            </span>
          </Link>
        </div>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="sidebar-status">

            <span
              className="sidebar-status-dot"
              aria-hidden="true"
            />

            <div>

              <span className="sidebar-status-title">
                AVAILABLE
              </span>

              <span className="sidebar-status-text">
                Open for selected freelance
                projects and collaborations.
              </span>
            </div>
          </div>

          <div className="sidebar-footer-meta">

            <span>
              PAKISTAN
            </span>

            <span>
              FN / 2026
            </span>

          </div>
        </div>
      </aside>

      {/* =====================================================
          DESKTOP HOT ZONE
      ===================================================== */}

      {!isMobile &&
        verticalMode &&
        !sideOpen && (
          <div
            className="sidebar-hot-zone"
            onMouseEnter={
              openSidebar
            }
            aria-hidden="true"
          />
        )}

      {/* =====================================================
          MOBILE PANEL
      ===================================================== */}

      <aside
        className={`mobile-nav-panel relative z-[1200] ${
          mobileMenuOpen
            ? "is-open"
            : ""
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* MOBILE PANEL HEADER */}

        <div className="mobile-panel-header">

          <Link
            href="/"
            className="mobile-panel-brand"
            onClick={
              handleMobileLinkClick
            }
          >
            <span className="mobile-panel-mark">
              FN
            </span>

            <span>
              <strong>
                FAIZA NOOR
              </strong>

              <small>
                FULL-STACK ENGINEER
              </small>
            </span>
          </Link>

          <span className="mobile-panel-index">
            00 / NAV
          </span>
        </div>

        {/* MOBILE NAVIGATION */}

        <nav
          className="mobile-panel-links"
          aria-label="Mobile navigation"
        >
          {mainNavigation.map(
            (item) => {
              const isActive =
                isItemActive(item);

              const isAbout =
                aboutItem &&
                item.href ===
                  aboutItem.href;

              const isProjects =
                projectsItem &&
                item.href ===
                  projectsItem.href;

              const hasDropdown =
                Boolean(
                  isAbout &&
                  aboutDropdownItems.length >
                    0
                ) ||
                Boolean(
                  isProjects &&
                  projectsDropdownItems.length >
                    0
                );

              const childItems =
                isAbout
                  ? aboutDropdownItems
                  : isProjects
                  ? projectsDropdownItems
                  : [];

              const expanded =
                mobileExpandedItem ===
                item.href;

              return (
                <div
                  key={item.href}
                  className={`mobile-nav-group ${
                    expanded
                      ? "is-expanded"
                      : ""
                  }`}
                >

                  {/* MAIN MOBILE ITEM */}

                  <div
                    className={`mobile-nav-main ${
                      isActive
                        ? "is-active"
                        : ""
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={
                        handleMobileLinkClick
                      }
                      className="mobile-nav-link"
                    >
                      <span className="mobile-nav-number">
                        {item.number}
                      </span>

                      <span className="mobile-nav-label">
                        {item.label}
                      </span>
                    </Link>

                    {hasDropdown && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={
                          expanded
                        }
                        className="mobile-nav-expand"
                        onClick={() =>
                          toggleMobileDropdown(
                            item.href
                          )
                        }
                      >
                        ↓
                      </button>
                    )}
                  </div>

                  {/* MOBILE SUBMENU */}

                  {hasDropdown && (
                    <div
                      className={`mobile-nav-submenu ${
                        expanded
                          ? "is-open"
                          : ""
                      }`}
                    >
                      {childItems.map(
                        (
                          childItem,
                          index
                        ) => (
                          <Link
                            key={`${childItem.href}-${childItem.label}-${index}`}
                            href={
                              childItem.href
                            }
                            onClick={
                              handleMobileLinkClick
                            }
                            className={`mobile-nav-subitem ${
                              isItemActive(
                                childItem
                              )
                                ? "is-active"
                                : ""
                            }`}
                          >
                            <span>
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span>
                              {
                                childItem.label
                              }
                            </span>

                            <span>
                              ↗
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}

          {/* =================================================
              MOBILE ENTERTAINMENT
          ================================================= */}

          <button
            type="button"
            aria-label="Open entertainment"
            onClick={openEntertainment}
            className="mobile-nav-group w-full"
          >
            <div className="mobile-nav-main">
              <span className="mobile-nav-link">
                <span className="mobile-nav-number">
                  05
                </span>

                <span className="mobile-nav-label">
                  ENTERTAINMENT
                </span>

                <span className="ml-auto">
                  ✦
                </span>
              </span>
            </div>
          </button>
        </nav>

        {/* MOBILE ACTIONS */}

        <div className="mobile-panel-actions">

          <a
            href="/Faiza-Noor-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cv-button"
          >
            <span>
              SEE MY CV
            </span>

            <span>
              ↗
            </span>
          </a>

          <Link
            href="/contact"
            className="mobile-hire-button"
            onClick={
              handleMobileLinkClick
            }
          >
            <span>
              HIRE ME
            </span>

            <span>
              ↗
            </span>
          </Link>
        </div>

        {/* MOBILE STATUS */}

        <div className="mobile-panel-footer">
          <span className="mobile-panel-status">
            <span />
            AVAILABLE FOR WORK
          </span>

          <span>
            FN / 2026
          </span>
        </div>
      </aside>

      {/* =====================================================
          ENTERTAINMENT HUB
      ===================================================== */}

      <EntertainmentHub
        open={entertainmentOpen}
        onClose={closeEntertainment}
      />
    </div>
  );
}