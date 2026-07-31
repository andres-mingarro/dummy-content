import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/iframe/article",
        "/iframe/article-image",
        "/iframe/images-list",
        "/iframe/card-list",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
