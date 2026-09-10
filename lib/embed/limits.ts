/** Límites públicos de contenido para evitar iframes excesivamente pesados. */
export const EMBED_LIMITS = {
  cards: { min: 1, max: 50, default: 6 },
  images: { min: 1, max: 50, default: 12 },
  paragraphs: { min: 1, max: 30, default: 4 },
} as const;

export function clampEmbedCount(value: string | null, kind: keyof typeof EMBED_LIMITS): number {
  const limit = EMBED_LIMITS[kind];
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed)) return limit.default;
  return Math.min(limit.max, Math.max(limit.min, parsed));
}

const MAX_SEED_LENGTH = 64;

/** No se renderiza nunca en el HTML de salida: solo sirve como entrada de un hash, así que no hace falta restringir el charset, solo el largo. */
export function sanitizeSeed(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim().slice(0, MAX_SEED_LENGTH);
  return trimmed || null;
}
