import type { Lang } from "@/lib/i18n/translations";
import { PALETTES, CATEGORIES, BASE_CSS, getFaker, pick, esc, capitalize, formatDate, imgUrl } from "./utils";

export function generateCardList(lang: Lang): string {
  const f = getFaker(lang);

  const cards = Array.from({ length: 6 }, (_, i) => {
    const p = PALETTES[i % PALETTES.length];
    return {
      src: imgUrl(280, 180, p),
      category: pick(CATEGORIES[lang]),
      title: capitalize(f.lorem.words({ min: 4, max: 7 })),
      excerpt: f.lorem.sentence(),
      author: `${f.person.firstName()} ${f.person.lastName()}`,
      date: formatDate(new Date(f.date.recent({ days: 30 })), lang),
    };
  });

  const cardsHtml = cards
    .map(
      (c) => `
  <article class="card">
    <div class="thumb"><img src="${c.src}" alt="${esc(c.title)}" loading="lazy"></div>
    <div class="body">
      <span class="cat">${esc(c.category)}</span>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.excerpt)}</p>
      <div class="meta">${esc(c.author)} · <time>${esc(c.date)}</time></div>
    </div>
  </article>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
${BASE_CSS}
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #f5f5f5;
  padding: .75rem;
}
.cards { display: flex; flex-direction: column; gap: .75rem; }
.card {
  display: flex;
  gap: .875rem;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: .75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,.07);
}
.thumb {
  flex-shrink: 0;
  width: 110px;
  height: 78px;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.body { flex: 1; min-width: 0; }
.cat {
  display: inline-block;
  font-size: .625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: #6366f1;
  margin-bottom: .2rem;
}
h3 {
  font-size: .9375rem;
  font-weight: 700;
  color: #111;
  line-height: 1.3;
  margin-bottom: .25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
p {
  font-size: .8125rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: .25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.meta { font-size: .6875rem; color: #aaa; }
</style>
</head>
<body>
<div class="cards">${cardsHtml}
</div>
</body>
</html>`;
}
