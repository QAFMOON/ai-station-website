import type { Dictionary } from "@/i18n";
import { ExampleCard } from "./ExampleCard";
import { PhotoStack, photos } from "./Photo";

export function HeroVisual({ t }: { t: Dictionary["suite"] }) {
  const knowledge = t.tabs[3];
  if (!knowledge) return null;
  return (
    <div className="hero-visual">
      <PhotoStack srcs={[photos.hero]} index={0} sizes="(max-width: 980px) 100vw, 560px" priority />
      <ExampleCard label={t.example} card={knowledge.card} className="float-hero" />
    </div>
  );
}
