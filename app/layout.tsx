
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/effects/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";
import PortfolioAI from "@/components/ai/PortfolioAI";
import PortfolioIntro from "@/components/PortfolioIntro";
import VisitorTracker from "@/components/analytics/VisitorTracker";
import PortfolioChrome from "@/components/layout/PortfolioChrome";
import ThemeProvider from "@/components/themes/ThemeProvider";
import ThemeEngine from "@/components/themes/ThemeEngine";

const SITE_URL = "https://faiza-noor10.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

title: {
  default:
    "Faiza Noor M. Shabbir Hussain | Youngest Female Full-Stack Web Engineer in Sialkot",
  template: "%s | Faiza Noor M. Shabbir Hussain",
},

  description:
    
    "Official portfolio of Faiza Noor M. Shabbir Hussain, a Full-Stack Web Engineer based in Sialkot District, Punjab, Pakistan. Explore her web development projects, React, Next.js, TypeScript, Node.js, MongoDB, and AI-powered applications.",


  applicationName: "Faiza Noor Portfolio",

authors: [
  {
    name: "Faiza Noor M. Shabbir Hussain",
    url: SITE_URL,
  },
],

creator: "Faiza Noor M. Shabbir Hussain",
publisher: "Faiza Noor M. Shabbir Hussain",

  keywords: [
    "Faiza Noor",
    "Faiza Noor Full Stack Web Engineer",
    "Faiza Noor Sialkot",
    "Full Stack Web Engineer in Sialkot",
    "Female Full Stack Web Engineer in Sialkot",
    "Full Stack Web Engineer in District Sialkot",
    "Female Web Engineer in Sialkot Pakistan",
    "Youngest Female Full Stack Web Engineer in Sialkot",
    "Youngest Female Full Stack Web Engineer in District Sialkot",
    "Web Developer Sialkot",
    "Full Stack Developer Pakistan",
    "MERN Stack Developer Pakistan",
    "Next.js Developer Pakistan",
    "React Developer Sialkot",
    "TypeScript Developer",
    "Node.js Developer",
    "AI Web Application Developer",
    "Freelance Full Stack Web Engineer",
    "Faiza Noor Portfolio",
  ],

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "6Zvj85FXZJy9d9Oxilu-1Aiup7Ee7T-zDpv-a2_PrSM",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Faiza Noor Portfolio",
    locale: "en_PK",
    title:
       "Faiza Noor M. Shabbir Hussain | Youngest Female Full-Stack Web Engineer in Sialkot",
    description:
      "Visit Faiza Noor's official portfolio to explore full-stack web development, React, Next.js, TypeScript, Node.js, MongoDB, and AI-powered projects.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Faiza Noor M. Shabbir Hussain | Youngest Female Full-Stack Web Engineer in Sialkot",
    description:
      "Explore Faiza Noor's full-stack web engineering portfolio, technical skills, and AI-powered web projects.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#05050a] text-white">
        <ThemeProvider>
          <ThemeEngine>
            <PortfolioIntro />

            <div
              className="site-noise pointer-events-none fixed inset-0 z-[9990]"
              aria-hidden="true"
            />

            <div
              className="site-vignette pointer-events-none fixed inset-0 z-[9989]"
              aria-hidden="true"
            />

            <SmoothScroll />

            <ScrollProgress />

            <PortfolioChrome>
              <main className="relative z-10 flex-1">
                {children}
              </main>
            </PortfolioChrome>

            <PortfolioAI />

            <CustomCursor />

            <VisitorTracker />
          </ThemeEngine>
        </ThemeProvider>
      </body>
    </html>
  );
}
