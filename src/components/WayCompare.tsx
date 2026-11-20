import type { Dictionary } from "@/i18n";

// The two ways to run it, compared in one dashed grid: a column for each way, a row for each point,
// a check or a cross with a short note under it. Drawn with the same dashed line as the rest of the site.
const ICONS: Record<string, React.ReactNode> = {
  building: (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6M9 11h.01M15 11h.01" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.75 4.75 0 0 1 .5 9.5H7z" />,
};

function Mark({ ok }: { ok: boolean }) {
  return (
    <svg className="way-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ok ? <path d="m5 12.5 4.5 4.5L19 7" /> : <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />}
    </svg>
  );
}

export function WayCompare({ t }: { t: Dictionary["where"] }) {
  return (
    <div className="ways" role="table" aria-label={t.title}>
      <div className="ways-row ways-head" role="row">
        <div className="ways-corner" role="columnheader" />
        {t.options.map((o) => (
          <div key={o.name} className="ways-col" role="columnheader">
            <svg className="way-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[o.icon]}
            </svg>
            <b>{o.name}</b>
            <span>{o.sub}</span>
          </div>
        ))}
      </div>
      {t.rows.map((r) => (
        <div key={r.label} className="ways-row" role="row">
          <div className="ways-label" role="rowheader">
            {r.label}
          </div>
          {r.cells.map((c, i) => (
            <div key={i} className={c.ok ? "ways-cell is-yes" : "ways-cell is-no"} role="cell">
              <Mark ok={c.ok} />
              <span>
                <span className="sr-only">{c.ok ? "✓ " : "✗ "}</span>
                {c.text}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="ways-row ways-best" role="row">
        <div className="ways-label" role="rowheader">
          {t.bestLabel}
        </div>
        {t.best.map((b) => (
          <div key={b} className="ways-cell" role="cell">
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
