import type { Lang } from "@/lib/i18n/translations";
import { CATEGORIES, BASE_CSS, getFaker, pick, esc, capitalize, formatDate } from "./utils";

export function generateArticle(lang: Lang): string {
  const f = getFaker(lang);
  const category = pick(CATEGORIES[lang]);
  const title = capitalize(f.lorem.words({ min: 7, max: 14 }));
  const author = `${f.person.firstName()} ${f.person.lastName()}`;
  const avatarStyle = ["style-1","style-2","style-3","style-4","style-5","style-6"][Math.floor(Math.random() * 6)];
  const avatarSrc = `/api/image/64x64/e0e0e0/555555?design=user&user=${avatarStyle}`;
  const date = formatDate(new Date(f.date.recent({ days: 30 })), lang);
  const readTime = Math.floor(Math.random() * 7) + 3;
  const readLabel = lang === "es" ? "min de lectura" : "min read";
  const lead = f.lorem.paragraph();
  const body1 = f.lorem.paragraph();
  const quote = f.lorem.sentences(2);
  const body2 = f.lorem.paragraph();
  const closing = f.lorem.paragraph();

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
${BASE_CSS}
body {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.75;
  color: #1a1a1a;
  background: #fff;
  padding: 1.75rem 1.5rem;
  max-width: 680px;
  margin: 0 auto;
}
.cat {
  display: inline-block;
  font-family: system-ui, sans-serif;
  font-size: .6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #6366f1;
  margin-bottom: .5rem;
}
h1 {
  font-family: system-ui, sans-serif;
  font-size: clamp(1.25rem, 3.5vw, 1.875rem);
  line-height: 1.2;
  font-weight: 800;
  color: #111;
  margin-bottom: .75rem;
}
.meta {
  font-family: system-ui, sans-serif;
  font-size: .8125rem;
  color: #888;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  gap: .375rem .5rem;
  align-items: center;
}
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1.5px solid #e5e7eb;
  display: inline-block;
}
.avatar img { width: 100%; height: 100%; display: block; object-fit: cover; }
.author { color: #444; font-weight: 600; }
.sep { color: #ddd; }
.lead { font-size: 1.0625rem; color: #222; margin-bottom: 1.25rem; line-height: 1.8; }
p { margin-bottom: 1.25rem; color: #333; }
blockquote {
  margin: 1.5rem 0;
  padding: .875rem 1.25rem;
  border-left: 3px solid #6366f1;
  background: #f8f8ff;
  font-style: italic;
  color: #555;
  border-radius: 0 6px 6px 0;
}
</style>
</head>
<body>
<span class="cat">${esc(category)}</span>
<h1>${esc(title)}</h1>
<div class="meta">
  <span class="avatar"><img src="${avatarSrc}" alt="${esc(author)}" loading="eager"></span>
  <span class="author">${esc(author)}</span>
  <span class="sep">·</span>
  <time>${esc(date)}</time>
  <span class="sep">·</span>
  <span>${readTime} ${readLabel}</span>
</div>
<p class="lead">${esc(lead)}</p>
<p>${esc(body1)}</p>
<blockquote>${esc(quote)}</blockquote>
<p>${esc(body2)}</p>
<p>${esc(closing)}</p>
</body>
</html>`;
}
