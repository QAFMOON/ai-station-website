"use client";

import { useEffect } from "react";

// The two vertical page-frame lines run the full height of the screen. In the footer they fade out just below the
// copyright, so they do not carry on through the dot field. This only tells the CSS where the fade starts and ends
// (--frame-fade-start / --frame-fade-end, measured from the navbar's bottom edge, where the lines begin).
const FADE = 180; // px over which the lines fade out

export function FrameFade() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const legal = document.querySelector<HTMLElement>(".footer-legal");
      if (!legal) return;
      const headerH = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 69;
      const start = Math.max(0, legal.getBoundingClientRect().bottom - headerH);
      root.style.setProperty("--frame-fade-start", `${Math.round(start)}px`);
      root.style.setProperty("--frame-fade-end", `${Math.round(start + FADE)}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      root.style.removeProperty("--frame-fade-start");
      root.style.removeProperty("--frame-fade-end");
    };
  }, []);
  return null;
}
