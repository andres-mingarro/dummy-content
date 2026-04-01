# Dummy Content

Generador de contenido dummy con tres sub-aplicaciones: imágenes SVG, iframes embebibles y texto. Todo se genera en memoria, sin almacenamiento en disco.

---

## Sub-aplicaciones

### 1. Generador de Imágenes — `/images`

Genera imágenes SVG placeholder desde una URL parametrizada.

```
/api/image/600x400/6366f1/ffffff
/api/image/800x600/87ceeb/333333?design=landscape
/api/image/300x300/e5e7eb/9ca3af?design=user
/api/image/500x300/eef2ff/6366f1?design=texture
```

**Estructura de URL**

```
/api/image/{ancho}x{alto}/{colorFondo}/{colorTexto}
/api/image/{ancho}x{alto}/{colorFondo}/{colorTexto}/{textoPersonalizado}
/api/image/{ancho}x{alto}/{colorFondo}/{colorTexto}?design={tipo}
```

| Parámetro               | Descripción                             | Ejemplo     |
|-------------------------|-----------------------------------------|-------------|
| `{ancho}x{alto}`        | Dimensiones en píxeles (1–4000)         | `600x400`   |
| `{colorFondo}`          | Color hex del fondo (3 o 6 dígitos)     | `cccccc`    |
| `{colorTexto}`          | Color hex del texto o ícono             | `333333`    |
| `{textoPersonalizado}`  | Texto a mostrar (solo diseño `solid`)   | `Mi%20Logo` |
| `?design=`              | Tipo de diseño (ver abajo)              | `landscape` |

**Tipos de diseño**

| Valor       | Descripción                                                    |
|-------------|----------------------------------------------------------------|
| `solid`     | Color sólido con texto centrado *(default)*                    |
| `landscape` | Cielo, montañas y sol                                          |
| `user`      | Silueta de persona — fondo y color de ícono configurables      |
| `texture`   | Líneas diagonales — fondo y color de trazo configurables       |

```html
<img src="https://tu-dominio.com/api/image/600x400/cccccc/555555" alt="placeholder">
```

---

### 2. Generador de Iframe — `/iframe`

Configura y genera iframes embebibles con contenido dummy realista.

**Parámetros del configurador**

- Tipo de contenido (4 opciones)
- Ancho y alto del iframe
- Borde: sin borde / con borde (color, grosor, radio)
- URL generada + snippet `<iframe>` listos para copiar
- Vista previa en vivo

**Tipos de iframe**

| Tipo            | URL de contenido              | Descripción                                                     |
|-----------------|-------------------------------|-----------------------------------------------------------------|
| `article`       | `/iframe/article?lang=`       | Artículo de noticias: categoría, título, autor, fecha, párrafos y blockquote |
| `article-image` | `/iframe/article-image?lang=` | Igual que article + imagen hero `800×380` del generador de imágenes |
| `images-list`   | `/iframe/images-list?lang=`   | Grilla 3 columnas (responsive 2→1) con 12 imágenes generadas    |
| `card-list`     | `/iframe/card-list?lang=`     | 6 cards horizontales con thumbnail, categoría, título y excerpt |

El parámetro `?lang=es` o `?lang=en` controla el idioma del contenido generado.

```html
<iframe src="https://tu-dominio.com/iframe/article?lang=es"
  style="display: block; width: 100%; height: 450px; border: none;"
  loading="lazy"></iframe>
```

---

### 3. Generador de Texto — `/text`

Genera texto placeholder en español o inglés usando Faker.js.

- Tipos: párrafos, oraciones, palabras
- Cantidad configurable con slider + input numérico
- Generación incremental (agrega/recorta sin regenerar todo)
- Word count y char count en tiempo real
- URL sincronizada con el estado (`?count=X#type`)

---

## Stack

| Tecnología       | Uso                                      |
|------------------|------------------------------------------|
| Next.js 16+      | Framework (App Router)                   |
| TypeScript       | Tipado estático                          |
| Tailwind CSS     | Layout y utilidades                      |
| SCSS Modules     | Estilos de componentes                   |
| SVG nativo       | Generación de imágenes en memoria        |
| Faker.js         | Generación de texto y datos dummy        |

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

Todo el contenido se genera en memoria por request — compatible con entornos serverless sin configuración adicional.
