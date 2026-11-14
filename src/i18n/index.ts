import type { Locale } from "@/site.config";
import { en, type Dictionary } from "./en";
import { ar } from "./ar";

const dictionaries: Record<Locale, Dictionary> = { ar, en };
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export type { Dictionary };
