"use client";

import { useEffect, useRef } from "react";

// The footer scene. A halftone field of dots, denser towards the bottom, with the brand name cut out of it.
// On the right a pixel rocket stands on a launch pad, ignites, lifts off trailing flame, and leaves dotted
// smoke behind; then the pad resets and it starts again. It only runs while it is on screen, it follows the
// light and dark theme, and with reduced motion it shows one still frame.
const LOOP = 11; // seconds
const IGNITE = 2.2;
const LIFTOFF = 3.3;

// The rocket of the logo, standing up: a V-shaped nose that widens evenly (1, 3, 5 dots), one window (a hole in the dots, like
// the logo's), then the body, fins and engine.
const ROCKET = ["...#...", "..###..", ".#####.", ".##.##.", ".#####.", ".#####.", ".#####.", ".#####.", "#######", "##.#.##", "#..#..#"];

type P = { x: number; y: number; vx: number; vy: number; age: number; life: number; r0: number; r1: number; kind: 0 | 1; seed: number };

const hash = (a: number, b: number) => {
  let x = Math.imul(a, 374761393) ^ Math.imul(b, 668265263);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
};
const rgbOf = (v: string): [number, number, number] => {
  v = v.trim();
  if (v.startsWith("#")) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join("") : v.slice(1);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m = v.match(/\d+(\.\d+)?/g) ?? ["128", "128", "128"];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
};

