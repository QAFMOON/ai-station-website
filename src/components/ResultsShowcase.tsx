"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { CopyButton } from "./CopyButton";

type R = Dictionary["hero"]["results"];

// Six tabs. Chat, agents, voice and MCP show the real LibreChat interface that AIStationX deploys; code shows
// OpenCode inside VS Code; the API tab is a real request. The screenshots are official ones from the open-source
// projects (MIT). See public/images/product/CREDITS.md. Swap in your own deployment's screenshots under the same names.
export function ResultsShowcase({ t, prompt, copy, copied }: { t: R; prompt: string; copy: string; copied: string }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true); // tabs advance by themselves until the visitor takes over
  const [seen, setSeen] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const tab = t.tabs[i]!;

  // Pause the auto-advance while the showcase is off screen.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setSeen(e!.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (n: number) => {
    setAuto(false);
    setI(n);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + t.tabs.length) % t.tabs.length;
    go(n);
    document.getElementById(`${id}-t${n}`)?.focus();
  };

  const s = t.shots;
  const frames = [
        <Shot key="chat" src="librechat-chat-agent" w={1440} h={900} alt={tab.title} wide />,
    <Shot key="agents" src="librechat-agents" w={1232} h={824} alt={tab.title} wide />,
    <div key="code" className="shot-code">
      <div className="shot-code-grid">
        <Shot src="vscode-code-agent" w={1600} h={1016} alt={tab.title} wide />
        <Shot src="kilo-custom-provider" w={900} h={890} alt={s.codeApi} badge={s.codeApi} />
      </div>
      <p className="shot-editors">
        <span>{s.editorsLabel}</span>
        {s.editors.map((e) => (
          <i key={e}>{e}</i>
        ))}
      </p>
    </div>,
    <Shot key="voice" src="librechat-voice-assistant" w={916} h={636} alt={tab.title} narrow>
      <span className="focus-ring focus-tts" aria-hidden="true" />
      <span className="focus-pill focus-pill-tts">{s.tts}</span>
      <span className="focus-ring focus-stt" aria-hidden="true" />
      <span className="focus-pill focus-pill-stt">{s.stt}</span>
    </Shot>,
    <Api key="api" t={t} prompt={prompt} copy={copy} copied={copied} />,
    <Stack key="mcp">
      <Shot src="librechat-mcp-catalog" w={1400} h={394} alt={s.mcpCatalog} badge={s.mcpCatalog} />
      <Shot src="librechat-mcp-menu" w={925} h={337} alt={s.mcpMenu} badge={s.mcpMenu} />
    </Stack>,
  ];

  return (
    <div className="results-show" ref={root} data-seen={seen} onPointerEnter={() => root.current?.setAttribute("data-hover", "true")} onPointerLeave={() => root.current?.removeAttribute("data-hover")}>
      <div className="tabs tabs-centre" role="tablist" aria-label={t.label} onKeyDown={onKey}>
        {t.tabs.map((x, n) => (
          <button
            key={x.tab}
            id={`${id}-t${n}`}
            role="tab"
            type="button"
            className="tab"
            data-auto={auto && i === n ? "true" : undefined}
            aria-selected={i === n}
            aria-controls={`${id}-p`}
            tabIndex={i === n ? 0 : -1}
            onClick={() => go(n)}
            onAnimationEnd={(e) => {
              if (e.animationName === "tab-progress" && auto) setI((v) => (v + 1) % t.tabs.length);
            }}
          >
            {x.tab}
          </button>
        ))}
      </div>
      <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t${i}`}>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 12, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <p className="results-cap">
              <b>{tab.title}</b> <span>{tab.text}</span>
            </p>
            {frames[i]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Shot({ src, w, h, alt, badge, wide, narrow, children }: { src: string; w: number; h: number; alt: string; badge?: string; wide?: boolean; narrow?: boolean; children?: React.ReactNode }) {
  return (
    <figure className={narrow ? "shot shot-narrow" : "shot"}>
      {badge && <span className="shot-badge">{badge}</span>}
      <div className={wide ? "shot-img shot-wide" : "shot-img"}>
        <Image src={`/images/product/${src}.webp`} alt={alt} width={w} height={h} sizes="(max-width: 1000px) 100vw, 1000px" />
        {children}
      </div>
    </figure>
  );
}

function Stack({ children }: { children: React.ReactNode }) {
  return (
    <div className="shot-stack">
      {children}
    </div>
  );
}

const BASE = "https://ai.your-company/v1";
type Lang = "curl" | "python" | "js";
const LANGS: { id: Lang; label: string; title: string }[] = [
  { id: "curl", label: "curl", title: "aistationx: zsh" },
  { id: "python", label: "Python", title: "chat.py" },
  { id: "js", label: "JavaScript", title: "chat.mjs" },
];

function code(lang: Lang, prompt: string) {
  const q = JSON.stringify(prompt);
  if (lang === "curl")
    return `curl ${BASE}/chat/completions \\
  -H "Authorization: Bearer $AISTATIONX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "chat-arabic",
    "messages": [
      {"role": "user", "content": ${q}}
    ]
  }'`;
  if (lang === "python")
    return `import os
from openai import OpenAI

client = OpenAI(
    base_url="${BASE}",
    api_key=os.environ["AISTATIONX_KEY"],
)

reply = client.chat.completions.create(
    model="chat-arabic",
    messages=[{"role": "user", "content": ${q}}],
)
print(reply.choices[0].message.content)`;
  return `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "${BASE}",
  apiKey: process.env.AISTATIONX_KEY,
});

const reply = await client.chat.completions.create({
  model: "chat-arabic",
  messages: [{ role: "user", content: ${q} }],
});
console.log(reply.choices[0].message.content);`;
}

