# Dummy Content

Genera imágenes SVG placeholder al instante desde una URL parametrizada. Sin almacenamiento en disco, todo en memoria.

---

## Demo

```
/api/image/600x400/6366f1/ffffff
/api/image/800x600/87ceeb/333333?design=landscape
/api/image/300x300/e5e7eb/9ca3af?design=user
/api/image/500x300/eef2ff/6366f1?design=texture
```

---

## Estructura de URL

```
/api/image/{ancho}x{alto}/{colorFondo}/{colorTexto}
/api/image/{ancho}x{alto}/{colorFondo}/{colorTexto}/{textoPersonalizado}
/api/image/{ancho}x{alto}/{colorFondo}/{colorTexto}?design={tipo}
```

| Parámetro          | Descripción                              | Ejemplo     |
|--------------------|------------------------------------------|-------------|
| `{ancho}x{alto}`   | Dimensiones en píxeles (1–4000)          | `600x400`   |
| `{colorFondo}`     | Color hex del fondo (3 o 6 dígitos)      | `cccccc`    |
| `{colorTexto}`     | Color hex del texto o ícono              | `333333`    |
| `{textoPersonalizado}` | Texto a mostrar (solo diseño solid)  | `Mi%20Logo` |
| `?design=`         | Tipo de diseño (ver abajo)               | `landscape` |

### Tipos de diseño

| Valor       | Descripción                                        |
|-------------|----------------------------------------------------|
| `solid`     | Color sólido con texto centrado *(default)*        |
| `landscape` | Cielo, montañas y sol — el color fondo tinta el cielo |
| `user`      | Silueta de persona — fondo y color de ícono configurables |
| `texture`   | Líneas diagonales — fondo y color de trazo configurables  |

### Uso en HTML

```html
<img src="https://tu-dominio.com/api/image/600x400/cccccc/555555" alt="placeholder">
<img src="https://tu-dominio.com/api/image/300x300/87ceeb/333333?design=landscape" alt="landscape">
```

---

## Formulario web

La raíz del sitio (`/`) incluye un generador visual con:

- Selector de diseño con miniaturas preview
- Inputs de dimensiones (ancho × alto)
- Color pickers interactivos
- URL generada en tiempo real
- Snippet HTML listo para copiar
- Vista previa de la imagen

---

## Stack

| Tecnología       | Uso                              |
|------------------|----------------------------------|
| Next.js 15+      | Framework (App Router)           |
| TypeScript       | Tipado estático                  |
| Tailwind CSS     | Layout y utilidades              |
| SCSS Modules     | Estilos de componentes           |
| SVG nativo       | Generación de imágenes en memoria |

---

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Deploy en Vercel

```bash
vercel
```

Cada imagen se genera en memoria por request — compatible con entornos serverless sin configuración adicional.
