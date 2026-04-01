# Plan: Dummy Content Generator con Next.js

## Descripción
Aplicación web Next.js que genera imágenes dummy dinámicamente mediante rutas URL parametrizadas. Las imágenes se crean en memoria sin almacenamiento en disco.

**Ejemplo de uso:**
- URL: `https://dummy-content.com/600x600/fff/000`
- Formulario: Inputs para ancho, alto, color fondo, color texto
- Resultado: `<img src="https://dummy-content.com/600x600/fff/000">`

---

## Estructura de Carpetas

```
src/
├── app/
│   ├── api/
│   │   └── image/
│   │       └── [...params]/
│   │           └── route.ts
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── DummyForm/
│   │   ├── DummyForm.tsx
│   │   └── DummyForm.module.scss
│   ├── ImagePreview/
│   │   ├── ImagePreview.tsx
│   │   └── ImagePreview.module.scss
│   └── CopyButton/
│       ├── CopyButton.tsx
│       └── CopyButton.module.scss
└── lib/
    └── imageGenerator.ts
```

---

## Fases de Implementación

### Fase 1: Inicialización & Setup
1. Crear proyecto Next.js con App Router
2. Instalar Tailwind CSS
3. Instalar `sass` para módulos SCSS
4. Configurar `next.config.js` (si es necesario)

### Fase 2: Lógica de Generación de Imágenes
1. Crear `lib/imageGenerator.ts`
   - Función para generar SVG con parámetros
   - Parsear dimensiones (ancho x alto)
   - Validar colores hexadecimales
   - Generar rectángulo con fondo + texto centrado
2. Crear route handler `api/image/[...params]/route.ts`
   - Extraer parámetros de URL: `/{w}x{h}/{bg}/{text}`
   - Validar rango de píxeles (1-4000px)
   - Validar hexadecimales (#fff, #000, etc.)
   - Devolver SVG con headers `image/svg+xml`
   - Headers de caché (max-age)

### Fase 3: Interfaz de Usuario
1. **DummyForm Component**
   - Inputs: ancho, alto, color fondo (hex), color texto (hex)
   - Actualización en tiempo real de URL
   - Botón de generar
   - Validación en cliente

2. **ImagePreview Component**
   - Mostrar imagen generada
   - Ajuste responsive

3. **CopyButton Component**
   - Copiar URL al portapapeles
   - Feedback visual

4. **Página principal** (`app/page.tsx`)
   - Composición de componentes
   - Layout limpio con Tailwind

### Fase 4: Estilos
- Usar **SCSS modules** (`.module.scss`) para componentes específicos
- Usar **Tailwind utilities** para layout, spacing, responsividad
- Paleta de colores consistente

### Fase 5: Validación & Robustez
1. Validar parámetros en servidor
2. Manejo de errores (400, 500)
3. Mensajes claros al usuario
4. Límites de tamaño (máximo 4000px)

### Fase 6: Deploy
1. Optimizar para Vercel
2. Headers de caché estáticos
3. Deploy y pruebas en producción

---

## Consideraciones Técnicas

### Formato de Imagen: SVG
- **Ventajas:** Ligero, escalable, sin procesamiento pesado, se genera en memoria
- **Alternativa futura:** Agregar soporte PNG/JPG con parámetro query `?format=png`

### Ruta URL
Estructura: `/image/{ancho}x{alto}/{colorFondo}/{colorTexto}`
- Ejemplo: `/image/600x600/fff/000`
- Limpia y intuitiva
- Fácil de compartir

### Sin Almacenamiento en Disco
- Cada request genera SVG en memoria
- Más rápido
- Ideal para deploy serverless (Vercel)

---

## Decisiones de Diseño

### Tailwind + SCSS Modules
- **Tailwind:** Layout, spacing, responsive, utilidades generales
- **SCSS Modules:** Estilos complejos específicos de componentes, anidado, mixins
- **Ventaja:** Mejor organización, evita conflictos CSS, componentes reutilizables

### Componentes Modulares
- Cada componente en su carpeta con `.tsx` + `.module.scss`
- Props bien tipadas (TypeScript)
- Responsabilidad única

---

## Extensiones Futuras

1. ~~**Texto personalizado:** `/image/600x600/fff/000/Mi%20Texto`~~ ✅ Implementado
2. ~~**Placeholders avanzados:** Iconos, patrones, gradientes~~ ✅ Implementado (4 diseños: solid, landscape, user, texture)
3. **Múltiples formatos:** Query param `?format=png` para PNG/JPG
4. **Más opciones:** Border radius, espesor de fuente, estilos de texto
5. **Autenticación:** API key para límites de requests

---

## Stack Tecnológico

- **Framework:** Next.js 15+ (App Router)
- **Estilos:** Tailwind CSS + SCSS Modules
- **Lenguaje:** TypeScript
- **Generación de imágenes:** SVG nativo (memoria)
- **Deploy:** Vercel

---

## Checklist de Implementación

- [x] Inicializar proyecto Next.js
- [x] Configurar Tailwind CSS
- [x] Instalar y configurar SASS
- [x] Crear función imageGenerator.ts
- [x] Implementar API route `/image/[...params]`
- [x] Crear componente DummyForm
- [x] Crear componente ImagePreview
- [x] Crear componente CopyButton
- [x] Integrar en página principal
- [x] Validación en cliente y servidor
- [x] Styling completo (Tailwind + SCSS)
- [ ] Testing básico
- [ ] Deploy a Vercel
