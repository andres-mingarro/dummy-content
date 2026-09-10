import type { Lang } from "@/lib/i18n/translations";
import { generateArticle } from "./article";
import { generateArticleImage } from "./article-image";
import { generateImagesList } from "./images-list";
import { generateCardList } from "./card-list";

export type EmbedType = "article" | "article-image" | "images-list" | "card-list";
export interface EmbedOptions { cards?:number; images?:number; paragraphs?:number; seed?:string | null; }

const DARK_THEME = `<style>
:root { color-scheme: dark; }
body { background: #0f1117 !important; color: #e8e9ed !important; }
h1, h2, h3, .author { color: #f5f6f8 !important; }
p, .lead { color: #c7cad1 !important; }
.meta, figcaption { color: #969ba7 !important; border-color: #30333d !important; }
.sep { color: #5f6470 !important; }
.card, figure, .hero, blockquote { background: #191c24 !important; border-color: #30333d !important; }
blockquote { color: #b9bdc7 !important; }
.thumb { background: #242832 !important; }
</style>`;

export function generateEmbed(type: string, lang: Lang, darkMode = false, options:EmbedOptions = {}): string | null {
  const seed = options.seed ?? null;
  let html: string | null;
  switch (type) {
    case "article":       html = generateArticle(lang, options.paragraphs, seed); break;
    case "article-image": html = generateArticleImage(lang, options.paragraphs, seed); break;
    case "images-list":   html = generateImagesList(lang, options.images, seed); break;
    case "card-list":     html = generateCardList(lang, options.cards, seed); break;
    default:               return null;
  }
  return darkMode ? html.replace("</head>", `${DARK_THEME}</head>`) : html;
}