function output(lang: Lang, answer: string) {
  if (lang !== "curl") return answer;
  return `{
  "id": "chatcmpl-9f2c1a7e",
  "object": "chat.completion",
  "model": "chat-arabic",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": ${JSON.stringify(answer)}
      },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 24, "completion_tokens": 17, "total_tokens": 41 }
}`;
}

// A tiny highlighter, enough for these three snippets and the JSON reply.
function paint(src: string) {
  const re = /("(?:[^"\\]|\\.)*")|(#.*$|(?<![:\w])\/\/.*$)|\b(import|from|const|await|new|print|console)\b|(\$[A-Z_]+)|(\b\d+\b)/gm;
  const out: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of src.matchAll(re)) {
    const at = m.index!;
    if (at > last) out.push(src.slice(last, at));
    const text = m[0];
    let cls = "tn";
    if (m[1]) cls = src[at + text.length] === ":" ? "tkey" : "ts";
    else if (m[2]) cls = "tc";
    else if (m[3]) cls = "tk";
    else if (m[4]) cls = "tv";
    out.push(
      <span key={k++} className={cls}>
        {text}
      </span>,
    );
    last = at + text.length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}

function Api({ t, prompt, copy, copied }: { t: R; prompt: string; copy: string; copied: string }) {
  const a = t.api;
  const [lang, setLang] = useState<Lang>("curl");
  const cur = LANGS.find((l) => l.id === lang)!;
  const src = code(lang, prompt);
  return (
    <div className="term-wrap">
      <figure className="ui-win term">
        <figcaption className="ui-bar">
          <span className="ui-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="ui-title" dir="ltr">
            {cur.title}
          </span>
          <span className="term-tabs" role="tablist" aria-label={a.language}>
            {LANGS.map((l) => (
              <button key={l.id} type="button" role="tab" aria-selected={lang === l.id} className="term-tab" onClick={() => setLang(l.id)}>
                {l.label}
              </button>
            ))}
          </span>
        </figcaption>
        <div className="term-body" dir="ltr">
          <div className="term-copy">
            <CopyButton text={src} label={copy} copied={copied} />
          </div>
          <pre>
            <code>
              {lang === "curl" && <span className="tprompt">$ </span>}
              {paint(src)}
            </code>
          </pre>
          <p className="term-sep">{a.response}</p>
          <pre className="term-out">
            <code>{paint(output(lang, a.answer))}</code>
          </pre>
        </div>
      </figure>
      <p className="shot-editors">
        {a.chips.map((c) => (
          <i key={c}>{c}</i>
        ))}
      </p>
    </div>
  );
}
