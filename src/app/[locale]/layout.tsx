import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/manrope";
import "@fontsource/almarai/arabic-400.css";
import "@fontsource/almarai/arabic-700.css";
import "@fontsource/almarai/arabic-800.css";
import "@fontsource/almarai/latin-400.css";
import "@fontsource/almarai/latin-700.css";
import "../globals.css";
import { getDictionary } from "@/i18n";
import { dirOf, isLocale, locales, site } from "@/site.config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", "x-default": "/ar" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "website",
      images: [{ url: `/og-${locale}.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name[locale],
    url: site.url,
    description: t.meta.description,
    email: site.email,
    sameAs: [site.linkedin],
  };
  return (
    <html lang={locale} dir={dirOf(locale)}>
      <body>
        <a className="skip" href="#main">
          {t.nav.skip}
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
