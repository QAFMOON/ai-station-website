"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/i18n";

// The pilot as a Gantt chart: a week axis (0 to the last week in the copy) across the top, one bar per phase spanning its weeks, and a
// decision milestone at the end. Bar positions come from the "Weeks 2–3" text of each step, so the copy stays the
// single source. It draws on the same dashed grid as the rest of the site, and the bars grow in once, when scrolled to.
const weeksOf = (when: string): [number, number] => {
  const n = (when.match(/\d+/g) ?? ["0"]).map(Number);
  return [n[0]!, n[n.length - 1]!];
};

export function PilotGantt({ t }: { t: Dictionary["pilot"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const WEEKS = Math.max(...t.steps.map((s) => weeksOf(s.when)[1])) + 1; // weeks 0 to the last one
  const cells = Array.from({ length: WEEKS }, (_, w) => <i key={w} className="gantt-cell" style={{ gridColumn: w + 1 }} aria-hidden="true" />);

  return (
    <div ref={ref} className={`gantt${seen || reduce ? " is-in" : ""}`} style={{ ["--weeks" as string]: WEEKS }} role="table" aria-label={t.title}>
      <div className="gantt-row gantt-head" role="row">
        <div className="gantt-label" role="columnheader">
          {t.weekLabel}
        </div>
        <div className="gantt-track" role="presentation">
          {Array.from({ length: WEEKS }, (_, w) => (
            <span key={w} className="gantt-week" style={{ gridColumn: w + 1 }} role="columnheader">
              {w}
            </span>
          ))}
        </div>
      </div>

      {t.steps.map((s, i) => {
        const [a, b] = weeksOf(s.when);
        return (
          <div key={s.title} className="gantt-row" role="row">
            <div className="gantt-label" role="rowheader">
              <span className="gantt-when">{s.when}</span>
              <b>{s.title}</b>
              <span>{s.text}</span>
            </div>
            <div className="gantt-track" role="cell">
              {cells}
              <span className="gantt-bar" style={{ gridColumn: `${a + 1} / ${b + 2}`, ["--i" as string]: i }}>
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
          <span className="gantt-flag" style={{ gridColumn: WEEKS, ["--i" as string]: t.steps.length }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
