import { Cinzel_Decorative, Great_Vibes } from "next/font/google";

/**
 * Fairy-tale display fonts used by the Tangled-style intro,
 * the Projects page and the About page.
 * The CSS variables are attached to <html> in app/layout.tsx.
 */
export const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel-deco",
  display: "swap",
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});
