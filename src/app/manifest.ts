import type { MetadataRoute } from "next";
import { defaultLocale, site } from "@/site.config";
import { getDictionary } from "@/i18n";

export default function manifest(): MetadataRoute.Manifest {
  const t = getDictionary(defaultLocale);
  return {
    name: site.name[defaultLocale],
    short_name: site.name[defaultLocale],
    description: t.meta.description,
    start_url: `/${defaultLocale}`,
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
