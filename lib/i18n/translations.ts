export type Lang = "en" | "es";

export const translations = {
  en: {
    header: {
      image: "Image",
      iframe: "Iframe",
      text: "Text",
    },
    images: {
      title: "Image Generator",
      subtitle: "Generate placeholder images instantly from a URL",
      generatedUrl: "Generated URL",
      html: "HTML",
      preview: "Preview",
    },
    iframe: {
      title: "Iframe Generator",
      comingSoon: "Coming soon",
    },
    text: {
      title: "Text Generator",
      subtitle: "Generate realistic placeholder text powered by Faker.js",
      comingSoon: "Coming soon",
      type: "Type",
      count: "Quantity",
      generate: "Generate",
      result: "Result",
      copy: "Copy text",
      copied: "Copied!",
      charCount: "characters",
      wordCount: "words",
      types: {
        paragraphs: "Paragraphs",
        sentences: "Sentences",
        words: "Words",
      },
    },
    form: {
      design: "Design",
      width: "Width (px)",
      height: "Height (px)",
      bgColor: "Background color",
      textColor: "Text color",
      skyColor: "Sky color",
      iconColor: "Icon color",
      lineColor: "Line color",
      background: "Background",
      customLabel: "Custom text (optional)",
      designs: {
        solid: "Solid",
        landscape: "Landscape",
        user: "User",
        texture: "Texture",
      },
    },
    copy: {
      url: "Copy URL",
      html: "Copy HTML",
      copied: "Copied!",
    },
  },
  es: {
    header: {
      image: "Image",
      iframe: "Iframe",
      text: "Text",
    },
    images: {
      title: "Generador de Imágenes",
      subtitle: "Genera imágenes placeholder al instante desde una URL",
      generatedUrl: "URL generada",
      html: "HTML",
      preview: "Vista previa",
    },
    iframe: {
      title: "Generador de Iframes",
      comingSoon: "Próximamente",
    },
    text: {
      title: "Generador de Texto",
      subtitle: "Genera texto placeholder realista usando Faker.js",
      comingSoon: "Próximamente",
      type: "Tipo",
      count: "Cantidad",
      generate: "Generar",
      result: "Resultado",
      copy: "Copiar texto",
      copied: "¡Copiado!",
      charCount: "caracteres",
      wordCount: "palabras",
      types: {
        paragraphs: "Párrafos",
        sentences: "Oraciones",
        words: "Palabras",
      },
    },
    form: {
      design: "Diseño",
      width: "Ancho (px)",
      height: "Alto (px)",
      bgColor: "Color de fondo",
      textColor: "Color de texto",
      skyColor: "Color del cielo",
      iconColor: "Color del ícono",
      lineColor: "Color de líneas",
      background: "Fondo",
      customLabel: "Texto personalizado (opcional)",
      designs: {
        solid: "Sólido",
        landscape: "Paisaje",
        user: "Usuario",
        texture: "Textura",
      },
    },
    copy: {
      url: "Copiar URL",
      html: "Copiar HTML",
      copied: "¡Copiado!",
    },
  },
} as const;

type Stringified<T> = {
  [K in keyof T]: T[K] extends object ? Stringified<T[K]> : string;
};

export type Translations = Stringified<typeof translations.en>;
