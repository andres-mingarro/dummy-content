import { NextRequest, NextResponse } from "next/server";
import { generateEmbed } from "@/lib/embed/content";
import type { Lang } from "@/lib/i18n/translations";

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
  const html = generateEmbed(type, lang);

  if (!html) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
