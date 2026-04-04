import type { MetadataRoute } from "next";

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
    sitemap: "https://dummycontent.app/sitemap.xml",
  };
}
