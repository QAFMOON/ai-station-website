"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ t, locale, path = "", banner = false }: { t: Dictionary; locale: Locale; path?: string; banner?: boolean }) {
  const other: Locale = locale === "ar" ? "en" : "ar";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    ["#how", t.nav.how],
    ["#where", t.nav.where],
    ["#why", t.nav.why],
    ["#get", t.nav.get],
    ["#pilot", t.nav.pilot],
  ] as const;

  return (
    <>
      {banner && (
        <div className="banner">
          <div className="wrap banner-row">
            <p>
              <span className="tag">{t.hero.banner.tag}</span>
              <span className="banner-text">{t.hero.banner.text}</span>
            </p>
            <a href={`/${locale}#pilot`}>{t.hero.banner.link} →</a>
          </div>
        </div>
      )}
      <header className={["header", open && "is-open", scrolled && "is-scrolled"].filter(Boolean).join(" ")}>
        <div className="wrap header-row">
          <Link href={`/${locale}`} className="logo-link" aria-label={site.name[locale]}>
            <Logo name={site.name[locale]} />
          </Link>
          <nav id="site-nav" className="nav" aria-label={t.nav.menu} onClick={() => setOpen(false)}>
            {links.map(([hash, label]) => (
              <a key={hash} href={`/${locale}${hash}`}>
                {label}
              </a>
            ))}
            <a href={`/${locale}#contact`} className="nav-cta btn">
              {t.nav.cta}
            </a>
          </nav>
          <div className="header-actions">
            {site.themeToggle && <ThemeToggle label={locale === "ar" ? "تبديل المظهر" : "Toggle theme"} />}
            {/* Plain link on purpose: a full page load makes Chrome re-read the no-translate tags in the new language. */}
            <a href={`/${other}${path}`} className="lang" lang="en" hrefLang={other} aria-label={t.nav.switchAria}>
              {t.nav.switchLabel}
            </a>
            <a href={`/${locale}#contact`} className="btn btn-small">
              {t.nav.cta}
            </a>
            <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
              <span className="sr-only">{t.nav.menu}</span>
              <span className="burger" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
