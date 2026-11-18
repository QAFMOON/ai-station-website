"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/i18n";

const order = ["onprem", "connected", "private", "shared"] as const;
type Mode = (typeof order)[number];

// One main curve rising left to right with a node per deployment option, plus two
// fainter curves for depth. Node positions are computed on the cubic Bezier so they
// sit exactly on the line at any width; labels stay HTML so they are crisp and translatable.
const W = 1000;
const H = 380;
const P = [
  [0, 372],
  [380, 372],
  [600, 70],
  [1000, 16],
] as const;
const at = (t: number) => {
  const u = 1 - t;
  const f = (i: 0 | 1) => u ** 3 * P[0][i] + 3 * u * u * t * P[1][i] + 3 * u * t * t * P[2][i] + t ** 3 * P[3][i];
  return { x: (f(0) / W) * 100, y: (f(1) / H) * 100 };
};
const ts = [0.1, 0.38, 0.64, 0.88];
const nodes = Object.fromEntries(order.map((m, i) => [m, at(ts[i]!)])) as Record<Mode, { x: number; y: number }>;

export function DeployMap({ t }: { t: Dictionary["picker"] }) {
  const [mode, setMode] = useState<Mode>("onprem");
  const id = useId();
  const inside = mode === "onprem" || mode === "connected";
  const outsideItem = mode === "connected" ? t.control : mode === "private" ? t.dedicated : mode === "shared" ? t.sharedServer : t.nothing;

  return (
    <section className="map" aria-labelledby={`${id}-h`}>
      <p id={`${id}-h`} className="sr-only">
        {t.title}. {t.hint}
      </p>
      <div className="map-stage">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path className="map-path faint" d="M0 372 C 300 372, 520 360, 700 318 S 900 260, 1000 236" />
          <path className="map-path faint" d="M0 372 C 200 372, 330 330, 470 240 S 760 130, 1000 90" />
          <path className="map-path is-live" d={`M${P[0][0]} ${P[0][1]} C ${P[1][0]} ${P[1][1]}, ${P[2][0]} ${P[2][1]}, ${P[3][0]} ${P[3][1]}`} />
        </svg>
        <div role="tablist" aria-label={t.title}>
          {order.map((m, i) => (
            <button
              key={m}
              role="tab"
              type="button"
              className={`node${i <= order.indexOf(mode) ? " is-reached" : ""}`}
              aria-selected={mode === m}
              style={{ insetInlineStart: `${nodes[m].x}%`, top: `${nodes[m].y}%` }}
              onClick={() => setMode(m)}
            >
              <i />
              <span>{t.modes[m].tab}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="map-info" role="tabpanel">
        <div>
          <h3 className="map-title">{t.modes[mode].tab}</h3>
          <p>{t.modes[mode].text}</p>
          <p className="link-line">↔ {t.modes[mode].link}</p>
        </div>
        <div className="map-zones">
          <div className="zone">
            <b>{t.inside}</b>
            <div className="chips">
              <span className="chip">{t.staff}</span>
              <span className="chip">{t.docs}</span>
              {inside && <span className="chip chip-hot">{t.server}</span>}
            </div>
          </div>
          <div className="zone">
            <b>{t.outside}</b>
            <div className="chips">
              <span className={inside && mode === "onprem" ? "chip" : inside ? "chip" : "chip chip-hot"}>{outsideItem}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
