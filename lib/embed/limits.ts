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
