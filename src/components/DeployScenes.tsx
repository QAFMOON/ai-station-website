"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useSteppedIndex } from "./useSteppedIndex";
import type { Dictionary } from "@/i18n";

const order = ["onprem", "connected", "private", "shared"] as const;

function Body({ t, mode, index }: { t: Dictionary["picker"]; mode: (typeof order)[number]; index: number }) {
  const inside = mode === "onprem" || mode === "connected";
  const outsideItem = mode === "connected" ? t.control : mode === "private" ? t.dedicated : mode === "shared" ? t.sharedServer : t.nothing;
  return (
    <>
      <span className="scene-big" aria-hidden="true">
        0{index + 1}
      </span>
      <span className="scene-index">0{index + 1} / 04</span>
      <h3>{t.modes[mode].tab}</h3>
      <p>{t.modes[mode].text}</p>
      <p className="link-line">↔ {t.modes[mode].link}</p>
      <div className="scene-zones">
        <div className="zone">
          <b>{t.inside}</b>
          <div className="chips">
            <span className="chip">{t.staff}</span>
            <span className="chip">{t.docs}</span>
            {inside && <span className="chip chip-hot">{t.server}</span>}
          </div>
        </div>
        <div className="zone">
          <b>{t.outside}</b>
          <div className="chips">
            <span className={inside ? "chip" : "chip chip-hot"}>{outsideItem}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// One deployment option per screen: the section stays pinned while scrolling moves through them.
export function DeployScenes({ t }: { t: Dictionary["picker"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useSteppedIndex();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(order.length - 1, Math.max(0, Math.floor(v * order.length))));
  });

  if (reduce) {
    return (
      <div className="scenes-static">
        {order.map((m, i) => (
          <div key={m} className="scene-body">
            <Body t={t} mode={m} index={i} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="scenes" style={{ height: `${order.length * 80 + 20}svh` }}>
      <div className="scenes-pin">
        <div className="scenes-rail" aria-hidden="true">
          {order.map((_, i) => (
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
            <Body t={t} mode={order[active]!} index={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
