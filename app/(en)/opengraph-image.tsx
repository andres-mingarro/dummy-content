import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, renderOgImage } from "@/lib/seo/ogImage";

export const runtime = "edge";
export const alt = ogAlt("en");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage("en");
}
