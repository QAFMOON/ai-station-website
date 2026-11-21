import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale, locales, site } from "@/site.config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: `${t.privacy.title} — ${site.name[locale]}`,
    description: t.privacy.paragraphs[0],
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])), "x-default": `/${defaultLocale}/privacy` },
    },
  };
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <>
      <Header t={t} locale={locale} path="/privacy" />
      <main id="main" className="section">
        <div className="wrap prose">
          <h1 className="h2">{t.privacy.title}</h1>
          {t.privacy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <Link href={`/${locale}`}>{t.privacy.back}</Link>
          </p>
        </div>
      </main>
    </>
  );
}
