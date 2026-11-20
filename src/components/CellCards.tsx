import type { ReactNode } from "react";

// Cards laid out as one dashed grid: an icon top left, the title and text at the bottom, and a faint
// pixel-grid corner that lights up a little on hover. Used wherever a short list of points is shown.
export type CellIcon = "docs" | "lang" | "log" | "api" | "limits" | "open" | "pin" | "shield" | "price" | "exit";

const ICONS: Record<CellIcon, ReactNode> = {
  docs: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  lang: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </>
  ),
  log: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  api: <path d="m5 7 5 5-5 5M12 17h7" />,
  limits: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  open: <path d="M15 3h6v6M10 14 21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  price: (
    <>
      <path d="M3 12V4h8l10 10-8 8z" />
      <circle cx="7.5" cy="8.5" r="1.2" />
    </>
  ),
  exit: <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M16 8l4 4-4 4M20 12H9" />,
};

const hash = (a: number, b: number, c: number) => {
  let x = Math.imul(a + 1, 374761393) ^ Math.imul(b + 7, 668265263) ^ Math.imul(c + 13, 2246822519);
  x = Math.imul(x ^ (x >>> 13), 1274126177);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
};

// An 8 × 5 field of 40-unit cells: grid lines, a few cells shaded, two that light up on hover.
function CellArt({ seed }: { seed: number }) {
  const shaded: ReactNode[] = [];
  const lit: ReactNode[] = [];
  for (let y = 0; y < 5; y++)
    for (let x = 0; x < 8; x++) {
      const v = hash(seed, x, y);
      if (v > 0.74) shaded.push(<rect key={`s${x}-${y}`} x={x * 40} y={y * 40} width="40" height="40" opacity={0.25 + v * 0.45} />);
      else if (v < 0.05) lit.push(<rect key={`l${x}-${y}`} className="cell-lit" x={x * 40} y={y * 40} width="40" height="40" />);
    }
  const lines = Array.from({ length: 9 }, (_, i) => `M${i * 40} 0V200`).join("") + Array.from({ length: 6 }, (_, i) => `M0 ${i * 40}H320`).join("");
  return (
    <svg className="cell-art" viewBox="0 0 320 200" preserveAspectRatio="xMaxYMin slice" aria-hidden="true">
      <g fill="currentColor">{shaded}</g>
      <g>{lit}</g>
      <path d={lines} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

export function CellCards({ items, cols = 3 }: { items: { icon: CellIcon; title: string; text: string }[]; cols?: 2 | 3 }) {
  return (
    <div className={`cells cells-${cols}`}>
      {items.map((it, i) => (
        <article key={it.title} className="cell">
          <CellArt seed={i + 3} />
          <svg className="cell-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ICONS[it.icon]}
          </svg>
          <div className="cell-body">
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
