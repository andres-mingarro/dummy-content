import { fakerEN, fakerES } from "@faker-js/faker";
import type { Lang } from "@/lib/i18n/translations";

export type TextUnit = "words" | "characters";

export interface TextOptions {
  count: number;
  unit: TextUnit;
  paragraphs: number;
  lang: Lang;
}

function getFaker(lang: Lang) {
  return lang === "es" ? fakerES : fakerEN;
}

function capitalize(text: string): string {
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if (!text.endsWith(".")) text = text + ".";
  return text;
}

export function generateParagraphs({ count, unit, paragraphs, lang }: TextOptions): string[] {
  const f = getFaker(lang);

  if (unit === "words") {
    // Generate all words at once, split into chunks preserving exact total
    const allWords = f.lorem.words(count).split(" ");
    const base = Math.floor(count / paragraphs);
    const remainder = count % paragraphs;
    let offset = 0;
    return Array.from({ length: paragraphs }, (_, i) => {
      const size = base + (i < remainder ? 1 : 0);
      const chunk = allWords.slice(offset, offset + size).join(" ");
      offset += size;
      return capitalize(chunk);
    });
  } else {
    // characters: generate all text at once, split into chunks
    const rough = f.lorem.words(Math.ceil(count / 4));
    const allChars = rough.slice(0, count);
    const base = Math.floor(count / paragraphs);
    const remainder = count % paragraphs;
    let offset = 0;
    return Array.from({ length: paragraphs }, (_, i) => {
      const size = base + (i < remainder ? 1 : 0);
      const chunk = allChars.slice(offset, offset + size);
      offset += size;
      return capitalize(chunk);
    });
  }
}
