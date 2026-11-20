"use client";

import Image from "next/image";
import { useState } from "react";
import { models, type ModelFacts, type ModelId } from "@/data/models";
import type { Dictionary } from "@/i18n";

// Layers from the centre out: flagship, Arabic, mid-size and speech, small, everything else.
// Every layer is one or more real rings: logos sit evenly spaced on the circle line itself.
// The flagship layer is a centre logo plus two rings. Rings are equally far apart, like a radar
// target, and the logo size comes from the tightest ring so every ring has the same breathing space.
// Sizes and distances are percentages of the orbit width.
const SIZE = [1, 1, 0.95, 0.9, 0.85]; // logo size per layer, relative
const CLEAR = 1.45; // minimum distance between neighbours on a ring, in logo widths
const RADIAL = 1.45; // minimum distance between rings, in logo widths
const EDGE = 48.5; // the outermost logo must end inside this radius
const TURN = 160; // seconds for one full clockwise turn. Every ring turns together, so the pattern holds its shape.

type Ring = { layer: number; models: ModelFacts[]; r: number; tile: number; start: number; turn: number };

// How many logos go on each ring of a layer.
function plan(n: number, layer: number) {
  if (layer === 0 && n >= 12) return [1, 6, n - 7];
  if (layer === 0 && n >= 8) return [1, n - 1];
  if (n > 12 && layer !== 3) {
    const inner = Math.round(n * 0.4);
    return [inner, n - inner];
  }
  return [n];
}

function build(byLayer: ModelFacts[][]) {
  const specs: { layer: number; models: ModelFacts[]; j: number }[] = [];
  byLayer.forEach((list, layer) => {
    let at = 0;
    plan(list.length, layer).forEach((count, j) => {
      if (count > 0) specs.push({ layer, models: list.slice(at, at + count), j });
      at += count;
    });
  });
  const centred = specs[0]?.models.length === 1;
  const circles = specs.length - (centred ? 1 : 0); // rings drawn as circles
  // Equal steps between rings. Find the logo size and step that satisfy every ring.
  let T = 6;
  let step = EDGE / circles;
  for (let i = 0; i < 6; i++) {
    step = (EDGE - 0.6 * T * SIZE[specs[specs.length - 1]!.layer]!) / circles;
    let best = Infinity;
    specs.forEach((sp, idx) => {
      const k = centred ? idx : idx + 1; // 0 for the centre logo
      if (k === 0) return;
      const n = sp.models.length;
      const chord = 2 * k * step * Math.sin(Math.PI / n);
      best = Math.min(best, chord / (CLEAR * SIZE[sp.layer]!));
      const prev = specs[idx - 1];
      if (prev) best = Math.min(best, (2 * step) / (RADIAL * (SIZE[sp.layer]! + SIZE[prev.layer]!)));
    });
    T = best;
  }
  return specs.map((sp, idx): Ring => {
    const k = centred ? idx : idx + 1;
    return {
      layer: sp.layer,
      models: sp.models,
      r: k === 0 ? 0 : k * step,
      tile: T * SIZE[sp.layer]!,
      start: -90,
      turn: TURN,
    };
  });
}

const r2 = (n: number) => Math.round(n * 100) / 100;
const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: r2(50 + r * Math.cos(a)), y: r2(50 + r * Math.sin(a)) };
};

function Logo({ m, size }: { m: ModelFacts; size?: number }) {
  return (
    <span className="m-logo" style={size ? { width: size, height: size } : undefined}>
      <Image src={`/images/models/${m.logo}.webp`} alt="" width={128} height={128} />
    </span>
  );
}

export function ModelOrbit({ t }: { t: Dictionary["models"] }) {
  const [sel, setSel] = useState<ModelId>("jais-2-70b");
  const info = (id: ModelId) => t.items.find((i) => i.id === id)!;
  const cur = models.find((m) => m.id === sel)!;
  const curInfo = info(sel);
  const byRing = [0, 1, 2, 3, 4].map((r) => models.filter((m) => m.ring === r));
  const ringList = build(byRing);

  return (
    <div className="models">
      <div className="orbit-wrap">
        {/* Desktop: the orbit */}
        <div className="orbit" role="group" aria-label={t.title}>
          <svg className="orbit-rings" viewBox="0 0 100 100" aria-hidden="true">
            {ringList
              .filter((rg) => rg.r > 0)
              .map((rg, i) => (
                <circle
                  key={i}
                  className={`orbit-ring ring-${rg.layer}`}
                  cx="50"
                  cy="50"
                  r={r2(rg.r)}
                  style={{ animationDuration: `${rg.turn}s` }}
                />
              ))}
          </svg>
          {ringList.map((rg, ri) => (
            <div key={ri} className="orbit-layer" style={{ animationDuration: `${rg.turn}s` }}>
              {rg.models.map((m, k) => {
                const pos = rg.r === 0 ? { x: 50, y: 50 } : at(rg.r, rg.start + (k * 360) / rg.models.length);
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`node-m ring-${rg.layer}${sel === m.id ? " is-sel" : ""}`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, ["--tile" as string]: String(r2(rg.tile)) }}
                    aria-pressed={sel === m.id}
                    aria-label={m.name}
                    onMouseEnter={() => setSel(m.id)}
                    onFocus={() => setSel(m.id)}
                    onClick={() => setSel(m.id)}
                  >
                    {/* Turns the other way at the same speed, so the logo stays upright. */}
                    <span className="node-inner" style={{ animationDuration: `${rg.turn}s` }}>
                      <Logo m={m} />
                      <span className="node-name">{m.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Phones: the same models as three tiers */}
        <div className="tier-lists">
          {t.tiers.map((tier, ri) => byRing[ri]!.length > 0 && (
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
        </div>
      </div>

      <aside className="model-panel">
        <div className="model-card" aria-live="polite">
          <p className="model-tier">
            <span className="tier-dot" aria-hidden="true">
              <i style={{ width: [20, 17, 14, 11, 8][cur.ring], height: [20, 17, 14, 11, 8][cur.ring] }} />
            </span>
            <span className="tier-text">
              <b>{t.tiers[cur.ring]!.label}</b> · {t.tiers[cur.ring]!.range}
            </span>
          </p>
          <div className="model-card-head">
            <Logo m={cur} size={52} />
            <div>
              <h3>{cur.name}</h3>
              <p>
                {t.labels.maker} <bdi>{cur.maker}</bdi>
              </p>
            </div>
          </div>
          <span className="chip chip-hot">{curInfo.tag}</span>
          <p className="model-use">{curInfo.use}</p>
          <dl className="model-facts">
            {cur.size && (
              <div>
                <dt>{t.labels.size}</dt>
                <dd dir="ltr">{cur.size}</dd>
              </div>
            )}
            {cur.active && (
              <div>
                <dt>{t.labels.active}</dt>
                <dd dir="ltr">{cur.active}</dd>
              </div>
            )}
            <div>
              <dt>{t.labels.license}</dt>
              <dd dir="ltr">{cur.license}</dd>
            </div>
            {cur.context && (
              <div>
                <dt>{t.labels.context}</dt>
                <dd dir="ltr">{cur.context}</dd>
              </div>
            )}
            <div className="wide">
              <dt>{t.labels.runs}</dt>
              <dd>{curInfo.runs}</dd>
            </div>
          </dl>
        </div>
        <p className="models-hint">{t.hint}</p>
      </aside>
    </div>
  );
}
