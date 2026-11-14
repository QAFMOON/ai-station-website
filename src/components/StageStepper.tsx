"use client";

import { useId, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/i18n";
import { PhotoStack, photos } from "./Photo";

export function StageStepper({ t }: { t: Dictionary["stages"] }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const stage = t.items[index];

  const onKey = (e: KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + t.items.length) % t.items.length;
    setIndex(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  if (!stage) return null;

  return (
    <div className="stages">
      <div className="stage-steps" role="tablist" aria-label={t.title} onKeyDown={onKey}>
        {t.items.map((it, i) => (
          <button
            key={it.step}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={index === i}
            aria-controls={`${id}-panel`}
            tabIndex={index === i ? 0 : -1}
            className={i <= index ? "stage-step is-reached" : "stage-step"}
            onClick={() => setIndex(i)}
          >
            <span className="stage-dot" aria-hidden="true" />
            <span className="stage-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="stage-name">{it.step}</span>
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} className="stage-panel">
        <div className="stage-copy">
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
          <p className="outcome">
            <strong>{t.outcomeLabel}</strong>
            {stage.outcome}
          </p>
        </div>
        <div className="stage-visual">
          <PhotoStack srcs={photos.stages} index={index} sizes="(max-width: 980px) 100vw, 560px" />
          <p className="caption">{t.caption}</p>
        </div>
      </div>

      <div className="hardware">
        <p className="hardware-title">{t.hardwareTitle}</p>
        <ul>
          {t.items.map((it, i) => (
            <li key={it.step} className={i === index ? "is-on" : undefined}>
              <span>{it.step}</span>
              {it.hardware}
            </li>
          ))}
        </ul>
      </div>

      <div className="care">
        <div>
          <h3>{t.care.title}</h3>
          <p>{t.care.text}</p>
        </div>
        <ul>
          {t.care.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
