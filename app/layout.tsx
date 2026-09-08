import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import CustomCursor from "@/components/effects/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";
import PortfolioAI from "@/components/ai/PortfolioAI";

import ThemeProvider from "@/components/themes/ThemeProvider";
import ThemeEngine from "@/components/themes/ThemeEngine";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Faiza Noor — Full Stack Web Engineer",
    template: "%s | Faiza Noor",
  },

  description:
    "Faiza Noor is a Full Stack Web Engineer creating cinematic, scalable and high-performance digital experiences with React, Next.js, TypeScript and Node.js.",

  keywords: [
    "Faiza Noor",
    "Full Stack Web Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Freelance Web Developer",
    "Web Developer Pakistan",
  ],

  authors: [
    {
      name: "Faiza Noor",
    },
  ],

  creator: "Faiza Noor",

  metadataBase: new URL(
    "https://github.com/fizzanoor051-arch"
  ),

  openGraph: {
    title: "Faiza Noor — Full Stack Web Engineer",
    description:
      "Engineering immersive, cinematic and high-performance digital experiences.",
    type: "website",
    siteName: "Faiza Noor Portfolio",
  },

  twitter: {
    card: "summary_large_image",
    title: "Faiza Noor — Full Stack Web Engineer",
    description:
      "Engineering immersive, cinematic and high-performance digital experiences.",
  },

  robots: {
    index: true,
    follow: true,
  },
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
        {/* =====================================================
            THEME SYSTEM
            ThemeProvider controls the active world.
            ThemeEngine renders the visual world/effects.
        ===================================================== */}

        <ThemeProvider>
          <ThemeEngine>

            {/* =================================================
                CINEMATIC BACKGROUND LAYERS
            ================================================= */}

            <div
              className="site-noise pointer-events-none fixed inset-0 z-[9990]"
              aria-hidden="true"
            />

            <div
              className="site-vignette pointer-events-none fixed inset-0 z-[9989]"
              aria-hidden="true"
            />

            {/* =================================================
                SMOOTH SCROLL
            ================================================= */}

            <SmoothScroll />

            {/* =================================================
                GLOBAL SCROLL PROGRESS
            ================================================= */}

            <ScrollProgress />

            {/* =================================================
                MAIN NAVIGATION
            ================================================= */}

            <Navbar />

            {/* =================================================
                PAGE CONTENT
            ================================================= */}

            <main className="relative z-10 flex-1">
              {children}
            </main>

            {/* =================================================
                FOOTER
            ================================================= */}

            <Footer />

            {/* =================================================
                FAIZA AI
                GLOBAL PORTFOLIO ASSISTANT
            ================================================= */}

            <PortfolioAI />

            {/* =================================================
                CUSTOM CINEMATIC CURSOR
            ================================================= */}

            <CustomCursor />

          </ThemeEngine>
        </ThemeProvider>
      </body>
    </html>
  );
}