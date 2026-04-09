---
name: Plan — Expansión diseño "Texture"
description: Pasos para agregar sub-tipos al diseño Texture del generador de imágenes, siguiendo el patrón de landscape
type: project
---

# Plan: Sub-tipos para diseño "Texture"

Seguir exactamente el mismo patrón que se implementó para `landscape` en la sesión anterior.

**Why:** El diseño `texture` actualmente genera solo líneas diagonales. Se quiere expandir con múltiples variantes de patrones (ej. puntos, grilla, zigzag, cruces, etc.).

**How to apply:** Seguir el patrón paso a paso. A diferencia de landscape y user, las texturas probablemente se generan programáticamente (sin SVGs externos) usando los colores `bgColor` y `textColor` del usuario, igual que el diseño texture actual.

---

## Patrón de referencia: lo que se hizo con landscape

(Ver `plan_user_design.md` para el detalle completo del patrón — es idéntico.)

---

## Diferencia clave respecto a landscape/user

El diseño `texture` actual NO usa SVGs externos fijos — genera el SVG programáticamente usando `bgColor` y `textColor` del usuario. Las variantes de textura probablemente seguirán el mismo esquema: funciones que generan el SVG dinámicamente en lugar de embeder paths estáticos.

Esto significa que `lib/images/textures.ts` contendrá **funciones generadoras** en lugar de strings estáticos:

```ts
// En lugar de TEXTURE_SVG_INNER (strings estáticos)
// → funciones que reciben bgColor, textColor y retornan el inner SVG

export function buildTextureSVG(W, H, subType, bgColor, textColor): string { ... }
```

Los previews en DummyForm también serán dinámicos (dependen de `bgColor` y `textColor` actuales).

---

## Sub-tipos posibles a explorar

Ideas de patrones que se pueden generar con SVG `<pattern>`:
- `diagonal` — líneas diagonales (el actual)
- `grid` — grilla de cuadrados
- `dots` — puntos en grilla
- `crosshatch` — líneas diagonales cruzadas (×)
- `zigzag` — patrón en V
- `wave` — ondas horizontales
- `hexagon` — hexágonos
- `triangle` — triángulos

El usuario confirmará cuáles quiere y con qué nombres.

---

## Archivos a tocar para "texture"

| Archivo | Cambio |
|---|---|
| `lib/images/textures.ts` | NUEVO — `TextureSubType`, `TEXTURE_SUB_TYPES`, `parseTextureSubType`, funciones generadoras por variante, `buildTextureSVG(W, H, subType, bgColor, textColor)` |
| `lib/images/imageGenerator.ts` | Agregar `TextureSubType`, re-exports, actualizar `ImageParams` y `parseImageParams`, `textureSVG()` delega a `buildTextureSVG` |
| `app/api/image/[...params]/route.ts` | Parsear `?texture=` query param |
| `components/images/DummyForm/DummyForm.tsx` | Sub-grid condicional cuando `design === "texture"`, `TexturePreview` component (usa `bgColor`/`textColor` actuales), `FormValues.textureSubType` |
| `components/images/DummyForm/DummyForm.module.scss` | Estilos del sub-grid |
| `app/images/ImagesPageClient.tsx` | Agregar `textureSubType` a `DEFAULT_FORM` y `buildImagePath` |
| `lib/i18n/translations.ts` | `form.textures` con labels EN/ES |

## Notas técnicas

- Los previews de textura en DummyForm deben ser **reactivos** a `bgColor` y `textColor` en tiempo real (igual que el preview de texture actual). `TexturePreview` recibirá `subType`, `bgColor` y `textColor` como props.
- No hay `TEXTURE_BG_COLORS` fijo — el fondo lo define el usuario con el color picker.
- Para los previews inline de cada card del sub-grid, usar un SVG pequeño (ej. viewBox 60×40) que muestre el patrón — similar a cómo los otros diseños muestran previews estáticos.
- Default sub-tipo a definir (probablemente `diagonal` para mantener backward compat con el diseño actual).
- El `?texture=diagonal` debería producir el mismo resultado que el `?design=texture` actual (sin `texture=` param) para no romper URLs existentes.
