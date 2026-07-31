import type { Lang } from "@/lib/i18n/translations";

export interface HomeSubsection {
  heading: string;
  body: string[];
}

export interface HomeCodeSample {
  caption: string;
  snippet: string;
}

export interface HomeSection {
  id: string;
  heading: string;
  body: string[];
  subsections?: HomeSubsection[];
  code?: HomeCodeSample[];
}

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export interface HomeCopy {
  /** H1 — tiene que contener la keyword objetivo. */
  title: string;
  /** Primer párrafo visible: la oración definitoria que Google puede resaltar en el fragmento. */
  lead: string;
  toolsHeading: string;
  sections: HomeSection[];
  faqHeading: string;
  faq: HomeFaqItem[];
}

/**
 * Copy de la home. El FAQ de acá alimenta tanto el DOM visible como el JSON-LD `FAQPage`:
 * Google descarta el structured data de FAQ que no se corresponde con contenido visible,
 * así que las dos salidas tienen que venir de esta única fuente.
 */
export const HOME_CONTENT: Record<Lang, HomeCopy> = {
  en: {
    title: "Free Dummy Content Generator",
    lead:
      "Dummy content is the placeholder text, images and media used to fill a design while the real content is still being written. This free generator produces all three — dummy images from a plain URL, dummy text in English and Spanish, and embeddable dummy iframes — with no sign-up, no limits and no attribution required.",
    toolsHeading: "Three dummy content generators",
    sections: [
      {
        id: "what-is-dummy-content",
        heading: "What is dummy content?",
        body: [
          "Dummy content — also called placeholder content or filler content — is any text, image or media that stands in for the real thing while a website, an app or a print layout is being designed. It carries no meaning of its own. Its only job is to occupy the same space the final content will occupy, so that everyone looking at the design judges the layout instead of the copy.",
          "The term covers several things that are usually named separately. Dummy text is the classic lorem ipsum paragraph. Dummy images are the grey rectangles with their own dimensions printed across them, or the stock landscapes and round avatars that make a mockup feel closer to finished. Dummy data is the invented names, dates, prices and records that make a table or a dashboard look plausible. All of it is dummy content.",
          "Dummy content is deliberately disposable. It exists to be replaced, and a good placeholder makes its own replacement obvious: nobody ever shipped a page with \"Lorem ipsum dolor sit amet\" in the headline without someone noticing first.",
        ],
      },
      {
        id: "why-use-dummy-content",
        heading: "Why do we use dummy content?",
        body: [
          "The practical reason is timing. Real content is almost never ready when the design is. Waiting for approved copy, licensed photography and a populated database before anyone can look at a layout would stall most projects before they start, so designers fill the slots with dummy content and keep moving.",
          "The second reason is less obvious and matters more. Readable copy is distracting. When a stakeholder reviews a mockup full of real sentences, they read the sentences and comment on the wording — not on the hierarchy, the spacing or the rhythm of the page. Meaningless filler pushes attention back to the design itself. That is precisely why lorem ipsum, which looks like Latin but says nothing, has outlived five centuries of typesetting technology.",
          "Dummy content is also a stress test. A card component that looks perfect with a six-word title breaks with a forty-word one; a grid that is elegant with four images collapses with thirteen. Generating placeholder text at a specific word or character count, and placeholder images at a specific aspect ratio, is how you find those breaking points before real users do.",
        ],
      },
      {
        id: "where-does-dummy-content-come-from",
        heading: "Where does dummy content come from?",
        body: [
          "The best known form of dummy content is lorem ipsum, a scrambled passage of Latin taken from Cicero's De finibus bonorum et malorum, written in 45 BC. An unknown printer in the 1500s shuffled its words to make a type specimen sheet, and the same scrambled text has been reused ever since — first in letterpress specimens, then on Letraset transfer sheets in the 1960s, then in desktop publishing software from the 1980s onward, and finally in every design tool on the web.",
          "Dummy images arrived much later, with the browser. An <img> tag needs a source long before the photograph exists, so placeholder image services appeared: URLs that return a generated image at whatever size you ask for. Dummy iframes and dummy data followed the same logic, one slot at a time. Dummy content today is simply the union of all those traditions — filler for every kind of hole a page can have.",
        ],
      },
      {
        id: "types-of-dummy-content",
        heading: "What kinds of dummy content can you generate here?",
        body: [
          "This site covers the three kinds of placeholder that a typical layout needs, and each one is a separate tool. Everything runs on demand: nothing is stored, nothing is queued and there is no account to create.",
        ],
        subsections: [
          {
            heading: "Dummy images",
            body: [
              "The dummy image generator builds an SVG in memory and serves it from a parametrized URL, so you can paste that URL straight into an <img> tag, a CSS background or a Figma frame. You choose the width and height in pixels, the background and text colours, and one of four designs: a solid colour block with the dimensions written across it, a landscape illustration, a user avatar, or a generated texture. Landscapes, avatars and textures each ship with six variants.",
            ],
          },
          {
            heading: "Dummy text",
            body: [
              "The dummy text generator produces lorem ipsum in English or Spanish, sized the way you actually need it: by total word count or by total character count, split across as many paragraphs as you want. Every paragraph is capitalised and punctuated like real prose, and you can wrap the output in <p> tags if you are pasting it into HTML rather than into a design tool.",
            ],
          },
          {
            heading: "Dummy iframes",
            body: [
              "The dummy iframe generator gives you a complete embeddable page instead of a single asset — useful when you need to fill an embed slot, test an iframe container or demo a widget. There are four layouts: an article, an article with a hero image, a grid of images and a list of cards. Each one is generated with dummy text and dummy images from the other two tools, so the result looks like a real page rather than a grey box.",
            ],
          },
        ],
      },
      {
        id: "how-to-use",
        heading: "How to use the dummy image URL",
        body: [
          "The image generator is designed to be used without visiting the site at all. The path carries every parameter, so once you know the shape of the URL you can write it by hand:",
        ],
        code: [
          {
            caption: "A 600×400 placeholder with a light grey background and dark grey text",
            snippet: '<img src="https://dummycontent.app/api/image/600x400/eeeeee/333333" alt="" />',
          },
          {
            caption: "A landscape design, no text overlay",
            snippet:
              '<img src="https://dummycontent.app/api/image/1200x630/eeeeee/333333?design=landscape&landscape=waterfall" alt="" />',
          },
          {
            caption: "A 64×64 round avatar for a dummy author byline",
            snippet:
              '<img src="https://dummycontent.app/api/image/64x64/e0e0e0/555555?design=user&user=style-3" alt="" />',
          },
        ],
      },
    ],
    faqHeading: "Dummy content FAQ",
    faq: [
      {
        question: "What is dummy content?",
        answer:
          "Dummy content is placeholder text, images and media used during web development and design prototyping to stand in for content that does not exist yet. It has no meaning of its own — it exists to fill the space the real content will occupy, so a layout can be reviewed before the copy and photography are ready. DummyContent.app generates all the common kinds for free: placeholder images, lorem ipsum text and embeddable iframes.",
      },
      {
        question: "How do I generate a placeholder image?",
        answer:
          "Use the Dummy Image Generator at dummycontent.app/images. Set the dimensions, background colour, text colour and design style, and you get a URL you can drop straight into an <img> tag. The URL follows the pattern /api/image/{width}x{height}/{background}/{text}, so you can also write it by hand without opening the site — for example /api/image/600x400/eeeeee/333333.",
      },
      {
        question: "Is DummyContent.app free to use?",
        answer:
          "Yes. Every tool on DummyContent.app is completely free, with no registration, no account, no rate limit and no attribution required. The generated dummy content can be used in commercial projects.",
      },
      {
        question: "What types of dummy content can I generate?",
        answer:
          "Three types. Placeholder images in any size, in four design styles — solid colours, landscape illustrations, user avatars and generated textures — each with six variants. Lorem ipsum text in English and Spanish, sized by word count or character count and split into any number of paragraphs. And embeddable iframes containing realistic articles, image grids and card lists built from that same dummy text and imagery.",
      },
    ],
  },
  es: {
    title: "Generador gratuito de contenido dummy",
    lead:
      "El contenido dummy es el texto, las imágenes y los medios de relleno que se usan para maquetar un diseño mientras el contenido real todavía se está escribiendo. Este generador gratuito produce los tres — imágenes dummy desde una URL, texto dummy en español e inglés e iframes dummy embebibles — sin registro, sin límites y sin necesidad de atribución.",
    toolsHeading: "Tres generadores de contenido dummy",
    sections: [
      {
        id: "que-es-contenido-dummy",
        heading: "¿Qué es el contenido dummy?",
        body: [
          "El contenido dummy — también llamado contenido placeholder o contenido de relleno — es cualquier texto, imagen o medio que ocupa el lugar del contenido real mientras se diseña un sitio, una aplicación o una pieza impresa. No tiene significado propio. Su única función es ocupar el mismo espacio que va a ocupar el contenido definitivo, para que quien mire el diseño juzgue la maqueta y no el texto.",
          "El término abarca varias cosas que suelen nombrarse por separado. El texto dummy es el clásico párrafo de lorem ipsum. Las imágenes dummy son esos rectángulos grises con sus propias dimensiones escritas encima, o los paisajes y avatares redondos que hacen que un mockup se sienta más terminado. Los datos dummy son los nombres, fechas, precios y registros inventados que vuelven creíble una tabla o un dashboard. Todo eso es contenido dummy.",
          "El contenido dummy es deliberadamente descartable: existe para ser reemplazado. Un buen placeholder hace evidente su propio reemplazo — nadie publicó nunca una página con «Lorem ipsum dolor sit amet» en el título sin que alguien se diera cuenta antes.",
        ],
      },
      {
        id: "por-que-usar-contenido-dummy",
        heading: "¿Para qué se usa el contenido dummy?",
        body: [
          "La razón práctica son los tiempos. El contenido real casi nunca está listo cuando lo está el diseño. Esperar a tener el texto aprobado, la fotografía licenciada y la base de datos cargada antes de poder ver una maqueta frenaría la mayoría de los proyectos antes de empezar, así que se rellenan los huecos con contenido dummy y se sigue avanzando.",
          "La segunda razón es menos obvia y pesa más. El texto legible distrae. Cuando alguien revisa un mockup lleno de frases reales, lee las frases y comenta la redacción — no la jerarquía, ni el espaciado, ni el ritmo de la página. El relleno sin significado devuelve la atención al diseño. Por eso justamente el lorem ipsum, que parece latín pero no dice nada, sobrevivió a cinco siglos de tecnología de composición tipográfica.",
          "El contenido dummy también es una prueba de estrés. Una card que se ve impecable con un título de seis palabras se rompe con uno de cuarenta; una grilla elegante con cuatro imágenes se desarma con trece. Generar texto de relleno con una cantidad exacta de palabras o caracteres, e imágenes de relleno con una proporción exacta, es la forma de encontrar esos puntos de quiebre antes que los usuarios reales.",
        ],
      },
      {
        id: "de-donde-viene-el-contenido-dummy",
        heading: "¿De dónde viene el contenido dummy?",
        body: [
          "La forma más conocida de contenido dummy es el lorem ipsum, un pasaje en latín desordenado tomado de De finibus bonorum et malorum de Cicerón, escrito en el año 45 a. C. Un impresor anónimo del siglo XVI mezcló sus palabras para armar un muestrario tipográfico, y ese mismo texto desordenado se viene reutilizando desde entonces: primero en muestrarios de tipografía móvil, después en las hojas de calcomanías Letraset de los años sesenta, más tarde en el software de autoedición desde los ochenta, y finalmente en todas las herramientas de diseño de la web.",
          "Las imágenes dummy llegaron mucho después, con el navegador. Una etiqueta <img> necesita un src bastante antes de que exista la fotografía, así que aparecieron los servicios de imágenes placeholder: URLs que devuelven una imagen generada del tamaño que se les pida. Los iframes dummy y los datos dummy siguieron la misma lógica, un hueco a la vez. El contenido dummy de hoy es simplemente la suma de todas esas tradiciones: relleno para cada tipo de agujero que puede tener una página.",
        ],
      },
      {
        id: "tipos-de-contenido-dummy",
        heading: "¿Qué tipos de contenido dummy podés generar acá?",
        body: [
          "Este sitio cubre los tres tipos de relleno que necesita una maqueta típica, y cada uno es una herramienta separada. Todo se genera en el momento: no se guarda nada, no hay cola de procesamiento y no hay ninguna cuenta que crear.",
        ],
        subsections: [
          {
            heading: "Imágenes dummy",
            body: [
              "El generador de imágenes dummy construye un SVG en memoria y lo sirve desde una URL parametrizada, así que podés pegar esa URL directo en una etiqueta <img>, en un background de CSS o en un frame de Figma. Elegís el ancho y el alto en píxeles, los colores de fondo y de texto, y uno de cuatro diseños: un bloque de color sólido con las dimensiones escritas encima, una ilustración de paisaje, un avatar de usuario o una textura generada. Paisajes, avatares y texturas vienen con seis variantes cada uno.",
            ],
          },
          {
            heading: "Texto dummy",
            body: [
              "El generador de texto dummy produce lorem ipsum en español o inglés, medido como realmente lo necesitás: por cantidad total de palabras o por cantidad total de caracteres, repartido en la cantidad de párrafos que quieras. Cada párrafo arranca en mayúscula y termina en punto como prosa real, y podés envolver el resultado en etiquetas <p> si lo vas a pegar en HTML en vez de en una herramienta de diseño.",
            ],
          },
          {
            heading: "Iframes dummy",
            body: [
              "El generador de iframes dummy te da una página embebible completa en lugar de un asset suelto — útil cuando necesitás llenar un slot de embed, probar un contenedor de iframe o mostrar un widget. Hay cuatro maquetas: un artículo, un artículo con imagen de portada, una grilla de imágenes y un listado de cards. Cada una se arma con texto e imágenes dummy de las otras dos herramientas, así que el resultado parece una página real y no un recuadro gris.",
            ],
          },
        ],
      },
      {
        id: "como-usarlo",
        heading: "Cómo usar la URL de imágenes dummy",
        body: [
          "El generador de imágenes está pensado para usarse sin entrar al sitio. La ruta lleva todos los parámetros, así que una vez que conocés la forma de la URL podés escribirla a mano:",
        ],
        code: [
          {
            caption: "Un placeholder de 600×400 con fondo gris claro y texto gris oscuro",
            snippet: '<img src="https://dummycontent.app/api/image/600x400/eeeeee/333333" alt="" />',
          },
          {
            caption: "Un diseño de paisaje, sin texto superpuesto",
            snippet:
              '<img src="https://dummycontent.app/api/image/1200x630/eeeeee/333333?design=landscape&landscape=waterfall" alt="" />',
          },
          {
            caption: "Un avatar redondo de 64×64 para la firma de un autor dummy",
            snippet:
              '<img src="https://dummycontent.app/api/image/64x64/e0e0e0/555555?design=user&user=style-3" alt="" />',
          },
        ],
      },
    ],
    faqHeading: "Preguntas frecuentes sobre contenido dummy",
    faq: [
      {
        question: "¿Qué es el contenido dummy?",
        answer:
          "El contenido dummy es texto, imágenes y medios de relleno que se usan durante el desarrollo web y el prototipado de diseño para ocupar el lugar de un contenido que todavía no existe. No tiene significado propio: existe para llenar el espacio que va a ocupar el contenido real, de modo que se pueda revisar la maqueta antes de tener el texto y las fotos definitivas. DummyContent.app genera gratis los tipos más comunes: imágenes placeholder, texto lorem ipsum e iframes embebibles.",
      },
      {
        question: "¿Cómo genero una imagen placeholder?",
        answer:
          "Usá el Generador de Imágenes en dummycontent.app/images. Configurás las dimensiones, el color de fondo, el color del texto y el estilo de diseño, y obtenés una URL que podés pegar directo en una etiqueta <img>. La URL sigue el patrón /api/image/{ancho}x{alto}/{fondo}/{texto}, así que también podés escribirla a mano sin abrir el sitio — por ejemplo /api/image/600x400/eeeeee/333333.",
      },
      {
        question: "¿DummyContent.app es gratis?",
        answer:
          "Sí. Todas las herramientas de DummyContent.app son completamente gratuitas, sin registro, sin cuenta, sin límite de uso y sin necesidad de atribución. El contenido dummy generado se puede usar en proyectos comerciales.",
      },
      {
        question: "¿Qué tipos de contenido dummy puedo generar?",
        answer:
          "Tres tipos. Imágenes placeholder de cualquier tamaño, en cuatro estilos de diseño — colores sólidos, ilustraciones de paisaje, avatares de usuario y texturas generadas — con seis variantes cada uno. Texto lorem ipsum en español e inglés, medido por cantidad de palabras o de caracteres y repartido en la cantidad de párrafos que quieras. E iframes embebibles con artículos, grillas de imágenes y listados de cards realistas armados con ese mismo texto e imágenes dummy.",
      },
    ],
  },
};
