import type { MetadataRoute } from "next";
import { locales, site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacy"];
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.3,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
