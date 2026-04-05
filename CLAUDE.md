@AGENTS.md

# Dummy Content — Contexto del Proyecto

Aplicación web Next.js con 3 sub-aplicaciones para generar contenido dummy dinámicamente.

## Páginas

- **Home** — `/` — hero con título `<DummyContent/>` (Bebas Neue, #07CFFE) + lista de 3 herramientas como cards navegables
- **Terms & Conditions** — `/terms`

## Sub-aplicaciones

1. **Generador de Imágenes** ✅ — `/images` — SVG en memoria via URL parametrizada (`/api/image/[...params]`).
   - API: `GET /api/image/{w}x{h}/{bg}/{text}[/{label}]?design=` · validación 1–4000px · hex 3 o 6 dígitos · cache immutable
   - 4 diseños: `solid`, `landscape`, `user`, `texture` — cada uno con su SVG generator
   - DummyForm: selector de diseño con previews SVG inline · color picker + input hex · labels dinámicos según diseño · campo label solo en `solid` · textColor oculto en `landscape`
   - Page (server) + ImagesPageClient (client): muestra URL + snippet `<img>` con CopyButton · origin resuelto en cliente (evita SSR mismatch)
   - CopyButton: con fallback `execCommand` para navegadores viejos
2. **Generador de iframe** ✅ — `/iframe` — configurador con selector de tipo, dimensiones y borde; preview en vivo.
   - IframeForm: selector de 4 tipos con previews SVG inline · inputs ancho/alto · toggle sin borde / con borde · color picker + grosor + radio condicionales
   - Page (server) + IframePageClient (client): muestra URL + snippet `<iframe>` con CopyButton · preview en vivo con `key={embedPath}` para recargar al cambiar tipo/idioma · origin resuelto en cliente
   - Contenido embebible en `/iframe/{type}?lang=` via route handler (HTML completo, sin layout de Next.js)
   - 4 tipos: `article`, `article-image`, `images-list`, `card-list`
   - `article`: artículo de noticias con categoría, título, autor, fecha, tiempo de lectura, párrafos y blockquote
   - `article-image`: igual que article + imagen hero (`800×380`) del image generator arriba
   - `images-list`: grilla 3 cols (responsive 2→1) con 12 imágenes del image generator
   - `card-list`: 6 cards horizontales con thumbnail (`280×180`), categoría, título, excerpt, autor y fecha
3. **Generador de textos** ✅ — `/text` — párrafos/oraciones/palabras, multi-idioma ES/EN, generación incremental.
   - TextForm: selector de tipo con botones · slider + input numérico sincronizados · límites por tipo (párrafos 20, oraciones 50, palabras 100)
   - TextOutput: renderiza texto sin contador de líneas · fuente Geist Sans 16px · spellCheck desactivado
   - Page (server) + TextPageClient (client)
   - URL sincronizada: `?count=X#type` — se lee al montar y se actualiza en tiempo real · inicialización post-hidratación para evitar SSR mismatch
   - Word count y char count en tiempo real · copy al portapapeles con feedback visual

## Estructura

```
app/                         # Páginas (App Router)
  api/image/[...params]/     # Route handler imágenes
  page.tsx                   # Home
  layout.tsx                 # Layout global con Header, Footer, GA4, JSON-LD
  icon.tsx                   # Favicon generado
  sitemap.ts                 # Sitemap XML
  robots.ts                  # robots.txt
  terms/page.tsx             # Términos y condiciones
  images/
    page.tsx                 # Server component
    ImagesPageClient.tsx     # Client component
  text/
    page.tsx                 # Server component
    TextPageClient.tsx       # Client component
  iframe/
    page.tsx                 # Server component
    IframePageClient.tsx     # Client component
    [type]/route.ts          # Route handler HTML completo (sin layout)
components/
  images/                    # DummyForm, ImagePreview, CopyButton
  text/                      # TextForm, TextOutput
  iframe/                    # IframeForm
  shared/
    Header/                  # Header con Logo, LangToggle, AnimatedThemeToggler
    Footer/                  # Footer
    Logo/                    # Logo SVG con Bebas Neue (<DummyContent/>)
    AnimatedThemeToggler/    # Toggle de tema animado
    BlurFade/                # Animación de entrada blur+fade
    PulsatingButton/         # Botón con animación pulsante
    RippleButton/            # Botón con efecto ripple
    ShineBorder/             # Borde animado shine para cards activos
lib/
  images/imageGenerator.ts
  text/textGenerator.ts      # usa @faker-js/faker (fakerEN, fakerES)
  embed/
    utils.ts                 # paletas, categorías, helpers compartidos
    article.ts               # markup HTML del artículo
    article-image.ts         # markup HTML del artículo con imagen hero
    images-list.ts           # markup HTML de la grilla de imágenes
    card-list.ts             # markup HTML del listado de cards
    content.ts               # orquestador → generateEmbed(type, lang)
  i18n/translations.ts
providers/
  LangProvider.tsx           # i18n global ES/EN
  ThemeProvider.tsx          # theming global
```

## Stack

- Next.js 16+ App Router · TypeScript · Tailwind CSS + SCSS Modules
- `@faker-js/faker` para texto (lorem ipsum latino, ES/EN)
- Deploy en Vercel · dominio `dummycontent.app`
- Google Analytics GA4 (`G-2R2WD8EBLQ`) via `next/script` con `strategy="afterInteractive"`
- JSON-LD WebApplication schema en `layout.tsx`

## Seguridad
- CSP headers configurados en next.config
- Protección contra SVG injection en el generador de imágenes
- Allowlist de dominios para iframes embebidos

## SEO
- Metadata por página (title template, OG, Twitter card)
- `sitemap.ts` y `robots.ts` generados dinámicamente
- JSON-LD en layout global

## Convenciones
- Todos los componentes tienen un className con su nombre (ej. `Header`, `DummyForm`, `TextOutput`) en el elemento raíz
- Páginas con interactividad se dividen en `page.tsx` (server) + `*PageClient.tsx` (client)
