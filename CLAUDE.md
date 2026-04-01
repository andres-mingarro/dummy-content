@AGENTS.md

# Dummy Content — Contexto del Proyecto

Aplicación web Next.js con 3 sub-aplicaciones para generar contenido dummy dinámicamente.

## Sub-aplicaciones

1. **Generador de Imágenes** ✅ — `/images` — SVG en memoria via URL parametrizada (`/api/image/[...params]`).
   - API: `GET /api/image/{w}x{h}/{bg}/{text}[/{label}]?design=` · validación 1–4000px · hex 3 o 6 dígitos · cache immutable
   - 4 diseños: `solid`, `landscape`, `user`, `texture` — cada uno con su SVG generator
   - DummyForm: selector de diseño con previews SVG inline · color picker + input hex · labels dinámicos según diseño · campo label solo en `solid` · textColor oculto en `landscape`
   - Page: muestra URL + snippet `<img>` con CopyButton independiente · origin resuelto en cliente (evita SSR mismatch)
   - CopyButton: con fallback `execCommand` para navegadores viejos
2. **Generador de iframe** — `/iframe` — en desarrollo.
3. **Generador de textos** ✅ — `/text` — párrafos/oraciones/palabras, multi-idioma ES/EN, generación incremental, numeración de líneas real.

## Estructura

```
app/                         # Páginas (App Router)
  api/image/[...params]/     # Route handler imágenes
  images/page.tsx
  text/page.tsx
  iframe/page.tsx
components/
  images/                    # DummyForm, ImagePreview, CopyButton
  text/                      # TextForm, TextOutput
  shared/                    # Header
lib/
  images/imageGenerator.ts
  text/textGenerator.ts      # usa @faker-js/faker (fakerEN, fakerES)
  i18n/translations.ts
providers/
  LangProvider.tsx           # i18n global ES/EN
  ThemeProvider.tsx          # theming global
```

## Stack

- Next.js 15+ App Router · TypeScript · Tailwind CSS + SCSS Modules
- `@faker-js/faker` para texto · `@chenglou/pretext` para layout de líneas
- Deploy en Vercel
