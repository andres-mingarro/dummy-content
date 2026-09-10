export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Seedable {
  seed: (n: number) => void;
}

// Sin seed devuelve Math.random (comportamiento actual). Con seed, siembra también el
// faker instance recibido para que autor/título/fecha queden reproducibles junto con pick().
export function createRng(seed: string | null, faker?: Seedable): () => number {
  if (!seed) return Math.random;
  const n = hashSeed(seed);
  faker?.seed(n);
  return mulberry32(n);
}
