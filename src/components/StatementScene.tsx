"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";

const icons = [
  // regulations: a document with lines
  <path key="r" d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />,
  // compliance: shield with check
  <path key="c" d="M12 3 5 6v5.5c0 4.200 2.900 7.600 7 9.500 4.100-1.900 7-5.300 7-9.500V6l-7-3Zm-3 9 2.200 2.200L15.500 10" />,
  // governance: sliders
  <path key="g" d="M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M6 15v4" />,
];

function Word({ children, progress, range, mark }: { children: string; progress: MotionValue<number>; range: [number, number]; mark: boolean }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className={mark ? "mark" : undefined}>
      {children}
    </motion.span>
  );
}

// Words of the statement light up as you scroll; beside it, a flat line-art star turns
// and its centre cycles through the key words.
export function StatementScene({ segments }: { segments: { word: string; text: string; mark: string }[] }) {
  const words = segments.map((s) => s.word);
  const text = segments.map((s) => s.text).join(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const spin = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const spinBack = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parts = text.split(" ");
  // Words inside each segment's key phrase get the accent colour.
  const marked = segments.flatMap((seg) => {
    const start = seg.text.indexOf(seg.mark);
    let pos = 0;
    return seg.text.split(" ").map((w) => {
      const from = pos;
      pos += w.length + 1;
      return start !== -1 && from >= start && from < start + seg.mark.length;
    });
  });
  // Each segment owns its own run of words, so the centre word follows what the text says.
  const ends = segments.reduce<number[]>((acc, seg) => [...acc, (acc.at(-1) ?? 0) + seg.text.split(" ").length], []);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const at = v * parts.length;
    const i = ends.findIndex((e) => at < e);
    setActive(i === -1 ? segments.length - 1 : i);
  });

  return (
    <div className="statement-scene">
      {reduce ? (
        <p className="statement">{text}</p>
      ) : (
        <p ref={ref} className="statement" aria-label={text}>
          {parts.map((w, i) => (
            <span key={i} aria-hidden="true">
              <Word progress={scrollYProgress} range={[i / parts.length, (i + 1) / parts.length]} mark={marked[i] ?? false}>
                {w}
              </Word>{" "}
            </span>
          ))}
        </p>
      )}
      <div className="star-wrap" aria-hidden="true">
        <div className="star">
          <motion.svg className="star-layer" viewBox="0 0 400 400" style={{ rotate: reduce ? 0 : spin }}>
            <rect x="80" y="80" width="240" height="240" rx="4" />
            <rect x="80" y="80" width="240" height="240" rx="4" transform="rotate(45 200 200)" />
          </motion.svg>
          <motion.svg className="star-layer star-ring" viewBox="0 0 400 400" style={{ rotate: reduce ? 0 : spinBack }}>
            <circle cx="200" cy="200" r="186" />
          </motion.svg>
          <div className="star-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {icons[active % icons.length]}
                </svg>
                <span>{words[active]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="star-dots">
          {words.map((_, i) => (
            <i key={i} className={i === active ? "is-on" : ""} />
          ))}
        </div>
      </div>
    </div>
  );
}
