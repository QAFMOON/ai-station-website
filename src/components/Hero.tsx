import Image from "next/image";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/site.config";
import { models, type ModelId } from "@/data/models";
import { Arrow } from "./Arrow";
import { HeroGrid } from "./HeroGrid";
import { ResultsShowcase } from "./ResultsShowcase";

// A spread of makers, including Arabic-first models, shown as "runs leading open models".
const STRIP: ModelId[] = ["deepseek-v4-pro", "gpt-oss-120b", "mistral-small-4", "nemotron-3-ultra", "qwen3-8-27b", "gemma-4-31b", "jais-2-70b", "allam-7b"];

// Centred hero: say what it does, then show what you get (the results as real app windows),
// then the models behind it. An optional looping video can sit behind it: set heroVideo in site.config.ts.
export function Hero({ t, locale, video }: { t: Dictionary; locale: Locale; video?: string }) {
  const strip = STRIP.map((id) => models.find((m) => m.id === id)).filter((m) => m !== undefined);
  return (
    <section className="hero hero-centre">
      <div className="hero-bg" aria-hidden="true">
        <HeroGrid />
        {video && <video className="hero-video" src={video} autoPlay muted loop playsInline preload="metadata" />}
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <p className="kicker">{t.hero.kicker}</p>
          <h1>
            {/* One sentence per line, so a two-sentence headline never breaks mid-sentence. */}
            {t.hero.title.split(/(?<=\.)\s+/).map((line) => (
              <span key={line} className='h1-line'>
                {line}
              </span>
            ))}
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="actions">
            <a href={`/${locale}#contact`} className="btn">
              {t.hero.primary} <Arrow />
            </a>
            <a href={`/${locale}#where`} className="btn btn-ghost">
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <div id="results" className="results">
          <ResultsShowcase t={t.hero.results} prompt={t.api.prompt} copy={t.api.copy} copied={t.api.copied} />
        </div>

        <div className="hero-models">
          <p>{t.hero.results.modelsLabel}</p>
          <ul>
            {strip.map((m) => (
              <li key={m.id}>
                <span className="m-logo">
                  <Image src={`/images/models/${m.logo}.webp`} alt="" width={64} height={64} />
                </span>
                <bdi>{m.short}</bdi>
              </li>
            ))}
            <li className="hero-models-more">
              <a href={`/${locale}#models`}>
                {t.hero.results.modelsMore} <Arrow />
              </a>
            </li>
          </ul>
        </div>

        <ul className="hero-trust">
          {t.hero.badges.map((b) => (
            <li key={b.title}>
              <Check />
              <b>{b.title}</b>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}
