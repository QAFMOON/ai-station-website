"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { Dictionary } from "@/i18n";
import { CopyButton } from "./CopyButton";

// Two columns: the section heading on the start side; the tab switcher, text and preview
// on the other. Columns follow reading direction, so Arabic mirrors.
export function Assistants({ t, sample, copy, copied }: { t: Dictionary["suite"]; sample: string; copy: string; copied: string }) {
  const [i, setI] = useState(0);
  const id = useId();
  const tab = t.tabs[i]!;
  const onKey = (e: React.KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + t.tabs.length) % t.tabs.length;
    setI(n);
    document.getElementById(`${id}-t${n}`)?.focus();
  };
  return (
    <div className="assist-layout">
      <div className="assist-aside">
        <h2 className="h2">{t.title}</h2>
        <p className="section-lead">{t.lead}</p>
      </div>
      <div className="assist-main">
        <div className="tabs" role="tablist" aria-label={t.title} onKeyDown={onKey}>
          {t.tabs.map((x, n) => (
            <button
              key={x.tab}
              id={`${id}-t${n}`}
              role="tab"
              type="button"
              className="tab"
              aria-selected={i === n}
              aria-controls={`${id}-p`}
              tabIndex={i === n ? 0 : -1}
              onClick={() => setI(n)}
            >
              {x.tab}
            </button>
          ))}
        </div>
        <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t${i}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="assist"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="assist-text">
                <h3>{tab.title}</h3>
                <p>{tab.text}</p>
              </div>
              {tab.kind === "terminal" ? (
                <figure className="terminal">
                  <figcaption className="terminal-bar">
                    <span dir="ltr">POST /v1/chat/completions</span>
                    <CopyButton text={sample} label={copy} copied={copied} />
                  </figcaption>
                  <pre dir="ltr">
                    <code>{sample}</code>
                  </pre>
                  <p className="terminal-foot">{tab.card.foot}</p>
                </figure>
              ) : (
                <div className="chat">
                  <p className="chat-you">{tab.card.you}</p>
                  <div className={tab.card.mono ? "chat-ans mono" : "chat-ans"}>
                    {tab.card.lines.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                    {tab.card.source && (
                      <span className="chat-src">
                        {tab.card.source.label} · {tab.card.source.passage}
                      </span>
                    )}
                  </div>
                  <p className="chat-foot">{tab.card.foot}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
