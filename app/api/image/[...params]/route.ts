import { NextRequest, NextResponse } from "next/server";
import { parseImageParams, parseDesign, generateSVG } from "@/lib/images/imageGenerator";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const { params: segments } = await params;
  const design = parseDesign(req.nextUrl.searchParams.get("design"));

  const result = parseImageParams(segments, design);

  if ("error" in result) {
    return new NextResponse(result.error, { status: 400 });
  }

  const svg = generateSVG(result);

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
