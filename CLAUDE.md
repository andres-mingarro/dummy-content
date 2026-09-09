@AGENTS.md

# Dummy Content — Contexto del Proyecto

Aplicación web Next.js con 3 sub-aplicaciones para generar contenido dummy dinámicamente.

## Idiomas y rutas

El idioma lo determina la **ruta**, no el estado de cliente: **inglés en la raíz** (`/`, `/images`, …) y **español bajo `/es`** (`/es`, `/es/images`, …). Así el `<html lang>` servido siempre coincide con el contenido y cada idioma tiene su URL indexable con `hreflang`.

- Dos **root layouts**: `app/(en)/layout.tsx` (`lang="en"`) y `app/es/layout.tsx` (`lang="es"`). No existe `app/layout.tsx`. Ambos renderizan `components/shared/RootShell` con el `lang` como prop.
- Los *PageClient viven en `app/(en)/…` y las páginas de `app/es/…` los importan con `@/app/(en)/…`.
- **`/api/image/…` y `/iframe/[type]` nunca llevan prefijo de idioma** — el idioma no forma parte de un asset. Los embeds siguen recibiendo `?lang=`.
- `LangProvider` recibe el `lang` del layout; `toggleLang()` navega a la ruta espejo (`swapLangPath`) y `href(path)` prefija links internos. Cambiar de idioma es una navegación real (full page load, por cruzar root layouts).
- Toda página traducida tiene espejo en los dos idiomas — si se agrega una ruta nueva hay que crear ambas o `toggleLang` cae en un 404.

## Páginas

