const MAX_SIZE = 4000;
const MIN_SIZE = 1;

export type DesignType = "solid" | "landscape" | "user" | "texture";
const DESIGN_TYPES: DesignType[] = ["solid", "landscape", "user", "texture"];

function parseSize(sizeStr: string): { width: number; height: number } | null {
  const match = sizeStr.match(/^(\d+)x(\d+)$/i);
  if (!match) return null;
  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  if (width < MIN_SIZE || width > MAX_SIZE || height < MIN_SIZE || height > MAX_SIZE) return null;
  return { width, height };
}

function normalizeHex(color: string): string | null {
  const clean = color.replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `#${clean}`;
  }
  return null;
}

export function parseDesign(raw: string | null): DesignType {
  if (raw && DESIGN_TYPES.includes(raw as DesignType)) return raw as DesignType;
  return "solid";
}

export interface ImageParams {
  width: number;
  height: number;
  bgColor: string;
  textColor: string;
  label?: string;
  design: DesignType;
}

export function parseImageParams(params: string[], design: DesignType): ImageParams | { error: string } {
  if (params.length < 1) return { error: "Parámetros insuficientes" };

  const size = parseSize(params[0]);
  if (!size) return { error: `Tamaño inválido: "${params[0]}". Formato esperado: {ancho}x{alto} (1-${MAX_SIZE}px)` };

  const bgRaw = params[1] ?? "cccccc";
  const textRaw = params[2] ?? "333333";

  const bgColor = normalizeHex(bgRaw);
  if (!bgColor) return { error: `Color de fondo inválido: "${bgRaw}"` };

  const textColor = normalizeHex(textRaw);
  if (!textColor) return { error: `Color de texto inválido: "${textRaw}"` };

  const label = params[3] ? decodeURIComponent(params[3]) : `${size.width}x${size.height}`;

  return { width: size.width, height: size.height, bgColor, textColor, label, design };
}

// ── Solid ────────────────────────────────────────────────────────────────────

function solidSVG({ width, height, bgColor, textColor, label }: ImageParams): string {
  const fontSize = Math.max(10, Math.min(Math.floor(Math.min(width, height) * 0.12), 48));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" fill="${textColor}"
  >${label}</text>
</svg>`;
}

// ── Landscape ────────────────────────────────────────────────────────────────

function landscapeSVG({ width: W, height: H }: ImageParams): string {
  const sunR = Math.max(8, Math.min(W, H) * 0.08);
  const sunCx = W * 0.72;
  const sunCy = H * 0.26;

  // back mountain (darker, right)
  const bm = `${W * 0.38},${H} ${W * 0.73},${H * 0.4} ${W},${H}`;
  // front mountain (bright, center-left)
  const fm = `0,${H} ${W * 0.44},${H * 0.27} ${W * 0.82},${H}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#87ceeb"/>
  <polygon points="${bm}" fill="#2e7d32"/>
  <polygon points="${fm}" fill="#4caf50"/>
  <circle cx="${sunCx}" cy="${sunCy}" r="${sunR}" fill="#ffa726"/>
</svg>`;
}

// ── User ─────────────────────────────────────────────────────────────────────

function userSVG({ width: W, height: H, bgColor, textColor }: ImageParams): string {
  const cx = W / 2;
  const unit = Math.min(W, H) * 0.14;
  const headR = unit;
  const headCy = H * 0.37;
  const bodyRx = unit * 1.3;
  const bodyRy = unit * 1.1;
  const bodyCy = headCy + headR + unit * 0.9;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bgColor}"/>
  <circle cx="${cx}" cy="${headCy}" r="${headR}" fill="${textColor}" opacity="0.55"/>
  <ellipse cx="${cx}" cy="${bodyCy}" rx="${bodyRx}" ry="${bodyRy}" fill="${textColor}" opacity="0.55"/>
</svg>`;
}

// ── Texture ──────────────────────────────────────────────────────────────────

function textureSVG({ width: W, height: H, bgColor, textColor }: ImageParams): string {
  const spacing = Math.max(12, Math.min(W, H) * 0.055);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="diag" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(45 0 0)">
      <line x1="0" y1="0" x2="0" y2="${spacing}" stroke="${textColor}" stroke-width="1.5" stroke-opacity="0.25"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${bgColor}"/>
  <rect width="${W}" height="${H}" fill="url(#diag)"/>
</svg>`;
}

// ── Dispatcher ───────────────────────────────────────────────────────────────

export function generateSVG(params: ImageParams): string {
  switch (params.design) {
    case "landscape": return landscapeSVG(params);
    case "user":      return userSVG(params);
    case "texture":   return textureSVG(params);
    default:          return solidSVG(params);
  }
}
