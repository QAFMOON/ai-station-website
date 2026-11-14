"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/i18n";
import { PhotoStack, photos } from "./Photo";

const order = ["onprem", "connected", "private", "shared"] as const;
type Mode = (typeof order)[number];

// A plain map of what sits inside the customer's premises and what sits outside.
export function DeploymentPicker({ t }: { t: Dictionary["picker"] }) {
  const [mode, setMode] = useState<Mode>("onprem");
  const id = useId();
  const serverInside = mode === "onprem" || mode === "connected";
  const outsideItem =
    mode === "connected" ? t.control : mode === "private" ? t.dedicated : mode === "shared" ? t.sharedServer : t.nothing;

  const onKey = (e: React.KeyboardEvent) => {
    const i = order.indexOf(mode);
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!step) return;
    e.preventDefault();
    const next = order[(i + step + order.length) % order.length];
    if (!next) return;
    setMode(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section className="picker rise" aria-labelledby={`${id}-title`}>
      <div className="picker-head">
        <p id={`${id}-title`} className="picker-title">
          {t.title}
        </p>
        <p className="picker-hint">{t.hint}</p>
      </div>
      <div className="picker-tabs" role="tablist" aria-labelledby={`${id}-title`} onKeyDown={onKey}>
        {order.map((m) => (
          <button
            key={m}
            id={`${id}-tab-${m}`}
            role="tab"
            type="button"
            aria-selected={mode === m}
            aria-controls={`${id}-panel`}
            tabIndex={mode === m ? 0 : -1}
            className="picker-tab"
            onClick={() => setMode(m)}
          >
            {t.modes[m].tab}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${mode}`} className="picker-panel">
        <p className="picker-text">{t.modes[mode].text}</p>
        <div className="picker-stage">
          <div className={serverInside ? "site site-in is-hot" : "site site-in"}>
            <PhotoStack srcs={[photos.premises]} index={0} sizes="(max-width: 980px) 100vw, 480px" />
            <div className="site-info">
              <p className="site-label">{t.inside}</p>
              <div className="chips">
                <span className="chip">{t.staff}</span>
                <span className="chip">{t.docs}</span>
                {serverInside && <span className="chip chip-hot">{t.server}</span>}
              </div>
            </div>
          </div>
          <p className="site-link">{t.modes[mode].link}</p>
          <div className={serverInside ? "site site-out" : "site site-out is-hot"}>
            <PhotoStack srcs={[photos.datacentre]} index={0} sizes="(max-width: 980px) 100vw, 480px" />
            <div className="site-info">
              <p className="site-label">{t.outside}</p>
              <div className="chips">
                <span className={serverInside ? "chip chip-quiet" : "chip chip-hot"}>{outsideItem}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
