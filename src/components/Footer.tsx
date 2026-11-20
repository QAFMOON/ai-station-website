import Link from "next/link";
import type { Dictionary } from "@/i18n";
import { site, type Locale } from "@/site.config";
import { LaunchFooter } from "./LaunchFooter";
import { Logo } from "./Logo";

// The footer and the launch scene are one piece: the scene fills the whole footer behind the links, the dot field sits
// along the bottom, and the rocket lifts off from there and climbs all the way to the footer's top edge.
export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <LaunchFooter name={site.name[locale]} />
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo name={site.name[locale]} />
          <p>{t.footer.tagline}</p>
          <p className="footer-legal">
            © {year} {site.name[locale]}. {t.footer.rights}
          </p>
        </div>
        <nav className="footer-links" aria-label={t.footer.product}>
          <p className="footer-head">{t.footer.product}</p>
          <a href={`/${locale}#where`}>{t.nav.where}</a>
          <a href={`/${locale}#results`}>{t.nav.get}</a>
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
      </div>
      {/* Room for the dot field and the cut-out name under the links. */}
      <div className="footer-field" aria-hidden="true" />
    </footer>
  );
}
