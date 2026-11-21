"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";

// The pilot as a Gantt chart: a week axis (0 to the last week in the copy) across the top, one bar per phase spanning its weeks, and a
// decision milestone at the end. Bar positions come from the "Weeks 2–3" text of each step, so the copy stays the
// single source. It draws on the same dashed grid as the rest of the site, and the bars grow in once, when scrolled to.
// A toggle above it switches between the plans in the copy (private cloud and on-premises take different lengths).
const weeksOf = (when: string): [number, number] => {
  const n = (when.match(/\d+/g) ?? ["0"]).map(Number);
  return [n[0]!, n[n.length - 1]!];
};

export function PilotGantt({ t }: { t: Dictionary["pilot"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const id = useId();
  const [p, setP] = useState(0);
  const plan = t.plans[p]!;
  const WEEKS = Math.max(...plan.steps.map((s) => weeksOf(s.when)[1])) + 1; // weeks 0 to the last one
  const cells = Array.from({ length: WEEKS }, (_, w) => (
    <i
      key={w}
      className="gantt-cell"
      style={{ gridColumn: w + 1 }}
      aria-hidden="true"
    />
  ));

  return (
    <>
      <div className="tabs pilot-toggle" role="tablist" aria-label={t.toggle}>
        {t.plans.map((x, n) => (
          <button
            key={x.name}
            id={`${id}-t${n}`}
            role="tab"
            type="button"
            className="tab"
            aria-selected={n === p}
            aria-controls={`${id}-p`}
            tabIndex={n === p ? 0 : -1}
            onClick={() => setP(n)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const next = (p + 1) % t.plans.length;
              setP(next);
              document.getElementById(`${id}-t${next}`)?.focus();
            }}
          >
            {x.name} <span className="pilot-len">· {x.length}</span>
          </button>
        ))}
      </div>
      <div
        id={`${id}-p`}
        data-plan={plan.inquiry}
        ref={ref}
        className={`gantt${seen || reduce ? " is-in" : ""}`}
        style={{ ["--weeks" as string]: WEEKS }}
        role="table"
        aria-label={`${t.title}: ${plan.name}`}
      >
        <div className="gantt-row gantt-head" role="row">
          <div className="gantt-label" role="columnheader">
            {t.weekLabel}
          </div>
          <div className="gantt-track" role="presentation">
            {Array.from({ length: WEEKS }, (_, w) => (
              <span
                key={w}
                className="gantt-week"
                style={{ gridColumn: w + 1 }}
                role="columnheader"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {plan.steps.map((s, i) => {
          const [a, b] = weeksOf(s.when);
          return (
            <div key={`${p}-${s.title}`} className="gantt-row" role="row">
              <div className="gantt-label" role="rowheader">
                <span className="gantt-when">{s.when}</span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </div>
              <div className="gantt-track" role="cell">
                {cells}
                <span
                  className="gantt-bar"
                  style={{
                    gridColumn: `${a + 1} / ${b + 2}`,
                    ["--i" as string]: i,
                  }}
                >
                  <em>{s.when}</em>
                </span>
              </div>
            </div>
          );
        })}

        <div className="gantt-row gantt-end" role="row">
          <div className="gantt-label" role="rowheader">
            <b>{t.decision.title}</b>
            <span>{t.decision.text}</span>
          </div>
          <div className="gantt-track" role="cell">
            {cells}
            <span
              className="gantt-flag"
              style={{
                gridColumn: WEEKS,
                ["--i" as string]: plan.steps.length,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </>
  );
}
