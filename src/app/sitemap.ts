import type { MetadataRoute } from "next";
import { defaultLocale, locales, site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(); // the site is rebuilt whenever its content changes
  const pages = ["", "/privacy"];
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.3,
      alternates: {
        languages: { ...Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])), "x-default": `${site.url}/${defaultLocale}${p}` },
      },
    })),
  );
}
