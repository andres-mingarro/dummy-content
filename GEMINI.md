<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dummy Content — Contexto del Proyecto

Aplicación web Next.js con 3 sub-aplicaciones para generar contenido dummy dinámicamente.

## Páginas

- **Home** — `/` — hero con título `<DummyContent/>` (Bebas Neue, #07CFFE) + LightRays de fondo + lista de 3 herramientas como cards navegables
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
3. **Generador de textos** ✅ — `/text` — generación de párrafos por cantidad de palabras o caracteres, multi-idioma ES/EN.
   - Paradigma: `count` = total de palabras/chars dividido en `paragraphs` párrafos (`Math.floor(count/paragraphs)` por párrafo, remainder distribuido en los primeros)
   - Cada párrafo: primera letra mayúscula, termina en punto
   - TextForm: RippleButtons Words/Characters · slider (step 10, min 0, max 999) + input numérico para count · slider (step 1, min 1, max 100) + input para párrafos · toggle "display `<p>` tags" (Tailwind switch, derecha, separado por divider)
   - TextOutput: animación fade+blur por párrafo entero (no por palabra) · cuando `displayTags=true` muestra `<p>texto</p>` como texto literal dentro del `<p>` DOM
   - Page (server) + TextPageClient (client)
   - URL sincronizada: `?count=X&unit=words|characters&paragraphs=N`
   - CopyButton full-width (mismo componente que images/iframe, prop `fullWidth`)
   - Word count y char count en tiempo real (sobre texto plano, sin tags)

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
    LightRays/               # Efecto rayos de luz animados (home background)
    AuroraText/              # Texto con gradiente aurora animado
lib/
  images/imageGenerator.ts
  images/landscapes.ts          # sub-tipos landscape: SVG inner content, BG colors, parser
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
scss/
  mixins/
    _breakpoints.scss        # mixins responsive alineados con Tailwind
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
- No usar estilos inline en el DOM — cada componente tiene su propio `ComponentName.module.scss` con todos los estilos estáticos; solo se permiten estilos inline para valores genuinamente dinámicos en runtime (ej. posición de ripple, CSS custom properties derivadas de props)
- Responsive via mixins SCSS: `@use "@/scss/mixins/breakpoints" as *;` — usar `@include mobile` / `@include desktop` para el split 0–768px / 768px+; usar `@include up(lg)` etc. para breakpoints específicos (alineados con Tailwind: sm 640, md 768, lg 1024, xl 1280, 2xl 1536)
- AuroraText: la palabra `Dummy` en el logo y en los títulos de cada sección usa `<AuroraText colors={["#07CFFE", "#a78bfa", "#38bdf8", "#07CFFE"]} speed={2}>` — mantener esos colores y speed para consistencia visual; `backgroundSize: "400%"` definido en el componente
- Fuentes: `lobster` y `bebasNeue` se exportan desde `components/shared/Logo/Logo.tsx` — importar siempre desde ahí, nunca redeclarar con `next/font/google` en otros archivos
- CopyButton (`components/images/CopyButton/CopyButton.tsx`): componente compartido entre images, iframe y text — prop `fullWidth` para ancho completo
- Grids de diseño/tipo (DummyForm, IframeForm): 4 columnas en desktop, 2 columnas en mobile (`@include mobile`)

## Variables CSS del tema
```css
--background: #ededed (light) / #0f172a (dark)
--foreground: #111827 / #f1f5f9
--card: #ffffff / #1e293b
--card-border: #e5e7eb / #334155
--muted: #6b7280 / #94a3b8
--muted-bg: #f3f4f6 / #0f172a
--accent: #6366f1 / #818cf8
--accent-bg: #eef2ff / #1e1b4b
--input-border: #e5e7eb / #334155
--input-border-focus: #6366f1 / #818cf8
--heading: #4c76bc (light) / #07CFFE (dark)
--logo-text: #6366f1 (light) / #07CFFE (dark)   ← color del logo y h1 home
```