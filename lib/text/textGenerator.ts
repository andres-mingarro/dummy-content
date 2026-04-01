import { fakerEN, fakerES } from "@faker-js/faker";
import type { Lang } from "@/lib/i18n/translations";

export type TextType = "paragraphs" | "sentences" | "words";

export interface TextOptions {
  type: TextType;
  count: number;
  lang: Lang;
}

function getFaker(lang: Lang) {
  return lang === "es" ? fakerES : fakerEN;
}

export function generateUnits({ type, count, lang }: TextOptions): string[] {
  const f = getFaker(lang);
  switch (type) {
    case "paragraphs":
      return Array.from({ length: count }, () => f.lorem.paragraph());
    case "sentences":
      return Array.from({ length: count }, () => f.lorem.sentence());
    case "words":
      return Array.from({ length: count }, () => f.lorem.word());
  }
}

export function unitsToText(units: string[], type: TextType): string {
  switch (type) {
    case "paragraphs": return units.join("\n\n");
    case "sentences":  return units.join(" ");
    case "words":      return units.join(" ");
  }
}
