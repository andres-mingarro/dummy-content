import { NextRequest, NextResponse } from "next/server";
import { parseImageParams, parseDesign, generateSVG } from "@/lib/images/imageGenerator";
import { parseLandscapeSubType } from "@/lib/images/landscapes";
import { parseUserSubType } from "@/lib/images/users";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const { params: segments } = await params;
  const design = parseDesign(req.nextUrl.searchParams.get("design"));
  const landscapeSubType = parseLandscapeSubType(req.nextUrl.searchParams.get("landscape"));
  const userSubType = parseUserSubType(req.nextUrl.searchParams.get("user"));

  const result = parseImageParams(segments, design, landscapeSubType, userSubType);

  if ("error" in result) {
    return new NextResponse(result.error, { status: 400 });
  }

  const svg = generateSVG(result);

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
      "CDN-Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
