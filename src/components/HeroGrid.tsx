"use client";

import { useEffect, useRef } from "react";

// The hero background: a grid of thin dashed lines, the same line as every other rule on the site, drawn on a canvas so it can be played with.
// Alignment: the cell size is the page frame divided into 22, so the two vertical frame lines are grid lines, the grid
// is centred on the page, and the first row line is the bottom edge of the navbar.
// Interaction: the lines near the pointer light up in gold and leave a fading trail; a click or tap sends a glowing ring
// through the lines. There are no filled cells. It pauses off screen, and it respects reduced motion (no idle motion either way).
const CELL = (1180 + 64) / 22; // frame width (content + 2 × 2rem) over 22 cells

const rgbOf = (v: string): [number, number, number] => {
  v = v.trim();
  if (v.startsWith("#")) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join("") : v.slice(1);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m = v.match(/\d+(\.\d+)?/g) ?? ["128", "128", "128"];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
};

type Spot = { x: number; y: number; t: number };

export function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    const hero = cv?.closest(".hero") as HTMLElement | null;
    if (!cv || !ctx || !hero) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let x0 = 0; // a vertical line: the page centre
    let y0 = 0; // a row line: the bottom of the navbar
    let headerH = -1;
    let accent: [number, number, number] = [250, 250, 250];
    let lines: HTMLCanvasElement | null = null; // the quiet grid
    let glow: HTMLCanvasElement | null = null; // the same grid in gold, shown only where the pointer has been
    let mask: HTMLCanvasElement | null = null;
    let tmp: HTMLCanvasElement | null = null;
    let pointer: { x: number; y: number } | null = null;
    let trail: Spot[] = [];
    const ripples: Spot[] = [];
    const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const layer = () => {
      const c = document.createElement("canvas");
      c.width = cv.width;
      c.height = cv.height;
      const x = c.getContext("2d")!;
      x.scale(dpr, dpr);
      return { c, x };
    };
    // The same line as everywhere else on the site: 1px, 3px dash, 3px gap.
    // The page already draws the two frame lines (from 1320px wide) and the navbar's bottom line, and they are grid lines
    // too, so the grid leaves those three alone: one clean dashed line there, not two on top of each other.
    const drawLines = (x: CanvasRenderingContext2D, colour: string) => {
      const frame = W >= 1320;
      x.strokeStyle = colour;
      x.lineWidth = 1;
      x.setLineDash([3, 3]);
      x.beginPath();
      for (let px = x0 - Math.ceil(x0 / CELL) * CELL; px <= W + 1; px += CELL) {
        if (frame && Math.abs(Math.round((px - x0) / CELL)) === 11) continue;
        x.moveTo(Math.round(px) + 0.5, 0);
        x.lineTo(Math.round(px) + 0.5, H);
      }
      for (let py = y0 - Math.ceil(y0 / CELL) * CELL; py <= H + 1; py += CELL) {
        if (Math.round((py - y0) / CELL) === 0) continue;
        x.moveTo(0, Math.round(py) + 0.5);
        x.lineTo(W, Math.round(py) + 0.5);
      }
      x.stroke();
    };

    const build = () => {
      const cs = getComputedStyle(cv);
      accent = rgbOf(cs.getPropertyValue("--accent"));
      headerH = parseFloat(cs.getPropertyValue("--header-h")) || 69;
      W = cv.clientWidth;
      H = cv.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      x0 = W / 2;
      y0 = headerH;
      const a = layer();
      drawLines(a.x, cs.getPropertyValue("--frame-line").trim());
      lines = a.c;
      const g = layer();
      drawLines(g.x, rgba(accent, 0.85));
      glow = g.c;
      mask = layer().c;
      tmp = layer().c;
    };

    const local = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      if (p.y > H) {
        pointer = null;
        return;
      }
      pointer = p;
      const l = trail[trail.length - 1];
      if (!l || Math.hypot(l.x - p.x, l.y - p.y) > 14) trail.push({ ...p, t: 0 });
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      if (p.y <= H) ripples.push({ ...p, t: 0 });
    };
    const onLeave = () => {
      pointer = null;
    };

    const frame = (dt: number) => {
      if (!lines || !glow || !mask || !tmp) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(lines, 0, 0, W, H);

      for (const s of trail) s.t += dt;
      trail = trail.filter((s) => s.t < 1.1);
      for (const s of ripples) s.t += dt;
      for (let k = ripples.length - 1; k >= 0; k--) if (ripples[k]!.t > 1.6) ripples.splice(k, 1);
      if (!pointer && !trail.length && !ripples.length) return;

      // Where the gold shows: soft spots on the pointer and its trail, and a ring for each ripple.
      const m = mask.getContext("2d")!;
      m.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.clearRect(0, 0, W, H);
      m.globalCompositeOperation = "lighter";
      const spot = (x: number, y: number, r: number, a: number) => {
        const g = m.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(0,0,0,${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        m.fillStyle = g;
        m.fillRect(x - r, y - r, r * 2, r * 2);
      };
      for (const s of trail) spot(s.x, s.y, 120, (1 - s.t / 1.1) * 0.7);
      if (pointer) spot(pointer.x, pointer.y, 190, 1);
      for (const rp of ripples) {
        const R = rp.t * 600 + 20;
        const fade = Math.max(0, 1 - rp.t / 1.6);
        const outer = R + 70;
        const g = m.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, outer);
        g.addColorStop(Math.max(0, (R - 70) / outer), "rgba(0,0,0,0)");
        g.addColorStop(R / outer, `rgba(0,0,0,${fade})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        m.fillStyle = g;
        m.fillRect(rp.x - outer, rp.y - outer, outer * 2, outer * 2);
      }
      const t = tmp.getContext("2d")!;
      t.setTransform(dpr, 0, 0, dpr, 0, 0);
      t.globalCompositeOperation = "source-over";
      t.clearRect(0, 0, W, H);
      t.drawImage(glow, 0, 0, W, H);
      t.globalCompositeOperation = "destination-in";
      t.drawImage(mask, 0, 0, W, H);
      t.globalCompositeOperation = "source-over";
      ctx.drawImage(tmp, 0, 0, W, H);
    };

    let raf = 0;
    let last = 0;
    let n = 0;
    let visible = true;
    const loop = (now: number) => {
      if (!visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      // The navbar height is set by the page after it loads: follow it so the first row line stays on its edge.
      if (n++ % 20 === 0 && parseFloat(getComputedStyle(cv).getPropertyValue("--header-h")) !== headerH) build();
      frame(dt);
      raf = requestAnimationFrame(loop);
    };

    build();
    const ro = new ResizeObserver(() => build());
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) {
        last = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(cv);
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerdown", onDown, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    const mo = new MutationObserver(() => build());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", build);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", build);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerdown", onDown);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-grid" aria-hidden="true" />;
}
