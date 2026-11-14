"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/i18n";
import { Pager } from "./Pager";
import { PhotoStack, photos } from "./Photo";

// Three steps, three parts of the server. Opening a step shows that part.
export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  const [open, setOpen] = useState(0);
  const id = useId();
  const count = t.items.length;
  const go = (step: number) => setOpen((step + count) % count);

  return (
    <div className="how">
      <div className="acc">
        {t.items.map((it, i) => {
          const on = open === i;
          return (
            <div key={it.title} className={on ? "acc-item is-open" : "acc-item"}>
              <h3>
                <button
                  type="button"
                  id={`${id}-h-${i}`}
                  aria-expanded={on}
                  aria-controls={`${id}-p-${i}`}
                  onClick={() => setOpen(i)}
                >
                  <span className="acc-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="acc-title">{it.title}</span>
                </button>
              </h3>
              <div id={`${id}-p-${i}`} role="region" aria-labelledby={`${id}-h-${i}`} hidden={!on}>
                <p>{it.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="how-visual">
        <PhotoStack srcs={photos.how} index={open} sizes="(max-width: 980px) 100vw, 560px" />
        <div className="how-foot">
          <p className="caption">{t.caption}</p>
          <Pager index={open} count={count} prev={t.prev} next={t.next} onGo={go} />
        </div>
      </div>
    </div>
  );
}
