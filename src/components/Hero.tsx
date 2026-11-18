import type { Dictionary } from "@/i18n";
import type { Locale } from "@/site.config";
import { Arrow } from "./Arrow";
import Image from "next/image";

const icons = [
  <path key="a" d="M12 3 4.5 6v5.5c0 4.4 3.1 8 7.5 9.5 4.4-1.5 7.5-5.1 7.5-9.5V6L12 3Zm-3 9 2.2 2.2L15.5 10" />,
  <path key="b" d="M4 7l8-4 8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4" />,
  <path key="c" d="M5 4h14v16H5zM8.5 9h7M8.5 13h7M8.5 17h4" />,
];

// An optional looping video can sit behind the hero: set heroVideo in site.config.ts.
export function Hero({ t, locale, video }: { t: Dictionary; locale: Locale; video?: string }) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        {/* Photo: Pexels, free for commercial use. Replace public/images/hero-rack.jpg with your own site photo when you have one. */}
        <Image src="/images/hero-rack.jpg" alt="" fill priority sizes="100vw" className="hero-photo" />
        {video && <video className="hero-video" src={video} poster="/images/hero-rack.jpg" autoPlay muted loop playsInline preload="metadata" />}
        <div className="hero-scrim" />
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <p className="kicker">{t.hero.kicker}</p>
          <h1>{t.hero.title}</h1>
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
        <ul className="badges">
          {t.hero.badges.map((b, i) => (
            <li key={b.title}>
              <span className="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {icons[i]}
                </svg>
              </span>
              <div>
                <h3>{b.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
