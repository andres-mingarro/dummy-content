# Plan: Botón de donaciones Buy Me a Coffee
**Branch:** `feature/donations` (crear desde master antes de cualquier cambio)

## Context

El proyecto quiere agregar una forma de recibir donaciones sin que el usuario se sienta invadido. La decisión es usar **Buy Me a Coffee** (sin comisiones por transacción, buena UX) con dos puntos de entrada: un botón discreto en el **Header** y una **página `/support`** dedicada.

### Por qué no es invasivo así:
- El botón en el header es pequeño, del mismo estilo que los controles de idioma/tema
- No hay popups, banners ni modales
- La página `/support` es opt-in — el usuario va si quiere
- El mensaje es honesto y agradecido, no urgente

### Requerimiento técnico único:
Crear una cuenta en [buymeacoffee.com](https://www.buymeacoffee.com) y obtener el **username** (ej. `@andres-mingarro`). La URL de donación es simplemente `https://www.buymeacoffee.com/{username}`. No requiere SDK, no requiere backend, no requiere CSP adicional (es un link externo).

---

## Archivos a modificar/crear

1. `components/shared/Header/Header.tsx`
2. `components/shared/Header/Header.module.scss`
3. `app/support/page.tsx` ← nuevo
4. `lib/i18n/translations.ts`
5. `app/sitemap.ts` ← agregar `/support`
6. `next.config.ts` ← agregar `/support` al X-Frame-Options

---

## 1. `lib/i18n/translations.ts`

Agregar sección `support` en ambos idiomas:

```ts
support: {
  buyMeCoffee: "Buy me a coffee",  // EN
  // ES:
  buyMeCoffee: "Invitame un café",
}
```

---

## 2. `components/shared/Header/Header.tsx`

Agregar un `<a>` con el mismo estilo que `controlBtn` en:
- **Desktop**: dentro del `div.controls.controlsDesktop`, antes del toggle de idioma
- **Mobile**: dentro de `div.mobileControls`, como link separado

```tsx
<a
  href="https://www.buymeacoffee.com/{username}"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.coffeeBtn}
  aria-label="Buy me a coffee"
>
  ☕ {t.support.buyMeCoffee}
</a>
```

En mobile, puede ir como link en el `mobileNav` (separado con un divider) en lugar de en `mobileControls` (que es pequeño), para que tenga más espacio y sea más legible.

---

## 3. `components/shared/Header/Header.module.scss`

Agregar `.coffeeBtn` con estilo similar a `.controlBtn` pero con acento sutil:

```scss
.coffeeBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  border: 1.5px solid var(--card-border);
  background: transparent;
  color: var(--muted);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:hover {
    background: var(--accent-bg);
    color: var(--accent);
    border-color: var(--accent);
  }
}
```

---

## 4. `app/support/page.tsx` ← nuevo Server Component

Página simple y honesta. No usar popups ni urgencia. Tono: agradecido, sin presión.

Estructura:
- `<BlurFade>` con heading `☕ Support Dummy Content`
- Párrafo explicando que es una herramienta gratuita y que las donaciones ayudan a mantenerla
- Botón CTA grande que abre `buymeacoffee.com/{username}` en nueva pestaña — usar `PulsatingButton` o un `<a>` estilizado con el mismo look que el botón de copiar (outline del accent, full-width o centrado)
- Nota pequeña: "No es obligatorio. Gracias por usar la herramienta."
- Metadata SEO: `noindex` (no queremos que esta página rankee en buscadores)

---

## 5. `app/sitemap.ts`

Agregar `/support` al sitemap con `priority: 0.3` y `changeFrequency: 'yearly'`.

---

## 6. `next.config.ts`

El header `X-Frame-Options: SAMEORIGIN` ya aplica a `/(|images|text|iframe|terms)` — `/support` queda automáticamente cubierto, no hace falta tocar nada.

---

## Verificación

1. `npm run dev`
2. Verificar que el botón ☕ aparece en el header desktop y mobile
3. Click → abre `buymeacoffee.com/{username}` en nueva pestaña
4. Navegar a `/support` → ver la página con CTA
5. `npm run build` → sin errores de tipos
6. Verificar que `/support` aparece en `/sitemap.xml`

---

## Pendiente del usuario

Antes de implementar: **necesitás crear tu cuenta en buymeacoffee.com y compartirme el username** para usar la URL correcta. Mientras tanto puedo usar un placeholder `YOUR_USERNAME`.
