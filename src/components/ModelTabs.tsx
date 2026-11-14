"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Dictionary } from "@/i18n";
import { ExampleCard } from "./ExampleCard";
import { Pager } from "./Pager";
import { PhotoStack, photos } from "./Photo";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons: readonly ReactNode[] = [
  <path key="code" d="m8 7-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" {...stroke} />,
  <path key="voice" d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3" {...stroke} />,
  <path key="docs" d="M7 3h7l5 5v13H7V3ZM14 3v5h5M10 13h6M10 17h6" {...stroke} />,
  <path key="knowledge" d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5C4.7 20 4 19.3 4 18.5v-13ZM20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z" {...stroke} />,
  <path key="custom" d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6" {...stroke} />,
];

export function ModelTabs({ t }: { t: Dictionary["suite"] }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const count = t.tabs.length;
  const tab = t.tabs[index];

  const select = (i: number) => {
    const next = (i + count) % count;
    setIndex(next);
    return next;
  };

  const onKey = (e: KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!step) return;
    e.preventDefault();
    const next = select(index + step);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  if (!tab) return null;

  return (
    <div className="suite">
      <div className="suite-tabs" role="tablist" aria-label={t.title} onKeyDown={onKey}>
        {t.tabs.map((it, i) => (
          <button
            key={it.tab}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={index === i}
            aria-controls={`${id}-panel`}
            tabIndex={index === i ? 0 : -1}
            className="suite-tab"
            onClick={() => select(i)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              {icons[i]}
            </svg>
            <span>{it.tab}</span>
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} className="suite-panel">
        <div className="suite-copy">
          <h3>{tab.title}</h3>
          <p>{tab.text}</p>
          <ul className="ticks">
            {tab.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="actions">
            <a href="#contact" className="btn btn-outline">
              {t.primary}
            </a>
            <a href="#api" className="btn btn-outline">
              {t.secondary}
            </a>
          </div>
        </div>
        <div className="suite-visual">
          <PhotoStack srcs={photos.suite} index={index} sizes="(max-width: 980px) 100vw, 560px" />
          <ExampleCard label={t.example} card={tab.card} className="float-suite" />
        </div>
      </div>
      <div className="suite-foot">
        <p className="caption">{t.caption}</p>
        <Pager index={index} count={count} prev={t.prev} next={t.next} onGo={select} />
      </div>
    </div>
  );
}
