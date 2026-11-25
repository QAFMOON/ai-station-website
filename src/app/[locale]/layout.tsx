import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/manrope";
import "@fontsource/almarai/arabic-400.css";
import "@fontsource/almarai/arabic-700.css";
import "@fontsource/almarai/arabic-800.css";
import "@fontsource/almarai/latin-400.css";
import "@fontsource/almarai/latin-700.css";
import "../globals.css";
import { MicrosoftClarity } from "@/components/MicrosoftClarity";
import { getDictionary } from "@/i18n";
import { defaultLocale, dirOf, isLocale, locales, site } from "@/site.config";

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
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      siteName: site.name[locale],
      locale: locale === "ar" ? "ar_AR" : "en_GB",
      type: "website",
      images: [{ url: `/og-${locale}.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [`/og-${locale}.png`] },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    // Stop Chrome's "Translate this page?" prompt: each language already has its own page.
    other: { google: "notranslate" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

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
  // Who we are, for search engines and AI answer engines. Page-level details (the service, the FAQs) are on each page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name.en,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png`, width: 512, height: 512 },
        description: t.footer.tagline,
        email: site.email,
        sameAs: [site.linkedin],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          url: `${site.url}/${locale}#contact`,
          availableLanguage: ["English", "Arabic"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name.en,
        url: site.url,
        inLanguage: [...locales],
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
  return (
    <html lang={locale} dir={dirOf(locale)} translate="no" className="notranslate" suppressHydrationWarning>
      <head>
        {site.themeToggle && (
          <script
            dangerouslySetInnerHTML={{
              __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
            }}
          />
        )}
      </head>
      <body>
        <MicrosoftClarity locale={locale} />
        <a className="skip" href="#main">
          {t.nav.skip}
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
