---
name: Plan — Expansión diseño "User"
description: Pasos para agregar sub-tipos al diseño User del generador de imágenes, siguiendo el patrón de landscape
type: project
---

# Plan: Sub-tipos para diseño "User"

Seguir exactamente el mismo patrón que se implementó para `landscape` en la sesión anterior.

**Why:** El diseño `user` actualmente genera una silueta genérica. Se quiere expandir con múltiples variantes (ej. avatar femenino, masculino, grupo, empresa, etc.) igual que hicimos con los 6 paisajes.

**How to apply:** Seguir el patrón paso a paso. El usuario va a traer los SVGs (64×64) para cada sub-tipo.

---

## Patrón de referencia: lo que se hizo con landscape

1. Se creó `lib/images/landscapes.ts` con:
   - `LandscapeSubType` (union type)
   - `LANDSCAPE_SUB_TYPES` (array para iterar)
   - `parseLandscapeSubType(raw)` (valida y hace fallback al default)
   - `LANDSCAPE_BG_COLORS` (color de fondo sólido por sub-tipo)
   - `LANDSCAPE_SVG_INNER` (inner content SVG 64×64 por sub-tipo, sin el tag `<svg>` externo)
   - `buildLandscapeSVG(W, H, subType)` → SVG string con fondo + SVG anidado con `preserveAspectRatio="xMidYMax slice"`

2. Se actualizó `lib/images/imageGenerator.ts`:
   - Re-export de `LandscapeSubType`, `LANDSCAPE_SUB_TYPES`, `parseLandscapeSubType`
   - Import de `buildLandscapeSVG`, `parseLandscapeSubType`
   - `ImageParams` + campo `landscapeSubType?: LandscapeSubType`
   - `parseImageParams()` + parámetro `landscapeSubType?`
   - `landscapeSVG()` delega a `buildLandscapeSVG`

3. Se actualizó `app/api/image/[...params]/route.ts`:
   - Parsea `req.nextUrl.searchParams.get("landscape")` → `parseLandscapeSubType`
   - Lo pasa a `parseImageParams(..., landscapeSubType)`

4. Se actualizó `components/images/DummyForm/DummyForm.tsx`:
   - `FormValues` + campo `landscapeSubType: LandscapeSubType`
   - `LandscapePreview` component: `dangerouslySetInnerHTML` con SVG string que tiene fondo + SVG anidado con `preserveAspectRatio`
   - La card "landscape" en el design grid muestra `<LandscapePreview>` dinámico (no el DESIGN_PREVIEWS estático)
   - Sub-grid condicional cuando `design === "landscape"`: 6 columnas desktop / 3 mobile, mismas dimensiones que cards principales
   - Handler `handleLandscapeSubType`

5. Se actualizó `DummyForm.module.scss`:
   - `.landscapeSubGrid`, `.landscapeSubCard`, `.landscapeSubCardActive`, `.landscapeSubPreview`, `.landscapeSubLabel`
   - Mismos valores de padding/gap/border-radius/font-size que las design cards principales

6. Se actualizó `app/images/ImagesPageClient.tsx`:
   - `DEFAULT_FORM` + `landscapeSubType: "nature"`
   - `buildImagePath()`: cuando `design === "landscape"` agrega `&landscape=${landscapeSubType}`

7. Se actualizó `lib/i18n/translations.ts`:
   - `form.landscapes` con labels EN y ES para cada sub-tipo

---

## Archivos a tocar para "user"

| Archivo | Cambio |
|---|---|
| `lib/images/users.ts` | NUEVO — mismo esquema que landscapes.ts |
| `lib/images/imageGenerator.ts` | Agregar `UserSubType`, re-exports, actualizar `ImageParams` y `parseImageParams` |
| `app/api/image/[...params]/route.ts` | Parsear `?user=` query param |
| `components/images/DummyForm/DummyForm.tsx` | Sub-grid condicional cuando `design === "user"`, `UserPreview` component, `FormValues.userSubType` |
| `components/images/DummyForm/DummyForm.module.scss` | Estilos del sub-grid (puede reutilizar los de landscape o usar nombres `.userSub*`) |
| `app/images/ImagesPageClient.tsx` | Agregar `userSubType` a `DEFAULT_FORM` y `buildImagePath` |
| `lib/i18n/translations.ts` | `form.users` con labels EN/ES |

## Necesita del usuario

- Los SVG files (64×64) para cada variante de "user"
- Cuántas variantes habrá y sus nombres
- Si el color picker de `bgColor` e `iconColor` sigue siendo libre o se fija por sub-tipo

## Notas técnicas

- El `preserveAspectRatio` para user puede ser `"xMidYMid meet"` (centrado) en lugar de `"xMidYMax slice"` (que fue pensado para paisajes con suelo abajo). Depende de los SVGs.
- El campo `bgColor` ya funciona para user (fondo editable). Si las variantes tienen su propio fondo fijo, similar a landscape, se puede agregar `USER_BG_COLORS`. Si sigue siendo editable, no es necesario.
- Default sub-tipo a definir (el primero de la lista).
