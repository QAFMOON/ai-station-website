import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";
import { Arrow } from "./Arrow";
import { Logo } from "./Logo";

export function CtaBand({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2 className="h2">{t.gulf.title}</h2>
        <p className="lead">{t.gulf.lead}</p>
        <div className="actions">
          <a href={`/${locale}#contact`} className="btn">
            {t.gulf.cta} <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo name={site.name[locale]} />
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer-links" aria-label={t.footer.product}>
          <p className="footer-head">{t.footer.product}</p>
          <a href={`/${locale}#how`}>{t.nav.how}</a>
          <a href={`/${locale}#where`}>{t.nav.where}</a>
          <a href={`/${locale}#get`}>{t.nav.get}</a>
          <a href={`/${locale}#pilot`}>{t.nav.pilot}</a>
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
          © {year} {site.name[locale]}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
