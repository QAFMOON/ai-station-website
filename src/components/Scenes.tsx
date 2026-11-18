"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useSteppedIndex } from "./useSteppedIndex";

type Item = { title: string; text: string };

// Pinned storytelling: the section stays on screen while scrolling moves through the steps.
export function Scenes({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useSteppedIndex();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length))));
  });

  if (reduce) {
    return (
      <div className="scenes-static">
        {items.map((it, i) => (
          <div key={it.title} className="scene-body">
            <span className="scene-index">0{i + 1}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="scenes" style={{ height: `${items.length * 80 + 20}svh` }}>
      <div className="scenes-pin">
        <div className="scenes-rail" aria-hidden="true">
          {items.map((_, i) => (
            <span key={i} className={i === active ? "is-on" : i < active ? "is-done" : ""} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="scene-body"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="scene-big" aria-hidden="true">
              0{active + 1}
            </span>
            <span className="scene-index">0{active + 1}</span>
            <h3>{items[active]!.title}</h3>
            <p>{items[active]!.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
