import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Todas las rutas: headers básicos de seguridad
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Páginas de la app: proteger de clickjacking
        // Las rutas /iframe/[type] quedan excluidas a propósito (deben ser embebibles)
        source: "/(|images|text|iframe|terms)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
