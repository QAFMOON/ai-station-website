"use client";

import { motion, useReducedMotion } from "framer-motion";

// Fades and lifts content in once as it scrolls into view.
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "article";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
