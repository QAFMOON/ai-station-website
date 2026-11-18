"use client";

import Image from "next/image";
import { useState } from "react";
import { models, type ModelFacts, type ModelId } from "@/data/models";
import type { Dictionary } from "@/i18n";

// Layers from the centre out: flagship, Arabic, mid-size and speech, small, everything else.
// Each layer is a band filled with models on one or more sub-rings, so any number of models fits.
// Sizes and distances are percentages of the orbit width.
const TILE = [5.1, 5.7, 4.5, 4.0, 3.6]; // logo size per layer
const GAP = 2.6; // space between layers
const FILL = 0.64; // how full a band is allowed to be
const TARGET = 46.5; // outer edge of the last layer

type Placed = { id: ModelId; x: number; y: number; tile: number; layer: number };

const r2 = (n: number) => Math.round(n * 100) / 100;

function layout(byLayer: ModelFacts[][], spacing: number) {
  const placed: Placed[] = [];
  const edges: number[] = [];
  let rIn = 0;
  byLayer.forEach((list, li) => {
    const n = list.length;
    if (!n) {
      edges.push(rIn);
      return;
    }
    const cell = TILE[li]! * spacing;
    const minStep = cell * 0.95;
    let rOut = Math.sqrt(rIn * rIn + (n * cell * cell) / (FILL * Math.PI));
    let radii: number[] = [];
    let cap: number[] = [];
    for (let tries = 0; tries < 40; tries++) {
      const band = rOut - rIn;
      const m = Math.max(1, Math.floor((band - cell) / minStep) + 1);
      radii = Array.from({ length: m }, (_, k) => (m === 1 ? (rIn + rOut) / 2 : rIn + cell / 2 + (k * (band - cell)) / (m - 1)));
      cap = radii.map((r) => Math.max(1, Math.floor((2 * Math.PI * r) / (cell * 0.92))));
      if (cap.reduce((a, b) => a + b, 0) >= n) break;
      rOut += cell * 0.25;
    }
    const sum = radii.reduce((a, b) => a + b, 0);
    const counts = radii.map((r, k) => Math.min(cap[k]!, Math.max(1, Math.round((n * r) / sum))));
    let total = counts.reduce((a, b) => a + b, 0);
    while (total > n) {
      const k = counts.indexOf(Math.max(...counts));
      counts[k]!--;
      total--;
    }
    while (total < n) {
      let k = 0;
      let best = -1;
      radii.forEach((r, i) => {
        const room = cap[i]! - counts[i]!;
        if (room > 0 && r / counts[i]! > best) {
          best = r / counts[i]!;
          k = i;
        }
      });
      counts[k]!++;
      total++;
    }
    let idx = 0;
    radii.forEach((r, k) => {
      for (let j = 0; j < counts[k]!; j++) {
        const deg = -90 + li * 23 + k * 47 + (j * 360) / counts[k]!;
        const rad = (deg * Math.PI) / 180;
        placed.push({ id: list[idx++]!.id, x: r2(50 + r * Math.cos(rad)), y: r2(50 + r * Math.sin(rad)), tile: TILE[li]!, layer: li });
      }
    });
    edges.push(rOut);
    rIn = rOut + GAP;
  });
  return { placed, edges, outer: edges[edges.length - 1]! };
}

// Find the spacing that makes the last layer end at TARGET.
function build(byLayer: ModelFacts[][]) {
  let lo = 1.05;
  let hi = 3;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (layout(byLayer, mid).outer > TARGET) hi = mid;
    else lo = mid;
  }
  return layout(byLayer, lo);
}

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
  const { placed, edges } = build(byRing);

  return (
    <div className="models">
      <div className="orbit-wrap">
        {/* Desktop: the orbit */}
        <div className="orbit" role="group" aria-label={t.title}>
          <svg className="orbit-rings" viewBox="0 0 100 100" aria-hidden="true">
            {edges.map((e, i) => (
              <circle
                key={i}
                className={`orbit-ring ring-${i}${i === 0 || i === 1 ? " gold" : ""}`}
                cx="50"
                cy="50"
                r={r2(e + GAP / 2)}
                style={{ animationDuration: `${40 + i * 25}s` }}
              />
            ))}
          </svg>
          {placed.map((pl) => {
            const m = models.find((x) => x.id === pl.id)!;
            return (
              <button
                key={m.id}
                type="button"
                className={`node-m ring-${pl.layer}${sel === m.id ? " is-sel" : ""}`}
                style={{ left: `${pl.x}%`, top: `${pl.y}%`, ["--tile" as string]: String(pl.tile) }}
                aria-pressed={sel === m.id}
                aria-label={m.name}
                onMouseEnter={() => setSel(m.id)}
                onFocus={() => setSel(m.id)}
                onClick={() => setSel(m.id)}
              >
                <Logo m={m} />
                <span className="node-name">{m.short}</span>
              </button>
            );
          })}
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
