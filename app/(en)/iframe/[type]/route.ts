import { NextRequest, NextResponse } from "next/server";
import { generateEmbed } from "@/lib/embed/content";
import type { Lang } from "@/lib/i18n/translations";
import { clampEmbedCount, sanitizeSeed } from "@/lib/embed/limits";

const VALID_TYPES = ["article", "article-image", "images-list", "card-list"] as const;
type EmbedType = (typeof VALID_TYPES)[number];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  if (!VALID_TYPES.includes(type as EmbedType)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const lang = (req.nextUrl.searchParams.get("lang") === "es" ? "es" : "en") as Lang;
  const darkMode = req.nextUrl.searchParams.get("theme") === "dark";
  const seed = sanitizeSeed(req.nextUrl.searchParams.get("seed"));
  const html = generateEmbed(type, lang, darkMode, {
    cards: clampEmbedCount(req.nextUrl.searchParams.get("cards"), "cards"),
    images: clampEmbedCount(req.nextUrl.searchParams.get("images"), "images"),
    paragraphs: clampEmbedCount(req.nextUrl.searchParams.get("paragraphs"), "paragraphs"),
    seed,
  });

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Con seed, la misma URL siempre genera el mismo HTML: se puede cachear como inmutable.
  // Sin seed, el contenido es random en cada generación y solo conviene cachear una hora.
  const cacheControl = seed
    ? "public, max-age=31536000, immutable"
    : "public, s-maxage=3600, stale-while-revalidate=86400";

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": cacheControl,
    },
  });
}
