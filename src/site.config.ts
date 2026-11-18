// Everything brand-specific lives here. Change the name once and the whole
// site (both languages), the SEO tags and the footer follow.
export const site = {
  name: { en: "Hima", ar: "حِمى" },
  // TODO before launch: real domain, mailbox and LinkedIn page.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  email: "hello@example.com",
  // Optional hero background video, e.g. "/video/hero.mp4". Leave undefined for the gradient-only hero.
  heroVideo: undefined as string | undefined,
  linkedin: "https://www.linkedin.com/company/your-page",
  location: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
} as const;

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");
