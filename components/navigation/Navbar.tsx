
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/data/navigation";
import EntertainmentHub from "@/components/entertainment/EntertainmentHub";

type NavItem = {
  label: string;
  href: string;
  number: string;
};

export default function Navbar() {
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);
  const [verticalMode, setVerticalMode] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [entertainmentOpen, setEntertainmentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] =
    useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

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
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    setEntertainmentOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileExpandedItem(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const findItem = (...labels: string[]): NavItem | undefined =>
    navigationItems.find((item) =>
      labels.some(
        (label) => item.label.toLowerCase() === label.toLowerCase()
      )
    );

  const homeItem = findItem("Home");
  const aboutItem = findItem("About");
  const projectsItem = findItem("Projects");
  const contactItem = findItem("Contact");
  const educationItem = findItem("Education");
  const certificatesItem = findItem("Certificates", "Certificate");
  const skillsItem = findItem("Skills");
  const servicesItem = findItem("Services", "Service");

  // About: Education and Certificates only.
  const aboutDropdownItems = [
    educationItem,
    certificatesItem,
  ].filter(Boolean) as NavItem[];

  // Projects: Skills and Services.
  const projectsDropdownItems = [
    skillsItem,
    servicesItem,
  ].filter(Boolean) as NavItem[];

  const mainNavigation = [
    homeItem,
    aboutItem,
    projectsItem,
    contactItem,
  ].filter(Boolean) as NavItem[];

  const sidebarNavigation = [
    homeItem,
    aboutItem,
    projectsItem,
    contactItem,
  ].filter(Boolean) as NavItem[];

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openSidebar = () => {
    if (isMobile) return;
    clearCloseTimer();
    setSideOpen(true);
  };

  const closeSidebar = () => {
    if (isMobile) return;
    clearCloseTimer();
    setSideOpen(false);
    setVerticalMode(false);
    setHoveredItem(null);
  };

  const toggleNavigation = () => {
    clearCloseTimer();

    if (isMobile) {
      setMobileMenuOpen((current) => !current);
      setMobileExpandedItem(null);
      return;
    }

    if (verticalMode) {
      setVerticalMode(false);
      setSideOpen(false);
      setHoveredItem(null);
    } else {
      setVerticalMode(true);
      setSideOpen(true);
    }
  };

  const closeNavigation = () => {
    clearCloseTimer();
    setVerticalMode(false);
    setSideOpen(false);
    setHoveredItem(null);
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  };

  const handleDesktopLinkClick = () => {
    clearCloseTimer();
    setHoveredItem(null);
    setEntertainmentOpen(false);
    setSideOpen(false);
    setVerticalMode(false);
  };

  const handleMobileLinkClick = () => {
    clearCloseTimer();
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
    setEntertainmentOpen(false);
  };

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

  const closeEntertainment = () => setEntertainmentOpen(false);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const isItemActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  const toggleMobileDropdown = (href: string) => {
    setMobileExpandedItem((current) => (current === href ? null : href));
  };

  return (
    <div className="premium-navbar-root">
      {/* MOBILE-ONLY MENU TRIGGER */}
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
        aria-expanded={isMobile ? mobileMenuOpen : verticalMode}
        aria-controls={isMobile ? "enchanted-mobile-navigation" : undefined}
        onClick={toggleNavigation}
        onMouseEnter={!isMobile && verticalMode ? openSidebar : undefined}
        className={`premium-nav-trigger ${
          verticalMode ? "premium-nav-trigger--vertical" : ""
        } ${
          mobileMenuOpen ? "premium-nav-trigger--mobile-open" : ""
        } relative z-[1300]`}
      >
        <span className="nav-laptop" aria-hidden="true">
          <span className="nav-laptop-screen">
            <span className="nav-laptop-glow" />
          </span>
          <span className="nav-laptop-base" />
        </span>

        <span
          className={`nav-hamburger ${
            verticalMode || mobileMenuOpen ? "nav-hamburger--close" : ""
          }`}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>

        <span className="nav-trigger-ring" aria-hidden="true" />
      </button>

      {/* DESKTOP HORIZONTAL NAVBAR */}
      <header
        className={`premium-topbar relative z-[1200] ${
          verticalMode ? "premium-topbar--hidden" : ""
        }`}
      >
        <span className="nav-purple-sweep" aria-hidden="true" />

        <div className="nav-enchanted-atmosphere" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className={`nav-firefly nav-firefly-${index + 1}`}
            />
          ))}
          <span className="nav-golden-ribbon nav-golden-ribbon-one" />
          <span className="nav-golden-ribbon nav-golden-ribbon-two" />
        </div>

        <Link
          href="/"
          className="premium-nav-brand"
          onClick={handleDesktopLinkClick}
        >
          <span className="premium-brand-mark">FN</span>
          <span className="premium-brand-copy">
            <span className="premium-brand-name">FAIZA NOOR</span>
            <span className="premium-brand-role">FULL-STACK ENGINEER</span>
          </span>
        </Link>

        <nav
          className="premium-horizontal-links"
          aria-label="Primary navigation"
        >
          {mainNavigation.map((item) => {
            const isActive = isItemActive(item);
            const isHovered = hoveredItem === item.href;

            if (aboutItem && item.href === aboutItem.href) {
              return (
                <div
                  key={item.href}
                  className={`premium-about-wrapper ${
                    isHovered ? "is-open" : ""
                  }`}
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHoveredItem(item.href);
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    onClick={handleDesktopLinkClick}
                    className={`premium-horizontal-link ${
                      isActive ? "is-active" : ""
                    } ${isHovered ? "is-hovered" : ""}`}
                  >
                    <span className="nav-item-light" aria-hidden="true" />
                    <span className="nav-item-number">{item.number}</span>
                    <span className="nav-item-label">{item.label}</span>
                    <span
                      className={`nav-item-arrow nav-dropdown-arrow ${
                        isHovered ? "is-rotated" : ""
                      }`}
                    >
                      ↓
                    </span>
                    <span className="nav-item-line" aria-hidden="true" />
                  </Link>

                  {aboutDropdownItems.length > 0 && (
                    <div
                      className={`premium-about-dropdown ${
                        isHovered ? "is-open" : ""
                      }`}
                    >
                      <div className="dropdown-top-line">
                        <span />
                        <span>ABOUT / 00</span>
                      </div>

                      {aboutDropdownItems.map((dropdownItem, index) => (
                        <Link
                          key={`${dropdownItem.href}-${dropdownItem.label}`}
                          href={dropdownItem.href}
                          onClick={handleDesktopLinkClick}
                          className={`premium-about-dropdown-item ${
                            isItemActive(dropdownItem) ? "is-active" : ""
                          }`}
                        >
                          <span className="dropdown-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="dropdown-label">
                            {dropdownItem.label}
                          </span>
                          <span className="dropdown-arrow">↗</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (projectsItem && item.href === projectsItem.href) {
              return (
                <div
                  key={item.href}
                  className={`premium-projects-wrapper ${
                    isHovered ? "is-open" : ""
                  }`}
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHoveredItem(item.href);
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    onClick={handleDesktopLinkClick}
                    className={`premium-horizontal-link ${
                      isActive ? "is-active" : ""
                    } ${isHovered ? "is-hovered" : ""}`}
                  >
                    <span className="nav-item-light" aria-hidden="true" />
                    <span className="nav-item-number">{item.number}</span>
                    <span className="nav-item-label">{item.label}</span>
                    <span
                      className={`nav-item-arrow nav-dropdown-arrow ${
                        isHovered ? "is-rotated" : ""
                      }`}
                    >
                      ↓
                    </span>
                    <span className="nav-item-line" aria-hidden="true" />
                  </Link>

                  {projectsDropdownItems.length > 0 && (
                    <div
                      className={`premium-projects-dropdown ${
                        isHovered ? "is-open" : ""
                      }`}
                    >
                      <div className="dropdown-top-line">
                        <span />
                        <span>PROJECTS / 00</span>
                      </div>

                      {projectsDropdownItems.map((dropdownItem, index) => (
                        <Link
                          key={`${dropdownItem.href}-${dropdownItem.label}-${index}`}
                          href={dropdownItem.href}
                          onClick={handleDesktopLinkClick}
                          className={`premium-project-dropdown-item ${
                            isItemActive(dropdownItem) ? "is-active" : ""
                          }`}
                        >
                          <span className="dropdown-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="dropdown-label">
                            {dropdownItem.label}
                          </span>
                          <span className="dropdown-arrow">↗</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredItem(item.href);
                }}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={handleDesktopLinkClick}
                className={`premium-horizontal-link ${
                  isActive ? "is-active" : ""
                } ${isHovered ? "is-hovered" : ""}`}
              >
                <span className="nav-item-light" aria-hidden="true" />
                <span className="nav-item-number">{item.number}</span>
                <span className="nav-item-label">{item.label}</span>
                <span className="nav-item-arrow">→</span>
                <span className="nav-item-line" aria-hidden="true" />
              </Link>
            );
          })}

          <button
            type="button"
            aria-label="Open entertainment"
            aria-expanded={entertainmentOpen}
            onClick={openEntertainment}
            onMouseEnter={() => {
              clearCloseTimer();
              setHoveredItem("entertainment");
            }}
            onMouseLeave={() => setHoveredItem(null)}
            className={`premium-horizontal-link ${
              entertainmentOpen || hoveredItem === "entertainment"
                ? "is-hovered"
                : ""
            }`}
          >
            <span className="nav-item-light" aria-hidden="true" />
            <span className="nav-item-number">05</span>
            <span className="nav-item-label">ENTERTAINMENT</span>
            <span className="nav-item-arrow">✦</span>
            <span className="nav-item-line" aria-hidden="true" />
          </button>
        </nav>

        <div className="premium-nav-right">
          <span className="nav-availability">
            <span className="nav-availability-dot" aria-hidden="true" />
            AVAILABLE
          </span>

          <a
            href="/files/Faiza-Noor-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv-button"
          >
            <span>SEE MY CV</span>
            <span className="nav-cv-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <Link
            href="/contact"
            className="nav-contact-button"
            onClick={handleDesktopLinkClick}
          >
            <span className="nav-contact-liquid" aria-hidden="true">
              <span className="nav-contact-liquid-bubble bubble-1" />
              <span className="nav-contact-liquid-bubble bubble-2" />
              <span className="nav-contact-liquid-bubble bubble-3" />
            </span>
            <span className="nav-contact-shine" aria-hidden="true" />
            <span className="nav-contact-text">
              <strong>HIRE ME</strong>
            </span>
            <span className="nav-contact-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </header>

      {/* DESKTOP VERTICAL BACKDROP */}
      <div
        className={`vertical-nav-backdrop ${
          !isMobile && verticalMode && sideOpen ? "is-visible" : ""
        }`}
        aria-hidden="true"
      />

      {/* DESKTOP VERTICAL SIDEBAR */}
      <aside
        onMouseEnter={!isMobile ? openSidebar : undefined}
        onMouseLeave={!isMobile ? closeSidebar : undefined}
        className={`premium-sidebar relative z-[1200] ${
          !isMobile && verticalMode ? "premium-sidebar--enabled" : ""
        } ${!isMobile && sideOpen ? "premium-sidebar--open" : ""}`}
        aria-hidden={isMobile || !verticalMode || !sideOpen}
      >
        <span className="sidebar-purple-sweep" aria-hidden="true" />

        <div className="sidebar-brand-row">
          <Link
            href="/"
            onClick={() => {
              closeNavigation();
              setEntertainmentOpen(false);
            }}
            className="sidebar-brand"
          >
            <span className="sidebar-brand-mark">FN</span>
            <span>
              <span className="sidebar-brand-name">FAIZA NOOR</span>
              <span className="sidebar-brand-role">FULL-STACK ENGINEER</span>
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

        <div className="sidebar-heading">
          <span className="sidebar-heading-line" aria-hidden="true" />
          <span>Navigation</span>
          <span className="sidebar-heading-index">00</span>
        </div>

        <nav className="sidebar-links" aria-label="Sidebar navigation">
          {sidebarNavigation.map((item) => {
            const isActive = isItemActive(item);
            const isHovered = hoveredItem === item.href;
            const isAbout = aboutItem && item.href === aboutItem.href;
            const isProjects =
              projectsItem && item.href === projectsItem.href;

            const hasDropdown =
              Boolean(isAbout && aboutDropdownItems.length > 0) ||
              Boolean(isProjects && projectsDropdownItems.length > 0);

            const childItems = isAbout
              ? aboutDropdownItems
              : isProjects
                ? projectsDropdownItems
                : [];

            return (
              <div
                key={item.href}
                className={`sidebar-nav-group ${
                  hasDropdown ? "sidebar-nav-group--dropdown" : ""
                }`}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredItem(item.href);
                  openSidebar();
                }}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`sidebar-main-row ${
                    isActive ? "is-active" : ""
                  } ${isHovered ? "is-hovered" : ""}`}
                >
                  <span className="sidebar-link-light" aria-hidden="true" />

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
                    <span className="sidebar-number">{item.number}</span>
                    <span className="sidebar-label">{item.label}</span>
                  </Link>

                  {hasDropdown ? (
                    <span
                      className={`sidebar-expand-indicator ${
                        isHovered ? "is-open" : ""
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

                  <span className="sidebar-energy-line" aria-hidden="true" />
                </div>

                {hasDropdown && (
                  <div
                    className={`sidebar-submenu ${
                      isHovered ? "is-open" : ""
                    }`}
                  >
                    <div className="sidebar-submenu-inner">
                      <div className="sidebar-submenu-rail">
                        <span />
                      </div>
                      <div className="sidebar-submenu-items">
                        {childItems.map((childItem, index) => (
                          <Link
                            key={`${childItem.href}-${childItem.label}-${index}`}
                            href={childItem.href}
                            className={`sidebar-submenu-item ${
                              isItemActive(childItem) ? "is-active" : ""
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
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="sidebar-sub-label">
                              {childItem.label}
                            </span>
                            <span className="sidebar-sub-arrow">↗</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

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
              <span className="sidebar-link-light" aria-hidden="true" />
              <span className="sidebar-main-link">
                <span className="sidebar-number">05</span>
                <span className="sidebar-label">ENTERTAINMENT</span>
              </span>
              <span className="sidebar-main-arrow" aria-hidden="true">
                ✦
              </span>
              <span className="sidebar-energy-line" aria-hidden="true" />
            </div>
          </button>
        </nav>

        <div className="sidebar-actions">
          <a
            href="/files/Faiza-Noor-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-cv-button"
          >
            <span>SEE MY CV</span>
            <span>↗</span>
          </a>

          <Link
            href="/contact"
            className="sidebar-hire-button"
            onClick={() => {
              closeNavigation();
              setEntertainmentOpen(false);
            }}
          >
            <span>HIRE ME</span>
            <span>↗</span>
          </Link>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="sidebar-status-dot" aria-hidden="true" />
            <div>
              <span className="sidebar-status-title">AVAILABLE</span>
              <span className="sidebar-status-text">
                Open for selected freelance projects and collaborations.
              </span>
            </div>
          </div>
          <div className="sidebar-footer-meta">
            <span>PAKISTAN</span>
            <span>FN / 2026</span>
          </div>
        </div>
      </aside>

      {!isMobile && verticalMode && !sideOpen && (
        <div
          className="sidebar-hot-zone"
          onMouseEnter={openSidebar}
          aria-hidden="true"
        />
      )}

      {/* MOBILE ENCHANTED NAVIGATION */}
      <aside
        id="enchanted-mobile-navigation"
        className={`mobile-nav-panel relative z-[1200] ${
          mobileMenuOpen ? "is-open" : ""
        }`}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div className="mobile-panel-header">
          <Link
            href="/"
            className="mobile-panel-brand"
            onClick={handleMobileLinkClick}
            tabIndex={mobileMenuOpen ? 0 : -1}
          >
            <span className="mobile-panel-mark">FN</span>
            <span>
              <strong>FAIZA NOOR</strong>
              <small>FULL-STACK ENGINEER</small>
            </span>
          </Link>
          <span className="mobile-panel-index">✦ NAVIGATION ✦</span>
        </div>

        <div className="mobile-lantern-scene" aria-hidden="true">
          <span className="mobile-lantern mobile-lantern-one">✧</span>
          <span className="mobile-lantern mobile-lantern-two">✦</span>
          <span className="mobile-lantern mobile-lantern-three">✧</span>
          <span className="mobile-orb mobile-orb-one" />
          <span className="mobile-orb mobile-orb-two" />
          <span className="mobile-orb mobile-orb-three" />
        </div>

        <nav className="mobile-panel-links" aria-label="Mobile navigation">
          {mainNavigation.map((item) => {
            const isActive = isItemActive(item);
            const isAbout = aboutItem && item.href === aboutItem.href;
            const isProjects =
              projectsItem && item.href === projectsItem.href;

            const hasDropdown =
              Boolean(isAbout && aboutDropdownItems.length > 0) ||
              Boolean(isProjects && projectsDropdownItems.length > 0);

            const childItems = isAbout
              ? aboutDropdownItems
              : isProjects
                ? projectsDropdownItems
                : [];

            const expanded = mobileExpandedItem === item.href;

            return (
              <div
                key={item.href}
                className={`mobile-nav-group ${
                  expanded ? "is-expanded" : ""
                } ${isActive ? "is-current" : ""}`}
              >
                <div
                  className={`mobile-nav-main ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={handleMobileLinkClick}
                    className="mobile-nav-link"
                    tabIndex={mobileMenuOpen ? 0 : -1}
                  >
                    <span className="mobile-nav-number">{item.number}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                    <span
                      className="mobile-nav-link-sparkle"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                  </Link>

                  {hasDropdown && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={expanded}
                      className="mobile-nav-expand"
                      onClick={() => toggleMobileDropdown(item.href)}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                    >
                      <span className="mobile-expand-icon">
                        {expanded ? "−" : "+"}
                      </span>
                    </button>
                  )}
                </div>

                {hasDropdown && (
                  <div
                    className={`mobile-nav-submenu ${
                      expanded ? "is-open" : ""
                    }`}
                    aria-hidden={!expanded}
                  >
                    {childItems.map((childItem, index) => (
                      <Link
                        key={`${childItem.href}-${childItem.label}-${index}`}
                        href={childItem.href}
                        onClick={handleMobileLinkClick}
                        tabIndex={expanded && mobileMenuOpen ? 0 : -1}
                        className={`mobile-nav-subitem ${
                          isItemActive(childItem) ? "is-active" : ""
                        }`}
                      >
                        <span className="mobile-sub-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{childItem.label}</span>
                        <span className="mobile-sub-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            aria-label="Open entertainment"
            onClick={openEntertainment}
            className="mobile-nav-group mobile-entertainment-button"
            tabIndex={mobileMenuOpen ? 0 : -1}
          >
            <span className="mobile-nav-main">
              <span className="mobile-nav-link">
                <span className="mobile-nav-number">05</span>
                <span className="mobile-nav-label">ENTERTAINMENT</span>
                <span className="mobile-nav-link-sparkle" aria-hidden="true">
                  ✦
                </span>
              </span>
            </span>
          </button>
        </nav>

        <div className="mobile-panel-actions">
          <a
            href="/files/Faiza-Noor-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cv-button"
            tabIndex={mobileMenuOpen ? 0 : -1}
          >
            <span className="mobile-action-icon" aria-hidden="true">
              ♧
            </span>
            <span>EXPLORE MY CV</span>
            <span className="mobile-cv-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <Link
            href="/contact"
            className="mobile-hire-button"
            onClick={handleMobileLinkClick}
            tabIndex={mobileMenuOpen ? 0 : -1}
          >
            <span className="mobile-hire-sparkle" aria-hidden="true">
              ✦
            </span>
            <span>LET&apos;S CREATE MAGIC</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="mobile-panel-footer">
          <span className="mobile-panel-status">
            <span />
            AVAILABLE FOR WORK
          </span>
          <span>FN / 2026</span>
        </div>
      </aside>

      <EntertainmentHub
        open={entertainmentOpen}
        onClose={closeEntertainment}
      />

      <style jsx global>{`
        .premium-topbar {
          isolation: isolate;
          overflow: visible;
          background:
            radial-gradient(
              ellipse at 16% 0%,
              rgba(151, 94, 225, 0.2),
              transparent 46%
            ),
            radial-gradient(
              ellipse at 82% 100%,
              rgba(247, 197, 105, 0.1),
              transparent 42%
            ),
            linear-gradient(115deg, #171022 0%, #21132f 48%, #160f25 100%);
          border-color: rgba(235, 198, 122, 0.3);
          box-shadow:
            0 12px 45px rgba(10, 5, 23, 0.32),
            inset 0 1px 0 rgba(255, 229, 177, 0.14);
        }

        .premium-topbar::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(
            110deg,
            transparent 15%,
            rgba(255, 221, 151, 0.045) 35%,
            transparent 55%,
            rgba(189, 145, 255, 0.06) 75%,
            transparent 90%
          );
          background-size: 220% 100%;
          animation: enchanted-glass-flow 9s linear infinite;
        }

        .premium-topbar::after {
          content: "";
          position: absolute;
          height: 1px;
          bottom: 0;
          left: 5%;
          right: 5%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 215, 133, 0.8),
            rgba(213, 174, 255, 0.65),
            transparent
          );
          opacity: 0.8;
        }

        .premium-brand-mark {
          border: 1px solid rgba(255, 216, 142, 0.65);
          background: linear-gradient(145deg, #7952a4, #38234f 70%);
          color: #fff0c6;
          box-shadow: 0 0 16px rgba(236, 190, 111, 0.17);
        }

        .premium-brand-name {
          color: #fff3d6;
          text-shadow: 0 0 18px rgba(245, 203, 132, 0.15);
          font-size: 14px;
        }

        .premium-brand-role {
          color: #c7afd9;
          font-size: 10px;
        }

        .nav-enchanted-atmosphere {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
        }

        .nav-firefly {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ffe5a1;
          box-shadow:
            0 0 6px 2px rgba(255, 221, 133, 0.52),
            0 0 18px rgba(255, 205, 101, 0.35);
          opacity: 0;
          animation: nav-firefly-rise 5s ease-in-out infinite;
        }

        .nav-firefly-1 { left: 14%; bottom: 5%; animation-delay: 0s; }
        .nav-firefly-2 { left: 24%; bottom: 8%; animation-delay: 1.2s; }
        .nav-firefly-3 { left: 37%; bottom: 4%; animation-delay: 2.5s; }
        .nav-firefly-4 { left: 48%; bottom: 7%; animation-delay: 0.7s; }
        .nav-firefly-5 { left: 59%; bottom: 3%; animation-delay: 3.1s; }
        .nav-firefly-6 { left: 69%; bottom: 8%; animation-delay: 1.7s; }
        .nav-firefly-7 { left: 78%; bottom: 4%; animation-delay: 2.1s; }
        .nav-firefly-8 { left: 88%; bottom: 6%; animation-delay: 0.3s; }
        .nav-firefly-9 { left: 32%; bottom: 3%; animation-delay: 3.8s; }
        .nav-firefly-10 { left: 53%; bottom: 5%; animation-delay: 1.9s; }
        .nav-firefly-11 { left: 73%; bottom: 3%; animation-delay: 4.2s; }
        .nav-firefly-12 { left: 93%; bottom: 4%; animation-delay: 2.8s; }

        .nav-golden-ribbon {
          position: absolute;
          left: 4%;
          right: 4%;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 222, 153, 0.36),
            rgba(195, 156, 255, 0.24),
            transparent
          );
          transform-origin: center;
        }

        .nav-golden-ribbon-one {
          bottom: 10%;
          animation: nav-ribbon-breathe 5s ease-in-out infinite;
        }

        .nav-golden-ribbon-two {
          top: 12%;
          opacity: 0.5;
          animation: nav-ribbon-breathe 7s ease-in-out infinite reverse;
        }

        .premium-navbar-root .premium-horizontal-link {
          font-size: 13px;
          letter-spacing: 0.045em;
        }

        .premium-navbar-root .nav-item-label {
          font-size: 13px;
          font-weight: 600;
        }

        .premium-navbar-root .nav-item-number {
          font-size: 10px;
        }

        .premium-horizontal-links,
        .premium-nav-right {
          position: relative;
          z-index: 5;
        }

        .premium-navbar-root .nav-cv-button,
        .premium-navbar-root .mobile-cv-button {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition:
            color 250ms ease,
            border-color 250ms ease,
            background 250ms ease,
            box-shadow 250ms ease;
        }

        .premium-navbar-root .nav-cv-arrow,
        .premium-navbar-root .mobile-cv-arrow {
          display: inline-block;
          animation: cv-arrow-float 2s ease-in-out infinite;
          transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .premium-navbar-root .nav-cv-button:hover,
        .premium-navbar-root .mobile-cv-button:hover {
          border-color: rgba(255, 220, 150, 0.8);
          box-shadow: 0 0 18px rgba(220, 175, 255, 0.18);
        }

        .premium-navbar-root .nav-cv-button:hover .nav-cv-arrow,
        .premium-navbar-root .mobile-cv-button:hover .mobile-cv-arrow {
          transform: translate(3px, -3px) rotate(8deg);
          animation-play-state: paused;
        }

        .premium-navbar-root .nav-contact-hearts {
          display: none !important;
        }

        /* Desktop: keep horizontal navigation; hide the menu icon. */
        @media (min-width: 768px) {
          .premium-navbar-root .premium-nav-trigger {
            display: none !important;
          }
        }

        @keyframes enchanted-glass-flow {
          from { background-position: 100% 0; }
          to { background-position: -120% 0; }
        }

        @keyframes nav-firefly-rise {
          0% {
            opacity: 0;
            transform: translate3d(0, 12px, 0) scale(0.55);
          }
          25% { opacity: 0.8; }
          65% { opacity: 0.55; }
          100% {
            opacity: 0;
            transform: translate3d(12px, -25px, 0) scale(1.1);
          }
        }

        @keyframes nav-ribbon-breathe {
          0%, 100% {
            opacity: 0.2;
            transform: scaleX(0.86);
          }
          50% {
            opacity: 0.8;
            transform: scaleX(1);
          }
        }

        @keyframes cv-arrow-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(2px, -2px); }
        }

        /* MOBILE NAVIGATION */
        @media (max-width: 767px) {
          .premium-navbar-root {
            --mobile-purple: #241438;
            --mobile-purple-light: #3c2257;
            --mobile-lilac: #c6a0f6;
            --mobile-gold: #f4d18a;
            --mobile-cream: #fff4d8;
          }

          .premium-navbar-root .premium-topbar {
            display: none !important;
          }

          .premium-navbar-root .premium-sidebar,
          .premium-navbar-root .vertical-nav-backdrop,
          .premium-navbar-root .sidebar-hot-zone {
            display: none !important;
          }

          .premium-navbar-root .nav-firefly:nth-child(n + 7) {
            display: none;
          }

          /* Hamburger appears only on mobile */
          .premium-navbar-root .premium-nav-trigger {
            position: fixed !important;
            top: max(15px, env(safe-area-inset-top)) !important;
            right: 16px !important;
            left: auto !important;
            bottom: auto !important;
            z-index: 1500 !important;
            display: grid !important;
            place-items: center !important;
            width: 52px !important;
            height: 52px !important;
            padding: 0 !important;
            overflow: visible !important;
            border: 1px solid rgba(255, 222, 159, 0.68) !important;
            border-radius: 18px !important;
            color: var(--mobile-cream) !important;
            background:
              radial-gradient(circle at 30% 15%, rgba(215, 178, 255, 0.3), transparent 55%),
              linear-gradient(145deg, #493064, #20122f 76%) !important;
            box-shadow:
              0 8px 26px rgba(18, 8, 31, 0.34),
              0 0 0 4px rgba(199, 155, 255, 0.08),
              inset 0 1px 0 rgba(255, 244, 216, 0.2) !important;
            -webkit-tap-highlight-color: transparent;
            transition:
              transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 300ms ease,
              border-color 300ms ease !important;
          }

          .premium-navbar-root .premium-nav-trigger:active {
            transform: scale(0.94) !important;
          }

          .premium-navbar-root .premium-nav-trigger::before {
            content: "✦";
            position: absolute;
            top: -7px;
            right: -5px;
            color: #ffe4a5;
            font-size: 12px;
            text-shadow: 0 0 10px rgba(255, 212, 125, 0.95);
            animation: mobile-sparkle 2.8s ease-in-out infinite;
          }

          .premium-navbar-root .premium-nav-trigger .nav-laptop {
            display: none !important;
          }

          .premium-navbar-root .nav-hamburger {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 5px !important;
            width: 24px !important;
            height: 24px !important;
            transform: none !important;
          }

          .premium-navbar-root .nav-hamburger > span {
            display: block !important;
            width: 22px !important;
            height: 2px !important;
            margin: 0 !important;
            border-radius: 999px !important;
            background: linear-gradient(90deg, #fff1ca, #e9c5ff) !important;
            box-shadow: 0 0 8px rgba(244, 209, 138, 0.28);
            transform-origin: center;
            transition:
              width 260ms ease,
              transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
              opacity 180ms ease !important;
          }

          .premium-navbar-root .nav-hamburger > span:nth-child(2) {
            width: 15px !important;
            margin-left: 7px !important;
          }

          .premium-navbar-root .nav-hamburger--close > span:first-child {
            transform: translateY(7px) rotate(45deg) !important;
          }

          .premium-navbar-root .nav-hamburger--close > span:nth-child(2) {
            opacity: 0 !important;
            transform: scaleX(0) !important;
          }

          .premium-navbar-root .nav-hamburger--close > span:last-child {
            transform: translateY(-7px) rotate(-45deg) !important;
          }

          .premium-navbar-root .nav-hamburger--close > span {
            width: 22px !important;
            margin-left: 0 !important;
          }

          .premium-navbar-root .nav-trigger-ring {
            position: absolute !important;
            inset: -6px !important;
            display: block !important;
            border: 1px solid rgba(227, 193, 255, 0.28) !important;
            border-radius: 22px !important;
            pointer-events: none;
            animation: mobile-ring-pulse 3.5s ease-in-out infinite;
          }

          .premium-navbar-root .premium-nav-trigger--mobile-open {
            border-color: rgba(255, 225, 158, 0.9) !important;
            box-shadow:
              0 10px 32px rgba(17, 7, 29, 0.45),
              0 0 24px rgba(184, 130, 255, 0.25),
              inset 0 1px 0 rgba(255, 244, 216, 0.22) !important;
          }

          /* RIGHT-SIDE FULL-HEIGHT DRAWER */
          .premium-navbar-root .mobile-nav-panel {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            left: auto !important;
            z-index: 1400 !important;

            display: flex !important;
            flex-direction: column !important;

            width: min(88vw, 420px) !important;
            max-width: 420px !important;
            height: 100vh !important;
            height: 100dvh !important;
            max-height: 100vh !important;
            max-height: 100dvh !important;

            margin: 0 !important;
            padding:
              max(24px, env(safe-area-inset-top))
              18px
              max(20px, env(safe-area-inset-bottom)) !important;

            overflow-x: hidden !important;
            overflow-y: auto !important;
            overscroll-behavior: contain;
            scrollbar-width: thin;
            scrollbar-color: rgba(244, 209, 138, 0.4) transparent;

            border: 1px solid rgba(245, 211, 149, 0.35) !important;
            border-right: 0 !important;
            border-radius: 25px 0 0 25px !important;
            color: var(--mobile-cream) !important;

            background:
              radial-gradient(ellipse at 90% 0%, rgba(180, 126, 235, 0.22), transparent 40%),
              radial-gradient(ellipse at 0% 65%, rgba(124, 75, 171, 0.13), transparent 42%),
              linear-gradient(155deg, rgba(48, 29, 69, 0.985), rgba(24, 14, 39, 0.99) 75%) !important;

            box-shadow:
              0 24px 75px rgba(10, 4, 20, 0.52),
              0 0 36px rgba(157, 106, 220, 0.13),
              inset 0 1px 0 rgba(255, 239, 201, 0.13) !important;

            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            transform: translate3d(100%, 0, 0) !important;
            transform-origin: right center;

            transition:
              transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 250ms ease,
              visibility 250ms ease !important;
          }

          .premium-navbar-root .mobile-nav-panel::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            background:
              linear-gradient(115deg, transparent 10%, rgba(255, 232, 179, 0.035) 35%, transparent 55%),
              radial-gradient(circle at 50% 0%, rgba(218, 174, 255, 0.08), transparent 50%);
            background-size: 220% 100%;
            animation: mobile-glass-flow 8s linear infinite;
          }

          .premium-navbar-root .mobile-nav-panel::after {
            content: "";
            position: absolute;
            top: 0;
            left: 12%;
            right: 12%;
            height: 1px;
            background: linear-gradient(90deg, transparent, #f4d18a, #cba4f5, transparent);
            opacity: 0.9;
            pointer-events: none;
          }

          .premium-navbar-root .mobile-nav-panel.is-open {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transform: translate3d(0, 0, 0) !important;
          }

          .premium-navbar-root .mobile-panel-header {
            position: relative;
            z-index: 1;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 10px !important;
            padding: 0 0 16px !important;
            margin: 0 0 9px !important;
            border-bottom: 1px solid rgba(244, 209, 138, 0.18) !important;
          }

          .premium-navbar-root .mobile-panel-brand {
            display: inline-flex !important;
            align-items: center !important;
            gap: 11px !important;
            min-width: 0;
            color: #fff1d0 !important;
            text-decoration: none !important;
          }

          .premium-navbar-root .mobile-panel-mark {
            display: grid !important;
            place-items: center !important;
            flex: 0 0 43px;
            width: 43px !important;
            height: 43px !important;
            border: 1px solid rgba(246, 213, 151, 0.7) !important;
            border-radius: 15px !important;
            color: #fff0c7 !important;
            font-family: Georgia, serif !important;
            font-size: 17px !important;
            letter-spacing: -0.07em !important;
            background: linear-gradient(145deg, #7955a1, #38214f 78%) !important;
            box-shadow:
              0 0 20px rgba(219, 170, 255, 0.15),
              inset 0 1px 0 rgba(255, 245, 210, 0.18);
          }

          .premium-navbar-root .mobile-panel-brand strong {
            display: block;
            color: #fff1d0;
            font-size: 12px;
            font-weight: 750;
            letter-spacing: 0.12em;
            line-height: 1.5;
          }

          .premium-navbar-root .mobile-panel-brand small {
            display: block;
            margin-top: 3px;
            color: #c9b0df;
            font-size: 8px;
            font-weight: 600;
            letter-spacing: 0.11em;
          }

          .premium-navbar-root .mobile-panel-index {
            color: #d8b985 !important;
            font-size: 8px !important;
            font-weight: 700 !important;
            letter-spacing: 0.11em !important;
            white-space: nowrap;
          }

          .premium-navbar-root .mobile-lantern-scene {
            position: relative;
            z-index: 1;
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 24px;
            height: 34px;
            margin: 0 0 9px;
            overflow: hidden;
            pointer-events: none;
          }

          .premium-navbar-root .mobile-lantern {
            display: inline-block;
            color: #ffe5a0;
            text-shadow:
              0 0 6px rgba(255, 223, 153, 0.95),
              0 0 18px rgba(250, 192, 101, 0.65);
            animation: mobile-lantern-float 3.2s ease-in-out infinite;
          }

          .premium-navbar-root .mobile-lantern-one {
            font-size: 13px;
            animation-delay: -0.5s;
          }

          .premium-navbar-root .mobile-lantern-two {
            font-size: 20px;
            animation-delay: -1.3s;
          }

          .premium-navbar-root .mobile-lantern-three {
            font-size: 11px;
            animation-delay: -2s;
          }

          .premium-navbar-root .mobile-orb {
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #fff1bd;
            box-shadow: 0 0 9px 3px rgba(255, 213, 124, 0.36);
            animation: mobile-orb-drift 3.5s ease-in-out infinite;
          }

          .premium-navbar-root .mobile-orb-one {
            left: 16%;
            top: 9px;
          }

          .premium-navbar-root .mobile-orb-two {
            right: 19%;
            top: 18px;
            animation-delay: -1.3s;
          }

          .premium-navbar-root .mobile-orb-three {
            left: 73%;
            top: 4px;
            animation-delay: -2.1s;
          }

          .premium-navbar-root .mobile-panel-links {
            position: relative;
            z-index: 1;
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            width: 100%;
          }

          .premium-navbar-root .mobile-nav-group {
            position: relative;
            display: block !important;
            width: 100% !important;
            min-width: 0;
            padding: 0 !important;
            margin: 0 !important;
            border: 1px solid rgba(211, 179, 239, 0.1) !important;
            border-radius: 15px !important;
            background: rgba(255, 255, 255, 0.025) !important;
            transition:
              border-color 220ms ease,
              background 220ms ease,
              box-shadow 220ms ease !important;
            animation: mobile-item-arrive 420ms both;
          }

          .premium-navbar-root .mobile-nav-group:nth-child(1) { animation-delay: 30ms; }
          .premium-navbar-root .mobile-nav-group:nth-child(2) { animation-delay: 65ms; }
          .premium-navbar-root .mobile-nav-group:nth-child(3) { animation-delay: 100ms; }
          .premium-navbar-root .mobile-nav-group:nth-child(4) { animation-delay: 135ms; }
          .premium-navbar-root .mobile-nav-group:nth-child(5) { animation-delay: 170ms; }

          .premium-navbar-root .mobile-nav-group.is-current,
          .premium-navbar-root .mobile-nav-group.is-expanded {
            border-color: rgba(244, 209, 138, 0.36) !important;
            background:
              linear-gradient(100deg, rgba(151, 102, 196, 0.16), rgba(255, 220, 145, 0.035)) !important;
            box-shadow: inset 0 0 18px rgba(185, 136, 235, 0.035);
          }

          .premium-navbar-root .mobile-nav-main {
            display: flex !important;
            align-items: stretch !important;
            gap: 4px !important;
            min-height: 49px !important;
            padding: 4px !important;
          }

          .premium-navbar-root .mobile-nav-link {
            display: flex !important;
            align-items: center !important;
            flex: 1 1 auto;
            gap: 12px !important;
            min-width: 0;
            min-height: 40px;
            padding: 0 10px !important;
            border: 0 !important;
            color: #f7ebff !important;
            background: transparent !important;
            text-decoration: none !important;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
          }

          .premium-navbar-root .mobile-nav-number {
            display: grid !important;
            place-items: center !important;
            flex: 0 0 28px;
            width: 28px !important;
            height: 28px !important;
            border: 1px solid rgba(220, 185, 251, 0.19) !important;
            border-radius: 10px !important;
            color: #d8b5f5 !important;
            background: rgba(169, 117, 219, 0.09) !important;
            font-family: Georgia, serif !important;
            font-size: 10px !important;
            letter-spacing: 0.02em;
            transition:
              color 220ms ease,
              border-color 220ms ease,
              background 220ms ease !important;
          }

          .premium-navbar-root .mobile-nav-label {
            min-width: 0;
            color: #f8edff !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            letter-spacing: 0.105em !important;
            line-height: 1.4;
            overflow-wrap: anywhere;
            transition: color 220ms ease;
          }

          .premium-navbar-root .mobile-nav-link-sparkle {
            margin-left: auto;
            color: #d8b7f3;
            font-size: 11px;
            opacity: 0;
            transform: scale(0.6) rotate(-30deg);
            transition:
              opacity 220ms ease,
              transform 220ms ease;
          }

          .premium-navbar-root .mobile-nav-main.is-active .mobile-nav-number,
          .premium-navbar-root .mobile-nav-group.is-expanded .mobile-nav-number {
            color: #fff0bd !important;
            border-color: rgba(255, 219, 143, 0.48) !important;
            background: rgba(228, 178, 93, 0.12) !important;
          }

          .premium-navbar-root .mobile-nav-main.is-active .mobile-nav-label {
            color: #ffe7aa !important;
          }

          .premium-navbar-root .mobile-nav-main.is-active .mobile-nav-link-sparkle,
          .premium-navbar-root .mobile-nav-group.is-expanded .mobile-nav-link-sparkle {
            opacity: 1;
            transform: scale(1) rotate(0);
          }

          .premium-navbar-root .mobile-nav-expand {
            display: grid !important;
            place-items: center !important;
            flex: 0 0 39px;
            width: 39px !important;
            min-width: 39px !important;
            height: 39px !important;
            align-self: center;
            margin-right: 1px !important;
            border: 1px solid rgba(232, 202, 255, 0.19) !important;
            border-radius: 12px !important;
            color: #f7dca4 !important;
            background: rgba(154, 103, 204, 0.12) !important;
            -webkit-tap-highlight-color: transparent;
            transition:
              transform 240ms ease,
              background 240ms ease,
              border-color 240ms ease !important;
          }

          .premium-navbar-root .mobile-nav-expand:active {
            transform: scale(0.92);
          }

          .premium-navbar-root .mobile-expand-icon {
            display: block;
            font-family: Arial, sans-serif;
            font-size: 22px;
            font-weight: 300;
            line-height: 1;
            transition: transform 240ms ease;
          }

          .premium-navbar-root .mobile-nav-group.is-expanded .mobile-nav-expand {
            border-color: rgba(255, 221, 151, 0.45) !important;
            background: rgba(230, 185, 108, 0.1) !important;
          }

          .premium-navbar-root .mobile-nav-group.is-expanded .mobile-expand-icon {
            transform: rotate(180deg);
          }

          .premium-navbar-root .mobile-nav-submenu {
            display: grid !important;
            grid-template-rows: 0fr;
            gap: 0 !important;
            max-height: 0 !important;
            padding: 0 12px 0 47px !important;
            overflow: hidden !important;
            visibility: hidden;
            opacity: 0;
            border-top: 1px solid transparent;
            transition:
              max-height 280ms ease,
              padding 280ms ease,
              opacity 220ms ease,
              visibility 220ms ease,
              border-color 220ms ease !important;
          }

          .premium-navbar-root .mobile-nav-submenu.is-open {
            max-height: 240px !important;
            padding-top: 5px !important;
            padding-bottom: 9px !important;
            visibility: visible;
            opacity: 1;
            border-top-color: rgba(244, 209, 138, 0.12);
          }

          .premium-navbar-root .mobile-nav-subitem {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            min-height: 36px !important;
            padding: 7px 0 !important;
            color: #d9c6ec !important;
            font-size: 11px !important;
            font-weight: 500 !important;
            text-decoration: none !important;
            border-bottom: 1px solid rgba(223, 194, 249, 0.07) !important;
            transform: translateY(-4px);
            transition:
              color 200ms ease,
              transform 220ms ease !important;
          }

          .premium-navbar-root .mobile-nav-submenu.is-open .mobile-nav-subitem {
            transform: translateY(0);
          }

          .premium-navbar-root .mobile-nav-subitem:last-child {
            border-bottom: 0 !important;
          }

          .premium-navbar-root .mobile-sub-number {
            color: #c9a4ed;
            font-family: Georgia, serif;
            font-size: 9px;
          }

          .premium-navbar-root .mobile-sub-arrow {
            margin-left: auto;
            color: #f0d092;
            font-size: 13px;
          }

          .premium-navbar-root .mobile-nav-subitem.is-active {
            color: #ffe3a0 !important;
          }

          .premium-navbar-root .mobile-entertainment-button {
            appearance: none;
            text-align: left;
            color: inherit;
            cursor: pointer;
          }

          .premium-navbar-root .mobile-entertainment-button .mobile-nav-link {
            width: 100%;
          }

          .premium-navbar-root .mobile-panel-actions {
            position: relative;
            z-index: 1;
            display: grid !important;
            grid-template-columns: 1fr 1.15fr !important;
            gap: 9px !important;
            margin: 17px 0 13px !important;
          }

          .premium-navbar-root .mobile-cv-button,
          .premium-navbar-root .mobile-hire-button {
            position: relative;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px !important;
            min-width: 0;
            min-height: 43px !important;
            padding: 10px 9px !important;
            border-radius: 13px !important;
            font-size: 9px !important;
            font-weight: 750 !important;
            letter-spacing: 0.055em !important;
            text-align: center;
            text-decoration: none !important;
            white-space: normal;
            transition:
              transform 220ms ease,
              box-shadow 220ms ease,
              border-color 220ms ease !important;
          }

          .premium-navbar-root .mobile-cv-button {
            border: 1px solid rgba(231, 196, 255, 0.28) !important;
            color: #f3e1ff !important;
            background: linear-gradient(135deg, rgba(111, 72, 145, 0.42), rgba(56, 35, 78, 0.8)) !important;
          }

          .premium-navbar-root .mobile-hire-button {
            overflow: hidden;
            border: 1px solid rgba(255, 222, 158, 0.7) !important;
            color: #36203f !important;
            background: linear-gradient(115deg, #ffe5a5, #eac17b 58%, #f8dda0) !important;
            box-shadow:
              0 5px 16px rgba(227, 179, 101, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.55);
          }

          .premium-navbar-root .mobile-cv-button:active,
          .premium-navbar-root .mobile-hire-button:active {
            transform: scale(0.97);
          }

          .premium-navbar-root .mobile-action-icon {
            font-size: 13px;
          }

          .premium-navbar-root .mobile-hire-sparkle {
            font-size: 11px;
            animation: mobile-sparkle 2s ease-in-out infinite;
          }

          .premium-navbar-root .mobile-panel-footer {
            position: relative;
            z-index: 1;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 8px !important;
            padding-top: 12px !important;
            border-top: 1px solid rgba(244, 209, 138, 0.15) !important;
            color: #bda5d2 !important;
            font-size: 8px !important;
            font-weight: 600 !important;
            letter-spacing: 0.08em !important;
          }

          .premium-navbar-root .mobile-panel-status {
            display: inline-flex !important;
            align-items: center !important;
            gap: 7px !important;
            color: #e0d2eb !important;
          }

          .premium-navbar-root .mobile-panel-status > span {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #a9f0bd;
            box-shadow: 0 0 9px rgba(125, 255, 164, 0.7);
            animation: mobile-status-pulse 2s ease-in-out infinite;
          }

          .premium-navbar-root .mobile-panel-links > *,
          .premium-navbar-root .mobile-panel-actions > * {
            position: relative;
          }

          .premium-navbar-root .mobile-nav-panel a:focus-visible,
          .premium-navbar-root .mobile-nav-panel button:focus-visible,
          .premium-navbar-root .premium-nav-trigger:focus-visible {
            outline: 2px solid #ffe2a0 !important;
            outline-offset: 3px !important;
          }
        }

        @keyframes mobile-item-arrive {
          from {
            opacity: 0;
            transform: translateY(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobile-glass-flow {
          from { background-position: 100% 0; }
          to { background-position: -120% 0; }
        }

        @keyframes mobile-lantern-float {
          0%, 100% { transform: translateY(2px) rotate(-5deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }

        @keyframes mobile-orb-drift {
          0%, 100% { opacity: 0.35; transform: translateY(3px); }
          50% { opacity: 1; transform: translateY(-4px); }
        }

        @keyframes mobile-ring-pulse {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.035);
          }
        }

        @keyframes mobile-sparkle {
          0%, 100% {
            opacity: 0.7;
            transform: rotate(0deg) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: rotate(25deg) scale(1.12);
          }
        }

        @keyframes mobile-status-pulse {
          0%, 100% {
            opacity: 0.65;
            box-shadow: 0 0 5px rgba(125, 255, 164, 0.45);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 11px rgba(125, 255, 164, 0.85);
          }
        }

        @media (max-width: 380px) {
          .premium-navbar-root .mobile-nav-panel {
            width: 92vw !important;
            padding-right: 12px !important;
            padding-left: 12px !important;
            border-radius: 21px 0 0 21px !important;
          }

          .premium-navbar-root .mobile-panel-brand strong {
            font-size: 11px;
          }

          .premium-navbar-root .mobile-panel-index {
            font-size: 7px !important;
          }

          .premium-navbar-root .mobile-nav-label {
            font-size: 10px !important;
          }

          .premium-navbar-root .mobile-panel-actions {
            gap: 6px !important;
          }

          .premium-navbar-root .mobile-cv-button,
          .premium-navbar-root .mobile-hire-button {
            font-size: 8px !important;
            padding-right: 6px !important;
            padding-left: 6px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-topbar::before,
          .nav-firefly,
          .nav-golden-ribbon,
          .premium-navbar-root .nav-cv-arrow,
          .premium-navbar-root .mobile-cv-arrow,
          .premium-navbar-root .mobile-nav-panel::before,
          .premium-navbar-root .mobile-nav-group,
          .premium-navbar-root .mobile-lantern,
          .premium-navbar-root .mobile-orb,
          .premium-navbar-root .mobile-hire-sparkle,
          .premium-navbar-root .mobile-panel-status > span,
          .premium-navbar-root .nav-trigger-ring,
          .premium-navbar-root .premium-nav-trigger::before {
            animation: none !important;
          }

          .premium-navbar-root .mobile-nav-panel,
          .premium-navbar-root .mobile-nav-submenu,
          .premium-navbar-root .mobile-nav-subitem,
          .premium-navbar-root .nav-hamburger > span {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
