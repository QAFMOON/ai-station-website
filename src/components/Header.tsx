"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";
import { Logo } from "./Logo";

export function Header({ t, locale, path = "" }: { t: Dictionary; locale: Locale; path?: string }) {
  const other: Locale = locale === "ar" ? "en" : "ar";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    ["#why", t.nav.why],
    ["#how", t.nav.how],
    ["#get", t.nav.get],
    ["#where", t.nav.where],
    ["#pilot", t.nav.pilot],
    ["#faq", t.nav.faq],
  ] as const;

  return (
    <header className={open ? "header is-open" : "header"}>
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
          <a href={`/${locale}#contact`} className="nav-cta btn btn-primary">
            {t.nav.cta}
          </a>
        </nav>
        <div className="header-actions">
          <Link href={`/${other}${path}`} className="lang" lang={other} hrefLang={other} aria-label={t.nav.switchAria}>
            {t.nav.switchLabel}
          </Link>
          <a href={`/${locale}#contact`} className="btn btn-primary btn-small">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{t.nav.menu}</span>
            <span className="burger" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