- **Home** — `/` · `/es` — logotipo `<DummyContent/>` (Bebas Neue, #07CFFE, es un `div`, **no** el H1) + LightRays de fondo + H1 con la keyword + oración definitoria + 3 cards de herramientas + cuerpo editorial (`HomeArticle`)
- **Terms & Conditions** — `/terms` · `/es/terms`
- **Support** — `/support` — botones de Ko-fi (kofi1 en light / kofi3 en dark)

## Sub-aplicaciones

1. **Generador de Imágenes** ✅ — `/images` — SVG en memoria via URL parametrizada (`/api/image/[...params]`).
   - API: `GET /api/image/{w}x{h}/{bg}/{text}[/{label}]?design=[&landscape=][&user=][&texture=][&notext=1]` · validación 1–4000px · hex 3 o 6 dígitos · cache immutable
   - `?notext=1`: suprime el `<text>` del SVG en diseños `solid` y `texture` (label vacío → sin elemento text)
   - 4 diseños: `solid`, `landscape`, `user`, `texture` — cada uno con su SVG generator
   - `landscape` tiene 6 sub-tipos (`nature`, `desert`, `mountain-river`, `tree-forest`, `river`, `waterfall`) seleccionables via `?landscape=` — definidos en `lib/images/landscapes.ts`
   - Cada sub-tipo landscape: SVG exportado desde Illustrator (viewBox 600×400), inner content con fill inline (sin `<style>`), envuelto en `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" overflow="hidden">` — `overflow="hidden"` para recortar el rect de fondo que excede el viewBox
   - `user` tiene 6 sub-tipos (`style-1` … `style-6`) seleccionables via `?user=` — definidos en `lib/images/users.ts`, mismo patrón SVG que landscape
   - `texture` tiene 6 sub-tipos seleccionables via `?texture=` — definidos en `lib/images/textures.ts` — dos categorías: **gradient** (scale-to-fill con `preserveAspectRatio`, SVG anidado) y **tile** (inner content envuelto en `<pattern patternUnits="userSpaceOnUse">` + rect de relleno)
   - Sub-tipos texture: `bullseye-gradient`, `liquid-cheese`, `radiant-gradient`, `subtle-prism`, `wavey-fingerprint`, `zig-zag`
   - Cada textura exporta `DEFAULT_COLORS: Record<string, string>` y `buildInner(colors?)` — nombres de variables unificados: `primary-color`, `secondary-color` (+ `tertiary-color` etc. donde aplica); `buildInner` hace merge con defaults para soportar overrides parciales
   - `subtle-prism`: IDs renombrados a `sp-a`/`sp-b` para evitar conflictos DOM cuando múltiples instancias renderizan simultáneamente
   - SVG source files en `components/images/SvgPresetGenerator/SvgSource/{nature,user,textures}/` — procesados con Python para convertir clases CSS a fill inline; exportados desde `components/images/SvgPresetGenerator/{nature,user,texture}/index.ts` y agregados en `components/images/SvgPresetGenerator/index.ts`
   - `TextureEntry` en `texture/index.ts`: `{ buildInner, defaultColors, mode }` — ya no usa `inner: string` estático
   - `solid` y `texture` muestran el texto de dimensiones o label personalizado superpuesto; texture usa fuente blanca con stroke oscuro semitransparente para legibilidad sobre cualquier fondo
   - DummyForm: selector de diseño con previews SVG inline · al seleccionar `landscape`/`user`/`texture` aparece sub-grid con animación secuencial (CSS keyframe `subCardIn`, delay `--i * 35ms` via CSS custom property inline) · fila de color pickers oculta para `texture` (colores fijos en presets) · color picker estilizado: swatch cuadrado redondeado con `<input type="color" opacity:0>` encima · labels dinámicos según diseño · campo label + switch "mostrar/ocultar texto" en `solid` y `texture` (switch = `showLabel: boolean` en `FormValues`; input deshabilitado y con opacity cuando `showLabel=false`)
   - Sub-grids: 6 col desktop / 3 col mobile; misma estructura SCSS reutilizada para landscape, user y texture
   - Page (server) + ImagesPageClient (client): muestra URL + snippet `<img>` con CopyButton · origin resuelto en cliente (evita SSR mismatch)
   - CopyButton: con fallback `execCommand` para navegadores viejos
2. **Generador de iframe** ✅ — `/iframe` — configurador con selector de tipo, dimensiones y borde; preview en vivo.
   - IframeForm: selector de 4 tipos con previews SVG inline · inputs ancho/alto · toggle sin borde / con borde · color picker + grosor + radio condicionales
   - Page (server) + IframePageClient (client): muestra URL + snippet `<iframe>` con CopyButton · preview en vivo con `key={embedPath}` para recargar al cambiar tipo/idioma · origin resuelto en cliente
   - Contenido embebible en `/iframe/{type}?lang=` via route handler (HTML completo, sin layout de Next.js)
   - 4 tipos: `article`, `article-image`, `images-list`, `card-list`
   - `article`: artículo con categoría, título, autor con avatar circular (user style aleatorio `64×64`), fecha, tiempo de lectura, párrafos y blockquote
   - `article-image`: igual que article + imagen hero (`800×380`) con textura aleatoria de `TEXTURE_HERO_PALETTES`, ubicada entre el bloque meta y el cuerpo del texto
   - `images-list`: grilla 3 cols (responsive 2→1) con 12 imágenes de `IMAGES_LIST_PALETTES` — sin diseños user, solo solid/landscape/texture
   - `card-list`: 6 cards horizontales con thumbnail (`280×180`), categoría, título, excerpt, autor y fecha
   - Paletas en `lib/embed/utils.ts`: `PALETTES` (12, uso general), `IMAGES_LIST_PALETTES` (12, sin user), `HERO_PALETTES` (6, mixed), `TEXTURE_HERO_PALETTES` (6, solo texturas)
   - Avatares de autor: `/api/image/64x64/e0e0e0/555555?design=user&user={style}` — style aleatorio entre style-1…style-6, renderizados como círculo con `border-radius: 50%`
   - `imgUrl()` en utils.ts incluye el sub-tipo en la query string (`&landscape=`, `&user=`, `&texture=`) según el campo `subType` de la palette
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
app/                         # Páginas (App Router) — NO hay app/layout.tsx
  api/image/[...params]/     # Route handler imágenes (sin prefijo de idioma)
  icon.tsx                   # Favicon generado (cascadea a todos los segmentos)
  sitemap.ts                 # Sitemap XML: cada ruta × 2 idiomas, con alternates hreflang
  robots.ts                  # robots.txt
  globals.css
  (en)/                      # Route group en inglés (no aporta segmento de URL)
    layout.tsx               # ROOT LAYOUT en — RootShell lang="en" + metadata EN
    opengraph-image.tsx      # Imagen OG en (los metadatos de archivo no cruzan root layouts)
    page.tsx                 # Home        → /
    HomePageClient.tsx
    terms/page.tsx           # Términos    → /terms
    support/page.tsx         # Ko-fi       → /support
    images/
      page.tsx               # Server component
      ImagesPageClient.tsx   # Client component
    text/
      page.tsx               # Server component
      TextPageClient.tsx     # Client component
    iframe/
      page.tsx               # Server component
      IframePageClient.tsx   # Client component
      [type]/route.ts        # Route handler HTML completo (sin layout, sin prefijo de idioma)
  es/                        # Espejo en español (SÍ aporta el segmento /es)
    layout.tsx               # ROOT LAYOUT es — RootShell lang="es" + metadata ES
    opengraph-image.tsx      # Imagen OG es
    page.tsx                 # → /es          (reusa @/app/(en)/HomePageClient)
    images/page.tsx          # → /es/images   (reusa @/app/(en)/images/ImagesPageClient)
    text/page.tsx            # → /es/text
    iframe/page.tsx          # → /es/iframe
    terms/page.tsx           # → /es/terms
    support/page.tsx         # → /es/support
components/
  images/                    # DummyForm, ImagePreview, CopyButton, SvgPresetGenerator
    SvgPresetGenerator/
      SvgSource/             # SVGs originales (Illustrator / externos) — solo lectura
        nature/              # 6 SVGs landscape (600×400 viewBox)
        user/                # 6 SVGs user (600×400 viewBox)
        textures/            # 7 SVGs texture (viewBoxes variables)
      nature/                # TS files con SVG_INNER procesado + index.ts
      user/                  # TS files con SVG_INNER procesado + index.ts
      texture/               # TS files con buildInner(colors?) + DEFAULT_COLORS + RENDER_MODE + index.ts
      index.ts               # re-exporta NATURE_LANDSCAPE_SVG_INNER, USER_SVG_INNER, TEXTURE_SVG_MAP
  text/                      # TextForm, TextOutput
  iframe/                    # IframeForm
  home/
    HomeArticle/             # Cuerpo editorial de la home (server component) + JSON-LD FAQPage
  legal/
    TermsArticle/            # Términos renderizados desde lib/i18n/termsContent
  shared/
    RootShell/               # <html>/<body> compartido por los dos root layouts (prop lang)
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
  images/landscapes.ts          # sub-tipos landscape: importa de SvgPresetGenerator, buildLandscapeSVG
  images/users.ts               # sub-tipos user: importa de SvgPresetGenerator, buildUserSVG
  images/textures.ts            # sub-tipos texture: importa de SvgPresetGenerator, buildTextureSVG (gradient/tile)
  text/textGenerator.ts      # usa @faker-js/faker (fakerEN, fakerES)
  embed/
    utils.ts                 # paletas, categorías, helpers compartidos
    article.ts               # markup HTML del artículo
    article-image.ts         # markup HTML del artículo con imagen hero
    images-list.ts           # markup HTML de la grilla de imágenes
    card-list.ts             # markup HTML del listado de cards
    content.ts               # orquestador → generateEmbed(type, lang)
  i18n/translations.ts       # strings de UI
  i18n/homeContent.ts        # copy editorial de la home (EN/ES) — fuente única del FAQ visible y del JSON-LD
  i18n/termsContent.ts       # copy de términos y condiciones (EN/ES)
  seo/urls.ts                # BASE_URL, localizedPath, absoluteUrl, buildAlternates, INDEXABLE_PATHS
  seo/ogImage.tsx            # render compartido de la imagen Open Graph por idioma
providers/
  LangProvider.tsx           # i18n global ES/EN
  ThemeProvider.tsx          # theming global
scss/
  mixins/
    _breakpoints.scss        # mixins responsive alineados con Tailwind
```

## Stack

- Next.js 16+ App Router · TypeScript · Tailwind CSS 4 + SCSS Modules
- `@faker-js/faker` para texto (lorem ipsum latino, ES/EN)
- Deploy en Vercel · dominio `dummycontent.app`
- Google Analytics GA4 (`G-2R2WD8EBLQ`) via `next/script` con `strategy="afterInteractive"`
- JSON-LD WebApplication schema en `layout.tsx`

### Gestor de paquetes: bun

- **bun** es el gestor del proyecto (`bun install`, `bun run dev|build|start`) — declarado en `packageManager` de `package.json`
- El lockfile es `bun.lock`; **no** existe `package-lock.json` — no correr `npm install`, genera un lock en conflicto que Vercel puede llegar a preferir
- bun se usa solo como gestor y lanzador de scripts: **Next se sigue ejecutando bajo Node**. No usar `bun --bun` (el runtime de bun no está soportado por Next)

### TypeScript: 6.x, no 7.x

`next build` corre su typecheck a través de la API del compilador de TypeScript, que el port nativo (TS 7) no expone — el build falla con *"TypeScript 7.x does not provide the compiler API required by Next.js"*. TS 6 es la última implementación en JS y la que soporta el checker por defecto.

Para saltar a TS 7 haría falta `experimental.useTypeScriptCli: true` en `next.config`, a cambio de perder los code frames de Next en errores de rutas/layouts.

### `@types/node` sigue la versión del runtime

Fijado en `^22` para coincidir con Node 22, no en el `latest` del registry — un major mayor declara APIs que el runtime no tiene.

## Seguridad
- CSP headers configurados en next.config
- Protección contra SVG injection en el generador de imágenes
- Allowlist de dominios para iframes embebidos

## SEO
- Keyword objetivo: **"dummy content"** (compite contra lipsum.com). La frase tiene que aparecer en prosa que *explica*, no solo como marca o etiqueta de navegación.
- Metadata por página (title template, OG, Twitter card). El canonical y los `hreflang` se arman siempre con `buildAlternates(path, lang)` de `lib/seo/urls.ts` — no hardcodear URLs.
- Host canónico: **apex** `https://dummycontent.app`. `www` redirige 308 al apex (config de Vercel, no del repo).
- `sitemap.ts` y `robots.ts` generados dinámicamente; el sitemap lista cada ruta en EN y ES con sus `alternates`.
- JSON-LD: `WebApplication` en `RootShell` (global), `FAQPage` en `HomeArticle`. **El FAQ del JSON-LD sale del mismo `HOME_CONTENT` que el DOM visible** — Google descarta el structured data de FAQ que no se corresponde con contenido visible, así que no agregar preguntas en uno sin el otro.
- El H1 de la home lleva la keyword; el logotipo `<DummyContent/>` es un `div`, no un encabezado.

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
```
--background: #ededed (light) / #0f172a (dark)
--foreground: #111827 / #f1f5f9
--card: #ffffff / #1e293b
--card-border: #e5e7eb / #334155
--muted: #6b7280 / #94a3b8      ← labels y texto secundario sobre superficies opacas
--prose: #374151 / #cbd5e1      ← cuerpo de texto largo (HomeArticle, TermsArticle, lead del hero)
--muted-bg: #f3f4f6 / #0f172a
--accent: #6366f1 / #818cf8
--accent-bg: #eef2ff / #1e1b4b
--input-border: #e5e7eb / #334155
--input-border-focus: #6366f1 / #818cf8
--heading: #4c76bc (light) / #07CFFE (dark)
--logo-text: #6366f1 (light) / #07CFFE (dark)   ← color del logo y h1 home
--light-rays-tint: rgb(255 255 255) (light) / rgba(3,107,131,0.55) (dark)   ← luz del LightRays de la home
--tool-image: #b8ff3d   ← color de identidad de Dummy Image (igual en light/dark)
--tool-text: #56e6ff    ← color de identidad de Dummy Text (igual en light/dark)
--tool-iframe: #b9a3ff  ← color de identidad de Dummy Iframe (igual en light/dark)
--tool-ink: #111217     ← texto sobre los --tool-* (igual en light/dark)
```

`--tool-*` duplica los valores de `--home-card-image/text/iframe/ink` (`app/(en)/page.module.scss`) porque esos quedan scopeados a `.home-page` y el Header los necesita en todas las páginas. Si se retocan los colores de las tool cards de la home, actualizar también estos.

`--muted` da 4.13:1 sobre `--background`, por debajo de AA para texto normal — usar `--prose` para prosa larga.

El `LightRays` de la home va con `anchor="fixed"`: queda en `z-index: -1` como capa de fondo real, así que el contenedor **no puede tener background opaco** o lo tapa. Con `anchor="absolute"` (el default, para héroes cortos) se compone por encima del contenido y en páginas largas se deforma.