export function LaunchFooter({ name }: { name: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let P_ = 7; // field pitch
    let Q = 14; // rocket pixel
    let field: HTMLCanvasElement | null = null;
    let accent: [number, number, number] = [250, 250, 250];
    let ink: [number, number, number] = [250, 250, 250];
    let bg: [number, number, number] = [0, 0, 0];
    let muted: [number, number, number] = [163, 163, 163];
    let cx = 0; // rocket centre x
    let gy = 0; // ground (top of the pad base)
    let band = 400; // height of the dot field along the bottom
    let rateK = 1; // smoke amount: lighter on phones
    let climb = 3.6; // seconds the rocket takes to leave the footer: longer for a taller footer
    const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const colours = () => {
      const cs = getComputedStyle(cv);
      accent = rgbOf(cs.getPropertyValue("--accent"));
      ink = rgbOf(cs.getPropertyValue("--ink-rgb").includes(",") ? `rgb(${cs.getPropertyValue("--ink-rgb")})` : cs.getPropertyValue("--ink"));
      bg = rgbOf(cs.getPropertyValue("--bg"));
      muted = rgbOf(cs.getPropertyValue("--muted"));
    };

    // The dots and the cut-out name, drawn once per size or theme change.
    const buildField = () => {
      colours();
      W = cv.clientWidth;
      H = cv.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      const small = W < 640;
      P_ = small ? 5 : 7; // finer dots on a phone, so the name stays crisp
      Q = small ? 10 : 14;
      rateK = small ? 0.55 : 1;
      // The rocket stands to the right of the link columns. The dot field is the bottom band of the footer (the spacer's height).
      cx = W * (W < 640 ? 0.8 : W < 1000 ? 0.84 : 0.87);
      gy = H - Q * 2.6;
      const spacer = cv.parentElement?.querySelector(".footer-field") as HTMLElement | null;
      band = Math.min(H, spacer?.clientHeight || Math.min(460, Math.max(300, W * 0.34)));
      climb = Math.min(5.6, Math.max(3.2, H / 170));

      const text = document.createElement("canvas");
      text.width = Math.round(W);
      text.height = Math.round(H);
      const tc = text.getContext("2d")!;
      const font = (s: number) => `800 ${s}px "Manrope Variable", "Manrope", system-ui, sans-serif`;
      // Desktop: the name at the left, its foot cut off by the bottom edge. Phone: the whole name across the width, in full.
      let fs = small ? 100 : band * 1.08;
      tc.font = font(fs);
      const w = tc.measureText(name).width;
      const maxW = W * (small ? 0.92 : 0.64);
      if (small || w > maxW) fs *= maxW / w;
      tc.font = font(fs);
      tc.fillStyle = "#000";
      const base = small ? H - fs * 0.14 : H + fs * 0.04;
      tc.fillText(name, small ? (W - maxW) / 2 : Math.max(16, W * 0.03), base);
      if (small) gy = base - fs * 0.73 - Q * 1.8; // the pad stands on top of the name
      const alpha = tc.getImageData(0, 0, text.width, text.height).data;

      const f = document.createElement("canvas");
      f.width = cv.width;
      f.height = cv.height;
      const fc = f.getContext("2d")!;
      fc.scale(dpr, dpr);
      const cols = Math.ceil(W / P_);
      const rows = Math.ceil(H / P_);
      for (let r = 0; r < rows; r++) {
        const bt = (r * P_ - (H - band)) / band; // 0 at the top of the field, 1 at the bottom of the footer
        const d = bt <= 0 ? 0 : Math.pow(Math.max(0, (bt - 0.06) / 0.94), small ? 1.1 : 1.5);
        for (let c = 0; c < cols; c++) {
          if (hash(c, r) >= d) continue;
          const x = c * P_ + P_ / 2;
          const y = r * P_ + P_ / 2;
          const ax = Math.min(text.width - 1, Math.round(x));
          const ay = Math.min(text.height - 1, Math.round(y));
          if (alpha[(ay * text.width + ax) * 4 + 3] > 110) continue; // the name is cut out
          fc.fillStyle = rgba(accent, 0.3 + 0.55 * d);
          fc.beginPath();
          fc.arc(x, y, P_ * (small ? 0.2 + 0.17 * d : 0.17 + 0.15 * d), 0, Math.PI * 2);
          fc.fill();
        }
      }
      field = f;
    };

    const dot = (x: number, y: number, r: number, c: [number, number, number], a: number, backing = 0) => {
      if (backing) {
        ctx.fillStyle = rgba(bg, Math.min(1, backing));
        ctx.beginPath();
        ctx.arc(x, y, r * 1.55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = rgba(c, a);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    const sprite = (rows: string[], x0: number, y0: number, pitch: number, c: [number, number, number], a: number) => {
      rows.forEach((row, r) =>
        [...row].forEach((ch, k) => {
          if (ch === "#") dot(x0 + (k + 0.5) * pitch, y0 + (r + 0.5) * pitch, pitch * 0.33, c, a, a);
        }),
      );
    };

    // The pad: a tower with two arms on one side, a slab under the rocket, and a wider base.
    const drawPad = () => {
      const col: [number, number, number] = ink;
      const u = Q;
      for (let i = 0; i < 13; i++) dot(cx - 5 * u + u / 2, gy - u - i * u - u / 2 + u, u * 0.36, col, 0.55, 1);
      for (const h of [4, 8]) dot(cx - 4 * u + u / 2, gy - h * u - u / 2, u * 0.34, col, 0.55, 1);
      for (let i = -5; i <= 5; i++) dot(cx + i * u, gy - u / 2, u * 0.4, col, 0.8, 1);
      for (let i = -7; i <= 7; i++) dot(cx + i * u, gy + u / 2, u * 0.4, col, 0.55, 1);
    };

    let parts: P[] = [];
    let last = 0;
    let cycle = -1;
    let acc = [0, 0, 0]; // spawn accumulators: pad smoke, flame, trail smoke

    const spawnSmoke = (x: number, y: number, vx: number, vy: number, r1: number, life: number) =>
      parts.push({ x, y, vx, vy, age: 0, life, r0: P_ * 0.7, r1, kind: 0, seed: Math.floor(Math.random() * 9999) });

    const frame = (t: number, dt: number) => {
      if (!field) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(field, 0, 0, W, H);

      const rx = cx - 3.5 * Q;
      const ry0 = gy - Q - ROCKET.length * Q;
      const dist = ry0 + ROCKET.length * Q + Q * 3;
      const tc = Math.max(0, Math.min(1, (t - LIFTOFF) / climb));
      const lift = dist * Math.pow(tc, 2.15);
      const burning = t >= IGNITE && t < LIFTOFF + climb * 0.82;
      const gone = t >= LIFTOFF + climb;
      const shake = t >= IGNITE && t < LIFTOFF ? Math.sin(t * 90) * 1.3 : 0;
      const ry = ry0 - lift;

      // spawn
      if (!still && dt > 0) {
        const padRate = t < IGNITE ? 7 : t < LIFTOFF ? 95 : t < LIFTOFF + 2.4 ? 70 : t < LIFTOFF + 3.6 ? 22 : 4;
        acc[0] += padRate * rateK * dt;
        while (acc[0] >= 1) {
          acc[0]--;
          const dir = Math.random() < 0.5 ? -1 : 1;
          spawnSmoke(cx + (Math.random() - 0.5) * 9 * Q, gy - Q * 0.6, dir * (35 + Math.random() * 150), -(8 + Math.random() * 46), 26 + Math.random() * 30, 2 + Math.random() * 1.8);
        }
        if (burning) {
          acc[1] += 150 * rateK * dt;
          while (acc[1] >= 1) {
            acc[1]--;
            parts.push({ x: cx + (Math.random() - 0.5) * 2.6 * Q, y: ry + ROCKET.length * Q + 2, vx: (Math.random() - 0.5) * 44, vy: 190 + Math.random() * 170, age: 0, life: 0.32 + Math.random() * 0.4, r0: Q * 0.42, r1: Q * 0.1, kind: 1, seed: 0 });
          }
          if (t >= LIFTOFF) {
            acc[2] += 26 * rateK * dt;
            while (acc[2] >= 1) {
              acc[2]--;
              spawnSmoke(cx + (Math.random() - 0.5) * 1.6 * Q, ry + ROCKET.length * Q + 10, (Math.random() - 0.5) * 36, 18 + Math.random() * 30, 14 + Math.random() * 14, 1.6 + Math.random() * 1.2);
            }
          }
        }
      }

      // smoke (back), then the pad and rocket, then flame (front)
      for (const p of parts) {
        if (p.kind !== 0) continue;
        const k = p.age / p.life;
        const R = p.r0 + (p.r1 - p.r0) * Math.sqrt(k);
        const a = (1 - k) * 0.62;
        const px = Math.round(p.x / P_) * P_;
        const py = Math.round(p.y / P_) * P_;
        const n = Math.ceil(R / P_);
        for (let j = -n; j <= n; j++)
          for (let i = -n; i <= n; i++) {
            const d = Math.hypot(i, j) * P_;
            if (d > R) continue;
            if (hash(p.seed + i * 31, j * 17 + Math.floor(p.age * 6)) > Math.pow(1 - d / R, 0.55) * 1.15) continue;
            dot(px + i * P_, py + j * P_, P_ * 0.32, ink, a, 0.9 * (1 - k));
          }
      }
      drawPad();
      if (!gone) {
        const rAlpha = t > LOOP - 0.9 ? (t - (LOOP - 0.9)) / 0.9 : 1;
        sprite(ROCKET, rx + shake, ry, Q, ink, Math.max(0, rAlpha));
      }
      for (const p of parts) {
        if (p.kind !== 1) continue;
        const k = p.age / p.life;
        const R = p.r0 + (p.r1 - p.r0) * k;
        const c: [number, number, number] = k < 0.7 ? ink : muted; // the flame: bright core, grey tail
        dot(p.x, p.y, R, c, 1 - k * 0.8, 1);
      }

      // update
      if (dt > 0) {
        for (const p of parts) {
          p.age += dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.kind === 0) {
            p.vx *= 1 - 0.7 * dt;
            p.vy -= 12 * dt;
          }
        }
        parts = parts.filter((p) => p.age < p.life);
      }
    };

    let raf = 0;
    let t0 = 0;
    let visible = true;
    const loop = (now: number) => {
      if (!visible) return;
      if (!t0) t0 = now;
      const el = (now - t0) / 1000;
      const t = el % LOOP;
      const cyc = Math.floor(el / LOOP);
      if (cyc !== cycle) {
        cycle = cyc;
        parts = [];
        acc = [0, 0, 0];
      }
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (Math.floor(el * 2) % 30 === 0) colours();
      frame(t, dt);
      raf = requestAnimationFrame(loop);
    };

    let ro: ResizeObserver | undefined;
    let io: IntersectionObserver | undefined;
    const start = () => {
      buildField();
      if (still) {
        frame(1.2, 0);
        return;
      }
      io = new IntersectionObserver(([e]) => {
        visible = !!e?.isIntersecting;
        if (visible) {
          last = 0;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      });
      io.observe(cv);
    };
    const rebuild = () => {
      buildField();
      if (still) frame(1.2, 0);
    };
    (document.fonts?.load(`800 100px "Manrope Variable"`) ?? Promise.resolve()).then(start, start);
    ro = new ResizeObserver(() => {
      if (field) rebuild();
    });
    ro.observe(cv);
    // Theme change: rebuild the dots in the new colours.
    const mo = new MutationObserver(() => rebuild());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", rebuild);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", rebuild);
    };
  }, [name]);

  return <canvas ref={ref} className="launch-canvas" aria-hidden="true" />;
}
