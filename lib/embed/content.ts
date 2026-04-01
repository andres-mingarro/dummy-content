import type { Lang } from "@/lib/i18n/translations";
import { generateArticle } from "./article";
import { generateArticleImage } from "./article-image";
import { generateImagesList } from "./images-list";
import { generateCardList } from "./card-list";

export type EmbedType = "article" | "article-image" | "images-list" | "card-list";

export function generateEmbed(type: string, lang: Lang): string | null {
  switch (type) {
    case "article":       return generateArticle(lang);
    case "article-image": return generateArticleImage(lang);
    case "images-list":   return generateImagesList(lang);
    case "card-list":     return generateCardList(lang);
    default:              return null;
  }
}
