import Link from "next/link";
import { headers } from "next/headers";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/site.config";

// Not-found pages get no route params, so the language comes from the x-locale header set in middleware.ts.
export default async function NotFound() {
  const h = (await headers()).get("x-locale") ?? "";
  const locale = isLocale(h) ? h : defaultLocale;
  const t = getDictionary(locale).notFound;
  return (
    <main id="main" className="section">
      <div className="wrap prose">
        <h1 className="h2">{t.title}</h1>
        <p>{t.text}</p>
        <p>
          <Link href={`/${locale}`}>{t.back}</Link>
        </p>
      </div>
    </main>
  );
}
