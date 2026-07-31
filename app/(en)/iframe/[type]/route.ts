import { NextRequest, NextResponse } from "next/server";
import { generateEmbed } from "@/lib/embed/content";
import type { Lang } from "@/lib/i18n/translations";
import { clampEmbedCount } from "@/lib/embed/limits";

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
  const html = generateEmbed(type, lang, darkMode, {
    cards: clampEmbedCount(req.nextUrl.searchParams.get("cards"), "cards"),
    images: clampEmbedCount(req.nextUrl.searchParams.get("images"), "images"),
    paragraphs: clampEmbedCount(req.nextUrl.searchParams.get("paragraphs"), "paragraphs"),
  });

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
