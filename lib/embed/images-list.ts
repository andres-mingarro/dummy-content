import type { Lang } from "@/lib/i18n/translations";
import { IMAGES_LIST_PALETTES, BASE_CSS, getFaker, esc, capitalize, imgUrl } from "./utils";
import { createRng } from "./rng";

export function generateImagesList(lang: Lang, count = 12, seed: string | null = null): string {
  const f = getFaker(lang);
  createRng(seed, f); // solo siembra faker; las paletas ya son cíclicas por índice, no random

  // Las paletas se recorren cíclicamente para reutilizar URLs ya cacheadas aunque aumente la lista.
  const items = Array.from({ length: count }, (_, index) => IMAGES_LIST_PALETTES[index % IMAGES_LIST_PALETTES.length]).map((p) => ({
    src: imgUrl(400, 280, p),
    label: capitalize(f.lorem.words({ min: 2, max: 4 })),
  }));

  const imagesHtml = items
    .map(
      (item) => `
  <figure>
    <img src="${item.src}" alt="${esc(item.label)}" loading="lazy">
    <figcaption>${esc(item.label)}</figcaption>
  </figure>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
${BASE_CSS}
body { background: #f5f5f5; padding: .75rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .75rem;
}
@media (max-width: 500px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 320px) {
  .grid { grid-template-columns: 1fr; }
}
figure {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.07);
}
img { width: 100%; height: auto; display: block; }
figcaption {
  font-family: system-ui, sans-serif;
  font-size: .6875rem;
  color: #888;
  padding: .375rem .625rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
</head>
<body>
<div class="grid">${imagesHtml}
</div>
</body>
</html>`;
}
