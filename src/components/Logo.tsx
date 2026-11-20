// Dot mark from the brand logo: a 9×9 field, filled cells only.
// On hover it lifts off along its own diagonal with a shake, leaving a trail of dotted smoke, then comes back in
// from below (all in CSS, see .logo in globals.css). There is no launch pad: just the rocket and its smoke.
const ROWS = [
  "......###",
  ".....####",
  "....##.##",
  ".#######.",
  "#######..",
  "...###...",
  ".#..##...",
  "###.##...",
  "##..#....",
];

// Smoke puffs along the path the tail takes. Each starts when the rocket has travelled that far (it speeds up as it climbs).
const D = 4.2; // how far the mark travels, in drawing units
const LIFT_AT = 0.43; // seconds into the 2.4s cycle when it leaves
const LIFT_FOR = 1.1;
const PUFFS = Array.from({ length: 9 }, (_, k) => {
  const s = 0.05 + k * 0.5;
  return { s, delay: LIFT_AT + LIFT_FOR * Math.sqrt(s / D), r: 0.34 + k * 0.025 };
});

export function Logo({ name }: { name: string }) {
  return (
    <span className="logo">
      <svg viewBox="0 0 9 9" width="36" height="36" aria-hidden="true">
        <g className="logo-smoke">
          {PUFFS.flatMap((p, k) =>
            [-1, 1].map((side) => (
              <circle
                key={`${k}-${side}`}
                className="logo-puff"
                cx={0.6 + p.s + side * 0.28}
                cy={8.6 - p.s + side * 0.28}
                r={p.r}
                fill="currentColor"
                style={
                  {
                    ["--d" as string]: `${(p.delay + (side > 0 ? 0.05 : 0)).toFixed(2)}s`,
                    ["--dx" as string]: `${(-1.1 - side * 0.35).toFixed(2)}px`,
                    ["--dy" as string]: `${(0.9 + side * 0.4).toFixed(2)}px`,
                  } as React.CSSProperties
                }
              />
            )),
          )}
        </g>
        <g className="logo-mark">
          {ROWS.flatMap((row, y) =>
            [...row].flatMap((cell, x) =>
              cell === "#" ? <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.3125} fill="currentColor" /> : [],
            ),
          )}
        </g>
      </svg>
      <span className="logo-name">{name}</span>
    </span>
  );
}
