<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DummyContent — reglas de arquitectura para agentes

Estas instrucciones son obligatorias para cualquier IA o agente que modifique este repositorio. El objetivo es conservar una aplicación mantenible, accesible y visualmente coherente. Si una petición del usuario contradice este documento, prevalece la petición explícita del usuario.

## Stack y comandos

- Next.js 16.2 con App Router, React 19, TypeScript 6, SCSS Modules, Tailwind CSS 4 y Motion 12.
- Usar exclusivamente `bun`: `bun install`, `bun run dev`, `bun run build` y `bunx tsc --noEmit`. No generar `package-lock.json`.
- Antes de modificar APIs, convenciones o estructura de Next.js, leer la guía relevante en `node_modules/next/dist/docs/`.
- No instalar una dependencia si el navegador, React, Next.js o una dependencia existente ya resuelve el problema. Si fuese necesario instalarla, informar cuál y para qué antes de hacerlo.

## Arquitectura de componentes

- Cada bloque visual o funcional con responsabilidad propia debe ser un componente independiente.
- Un componente vive en `components/<area>/<ComponentName>/` y contiene como mínimo:

```text
ComponentName/
├── ComponentName.tsx
└── ComponentName.module.scss
```

- Las páginas y los componentes `*PageClient` deben componer bloques; no deben contener implementaciones visuales extensas, catálogos de SVG ni cientos de líneas de estilos.
- Extraer un subcomponente cuando tenga comportamiento, variantes, markup complejo o potencial de reutilización. No extraer wrappers triviales que solamente oculten una etiqueta.
- Mantener los Server Components por defecto. Agregar `"use client"` únicamente cuando se necesiten estado, eventos, hooks de cliente o APIs del navegador.
- Mantener el contenido editorial y el JSON-LD en Server Components. Los componentes cliente pueden recibir Server Components mediante `children`.
- Props e interfaces deben estar tipadas. Los conjuntos cerrados de variantes usan uniones literales, no `string` genérico.
- Los datos repetidos se modelan en arrays tipados y se renderizan con `map`; no duplicar bloques casi idénticos.

## CSS Modules y BEM obligatorio

Todos los componentes nuevos o modificados usan BEM dentro de su CSS Module.

- Bloque: nombre semántico en kebab-case: `.tool-card`.
- Elemento: `.tool-card__title`, `.tool-card__visual`.
- Modificador: `.tool-card--image`, `.tool-card__action--active`.
- No usar nombres genéricos como `.container`, `.content`, `.title`, `.card` o `.active` sin el prefijo del bloque.
- En TSX, acceder a nombres BEM con bracket notation:

```tsx
<article className={styles["tool-card"]}>
  <h3 className={styles["tool-card__title"]}>...</h3>
</article>
```

- Cada componente importa solamente su propio `ComponentName.module.scss`. Los estilos de un componente no deben depender de la estructura DOM interna de otro.
- Evitar `:global`. Solo se admite para integrar una clase global existente y debe estar documentado junto al selector.
- No usar estilos inline para valores estáticos. Se permiten para valores calculados en runtime, valores animados de Motion o custom properties derivadas de props.
- Usar los mixins existentes para responsive:

```scss
@use "@/scss/mixins/breakpoints" as *;

@include mobile { ... }
@include desktop { ... }
```

## Home one-page: estructura protegida

La home en inglés (`/`) y español (`/es`) comparte la misma implementación y conserva todo el contenido editorial de `lib/i18n/homeContent.ts`.

```text
app/(en)/HomePageClient.tsx            # compositor, sin markup visual extenso
components/home/
├── HomeHero/                          # hero y parallax ligado al scroll
├── ToolsShowcase/                     # sección y catálogo de herramientas
├── ToolCard/                          # card reusable con variantes BEM
├── EditorialIntro/                    # transición hacia el contenido largo
└── HomeArticle/                       # contenido SEO + FAQ JSON-LD
```

- No eliminar ni ocultar contenido de `HOME_CONTENT` para simplificar el diseño.
- Las tres herramientas deben tener links reales y localizados mediante `href()`:
  - `/images`
  - `/text`
  - `/iframe`
- El H1 es el título SEO recibido desde `HOME_CONTENT`; la marca `<DummyContent/>` no debe convertirse en otro H1.
- El FAQ visible y el schema `FAQPage` deben continuar saliendo de la misma fuente.
- Al modificar una experiencia compartida, verificar ambas rutas: `/` y `/es`.

## Movimiento y rendimiento

- Usar la dependencia existente `motion` desde `motion/react` para animaciones ligadas al scroll o a estado React.
- Preferir CSS para hover, focus y animaciones decorativas simples.
- Animar únicamente `transform` y `opacity` siempre que sea posible. No animar propiedades que provoquen reflow continuo como `width`, `height`, `top` o `left`.
- Las microinteracciones deben durar aproximadamente 150–300 ms; las transiciones complejas no deberían superar 400 ms.
- Toda animación debe ser interrumpible y no debe bloquear navegación, clicks ni scroll.
- Toda animación necesita una alternativa con movimiento reducido:
  - CSS: `@media (prefers-reduced-motion: reduce)`.
  - Motion: `useReducedMotion()` para neutralizar valores ligados al scroll.
- Evitar listeners manuales de `scroll` si Motion o CSS scroll-driven animations pueden resolverlo sin trabajo por frame en JavaScript.
- Reservar dimensiones para elementos visuales para evitar CLS.

## Accesibilidad e interacción

- Contraste mínimo WCAG AA: 4.5:1 para texto normal y 3:1 para texto grande.
- Todo control debe funcionar con teclado y tener un `:focus-visible` claramente perceptible.
- Áreas interactivas de al menos 44×44 px.
- No depender únicamente de hover, color o movimiento para comunicar una acción.
- SVGs puramente decorativos llevan `aria-hidden="true"`. Elementos informativos necesitan un nombre accesible.
- Mantener jerarquía secuencial de encabezados y landmarks semánticos (`main`, `section`, `article`, `nav`).
- No desactivar zoom ni introducir regiones de scroll anidadas en la one-page.
- Verificar que no exista overflow horizontal a 375 px.

## Idiomas y rutas

- Inglés vive en la raíz (`/`, `/images`, `/text`, `/iframe`). Español vive bajo `/es`.
- `LangProvider` resuelve links internos con `href(path)`. No concatenar manualmente `/es`.
- Las APIs de assets y embeds no se localizan por prefijo de ruta.
- Todo texto nuevo visible debe existir en ambos idiomas o derivarse del `lang` tipado.

## Checklist antes de entregar

1. Leer la documentación local relevante de Next.js.
2. Confirmar separación Server/Client y límites de responsabilidad.
3. Confirmar BEM en todos los componentes tocados.
4. Probar teclado, focus, contraste y `prefers-reduced-motion`.
5. Revisar mobile a 375 px y desktop.
6. Ejecutar:

```bash
bunx tsc --noEmit
git diff --check
bun run build
```

7. Si `next build` se bloquea o falla por el entorno, informarlo con precisión; nunca afirmar que el build pasó si no terminó con código 0.
