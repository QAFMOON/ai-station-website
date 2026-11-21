import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/site.config";

// Every page lives under /ar or /en. Anything else is sent to English,
// the default language, whatever the browser language is.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) {
    // The "not found" page gets no route params, so it reads the language from this header.
    const headers = new Headers(req.headers);
    headers.set("x-locale", pathname.split("/")[1]!);
    return NextResponse.next({ request: { headers } });
  }
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
