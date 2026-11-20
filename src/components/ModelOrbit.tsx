"use client";

import { useEffect, useRef, useState } from "react";
import { models, type ModelFacts, type ModelId } from "@/data/models";
import type { Dictionary } from "@/i18n";

// Arcs rising from the bottom, like a dome: a particle globe in the middle, four arcs of logos
// around it (flagship, Arabic, mid-size and speech, small and more). Every arc turns clockwise;
// logos counter-turn so they stay upright. Hovering a logo pauses everything and opens its card.
// Distances are in percent of the stage width (cqw).
const RADII = [40, 49, 58, 67];
const TURN = [150, 190, 230, 270]; // seconds per full clockwise turn
const r2 = (n: number) => Math.round(n * 100) / 100;
const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: r2(50 + r * Math.cos(a)), y: r2(50 + r * Math.sin(a)) };
};

function Logo({ m, size }: { m: ModelFacts; size?: number }) {
  return (
    <span className="m-logo" style={size ? { width: size, height: size } : undefined}>
      {/* A plain image: the logos are already small, and it always loads inside the hover card. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/models/${m.logo}.webp`} alt="" width={128} height={128} loading="eager" decoding="async" />
    </span>
  );
}

// A dense shell of dots, turning slowly. Only its top half shows: the stage cuts it at the bottom.
function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 6500;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      const k = 0.8 + rnd() * 0.2;
      const t = rnd();
      return { x: Math.cos(th) * rad * k, y: y * k, z: Math.sin(th) * rad * k, tone: t < 0.5 ? 0 : t < 0.8 ? 1 : 2, d: 0.7 + rnd() * 1.1 };
    });
    let raf = 0;
    let ang = 0.6;
    let cols: string[] = [];
    const draw = () => {
      const s = cv.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (cv.width !== Math.round(s * dpr)) {
        cv.width = Math.round(s * dpr);
        cv.height = Math.round(s * dpr);
        const cs = getComputedStyle(cv);
        cols = [cs.getPropertyValue("--g1"), cs.getPropertyValue("--g2"), cs.getPropertyValue("--g3")].map((c) => c.trim());
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, s, s);
      const R = s * 0.5;
      const c = Math.cos(ang);
      const sn = Math.sin(ang);
      for (const p of pts) {
        const x = p.x * c + p.z * sn;
        const z = -p.x * sn + p.z * c;
        ctx.globalAlpha = 0.3 + 0.7 * ((z + 1) / 2);
        ctx.fillStyle = cols[p.tone] || "#888";
        const d = p.d * (s / 480);
        ctx.fillRect(s / 2 + x * R, s / 2 + p.y * R, d, d);
      }
      if (!still) {
        ang += 0.002;
        raf = requestAnimationFrame(draw);
      }
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="orbit-globe" aria-hidden="true" />;
}

type Tip = { id: ModelId; x: number; y: number; below: boolean };

export function ModelOrbit({ t }: { t: Dictionary["models"] }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const [sel, setSel] = useState<ModelId>("jais-2-70b");
  const wrapRef = useRef<HTMLDivElement>(null);
  const info = (id: ModelId) => t.items.find((i) => i.id === id)!;
  const byRing = [0, 1, 2, 3].map((r) => models.filter((m) => m.ring === r));

  const open = (m: ModelFacts, el: HTMLElement) => {
    const o = wrapRef.current;
    if (!o) return;
    const ob = o.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    const cy = b.top + b.height / 2 - ob.top;
    const below = cy < ob.height * 0.55;
    setTip({
      id: m.id,
      x: Math.min(Math.max(b.left + b.width / 2 - ob.left, 170), ob.width - 170),
      y: below ? b.bottom - ob.top + 12 : b.top - ob.top - 12,
      below,
    });
  };

  const Card = ({ id }: { id: ModelId }) => {
    const m = models.find((x) => x.id === id)!;
    const i = info(id);
    return (
      <div className="model-card">
        <p className="model-tier">
          <span className="tier-text">
            <b>{t.tiers[m.ring]!.label}</b> · {t.tiers[m.ring]!.range}
          </span>
        </p>
        <div className="model-card-head">
          <Logo m={m} size={52} />
          <div>
            <h3>{m.name}</h3>
            <p>
              {t.labels.maker} <bdi>{m.maker}</bdi>
            </p>
          </div>
        </div>
        <span className="chip chip-hot">{i.tag}</span>
        <p className="model-use">{i.use}</p>
        <dl className="model-facts">
          {m.size && (
            <div>
              <dt>{t.labels.size}</dt>
              <dd dir="ltr">{m.size}</dd>
            </div>
          )}
          {m.active && (
            <div>
              <dt>{t.labels.active}</dt>
              <dd dir="ltr">{m.active}</dd>
            </div>
          )}
          <div>
            <dt>{t.labels.license}</dt>
            <dd dir="ltr">{m.license}</dd>
          </div>
          {m.context && (
            <div>
              <dt>{t.labels.context}</dt>
              <dd dir="ltr">{m.context}</dd>
            </div>
          )}
          <div className="wide">
            <dt>{t.labels.runs}</dt>
            <dd>{i.runs}</dd>
          </div>
        </dl>
      </div>
    );
  };

  return (
    <div className="models">
      <h2 className="h2 models-title-h">{t.title}</h2>
      <p className="section-lead models-lead">{t.lead}</p>

      <div className={`orbit-wrap${tip ? " is-paused" : ""}`} ref={wrapRef}>
        <div className="orbit" role="group" aria-label={t.title}>
          <svg className="orbit-arcs" viewBox="0 0 100 72" preserveAspectRatio="none" aria-hidden="true">
            {RADII.map((r) => (
              <circle key={r} cx="50" cy="72" r={r} className="orbit-arc" />
            ))}
          </svg>
          <Globe />
          {byRing.map((list, ri) => (
            <div
              key={ri}
              className={`orbit-layer ring-${ri}`}
              style={{ ["--r" as string]: String(RADII[ri]), animationDuration: `${TURN[ri]}s` }}
            >
              {list.map((m, k) => {
                const pos = at(50, -90 + (ri % 2 ? 180 / list.length : 0) + (k * 360) / list.length);
                return (
                  <button
                    key={m.id}
                    type="button"
                    className="node-m"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    aria-label={m.name}
                    aria-describedby={tip?.id === m.id ? "model-tip" : undefined}
                    onMouseEnter={(e) => open(m, e.currentTarget)}
                    onFocus={(e) => open(m, e.currentTarget)}
                    onMouseLeave={() => setTip(null)}
                    onBlur={() => setTip(null)}
                    onClick={(e) => open(m, e.currentTarget)}
                  >
                    {/* Turns the other way at the same speed, so the logo stays upright. */}
                    <span className="node-inner" style={{ animationDuration: `${TURN[ri]}s` }}>
                      <Logo m={m} />
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {tip && (
          <div id="model-tip" role="tooltip" className={`model-pop${tip.below ? " below" : ""}`} style={{ left: tip.x, top: tip.y }}>
            <Card id={tip.id} />
          </div>
        )}
      </div>

      <div className="tier-lists">
        {t.tiers.map((tier, ri) => (
          <div key={tier.label} className={`tier-list ring-${ri}`}>
            <p className="tier-head">
              <b>{tier.label}</b> · {tier.range}
            </p>
            <div className="tier-grid">
              {byRing[ri]!.map((m) => (
                <button key={m.id} type="button" className={`tier-item${sel === m.id ? " is-sel" : ""}`} aria-pressed={sel === m.id} onClick={() => setSel(m.id)}>
                  <Logo m={m} size={36} />
                  <span>{m.short}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="model-static">
          <Card id={sel} />
        </div>
      </div>
    </div>
  );
}
