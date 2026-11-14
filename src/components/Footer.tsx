import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";
import { Logo } from "./Logo";
import { photos } from "./Photo";

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="gulf">
      <div className="wrap gulf-head">
        <h2>{t.gulf.title}</h2>
        <p>{t.gulf.lead}</p>
        <a href="#contact" className="btn btn-pill">
          {t.gulf.cta}
        </a>
      </div>
      <div className="gulf-scene">
        <Image src={photos.footer} alt={t.gulf.art} fill sizes="100vw" className="gulf-img" />
      </div>
      <div className="gulf-base">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Logo name={site.name[locale]} />
            <p>{t.footer.tagline}</p>
          </div>
          <nav className="footer-links" aria-label={t.footer.product}>
            <p className="footer-head">{t.footer.product}</p>
            <a href={`/${locale}#how`}>{t.nav.how}</a>
            <a href={`/${locale}#get`}>{t.nav.get}</a>
            <a href={`/${locale}#where`}>{t.nav.where}</a>
            <a href={`/${locale}#pilot`}>{t.nav.pilot}</a>
            <a href={`/${locale}#faq`}>{t.nav.faq}</a>
          </nav>
          <div className="footer-links">
            <p className="footer-head">{t.footer.company}</p>
            <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p className="footer-legal">
            © {year} {site.name[locale]}. {site.location[locale]}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
