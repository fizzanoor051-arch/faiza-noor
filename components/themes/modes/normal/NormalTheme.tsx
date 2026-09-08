"use client";

import {
  useEffect,
} from "react";

export default function NormalTheme() {
  useEffect(() => {
    /*
     * Normal mode removes any visual
     * effect layers that future themes
     * may have added.
     */

    const body =
      document.body;

    body.classList.remove(
      "visual-world-active",
      "matrix-world-active",
      "three-d-world-active",
      "coding-world-active",
      "cartoon-world-active",
      "cinematic-world-active",
      "natural-world-active"
    );

    return () => {
      body.classList.remove(
        "visual-world-active"
      );
    };
  }, []);

  return null;
}