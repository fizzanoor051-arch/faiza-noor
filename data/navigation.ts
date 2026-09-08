export interface NavigationItem {
  label: string;
  href: string;
  number: string;
}

export const navigationItems: NavigationItem[] = [
  {
    number: "01",
    label: "Home",
    href: "/",
  },
  {
    number: "02",
    label: "About",
    href: "/about",
  },

  {
    number: "04",
    label: "Skills",
    href: "/skills",
  },
  {
    number: "05",
    label: "Projects",
    href: "/projects",
  },
  {
    number: "06",
    label: "Experience",
    href: "/experience",
  },
  {
    number: "07",
    label: "Services",
    href: "/services",
  },
  {
    number: "08",
    label: "Resume",
    href: "/resume",
  },
  {
    number: "09",
    label: "Contact",
    href: "/contact",
  },
];